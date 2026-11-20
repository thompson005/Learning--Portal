// A small but faithful AWS IAM policy evaluator for the Cloud Range labs.
//
// It implements the parts of the real evaluation logic that matter for security
// training: explicit deny always wins; SCPs and permission boundaries must allow
// (they never grant); within one account a matching identity policy OR a direct
// resource-policy grant is enough, across accounts BOTH are needed; a resource
// policy that names only the account root delegates to identity policies instead
// of granting by itself. Conditions support the common operators, set modifiers
// (ForAnyValue/ForAllValue), IfExists, policy variables and the missing-key rules.
//
// Pure functions, no dependencies — runs in the browser and in the QA script.

export type CondValue = string | number | boolean | string[]

export interface Statement {
  Sid?: string
  Effect?: string
  Action?: string | string[]
  NotAction?: string | string[]
  Resource?: string | string[]
  NotResource?: string | string[]
  Principal?: unknown
  Condition?: Record<string, Record<string, CondValue>>
}

export interface PolicyDoc {
  Version?: string
  Statement?: Statement | Statement[]
}

export interface EvalRequest {
  action: string
  resource?: string
  principal?: string
  context?: Record<string, CondValue>
}

export interface EvalStack {
  identity?: PolicyDoc[]
  resource?: PolicyDoc | null
  boundary?: PolicyDoc | null
  scp?: PolicyDoc[]
  crossAccount?: boolean
}

export interface EvalResult {
  decision: "allow" | "deny"
  reason: string
}

// ---- parsing ---------------------------------------------------------------

export function parsePolicy(
  text: string,
): { ok: true; doc: PolicyDoc } | { ok: false; error: string } {
  let raw: unknown
  try {
    raw = JSON.parse(text)
  } catch (e) {
    return { ok: false, error: `Not valid JSON: ${(e as Error).message}` }
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw))
    return { ok: false, error: "A policy must be a JSON object." }
  const doc = raw as PolicyDoc
  if (doc.Statement === undefined)
    return { ok: false, error: 'The policy needs a "Statement".' }
  for (const [i, st] of statementsOf(doc).entries()) {
    if (st.Effect !== "Allow" && st.Effect !== "Deny")
      return { ok: false, error: `Statement ${i + 1}: "Effect" must be "Allow" or "Deny".` }
    if (st.Action === undefined && st.NotAction === undefined)
      return { ok: false, error: `Statement ${i + 1}: needs an "Action" (or "NotAction").` }
  }
  return { ok: true, doc }
}

function statementsOf(doc: PolicyDoc): Statement[] {
  const s = doc.Statement
  if (!s) return []
  return Array.isArray(s) ? s : [s]
}

const arr = <T>(v: T | T[] | undefined): T[] =>
  v === undefined ? [] : Array.isArray(v) ? v : [v]

// ---- matching helpers ------------------------------------------------------

function wildcard(pattern: string, value: string, ci: boolean): boolean {
  const re = new RegExp(
    "^" +
      pattern
        .replace(/[.+^${}()|[\]\\]/g, "\\$&")
        .replace(/\*/g, ".*")
        .replace(/\?/g, ".") +
      "$",
    ci ? "i" : "",
  )
  return re.test(value)
}

const actionMatch = (patterns: string[], action: string) =>
  patterns.some((p) => wildcard(p, action, true))
const resourceMatch = (patterns: string[], resource: string) =>
  patterns.some((p) => wildcard(p, resource, false))

function accountOf(arn: string): string {
  return arn.split(":")[4] ?? ""
}

