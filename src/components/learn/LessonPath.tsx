"use client"

import Link from "next/link"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Check, Crown, Lock } from "lucide-react"

import { cn } from "@/lib/utils"
import { activeCurriculum } from "@/lib/data/tracks/registry"
import { useActiveTrackId } from "@/lib/data/tracks/useTrack"
import { getModuleCompletionPercent, getProgress } from "@/lib/store/progress"
import type { Module } from "@/types"

// --- path geometry -----------------------------------------------------------
const BUBBLE = 72 // diameter of a lesson bubble (px)
const ROW_GAP = 132 // vertical distance between bubble centers (px)
const PAD_TOP = 76 // headroom for the floating START label of the first bubble
const PAD_BOTTOM = 48
// Zig-zag pattern: left, center, right, center — a gentle winding spine.
const PATTERN = [-1, 0, 1, 0]

type NodeState = "completed" | "current" | "available" | "locked"

interface PathNode {
  module: Module
  index: number
  percent: number
  state: NodeState
}

/** A module is "started" once any of its topics is in progress or completed. */
function moduleStarted(module: Module, topics: Record<string, { status?: string }>): boolean {
  return module.topics.some((t) => {
    const s = topics[t.id]?.status
    return s === "in_progress" || s === "completed"
  })
}

function buildNodes(curriculum: Module[]): PathNode[] {
  const { topics } = getProgress()
  let currentAssigned = false

  return curriculum.map((module, index) => {
    const percent = getModuleCompletionPercent(module.id)
    const prev = index === 0 ? undefined : curriculum[index - 1]
    const unlocked = index === 0 || (prev ? moduleStarted(prev, topics) : true)

    let state: NodeState
    if (percent >= 100) {
      state = "completed"
    } else if (!unlocked) {
      state = "locked"
    } else if (!currentAssigned) {
      state = "current" // first unlocked, unfinished module
      currentAssigned = true
    } else {
      state = "available"
    }

    return { module, index, percent, state }
  })
}

/** Amplitude of the zig-zag, kept tight enough to stay inside a 375px viewport. */
function ampFor(width: number): number {
  if (width < 400) return 50
  if (width < 768) return 72
  return 104
}

