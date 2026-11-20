// Single LLM backend for the whole portal: the LOCAL model served on the DGX
// Spark (OpenAI-compatible server, e.g. vLLM). No cloud provider is used
// anywhere. Every AI feature — tutor chat, Explain-simpler, Teki — goes through
// llmChatStream() below.
//
// Config (all optional):
//   LLM_BASE_URL  OpenAI-compatible base URL   (default http://10.8.0.11:8000/v1)
//   LLM_MODEL     model id to use               (default: auto-discovered from /models)
//   LLM_API_KEY   bearer token, if the server requires one

const BASE_URL = (process.env.LLM_BASE_URL || "http://10.8.0.11:8000/v1").replace(
  /\/+$/,
  "",
)
const API_KEY = process.env.LLM_API_KEY || ""
const FIRST_TOKEN_TIMEOUT_MS = 60_000
const DISCOVERY_TIMEOUT_MS = 8_000

export interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

function headers(): Record<string, string> {
  const h: Record<string, string> = { "Content-Type": "application/json" }
  if (API_KEY) h.Authorization = `Bearer ${API_KEY}`
  return h
}

// ---- model discovery ---------------------------------------------------------
// The server tells us which model it is serving; we use the first one unless
// LLM_MODEL pins it. Cached after the first success (re-tried if it failed).
let modelPromise: Promise<string> | null = null

async function discoverModel(): Promise<string> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), DISCOVERY_TIMEOUT_MS)
  try {
    const res = await fetch(`${BASE_URL}/models`, {
      headers: headers(),
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`model list error ${res.status}`)
    const data = (await res.json()) as { data?: { id?: string }[] }
    const id = data?.data?.find((m) => m?.id)?.id
    if (!id) throw new Error("server reported no models")
    return id
  } finally {
    clearTimeout(timer)
  }
}

export function getLlmModel(): Promise<string> {
  if (process.env.LLM_MODEL) return Promise.resolve(process.env.LLM_MODEL)
  if (!modelPromise) {
    modelPromise = discoverModel().catch((e) => {
      modelPromise = null // don't cache a failure
      throw e
    })
  }
  return modelPromise
}

// ---- <think> stripping -------------------------------------------------------
// Some local models emit <think>…</think> reasoning inline. Learners should only
// see the answer, so drop those spans from the stream. Stateful because a tag
// can be split across network chunks.
const OPEN = "<think>"
const CLOSE = "</think>"

export function createThinkFilter() {
  let buf = ""
  let inThink = false
  return {
    /** Feed a chunk; returns the text that is safe to show now. */
    push(chunk: string): string {
      buf += chunk
      let out = ""
      for (;;) {
        if (inThink) {
          const i = buf.indexOf(CLOSE)
          if (i === -1) {
            buf = buf.slice(-(CLOSE.length - 1)) // keep a possible partial close tag
            break
          }
          buf = buf.slice(i + CLOSE.length)
          inThink = false
        } else {
          const i = buf.indexOf(OPEN)
          if (i === -1) {
            let hold = 0 // trailing partial "<think>" prefix to hold back
            for (let k = Math.min(OPEN.length - 1, buf.length); k > 0; k--) {
              if (buf.endsWith(OPEN.slice(0, k))) {
                hold = k
                break
              }
            }
            out += buf.slice(0, buf.length - hold)
            buf = buf.slice(buf.length - hold)
            break
          }
          out += buf.slice(0, i)
          buf = buf.slice(i + OPEN.length)
          inThink = true
        }
      }
      return out
    },
    /** End of stream: release anything held back (unless mid-think). */
    flush(): string {
      const rest = inThink ? "" : buf
      buf = ""
      return rest
    },
  }
}

// ---- streaming chat ----------------------------------------------------------
/** Streams a chat completion from the local model (OpenAI-compatible SSE),
 *  yielding content deltas. Throws on network / timeout / non-200 so the route
 *  can stream its graceful fallback. */
export async function* llmChatStream(
  messages: ChatMessage[],
  opts: { temperature?: number; maxTokens?: number } = {},
): AsyncGenerator<string> {
  const model = await getLlmModel()

  const controller = new AbortController()
  // Abort only if NO response headers arrive in time; cleared once streaming starts.
  const timer = setTimeout(() => controller.abort(), FIRST_TOKEN_TIMEOUT_MS)
  try {
    const res = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        temperature: opts.temperature ?? 0.3,
        max_tokens: opts.maxTokens ?? 600,
        // Ask reasoning-capable models (e.g. Qwen3) not to think out loud; servers
        // that don't know this field ignore it.
        chat_template_kwargs: { enable_thinking: false },
      }),
      signal: controller.signal,
    })
    clearTimeout(timer)
    if (!res.ok || !res.body) throw new Error(`LLM error ${res.status}`)

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ""

    async function* rawDeltas(): AsyncGenerator<string> {
      const parse = function* (line: string): Generator<string> {
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
          /* partial / non-JSON SSE line — carried by the buffer or skipped */
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
          yield* parse(line)
        }
      }
      yield* parse(buffer)
    }

    const filter = createThinkFilter()
    for await (const d of rawDeltas()) {
      const out = filter.push(d)
      if (out) yield out
    }
    const tail = filter.flush()
    if (tail) yield tail
  } finally {
    clearTimeout(timer)
  }
}
