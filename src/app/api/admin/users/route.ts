import { NextResponse } from "next/server"

import { getCurrentAdmin } from "@/lib/server/auth"
import { prisma } from "@/lib/server/db"
import { computeUserStats } from "@/lib/server/userStats"

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
    },
  })

  const learners = users.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
    stats: computeUserStats(u.progressJson),
  }))

  return NextResponse.json({ learners })
}
