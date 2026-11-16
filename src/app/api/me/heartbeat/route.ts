import { NextRequest, NextResponse } from "next/server"

import { getCurrentUserId } from "@/lib/server/userAuth"
import { recordHeartbeat } from "@/lib/server/activity"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId()
  if (!userId) return NextResponse.json({ ok: false }, { status: 401 })

  const body = await req.json().catch(() => null)
  const seconds = typeof body?.seconds === "number" ? body.seconds : 0
  const day = typeof body?.day === "string" ? body.day : ""

  try {
    await recordHeartbeat(userId, seconds, day)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
