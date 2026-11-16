import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

import { prisma } from "@/lib/server/db"

const SESSION_COOKIE = "technieum_user_session"
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30 // 30 days

export type SafeUser = { id: string; email: string; name: string }

function toSafe(u: { id: string; email: string; name: string }): SafeUser {
  return { id: u.id, email: u.email, name: u.name }
}

export async function signUp(email: string, name: string, password: string) {
  const normalized = email.trim().toLowerCase()
  const existing = await prisma.user.findUnique({ where: { email: normalized } })
  if (existing) return { error: "An account with this email already exists." as const }
  const passwordHash = await bcrypt.hash(password, 10)
  const now = new Date()
  const user = await prisma.user.create({
    data: {
      email: normalized,
      name: name.trim(),
      passwordHash,
      lastLoginAt: now,
      lastSeenAt: now,
    },
  })
  await createUserSession(user.id)
  return { user: toSafe(user) }
}

export async function login(email: string, password: string) {
  const normalized = email.trim().toLowerCase()
  const user = await prisma.user.findUnique({ where: { email: normalized } })
  if (!user) return { error: "No account found for that email." as const }
  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) return { error: "Incorrect password." as const }
  const now = new Date()
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: now, lastSeenAt: now },
  })
  await createUserSession(user.id)
  return { user: toSafe(user) }
}

export async function createUserSession(userId: string) {
  const session = await prisma.userSession.create({
    data: { userId, expiresAt: new Date(Date.now() + SESSION_TTL_MS) },
  })
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, session.id, {
    httpOnly: true,
    // Secure cookies require HTTPS. A self-host served over plain HTTP (e.g. on
    // a VPN) must set INSECURE_COOKIES=1 or the browser drops the session and
    // login silently fails. HTTPS deploys (Vercel) leave it unset.
    secure:
      process.env.NODE_ENV === "production" &&
      process.env.INSECURE_COOKIES !== "1",
    sameSite: "lax",
    path: "/",
    expires: session.expiresAt,
  })
  return session
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value
  if (!sessionId) return null
  const session = await prisma.userSession.findUnique({
    where: { id: sessionId },
    include: { user: true },
  })
  if (!session || session.expiresAt < new Date()) {
    if (session)
      await prisma.userSession.delete({ where: { id: session.id } }).catch(() => {})
    return null
  }
  return toSafe(session.user)
}

/** Returns the full user record (with id) for progress reads/writes, or null. */
export async function getCurrentUserId(): Promise<string | null> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value
  if (!sessionId) return null
  const session = await prisma.userSession.findUnique({ where: { id: sessionId } })
  if (!session || session.expiresAt < new Date()) return null
  return session.userId
}

export async function logout() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value
  if (sessionId)
    await prisma.userSession.delete({ where: { id: sessionId } }).catch(() => {})
  cookieStore.delete(SESSION_COOKIE)
}
