import { CURRICULUM } from "../src/lib/data/curriculum.ts"
for (const mid of ["m8","m9","m10"]) {
  const m = CURRICULUM.find(x => x.id === mid)
  console.log(`\n=== ${mid}: ${m.name} (${m.topics.length} topics) ===`)
  for (const t of m.topics) {
    const slides = t.slides?.length ?? 0
    const diagrams = (t.slides ?? []).filter(s => s.diagram).length
    console.log(`  ${t.id.padEnd(8)} ${String(slides).padStart(2)}sl ${String(diagrams).padStart(2)}dg  ${t.title.slice(0,60)}`)
  }
}
