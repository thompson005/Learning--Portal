"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { AuthContext, type AuthUser } from "@/components/auth/AuthContext"
import { AuthScreen } from "@/components/auth/AuthScreen"
import { PortalSkeleton } from "@/components/layout/PortalSkeleton"
import {
  getProgress,
  importProgress,
  resetProgress,
  updateProfile,
} from "@/lib/store/progress"

type Status = "loading" | "in" | "out"

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>("loading")
  const [user, setUser] = useState<AuthUser | null>(null)
  const hydratingRef = useRef(false)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Pull the signed-in user's progress from the server into the local store.
  const hydrate = useCallback(async (u: AuthUser) => {
    hydratingRef.current = true
    try {
      const res = await fetch("/api/me/progress")
      if (res.ok) {
        const data = await res.json()
        if (data.progress && typeof data.progress === "object") {
          importProgress(JSON.stringify(data.progress))
        }
      }
    } catch {
      // offline / DB down — keep whatever is in local storage
    }
    updateProfile({ name: u.name })
    hydratingRef.current = false
  }, [])

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me")
      const data = await res.json()
      if (data.user) {
        await hydrate(data.user)
        setUser(data.user)
        setStatus("in")
        return
      }
    } catch {
      // fall through to signed-out
    }
    setStatus("out")
  }, [hydrate])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Debounced push of local progress to the server whenever it changes.
  useEffect(() => {
    if (status !== "in") return
    function onChange() {
      if (hydratingRef.current) return
      if (saveTimer.current) clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(() => {
        fetch("/api/me/progress", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ progress: getProgress() }),
        }).catch(() => {})
      }, 1200)
    }
    window.addEventListener("technieum:progress-changed", onChange)
    return () => {
      window.removeEventListener("technieum:progress-changed", onChange)
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [status])

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {})
    // Clear this browser's cached progress so the next account starts clean.
    resetProgress()
    setUser(null)
    setStatus("out")
  }, [])

  if (status === "loading") {
    return <PortalSkeleton />
  }

  if (status === "out" || !user) {
    return <AuthScreen onAuthed={checkAuth} />
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
