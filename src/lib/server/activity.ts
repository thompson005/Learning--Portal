import { prisma } from "@/lib/server/db"

const MAX_SECONDS_PER_BEAT = 120 // guard against inflated/batched submissions
const NEW_SESSION_GAP_MS = 30 * 60 * 1000 // a >30min gap starts a new session

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/

/**
 * Record a slice of active time-on-portal for a learner. Called from the
 * client heartbeat; only counts time the tab was actually visible + focused.
 */
export async function recordHeartbeat(
  userId: string,
  seconds: number,
  day: string,
): Promise<void> {
  const secs = Math.max(0, Math.min(Math.round(seconds || 0), MAX_SECONDS_PER_BEAT))
  const today = DAY_RE.test(day) ? day : new Date().toISOString().slice(0, 10)
  const now = new Date()

  await prisma.user.update({
    where: { id: userId },
    data: { lastSeenAt: now },
  })

  if (secs === 0) return

  const existing = await prisma.activityDay.findUnique({
    where: { userId_day: { userId, day: today } },
  })

  if (!existing) {
    await prisma.activityDay.create({
      data: {
        userId,
        day: today,
        activeSeconds: secs,
        sessions: 1,
        firstAt: now,
        lastAt: now,
      },
    })
    return
  }

  const startsNewSession =
    now.getTime() - existing.lastAt.getTime() > NEW_SESSION_GAP_MS

  await prisma.activityDay.update({
    where: { id: existing.id },
    data: {
      activeSeconds: { increment: secs },
      lastAt: now,
      ...(startsNewSession ? { sessions: { increment: 1 } } : {}),
    },
  })
}
