import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/server/db"
import { getCurrentUserId } from "@/lib/server/userAuth"

export const runtime = "nodejs"

export async function GET() {
  const userId = await getCurrentUserId().catch(() => null)
  if (!userId) return NextResponse.json({ error: "Not signed in." }, { status: 401 })
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { progressJson: true },
  })
  let progress: unknown = {}
  try {
    progress = JSON.parse(user?.progressJson ?? "{}")
  } catch {
    progress = {}
  }
  return NextResponse.json({ progress })
}

export async function PUT(req: NextRequest) {
  const userId = await getCurrentUserId().catch(() => null)
  if (!userId) return NextResponse.json({ error: "Not signed in." }, { status: 401 })
  const body = await req.json().catch(() => null)
  if (!body || typeof body.progress !== "object") {
    return NextResponse.json({ error: "Invalid progress payload." }, { status: 400 })
  }
  const json = JSON.stringify(body.progress)
  // Guardrail: reject absurdly large blobs.
  if (json.length > 2_000_000) {
    return NextResponse.json({ error: "Progress payload too large." }, { status: 413 })
  }
  await prisma.user.update({ where: { id: userId }, data: { progressJson: json } })
  return NextResponse.json({ ok: true })
}
