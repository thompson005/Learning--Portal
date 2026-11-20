"use client"

import { useEffect, useState } from "react"
import { LayoutGrid, List } from "lucide-react"

import { RoadmapBoard } from "@/components/plan/RoadmapBoard"
import { RoadmapTrack } from "@/components/plan/RoadmapTrack"
import { ProgressRing } from "@/components/dashboard/ProgressRing"
import { MeshGradient } from "@/components/ui3d/MeshGradient"
import { getOverallProgress, getModuleCompletionPercent } from "@/lib/store/progress"
import { activeCurriculum, getActiveTrack } from "@/lib/data/tracks/registry"
import { useActiveTrackId } from "@/lib/data/tracks/useTrack"
import { cn } from "@/lib/utils"

export default function PlanPage() {
  const trackId = useActiveTrackId()
  const [view, setView] = useState<"map" | "list">("map")
  const [percent, setPercent] = useState(0)
  const [modulesDone, setModulesDone] = useState(0)

  useEffect(() => {
    function refresh() {
      setPercent(getOverallProgress().percentComplete)
      setModulesDone(
        activeCurriculum().filter((m) => getModuleCompletionPercent(m.id) === 100)
          .length,
      )
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () =>
      window.removeEventListener("technieum:progress-changed", refresh)
  }, [trackId])

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-10">
        <MeshGradient />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Your learning path
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {getActiveTrack().name}
            </h1>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              The whole {getActiveTrack().name} path at a glance. Follow it left
              to right, or jump to any module. Finish one to light up the next.
            </p>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">
                {modulesDone}
              </span>{" "}
              of {activeCurriculum().length} modules complete
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
      </section>

      {/* View toggle */}
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {view === "map" ? "Map view" : "Detailed list"}
        </p>
        <div className="glass inline-flex rounded-xl p-1">
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
