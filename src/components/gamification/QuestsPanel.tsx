"use client"

import { useCallback, useEffect, useState } from "react"
import * as Icons from "lucide-react"
import { Check, Gift, Sparkles } from "lucide-react"
import confetti from "canvas-confetti"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { claimQuest, getQuests, type Quest } from "@/lib/store/gamification"

/** "Quests" dashboard widget — daily + weekly quests with progress bars and
 *  claimable XP rewards. Presentational client component; all state lives in
 *  the gamification store. */
export function QuestsPanel() {
  const [quests, setQuests] = useState<Quest[]>([])

  const refresh = useCallback(() => setQuests(getQuests()), [])

  useEffect(() => {
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () => window.removeEventListener("technieum:progress-changed", refresh)
  }, [refresh])

  if (quests.length === 0) return null

  const daily = quests.filter((q) => q.period === "daily")
  const weekly = quests.filter((q) => q.period === "weekly")

  const claimable = quests.filter((q) => q.complete && !q.claimed).length

  return (
    <section
      className="glass rounded-2xl p-5 sm:p-6"
      aria-label="Quests"
    >
      <header className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-brand-orange/25 bg-brand-orange/10 text-brand-orange">
            <Sparkles className="h-4.5 w-4.5" aria-hidden />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold leading-none text-foreground">
              Quests
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Earn XP by staying on the grind
            </p>
          </div>
        </div>
        {claimable > 0 && (
          <span className="badge-shine relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-brand-orange/25 bg-brand-orange/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-brand-orange">
            <Gift className="h-3.5 w-3.5" aria-hidden />
            {claimable} ready
          </span>
        )}
      </header>

      <div className="space-y-6">
        <QuestGroup label="Daily" quests={daily} onRefresh={refresh} />
        <QuestGroup label="Weekly" quests={weekly} onRefresh={refresh} />
      </div>
    </section>
  )
}

function QuestGroup({
  label,
  quests,
  onRefresh,
}: {
  label: string
  quests: Quest[]
  onRefresh: () => void
}) {
  if (quests.length === 0) return null
  return (
    <div>
      <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="space-y-3">
        {quests.map((q) => (
          <QuestCard key={q.id} quest={q} onRefresh={onRefresh} />
        ))}
      </div>
    </div>
  )
}

function fireConfetti() {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return
  }
  try {
    confetti({
      particleCount: 90,
      spread: 70,
      startVelocity: 38,
      origin: { y: 0.7 },
      colors: ["#e85d04", "#f0793a", "#ff9a4d", "#16a34a"],
      scalar: 0.9,
    })
  } catch {
    // confetti is a nicety — never let it break the claim flow
  }
}

function QuestCard({
  quest,
  onRefresh,
}: {
  quest: Quest
  onRefresh: () => void
}) {
  const Icon = (Icons as Record<string, any>)[quest.icon] ?? Icons.Target
  const claimable = quest.complete && !quest.claimed
  const pct = Math.max(
    0,
    Math.min(100, quest.target > 0 ? (quest.progress / quest.target) * 100 : 0),
  )

  function handleClaim() {
    const xp = claimQuest(quest.id)
    if (xp > 0) {
      toast.success("+" + xp + " XP claimed!")
      fireConfetti()
      onRefresh()
    }
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-chip",
        claimable && "card-interactive border-brand-orange/25 bg-brand-orange/10",
        quest.claimed && "opacity-60",
      )}
    >
      <div className="flex items-start gap-3.5">
        <span
          className={cn(
            "mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border",
            quest.claimed
              ? "border-brand-green/25 bg-brand-green/10 text-brand-green"
              : "border-brand-orange/25 bg-brand-orange/10 text-brand-orange",
          )}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-sm font-semibold leading-snug text-foreground">
              {quest.title}
            </h3>
            <span
              className={cn(
                "shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold",
                quest.claimed
                  ? "border-brand-green/25 bg-brand-green/10 text-brand-green"
                  : "border-brand-orange/25 bg-brand-orange/10 text-brand-orange",
              )}
            >
              +{quest.reward} XP
            </span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {quest.description}
          </p>

          <div className="mt-3">
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-[width] duration-700 ease-out motion-reduce:transition-none",
                  quest.claimed ? "bg-brand-green" : "bg-gradient-ember",
                )}
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-mono text-[11px] text-muted-foreground">
                {quest.progress}/{quest.target}
              </span>

              {claimable ? (
                <button
                  type="button"
                  onClick={handleClaim}
                  aria-label={`Claim ${quest.reward} XP for ${quest.title}`}
                  className="badge-shine relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-brand-orange px-3.5 py-1.5 text-xs font-semibold text-white shadow-chip transition-transform hover:bg-brand-orange-strong active:scale-95 motion-reduce:transition-none"
                  style={{ boxShadow: "0 0 14px rgba(232,121,42,0.45)" }}
                >
                  <Gift className="h-3.5 w-3.5" aria-hidden />
                  Claim
                </button>
              ) : quest.claimed ? (
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-brand-green">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                  Claimed
                </span>
              ) : (
                <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  {Math.round(pct)}%
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
