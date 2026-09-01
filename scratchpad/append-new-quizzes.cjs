const fs = require("fs")
const path = require("path")
const ts = require("typescript")

const QUIZ_DIR = "C:\\Users\\asus\\AppData\\Local\\Temp\\claude\\bridge-extract\\new-modules"
const MODULE_IDS = ["m16", "m17", "m18", "m19", "m20", "m21"]

const TOPIC_QUIZZES_PATH = "C:\\Users\\asus\\Documents\\technieum-projects\\learning-portal\\src\\lib\\data\\topicQuizzes.ts"
const MODULE_QUIZZES_PATH = "C:\\Users\\asus\\Documents\\technieum-projects\\learning-portal\\src\\lib\\data\\moduleQuizzes.ts"

const allTopicQuizzes = []
const allModuleQuizzes = []
for (const id of MODULE_IDS) {
  const data = JSON.parse(fs.readFileSync(path.join(QUIZ_DIR, `quiz-${id}.json`), "utf8"))
  allTopicQuizzes.push(...data.topicQuizzes)
  allModuleQuizzes.push(data.moduleQuiz)
}
console.log(`Loaded ${allTopicQuizzes.length} topic quizzes and ${allModuleQuizzes.length} module quizzes`)

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

function appendToArray(filePath, arrayVarName, newItems) {
  const sourceText = fs.readFileSync(filePath, "utf8")
  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

  let arrayNode = null
  function findArray(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText() === arrayVarName && node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
      arrayNode = node.initializer
    }
    ts.forEachChild(node, findArray)
  }
  findArray(sourceFile)
  if (!arrayNode) throw new Error(`Could not find ${arrayVarName} array literal in ${filePath}`)

  const newElementNodes = newItems.map(valueToNode)

  function visitor(context) {
    return (rootNode) => {
      function visit(node) {
        if (node === arrayNode) {
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
  fs.writeFileSync(filePath, output, "utf8")
}

appendToArray(TOPIC_QUIZZES_PATH, "TOPIC_QUIZZES", allTopicQuizzes)
console.log(`Appended ${allTopicQuizzes.length} entries to TOPIC_QUIZZES`)

appendToArray(MODULE_QUIZZES_PATH, "MODULE_QUIZZES", allModuleQuizzes)
console.log(`Appended ${allModuleQuizzes.length} entries to MODULE_QUIZZES`)
