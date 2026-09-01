import { chromium } from "playwright"
import fs from "node:fs"
import path from "node:path"

const OUT_DIR = path.join(process.cwd(), "content", "canva-raw")
const NAV_TIMEOUT = 45000
const PAGE_SETTLE_MS = 900

const LINKS = [
  { category: "Application Basics", title: "Authentication & Authorization", url: "https://www.canva.com/design/DAGSTkQkGB8/8v5hWjFLfrECHuOkebdaZA/edit" },
  { category: "Application Basics", title: "Cookies", url: "https://www.canva.com/design/DAGSZwUHO_o/xQoMeOlKMeBTpg5DbnMmGQ/edit" },
]

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

async function extractOne(browser, entry) {
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    viewport: { width: 1400, height: 900 },
  })
  const page = await context.newPage()
  try {
    await page.goto(entry.url, { waitUntil: "domcontentloaded", timeout: NAV_TIMEOUT })
    await page.waitForTimeout(3500)

    await page.getByRole("button", { name: "Close" }).first().click({ timeout: 3000 }).catch(() => {})
    await page.getByRole("button", { name: "Dismiss" }).click({ timeout: 2000 }).catch(() => {})
    await page.waitForTimeout(800)

    const pageButtons = page.getByRole("button", { name: /^Page \d+$/ })
    let pageCount = await pageButtons.count().catch(() => 0)
    if (pageCount === 0) pageCount = 1

    const slides = []
    for (let i = 0; i < pageCount; i++) {
      if (i > 0) {
        const btn = pageButtons.nth(i)
        await btn.click({ timeout: 5000 }).catch(() => {})
        await page.waitForTimeout(PAGE_SETTLE_MS)
      } else {
        await page.waitForTimeout(500)
      }
      const raw = await page.locator("main").innerText({ timeout: 5000 }).catch(() => "")
      const text = raw.split(/\n?Page Thumbnails\n?/)[0].trim()
      slides.push(text)
    }

    const dir = path.join(OUT_DIR, slugify(entry.category))
    fs.mkdirSync(dir, { recursive: true })
    const file = path.join(dir, `${slugify(entry.title)}.md`)
    const body = [
      `# ${entry.title}`,
      ``,
      `_Category: ${entry.category} — Source: ${entry.url}_`,
      ``,
      "---",
      ``,
      ...slides.map((s, i) => `## Slide ${i + 1}\n\n${s || "(no text captured)"}\n`),
    ].join("\n")
    fs.writeFileSync(file, body, "utf8")
    console.log(`OK   ${entry.title} — ${pageCount} slides -> ${path.relative(process.cwd(), file)}`)
    console.log(`--- preview (first 400 chars of slide 1) ---`)
    console.log(slides[0].slice(0, 400))
  } catch (err) {
    console.log(`FAIL ${entry.title} — ${err.message.split("\n")[0]}`)
  } finally {
    await context.close().catch(() => {})
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  for (const entry of LINKS) {
    await extractOne(browser, entry)
  }
  await browser.close()
}

main()
