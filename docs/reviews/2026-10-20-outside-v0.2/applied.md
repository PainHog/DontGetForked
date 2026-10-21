# The outside review of v0.2: what was applied

One row per review item (`REVIEW.md` Sections 1–4; details in `details/`). **Done** means it is in the rulebook source (and the one-shot, Foundry text or simulator where the same point appears), with a row in `book/REVIEW.md` (rows 111–125, 2026-10-21). **For the lead's decision** means it changes a rule, a number or the game's content. **Deferred** means it needs work outside this round (new art, generated maps or Foundry code).

Page numbers are v0.2's. The rebuilt rulebook is still 34 pages and the one-shot 32, with the same page breaks in the one-shot.

## Section 1: design decisions

| Item | Status | Note |
|---|---|---|
| 1.1 Spectral plus free hand-offs | For the lead's decision | Also the p14 question of the Ghost and the other way in |
| 1.2 Overdraws (one per local chase; the flight's round-2 overdraw) | For the lead's decision | "Each overdraw adds +2" is what Foundry (`chaseRise`) and the one-shot already say; the rulebook's "An overdraw in the chase adds its +2 on top" could say "each" as a wording fix if the lead keeps the rule |
| 1.3 Late-track and long chases; shared chases at Lead 1 | For the lead's decision | |
| 1.4 Capture and the lock-up | Wording done; the rest for the lead's decision | p27 now "Capture is a setback, not the end, unless it takes the last of you" (row 122). Captured loot, the lock-up at 10 on Easy and failed rescues: the lead's |
| 1.5 Clocks and party size | Wording done; the rest for the lead's decision | p25 "most Hard raids" → "about a third of Hard raids", our simulator's number: the hunt at the Limit 19–27% plus at dawn 6–19% of rolled Hard raids (33–38%, `sim/REPORT.md` P0), Gallowsmere 31% with five players (`sim/FULL-TABLE.md`). The reviewer's simulator said 44–58% (row 123). "Expect to run for it" was kept (D5's words); the lead may want to soften it to match a third. Dawn, Tells, party size, Easy's Limit below Standard's and Thistlewick's strongbox: the lead's |
| 1.6 Smaller balance notes (Fetch, the Monster at the way out, abilities dead in a local chase, Hypnotic Eyes) | For the lead's decision | |

## Section 2: rules wording

