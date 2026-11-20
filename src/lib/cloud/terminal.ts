// Scripted CLI for the Cloud Range labs. Not a real shell: each lab declares rules
// (regex -> output). Rules can require state set by earlier commands (e.g. you must
// run `assume-role` before the privileged call works), which is what makes a lab
// feel procedural instead of a list of canned answers. Pure functions, used by the
// browser terminal and by the automated QA that replays each lab's solution.

import type { CloudTerminal, TerminalRule } from "@/types"

export interface CommandResult {
  output: string
  state: string[]
  /** true when a scripted rule handled the command (not help/fallback). */
  matched: boolean
}

const DEFAULT_HELP =
  "This is a simulated cloud shell. Try the CLI commands the scenario hints at, e.g.\n" +
  "  aws sts get-caller-identity\n" +
  "Inspect the artifacts above for names, ARNs and policies to use in your commands.\n" +
  "Commands: help, clear"

const DEFAULT_FALLBACK = "Nothing scripted for that command in this range. Type 'help', and check the artifacts for what to try."

export function normaliseCommand(raw: string): string {
  return raw.trim().replace(/\s+/g, " ")
}

const compiled = new WeakMap<TerminalRule, RegExp | null>()
function regexFor(rule: TerminalRule): RegExp | null {
  if (compiled.has(rule)) return compiled.get(rule) ?? null
  let re: RegExp | null = null
  try {
    re = new RegExp(rule.match, "i")
  } catch {
    re = null
  }
  compiled.set(rule, re)
  return re
}

export function runCommand(t: CloudTerminal, state: string[], raw: string): CommandResult {
  const cmd = normaliseCommand(raw)
  if (!cmd) return { output: "", state, matched: false }
  if (cmd === "help") return { output: t.help ?? DEFAULT_HELP, state, matched: false }

  for (const rule of t.rules) {
    const re = regexFor(rule)
    if (!re) continue
    const m = re.exec(cmd)
    if (!m) continue
    if (rule.requires && !rule.requires.every((k) => state.includes(k))) continue
    const output = rule.output.replace(/\$(\d)/g, (_, n: string) => m[Number(n)] ?? "")
    const next = rule.sets ? Array.from(new Set([...state, ...rule.sets])) : state
    return { output, state: next, matched: true }
  }
  return { output: t.fallback ?? DEFAULT_FALLBACK, state, matched: false }
}

/** Replays commands from a fresh state; used by the QA script. */
export function replay(t: CloudTerminal, commands: string[]) {
  let state: string[] = []
  const steps: { command: string; output: string; matched: boolean }[] = []
  for (const c of commands) {
    const r = runCommand(t, state, c)
    state = r.state
    steps.push({ command: c, output: r.output, matched: r.matched })
  }
  return { steps, state, transcript: steps.map((s) => s.output).join("\n") }
}
