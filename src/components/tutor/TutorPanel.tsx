"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Loader2, Send, Sparkles, X } from "lucide-react"

import { cn } from "@/lib/utils"

interface Msg {
  role: "user" | "assistant"
  content: string
}

interface TutorContext {
  title: string
  context: string
}

/** Fire from a topic view to tell the tutor what the learner is reading:
 *  window.dispatchEvent(new CustomEvent("technieum:tutor-context", { detail: {title, context} })) */
const CONTEXT_EVENT = "technieum:tutor-context"
const OPEN_EVENT = "technieum:open-tutor"

export function TutorPanel() {
  const [open, setOpen] = useState(false)
  const [ctx, setCtx] = useState<TutorContext | null>(null)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onCtx(e: Event) {
      const d = (e as CustomEvent).detail as TutorContext
      if (d?.title) setCtx(d)
    }
    function onOpen() {
      setOpen(true)
    }
    window.addEventListener(CONTEXT_EVENT, onCtx)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => {
      window.removeEventListener(CONTEXT_EVENT, onCtx)
      window.removeEventListener(OPEN_EVENT, onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80)
  }, [open])

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, loading])

  async function send(text: string) {
    const q = text.trim()
    if (!q || loading) return
    const history = messages.slice(-6)
    setMessages((m) => [...m, { role: "user", content: q }])
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "ask",
          question: q,
          topicTitle: ctx?.title,
          topicContext: ctx?.context,
          history,
        }),
      })
      const data = await res.json()
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply ?? "No response." },
      ])
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Couldn't reach the tutor. Try again in a moment.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const suggestions = ctx
    ? [
        `Explain "${ctx.title}" simply`,
        `Give me a real-world example`,
        `Why does this matter to an attacker?`,
      ]
    : [
        "What should I learn first?",
        "Explain SQL injection simply",
        "Difference between IAM roles and policies?",
      ]

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open AI tutor"
          className="fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full bg-brand-orange px-4 py-3 text-sm font-semibold text-white shadow-lift transition-transform hover:scale-105 md:bottom-6"
        >
          <Bot className="h-5 w-5" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-4 z-50 flex h-[32rem] max-h-[calc(100dvh-7rem)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lift md:bottom-6 md:max-h-[calc(100dvh-4rem)]">
          {/* Header */}
          <div className="flex items-center gap-2.5 border-b border-border bg-brand-orange/[0.06] px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
              <Bot className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">AI Tutor</p>
              <p className="truncate font-mono text-[10px] text-muted-foreground">
                {ctx ? ctx.title : "Local model — private, on-box"}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  <p className="text-sm text-muted-foreground">
                    Ask me anything about what you&apos;re learning. I run on a
                    local model, so your questions stay on the network.
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-lg border border-border px-3 py-2 text-left text-xs text-foreground transition-colors hover:border-brand-orange/40 hover:bg-brand-orange/[0.04]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  m.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm",
                    m.role === "user"
                      ? "rounded-br-md bg-brand-orange text-white"
                      : "rounded-bl-md border border-border bg-background text-foreground",
                  )}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Thinking…
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the tutor…"
              className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-orange/50 focus:ring-2 focus:ring-brand-orange/20"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-orange text-white transition-colors hover:bg-brand-orange/90 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
