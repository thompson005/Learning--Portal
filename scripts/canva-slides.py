"""
Turn exported Canva deck PDFs into per-slide images for the portal.

Input  : a manifest JSON  [{ "slug": "...", "pdfUrl": "..." }, ...]
Output : public/canva/<slug>/01.webp ...  plus public/canva/manifest.json

The source decks carry a "bridge" logo in the top-right corner. Rather than
cropping (which would clip real slide content on some layouts), each slide's
logo box is repainted with the background colour sampled from just outside it.
If that surrounding area is NOT flat colour, the slide is left untouched and
reported, so nothing is silently damaged.
"""

import io
import json
import sys
import urllib.request
from pathlib import Path
from statistics import median

import fitz  # PyMuPDF
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT_ROOT = ROOT / "public" / "canva"

RENDER_WIDTH = 1400
WEBP_QUALITY = 80

# Logo box as fractions of slide size, with padding. Measured from the
# 1920x1080 exports: logo spans ~x1610-1855, y~68-152.
BOX = (0.822, 0.038, 0.982, 0.168)  # x0, y0, x1, y1
FLATNESS_TOLERANCE = 14  # max per-channel spread that still counts as flat


def sample_ring(img, box_px):
    """Colours immediately outside the logo box — left, below, above."""
    x0, y0, x1, y1 = box_px
    w, h = img.size
    pts = []
    for t in range(1, 10):
        fy = y0 + (y1 - y0) * t / 10
        pts.append((max(x0 - 12, 0), fy))          # left of box
        pts.append((min(x1 + 10, w - 1), fy))      # right of box
    for t in range(1, 10):
        fx = x0 + (x1 - x0) * t / 10
        pts.append((fx, min(y1 + 12, h - 1)))      # below box
        pts.append((fx, max(y0 - 12, 0)))          # above box
    return [img.getpixel((int(px), int(py)))[:3] for px, py in pts]


def mask_logo(img):
    """Returns (image, masked?, reason)."""
    w, h = img.size
    box_px = (int(BOX[0] * w), int(BOX[1] * h), int(BOX[2] * w), int(BOX[3] * h))
    ring = sample_ring(img, box_px)
    if not ring:
        return img, False, "no samples"

    med = tuple(int(median(c[i] for c in ring)) for i in range(3))
    spread = max(max(abs(c[i] - med[i]) for i in range(3)) for c in ring)
    if spread > FLATNESS_TOLERANCE:
        return img, False, f"background not flat (spread {spread})"

    img.paste(med, box_px)
    return img, True, ""


def pdf_to_slides(pdf_bytes, out_dir):
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    out_dir.mkdir(parents=True, exist_ok=True)
    skipped = []
    count = 0

    for i, page in enumerate(doc, start=1):
        scale = RENDER_WIDTH / page.rect.width
        pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=False)
        img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
        img, masked, reason = mask_logo(img)
        if not masked:
            skipped.append({"page": i, "reason": reason})
        img.save(out_dir / f"{i:02d}.webp", "WEBP", quality=WEBP_QUALITY, method=6)
        count += 1

    doc.close()
    return count, skipped


def main(manifest_path):
    entries = json.loads(Path(manifest_path).read_text(encoding="utf-8"))
    results = {}
    all_skipped = {}

    for entry in entries:
        slug, url = entry["slug"], entry["pdfUrl"]
        print(f"-> {slug}", flush=True)
        try:
            with urllib.request.urlopen(url, timeout=180) as r:
                pdf_bytes = r.read()
        except Exception as exc:  # noqa: BLE001 - report and continue
            print(f"   FAILED download: {exc}", flush=True)
            continue

        count, skipped = pdf_to_slides(pdf_bytes, OUT_ROOT / slug)
        results[slug] = {"slides": count, "title": entry.get("title", slug)}
        if skipped:
            all_skipped[slug] = skipped
        size_kb = sum(f.stat().st_size for f in (OUT_ROOT / slug).glob("*.webp")) // 1024
        print(f"   {count} slides, {size_kb} KB, {len(skipped)} unmasked", flush=True)

    OUT_ROOT.mkdir(parents=True, exist_ok=True)
    existing = {}
    manifest_file = OUT_ROOT / "manifest.json"
    if manifest_file.exists():
        existing = json.loads(manifest_file.read_text(encoding="utf-8"))
    existing.update(results)
    manifest_file.write_text(json.dumps(existing, indent=2), encoding="utf-8")

    print(f"\nmanifest: {len(existing)} decks total")
    if all_skipped:
        print("UNMASKED (background not flat — review these):")
        for slug, pages in all_skipped.items():
            print(f"  {slug}: {[p['page'] for p in pages]}")


if __name__ == "__main__":
    main(sys.argv[1])
