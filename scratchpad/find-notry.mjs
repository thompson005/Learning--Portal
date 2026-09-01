import { CURRICULUM } from "../src/lib/data/curriculum.ts"
for (const t of CURRICULUM.flatMap(m=>m.topics)) {
  const titles=(t.slides??[]).map(x=>x.title)
  if (!titles.some(x=>/try it yourself|try it|hands-on/i.test(x)))
    console.log(t.id, '::', titles.join(' | '))
}
