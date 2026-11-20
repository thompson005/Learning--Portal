"use client"

import { useEffect, useRef, useState } from "react"

/** Animates a number from 0 (or a previous value) up to `value` on mount and on
 *  change. Respects reduced-motion. Pure presentational — no store coupling. */
export function CountUp({
  value,
  duration = 900,
  className,
  format = (n) => n.toLocaleString(),
}: {
  value: number
  duration?: number
  className?: string
  format?: (n: number) => string
}) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(value)
      return
    }
    const from = fromRef.current
    const to = value
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(from + (to - from) * eased))
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
      else fromRef.current = to
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      fromRef.current = value
    }
  }, [value, duration])

  return <span className={className}>{format(display)}</span>
}
