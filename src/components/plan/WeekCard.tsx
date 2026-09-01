"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ProgressBar } from "@/components/shared/ProgressBar"
import { getWeekProgress } from "@/lib/store/progress"
import { LABS } from "@/lib/data/labs"
import type { WeekPlan } from "@/types"

const MONTH_COLOR = { 1: "green", 2: "orange", 3: "blue", 4: "purple" } as const

export function WeekCard({
  week,
  stageNumber,
}: {
  week: WeekPlan
  stageNumber: number
}) {
  const [expanded, setExpanded] = useState(false)
  const [prog, setProg] = useState({ completed: 0, total: 0 })

  useEffect(() => {
    function refresh() {
      setProg(getWeekProgress(week.week))
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () =>
      window.removeEventListener("technieum:progress-changed", refresh)
  }, [week.week])

  const labsForStage = LABS.filter((l) => week.labs.includes(l.id))
  const done = prog.total > 0 && prog.completed === prog.total

  return (
    <div
      className={cn(
        "rounded-xl border bg-card transition-colors",
        done ? "border-brand-green/40 bg-brand-green/[0.03]" : "border-border",
      )}
    >
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full items-start justify-between gap-2 p-4 text-left"
      >
        <div>
          <div className="flex items-center gap-2">
            <Badge variant={MONTH_COLOR[week.month]}>Stage {stageNumber}</Badge>
            {done && <Badge variant="green">Complete</Badge>}
          </div>
          <p className="mt-1.5 text-sm font-semibold text-foreground">
            {week.theme}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            expanded && "rotate-180",
          )}
        />
      </button>

      <div className="px-4 pb-1">
        <div className="mb-2 font-mono text-[11px] text-muted-foreground">
          <span>
            {prog.completed}/{prog.total} topics
          </span>
        </div>
        <ProgressBar
          value={
            prog.total ? Math.round((prog.completed / prog.total) * 100) : 0
          }
          color={MONTH_COLOR[week.month]}
        />
      </div>

      {expanded && (
        <div className="space-y-3 border-t border-border p-4 text-sm">
          <div>
            <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Key Topics
            </p>
            <p className="text-muted-foreground">{week.keyTopics}</p>
          </div>
          <div>
            <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Labs ({labsForStage.length})
            </p>
            <ul className="list-inside list-disc space-y-0.5 text-muted-foreground">
              {labsForStage.map((l) => (
                <li key={l.id}>
                  {l.id}: {l.title}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Checkpoint
            </p>
            <p className="text-muted-foreground">{week.checkpoint}</p>
          </div>
          <div>
            <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Resources
            </p>
            <p className="text-muted-foreground">
              {week.resources.join(" · ")}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
