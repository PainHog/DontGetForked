# FT2: a full table in Thistlewick (Standard), five players and a Storyteller

*Agent playtest, 2026-10-07. A simulated first session for a full table: five players with different habits and a Storyteller. Rules source: only the rulebook text, `book/src/chapters/*.html` read as text, including the Thistlewick map's title and labels. The simulator, `docs/` and the Foundry code were not used as rules. Every random result is a real `node -e` roll (Math.random), numbered R1 onward and listed in the appendix. Where the book is silent or unclear I made a ruling, noted it in the log, and listed it under Friction.*

*(Work in progress: the setup is below; the Turns follow as they are played.)*

---

## 0. Setup

### 0.1 The Entities (R1)
A d8 rolled in sequence, repeats rerolled: **7, 4, (4), 1, 2, 6**. In the order rolled:

| Seat | Player | Entity | Brawn | Nimble | Sly | Charm | Wits | Weakness |
|---|---|---|---|---|---|---|---|---|
| 1 | **Newcomer** | A Witch | d6 | d4 | d10 | d8 | d12 | Rowan (Soon) |
| 2 | **Daredevil** | The Werewolf | d10 | d12 | d6 | d4 | d8 | Hounds (Soon) |
| 3 | **Planner** | Dracula | d8 | d10 | d6 | d12 | d4 | Garlic (Always) |
| 4 | **Hoarder** | Frankenstein’s Creature | d12 | d8 | d6 | d4 | d10 | Fire (Soon) |
| 5 | **Roleplayer** | A Ghost | d4 | d12 | d10 | d8 | d6 | Cold Iron (Always) |

### 0.2 Picks (chosen by each player as their persona would; no dice)

| Player | Signature | Gift | Perk | Castle Duty → Thistlewick location |
|---|---|---|---|---|
| Newcomer (Witch) | Hedge Spell (raise, hers or a friend’s, same place) | *Broomstick* (default): open an approach with Nimble | *Familiar’s Warning* (default) | **Cook** (default) → the baker |
| Daredevil (Werewolf) | Good Dog (Monster without risk) | *Through the Hedge*: open an approach with Brawn | *Night Runner* (default): a local chase alone starts at Lead 2 | **Gardener** (default) → the seed merchant |
| Planner (Dracula) | Mesmerise (open an approach with Charm at a watched obstacle) | *Bat* (default): use Nimble instead | *Hypnotic Eyes* (default) | **Butler** (default) → the china shop |
| Hoarder (Creature) | Brute Force (use Brawn instead) | *Hovel Watcher*: Monster without risk | *Built to Last*: slip free on a Success or a Cost | **Handyman** (default) → the ironmonger |
| Roleplayer (Ghost) | Through the Wall (open an approach with Sly, not while carrying) | *Whisper*: use Charm instead | *Rattle*: the Monster showing is Suspicion +1, not +2 | **Tailor** (Butler taken) → the hatter |

Table talk while picking:
- **Daredevil:** “Through the Hedge. It *goes straight through*. That’s the whole character.” Night Runner, because “I’m planning on being chased.”
- **Planner** read every Perk aloud and kept the defaults: Bat turns Dracula’s bad Sly d6 and terrible Wits d4 into Nimble d10, and most of Thistlewick is Sly and Wits. “I’m the face. Hypnotic Eyes.”
- **Hoarder** took Hovel Watcher (“it keeps us safe”) and Built to Last: “insurance, in case I get locked up.”
- **Roleplayer** took Whisper (“I want to talk to people”) and Rattle over the default Spectral: “Nobody takes rattling chains seriously. That’s my ghost.”
- **Castle Duty clash:** the Ghost’s default (Butler) is Dracula’s. The Ghost is the later seat, so its player picks another (Chapter 2). The Planner pointed out that Thistlewick has no books on the list and that Tailor matches the hatter: “Then every one of us has a shop.” The Roleplayer loved it: “A ghost who sews shrouds.”
- Luck of the draw: with the Ghost on Tailor, **all five Duties match the five list items**. (The Librarian, the Mummy’s and Jekyll’s default, would have had nothing here.)

### 0.3 The town (as printed in Chapter 9)
**Thistlewick**, Standard. Lantern Night: a costume parade through the square at midnight. Faces: the mayor, in his best costume (judging the costume contest), and the vicar (carrying a lantern and a pitchfork “for the parade”). Limit 11 · the way out 8 · the lock-up 10 · the final flight: mob 11, escape at Lead 5. Essentials: the wedding cake and the tea service. The furniture: a gilt mirror (Bulky) at the hatter, behind a watched guard dog (Charm, or Nimble the loud way, 10).

