import { NextRequest } from "next/server"

import { tutorChatStream, type ChatMessage } from "@/lib/server/ollama"

export const runtime = "nodejs"
export const maxDuration = 60

type Mode = "ask" | "hint" | "grade"

interface TutorBody {
  mode?: Mode
  topicTitle?: string
  topicContext?: string
  question?: string
  userAnswer?: string
  history?: { role: "user" | "assistant"; content: string }[]
}

const cap = (s: unknown, n: number) =>
  typeof s === "string" ? s.slice(0, n) : ""

const BASE_SYSTEM =
  "You are the Technieum tutor, a concise expert instructor inside a hands-on cybersecurity, AI-security and cloud-security training portal. " +
  "Explain clearly and accurately for a motivated learner. Prefer short paragraphs and concrete examples. Never invent CVE IDs, tool flags or command syntax you are unsure of. " +
  "Keep answers focused on what was asked. You may use light markdown (code blocks, inline `code`, bold, lists) when it aids clarity."

/** The graceful fallback streamed when the local model is unreachable. */
const FALLBACK =
  "The AI tutor isn't reachable right now. It runs on a local model (Ollama) — an admin can start it with `ollama serve` and pull a model (e.g. `ollama pull llama3.1`). Meanwhile, check the walkthrough slides and quick-check questions for this topic."

function buildMessages(body: TutorBody): ChatMessage[] {
  const mode: Mode = body.mode ?? "ask"
  const title = cap(body.topicTitle, 200)
  const context = cap(body.topicContext, 4000)
  const contextBlock = title
    ? `The learner is studying the topic "${title}".${context ? ` Reference material:\n"""\n${context}\n"""` : ""}`
    : ""

  const messages: ChatMessage[] = []

  if (mode === "hint") {
    messages.push({
      role: "system",
      content:
        BASE_SYSTEM +
        " The learner is stuck and asked for a HINT. Give ONE nudge that points them in the right direction. Do NOT reveal the full answer — guide, don't solve. Two sentences maximum.",
    })
    if (contextBlock) messages.push({ role: "user", content: contextBlock })
    messages.push({
      role: "user",
      content: `I'm stuck on this: ${cap(body.question, 1500)}`,
    })
    return messages
  }

  if (mode === "grade") {
    messages.push({
      role: "system",
      content:
        BASE_SYSTEM +
        " The learner submitted a free-text answer. Grade it: say whether it is correct, partially correct, or incorrect, then explain in 2-4 sentences what was right and what was missing or wrong. Be encouraging but honest.",
    })
    if (contextBlock) messages.push({ role: "user", content: contextBlock })
    messages.push({
      role: "user",
      content: `Question: ${cap(body.question, 1500)}\n\nMy answer: ${cap(body.userAnswer, 2000)}`,
    })
    return messages
  }

  // ask (default) — conversational, context-aware, supports short history
  messages.push({
    role: "system",
    content:
      BASE_SYSTEM +
      (contextBlock ? `\n\n${contextBlock}` : "") +
      " Answer the learner's question. If it is unrelated to the topic, still help, but stay within security/AI/cloud learning.",
  })
  for (const turn of (body.history ?? []).slice(-6)) {
    if (turn.role === "user" || turn.role === "assistant") {
      messages.push({ role: turn.role, content: cap(turn.content, 2000) })
    }
  }
  messages.push({ role: "user", content: cap(body.question, 2000) })
  return messages
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as TutorBody | null
  if (!body || !body.question?.trim()) {
    return new Response("A question is required.", {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  }

  const messages = buildMessages(body)
  const temperature = body.mode === "grade" ? 0.2 : 0.4
  const maxTokens = body.mode === "hint" ? 160 : 600

  const encoder = new TextEncoder()
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let any = false
      try {
        for await (const delta of tutorChatStream(messages, {
          temperature,
          maxTokens,
        })) {
          if (delta) {
            any = true
            controller.enqueue(encoder.encode(delta))
          }
        }
      } catch {
        // Ollama unreachable / errored — fall through to the fallback below.
      }
      // Nothing produced (unreachable, empty, or errored before first token):
      // stream the graceful fallback instead of returning a 500.
      if (!any) controller.enqueue(encoder.encode(FALLBACK))
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      // Disable proxy buffering so deltas reach the browser as they arrive.
      "X-Accel-Buffering": "no",
    },
  })
}
