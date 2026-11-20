// Automated QA for Cloud Range labs. A lab passes only if it is actually solvable:
// every flag is reachable by replaying its stated solution through the terminal
// engine, every policy task fails on the starter and passes on the reference
// solution, and the content is well-formed. Used by scripts/validate-cloud-ranges.ts.

import type { CloudRange, CloudTask } from "@/types"
import { parsePolicy, runPolicyTests } from "./iam"
import { replay } from "./terminal"

export interface LabPatch {
  labId: string
  /** Optional retitle (e.g. a lab re-scoped to the defensive side). */
  title?: string
  objective?: string
  successCriteria?: string[]
  hints?: string[]
  estimatedHours?: number
  resources?: { title: string; url: string; type: string }[]
  range: CloudRange
}

const FLAG_RE = /^FLAG\{[A-Za-z0-9_\-]{6,60}\}$/
const REAL_KEY_RE = /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/

export function validateLabPatch(p: LabPatch, knownLabIds?: Set<string>): string[] {
  const errs: string[] = []
  const e = (m: string) => errs.push(`${p.labId}: ${m}`)
  const r = p.range

  if (knownLabIds && !knownLabIds.has(p.labId)) e("unknown lab id")
  if (!r) return [...errs, `${p.labId}: missing range`]

  if (!p.successCriteria || p.successCriteria.length < 2) e("needs >= 2 successCriteria")
  if (!p.hints || p.hints.length < 3) e("needs >= 3 hints (gentlest first)")
  if (!r.scenario || r.scenario.length < 80) e("scenario too short (>= 80 chars)")
  if (!r.takeaways || r.takeaways.length < 2) e("needs >= 2 takeaways")
  if (!r.artifacts || r.artifacts.length < 1) e("needs >= 1 artifact")

  for (const a of r.artifacts ?? []) {
    if (!a.name || !a.content?.trim()) e(`artifact "${a.name}" is empty`)
    if (a.language === "json") {
      try {
        JSON.parse(a.content)
      } catch (err) {
        e(`artifact "${a.name}" is declared json but does not parse: ${(err as Error).message}`)
      }
    }
  }

  // never ship anything that looks like a real AWS key
  const everything = JSON.stringify(r)
  const key = everything.match(REAL_KEY_RE)
  if (key && !/EXAMPLE/.test(key[0])) e(`contains a real-looking AWS access key (${key[0]}) — use a fake ending in EXAMPLE`)

  const tasks: CloudTask[] = r.tasks ?? []
  if (tasks.length < 4) e("needs >= 4 tasks")
  const ids = new Set<string>()
  for (const t of tasks) {
    if (ids.has(t.id)) e(`duplicate task id "${t.id}"`)
    ids.add(t.id)
    if (!t.prompt || t.prompt.length < 15) e(`task ${t.id}: prompt too short`)
    if (!t.explanation || t.explanation.length < 30) e(`task ${t.id}: explanation too short`)
  }
  const flagTasks = tasks.filter((t) => t.kind === "flag") as Extract<CloudTask, { kind: "flag" }>[]
  const policyTasks = tasks.filter((t) => t.kind === "policy") as Extract<CloudTask, { kind: "policy" }>[]
  if (flagTasks.length + policyTasks.length < 1) e("needs at least one hands-on task (flag or policy)")

  for (const t of tasks) {
    if (t.kind === "answer") {
      if (!t.accept?.length) e(`task ${t.id}: answer needs accept[]`)
    } else if (t.kind === "choice") {
      if (!t.options || t.options.length < 3 || t.options.length > 5) e(`task ${t.id}: choice needs 3-5 options`)
      if (!t.correct?.length || t.correct.some((i) => i < 0 || i >= (t.options?.length ?? 0)))
        e(`task ${t.id}: choice.correct has an invalid index`)
    } else if (t.kind === "flag") {
      if (!FLAG_RE.test(t.flag)) e(`task ${t.id}: flag must look like FLAG{some_text} (got "${t.flag}")`)
    } else if (t.kind === "policy") {
      for (const [label, text] of [["starter", t.starter], ["solution", t.solution]] as const) {
        const pr = parsePolicy(text)
        if (!pr.ok) e(`task ${t.id}: ${label} policy invalid — ${pr.error}`)
      }
      if (!t.tests || t.tests.length < 3) e(`task ${t.id}: needs >= 3 policy tests`)
      else {
        if (!t.tests.some((x) => x.expect === "allow") || !t.tests.some((x) => x.expect === "deny"))
          e(`task ${t.id}: tests must include at least one allow AND one deny`)
        const onStarter = runPolicyTests(t, t.starter)
        if (onStarter.ok && onStarter.allPass) e(`task ${t.id}: the starter already passes every test (nothing to fix)`)
        const onSolution = runPolicyTests(t, t.solution)
        if (!onSolution.ok) e(`task ${t.id}: solution policy error — ${onSolution.error}`)
        else if (!onSolution.allPass)
          e(
            `task ${t.id}: reference solution fails: ${onSolution.outcomes
              .filter((o) => !o.pass)
              .map((o) => `"${o.name}" expected ${o.expect}, got ${o.got} (${o.reason})`)
              .join("; ")}`,
          )
      }
    } else {
      e(`task ${(t as { id: string }).id}: unknown kind`)
    }
  }

  // terminal + reachability
  if (flagTasks.length && !r.terminal) e("has flag tasks but no terminal")
  if (r.terminal) {
    const term = r.terminal
    if (!term.rules?.length) e("terminal has no rules")
    const setKeys = new Set<string>()
    for (const [i, rule] of (term.rules ?? []).entries()) {
      try {
        new RegExp(rule.match, "i")
      } catch (err) {
        e(`terminal rule ${i + 1}: bad regex /${rule.match}/ — ${(err as Error).message}`)
      }
      rule.sets?.forEach((s) => setKeys.add(s))
    }
    for (const [i, rule] of (term.rules ?? []).entries())
      for (const need of rule.requires ?? [])
        if (!setKeys.has(need)) e(`terminal rule ${i + 1}: requires "${need}" but no rule ever sets it`)

    if (flagTasks.length) {
      if (!r.solution || r.solution.length < 3) e("needs a terminal `solution` of >= 3 commands")
      else {
        const run = replay(term, r.solution)
        run.steps.forEach((s, i) => {
          if (!s.matched) e(`solution step ${i + 1} (\`${s.command}\`) is not handled by any terminal rule`)
        })
        for (const f of flagTasks)
          if (!run.transcript.includes(f.flag))
            e(`flag ${f.flag} (task ${f.id}) is NOT reachable by replaying the solution commands`)
      }
    }
  }

  return errs
}
