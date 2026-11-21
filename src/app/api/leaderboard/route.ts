import { NextResponse } from "next/server"

import { getCurrentUserId } from "@/lib/server/userAuth"
import { getLeaderboard } from "@/lib/server/leaderboard"

export const runtime = "nodejs"

export async function GET() {
  const userId = await getCurrentUserId()
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    return NextResponse.json(await getLeaderboard(userId), {
      headers: { "Cache-Control": "private, no-store" },
    })
  } catch {
    return NextResponse.json({ error: "Leaderboard unavailable" }, { status: 503 })
  }
}
