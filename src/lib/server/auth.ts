import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

import { prisma } from "@/lib/server/db"

const SESSION_COOKIE = "technieum_admin_session"
const SESSION_TTL_MS = 1000 * 60 * 60 * 12 // 12 hours

export async function verifyCredentials(username: string, password: string) {
  const admin = await prisma.adminUser.findUnique({ where: { username } })
  if (!admin) return null
  const valid = await bcrypt.compare(password, admin.passwordHash)
  return valid ? admin : null
}

export async function createSession(adminUserId: string) {
  const session = await prisma.session.create({
    data: {
      adminUserId,
      expiresAt: new Date(Date.now() + SESSION_TTL_MS),
    },
  })

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: session.expiresAt,
  })

  return session
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value
  if (!sessionId) return null

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { adminUser: true },
  })

  if (!session || session.expiresAt < new Date()) {
    if (session) await prisma.session.delete({ where: { id: session.id } }).catch(() => {})
    return null
  }

  return session.adminUser
}

export async function destroySession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value
  if (sessionId) {
    await prisma.session.delete({ where: { id: sessionId } }).catch(() => {})
  }
  cookieStore.delete(SESSION_COOKIE)
}
