"use client"

import { useEffect, useRef } from "react"
import confetti from "canvas-confetti"
import { toast } from "sonner"
import { Trophy, Star } from "lucide-react"

import { getXp, getRank, getAchievements, RANKS } from "@/lib/store/gamification"

const SEEN_ACH_KEY = "technieum_seen_achievements"
const LAST_RANK_KEY = "technieum_last_rank"

function rankIndex(name: string): number {
  return RANKS.findIndex((r) => r.name === name)
}

function burst() {
  try {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.3 },
      colors: ["#ea7a1e", "#f59e0b", "#16a34a", "#2563eb"],
    })
  } catch {
    // confetti unavailable (SSR / reduced env) — non-fatal
  }
}

/**
 * Watches progress for rank-ups and newly unlocked achievements, and
 * celebrates them with a toast + confetti. Mounted once in the app shell.
 *
 * The first change after mount only *seeds* the baselines (so logging in and
 * hydrating progress doesn't replay every past unlock); real changes after
 * that are celebrated.
 */
export function LevelUpWatcher() {
  const seeded = useRef(false)

  useEffect(() => {
    function check() {
      const rank = getRank(getXp()).current.name
      const unlocked = getAchievements()
        .filter((a) => a.unlocked)
        .map((a) => a.id)

      let prevRank: string | null = null
      let seen: string[] = []
      try {
        prevRank = window.localStorage.getItem(LAST_RANK_KEY)
        seen = JSON.parse(window.localStorage.getItem(SEEN_ACH_KEY) ?? "[]")
      } catch {
        // storage blocked — skip celebration, still safe
      }

      const persist = () => {
        try {
          window.localStorage.setItem(LAST_RANK_KEY, rank)
          window.localStorage.setItem(SEEN_ACH_KEY, JSON.stringify(unlocked))
        } catch {
          /* ignore */
        }
      }

      // First pass this session: seed silently so hydration doesn't spam.
      if (!seeded.current) {
        seeded.current = true
        if (prevRank === null) persist()
        else {
          // keep whatever is stored; just ensure achievements baseline exists
          try {
            if (window.localStorage.getItem(SEEN_ACH_KEY) === null)
              window.localStorage.setItem(SEEN_ACH_KEY, JSON.stringify(unlocked))
          } catch {
            /* ignore */
          }
        }
        return
      }

      // Rank up?
      if (prevRank && rankIndex(rank) > rankIndex(prevRank)) {
        burst()
        toast.success(`Ranked up — you're now ${rank}!`, {
          icon: <Star className="h-4 w-4" />,
          duration: 5000,
        })
      }

      // Newly unlocked achievements?
      const fresh = unlocked.filter((id) => !seen.includes(id))
      if (fresh.length > 0 && seen.length >= 0) {
        const titles = getAchievements()
          .filter((a) => fresh.includes(a.id))
          .map((a) => a.title)
        for (const title of titles) {
          toast.success(`Achievement unlocked: ${title}`, {
            icon: <Trophy className="h-4 w-4" />,
            duration: 5000,
          })
        }
        if (prevRank !== null) burst()
      }

      persist()
    }

    check()
    window.addEventListener("technieum:progress-changed", check)
    return () => window.removeEventListener("technieum:progress-changed", check)
  }, [])

  return null
}
