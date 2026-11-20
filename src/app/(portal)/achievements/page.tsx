"use client"

import { useEffect, useMemo, useState } from "react"
import * as Icons from "lucide-react"
import { Lock, Trophy } from "lucide-react"

import { cn } from "@/lib/utils"
import { MeshGradient } from "@/components/ui3d/MeshGradient"
import { Reveal } from "@/components/ui3d/Reveal"
import { getAchievements, type Achievement } from "@/lib/store/gamification"

type Filter = "all" | "unlocked" | "locked" | string

const TIER_ORDER = ["bronze", "silver", "gold", "platinum"] as const

/** Medal/ring accent per tier. Gold = brand accent, platinum = violet→orange. */
function tierStyle(tier?: Achievement["tier"]): {
  background: string
  ring: string
  text: string
} {
  switch (tier) {
    case "bronze":
      return { background: "#b06b2e22", ring: "#b06b2e", text: "#b06b2e" }
    case "silver":
      return { background: "#8b94a322", ring: "#8b94a3", text: "#6b7280" }
    case "platinum":
      return {
        background: "linear-gradient(135deg,#8E44AD,#E8792A)",
        ring: "#8E44AD",
        text: "#8E44AD",
      }
    case "gold":
    default:
      return {
        background: "hsl(var(--primary) / 0.14)",
        ring: "hsl(var(--primary))",
        text: "hsl(var(--primary))",
      }
  }
}

export default function AchievementsPage() {
  const [mounted, setMounted] = useState(false)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [filter, setFilter] = useState<Filter>("all")

  useEffect(() => {
    function refresh() {
      setAchievements(getAchievements())
    }
    refresh()
    setMounted(true)
    window.addEventListener("technieum:progress-changed", refresh)
    return () =>
      window.removeEventListener("technieum:progress-changed", refresh)
  }, [])

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const total = achievements.length
  const overallPercent = total ? Math.round((unlockedCount / total) * 100) : 0

  const groups = useMemo(() => {
    const seen = new Set<string>()
    const ordered: string[] = []
    for (const a of achievements) {
      if (a.group && !seen.has(a.group)) {
        seen.add(a.group)
        ordered.push(a.group)
      }
    }
    return ordered
  }, [achievements])

  const chips = useMemo(
    () => [
      { key: "all", label: "All", count: total },
      { key: "unlocked", label: "Unlocked", count: unlockedCount },
      { key: "locked", label: "Locked", count: total - unlockedCount },
      ...groups.map((g) => ({
        key: g,
        label: g,
        count: achievements.filter((a) => a.group === g).length,
      })),
    ],
    [groups, achievements, total, unlockedCount],
  )

  const visible = useMemo(() => {
    const matches = achievements.filter((a) => {
      if (filter === "all") return true
      if (filter === "unlocked") return a.unlocked
      if (filter === "locked") return !a.unlocked
      return a.group === filter
    })
    // Unlocked first, then by tier richness, then title.
    return [...matches].sort((a, b) => {
      if (a.unlocked !== b.unlocked) return a.unlocked ? -1 : 1
      const ta = TIER_ORDER.indexOf((a.tier ?? "gold") as never)
      const tb = TIER_ORDER.indexOf((b.tier ?? "gold") as never)
      if (ta !== tb) return tb - ta
      return a.title.localeCompare(b.title)
    })
  }, [achievements, filter])

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-8">
        <MeshGradient />
        <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Trophy Case
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
              Achievements
            </h1>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Every badge you&apos;ve earned on the programme — and the ones
              still waiting to be unlocked.
            </p>
          </div>

          <div className="w-full max-w-sm shrink-0">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-4xl font-semibold leading-none text-foreground">
                {unlockedCount}
                <span className="text-muted-foreground"> / {total}</span>
              </span>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-brand-orange">
                {overallPercent}% unlocked
              </span>
            </div>
            <div
              className="shadow-inner mt-3 h-2 w-full overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={unlockedCount}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-label={`${unlockedCount} of ${total} achievements unlocked`}
            >
              <div
                className="bg-gradient-ember h-full rounded-full transition-all duration-700"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter achievements">
        {chips.map((chip) => {
          const active = filter === chip.key
          return (
            <button
              key={chip.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(chip.key)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "border-brand-orange bg-brand-orange text-white"
                  : "border-border bg-card text-muted-foreground hover:border-brand-orange/25 hover:text-foreground",
              )}
            >
              {chip.label}
              <span
                className={cn(
                  "font-mono text-[11px]",
                  active ? "text-white/80" : "text-muted-foreground/70",
                )}
              >
                {chip.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((a, i) => (
            <Reveal key={a.id} delay={Math.min(i, 10) * 40} className="h-full">
              <BadgeCard a={a} />
            </Reveal>
          ))}
        </div>
      ) : mounted ? (
        <div className="glass rounded-2xl p-10 text-center">
          <Trophy className="mx-auto h-6 w-6 text-muted-foreground/60" aria-hidden="true" />
          <p className="mt-3 text-sm text-muted-foreground">
            Nothing here yet for this filter.
          </p>
        </div>
      ) : null}
    </div>
  )
}

function BadgeCard({ a }: { a: Achievement }) {
  const Icon = (Icons as Record<string, any>)[a.icon ?? "Trophy"] ?? Icons.Trophy
  const tier = tierStyle(a.tier)
  const hasProgress =
    !a.unlocked && typeof a.current === "number" && typeof a.target === "number"
  const percent = hasProgress
    ? Math.min(100, Math.round(((a.current as number) / (a.target as number)) * 100))
    : 0

  return (
    <div
      className={cn(
        "glass lift relative flex h-full flex-col items-center overflow-hidden rounded-2xl p-5 text-center",
        a.unlocked ? "badge-shine" : "opacity-60",
      )}
    >
      {/* Tier-colored circular icon */}
      <div
        className="relative flex h-16 w-16 items-center justify-center rounded-full"
        style={{
          background: a.unlocked ? tier.background : "hsl(var(--muted))",
          boxShadow: a.unlocked ? `inset 0 0 0 2px ${tier.ring}` : "none",
        }}
      >
        <Icon
          className="h-7 w-7"
          style={{ color: a.unlocked ? tier.text : undefined }}
          aria-hidden="true"
        />
        {!a.unlocked && (
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-background/50">
            <Lock className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          </span>
        )}
      </div>

      <p className="mt-3.5 text-sm font-semibold leading-tight text-foreground">
        {a.title}
      </p>
      {a.tier && (
        <p
          className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-widest"
          style={{ color: a.unlocked ? tier.text : undefined }}
        >
          <span className={cn(!a.unlocked && "text-muted-foreground")}>
            {a.tier}
          </span>
        </p>
      )}
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {a.description}
      </p>

      {hasProgress && (
        <div className="mt-3 w-full">
          <div
            className="shadow-inner h-1.5 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={a.current}
            aria-valuemin={0}
            aria-valuemax={a.target}
            aria-label={`${a.title} progress`}
          >
            <div
              className="bg-gradient-ember h-full rounded-full transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="mt-1.5 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
            <span>
              {a.current}/{a.target}
            </span>
            <span>{percent}%</span>
          </div>
        </div>
      )}

      {a.unlocked && (
        <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-brand-orange/25 bg-brand-orange/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-brand-orange">
          <Trophy className="h-3 w-3" aria-hidden="true" /> Unlocked
        </span>
      )}
    </div>
  )
}