| Item | Status | Where |
|---|---|---|
| W1 Flight raises: any signature or Gift, on any runner's roll | Done | Ch2 Using an Entry, Ch3 Abilities, Ch6 The Final Flight (row 111). Matches `module/logic/roll-plan.mjs` (`asRaise`) and the simulator. The one-shot already said it |
| W2 When giving up happens; a chase with no rolls | Done | Ch6 Giving up: "once the ground is read and before anyone rolls" (D2), and "a chase given up before anyone has rolled raises nothing"; the one-shot's read-aloud box (row 112) |
| W3 "When you flee alone" | Done | Ch6 (a new bullet, "Fleeing alone"); the Night Runner and Fear the Curse texts in `module/config.mjs` (so Ch2, the one-shot's cards and Foundry); the one-shot's Caught (row 113) |
| W4 A Huge piece when one carrier is caught | For the lead's decision | |
| W5 Which Suspicion sets the mob | Done | Ch6 and the one-shot's Caught step 2: after the rise from the roll that got you caught (row 114). Matches Foundry, the simulator and the Example of Play |
| W6 Picks: tie-breaks, Duty clashes, useless Duties | For the lead's decision | |
| W7 Jekyll and a friend's "Monster without Suspicion" | For the lead's decision | |
| W8 An own approach at a way in picks it | Done | Ch4 The Town: "even with an approach of its own and even if the roll fails"; the one-shot's Places (row 115) |
| W9 Picking among Tell arrivals | Done | Ch5 Tells (row 116). The one-shot already did it this way |
| W10 "No extra Tells" and the Witch | Done | Ch4 Turns (row 117) |
| W11 "(its page follows)" | Done | Ch9: "(the second town below)" (row 118) |
| W12 "(Rolling a Town, step 3)" | Done | Ch8: "(Placing the locations, step 3)", and the two "step 4" references to the ceiling likewise (row 119) |
| W13 "A carried move takes two Turns" | Done | Ch8: "at least two Turns" (row 120). The one-shot is right as it stands: every Hallowby move takes one Turn |
| W14 Rolled towns: inside-only obstacles at a way in, group ways in, watched obstacles | For the lead's decision | |
| W15 At the Table's missing rules | For the lead's decision | A second reference page, or space found on p33 |
| W16 First-night friction | Done in part | Ch1 What You Need and the one-shot's: the Mask d6 and Monster d10 in a different colour from the trait dice, a 0 on a d10 is 10, and what to copy (the Entity Sheet and At the Table for each player, the town's page, The Eight) (row 121). For the lead: a "Before you play" box, the second d6 a standard set lacks, a printed track, and a bigger Entity Sheet (the sheet's layout) |

## Section 3: layout

| Item | Status | Note |
|---|---|---|
| p25 about half empty (N1) | Done | "The Same on…" is a full-width strip; Chapter 8's tables are a hair tighter (`tight-tables`), so "Building a Location by Hand" fits p24 and the Shopping List p25. p24–p26 are full |
| p15's right column 4.5 in empty (L3) | Partly | Chapter 4's Carrying list may now split (a `flow` list, `book/build.mjs`), so p15 is balanced: both columns end about 8.3 in, leaving a 1.9 in band. Every stand-in spot is now printed, so nothing is left to fill it. Deferred: one more small picture (the review suggests a porter carrying furniture) |
| p30's 2.8 in band after Thistlewick (N2) | Deferred | Now 3.0 in (the town tables are a little shorter). Needs a picture; none is spare |
| pp24, 26 and 27 ending short (N3) | Done | p24 and p26 are full; Chapter 8 ends on p27 with the bonfire spot (6.36 in, full width), so Andriessen is back in the credits |
| p19's floating windmill (L1) | Changed | The wording pushed Chapter 6 down, so p19 is now full: the windmill (3.5 in) sits under the chase table with no gap above it. It still has nothing to do with chases |
| p21's 1.7 in band (L2) | Deferred | The reviewer's fix (a frame 1.6 in taller) crops about 35% off the sides of the cart, cutting the horse's head and the back of the cart, which the art checklist forbids. Needs a taller picture |
| Shopping-list items breaking mid-phrase (L9) | Done | Each item stays on one line; rows break only after a "·" |
| "Watched" shown only in red (L11) | Done | CSS only: the maps' eye before "watched" in every town table (both books). The obstacle column took 0.3 in from the two trait columns so no row wraps |
| Small print: map labels 6.9 pt, numbers 5.6 pt (L11) | Deferred | The maps are generated (`book/tools/town-maps.mjs`), not CSS |
| Footer hairline (L14), bleed and the grey tint (L13) | Not in this round | The build already makes printer-friendly (`--white`) and print-on-demand (`--print`) files; the printer-friendly PDFs were rebuilt |
| "W. / Duke" breaking in the credits (L21) | Done | A non-breaking space |
| New in this round: the lock-up table split across p18's columns | Done | After the wording, the table spans the page (its rows fit one line). p18's right column now ends 1.2 in short, because the Majority Rule box moves to p19 |

## Section 4: art and rights

| Item | Status | Note |
|---|---|---|
| "Gavarni dropped from the credits, but his print is still Dracula's In costume" | Report only: not so | Dracula's In costume is Charles Rochussen's 1868 playbill scene, credited. Every printed picture was matched to its artist in `book/art/stand-in/SOURCES.md` and both credits lines checked both ways: all match, once Andriessen is back for the bonfire (new section at the end of SOURCES.md) |
| Cornet, Rochussen, Wageman and Whittock still printed? | Yes | Cornet: the lantern spot (the rulebook's Chapter 1, the one-shot's Before You Play); Rochussen: Dracula In costume; Wageman and Whittock: the Creature Revealed |
| The storefront note | Not filed here | Richard has the original; no change |
| A source log for every picture; Woodward's and Koster's dates | Already there | `book/art/stand-in/SOURCES.md` (Woodward published 1897; Koster's etching in the Rijksmuseum by 1892) |
| The windmill crop cuts the engraver's signature (N6) | Done | `manifest.json` crop 0.935 → 0.941; the signature is whole and no paper shows (row 125) |
| In costume and Revealed pairs; the owl and lantern files' size | Not in this round | Nice-to-haves for Richard's art pass |
