# Don't Get Forked — core rules (1.9)

*Approved by Richard on 2026-10-05. 1.1 (2026-10-05) adds wording clarifications from playtests PT1–PT2 [W]; 1.2 (2026-10-05) adds Richard's rulings T1–T10 on the questions those playtests raised; 1.3 (2026-10-05) adds wording clarifications from verification playtest PT3 (also marked [W]); 1.4 (2026-10-05) adds rulings U1–U2 and the Entities' dice (C1); 1.5 adds their signature abilities (C2, C2b); 1.6 sets when Weaknesses bite (C3), the Tell chance (C4) and what a Perk is (C5); 1.7 adds the Castle Duties (C10); 1.8 the chase table (C12); 1.9 the festival (C13). It summarises the decisions in `docs/DESIGN.md`; the rulebook chapters are written from it. **[S9]** marks a number set in the Starting numbers table. **[P1]**–**[P8]** mark the gap fills Richard approved on 2026-10-04 (listed at the end). **[W]** marks a playtest wording clarification (what the decisions and the simulator already did).*

## The game
The players are classic monsters who share a castle in the woods. Once a year, on Lantern Night, the town's festival, when everyone is in costume, they go down to steal what the castle needs. They must get the shopping list home before dawn, and if the job goes wrong, outrun the mob before it corners them with pitchforks. Each session is one raid on a new town and stands alone: 3–5 players and a Storyteller, 2–3 hours, horror-comedy for about 12+.

## Entities
- **Eight premade Entities, no duplicates in a party:** Dracula, Frankenstein's creature, the Mummy, the Werewolf, the Invisible Man, a Ghost, a Witch, Jekyll & Hyde (two forms: one sheet, two arrangements of the same dice).
- **Five traits:** Brawn (force, lifting, breaking, fighting) · Nimble (climbing, running, slipping free) · Sly (sneaking, hiding, stealing) · Charm (talking, bluffing, passing as human) · Wits (noticing, knowing, figuring out). **Every Entity has one each of d12, d10, d8, d6 and d4**, placed differently.
- **Dice arrangements [C1]:**

| Entity | Brawn | Nimble | Sly | Charm | Wits | Signature [C2] |
|---|---|---|---|---|---|---|
| Dracula | d8 | d10 | d6 | d12 | d4 | Mesmerise: open an approach with Charm |
| Frankenstein's creature | d12 | d8 | d6 | d4 | d10 | Brute Force: use Brawn instead |
| The Mummy | d10 | d4 | d6 | d8 | d12 | Ancient Lore: use Wits instead |
| The Werewolf | d10 | d12 | d6 | d4 | d8 | Good Dog: the Monster die without risking Suspicion |
| The Invisible Man | d4 | d8 | d12 | d6 | d10 | Unseen: the Monster die without risking Suspicion |
| A Ghost | d4 | d12 | d10 | d8 | d6 | Through the Wall: open an approach with Sly, not while carrying loot or furniture [C8] |
| A Witch | d6 | d4 | d10 | d8 | d12 | Hedge Spell: raise a die (any roll in the same place) |
| Jekyll & Hyde: Jekyll | d4 | d6 | d8 | d12 | d10 | The Draught: change form (lasts until the next draught); the Monster showing on a Jekyll roll makes him Hyde, free [C2b] |
| Jekyll & Hyde: Hyde | d12 | d10 | d8 | d4 | d6 | |

- **Fixed per Entity:** the dice arrangement, a signature ability, a **Weakness** (something the town can use against it) and a **Tell** (how it gives itself away).
- **Three picks**, each with a marked default and a random-table entry: a **Gift** (one of three versions of its second ability), a **Perk** (one of three passive edges; each bends one rule in one situation, every time, with nothing to track [C5]) and a **Castle Duty** (one of six shared household jobs, each matching one of the six kinds of list item: Cook, Gardener, Librarian, Butler, Handyman, Tailor; at a location whose list item is your Duty's kind, your trait die is one size larger on your own rolls there, counting as the roll's one raise [C10]; no two Entities in a party take the same one [R8]).
- **Charges:** the same number for every Entity **[S9: 3]**, refilled once a year; unspent charges are lost. One charge = one use of an ability.

