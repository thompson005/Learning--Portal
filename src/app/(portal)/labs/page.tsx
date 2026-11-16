"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Search,
  CheckCircle2,
  Clock,
  Circle,
  Zap,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { ProgressRing } from "@/components/dashboard/ProgressRing"
import { LabCard } from "@/components/labs/LabCard"
import { LabFilters, type LabFilterState } from "@/components/labs/LabFilters"
import { activeLabs, activeCurriculum } from "@/lib/data/tracks/registry"
import { useActiveTrackId } from "@/lib/data/tracks/useTrack"
import { getProgress } from "@/lib/store/progress"
import { XP_PER_LAB } from "@/lib/store/gamification"

const STAT_COLOR = {
  green: "text-brand-green",
  orange: "text-brand-orange",
  red: "text-brand-red",
  purple: "text-brand-purple",
} as const

const PHASE_ACCENT = {
  1: "text-brand-green",
  2: "text-brand-orange",
  3: "text-brand-blue",
  4: "text-brand-purple",
} as const
const PHASE_BAR = {
  1: "bg-brand-green",
  2: "bg-brand-orange",
  3: "bg-brand-blue",
  4: "bg-brand-purple",
} as const

function StatTile({
  icon: Icon,
  color,
  value,
  label,
}: {
  icon: LucideIcon
  color: keyof typeof STAT_COLOR
  value: number | string
  label: string
}) {
  return (
    <div className="bg-card p-4 text-center shadow-tile">
      <Icon className={cn("mx-auto h-5 w-5", STAT_COLOR[color])} />
      <p
        className={cn(
          "mt-1.5 font-display text-2xl font-bold",
          STAT_COLOR[color],
        )}
      >
        {value}
      </p>
      <p className="mt-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  )
}

export default function LabsPage() {
  const [filters, setFilters] = useState<LabFilterState>({
    moduleId: "all",
    difficulty: "all",
    status: "all",
  })
  const [search, setSearch] = useState("")
  const [statusMap, setStatusMap] = useState<Record<string, string>>({})
  const trackId = useActiveTrackId()

  useEffect(() => {
    function refresh() {
      const progress = getProgress()
      const map: Record<string, string> = {}
      activeLabs().forEach((l) => {
        map[l.id] = progress.labs[l.id]?.status ?? "not_started"
      })
      setStatusMap(map)
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () =>
      window.removeEventListener("technieum:progress-changed", refresh)
  }, [trackId])

  const moduleName = (id: string) =>
    activeCurriculum().find((m) => m.id === id)?.shortName ?? id
  const modules = useMemo(
    () =>
      activeCurriculum().filter((m) => activeLabs().some((l) => l.moduleId === m.id)).map(
        (m) => ({ id: m.id, shortName: m.shortName }),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trackId],
  )

  const filtered = activeLabs().filter((lab) => {
    if (filters.moduleId !== "all" && lab.moduleId !== filters.moduleId)
      return false
    if (filters.difficulty !== "all" && lab.difficulty !== filters.difficulty)
      return false
    if (filters.status !== "all" && statusMap[lab.id] !== filters.status)
      return false
    if (search && !lab.title.toLowerCase().includes(search.toLowerCase()))
      return false
    return true
  })

  const completed = Object.values(statusMap).filter(
    (s) => s === "completed",
  ).length
  const inProgress = Object.values(statusMap).filter(
    (s) => s === "in_progress",
  ).length
  const remaining = activeLabs().length - completed - inProgress
  const dockerCount = activeLabs().filter((l) => l.dockerImage).length
  const percent =
    activeLabs().length === 0 ? 0 : Math.round((completed / activeLabs().length) * 100)
  const xpEarned = completed * XP_PER_LAB
  const xpTotal = activeLabs().length * XP_PER_LAB

  // Group the filtered labs under their module, in curriculum order, so the
  // page reads as an organized track rather than one long flat list.
  const grouped = activeCurriculum().map((m) => ({
    module: m,
    labs: filtered.filter((l) => l.moduleId === m.id),
    allLabs: activeLabs().filter((l) => l.moduleId === m.id),
  })).filter((g) => g.labs.length > 0)

  return (
    <div className="space-y-6">
      <div className="hero-gradient relative overflow-hidden p-6 md:p-8">
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-orange">
              Hands-On Labs
            </p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Labs
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {activeLabs().length} hands-on labs · {dockerCount} with a live Docker
              target · {xpTotal.toLocaleString()} XP up for grabs
            </p>
          </div>
          <ProgressRing
            value={percent}
            size={120}
            strokeWidth={10}
            label="Labs Complete"
            gradient
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile
            icon={CheckCircle2}
            color="green"
            value={completed}
            label="Completed"
          />
          <StatTile
            icon={Clock}
            color="orange"
            value={inProgress}
            label="In Progress"
          />
          <StatTile
            icon={Circle}
            color="red"
            value={remaining}
            label="Remaining"
          />
          <StatTile
            icon={Zap}
            color="purple"
            value={xpEarned.toLocaleString()}
            label="XP Earned"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search labs by title..."
              className="pl-9"
            />
          </div>
          <LabFilters
            filters={filters}
            onChange={setFilters}
            modules={modules}
          />
        </div>
      </div>

      {grouped.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No labs match these filters.
        </p>
      ) : (
        <div className="space-y-8">
          {grouped.map(({ module: m, labs, allLabs }) => {
            const done = allLabs.filter(
              (l) => statusMap[l.id] === "completed",
            ).length
            const pct = allLabs.length
              ? Math.round((done / allLabs.length) * 100)
              : 0
            return (
              <section key={m.id} className="space-y-3">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-border pb-2.5">
                  <span
                    className={cn(
                      "font-mono text-xs font-semibold uppercase tracking-widest",
                      PHASE_ACCENT[m.month],
                    )}
                  >
                    {m.shortName}
                  </span>
                  <span className="font-display text-lg font-semibold text-foreground">
                    {m.name}
                  </span>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full", PHASE_BAR[m.month])}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {done}/{allLabs.length}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  {labs.map((lab) => (
                    <LabCard
                      key={lab.id}
                      lab={lab}
                      moduleName={moduleName(lab.moduleId)}
                    />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
