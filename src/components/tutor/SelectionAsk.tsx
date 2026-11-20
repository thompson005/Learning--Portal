"use client"

// Floating "Ask AI about this" button that appears near a text selection
// anywhere on the page. Selections shorter than MIN_LEN, or made inside the
// tutor UI itself (marked with data-tutor-ui), are ignored. The floater hides
// on scroll, click-away, and when the selection collapses.

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

const MIN_LEN = 12

interface Pos {
  x: number
  y: number
}

export function SelectionAsk({
  onAsk,
  disabled,
}: {
  onAsk: (text: string) => void
  disabled?: boolean
}) {
  const [pos, setPos] = useState<Pos | null>(null)
  const [text, setText] = useState("")

  useEffect(() => {
    if (disabled) {
      setPos(null)
      return
    }

    function update() {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        setPos(null)
        return
      }
      const str = sel.toString().trim()
      if (str.length < MIN_LEN) {
        setPos(null)
        return
      }
      // Ignore selections that live inside the tutor UI.
      const anchor = sel.anchorNode
      const el =
        anchor &&
        (anchor.nodeType === Node.TEXT_NODE
          ? anchor.parentElement
          : (anchor as Element))
      if (el && el.closest && el.closest("[data-tutor-ui]")) {
        setPos(null)
        return
      }
      const rect = sel.getRangeAt(0).getBoundingClientRect()
      if (!rect || (rect.width === 0 && rect.height === 0)) {
        setPos(null)
        return
      }
      setText(str)
      setPos({ x: rect.left + rect.width / 2, y: rect.top })
    }

    // Defer to let the browser finalize the selection after mouseup.
    const onMouseUp = () => window.setTimeout(update, 0)
    const onSelChange = () => {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed) setPos(null)
    }
    const onScroll = () => setPos(null)

    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("selectionchange", onSelChange)
    window.addEventListener("scroll", onScroll, true)
    return () => {
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("selectionchange", onSelChange)
      window.removeEventListener("scroll", onScroll, true)
    }
  }, [disabled])

  if (!pos) return null

  return (
    <button
      type="button"
      data-tutor-ui
      // Keep the selection alive through the click so onAsk gets the text.
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => {
        onAsk(text)
        setPos(null)
        window.getSelection()?.removeAllRanges()
      }}
      style={{ left: pos.x, top: pos.y }}
      className="fixed z-[60] flex -translate-x-1/2 -translate-y-[calc(100%+8px)] items-center gap-1.5 rounded-full border border-brand-orange/30 bg-card px-3 py-1.5 text-xs font-semibold text-brand-orange shadow-lift transition-colors hover:border-brand-orange/60 hover:bg-brand-orange/[0.06] motion-reduce:transition-none"
    >
      <Sparkles className="h-3.5 w-3.5" />
      Ask AI about this
    </button>
  )
}
