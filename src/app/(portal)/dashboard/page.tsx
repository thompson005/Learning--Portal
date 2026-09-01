"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  BookOpen,
  CalendarDays,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProgressRing } from "@/components/dashboard/ProgressRing"
import { RankBadge } from "@/components/dashboard/RankBadge"
import { AchievementsPanel } from "@/components/dashboard/AchievementsPanel"
import {
  getOverallProgress,
  getRecentActivity,
  getNextTopic,
  getProgress,
  type RecentActivityItem,
} from "@/lib/store/progress"
import { CURRICULUM } from "@/lib/data/curriculum"
import { LABS } from "@/lib/data/labs"

// The four learning phases, in suggested order — not a schedule. Each maps to a
// module `month` group purely for ordering; there are no weeks or deadlines.
const PHASE_DEFS = [
  { label: "Foundations", month: 1 },
  { label: "Core Offensive Skills", month: 2 },
  { label: "Exploitation + Reporting", month: 3 },
  { label: "Advanced Offensive Security", month: 4 },
] as const

const DEFAULT_OVERALL = {
  topicsCompleted: 0,
  topicsTotal: CURRICULUM.flatMap((m) => m.topics).length,
  labsCompleted: 0,
  labsTotal: LABS.length,
  currentWeek: 1,
  currentMonth: 1,
  percentComplete: 0,
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState("")
  const [overall, setOverall] = useState(DEFAULT_OVERALL)
  const [recent, setRecent] = useState<RecentActivityItem[]>([])
  const [nextTopic, setNextTopic] =
    useState<ReturnType<typeof getNextTopic>>(undefined)
  const [today, setToday] = useState("")
  const [completedTopicIds, setCompletedTopicIds] = useState<Set<string>>(
    new Set(),
  )

  useEffect(() => {
    function refresh() {
      const progress = getProgress()
      setName(progress.name)
      setOverall(getOverallProgress())
      setRecent(getRecentActivity(4))
      setNextTopic(getNextTopic())
      setCompletedTopicIds(
        new Set(
          Object.entries(progress.topics)
            .filter(([, tp]) => tp.status === "completed")
            .map(([id]) => id),
        ),
      )
    }
    refresh()
    setToday(
      new Date().toLocaleDateString(undefined, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    )
    setMounted(true)
    window.addEventListener("technieum:progress-changed", refresh)
    return () =>
      window.removeEventListener("technieum:progress-changed", refresh)
  }, [])

  const PHASES = useMemo(
    () =>
      PHASE_DEFS.map((p) => {
        const topics = CURRICULUM.filter((m) => m.month === p.month).flatMap(
          (m) => m.topics,
        )
        const done = topics.filter((t) => completedTopicIds.has(t.id)).length
        return {
          label: p.label,
          percent: topics.length ? Math.round((done / topics.length) * 100) : 0,
        }
      }),
    [completedTopicIds],
  )

  const nextModule = nextTopic
    ? CURRICULUM.find((m) => m.id === nextTopic.moduleId)
    : undefined
  const upNextTopic = useMemo(() => {
    if (!nextTopic) return undefined
    const mod = CURRICULUM.find((m) => m.id === nextTopic.moduleId)
    if (!mod) return undefined
    const idx = mod.topics.findIndex((t) => t.id === nextTopic.id)
    return mod.topics[idx + 1] ?? mod.topics[0]
  }, [nextTopic])

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {today}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Welcome back{name ? `, ${name.split(" ")[0]}.` : "."}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Keep building. One topic at a time.
          </p>
        </div>
        <div className="flex items-center gap-3 lg:shrink-0">
          <div className="text-right">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Complete
            </p>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-gradient-ember text-7xl font-bold leading-none md:text-8xl">
              {overall.percentComplete}
            </span>
            <span className="font-mono text-lg text-muted-foreground">%</span>
          </div>
        </div>
      </div>

      {/* Phase progress — self-paced, no schedule */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Your Path — Go at Your Own Pace
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((phase, i) => (
            <div
              key={phase.label}
              className="rounded-lg border border-border bg-muted/20 p-3"
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Phase {i + 1}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">
                {phase.label}
              </p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-purple transition-all duration-500"
                  style={{ width: `${phase.percent}%` }}
                />
              </div>
              <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                {phase.percent}% complete
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Continue learning */}
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-brand-orange">
            Continue Learning
          </p>
          {nextTopic && nextModule ? (
            <>
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                {nextModule.shortName} · Topic {nextTopic.number}
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
                {nextTopic.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {nextTopic.description}
              </p>
              <Button
                asChild
                variant="teal"
                className="mt-4 bg-brand-ink text-white hover:bg-brand-ink/90"
              >
                <Link href={`/modules/${nextModule.id}`}>
                  Continue Topic <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </>
          ) : mounted ? (
            <p className="mt-3 text-sm text-muted-foreground">
              You&apos;ve worked through every topic. Nice.
            </p>
          ) : null}
        </div>

        {/* Progress overview */}
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Progress Overview
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-6">
            <ProgressRing
              value={overall.percentComplete}
              size={128}
              strokeWidth={10}
              label="Programme Complete"
              gradient
            />
            <div className="flex-1 space-y-3 text-sm">
              <div className="flex items-center gap-2.5">
                <BookOpen className="h-4 w-4 shrink-0 text-brand-orange" />
                <span className="font-semibold">
                  {overall.topicsCompleted}{" "}
                  <span className="text-muted-foreground">
                    / {overall.topicsTotal}
                  </span>
                </span>
                <span className="text-xs text-muted-foreground">
                  Topics Completed
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <FlaskConical className="h-4 w-4 shrink-0 text-brand-purple" />
                <span className="font-semibold">
                  {overall.labsCompleted}{" "}
                  <span className="text-muted-foreground">
                    / {overall.labsTotal}
                  </span>
                </span>
                <span className="text-xs text-muted-foreground">
                  Labs Completed
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CalendarDays className="h-4 w-4 shrink-0 text-brand-blue" />
                <span className="font-semibold">
                  {PHASES.filter((p) => p.percent === 100).length}{" "}
                  <span className="text-muted-foreground">
                    / {PHASES.length}
                  </span>
                </span>
                <span className="text-xs text-muted-foreground">
                  Phases Complete
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <RankBadge />
          </div>
          <Link
            href="/progress"
            className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-orange hover:underline"
          >
            View full progress <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <AchievementsPanel />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Recent activity */}
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Recent Activity
          </p>
          <div className="mt-3 divide-y divide-border">
            {recent.length > 0 ? (
              recent.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-2.5">
                  {item.kind === "topic" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-green" />
                  ) : (
                    <FlaskConical className="h-4 w-4 shrink-0 text-brand-orange" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {item.moduleId.toUpperCase()} ·{" "}
                      {item.kind === "topic" ? "Topic" : "Lab"}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {new Date(item.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              ))
            ) : (
              <p className="py-2.5 text-sm text-muted-foreground">
                No activity yet — start your first topic to see it here.
              </p>
            )}
          </div>
          <Link
            href="/progress"
            className="mt-3 flex items-center gap-1 text-sm font-medium text-brand-orange hover:underline"
          >
            View all activity <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Up next */}
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Up Next
          </p>
          {upNextTopic ? (
            <>
              <h3 className="mt-3 font-display text-xl font-semibold text-foreground">
                {upNextTopic.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {nextModule?.shortName} · Topic {upNextTopic.number}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {upNextTopic.description}
              </p>
              <Button asChild variant="outline" className="mt-4">
                <Link href={`/modules/${nextModule?.id}`}>
                  Preview Topic <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              You&apos;ve worked through every topic. Explore the labs or
              revisit anything you like.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
