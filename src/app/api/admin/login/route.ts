import { NextRequest, NextResponse } from "next/server"

import { createSession, verifyCredentials } from "@/lib/server/auth"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const username = typeof body?.username === "string" ? body.username.trim() : ""
  const password = typeof body?.password === "string" ? body.password : ""

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 })
  }

  const admin = await verifyCredentials(username, password)
  if (!admin) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 })
  }

  await createSession(admin.id)
  return NextResponse.json({ ok: true })
}
