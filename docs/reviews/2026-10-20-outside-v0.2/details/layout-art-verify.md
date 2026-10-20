# Don't Get Forked v0.2: re-check of layout, art and image rights

**What I checked:** the 34-page US Letter playtest PDF, v0.2 (`dgf.pdf`, built 20 Oct 2026), against the v0.1 findings (S1–S2, L1–L21, A1–A11, R0–R7).

**How I checked it:**
- I rendered every page at 90 dpi and viewed each one, then viewed them again as contact sheets.
- I zoomed doubtful areas at 150–900 dpi: portrait rows, maps and arrowheads, the shopping list, plate edges and signatures.
- I extracted all 34 embedded images at full resolution.
- I matched v0.1 and v0.2 images by file hash: 20 are unchanged and 14 are new or re-scanned.
- Effective ppi is the image's pixel width divided by its placed width. The "upscaled" test is the same resample test used for v0.1.

**Files:** renders are in `pages/`, extracted images in `imgs/` and zooms in `zoom/`. No repository was changed. Rights notes are risk flags, not legal advice.

Severity: **must-fix** / **should-fix** / **nice-to-have**.

## Summary

- **Both sensitivity pictures are gone (S1, S2).** The new stand-ins carry no caricature risk that I could find, and every new picture is a pre-1931 print. Most art items are fixed:
  - the wrong-reading Dracula and Invisible Man pictures are replaced;
  - the soft castle banner is replaced;
  - the three 126-ppi full-width pictures are re-scanned or removed;
  - the three awkward crops are fixed.
- **Layout improved a lot**, with three fixes worth naming:
  - **Frankenstein is whole on p. 8.**
  - **The town-page key now comes before the towns.**
  - **The TOC has second-level entries.** All 21 entries and their links point to the right pages.
