const fs = require("fs")
const path = require("path")
const ts = require("typescript")

const OUTPUT_DIR = "C:\\Users\\asus\\AppData\\Local\\Temp\\claude\\bridge-extract\\output"
const CURRICULUM_PATH = "C:\\Users\\asus\\Documents\\technieum-projects\\learning-portal\\src\\lib\\data\\curriculum.ts"

function loadPatches(prefix) {
  const map = new Map()
  for (const f of fs.readdirSync(OUTPUT_DIR)) {
    if (!f.startsWith(prefix)) continue
    const items = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, f), "utf8"))
    for (const item of items) {
      if (!item.id) continue
      if (map.has(item.id)) console.warn(`WARN duplicate id ${item.id} in ${f}, overwriting previous patch`)
      map.set(item.id, item)
    }
  }
  return map
}

const topicPatches = loadPatches("topics-canva-")
console.log(`Loaded ${topicPatches.size} topic patches`)

function stringLiteral(s) {
  const node = ts.factory.createStringLiteral(s, false)
  ts.setEmitFlags(node, ts.EmitFlags.NoAsciiEscaping)
  return node
}

function arrayOfStrings(arr) {
  return ts.factory.createArrayLiteralExpression(arr.map((s) => stringLiteral(s)), true)
}

function patchObjectLiteral(node, patch, fields) {
  const existingNames = new Set(node.properties.map((p) => (p.name ? p.name.getText() : null)))
  const newProps = node.properties.map((p) => {
    if (!p.name) return p
    const key = p.name.getText().replace(/^["']|["']$/g, "")
    if (fields.includes(key) && key in patch) {
      const value = patch[key]
      const newInit = Array.isArray(value) ? arrayOfStrings(value) : stringLiteral(String(value))
      return ts.factory.updatePropertyAssignment(p, p.name, newInit)
    }
    return p
  })
  for (const field of fields) {
    if (field in patch && !existingNames.has(field)) {
      const value = patch[field]
      const init = Array.isArray(value) ? arrayOfStrings(value) : stringLiteral(String(value))
      newProps.push(ts.factory.createPropertyAssignment(field, init))
    }
  }
  return ts.factory.updateObjectLiteralExpression(node, newProps)
}

function getIdValue(node) {
  const idProp = node.properties.find((p) => p.name && p.name.getText().replace(/^["']|["']$/g, "") === "id")
  if (!idProp || !ts.isPropertyAssignment(idProp)) return null
  const init = idProp.initializer
  if (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init)) return init.text
  return null
}

function transformFile(filePath, patches, fields) {
  const sourceText = fs.readFileSync(filePath, "utf8")
  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const applied = new Set()

  function visitor(context) {
    return (rootNode) => {
      function visit(node) {
        if (ts.isObjectLiteralExpression(node)) {
          const id = getIdValue(node)
          if (id && patches.has(id) && !applied.has(id)) {
            applied.add(id)
            return patchObjectLiteral(node, patches.get(id), fields)
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
  fs.writeFileSync(filePath, output, "utf8")

  const missed = [...patches.keys()].filter((id) => !applied.has(id))
  return { applied: applied.size, missed }
}

const result = transformFile(CURRICULUM_PATH, topicPatches, ["description", "keyPoints", "terminalCommands"])
console.log(`curriculum.ts: patched ${result.applied}/${topicPatches.size} topics`)
if (result.missed.length) console.log("MISSED:", result.missed.join(", "))
