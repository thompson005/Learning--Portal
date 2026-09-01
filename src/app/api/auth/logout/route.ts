import { NextResponse } from "next/server"

import { logout } from "@/lib/server/userAuth"

export const runtime = "nodejs"

export async function POST() {
  await logout()
  return NextResponse.json({ ok: true })
}
