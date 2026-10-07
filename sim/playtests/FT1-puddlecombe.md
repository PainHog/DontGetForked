# FT1: Full-table playtest, Puddlecombe (Easy), five players and a Storyteller

*Work in progress: written as the game is played. Sections 1 to 6 (what Richard asked for) are filled in at the end; the Turn-by-Turn log is below them.*

**What this is.** A simulated first session: five players with different habits and a Storyteller, playing one raid on Puddlecombe exactly as Chapter 9 prints it, from choosing Entities to How the Year Went and the epilogue.

**Rules source:** only the rulebook text, `book/src/chapters/*.html`, read as text, including the map titles and alt text (the Puddlecombe map's label: "Map of Puddlecombe: 1 the tavern cellar, 2 the market garden, 3 the draper, 4 the schoolhouse, the lock-up and the way out. Every location is watched; the star marks the furniture, at the tavern cellar."). Not the simulator, not `docs/`, not the Foundry code. Where the book is silent or unclear I made a ruling, said so in the log, and logged it as a finding (section 4).

**Dice:** every random result is a real `node -e` `Math.random` roll, numbered R1 onward and listed in the appendix.

---

## Setup (before Turn 1)

### The town, read aloud by the Storyteller

Puddlecombe, "a sleepy village that has never had a real monster". Lantern Night custom: pies left on doorsteps "for the wanderers". Easy: Suspicion Limit 11, the way out 6, the lock-up 10, the final flight against a mob of 10, escape at Lead 5.

The shopping list (4 items): **a wheel of strong cheese (essential, food and drink)**, seed potatoes (plants and seeds), knitting wool (cloth and costumes), an almanac with next year's moons (books and paper). The furniture: **a stuffed bear (Bulky)** at the tavern cellar. Villagers (the town's faces): the baker's wife (looking for a lost cat) and the night watchman (tipsy from the cider).

| # | Location (item) | Way in A | Way in B | Then | Furniture |
|---|---|---|---|---|---|
| 1 | Tavern cellar (cheese, essential) | Locked front door, **watched**: Sly / Brawn loud, 8 | Heavy cellar trapdoor, **watched**: Brawn, 8 | Dark back room: Wits / Sly loud, 6 | Guard dog: Charm / Nimble loud, 10 |
| 2 | Market garden (seed potatoes) | High garden wall: Nimble / Brawn loud, 8 | Muddy yard of geese: Sly / Nimble loud, 6 | Night watchman, **watched**: Wits, 8 | |
| 3 | Draper (knitting wool) | Shopkeeper, **watched**: Charm / Sly loud, 8 | Shuttered window: Nimble / Brawn loud, 10 | | |
| 4 | Schoolhouse (almanac) | Bolted back gate: Brawn / Charm loud, 8 | Rickety drainpipe: Nimble, 10 | Children in costumes (**group**), **watched**: Charm, 8 | |

Every location counts as watched (Chapter 4: "It's watched if any obstacle is, either way in"), so each first arrival gets a Tell check.

### Choosing the Entities (R1 to R8)

Ruling **(r1)**: the book has no d8 list of the Entities, so I numbered them in Chapter 2's order: 1 Dracula, 2 the Creature, 3 the Mummy, 4 the Werewolf, 5 the Invisible Man, 6 a Ghost, 7 a Witch, 8 Jekyll & Hyde. Rolls: 5, 6, 6 (repeat), 3, 4, 4 (repeat), 1. R8 (another 1) was rolled in the same batch after the fifth Entity was already settled and is not used.

