"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import confetti from "canvas-confetti"
import { Flame, PartyPopper, Target, X, Zap } from "lucide-react"

import { CountUp } from "@/components/gamification/CountUp"

const EVENT = "technieum:lesson-complete"

type LessonCompleteDetail = {
  title?: string
  xp?: number
  streak?: number
  combo?: number
}

type LessonState = {
  title: string
  xp: number
  streak: number
  combo: number | null
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  )
}

/** Celebratory confetti burst, reduced-motion guarded. */
function celebrate() {
  if (prefersReducedMotion()) return
  try {
    const colors = ["#ea7a1e", "#f59e0b", "#16a34a", "#2563eb"]
    confetti({ particleCount: 110, spread: 75, origin: { y: 0.35 }, colors })
    // two quick side bursts for a Duolingo-y pop
    confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 }, colors })
    confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 }, colors })
  } catch {
    // confetti unavailable (SSR / reduced env) — non-fatal
  }
}

/**
 * Duolingo-style lesson-complete celebration overlay.
 *
 * Self-mounting: renders nothing until a `technieum:lesson-complete` window
 * event fires, e.g.
 *   window.dispatchEvent(new CustomEvent("technieum:lesson-complete", {
 *     detail: { title, xp, streak, combo }
 *   }))
 *
 * Detail fields default gracefully (xp 0, no combo tile). Esc and the backdrop
 * close it; the Continue button closes it too. Honors reduced motion and is
 * safe down to 375px.
 */
export function LessonComplete() {
  const [state, setState] = useState<LessonState | null>(null)
  const continueRef = useRef<HTMLButtonElement | null>(null)

  const close = useCallback(() => setState(null), [])

  useEffect(() => {
    function onComplete(e: Event) {
      const detail = (e as CustomEvent<LessonCompleteDetail>).detail ?? {}
      setState({
        title: detail.title?.trim() || "Lesson",
        xp: Number.isFinite(detail.xp) ? Math.max(0, Math.round(detail.xp as number)) : 0,
        streak: Number.isFinite(detail.streak)
          ? Math.max(0, Math.round(detail.streak as number))
          : 0,
        combo:
          detail.combo != null && Number.isFinite(detail.combo)
            ? Math.max(0, Math.round(detail.combo))
            : null,
      })
      celebrate()
      // optional happy Teki reaction
      try {
        window.dispatchEvent(
          new CustomEvent("technieum:companion", {
            detail: { mood: "happy", text: "Lesson complete! 🎉" },
          }),
        )
      } catch {
        /* non-fatal */
      }
    }
    window.addEventListener(EVENT, onComplete as EventListener)
    return () => window.removeEventListener(EVENT, onComplete as EventListener)
  }, [])

  // Esc to close + focus the Continue button when shown.
  useEffect(() => {
    if (!state) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    const t = window.setTimeout(() => continueRef.current?.focus(), 60)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.clearTimeout(t)
    }
  }, [state, close])

  if (!state) return null

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lesson-complete-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 cursor-default bg-foreground/35 backdrop-blur-sm animate-in fade-in-0 duration-200 motion-reduce:animate-none"
      />

      {/* Card */}
      <div className="glass-strong elev-3 relative w-full max-w-md rounded-3xl p-6 text-center sm:p-8 animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300 motion-reduce:animate-none">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="lift absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Success burst */}
        <div className="mx-auto mb-5 grid place-items-center">
          <div className="relative grid h-20 w-20 place-items-center rounded-full bg-brand-orange/15 text-brand-orange ring-8 ring-brand-orange/5 animate-in zoom-in-50 spin-in-[-12deg] duration-500 motion-reduce:animate-none">
            <PartyPopper className="h-9 w-9" />
          </div>
        </div>

        <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
          {state.title}
        </p>
        <h2
          id="lesson-complete-title"
          className="font-display mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Lesson complete!
        </h2>

        {/* Stat tiles */}
        <div
          className={`mt-6 grid gap-3 ${state.combo != null ? "grid-cols-3" : "grid-cols-2"}`}
        >
          <StatTile
            icon={<Zap className="h-4 w-4" />}
            label="XP earned"
            value={state.xp}
            accent
          />
          <StatTile
            icon={<Flame className="h-4 w-4" />}
            label="Streak"
            value={state.streak}
            suffix={state.streak === 1 ? " day" : " days"}
          />
          {state.combo != null && (
            <StatTile
              icon={<Target className="h-4 w-4" />}
              label="Combo"
              value={state.combo}
              suffix="%"
            />
          )}
        </div>

        {/* Continue */}
        <button
          ref={continueRef}
          type="button"
          onClick={close}
          className="lift mt-7 w-full rounded-2xl bg-brand-orange px-6 py-3.5 font-display text-lg font-semibold text-white shadow-lg shadow-brand-orange/25 transition-colors hover:bg-brand-orange-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

function StatTile({
  icon,
  label,
  value,
  suffix = "",
  accent = false,
}: {
  icon: ReactNode
  label: string
  value: number
  suffix?: string
  accent?: boolean
}) {
  return (
    <div className="glass rounded-2xl p-3.5">
      <div
        className={`mx-auto grid h-8 w-8 place-items-center rounded-full ${
          accent
            ? "bg-brand-orange/15 text-brand-orange"
            : "bg-foreground/5 text-muted-foreground"
        }`}
      >
        {icon}
      </div>
      <div className="mt-2 font-display text-2xl font-bold tabular-nums text-foreground">
        <CountUp value={value} />
        {suffix}
      </div>
      <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
    </div>
  )
}
