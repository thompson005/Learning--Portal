import { CURRICULUM } from "../src/lib/data/curriculum.ts"
const practical={}, final={}, first={}
for (const t of CURRICULUM.flatMap(m=>m.topics)) {
  const s=t.slides??[]; if(!s.length) continue
  const p=s.find(x=>/try it|explore it|try them|hands-on|see your own|see it yourself|do it yourself/i.test(x.title))
  if(p) practical[p.title]=(practical[p.title]||0)+1
  final[s[s.length-1].title]=(final[s[s.length-1].title]||0)+1
}
console.log('=== practical-slide titles (variants) ===')
Object.entries(practical).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log(String(v).padStart(3),k))
console.log('\n=== final-slide titles ===')
Object.entries(final).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log(String(v).padStart(3),k))
