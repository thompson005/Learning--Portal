const fs = require("fs")
const path = require("path")
const ts = require("typescript")

const MODULES_DIR = "C:\\Users\\asus\\AppData\\Local\\Temp\\claude\\bridge-extract\\new-modules"
const CURRICULUM_PATH = "C:\\Users\\asus\\Documents\\technieum-projects\\learning-portal\\src\\lib\\data\\curriculum.ts"
const MODULE_IDS = ["m16", "m17", "m18", "m19", "m20", "m21"]

const newModules = MODULE_IDS.map((id) => JSON.parse(fs.readFileSync(path.join(MODULES_DIR, `${id}.json`), "utf8")))

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

const sourceText = fs.readFileSync(CURRICULUM_PATH, "utf8")
const sourceFile = ts.createSourceFile(CURRICULUM_PATH, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

let curriculumArrayNode = null
function findArray(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText() === "CURRICULUM" && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
    curriculumArrayNode = node.initializer
  }
  ts.forEachChild(node, findArray)
}
findArray(sourceFile)
if (!curriculumArrayNode) throw new Error("Could not find CURRICULUM array literal")

const newElementNodes = newModules.map(valueToNode)

function visitor(context) {
  return (rootNode) => {
    function visit(node) {
      if (node === curriculumArrayNode) {
        return ts.factory.updateArrayLiteralExpression(node, [...node.elements, ...newElementNodes])
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
fs.writeFileSync(CURRICULUM_PATH, output, "utf8")

console.log(`Appended ${newModules.length} new modules (${MODULE_IDS.join(", ")}) to CURRICULUM.`)
console.log(`Total topics added: ${newModules.reduce((s, m) => s + m.topics.length, 0)}`)
