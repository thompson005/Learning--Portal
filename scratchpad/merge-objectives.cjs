const fs = require("fs")
const path = require("path")
const ts = require("typescript")

const DIR = "C:\\Users\\asus\\AppData\\Local\\Temp\\claude\\bridge-extract\\objectives"
const LABS_PATH = "C:\\Users\\asus\\Documents\\technieum-projects\\learning-portal\\src\\lib\\data\\labs.ts"

const patches = new Map()
for (const f of fs.readdirSync(DIR)) {
  if (!f.endsWith(".json")) continue
  for (const item of JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"))) {
    if (item.id) patches.set(item.id, item)
  }
}
console.log(`Loaded objective patches for ${patches.size} labs`)

function stringLiteral(s) {
  const n = ts.factory.createStringLiteral(s, false)
  ts.setEmitFlags(n, ts.EmitFlags.NoAsciiEscaping)
  return n
}
function valueToNode(v) {
  if (typeof v === "string") return stringLiteral(v)
  if (Array.isArray(v)) return ts.factory.createArrayLiteralExpression(v.map(valueToNode), true)
  throw new Error("unexpected value")
}
function getId(node) {
  const p = node.properties.find((p) => p.name && p.name.getText().replace(/^["']|["']$/g, "") === "id")
  if (!p || !ts.isPropertyAssignment(p)) return null
  const i = p.initializer
  return ts.isStringLiteral(i) || ts.isNoSubstitutionTemplateLiteral(i) ? i.text : null
}

const src = fs.readFileSync(LABS_PATH, "utf8")
const sf = ts.createSourceFile(LABS_PATH, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
const applied = new Set()

function patchLab(node, patch) {
  const names = new Set(node.properties.map((p) => (p.name ? p.name.getText().replace(/^["']|["']$/g, "") : null)))
  const props = node.properties.map((p) => {
    if (!p.name) return p
    const k = p.name.getText().replace(/^["']|["']$/g, "")
    if (k === "objective" && "objective" in patch)
      return ts.factory.updatePropertyAssignment(p, p.name, valueToNode(patch.objective))
    if (k === "successCriteria" && "successCriteria" in patch)
      return ts.factory.updatePropertyAssignment(p, p.name, valueToNode(patch.successCriteria))
    return p
  })
  // insert new props right after `description` for nice ordering
  const out = []
  for (const p of props) {
    out.push(p)
    const k = p.name && p.name.getText().replace(/^["']|["']$/g, "")
    if (k === "description") {
      if (patch.objective && !names.has("objective"))
        out.push(ts.factory.createPropertyAssignment("objective", valueToNode(patch.objective)))
      if (patch.successCriteria && !names.has("successCriteria"))
        out.push(ts.factory.createPropertyAssignment("successCriteria", valueToNode(patch.successCriteria)))
    }
  }
  return ts.factory.updateObjectLiteralExpression(node, out)
}

function visitor(ctx) {
  return (root) => {
    function visit(node) {
      if (ts.isObjectLiteralExpression(node)) {
        const id = getId(node)
        if (id && patches.has(id) && !applied.has(id)) {
          applied.add(id)
          return patchLab(node, patches.get(id))
        }
      }
      return ts.visitEachChild(node, visit, ctx)
    }
    return ts.visitNode(root, visit)
  }
}

const result = ts.transform(sf, [visitor])
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed, removeComments: false })
fs.writeFileSync(LABS_PATH, printer.printFile(result.transformed[0]), "utf8")
result.dispose()

const missed = [...patches.keys()].filter((id) => !applied.has(id))
console.log(`labs.ts: patched ${applied.size}/${patches.size} labs`)
if (missed.length) console.log("MISSED:", missed.join(", "))
