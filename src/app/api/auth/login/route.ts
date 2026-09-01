import { NextRequest, NextResponse } from "next/server"

import { login } from "@/lib/server/userAuth"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const email = typeof body?.email === "string" ? body.email : ""
  const password = typeof body?.password === "string" ? body.password : ""

  if (!email || !password) {
    return NextResponse.json({ error: "Enter your email and password." }, { status: 400 })
  }

  try {
    const result = await login(email, password)
    if ("error" in result)
      return NextResponse.json({ error: result.error }, { status: 401 })
    return NextResponse.json({ user: result.user })
  } catch {
    return NextResponse.json(
      { error: "Could not sign in. The database may be unavailable." },
      { status: 500 },
    )
  }
}
