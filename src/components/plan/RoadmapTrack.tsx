"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  Check,
  ArrowRight,
  FlaskConical,
  BookOpen,
  Clock,
  Target,
  MapPin,
} from "lucide-react"

import { CURRICULUM } from "@/lib/data/curriculum"
import { LABS } from "@/lib/data/labs"
import {
  getModuleCompletionPercent,
  getOverallProgress,
} from "@/lib/store/progress"
import { ProgressRing } from "@/components/dashboard/ProgressRing"
import { cn } from "@/lib/utils"

const PHASES = [
  { month: 1, name: "Foundations", text: "text-brand-green", dot: "bg-brand-green", soft: "bg-brand-green/10", ring: "ring-brand-green/30" },
  { month: 2, name: "Core Offensive Skills", text: "text-brand-orange", dot: "bg-brand-orange", soft: "bg-brand-orange/10", ring: "ring-brand-orange/30" },
  { month: 3, name: "Exploitation + Reporting", text: "text-brand-blue", dot: "bg-brand-blue", soft: "bg-brand-blue/10", ring: "ring-brand-blue/30" },
  { month: 4, name: "Advanced Offensive Security", text: "text-brand-purple", dot: "bg-brand-purple", soft: "bg-brand-purple/10", ring: "ring-brand-purple/30" },
] as const

type Phase = (typeof PHASES)[number]
type Status = "done" | "active" | "todo"

function labsFor(moduleId: string) {
  return LABS.filter((l) => l.moduleId === moduleId)
}

function moduleCode(id: string) {
  const m = id.match(/^m(\d+)/)
  return m ? `M${m[1].padStart(2, "0")}` : id.toUpperCase()
}

