"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  Bot,
  Check,
  Copy,
  Plus,
  RefreshCw,
  Send,
  Sparkles,
  Tag,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Markdown } from "./Markdown"
import { SelectionAsk } from "./SelectionAsk"

interface Msg {
  id: number
  role: "user" | "assistant"
  content: string
  pending?: boolean // assistant placeholder before its first streamed token
}

interface TutorContext {
  title: string
  context: string
}

/** Fire from a topic view to tell the tutor what the learner is reading:
 *  window.dispatchEvent(new CustomEvent("technieum:tutor-context", { detail: {title, context} })) */
const CONTEXT_EVENT = "technieum:tutor-context"
const OPEN_EVENT = "technieum:open-tutor"

function ThinkingDots() {
  return (
    <span className="flex items-center gap-1 py-1" aria-label="Thinking">
      {[0, 150, 300].map((d) => (
        <span
          key={d}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-orange/70 motion-reduce:animate-none"
          style={{ animationDelay: `${d}ms` }}
        />
      ))}
    </span>
  )
}

export function TutorPanel() {
  const [open, setOpen] = useState(false)
  const [render, setRender] = useState(false)
  const [enter, setEnter] = useState(false)

  const [ctx, setCtx] = useState<TutorContext | null>(null)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState("")
  const [streaming, setStreaming] = useState(false)
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const idRef = useRef(0)
  const ctxRef = useRef<TutorContext | null>(null)
  ctxRef.current = ctx

  const nextId = () => ++idRef.current

  // Window-event contract — do not change these event names.
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

  // Mount/enter animation lifecycle for smooth open & close.
  useEffect(() => {
    if (open) {
      setRender(true)
      const r = requestAnimationFrame(() => setEnter(true))
      return () => cancelAnimationFrame(r)
    }
    setEnter(false)
    const t = setTimeout(() => setRender(false), 220)
    return () => clearTimeout(t)
  }, [open])

  // Focus the composer once the panel has animated in.
  useEffect(() => {
    if (enter) {
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [enter])

  // Esc to close.
  useEffect(() => {
    if (!render) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [render])

  // Keep pinned to the latest content as it streams.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [messages, streaming])

  const streamAnswer = useCallback(
    async (question: string, history: { role: Msg["role"]; content: string }[]) => {
      const assistantId = nextId()
      setStreaming(true)
      setMessages((m) => [
        ...m,
        { id: assistantId, role: "assistant", content: "", pending: true },
      ])

      try {
        const res = await fetch("/api/tutor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "ask",
            question,
            topicTitle: ctxRef.current?.title,
            topicContext: ctxRef.current?.context,
            history,
          }),
        })
        if (!res.body) throw new Error("No stream")

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let acc = ""
        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          acc += decoder.decode(value, { stream: true })
          setMessages((m) =>
            m.map((x) =>
              x.id === assistantId ? { ...x, content: acc, pending: false } : x,
            ),
          )
        }
        if (!acc) {
          setMessages((m) =>
            m.map((x) =>
              x.id === assistantId
                ? { ...x, content: "No response.", pending: false }
                : x,
            ),
          )
        }
      } catch {
        setMessages((m) =>
          m.map((x) =>
            x.id === assistantId
              ? {
                  ...x,
                  content: "Couldn't reach the tutor. Try again in a moment.",
                  pending: false,
                }
              : x,
          ),
        )
      } finally {
        setStreaming(false)
      }
    },
    [],
  )

  const send = useCallback(
    (text: string) => {
      const q = text.trim()
      if (!q || streaming) return
      const history = messages
        .slice(-6)
        .map(({ role, content }) => ({ role, content }))
      setMessages((m) => [...m, { id: nextId(), role: "user", content: q }])
      setInput("")
      void streamAnswer(q, history)
    },
    [messages, streaming, streamAnswer],
  )

  function regenerate() {
    if (streaming) return
    const msgs = [...messages]
    while (msgs.length && msgs[msgs.length - 1].role === "assistant") msgs.pop()
    const lastUser = msgs[msgs.length - 1]
    if (!lastUser || lastUser.role !== "user") return
    const history = msgs
      .slice(0, -1)
      .slice(-6)
      .map(({ role, content }) => ({ role, content }))
    setMessages(msgs)
    void streamAnswer(lastUser.content, history)
  }

  function copyMessage(m: Msg) {
    try {
      navigator.clipboard?.writeText(m.content).then(
        () => {
          setCopiedId(m.id)
          setTimeout(() => setCopiedId((c) => (c === m.id ? null : c)), 1500)
        },
        () => {},
      )
    } catch {
      // clipboard unavailable — no-op
    }
  }

  const newChat = useCallback(() => {
    if (streaming) return
    setMessages([])
    setInput("")
    setTimeout(() => inputRef.current?.focus(), 40)
  }, [streaming])

  const askAboutSelection = useCallback(
    (selection: string) => {
      setOpen(true)
      const q = `Explain this${ctxRef.current?.title ? ` in the context of "${ctxRef.current.title}"` : ""}:\n\n"${selection.slice(0, 1200)}"`
      send(q)
    },
    [send],
  )

  const suggestions = ctx
    ? [
        `Explain "${ctx.title}" simply`,
        "Give me a real-world example",
        "Why does this matter to an attacker?",
      ]
    : [
        "What should I learn first?",
        "Explain SQL injection simply",
        "Difference between IAM roles and policies?",
      ]

  const canRegenerate =
    !streaming && messages.some((m) => m.role === "assistant")

  return (
    <>
      {/* Explain-selection floater (hidden while the panel is open) */}
      <SelectionAsk onAsk={askAboutSelection} disabled={render} />

      {/* Launcher */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open AI tutor"
          className="fixed bottom-20 right-4 z-40 flex items-center gap-2 rounded-full bg-brand-orange px-4 py-3 text-sm font-semibold text-white shadow-lift transition-transform hover:scale-105 motion-reduce:transition-none md:bottom-6"
        >
          <Bot className="h-5 w-5" />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      )}

      {/* Panel */}
      {render && (
        <div data-tutor-ui className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            className={cn(
              "absolute inset-0 bg-brand-ink/40 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none",
              enter ? "opacity-100" : "opacity-0",
            )}
          />

          {/* Drawer (full-screen on mobile, wide right drawer on desktop) */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="AI Tutor"
            className={cn(
              "absolute inset-y-0 right-0 flex h-full w-full max-w-2xl flex-col border-l border-border bg-card shadow-lift transition-transform duration-200 ease-out motion-reduce:transition-none",
              enter ? "translate-x-0" : "translate-x-full",
            )}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-brand-orange/[0.05] px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange/15 text-brand-orange">
                <Bot className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">AI Tutor</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Local model · private, on-box
                </p>
              </div>
              <button
                onClick={newChat}
                disabled={streaming || messages.length === 0}
                className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-brand-orange/40 hover:text-foreground disabled:opacity-40"
                aria-label="New chat"
              >
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">New chat</span>
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-brand-orange/[0.08] hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Context chip */}
            {ctx && (
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <span className="flex items-center gap-1.5 rounded-full bg-brand-orange/10 px-2.5 py-1 text-xs font-medium text-brand-orange">
                  <Tag className="h-3 w-3" />
                  <span className="max-w-[16rem] truncate">{ctx.title}</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  current topic
                </span>
              </div>
            )}

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-4 py-5"
            >
              {messages.length === 0 && (
                <div className="mx-auto max-w-xl space-y-5 pt-6">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange">
                      <Sparkles className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-base font-semibold text-foreground">
                        Ask me anything
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        I run on a local model, so your questions stay on the
                        network. Select any text on the page to ask about it.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-2xl border border-border bg-background px-3.5 py-3 text-left text-sm text-foreground shadow-chip transition-colors hover:border-brand-orange/40 hover:bg-brand-orange/[0.04]"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex flex-col gap-1",
                    m.role === "user" ? "items-end" : "items-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm",
                      m.role === "user"
                        ? "rounded-br-md bg-brand-orange text-white"
                        : "rounded-bl-md border border-border bg-background text-foreground",
                    )}
                  >
                    {m.role === "user" ? (
                      <span className="whitespace-pre-wrap [overflow-wrap:anywhere]">
                        {m.content}
                      </span>
                    ) : m.pending ? (
                      <ThinkingDots />
                    ) : (
                      <Markdown content={m.content} />
                    )}
                  </div>

                  {/* Assistant message actions */}
                  {m.role === "assistant" && !m.pending && (
                    <div className="flex items-center gap-1 pl-1">
                      <button
                        onClick={() => copyMessage(m)}
                        aria-label="Copy answer"
                        className="flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-brand-orange"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="h-3 w-3" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" /> Copy
                          </>
                        )}
                      </button>
                      {m.id === messages[messages.length - 1]?.id &&
                        canRegenerate && (
                          <button
                            onClick={regenerate}
                            aria-label="Regenerate answer"
                            className="flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-brand-orange"
                          >
                            <RefreshCw className="h-3 w-3" /> Regenerate
                          </button>
                        )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="border-t border-border p-3"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-border bg-background px-3 py-2 focus-within:border-brand-orange/50 focus-within:ring-2 focus-within:ring-brand-orange/20">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      send(input)
                    }
                  }}
                  rows={1}
                  placeholder="Ask the tutor…  (Enter to send, Shift+Enter for a new line)"
                  className="max-h-32 min-h-[1.5rem] min-w-0 flex-1 resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || streaming}
                  aria-label="Send"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-orange text-white transition-colors hover:bg-brand-orange-strong disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
