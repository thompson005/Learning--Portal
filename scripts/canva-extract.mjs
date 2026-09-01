/**
 * Pages through each Canva "anyone with the link can view/edit" design in
 * scripts/canva-links.json and dumps its slide text to content/canva-raw/.
 * No Canva login needed — this reads the same accessible text layer the
 * screen-reader uses, it does not use Canva's (auth-gated) PDF export.
 *
 * Run with: node scripts/canva-extract.mjs
 */
import { chromium } from "playwright"
import fs from "node:fs"
import path from "node:path"

const LINKS = JSON.parse(fs.readFileSync(new URL("./canva-links.json", import.meta.url), "utf8"))
const OUT_DIR = path.join(process.cwd(), "content", "canva-raw")
const CONCURRENCY = 4
const NAV_TIMEOUT = 45000
const PAGE_SETTLE_MS = 900

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

async function extractOne(browser, entry, index, total) {
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    viewport: { width: 1400, height: 900 },
  })
  const page = await context.newPage()
  const label = `[${index + 1}/${total}] ${entry.category} / ${entry.title}`

  try {
    await page.goto(entry.url, { waitUntil: "domcontentloaded", timeout: NAV_TIMEOUT })
    await page.waitForTimeout(2500)

    // Canva shows a "sign up" modal that aria-hides the rest of the page while open —
    // Page-N buttons are invisible to role queries until this is closed. Best effort, never fatal.
    await page
      .getByRole("button", { name: "Close" })
      .first()
      .click({ timeout: 3000 })
      .catch(() => {})
    await page
      .getByRole("button", { name: "Dismiss" })
      .click({ timeout: 2000 })
      .catch(() => {})
    await page.waitForTimeout(500)

    const pageButtons = page.getByRole("button", { name: /^Page \d+$/ })
    let pageCount = await pageButtons.count().catch(() => 0)
    if (pageCount === 0) {
      // single-slide design, or thumbnails not detected — still try to read whatever is visible
      pageCount = 1
    }

    const slides = []
    for (let i = 0; i < pageCount; i++) {
      if (i > 0) {
        const btn = pageButtons.nth(i)
        await btn.click({ timeout: 5000 }).catch(() => {})
        await page.waitForTimeout(PAGE_SETTLE_MS)
      } else {
        await page.waitForTimeout(300)
      }
      const raw = await page
        .locator("main")
        .innerText({ timeout: 5000 })
        .catch(() => "")
      // The "Page Thumbnails" side-rail repeats every other slide's title/text — keep only
      // the current slide's own content, which always renders before that marker.
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

    console.log(`OK   ${label} — ${pageCount} slides -> ${path.relative(process.cwd(), file)}`)
    return { ...entry, status: "ok", slides: pageCount, file: path.relative(process.cwd(), file) }
  } catch (err) {
    console.log(`FAIL ${label} — ${err.message.split("\n")[0]}`)
    return { ...entry, status: "failed", error: err.message.split("\n")[0] }
  } finally {
    await context.close().catch(() => {})
  }
}

async function pool(items, worker, concurrency) {
  const results = new Array(items.length)
  let next = 0
  async function run() {
    while (next < items.length) {
      const i = next++
      results[i] = await worker(items[i], i)
    }
  }
  await Promise.all(Array.from({ length: concurrency }, run))
  return results
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const browser = await chromium.launch({ headless: true })
  console.log(`Extracting ${LINKS.length} Canva designs with concurrency ${CONCURRENCY}...\n`)

  const results = await pool(LINKS, (entry, i) => extractOne(browser, entry, i, LINKS.length), CONCURRENCY)
  await browser.close()

  const failed = results.filter((r) => r.status === "failed")
  const ok = results.filter((r) => r.status === "ok")
  fs.writeFileSync(path.join(OUT_DIR, "_extraction-log.json"), JSON.stringify(results, null, 2), "utf8")

  console.log(`\nDone. ${ok.length} succeeded, ${failed.length} failed.`)
  if (failed.length) {
    console.log("Failed:")
    for (const f of failed) console.log(`  - ${f.category} / ${f.title}: ${f.error}`)
  }
}

main()
