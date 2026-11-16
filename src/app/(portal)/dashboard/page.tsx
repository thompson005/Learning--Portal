"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  BookOpen,
  Layers,
  Target,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProgressRing } from "@/components/dashboard/ProgressRing"
import { RankBadge } from "@/components/dashboard/RankBadge"
import { AchievementsPanel } from "@/components/dashboard/AchievementsPanel"
import { StreakBadge } from "@/components/dashboard/StreakBadge"
import { EmptyState } from "@/components/shared/EmptyState"
import {
  getOverallProgress,
  getRecentActivity,
  getNextTopic,
  getLastTopic,
  getProgress,
  type RecentActivityItem,
} from "@/lib/store/progress"
import { activeCurriculum, getActiveTrack } from "@/lib/data/tracks/registry"
import { useActiveTrackId } from "@/lib/data/tracks/useTrack"

const DEFAULT_OVERALL = {
  topicsCompleted: 0,
  topicsTotal: 0,
  labsCompleted: 0,
  labsTotal: 0,
  currentWeek: 1,
  currentMonth: 1,
  percentComplete: 0,
}

export default function DashboardPage() {
  const trackId = useActiveTrackId()
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState("")
  const [overall, setOverall] = useState(DEFAULT_OVERALL)
  const [recent, setRecent] = useState<RecentActivityItem[]>([])
  const [nextTopic, setNextTopic] =
    useState<ReturnType<typeof getNextTopic>>(undefined)
  const [today, setToday] = useState("")
  const [resume, setResume] = useState<
    { moduleId: string; topicId: string; label: string } | null
  >(null)
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

      // Resume exactly where you left off: the last topic opened (if not
      // finished), else the next not-started topic.
      const lastId = getLastTopic()
      let r: { moduleId: string; topicId: string; label: string } | null = null
      if (lastId && progress.topics[lastId]?.status !== "completed") {
        for (const m of activeCurriculum()) {
          const t = m.topics.find((tp) => tp.id === lastId)
          if (t) {
            r = { moduleId: m.id, topicId: t.id, label: t.title }
            break
          }
        }
      }
      if (!r) {
        const nt = getNextTopic()
        if (nt) {
          const m = activeCurriculum().find((mm) => mm.id === nt.moduleId)
          r = { moduleId: nt.moduleId, topicId: nt.id, label: m?.shortName ?? nt.title }
        }
      }
      setResume(r)
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
  }, [trackId])

  const PHASES = useMemo(
    () =>
      getActiveTrack().phases.map((p) => {
        const topics = activeCurriculum()
          .filter((m) => m.month === p.month)
          .flatMap((m) => m.topics)
        const done = topics.filter((t) => completedTopicIds.has(t.id)).length
        return {
          label: p.name,
          done,
          total: topics.length,
          percent: topics.length ? Math.round((done / topics.length) * 100) : 0,
        }
      }),
    [completedTopicIds, trackId],
  )

  const phasesComplete = PHASES.filter((p) => p.percent === 100).length

  const nextModule = nextTopic
    ? activeCurriculum().find((m) => m.id === nextTopic.moduleId)
    : undefined
  const upNextTopic = useMemo(() => {
    if (!nextTopic) return undefined
    const mod = activeCurriculum().find((m) => m.id === nextTopic.moduleId)
    if (!mod) return undefined
    const idx = mod.topics.findIndex((t) => t.id === nextTopic.id)
    return mod.topics[idx + 1] ?? mod.topics[0]
  }, [nextTopic])

  return (
    <div className="space-y-5">
      {/* Command hero */}
      <section className="hero-gradient relative overflow-hidden p-6 md:p-8">
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {today || " "}
            </p>
            <div className="mt-2.5"><StreakBadge /></div>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              {name ? `Welcome back, ${name.split(" ")[0]}` : "Welcome back"}
            </h1>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              {nextTopic
                ? "Pick up where you left off — your next operation is ready."
                : "You've cleared the board. Revisit a lab or sharpen a skill."}
            </p>
            {resume && (
              <Button asChild size="lg" className="mt-6">
                <Link href={`/modules/${resume.moduleId}?topic=${resume.topicId}`}>
                  Resume {resume.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>

          <div className="flex shrink-0 items-center justify-center lg:pr-2">
            <ProgressRing
              value={overall.percentComplete}
              size={168}
              strokeWidth={12}
              label="Programme"
              gradient
            />
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile
          icon={<BookOpen className="h-4 w-4" />}
          value={overall.topicsCompleted}
          total={overall.topicsTotal}
          label="Topics cleared"
        />
        <StatTile
          icon={<FlaskConical className="h-4 w-4" />}
          value={overall.labsCompleted}
          total={overall.labsTotal}
          label="Labs solved"
        />
        <StatTile
          icon={<Layers className="h-4 w-4" />}
          value={phasesComplete}
          total={PHASES.length}
          label="Phases complete"
        />
        <div className="bg-card shadow-tile p-4">
          <RankBadge />
        </div>
      </section>

      {/* Continue + Up next */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="accent-bar bg-card shadow-raised p-6 lg:col-span-3">
          <div className="flex items-center gap-2 text-brand-orange">
            <Target className="h-4 w-4" />
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">
              Continue learning
            </p>
          </div>
          {nextTopic && nextModule ? (
            <>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-foreground">
                {nextTopic.title}
              </h2>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {nextModule.shortName} / Topic {nextTopic.number}
              </p>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
                {nextTopic.description}
              </p>
              <Button asChild className="mt-5">
                <Link href={`/modules/${nextModule.id}?topic=${nextTopic.id}`}>
                  Open topic <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </>
          ) : mounted ? (
            <p className="mt-4 text-sm text-muted-foreground">
              You&apos;ve worked through every topic. Nice.
            </p>
          ) : null}
        </div>

        <div className="bg-card shadow-tile p-6 lg:col-span-2">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Up next
          </p>
          {upNextTopic ? (
            <>
              <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-foreground">
                {upNextTopic.title}
              </h3>
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                {nextModule?.shortName} / Topic {upNextTopic.number}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {upNextTopic.description}
              </p>
              <Button asChild variant="outline" className="mt-5">
                <Link href={`/modules/${nextModule?.id}?topic=${upNextTopic.id}`}>
                  Preview
                </Link>
              </Button>
            </>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              Nothing queued — explore the labs or revisit anything you like.
            </p>
          )}
        </div>
      </section>

      {/* Your path */}
      <section className="bg-card shadow-tile p-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Your path
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Self-paced
          </span>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PHASES.map((phase, i) => (
            <div key={phase.label}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-mono text-[11px] text-brand-orange">
                  0{i + 1}
                </p>
                <p className="font-mono text-[11px] text-muted-foreground">
                  {phase.done}/{phase.total}
                </p>
              </div>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {phase.label}
              </p>
              <div className="shadow-inner mt-2.5 h-2 w-full overflow-hidden bg-muted">
                <div
                  className="bg-gradient-ember h-full transition-all duration-700"
                  style={{ width: `${phase.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <AchievementsPanel />

      {/* Recent activity */}
      <section className="bg-card shadow-tile p-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Recent activity
          </h2>
          <Link
            href="/progress"
            className="flex items-center gap-1 text-sm font-medium text-brand-orange hover:underline"
          >
            Full progress <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-3 divide-y divide-border">
          {recent.length > 0 ? (
            recent.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3">
                {item.kind === "topic" ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-green" />
                ) : (
                  <FlaskConical className="h-4 w-4 shrink-0 text-brand-orange" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{item.title}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {item.moduleId.toUpperCase()} /{" "}
                    {item.kind === "topic" ? "Topic" : "Lab"}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                  {new Date(item.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            ))
          ) : (
            <EmptyState
              icon={BookOpen}
              title="No activity yet"
              description="Open your first topic and it'll show up here as you go."
              actionLabel="Start learning"
              actionHref={nextModule ? `/modules/${nextModule.id}` : "/modules"}
            />
          )}
        </div>
      </section>
    </div>
  )
}

function StatTile({
  icon,
  value,
  total,
  label,
}: {
  icon: React.ReactNode
  value: number
  total: number
  label: string
}) {
  return (
    <div className="bg-card shadow-tile p-4">
      <div className="flex items-center justify-between">
        <span className="text-brand-orange">{icon}</span>
        <span className="font-mono text-[11px] text-muted-foreground">
          /{total}
        </span>
      </div>
      <p className="mt-3 font-mono text-4xl font-semibold leading-none text-foreground">
        {value}
      </p>
      <p className="mt-1.5 text-xs text-muted-foreground">{label}</p>
    </div>
  )
}
