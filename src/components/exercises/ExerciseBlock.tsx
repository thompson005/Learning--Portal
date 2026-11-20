"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  Check,
  GripVertical,
  Puzzle,
  RotateCcw,
  Sparkles,
  X,
  Zap,
} from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { recordCheckpoint } from "@/lib/store/progress"
import type {
  BlankExercise,
  Exercise,
  MatchExercise,
  OrderExercise,
} from "@/types"

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/** Fisher–Yates — returns a new shuffled array. Re-shuffles until it differs
 *  from the input (when possible) so the drill is never pre-solved. */
function shuffled<T>(arr: T[]): T[] {
  if (arr.length < 2) return [...arr]
  for (let attempt = 0; attempt < 6; attempt++) {
    const out = [...arr]
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[out[i], out[j]] = [out[j], out[i]]
    }
    if (out.some((v, i) => v !== arr[i])) return out
  }
  return [...arr].reverse()
}

function fireConfetti() {
  if (typeof window === "undefined") return
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
  import("canvas-confetti")
    .then(({ default: confetti }) => {
      confetti({
        particleCount: 70,
        spread: 68,
        startVelocity: 32,
        origin: { y: 0.7 },
        colors: ["#E8792A", "#f0793a", "#27AE60", "#ffcf99"],
        scalar: 0.9,
      })
    })
    .catch(() => {})
}

function Shell({
  icon,
  kind,
  prompt,
  children,
  footer,
}: {
  icon: React.ReactNode
  kind: string
  prompt: string
  children: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-chip">
      <p className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-brand-orange">
        {icon} {kind}
      </p>
      <p className="mt-1.5 text-sm font-medium text-foreground">{prompt}</p>
      <div className="mt-3">{children}</div>
      <div className="mt-4 flex items-center justify-between gap-3">{footer}</div>
    </div>
  )
}

function Verdict({
  state,
  explanation,
}: {
  state: "correct" | "wrong"
  explanation?: string
}) {
  return (
    <div
      className={cn(
        "mt-3 rounded-lg border px-3 py-2 text-sm",
        state === "correct"
          ? "border-brand-green/40 bg-brand-green/[0.07] text-brand-green"
          : "border-brand-red/40 bg-brand-red/[0.07] text-brand-red",
      )}
    >
      <p className="flex items-center gap-1.5 font-semibold">
        {state === "correct" ? (
          <>
            <Check className="h-4 w-4" /> Correct — +5 XP
          </>
        ) : (
          <>
            <X className="h-4 w-4" /> Not quite — adjust and try again
          </>
        )}
      </p>
      {explanation && (
        <p className="mt-1 text-xs text-muted-foreground">{explanation}</p>
      )}
    </div>
  )
}

/** Awards XP once (first correct) via the shared checkpoint store, fires the
 *  reward feedback. Returns nothing — callers set their own solved UI. */
function reward(storeKey: string) {
  const earned = recordCheckpoint(storeKey, true)
  if (earned) {
    toast.success("Exercise solved! +5 XP", { icon: <Zap className="h-4 w-4" /> })
    fireConfetti()
    window.dispatchEvent(
      new CustomEvent("technieum:companion", {
        detail: { mood: "happy", text: "Nailed it! +5 XP 🎯" },
      }),
    )
  }
}

// ---------------------------------------------------------------------------
// Order — drag (or arrow) the steps into the correct sequence
// ---------------------------------------------------------------------------

