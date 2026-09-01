/**
 * Downloads every Canva design in scripts/canva-links.json as a real PDF
 * (via Canva's own File > Download panel) into canva-files/<folder>/<title>.pdf.
 *
 * Requires an already-authenticated Canva session reachable over the Chrome
 * DevTools Protocol (e.g. Arc/Chrome launched with --remote-debugging-port=9222,
 * logged into Canva). Connects to that live browser/context instead of
 * launching a fresh one, so login cookies carry over.
 *
 * Free-tier accounts: designs with premium elements only offer a free
 * *watermarked* download (no clean paid "Download" available). This script
 * prefers the watermarked-draft button when present, else the plain
 * Download button.
 *
 * Run with: node scripts/canva-pdf-download.mjs
 */
import { chromium } from "playwright"
import fs from "node:fs"
import path from "node:path"

const CDP_URL = "http://localhost:9222"
const LINKS = JSON.parse(fs.readFileSync(new URL("./canva-links.json", import.meta.url), "utf8"))
const OUT_DIR = path.join(process.cwd(), "canva-files")
const LOG_FILE = path.join(OUT_DIR, "_download-log.json")
const PER_ITEM_TIMEOUT_MS = Number(process.env.CANVA_ITEM_TIMEOUT_MS || 35000)
const BUDGET_MS = Number(process.env.CANVA_BUDGET_MS || 260000)
const CONCURRENCY = Number(process.env.CANVA_CONCURRENCY || 15)
const startedAt = Date.now()

// category (from canva-links.json) -> existing canva-files folder name
const FOLDER_MAP = {
  "Application Basics": "Application Basics",
  "Networking": "Networking",
  "Hacking Basics": "Hacking Basics",
  "Hacking Practical": "Hacking Practical",
  "Corporate Network": "Corporate Network",
  "Footprinting & Reconnaissance": "Footprinting & Reconnaisance",
  "Operating System Basics - Linux": "Operating System Basics-Linux",
  "Networking (Fundamentals)": "Networking",
  "Common Web Attacks / Command Injection": "Command Injection",
  "Common Web Attacks / Path Traversal": "Path Traversal",
  "Common Web Attacks / SQLi": "SQLi",
  "Common Web Attacks / SSRF": "SSRF",
  "Common Web Attacks / File Inclusion": "File Inclusion",
  "Common Web Attacks / File Inclusion Lab": "File Inclusion Lab",
  "Common Web Attacks": "Common Web Attacks",
  "Blue Team": "Blue Team",
  "Blue Team Labs": "Blue Team Labs",
  "Burpsuite 101": "Burpsuite 101",
  "Cybersecurity Careers": "Cybersecurity Careers",
  "Network Scanning & Service Enumeration": "Network Scanning & Service Enumeration",
  "Network Vulnerability Scanning": "Network Vulnerability Scanning",
  "Scripting": "scripting",
  "Windows": "WINDOWS",
  "Hacking with AI / Defensive Security": "AI for Defensive Security",
  "Hacking with AI / Leverage AI for Hacking": "Leverage AI for Hacking",
  "Hacking with AI / Outro": "Outro",
  "AI Automation Script": "AI_automation_script",
  "Handson Exploitation Techniques": "Handson Exploitation Techniques",
  "Operating System": "Operating system",
  "Android": "Android",
}

