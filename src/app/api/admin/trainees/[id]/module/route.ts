import { NextRequest, NextResponse } from "next/server"

import { getCurrentAdmin } from "@/lib/server/auth"
import { updateTraineeModuleStatus } from "@/lib/server/manager"

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json().catch(() => null)
  const moduleId = typeof body?.moduleId === "string" ? body.moduleId : ""
  const status = body?.status

  if (!moduleId || ![0, 1, 2].includes(status)) {
    return NextResponse.json({ error: "Invalid moduleId or status." }, { status: 400 })
  }

  await updateTraineeModuleStatus(id, moduleId, status as 0 | 1 | 2)
  return NextResponse.json({ ok: true })
}
