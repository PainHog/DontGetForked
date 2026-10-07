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