function OrderView({ ex, storeKey }: { ex: OrderExercise; storeKey: string }) {
  const [items, setItems] = useState<string[]>(() => shuffled(ex.items))
  const [checked, setChecked] = useState(false)
  const [solved, setSolved] = useState(false)
  const dragIndex = useRef<number | null>(null)

  const correct = useMemo(
    () => items.every((v, i) => v === ex.items[i]),
    [items, ex.items],
  )

  function move(from: number, to: number) {
    if (to < 0 || to >= items.length || from === to) return
    setItems((prev) => {
      const next = [...prev]
      const [m] = next.splice(from, 1)
      next.splice(to, 0, m)
      return next
    })
    setChecked(false)
  }

  function check() {
    setChecked(true)
    if (correct && !solved) {
      setSolved(true)
      reward(storeKey)
    }
  }

  function reset() {
    setItems(shuffled(ex.items))
    setChecked(false)
  }

  return (
    <Shell
      icon={<GripVertical className="h-3.5 w-3.5" />}
      kind="Put in order"
      prompt={ex.prompt}
      footer={
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="text-muted-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Shuffle
          </Button>
          <Button
            size="sm"
            onClick={check}
            disabled={solved}
            className="bg-brand-orange hover:bg-brand-orange/90"
          >
            {solved ? (
              <>
                <Check className="h-4 w-4" /> Solved
              </>
            ) : (
              "Check order"
            )}
          </Button>
        </>
      }
    >
      <ul className="space-y-2">
        {items.map((item, i) => {
          const rightSpot = checked && item === ex.items[i]
          const wrongSpot = checked && item !== ex.items[i]
          return (
            <li
              key={item}
              draggable={!solved}
              onDragStart={() => (dragIndex.current = i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragIndex.current !== null) move(dragIndex.current, i)
                dragIndex.current = null
              }}
              className={cn(
                "flex items-center gap-2 rounded-lg border bg-background px-3 py-2.5 text-sm transition-colors",
                !solved && "cursor-grab active:cursor-grabbing",
                rightSpot && "border-brand-green/50 bg-brand-green/[0.06]",
                wrongSpot && "border-brand-red/50 bg-brand-red/[0.06]",
                !checked && "border-border hover:border-brand-orange/40",
              )}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-[11px] font-semibold text-muted-foreground">
                {i + 1}
              </span>
              <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/60" />
              <span className="min-w-0 flex-1">{item}</span>
              {checked &&
                (rightSpot ? (
                  <Check className="h-4 w-4 shrink-0 text-brand-green" />
                ) : (
                  <X className="h-4 w-4 shrink-0 text-brand-red" />
                ))}
              {!solved && (
                <span className="flex shrink-0 flex-col">
                  <button
                    aria-label="Move up"
                    disabled={i === 0}
                    onClick={() => move(i, i - 1)}
                    className="text-muted-foreground hover:text-brand-orange disabled:opacity-30"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    aria-label="Move down"
                    disabled={i === items.length - 1}
                    onClick={() => move(i, i + 1)}
                    className="text-muted-foreground hover:text-brand-orange disabled:opacity-30"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}
            </li>
          )
        })}
      </ul>
      {checked && (
        <Verdict
          state={correct ? "correct" : "wrong"}
          explanation={correct ? ex.explanation : undefined}
        />
      )}
    </Shell>
  )
}

// ---------------------------------------------------------------------------
// Match — click a left item, then its partner on the right
// ---------------------------------------------------------------------------

