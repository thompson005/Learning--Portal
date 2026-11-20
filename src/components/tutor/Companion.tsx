"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Teki — the floating AI companion. Always present, alive (cursor-tracking
// eyes, idle float + blink), status-aware (idle / thinking / happy), gives
// contextual tips, and opens the tutor chat on click. Draggable; position is
// remembered. This component IS the launcher for TutorPanel (it dispatches the
// shared "technieum:open-tutor" event).
// ---------------------------------------------------------------------------

const OPEN_EVENT = "technieum:open-tutor"
const BUSY_EVENT = "technieum:tutor-busy" // { busy: boolean }
const REACT_EVENT = "technieum:companion" // { mood: "happy"|"tip"|"idle", text?: string }
const POS_KEY = "technieum_companion_pos"
const SEEN_KEY = "technieum_companion_seen"

type Mood = "idle" | "thinking" | "happy"

const SIZE = 68

const ROUTE_TIPS: { match: (p: string) => boolean; tips: string[] }[] = [
  {
    match: (p) => p.startsWith("/modules"),
    tips: [
      "See the orange dotted words? Hover one for an instant definition.",
      "Select any text on the page and I'll explain it.",
      "Finish the walkthrough to the last step for a little surprise. ✨",
      "Stuck on an exercise? Tap me — I'll give you a hint.",
    ],
  },
  {
    match: (p) => p.startsWith("/dashboard"),
    tips: [
      "You've got quests waiting on the board. Easy XP!",
      "Keep your daily streak alive — even one topic counts.",
      "Tap me anytime you want to talk something through.",
    ],
  },
  {
    match: (p) => p.startsWith("/labs"),
    tips: ["Labs run real targets. Fire one up and get your hands dirty.", "One lab at a time — finish strong."],
  },
  {
    match: (p) => p.startsWith("/achievements"),
    tips: ["Chase those badges — bronze to platinum.", "Locked badges show exactly what you need. Go get 'em."],
  },
  {
    match: (p) => p.startsWith("/paths"),
    tips: ["Three full tracks here. Pick the one that excites you.", "Your progress is tracked per track."],
  },
]

function pickTip(pathname: string): string {
  const group = ROUTE_TIPS.find((r) => r.match(pathname))
  const pool = group?.tips ?? [
    "Need a hand? Tap me to chat.",
    "I can explain anything you select on the page.",
  ]
  return pool[Math.floor(Math.random() * pool.length)]
}

function Mascot({
  mood,
  pupil,
  blink,
}: {
  mood: Mood
  pupil: { dx: number; dy: number }
  blink: boolean
}) {
  const thinking = mood === "thinking"
  const happy = mood === "happy"
  // Eye shape: happy = arcs, otherwise round pupils that track the cursor.
  return (
    <svg viewBox="0 0 72 72" width={SIZE} height={SIZE} aria-hidden>
      <defs>
        <linearGradient id="teki-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0793a" />
          <stop offset="55%" stopColor="#e8792a" />
          <stop offset="100%" stopColor="#d2691e" />
        </linearGradient>
        <radialGradient id="teki-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd9b0" />
          <stop offset="100%" stopColor="#ff9a4d" />
        </radialGradient>
      </defs>

      {/* antenna */}
      <line x1="36" y1="12" x2="36" y2="4" stroke="#d2691e" strokeWidth="2.5" strokeLinecap="round" />
      <circle
        cx="36"
        cy="4"
        r={thinking ? 3.4 : 2.6}
        fill="url(#teki-glow)"
        className={thinking ? "animate-glow" : ""}
      />

      {/* body */}
      <rect x="10" y="12" width="52" height="48" rx="20" fill="url(#teki-body)" />
      {/* soft top highlight */}
      <rect x="16" y="16" width="40" height="16" rx="10" fill="#ffffff" opacity="0.14" />

      {/* visor / face screen */}
      <rect x="17" y="24" width="38" height="26" rx="12" fill="#1a120c" opacity="0.92" />

      {/* eyes */}
      {happy ? (
        <>
          <path d="M24 38 q5 -6 10 0" stroke="#ffcf99" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M38 38 q5 -6 10 0" stroke="#ffcf99" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <g transform={`translate(${pupil.dx}, ${thinking ? -1.5 : pupil.dy})`}>
          <ellipse cx="29" cy="37" rx="4" ry={blink ? 0.6 : 4} fill="#ffcf99" />
          <ellipse cx="43" cy="37" rx="4" ry={blink ? 0.6 : 4} fill="#ffcf99" />
          {!blink && (
            <>
              <circle cx="30.4" cy="35.6" r="1.1" fill="#fff" opacity="0.9" />
              <circle cx="44.4" cy="35.6" r="1.1" fill="#fff" opacity="0.9" />
            </>
          )}
        </g>
      )}

      {/* cheeks */}
      <circle cx="20" cy="45" r="2.4" fill="#ff7a1f" opacity="0.5" />
      <circle cx="52" cy="45" r="2.4" fill="#ff7a1f" opacity="0.5" />

      {/* little feet */}
      <rect x="22" y="58" width="10" height="5" rx="2.5" fill="#d2691e" />
      <rect x="40" y="58" width="10" height="5" rx="2.5" fill="#d2691e" />
    </svg>
  )
}

