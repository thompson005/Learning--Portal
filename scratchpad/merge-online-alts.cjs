const fs = require("fs")
const ts = require("typescript")

const DATA = "C:\\Users\\asus\\Documents\\technieum-projects\\learning-portal\\scratchpad\\online-alts.json"
const LABS_PATH = "C:\\Users\\asus\\Documents\\technieum-projects\\learning-portal\\src\\lib\\data\\labs.ts"

const patches = new Map()
for (const item of JSON.parse(fs.readFileSync(DATA, "utf8"))) {
  if (item.id) patches.set(item.id, item.onlineAlternative)
}
console.log(`Loaded ${patches.size} online-alternative patches`)

function stringLiteral(s) {
  const n = ts.factory.createStringLiteral(s, false)
  ts.setEmitFlags(n, ts.EmitFlags.NoAsciiEscaping)
  return n
}
function valueToNode(v) {
  if (typeof v === "string") return stringLiteral(v)
  if (Array.isArray(v)) return ts.factory.createArrayLiteralExpression(v.map(valueToNode), true)
  if (v && typeof v === "object")
    return ts.factory.createObjectLiteralExpression(
      Object.entries(v).map(([k, val]) => ts.factory.createPropertyAssignment(k, valueToNode(val))),
      true,
    )
  throw new Error("unexpected value: " + JSON.stringify(v))
}
function propKey(p) {
  return p.name ? p.name.getText().replace(/^["']|["']$/g, "") : null
}
function getId(node) {
  const p = node.properties.find((p) => propKey(p) === "id")
  if (!p || !ts.isPropertyAssignment(p)) return null
  const i = p.initializer
  return ts.isStringLiteral(i) || ts.isNoSubstitutionTemplateLiteral(i) ? i.text : null
}

const src = fs.readFileSync(LABS_PATH, "utf8")
const sf = ts.createSourceFile(LABS_PATH, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
const applied = new Set()

function patchLab(node, alt) {
  const names = new Set(node.properties.map(propKey))
  if (names.has("onlineAlternative")) {
    // overwrite existing
    const props = node.properties.map((p) =>
      propKey(p) === "onlineAlternative"
        ? ts.factory.createPropertyAssignment("onlineAlternative", valueToNode(alt))
        : p,
    )
    return ts.factory.updateObjectLiteralExpression(node, props)
  }
  const out = []
  for (const p of node.properties) {
    out.push(p)
    if (propKey(p) === "estimatedHours") {
      out.push(ts.factory.createPropertyAssignment("onlineAlternative", valueToNode(alt)))
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
