// Appends verified glossary terms into src/lib/data/glossary.ts.
// Usage: node scripts/splice-glossary.js <results.json>
// results.json may be the workflow wrapper ({result:{terms:[...]}}), a bare
// {terms:[...]}, or a bare array of term objects.
const fs = require("fs")

const RESULTS = process.argv[2]
if (!RESULTS) {
  console.error("usage: node scripts/splice-glossary.js <results.json>")
  process.exit(1)
}

const GLOSSARY_FILE = "src/lib/data/glossary.ts"

const dec = (s) =>
  typeof s === "string"
    ? s
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&")
        .trim()
    : ""

function slug(s) {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48)
}

// ---- load + normalize results ----------------------------------------------
let raw = JSON.parse(fs.readFileSync(RESULTS, "utf8"))
let terms =
  (raw && raw.result && raw.result.terms) ||
  (raw && raw.terms) ||
  (Array.isArray(raw) ? raw : null)
if (!Array.isArray(terms)) {
  console.error("Could not find a terms array in results.")
  process.exit(1)
}

// ---- current file + existing ids/terms -------------------------------------
let src = fs.readFileSync(GLOSSARY_FILE, "utf8")
const existingTerms = new Set(
  (src.match(/term: "([^"]+)"/g) || []).map((s) =>
    s.replace(/term: "([^"]+)"/, "$1").toLowerCase(),
  ),
)
const existingIds = new Set(
  (src.match(/id: "([^"]+)"/g) || []).map((s) => s.replace(/id: "([^"]+)"/, "$1")),
)

function esc(s) {
  // escape for a double-quoted TS string literal
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

const seenId = new Set(existingIds)
const seenTerm = new Set(existingTerms)
const entries = []
let skipped = 0

for (const t of terms) {
  const term = dec(t.term)
  const definition = dec(t.definition)
  const category = dec(t.category) || "General"
  if (!term || !definition) {
    skipped++
    continue
  }
  if (seenTerm.has(term.toLowerCase())) {
    skipped++
    continue
  }
  seenTerm.add(term.toLowerCase())
  let id = slug(term) || "term"
  let n = 2
  while (seenId.has(id)) id = `${slug(term)}-${n++}`
  seenId.add(id)

  const fullName = dec(t.fullName) || term
  const example = dec(t.example) || definition
  const learnMore = dec(t.learnMore) || "—"

  entries.push(
    `  {\n` +
      `    id: "${esc(id)}",\n` +
      `    term: "${esc(term)}",\n` +
      `    fullName: "${esc(fullName)}",\n` +
      `    category: "${esc(category)}",\n` +
      `    definition:\n      "${esc(definition)}",\n` +
      `    example:\n      "${esc(example)}",\n` +
      `    learnMore: "${esc(learnMore)}",\n` +
      `  },`,
  )
}

if (entries.length === 0) {
  console.log(`Nothing to add (skipped ${skipped}).`)
  process.exit(0)
}

// Insert before the final closing bracket of the array.
const closeIdx = src.lastIndexOf("]")
if (closeIdx === -1) {
  console.error("Could not find array close in glossary.ts")
  process.exit(1)
}
// Ensure the element before the close ends with a comma.
const before = src.slice(0, closeIdx).replace(/,?\s*$/, ",\n")
const after = src.slice(closeIdx)
src = before + entries.join("\n") + "\n" + after

fs.writeFileSync(GLOSSARY_FILE, src)
console.log(
  `Added ${entries.length} glossary terms (skipped ${skipped} dup/empty). Total now ~${existingTerms.size + entries.length}.`,
)
