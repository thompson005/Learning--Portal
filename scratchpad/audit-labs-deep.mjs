import { LABS } from "../src/lib/data/labs.ts"

let issues = 0
for (const l of LABS) {
  const problems = []
  if (l.instructions && l.instructions.length < 4) problems.push(`only ${l.instructions.length} instructions`)
  if (l.description.length < 100) problems.push("thin description")
  if (l.dockerImage && !l.containerPort) problems.push("dockerImage without containerPort")
  if (l.containerPort && !l.dockerImage) problems.push("containerPort without dockerImage")
  if (!l.resources || l.resources.length === 0) problems.push("no resources")
  else {
    for (const r of l.resources) {
      if (!/^https?:\/\//.test(r.url)) problems.push(`bad URL: ${r.url}`)
      if (!r.title || r.title.length < 3) problems.push("resource with no/short title")
    }
  }
  if (l.hints && l.hints.length < 2) problems.push(`only ${l.hints.length} hints`)
  if (!l.estimatedHours || l.estimatedHours <= 0) problems.push("bad estimatedHours")
  if (!["easy", "medium", "hard"].includes(l.difficulty)) problems.push("bad difficulty")
  if (problems.length) {
    issues++
    console.log(l.id, "|", l.title, "->", problems.join("; "))
  }
}
console.log("TOTAL LABS:", LABS.length, "WITH ISSUES:", issues)
