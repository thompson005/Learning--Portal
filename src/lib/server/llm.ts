// Single LLM backend for the whole portal: DeepSeek **flash** only.
// No other provider or local model is used anywhere. The model id is pinned (not
// env-overridable) so every AI feature — tutor chat, Explain-simpler, Teki — is
// guaranteed to run on the same cheap, fast model. Reasoning is disabled so the
// token cap goes to the visible answer, not hidden thinking.

const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || ""
const DEEPSEEK_URL = "https://api.deepseek.com"
export const LLM_MODEL = "deepseek-v4-flash"
const TIMEOUT_MS = 45_000

export interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export function llmConfigured(): boolean {
  return Boolean(DEEPSEEK_KEY)
}

/** Streams a chat completion from DeepSeek flash (OpenAI-compatible SSE),
 *  yielding content deltas. Throws on missing key / network / timeout / non-200
 *  so the route can stream its graceful fallback. */
export async function* llmChatStream(
  messages: ChatMessage[],
  opts: { temperature?: number; maxTokens?: number } = {},
): AsyncGenerator<string> {
  if (!DEEPSEEK_KEY) throw new Error("DEEPSEEK_API_KEY is not set")

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
        model: LLM_MODEL,
        thinking: { type: "disabled" },
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
        yield* emit(line)
      }
    }
    yield* emit(buffer)
  } finally {
    clearTimeout(timer)
  }
}
