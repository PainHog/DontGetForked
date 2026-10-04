# Don't Get Forked — core rules (draft 0.10)

*Draft, 2026-10-04. It summarises the decisions in `docs/DESIGN.md`; nothing here is final until he approves it. **[sim]** marks a starting number the simulator will tune. **[P1]**–**[P8]** mark the gap fills Richard approved on 2026-10-04 (listed at the end).*

## The game
The players are classic monsters who share a castle in the woods. Once a year, on the town's festival night, when everyone is in costume, they go down to steal what the castle needs. They must get the shopping list home before dawn, and if the job goes wrong, outrun the mob before it corners them with pitchforks. Each session is one raid on a new town and stands alone.

## Entities
- **Eight premade Entities, no duplicates in a party:** Dracula, Frankenstein's creature, the Mummy, the Werewolf, the Invisible Man, a Ghost, a Witch, Jekyll & Hyde (two forms: one sheet, two arrangements of the same dice).
- **Five traits:** Brawn (force, lifting, breaking, fighting) · Nimble (climbing, running, slipping free) · Sly (sneaking, hiding, stealing) · Charm (talking, bluffing, passing as human) · Wits (noticing, knowing, figuring out). **Every Entity has one each of d12, d10, d8, d6 and d4**, placed differently.
- **Fixed per Entity:** the dice arrangement, a signature ability, a **Weakness** (something the town can use against it) and a **Tell** (how it gives itself away).
- **Three picks**, each with a marked default and a random-table entry: a **Gift** (one of three versions of its second ability), a **Perk** (one of three passive edges) and a **Castle Duty** (one of about six shared household jobs, with a small edge tied to the shopping list).
- **Charges:** the same number for every Entity **[sim: 3]**, refilled once a year; unspent charges are lost. One charge = one use of an ability.

## Rolling
1. **The obstacle sets the trait.** Each obstacle lists one or two traits that work, usually one of them the loud way. Any other trait needs an ability.
2. **Choose the second die:** the **Mask d6** (passing as human) or the **Monster d10** (letting it out).
3. **Add the two dice** [P2] and compare the total with the Difficulty **[P1: 6 easy · 8 standard · 10 hard · 12 daunting]**:
   - **Success:** the total meets the Difficulty.
   - **Cost:** 1–2 short. You do it, at a cost **[P3: the Storyteller picks one: Suspicion +1, drop an item, lose a Turn, or your next roll one size smaller]**. A dropped item falls where you are; picking it up costs that Entity its next action [S3].
   - **Trouble:** 3 or more short. It doesn't happen, Suspicion +1, and witnesses catch you.
   - **Critical [S8]:** a Success where both dice show the same face. In a chase it moves the Lead 2 (in the final flight it counts as two successes); anywhere else you get back one spent charge (never above your starting number).
4. **The Monster shows** if the Monster die rolls higher than the trait die: Suspicion +2 [S2].

*Odds at Difficulty 8 (trouble): d8 trait 21% with the Mask, 13% with the Monster; d4 trait 42% and 25%.*

- **Abilities** (one charge each) do one of four things: raise a die one size; use the ability's trait instead of the one called; roll the Monster die without risking Suspicion; open an approach nobody else can take, still with a roll. **No ability ever passes automatically.** **[P7: an ability may target any Entity's roll at the same location, and no die is raised more than one size on one roll.]**
- **Overdraw:** at zero charges you can still use an ability, for Suspicion +2 [sim]. Once the hunt is on, overdraw costs your Weakness instead (see Chases) [S1].

## The raid
- **Shopping list:** rolled on a table; the number of items is set by difficulty **[sim: 3 / 4 / 5]**. One or two are **essentials**, the rest **extras**. Premade raids give a fixed list.
- **The town** is built from shared parts: an **obstacle** (trait + Difficulty), a **location** (1–3 obstacles, some loot, at least two ways in), **the way out** and the **raid** (locations visited until dawn). There are three ways to build one: a premade sequence, a map, or random tables with a difficulty budget.
- **Time [P4]:** the night lasts a set number of **Turns** before dawn [sim]. Each Turn, every Entity either makes one roll at its location or moves to another location. The party may split.
- **Group checks [P6]:** when the party crosses the same obstacle together, everyone rolls and gets through on their own result; Suspicion rises once, by the worst result.
- **Getting out [S4]:** the way out of town is one watched obstacle: Sly or Nimble, or Brawn the loud way, at the label's exit Difficulty [sim]. One Entity rolls for the party. A Success or Cost gets everyone out; Trouble raises Suspicion and that Entity is caught, and the party may try again next Turn.
- **Furniture [S7]:** a piece stands at one of the list's locations, behind one extra obstacle the party may take on once that location's loot is in hand.
- **Carrying:** Bulky pieces need one carrier, Huge pieces two. Carriers can't use the Mask die and roll Nimble one size smaller. Huge pieces don't fit small entrances. While carrying furniture, every move takes two Turns [S7]. You can drop a piece at any time.

