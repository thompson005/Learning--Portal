"use client"

import { useEffect, useState } from "react"
import { Award, Check, ChevronRight, Lock, Trophy } from "lucide-react"

import { CountUp } from "@/components/gamification/CountUp"
import { RANKS, getXp, getRank } from "@/lib/store/gamification"
import type { Rank } from "@/lib/store/gamification"

interface Snapshot {
  xp: number
  rank: ReturnType<typeof getRank>
}

function read(): Snapshot {
  const xp = getXp()
  return { xp, rank: getRank(xp) }
}

type RowState = "achieved" | "current" | "locked"

/** "Your Standing" — the 8 named ranks as a vertical progression track with the
 *  current rank highlighted, XP thresholds, achieved vs locked state, and the XP
 *  remaining to the next rank. Presentational client component that re-reads the
 *  gamification store on mount and on `technieum:progress-changed`. */
export function RankLadder() {
  // Deterministic zero state keeps SSR/CSR markup in sync; real values load in
  // the mount effect below.
  const [snap, setSnap] = useState<Snapshot>(() => ({
    xp: 0,
    rank: { current: RANKS[0], next: RANKS[1] ?? null, progressToNext: 0 },
  }))

  useEffect(() => {
    const refresh = () => setSnap(read())
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () => window.removeEventListener("technieum:progress-changed", refresh)
  }, [])

  const { xp, rank } = snap
  const atMax = rank.next === null
  const progress = Math.max(0, Math.min(100, rank.progressToNext))
  const xpToGo = rank.next ? Math.max(0, rank.next.minXp - xp) : 0

  // Highest rank at the top so the ladder reads as a climb.
  const rows = [...RANKS].reverse()

  const stateFor = (r: Rank): RowState => {
    if (r.minXp === rank.current.minXp) return "current"
    return xp >= r.minXp ? "achieved" : "locked"
  }

  return (
    <div className="glass rounded-2xl p-6 sm:p-7">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-brand-orange/25 bg-brand-orange/10">
            <Award className="h-4 w-4 text-brand-orange" />
          </span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Your Standing
          </span>
        </div>
        <div className="text-right">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Rank
          </div>
          <div className="font-display text-sm font-semibold text-foreground">
            {rank.current.name}
          </div>
        </div>
      </div>

      {/* Next-rank callout / max-rank celebration */}
      {atMax ? (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-brand-orange/25 bg-brand-orange/10 p-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-ember shadow-tile">
            <Trophy className="h-4 w-4 text-white" />
          </span>
          <div className="min-w-0">
            <div className="font-display text-sm font-semibold text-brand-orange-strong">
              Top rank reached
            </div>
            <div className="font-mono text-[11px] text-muted-foreground">
              {rank.current.name} — the summit of the ladder.
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 flex flex-col gap-2 rounded-xl border border-border bg-brand-orange/[0.06] p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand-orange-strong">
              <ChevronRight className="h-3.5 w-3.5" />
              Next: {rank.next?.name}
            </span>
            <span className="font-mono text-[11px] font-semibold text-foreground">
              <CountUp value={xpToGo} format={(n) => `${n.toLocaleString()} XP to go`} />
            </span>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progress to ${rank.next?.name}`}
          >
            <div
              className="bg-gradient-ember h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Ladder */}
      <ol className="relative flex flex-col">
        {rows.map((r, i) => (
          <LadderRow
            key={r.name}
            rank={r}
            state={stateFor(r)}
            isFirst={i === 0}
            isLast={i === rows.length - 1}
          />
        ))}
      </ol>
    </div>
  )
}

function LadderRow({
  rank,
  state,
  isFirst,
  isLast,
}: {
  rank: Rank
  state: RowState
  isFirst: boolean
  isLast: boolean
}) {
  const current = state === "current"
  const achieved = state === "achieved"

  return (
    <li
      className={[
        "relative flex items-center gap-4 rounded-xl px-3 py-3 transition-colors",
        current
          ? "border border-brand-orange/25 bg-brand-orange/[0.06] ring-1 ring-brand-orange/25"
          : "border border-transparent",
      ].join(" ")}
      aria-current={current ? "step" : undefined}
    >
      {/* Connective line + node */}
      <div className="relative flex w-8 shrink-0 justify-center self-stretch">
        {/* vertical line segment above the node */}
        {!isFirst && (
          <span
            aria-hidden
            className={[
              "absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2",
              achieved || current ? "bg-brand-orange/30" : "bg-border",
            ].join(" ")}
          />
        )}
        {/* vertical line segment below the node */}
        {!isLast && (
          <span
            aria-hidden
            className={[
              "absolute bottom-0 left-1/2 h-1/2 w-px -translate-x-1/2",
              achieved ? "bg-brand-orange/30" : "bg-border",
            ].join(" ")}
          />
        )}
        <Node state={state} />
      </div>

      {/* Name + status */}
      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <div className="min-w-0">
          <div
            className={[
              "font-display text-sm font-semibold leading-tight",
              current
                ? "text-brand-orange-strong"
                : achieved
                  ? "text-foreground"
                  : "text-muted-foreground",
            ].join(" ")}
          >
            {rank.name}
          </div>
          {current && (
            <div className="font-mono text-[11px] font-semibold uppercase tracking-widest text-brand-orange">
              You are here
            </div>
          )}
        </div>
        <span
          className={[
            "shrink-0 font-mono text-xs tabular-nums",
            current || achieved ? "text-foreground" : "text-muted-foreground/70",
          ].join(" ")}
        >
          {rank.minXp.toLocaleString()} XP
        </span>
      </div>
    </li>
  )
}

function Node({ state }: { state: RowState }) {
  if (state === "current") {
    return (
      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-ember shadow-tile ring-2 ring-brand-orange/40">
        <Award className="animate-glow h-4 w-4 text-white" />
      </span>
    )
  }
  if (state === "achieved") {
    return (
      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-brand-green/30 bg-brand-green/10">
        <Check className="h-4 w-4 text-brand-green" aria-label="Achieved" />
      </span>
    )
  }
  return (
    <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted">
      <Lock className="h-3.5 w-3.5 text-muted-foreground/60" aria-label="Locked" />
    </span>
  )
}
