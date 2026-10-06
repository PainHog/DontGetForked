# Testing the Foundry system in real Foundry — slices 1 and 2, and the compendiums

The automated tests run the system on a stand-in for Foundry. This script checks the same things in the real thing, with two browsers: you as the **Storyteller (GM)** and one **player**. Sections 1–9 (slice 1) take about 30 minutes; sections 10–18 (slice 2) about 45; section 19 (the compendiums) about 15. Dice are random, so some steps say "roll until…".

**What slice 1 covers:** the Entity sheets, the roll dialog and roll cards, charges and abilities, Costs, Jekyll & Hyde's change of form, and the Raid HUD (Suspicion, the Limit, the Turns, dawn and the hunt).
**What slice 2 covers:** chases (the local chase and the final flight, with the chase tracker: the Lead, the ground, the mob, Weaknesses, the majority rule), the lock-up (capture, slipping free, rescue, left behind), group checks (one Suspicion rise), Tell checks, carried furniture's Suspicion, the shopping list and how the year went.
**For sections 1–9**, switch off *Run chases automatically* first (Configure Settings), so the hunt in section 7 doesn't start a final flight; switch it back on for section 10.

## Setup

1. Until a release is published, copy the repository folder into your Foundry data folder as `Data/systems/dont-get-forked` (the folder name must match). Restart Foundry. *(After a release: Install System → manifest URL `https://github.com/PainHog/DontGetForked/releases/latest/download/system.json`.)*
2. Create a world with the system **Don't Get Forked** (Foundry 13 or 14) and launch it.
3. In **Configure Players**, add a player user, say **Ann** (role: Player).
4. Browser 1: log in as Gamemaster. Browser 2 (or a private window): log in as Ann.
5. Keep the browser console open in both (F12 → Console). Any red error is worth a screenshot.

## 1. The world loads

