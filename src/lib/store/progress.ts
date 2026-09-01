import { CURRICULUM } from "@/lib/data/curriculum"
import { LABS } from "@/lib/data/labs"
import { TOPIC_QUIZZES } from "@/lib/data/topicQuizzes"
import { MODULE_QUIZZES } from "@/lib/data/moduleQuizzes"
import type {
  LabProgress,
  QuizAttempt,
  Status,
  TopicProgress,
  UserProgress,
} from "@/types"

const PROGRESS_KEY = "technieum_progress"

function defaultProgress(): UserProgress {
  return {
    userId: "local-user",
    name: "",
    startDate: "",
    topics: {},
    labs: {},
    topicQuizzes: {},
    moduleQuizzes: {},
    checkpoints: {},
    lastUpdated: new Date().toISOString(),
  }
}

export function getProgress(): UserProgress {
  if (typeof window === "undefined") return defaultProgress()
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY)
    if (!raw) return defaultProgress()
    const parsed = JSON.parse(raw) as UserProgress
    return {
      ...defaultProgress(),
      ...parsed,
      topics: parsed.topics ?? {},
      labs: parsed.labs ?? {},
      topicQuizzes: parsed.topicQuizzes ?? {},
      moduleQuizzes: parsed.moduleQuizzes ?? {},
      checkpoints: parsed.checkpoints ?? {},
    }
  } catch {
    return defaultProgress()
  }
}

function saveProgress(progress: UserProgress) {
  if (typeof window === "undefined") return
  progress.lastUpdated = new Date().toISOString()
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
  window.dispatchEvent(new CustomEvent("technieum:progress-changed"))
}

export function updateProfile(
  update: Partial<Pick<UserProgress, "name" | "startDate">>,
) {
  const progress = getProgress()
  saveProgress({ ...progress, ...update })
}

export function updateTopicStatus(
  topicId: string,
  update: Partial<TopicProgress>,
) {
  const progress = getProgress()
  const existing: TopicProgress = progress.topics[topicId] ?? {
    status: "not_started",
  }
  const next: TopicProgress = { ...existing, ...update }

  if (update.status === "in_progress" && !existing.dateStarted) {
    next.dateStarted = new Date().toISOString()
  }
  if (update.status === "completed" && !next.dateCompleted) {
    next.dateCompleted = new Date().toISOString()
  }
  if (update.status === "not_started") {
    next.dateStarted = undefined
    next.dateCompleted = undefined
  }

  progress.topics[topicId] = next
  saveProgress(progress)
}

export function updateLabStatus(labId: string, update: Partial<LabProgress>) {
  const progress = getProgress()
  const existing: LabProgress = progress.labs[labId] ?? {
    status: "not_started",
  }
  const next: LabProgress = { ...existing, ...update }

  if (update.status === "completed" && !next.dateCompleted) {
    next.dateCompleted = new Date().toISOString()
  }
  if (update.status === "not_started") {
    next.dateCompleted = undefined
  }

  progress.labs[labId] = next
  saveProgress(progress)
}

export function getTopicStatus(topicId: string): Status {
  return getProgress().topics[topicId]?.status ?? "not_started"
}

export function getLabStatus(labId: string): Status {
  return getProgress().labs[labId]?.status ?? "not_started"
}

export function getModuleCompletionPercent(moduleId: string): number {
  const mod = CURRICULUM.find((m) => m.id === moduleId)
  if (!mod || mod.topics.length === 0) return 0
  const progress = getProgress()
  const completed = mod.topics.filter(
    (t) => progress.topics[t.id]?.status === "completed",
  ).length
  return Math.round((completed / mod.topics.length) * 100)
}

export function getMonthCompletionPercent(month: 1 | 2 | 3): number {
  const topics = CURRICULUM.filter((m) => m.month === month).flatMap(
    (m) => m.topics,
  )
  if (topics.length === 0) return 0
  const progress = getProgress()
  const completed = topics.filter(
    (t) => progress.topics[t.id]?.status === "completed",
  ).length
  return Math.round((completed / topics.length) * 100)
}

