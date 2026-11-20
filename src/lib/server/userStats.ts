import type { Module } from "@/types"
import { TRACKS } from "@/lib/data/tracks/registry"
import {
  RANKS,
  getRank,
  XP_PER_TOPIC,
  XP_PER_LAB,
  XP_PER_TOPIC_QUIZ_PASS,
  XP_PER_MODULE_QUIZ_PASS,
  XP_PER_CHECKPOINT,
} from "@/lib/store/gamification"

const PASS_THRESHOLD = 0.7

// Admin stats span ALL tracks (Offensive + AI + Cloud), not just the cyber one.
const ALL_MODULES: { mod: Module; track: string }[] = TRACKS.flatMap((t) =>
  t.curriculum.map((mod) => ({ mod, track: t.shortName })),
)
const ALL_TOPICS = ALL_MODULES.flatMap((m) => m.mod.topics)
const ALL_LABS = TRACKS.flatMap((t) => t.labs)

type Attempt = { score: number; total: number; lastAttempt?: string }

// Loose shape of the progressJson blob synced from the client store.
export interface StoredProgress {
  name?: string
  startDate?: string
  topics?: Record<
    string,
    { status?: string; dateStarted?: string; dateCompleted?: string } | undefined
  >
  labs?: Record<
    string,
    { status?: string; dateCompleted?: string } | undefined
  >
  topicQuizzes?: Record<string, Attempt>
  moduleQuizzes?: Record<string, Attempt>
  checkpoints?: Record<string, boolean>
  lastUpdated?: string
}

export interface ModuleStat {
  id: string
  shortName: string
  name: string
  track: string
  month: number
  completed: number
  total: number
  percent: number
}

export interface UserStats {
  topicsCompleted: number
  topicsTotal: number
  labsCompleted: number
  labsTotal: number
  topicQuizzesPassed: number
  moduleQuizzesPassed: number
  checkpointsCorrect: number
  overallPercent: number
  xp: number
  rank: string
  modules: ModuleStat[]
}

function parse(progressJson: string): StoredProgress {
  try {
    const p = JSON.parse(progressJson)
    return p && typeof p === "object" ? (p as StoredProgress) : {}
  } catch {
    return {}
  }
}

export function computeUserStats(progressJson: string): UserStats {
  const p = parse(progressJson)
  const topics = p.topics ?? {}
  const labs = p.labs ?? {}
  const topicQuizzes = p.topicQuizzes ?? {}
  const moduleQuizzes = p.moduleQuizzes ?? {}
  const checkpoints = p.checkpoints ?? {}

  const allTopics = ALL_TOPICS
  const topicsCompleted = allTopics.filter(
    (t) => topics[t.id]?.status === "completed",
  ).length
  const labsCompleted = ALL_LABS.filter(
    (l) => labs[l.id]?.status === "completed",
  ).length

  const topicQuizzesPassed = Object.values(topicQuizzes).filter(
    (a) => a.total > 0 && a.score / a.total >= PASS_THRESHOLD,
  ).length
  const moduleQuizzesPassed = Object.values(moduleQuizzes).filter(
    (a) => a.total > 0 && a.score / a.total >= PASS_THRESHOLD,
  ).length
  const checkpointsCorrect = Object.values(checkpoints).filter(Boolean).length

  const xp =
    topicsCompleted * XP_PER_TOPIC +
    labsCompleted * XP_PER_LAB +
    topicQuizzesPassed * XP_PER_TOPIC_QUIZ_PASS +
    moduleQuizzesPassed * XP_PER_MODULE_QUIZ_PASS +
    checkpointsCorrect * XP_PER_CHECKPOINT

  const modules: ModuleStat[] = ALL_MODULES.map(({ mod: m, track }) => {
    const total = m.topics.length
    const completed = m.topics.filter(
      (t) => topics[t.id]?.status === "completed",
    ).length
    return {
      id: m.id,
      shortName: m.shortName,
      name: m.name,
      track,
      month: m.month,
      completed,
      total,
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    }
  })

  const totalItems = allTopics.length + ALL_LABS.length
  const overallPercent =
    totalItems === 0
      ? 0
      : Math.round(((topicsCompleted + labsCompleted) / totalItems) * 100)

  return {
    topicsCompleted,
    topicsTotal: allTopics.length,
    labsCompleted,
    labsTotal: ALL_LABS.length,
    topicQuizzesPassed,
    moduleQuizzesPassed,
    checkpointsCorrect,
    overallPercent,
    xp,
    rank: getRank(xp).current.name,
    modules,
  }
}

