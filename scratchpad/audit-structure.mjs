import { CURRICULUM } from "../src/lib/data/curriculum.ts"
const topics = CURRICULUM.flatMap(m => m.topics)
let noSlides=0, whyLast=0, whyMissing=0, whyNotLast=0, tryPresent=0, checkPresent=0
const problems=[]
for (const t of topics) {
  const s = t.slides ?? []
  if (s.length === 0){ noSlides++; problems.push(`${t.id} NO SLIDES`); continue }
  const titles = s.map(x=>x.title)
  const lastIsWhy = /why (this|it) matters/i.test(titles[titles.length-1])
  const anyWhy = titles.some(x=>/why (this|it) matters/i.test(x))
  const hasTry = titles.some(x=>/try it yourself|try it|hands-on/i.test(x))
  const hasCheck = s.some(x=>x.check)
  if (lastIsWhy) whyLast++; else if (anyWhy){ whyNotLast++; problems.push(`${t.id} WHY not last`) } else { whyMissing++; problems.push(`${t.id} WHY missing`) }
  if (hasTry) tryPresent++
  if (hasCheck) checkPresent++
}
console.log(`topics: ${topics.length}`)
console.log(`Why-This-Matters LAST: ${whyLast}  | not-last: ${whyNotLast}  | missing: ${whyMissing}`)
console.log(`Try-It-Yourself present: ${tryPresent}/${topics.length}`)
console.log(`inline Check present: ${checkPresent}/${topics.length}`)
console.log(`no slides: ${noSlides}`)
console.log('\nfirst 40 problems:')
problems.slice(0,40).forEach(p=>console.log(' ',p))
console.log(`... total problems: ${problems.length}`)
