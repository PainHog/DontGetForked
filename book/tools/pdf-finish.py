"""Finish a built rulebook PDF in place (book/build.mjs runs this after every build).

   python3 book/tools/pdf-finish.py <pdf>

- The bookmarks: Chromium writes a heading that starts a new page or column
  twice in one bookmark ("Castle DutiesCastle Duties"); this halves those.
- The document properties: the author and subject (Chromium leaves them blank)
  and a plain creator line.
The accessibility tags and every page are left as they are (incremental save)."""
import sys
import pymupdf

AUTHOR = "Richard Moore"
SUBJECT = "A tabletop game of monsters, mischief and pitchforks"

def halve(title):
    n = len(title)
    return title[: n // 2] if n % 2 == 0 and n > 1 and title[: n // 2] == title[n // 2 :] else title

path = sys.argv[1]
doc = pymupdf.open(path)
toc = doc.get_toc(simple=False)
fixed = [[lvl, halve(t), pg, *rest] for lvl, t, pg, *rest in toc]
changed = sum(1 for a, b in zip(toc, fixed) if a[1] != b[1])
if changed:
    doc.set_toc(fixed)
meta = dict(doc.metadata or {})
meta.update(author=AUTHOR, subject=SUBJECT, creator="Don't Get Forked book build")
doc.set_metadata(meta)
doc.saveIncr()
print(f"finished {path}: {changed} doubled bookmark(s) halved; author and subject set")

# A character the book's typefaces lack is drawn in a fallback font (it happened with "→"): name each one.
BOOK_FONTS = ("Fraunces", "Alegreya")
fallback = {}
for i, page in enumerate(doc):
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            for span in line["spans"]:
                if span["text"].strip() and not any(f in span["font"] for f in BOOK_FONTS):
                    for ch in set(span["text"].strip()):
                        fallback.setdefault((ch, span["font"].split("+")[-1]), set()).add(i + 1)
for (ch, font), pages in sorted(fallback.items()):
    print(f"WARNING: {ch!r} (U+{ord(ch):04X}) is drawn in the fallback font {font} on page(s) {sorted(pages)}: the book's typefaces lack it")
sys.exit(1 if fallback else 0)
