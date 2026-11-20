"use client"

import { useEffect, useId, useState } from "react"

import { cn } from "@/lib/utils"

/** Circular progress ring with an animated draw-on and an optional gradient
 *  stroke. Put any content (number, icon, label) in `children` — it's centered.
 *  Presentational only. */
export function StatRing({
  value,
  size = 120,
  strokeWidth = 10,
  gradient = true,
  trackClass = "text-muted",
  className,
  children,
}: {
  value: number // 0-100
  size?: number
  strokeWidth?: number
  gradient?: boolean
  trackClass?: string
  className?: string
  children?: React.ReactNode
}) {
  const id = useId()
  const [draw, setDraw] = useState(0)
  const r = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r
  const clamped = Math.max(0, Math.min(100, value))

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setDraw(clamped)
      return
    }
    const t = setTimeout(() => setDraw(clamped), 60)
    return () => clearTimeout(t)
  }, [clamped])

  const offset = circumference - (draw / 100) * circumference

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e85d04" />
            <stop offset="55%" stopColor="#f0793a" />
            <stop offset="100%" stopColor="#ff9a4d" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={trackClass}
          opacity={0.35}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={gradient ? `url(#${id})` : "currentColor"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(!gradient && "text-brand-orange", "motion-reduce:transition-none")}
          style={{
            transition: "stroke-dashoffset 900ms cubic-bezier(0.16,1,0.3,1)",
            filter: "drop-shadow(0 0 5px rgba(232,121,42,0.4))",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
