const fs = require("fs")
const path = require("path")
const ts = require("typescript")

const CHECKPOINTS_DIR = "C:\\Users\\asus\\AppData\\Local\\Temp\\claude\\bridge-extract\\checkpoints"
const CURRICULUM_PATH = "C:\\Users\\asus\\Documents\\technieum-projects\\learning-portal\\src\\lib\\data\\curriculum.ts"

// Fisher-Yates shuffle, seeded by a simple string hash so each topic's shuffle is reproducible.
function seededShuffle(arr, seedStr) {
  let seed = 0
  for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0
  function rand() {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 4294967296
  }
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const patches = new Map()
let skippedNoOptions = 0
for (const f of fs.readdirSync(CHECKPOINTS_DIR)) {
  if (!f.endsWith(".json")) continue
  const items = JSON.parse(fs.readFileSync(path.join(CHECKPOINTS_DIR, f), "utf8"))
  for (const item of items) {
    if (!item.id || !item.slideTitle || !item.check) continue
    const check = item.check
    if (!Array.isArray(check.options) || typeof check.correctIndex !== "number") {
      skippedNoOptions++
      continue
    }
    const correctOption = check.options[check.correctIndex]
    const shuffled = seededShuffle(check.options, item.id + "::" + item.slideTitle)
    const newCorrectIndex = shuffled.indexOf(correctOption)
    const finalCheck = { ...check, options: shuffled, correctIndex: newCorrectIndex }
    if (patches.has(item.id)) console.warn(`WARN duplicate id ${item.id} in ${f}, overwriting previous patch`)
    patches.set(item.id, { slideTitle: item.slideTitle, check: finalCheck })
  }
}
console.log(`Loaded checkpoint patches for ${patches.size} topics (skipped ${skippedNoOptions} malformed)`)

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

function getStringProp(node, name) {
  const prop = node.properties.find((p) => p.name && p.name.getText().replace(/^["']|["']$/g, "") === name)
  if (!prop || !ts.isPropertyAssignment(prop)) return null
  const init = prop.initializer
  if (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init)) return init.text
  return null
}

function addCheckToSlide(slideNode, check) {
  const existingNames = new Set(slideNode.properties.map((p) => (p.name ? p.name.getText() : null)))
  const newProps = slideNode.properties.map((p) => {
    if (!p.name) return p
    const key = p.name.getText().replace(/^["']|["']$/g, "")
    if (key === "check") return ts.factory.updatePropertyAssignment(p, p.name, valueToNode(check))
    return p
  })
  if (!existingNames.has("check")) {
    newProps.push(ts.factory.createPropertyAssignment("check", valueToNode(check)))
  }
  return ts.factory.updateObjectLiteralExpression(slideNode, newProps)
}

const sourceText = fs.readFileSync(CURRICULUM_PATH, "utf8")
const sourceFile = ts.createSourceFile(CURRICULUM_PATH, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
const applied = new Set()
const missedSlide = []

function visitor(context) {
  return (rootNode) => {
    function visitTopic(node) {
      if (ts.isObjectLiteralExpression(node)) {
        const id = getStringProp(node, "id")
        if (id && patches.has(id) && !applied.has(id)) {
          const patch = patches.get(id)
          const slidesProp = node.properties.find(
            (p) => p.name && p.name.getText().replace(/^["']|["']$/g, "") === "slides"
          )
          if (slidesProp && ts.isPropertyAssignment(slidesProp) && ts.isArrayLiteralExpression(slidesProp.initializer)) {
            const slidesArr = slidesProp.initializer
            let matched = false
            const newElements = slidesArr.elements.map((slideEl) => {
              if (!matched && ts.isObjectLiteralExpression(slideEl)) {
                const title = getStringProp(slideEl, "title")
                if (title === patch.slideTitle) {
                  matched = true
                  return addCheckToSlide(slideEl, patch.check)
                }
              }
              return slideEl
            })
            if (matched) {
              applied.add(id)
              const newSlidesArr = ts.factory.updateArrayLiteralExpression(slidesArr, newElements)
              const newSlidesProp = ts.factory.updatePropertyAssignment(slidesProp, slidesProp.name, newSlidesArr)
              const newProps = node.properties.map((p) => (p === slidesProp ? newSlidesProp : p))
              return ts.factory.updateObjectLiteralExpression(node, newProps)
            } else {
              missedSlide.push(`${id} (slide "${patch.slideTitle}" not found)`)
            }
          }
        }
      }
      return ts.visitEachChild(node, visitTopic, context)
    }
    return ts.visitNode(rootNode, visitTopic)
  }
}

const result = ts.transform(sourceFile, [visitor])
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed, removeComments: false })
const output = printer.printFile(result.transformed[0])
result.dispose()
fs.writeFileSync(CURRICULUM_PATH, output, "utf8")

const missed = [...patches.keys()].filter((id) => !applied.has(id))
console.log(`curriculum.ts: patched ${applied.size}/${patches.size} topics`)
if (missedSlide.length) console.log("SLIDE NOT FOUND:", missedSlide.join(", "))
if (missed.length) console.log("MISSED (topic not found):", missed.join(", "))
