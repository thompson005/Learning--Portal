"use client"

import { useEffect, useState } from "react"
import { Trophy, Medal } from "lucide-react"

interface Learner {
  id: string
  email: string
  name: string
  stats: {
    xp: number
    rank: string
    overallPercent: number
    topicsCompleted: number
    labsCompleted: number
  }
}

const PODIUM = ["text-amber-500", "text-slate-400", "text-amber-700"]

export function LeaderboardPanel() {
  const [learners, setLearners] = useState<Learner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/admin/users")
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => setLearners(data.learners ?? []))
      .catch(() => setError("Could not load the leaderboard. Is the database configured?"))
      .finally(() => setLoading(false))
  }, [])

  if (loading)
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Loading leaderboard...
      </p>
    )

  if (error)
    return (
      <div className="rounded-xl border border-brand-red/30 bg-brand-red/5 p-6 text-center text-sm text-muted-foreground">
        {error}
      </div>
    )

  const ranked = [...learners].sort((a, b) => b.stats.xp - a.stats.xp)

  if (ranked.length === 0)
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
        No learners yet — the leaderboard fills in as people sign up and make
        progress.
      </div>
    )

  return (
    <div className="space-y-4">
      <div>
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight text-foreground">
          <Trophy className="h-5 w-5 text-brand-orange" /> Cohort Leaderboard
        </h2>
        <p className="text-sm text-muted-foreground">
          Every registered learner, ranked by XP.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <ul className="divide-y divide-border">
          {ranked.map((l, i) => (
            <li key={l.id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex w-8 shrink-0 items-center justify-center">
                {i < 3 ? (
                  <Medal className={`h-5 w-5 ${PODIUM[i]}`} />
                ) : (
                  <span className="font-mono text-sm text-muted-foreground">
                    {i + 1}
                  </span>
                )}
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange/15 font-mono text-xs font-bold uppercase text-brand-orange">
                {l.name.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{l.name}</div>
                <div className="truncate font-mono text-[11px] text-muted-foreground">
                  {l.stats.rank} · {l.stats.topicsCompleted}T · {l.stats.labsCompleted}L
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-mono text-sm font-semibold text-foreground">
                  {l.stats.xp} XP
                </div>
                <div className="font-mono text-[11px] text-muted-foreground">
                  {l.stats.overallPercent}%
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
