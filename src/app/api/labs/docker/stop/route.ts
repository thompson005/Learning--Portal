import { NextRequest, NextResponse } from "next/server"

import { stopLab } from "@/lib/server/dockerLabs"
import { LABS } from "@/lib/data/labs"

export const runtime = "nodejs"
export const maxDuration = 30

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const labId = typeof body?.labId === "string" ? body.labId : null
  if (!labId || !LABS.some((l) => l.id === labId)) {
    return NextResponse.json({ error: "Unknown lab id." }, { status: 400 })
  }

  try {
    const stopped = await stopLab(labId)
    return NextResponse.json({ ok: true, stopped: Boolean(stopped) })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to stop lab container."
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
