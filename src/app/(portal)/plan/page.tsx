"use client"

import { useEffect, useState } from "react"
import { LayoutGrid, List } from "lucide-react"

import { RoadmapBoard } from "@/components/plan/RoadmapBoard"
import { RoadmapTrack } from "@/components/plan/RoadmapTrack"
import { ProgressRing } from "@/components/dashboard/ProgressRing"
import { getOverallProgress } from "@/lib/store/progress"
import { CURRICULUM } from "@/lib/data/curriculum"
import { getModuleCompletionPercent } from "@/lib/store/progress"
import { cn } from "@/lib/utils"

export default function PlanPage() {
  const [view, setView] = useState<"map" | "list">("map")
  const [percent, setPercent] = useState(0)
  const [modulesDone, setModulesDone] = useState(0)

  useEffect(() => {
    function refresh() {
      setPercent(getOverallProgress().percentComplete)
      setModulesDone(
        CURRICULUM.filter((m) => getModuleCompletionPercent(m.id) === 100)
          .length,
      )
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () =>
      window.removeEventListener("technieum:progress-changed", refresh)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
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
              The whole programme at a glance. Follow the path left to right, or
              jump to any module. Finish one to light up the next.
            </p>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">
                {modulesDone}
              </span>{" "}
              of {CURRICULUM.length} modules complete
            </p>
          </div>
          <div className="shrink-0">
            <ProgressRing
              value={percent}
              size={120}
              strokeWidth={10}
              label="Programme"
              gradient
            />
          </div>
        </div>
      </div>

      {/* View toggle */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {view === "map" ? "Map view" : "Detailed list"}
        </p>
        <div className="inline-flex rounded-lg bg-card p-1 shadow-chip">
          <button
            onClick={() => setView("map")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              view === "map"
                ? "bg-brand-orange/10 text-brand-orange"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" /> Map
          </button>
          <button
            onClick={() => setView("list")}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              view === "list"
                ? "bg-brand-orange/10 text-brand-orange"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <List className="h-3.5 w-3.5" /> List
          </button>
        </div>
      </div>

      {view === "map" ? <RoadmapBoard /> : <RoadmapTrack showHeader={false} />}
    </div>
  )
}
