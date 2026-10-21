# The outside review of v0.2: what was applied

One row per review item (`REVIEW.md` Sections 1–4; details in `details/`). **Done** means it is in the rulebook source (and the one-shot, Foundry text or simulator where the same point appears), with a row in `book/REVIEW.md` (rows 111–125, 2026-10-21; the design decisions of 2026-10-21, rows 127–139). **For the lead's decision** means it changes a rule, a number or the game's content. **Deferred** means it needs work outside this round (new art, generated maps or Foundry code).

Page numbers are v0.2's. The rebuilt rulebook is still 34 pages and the one-shot 32, with the same page breaks in the one-shot.

## Section 1: design decisions

| Item | Status | Note |
|---|---|---|
| 1.1 Spectral plus free hand-offs | Done (decided 2026-10-21, option c) | Spectral works only at a way in; it still takes the item when that way in is the location's only obstacle; a Ghost past one way in stays past if the party picks the other (the p14 question). Ch2 (the Perk, `module/config.mjs`), Ch4; the one-shot's card and florist cue (row 127) |
| 1.2 Overdraws (one per local chase; the flight's round-2 overdraw) | Done (decided 2026-10-21) | One overdraw per runner per local chase, "Each overdraw in the chase adds its +2 on top" (row 128); the final flight's overdraw is a step down of its own, on top of any Weakness, once per flight, allowed while the Weakness is in play (no Dracula/Ghost exception) (row 129). Ch3, Ch6, At the Table, the Entity Sheet; the one-shot's flight, Caught, Overdraw box and every card's footer |
| 1.3 Late-track and long chases; shared chases at Lead 1 | Done (decided 2026-10-21) | The local mob at most 11 (row 130); a local chase lasts at most 6 rounds, then a Lead of 2 or more escapes, less is cornered (row 131). Shared chases keep Lead 1 |
| 1.4 Capture and the lock-up | Wording done; the rest kept (2026-10-21) | p27 now "Capture is a setback, not the end, unless it takes the last of you" (row 122). Kept: captured loot gone, the lock-up at 10 on every level (8 on Easy puts Easy 0.1 over), a failed rescue's chase |
| 1.5 Clocks and party size | Wording done; the rest for the lead's decision | p25 "most Hard raids" → "about a third of Hard raids", our simulator's number: the hunt at the Limit 19–27% plus at dawn 6–19% of rolled Hard raids (33–38%, `sim/REPORT.md` P0), Gallowsmere 31% with five players (`sim/FULL-TABLE.md`). The reviewer's simulator said 44–58% (row 123). "Expect to run for it" was kept (D5's words); the lead may want to soften it to match a third. Decided 2026-10-21: with five players the Limit is 1 lower on Easy and Standard (Ch5, Ch8, At the Table, the town pages, the one-shot; row 132); Easy's 9 stays, with "(a small town notices sooner)" in Ch5. Dawn, Tells and Thistlewick's strongbox unchanged |
| 1.6 Smaller balance notes (Fetch, the Monster at the way out, abilities dead in a local chase, Hypnotic Eyes) | Done in part (decided 2026-10-21) | In a local chase too, any ability may be spent as a raise on your own roll (Ch2, Ch3, Ch6, At the Table; the one-shot's Your Powers, Caught, tracker and cards; row 133). Fetch, the Monster at the way out and Hypnotic Eyes kept |

## Section 2: rules wording

| Item | Status | Where |
|---|---|---|
| W1 Flight raises: any signature or Gift, on any runner's roll | Done | Ch2 Using an Entry, Ch3 Abilities, Ch6 The Final Flight (row 111). Matches `module/logic/roll-plan.mjs` (`asRaise`) and the simulator. The one-shot already said it |
| W2 When giving up happens; a chase with no rolls | Done | Ch6 Giving up: "once the ground is read and before anyone rolls" (D2), and "a chase given up before anyone has rolled raises nothing"; the one-shot's read-aloud box (row 112) |
| W3 "When you flee alone" | Done | Ch6 (a new bullet, "Fleeing alone"); the Night Runner and Fear the Curse texts in `module/config.mjs` (so Ch2, the one-shot's cards and Foundry); the one-shot's Caught (row 113) |
| W4 A Huge piece when one carrier is caught | Done (decided 2026-10-21) | Ch4 Carrying: it stays with the other carrier and can't move until the chase is over; if either is captured, the town takes it (row 135) |
| W5 Which Suspicion sets the mob | Done | Ch6 and the one-shot's Caught step 2: after the rise from the roll that got you caught (row 114). Matches Foundry, the simulator and the Example of Play |
| W6 Picks: tie-breaks, Duty clashes, useless Duties | Done (decided 2026-10-21) | A roll-off (high d6 keeps it) for the same Entity or Duty; a random Duty rerolled while a free one on the list remains. Ch2; the one-shot's two cues (row 134). Sharing a Duty not adopted |
| W7 Jekyll and a friend's "Monster without Suspicion" | Done (decided 2026-10-21) | Hyde takes over whenever the Monster shows on Jekyll's roll, even at no Suspicion; the Draught's rule (Ch2, `module/config.mjs`), Pillar of Society's note shortened, the one-shot's The Monster Shows (row 136) |
| W8 An own approach at a way in picks it | Done | Ch4 The Town: "even with an approach of its own and even if the roll fails"; the one-shot's Places (row 115) |
| W9 Picking among Tell arrivals | Done | Ch5 Tells (row 116). The one-shot already did it this way |
| W10 "No extra Tells" and the Witch | Done | Ch4 Turns (row 117) |
| W11 "(its page follows)" | Done | Ch9: "(the second town below)" (row 118) |
| W12 "(Rolling a Town, step 3)" | Done | Ch8: "(Placing the locations, step 3)", and the two "step 4" references to the ceiling likewise (row 119) |
| W13 "A carried move takes two Turns" | Done | Ch8: "at least two Turns" (row 120). The one-shot is right as it stands: every Hallowby move takes one Turn |
| W14 Rolled towns: inside-only obstacles at a way in, group ways in, watched obstacles | Done (decided 2026-10-21) | Ch8: rows 17 (strongbox) and 18 (back room) marked "(inside)", never a way in (rerolled); at most one group way in; a rolled town needs no map. `DGF.obstacleTable` `inside: true`; `book/tools/towns.mjs` checks the premade towns and Hallowby (all pass) (row 137). Watched obstacles unchanged |
| W15 At the Table's missing rules | Done in part (2026-10-21) | p33 (its chase table now two to a row): start at the way out; one Entity at a time, chase and all; the hunt mid-Turn; the group check; dropping is free; a roll's result comes first; no local chase if that Trouble brings the Limit; giving up once the ground is read (row 138). The Castle Duty table and "furniture can be taken later or left" are for the Storyteller quick sheet |
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