export function Companion() {
  const pathname = usePathname()
  const [mood, setMood] = useState<Mood>("idle")
  const [pupil, setPupil] = useState({ dx: 0, dy: 0 })
  const [blink, setBlink] = useState(false)
  const [bubble, setBubble] = useState<string | null>(null)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [dragging, setDragging] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const dragState = useRef<{ ox: number; oy: number; moved: boolean } | null>(null)
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const moodTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reduceMotion = useRef(false)

  // Initial position (bottom-right), restored from storage, clamped to viewport.
  useEffect(() => {
    reduceMotion.current =
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    const def = {
      x: window.innerWidth - SIZE - 20,
      y: window.innerHeight - SIZE - 88,
    }
    try {
      const raw = window.localStorage.getItem(POS_KEY)
      const saved = raw ? (JSON.parse(raw) as { x: number; y: number }) : null
      const p = saved ?? def
      setPos({
        x: Math.min(Math.max(8, p.x), window.innerWidth - SIZE - 8),
        y: Math.min(Math.max(8, p.y), window.innerHeight - SIZE - 8),
      })
    } catch {
      setPos(def)
    }
  }, [])

  const showBubble = useCallback((text: string, ms = 6000) => {
    setBubble(text)
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current)
    bubbleTimer.current = setTimeout(() => setBubble(null), ms)
  }, [])

  const flashMood = useCallback((m: Mood, ms = 2600) => {
    setMood(m)
    if (moodTimer.current) clearTimeout(moodTimer.current)
    moodTimer.current = setTimeout(() => setMood("idle"), ms)
  }, [])

  // First-ever greeting.
  useEffect(() => {
    try {
      if (!window.localStorage.getItem(SEEN_KEY)) {
        setTimeout(() => showBubble("Hi, I'm Teki! Tap me anytime for help. 👋", 7000), 1200)
        window.localStorage.setItem(SEEN_KEY, "1")
      }
    } catch {
      /* ignore */
    }
  }, [showBubble])

  // Contextual tip on route change (skip the very first paint to avoid noise).
  const firstRoute = useRef(true)
  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false
      return
    }
    const t = setTimeout(() => showBubble(pickTip(pathname)), 1400)
    return () => clearTimeout(t)
  }, [pathname, showBubble])

  // Idle tips on a slow loop.
  useEffect(() => {
    const iv = setInterval(() => {
      if (document.hidden) return
      if (Math.random() < 0.5) showBubble(pickTip(pathname))
    }, 45000)
    return () => clearInterval(iv)
  }, [pathname, showBubble])

  // Blink loop.
  useEffect(() => {
    if (reduceMotion.current) return
    let alive = true
    const loop = () => {
      if (!alive) return
      setBlink(true)
      setTimeout(() => setBlink(false), 130)
      const next = 2600 + Math.random() * 3200
      blinkTimer = setTimeout(loop, next)
    }
    let blinkTimer = setTimeout(loop, 2600)
    return () => {
      alive = false
      clearTimeout(blinkTimer)
    }
  }, [])

  // Cursor-tracking eyes.
  useEffect(() => {
    if (reduceMotion.current) return
    let raf = 0
    function onMove(e: MouseEvent) {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const el = rootRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const ang = Math.atan2(e.clientY - cy, e.clientX - cx)
        const dist = Math.min(2.6, Math.hypot(e.clientX - cx, e.clientY - cy) / 60)
        setPupil({ dx: Math.cos(ang) * dist, dy: Math.sin(ang) * dist })
      })
    }
    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // React to app events: tutor busy → thinking; celebrations → happy.
  useEffect(() => {
    function onBusy(e: Event) {
      const busy = (e as CustomEvent).detail?.busy
      setMood(busy ? "thinking" : "idle")
    }
    function onReact(e: Event) {
      const { mood: m, text } = (e as CustomEvent).detail ?? {}
      if (m === "happy") flashMood("happy", 2800)
      if (text) showBubble(text, 5000)
    }
    window.addEventListener(BUSY_EVENT, onBusy)
    window.addEventListener(REACT_EVENT, onReact)
    return () => {
      window.removeEventListener(BUSY_EVENT, onBusy)
      window.removeEventListener(REACT_EVENT, onReact)
    }
  }, [flashMood, showBubble])

  // Drag handling (pointer). A small move threshold distinguishes drag from tap.
  function onPointerDown(e: React.PointerEvent) {
    if (!pos) return
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    dragState.current = { ox: e.clientX - pos.x, oy: e.clientY - pos.y, moved: false }
  }
  function onPointerMove(e: React.PointerEvent) {
    const d = dragState.current
    if (!d) return
    const nx = e.clientX - d.ox
    const ny = e.clientY - d.oy
    if (!d.moved && Math.hypot(nx - pos!.x, ny - pos!.y) > 5) {
      d.moved = true
      setDragging(true)
    }
    if (d.moved) {
      setPos({
        x: Math.min(Math.max(8, nx), window.innerWidth - SIZE - 8),
        y: Math.min(Math.max(8, ny), window.innerHeight - SIZE - 8),
      })
    }
  }
  function onPointerUp(e: React.PointerEvent) {
    const d = dragState.current
    dragState.current = null
    if (d && d.moved) {
      setDragging(false)
      if (pos) {
        try {
          window.localStorage.setItem(POS_KEY, JSON.stringify(pos))
        } catch {
          /* ignore */
        }
      }
      return
    }
    // Treated as a tap → open the tutor.
    e.preventDefault()
    window.dispatchEvent(new CustomEvent(OPEN_EVENT))
  }

  if (!pos) return null

  // Bubble sits above the mascot, flipping to the left if near the right edge.
  const nearRight = typeof window !== "undefined" && pos.x > window.innerWidth - 300
  const statusLabel =
    mood === "thinking" ? "Thinking…" : mood === "happy" ? "Nice!" : "Online"

  return (
    <div
      ref={rootRef}
      className="fixed z-50 select-none"
      style={{ left: pos.x, top: pos.y, width: SIZE, height: SIZE, touchAction: "none" }}
    >
      {/* Speech bubble */}
      {bubble && (
        <div
          className={cn(
            "absolute bottom-[calc(100%+10px)] w-max max-w-[240px] rounded-2xl border border-border bg-card px-3 py-2 text-xs leading-relaxed text-foreground shadow-lift",
            "animate-in fade-in slide-in-from-bottom-1 duration-200 motion-reduce:animate-none",
            nearRight ? "right-0" : "left-0",
          )}
        >
          <span className="mr-1 font-semibold text-brand-orange">Teki:</span>
          {bubble}
          <span
            className={cn(
              "absolute top-full h-3 w-3 -translate-y-1.5 rotate-45 border-b border-r border-border bg-card",
              nearRight ? "right-5" : "left-5",
            )}
          />
        </div>
      )}

      {/* Mascot button */}
      <button
        type="button"
        aria-label="Teki — open AI tutor"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className={cn(
          "relative block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50",
          dragging ? "cursor-grabbing" : "cursor-pointer",
          !reduceMotion.current && !dragging && "animate-float",
          mood === "happy" && !reduceMotion.current && "animate-bounce",
        )}
        style={{ width: SIZE, height: SIZE, filter: "drop-shadow(0 8px 14px rgba(210,105,30,0.35))" }}
        title="Ask Teki"
      >
        <Mascot mood={mood} pupil={pupil} blink={blink} />
        {/* status dot */}
        <span
          className={cn(
            "absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-card",
            mood === "thinking" ? "bg-amber-400" : "bg-brand-green",
          )}
          title={statusLabel}
        />
      </button>
    </div>
  )
}
