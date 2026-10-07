# FT3: Full table in Gallowsmere (Hard)

*Simulated session, 2026-10-07. Five players and a Storyteller, one raid on Gallowsmere as printed in Chapter 9. Rules source: only the rulebook text (`book/src/chapters/*.html`, read as text, including the map's title text). Every random result is a real roll from `node` (Math.random), numbered R1 onward and listed in the appendix. Where the book is silent or unclear I made a ruling, noted it in the log and listed it in Friction.*

*(Work in progress: sections are filled in as play goes on.)*

## 0. Setup

### 0.1 The town (Chapter 9, Gallowsmere, Hard)
Suspicion Limit 15 · the way out 10 · the lock-up 10 · final flight: mob 11, escape at Lead 6 · 12 Turns · 3 charges each.
Lantern Night: bells rung every hour. Villagers (its faces): old Granny Mott (practising the bells); a gang of children (gossiping, loudly).
The map's title text: "Every location is watched; the star marks the furniture, at the tailor." Any move takes one Turn.

| # | Location (item, kind) | Way in A | or Way in B | Then | Then / Furniture |
|---|---|---|---|---|---|
| 1 | Smithy: new lock (tools) **essential** | Bolted back gate, watched: Brawn / Charm loud, 10 | High garden wall, watched: Nimble / Brawn loud, 8 | Night watchman, watched: Wits, 10 | |
| 2 | Silversmith: silver spoons (silver) **essential** | Locked front door, watched: Sly / Brawn loud, 10 | Shuttered window, watched: Nimble / Brawn loud, 8 | Guard dog, watched: Charm / Nimble loud, 8 | Locked strongbox: Wits / Charm loud, 10 |
| 3 | Printer: black-edged paper (books) | Nosy neighbour, watched: Sly / Wits loud, 8 | Rooftops (group): Nimble, 10 | Dark back room: Wits / Sly loud, 8 | |
| 4 | Tailor: bandages (cloth) | Doorman, watched: Charm / Wits loud, 10 | Rickety drainpipe: Nimble, 8 | Crowded shop floor (group), watched: Sly, 10 | Furniture: heavy cellar trapdoor, Brawn 12 → suit of armour (Bulky) |
| 5 | Butcher: side of bacon (food) | Muddy yard of geese, watched: Sly / Nimble loud, 8 | Cart in the alley, watched: Brawn / Nimble loud, 10 | Shopkeeper, watched: Charm / Sly loud, 10 | Tug-of-war (group): Brawn, 12 |

Win needs both essentials and at most one extra missing (4 of 5 with both essentials). Grand Year needs a Win plus the armour.

### 0.2 Choosing the Entities (R1)
R1, d8 per seat, rerolling repeats: 7, 6, 6 (repeat), 4, 3, 8. In the order rolled: **Witch, Ghost, Werewolf, Mummy, Jekyll & Hyde**.

| Seat | Player | Entity | Traits | Gift | Perk | Castle Duty |
|---|---|---|---|---|---|---|
| 1 | Newcomer | **Witch** | Brawn d6 · Nimble d4 · Sly d10 · Charm d8 · Wits d12 | Broomstick (default): open an approach with Nimble | Familiar's Warning (default) | Cook (default): the butcher |
| 2 | Daredevil | **Ghost** | Brawn d4 · Nimble d12 · Sly d10 · Charm d8 · Wits d6 | Fade: Monster die without risking Suspicion | Spectral (default): past group obstacles free | Butler (default): the silversmith |
| 3 | Planner | **Werewolf** | Brawn d10 · Nimble d12 · Sly d6 · Charm d4 · Wits d8 | Through the Hedge: open an approach with Brawn | Fetch: way out 1 easier while there; final flight starts at Lead 3 | Handyman (chosen; default Gardener matches nothing on the list): the smithy |
| 4 | Hoarder | **Mummy** | Brawn d10 · Nimble d4 · Sly d6 · Charm d8 · Wits d12 | Old Curse: raise a trait die | Keeper of Treasures: "drop an item" is never its Cost | Librarian (default): the printer |
| 5 | Roleplayer | **Jekyll & Hyde** | Jekyll: Brawn d4 · Nimble d6 · Sly d8 · Charm d12 · Wits d10. Hyde: Brawn d12 · Nimble d10 · Sly d8 · Charm d4 · Wits d6 | Pillar of Society: Monster die without risking Suspicion (Hyde still takes over) | Practised Hand (default): back to Jekyll free | Tailor (default Librarian clashed with the Mummy; picked the one kind left): the tailor |

Signatures: Witch Hedge Spell (raise, hers or a friend's in the same place) · Ghost Through the Wall (open an approach with Sly, not while carrying) · Werewolf Good Dog (Monster without risking Suspicion) · Mummy Ancient Lore (use Wits) · Jekyll & Hyde The Draught (change form). Weaknesses: Witch Rowan (Soon), Ghost Cold Iron (Always), Werewolf Hounds (Soon), Mummy A Loose Thread (Soon), Jekyll & Hyde A Familiar Face (Soon).

**Table talk while choosing.**
- The **Planner** read the Gallowsmere list against the Duty table and saw that the Werewolf's default Gardener matches nothing on it (no plants). He took Handyman for the smithy, an essential. That left exactly five Duties for five kinds once the Doctor moved off Librarian.
- The Librarian clash: Chapter 2 says "the second player picks another". The table took "second" to mean the later seat (the Doctor, seat 5). Nobody was sure what "second" meant here. Logged as a finding.
- The **Daredevil** wanted Rattle ("I'm letting the Monster out all night"). The Planner pointed out that Spectral walks him through the crowded shop floor on the way to the armour, and past the butcher's Brawn-12 tug-of-war, the last obstacle there. He kept Spectral and took Fade as his Gift so he can still let the Monster out for free.
- The **Planner** took Through the Hedge after spotting that it turns three Hard obstacles (the watchman, the shop floor, the strongbox) into Brawn at 8, with his Brawn d10, which becomes a d12 at the smithy. He took Fetch because escaping at Lead 6 from Lead 2 "looks like a coin we don't want to toss".
- The **Hoarder** took Keeper of Treasures ("nobody takes my loot") and Old Curse ("a raise, for emergencies").
- The **Roleplayer** took Pillar of Society: "a respectable doctor having a funny turn is the whole character."
- The **Newcomer** took every default and asked what a "charge" was. The Planner explained in one sentence.

### 0.3 The plan (party decision, 4 to 1)
The **Planner** proposed: Werewolf alone to the smithy (essential, his Duty); Ghost and Witch to the silversmith (essential and three obstacles deep, so a pair can clear two obstacles in one Turn); Mummy to the printer; the Doctor to the tailor. The butcher's bacon is the extra they can afford to miss, since a Win allows one extra missing. Leave the armour until the essentials are in hand.
- Daredevil: "The armour's at the tailor. I go where the armour is." Planner: "You're the Butler. The spoons are an essential. The Doctor's Hyde has the Brawn for the trapdoor." Roleplayer: "The Doctor goes to the tailor. A gentleman needs a fitting." Newcomer: "I'll go with the Ghost, I guess?" Hoarder: "Fine, as long as nobody makes me spend anything."
- Vote 4 to 1 for the plan.

**Storyteller's standing choices.** Villager faces: Chapter 9 gives Gallowsmere two "faces", so the Storyteller rolls a d6 between them (1–3 Granny Mott, 4–6 the children). Costs: the one that hurts most right now, never one that costs nothing (Chapters 3 and 8). Whose Tell: a die among the Entities arriving.

---

## The night, Turn by Turn

Suspicion starts at 0 (Limit 15). Charges: Witch 3 · Ghost 3 · Werewolf 3 · Mummy 3 · Jekyll & Hyde 3.

### Turn 1: everyone moves (Suspicion 0 → 2)
- **Werewolf** to the smithy. Tell check R2: 6, so his Tell goes off: the children point at his eyebrows. **Suspicion 1.**
- **Ghost and Witch** to the silversmith. Tell check R3: 1 (the Familiar's Warning second d6 is 4, but the first die already failed). No Tell.
- **Mummy** to the printer. Tell check R4: 6, so a trail of dust and a smell of old spices on the printer's step. **Suspicion 2.**
- **Jekyll** to the tailor. Tell check R5: 2. No Tell.
- *Table talk.* Newcomer: "So I just... walk there? That's my whole Turn?" Planner: "Yes. Every move is a Turn."

### Turn 2: four first obstacles, one Trouble, a six-round chase (Suspicion 2 → 5)
- **Werewolf**, high garden wall (Nimble 8, watched), Nimble d12 + Mask (the Handyman raise is wasted on a d12): R6 1 + 6 = **7, a Cost.** The wall is beaten. *Storyteller:* he carries nothing, so "drop an item" is not allowed. Suspicion +1 barely matters at 2 of 15, and a smaller die takes his Brawn d12 for the watchman only to a d10. The Cost that hurts most is **lose a Turn**: he lands in Granny Mott's compost heap and spends a while picking out eggshells.
- **Ghost**, shuttered window (Nimble 8, watched), Nimble d12 + Mask: R7 7 + 4 = **11, a Success.** The window is open for the party. (He thought about Through the Wall, but an opened approach lets only him through, so the Witch would have had to climb in with her Nimble d4.)
- **Mummy**, nosy neighbour (Sly 8 / Wits loud, watched). The Hoarder won't spend a charge and won't risk his Sly d8 at a watched door, so he takes the loud way: Wits d12 + Mask: R8 12 + 4 = **16, a Success**, loud: **Suspicion 3.** ("Your cat's on the roof!")
- **Jekyll**, doorman (Charm 10, watched). The Roleplayer wants to talk, not climb the unwatched drainpipe the Planner suggested: Charm d12 + Mask: R9 7 + 2 = **9, a Cost.** The doorman is beaten. *Storyteller:* his next roll is the crowded shop floor (watched, 10), where his Sly d8 is a d10 with the Tailor raise. **His next roll's trait die one size smaller** cancels that raise and pushes Trouble from about 35% to 44%. That hurts more than a lost Turn this early. The doorman keeps his card: "Dr Jekyll? There's a Dr Jekyll in the paper."
- **Witch**, guard dog (Charm 8, watched; the window is open), Charm d8 + Mask: R10 1 + 1 = **2, Trouble** (doubles, but not a Success, so not a Critical). **Suspicion 4.** The face is the children (R11). She's caught.

**Local chase: the Witch** (Lead 1, escape at 4; the mob is 8 + half of Suspicion).

| Round | Ground (d6) | Roll | Result | Lead | Suspicion · mob |
|---|---|---|---|---|---|
| 1 | R12 4 rooftops | Wits d12 + Mask: R13 8 + 6 = 14 | Success | 2 | 4 · 10 |
| 2 | R14 4 rooftops | Wits d12 + Mask: R15 4 + 2 = 6 | Trouble | 1 | **5** · 10 |
| 3 | R16 4 rooftops | Rowan comes out (Soon): Wits d10. **Hedge Spell** on herself (charge, 3 → 2) raises it back to d12: R17 7 + 6 = 13 | Success | 2 | 5 · 10 |
| 4 | R18 4 rooftops | Wits d10 (Rowan) + Mask: R19 8 + 4 = 12 | Success | 3 | 5 · 10 |
| 5 | R20 1 crowded square | Sly d8 (Rowan) + Mask: R21 4 + 5 = 9 | Cost (no change) | 3 | 5 · 10 |
| 6 | R22 2 back alleys | Sly d8 (Rowan) + Mask: R23 8 + 5 = 13 | Success | **4, escaped** | 5 · 10 |

She is back at the silversmith with her Turn used up. *Table talk.* Newcomer, at round 3: "Do I spend one now?" Planner: "Yes, that's exactly what they're for." Daredevil, at round 5: "Can we go on? I've been in the silversmith's for ten minutes." Six rounds of a solo chase while four players watch is the longest wait of the night so far.

### Turn 3: the spoons and the paper, and the Doctor is captured (Suspicion 5 → 8)
- **Ghost**, guard dog (Charm 8 / Nimble loud, watched). The Daredevil takes the loud way: "Outrun it, barking!" Nimble d12 + Mask: R24 5 + 4 = **9, a Success**, loud: **Suspicion 6.**
- **Witch**, locked strongbox (Wits 10, not watched), Wits d12 + Mask: R27 8 + 5 = **13, a Success. The silver spoons (essential) are in her hand.**
- **Mummy**, dark back room (Wits 8), Wits d12 + Mask: R25 10 + 6 = **16, a Success. The black-edged paper is his.**
- **Jekyll**, crowded shop floor (group, Sly 10, watched). Sly d8, raised to d10 by his Duty, then back to d8 from his Cost. The Roleplayer spends **Pillar of Society** (3 → 2) to roll the Monster: R26 1 + 2 = **3, Trouble.** The Monster (2) beat the trait die (1), so it showed. Pillar means that raises nothing, but "Hyde still takes over". **Suspicion 7** for the Trouble. The face is the children again (R28). **Hyde** is caught.

**Local chase: Hyde** (Lead 1, mob 8 + 3 = 11). Round 1, R29 2 back alleys: Nimble d10 + Monster (no charge; "Hyde doesn't hide"): R30 4 + 3 = **7, Trouble. Lead 0: cornered and captured** in the first round. **Suspicion 8.** He carried nothing. He's held at the lock-up (no Tell check: "not a captive being brought in").
- *Table talk.* Roleplayer: "That's it? One roll?" Storyteller: "Lead starts at 1, so one Trouble corners you." Planner, quietly: "Yeah. Local chases are a coin toss with a cliff edge."

### Turn 4: the lock, and a jailbreak that fails (Suspicion 8 → 10)
- **Werewolf**, night watchman (Wits 10, watched). **Through the Hedge** (3 → 2): he opens an approach with Brawn at 8. His Brawn d10 is a d12 at the smithy. With the Mask: R31 8 + 5 = **13, a Success. The new lock (essential) is his.**
- **Hyde** slips free (from the Turn after his capture). The Roleplayer bends the bars: Brawn d12, the loud way, + Monster with **Pillar** (2 → 1): R32 3 + 2 = **5, Trouble**. One roll, one rise: **Suspicion 9**. No chase.
- **Ghost** moves to the tailor (the doorman stays beaten from Jekyll's Cost). **Spectral** takes him past the crowded shop floor "without rolling, at no action, even in a Turn you move". It is the last obstacle, so **the bandages are in his hand** in the same Turn he arrived.
  - *Table talk.* Planner: "Wait, he gets the loot in the same Turn he moved?" Everyone checks Chapter 2 and Chapter 4. Yes: "beat or pass the last and the loot is in your hand." Daredevil: "I love this perk."
- **Witch** moves to the way out with the spoons. Tell check (the way out, first time back) R33: 3. No Tell.
- **Mummy** moves to the lock-up to stand by for a rescue. Tell check R34: 6, his own Tell again: dust on the lock-up step. **Suspicion 10.**
- Loot after Turn 4: lock (Werewolf), spoons (Witch), paper (Mummy), bandages (Ghost). That's **4 of 5 with both essentials, a Win if everyone gets out.**

### Turn 5: a Critical jailbreak, and the furniture vote (Suspicion 10)
- **Hyde** slips free, quietly this time on the Planner's advice: Nimble d10 + Monster with **Pillar** (1 → 0): R35 8 + 8 = **16, a Critical.** He's free at the lock-up, acts again next Turn, and gets a spent charge back (0 → 1).
- **The furniture vote.** Daredevil: "Hyde's out! Seven Turns left, the armour's right there." Roleplayer: "Hyde wants a suit of armour. It's his size." Planner: "We have a Win in our hands at 10 of 15. The armour costs a Suspicion a Turn from the moment it's taken." Hoarder: "No." Newcomer, after Hyde's escape: "A suit of armour sounds cool, though?" **3 to 2 for trying.** The Planner sets the limit, and everyone agrees to it: Hyde gets until the end of Turn 8 to have it out of the trapdoor; otherwise everyone leaves.
- **Werewolf** moves to the way out with the lock. **Mummy** moves to the way out with the paper. **Witch** waits there. **Ghost** waits at the tailor with the bandages, because he wants to carry the armour ("I'm already past the crowd").
- *Ruling (lock-up and loot).* The Mummy came to the lock-up for a possible rescue while carrying the paper. A rescuer's Trouble gets them caught, and capture loses whatever they carry. The table spotted this and the Planner suggested dropping the paper first. Hyde's escape made it moot.

### Turn 6: Hyde walks to the tailor (Suspicion 10)
- **Hyde** moves from the lock-up to the tailor (visited on Turn 1, so no Tell check). **Witch, Werewolf and Mummy** wait at the way out. **Ghost** waits at the tailor.
- *Table talk.* Hoarder: "So we just... stand at the gate?" Planner: "We stand at the gate." Three players have nothing to do this Turn, or for the next two.

### Turn 7: through the crowd (Suspicion 10)
- **Hyde**, crowded shop floor (group, Sly 10, watched). Sly d8, raised to d10 by the Tailor Duty, + Monster with **Pillar** (his last charge, 1 → 0): R36 5 + 7 = **12, a Success.** The Monster showed (7 over 5), but Pillar means it raises nothing. Hyde is past all the tailor's obstacles.
- Everyone else waits.

### Turn 8: the trapdoor holds (Suspicion 10 → 12)
- **Hyde**, heavy cellar trapdoor (Brawn 12, not watched; the furniture). Hyde has no charges, so the **Ghost spends Fade on Hyde's roll** (3 → 2; "an ability can help any Entity's roll at the same place"). Brawn d12 + Monster: R37 6 + 3 = **9, Trouble.** **Suspicion 11.** It's not watched, so there's no chase.
- **Ghost** tries the trapdoor himself, with **Fade** (2 → 1): Brawn d4 + Monster: R38 3 + 2 = **5, Trouble. Suspicion 12.**
  - *Table talk.* Planner: "That was a fifteen-percent roll." Daredevil: "Fifteen percent of a suit of armour!"
- The Planner's limit has come: the armour isn't out. **Vote to leave, 3 to 2** (Planner, Hoarder, Newcomer against Daredevil and Roleplayer). The Planner did the sum aloud: taken on Turn 9, the armour would add +1 at the end of Turns 9, 10 and 11 while it's carried home (two Turns a move), and that reaches the Limit before the exit roll.

### Turn 9: the way out, the Limit, and the final flight (Suspicion 12 → 15)
- **Hyde and the Ghost** move to the way out. Everyone not captured is now there, so the **Werewolf** rolls for all in the same Turn ("each result (a move too) counts at once"). The way out is 10, 9 with **Fetch**. The Planner spends **Good Dog** (2 → 1): Nimble d12 + Monster: R39 1 + 5 = **6, Trouble.** The Monster showed, but Good Dog means it raises nothing; the Trouble does: **Suspicion 13.** The face is Granny Mott, ringing the bells at the gate (R40). The Werewolf is caught, **carrying the lock (an essential).**

**Local chase: the Werewolf** (Lead 1; the mob is 8 + 6 = 14, capped at **12**). Round 1, R41 6 dead end: Brawn d10.
- *The argument.* The Planner has one charge left (Good Dog). He explains Chapter 5: "If the Limit comes during a local chase, that chase ends at once and those Entities join the flight." If he rolls the Monster without Good Dog and it shows, Suspicion hits 15: the chase ends, and all five of them flee together from Lead 3 (Fetch), instead of him alone at Lead 1 against 12 with the lock. Hoarder: "You're doing it *on purpose*?" Daredevil: "Yes! Do it!" Newcomer: "What's the Limit again?" Roleplayer: "Hyde approves of chaos." Roll unprotected: Brawn d10 + Monster: R42 5 + 6 = **11, a Cost (the Lead stays at 1).** **The Monster showed: Suspicion 15, the Limit.** The local chase ends at once. Nobody was cornered, so **the whole town hunts and all five flee together.**

**The final flight** (Gallowsmere: mob 11, escape at Lead 6; it starts at Lead 3 because the Werewolf has Fetch). The Mask is off and Suspicion stops. The Ghost's Cold Iron (Always) is in play from round 1. Everyone else's Weakness (Soon) comes in from round 3. Charges going in: Witch 2 · Ghost 1 · Werewolf 1 · Mummy 3 · Jekyll & Hyde 0.

What the charges can still do: the Witch's Hedge Spell (raise anyone's roll) and the Mummy's Old Curse (raise) and Ancient Lore (use Wits). The Ghost's Fade and the Werewolf's Good Dog only protect Suspicion, which has stopped, and Through the Wall and Through the Hedge are "never in a chase". **Two players hold charges that can do nothing.** Jekyll & Hyde can go back to Jekyll free (Practised Hand), but turning into Hyde costs a charge.

| Rnd | Ground | Witch | Ghost | Werewolf | Mummy | Jekyll & Hyde | S / T | Lead |
|---|---|---|---|---|---|---|---|---|
| 1 | R43 6 dead end (Brawn, Wits) | Wits d12: R44 5+4 = 9 Cost | Wits d6→d4 (Cold Iron), **Hedge Spell** (Witch 2→1) → d6: R45 3+3 = 6 Trouble | Brawn d10: R46 3+4 = 7 Trouble | Wits d12: R47 11+6 = 17 **S** | Hyde Brawn d12: R48 10+7 = 17 **S** | 2 / 2 | 3 |
| 2 | R49 1 crowded square (Sly, Charm) | Sly d10: R50 4+3 = 7 Trouble | Sly d10→d8: R51 1+2 = 3 Trouble | Sly d6: R52 1+8 = 9 Cost | **Ancient Lore** (3→2), Wits d12: R53 3+7 = 10 Cost | back to Jekyll free, Charm d12: R54 3+7 = 10 Cost; the Monster showed, so Hyde takes over | 0 / 2 | **1** |
| 3 | R55 4 rooftops (Nimble, Wits) — every Weakness in play | Wits d12→d10: R56 9+5 = 14 **S** | Nimble d12→d10: R57 6+4 = 10 Cost | Nimble d12→d10: R58 2+5 = 7 Trouble | Wits d12→d10, **Old Curse** (2→1) → d12: R59 3+6 = 9 Cost | Hyde Nimble d10→d8, **Hedge Spell** (Witch 1→0) → d10: R60 3+10 = 13 **S** | 2 / 1 | 2 |
| 4 | R61 6 dead end | Wits d10: R62 9+5 = 14 **S** | Wits d4: R63 1+6 = 7 Trouble | Brawn d10→d8: R64 3+5 = 8 Trouble | Wits d10: R65 5+4 = 9 Cost (keeps his last charge) | Hyde Brawn d12→d10: R66 4+9 = 13 **S** | 2 / 2 | 2 |
| 5 | R67 1 crowded square | Sly d10→d8: R68 5+5 = 10 Cost | Sly d10→d8: R69 7+6 = 13 **S** | Sly d6→d4: R70 3+7 = 10 Cost | Charm d8→d6: R71 2+6 = 8 Trouble (still keeps his last charge) | back to Jekyll free, Charm d12→d10: R72 8+7 = 15 **S** | 2 / 1 | 3 |
| 6 | R73 3 market stalls (Brawn, Nimble) | Brawn d6→d4: R74 3+3 = 6 Trouble | Nimble d10: R75 5+3 = 8 Trouble | Nimble d10: R76 4+10 = 14 **S** | Brawn d10→d8: R77 8+10 = 18 **S** | Jekyll: no charge to become Hyde, and no overdraw while his Weakness is in play. Nimble d6→d4: R78 1+3 = 4 Trouble; the Monster showed, so Hyde takes over | 2 / 3 | 2 |
| 7 | R79 3 market stalls | Brawn d4: R80 3+4 = 7 Trouble | Nimble d10: R81 5+3 = 8 Trouble | Nimble d10: R82 4+2 = 6 Trouble | **Ancient Lore** (1→0), Wits d10: R83 10+9 = 19 **S** | Hyde Brawn d10: R84 3+1 = 4 Trouble | 1 / 4 | **0: FORKED** |

- Round 2, Lead 3 → 1. Planner: "Two Troubles and no Successes is minus two. Everyone, spend now." Hoarder: "I'll spend *one*."
- Round 3, at Lead 1. The Witch puts her last Hedge Spell on Hyde. Newcomer: "Is this the emergency?" Planner: "This is the emergency."
- Round 4. The Planner wanted the Hoarder's last charge on the Ghost's d4. Hoarder: "In case it gets worse." It stayed 2 to 2.
- Round 6. On a Brawn/Nimble ground, Jekyll is stuck as Jekyll: no charge to become Hyde, and no overdraw, because "while your Weakness is in play, however it came, you can't overdraw". Roleplayer: "Practised Hand lets me become the *useless* one for free."
- Round 7: four Troubles. The Mummy's 19 is the best roll of the night, and it's not enough. **The party is forked.** All five monsters are killed in the flight, and the lock, the spoons, the paper and the bandages stay in Gallowsmere.
- *Table talk.* Daredevil: "Seven rounds. We were at 3 twice." Hoarder: "I *did* spend them all, in the end." Planner: "We had a Win at the gate on Turn 9."

## How the Year Went
**Forked.** "The town tells the story for years. Next Lantern Night, the bells ring a little louder." (No missing-kind lines after Forked, Chapter 7.)

