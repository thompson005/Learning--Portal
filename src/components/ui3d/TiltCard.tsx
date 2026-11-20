"use client"

import { useRef } from "react"

import { cn } from "@/lib/utils"

// Subtle pointer-driven 3D tilt. Sets --rx/--ry CSS vars consumed by .tilt3d.
// Disabled under reduced-motion and on coarse (touch) pointers.
export function TiltCard({
  children,
  className,
  max = 7,
}: {
  children: React.ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: React.PointerEvent) {
    const el = ref.current
    if (!el) return
    if (
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia?.("(pointer: coarse)").matches
    )
      return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty("--ry", `${px * max}deg`)
    el.style.setProperty("--rx", `${-py * max}deg`)
  }
  function reset() {
    const el = ref.current
    if (!el) return
    el.style.setProperty("--rx", "0deg")
    el.style.setProperty("--ry", "0deg")
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("tilt3d", className)}
    >
      {children}
    </div>
  )
}
