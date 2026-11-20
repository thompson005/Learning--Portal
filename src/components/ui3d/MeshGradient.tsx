"use client"

import { cn } from "@/lib/utils"

// Animated pastel mesh-gradient backdrop for heroes. Pure CSS (zero deps),
// light-theme tuned, low-opacity so text stays legible. Decorative only.
const BLOBS = [
  { c: "var(--mesh-2)", o: 0.4, s: "46%", t: "-8%", l: "-6%", anim: "mesh-drift-a", dur: "16s" },
  { c: "var(--mesh-1)", o: 0.5, s: "42%", t: "10%", l: "55%", anim: "mesh-drift-b", dur: "20s" },
  { c: "var(--mesh-3)", o: 0.28, s: "40%", t: "40%", l: "18%", anim: "mesh-drift-a", dur: "24s" },
  { c: "var(--mesh-4)", o: 0.24, s: "36%", t: "48%", l: "72%", anim: "mesh-drift-b", dur: "18s" },
]

export function MeshGradient({
  className,
  strength = 1,
}: {
  className?: string
  strength?: number
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {BLOBS.map((b, i) => (
        <span
          key={i}
          className="mesh-blob"
          style={{
            width: b.s,
            height: b.s,
            top: b.t,
            left: b.l,
            opacity: b.o * strength,
            background: `radial-gradient(circle at 50% 50%, rgba(${b.c}, 0.9), rgba(${b.c}, 0) 70%)`,
            animation: `${b.anim} ${b.dur} ease-in-out infinite`,
            animationDelay: `${i * -3}s`,
          }}
        />
      ))}
    </div>
  )
}
