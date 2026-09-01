import { LABS } from "../src/lib/data/labs.ts"
for (const l of LABS.filter(x=>x.dockerImage)) console.log(l.id, '|', l.title.slice(0,60))
