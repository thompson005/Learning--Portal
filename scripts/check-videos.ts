// Link-rot check for every embeddable YouTube video in the curriculum and labs.
// Uses YouTube's public oEmbed endpoint: 200 = exists and can be embedded,
// 404 = removed/private, 401/403 = embedding disabled by the owner.
//   npx tsx scripts/check-videos.ts        (exit 1 if any are broken)
import { TRACKS } from "../src/lib/data/tracks/registry"
import { RESOURCE_ADDITIONS } from "../src/lib/data/resourceAdditions"
import { toYouTubeEmbed } from "../src/components/shared/VideoEmbed"

const refs = new Map<string, string[]>() // url -> where it is used
const add = (where: string, rs?: { url: string }[]) =>
  rs?.forEach((r) => {
    if (toYouTubeEmbed(r.url)) refs.set(r.url, [...(refs.get(r.url) ?? []), where])
  })
for (const t of TRACKS) {
  for (const m of t.curriculum) {
    add(m.id, m.resources)
    add(m.id, RESOURCE_ADDITIONS[m.id])
    for (const tp of m.topics) {
      add(tp.id, tp.resources)
      add(tp.id, RESOURCE_ADDITIONS[tp.id])
    }
  }
  for (const l of t.labs) {
    add(l.id, l.resources)
    add(l.id, RESOURCE_ADDITIONS[l.id])
  }
}

async function check(url: string): Promise<number> {
  const target = toYouTubeEmbed(url)!
  if (target.includes("videoseries")) return 200 // playlists: oEmbed on the playlist URL below
  try {
    const r = await fetch("https://www.youtube.com/oembed?format=json&url=" + encodeURIComponent(url))
    return r.status
  } catch {
    return 0
  }
}

async function main() {
const urls = [...refs.keys()]
const bad: [number, string, string[]][] = []
for (let i = 0; i < urls.length; i += 8) {
  await Promise.all(
    urls.slice(i, i + 8).map(async (u) => {
      const s = await check(u)
      if (s !== 200) bad.push([s, u, refs.get(u)!])
    }),
  )
}
console.log(`checked ${urls.length} embeddable YouTube URLs`)
for (const [s, u, w] of bad) console.log(`BROKEN ${s} ${u}  (${w.join(", ")})`)
console.log(bad.length ? `${bad.length} broken` : "all OK")
process.exit(bad.length ? 1 : 0)
}
main()
