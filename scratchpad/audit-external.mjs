import { LABS } from "../src/lib/data/labs.ts"
import { CURRICULUM } from "../src/lib/data/curriculum.ts"

const byPlatform = {}
for (const l of LABS) {
  const key = l.dockerImage ? "IN-HOUSE (Docker)" : l.platform
  ;(byPlatform[key] ??= []).push(l.id)
}
console.log("=== LABS BY PLATFORM ===")
for (const [k, v] of Object.entries(byPlatform).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`${String(v.length).padStart(3)}  ${k}   ${v.join(",")}`)
}

// external domains referenced across topics + labs
const domains = {}
function tally(resources) {
  for (const r of resources ?? []) {
    try {
      const h = new URL(r.url).hostname.replace(/^www\./, "")
      domains[h] = (domains[h] ?? 0) + 1
    } catch {}
  }
}
LABS.forEach((l) => tally(l.resources))
CURRICULUM.flatMap((m) => m.topics).forEach((t) => tally(t.resources))
CURRICULUM.forEach((m) => tally(m.resources))

console.log("\n=== TOP EXTERNAL DOMAINS IN RESOURCES ===")
Object.entries(domains)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 18)
  .forEach(([d, n]) => console.log(String(n).padStart(4), d))

const external = LABS.filter((l) => !l.dockerImage)
console.log(`\nLabs needing an external platform: ${external.length}/${LABS.length}`)