export function RoadmapTrack() {
  const [percents, setPercents] = useState<Record<string, number>>({})
  const [overall, setOverall] = useState({ percentComplete: 0 })

  useEffect(() => {
    function refresh() {
      const next: Record<string, number> = {}
      for (const m of CURRICULUM) next[m.id] = getModuleCompletionPercent(m.id)
      setPercents(next)
      setOverall(getOverallProgress())
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () =>
      window.removeEventListener("technieum:progress-changed", refresh)
  }, [])

  // The first not-yet-finished module is "you are here".
  const currentId = useMemo(() => {
    for (const m of CURRICULUM) if ((percents[m.id] ?? 0) < 100) return m.id
    return null
  }, [percents])

  const modulesDone = CURRICULUM.filter((m) => (percents[m.id] ?? 0) === 100).length

  // Flatten into an ordered list of phase headers + module nodes sharing one spine.
  const rows = useMemo(() => {
    const out: (
      | { kind: "phase"; phase: Phase }
      | { kind: "module"; phase: Phase; mod: (typeof CURRICULUM)[number] }
    )[] = []
    for (const phase of PHASES) {
      const mods = CURRICULUM.filter((m) => m.month === phase.month)
      if (mods.length === 0) continue
      out.push({ kind: "phase", phase })
      for (const mod of mods) out.push({ kind: "module", phase, mod })
    }
    return out
  }, [])

  return (
    <div className="space-y-6">
      {/* Header with overall progress */}
      <div className="hero-gradient relative overflow-hidden p-6 md:p-8">
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Your learning path
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Roadmap
            </h1>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Every module, start to finish. Self-paced — follow the path or
              jump anywhere. Finish a module to light up the next.
            </p>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{modulesDone}</span>{" "}
              of {CURRICULUM.length} modules complete
            </p>
          </div>
          <div className="shrink-0">
            <ProgressRing
              value={overall.percentComplete}
              size={128}
              strokeWidth={10}
              label="Programme"
              gradient
            />
          </div>
        </div>
      </div>

      {/* The track */}
      <div className="space-y-0">
        {rows.map((row, i) => {
          const isLast = i === rows.length - 1

          if (row.kind === "phase") {
            return (
              <div key={`phase-${row.phase.month}`} className="flex gap-4">
                <div className="flex w-10 flex-col items-center">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-tile",
                      row.phase.dot,
                    )}
                  >
                    <span className="font-mono text-sm font-bold">
                      {row.phase.month}
                    </span>
                  </span>
                  {!isLast && <div className="mt-1 w-0.5 flex-1 bg-border" />}
                </div>
                <div className="flex-1 pb-5 pt-1">
                  <p className={cn("font-mono text-[11px] font-semibold uppercase tracking-widest", row.phase.text)}>
                    Phase {row.phase.month}
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-foreground">
                    {row.phase.name}
                  </h2>
                </div>
              </div>
            )
          }

          const mod = row.mod
          const percent = percents[mod.id] ?? 0
          const status: Status =
            percent === 100 ? "done" : percent > 0 ? "active" : "todo"
          const isCurrent = mod.id === currentId
          const labs = labsFor(mod.id)
          const topicsDone = Math.round((percent / 100) * mod.topics.length)

          return (
            <div key={mod.id} className="flex gap-4">
              {/* Spine + node */}
              <div className="flex w-10 flex-col items-center">
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold shadow-chip transition-colors",
                    status === "done" &&
                      "border-brand-green bg-brand-green text-white",
                    status === "active" &&
                      "border-brand-orange bg-brand-orange/10 text-brand-orange",
                    status === "todo" &&
                      "border-border bg-card text-muted-foreground",
                    isCurrent && "ring-4 ring-brand-orange/25",
                  )}
                >
                  {status === "done" ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="font-mono text-xs">{moduleCode(mod.id)}</span>
                  )}
                </span>
                {!isLast && (
                  <div
                    className={cn(
                      "mt-1 w-0.5 flex-1",
                      status === "done" ? "bg-brand-green/50" : "bg-border",
                    )}
                  />
                )}
              </div>

              {/* Card */}
              <Link
                href={`/modules/${mod.id}`}
                className={cn(
                  "group mb-5 block flex-1 rounded-xl bg-card p-5 shadow-tile transition-all hover:-translate-y-0.5 hover:shadow-lift",
                  isCurrent && "ring-2 ring-brand-orange/30",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn("rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide", row.phase.soft, row.phase.text)}>
                        {row.phase.name}
                      </span>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-orange/10 px-2 py-0.5 text-[10px] font-semibold text-brand-orange">
                          <MapPin className="h-3 w-3" /> You are here
                        </span>
                      )}
                      {status === "done" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-green/10 px-2 py-0.5 text-[10px] font-semibold text-brand-green">
                          <Check className="h-3 w-3" /> Complete
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-tight text-foreground">
                      {mod.name}
                    </h3>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand-orange" />
                </div>

                {/* Meta */}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" /> {topicsDone}/{mod.topics.length} topics
                  </span>
                  {labs.length > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <FlaskConical className="h-3.5 w-3.5" /> {labs.length} lab{labs.length === 1 ? "" : "s"}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> ~{mod.estimatedHours}h
                  </span>
                </div>

                {/* Progress */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        status === "done" ? "bg-brand-green" : "bg-brand-orange",
                      )}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {percent}%
                  </span>
                </div>

                {/* What you'll achieve */}
                {mod.outcomes.length > 0 && (
                  <div className="mt-4 border-t border-border pt-3">
                    <p className="mb-1.5 flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      <Target className="h-3 w-3" /> What you&apos;ll achieve
                    </p>
                    <ul className="space-y-1">
                      {mod.outcomes.slice(0, 3).map((o, oi) => (
                        <li
                          key={oi}
                          className="flex items-start gap-1.5 text-xs text-muted-foreground"
                        >
                          <Check className={cn("mt-0.5 h-3 w-3 shrink-0", status === "done" ? "text-brand-green" : "text-muted-foreground/50")} />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Link>
            </div>
          )
        })}

        {/* Finish line */}
        <div className="flex gap-4">
          <div className="flex w-10 flex-col items-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-ember text-white shadow-tile">
              <Target className="h-5 w-5" />
            </span>
          </div>
          <div className="flex-1 pt-1">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Programme complete
            </h3>
            <p className="text-sm text-muted-foreground">
              Finish every module to reach Apex Operator — job-ready across the
              full offensive-security stack.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
