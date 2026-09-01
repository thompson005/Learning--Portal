"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

type BarColor = "teal" | "orange" | "green" | "blue" | "purple" | "red"

const COLOR_MAP: Record<BarColor, string> = {
  teal: "bg-brand-teal",
  orange: "bg-brand-orange",
  green: "bg-brand-green",
  blue: "bg-brand-blue",
  purple: "bg-brand-purple",
  red: "bg-brand-red",
}

export function ProgressBar({
  value,
  color = "teal",
  className,
  trackClassName,
}: {
  value: number
  color?: BarColor
  className?: string
  trackClassName?: string
}) {
  const [mounted, setMounted] = useState(false)
  const clamped = Math.min(100, Math.max(0, value))

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className={cn("h-1 w-full overflow-hidden rounded-full bg-muted", trackClassName)}>
      <div
        className={cn("h-full rounded-full transition-[width] duration-700 ease-out", COLOR_MAP[color], className)}
        style={{ width: mounted ? `${clamped}%` : "0%" }}
      />
    </div>
  )
}