function sanitizeFilename(title) {
  return title.replace(/[/\\:*?"<>|]/g, "-").replace(/\s+/g, " ").trim()
}

async function dismissModals(page) {
  const selectors = [
    'button[aria-label="Close"]',
    'button:has-text("Not now")',
    'button:has-text("Got it")',
    'button:has-text("Maybe later")',
  ]
  for (const sel of selectors) {
    try {
      const el = page.locator(sel).first()
      if (await el.isVisible({ timeout: 1000 })) {
        await el.click({ timeout: 2000 })
        await page.waitForTimeout(800)
      }
    } catch {}
  }
}

async function downloadOne(context, entry) {
  const page = await context.newPage()
  try {
    await page.goto(entry.url, { waitUntil: "domcontentloaded", timeout: 45000 })
    await page.getByText("Editing", { exact: true }).waitFor({ state: "visible", timeout: 40000 })
    await page.waitForTimeout(1200)
    await dismissModals(page)

    await page.getByText("File", { exact: true }).click({ timeout: 15000 })
    await page.waitForTimeout(600)
    const downloadMenuItem = page.getByRole("menuitem", { name: "Download", exact: true })
    if ((await downloadMenuItem.count()) === 0) throw new Error("Download menuitem not found")
    await downloadMenuItem.click({ timeout: 15000 })
    await page.waitForTimeout(1500)

    const watermarkedBtn = page.getByRole("button", { name: /free watermarked draft/i })
    const plainDownloadBtn = page.getByRole("button", { name: "Download", exact: true })

    let target
    if ((await watermarkedBtn.count()) > 0) {
      target = watermarkedBtn.first()
    } else if ((await plainDownloadBtn.count()) > 0) {
      target = plainDownloadBtn.first()
    } else {
      throw new Error("No download button found on panel")
    }

    const downloadPromise = page.waitForEvent("download", { timeout: 90000 })
    await target.click({ timeout: 10000 })
    const download = await downloadPromise

    const savePath = path.join(OUT_DIR, entry.folder, `${entry.filename}.pdf`)
    await download.saveAs(savePath)
    const size = fs.statSync(savePath).size
    return { ...entry, status: "ok", size }
  } catch (err) {
    return { ...entry, status: "failed", error: err.message.split("\n")[0] }
  } finally {
    await page.close().catch(() => {})
  }
}

async function withTimeout(promise, ms, entry) {
  let timer
  const timeout = new Promise((resolve) => {
    timer = setTimeout(() => resolve({ ...entry, status: "failed", error: `timed out after ${ms}ms` }), ms)
  })
  const result = await Promise.race([promise, timeout])
  clearTimeout(timer)
  return result
}

async function pool(items, worker, concurrency) {
  const results = new Array(items.length)
  let next = 0
  async function run() {
    while (next < items.length) {
      if (Date.now() - startedAt > BUDGET_MS) return
      const i = next++
      results[i] = await worker(items[i], i)
    }
  }
  await Promise.all(Array.from({ length: concurrency }, run))
  return results
}

async function main() {
  const browser = await chromium.connectOverCDP(CDP_URL)
  const context = browser.contexts()[0]
  if (!context) throw new Error("No existing browser context found over CDP")

  const work = LINKS.map((entry) => {
    const folder = FOLDER_MAP[entry.category]
    if (!folder) throw new Error(`No folder mapping for category: ${entry.category}`)
    return { ...entry, folder, filename: sanitizeFilename(entry.title) }
  })

  fs.mkdirSync(path.join(OUT_DIR, "Common Web Attacks"), { recursive: true })

  const results = []
  const toDownload = []
  work.forEach((entry, i) => {
    const dest = path.join(OUT_DIR, entry.folder, `${entry.filename}.pdf`)
    if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
      console.log(`SKIP [${i + 1}/${work.length}] ${entry.category} / ${entry.title} — already exists`)
      results.push({ ...entry, status: "skipped" })
    } else {
      toDownload.push(entry)
    }
  })

  console.log(`\n${toDownload.length} to download, concurrency ${CONCURRENCY}, budget ${BUDGET_MS}ms\n`)

  await pool(
    toDownload,
    async (entry) => {
      const result = await withTimeout(downloadOne(context, entry), PER_ITEM_TIMEOUT_MS, entry)
      results.push(result)
      if (result.status === "ok") {
        console.log(`OK   ${entry.category} / ${entry.title} — ${(result.size / 1024).toFixed(0)}KB`)
      } else {
        console.log(`FAIL ${entry.category} / ${entry.title} — ${result.error}`)
      }
      fs.writeFileSync(LOG_FILE, JSON.stringify(results, null, 2), "utf8")
      return result
    },
    CONCURRENCY
  )

  const ok = results.filter((r) => r.status === "ok").length
  const skipped = results.filter((r) => r.status === "skipped").length
  const failed = results.filter((r) => r.status === "failed").length
  console.log(`\nDone. ${ok} downloaded, ${skipped} skipped, ${failed} failed. (elapsed ${Date.now() - startedAt}ms)`)
  if (failed) {
    console.log("Failed:")
    for (const r of results.filter((r) => r.status === "failed")) {
      console.log(`  - ${r.category} / ${r.title}: ${r.error}`)
    }
  }
}

main().catch((err) => {
  console.error("FATAL:", err)
  process.exit(1)
})
