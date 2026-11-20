// Prints every lab across all tracks with how it is run. Usage: npx tsx scripts/lab-inventory.ts
import { TRACKS } from "../src/lib/data/tracks/registry"

for (const t of TRACKS) {
  console.log(`\n== ${t.shortName} (${t.labs.length}) ==`)
  for (const l of t.labs) {
    const how = l.dockerImage
      ? `IMAGE ${l.dockerImage}:${l.containerPort ?? "?"}`
      : l.buildContext
        ? `BUILD ${l.buildContext}:${l.containerPort ?? "?"}`
        : "—"
    console.log(`${l.id.padEnd(10)}${how.padEnd(60)}${l.title.slice(0, 44)}`)
  }
}