export function getCurrentWeek(startDate: string): number {
  if (!startDate) return 1
  const start = new Date(startDate)
  const now = new Date()
  const diffMs = now.getTime() - start.getTime()
  const diffWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000))
  return Math.min(Math.max(diffWeeks + 1, 1), 16)
}

export function getOverallProgress(): {
  topicsCompleted: number
  topicsTotal: number
  labsCompleted: number
  labsTotal: number
  currentWeek: number
  currentMonth: number
  percentComplete: number
} {
  const progress = getProgress()
  const allTopics = CURRICULUM.flatMap((m) => m.topics)
  const topicsCompleted = allTopics.filter(
    (t) => progress.topics[t.id]?.status === "completed",
  ).length
  const labsCompleted = LABS.filter(
    (l) => progress.labs[l.id]?.status === "completed",
  ).length
  const currentWeek = getCurrentWeek(progress.startDate)
  const currentMonth =
    currentWeek <= 4 ? 1 : currentWeek <= 8 ? 2 : currentWeek <= 12 ? 3 : 4
  const totalItems = allTopics.length + LABS.length
  const completedItems = topicsCompleted + labsCompleted

  return {
    topicsCompleted,
    topicsTotal: allTopics.length,
    labsCompleted,
    labsTotal: LABS.length,
    currentWeek,
    currentMonth,
    percentComplete:
      totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100),
  }
}

export function getNextTopic() {
  const progress = getProgress()
  const allTopics = CURRICULUM.flatMap((m) =>
    m.topics.map((t) => ({ ...t, moduleId: m.id })),
  )
  return allTopics.find(
    (t) => (progress.topics[t.id]?.status ?? "not_started") === "not_started",
  )
}

export interface RecentActivityItem {
  id: string
  kind: "topic" | "lab"
  title: string
  moduleId: string
  date: string
}

