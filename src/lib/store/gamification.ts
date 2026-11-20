import { activeCurriculum, activeLabs } from "@/lib/data/tracks/registry"
import {
  getProgress,
  getOverallProgress,
  getModuleCompletionPercent,
  getStreak,
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

  return topicXp + labXp + topicQuizXp + moduleQuizXp + checkpointXp + getBonusXp()
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

export type BadgeTier = "bronze" | "silver" | "gold" | "platinum"

export interface Achievement {
  id: string
  title: string
  description: string
  unlocked: boolean
  /** Visual tier for the trophy case. */
  tier?: BadgeTier
  /** lucide-react icon name, e.g. "Flame", "Trophy". */
  icon?: string
  /** Progress toward unlocking (for locked badges with a measurable target). */
  current?: number
  target?: number
  /** Short group label for filtering, e.g. "Topics", "Labs", "Streaks". */
  group?: string
}

export function getAchievements(): Achievement[] {
  const progress = getProgress()
  const overall = getOverallProgress()
  const topicsCompleted = overall.topicsCompleted
  const labsCompleted = overall.labsCompleted
  const checkpointsCorrect = Object.values(progress.checkpoints ?? {}).filter(
    Boolean,
  ).length
  const quizAttempts = [
    ...Object.values(progress.topicQuizzes),
    ...Object.values(progress.moduleQuizzes),
  ]
  const perfectQuizzes = quizAttempts.filter(
    (a) => a.total > 0 && a.score === a.total,
  ).length
  const modulesComplete = activeCurriculum().filter(
    (m) => getModuleCompletionPercent(m.id) === 100,
  ).length
  const streak = getStreak()
  const xp = getXp()
  const { current: rank } = getRank(xp)

  const mk = (
    id: string,
    title: string,
    description: string,
    unlocked: boolean,
    tier: BadgeTier,
    icon: string,
    group: string,
    current?: number,
    target?: number,
  ): Achievement => ({
    id,
    title,
    description,
    unlocked,
    tier,
    icon,
    group,
    current,
    target,
  })

  return [
    // Topics
    mk("first-topic", "First Steps", "Complete your first topic.", topicsCompleted >= 1, "bronze", "Footprints", "Topics", topicsCompleted, 1),
    mk("topics-10", "Getting Serious", "Complete 10 topics.", topicsCompleted >= 10, "bronze", "BookOpen", "Topics", topicsCompleted, 10),
    mk("topics-50", "Scholar", "Complete 50 topics.", topicsCompleted >= 50, "silver", "GraduationCap", "Topics", topicsCompleted, 50),
    mk("topics-150", "Encyclopedia", "Complete 150 topics.", topicsCompleted >= 150, "gold", "Library", "Topics", topicsCompleted, 150),
    // Labs
    mk("first-blood", "First Blood", "Complete your first lab.", labsCompleted >= 1, "bronze", "FlaskConical", "Labs", labsCompleted, 1),
    mk("lab-rat", "Lab Rat", "Complete 10 labs.", labsCompleted >= 10, "silver", "Beaker", "Labs", labsCompleted, 10),
    mk("lab-master", "Lab Master", "Complete 25 labs.", labsCompleted >= 25, "gold", "Atom", "Labs", labsCompleted, 25),
    // Quizzes / precision
    mk("sharp-eye", "Sharp Eye", "Answer 10 checkpoint questions correctly.", checkpointsCorrect >= 10, "bronze", "Eye", "Precision", checkpointsCorrect, 10),
    mk("eagle-eye", "Eagle Eye", "Answer 50 checkpoints correctly.", checkpointsCorrect >= 50, "silver", "Crosshair", "Precision", checkpointsCorrect, 50),
    mk("perfect-score", "Flawless", "Score 100% on any quiz.", perfectQuizzes >= 1, "silver", "Target", "Precision", perfectQuizzes, 1),
    mk("perfect-5", "Perfectionist", "Score 100% on 5 quizzes.", perfectQuizzes >= 5, "gold", "Award", "Precision", perfectQuizzes, 5),
    // Modules
    mk("module-master", "Module Master", "Fully complete a module.", modulesComplete >= 1, "silver", "CheckCircle2", "Modules", modulesComplete, 1),
    mk("module-5", "Trailblazer", "Fully complete 5 modules.", modulesComplete >= 5, "gold", "Flag", "Modules", modulesComplete, 5),
    // Streaks
    mk("streak-3", "Warming Up", "Reach a 3-day streak.", streak.longest >= 3, "bronze", "Flame", "Streaks", streak.longest, 3),
    mk("streak-7", "On Fire", "Reach a 7-day streak.", streak.longest >= 7, "silver", "Flame", "Streaks", streak.longest, 7),
    mk("streak-30", "Unstoppable", "Reach a 30-day streak.", streak.longest >= 30, "platinum", "Zap", "Streaks", streak.longest, 30),
    // Rank / XP
    mk("xp-500", "Rising", "Earn 500 XP.", xp >= 500, "bronze", "TrendingUp", "Rank", xp, 500),
    mk("xp-2000", "Veteran", "Earn 2000 XP.", xp >= 2000, "gold", "Medal", "Rank", xp, 2000),
    mk("rank-redteam", "Red Teamer", "Reach the Red Teamer rank.", rank.name === "Red Teamer" || xp >= 1400, "gold", "Swords", "Rank", xp, 1400),
    mk("rank-apex", "Apex", "Reach the Apex Operator rank.", xp >= 4500, "platinum", "Crown", "Rank", xp, 4500),
    // Completion
    mk("halfway", "Halfway There", "Reach 50% programme completion.", overall.percentComplete >= 50, "silver", "MountainSnow", "Completion", overall.percentComplete, 50),
    mk("graduate", "Graduate", "Reach 100% programme completion.", overall.percentComplete >= 100, "platinum", "Trophy", "Completion", overall.percentComplete, 100),
  ]
}

// ---------------------------------------------------------------------------
// Numeric level — a finer-grained companion to the named ranks. Gentle
// quadratic curve: threshold(L) = 20 * L * (L-1).
// ---------------------------------------------------------------------------

export interface LevelInfo {
  level: number
  xp: number
  xpIntoLevel: number
  xpForLevel: number
  progress: number // 0-100 toward next level
  xpToNext: number
}

function levelThreshold(level: number): number {
  return 20 * level * (level - 1)
}

export function getLevel(xp = getXp()): LevelInfo {
  let level = 1
  while (levelThreshold(level + 1) <= xp) level++
  const base = levelThreshold(level)
  const next = levelThreshold(level + 1)
  const xpForLevel = next - base
  const xpIntoLevel = xp - base
  return {
    level,
    xp,
    xpIntoLevel,
    xpForLevel,
    progress: xpForLevel ? Math.round((xpIntoLevel / xpForLevel) * 100) : 100,
    xpToNext: next - xp,
  }
}

// ---------------------------------------------------------------------------
// Gamify blob — daily goal, claimed quests, bonus XP. Kept separate from the
// progress store so the UserProgress shape is untouched.
// ---------------------------------------------------------------------------

const GAMIFY_KEY = "technieum_gamify"
const DEFAULT_DAILY_GOAL = 3

interface GamifyState {
  dailyGoal: number
  claimed: Record<string, true>
  bonusXp: number
}

function defaultGamify(): GamifyState {
  return { dailyGoal: DEFAULT_DAILY_GOAL, claimed: {}, bonusXp: 0 }
}

function getGamify(): GamifyState {
  if (typeof window === "undefined") return defaultGamify()
  try {
    const raw = window.localStorage.getItem(GAMIFY_KEY)
    if (!raw) return defaultGamify()
    return { ...defaultGamify(), ...(JSON.parse(raw) as GamifyState) }
  } catch {
    return defaultGamify()
  }
}

function saveGamify(state: GamifyState) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(GAMIFY_KEY, JSON.stringify(state))
    window.dispatchEvent(new CustomEvent("technieum:progress-changed"))
  } catch {
    /* ignore */
  }
}