/** Candidate ARNs for a caller: an assumed-role session also counts as its role. */
function principalForms(principal: string): string[] {
  const m = principal.match(/^arn:aws:sts::(\d+):assumed-role\/([^/]+)\//)
  return m ? [principal, `arn:aws:iam::${m[1]}:role/${m[2]}`] : [principal]
}

/** "direct" = grants this exact principal (or everyone); "account" = delegates
 *  to the whole account (root / bare account id); false = no match. */
function principalMatch(p: unknown, caller: string | undefined): "direct" | "account" | false {
  if (p === "*") return "direct"
  if (!caller || !p || typeof p !== "object") return false
  const forms = principalForms(caller)
  let best: "direct" | "account" | false = false
  for (const [key, vals] of Object.entries(p as Record<string, unknown>)) {
    for (const v of arr(vals as string | string[])) {
      if (typeof v !== "string") continue
      if (key === "AWS") {
        if (v === "*") return "direct"
        if (forms.includes(v)) return "direct"
        const rootish = /^\d{12}$/.test(v) || v.endsWith(":root")
        const acct = /^\d{12}$/.test(v) ? v : accountOf(v)
        if (rootish && acct && forms.some((f) => accountOf(f) === acct)) best = "account"
      } else if (v === caller) {
        return "direct"
      }
    }
  }
  return best
}

// ---- conditions ------------------------------------------------------------

function ctxLookup(ctx: Record<string, CondValue> | undefined, key: string) {
  if (!ctx) return undefined
  const k = key.toLowerCase()
  for (const [ck, cv] of Object.entries(ctx)) if (ck.toLowerCase() === k) return cv
  return undefined
}

function substitute(v: string, ctx?: Record<string, CondValue>): string {
  return v.replace(/\$\{([^}]+)\}/g, (_, k: string) => {
    const x = ctxLookup(ctx, k)
    return x === undefined ? "" : String(Array.isArray(x) ? x[0] : x)
  })
}

function ipToInt(ip: string): number | null {
  const p = ip.split(".").map(Number)
  if (p.length !== 4 || p.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) return null
  return ((p[0] << 24) | (p[1] << 16) | (p[2] << 8) | p[3]) >>> 0
}

function inCidr(ip: string, cidr: string): boolean {
  const [base, bits = "32"] = cidr.split("/")
  const a = ipToInt(ip)
  const b = ipToInt(base)
  if (a === null || b === null) return false
  const n = Number(bits)
  const mask = n === 0 ? 0 : (~0 << (32 - n)) >>> 0
  return (a & mask) === (b & mask)
}

/** Positive form of an operator: does this single request value match this policy value? */
function positive(op: string, cv: string, pv: string): boolean {
  switch (op) {
    case "stringequals":
      return cv === pv
    case "stringequalsignorecase":
      return cv.toLowerCase() === pv.toLowerCase()
    case "stringlike":
      return wildcard(pv, cv, false)
    case "arnequals":
    case "arnlike":
      return wildcard(pv, cv, false)
    case "numericequals":
      return Number(cv) === Number(pv)
    case "numericlessthan":
      return Number(cv) < Number(pv)
    case "numericlessthanequals":
      return Number(cv) <= Number(pv)
    case "numericgreaterthan":
      return Number(cv) > Number(pv)
    case "numericgreaterthanequals":
      return Number(cv) >= Number(pv)
    case "bool":
      return cv.toLowerCase() === pv.toLowerCase()
    case "ipaddress":
      return inCidr(cv, pv)
    default:
      return false
  }
}

const NEGATED: Record<string, string> = {
  stringnotequals: "stringequals",
  stringnotequalsignorecase: "stringequalsignorecase",
  stringnotlike: "stringlike",
  arnnotequals: "arnequals",
  arnnotlike: "arnlike",
  numericnotequals: "numericequals",
  notipaddress: "ipaddress",
}

