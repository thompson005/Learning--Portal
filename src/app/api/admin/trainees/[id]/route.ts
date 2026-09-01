import { NextResponse } from "next/server"

import { getCurrentAdmin } from "@/lib/server/auth"
import { removeTrainee } from "@/lib/server/manager"

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentAdmin()
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await removeTrainee(id)
  return NextResponse.json({ ok: true })
}
