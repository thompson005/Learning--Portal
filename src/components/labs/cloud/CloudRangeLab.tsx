"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Check,
  Copy,
  FileCode2,
  Flag,
  HelpCircle,
  Lightbulb,
  ListChecks,
  RotateCcw,
  ShieldCheck,
  Terminal as TerminalIcon,
  X,
  Zap,
} from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { InteractiveText } from "@/components/learn/InteractiveText"
import { getProgress, getStreak, recordCheckpoint, updateLabStatus } from "@/lib/store/progress"
import { runCommand } from "@/lib/cloud/terminal"
import { runPolicyTests, type TestOutcome } from "@/lib/cloud/iam"
import type { CloudArtifact, CloudRange, CloudTask, Lab } from "@/types"

const taskKey = (labId: string, taskId: string) => `cr::${labId}::${taskId}`

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[`"'“”‘’]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.!]+$/, "")

const KIND_LABEL: Record<CloudTask["kind"], string> = {
  answer: "Question",
  choice: "Multiple choice",
  flag: "Capture the flag",
  policy: "Fix the policy",
}

// ---------------------------------------------------------------------------
// Solved-state (persisted via the shared checkpoint store, so it survives reloads
// and counts toward XP / achievements).
// ---------------------------------------------------------------------------
function useSolved(lab: Lab, tasks: CloudTask[]) {
  const [solved, setSolved] = useState<Set<string>>(new Set())

  useEffect(() => {
    function refresh() {
      const cps = getProgress().checkpoints ?? {}
      setSolved(new Set(tasks.filter((t) => cps[taskKey(lab.id, t.id)]).map((t) => t.id)))
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () => window.removeEventListener("technieum:progress-changed", refresh)
  }, [lab.id, tasks])

  const markSolved = useCallback(
    (taskId: string) => {
      const first = recordCheckpoint(taskKey(lab.id, taskId), true)
      if (first) toast.success("Objective complete! +3 XP", { icon: <Zap className="h-4 w-4" /> })
    },
    [lab.id],
  )

  return { solved, markSolved }
}

// ---------------------------------------------------------------------------
// Artifacts
// ---------------------------------------------------------------------------
function Artifacts({ items }: { items: CloudArtifact[] }) {
  const [idx, setIdx] = useState(0)
  const [copied, setCopied] = useState(false)
  const a = items[Math.min(idx, items.length - 1)]

  function copy() {
    try {
      navigator.clipboard?.writeText(a.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card/60">
      <div className="flex flex-wrap items-center gap-1 border-b border-border p-1.5">
        {items.map((it, i) => (
          <button
            key={it.name}
            onClick={() => setIdx(i)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-[11px] transition-colors",
              i === idx
                ? "bg-brand-orange/10 text-brand-orange"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <FileCode2 className="h-3 w-3" />
            {it.name}
          </button>
        ))}
      </div>
      {a.note && <p className="px-3 pt-2 text-xs text-muted-foreground">{a.note}</p>}
      <div className="relative p-3">
        <pre className="code-scroll max-h-80 overflow-auto rounded-lg bg-slate-950 p-3 font-mono text-[12px] leading-relaxed text-slate-100">
          {a.content}
        </pre>
        <button
          onClick={copy}
          aria-label="Copy artifact"
          className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-md bg-slate-800/80 px-2 py-1 font-mono text-[10px] text-slate-200 hover:bg-slate-700"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Terminal
// ---------------------------------------------------------------------------
interface Line {
  cmd?: string
  out?: string
}

function TerminalPane({ term }: { term: NonNullable<CloudRange["terminal"]> }) {
  const [lines, setLines] = useState<Line[]>(() => (term.intro ? [{ out: term.intro }] : []))
  const [state, setState] = useState<string[]>([])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [hIdx, setHIdx] = useState<number | null>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight })
  }, [lines])

  function submit() {
    const cmd = input
    if (!cmd.trim()) return
    setInput("")
    setHIdx(null)
    setHistory((h) => [...h, cmd])
    if (cmd.trim() === "clear" || cmd.trim() === "cls") {
      setLines([])
      return
    }
    const r = runCommand(term, state, cmd)
    setState(r.state)
    setLines((l) => [...l, { cmd }, ...(r.output ? [{ out: r.output }] : [])])
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      submit()
    } else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault()
      const next = hIdx === null ? history.length - 1 : Math.max(0, hIdx - 1)
      setHIdx(next)
      setInput(history[next])
    } else if (e.key === "ArrowDown" && hIdx !== null) {
      e.preventDefault()
      const next = hIdx + 1
      if (next >= history.length) {
        setHIdx(null)
        setInput("")
      } else {
        setHIdx(next)
        setInput(history[next])
      }
    }
  }

  function reset() {
    setLines(term.intro ? [{ out: term.intro }] : [])
    setState([])
    setHistory([])
    setHIdx(null)
    inputRef.current?.focus()
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-chip">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-3 py-1.5">
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
          <TerminalIcon className="h-3.5 w-3.5 text-brand-orange" /> cloud shell
          <span className="ml-1 rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400">simulated</span>
        </span>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1 font-mono text-[10px] text-slate-400 hover:text-slate-100"
          aria-label="Reset terminal"
        >
          <RotateCcw className="h-3 w-3" /> reset
        </button>
      </div>
      <div
        ref={scroller}
        onClick={() => inputRef.current?.focus()}
        className="code-scroll h-72 cursor-text overflow-y-auto p-3 font-mono text-[12px] leading-relaxed text-slate-100"
      >
        {lines.map((l, i) =>
          l.cmd !== undefined ? (
            <div key={i} className="whitespace-pre-wrap break-all">
              <span className="text-brand-orange">{term.prompt}</span> <span>{l.cmd}</span>
            </div>
          ) : (
            <div key={i} className="whitespace-pre-wrap break-words text-slate-300">
              {l.out}
            </div>
          ),
        )}
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-brand-orange">{term.prompt}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            aria-label="Terminal input"
            placeholder="type a command, or 'help'"
            className="min-w-0 flex-1 bg-transparent text-slate-100 caret-brand-orange outline-none placeholder:text-slate-600"
          />
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tasks
// ---------------------------------------------------------------------------
function TaskShell({
  index,
  task,
  solved,
  children,
}: {
  index: number
  task: CloudTask
  solved: boolean
  children: React.ReactNode
}) {
  const Icon = task.kind === "flag" ? Flag : task.kind === "policy" ? ShieldCheck : HelpCircle
  const multi = task.kind === "choice" && task.correct.length > 1
  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-colors",
        solved ? "border-brand-green/40 bg-brand-green/[0.05]" : "border-border bg-card/70",
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold",
            solved ? "bg-brand-green text-white" : "bg-brand-orange/10 text-brand-orange",
          )}
        >
          {solved ? <Check className="h-3.5 w-3.5" /> : index + 1}
        </span>
        <span className="flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          <Icon className="h-3 w-3" /> {multi ? "Select all that apply" : KIND_LABEL[task.kind]}
        </span>
      </div>
      <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">
        <InteractiveText text={task.prompt} glossary={false} />
      </p>
      <div className="mt-3">{children}</div>
      {solved && (
        <div className="mt-3 rounded-lg border border-brand-green/30 bg-background/60 p-3 text-xs leading-relaxed text-muted-foreground">
          <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-brand-green">
            Why
          </p>
          <InteractiveText text={task.explanation} glossary={false} />
        </div>
      )}
    </div>
  )
}

function TextTask({
  solved,
  onSolved,
  match,
  placeholder,
  mono,
}: {
  solved: boolean
  onSolved: () => void
  match: (v: string) => boolean
  placeholder: string
  mono?: boolean
}) {
  const [v, setV] = useState("")
  const [wrong, setWrong] = useState(0)

  function check() {
    if (!v.trim()) return
    if (match(v)) onSolved()
    else setWrong((n) => n + 1)
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <input
          value={solved ? "✓ correct" : v}
          disabled={solved}
          onChange={(e) => {
            setV(e.target.value)
            setWrong(0)
          }}
          onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder={placeholder}
          spellCheck={false}
          aria-label="Your answer"
          className={cn(
            "min-w-0 flex-1 rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-brand-orange/50 focus:ring-2 focus:ring-brand-orange/20 disabled:opacity-70",
            mono && "font-mono",
            wrong ? "border-brand-red/50" : "border-border",
          )}
        />
        <Button type="button" size="sm" onClick={check} disabled={solved || !v.trim()} className="bg-brand-orange text-white hover:bg-brand-orange/90">
          Check
        </Button>
      </div>
      {wrong > 0 && !solved && (
        <p className="mt-1.5 text-xs text-brand-red">
          Not quite{wrong > 1 ? " — try the hints below, or look closer at the artifacts and terminal output." : "."}
        </p>
      )}
    </div>
  )
}

function ChoiceTask({
  task,
  solved,
  onSolved,
}: {
  task: Extract<CloudTask, { kind: "choice" }>
  solved: boolean
  onSolved: () => void
}) {
  const [sel, setSel] = useState<number[]>([])
  const [wrong, setWrong] = useState(false)
  const multi = task.correct.length > 1

  function toggle(i: number) {
    if (solved) return
    setWrong(false)
    setSel((s) => (multi ? (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]) : [i]))
  }
  function check() {
    const a = [...sel].sort().join(",")
    const b = [...task.correct].sort().join(",")
    if (a === b) onSolved()
    else setWrong(true)
  }

  return (
    <div>
      <div className="space-y-1.5">
        {task.options.map((o, i) => {
          const picked = solved ? task.correct.includes(i) : sel.includes(i)
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              disabled={solved}
              className={cn(
                "flex w-full items-start gap-2.5 rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                picked
                  ? solved
                    ? "border-brand-green bg-brand-green/10"
                    : "border-brand-orange bg-brand-orange/[0.07]"
                  : "border-border hover:border-brand-orange/40",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border",
                  multi ? "rounded" : "rounded-full",
                  picked ? (solved ? "border-brand-green bg-brand-green text-white" : "border-brand-orange bg-brand-orange text-white") : "border-muted-foreground/40",
                )}
              >
                {picked && <Check className="h-3 w-3" />}
              </span>
              <span>{o}</span>
            </button>
          )
        })}
      </div>
      {!solved && (
        <div className="mt-2 flex items-center gap-3">
          <Button type="button" size="sm" onClick={check} disabled={!sel.length} className="bg-brand-orange text-white hover:bg-brand-orange/90">
            Check
          </Button>
          {wrong && <span className="text-xs text-brand-red">Not quite — reconsider and try again.</span>}
        </div>
      )}
    </div>
  )
}

function PolicyTask({
  task,
  solved,
  onSolved,
}: {
  task: Extract<CloudTask, { kind: "policy" }>
  solved: boolean
  onSolved: () => void
}) {
  const [text, setText] = useState(task.starter)
  const [result, setResult] = useState<
    { ok: true; outcomes: TestOutcome[]; allPass: boolean } | { ok: false; error: string } | null
  >(null)

  function run() {
    const r = runPolicyTests(task, text)
    setResult(r)
    if (r.ok && r.allPass) onSolved()
  }

  return (
    <div className="space-y-2">
      {task.fixed?.crossAccount && (
        <p className="rounded-md bg-brand-orange/[0.07] px-2 py-1 text-[11px] text-brand-orange">
          Cross-account scenario: the caller is in a different account, so both an identity allow and a resource allow are needed.
        </p>
      )}
      <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        Editing: {task.mode === "resource" ? "resource / trust policy" : `${task.mode} policy`}
      </p>
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          setResult(null)
        }}
        spellCheck={false}
        rows={Math.min(18, Math.max(8, text.split("\n").length + 1))}
        aria-label="Policy JSON"
        className="code-scroll w-full resize-y rounded-lg bg-slate-950 p-3 font-mono text-[12px] leading-relaxed text-slate-100 outline-none focus:ring-2 focus:ring-brand-orange/40"
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button type="button" size="sm" onClick={run} className="bg-brand-orange text-white hover:bg-brand-orange/90">
          <ListChecks className="h-3.5 w-3.5" /> Run tests
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="text-muted-foreground"
          onClick={() => {
            setText(task.starter)
            setResult(null)
          }}
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </Button>
        {solved && <span className="text-xs font-medium text-brand-green">All tests passed</span>}
      </div>

      {result && !result.ok && (
        <p className="rounded-md border border-brand-red/30 bg-brand-red/10 px-3 py-2 text-xs text-brand-red">{result.error}</p>
      )}
      {result && result.ok && (
        <ul className="space-y-1.5">
          {result.outcomes.map((o) => (
            <li
              key={o.name}
              className={cn(
                "flex items-start gap-2 rounded-md border px-3 py-1.5 text-xs",
                o.pass ? "border-brand-green/30 bg-brand-green/[0.06]" : "border-brand-red/30 bg-brand-red/[0.06]",
              )}
            >
              {o.pass ? <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" /> : <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-red" />}
              <span>
                <span className="font-medium text-foreground">{o.name}</span>
                <span className="block text-muted-foreground">
                  expected {o.expect}, got {o.got}
                  {!o.pass && ` — ${o.reason}`}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// The lab
// ---------------------------------------------------------------------------
export function CloudRangeLab({ lab }: { lab: Lab }) {
  const range = lab.range as CloudRange
  const tasks = range.tasks
  const { solved, markSolved } = useSolved(lab, tasks)
  const total = tasks.length
  const done = solved.size
  const allDone = done === total && total > 0
  const celebrated = useRef(false)

  // Finishing every objective completes the lab automatically.
  useEffect(() => {
    if (!allDone || celebrated.current) return
    celebrated.current = true
    if (getProgress().labs[lab.id]?.status === "completed") return
    updateLabStatus(lab.id, { status: "completed" })
    window.dispatchEvent(
      new CustomEvent("technieum:lesson-complete", {
        detail: { title: lab.title, xp: 25, streak: getStreak().current },
      }),
    )
  }, [allDone, lab.id, lab.title])

  const pct = useMemo(() => (total ? Math.round((done / total) * 100) : 0), [done, total])

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-brand-orange/25 bg-brand-orange/[0.04] p-4">
        <p className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-brand-orange">
          <Lightbulb className="h-3.5 w-3.5" /> Scenario
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground">
          <InteractiveText text={range.scenario} glossary={false} />
        </p>
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
          <span>Objectives</span>
          <span>
            {done}/{total} · auto-graded
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-gradient-ember transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Artifacts</p>
        <Artifacts items={range.artifacts} />
      </div>

      {range.terminal && (
        <div className="space-y-2">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Terminal</p>
          <TerminalPane term={range.terminal} />
        </div>
      )}

      <div className="space-y-3">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Objectives</p>
        {tasks.map((t, i) => {
          const isSolved = solved.has(t.id)
          const onSolved = () => markSolved(t.id)
          return (
            <TaskShell key={t.id} index={i} task={t} solved={isSolved}>
              {t.kind === "answer" && (
                <TextTask
                  solved={isSolved}
                  onSolved={onSolved}
                  placeholder="Type your answer"
                  match={(v) => t.accept.some((a) => norm(a) === norm(v))}
                />
              )}
              {t.kind === "flag" && (
                <TextTask
                  solved={isSolved}
                  onSolved={onSolved}
                  placeholder="FLAG{...}"
                  mono
                  match={(v) => norm(v) === norm(t.flag)}
                />
              )}
              {t.kind === "choice" && <ChoiceTask task={t} solved={isSolved} onSolved={onSolved} />}
              {t.kind === "policy" && <PolicyTask task={t} solved={isSolved} onSolved={onSolved} />}
            </TaskShell>
          )
        })}
      </div>

      {allDone && (
        <div className="rounded-xl border border-brand-green/40 bg-brand-green/[0.06] p-4">
          <p className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-brand-green">
            <ShieldCheck className="h-3.5 w-3.5" /> Range complete — key takeaways
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-foreground">
            {range.takeaways.map((k, i) => (
              <li key={i} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                <span>{k}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
