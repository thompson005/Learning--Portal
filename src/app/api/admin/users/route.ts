import { NextResponse } from "next/server"

import { getCurrentAdmin } from "@/lib/server/auth"
import { prisma } from "@/lib/server/db"
import {
  computeUserStats,
  computeActivitySummary,
  computeDailyLog,
  type ActivityDayInput,
} from "@/lib/server/userStats"

export const runtime = "nodejs"

export async function GET() {
  const admin = await getCurrentAdmin()
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      email: true,
      name: true,
      progressJson: true,
      createdAt: true,
      updatedAt: true,
      lastLoginAt: true,
      lastSeenAt: true,
      activity: {
        select: { day: true, activeSeconds: true, sessions: true },
        orderBy: { day: "desc" },
      },
    },
  })

  const learners = users.map((u) => {
    const days: ActivityDayInput[] = u.activity.map((a) => ({
      day: a.day,
      activeSeconds: a.activeSeconds,
      sessions: a.sessions,
    }))
    return {
      id: u.id,
      email: u.email,
      name: u.name,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
      lastLoginAt: u.lastLoginAt,
      lastSeenAt: u.lastSeenAt,
      stats: computeUserStats(u.progressJson),
      activity: computeActivitySummary(days),
      dailyLog: computeDailyLog(u.progressJson, days),
    }
  })

  return NextResponse.json({ learners })
}