function conditionsMet(
  cond: Statement["Condition"],
  ctx: Record<string, CondValue> | undefined,
): boolean {
  if (!cond) return true
  for (const [rawOp, keys] of Object.entries(cond)) {
    let op = rawOp.toLowerCase()
    let setOp: "any" | "all" | null = null
    if (op.startsWith("foranyvalue:")) {
      setOp = "any"
      op = op.slice(12)
    } else if (op.startsWith("forallvalues:")) {
      setOp = "all"
      op = op.slice(13)
    }
    const ifExists = op.endsWith("ifexists")
    if (ifExists) op = op.slice(0, -8)

    for (const [key, rawVals] of Object.entries(keys)) {
      const present = ctxLookup(ctx, key)
      if (op === "null") {
        const wantMissing = String(arr(rawVals as string | string[])[0]).toLowerCase() === "true"
        if ((present === undefined) !== wantMissing) return false
        continue
      }
      const negated = op in NEGATED
      const base = negated ? NEGATED[op] : op
      if (present === undefined) {
        if (ifExists || negated) continue // IfExists passes; a negated test on a missing key is true
        return false
      }
      const policyVals = arr(rawVals as string | string[]).map((v) => substitute(String(v), ctx))
      const reqVals = (Array.isArray(present) ? present : [present]).map(String)

      const valueOk = (cv: string) => {
        const anyMatch = policyVals.some((pv) => positive(base, cv, pv))
        return negated ? !anyMatch : anyMatch
      }
      const ok =
        setOp === "all" ? reqVals.every(valueOk) : reqVals.some(valueOk) // default: any
      if (!ok) return false
    }
  }
  return true
}

// ---- statement matching ----------------------------------------------------

function stmtApplies(
  st: Statement,
  req: EvalRequest,
  opts: { principalAware: boolean },
): { applies: boolean; principal: "direct" | "account" | false } {
  const none = { applies: false, principal: false as const }
  const action = req.action
  if (st.Action !== undefined) {
    if (!actionMatch(arr(st.Action), action)) return none
  } else if (st.NotAction !== undefined) {
    if (actionMatch(arr(st.NotAction), action)) return none
  } else return none

  const resource = req.resource ?? "*"
  // Policy variables (e.g. ${aws:username}) are valid in Resource as well as Condition.
  const subst = (list: string[]) => list.map((r) => substitute(r, req.context))
  if (st.Resource !== undefined) {
    if (!resourceMatch(subst(arr(st.Resource)), resource)) return none
  } else if (st.NotResource !== undefined) {
    if (resourceMatch(subst(arr(st.NotResource)), resource)) return none
  } else if (!opts.principalAware) {
    return none // identity statements must name a resource
  }

  let principal: "direct" | "account" | false = "direct"
  if (opts.principalAware) {
    principal = principalMatch(st.Principal, req.principal)
    if (!principal) return none
  }
  if (!conditionsMet(st.Condition, req.context)) return none
  return { applies: true, principal }
}

function denyHit(docs: (PolicyDoc | null | undefined)[], req: EvalRequest, label: string, principalAware = false) {
  for (const doc of docs) {
    if (!doc) continue
    for (const [i, st] of statementsOf(doc).entries()) {
      if (st.Effect !== "Deny") continue
      if (stmtApplies(st, req, { principalAware }).applies)
        return `Explicit Deny in the ${label} (${st.Sid ? `"${st.Sid}"` : `statement ${i + 1}`}).`
    }
  }
  return null
}

function allowHit(
  docs: (PolicyDoc | null | undefined)[],
  req: EvalRequest,
  principalAware = false,
): "direct" | "account" | false {
  let best: "direct" | "account" | false = false
  for (const doc of docs) {
    if (!doc) continue
    for (const st of statementsOf(doc)) {
      if (st.Effect !== "Allow") continue
      const r = stmtApplies(st, req, { principalAware })
      if (r.applies) {
        if (r.principal === "direct") return "direct"
        best = "account"
      }
    }
  }
  return best
}

// ---- evaluation ------------------------------------------------------------