export const TOTAL_RANKS = RANKS.length

// ---------------------------------------------------------------------------
// Activity + auto daily-learning-log (replaces the manual tracking spreadsheet)
// ---------------------------------------------------------------------------

export interface ActivityDayInput {
  day: string
  activeSeconds: number
  sessions: number
}

export interface DailyLogRow {
  day: string
  activeSeconds: number
  topics: string[]
  labs: string[]
}

export interface ActivitySummary {
  totalSeconds: number
  activeDays: number
  todaySeconds: number
  weekSeconds: number
  sessions: number
  avgSessionMinutes: number
  firstDay: string | null
  lastDay: string | null
}

function localDayString(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

const topicTitleById = new Map(ALL_TOPICS.map((t) => [t.id, t.title]))
const labTitleById = new Map(
  ALL_LABS.map((l) => [l.id, `${l.id}: ${l.title}`]),
)

export function computeActivitySummary(
  days: ActivityDayInput[],
): ActivitySummary {
  const totalSeconds = days.reduce((s, d) => s + d.activeSeconds, 0)
  const sessions = days.reduce((s, d) => s + d.sessions, 0)
  const sorted = [...days].sort((a, b) => a.day.localeCompare(b.day))
  const today = localDayString(new Date())
  const weekCutoff = localDayString(new Date(Date.now() - 6 * 86400_000))
  return {
    totalSeconds,
    activeDays: days.filter((d) => d.activeSeconds > 0).length,
    todaySeconds: days.find((d) => d.day === today)?.activeSeconds ?? 0,
    weekSeconds: days
      .filter((d) => d.day >= weekCutoff)
      .reduce((s, d) => s + d.activeSeconds, 0),
    sessions,
    avgSessionMinutes:
      sessions > 0 ? Math.round(totalSeconds / sessions / 60) : 0,
    firstDay: sorted[0]?.day ?? null,
    lastDay: sorted[sorted.length - 1]?.day ?? null,
  }
}

/**
 * Rebuilds the "daily learning log" automatically: for each day the learner was
 * active (or completed something), what topics/labs they finished and how long
 * they were on the portal. No manual entry required.
 */
export function computeDailyLog(
  progressJson: string,
  days: ActivityDayInput[],
): DailyLogRow[] {
  const p = parse(progressJson)
  const topicsByDay = new Map<string, string[]>()
  const labsByDay = new Map<string, string[]>()

  for (const [id, tp] of Object.entries(p.topics ?? {})) {
    if (tp?.status === "completed" && tp.dateCompleted) {
      const day = tp.dateCompleted.slice(0, 10)
      const arr = topicsByDay.get(day) ?? []
      arr.push(topicTitleById.get(id) ?? id)
      topicsByDay.set(day, arr)
    }
  }
  for (const [id, lp] of Object.entries(p.labs ?? {})) {
    if (lp?.status === "completed" && lp.dateCompleted) {
      const day = lp.dateCompleted.slice(0, 10)
      const arr = labsByDay.get(day) ?? []
      arr.push(labTitleById.get(id) ?? id)
      labsByDay.set(day, arr)
    }
  }

  const allDays = new Set<string>([
    ...days.map((d) => d.day),
    ...topicsByDay.keys(),
    ...labsByDay.keys(),
  ])
  const secondsByDay = new Map(days.map((d) => [d.day, d.activeSeconds]))

  return Array.from(allDays)
    .sort((a, b) => b.localeCompare(a)) // newest first
    .map((day) => ({
      day,
      activeSeconds: secondsByDay.get(day) ?? 0,
      topics: topicsByDay.get(day) ?? [],
      labs: labsByDay.get(day) ?? [],
    }))
}
