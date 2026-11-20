"use client"

import { useMemo, useState } from "react"
import {
  AlertTriangle,
  Check,
  Database,
  Lock,
  RotateCcw,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { GlassCard } from "@/components/ui3d/GlassCard"
import { Switch } from "@/components/ui/switch"

// ---------------------------------------------------------------------------
// SQL Injection Lab — a safe, 100% client-side playground.
//
// Nothing here talks to a server or a real database. A tiny in-memory "users"
// table and a hand-written evaluator for a single `WHERE user = … AND pass = …`
// clause let the learner watch exactly how raw string concatenation turns an
// input box into an auth bypass — and how a parameterized query makes the same
// payload inert. Accuracy over hand-waving: the verdict comes from genuinely
// evaluating the crafted clause (with real SQL operator precedence), not from a
// keyword blocklist.
// ---------------------------------------------------------------------------

/** The one row an attacker wants. The evaluator checks the clause against it. */
const ADMIN_ROW = { user: "admin", pass: "hunter2" } as const

// ----- Tiny SQL-ish clause evaluator ---------------------------------------
// Scope is deliberately small: string/number literals, the columns `user` and
// `pass`, `=`/`<>`/`!=`, AND/OR (correct precedence: AND binds tighter), and
// parentheses. Anything it can't tokenise (e.g. an unbalanced quote) throws —
// which models the 500 a real app would return, a teaching moment in itself.

type Row = { user: string; pass: string }

type Tok =
  | { t: "str"; v: string }
  | { t: "num"; v: string }
  | { t: "id"; v: string }
  | { t: "op"; v: "=" | "<>" | "!=" }
  | { t: "lp" }
  | { t: "rp" }

/** Remove SQL line comments: `-- ` (dash-dash + whitespace/EOL) and `#`. */
function stripComments(sql: string): string {
  let out = ""
  for (let i = 0; i < sql.length; i++) {
    const c = sql[i]
    if (c === "#") break
    if (c === "-" && sql[i + 1] === "-") {
      const after = sql[i + 2]
      // MySQL requires whitespace (or EOL) after `--` for it to be a comment.
      if (after === undefined || after === " " || after === "\t" || after === "\n") {
        break
      }
    }
    out += c
  }
  return out
}

function tokenize(expr: string): Tok[] {
  const toks: Tok[] = []
  let i = 0
  while (i < expr.length) {
    const c = expr[i]
    if (c === " " || c === "\t" || c === "\n") {
      i++
      continue
    }
    if (c === "'") {
      // String literal. MySQL escapes a quote by doubling it ('').
      let v = ""
      i++
      let closed = false
      while (i < expr.length) {
        if (expr[i] === "'") {
          if (expr[i + 1] === "'") {
            v += "'"
            i += 2
            continue
          }
          closed = true
          i++
          break
        }
        v += expr[i]
        i++
      }
      if (!closed) throw new Error("unterminated string literal")
      toks.push({ t: "str", v })
      continue
    }
    if (c === "(") {
      toks.push({ t: "lp" })
      i++
      continue
    }
    if (c === ")") {
      toks.push({ t: "rp" })
      i++
      continue
    }
    if (c === "=") {
      toks.push({ t: "op", v: "=" })
      i++
      continue
    }
    if (c === "<" && expr[i + 1] === ">") {
      toks.push({ t: "op", v: "<>" })
      i += 2
      continue
    }
    if (c === "!" && expr[i + 1] === "=") {
      toks.push({ t: "op", v: "!=" })
      i += 2
      continue
    }
    if (/[0-9]/.test(c)) {
      let v = ""
      while (i < expr.length && /[0-9.]/.test(expr[i])) {
        v += expr[i]
        i++
      }
      toks.push({ t: "num", v })
      continue
    }
    if (/[A-Za-z_]/.test(c)) {
      let v = ""
      while (i < expr.length && /[A-Za-z0-9_]/.test(expr[i])) {
        v += expr[i]
        i++
      }
      toks.push({ t: "id", v })
      continue
    }
    throw new Error(`unexpected character "${c}"`)
  }
  return toks
}

type Val = { kind: "str"; s: string } | { kind: "num"; n: number } | { kind: "null" }

function looseEq(a: Val, b: Val): boolean {
  if (a.kind === "null" || b.kind === "null") return false
  if (a.kind === "num" && b.kind === "num") return a.n === b.n
  const as = a.kind === "num" ? String(a.n) : a.s
  const bs = b.kind === "num" ? String(b.n) : b.s
  // MySQL compares a string and a number numerically; keep it simple and close:
  if (a.kind === "num" || b.kind === "num") return Number(as) === Number(bs)
  return as === bs
}

function truthy(v: Val): boolean {
  if (v.kind === "null") return false
  if (v.kind === "num") return v.n !== 0
  const n = Number(v.s)
  return !Number.isNaN(n) && n !== 0
}

/** Recursive-descent evaluator over the token stream. */
function evaluate(toks: Tok[], row: Row): boolean {
  let pos = 0
  const peek = () => toks[pos]
  const eof = () => pos >= toks.length

  function primary(): Val {
    const tk = peek()
    if (!tk) throw new Error("unexpected end of clause")
    if (tk.t === "lp") {
      pos++
      const v = orExpr()
      if (peek()?.t !== "rp") throw new Error("missing )")
      pos++
      return v
    }
    if (tk.t === "str") {
      pos++
      return { kind: "str", s: tk.v }
    }
    if (tk.t === "num") {
      pos++
      return { kind: "num", n: Number(tk.v) }
    }
    if (tk.t === "id") {
      pos++
      const name = tk.v.toLowerCase()
      if (name === "user") return { kind: "str", s: row.user }
      if (name === "pass") return { kind: "str", s: row.pass }
      // Any other bare identifier is an unknown column -> NULL-ish.
      return { kind: "null" }
    }
    throw new Error("expected a value")
  }

  function comparison(): Val {
    const left = primary()
    const tk = peek()
    if (tk && tk.t === "op") {
      pos++
      const right = primary()
      const eq = looseEq(left, right)
      const res = tk.v === "=" ? eq : !eq
      return { kind: "num", n: res ? 1 : 0 }
    }
    return left
  }

  function isKw(v: string) {
    const tk = peek()
    return tk?.t === "id" && tk.v.toLowerCase() === v
  }

  function andExpr(): Val {
    let left = comparison()
    while (isKw("and")) {
      pos++
      const right = comparison()
      left = { kind: "num", n: truthy(left) && truthy(right) ? 1 : 0 }
    }
    return left
  }

  function orExpr(): Val {
    let left = andExpr()
    while (isKw("or")) {
      pos++
      const right = andExpr()
      left = { kind: "num", n: truthy(left) || truthy(right) ? 1 : 0 }
    }
    return left
  }

  const result = orExpr()
  if (!eof()) throw new Error("trailing SQL after clause")
  return truthy(result)
}

// ----- Verdict -------------------------------------------------------------

type Verdict = {
  // "attacker" = injection succeeded (bad); "safe" = blocked / normal login;
  // "valid" = legit credentials; "error" = SQL syntax error.
  kind: "attacker" | "safe" | "valid" | "error"
  title: string
  detail: string
}

function analyze(username: string, password: string, parameterized: boolean): Verdict {
  const isLegit = username === ADMIN_ROW.user && password === ADMIN_ROW.pass

  if (parameterized) {
    // Inputs are bound params — compared as literal data, never parsed as SQL.
    if (isLegit) {
      return {
        kind: "valid",
        title: "Logged in as admin (valid credentials)",
        detail:
          "The driver sent the query and the two values on separate channels. The values matched the real row, so this is a normal, legitimate login.",
      }
    }
    return {
      kind: "safe",
      title: "Login failed — injection neutralised",
      detail:
        "Bound parameters are compared as plain data. The quotes, OR and -- in your input were treated as literal characters of a username, never as SQL, so there is nothing to inject.",
    }
  }

  // Vulnerable path: raw string concatenation.
  const raw = `user = '${username}' AND pass = '${password}'`
  const clause = stripComments(raw)

  // UNION-based injection is structural (data extraction), not something the
  // boolean evaluator models — detect and explain it on its own terms.
  const upper = clause.toUpperCase()
  if (upper.includes("UNION") && upper.includes("SELECT")) {
    return {
      kind: "attacker",
      title: "Authenticated as admin — UNION injection succeeded!",
      detail:
        "Your payload closed the string and bolted on a UNION SELECT, appending an attacker-chosen row to the result set. The app took that forged row as a valid user. UNION-based injection is also how attackers dump other tables (password hashes, tokens).",
    }
  }

  let bypass = false
  try {
    bypass = evaluate(tokenize(clause), ADMIN_ROW)
  } catch (err) {
    return {
      kind: "error",
      title: "SQL error — the server would return HTTP 500",
      detail: `Your input broke the query's syntax (${
        err instanceof Error ? err.message : "parse error"
      }). A crash is itself a signal: it confirms input reaches the SQL verbatim, and the leaked error text drives error-based injection.`,
    }
  }

  if (bypass) {
    if (isLegit) {
      return {
        kind: "valid",
        title: "Logged in as admin (valid credentials)",
        detail: "These are the real credentials — an ordinary, honest login.",
      }
    }
    return {
      kind: "attacker",
      title: "Authenticated as admin — injection succeeded!",
      detail:
        "The crafted clause evaluates to TRUE for the admin row without a correct password. Either an OR made the condition always-true, or a -- comment chopped off the password check entirely.",
    }
  }

  // Not a bypass — explain why, including the classic precedence trap.
  const hasOr = /\bor\b/i.test(clause)
  const stripped = clause !== raw
  if (hasOr && !stripped) {
    return {
      kind: "safe",
      title: "Login failed — OR wasn't enough",
      detail:
        "Classic trap: AND binds tighter than OR, so the query reads user='' OR ('1'='1' AND pass=''). The password check still gates the TRUE branch. Comment it out with a trailing  -- , or inject into the password field instead.",
    }
  }
  return {
    kind: "safe",
    title: "Login failed",
    detail:
      "The WHERE clause is FALSE for every row — the supplied username and password simply don't match a stored user.",
  }
}

// ----- Payload chips -------------------------------------------------------

const PAYLOADS: { label: string; value: string; note: string }[] = [
  {
    label: "' OR '1'='1",
    value: "' OR '1'='1",
    note: "The famous one — but with a trailing AND pass check it falls to operator precedence. See why.",
  },
  {
    label: "' OR '1'='1' -- ",
    value: "' OR '1'='1' -- ",
    note: "Always-true OR, then -- comments out the rest of the query. Full bypass.",
  },
  {
    label: "admin' -- ",
    value: "admin' -- ",
    note: "Close the string after a known username, comment out the password check. Log in as that exact user.",
  },
  {
    label: "' UNION SELECT 'admin','x' -- ",
    value: "' UNION SELECT 'admin','x' -- ",
    note: "Append an attacker-chosen row. UNION injection also dumps other tables.",
  },
]

// ----- Presentational bits -------------------------------------------------

function Field({
  id,
  label,
  icon,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  id: string
  label: string
  icon: React.ReactNode
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {icon} {label}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete="off"
        spellCheck={false}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-xl border-none bg-background px-3 font-mono text-sm shadow-well placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50"
      />
    </label>
  )
}

/** The highlighted user-controlled substring inside the query view. */
function Inj({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-brand-red/[0.12] px-0.5 text-brand-red ring-1 ring-brand-red/25">
      {children || " "}
    </span>
  )
}

function Param({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-brand-green/[0.12] px-0.5 text-brand-green ring-1 ring-brand-green/25">
      {children || " "}
    </span>
  )
}

const VERDICT_STYLE: Record<
  Verdict["kind"],
  { ring: string; text: string; icon: React.ReactNode }
> = {
  attacker: {
    ring: "border-brand-red/40 bg-brand-red/[0.07]",
    text: "text-brand-red",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  error: {
    ring: "border-brand-orange/40 bg-brand-orange/[0.07]",
    text: "text-brand-orange",
    icon: <Terminal className="h-4 w-4" />,
  },
  safe: {
    ring: "border-brand-green/40 bg-brand-green/[0.07]",
    text: "text-brand-green",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  valid: {
    ring: "border-brand-green/40 bg-brand-green/[0.07]",
    text: "text-brand-green",
    icon: <Check className="h-4 w-4" />,
  },
}

// ----- Component -----------------------------------------------------------

export function SqlInjectionLab() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [parameterized, setParameterized] = useState(false)

  const verdict = useMemo(
    () => analyze(username, password, parameterized),
    [username, password, parameterized],
  )
  const style = VERDICT_STYLE[verdict.kind]

  function reset() {
    setUsername("")
    setPassword("")
  }

  return (
    <GlassCard strong className="p-5 md:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-brand-orange">
            <Database className="h-3.5 w-3.5" /> Interactive lab
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
            SQL Injection Playground
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Type into the login and watch the query the server would build. Safe
            &amp; offline — nothing leaves your browser.
          </p>
        </div>
        <label className="flex shrink-0 items-center gap-2.5 rounded-xl bg-background/70 px-3 py-2 shadow-well">
          <span
            className={cn(
              "flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest",
              parameterized ? "text-brand-green" : "text-muted-foreground",
            )}
          >
            <Lock className="h-3.5 w-3.5" />
            <span className="whitespace-nowrap">Parameterized</span>
          </span>
          <Switch
            checked={parameterized}
            onCheckedChange={setParameterized}
            aria-label="Toggle parameterized query"
            className="data-[state=checked]:bg-brand-green"
          />
        </label>
      </div>

      {/* Fake login */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Field
          id="sqli-user"
          label="Username"
          icon={<Terminal className="h-3 w-3" />}
          value={username}
          onChange={setUsername}
          placeholder="try a payload below"
        />
        <Field
          id="sqli-pass"
          label="Password"
          icon={<Lock className="h-3 w-3" />}
          value={password}
          onChange={setPassword}
          type="text"
          placeholder="leave blank, or inject here too"
        />
      </div>

      {/* Payload chips */}
      <div className="mt-4">
        <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          One-tap payloads → username
        </p>
        <div className="flex flex-wrap gap-2">
          {PAYLOADS.map((p) => {
            const active = username === p.value
            return (
              <button
                key={p.value}
                type="button"
                title={p.note}
                onClick={() => setUsername(p.value)}
                className={cn(
                  "rounded-lg border px-2.5 py-1 font-mono text-[12px] transition-colors motion-reduce:transition-none",
                  active
                    ? "border-brand-orange bg-brand-orange/[0.1] text-brand-orange"
                    : "border-border bg-card hover:border-brand-orange/50 hover:bg-brand-orange/[0.05]",
                )}
              >
                {p.label.trim() || p.label}
              </button>
            )
          })}
          <button
            type="button"
            onClick={reset}
            className="ml-auto flex items-center gap-1 rounded-lg px-2.5 py-1 text-[12px] text-muted-foreground transition-colors hover:text-brand-orange motion-reduce:transition-none"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Clear
          </button>
        </div>
      </div>

      {/* Live query */}
      <div className="mt-5">
        <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          <Database className="h-3.5 w-3.5" /> Query sent to the database
        </p>
        <div className="overflow-x-auto rounded-xl bg-[#1a1d23] px-4 py-3 shadow-well">
          <pre className="whitespace-pre-wrap break-all font-mono text-[13px] leading-relaxed text-slate-200">
            {parameterized ? (
              <>
                <span className="text-sky-300">SELECT</span> *{" "}
                <span className="text-sky-300">FROM</span> users{" "}
                <span className="text-sky-300">WHERE</span> user ={" "}
                <span className="text-brand-orange">?</span>{" "}
                <span className="text-sky-300">AND</span> pass ={" "}
                <span className="text-brand-orange">?</span>
              </>
            ) : (
              <>
                <span className="text-sky-300">SELECT</span> *{" "}
                <span className="text-sky-300">FROM</span> users{" "}
                <span className="text-sky-300">WHERE</span> user = '
                <Inj>{username}</Inj>' <span className="text-sky-300">AND</span>{" "}
                pass = '<Inj>{password}</Inj>'
              </>
            )}
          </pre>
        </div>
        {parameterized && (
          <div className="mt-2 overflow-x-auto rounded-xl bg-[#1a1d23] px-4 py-2.5 shadow-well">
            <pre className="whitespace-pre-wrap break-all font-mono text-[12px] leading-relaxed text-slate-300">
              <span className="text-slate-500">-- bound params (sent as data, not SQL)</span>
              {"\n"}$1 = <Param>{username}</Param>
              {"\n"}$2 = <Param>{password}</Param>
            </pre>
          </div>
        )}
      </div>

      {/* Verdict */}
      <div
        className={cn(
          "mt-4 rounded-xl border px-4 py-3 transition-colors motion-reduce:transition-none",
          style.ring,
        )}
        role="status"
        aria-live="polite"
      >
        <p className={cn("flex items-center gap-2 text-sm font-semibold", style.text)}>
          {style.icon}
          {verdict.kind === "attacker" ? `⚠️ ${verdict.title}` : verdict.title}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          {verdict.detail}
        </p>
      </div>

      {/* The fix */}
      <div className="mt-4 flex items-start gap-2 rounded-xl bg-background/60 px-4 py-3 shadow-well">
        <Zap className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">The fix:</span> flip{" "}
          <span className="font-mono text-brand-green">Parameterized</span> on.
          Prepared statements send the query skeleton and the values on separate
          channels, so the engine never parses your input as SQL. Same payload,
          no injection. Never build SQL by gluing strings together.
        </p>
      </div>
    </GlassCard>
  )
}