| Seat | Player | Entity | Gift | Perk | Castle Duty | Charges |
|---|---|---|---|---|---|---|
| 1 | **Newcomer** | The Invisible Man (Brawn d4, Nimble d8, Sly d12, Charm d6, Wits d10; Flour, Soon) | Through the Gap (default): open an approach with Nimble | Out of Sight (default) | Tailor (default): the draper | 3 |
| 2 | **Daredevil** | A Ghost (Brawn d4, Nimble d12, Sly d10, Charm d8, Wits d6; Cold Iron, Always) | Chill (default): raise a die | Rattle: the Monster showing is +1, not +2 | **Cook** (changed from Butler): the tavern cellar | 3 |
| 3 | **Planner** | The Mummy (Brawn d10, Nimble d4, Sly d6, Charm d8, Wits d12; A Loose Thread, Soon) | Old Curse: raise a die | Patience of Ages (default) | Librarian (default): the schoolhouse | 3 |
| 4 | **Hoarder** | The Werewolf (Brawn d10, Nimble d12, Sly d6, Charm d4, Wits d8; Hounds, Soon) | Howl: raise a die | Fetch: the way out 1 easier while he's there; a final flight he's in starts at Lead 3 | Gardener (default): the market garden | 3 |
| 5 | **Roleplayer** | Dracula (Brawn d8, Nimble d10, Sly d6, Charm d12, Wits d4; Garlic, Always) | Bat (default): use Nimble instead | Hypnotic Eyes (default) | Butler (default) | 3 |

**How the picks went (table talk):**

- *Newcomer:* "I'll just take the ones with the little mark." The Storyteller has to explain what "open an approach" means; the At the Table page covers it in one line ("open your own approach (2 lower, your roll only, never in a chase)"), which helps.
- *Ruling (r2):* the book doesn't say whether the shopping list is known when the players choose their picks. Chapter 4 says the Storyteller rolls it "before the raid", and a premade town prints it, so the Storyteller read it out first. That turned the Castle Duty pick into a puzzle: four kinds on the list (food, plants, cloth, books) and five Entities, and the defaults covered only three of them (Tailor, Gardener, Librarian), with Dracula and the Ghost both defaulting to Butler.
- *Planner:* "Nobody has the cheese, and it's the only essential. The Ghost gets more from Cook than Dracula does: Sly d12 on the front door, Wits d8 in the back room, Charm d10 on the dog. Dracula's Charm is already a d12, so Cook does nothing for him on the dog." *Roleplayer:* "A vampire cook who can't touch garlic is funnier." *Daredevil:* "If I'm Cook, I'm on the bear. Deal." Vote 4 to 1 for the Ghost as Cook, so Dracula keeps his default Butler (it does nothing in this town; "I shall polish the silver of my own castle").
- *Daredevil* takes Rattle over Spectral: "I'm rolling the Monster every time, so make it cheap." *Hoarder* takes Fetch: "If it all goes wrong I want the final flight to start at 3." *Planner* takes Old Curse over Royal Bearing because a raise "works in the final flight and helps anyone in the same place".

---

## Night 1: the Turn-by-Turn log

Notation: trait die + second die = total vs Difficulty → result. "Shows" means the Monster die beat the trait die. **Sus** is Suspicion after the event. A face for a watched obstacle is rolled on the town's two villagers, ruling **(r3)**: 1–3 the baker's wife, 4–6 the night watchman (Chapter 8 says "roll who it is", but a premade town lists only two faces and no die).

### The plan (party decision 1)

*Planner:* "Four places, four items, one each, and the tavern gets two of us because of the bear. Ghost and Dracula: tavern. Werewolf: market garden, your Duty. Mummy, that's me: schoolhouse, my Duty. Newcomer: the draper is one roll and your Duty is there." *Roleplayer:* "We're sending the new player in alone?" *Planner:* "Out of Sight: if he gets Trouble while he isn't carrying anything, they can't catch him." *Newcomer:* "I'm fine. I think." Vote 4–1 for the four-way split.

### Turn 1: everyone moves (R9–R12)

The party starts by the way out and walks in without a roll. Every location is watched, so four Tell checks.

| Where | Who arrives | Tell check | Result | Sus |
|---|---|---|---|---|
| Tavern cellar | Dracula, Ghost | R9: 3 | nothing | 0 |
| Market garden | Werewolf | R10: 4 | The Werewolf's eyebrows: the baker's wife asks if he's a very hairy cat | 1 |
| Schoolhouse | Mummy | R11: 6 | Dust and spice: a child sneezes and follows the trail | 2 |
| Draper | Invisible Man | R12: 3 | nothing | 2 |

### Turn 2 (R13–R20): the Ghost goes to the lock-up