function getBonusXp(): number {
  return getGamify().bonusXp
}

// ---- date helpers -----------------------------------------------------------

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}
function weekKey(d: Date): string {
  const epochDay = Math.floor(d.getTime() / 86400000)
  return `W${Math.floor(epochDay / 7)}`
}
function sameDay(iso: string | undefined, ref: Date): boolean {
  if (!iso) return false
  return dayKey(new Date(iso)) === dayKey(ref)
}
function withinDays(iso: string | undefined, ref: Date, days: number): boolean {
  if (!iso) return false
  const diff = ref.getTime() - new Date(iso).getTime()
  return diff >= 0 && diff < days * 86400000
}

// ---- today / week stats -----------------------------------------------------

export interface TodayStats {
  xpToday: number
  topicsToday: number
  labsToday: number
  quizzesToday: number
}

export function getTodayStats(ref = new Date()): TodayStats {
  const p = getProgress()
  const topicsToday = Object.values(p.topics).filter(
    (t) => t.status === "completed" && sameDay(t.dateCompleted, ref),
  ).length
  const labsToday = Object.values(p.labs).filter(
    (l) => l.status === "completed" && sameDay(l.dateCompleted, ref),
  ).length
  const quizzesToday = [
    ...Object.values(p.topicQuizzes),
    ...Object.values(p.moduleQuizzes),
  ].filter(
    (a) => a.total > 0 && a.score / a.total >= 0.7 && sameDay(a.lastAttempt, ref),
  ).length
  const xpToday =
    topicsToday * XP_PER_TOPIC +
    labsToday * XP_PER_LAB +
    quizzesToday * XP_PER_TOPIC_QUIZ_PASS
  return { xpToday, topicsToday, labsToday, quizzesToday }
}

