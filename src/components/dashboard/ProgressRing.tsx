"use client"

import { useEffect, useState } from "react"

export function ProgressRing({
  value,
  size = 140,
  strokeWidth = 12,
  label,
  gradient = false,
}: {
  value: number
  size?: number
  strokeWidth?: number
  label?: string
  gradient?: boolean
}) {
  const [animated, setAnimated] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.min(100, Math.max(0, value))
  const gradientId = "progress-ring-ember"

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(clamped), 100)
    return () => clearTimeout(timeout)
  }, [clamped])

  const offset = circumference - (animated / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {gradient && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F2A93B" />
              <stop offset="45%" stopColor="#E8792A" />
              <stop offset="100%" stopColor="#8E44AD" />
            </linearGradient>
          </defs>
        )}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={gradient ? `url(#${gradientId})` : "#1ABC9C"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-bold text-foreground">{clamped}%</span>
        {label && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
    </div>
  )
}