export function getRecentActivity(limit = 5): RecentActivityItem[] {
  const progress = getProgress()
  const items: RecentActivityItem[] = []

  for (const mod of CURRICULUM) {
    for (const topic of mod.topics) {
      const tp = progress.topics[topic.id]
      if (tp?.status === "completed" && tp.dateCompleted) {
        items.push({
          id: topic.id,
          kind: "topic",
          title: topic.title,
          moduleId: mod.id,
          date: tp.dateCompleted,
        })
      }
    }
  }
  for (const lab of LABS) {
    const lp = progress.labs[lab.id]
    if (lp?.status === "completed" && lp.dateCompleted) {
      items.push({
        id: lab.id,
        kind: "lab",
        title: lab.title,
        moduleId: lab.moduleId,
        date: lp.dateCompleted,
      })
    }
  }

  return items
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

export function getWeeklyActivityData(): { week: string; completed: number }[] {
  const progress = getProgress()
  const weekCounts = new Map<number, number>()
  for (let w = 1; w <= 12; w++) weekCounts.set(w, 0)

  for (const mod of CURRICULUM) {
    for (const topic of mod.topics) {
      if (progress.topics[topic.id]?.status === "completed") {
        weekCounts.set(topic.week, (weekCounts.get(topic.week) ?? 0) + 1)
      }
    }
  }
  for (const lab of LABS) {
    if (progress.labs[lab.id]?.status === "completed") {
      weekCounts.set(lab.week, (weekCounts.get(lab.week) ?? 0) + 1)
    }
  }

  return Array.from(weekCounts.entries()).map(([week, completed]) => ({
    week: `W${week}`,
    completed,
  }))
}

export function getMonthlyBarData(): {
  month: string
  completed: number
  total: number
}[] {
  const progress = getProgress()
  return ([1, 2, 3, 4] as const).map((month) => {
    const topics = CURRICULUM.filter((m) => m.month === month).flatMap(
      (m) => m.topics,
    )
    const completed = topics.filter(
      (t) => progress.topics[t.id]?.status === "completed",
    ).length
    return { month: `Month ${month}`, completed, total: topics.length }
  })
}

export function getModuleHeatmapData(): {
  id: string
  shortName: string
  month: 1 | 2 | 3 | 4
  percent: number
}[] {
  return CURRICULUM.map((m) => ({
    id: m.id,
    shortName: m.shortName,
    month: m.month,
    percent: getModuleCompletionPercent(m.id),
  }))
}

export function getLabDifficultyBreakdown(): {
  difficulty: string
  completed: number
  remaining: number
}[] {
  const progress = getProgress()
  return (["easy", "medium", "hard"] as const).map((difficulty) => {
    const labsOfDifficulty = LABS.filter((l) => l.difficulty === difficulty)
    const completed = labsOfDifficulty.filter(
      (l) => progress.labs[l.id]?.status === "completed",
    ).length
    return {
      difficulty,
      completed,
      remaining: labsOfDifficulty.length - completed,
    }
  })
}

export function getTopicTypeBreakdown(): {
  type: string
  completed: number
  total: number
}[] {
  const progress = getProgress()
  const allTopics = CURRICULUM.flatMap((m) => m.topics)
  return (["theory", "lab", "setup", "exercise"] as const).map((type) => {
    const topicsOfType = allTopics.filter((t) => t.type === type)
    const completed = topicsOfType.filter(
      (t) => progress.topics[t.id]?.status === "completed",
    ).length
    return { type, completed, total: topicsOfType.length }
  })
}

export function getWeekProgress(week: number): {
  completed: number
  total: number
} {
  const progress = getProgress()
  const topics = CURRICULUM.flatMap((m) => m.topics).filter(
    (t) => t.week === week,
  )
  const completed = topics.filter(
    (t) => progress.topics[t.id]?.status === "completed",
  ).length
  return { completed, total: topics.length }
}

export function exportProgress(): string {
  return JSON.stringify(getProgress(), null, 2)
}

export function importProgress(json: string): void {
  const parsed = JSON.parse(json) as UserProgress
  saveProgress({
    ...defaultProgress(),
    ...parsed,
    topics: parsed.topics ?? {},
    labs: parsed.labs ?? {},
    topicQuizzes: parsed.topicQuizzes ?? {},
    moduleQuizzes: parsed.moduleQuizzes ?? {},
    checkpoints: parsed.checkpoints ?? {},
  })
}

/** Records a checkpoint answer. Returns true only the first time a given key is answered correctly (i.e. when XP was just earned). */
export function recordCheckpoint(key: string, correct: boolean): boolean {
  if (!correct) return false
  const progress = getProgress()
  if (progress.checkpoints[key]) return false
  progress.checkpoints[key] = true
  saveProgress(progress)
  return true
}

export function resetProgress(): void {
  saveProgress(defaultProgress())
}

export function recordTopicQuizAttempt(
  topicId: string,
  score: number,
  total: number,
  answers?: number[],
) {
  const progress = getProgress()
  const attempt: QuizAttempt = {
    score,
    total,
    lastAttempt: new Date().toISOString(),
    answers,
  }
  progress.topicQuizzes[topicId] = attempt
  saveProgress(progress)
}

export function recordModuleQuizAttempt(
  moduleId: string,
  score: number,
  total: number,
  answers?: number[],
) {
  const progress = getProgress()
  const attempt: QuizAttempt = {
    score,
    total,
    lastAttempt: new Date().toISOString(),
    answers,
  }
  progress.moduleQuizzes[moduleId] = attempt
  saveProgress(progress)
}

export function getTopicQuizAttempt(topicId: string): QuizAttempt | undefined {
  return getProgress().topicQuizzes[topicId]
}

export function getModuleQuizAttempt(
  moduleId: string,
): QuizAttempt | undefined {
  return getProgress().moduleQuizzes[moduleId]
}

export function getTopicQuiz(topicId: string) {
  return TOPIC_QUIZZES.find((q) => q.topicId === topicId)
}

export function getModuleQuiz(moduleId: string) {
  return MODULE_QUIZZES.find((q) => q.moduleId === moduleId)
}
