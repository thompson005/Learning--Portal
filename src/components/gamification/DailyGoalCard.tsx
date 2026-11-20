"use client"

import { useEffect, useRef, useState } from "react"
import { Flame, Target, Minus, Plus } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { StatRing } from "@/components/gamification/StatRing"
import { CountUp } from "@/components/gamification/CountUp"
import {
  getDailyGoalProgress,
  getDailyGoal,
  setDailyGoal,
  getTodayStats,
} from "@/lib/store/gamification"
import { getStreak } from "@/lib/store/progress"

const PRESETS = [1, 3, 5, 10]

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  )
}

/** Celebratory burst — best-effort, never throws, skipped under reduced motion. */
async function celebrate() {
  if (prefersReducedMotion()) return
  try {
    const confetti = (await import("canvas-confetti")).default
    confetti({
      particleCount: 90,
      spread: 70,
      startVelocity: 38,
      origin: { y: 0.3 },
      colors: ["#e85d04", "#f0793a", "#ff9a4d", "#16a34a"],
    })
  } catch {
    // canvas-confetti unavailable — silently skip
  }
}

type Snapshot = {
  goal: ReturnType<typeof getDailyGoalProgress>
  target: number
  today: ReturnType<typeof getTodayStats>
  streak: ReturnType<typeof getStreak>
}

function read(): Snapshot {
  return {
    goal: getDailyGoalProgress(),
    target: getDailyGoal(),
    today: getTodayStats(),
    streak: getStreak(),
  }
}

/** Tiny uppercase mono label, matching the Sharp UI label convention. */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
      {children}
    </p>
  )
}

export function DailyGoalCard() {
  const [snap, setSnap] = useState<Snapshot | null>(null)
  const prevMet = useRef(false)

  // Hydration-safe: only read the client store after mount, then on every change.
  useEffect(() => {
    const refresh = () => setSnap(read())
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () => window.removeEventListener("technieum:progress-changed", refresh)
  }, [])

  // Fire confetti + toast once, on the transition into "goal met".
  useEffect(() => {
    if (!snap) return
    const met = snap.goal.met
    if (met && !prevMet.current) {
      void celebrate()
      toast.success("Daily goal met! 🎉", {
        description: `${snap.goal.done} topics today — keep the streak alive.`,
      })
    }
    prevMet.current = met
  }, [snap])

  function applyGoal(n: number) {
    setDailyGoal(n)
    // setDailyGoal doesn't emit the progress event, so refresh locally.
    setSnap(read())
  }

  // Pre-hydration skeleton — keeps SSR output stable and avoids a flash of
  // zeroes before the store is read.
  if (!snap) {
    return (
      <section
        aria-label="Daily goal"
        className="rounded-2xl border border-border bg-card p-5 shadow-tile"
      >
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-brand-orange" aria-hidden />
          <Label>Daily Goal</Label>
        </div>
        <div className="mt-4 h-[140px] animate-pulse rounded-xl bg-muted/40" />
      </section>
    )
  }

  const { goal, target, today, streak } = snap
  const met = goal.met
  const streakActive = streak.active && streak.current > 0

  return (
    <section
      aria-label="Daily goal"
      className="rounded-2xl border border-border bg-card p-5 shadow-tile"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-brand-orange" aria-hidden />
          <Label>Daily Goal</Label>
        </div>
        {met ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-brand-green/30 bg-brand-green/10 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-brand-green">
            Goal met 🎉
          </span>
        ) : (
          <span className="rounded-full border border-border bg-brand-orange/10 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-brand-orange">
            {goal.percent}%
          </span>
        )}
      </div>

      {/* Hero: ring + side stats */}
      <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
        <StatRing
          value={goal.percent}
          size={140}
          strokeWidth={12}
          gradient
          className={cn("shrink-0", met && "text-brand-green")}
        >
          <div
            className="flex flex-col items-center leading-none"
            role="img"
            aria-label={`${goal.done} of ${target} topics completed today`}
          >
            <span className="font-mono text-3xl font-semibold text-foreground">
              <CountUp value={goal.done} />
              <span className="text-muted-foreground">/{target}</span>
            </span>
            <span className="mt-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              topics today
            </span>
          </div>
        </StatRing>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-1">
          {/* XP today */}
          <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-chip">
            <Label>XP today</Label>
            <p className="mt-1 font-mono text-2xl font-semibold text-brand-orange">
              <CountUp value={today.xpToday} />
            </p>
          </div>

          {/* Streak */}
          <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-chip">
            <Label>Streak</Label>
            <div className="mt-1 flex items-center gap-2.5">
              <span
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-full",
                  streakActive
                    ? "animate-glow bg-brand-orange/10 text-brand-orange"
                    : "bg-muted/40 text-muted-foreground",
                )}
                aria-hidden
              >
                <Flame
                  className="h-5 w-5"
                  fill={streakActive ? "currentColor" : "none"}
                />
              </span>
              <div className="leading-tight">
                {streak.current > 0 ? (
                  <>
                    <p className="font-display text-xl font-semibold text-foreground">
                      <span className="font-mono">{streak.current}</span>{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        day{streak.current === 1 ? "" : "s"}
                      </span>
                    </p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      longest {streak.longest}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Start a streak today
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Goal control */}
      <div className="mt-5 border-t border-border pt-4">
        <div className="flex items-center justify-between gap-3">
          <Label>Set goal</Label>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => applyGoal(target - 1)}
              disabled={target <= 1}
              aria-label="Decrease daily goal"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-chip transition-colors hover:border-brand-orange/25 hover:text-brand-orange disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-[2.5rem] text-center font-mono text-sm font-semibold text-foreground">
              {target}
            </span>
            <button
              type="button"
              onClick={() => applyGoal(target + 1)}
              disabled={target >= 20}
              aria-label="Increase daily goal"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-chip transition-colors hover:border-brand-orange/25 hover:text-brand-orange disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((n) => {
            const selected = target === n
            return (
              <button
                key={n}
                type="button"
                onClick={() => applyGoal(n)}
                aria-pressed={selected}
                className={cn(
                  "rounded-full border px-3 py-1 font-mono text-xs font-semibold transition-colors",
                  selected
                    ? "border-brand-orange/25 bg-brand-orange/10 text-brand-orange"
                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {n} topic{n === 1 ? "" : "s"}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
