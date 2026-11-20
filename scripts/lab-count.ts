// Counts labs that start in one click, per track, and how many distinct targets back them.
// Usage: npx tsx scripts/lab-count.ts
import { TRACKS } from "../src/lib/data/tracks/registry"
import { hasDockerTarget } from "../src/lib/labTarget"

const all = TRACKS.flatMap((t) => t.labs.map((l) => ({ track: t.shortName, lab: l })))
const docker = all.filter((x) => hasDockerTarget(x.lab))

console.log(`Total labs: ${all.length}`)
for (const t of TRACKS) {
  const n = t.labs.filter(hasDockerTarget).length
  console.log(`  ${t.shortName.padEnd(20)} ${String(n).padStart(3)} one-click of ${t.labs.length}`)
}
console.log(`One-click labs (total): ${docker.length}`)

const source = (l: (typeof all)[number]["lab"]) => (l.dockerImage ?? l.buildContext ?? "").replace(/:(latest|\d[^/]*)$/, "")
const targets = new Map<string, string[]>()
for (const { lab } of docker) {
  const k = source(lab)
  targets.set(k, [...(targets.get(k) ?? []), lab.id])
}
console.log(`Distinct Docker targets: ${targets.size}`)
for (const [k, ids] of [...targets].sort((a, b) => b[1].length - a[1].length))
  console.log(`  ${String(ids.length).padStart(2)} labs  ${k}`)

const emu = docker.filter((x) => x.lab.imagePlatform).length
const build = docker.filter((x) => !x.lab.dockerImage).length
console.log(`Need amd64 emulation: ${emu} | Built from source: ${build}`)