- **New gaps opened up** when the bonfire picture came out and the Example of Play moved ahead of the towns:
  - **p. 25 is about half empty** (new, must-fix by the book's own "no near-empty pages" rule);
  - **p. 30 ends with 2.8 in of blank**;
  - pp. 24, 26 and 27 each end 1.6–2.7 in short.

  **p. 15** (end of Ch. 4) still has a half-empty right column with no art, and **p. 21** still ends with a 1.7 in blank band.
- **Credits:**
  - The new names match the new pictures.
  - The public-domain notice and the closing full stop are in.
  - **Paul Gavarni was dropped from the credits, but his masked-man print is still Dracula's "In costume" picture (p. 8)**, re-cropped.
  - [Storefront-disclosure note left out of the repository at Richard's request; he has the original.]

---

## 1. Verification of v0.1 items

Status key: **Fixed** / **Partly** / **Not changed** / **Changed differently**.

### Sensitivity (S1–S2)

| # | v0.1 issue | Status | Page | What v0.2 shows | Left to do |
|---|---|---|---|---|---|
| S1 / A1 | Invisible Man "In costume": two hook-nosed men whispering (Gavarni/Verdeil) | **Fixed** | 10 | A young Venetian in tricorn, black lace cape and bauta, mask pushed up on the hat, holding a coffee cup (Giovanni David, *Le Masque au Caffé*, 1775). 391 ppi, crisp. Nothing that reads as caricature. | — |
| S2 / A2 | Frankenstein "In costume": procession giant with a blacked-out face | **Fixed** | 8 | A single stilt-walker towering over a Paris crowd, with a policeman and onlookers (Charles Morel wood engraving, 1880s–1900s). This is exactly the "a head above the crowd" Tell. 391 ppi. I checked every face in the crowd and found no caricature. | — |

### Layout (L1–L21)

| # | v0.1 issue | Status | Page | What v0.2 shows | Left to do |
|---|---|---|---|---|---|
| L1 | p. 19 near-empty: two orphan lines, Chase Table, soft filler windmill, blank foot | **Partly** | 19 | The windmill is now a sharp re-scan (234 ppi), cropped to the full text width and 5.1 in tall. The page reads more like a deliberate plate. Still the same structure, though:<br>• three short items carried over from p. 18 (the left column ends at 3.1 in);<br>• the Chase Table on the right;<br>• a 0.6–1.25 in gap above the picture and 0.7 in of blank below it.<br>The windmill still has nothing to do with chases. | nice-to-have: run the picture down to the bottom margin. Swap it for a chase or crowd scene if one turns up. |
| L2 | p. 21 near-empty: campaign box, 126-ppi cart, 2.2 in blank | **Partly** | 21 | The cart is re-scanned at 234 ppi, with the plate mark trimmed. The blank band at the foot shrank from 2.2 in to **1.7 in** (picture bottom at 8.5 in). | should-fix: make the picture frame about 1.6 in taller so it reaches the bottom margin. The frame already crops by object-fit, so this is a one-number change. |
| L3 | p. 15 half-empty end of Ch. 4, no art | **Partly** | 15 | The left column is now full (to 9.9 in). **The right column stops at 5.6 in: 4.5 in × 3.4 in of empty column, still no art.** | **must-fix:** put a portrait picture in the right column, for example a porter carrying furniture for "Carrying". A *Cris de Paris* print would do. |
| L4 | p. 27 near-empty: text, gap, 127-ppi bonfire, blank | **Changed differently** | 26–27 | The bonfire picture was removed and Ch. 8 reflowed. p. 27 is now text, but its left column stops at 7.5 in (**2.65 in blank**), and p. 26 ends 1.6–2.4 in short. See N1 for the knock-on gap on p. 25. | should-fix (N1, N3) |
| L5 | Gaps on p. 7 split Frankenstein across pp. 8–9 | **Fixed** | 6–8 | "Abilities never pass automatically" now sits at the foot of p. 6. "Four kinds of ability" is beside "Using an entry" on p. 7, and both Dracula and Frankenstein are whole on p. 8. p. 7 ends with about 1.4 in of white under the right column, which is fine. | — |
| L6 | p. 13 uneven columns plus filler watchman | **Partly** | 13 | The columns are now balanced (4.9 / 5.2 in). The same watchman picture fills the lower 45%, now 199 ppi at 3.1 in wide. It reads fine, but it is still a stand-in filler on a Ch. 3 page. | nice-to-have |
| L7 | "Reading the Town Pages" key came after Puddlecombe | **Fixed** | 28 | The key is now a box on the Ch. 9 opener, before any town. | — |
| L8 | Puddlecombe last row wrapped "(group) watched" under the label column | **Fixed** | 29–31 | Long obstacle names now wrap inside the obstacle column, with a hanging indent. I checked every wrap in all three towns: "…closer look (group) watched" and the three "shopkeeper behind the counter / watched" rows. | — |
| L9 | Shopping list: numbers wrap away from their items; "same on every level" list split across columns | **Partly** | 26, 25 | The numbers are now bold and always stay with their item's first word. Items still break mid-phrase ("5 a jar of / honey", "4 turnip seed for / next year's lanterns", "5 a coil of / rope"), and one "·" dangles at a line end in the Books row. The "same on Easy, Standard and Hard" list is now one box. | nice-to-have: non-breaking spaces inside each item, or a 2×3 grid per row |
| L10 | d20 table opened p. 24 with no heading | **Fixed** | 24 | It is now headed "The Location Rolls". | — |
| L11 | Small print; "watched" shown by colour only | **Partly** | 8, 26, 29–31 | Town-table row labels went from 6.8 to **7.5 pt**. Unchanged:<br>• table cells 8.2 pt;<br>• map labels 6.9 pt;<br>• map numbers and "the square" 5.6 pt;<br>• ability tags 7.4 pt;<br>• shopping-list place names 7.7 pt grey italic;<br>• "watched" is still dark-red italic only, with no eye symbol in the tables. | should-fix: eye icon next to "watched"; map labels 7.5 pt or more. nice-to-have: cells 8.5 pt. |
| L12 | Back cover: "2–3 hours", 2.5 in empty band, off-theme sheep | **Fixed** | 34 | It now reads "1–2 hours a raid". The picture is a night festival crowd with paper lanterns, flags and illuminations (Lepère after Scott, 364 ppi), which is right on theme. The band between picture and tagline is now about 1.3 in. | — |
| L13 | No bleed; grey tint on every interior page; full-bleed dark pages | **Not changed** | all | The page is still exactly 612 × 792 pt. The background is still #F1F1ED (about 5% tint), and pp. 1, 4, 22 and 34 are still dark full-bleed. *Note:* the older local checkout's `book/dist/` holds v0.1 print-cover and print-interior PDFs at 630 × 810 pt (0.125 in bleed), so the build can make bleed files. No v0.2 print files were supplied. | should-fix: a white "print at home" variant for playtesters; ship the bleed files for print-on-demand. |
| L14 | Footer hairline on some pages only; footer lower on pp. 32–33 | **Partly** | most | **The footer position is now identical on every page (753 pt), including pp. 32–33.** The hairline is still inconsistent: it shows on pp. 5, 7–11, 13, 15, 16, 19 and 27, and not on the others. On pp. 7–10 it is drawn as two column-width rules. | nice-to-have |
| L15 | TOC: correct but half empty; add second-level entries | **Fixed** | 3 | Second-level entries were added. Every one is correct (table in section 4), and so is every clickable link. About 3.5 in at the foot is still empty, which is fine. | — |
| L16 | Entity columns end unevenly | **Not changed** | 8–11 | 0.2–1.6 in of white under the entries (accepted in v0.1). | — |
| L17 | p. 5 lantern prints as a near-black block | **Fixed** | 5 | The same etching is cropped tighter around the lit lantern (mean brightness 78, was 52), at 1.7 in. | — |
| L18 | Map way-out arrowheads cut off by the frame | **Fixed** | 29–31 | All three arrowheads are now complete inside the frame. The Thistlewick road still runs to the frame line, but the head is whole. | — |
| L19 | Entity Sheet: faint hints, no Notes | **Partly** | 32 | Hints are darker (8.6 pt, near-black). There is a Notes line and a "Caught (a local chase)" status. The sheet panel is near-white, though the page margin is still tinted. The Notes space is one ruled line, and the sheet is not a fillable form (no form fields). | nice-to-have: a 1–1.5 in Notes box; optional fillable version |
| L20 | No author name; no "playtest" on cover | **Partly** | 1, 34 | The front cover now reads "RICHARD MOORE · VERSION 0.2". There is still no author name on the back cover and no "playtest" on the cover; the interior footers say it. | nice-to-have |
| L21 | Credits: no full stop; one 12-line run-on | **Partly** | 2 | The full stop is added. It is still one 12-line paragraph, and "W. / Duke, Sons & Co." breaks across a line. | nice-to-have: a non-breaking space after "W."; the per-image list (R2) |

### Art (A1–A11)

| # | v0.1 issue | Status | Page | What v0.2 shows | Left to do |
|---|---|---|---|---|---|
| A1 | = S1 | **Fixed** | 10 | see S1 | — |
| A2 | = S2 | **Fixed** | 8 | see S2 | — |
| A3 | Dracula "Revealed" was a plumed theatre cavalier | **Fixed (changed differently)** | 8 | Now Doré's bat-winged Satan clutching his head on a rock (*Paradise Lost*, 1866), 391 ppi, crisp. The bat wings sell "the monster revealed". Anyone who knows Doré will read it as Satan rather than a vampire, which is fine for a stand-in. | nice-to-have: a *Varney*-style vampire if one turns up |
| A4 | Invisible Man "Revealed" was a skeleton | **Fixed** | 10 | Now a scarecrow: an empty coat and top hat flapping over a field (a Daumier crayon lithograph). "Empty clothes" is exactly the brief. It has a grainy newsprint texture, but it is clean at 391 ppi. | — |
| A5 | Ch. 1 castle banner heavily upscaled; mostly sky; castle cut | **Fixed** | 5 | Now Paul Sandby's *Caernarvon Castle (Night)* aquatint (1776): the Eagle Tower under a moonlit sky, with a tree at the left. 281 ppi and crisp. The castle still sits in the right third, but the moonlit sky is now part of the picture rather than dead space. | — |
| A6 | Three full-width pictures at about 126 ppi (pp. 19, 21, 27) | **Fixed** | 19, 21 (27) | pp. 19 and 21 are re-scanned at **234 ppi**, just under the 250 target, which is fine for etchings. The p. 27 bonfire was removed rather than re-scanned. | — |
| A7 | Upscaled portraits (Jekyll, Hyde, Woodward witch, Cleopatra card, cavalier, skeleton) | **Partly** | 9, 11 | The cavalier and skeleton are gone. Jekyll, Hyde, the Woodward witch and the Cleopatra card are the same files: still soft, and Hyde's face barely reads. | nice-to-have |
| A8 | "In costume" and "Revealed" pairs don't look like one character | **Partly** | 8–11 | Two pairs now follow the brief:<br>• Frankenstein: a stilt-walker, then the stage monster, both male;<br>• Invisible Man: a cloaked masked figure, then empty clothes.<br>Dracula (masked man, then winged Satan), the Mummy (Cleopatra, then a male mummy) and the Witch (child, then crone) are unchanged in spirit. | Fine for stand-ins; brief the final art as one figure in two states. |
| A9 | Awkward crops: woman sliced beside Dracula; stray limb on the Mummy; plate mark on p. 21 | **Fixed** | 8, 9, 21 | The same Gavarni print is re-cropped so the woman is whole, in profile. The mummy is re-cropped so the stray limb now reads as its own leg over the sarcophagus. The p. 21 plate lines are trimmed (checked at 400 dpi; only the print's own sky hatching remains). | — |
| A10 | Style mostly unified | **Fine** | — | New additions:<br>• Sandby's tonal aquatint;<br>• Daumier's crayon litho;<br>• newspaper wood engravings (Morel; Lepère after Scott);<br>• Doré;<br>• David's etching.<br>All sit in the same black-and-white family. | — |
| A11 | Relevance: cabinet (p. 6), watchman (p. 13), owl (p. 31), back cover | **Partly** | 6, 13, 31, 34 | The back cover is fixed. The owl is now a small 1.6 in spot under Gallowsmere instead of a half-page filler. The cabinet and watchman are unchanged. | nice-to-have |

### Rights (R0–R7)

| # | v0.1 issue | Status | Page | What v0.2 shows | Left to do |
|---|---|---|---|---|---|
| R0 | No film stills or photographs | **Still true** | all | All 14 new or re-scanned files are prints, from 1776 to the 1890s (section 3). There is nothing Universal-like: no Lugosi, Karloff, Rains or Chaney looks. | Keep it that way. |
| R1 | [Storefront-disclosure note left out of the repository at Richard's request; he has the original.] ||||
| R2 | No per-image source log | **Not changed** (as far as I can see) | 2 | The credits still list names without pictures. The local checkout is older than this PDF and holds no log. | should-fix |
| R3 | Wikimedia Commons files need individual checks | **Not changed** | 2 | Commons is still listed. The **Internet Archive** is added; scans of public-domain books are low-risk, but log the book title and year. | should-fix |
| R4 | 20th-century artists: Strimpl, Koster, Woodward | **Partly** | 10, 11, ? | **Strimpl** is gone (the skeleton was removed). **Woodward** (d. 1951) is still the p. 11 witch: confirm it was published before 1931 for the US. **Koster** (d. 1937) is still credited; I can't tell which picture is his, so confirm its year. None of the new artists needs a date check (section 3). | should-fix |
| R5 | "All rights reserved" seemed to claim the pictures | **Fixed** | 2 | The new line reads: "The stand-in illustrations are public-domain works and remain in the public domain." | — |
| R6 | Credits match the pictures | **Partly** | 2 | The new names match the new pictures, and the dropped names (Andriessen, Vervloet, Strimpl, Verdeil) match removed pictures. But **Paul Gavarni was dropped while his print (Dracula "In costume", p. 8) is still used**; see N7. Some names may now have no picture: v0.1 guessed **Cornet and Rochussen** for the removed procession giants, and **Wageman or Whittock** for the removed cavalier, but these were unconfirmed guesses. | should-fix: check every credited name against the log |
| R7 | Avoid Universal-specific looks | **Still true** | 8–11 | Nothing new comes close. | — |

---

## 2. New findings (layout)

| # | Severity | Page | What I saw | Suggested fix |
|---|---|---|---|---|
| N1 | **must-fix** | 25 | **About half the page is empty (new).** Under the full-width "Easy, Standard or Hard" table, the "The same on Easy, Standard and Hard" box sits alone in the left column (to 7.45 in). The right column is empty from about 5.7 in down (**4.4 in × 3.4 in**), and the left column is empty under the box (**2.6 in**). This came from the reflow after the bonfire was removed and "The Shopping List" moved to p. 26. | Set "The same on…" as a full-width strip (four short lines, about 1 in). Then fill the 3 in band below with art. Ideally bring back the Andriessen bonfire (Lantern Night, one of v0.1's strongest pictures) from a full-size museum download at 250 ppi or more. |
| N2 | should-fix | 30 | **Thistlewick ends at 7.4 in, leaving 2.8 in of blank across the page (new).** In v0.1 the Example of Play followed the towns; now it comes first (pp. 28–29), and the towns shifted down. | Fill the band with a full-width picture (a market-town or festival print), or move the Bewick owl here at a larger size. |
| N3 | should-fix | 24, 26, 27 | Short page ends across Ch. 8 (new or grown):<br>• p. 24 ends 1.9 in short (was 0.7 in);<br>• p. 26 ends 1.6 in (left) and 2.4 in (right) short;<br>• p. 27's left column stops at 7.5 in, leaving 2.65 in blank under the Villagers table.<br>With N1, Ch. 8 now carries about a page of scattered white. | p. 27's bottom-left (about 3.4 × 2.5 in) is a natural home for a Lantern Night spot picture. Better still, rebalance Ch. 8 as a whole. Keep the interior at 32 pages. |
| N4 | nice-to-have | 28–29 | The Example of Play says Thistlewick's "page follows", but Puddlecombe comes first; Thistlewick is on p. 30. | "(see page 30)" |
| N5 | nice-to-have | 5, 31 | Two small spots carry far more pixels than they need: the lantern at 772 ppi, and the owl at 1,154 ppi (a 0.8 MB file for a 1.6 in spot). | Downsample to about 400 ppi to trim the PDF (now 10.6 MB, was 7.8 MB). |
| N6 | nice-to-have | 19, 21 | The full-width pictures are scaled to 8.55 in and then clipped to the 7.14 in text width. On p. 19 that crops off the engraver's signature ("…Cuylenburg") at the right. | No action needed. Note it if the log should record the crop. |
| N7 | should-fix (credits) | 2 / 8 | **Gavarni is missing from the credits.** In v0.1, Dracula's "In costume" picture (masked man in a slouch hat and domino, a woman's hands on his chest, candle and bottle behind) was identified as a Gavarni carnival lithograph. v0.2 uses the same print, re-cropped. | Restore "Paul Gavarni", unless the source log says another artist made this print (Daumier, for example, is now credited). |

**What still works well:** chapter openers, the absence of text-on-art collisions, the absence of split tables or stranded headings, the balanced pp. 6, 12, 14, 16–18, 20, 23 and 28, the At the Table page, and the consistent footer position (now on every page).

---

## 3. New and changed pictures

Of 34 pictures (35 in v0.1), 20 are unchanged files. The 14 below are new, re-scanned or re-cropped.

| Page | Slot | Subject (as seen) | Likely artist and source | Effective ppi / quality | Fit | Sensitivity check | Rights (risk flag) |
|---|---|---|---|---|---|---|---|
| 4 | Part One | Ruined tower, stars, crescent moon | Samuel Palmer, *The Lonely Tower* (1879): same work, larger scan | 269, crisp | Good | — | Public domain (Palmer d. 1881) |
| 5 | Ch. 1 banner | Castle tower with three turrets under a moonlit sky, tree at left | **Paul Sandby**, *Caernarvon Castle (Night)*, aquatint, 1776 (*XII Views in North Wales*, pl. 8; NGA and Met hold impressions) | 281, crisp aquatint grain | Good | None | Public domain (d. 1809). NGA and Met are CC0. Low risk. |
| 5 | Spot | Lantern glowing on a ledge | Same unidentified etching, tighter crop | 772, crisp | Excellent | — | As v0.1 |
| 8 | Dracula, costume | Masked man in slouch hat and cloak; woman in bonnet, now whole, hands on his chest | Gavarni lithograph (v0.1 identification), re-cropped | 391, fine | Good (a carnival flirtation) | Reads as masked-ball play. No concern. | Public domain. **Credit missing (N7).** |
| 8 | Dracula, revealed | Bat-winged armoured figure on a rock, hand to his head | **Gustave Doré**, Satan from *Paradise Lost* (1866) | 391, crisp | Good (monstrous, winged) | Recognisably Satan; low risk in a monster game | Public domain (d. 1883). Low risk. |
| 8 | Frankenstein, costume | Stilt-walker with a pole over his shoulders, in a sheepskin, above a Paris crowd with a policeman | **Charles Morel** (1861–1908), illustrator for *Le Monde illustré*, *L'Univers illustré* and *L'Illustration*; magazine wood engraving, about 1880s–1900s | 391, good | Excellent ("head above the crowd") | Checked every crowd face. No concern. | Public domain (d. 1908; published before 1909). Log the magazine and issue. |
| 9 | Mummy, revealed | Mummy rising from its sarcophagus | Same print (van Maële?), re-cropped | 303, good | Excellent | — | As v0.1 |
| 10 | Invisible Man, costume | Young Venetian in tricorn, bauta and black lace cape, mask pushed up, coffee cup, coffee pot behind | **Giovanni David**, *Le Masque au Caffé*, title page of *Divers Portraits* (1775) (Met; Rijksmuseum *Masked Coffee Drinker*) | 391, crisp | Good (disguised figure) | None | Public domain (d. 1790). Met and Rijksmuseum are CC0. Low risk. |
| 10 | Invisible Man, revealed | Scarecrow: empty coat and top hat in the wind over a field | **Honoré Daumier** crayon lithograph (*Le Charivari*). Possibly the 1869 *Actualités* "scare-crow" plate (Met) | 391, grainy newsprint texture | Excellent (empty clothes) | The crop shows no caricatured people | Public domain (d. 1879). Low risk. |
| 16 | Ch. 5 banner | Village street at dusk | Samuel Palmer: same etching, larger scan (2000 px) | 281, crisp, very dark | Good | — | Public domain |
| 19 | Full-width | Windmill, cottage, bridge, boat | Johannes van Cuylenburgh (signed "…Cuylenburg", lower right) | **234**, crisp (was 126) | Weak (no chase link) | — | Public domain (early 19th c.) |
| 21 | Full-width | Two-wheeled cart, carter, woman on the load | Same 17th-c. Dutch etching (Bleker?), full-size scan, plate mark trimmed | **234**, crisp (was 126) | Fair ("hauling it home") | — | Public domain |
| 31 | Spot | Barn owl on a stump | Thomas Bewick: larger scan, now a 1.6 in spot | 1,154 (N5) | Weak but small | — | Public domain (d. 1828) |
| 34 | Back cover | Night festival crowd with paper lanterns ("RF"), flags, illuminated pylons with stars, rockets | **Auguste Lepère after Henri Louis Scott**, wood engraving for *Le Monde illustré*, a 14 July illumination (closest catalogued match: NGA, *14 Juillet. Illumination de la Place de la République*, 1883) | 364, good | Excellent (Lantern Night, crowd) | The six-pointed stars are period festival illuminations; I zoomed on every crowd face. No concern. | Public domain (Lepère d. 1918, Scott d. 1884; published 1880s). NGA is CC0. Log the exact plate title. |

**Removed since v0.1:**
- Gavarni/Verdeil false noses (S1);
- the procession giants (S2);
- the theatre cavalier (A3);
- the Strimpl(?) skeleton (A4);
- the old Ch. 1 castle (A5);
- the Andriessen bonfire (p. 27), which I would bring back at full resolution (N1, N3).

**Caricature sweep:** I looked closely at every portrait and every new full-size picture: faces, noses, skin tone and crowd figures. Nothing new reads as an offensive caricature. The carried-over pictures (van Ostade peasants, Batten crone) are unchanged, and v0.1 already passed them.

**20th-century date checks:** none of the new artists needs one. Morel died in 1908 and Lepère in 1918; both pictures are 19th-century magazine engravings. The carried-over checks are Woodward (p. 11) and Koster (picture unidentified); see R4.

[Storefront-disclosure note left out of the repository at Richard's request; he has the original.]

---

## 4. TOC check (every entry against the actual page)

| Entry | TOC | Actual heading | Link | OK |
|---|---|---|---|---|
| Part One: Playing the Game | 4 | p. 4 | p. 4 | yes |
| Ch. 1 The Game | 5 | p. 5 | p. 5 | yes |
| Ch. 2 The Entities | 6 | p. 6 | p. 6 | yes |
| The Eight | 7 | p. 7 (heading; entries pp. 8–11) | p. 7 | yes |
| Ch. 3 Rolling the Dice | 12 | p. 12 | p. 12 | yes |
| Ch. 4 The Raid | 14 | p. 14 | p. 14 | yes |
| Ch. 5 Suspicion | 16 | p. 16 | p. 16 | yes |
| Ch. 6 Chases and Getting Forked | 17 | p. 17 | p. 17 | yes |
| The Chase Table | 19 | p. 19 | p. 19 | yes |
| Ch. 7 How the Year Went | 20 | p. 20 | p. 20 | yes |
| Part Two: Running the Game | 22 | p. 22 | p. 22 | yes |
| Ch. 8 Building a Town | 23 | p. 23 | p. 23 | yes |
| The Obstacle Table | 24 | p. 24 | p. 24 | yes |
| The Shopping List | 26 | p. 26 | p. 26 | yes |
| Ch. 9 Three Towns | 28 | p. 28 | p. 28 | yes |
| An Example of Play | 28 | p. 28 (runs to p. 29) | p. 28 | yes |
| Puddlecombe | 29 | p. 29 | p. 29 | yes |
| Thistlewick | 30 | p. 30 | p. 30 | yes |
| Gallowsmere | 31 | p. 31 | p. 31 | yes |
| Entity Sheet | 32 | p. 32 | p. 32 | yes |
| At the Table | 33 | p. 33 | p. 33 | yes |

The PDF bookmarks also cover every chapter and section. The interior is still 32 pages (pp. 2–33), a multiple of 4.

## 5. Measurements used

Measured from the PDF text positions. The text area runs to about 10.15 in.

| Page | Left column ends | Right column ends | Note |
|---|---|---|---|
| 15 | 9.9 in | **5.6 in** | L3 |
| 19 | 3.1 in | 3.8 in | picture 4.4–9.4 in |
| 21 | box to 2.8 in | — | picture 3.0–8.5 in |
| 24 | 8.3 in (full width) | — | N3 |
| 25 | 7.45 in | **about 5.7 in** | N1 |
| 26 | 8.5 in | 7.75 in | N3 |
| 27 | **7.5 in** | 9.4 in | N3 |
| 30 | 7.4 in (full width) | — | N2 |

**Sources consulted for the attributions:**
- [NGA, Sandby, Caernarvon Castle (Night)](https://www.nga.gov/collection/art-object-page.79397.html)
- [Met, Sandby impression](https://www.metmuseum.org/art/collection/search/858055)
- [NGA, Lepère after Scott, 14 Juillet](https://www.nga.gov/collection/art-object-page.138626.html)
- [Met, Giovanni David, Le Masque au Caffé](https://www.metmuseum.org/art/collection/search/335297)
- [Rijksmuseum, The Masked Coffee Drinker](https://www.rijksmuseum.nl/en/collection/RP-P-2014-25-4)
- [Met, Daumier "scare-crow" (Actualités)](https://www.metmuseum.org/art/collection/search/756730)
- [BnF, Charles Morel (1861–1908)](https://data.bnf.fr/14961313/charles_morel/en.pdf)
