import { LABS } from "../src/lib/data/labs.ts"

for (const l of LABS) {
  const gaps = []
  if (!l.description || l.description.length < 20) gaps.push("description")
  if (!l.instructions?.length && !l.slides?.length) gaps.push("instructions/slides")
  if (!l.resources?.length) gaps.push("resources")
  if (!l.hints?.length) gaps.push("hints")
  if (!l.completionIndicator) gaps.push("completionIndicator")
  if (!l.flagFormat && !l.dockerImage) gaps.push("flagFormat(no docker either)")
  if (l.dockerImage && !l.containerPort) gaps.push("containerPort missing despite dockerImage")
  if (gaps.length) console.log(l.id, "|", l.title, "->", gaps.join(", "))
}
console.log("TOTAL LABS:", LABS.length)