## Rolling
1. **The obstacle sets the trait.** Each obstacle lists one or two traits that work, usually one of them the loud way: taking it costs +1 Suspicion whatever the result [R1]. Any other trait needs an ability.
2. **Choose the second die:** the **Mask d6** (passing as human) or the **Monster d10** (letting it out).
3. **Add the two dice** [P2] and compare the total with the Difficulty **[P1: 6 easy · 8 standard · 10 hard · 12 daunting]**:
   - **Success:** the total meets the Difficulty.
   - **Cost:** 1–2 short. You do it, at a cost **[P3: the Storyteller picks one: Suspicion +1, drop an item, lose a Turn (you skip your next action), or your next roll's trait die one size smaller]** [W]. A dropped item falls where you are; picking it up costs that Entity its next action [S3]. The Storyteller never picks a Cost that costs nothing right then (a Suspicion +1 the same roll already raised, a lost Turn when nothing waits); "drop an item" only if the roller carries loot, and it drops one of its own items, never what this roll wins [R10, T10, W].
   - **Trouble:** 3 or more short. It doesn't happen, Suspicion +1, and if anyone is watching, you're caught. Each obstacle is watched or not; a location is watched if any of its obstacles is; the way out and the lock-up always are [W].
   - **Critical [S8]:** a Success where both dice show the same face. In a chase it moves the Lead 2 (in the final flight it counts as two successes); anywhere else you get back one spent charge (never above your starting number).
4. **The Monster shows** if the Monster die rolls higher than the trait die: Suspicion +2 [S2].

*Odds at Difficulty 8 (trouble): d8 trait 21% with the Mask, 13% with the Monster; d4 trait 42% and 25%.*

- **Abilities** (one charge each) do one of four things: raise your trait die one size (a d12 can't go higher) [T6]; use the ability's trait instead of the one called; roll the Monster die without risking Suspicion (if it shows, Suspicion doesn't rise for it; Trouble or a Cost on that roll still counts) [W]; open an approach nobody else can take, still with a roll: with a trait the obstacle doesn't list, you roll the ability's trait at 2 lower Difficulty, watched as usual; only on obstacles, never in a chase, and only you get through, though the way out still takes everyone, a rescue still frees every captive, and a captive may open its own way to slip free [S10, T5, U1]. **No ability ever passes automatically.** Spend abilities before you roll; helping another Entity at the same place (the way out and the lock-up included, whether or not the helper has crossed its obstacles) costs the charge, not your action [W]. **[P7: an ability may target any Entity's roll at the same location.]** Several abilities may go on one roll, but it takes at most one raise, from any source, Castle Duty included [R2, T7]. Raises and steps down cancel out [W]. No die goes below a d4; further steps down are lost [R6].
- **Overdraw:** at zero charges you can still use an ability, for Suspicion +2 [S9]. Once the hunt is on, overdraw costs your Weakness instead (see Chases) [S1].

## The raid
- **Shopping list:** rolled on a table; the number of items is set by difficulty **[S9: 3 / 4 / 4]**. One or two are **essentials**, the rest **extras**. Premade raids give a fixed list.
- **The town** is built from shared parts: an **obstacle** (trait + Difficulty), a **location** (1–3 obstacles, some loot, at least two ways in), **the way out** and the **raid** (locations visited until dawn). A location's obstacles are crossed in order; its two ways in are two versions of the first obstacle (say, the front door or the back window, with different traits), and the party picks one and keeps to it; a location is watched if any of its obstacles is, both ways in included, but being caught depends on the obstacle rolled [W]; beating the last obstacle puts the loot in that Entity's hand, with no extra action [T2]. An obstacle stays beaten for the whole party once anyone gets a Success or Cost on it, unless it's marked **group** (a crowd, a guard who checks everyone): then each Entity who wants past rolls for itself [T1]. There are three ways to build one: a premade sequence, a map, or random tables with a difficulty budget.
- **Time [P4]:** the night lasts a set number of **Turns** before dawn [S9: 12]; dawn comes when the last Turn ends. Each Turn, every Entity either makes one roll at its location or moves to another location. The party starts at the edge of town by the way out; getting in needs no roll; a move to any location or the way out takes one Turn unless the map says otherwise. Within a Turn, Entities act one at a time in any order, and each result (a move too) counts at once [W]. Several Entities may try the same obstacle in one Turn; each try risks Trouble [R7]. The party may split.
- **Group checks [P6]:** when several Entities roll the same group obstacle in one Turn, they declare their dice and abilities, then roll together [W]; everyone rolls and gets through on their own result; Suspicion rises once, by the biggest single trigger among all the rolls [W].
- **Getting out [S4]:** the way out of town is one watched obstacle: Sly or Nimble, or Brawn the loud way, at the label's exit Difficulty [S9]. The party leaves together: every Entity who isn't captured must be at the way out [T4]. One Entity rolls for the party. A Success or Cost gets everyone out, with nothing more to pay [T4]; Trouble raises Suspicion and that Entity is caught (a local chase), and the party may try again next Turn.
- **Furniture [S7]:** a piece stands at one of the list's locations, behind one extra obstacle the party may take on once that location's loot is in hand.
- **Carrying:** Bulky pieces need one carrier, Huge pieces two. Carriers can't use the Mask die and roll Nimble one size smaller. Huge pieces don't fit small entrances. While carrying furniture, every move takes two Turns [S7]. You can drop a piece at any time. Small loot has no carrying limit [W], and Entities in the same place can hand it to each other at any time, free [U2]. Decor counts as furniture. Taking a piece needs no action, and nobody re-crosses obstacles on the way out [W].

## Suspicion
- **One town-wide track** up to a **Limit** set by difficulty [S9].
- **Raised by:** trouble +1 · the Monster shows +2 [S2] · the loud way +1 [R1] · a Cost chosen as Suspicion +1 [P3] · a Tell +1 · overdraw +2. Suspicion starts each raid at 0. **One roll raises it once, by its biggest trigger** (overdraw included) [W]. Good results never lower it; only a few specific abilities or Perks can, within limits.
- **Tells [S5]:** checked once, the first time anyone reaches each watched location (the way out and the lock-up included), however the party has split [T3, W]; if one goes off, a d6 roll of 4–6 sets one off [C4]: roll to see whose, among the Entities arriving; its Tell shows (+1 Suspicion).
- **Caught:** trouble in front of witnesses starts a **local chase** for the Entities involved. Everyone who gets Trouble in one group check is caught together, flees on one shared Lead (majority rule) and is captured together if cornered [R4, W]. A local chase happens within the Turn it started [R5]. Trouble where nobody is watching raises Suspicion but starts no chase [W].
- **At the Limit** **[P5: or at dawn, for anyone still in town]**, the whole town hunts. Every Entity who isn't captured flees together in the **final flight**. If the Limit comes during a local chase, that chase ends at once (even if the same round cornered them), and those Entities join the flight [W]. From then on Suspicion stops [S1]. The track never goes past the Limit; extra points are lost [R11].

## Chases
- **The Lead track:** start with a small Lead [S9: 1 in a local chase, 2 in the final flight]. Each round, roll against the mob's Difficulty [S9]: in a local chase it rises with Suspicion; in the final flight it is set by the label and doesn't change with party size [S5]. Success +1, cost no change, trouble −1; in a chase the roll moves the Lead (a Cost costs nothing more, and Trouble starts no other chase), and in a local chase Trouble and the Monster showing still raise Suspicion (one roll, one rise) [W]. The local mob is rounded down and checked each round. Reach the escape number [S9: 4 local, 6 final] and you're clear; reach 0 and you're cornered.
- **The ground:** each round, roll once on a d6 chase table for everyone in that chase. The result lists the traits that work, always including one that isn't Nimble [C12]: 1 the crowded square (Sly, Charm) · 2 back alleys (Nimble, Sly) · 3 the market stalls (Brawn, Nimble) · 4 over the rooftops (Nimble, Wits) · 5 the festival parade (Charm, Sly) · 6 a dead end (Brawn, Wits).
- **Weakness:** once the mob brings your Weakness, you roll your trait one size smaller in the chase. Each Weakness has a timing [C3]: **Always** (from the first round of any chase), **Soon** (from the third round) or **Dawn** (only in a final flight dawn started, from its first round).
- **Local chase:** cornered means **captured**, and the town takes back what you carried: it's gone for the night [R3, T9]. You're held at the town's lock-up, an obstacle (Sly, or Brawn the loud way, always watched) at the lock-up Difficulty, with a new rescue obstacle for each capture [R9]; the party can rescue you (costs Turns; a Success or Cost frees every captive there, who act again next Turn, and a rescuer's Trouble gets them caught as usual), and once per Turn, from the Turn after your capture, you may try to slip free, rolling Sly or Nimble, or Brawn the loud way, at the lock-up Difficulty [T8]; only a Success frees you [S6] (a Cost does nothing; Trouble: Suspicion +1, no chase) [W]. In a local chase you may use the Mask, abilities help only your own roll, and escaping puts you back where you were caught with your Turn used up [W]. Anyone still held when the party leaves town is left behind.
- **Final flight:** everyone rolls each round, and abilities can help anyone's roll. If successes outnumber trouble the Lead rises 1; if trouble outnumbers successes it falls 1. **Escape** = home with the goods. **Cornered** = **forked**: the monsters are killed and the raid is lost.
- **Once the hunt is on [S1]:** the Mask is off, and everyone rolls the Monster die. An Entity may still overdraw, but its Weakness is then in play from its next roll to the end of the flight (its trait one size smaller), and while its Weakness is in play, however it came, it can't overdraw [W].

## How the year went
| Result | When |
|---|---|
| **Grand Year** | A Win, plus at least one piece of furniture or decor |
| **Win** | Every essential, and at most one extra missing [P8] |
| **Partial** | Less than a Win (missing an essential is at best a Partial) and at least half the list home [P8] |
| **Bust** [P8] | Less than half the list home |
| **Forked** | Cornered in the final flight. The session ends |

Each Entity left behind drops the result one step (Bust is the floor short of Forked). The result decides the epilogue only; nothing carries over. **Optional campaign rules** (a sidebar): furniture brought home becomes a castle upgrade with a small, capped bonus in later raids; nothing negative carries over, and the Entities don't change.

## Rulings R1–R11 (S11, provisional)
Approved on 2026-10-04 to be tested and changed later (R3 and R10 confirmed or refined by T9 and T10 on 2026-10-05): R1 loud way +1 Suspicion · R2 one raise per roll · R3 the town takes a captive's loot · R4 a shared Lead when several are caught · R5 a local chase takes no extra Turns · R6 nothing below a d4 · R7 several tries per obstacle per Turn · R8 unique Castle Duties · R9 the lock-up · R10 "drop an item" only when someone carries loot · R11 Suspicion stops at the Limit.

## Starting numbers (S9, approved 2026-10-04; Limits raised in S10)
| | Easy | Standard | Hard |
|---|---|---|---|
| List size (essentials) | 3 (1) | 4 (1–2) | 4 (2) |
| Obstacle Difficulties (share of 6 · 8 · 10 · 12) | 15 · 50 · 30 · 5% | 15 · 50 · 30 · 5% | 0 · 40 · 45 · 15% |
| Suspicion Limit | 12 | 13 | 15 |
| Exit Difficulty | 6 | 8 | 8 |
| Final-flight mob Difficulty | 10 | 11 | 11 |
| Lock-up Difficulty | 10 | 10 | 12 |

Every label: 3 charges; 12 Turns; overdraw +2 Suspicion; a local chase's Lead starts at 1 and escapes at 4, against a mob of 10 + half the Suspicion (at most 12); the final flight's Lead starts at 2 and escapes at 6. A Tell goes off on 4–6 on a d6 [C4].

## Approved gap fills and open numbers
| # | Item | Rule | Status |
|---|---|---|---|
| P1 | Difficulty ladder | 6 easy · 8 standard · 10 hard · 12 daunting | approved 2026-10-04 |
| P2 | Result bands | Success ≥ Difficulty; Cost 1–2 short; Trouble 3+ short | approved 2026-10-04 |
| P3 | What a Cost costs | Storyteller picks: Suspicion +1, drop an item (picking it up costs your next action, S3), lose a Turn, or next roll one size smaller | approved 2026-10-04 |
| P4 | Time | The night is a number of Turns; each Turn, each Entity rolls once or moves | approved 2026-10-04 |
| P5 | Dawn | At dawn, anyone still in town starts the final flight | approved 2026-10-04 |
| P6 | Group checks | Everyone rolls and passes on their own result; Suspicion rises once, by the worst | approved 2026-10-04 |
| P7 | Abilities on others | Any Entity's roll at the same location; at most one raise per roll from any source (R2) | approved 2026-10-04 |
| P8 | Win / Partial / Bust | Win = all essentials + at most one extra missing; Partial = at least half home; Bust = less | approved 2026-10-04 |
| — | Critical rule | Doubles on a Success; +2 Lead in a chase, otherwise a charge back | decided (S8) |
| — | Numbers | See Starting numbers above | decided (S9) |
| — | Content | The eight Entities are done (C1–C9, rulebook Chapter 2); the festival is Lantern Night, with a d6 table of local customs, flavour only (C13, rulebook Chapters 4 and 8). Still to write: shopping list and town tables; epilogue table; campaign upgrades | Richard |
