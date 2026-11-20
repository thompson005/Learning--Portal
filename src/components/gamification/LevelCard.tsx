"use client"

import { useEffect, useState } from "react"
import { ChevronsUp, Sparkles, Zap } from "lucide-react"

import { CountUp } from "@/components/gamification/CountUp"
import { getXp, getLevel, getRank } from "@/lib/store/gamification"
import type { LevelInfo } from "@/lib/store/gamification"

interface Snapshot {
  xp: number
  level: LevelInfo
  rank: ReturnType<typeof getRank>
}

function read(): Snapshot {
  const xp = getXp()
  return { xp, level: getLevel(xp), rank: getRank(xp) }
}

/** Bold "Level" hero card — big numeric level, rank name, an animated XP bar
 *  toward the next level, and total XP. Presentational client component that
 *  re-reads the gamification store on mount and on `technieum:progress-changed`. */
export function LevelCard() {
  // Deterministic zero state on first render to keep SSR/CSR markup in sync;
  // real values load in the mount effect below.
  const [snap, setSnap] = useState<Snapshot>(() => ({
    xp: 0,
    level: { level: 1, xp: 0, xpIntoLevel: 0, xpForLevel: 0, progress: 0, xpToNext: 0 },
    rank: { current: { name: "Recruit", minXp: 0 }, next: null, progressToNext: 0 },
  }))

  useEffect(() => {
    const refresh = () => setSnap(read())
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () => window.removeEventListener("technieum:progress-changed", refresh)
  }, [])

  const { xp, level, rank } = snap
  const progress = Math.max(0, Math.min(100, level.progress))

  return (
    <div className="hero-gradient relative overflow-hidden rounded-2xl border border-border bg-card shadow-raised">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative flex flex-col gap-6 p-6 sm:p-8">
        {/* Header: label + total XP */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-brand-orange/25 bg-brand-orange/10">
              <Zap className="h-4 w-4 text-brand-orange" />
            </span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Level
            </span>
          </div>
          <div className="text-right">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Total XP
            </div>
            <CountUp
              value={xp}
              className="font-mono text-sm font-semibold text-foreground"
              format={(n) => `${n.toLocaleString()} XP`}
            />
          </div>
        </div>

        {/* Big level number + rank pill */}
        <div className="flex items-end gap-5">
          <CountUp
            value={level.level}
            duration={1100}
            className="text-gradient-ember font-display text-6xl font-semibold leading-none sm:text-7xl"
          />
          <div className="flex flex-col gap-2 pb-1">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-brand-orange/25 bg-brand-orange/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-brand-orange-strong">
              <Sparkles className="h-3.5 w-3.5" />
              {rank.current.name}
            </span>
            {rank.next && (
              <span className="font-mono text-[11px] text-muted-foreground">
                Next rank: {rank.next.name}
              </span>
            )}
          </div>
        </div>

        {/* XP bar toward next level */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {level.xpIntoLevel.toLocaleString()}/{level.xpForLevel.toLocaleString()} XP
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-brand-orange-strong">
              <ChevronsUp className="h-3.5 w-3.5" />
              {level.xpToNext.toLocaleString()} XP to level {level.level + 1}
            </span>
          </div>
          <div
            className="h-3 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progress to level ${level.level + 1}`}
          >
            <div
              className="bg-gradient-ember h-full rounded-full shadow-tile transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