- **GM:** a small **The Raid** window (top left): *Suspicion 0 / 11*, a row of 11 empty boxes, *Turn 1 of 12 · Standard*, and buttons (+1, −1, Undo, ◀ Turn, Next Turn ▶, Start the hunt; Group check, Tell check, Chase; Shopping list, End the raid, New raid). The chat shows **A new raid** (Standard: Suspicion 0 of 11, 12 Turns until dawn) the first time the world loads.
- **Ann:** the same window with the numbers but **no buttons**.
- **GM:** Game Settings → Configure Settings → *Don't Get Forked*: thirteen switches (Raise Suspicion automatically, Spend charges automatically, Jekyll becomes Hyde automatically, Apply the Storyteller's Cost, Start the hunt automatically, Show the Raid HUD, Run chases automatically, Run the lock-up automatically, Group checks, Offer how the year went, Carried furniture raises Suspicion each Turn, A new raid resets the Entities, Open the chase tracker when a chase starts), all on, plus *Show the odds when rolling* (each player's own).

## 2. Making Entities

1. **GM:** Actors sidebar → **New Entity**. Pick **A Witch**, player **Ann** → *Create*. Her sheet opens:
   - dice **Brawn d6 · Nimble d4 · Sly d10 · Charm d8 · Wits d12**; **Charges 3 / 3**;
   - **Hedge Spell** (signature) with the book's text; **Gift: Witchcraft** set to *Broomstick (default)*; **Perk** *Familiar's Warning (default)*; **Castle Duty** *Cook (default)*;
   - **Weakness: Rowan (Soon)** and **Tell: A Black Cat**, with the book's text;
   - Status *Active*, Carrying furniture (unticked), *Carrying: Nothing yet*, Notes.
   - Change the Gift to *Black Cat*: the text under it changes. Change it back.
2. **GM:** New Entity → **Dracula**, no player. Then New Entity → **Jekyll & Hyde**, player **Ann**. The chooser marks Entities already in the world ("already in this world").
3. **Ann:** the Actors sidebar shows all three. Ann can edit the Witch and Jekyll & Hyde, and open Dracula's sheet read-only.

## 3. A plain roll

1. **Ann:** on the Witch's sheet, click **Sly d10**. The roll dialog shows: Trait called (Sly), Second die (Mask d6 / Monster d10), Difficulty (6 easy … 12 daunting, 8 selected); her abilities (Hedge Spell, Broomstick); *Help from the others* (Dracula's Bat, "3 left"); the situation (Castle Duty, the loud way, watched, the way out, a chase roll); and an odds line at the bottom.
2. Change the second die to **Monster d10**: the odds line updates and adds "The Monster shows …%". *(If it doesn't update, note it: the line is meant to follow every change.)*
3. Click **Roll**. In **both** browsers a card appears: both dice with their faces, the total "against 8", and **Success**, **Cost** or **Trouble**.
   - If the Monster die rolled higher than the Sly die: *The Monster shows.* and **Suspicion +2 (the Monster shows) — on the track**, and the Raid window shows **2 / 11** in both browsers.
   - On Trouble with nothing showing: *Suspicion +1 (Trouble)*.
   - Doubles on a Success: *Critical: a spent charge back*.
4. **GM** sees a **Cancel Suspicion** button on cards that raised Suspicion; **Ann** sees no buttons.
5. Roll again with *Watched* ticked until you get Trouble: the card says **Caught! Someone was watching: a local chase starts (Chapter 6)** (with chases switched off, the GM's card offers **Start the local chase**; section 12 runs the chase). Unticked, Trouble says *Nobody was watching: no chase.*
6. Tick *The way out of town*: the dialog's line says Difficulty 8 for Standard; the card says "against 8" and "the way out".
   - Fetch (B5): make a **Werewolf** (any player) and set its Perk to *Fetch*. Ann ticks the way out again: Difficulty **7**, and the card adds *1 easier (Fetch)*. Set the Werewolf's Status to *Captured*: back to 8. Set it back to *Active* (or delete it) before section 4.

## 4. Costs

1. **Ann** rolls (Mask) until a **Cost** (1–2 short). The card says *Cost — the Storyteller picks one: Suspicion +1 · Lose a Turn · Next roll one size smaller*. (*Drop an item* only appears when the roller carries something; *Suspicion +1* doesn't appear when the roll already raised Suspicion.)
2. **GM** sees those three as buttons; Ann sees none. GM clicks **Next roll one size smaller**: the card says *Cost: Next roll one size smaller*, the buttons go, and the Witch's sheet shows *Next roll's trait die one size smaller (1)*.
3. **Ann** clicks Sly again: the dialog warns about the smaller die; the card says "rolls Sly (d8)" and "One size smaller (a Cost)". The mark disappears from the sheet.
4. On another Cost, **GM** picks **Suspicion +1**: the Raid window goes up by 1.
5. On another, **GM** picks **Lose a Turn**: the card says "loses Turn 2" (one more than the current Turn) and the sheet shows *Loses Turn 2*.
6. **Ann:** *+ Add an item* → "a jar of honey". On the next Cost, **GM** picks **Drop an item**: the honey disappears from the sheet and the card says it dropped. (With two or more items, the GM is asked which one.)

## 5. Abilities and charges

1. **Ann:** roll Sly with **Hedge Spell** ticked: the card says "rolls Sly (d12)" and "Raised one size"; the sheet's charges go **3 → 2**.
2. Tick **Hedge Spell** *and* **Castle Duty**: a warning says *At most one raise per roll, from any source, Castle Duty included*, and the dialog opens again.
3. Tick **Bat (Dracula)**: the card says "rolls Nimble … instead of Sly" and "Dracula spends 1"; **Dracula's** sheet (GM) shows 2 charges. (Ann can't edit Dracula; the Storyteller's client did it.)
4. Set the Witch's charges to **0** on the sheet, tick Hedge Spell and roll: the card says *A Witch overdraws (Suspicion +2)* and the Raid window rises by 2 (unless the roll itself raised 2: one roll raises Suspicion once, by its biggest trigger).
5. Click **Spend a charge** with 0 charges: a confirm asks about Suspicion +2; yes → a card *A Witch uses an ability* and Suspicion +2. Put her charges back to 3.

## 6. Jekyll & Hyde

1. **Ann:** open Jekyll & Hyde: the subtitle says **Jekyll**, dice Brawn d4 · Nimble d6 · Sly d8 · Charm d12 · Wits d10, and a **The Draught** button.
2. Roll **Brawn** with the **Monster** until the Monster die beats the Brawn die (often, with a d4): the card says **Hyde takes over.** and the sheet changes to **Hyde**: Brawn d12 · Nimble d10 · Sly d8 · Charm d4 · Wits d6. No charge spent.
3. Click **The Draught**: back to Jekyll, still 3 charges (*Practised Hand*: changing back costs nothing); the card says so. Click it again: Hyde, and 2 charges.

## 7. The Storyteller's controls

1. **GM:** on the Raid window press **+1**, **−1**, **Undo**: the number moves each time, in both browsers.
2. The list under the buttons shows each event (T1 · A Witch: the Monster shows …) with **Cancel**. Cancel a roll's event: Suspicion drops by its amount, the line is struck through with **Restore**, and that roll's card now says *cancelled by the Storyteller* with a **Restore Suspicion** button. Restore it.
3. Press **Next Turn ▶** until *Turn 12 of 12*, then once more: **Dawn**. The chat says **The whole town hunts** (Dawn came…) and the window shows it in red.
4. **Ann** rolls now: the dialog says the Mask is off; the card rolls the Monster whatever was chosen, and raises no Suspicion.
5. **GM:** **Stop the hunt**, then **◀ Turn**: back to Turn 12, no dawn, no hunt.
6. **New raid** → *Easy (Limit 11)*: Suspicion 0 / 11, Turn 1, a "A new raid" card. Press **+1** twelve times: at 11 the hunt starts by itself (*Suspicion reached the Limit*); more presses don't go past 11. New raid → Standard again (Limit 11; *Hard* has Limit 15).

## 8. Who may change what

1. **Ann** has no buttons on the Raid window and no buttons on any card.
2. *(Optional)* In Ann's console: `game.settings.set("dont-get-forked", "raidState", {})` → an error; nothing changes.
3. **GM:** close the GM browser tab. **Ann** rolls with the Monster until it shows: a warning *The Storyteller isn't connected — nothing was changed.*; the card says *not on the track yet*. **GM** logs back in: within a few seconds the Raid window includes that roll and the card says *on the track*.

## 9. Switching automations off (Configure Settings)

Turn each off, check, and turn it back on:

| Switch off | What you should see |
|---|---|
| Raise Suspicion automatically | Ann's roll card says *not on the track yet*; the GM's card has **Apply Suspicion**, which applies it |
| Spend charges automatically | Abilities on a roll don't change any charges; a Critical gives nothing back |
| Jekyll becomes Hyde automatically | When the Monster shows on Jekyll's roll, the card says to drink the Draught by hand; the sheet stays Jekyll |
| Apply the Storyteller's Cost | Picking a Cost only records it on the card (no mark on the sheet, no Suspicion) |
| Start the hunt automatically | At the Limit, a card says **At the Limit**; the hunt waits for **Start the hunt** |
| Show the Raid HUD | The Raid window closes for everyone; on again, it reopens |
| Show the odds when rolling (Ann's own) | Ann's roll dialog has no odds line |

## 10. The shopping list and Tell checks (slice 2 starts here)

Switch *Run chases automatically* back on. **GM:** New raid → *Standard*. You need two Entities: Ann's **Witch** and a **Dracula** with no player (the GM rolls for him). Every Entity is *Active* with 3 charges (a new raid resets them).

1. **GM:** on the Raid window, **Shopping list** → **Roll the list**. On Standard a d6 first decides the essentials (odd one, even two): the card **The shopping list** says *Essentials: a d6 rolled N (odd one, even two): 1 or 2*, then shows five items with their kinds, the first one or two marked *essential*. (Easy always has one, Hard two, with no extra die.) Both Raid windows now have a closed **The shopping list (5)** line; open it.
2. **GM:** **Tell check**: both Entities ticked, Where: *the baker's* → **Roll the check**. A **A Tell check: the baker's** card shows the d6 and, because the Witch is arriving, a second d6 (*Familiar's Warning: the second d6 must also roll 4–6*).
   - If both are 4–6: *A Tell goes off: [Entity] — [its Tell]* with the Tell's text, **Suspicion +1 (a Tell) — on the track**, and the Raid window rises by 1. The GM's card has **Cancel Suspicion**.
   - Otherwise: *Nothing gives them away*.
3. **GM:** Tell check again for *the baker's*: a warning says that location has already had its check; nothing is rolled.
4. **GM:** Tell check with only **Dracula** ticked, Where: *the way out*: one d6 only (no Witch, no second die).

## 11. A group check

1. **Ann:** on the Witch's sheet, add an item named exactly like the list's essential (e.g. *a wheel of strong cheese*).
2. **GM:** **Group check**: both ticked, The obstacle: *the crowded shop floor* → **Open the group check**. A card **A group check** names both; the Raid windows say *Group check: the crowded shop floor — waiting for A Witch, Dracula*.
3. **Ann:** roll Sly with the **Monster**, *Watched* ticked; the dialog has a ticked *Part of the group check: the crowded shop floor*. Roll until the Monster shows (Suspicion +2).
   *(If she gets Trouble instead, that's fine too: she is caught and will flee with Dracula if he's caught.)*
4. **GM:** open Dracula's sheet, roll **Sly** with the Mask, *Watched* ticked, *Part of the group check* ticked. The window's line goes once both have rolled.
   - **Check:** Suspicion rose **once for the whole group check, by the biggest trigger** (with the Witch's +2, Dracula's Trouble adds nothing more). The event list on the GM's Raid window shows one line for the group.
   - If Dracula got **Trouble**, a local chase starts (section 12). If not, roll Sly for Dracula with *Watched* until Trouble (outside a group check), which starts his chase.
   - If **both** got Trouble, they flee together on one shared Lead (moved by the majority rule), Night Runner and Fear the Curse don't apply, and in each round Suspicion rises **once**, by the biggest trigger among that round's rolls (the roll cards say so; the event list shows one line per round).

## 12. A local chase through to capture

1. **GM:** give Dracula an item (*a pair of candlesticks*) before he is caught, if you can, and tick *Carrying furniture* on his sheet (his rolls then use the Monster die, and his Nimble is one size smaller).
2. When he is caught, **both browsers** open **The Chase** window by itself, and the chat shows **A local chase!** (*Fleeing: Dracula… The Lead starts at 1; clear at 4, cornered at 0*) and **A local chase: round 1**: the ground (one of the six chase-table rows, e.g. *The crowded square: Sly or Charm work*), *The mob: Difficulty 8 + half the Suspicion, rounded down (at most 12)*, and *The mob has brought their Weakness: Dracula* (Garlic is *Always*).
   - The tracker shows the Lead track 0–4 with 1 marked, the mob, the ground, Dracula's traits for the round and a red *Garlic* tag. Ann's tracker has **no Roll** button (she doesn't own Dracula) and no controls; the GM's has **Roll**, **Roll the ground**, **Move the Lead** (greyed until everyone has rolled), Lead ±1, Escaped / Cornered / Call it off.
   - The caught card says *The local chase is on* and has no Start button.
3. **GM:** press **Roll** for Dracula on the tracker. The dialog says *A local chase, round 1: … Roll Sly or Charm against the mob's Difficulty N* and the Weakness notice; the trait is preset to his best allowed trait. Pick a trait the ground doesn't list → refused with *This round the ground lets you roll …*.
4. Roll: the card shows the trait die **one size smaller** (*One size smaller (the Weakness)*) and *Chase round 1 (…): Lead +1/0/−1*. A card **round 1, the Lead** shows *Lead +1: now 2* (or the move) and the next **round 2** card rolls a new ground. In a local chase, Trouble and the Monster showing still raise Suspicion.
5. Keep rolling until the Lead reaches 0 (or 4 — then he's clear: *Clear! Back where they were caught, with the Turn used up*; get him caught again and repeat). At 0: **Cornered!**, then **The lock-up**: *Dracula is captured and held at the lock-up. The town takes back what it was carrying: a pair of candlesticks. The furniture it carried is lost for the night.* His sheet: Status *Captured*, the item gone, *Carrying furniture* unticked; both Raid windows say *The furniture is lost for the night* (and at the end of the raid the year form can't count it as home). Both Raid windows: *The lock-up (Difficulty 10): Dracula (since Turn N)*.
6. **GM:** roll anything for Dracula without *At the lock-up*: refused (*Held at the lock-up: its one roll is slipping free*).

7. **Cornered at the Limit** *(optional, a new raid)*: raise Suspicion to one below the Limit (10 on Standard), get one Entity caught alone, and roll Trouble for it at Lead 1. The same roll brings the Limit: the chat shows that round (**Cornered!**), then **The lock-up** (it is captured first), then **The final flight!** without it.
8. **Already Dead at the Limit** *(optional)*: do the same with a **Ghost** whose Perk is *Already Dead*: the round card says it *isn't captured and loses no Turn: it joins the final flight*; its sheet stays Active with no lost Turn, and **The final flight!** lists it with the others.

## 13. Slipping free and a rescue

1. **GM:** roll for Dracula with **At the lock-up: slipping free** ticked (it is ticked by itself for a captive), the same Turn: refused (*from the Turn after its capture*).
2. **GM:** **Next Turn**. Roll Brawn with *At the lock-up*: the card says the loud way, *against 10*; on Trouble: *Still held: Suspicion rises, but no chase starts* (no chase window); on a Cost: *Still held* (no Cost buttons: a Cost does nothing); on a Success: *Slips free!* and his status turns Active.
3. If he's still held, try again the same Turn: refused (*once per Turn*).
4. **Ann:** roll the Witch's **Sly** with **At the lock-up: a rescue** ticked: *against 10*, watched. On a Success or a Cost: *The lock-up is beaten: every captive there is free … Free: Dracula.* His sheet turns Active and the lock-up line disappears. On Trouble the Witch is caught (a local chase).
5. *(Optional)* The GM can **free** a captive from the Raid window's lock-up line.

## 14. Furniture

1. **Ann:** roll Sly with *The furniture's extra obstacle* ticked at Difficulty 10: the card says *against 12* and *2 harder (the furniture's extra obstacle)*. At 12 it stays 12.
2. **Ann:** tick *Carrying furniture* on the Witch's sheet: both Raid windows say *The furniture is in play: Suspicion +1 at the end of each Turn, even while it's set down*. **GM:** **Next Turn**: Suspicion +1, and the event list says *carrying furniture*. Untick it (she sets it down), Next Turn: **still +1** (the piece is in town), and the event list says *the furniture (set down)*. **◀ Turn** back over a Turn that raised it: the rise is taken back.
3. **GM:** on the furniture line press **out of town**: the line says *The furniture has left town*; Next Turn: nothing. (Press **lost or abandoned** instead and the line says it is lost or abandoned for the night; nothing either.) The way out beaten or the final flight escaped also takes a carried piece out of town by itself (one set down stays put: lost or abandoned, section 16); a carrier captured loses it (section 12).

## 15. The final flight and the year

1. **Ann:** make sure the Witch carries two of the list's items (by name). **GM:** press **+1** until the Limit. *The whole town hunts*, then **The final flight!** (*Fleeing: A Witch, Dracula… Lead 2; clear at 5*; on Hard, clear at 6) and its round 1 ground, *The mob: Difficulty 11* (Standard; 10 Easy, 11 Hard).
2. Each round **both** roll (the Mask is off: the dialog switches to the Monster). After the second roll, a **round** card applies the **majority rule**: Successes against Trouble (*a Critical counts as two Successes*): one more Success: **+1**; two or more more: **+2**; one more Trouble: **−1**; two or more more: **−2**; a tie: 0. E.g. both Succeed: *Lead +2*; one Success and one Trouble: *Lead 0*. The trackers show who has rolled.
   - A switch ability (e.g. Dracula's *Bat*: use Nimble instead) works in a chase even when the ground doesn't list its trait, and in the flight a friend's switch can go on your roll; opening an approach is refused in any chase.
3. **Ann:** set the Witch's charges to 0 and roll with Hedge Spell ticked: the card says she *overdraws: its Weakness is in play from its next roll*; from her next roll her die is one size smaller. Tick Hedge Spell again next round: refused (*has already overdrawn in this flight: once per flight*). (The Witch's Rowan is *Soon*: it also comes in from round 3.)
4. At Lead 5 (6 on Hard): **Escaped! Home with the goods.**, then **Out of town** (*The party outran the mob…*) with **How the year went** for the GM only.
5. **GM:** click it. The form lists the shopping list with the items the Witch carries already ticked *Home*, the furniture box, *Entities left behind* (anyone still held). Tick or untick, then **Read the year**: a **How the year went: Win / Partial / …** card with the result's line and one line for each missing kind (after Forked, only the Forked line). The Raid windows say *The raid is over: …*. **End the raid** again says the year is decided.

## 16. A forked raid

1. **GM:** New raid → *Standard*: everyone Active, charges back to 3, and last year's loot stays home: the Witch's sheet says *Carrying: Nothing yet* and nobody has *Carrying furniture* ticked. **Shopping list** → roll it (note how the essentials die fell). **Start the hunt**: **The final flight!** (*The Storyteller started it*).
2. Roll Trouble for both: two Trouble and no Success move the Lead **−2**, from 2 to 0 in one round: **Cornered by the mob!** *Forked: the monsters are killed and the raid is lost.* — and, by itself, **How the year went: Forked**, with only the Forked line.
3. **Leaving town with the piece set down.** **GM:** New raid → *Standard*. **Ann:** tick *Carrying furniture* on the Witch, then untick it (she sets it down). Roll the way out and beat it (Sly, *The way out of town* ticked): both Raid windows say *The furniture is lost or abandoned for the night* (only a carried piece leaves town) and *The party is out of town: no hunt or chase starts now, not even at dawn*; the year form (**How the year went**) can't count the furniture as home.
4. **Leaving town with the piece carried.** **GM:** New raid → *Standard*; tick *Carrying furniture* on Dracula and leave it ticked. Ann beats the way out: the Raid windows say *The furniture has left town*, and the year form starts with the furniture ticked *Home*. Untick Dracula's furniture afterwards.
5. **Out of town with the year form off.** **GM:** switch *Offer how the year went* off. New raid → *Standard*; Ann beats the way out: no *Out of town* card, and the Raid windows say *The party is out of town…*. Press **Next Turn** until *Dawn*: **no hunt starts and no final flight** (Suspicion stays where it was). **End the raid** still reads the year. Switch *Offer how the year went* back on.

## 17. Running it by hand (switches)

| Switch off | What you should see |
|---|---|
| Run chases automatically | Trouble at a watched obstacle: the GM's card has **Start the local chase**; clicking it opens the chase with no ground. The GM presses **Roll the ground**; the player's roll waits; **Move the Lead** applies the round. The hunt starts no flight (the tracker offers **Start the final flight**). |
| Run the lock-up automatically | Cornered in a local chase: *Cornered!* but the Entity stays Active; slip and rescue rolls say what happened but change no status |
| Group checks | No **Group check** button; each roll stands alone |
| Offer how the year went | No *Out of town* card and no automatic Forked year; use **End the raid**. The way out beaten still puts the party out of town: dawn starts no hunt (section 16, step 5) |
| Carried furniture raises Suspicion each Turn | Next Turn while carrying: no rise |
| A new raid resets the Entities | A new raid keeps charges and statuses as they were |
| Open the chase tracker when a chase starts | Close Ann's tracker; a new chase doesn't reopen it (the Raid window's chase line or **Chase** opens it) |

## 18. Who may change what (slice 2)

1. **Ann** has no buttons on the chase tracker except **Roll** for her own Entity, no Group/Tell/List/End buttons on the Raid window, and no buttons on chase, Tell or year cards.
2. *(Optional)* In Ann's console: `game.dontGetForked.runOp("chase.lead", { delta: 1 })` → `{ ok: false, reason: "gmOnly" }`; nothing changes.
3. **GM:** close the GM tab; **Ann** rolls Trouble with *Watched*: a warning that the Storyteller isn't connected, no chase. **GM** logs back in: the chase starts by itself within a few seconds.

## 19. The compendiums

1. **GM:** the Compendium Packs sidebar has a folder **Don't Get Forked** with three packs: **The Entities** (8), **Random Tables** (8) and **Towns and Guide** (4). **Ann** sees The Entities and Random Tables, but not Towns and Guide (it's the Storyteller's).
2. **GM:** drag **A Ghost** from The Entities into the Actors sidebar. Its sheet is what **New Entity** makes: **Brawn d4 · Nimble d12 · Sly d10 · Charm d8 · Wits d6**, **Charges 3 / 3**, Gift *Chill (default)*, Perk *Spectral (default)*, Castle Duty *Butler (default)*, Weakness *Cold Iron*, Tell *Cold Spot*. Right-click it → **Configure Ownership** → Ann: *Owner*; Ann can now roll it. (Unlike New Entity, a dragged Entity starts hidden from the other players until you set its ownership.) Drag it onto a scene, open the token's configuration: **Link Actor Data** is ticked (the same for any Entity made with New Entity or the sidebar's Create Actor), so a roll from the token changes the Ghost the raid tracks. Delete the token and the Ghost afterwards.
3. **GM:** open **Random Tables** → **The Obstacle Table (d20)** and press **Roll** (if the compendium copy won't roll, drag the table into the Roll Tables sidebar first and roll that). The chat shows the d20 and the obstacle in bold with its two ways under it, e.g. **A locked front door**, *Quiet way: Sly (pick the lock)*, *Loud way: Brawn (kick it in)*; a group obstacle says *(group)*. The words match the book's table in Chapter 8.
4. Roll **The Shopping List (d66)**: the card's dice show two d6 and a total like **34** (3 for the kind, 4 for the item), and the result reads *Books and paper: ink and sealing wax*, with where in town it's found.
5. Roll each of the others once: **Castle Duties**, **The Chase Table** (with its *Traits that work*), **Lantern Night: Local Customs**, **The Furniture** (with its size) and the two **Villagers** tables. Each result is the book's row. Note how the cards look in your theme.
6. **GM:** open **Towns and Guide** → **Puddlecombe (Easy)**: three pages.
   - *Puddlecombe*: the custom, the 4-item list (the cheese essential), the stuffed bear at the tavern cellar, the two villagers, **Easy: Suspicion Limit 11 · the way out 6 · the lock-up 10 · the final flight: mob 10, escape at Lead 5**, and a macro.
   - *Locations*: the location key, row for row the book's Chapter 9 table (the furniture's guard dog at 10).
   - *Map*: the town's map (an eye on each watched location, a star at the furniture). Check that it shows, and how it looks in your theme.
   Glance at **Thistlewick (Standard)** and **Gallowsmere (Hard)** the same way.
7. **GM:** Raid HUD → **New raid** → *Easy*. Copy the code from Puddlecombe's page into a new macro of type **script** and run it: both Raid windows get a **The shopping list (4)** line with the four items, the cheese marked essential. **End the raid** lists them in the year form (cancel it).
8. **GM:** open **How to Run a Raid in Foundry**: three short pages (before, during and after the raid). Every button it names is where it says, and its list of switches matches Configure Settings.

## What to send back

For anything that looked wrong or clumsy: which step, what you expected, what happened, a screenshot, and any red console lines. Also how the sheet, cards, Raid window and chase tracker look in your Foundry theme (light and dark), since only you can see them.