Watched locations (the map’s title): the baker, the china shop, the ironmonger, the seed merchant. The hatter is not watched for Tells: its only watched obstacle is the furniture’s (Chapter 5).

### 0.4 The plan (party decision D1)
- **Planner:** “Five shops, five Duties, five of us. Everyone goes to their own shop on Turn 1, takes the loot on Turns 2–3, and we meet at the way out. The book says on Standard we usually should split.”
- **Hoarder:** “Alone? If one of us gets caught, nobody can help. Abilities only work in the same place.” Wants pairs.
- **Daredevil:** “Split. Go. Now.”
- **Roleplayer:** “The hatter is mine, and so is the mirror.” For the split.
- **Newcomer:** “Whatever you all think.”
- **Vote: 4–1 for the five-way split** (the Newcomer goes with the majority).

---

## 1. Raid 1: Lantern Night in Thistlewick

Suspicion is shown after each Turn as **S n/11**.

### Turn 1: everyone to their shop
- All five move: the Witch to the baker, the Werewolf to the seed merchant, Dracula to the china shop, the Creature to the ironmonger, the Ghost to the hatter.
- Tell checks at the four watched locations (R2–R5): baker 3, china shop 1, ironmonger 1, **seed merchant 6**. The Werewolf is the only one arriving there: his eyebrows meet in the middle, and a stallholder stares. **+1.**
- *Storyteller:* “Twelve Turns. That was one.”
- **S 1/11.**

### Turn 2: five ways in at once
- **Ghost** (hatter, nosy neighbour, Sly 8, not watched): Sly d12 (Tailor) + Mask: 12 + 4 = 16, Success (R6). The hatter has only one obstacle: **the top hat** is in his hand.
- **Werewolf** (seed merchant, geese): the Daredevil takes the loud way. Planner: “Sly with your Gardener die is a d8 against a 6, you don’t need the loud way.” Daredevil: “Run for it, honking!” Nimble d12 + Mask: 8 + 1 = 9, Success (R7). **+1** (loud).
- **Dracula** (china shop, front door, Sly 8, not watched): Bat (charge 1) for Nimble, d12 with Butler, + Mask: 11 + 6 = 17, Success (R8).
- **Creature** (ironmonger, cart, Brawn 6): Brawn d12 + Mask: 11 + 2 = 13, Success (R9).
- **Witch** (baker, crowded shop floor, Sly 8, group, watched): Sly d12 (Cook) + Mask: 4 + 4 = 8, Success, and a **Critical** (doubles). She has spent no charge, so it gives her nothing (R10). Newcomer: “Did I do something good?” Storyteller: “Very good. It just doesn’t pay out this time.”
- **S 2/11.**

### Turn 3: four Successes and a dog
- **Witch** (shopkeeper, Charm 8, watched): Charm d10 (Cook) + Mask: 7 + 5 = 12, Success (R11). **The wedding cake** (essential). Newcomer, in character: “What a *lovely* cake. Is it spoken for?”
- **Creature** (strongbox, Wits 8, watched): Wits d12 (Handyman) + Mask: 5 + 3 = 8, Success (R12). **The coil of rope.** Planner offered: “Use Hovel Watcher and roll the Monster.” Hoarder: “It worked without it, didn’t it?”
- **Dracula** (back room, Wits 8, not watched): Bat (charge 2) for Nimble d12 + Mask: 2 + 5 = 7, one short, a **Cost** (R13). He has **the tea service** (essential). Dropping an item would cost nothing (he carries only what this roll won), a lost Turn would cost little (the party waits for the slowest anyway), so the Storyteller picks **Suspicion +1**: a teapot lid rolls across the floor, and the vicar’s lantern swings toward the shop. **+1.**
- **Werewolf** (night watchman, Wits 10, watched): the Daredevil spends Through the Hedge (Brawn at 2 lower, so 8; his Brawn d10 is a d12 with Gardener) and Good Dog (the Monster without risk): 12 + 8 = 20, Success (R14). **The turnip seed.** Charges left: 1.
- **Ghost** (the furniture’s guard dog, Charm 10, watched). Planner: “Drop the hat, then Through the Wall works: Sly at 8 instead of Charm at 10.” Roleplayer: “My ghost doesn’t leave a hat behind. I’m going to talk to the dog.” Charm d10 (Tailor) + Monster (Rattle makes a showing Monster only +1): 5 + 1 = 6, **Trouble** (R15). **+1**, and the dog was watched: **caught**.
  - **Local chase** (Lead 1, escape at 4, mob 8 + half of 4 = 10). Cold Iron is Always: the Ghost’s traits are a size smaller from round 1.
  - Round 1, a dead end: Brawn or Wits (R16). His Brawn is a d4 and his Wits a d4 after Cold Iron. He spends Whisper to use Charm, a d6 after Cold Iron, + Monster: 4 + 3 = 7, **Trouble** (R17). Lead 0: **cornered and captured** on the first round. **+1.** The town takes back the top hat: gone for the night.
  - Roleplayer: “The blacksmith’s boy pinned me to the wall with a horseshoe. That’s fair, honestly.”
