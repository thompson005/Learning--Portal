import { LABS } from "../src/lib/data/labs.ts"
console.log(LABS.map(l => l.id).join(" "))
console.log("count", LABS.length)