export function evaluate(req: EvalRequest, stack: EvalStack): EvalResult {
  const identity = stack.identity ?? []
  const scp = stack.scp ?? []

  // 1. Any explicit Deny, anywhere, wins.
  const deny =
    denyHit(identity, req, "identity policy") ??
    denyHit([stack.resource], req, "resource policy", true) ??
    denyHit([stack.boundary], req, "permission boundary") ??
    denyHit(scp, req, "service control policy")
  if (deny) return { decision: "deny", reason: deny }

  // 2. Guardrails never grant, but must allow.
  if (scp.length && !allowHit(scp, req))
    return { decision: "deny", reason: "No service control policy allows this action." }
  if (stack.boundary && !allowHit([stack.boundary], req))
    return { decision: "deny", reason: "The permission boundary does not allow this action." }

  // 3. Grants.
  const identityAllow = allowHit(identity, req) !== false
  const res = stack.resource ? allowHit([stack.resource], req, true) : false

  if (!stack.resource) {
    return identityAllow
      ? { decision: "allow", reason: "Allowed by an identity policy." }
      : { decision: "deny", reason: "Implicit deny: no identity policy allows this action." }
  }

  if (stack.crossAccount) {
    if (identityAllow && res)
      return { decision: "allow", reason: "Cross-account: allowed by both the identity policy and the resource policy." }
    return {
      decision: "deny",
      reason: !identityAllow
        ? "Cross-account access needs an identity policy allow too — none matches."
        : "Cross-account access needs the resource policy to name the caller — none does.",
    }
  }

  if (res === "direct")
    return { decision: "allow", reason: "Allowed directly by the resource policy." }
  if (identityAllow)
    return { decision: "allow", reason: "Allowed by an identity policy." }
  return {
    decision: "deny",
    reason:
      res === "account"
        ? "The resource policy only delegates to the account; no identity policy allows this."
        : "Implicit deny: nothing allows this action.",
  }
}

// ---- convenience for tasks -------------------------------------------------

export interface PolicyTaskLike {
  mode: "identity" | "resource" | "boundary" | "scp"
  fixed?: {
    identity?: string[]
    resource?: string
    boundary?: string
    scp?: string[]
    crossAccount?: boolean
  }
  tests: {
    name: string
    action: string
    resource?: string
    principal?: string
    context?: Record<string, CondValue>
    expect: "allow" | "deny"
  }[]
}

export interface TestOutcome {
  name: string
  expect: "allow" | "deny"
  got: "allow" | "deny"
  pass: boolean
  reason: string
}

/** Runs a task's tests against the learner's policy text. */
export function runPolicyTests(
  task: PolicyTaskLike,
  policyText: string,
): { ok: true; outcomes: TestOutcome[]; allPass: boolean } | { ok: false; error: string } {
  const learner = parsePolicy(policyText)
  if (!learner.ok) return learner

  const parseFixed = (t: string | undefined) => {
    if (!t) return null
    const p = parsePolicy(t)
    return p.ok ? p.doc : null
  }
  const fx = task.fixed ?? {}
  const stack: EvalStack = {
    identity: (fx.identity ?? []).map(parseFixed).filter(Boolean) as PolicyDoc[],
    resource: parseFixed(fx.resource),
    boundary: parseFixed(fx.boundary),
    scp: (fx.scp ?? []).map(parseFixed).filter(Boolean) as PolicyDoc[],
    crossAccount: fx.crossAccount,
  }
  if (task.mode === "identity") stack.identity = [...(stack.identity ?? []), learner.doc]
  else if (task.mode === "resource") stack.resource = learner.doc
  else if (task.mode === "boundary") stack.boundary = learner.doc
  else stack.scp = [...(stack.scp ?? []), learner.doc]

  const outcomes = task.tests.map((t) => {
    const r = evaluate(
      { action: t.action, resource: t.resource, principal: t.principal, context: t.context },
      stack,
    )
    return { name: t.name, expect: t.expect, got: r.decision, pass: r.decision === t.expect, reason: r.reason }
  })
  return { ok: true, outcomes, allPass: outcomes.every((o) => o.pass) }
}