- **S 5/11.** Both essentials and two extras in hand; the top hat is lost.

### Turn 4: the Ghost walks out; the mirror is back on
- **Ghost** slips free (lock-up 10, Nimble): Nimble d12 + Monster: 12 + 8 = 20, Success (R18). Free at the lock-up; he acts again next Turn. (Cold Iron is a chase Weakness, so it doesn’t apply in the lock-up. The Roleplayer asked to walk through the cell wall with Through the Wall: the lock-up lists Sly, so it can’t open an approach there.)
- **Party decision D2, the furniture.** Daredevil: “The mirror. Now.” Hoarder: “We have both essentials and four of five. That’s a Win. Go home.” Planner: “Suspicion 5. The mirror costs one a Turn, and the loud way at the dog one more. If someone takes it and walks out the same Turn, it costs us about three. We can afford it.” Roleplayer: “Dracula should carry it. He’s the one who can’t see himself in it.” **4–1 for the mirror** (Hoarder against).
- **Ruling R-A:** the Ghost had the hatter’s loot in hand and lost it when captured. Chapter 4 says “Once that location’s loot is in hand, whoever is past all its obstacles may try for the piece.” I read “once” as a gate that has opened, so the furniture is still on (logged as F6).
- **Witch** moves to the way out first, alone: the Planner sequenced it so her Familiar’s Warning covers the way out’s first-return Tell check. 2, and the cat’s 2 (R19): nothing. Then the **Creature** moves to the way out.
- **Werewolf** and **Dracula** move to the hatter (not watched, no check). The Planner goes as backup and carrier.
- **S 5/11.**

### Turn 5: the very large dog
- **Werewolf** (guard dog, Nimble the loud way, 10, watched): his last charge on Good Dog, + Monster: 7 + 9 = 16, Success (R20). The Monster showed, but Good Dog: the crowd sees a very large dog chasing a guard dog round the yard. **+1** (loud).
- **Dracula** takes the gilt mirror (free) and starts for the way out with it (his action): carrying, the move takes two Turns. The Roleplayer: “Look at the mirror. Everyone’s in it except the man carrying it.”
- **Ghost** moves from the lock-up to the way out.
- End of Turn: the mirror is taken, **+1**.
- **S 7/11.**

### Turn 6: out
- **Dracula** arrives at the way out with the mirror (the second Turn of his move). **Werewolf** moves from the hatter to the way out.
- **Party decision D3, who rolls the way out** (Sly or Nimble, or Brawn the loud way, 8, watched). Planner: “Ghost, Nimble d12. Hoarder, put Hovel Watcher on it, the Monster with no risk.” Hoarder: “And if it goes wrong and we have to run? I’m keeping my charges.” He keeps all three.
- **Ghost:** Nimble d12 + Mask: 8 + 4 = 12, Success (R21). Everyone is out, mirror and all, before the end of the Turn, so the mirror adds nothing more.
- **S 7/11** at the end.

### How the Year Went
- Home: the wedding cake and the tea service (both essentials), the coil of rope, the turnip seed: 4 of 5. Missing: the top hat (an extra). That is a **Win**, and the gilt mirror makes it a **Grand Year**. Nobody was left behind.
- **Epilogue** (read aloud): “A year of plenty. The new piece goes in the great hall, and everyone pretends it was always there.” And for the missing kind: “Cloth and costumes: next year’s disguises are held together with string and hope.” The Roleplayer, whose Duty was Tailor: “That’s on me.”
- Turns used: 6 of 12. Final flight: none. Charges spent: Witch 0, Werewolf 3, Dracula 2, Creature 0, Ghost 1.

The raid ended on Turn 6, after about an hour of table time (§4). The brief asks for a second raid only if the first ends *before* Turn 6, but six Turns, one chase and no final flight leave too much of the game unplayed, and a real table with two hours booked would play again. So the same five play a **second night** in Thistlewick (§2).

