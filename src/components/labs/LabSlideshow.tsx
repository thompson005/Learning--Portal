"use client"

import { useEffect, useId, useRef, useState } from "react"
import type { KeyboardEvent } from "react"
import {
  Check,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  RotateCcw,
  Sparkles,
  X,
  Zap,
} from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LabDiagramView } from "@/components/labs/diagrams/DiagramRenderer"
import { getProgress, recordCheckpoint } from "@/lib/store/progress"
import type { LabSlide } from "@/types"

const TRANSITION_MS = 280
const RING_SIZE = 52
const RING_STROKE = 5
const RADIUS = (RING_SIZE - RING_STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function CheckpointCheck({
  ownerId,
  slideIndex,
  check,
}: {
  ownerId: string
  slideIndex: number
  check: NonNullable<LabSlide["check"]>
}) {
  const key = `${ownerId}::${slideIndex}`
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    setSelected(getProgress().checkpoints[key] ? check.correctIndex : null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  function handleSelect(i: number) {
    if (selected !== null) return
    setSelected(i)
    const earned = recordCheckpoint(key, i === check.correctIndex)
    if (earned) {
      toast.success("Correct! +3 XP", { icon: <Zap className="h-4 w-4" /> })
    }
  }

  const answered = selected !== null

  return (
    <div className="mt-4 rounded-lg border border-brand-purple/25 bg-brand-purple/[0.04] p-3">
      <p className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-brand-purple">
        <HelpCircle className="h-3.5 w-3.5" /> Quick Check
      </p>
      <p className="mt-1.5 text-sm font-medium text-foreground">
        {check.question}
      </p>
      <div className="mt-2 space-y-1.5">
        {check.options.map((opt, i) => {
          const isSelected = selected === i
          const isCorrectOpt = i === check.correctIndex
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={cn(
                "flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors",
                !answered &&
                  "border-border hover:border-brand-purple/40 hover:bg-brand-purple/[0.03]",
                answered &&
                  isCorrectOpt &&
                  "border-brand-green bg-brand-green/10 text-brand-green",
                answered &&
                  isSelected &&
                  !isCorrectOpt &&
                  "border-brand-red bg-brand-red/10 text-brand-red",
                answered &&
                  !isSelected &&
                  !isCorrectOpt &&
                  "border-border text-muted-foreground opacity-60",
              )}
            >
              {answered && isCorrectOpt && (
                <Check className="h-3.5 w-3.5 shrink-0" />
              )}
              {answered && isSelected && !isCorrectOpt && (
                <X className="h-3.5 w-3.5 shrink-0" />
              )}
              {opt}
            </button>
          )
        })}
      </div>
      {answered && check.explanation && (
        <p className="mt-2 text-xs text-muted-foreground">
          {check.explanation}
        </p>
      )}
    </div>
  )
}

function SlideContent({
  slide,
  isFinal,
  animate,
  ownerId,
  slideIndex,
  interactive = true,
  staged = true,
}: {
  slide: LabSlide
  isFinal: boolean
  animate: boolean
  ownerId: string
  slideIndex: number
  interactive?: boolean
  staged?: boolean
}) {
  // Each element lands a beat after the one above it, so the eye is led down
  // the slide instead of the whole block arriving at once.
  const step = (i: number, soft = false) =>
    staged
      ? {
          className: cn(
            soft ? "animate-slide-rise-soft" : "animate-slide-rise",
            "motion-reduce:animate-none",
          ),
          style: { animationDelay: `${i * 75}ms` },
        }
      : { className: "", style: undefined }

  const title = step(0)
  const body = step(1)
  const diagram = step(2, true)
  const check = step(3, true)

  return (
    <>
      <h4
        className={cn(
          "font-display text-base font-semibold",
          isFinal ? "text-brand-purple" : "text-brand-orange",
          title.className,
        )}
        style={title.style}
      >
        {isFinal && <Sparkles className="mr-1.5 -mt-0.5 inline h-4 w-4" />}
        {slide.title}
      </h4>
      <p
        className={cn(
          "mt-1.5 text-sm leading-relaxed text-foreground",
          body.className,
        )}
        style={body.style}
      >
        {slide.body}
      </p>
      {slide.diagram && (
        <div className={cn("mt-3", diagram.className)} style={diagram.style}>
          <LabDiagramView diagram={slide.diagram} animate={animate} />
        </div>
      )}
      {slide.check && interactive && (
        <div className={check.className} style={check.style}>
          <CheckpointCheck
            ownerId={ownerId}
            slideIndex={slideIndex}
            check={slide.check}
          />
        </div>
      )}
    </>
  )
}

export function LabSlideshow({
  slides,
  ownerId,
}: {
  slides: LabSlide[]
  ownerId: string
}) {
  const [index, setIndex] = useState(0)
  const [outgoing, setOutgoing] = useState<{
    slide: LabSlide
    direction: "forward" | "back"
  } | null>(null)
  const [direction, setDirection] = useState<"forward" | "back">("forward")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const seen = useRef<Set<number>>(new Set([0]))
  const [animateCurrent, setAnimateCurrent] = useState(true)
  const gradientId = useId()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const slide = slides[index]
  const total = slides.length
  const isFinal = index === total - 1
  const offset = CIRCUMFERENCE - ((index + 1) / total) * CIRCUMFERENCE

  function go(next: number) {
    const clamped = Math.max(0, Math.min(total - 1, next))
    if (clamped === index || isTransitioning) return
    const dir = clamped > index ? "forward" : "back"
    setOutgoing({ slide, direction: dir })
    setDirection(dir)
    setAnimateCurrent(!seen.current.has(clamped))
    seen.current.add(clamped)
    setIndex(clamped)
    setIsTransitioning(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setOutgoing(null)
      setIsTransitioning(false)
    }, TRANSITION_MS)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      go(index + 1)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      go(index - 1)
    } else if (e.key === "Home") {
      e.preventDefault()
      go(0)
    } else if (e.key === "End") {
      e.preventDefault()
      go(total - 1)
    }
  }

  return (
    <div
      className="grid grid-cols-[224px_1fr] overflow-hidden rounded-xl border border-border bg-card shadow-[0_10px_30px_-12px_rgba(14,13,11,0.18)] outline-none dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Left rail — the whole journey, always visible */}
      <nav className="flex flex-col border-r border-border bg-muted/20">
        <div className="flex items-center gap-2.5 border-b border-border px-3 py-3">
          <div className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center">
            <svg width={RING_SIZE} height={RING_SIZE} className="-rotate-90">
              <defs>
                <linearGradient
                  id={gradientId}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#F2A93B" />
                  <stop offset="45%" stopColor="#E8792A" />
                  <stop offset="100%" stopColor="#8E44AD" />
                </linearGradient>
              </defs>
              <circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth={RING_STROKE}
              />
              <circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={RADIUS}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth={RING_STROKE}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={offset}
                className="motion-reduce:transition-none"
                style={{
                  transition:
                    "stroke-dashoffset 500ms cubic-bezier(0.4, 0, 0.2, 1)",
                  filter: "drop-shadow(0 0 5px rgba(232, 121, 42, 0.5))",
                }}
              />
            </svg>
            <span className="absolute font-display text-sm font-bold text-foreground">
              {index + 1}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Walkthrough
            </p>
            <p className="font-mono text-[10px] text-muted-foreground">
              Step{" "}
              <span className="font-semibold text-brand-orange">
                {index + 1}
              </span>{" "}
              / {total}
            </p>
          </div>
        </div>

        <ol className="code-scroll flex flex-1 flex-col justify-center gap-0 overflow-y-auto py-2">
          {slides.map((s, i) => {
            const state: "done" | "current" | "upcoming" =
              i < index ? "done" : i === index ? "current" : "upcoming"
            const accent = i === total - 1 ? "purple" : "orange"
            return (
              <li key={i} className="relative">
                <button
                  onClick={() => !isTransitioning && go(i)}
                  aria-current={i === index ? "step" : undefined}
                  aria-label={`Go to step ${i + 1}: ${s.title}`}
                  className="-mx-0 flex w-full items-start gap-2.5 rounded-md px-3 py-1.5 text-left transition-colors duration-200 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="relative flex shrink-0 flex-col items-center self-stretch">
                    <span
                      key={state === "done" ? `done-${i}` : undefined}
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        state === "upcoming" &&
                          "border border-border text-muted-foreground",
                        state === "current" && accent === "purple"
                          ? "border-2 border-brand-purple text-brand-purple shadow-[0_0_0_4px_rgba(142,68,173,0.16)]"
                          : state === "current"
                            ? "border-2 border-brand-orange text-brand-orange shadow-[0_0_0_4px_rgba(232,121,42,0.16)]"
                            : "",
                        state === "done" &&
                          (accent === "purple"
                            ? "animate-pop-check bg-brand-purple text-white motion-reduce:animate-none"
                            : "animate-pop-check bg-brand-orange text-white motion-reduce:animate-none"),
                      )}
                    >
                      {state === "done" ? (
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      ) : (
                        i + 1
                      )}
                    </span>
                    {i < total - 1 && (
                      <span
                        className="mt-0.5 w-px flex-1 border-l-[1.5px] border-border"
                        aria-hidden
                      />
                    )}
                  </span>
                  <span
                    className={cn(
                      "line-clamp-2 pt-0.5 text-sm leading-snug",
                      state === "current" && "font-semibold text-foreground",
                      state === "done" && "text-foreground/70",
                      state === "upcoming" && "text-muted-foreground",
                    )}
                  >
                    {s.title}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Right pane — current slide content */}
      <div className="relative overflow-hidden p-6">
        <div className="relative">
          {outgoing && (
            <div
              className="pointer-events-none absolute inset-0 animate-slide-sink motion-reduce:animate-none"
              style={
                {
                  "--exit-x":
                    outgoing.direction === "forward" ? "-26px" : "26px",
                } as React.CSSProperties
              }
            >
              <SlideContent
                slide={outgoing.slide}
                isFinal={false}
                animate={false}
                ownerId={ownerId}
                slideIndex={-1}
                interactive={false}
                staged={false}
              />
            </div>
          )}
          <div
            key={index}
            style={
              {
                "--enter-x": !outgoing
                  ? "0px"
                  : direction === "forward"
                    ? "26px"
                    : "-26px",
              } as React.CSSProperties
            }
          >
            <SlideContent
              slide={slide}
              isFinal={isFinal}
              animate={animateCurrent}
              ownerId={ownerId}
              slideIndex={index}
            />
          </div>
        </div>

        <div className="relative mt-5 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => go(index - 1)}
            disabled={index === 0}
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          {isFinal ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => go(0)}
              className="text-brand-purple hover:bg-brand-purple/10 hover:text-brand-purple"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Restart
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => go(index + 1)}>
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
