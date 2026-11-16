"use client"

import { useEffect, useState } from "react"
import { Flame } from "lucide-react"

import { getStreak } from "@/lib/store/progress"
import { cn } from "@/lib/utils"

export function StreakBadge() {
  const [streak, setStreak] = useState({ current: 0, longest: 0, active: false })

  useEffect(() => {
    function refresh() {
      setStreak(getStreak())
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () =>
      window.removeEventListener("technieum:progress-changed", refresh)
  }, [])

  if (streak.current === 0) return null

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-chip",
        streak.active
          ? "bg-brand-orange/10 text-brand-orange"
          : "bg-muted text-muted-foreground",
      )}
      title={`Longest streak: ${streak.longest} day${streak.longest === 1 ? "" : "s"}`}
    >
      <Flame className="h-3.5 w-3.5" />
      <span className="font-mono">{streak.current}</span>
      day{streak.current === 1 ? "" : "s"} streak
      {!streak.active && " — study today to keep it"}
    </div>
  )
}