export function LessonPath() {
  // Re-read whenever the track switches or progress changes.
  const trackId = useActiveTrackId()
  const [nodes, setNodes] = useState<PathNode[]>([])

  const refresh = useCallback(() => {
    setNodes(buildNodes(activeCurriculum()))
  }, [])

  useEffect(() => {
    refresh()
    window.addEventListener("technieum:progress-changed", refresh)
    return () => window.removeEventListener("technieum:progress-changed", refresh)
  }, [refresh, trackId])

  // Measure the container so the winding spine scales to the real width.
  const wrapRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(360)
  useLayoutEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const amp = ampFor(width)
  const centerX = width / 2
  const totalHeight = PAD_TOP + Math.max(nodes.length - 1, 0) * ROW_GAP + BUBBLE / 2 + PAD_BOTTOM

  const pointAt = (index: number) => ({
    x: centerX + PATTERN[index % PATTERN.length] * amp,
    y: PAD_TOP + index * ROW_GAP,
  })

  // Smooth S-curve through the bubble centers for the connector trail.
  const spine = nodes
    .map((_, i) => {
      const p = pointAt(i)
      if (i === 0) return `M ${p.x} ${p.y}`
      const prev = pointAt(i - 1)
      const midY = (prev.y + p.y) / 2
      return `C ${prev.x} ${midY}, ${p.x} ${midY}, ${p.x} ${p.y}`
    })
    .join(" ")

  return (
    <div className="w-full">
      <div className="mb-5 px-1">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Your path
        </p>
        <h2 className="font-display text-xl font-semibold text-foreground">
          Lesson path
        </h2>
      </div>

      <div
        ref={wrapRef}
        className="relative mx-auto w-full max-w-xl"
        style={{ height: totalHeight }}
      >
        {/* Winding connector trail behind the bubbles */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0"
          width={width}
          height={totalHeight}
          fill="none"
        >
          <path
            d={spine}
            stroke="hsl(var(--primary) / 0.16)"
            strokeWidth={10}
            strokeLinecap="round"
          />
          <path
            d={spine}
            stroke="hsl(var(--primary) / 0.5)"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="1 14"
          />
        </svg>

        {nodes.map((node) => {
          const { x, y } = pointAt(node.index)
          return (
            <Bubble key={node.module.id} node={node} x={x} y={y} />
          )
        })}
      </div>
    </div>
  )
}

// --- a single lesson bubble --------------------------------------------------
function Bubble({ node, x, y }: { node: PathNode; x: number; y: number }) {
  const { module, index, percent, state } = node
  const isCurrent = state === "current"
  const isCompleted = state === "completed"
  const isLocked = state === "locked"

  // progress ring geometry (shown on the current bubble)
  const R = BUBBLE / 2 + 6
  const C = 2 * Math.PI * R
  const dash = (percent / 100) * C

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
    >
      {/* floating START label for the active lesson */}
      {isCurrent && (
        <div className="absolute -top-11 left-1/2 -translate-x-1/2 motion-safe:animate-bounce">
          <span className="relative block rounded-full bg-brand-orange px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wide text-white shadow-[0_6px_16px_-4px_hsl(var(--primary)/0.6)]">
            Start
            <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-brand-orange" />
          </span>
        </div>
      )}

      <Link
        href={`/modules/${module.id}`}
        aria-label={`${module.name}${
          isCompleted ? " (completed)" : isLocked ? " (locked)" : isCurrent ? " (start here)" : ""
        }`}
        className="group relative grid place-items-center rounded-full outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/40"
        style={{ width: BUBBLE, height: BUBBLE, perspective: 600 }}
      >
        {/* pulsing ring + progress ring for the current bubble */}
        {isCurrent && (
          <>
            <span
              aria-hidden
              className="absolute inset-0 rounded-full border-2 border-brand-orange/70 motion-safe:animate-ping"
            />
            <svg
              aria-hidden
              className="pointer-events-none absolute"
              width={R * 2}
              height={R * 2}
              style={{ transform: "rotate(-90deg)" }}
            >
              <circle
                cx={R}
                cy={R}
                r={R - 2}
                fill="none"
                stroke="hsl(var(--primary) / 0.15)"
                strokeWidth={3}
              />
              {percent > 0 && (
                <circle
                  cx={R}
                  cy={R}
                  r={R - 2}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${C}`}
                />
              )}
            </svg>
          </>
        )}

        {/* the 3D-ish bubble face */}
        <span
          className={cn(
            "relative grid h-full w-full place-items-center rounded-full transition-transform duration-200 ease-out",
            "shadow-[0_8px_0_0_rgba(0,0,0,0.08),0_14px_26px_-10px_rgba(0,0,0,0.45)]",
            "group-hover:-translate-y-0.5 group-active:translate-y-0.5 group-active:shadow-[0_3px_0_0_rgba(0,0,0,0.08),0_8px_16px_-10px_rgba(0,0,0,0.45)]",
            isCompleted &&
              "bg-gradient-to-b from-brand-orange-soft to-brand-orange text-white",
            isCurrent &&
              "glass-strong border border-brand-orange/40 text-brand-orange",
            state === "available" &&
              "glass-strong border border-brand-orange/20 text-foreground/80",
            isLocked && "border border-border bg-muted/60 text-muted-foreground",
          )}
          style={{ transform: "translateZ(14px)" }}
        >
          {/* top sheen for depth */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-2 top-1.5 h-1/3 rounded-full bg-white/35 blur-[2px]"
          />
          <span className="relative">
            {isCompleted ? (
              index === 0 ? (
                <Crown className="h-7 w-7" strokeWidth={2.5} />
              ) : (
                <Check className="h-8 w-8" strokeWidth={3} />
              )
            ) : isLocked ? (
              <Lock className="h-6 w-6" strokeWidth={2.25} />
            ) : (
              <span className="font-display text-2xl font-extrabold leading-none">
                {index + 1}
              </span>
            )}
          </span>
        </span>
      </Link>

      {/* module shortName label beside the bubble */}
      <span
        className={cn(
          "mt-2 max-w-[9rem] text-center font-mono text-[11px] font-medium leading-tight",
          isLocked ? "text-muted-foreground/70" : "text-foreground/80",
        )}
      >
        {module.shortName}
        {isCurrent && percent > 0 && (
          <span className="block text-brand-orange">{percent}%</span>
        )}
      </span>
    </div>
  )
}
