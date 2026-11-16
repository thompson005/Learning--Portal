import { NextResponse } from "next/server"

import { getUserActiveLabRun } from "@/lib/server/dockerLabs"
import { getCurrentUserId } from "@/lib/server/userAuth"

export const runtime = "nodejs"

export async function GET() {
  const userId = await getCurrentUserId()
  if (!userId) return NextResponse.json({ active: null })

  const active = await getUserActiveLabRun(userId)
  if (!active) return NextResponse.json({ active: null })
  return NextResponse.json({
    active: {
      labId: active.labId,
      containerName: active.containerName,
      port: active.port,
      startedAt: active.startedAt,
    },
  })
}
