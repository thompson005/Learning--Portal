import { NextRequest, NextResponse } from "next/server"

import { getCurrentAdmin } from "@/lib/server/auth"
import { addTrainee, getTraineesWithStatus } from "@/lib/server/manager"

export async function GET() {
  const admin = await getCurrentAdmin()
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const trainees = await getTraineesWithStatus()
  return NextResponse.json({ trainees })
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin()
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json().catch(() => null)
  const name = typeof body?.name === "string" ? body.name.trim() : ""
  if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 })

  const trainee = await addTrainee(name)
  return NextResponse.json({ trainee })
}
