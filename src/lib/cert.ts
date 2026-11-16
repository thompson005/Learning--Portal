import { jsPDF } from "jspdf"

/**
 * Generate and download a completion certificate for a module. Pure client
 * side — no server round-trip.
 */
export function downloadCertificate(opts: {
  learnerName: string
  moduleName: string
  phaseName?: string
}) {
  const { learnerName, moduleName, phaseName } = opts
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" })

  const W = doc.internal.pageSize.getWidth()
  const H = doc.internal.pageSize.getHeight()

  // Background
  doc.setFillColor(247, 248, 250)
  doc.rect(0, 0, W, H, "F")

  // Outer frame
  doc.setDrawColor(234, 122, 30)
  doc.setLineWidth(3)
  doc.rect(28, 28, W - 56, H - 56)
  doc.setLineWidth(0.75)
  doc.setDrawColor(203, 160, 120)
  doc.rect(40, 40, W - 80, H - 80)

  // Brand
  doc.setTextColor(234, 122, 30)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(15)
  doc.text("TECHNIEUM", W / 2, 96, { align: "center" })

  doc.setTextColor(120, 120, 128)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(11)
  doc.text("Cybersecurity Onboarding Programme", W / 2, 116, { align: "center" })

  // Title
  doc.setTextColor(34, 40, 49)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(30)
  doc.text("Certificate of Completion", W / 2, 180, { align: "center" })

  // Body
  doc.setFont("helvetica", "normal")
  doc.setFontSize(13)
  doc.setTextColor(90, 92, 100)
  doc.text("This certifies that", W / 2, 224, { align: "center" })

  doc.setFont("helvetica", "bold")
  doc.setFontSize(26)
  doc.setTextColor(234, 122, 30)
  doc.text(learnerName || "Learner", W / 2, 262, { align: "center" })

  doc.setFont("helvetica", "normal")
  doc.setFontSize(13)
  doc.setTextColor(90, 92, 100)
  doc.text("has successfully completed every topic in", W / 2, 300, {
    align: "center",
  })

  doc.setFont("helvetica", "bold")
  doc.setFontSize(18)
  doc.setTextColor(34, 40, 49)
  doc.text(moduleName, W / 2, 330, { align: "center", maxWidth: W - 160 })

  if (phaseName) {
    doc.setFont("helvetica", "normal")
    doc.setFontSize(11)
    doc.setTextColor(120, 120, 128)
    doc.text(phaseName, W / 2, 352, { align: "center" })
  }

  // Footer: date + signature line
  const dateStr = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  doc.setDrawColor(180, 182, 190)
  doc.setLineWidth(0.75)
  doc.line(120, H - 96, 300, H - 96)
  doc.line(W - 300, H - 96, W - 120, H - 96)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.setTextColor(120, 120, 128)
  doc.text("Date", 120, H - 80)
  doc.text(dateStr, 120, H - 64)
  doc.text("Technieum Training", W - 300, H - 80)
  doc.text("Offensive Security Track", W - 300, H - 64)

  const safe = moduleName.replace(/[^a-z0-9]+/gi, "-").toLowerCase()
  doc.save(`technieum-certificate-${safe}.pdf`)
}
