"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/shared/Logo"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? "Login failed.")
        return
      }
      router.push("/admin")
      router.refresh()
    } catch {
      setError("Network error — please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-brand-ink bg-dot-grid px-4 py-12">
      <Logo wordmarkClassName="text-white" />

      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-2xl shadow-black/40">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-ink">
            <ShieldCheck className="h-6 w-6 text-brand-orange" />
          </div>
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Backstage Access
            </p>
            <h1 className="mt-1 font-display text-xl font-semibold text-foreground">Admin sign in</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="admin-username">Username</Label>
            <Input
              id="admin-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {error && (
            <p className="flex items-center gap-1.5 rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
              <Lock className="h-3.5 w-3.5 shrink-0" /> {error}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>

      <p className="flex items-center gap-1.5 font-mono text-[10px] text-white/35">
        Technieum OS v2.0.1
        <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
        System Online
      </p>
    </div>
  )
}
