#!/usr/bin/env python3
"""
Stand-in art: turn public-domain engravings into book-ready pieces.

Reads book/art/stand-in/manifest.json, one entry per piece:
  { "name": "ch06-mob",              # becomes book/art/<name>.jpg (the data-art name)
    "url": "https://upload.wikimedia.org/...",   # the original scan (Wikimedia Commons)
    "crop": [x0, y0, x1, y1],        # the part to keep, as fractions of the scan (0–1)
    "aspect": 3,                     # optional: width/height; y1 is then worked out from x0, x1 and y0
    "width": 2000,                   # output width in pixels (height follows the crop)
    "erase": [[x0, y0, x1, y1]],     # optional: patches of the result (fractions) painted the scan's paper tone,
                                     #   for a collector's stamp on blank paper; never over the drawing
    "cutoff": 1,                     # optional: % clipped at each end when levelling, or [dark, light] (a higher
                                     #   light figure whitens faint show-through from the back of the page)
    "ink": "#161618", "paper": "#f2f1ee" }   # optional duotone ends (default: the book's)

Each scan is downloaded once into a cache outside the repository, cropped, turned into
a two-tone image from ink to paper (so every piece sits on the book's paper colour),
levelled, and saved as a JPEG. The sources and their public-domain status are logged
in book/art/stand-in/SOURCES.md; this script only does the image work.

  python3 book/tools/prep-art.py            # every piece
  python3 book/tools/prep-art.py ch06-mob   # one piece
"""
import hashlib
import json
import os
import sys
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[2]
ART = ROOT / "book" / "art"
MANIFEST = ART / "stand-in" / "manifest.json"
CACHE = Path(os.environ.get("ART_CACHE", Path.home() / ".cache" / "dgf-stand-in"))
UA = "DontGetForkedBook/0.1 (https://github.com/PainHog/DontGetForked; rulebook stand-in art)"


def hex_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def fetch(url):
    CACHE.mkdir(parents=True, exist_ok=True)
    path = CACHE / (hashlib.sha1(url.encode()).hexdigest()[:16] + Path(url.split("?")[0]).suffix.lower())
    if not path.exists():
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=120) as r:
            path.write_bytes(r.read())
    return path


def prep(entry):
    src = Image.open(fetch(entry["url"]))
    src = ImageOps.exif_transpose(src).convert("L")
    w, h = src.size
    x0, y0, x1, y1 = entry.get("crop", [0, 0, 1, 1])
    if "aspect" in entry:
        # keep x0, x1 and the top y0; the bottom follows from the aspect (width / height)
        y1 = y0 + (x1 - x0) * w / entry["aspect"] / h
        if y1 > 1:
            raise SystemExit(f"{entry['name']}: crop runs off the bottom (y1 = {y1:.3f})")
    im = src.crop((round(x0 * w), round(y0 * h), round(x1 * w), round(y1 * h)))
    out_w = entry.get("width", 2000)
    if im.width > out_w:
        im = im.resize((out_w, round(im.height * out_w / im.width)), Image.LANCZOS)
    # Level: the scan's paper goes to white, its ink to black (1% clipped at each end).
    cutoff = entry.get("cutoff", 1)
    im = ImageOps.autocontrast(im, cutoff=tuple(cutoff) if isinstance(cutoff, list) else cutoff)
    # Two-tone from the book's ink to its paper colour.
    paper = hex_rgb(entry.get("paper", "#f2f1ee"))
    im = ImageOps.colorize(im, black=hex_rgb(entry.get("ink", "#161618")), white=paper)
    for ex0, ey0, ex1, ey1 in entry.get("erase", []):
        box = (round(ex0 * im.width), round(ey0 * im.height), round(ex1 * im.width), round(ey1 * im.height))
        # the scan's own paper tone, from a band just outside the patch
        band = im.crop((max(box[0] - 6, 0), max(box[1] - 6, 0), min(box[2] + 6, im.width), min(box[3] + 6, im.height)))
        px = sorted(getattr(band, "get_flattened_data", band.getdata)(), key=sum)
        im.paste(px[len(px) * 3 // 4], box)
    out = ART / f"{entry['name']}.jpg"
    im.save(out, "JPEG", quality=entry.get("quality", 82), optimize=True, progressive=True)
    print(f"{out.relative_to(ROOT)}  {im.width}x{im.height}  {out.stat().st_size // 1024} KB")


def main():
    entries = json.loads(MANIFEST.read_text())
    only = set(sys.argv[1:])
    for e in entries:
        if not only or e["name"] in only:
            prep(e)


if __name__ == "__main__":
    main()
