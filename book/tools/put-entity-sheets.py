#!/usr/bin/env python3
"""Write approved Entity sheets (from module/config.mjs, via entity-sheet.mjs) into Chapter 2.
   python3 book/tools/put-entity-sheets.py dracula creature mummy werewolf"""
import pathlib, re, subprocess, sys
ROOT = pathlib.Path(__file__).resolve().parents[2]
CH = ROOT / "book/src/chapters/12-ch02.html"
NAMES = {"dracula": "Dracula", "creature": "Frankenstein’s Creature", "mummy": "The Mummy", "werewolf": "The Werewolf",
         "invisible": "The Invisible Man", "ghost": "A Ghost", "witch": "A Witch", "jekyll-hyde": "Jekyll &amp; Hyde"}
s = CH.read_text()
for key in sys.argv[1:]:
    html = subprocess.run(["node", "book/tools/entity-sheet.mjs", key], capture_output=True, text=True, cwd=ROOT, check=True).stdout.strip()
    name = NAMES[key]
    # the entry: from its heading to the end of its article
    m = re.search(r"(<h3>" + re.escape(name) + r"</h3>[\s\S]*?<p class=\"sig\"><strong>[^<]*</strong> \(signature\).*?</p>\n    )([\s\S]*?)(\n  </article>)", s)
    if not m:
        sys.exit(f"no entry for {name}")
    s = s[:m.start(2)] + html + '\n    <p class="placeholder">PLACEHOLDER — the costume and revealed portraits.</p>' + s[m.end(2):]
CH.write_text(s)
print("ok")
