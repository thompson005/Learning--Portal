"use client"

import { useEffect, useState } from "react"
import { Medal, Trophy } from "lucide-react"

import { cn } from "@/lib/utils"

interface Entry {
  rank: number
  name: string
  xp: number
  isYou: boolean
}
interface View {
  total: number
  entries: Entry[]
  you: { rank: number; xp: number; xpToNext: number | null } | null
}

const PODIUM = ["text-amber-500", "text-slate-400", "text-amber-700"]

export default function LeaderboardPage() {
  const [view, setView] = useState<View | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    const load = () =>
      fetch("/api/leaderboard", { cache: "no-store" })
        .then((res) => {
          if (!res.ok) throw new Error(String(res.status))
          return res.json() as Promise<View>
        })
        .then((v) => {
          if (cancelled) return
          setView(v)
          setError(false)
        })
        .catch(() => {
          if (!cancelled) setError(true)
        })
    load()
    const t = setInterval(load, 60_000)
    window.addEventListener("focus", load)
    return () => {
      cancelled = true
      clearInterval(t)
      window.removeEventListener("focus", load)
    }
  }, [])

  const youInList = view?.entries.some((e) => e.isYou) ?? false

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <h1 className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-foreground">
          <Trophy className="h-6 w-6 text-brand-orange" /> Leaderboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everyone on the portal, ranked by total XP across all tracks.
        </p>
      </div>

      {view?.you && (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-brand-orange/40 bg-brand-orange/5 px-4 py-3">
          <div>
            <div className="text-xs text-muted-foreground">Your position</div>
            <div className="font-display text-2xl font-semibold text-foreground">
              #{view.you.rank}
              <span className="ml-1 text-sm font-normal text-muted-foreground">of {view.total}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-lg font-semibold text-foreground">{view.you.xp} XP</div>
            <div className="text-xs text-muted-foreground">
              {view.you.xpToNext === null
                ? "You are in the lead"
                : `${view.you.xpToNext} XP to move up`}
            </div>
          </div>
        </div>
      )}

      {error && !view && (
        <div className="rounded-xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          The leaderboard could not be loaded. Try again in a moment.
        </div>
      )}
      {!view && !error && (
        <p className="py-8 text-center text-sm text-muted-foreground">Loading leaderboard…</p>
      )}

      {view && view.entries.length === 0 && (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          Nobody has earned XP yet. Finish a topic or lab to take the first spot.
        </div>
      )}

      {view && view.entries.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <ul className="divide-y divide-border">
            {view.entries.map((e, i) => (
              <li
                key={`${e.rank}-${i}`}
                className={cn(
                  "flex items-center gap-3 px-4 py-3",
                  e.isYou && "bg-brand-orange/10",
                )}
              >
                <div className="flex w-8 shrink-0 items-center justify-center">
                  {e.rank <= 3 && e.xp > 0 ? (
                    <Medal className={cn("h-5 w-5", PODIUM[e.rank - 1])} aria-label={`Rank ${e.rank}`} />
                  ) : (
                    <span className="font-mono text-sm text-muted-foreground">{e.rank}</span>
                  )}
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 font-mono text-xs font-bold uppercase text-brand-orange">
                  {e.name.slice(0, 1)}
                </span>
                <div className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
                  {e.name}
                  {e.isYou && (
                    <span className="ml-2 rounded bg-brand-orange px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      You
                    </span>
                  )}
                </div>
                <div className="shrink-0 font-mono text-sm font-semibold text-foreground">{e.xp} XP</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {view && view.you && !youInList && (
        <p className="text-center text-xs text-muted-foreground">
          Showing the top {view.entries.length}. You are #{view.you.rank} with {view.you.xp} XP.
        </p>
      )}
    </div>
  )
}
