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
