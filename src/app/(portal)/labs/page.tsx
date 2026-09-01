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
import { LABS } from "@/lib/data/labs"
import { CURRICULUM } from "@/lib/data/curriculum"
import { getProgress } from "@/lib/store/progress"
import { XP_PER_LAB } from "@/lib/store/gamification"

const STAT_COLOR = {
  green: "text-brand-green",
  orange: "text-brand-orange",
  red: "text-brand-red",
  purple: "text-brand-purple",
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
    <div className="rounded-lg border border-border bg-muted/20 p-4 text-center">
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

  useEffect(() => {
    function refresh() {
      const progress = getProgress()
      const map: Record<string, string> = {}
      LABS.forEach((l) => {
        map[l.id] = progress.labs[l.id]?.status ?? "not_started"
      })
      setStatusMap(map)
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () =>
      window.removeEventListener("technieum:progress-changed", refresh)
  }, [])

  const moduleName = (id: string) =>
    CURRICULUM.find((m) => m.id === id)?.shortName ?? id
  const modules = useMemo(
    () =>
      CURRICULUM.filter((m) => LABS.some((l) => l.moduleId === m.id)).map(
        (m) => ({ id: m.id, shortName: m.shortName }),
      ),
    [],
  )

  const filtered = LABS.filter((lab) => {
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
  const remaining = LABS.length - completed - inProgress
  const dockerCount = LABS.filter((l) => l.dockerImage).length
  const percent =
    LABS.length === 0 ? 0 : Math.round((completed / LABS.length) * 100)
  const xpEarned = completed * XP_PER_LAB
  const xpTotal = LABS.length * XP_PER_LAB

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-orange">
              Hands-On Labs
            </p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Labs Tracker
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {LABS.length} hands-on labs · {dockerCount} run live in Docker ·{" "}
              {xpTotal.toLocaleString()} XP up for grabs
            </p>
          </div>
          <ProgressRing
            value={percent}
            size={104}
            strokeWidth={9}
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

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No labs match these filters.
          </p>
        ) : (
          filtered.map((lab) => (
            <LabCard
              key={lab.id}
              lab={lab}
              moduleName={moduleName(lab.moduleId)}
            />
          ))
        )}
      </div>
    </div>
  )
}
