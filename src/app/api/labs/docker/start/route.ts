import { NextRequest, NextResponse } from "next/server"

import { startLab } from "@/lib/server/dockerLabs"
import { getCurrentUserId } from "@/lib/server/userAuth"
import { LABS } from "@/lib/data/labs"

export const runtime = "nodejs"
export const maxDuration = 300

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId()
  if (!userId)
    return NextResponse.json(
      { ok: false, error: "Please sign in to start a lab." },
      { status: 401 },
    )

  const body = await req.json().catch(() => null)
  const labId = typeof body?.labId === "string" ? body.labId : null
  if (!labId || !LABS.some((l) => l.id === labId)) {
    return NextResponse.json({ error: "Unknown lab id." }, { status: 400 })
  }

  try {
    const result = await startLab(userId, labId)
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to start lab container."
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
