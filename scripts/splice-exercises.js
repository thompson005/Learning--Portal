// Splices authored exercises into the three curriculum .ts files, keyed by
// topic id. Handles both key styles (cyber uses `id:`, ai/cloud use `"id":`)
// and CRLF line endings. Validates/normalizes each exercise per type and drops
// malformed ones. Usage: node scripts/splice-exercises.js <results.json>
const fs = require("fs")

const RESULTS = process.argv[2]
if (!RESULTS) {
  console.error("usage: node scripts/splice-exercises.js <results.json>")
  process.exit(1)
}

const FILES = [
  "src/lib/data/curriculum.ts",
  "src/lib/data/tracks/aiCurriculum.ts",
  "src/lib/data/tracks/cloudCurriculum.ts",
]

const dec = (s) =>
  typeof s === "string"
    ? s
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&")
    : s

const cleanStr = (s) => (typeof s === "string" ? dec(s).trim() : "")

function normExercise(ex) {
  if (!ex || typeof ex !== "object") return null
  const type = ex.type
  const prompt = cleanStr(ex.prompt)
  const explanation = cleanStr(ex.explanation)
  if (!prompt) return null

  if (type === "order") {
    const items = (ex.items || []).map(cleanStr).filter(Boolean)
    if (items.length < 3) return null
    return { type, prompt, items, explanation }
  }
  if (type === "match") {
    const pairs = (ex.pairs || [])
      .map((p) => ({ left: cleanStr(p && p.left), right: cleanStr(p && p.right) }))
      .filter((p) => p.left && p.right)
    if (pairs.length < 3) return null
    const rights = new Set(pairs.map((p) => p.right))
    if (rights.size !== pairs.length) return null
    return { type, prompt, pairs, explanation }
  }
  if (type === "fill-blank") {
    const template = cleanStr(ex.template)
    const blanks = (ex.blanks || []).map(cleanStr).filter(Boolean)
    const distractors = (ex.distractors || []).map(cleanStr).filter(Boolean)
    const markers = (template.match(/___/g) || []).length
    if (!template || blanks.length === 0 || markers !== blanks.length) return null
    const out = { type, prompt, template, blanks, explanation }
    if (distractors.length) out.distractors = distractors
    return out
  }
  return null
}

const results = JSON.parse(fs.readFileSync(RESULTS, "utf8"))
const flat = []
for (const mod of results) {
  for (const t of mod.topics || []) {
    const exercises = (t.exercises || []).map(normExercise).filter(Boolean)
    if (exercises.length && t.topicId) flat.push({ topicId: t.topicId, exercises })
  }
}

function esc(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

let inserted = 0
let skipped = 0
let droppedExercises = 0
const notFound = []
const foundIds = new Set()

for (const path of FILES) {
  let src = fs.readFileSync(path, "utf8")
  for (const { topicId, exercises } of flat) {
    // Match the topic's own id line in either key style, with CRLF or LF.
    // groups: 1=newline, 2=indent, 3=optional quote around the key
    const re = new RegExp(
      `(\\r?\\n)([ \\t]*)("?)id\\3:\\s*"${esc(topicId)}",`,
    )
    const m = src.match(re)
    if (!m) continue
    foundIds.add(topicId)

    const matchEnd = m.index + m[0].length
    // Idempotence: skip if an exercises field already sits before the next id.
    const after = src.slice(matchEnd, matchEnd + 3000)
    const nextId = after.search(/\r?\n[ \t]*"?id"?:\s*"/)
    const windowStr = nextId === -1 ? after : after.slice(0, nextId)
    if (/"?exercises"?:\s*\[/.test(windowStr)) {
      skipped++
      continue
    }

    const nl = m[1]
    const indent = m[2]
    const exKey = m[3] ? '"exercises"' : "exercises"
    const json = JSON.stringify(exercises, null, 2)
      .split("\n")
      .map((line, i) => (i === 0 ? line : indent + line))
      .join(nl)
    const insertion = `${nl}${indent}${exKey}: ${json},`
    src = src.slice(0, matchEnd) + insertion + src.slice(matchEnd)
    inserted++
  }
  fs.writeFileSync(path, src)
}

for (const { topicId } of flat) if (!foundIds.has(topicId)) notFound.push(topicId)

// count how many raw exercises were dropped by validation
let rawCount = 0
for (const mod of results)
  for (const t of mod.topics || []) rawCount += (t.exercises || []).length
droppedExercises = rawCount - flat.reduce((s, f) => s + f.exercises.length, 0)

console.log(
  `topics spliced: ${inserted} | already-had: ${skipped} | results topics: ${flat.length} | raw exercises: ${rawCount} | dropped by validation: ${droppedExercises}`,
)
if (notFound.length)
  console.log(`NOT FOUND (${notFound.length}): ${notFound.slice(0, 20).join(", ")}`)