function weekStats(ref = new Date()) {
  const p = getProgress()
  const topicsThisWeek = Object.values(p.topics).filter(
    (t) => t.status === "completed" && withinDays(t.dateCompleted, ref, 7),
  ).length
  const labsThisWeek = Object.values(p.labs).filter(
    (l) => l.status === "completed" && withinDays(l.dateCompleted, ref, 7),
  ).length
  return { topicsThisWeek, labsThisWeek }
}

// ---- daily goal -------------------------------------------------------------

export interface DailyGoal {
  target: number
  done: number
  percent: number
  met: boolean
}

export function getDailyGoal(): number {
  return getGamify().dailyGoal
}

export function setDailyGoal(n: number) {
  const state = getGamify()
  state.dailyGoal = Math.max(1, Math.min(20, Math.round(n)))
  saveGamify(state)
}

/** Daily goal is measured in topics completed today. */
export function getDailyGoalProgress(): DailyGoal {
  const target = getDailyGoal()
  const done = getTodayStats().topicsToday
  return {
    target,
    done,
    percent: target ? Math.min(100, Math.round((done / target) * 100)) : 0,
    met: done >= target,
  }
}

// ---- quests -----------------------------------------------------------------

export interface Quest {
  id: string
  title: string
  description: string
  period: "daily" | "weekly"
  icon: string
  target: number
  progress: number
  reward: number
  complete: boolean
  claimed: boolean
}

function questKey(q: { id: string; period: "daily" | "weekly" }, ref: Date) {
  return `${q.period}:${q.period === "daily" ? dayKey(ref) : weekKey(ref)}:${q.id}`
}

export function getQuests(ref = new Date()): Quest[] {
  const today = getTodayStats(ref)
  const week = weekStats(ref)
  const claimed = getGamify().claimed

  const defs: Omit<Quest, "complete" | "claimed">[] = [
    { id: "d-topics", title: "Daily Drill", description: "Complete 3 topics today", period: "daily", icon: "BookOpen", target: 3, progress: today.topicsToday, reward: 15 },
    { id: "d-lab", title: "Hands On", description: "Solve a lab today", period: "daily", icon: "FlaskConical", target: 1, progress: today.labsToday, reward: 20 },
    { id: "d-quiz", title: "Quick Thinker", description: "Pass 2 quizzes today", period: "daily", icon: "Brain", target: 2, progress: today.quizzesToday, reward: 10 },
    { id: "w-topics", title: "Weekly Grind", description: "Complete 15 topics this week", period: "weekly", icon: "CalendarCheck", target: 15, progress: week.topicsThisWeek, reward: 60 },
    { id: "w-labs", title: "Field Work", description: "Solve 3 labs this week", period: "weekly", icon: "Hammer", target: 3, progress: week.labsThisWeek, reward: 75 },
  ]

  return defs.map((d) => {
    const complete = d.progress >= d.target
    return {
      ...d,
      progress: Math.min(d.progress, d.target),
      complete,
      claimed: Boolean(claimed[questKey(d, ref)]),
    }
  })
}

/** Claims a completed, unclaimed quest; awards its bonus XP. Returns XP gained (0 if not claimable). */
export function claimQuest(id: string, ref = new Date()): number {
  const quest = getQuests(ref).find((q) => q.id === id)
  if (!quest || !quest.complete || quest.claimed) return 0
  const state = getGamify()
  state.claimed[questKey(quest, ref)] = true
  state.bonusXp += quest.reward
  saveGamify(state)
  return quest.reward
}
