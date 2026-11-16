"use client"

import { useEffect, useState } from "react"
import { Lock, Trophy } from "lucide-react"

import { cn } from "@/lib/utils"
import { getAchievements, type Achievement } from "@/lib/store/gamification"

export function AchievementsPanel() {
  const [achievements, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    function refresh() {
      setAchievements(getAchievements())
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () =>
      window.removeEventListener("technieum:progress-changed", refresh)
  }, [])

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Achievements
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {achievements.map((a) => (
          <div
            key={a.id}
            title={a.description}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-transform",
              a.unlocked
                ? "border-brand-orange/30 bg-brand-orange/[0.06] hover:scale-[1.03]"
                : "border-border bg-muted/20 opacity-50",
            )}
          >
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full",
                a.unlocked
                  ? "bg-brand-orange/15 text-brand-orange"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {a.unlocked ? (
                <Trophy className="h-4 w-4" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
            </div>
            <p className="text-[11px] font-semibold leading-tight text-foreground">
              {a.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
