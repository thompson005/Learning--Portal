import { activeCurriculum, activeLabs } from "@/lib/data/tracks/registry"
import {
  getProgress,
  getOverallProgress,
  getModuleCompletionPercent,
} from "@/lib/store/progress"

export const XP_PER_TOPIC = 10
export const XP_PER_LAB = 25
export const XP_PER_TOPIC_QUIZ_PASS = 5
export const XP_PER_MODULE_QUIZ_PASS = 15
export const XP_PER_CHECKPOINT = 3
const PASS_THRESHOLD = 0.7

export interface Rank {
  name: string
  minXp: number
}

export const RANKS: Rank[] = [
  { name: "Recruit", minXp: 0 },
  { name: "Operator", minXp: 150 },
  { name: "Analyst", minXp: 400 },
  { name: "Specialist", minXp: 800 },
  { name: "Red Teamer", minXp: 1400 },
  { name: "Senior Operator", minXp: 2200 },
  { name: "Elite Operator", minXp: 3200 },
  { name: "Apex Operator", minXp: 4500 },
]

export function getXp(): number {
  const progress = getProgress()
  const allTopics = activeCurriculum().flatMap((m) => m.topics)

  const topicXp =
    allTopics.filter((t) => progress.topics[t.id]?.status === "completed")
      .length * XP_PER_TOPIC

  const labXp =
    activeLabs().filter((l) => progress.labs[l.id]?.status === "completed").length *
    XP_PER_LAB

  const topicQuizXp =
    Object.values(progress.topicQuizzes).filter(
      (a) => a.total > 0 && a.score / a.total >= PASS_THRESHOLD,
    ).length * XP_PER_TOPIC_QUIZ_PASS

  const moduleQuizXp =
    Object.values(progress.moduleQuizzes).filter(
      (a) => a.total > 0 && a.score / a.total >= PASS_THRESHOLD,
    ).length * XP_PER_MODULE_QUIZ_PASS

  const checkpointXp =
    Object.values(progress.checkpoints ?? {}).filter(Boolean).length *
    XP_PER_CHECKPOINT

  return topicXp + labXp + topicQuizXp + moduleQuizXp + checkpointXp
}

export function getRank(xp: number): {
  current: Rank
  next: Rank | null
  progressToNext: number
} {
  let current = RANKS[0]
  let next: Rank | null = null
  for (let i = 0; i < RANKS.length; i++) {
    if (xp >= RANKS[i].minXp) {
      current = RANKS[i]
      next = RANKS[i + 1] ?? null
    }
  }
  const progressToNext = next
    ? Math.round(((xp - current.minXp) / (next.minXp - current.minXp)) * 100)
    : 100
  return { current, next, progressToNext }
}

export interface Achievement {
  id: string
  title: string
  description: string
  unlocked: boolean
}

export function getAchievements(): Achievement[] {
  const progress = getProgress()
  const overall = getOverallProgress()
  const topicsCompleted = overall.topicsCompleted
  const labsCompleted = overall.labsCompleted
  const checkpointsCorrect = Object.values(progress.checkpoints ?? {}).filter(
    Boolean,
  ).length
  const anyPerfectQuiz = [
    ...Object.values(progress.topicQuizzes),
    ...Object.values(progress.moduleQuizzes),
  ].some((a) => a.total > 0 && a.score === a.total)
  const anyModuleComplete = activeCurriculum().some(
    (m) => getModuleCompletionPercent(m.id) === 100,
  )

  return [
    {
      id: "first-topic",
      title: "First Steps",
      description: "Complete your first topic.",
      unlocked: topicsCompleted >= 1,
    },
    {
      id: "first-blood",
      title: "First Blood",
      description: "Complete your first lab.",
      unlocked: labsCompleted >= 1,
    },
    {
      id: "sharp-eye",
      title: "Sharp Eye",
      description: "Answer 10 checkpoint questions correctly.",
      unlocked: checkpointsCorrect >= 10,
    },
    {
      id: "perfect-score",
      title: "Perfect Score",
      description: "Score 100% on any quiz.",
      unlocked: anyPerfectQuiz,
    },
    {
      id: "lab-rat",
      title: "Lab Rat",
      description: "Complete 10 labs.",
      unlocked: labsCompleted >= 10,
    },
    {
      id: "module-master",
      title: "Module Master",
      description: "Fully complete every topic in a module.",
      unlocked: anyModuleComplete,
    },
    {
      id: "halfway",
      title: "Halfway There",
      description: "Reach 50% overall programme completion.",
      unlocked: overall.percentComplete >= 50,
    },
    {
      id: "graduate",
      title: "Graduate",
      description: "Reach 100% overall programme completion.",
      unlocked: overall.percentComplete >= 100,
    },
  ]
}