function MatchView({ ex, storeKey }: { ex: MatchExercise; storeKey: string }) {
  const rights = useMemo(() => shuffled(ex.pairs.map((p) => p.right)), [ex.pairs])
  // left index -> chosen right value
  const [links, setLinks] = useState<Record<number, string>>({})
  const [activeLeft, setActiveLeft] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [solved, setSolved] = useState(false)

  const usedRights = new Set(Object.values(links))
  const allLinked = Object.keys(links).length === ex.pairs.length
  const correct = ex.pairs.every((p, i) => links[i] === p.right)

  function pickRight(right: string) {
    if (solved || activeLeft === null) return
    setLinks((prev) => {
      const next = { ...prev }
      // remove this right from any other left, then assign
      for (const k of Object.keys(next)) {
        if (next[Number(k)] === right) delete next[Number(k)]
      }
      next[activeLeft] = right
      return next
    })
    setActiveLeft(null)
    setChecked(false)
  }

  function check() {
    setChecked(true)
    if (correct && !solved) {
      setSolved(true)
      reward(storeKey)
    }
  }

  function reset() {
    setLinks({})
    setActiveLeft(null)
    setChecked(false)
  }

  return (
    <Shell
      icon={<Puzzle className="h-3.5 w-3.5" />}
      kind="Match the pairs"
      prompt={ex.prompt}
      footer={
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="text-muted-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
          <Button
            size="sm"
            onClick={check}
            disabled={!allLinked || solved}
            className="bg-brand-orange hover:bg-brand-orange/90"
          >
            {solved ? (
              <>
                <Check className="h-4 w-4" /> Solved
              </>
            ) : (
              "Check matches"
            )}
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3">
        {/* Left column */}
        <ul className="space-y-2">
          {ex.pairs.map((p, i) => {
            const chosen = links[i]
            const ok = checked && chosen === p.right
            const bad = checked && chosen !== undefined && chosen !== p.right
            return (
              <li key={i}>
                <button
                  onClick={() => !solved && setActiveLeft(i)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                    activeLeft === i
                      ? "border-brand-orange bg-brand-orange/[0.07] ring-2 ring-brand-orange/30"
                      : "border-border hover:border-brand-orange/40",
                    ok && "border-brand-green/50 bg-brand-green/[0.06]",
                    bad && "border-brand-red/50 bg-brand-red/[0.06]",
                  )}
                >
                  <span className="min-w-0 flex-1">{p.left}</span>
                  {chosen && (
                    <span
                      className={cn(
                        "shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px]",
                        ok
                          ? "bg-brand-green/15 text-brand-green"
                          : bad
                            ? "bg-brand-red/15 text-brand-red"
                            : "bg-muted text-muted-foreground",
                      )}
                    >
                      {chosen}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
        {/* Right column */}
        <ul className="space-y-2">
          {rights.map((right) => {
            const used = usedRights.has(right)
            return (
              <li key={right}>
                <button
                  onClick={() => pickRight(right)}
                  disabled={solved || activeLeft === null}
                  className={cn(
                    "flex w-full items-center rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                    used
                      ? "border-dashed border-border bg-muted/40 text-muted-foreground"
                      : "border-border hover:border-brand-orange/40",
                    activeLeft !== null &&
                      !solved &&
                      "hover:bg-brand-orange/[0.05]",
                    (solved || activeLeft === null) && "cursor-default",
                  )}
                >
                  {right}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      {activeLeft !== null && !solved && (
        <p className="mt-2 font-mono text-[11px] text-muted-foreground">
          Now pick the match for “{ex.pairs[activeLeft].left}” on the right.
        </p>
      )}
      {checked && (
        <Verdict
          state={correct ? "correct" : "wrong"}
          explanation={correct ? ex.explanation : undefined}
        />
      )}
    </Shell>
  )
}

// ---------------------------------------------------------------------------
// Fill-blank — drop the right token into each ___ slot
// ---------------------------------------------------------------------------

function BlankView({ ex, storeKey }: { ex: BlankExercise; storeKey: string }) {
  const segments = useMemo(() => ex.template.split("___"), [ex.template])
  const blankCount = segments.length - 1
  const pool = useMemo(
    () => shuffled([...ex.blanks, ...(ex.distractors ?? [])]),
    [ex.blanks, ex.distractors],
  )
  // blank index -> token value
  const [fills, setFills] = useState<(string | null)[]>(() =>
    Array(blankCount).fill(null),
  )
  const [checked, setChecked] = useState(false)
  const [solved, setSolved] = useState(false)

  const used = new Set(fills.filter(Boolean) as string[])
  const allFilled = fills.every((f) => f !== null)
  const correct = fills.every((f, i) => f === ex.blanks[i])

  function placeInNextBlank(token: string) {
    if (solved) return
    const slot = fills.findIndex((f) => f === null)
    if (slot === -1) return
    setFills((prev) => {
      const next = [...prev]
      next[slot] = token
      return next
    })
    setChecked(false)
  }

  function clearBlank(i: number) {
    if (solved) return
    setFills((prev) => {
      const next = [...prev]
      next[i] = null
      return next
    })
    setChecked(false)
  }

  function check() {
    setChecked(true)
    if (correct && !solved) {
      setSolved(true)
      reward(storeKey)
    }
  }

  function reset() {
    setFills(Array(blankCount).fill(null))
    setChecked(false)
  }

  return (
    <Shell
      icon={<Sparkles className="h-3.5 w-3.5" />}
      kind="Fill the blanks"
      prompt={ex.prompt}
      footer={
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="text-muted-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
          <Button
            size="sm"
            onClick={check}
            disabled={!allFilled || solved}
            className="bg-brand-orange hover:bg-brand-orange/90"
          >
            {solved ? (
              <>
                <Check className="h-4 w-4" /> Solved
              </>
            ) : (
              "Check answer"
            )}
          </Button>
        </>
      }
    >
      <div className="rounded-lg border border-border bg-background px-3 py-3 font-mono text-[13px] leading-relaxed">
        {segments.map((seg, i) => (
          <span key={i}>
            <span className="whitespace-pre-wrap text-foreground">{seg}</span>
            {i < blankCount &&
              (() => {
                const val = fills[i]
                const ok = checked && val === ex.blanks[i]
                const bad = checked && val !== ex.blanks[i]
                return (
                  <button
                    onClick={() => val && clearBlank(i)}
                    className={cn(
                      "mx-0.5 inline-flex min-w-[64px] items-center justify-center rounded-md border px-2 py-0.5 align-middle text-[12px] transition-colors",
                      !val &&
                        "border-dashed border-brand-orange/50 bg-brand-orange/[0.04] text-muted-foreground",
                      val &&
                        !checked &&
                        "border-brand-orange/50 bg-brand-orange/[0.08] text-foreground",
                      ok && "border-brand-green/50 bg-brand-green/[0.1] text-brand-green",
                      bad && "border-brand-red/50 bg-brand-red/[0.1] text-brand-red",
                    )}
                  >
                    {val ?? "____"}
                  </button>
                )
              })()}
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {pool.map((token) => {
          const isUsed = used.has(token)
          return (
            <button
              key={token}
              onClick={() => !isUsed && placeInNextBlank(token)}
              disabled={isUsed || solved || allFilled}
              className={cn(
                "rounded-md border px-2.5 py-1 font-mono text-[12px] transition-colors",
                isUsed
                  ? "border-dashed border-border bg-muted/40 text-muted-foreground/50 line-through"
                  : "border-border bg-card hover:border-brand-orange/50 hover:bg-brand-orange/[0.05]",
              )}
            >
              {token}
            </button>
          )
        })}
      </div>
      {checked && (
        <Verdict
          state={correct ? "correct" : "wrong"}
          explanation={correct ? ex.explanation : undefined}
        />
      )}
    </Shell>
  )
}

// ---------------------------------------------------------------------------
// Dispatcher
// ---------------------------------------------------------------------------

export function ExerciseBlock({
  exercises,
  ownerId,
}: {
  exercises: Exercise[]
  ownerId: string
}) {
  if (!exercises || exercises.length === 0) return null
  return (
    <div>
      <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Practice
      </p>
      <div className="space-y-3">
        {exercises.map((ex, i) => {
          const key = `ex::${ownerId}::${i}`
          if (ex.type === "order")
            return <OrderView key={i} ex={ex} storeKey={key} />
          if (ex.type === "match")
            return <MatchView key={i} ex={ex} storeKey={key} />
          return <BlankView key={i} ex={ex} storeKey={key} />
        })}
      </div>
    </div>
  )
}
