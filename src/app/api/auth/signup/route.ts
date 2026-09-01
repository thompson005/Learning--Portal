import { NextRequest, NextResponse } from "next/server"

import { signUp } from "@/lib/server/userAuth"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const email = typeof body?.email === "string" ? body.email : ""
  const name = typeof body?.name === "string" ? body.name : ""
  const password = typeof body?.password === "string" ? body.password : ""

  if (!email.includes("@") || !name.trim() || password.length < 8) {
    return NextResponse.json(
      { error: "Enter a valid email, your name, and a password of at least 8 characters." },
      { status: 400 },
    )
  }

  try {
    const result = await signUp(email, name, password)
    if ("error" in result)
      return NextResponse.json({ error: result.error }, { status: 409 })
    return NextResponse.json({ user: result.user })
  } catch {
    return NextResponse.json(
      { error: "Could not create the account. The database may be unavailable." },
      { status: 500 },
    )
  }
}
