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

export const tutorModel = OLLAMA_MODEL
