"use client"

import { cn } from "@/lib/utils"
import { WeekCard } from "@/components/plan/WeekCard"
import { WEEKLY_PLAN } from "@/lib/data/weeklyPlan"

// The four learning phases, in suggested order. There is no schedule — a learner
// can move through these as fast as they like, and revisit in any order.
const PHASES = [
  { month: 1, name: "Foundations", color: "bg-brand-green", dot: "green" },
  {
    month: 2,
    name: "Core Offensive Skills",
    color: "bg-brand-orange",
    dot: "orange",
  },
  {
    month: 3,
    name: "Exploitation + Reporting",
    color: "bg-brand-blue",
    dot: "blue",
  },
  {
    month: 4,
    name: "Advanced Offensive Security",
    color: "bg-brand-purple",
    dot: "purple",
  },
] as const

export default function PlanPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Suggested Order
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Learning Roadmap
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A suggested path through the whole programme — self-paced, no
          deadlines. Work through it as fast as you like, jump to whatever
          interests you, and revisit anything anytime.
        </p>
      </div>

      <div className="space-y-8">
        {PHASES.map((phase, i) => {
          const stages = WEEKLY_PLAN.filter((w) => w.month === phase.month)
          if (stages.length === 0) return null
          return (
            <div key={phase.month} className="space-y-3">
              <div className="flex items-center gap-2.5 border-b border-border pb-2.5">
                <span className={cn("h-2 w-2 rounded-full", phase.color)} />
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Phase {i + 1}
                </span>
                <span className="font-display text-2xl font-semibold text-foreground">
                  {phase.name}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                {stages.map((w, si) => (
                  <WeekCard key={w.week} week={w} stageNumber={si + 1} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
