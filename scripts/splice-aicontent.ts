// Merges deepened AI-security content (description + slides) into aiCurriculum.ts.
// Loads current AI_CURRICULUM, replaces description/slides per topicId from the
// workflow results (validating slides/checks/diagrams, dropping malformed bits),
// then rewrites the file's array literal. Usage:
//   npx tsx scripts/splice-aicontent.ts <results.json>
import { readFileSync, writeFileSync } from "node:fs"

import { AI_CURRICULUM } from "../src/lib/data/tracks/aiCurriculum"
import type { LabSlide, LabDiagram, SlideCheck } from "../src/types"

const RESULTS = process.argv[2]
if (!RESULTS) {
  console.error("usage: npx tsx scripts/splice-aicontent.ts <results.json>")
  process.exit(1)
}

const dec = (s: unknown): string =>
  typeof s === "string"
    ? s
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&")
    : ""

function cleanCheck(c: any): SlideCheck | undefined {
  if (!c || typeof c !== "object") return undefined
  const question = dec(c.question).trim()
  const options = Array.isArray(c.options) ? c.options.map(dec).filter(Boolean) : []
  const correctIndex = Number(c.correctIndex)
  if (!question || options.length < 2 || options.length > 4) return undefined
  if (!Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex >= options.length)
    return undefined
  const check: SlideCheck = { question, options, correctIndex }
  const ex = dec(c.explanation).trim()
  if (ex) check.explanation = ex
  return check
}

function cleanDiagram(d: any): LabDiagram | undefined {
  if (!d || typeof d !== "object") return undefined
  if (d.type === "flow-chain") {
    const steps = (Array.isArray(d.steps) ? d.steps : [])
      .map((s: any) => {
        const label = dec(s?.label).trim()
        if (!label) return null
        const detail = dec(s?.detail).trim()
        return detail ? { label, detail } : { label }
      })
      .filter(Boolean)
    if (steps.length < 2) return undefined
    return { type: "flow-chain", steps } as LabDiagram
  }
  if (d.type === "comparison") {
    const columns = (Array.isArray(d.columns) ? d.columns : [])
      .map((c: any) => {
        const label = dec(c?.label).trim()
        const points = (Array.isArray(c?.points) ? c.points : [])
          .map(dec)
          .map((p: string) => p.trim())
          .filter(Boolean)
        if (!label || points.length === 0) return null
        const col: any = { label, points }
        if (c?.highlighted === true) col.highlighted = true
        return col
      })
      .filter(Boolean)
    if (columns.length < 2) return undefined
    return { type: "comparison", columns } as LabDiagram
  }
  return undefined
}

function cleanSlides(raw: any): LabSlide[] {
  if (!Array.isArray(raw)) return []
  const out: LabSlide[] = []
  for (const s of raw) {
    const title = dec(s?.title).trim()
    const body = dec(s?.body).trim()
    if (!title || !body) continue
    const slide: LabSlide = { title, body }
    const diagram = cleanDiagram(s?.diagram)
    if (diagram) slide.diagram = diagram
    const check = cleanCheck(s?.check)
    if (check) slide.check = check
    out.push(slide)
  }
  return out
}

// ---- load results -----------------------------------------------------------
let raw: any = JSON.parse(readFileSync(RESULTS, "utf8"))
const arr: any[] = raw?.result ?? raw
if (!Array.isArray(arr)) {
  console.error("results is not an array")
  process.exit(1)
}

const byTopic = new Map<string, { description?: string; slides: LabSlide[] }>()
for (const mod of arr) {
  for (const t of mod?.topics ?? []) {
    if (!t?.topicId) continue
    const slides = cleanSlides(t.slides)
    const description = dec(t.description).trim()
    byTopic.set(t.topicId, { description: description || undefined, slides })
  }
}

// ---- merge ------------------------------------------------------------------
let topicsUpdated = 0
let slidesTotal = 0
for (const mod of AI_CURRICULUM) {
  for (const topic of mod.topics) {
    const enh = byTopic.get(topic.id)
    if (!enh) continue
    if (enh.slides.length >= 3) {
      topic.slides = enh.slides
      slidesTotal += enh.slides.length
      if (enh.description) topic.description = enh.description
      topicsUpdated++
    }
  }
}

// ---- rewrite the array literal in aiCurriculum.ts ---------------------------
const FILE = "src/lib/data/tracks/aiCurriculum.ts"
const src = readFileSync(FILE, "utf8")
const marker = src.indexOf("export const AI_CURRICULUM")
const eq = src.indexOf("=", marker)
const lastClose = src.lastIndexOf("]")
if (marker === -1 || eq === -1 || lastClose === -1) {
  console.error("Could not locate AI_CURRICULUM array in file")
  process.exit(1)
}
const head = src.slice(0, eq + 1)
const tail = src.slice(lastClose + 1)
writeFileSync(FILE, `${head} ${JSON.stringify(AI_CURRICULUM, null, 2)}${tail}`)

console.log(
  `Updated ${topicsUpdated} AI topics with ${slidesTotal} deepened slides. Rewrote ${FILE}.`,
)
