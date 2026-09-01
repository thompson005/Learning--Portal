import { NextResponse } from "next/server"

import { getActiveLabRun } from "@/lib/server/dockerLabs"

export async function GET() {
  const active = await getActiveLabRun()
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
