const fs = require("fs")
const path = require("path")
const ts = require("typescript")

const HINTS_DIR = "C:\\Users\\asus\\AppData\\Local\\Temp\\claude\\bridge-extract\\lab-hints"
const LABS_PATH = "C:\\Users\\asus\\Documents\\technieum-projects\\learning-portal\\src\\lib\\data\\labs.ts"

const patches = new Map()
for (const f of fs.readdirSync(HINTS_DIR)) {
  if (!f.startsWith("hints-")) continue
  const items = JSON.parse(fs.readFileSync(path.join(HINTS_DIR, f), "utf8"))
  for (const item of items) {
    if (!item.id) continue
    if (patches.has(item.id)) console.warn(`WARN duplicate id ${item.id} in ${f}, overwriting previous patch`)
    patches.set(item.id, item)
  }
}
console.log(`Loaded hint patches for ${patches.size} labs`)

function stringLiteral(s) {
  const node = ts.factory.createStringLiteral(s, false)
  ts.setEmitFlags(node, ts.EmitFlags.NoAsciiEscaping)
  return node
}

function valueToNode(v) {
  if (v === null || v === undefined) return ts.factory.createNull()
  if (typeof v === "string") return stringLiteral(v)
  if (typeof v === "number") return ts.factory.createNumericLiteral(v)
  if (typeof v === "boolean") return v ? ts.factory.createTrue() : ts.factory.createFalse()
  if (Array.isArray(v)) return ts.factory.createArrayLiteralExpression(v.map(valueToNode), true)
  if (typeof v === "object") {
    const props = Object.entries(v).map(([k, val]) => ts.factory.createPropertyAssignment(k, valueToNode(val)))
    return ts.factory.createObjectLiteralExpression(props, true)
  }
  throw new Error(`Cannot convert value: ${JSON.stringify(v)}`)
}

function getIdValue(node) {
  const idProp = node.properties.find((p) => p.name && p.name.getText().replace(/^["']|["']$/g, "") === "id")
  if (!idProp || !ts.isPropertyAssignment(idProp)) return null
  const init = idProp.initializer
  if (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init)) return init.text
  return null
}

function patchLabObject(node, patch) {
  const fields = ["hints"]
  const existingNames = new Set(node.properties.map((p) => (p.name ? p.name.getText() : null)))
  const newProps = node.properties.map((p) => {
    if (!p.name) return p
    const key = p.name.getText().replace(/^["']|["']$/g, "")
    if (fields.includes(key) && key in patch) {
      return ts.factory.updatePropertyAssignment(p, p.name, valueToNode(patch[key]))
    }
    return p
  })
  for (const field of fields) {
    if (field in patch && !existingNames.has(field)) {
      newProps.push(ts.factory.createPropertyAssignment(field, valueToNode(patch[field])))
    }
  }
  return ts.factory.updateObjectLiteralExpression(node, newProps)
}

const sourceText = fs.readFileSync(LABS_PATH, "utf8")
const sourceFile = ts.createSourceFile(LABS_PATH, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
const applied = new Set()

function visitor(context) {
  return (rootNode) => {
    function visit(node) {
      if (ts.isObjectLiteralExpression(node)) {
        const id = getIdValue(node)
        if (id && patches.has(id) && !applied.has(id)) {
          applied.add(id)
          return patchLabObject(node, patches.get(id))
        }
      }
      return ts.visitEachChild(node, visit, context)
    }
    return ts.visitNode(rootNode, visit)
  }
}

const result = ts.transform(sourceFile, [visitor])
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed, removeComments: false })
const output = printer.printFile(result.transformed[0])
result.dispose()
fs.writeFileSync(LABS_PATH, output, "utf8")

const missed = [...patches.keys()].filter((id) => !applied.has(id))
console.log(`labs.ts: patched ${applied.size}/${patches.size} labs`)
if (missed.length) console.log("MISSED:", missed.join(", "))
