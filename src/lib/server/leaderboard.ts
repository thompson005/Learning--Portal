import { prisma } from "@/lib/server/db"
import { computeUserStats } from "@/lib/server/userStats"

// What a learner is allowed to see about other learners: a display name and XP.
// Nothing about what they did, which track they are on, or how they earned it.
export interface LeaderboardEntry {
  rank: number
  name: string
  xp: number
  isYou: boolean
}

export interface LeaderboardView {
  total: number
  entries: LeaderboardEntry[]
  /** The viewer's own standing (also present when they are below the cut-off). */
  you: { rank: number; xp: number; xpToNext: number | null } | null
}

const TOP_N = 100
const CACHE_MS = 30_000

type Row = { id: string; name: string; xp: number; rank: number }
let cache: { at: number; rows: Row[] } | null = null

async function loadRows(): Promise<Row[]> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.rows
  const users = await prisma.user.findMany({
    select: { id: true, name: true, progressJson: true },
  })
  const scored = users
    .map((u) => ({ id: u.id, name: u.name.trim() || "Learner", xp: computeUserStats(u.progressJson).xp }))
    .sort((a, b) => b.xp - a.xp || a.name.localeCompare(b.name))
  // Competition ranking: equal XP shares a rank (1, 2, 2, 4).
  const rows: Row[] = scored.map((r, i) => ({
    ...r,
    rank: i > 0 && r.xp === scored[i - 1].xp ? 0 : i + 1,
  }))
  for (let i = 0; i < rows.length; i++) if (rows[i].rank === 0) rows[i].rank = rows[i - 1].rank
  cache = { at: Date.now(), rows }
  return rows
}

export async function getLeaderboard(viewerId: string): Promise<LeaderboardView> {
  const rows = await loadRows()
  const mine = rows.find((r) => r.id === viewerId)
  const entries = rows
    .slice(0, TOP_N)
    .map((r) => ({ rank: r.rank, name: r.name, xp: r.xp, isYou: r.id === viewerId }))

  let you: LeaderboardView["you"] = null
  if (mine) {
    const ahead = rows.filter((r) => r.xp > mine.xp)
    const nextXp = ahead.length ? Math.min(...ahead.map((r) => r.xp)) : null
    you = { rank: mine.rank, xp: mine.xp, xpToNext: nextXp === null ? null : nextXp - mine.xp }
  }
  return { total: rows.length, entries, you }
}
