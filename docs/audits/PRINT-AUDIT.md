# Print readiness (2026-10-06)

Checked with `npm run build:book -- --print`: an interior of 26 pages (8.75 × 11.25 in with 0.125 in bleed, an even page count) and separate front and back covers, all at the right size. Every page was looked at on a contact sheet.

## Fixed
- **A character missing from the typefaces.** The arrow in Chapter 3's die chain ("d4 → d6 → …") isn't in the fonts' Latin subset, so Chromium drew it in a fallback font (Liberation Serif). The line now reads "d4 to d6, d6 to d8, and so on". `book/tools/pdf-finish.py` now names any character drawn in a fallback font after every build, so this can't slip through again.
- **The print files** (`book/dist/*_print-*.pdf`) are build outputs made on demand and are now ignored by git, like the HTML build.

## Open: picture resolution for a printed copy
Print-on-demand printers ask for 300 dpi. The stand-in pictures were prepared for the screen PDF (`book/art/stand-in/manifest.json` sets each output width), so in print these come out below 300 dpi:

| Interior page | Printed width | Pixels wide | Effective dpi | Pixels for 300 dpi |
|---|---|---|---|---|
| 14 | 7.14 in | 900 | 126 | 2142 |
| 16 | 7.14 in | 900 | 126 | 2142 |
| 21 | 7.08 in | 900 | 127 | 2124 |
| 4 | 7.12 in | 1419 | 199 | 2136 |
| 5 | 7.12 in | 1500 | 211 | 2136 |
| 10 | 7.11 in | 1500 | 211 | 2133 |
| 11 | 7.12 in | 1500 | 211 | 2136 |
| 12 | 7.12 in | 1500 | 211 | 2136 |
| 13 | 7.12 in | 1500 | 211 | 2136 |
| 15 | 7.12 in | 1500 | 211 | 2136 |
| 18 | 7.12 in | 1500 | 211 | 2136 |
| 22 | 7.12 in | 1500 | 211 | 2136 |
| 9 | 1.64 in | 385 | 235 | 492 |
| 3 | 6.69 in | 1600 | 239 | 2007 |
| 17 | 6.69 in | 1600 | 239 | 2007 |
| 4 | 3.36 in | 900 | 268 | 1008 |

The dark part pages' background is a CSS gradient that Chromium draws at 72 dpi; it is a smooth fade with nothing to lose, so it doesn't need fixing.

**Recommendation:** leave the screen PDF as it is (7.4 MB). Before ordering a printed proof, raise the widths in the manifest to the "pixels for 300 dpi" column and re-run `book/tools/prep-art.py` for those pieces (three sources are Wikimedia's 1920-px thumbnails, so they need the original file's URL), or wait for the illustrator's art, which should be delivered at 300 dpi at its printed size (book/art/ILLUSTRATOR-BRIEF.md).
