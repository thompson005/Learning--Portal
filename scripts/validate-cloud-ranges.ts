// QA for Cloud Range labs. Usage:
//   npx tsx scripts/validate-cloud-ranges.ts scripts/cloud-ranges/cloud-m4.json [more.json ...]
//   npx tsx scripts/validate-cloud-ranges.ts --all        (every scripts/cloud-ranges/*.json)
// Exits non-zero if any lab is unsolvable or malformed.
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

import { CLOUD_LABS } from "../src/lib/data/tracks/cloudLabs"
import { validateLabPatch, type LabPatch } from "../src/lib/cloud/validate"

const DIR = "scripts/cloud-ranges"
const args = process.argv.slice(2)
const files = args.includes("--all")
  ? readdirSync(DIR).filter((f) => f.endsWith(".json") && f !== "EXAMPLE.json").map((f) => join(DIR, f))
  : args.filter((a) => !a.startsWith("--"))

if (!files.length) {
  console.error("usage: npx tsx scripts/validate-cloud-ranges.ts <file.json ...> | --all")
  process.exit(2)
}

const known = new Set(CLOUD_LABS.map((l) => l.id))
let bad = 0
let total = 0
const seen = new Set<string>()
for (const f of files) {
  let patches: LabPatch[]
  try {
    const raw = JSON.parse(readFileSync(f, "utf8"))
    patches = Array.isArray(raw) ? raw : [raw]
  } catch (err) {
    console.error(`${f}: cannot read/parse — ${(err as Error).message}`)
    bad++
    continue
  }
  for (const p of patches) {
    total++
    if (seen.has(p.labId)) {
      console.error(`${p.labId}: defined in more than one file`)
      bad++
    }
    seen.add(p.labId)
    const errs = validateLabPatch(p, known)
    if (errs.length) {
      bad++
      console.error(`FAIL ${p.labId}`)
      errs.forEach((e) => console.error("   - " + e))
    } else {
      const t = p.range.tasks
      console.log(
        `OK   ${p.labId}  (${t.length} tasks: ${t.filter((x) => x.kind === "flag").length} flag, ${t.filter((x) => x.kind === "policy").length} policy, ${t.filter((x) => x.kind === "choice").length} choice, ${t.filter((x) => x.kind === "answer").length} answer; ${p.range.terminal?.rules.length ?? 0} terminal rules)`,
      )
    }
  }
}
console.log(bad ? `\n${bad} of ${total} lab(s) FAILED` : `\nAll ${total} lab(s) pass QA`)
process.exit(bad ? 1 : 0)
