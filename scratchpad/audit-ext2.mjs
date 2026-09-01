import { LABS } from "../src/lib/data/labs.ts"
const ext = LABS.filter(l => !l.dockerImage)
console.log(`EXTERNAL / NON-DOCKER LABS: ${ext.length}/${LABS.length}\n`)
for (const l of ext) {
  console.log(`${l.id}  [${l.platform}]  ${l.title.slice(0,58)}`)
}
console.log(`\nIN-HOUSE DOCKER: ${LABS.length - ext.length}`)
