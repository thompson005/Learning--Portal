import { CURRICULUM } from "@/lib/data/curriculum"
import { LABS } from "@/lib/data/labs"
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

type Attempt = { score: number; total: number; lastAttempt?: string }

// Loose shape of the progressJson blob synced from the client store.
export interface StoredProgress {
  name?: string
  startDate?: string
  topics?: Record<string, { status?: string } | undefined>
  labs?: Record<string, { status?: string } | undefined>
  topicQuizzes?: Record<string, Attempt>
  moduleQuizzes?: Record<string, Attempt>
  checkpoints?: Record<string, boolean>
  lastUpdated?: string
}

export interface ModuleStat {
  id: string
  shortName: string
  name: string
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

  const allTopics = CURRICULUM.flatMap((m) => m.topics)
  const topicsCompleted = allTopics.filter(
    (t) => topics[t.id]?.status === "completed",
  ).length
  const labsCompleted = LABS.filter(
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

  const modules: ModuleStat[] = CURRICULUM.map((m) => {
    const total = m.topics.length
    const completed = m.topics.filter(
      (t) => topics[t.id]?.status === "completed",
    ).length
    return {
      id: m.id,
      shortName: m.shortName,
      name: m.name,
      month: m.month,
      completed,
      total,
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    }
  })

  const totalItems = allTopics.length + LABS.length
  const overallPercent =
    totalItems === 0
      ? 0
      : Math.round(((topicsCompleted + labsCompleted) / totalItems) * 100)

  return {
    topicsCompleted,
    topicsTotal: allTopics.length,
    labsCompleted,
    labsTotal: LABS.length,
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
