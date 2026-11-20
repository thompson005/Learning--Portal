"use client"

import { useRef } from "react"

import { cn } from "@/lib/utils"

/**
 * Hero3D — a genuinely 3D decorative crystal for glass hero sections.
 *
 * Built with CSS 3D transforms only (zero dependencies): an octahedron gem made
 * of 8 translucent triangular faces. Two 4-sided pyramids share an equator — the
 * top faces fold up to a shared apex, the bottom faces fold down, using
 * `rotateY(i*90) translateZ(half) rotateX(±lean)` about each base edge so every
 * apex meets. The gem auto-rotates on the Y axis (`preserve-3d`), and a pointer
 * layer parallax-tilts the whole thing toward the cursor. Purely decorative
 * (aria-hidden), GPU transforms only, and reduced-motion safe (no auto-spin).
 *
 * Geometry: base half = 52px, apex height = 64px → slant ≈ 82px,
 * lean from vertical = atan(52/64) ≈ 39deg.
 */

const FACES = [0, 1, 2, 3] as const

// Per-facet translucent ember shading for a faceted, light-catching look.
// [top-color-alpha, bottom-color-alpha] of each face's gradient.
const FACET_ALPHA: Array<[number, number]> = [
  [0.6, 0.3],
  [0.5, 0.22],
  [0.42, 0.18],
  [0.52, 0.26],
]

function facet(i: number) {
  const [a, b] = FACET_ALPHA[i % FACET_ALPHA.length]
  return `linear-gradient(160deg, rgba(255,186,120,${a}), rgba(234,120,30,${b}))`
}

const CSS = `
.hero3d-scene { perspective: 760px; display: grid; place-items: center; }
.hero3d-stage {
  position: relative;
  width: 160px; height: 160px;
  transform-style: preserve-3d;
  transform: scale(0.9);
}
@media (min-width: 768px) { .hero3d-stage { transform: scale(1.1); } }

.hero3d-glow {
  position: absolute; left: 50%; top: 66%;
  width: 128px; height: 42px;
  transform: translate(-50%, 0);
  background: radial-gradient(ellipse at center, rgba(234,120,30,0.30), rgba(234,120,30,0) 70%);
  filter: blur(11px);
  animation: hero3d-breathe 6s ease-in-out infinite;
}

.hero3d-tilt {
  position: absolute; inset: 0;
  transform-style: preserve-3d;
  transform: rotateX(var(--hy, 0deg)) rotateY(var(--hx, 0deg));
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.hero3d-gem {
  position: absolute; inset: 0;
  transform-style: preserve-3d;
  animation: hero3d-spin 13s linear infinite;
}

.hero3d-f {
  position: absolute; left: 50%; width: 104px; margin-left: -52px; height: 82px;
  border: 1px solid rgba(255,255,255,0.6);
  box-shadow: inset 0 0 18px rgba(255,255,255,0.22);
  backface-visibility: visible;
}
.hero3d-top { bottom: 50%; transform-origin: 50% 100%; clip-path: polygon(50% 0, 100% 100%, 0 100%); }
.hero3d-bot { top: 50%;    transform-origin: 50% 0%;   clip-path: polygon(0 0, 100% 0, 50% 100%); }

@keyframes hero3d-spin {
  from { transform: rotateX(-14deg) rotateY(0deg); }
  to   { transform: rotateX(-14deg) rotateY(360deg); }
}
@keyframes hero3d-breathe {
  0%, 100% { opacity: 0.85; transform: translate(-50%, 0) scale(1); }
  50%      { opacity: 1;    transform: translate(-50%, 0) scale(1.08); }
}

@media (prefers-reduced-motion: reduce) {
  .hero3d-gem { animation: none; transform: rotateX(-14deg) rotateY(34deg); }
  .hero3d-glow { animation: none; }
}
`

export function Hero3D({ className }: { className?: string }) {
  const tiltRef = useRef<HTMLDivElement>(null)

  function onMove(e: React.PointerEvent) {
    const el = tiltRef.current
    if (!el) return
    if (
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia?.("(pointer: coarse)").matches
    )
      return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty("--hx", `${px * 22}deg`)
    el.style.setProperty("--hy", `${-py * 22}deg`)
  }

  function reset() {
    const el = tiltRef.current
    if (!el) return
    el.style.setProperty("--hx", "0deg")
    el.style.setProperty("--hy", "0deg")
  }

  return (
    <div
      aria-hidden
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("hero3d-scene", className)}
    >
      <style>{CSS}</style>
      <div className="hero3d-stage">
        <div className="hero3d-glow" />
        <div ref={tiltRef} className="hero3d-tilt">
          <div className="hero3d-gem">
            {FACES.map((i) => (
              <div
                key={`t${i}`}
                className="hero3d-f hero3d-top"
                style={{
                  background: facet(i),
                  transform: `rotateY(${i * 90}deg) translateZ(52px) rotateX(39deg)`,
                }}
              />
            ))}
            {FACES.map((i) => (
              <div
                key={`b${i}`}
                className="hero3d-f hero3d-bot"
                style={{
                  background: facet(i + 2),
                  transform: `rotateY(${i * 90}deg) translateZ(52px) rotateX(-39deg)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
