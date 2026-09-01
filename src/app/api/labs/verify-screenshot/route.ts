import { NextRequest, NextResponse } from "next/server"
import { createWorker } from "tesseract.js"

export const runtime = "nodejs"
export const maxDuration = 60

interface VerifyResult {
  verified: boolean
  confidence: "high" | "medium" | "low"
  reason: string
  extractedText: string
  method: "ai" | "heuristic"
}

async function runOCR(buffer: Buffer): Promise<string> {
  const worker = await createWorker("eng")
  try {
    const {
      data: { text },
    } = await worker.recognize(buffer)
    return text
  } finally {
    await worker.terminate()
  }
}

function heuristicCheck(text: string, completionIndicator?: string): VerifyResult {
  const normalised = text.toLowerCase()
  const hasSolvedBanner = normalised.includes("congratulations") && (normalised.includes("solved") || normalised.includes("solve"))
  const hasFlagPattern = /\bflag\{[^}]{2,80}\}/i.test(text) || /\bHTB\{[^}]{2,80}\}/i.test(text)
  const hasIndicator = Boolean(completionIndicator) && normalised.includes(completionIndicator!.toLowerCase())
  const verified = hasIndicator || hasSolvedBanner || hasFlagPattern

  let reason = "OCR text does not contain a recognizable completion marker (solved banner, flag string, or the lab's expected indicator)."
  if (hasIndicator) reason = `OCR text contains the expected completion marker for this lab ("${completionIndicator}").`
  else if (hasSolvedBanner) reason = "OCR text contains a 'Congratulations ... solved' banner."
  else if (hasFlagPattern) reason = "OCR text contains a flag{...}-style string, consistent with a captured flag."

  return {
    verified,
    confidence: verified ? "medium" : "low",
    reason,
    extractedText: text.trim().slice(0, 1000),
    method: "heuristic",
  }
}

async function aiCheck(
  text: string,
  labTitle: string,
  labPlatform: string,
  completionIndicator: string | undefined,
  apiKey: string
): Promise<VerifyResult> {
  const indicatorHint = completionIndicator
    ? `For this specific lab, completion is typically shown by: ${completionIndicator}`
    : `This lab has no single fixed banner — look for generic completion evidence: a captured flag (e.g. flag{...}), a success/solved message, dumped data proving an exploit worked, or command output showing the objective was achieved.`

  const prompt = `You are verifying whether a screenshot's OCR-extracted text shows evidence that a trainee completed a hands-on cybersecurity lab.

Lab title: "${labTitle}"
Platform: "${labPlatform}"
${indicatorHint}

The OCR text below was extracted from a screenshot the trainee submitted as proof of completion.

OCR extracted text:
"""
${text.trim().slice(0, 3000)}
"""

Respond with ONLY a JSON object, no other text, in this exact shape:
{"verified": boolean, "confidence": "high"|"medium"|"low", "reason": "one sentence explaining your verdict"}

Mark verified=true only if the text plausibly shows real completion evidence for this lab (allowing for minor OCR errors/typos). If the OCR text looks unrelated, empty, or garbled beyond recognition, mark verified=false with confidence "low".`

  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-v4-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
      // flash also emits reasoning_content before the final JSON, so keep headroom
      max_tokens: 600,
    }),
  })

  if (!res.ok) {
    throw new Error(`DeepSeek API error: ${res.status}`)
  }

  const data = await res.json()
  const content: string = data?.choices?.[0]?.message?.content ?? ""

  let parsed: { verified?: boolean; confidence?: string; reason?: string } = {}
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    parsed = JSON.parse(jsonMatch ? jsonMatch[0] : content)
  } catch {
    throw new Error("Could not parse DeepSeek response as JSON")
  }

  return {
    verified: Boolean(parsed.verified),
    confidence: (parsed.confidence as VerifyResult["confidence"]) ?? "low",
    reason: parsed.reason ?? "No reason provided by the model.",
    extractedText: text.trim().slice(0, 1000),
    method: "ai",
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData().catch(() => null)
  if (!formData) {
    return NextResponse.json({ error: "Expected multipart/form-data with a 'file' field." }, { status: 400 })
  }

  const file = formData.get("file")
  const labTitle = String(formData.get("labTitle") ?? "this lab")
  const labPlatform = String(formData.get("labPlatform") ?? "")
  const completionIndicatorRaw = formData.get("completionIndicator")
  const completionIndicator = typeof completionIndicatorRaw === "string" && completionIndicatorRaw.trim() ? completionIndicatorRaw : undefined

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file uploaded." }, { status: 400 })
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Uploaded file must be an image." }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  let extractedText: string
  try {
    extractedText = await runOCR(buffer)
  } catch {
    return NextResponse.json({ error: "OCR failed to process the image." }, { status: 500 })
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  let result: VerifyResult
  if (apiKey) {
    try {
      result = await aiCheck(extractedText, labTitle, labPlatform, completionIndicator, apiKey)
    } catch {
      result = heuristicCheck(extractedText, completionIndicator)
    }
  } else {
    result = heuristicCheck(extractedText, completionIndicator)
  }

  return NextResponse.json(result)
}
