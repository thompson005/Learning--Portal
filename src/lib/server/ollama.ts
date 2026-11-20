// Local-LLM tutor backend. Talks to an Ollama server (default: the DGX host's
// own Ollama on 127.0.0.1:11434). Everything runs on-box — no external API, no
// per-token cost, nothing leaves the network. If Ollama is unreachable the
// caller degrades gracefully to a canned reply.

const OLLAMA_URL = (process.env.OLLAMA_URL || "http://127.0.0.1:11434").replace(
  /\/$/,
  "",
)
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.1"
const TIMEOUT_MS = Number(process.env.OLLAMA_TIMEOUT_MS || 45000)

export interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export function tutorConfigured(): boolean {
  // Always "configured" — the URL has a default. Reachability is checked per call.
  return Boolean(OLLAMA_URL)
}

/** Sends a chat completion to Ollama. Throws on network/timeout/non-200 so the
 *  route can fall back. Non-streaming for simplicity. */
export async function ollamaChat(
  messages: ChatMessage[],
  opts: { temperature?: number; maxTokens?: number } = {},
): Promise<string> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages,
        stream: false,
        options: {
          temperature: opts.temperature ?? 0.3,
          num_predict: opts.maxTokens ?? 512,
        },
      }),
      signal: controller.signal,
    })
    if (!res.ok) {
      throw new Error(`Ollama error ${res.status}`)
    }
    const data = (await res.json()) as {
      message?: { content?: string }
    }
    const content = data?.message?.content?.trim()
    if (!content) throw new Error("Empty response from Ollama")
    return content
  } finally {
    clearTimeout(timer)
  }
}

/** Streams a chat completion from Ollama token-by-token. Yields content deltas
 *  as they arrive. Throws on network/timeout/non-200 so the route can fall back.
 *  Ollama's streaming endpoint returns newline-delimited JSON objects, each
 *  `{ message: { content }, done }`; lines can be split across network chunks,
 *  so a buffer carries partial lines forward. */
export async function* ollamaChatStream(
  messages: ChatMessage[],
  opts: { temperature?: number; maxTokens?: number } = {},
): AsyncGenerator<string> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages,
        stream: true,
        options: {
          temperature: opts.temperature ?? 0.3,
          num_predict: opts.maxTokens ?? 512,
        },
      }),
      signal: controller.signal,
    })
    if (!res.ok || !res.body) {
      throw new Error(`Ollama error ${res.status}`)
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ""

    const emit = function* (line: string): Generator<string> {
      const trimmed = line.trim()
      if (!trimmed) return
      try {
        const obj = JSON.parse(trimmed) as {
          message?: { content?: string }
          done?: boolean
        }
        const delta = obj?.message?.content
        if (delta) yield delta
      } catch {
        // Partial / non-JSON line — ignore. A split line is completed by the
        // next chunk via the buffer; a genuinely malformed line is skipped.
      }
    }

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      let nl: number
      while ((nl = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, nl)
        buffer = buffer.slice(nl + 1)
        yield* emit(line)
      }
    }
    // Flush any trailing buffered line with no terminating newline.
    yield* emit(buffer)
  } finally {
    clearTimeout(timer)
  }
}

export const tutorModel = OLLAMA_MODEL

// ---------------------------------------------------------------------------
// DeepSeek backend (OpenAI-compatible). Used when DEEPSEEK_API_KEY is set, so
// the tutor works everywhere — not only where a local Ollama is running. Cheap,
// efficient models; capped tokens per call to keep spend bounded.
// ---------------------------------------------------------------------------

const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || ""
const DEEPSEEK_URL = (process.env.DEEPSEEK_URL || "https://api.deepseek.com").replace(/\/$/, "")
const DEEPSEEK_MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat"

export function useDeepSeek(): boolean {
  return Boolean(DEEPSEEK_KEY)
}

/** Streams a chat completion from DeepSeek (OpenAI-compatible SSE). Yields
 *  content deltas. Throws on network/timeout/non-200 so the route can fall back. */
export async function* deepseekChatStream(
  messages: ChatMessage[],
  opts: { temperature?: number; maxTokens?: number } = {},
): AsyncGenerator<string> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`${DEEPSEEK_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_KEY}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages,
        stream: true,
        temperature: opts.temperature ?? 0.3,
        max_tokens: opts.maxTokens ?? 600,
      }),
      signal: controller.signal,
    })
    if (!res.ok || !res.body) throw new Error(`DeepSeek error ${res.status}`)

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ""

    const emit = function* (line: string): Generator<string> {
      const t = line.trim()
      if (!t.startsWith("data:")) return
      const payload = t.slice(5).trim()
      if (!payload || payload === "[DONE]") return
      try {
        const obj = JSON.parse(payload) as {
          choices?: { delta?: { content?: string } }[]
        }
        const delta = obj?.choices?.[0]?.delta?.content
        if (delta) yield delta
      } catch {
        /* partial/non-JSON SSE line — buffered or skipped */
      }
    }

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      let nl: number
      while ((nl = buffer.indexOf("\n")) !== -1) {
        const line = buffer.slice(0, nl)
        buffer = buffer.slice(nl + 1)
        yield* emit(line)
      }
    }
    yield* emit(buffer)
  } finally {
    clearTimeout(timer)
  }
}

/** Unified tutor stream: DeepSeek when keyed (works everywhere), else the local
 *  Ollama model. The route wraps this and streams a graceful fallback on error. */
export function tutorChatStream(
  messages: ChatMessage[],
  opts: { temperature?: number; maxTokens?: number } = {},
): AsyncGenerator<string> {
  return useDeepSeek()
    ? deepseekChatStream(messages, opts)
    : ollamaChatStream(messages, opts)
}

/** Which backend is active, for UI labelling. */
export function tutorBackend(): "deepseek" | "ollama" {
  return useDeepSeek() ? "deepseek" : "ollama"
}
