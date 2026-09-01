import { LABS } from "../src/lib/data/labs.ts"
const docker = LABS.filter((l) => l.dockerImage)
console.log(docker.length)
docker.forEach((l) => console.log(l.id, l.dockerImage))
