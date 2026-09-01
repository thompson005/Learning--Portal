"use client"

import { useEffect, useRef, useState } from "react"
import { Award } from "lucide-react"
import { toast } from "sonner"

import { getXp, getRank } from "@/lib/store/gamification"

export function RankBadge() {
  const [xp, setXp] = useState(0)
  const prevRankName = useRef<string | null>(null)

  useEffect(() => {
    function refresh() {
      const newXp = getXp()
      const { current } = getRank(newXp)
      if (prevRankName.current && prevRankName.current !== current.name) {
        toast.success(`Rank up! You're now ${current.name}.`, {
          icon: <Award className="h-4 w-4" />,
        })
      }
      prevRankName.current = current.name
      setXp(newXp)
    }
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () =>
      window.removeEventListener("technieum:progress-changed", refresh)
  }, [])

  const { current, next, progressToNext } = getRank(xp)

  return (
    <div className="flex items-center gap-3 rounded-lg border border-brand-purple/25 bg-brand-purple/[0.04] px-3 py-2.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple/15 text-brand-purple">
        <Award className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate font-display text-sm font-semibold text-foreground">
            {current.name}
          </p>
          <p className="shrink-0 font-mono text-[11px] text-muted-foreground">
            {xp} XP
          </p>
        </div>
        {next ? (
          <>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-orange to-brand-purple transition-all duration-500"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
            <p className="mt-1 font-mono text-[10px] text-muted-foreground">
              {next.minXp - xp} XP to {next.name}
            </p>
          </>
        ) : (
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">
            Max rank reached
          </p>
        )}
      </div>
    </div>
  )
}
