// Merges researched YouTube videos into RESOURCE_ADDITIONS (as type "video",
// prepended so they're the topic's primary "Watch" video). Validates every URL
// is a real youtube watch / youtu.be link with an 11-char id (drops anything
// else — playlists, channels, searches, malformed/guessed ids).
// Usage: npx tsx scripts/splice-videos.ts <results.json>
import { readFileSync, writeFileSync } from "node:fs"

import { RESOURCE_ADDITIONS } from "../src/lib/data/resourceAdditions"
import type { Resource } from "../src/types"

const RESULTS = process.argv[2]
if (!RESULTS) {
  console.error("usage: npx tsx scripts/splice-videos.ts <results.json>")
  process.exit(1)
}

const dec = (s: unknown) =>
  typeof s === "string"
    ? s
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim()
    : ""

function cleanYouTube(url: string): string | null {
  let u: URL
  try {
    u = new URL(url)
  } catch {
    return null
  }
  const h = u.hostname.replace(/^www\./, "")
  const idOk = (id: string | null) => !!id && /^[\w-]{11}$/.test(id)
  if (h === "youtu.be") {
    const id = u.pathname.slice(1).split("/")[0]
    return idOk(id) ? `https://www.youtube.com/watch?v=${id}` : null
  }
  if (h === "youtube.com" || h === "m.youtube.com") {
    if (u.pathname === "/watch") {
      const id = u.searchParams.get("v")
      return idOk(id) ? `https://www.youtube.com/watch?v=${id}` : null
    }
    if (u.pathname.startsWith("/shorts/")) {
      const id = u.pathname.split("/")[2]
      return idOk(id) ? `https://www.youtube.com/watch?v=${id}` : null
    }
  }
  return null
}

const raw: any = JSON.parse(readFileSync(RESULTS, "utf8"))
const arr: any[] = raw?.result ?? raw
if (!Array.isArray(arr)) {
  console.error("results is not an array")
  process.exit(1)
}

let added = 0
let dropped = 0
for (const mod of arr) {
  for (const v of mod?.videos ?? []) {
    const topicId = dec(v?.topicId)
    const title = dec(v?.title)
    const url = cleanYouTube(dec(v?.url))
    if (!topicId || !title || !url) {
      dropped++
      continue
    }
    const list: Resource[] = (RESOURCE_ADDITIONS[topicId] ??= [])
    if (list.some((r) => r.url === url)) continue // already present
    // Drop any existing generic video entries that are playlists/homepages so
    // the specific researched video becomes the primary one.
    list.unshift({ title, url, type: "video" })
    added++
  }
}

// Rewrite the object literal in resourceAdditions.ts.
const FILE = "src/lib/data/resourceAdditions.ts"
const src = readFileSync(FILE, "utf8")
const marker = src.indexOf("export const RESOURCE_ADDITIONS")
const eq = src.indexOf("=", marker)
const lastClose = src.lastIndexOf("}")
if (marker === -1 || eq === -1 || lastClose === -1) {
  console.error("Could not locate RESOURCE_ADDITIONS object")
  process.exit(1)
}
const head = src.slice(0, eq + 1)
const tail = src.slice(lastClose + 1)
writeFileSync(FILE, `${head} ${JSON.stringify(RESOURCE_ADDITIONS, null, 2)}${tail}`)

console.log(`Added ${added} videos (dropped ${dropped} invalid/missing). Rewrote ${FILE}.`)