- **Ghost**, tavern, front door (the party's way in, picked by this try): Sly d10 → d12 (Cook), the Monster: **2 + 3 = 5 vs 8: Trouble**, and the Monster shows (3 > 2). Rattle makes the show +1, Trouble is +1: one roll, one rise, **Sus 3**. Watched, so caught. Face (R14): the baker's wife, looking for her cat, finds a door unlocking itself and a cold spot. *Daredevil:* "It's fine, I'll outrun her."
  - **Local chase.** Lead 1, escape at 4, mob 8 + half of 3 = **9**. Cold Iron is *Always*, so from round 1 every trait is a size smaller.
  - Round 1 (R15: 4, over the rooftops: Nimble, Wits). Nimble d12 → d10 (Cold Iron), Chill raises it back (charge 1 of 3; raise and step down cancel). The Monster: **3 + 1 = 4 vs 9: Trouble.** Lead 1 → 0: **cornered and captured** in one roll. Trouble in a local chase still raises Suspicion: **Sus 4**. No Tell check at the lock-up for a captive brought in. *Daredevil:* "One roll? That's it?" *Storyteller:* "The baker's wife has a horseshoe in her apron. For luck."
- **Dracula**, tavern front door, which is now the party's way in. He has Sly d6 or Brawn d8 the loud way, so he uses **Mesmerise** (charge 1): Charm at 2 lower, 6. The Roleplayer wanted the Monster ("the eyes!"); the Planner talked him into the Mask on a 6. **6 + 4 = 10 vs 6: Success.** Only he is through.
- **Werewolf**, market garden, the geese (Sly d6 → d8, Gardener), the Mask: **8 + 3 = 11 vs 6: Success.**
- **Mummy**, schoolhouse, the back gate (Brawn d10 → d12, Librarian), the Mask: **5 + 3 = 8 vs 8: Success.**
- **Invisible Man**, draper, the shopkeeper (watched; Charm d6 → d8, Tailor), the Mask: **3 + 4 = 7 vs 8: Cost.** The knitting wool is his. The Storyteller's options: "drop an item" is out (his only item is what this roll won); Suspicion +1 would push the local mob to 10; a lost Turn would delay a rescue; his next roll is likely the rescue at Difficulty 10 with his Sly d12. He picks **the next roll's trait die one size smaller** ("a smaller die before a hard roll"). The shopkeeper grabs a trailing bandage and he spends the walk winding it back on.

End of Turn 2: Sus **4**. In hand: the wool. Captured: the Ghost.

### Turn 3 (R21–R25): three items in one Turn

- **Ghost** slips free (from the Turn after capture): Nimble d12, the Monster vs 10: **2 + 5 = 7: Trouble**, shows (Rattle, +1): **Sus 5**, no chase. Still held. *Daredevil:* "I hate this lock-up." The Storyteller hands him the jailer to voice (Chapter 8), and he plays the tipsy night watchman locking up a sheet.
- **Invisible Man** walks to the lock-up to rescue. First visit, Tell check (R22: 6): only he arrives, so his Tell: a sneeze from nowhere. **Sus 6.**
- **Dracula**, back room (Wits 6; his Wits is a d4), uses **Bat** (charge 2) to roll Nimble d10, the Mask: **5 + 3 = 8 vs 6: Success. The cheese (essential).** *Roleplayer:* "Dracula does not rummage. He flits."
- **Werewolf**, the night watchman (watched; Wits d8 → d10, Gardener), the Mask: **9 + 4 = 13 vs 8: Success. Seed potatoes.**
- **Mummy**, children in costumes (group, watched; Charm d8 → d10, Librarian), the Mask: **7 + 4 = 11 vs 8: Success. The almanac.**

End of Turn 3: Sus **6**. All four list items are in hand. Captured: the Ghost.

### Turn 4 (R26–R30): the Ghost gets out, Dracula meets the dog

- **Ghost** slips free: Nimble d12, the Monster: **9 + 1 = 10 vs 10: Success.** Free at the lock-up; acts again next Turn. The Invisible Man's rescue isn't needed (his Cost stays pending on his next roll).
- *Party decision 2, the dog:* *Hoarder:* "We have everything. Go home." *Daredevil:* "BEAR." *Roleplayer:* "A stuffed bear for the great hall. Dracula insists." *Planner:* "Beat the dog now, but don't take the bear until everyone else is at the way out; it's +1 every Turn once it's taken." *Newcomer:* "Sure?" 4–1 for the dog.
- **Dracula**, guard dog (Charm 10, not watched). The Roleplayer rolls the Monster this time: Hypnotic Eyes means it shows only if it beats the d12 by 2. **1 + 9 = 10 vs 10: Success**, and the 9 beats the 1 by 8: it **shows, Sus 8.** The dog rolls over; the baker's wife, still after her cat, sees two red eyes in the cellar. The bear is free to take.
- **Invisible Man, Werewolf, Mummy** walk to the way out (ruling **(r4)**: Entities who move to the same place in the same Turn arrive together, as in Chapter 9's example, so one check). Tell check (R28: 6), whose (R29: 1): the Invisible Man sneezes again. Face (R30): the night watchman, tipsy, says "bless you" to nobody. **Sus 9.**

End of Turn 4: Sus **9**.

### Turn 5: the bear

- *Party decision 3:* *Hoarder:* "We're at **9**. Leave it." *Planner:* "If Dracula takes it and walks this Turn, it only rings once: end of this Turn, 10. Next Turn he arrives and the Werewolf rolls the way out at 5 with Fetch. Trouble on that is 1 in 72." *Newcomer:* "What happens at 11?" *Planner:* "The whole town chases us. We'd start at Lead 3 because of the Werewolf." 4–1 for the bear.
- **Dracula** takes the bear (free) and starts the carried move (two Turns; between places until his next action). Carrying: no Mask, Nimble d10 → d8.
- **Ghost** walks from the lock-up to the way out (the way out's check is already made).
- **Invisible Man, Werewolf, Mummy** wait.
- End of Turn 5: the bear, **Sus 10.**

### Turn 6 (R31): home

- **Dracula** arrives with the bear. Everyone not captured is at the way out.
- **Werewolf** rolls for all: Nimble d12, the Mask, vs 6 − 1 (Fetch: "the way out is 1 easier while you're there") = **5: 6 + 2 = 8, Success.** Everyone is out before the end of the Turn, so the bear doesn't ring again.

**Night 1 result: Grand Year** (every item and the stuffed bear) in **6 of 12 Turns**, Suspicion **10 of 11**. One local chase (1 round, captured), no final flight, nobody left behind. Charges spent: Newcomer 0, Daredevil 1, Planner 0, Hoarder 0, Roleplayer 2.

**Epilogue (Chapter 7):** Grand Year: "A year of plenty. The new piece goes in the great hall, and everyone pretends it was always there." Nothing on the list was missing, so there are no "went without" lines.

*Table talk at the end:* *Daredevil:* "I spent the whole night in jail and we still had a Grand Year." *Newcomer:* "Is it always this quick?" *Hoarder:* "I didn't spend a single charge." *Planner:* "It's half past eight. Again?" The raid ended in the 6th Turn, not before it, but it never reached a final flight and took about an hour (section 3), so the table played a second night in Puddlecombe with the same Entities and picks.

---

## Night 2: the same town, a new night

Same Entities, same picks, charges back to 3 each, Suspicion 0. Choosing took about five minutes ("same again?"). Everyone now knows the town.

### The plan (party decision 4)

The Planner proposes the same split. *Daredevil:* "Same door. I'm rolling the Monster again." *Planner:* "Last time..." *Daredevil:* "Last time was the dice." *Roleplayer:* "Can we stop for a pie on a doorstep?" *Storyteller:* "Customs are flavour, not rules" (Chapter 8). Nobody looked for the Ghost's Through the Wall at the trapdoor (see finding **F9**). Unanimous.

### Turn 1: everyone moves (R32–R36)

| Where | Who arrives | Tell check | Result | Sus |
|---|---|---|---|---|
| Tavern cellar | Dracula, Ghost | R32: 5; whose (R36: 6, 1–3 Dracula, 4–6 Ghost) | The Ghost: candles gutter in the tavern window | 1 |
| Market garden | Werewolf | R33: 1 | nothing | 1 |
| Schoolhouse | Mummy | R34: 1 | nothing | 1 |
| Draper | Invisible Man | R35: 6 | The Invisible Man: bandages, goggles, a false nose and a sneeze | 2 |

### Turn 2 (R37–R42)

- **Ghost**, tavern front door: Sly d12 (Cook), the Monster: **2 + 4 = 6 vs 8: Cost**, the Monster shows (Rattle, +1): **Sus 3**. The door is beaten for the party. The Storyteller's options: Suspicion +1 would cost nothing (the roll already raised it, Chapter 3); "drop an item" would cost nothing (the Ghost carries nothing); so **lose a Turn** or a smaller die next roll. He picks **lose a Turn**: it bites for certain, the smaller die might not. Who causes it (R38: 5): the night watchman, tipsy, sits on the cellar steps to admire "a lovely sheet costume", and the Ghost has to hover behind the barrels.
- **Dracula**, back room, **Bat** (charge 1): Nimble d10, the Mask: **1 + 6 = 7 vs 6: Success. The cheese.**
- **Werewolf**, geese: Sly d8 (Gardener), the Mask: **5 + 2 = 7 vs 6: Success.**
- **Mummy**, back gate: Brawn d12 (Librarian), the Mask: **8 + 1 = 9 vs 8: Success.**
- **Invisible Man**, shopkeeper: Charm d8 (Tailor), the Mask: **5 + 2 = 7 vs 8: Cost. The knitting wool.** This time the Storyteller picks **Suspicion +1** (last night's smaller die never came into play): the shopkeeper counts the till twice and calls through to the back. **Sus 4.**

End of Turn 2: Sus **4**.

### Turn 3 (R43–R45): everything in hand again

- **Ghost** loses this action.
- **Invisible Man** walks to the schoolhouse (already checked, no Tell). *Planner:* "Can you put your Unseen on my roll? If I'm caught, a Mummy with Nimble d4 is going to the lock-up." *Newcomer:* "That's allowed?" (Chapter 3: "An ability can help any Entity's roll at the same place"; the At the Table page doesn't say so.) He spends **Unseen** (charge 1) on the Mummy's roll.
- **Mummy**, children (group, watched): Charm d10 (Librarian), the Monster without risk: **8 + 3 = 11 vs 8: Success. The almanac.**
- **Werewolf**, night watchman: Wits d10 (Gardener), the Mask: **10 + 6 = 16 vs 8: Success. Seed potatoes.**
- **Dracula**, guard dog: the Roleplayer asks for the Monster again; the Planner reminds him of last night's +2, and he takes the Mask. Charm d12: **5 + 5 = 10 vs 10: Success, and a Critical** (both dice show 5): he gets back the charge he spent on Bat.

End of Turn 3: Sus **4**. All four items in hand, the dog beaten.

### Turn 4 (R46): the Ghost takes the bear

- *Party decision 5:* *Roleplayer:* "We could stay for the festival..." *Planner:* "There's nothing left to take. Every Turn we stay is a Turn something can go wrong." *Daredevil:* "Then I'm carrying the bear." Unanimous.
- **Ghost** (past every tavern obstacle: the door it beat, the room and the dog Dracula beat) takes the bear (free) and starts the carried move.
- **Dracula, Werewolf, Mummy, Invisible Man** walk to the way out. Tell check (R46: 2): nothing.
- End of Turn 4: the bear, **Sus 5.**

### Turn 5 (R47): home

- **Ghost** arrives with the bear.
- **Werewolf** rolls for all: Nimble d12, the Mask, vs 5 (Fetch): **7 + 2 = 9: Success.**

**Night 2 result: Grand Year** in **5 of 12 Turns**, Suspicion **5 of 11**. No chase, no final flight, nobody captured. Charges spent: Newcomer 1, Daredevil 0, Planner 0, Hoarder 0, Roleplayer 1 (and got it back on the Critical).

**Epilogue:** Grand Year again: "A year of plenty. The new piece goes in the great hall, and everyone pretends it was always there." (*Roleplayer:* "Two bears. One for each side of the fireplace.")

*Table talk at the end:* *Hoarder:* "Six charges in two nights and I never touched one." *Daredevil:* "When do we get chased by the whole town?" *Planner:* "Next time, Thistlewick."