## Suspicion
- **One town-wide track** up to a **Limit** set by difficulty [sim].
- **Raised by:** trouble +1 · the Monster shows +2 [S2] · a Tell +1 · overdraw +2.
- **Tells [S5]:** checked once each time the party arrives at a watched location, for the whole party; if one goes off, one Entity's Tell shows (+1 Suspicion). The chance is set with the Tell content [sim]. **One roll raises it once, by its biggest trigger.** Good results never lower it; only a few specific abilities or Perks can, within limits.
- **Caught:** trouble in front of witnesses starts a **local chase** for the Entities involved.
- **At the Limit** **[P5: or at dawn, for anyone still in town]**, the whole town hunts. Every Entity who isn't captured flees together in the **final flight**. From then on Suspicion stops [S1].

## Chases
- **The Lead track:** start with a small Lead [sim; a local chase starts at 1, S6]. Each round, roll against the mob's Difficulty [sim]: in a local chase it rises with Suspicion; in the final flight it is set by the label and doesn't change with party size [S5]. Success +1, cost no change, trouble −1. Reach the escape number [sim] and you're clear; reach 0 and you're cornered.
- **The ground:** each round, roll on a d6 chase table. The result lists the traits that work, always including one that isn't Nimble.
- **Weakness:** once the mob brings your Weakness, you roll your trait one size smaller in the chase.
- **Local chase:** cornered means **captured**. You're held at a location; the party can rescue you (it becomes an obstacle and costs Turns), and once per Turn you may try to slip free; only a Success frees you [S6] (Trouble: Suspicion +1). Anyone still held when the party leaves town is left behind.
- **Final flight:** everyone rolls each round. If successes outnumber trouble the Lead rises 1; if trouble outnumbers successes it falls 1. **Escape** = home with the goods. **Cornered** = **forked**: the monsters are killed and the raid is lost.
- **Once the hunt is on [S1]:** the Mask is off, and everyone rolls the Monster die. An Entity may still overdraw, but its Weakness is then in play for the rest of the flight (its trait one size smaller), and once its Weakness is in play it can't overdraw again.

## How the year went
| Result | When |
|---|---|
| **Grand Year** | A Win, plus at least one piece of furniture or decor |
| **Win** | Every essential, and at most one extra missing [P8] |
| **Partial** | Less than a Win (missing an essential is at best a Partial) and at least half the list home [P8] |
| **Bust** [P8] | Less than half the list home |
| **Forked** | Cornered in the final flight. The session ends |

Each Entity left behind drops the result one step (Bust is the floor short of Forked). The result decides the epilogue only; nothing carries over (optional campaign rules: Q9).

## Approved gap fills and open numbers
| # | Item | Rule | Status |
|---|---|---|---|
| P1 | Difficulty ladder | 6 easy · 8 standard · 10 hard · 12 daunting | approved 2026-10-04 |
| P2 | Result bands | Success ≥ Difficulty; Cost 1–2 short; Trouble 3+ short | approved 2026-10-04 |
| P3 | What a Cost costs | Storyteller picks: Suspicion +1, drop an item (picking it up costs your next action, S3), lose a Turn, or next roll one size smaller | approved 2026-10-04 |
| P4 | Time | The night is a number of Turns; each Turn, each Entity rolls once or moves | approved 2026-10-04 |
| P5 | Dawn | At dawn, anyone still in town starts the final flight | approved 2026-10-04 |
| P6 | Group checks | Everyone rolls and passes on their own result; Suspicion rises once, by the worst | approved 2026-10-04 |
| P7 | Abilities on others | Any Entity's roll at the same location; a die is raised at most one size per roll | approved 2026-10-04 |
| P8 | Win / Partial / Bust | Win = all essentials + at most one extra missing; Partial = at least half home; Bust = less | approved 2026-10-04 |
| — | Critical rule | Doubles on a Success; +2 Lead in a chase, otherwise a charge back | decided (S8) |
| — | Numbers | Charges (3), list size (3/4/5), Turns per night, Suspicion Limits, Lead start and escape numbers, mob Difficulty | simulator, then Richard |
| — | Content | Each Entity's arrangement, abilities, Gifts, Perks, Weakness, Tell; Castle Duties; chase table; festival | Richard |
