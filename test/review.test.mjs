/**
 * Integration smoke test — the outside review's rules (DESIGN 2026-10-19 D1, D2, D3, D6b, D7b; 2026-10-20 R1, R4),
 * on the fake Foundry (tools/fake-foundry.mjs): a Storyteller (GM) and two players, the real entry module, dialogs
 * (scripted answers), cards, Raid HUD and chase tracker, with scripted dice.
 *  - D1 one chase, one rise: the mob set when the chase starts; nothing raised until it ends; then once, by its biggest
 *    trigger; the tracker and the HUD show the rise building; the Storyteller can cancel it; by hand, Apply Suspicion;
 *    F25: the hunt ending the chase applies its rise so far;
 *  - D2 giving up (alone and caught together; too late once someone has rolled; only its player or the Storyteller);
 *  - D3 an overdraw on top: alone, in a group check, and in a local chase (a roll's and the sheet's);
 *  - D6b in the final flight a Gift that usually does something else, and a friend's approach, spent as a raise;
 *  - D7b everyone held: Forked (from a give-up, and at dawn); with the switch off, as before;
 *  - R1 a rescue whose Suspicion brings the Limit: the freed join the flight;
 *  - R4 the way out once a Turn (and with the switch off);
 * and the HUD keeps its hand controls for Suspicion and Turns.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  installFoundry, asUser, settle, diceQueue, dialogResponders, fakeForm, renderMessage, clickButton, buttonLabels, log,
} from "../tools/fake-foundry.mjs";

const { game } = installFoundry({
  users: [
    { id: "gmUser0000000000", name: "Storyteller", isGM: true },
    { id: "annUser000000000", name: "Ann" },
    { id: "benUser000000000", name: "Ben" },
  ],
});
const GM = game.users.get("gmUser0000000000");
const ANN = game.users.get("annUser000000000");
const BEN = game.users.get("benUser000000000");

await import("../module/dont-get-forked.mjs");
const { SYSTEM_ID, SETTINGS, OPS, CARD } = await import("../module/contracts.mjs");
const { openHud, currentHud } = await import("../module/apps/raid-hud.mjs");
const { openChaseTracker } = await import("../module/apps/chase-tracker.mjs");
const R = await import("../module/logic/raid.mjs");
Hooks.callAll("init");
Hooks.callAll("ready");
await settle();

const api = game.dontGetForked;
const raid = () => api.raid.get();
const view = () => api.raid.view();
const chase = () => raid().chase;
const lastMessage = () => game.messages.at(-1);
const cardOf = (m) => m.getFlag(SYSTEM_ID, "card");
const cards = (kind) => game.messages.filter((m) => cardOf(m)?.kind === kind);
const lastCard = (kind) => cards(kind).at(-1);
const setSetting = (key, value) => asUser(GM, () => game.settings.set(SYSTEM_ID, key, value));
const op = (user, name, args = {}) => asUser(user, () => api.runOp(name, args));
const newRaid = async (difficulty = "standard") => { await op(GM, OPS.raidReset, { difficulty }); await settle(); };
const adjust = async (n) => { for (let i = 0; i < n; i++) await op(GM, OPS.raidAdjust, { delta: 1 }); await settle(); };

/** A scripted DialogV2 answer: press `action` with these form values. */
const press = (action, values = {}) => (options) => {
  const b = options.buttons?.find((x) => x.action === action);
  if (!b) throw new Error(`dialog "${options.window?.title}" has no ${action} button`);
  return b.callback ? b.callback({}, { form: fakeForm(values) }, null) : action;
};
/** Roll as a user through the roll dialog: `values` are the dialog's answers, `faces` the dice that follow. */
async function rollAs(user, actor, values, faces, { seen } = {}) {
  diceQueue.push(...faces);
  dialogResponders.push((options) => { seen?.(options.content); return press("roll", values)(options); });
  const result = await asUser(user, () => api.roll(actor, { trait: values.trait }));
  await settle();
  return result;
}
/** A roll the plan refuses: the dialog opens again and the player cancels. Returns the warnings it gave. */
async function refusedRoll(user, actor, values) {
  dialogResponders.push(press("roll", values), press("cancel"));
  const before = log.warnings.length;
  await asUser(user, () => api.roll(actor, { trait: values.trait }));
  await settle();
  return log.warnings.slice(before);
}
const lastRoll = () => cardOf(cards(CARD.roll).at(-1));
const apos = ".{1,6}"; // an apostrophe in a card's HTML is escaped

let witch, dracula;
const hedge = () => `ability:${witch.id}:signature`;

test("boot: the new switches are registered and on; the HUD keeps its hand controls for Suspicion and Turns", async () => {
  for (const k of ["autoAllHeld", "wayOutOncePerTurn"]) assert.equal(game.settings.get(SYSTEM_ID, SETTINGS[k]), true, `${k} on`);
  witch = await asUser(GM, () => api.createEntity("witch", { ownerId: ANN.id }));
  dracula = await asUser(GM, () => api.createEntity("dracula", { ownerId: BEN.id }));
  await settle();
  await newRaid();
  const hud = await asUser(GM, () => openHud());
  for (const a of ["suspicionUp", "suspicionDown", "undo", "prevTurn", "nextTurn", "toggleHunt"]) assert.match(hud.renderedParts.body, new RegExp(`data-action="${a}"`), a);
  assert.deepEqual(log.errors, []);
});

test("D1: a local chase's mob is set when it starts; its rolls raise nothing until it ends; then it rises once, by its biggest trigger", async () => {
  await newRaid();
  await adjust(4);
  // caught (Trouble +1 → 5): the mob is 8 + half of 5 = 10, for the whole chase; the ground: over the rooftops (Nimble, Wits)
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, watched: true }, [1, 1, 4]);
  const c = chase();
  assert.deepEqual([c.kind, c.lead, c.mob, view().value], ["local", 1, 10, 5]);
  assert.match(cards(CARD.chase).find((m) => cardOf(m).event === "start").content, /The mob: Difficulty 10, set now for the whole chase/);
  let annT = await asUser(ANN, () => openChaseTracker());
  assert.match(annT.renderedParts.body, new RegExp(`The chase${apos}s rise so far: \\+0`));
  // round 1: Wits d12 and the Monster, 9 + 10 = 19: a Success, but the Monster showed: +2 waits for the chase's end
  await rollAs(ANN, witch, { trait: "wits", second: "monster", chase: true }, [9, 10, 4]);
  assert.deepEqual([lastRoll().suspicion, lastRoll().chaseRise, lastRoll().chaseRiseKeys], [0, 2, ["monster"]]);
  assert.match(cards(CARD.roll).at(-1).content, new RegExp(`Toward the chase${apos}s one rise: \\+2 \\(the Monster shows\\)`));
  assert.deepEqual([chase().lead, view().value], [2, 5], "nothing on the track yet");
  annT = await asUser(ANN, () => openChaseTracker());
  assert.match(annT.renderedParts.body, new RegExp(`The chase${apos}s rise so far: \\+2`));
  assert.match((await asUser(BEN, () => openHud())).renderedParts.body, /its rise so far \+2/);
  // the Storyteller's +1 by hand mid-chase: the mob doesn't move (it was set when the chase started)
  await op(GM, OPS.raidAdjust, { delta: 1 });
  await settle();
  // round 2: Trouble (Lead 1); the rise stays 2, its biggest trigger
  await rollAs(ANN, witch, { trait: "wits", second: "mask", chase: true }, [1, 1, 4]);
  assert.deepEqual([chase().lead, chase().mob, view().value], [1, 10, 6]);
  // rounds 3 and 4: Rowan (Soon) makes her Wits a d10; two Criticals (+2 each): clear
  await rollAs(ANN, witch, { trait: "wits", second: "mask", chase: true }, [6, 6, 4]);
  await rollAs(ANN, witch, { trait: "wits", second: "mask", chase: true }, [6, 6]);
  assert.equal(chase().outcome, "escaped");
  assert.equal(view().value, 8, "the chase's one rise: +2, once, however many rounds and triggers");
  const ev = R.eventsOf(raid()).find((e) => e.eventId === `chase:${c.id}`);
  assert.deepEqual([ev.amount, ev.source, ev.label], [2, "chase", "monster"]);
  const end = cards(CARD.chase).find((m) => cardOf(m).chaseId === c.id && cardOf(m).outcome === "escaped");
  assert.match(end.content, /One chase, one rise: Suspicion \+2 \(the Monster shows\)/);
  assert.deepEqual(buttonLabels(end, GM), ["Cancel Suspicion"]);
  assert.deepEqual(buttonLabels(end, ANN), []);
  // the Storyteller cancels the chase's rise, then restores it
  clickButton(renderMessage(end, GM), "Cancel Suspicion", GM);
  await settle();
  assert.equal(view().value, 6);
  const again = game.messages.get(end.id);
  assert.match(again.content, /canceled by the Storyteller/);
  clickButton(renderMessage(again, GM), "Restore Suspicion", GM);
  await settle();
  assert.equal(view().value, 8);
});

test("D3: an overdraw adds +2 on top of the roll's other rise: alone, in a group check, and in a local chase (a roll's and the sheet's)", async () => {
  await newRaid();
  await asUser(ANN, () => witch.update({ "system.charges.value": 0 }));
  // alone: Hedge Spell at no charges, Sly d10 → d12; 2 + 9 = 11, a Success, the Monster shows (+2) and the overdraw (+2)
  await rollAs(ANN, witch, { trait: "sly", second: "monster", difficulty: 8, [hedge()]: true }, [2, 9]);
  assert.deepEqual([lastRoll().suspicion, lastRoll().rise, lastRoll().overdrawRise], [4, 2, 2]);
  assert.match(cards(CARD.roll).at(-1).content, /Suspicion \+4 \(the Monster shows; overdraw \+2 on top\)/);
  assert.match(cards(CARD.roll).at(-1).content, /A Witch overdraws \(Suspicion \+2, on top of the roll.{1,6}s other rise\)/);
  assert.equal(view().value, 4);
  assert.match((await asUser(GM, () => openHud())).renderedParts.body, /\+4<\/span>\s*<span class="dgf-ev-text">T1 · A Witch: the Monster shows, overdraw<\/span>/);
  // a group check: the Witch's overdraw (a Success, nothing else) and Dracula's Trouble (+1): the group's one rise, +2 on top
  await op(GM, OPS.raidGroup, { action: "open", members: [witch.id, dracula.id], label: "the crowded shop floor" });
  await settle();
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, group: true, [hedge()]: true }, [6, 3]);
  await rollAs(BEN, dracula, { trait: "sly", second: "mask", difficulty: 8, group: true }, [1, 2]);
  const g = R.eventsOf(raid()).find((e) => e.eventId === `group:${raid().group.id}`);
  assert.equal(g.amount, 3, "the group rises once (1), and the overdraw adds +2 on top");
  assert.equal(view().value, 7);
  // a local chase: the overdraw adds +2 to the chase's one rise, when it ends
  await newRaid();
  await asUser(ANN, () => witch.update({ "system.charges.value": 0 }));
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, watched: true }, [1, 1, 1]); // caught (+1); the crowded square
  await rollAs(ANN, witch, { trait: "sly", second: "mask", chase: true, [hedge()]: true }, [10, 5, 1]); // Sly d12: 15, a Success
  assert.match(cards(CARD.roll).at(-1).content, new RegExp(`A Witch overdraws \\(\\+2 on top of the chase${apos}s one rise, when it ends\\)`));
  assert.deepEqual([lastRoll().suspicion, lastRoll().chaseOverdraws, view().value], [0, 1, 1]);
  // 2026-10-21: one overdraw per runner per local chase: the sheet's Spend a charge at no charges is refused now
  const before = log.warnings.length;
  const msgs = game.messages.size;
  await asUser(ANN, () => api.spendCharge(witch));
  await settle();
  assert.ok(log.warnings.slice(before).some((w) => w.includes("already overdrawn in this chase")));
  assert.equal(game.messages.size, msgs, "no card: nothing spent");
  // with that switch off, the sheet's overdraw adds its +2 to the chase's rise as before
  await setSetting(SETTINGS.localOverdrawOnce, false);
  await asUser(ANN, () => api.spendCharge(witch));
  await settle();
  await setSetting(SETTINGS.localOverdrawOnce, true);
  assert.deepEqual([cardOf(lastMessage()).kind, cardOf(lastMessage()).chaseId, cardOf(lastMessage()).suspicion], [CARD.ability, chase().id, 0]);
  assert.equal(view().value, 1, "nothing on the track yet");
  assert.match((await asUser(ANN, () => openChaseTracker())).renderedParts.body, new RegExp(`The chase${apos}s rise so far: \\+4`));
  // and a roll that would overdraw again is refused (the switch back on)
  const again = await refusedRoll(ANN, witch, { trait: "sly", second: "mask", chase: true, [hedge()]: true });
  assert.ok(again.some((w) => w.includes("already overdrawn in this chase")));
  // the Storyteller: Escaped. The chase's one rise: no trigger, two overdraws on top: +4
  await op(GM, OPS.chaseEnd, { outcome: "escaped" });
  await settle();
  assert.equal(view().value, 5);
  assert.match(lastCard(CARD.chase).content, /One chase, one rise: Suspicion \+4 \(overdraw\)/);
  await asUser(ANN, () => witch.update({ "system.charges.value": 3 }));
});

test("D2: at the start of a round a runner may give up (captured, no roll); the others carry on, the majority rule counting only them", async () => {
  await newRaid();
  await asUser(BEN, () => dracula.update({ "system.carried": [{ name: "the silver spoons" }] }));
  await op(GM, OPS.raidGroup, { action: "open", members: [witch.id, dracula.id], label: "the crowded shop floor" });
  await settle();
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, watched: true, group: true }, [1, 1]);
  await rollAs(BEN, dracula, { trait: "sly", second: "mask", difficulty: 8, watched: true, group: true }, [1, 1, 1]); // the crowded square
  const c = chase();
  assert.deepEqual(c.members.map((m) => m.name), ["A Witch", "Dracula"]);
  // each player gets a Give up button for their own runner; the Storyteller for both
  const annT = await asUser(ANN, () => openChaseTracker());
  const benT = await asUser(BEN, () => openChaseTracker());
  const gmT = await asUser(GM, () => openChaseTracker());
  const giveUpFor = (t, a) => new RegExp(`data-action="giveUp" data-actor-id="${a.id}"`).test(t.renderedParts.body);
  assert.deepEqual([giveUpFor(annT, witch), giveUpFor(annT, dracula), giveUpFor(benT, dracula), giveUpFor(benT, witch), giveUpFor(gmT, witch), giveUpFor(gmT, dracula)], [true, false, true, false, true, true]);
  assert.deepEqual(await op(ANN, OPS.chaseGiveUp, { actorId: dracula.id }), { ok: false, reason: "notYours" });
  // round 1: the Witch rolls first: too late now for Dracula to give up this round
  await rollAs(ANN, witch, { trait: "sly", second: "mask", chase: true }, [8, 5]);
  const before = log.warnings.length;
  await asUser(BEN, () => benT.runAction("giveUp", { actorId: dracula.id }));
  await settle();
  assert.ok(log.warnings.slice(before).some((w) => w.includes("Too late for this round")));
  assert.doesNotMatch((await asUser(BEN, () => openChaseTracker())).renderedParts.body, /data-action="giveUp"/, "no button once the round has started");
  await rollAs(BEN, dracula, { trait: "charm", second: "mask", chase: true }, [8, 5, 1]); // Charm d12 → d10 (Garlic): two Successes, Lead 3
  assert.equal(chase().lead, 3);
  // round 2: Dracula gives up: captured, the town takes back the spoons; the Witch carries on alone
  await asUser(BEN, () => benT.runAction("giveUp", { actorId: dracula.id }));
  await settle();
  assert.equal(dracula.system.status, "captured");
  assert.deepEqual(dracula.system.carried, []);
  assert.deepEqual(chase().members.map((m) => m.name), ["A Witch"]);
  assert.deepEqual(chase().gaveUp.map((g) => g.name), ["Dracula"]);
  assert.ok(cards(CARD.chase).some((m) => cardOf(m).event === "gaveUp" && /Dracula gives up: captured, with no roll/.test(m.content)));
  assert.ok(cards(CARD.chase).some((m) => cardOf(m).event === "captured" && /the silver spoons/.test(m.content)));
  assert.match((await asUser(ANN, () => openChaseTracker())).renderedParts.body, /Gave up \(captured\): Dracula/);
  assert.equal(view().over, null, "the Witch is still free");
  // her roll alone moves the Lead: a Success, +1: 4, clear; the chase raises nothing (no Trouble, no Monster)
  await rollAs(ANN, witch, { trait: "sly", second: "mask", chase: true }, [8, 5]);
  assert.deepEqual([chase().outcome, chase().history.at(-1).move], ["escaped", 1]);
  assert.match(lastCard(CARD.chase).content, /One chase, one rise: no Trouble and no Monster showing/);
  assert.equal(view().value, 1, "only the group check's rise");
});

test("D7b: everyone held at once ends the night, Forked: from a give-up, and at dawn; with the switch off, as before", async () => {
  // Dracula is still held (he gave up); the Witch is caught alone and gives up at round 1: everyone held
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, watched: true }, [1, 1, 2]);
  assert.equal(chase().kind, "local");
  const annT = await asUser(ANN, () => openChaseTracker());
  await asUser(ANN, () => annT.runAction("giveUp", { actorId: witch.id }));
  await settle();
  assert.deepEqual([witch.system.status, chase().outcome], ["captured", "gaveUp"]);
  assert.match(cards(CARD.chase).find((m) => cardOf(m).chaseId === chase().id && cardOf(m).outcome === "gaveUp").content, /Everyone gave up: captured/);
  const held = cards(CARD.raid).at(-1);
  assert.equal(cardOf(held).event, "allHeld");
  assert.match(held.content, /the night ends right there/);
  const year = cardOf(lastMessage());
  assert.deepEqual([year.kind, year.result, year.how], [CARD.year, "forked", "allHeld"]);
  assert.equal(view().over.result, "forked");
  assert.match((await asUser(BEN, () => openHud())).renderedParts.body, /The raid is over: Forked/);
  // at dawn: both held (the Storyteller's sheet changes, not a capture the rules made); dawn ends the night, Forked
  await newRaid();
  for (const a of [witch, dracula]) await asUser(GM, () => a.update({ "system.status": "captured" }));
  await settle();
  assert.equal(view().over, null, "a hand change on the sheet isn't checked: the night goes on");
  for (let i = 0; i < 12; i++) await asUser(GM, () => currentHud().runAction("nextTurn"));
  await settle();
  assert.equal(view().dawn, true);
  assert.equal(view().over?.result, "forked");
  assert.equal(cardOf(lastMessage()).how, "allHeld");
  // the switch off: both captured the rules' way, the hunt by hand: nobody flees and the Storyteller is asked about the year
  await setSetting(SETTINGS.autoAllHeld, false);
  await newRaid();
  for (const a of [witch, dracula]) await op(GM, OPS.lockupSet, { actorId: a.id, captured: true });
  await settle();
  assert.equal(view().over, null);
  await asUser(GM, () => currentHud().runAction("toggleHunt"));
  await settle();
  assert.equal(view().over, null);
  assert.deepEqual([cardOf(lastMessage()).event, cardOf(lastMessage()).how], ["home", "nobody"]);
  await setSetting(SETTINGS.autoAllHeld, true);
  await newRaid();
});

test("D6b: in the final flight a Gift that usually switches the trait, and a friend's approach, are spent as raises; still one raise per roll", async () => {
  await newRaid();
  let outside = "";
  dialogResponders.push((options) => { outside = options.content; return press("cancel")(options); });
  await asUser(ANN, () => api.roll(witch, { trait: "sly" }));
  await settle();
  assert.doesNotMatch(outside, /or as a raise/, "before the hunt, no raise ticks");
  diceQueue.push(1); // the flight's ground: the crowded square (Sly, Charm)
  await asUser(GM, () => currentHud().runAction("toggleHunt"));
  await settle();
  assert.equal(chase().kind, "final");
  // refused: Bat both ways on one roll; and two raises on one roll
  let w = await refusedRoll(BEN, dracula, { trait: "charm", second: "monster", chase: true, [`ability:${dracula.id}:gift`]: true, [`ability:${dracula.id}:gift:raise`]: true });
  assert.ok(w.some((x) => x.includes("Bat goes on a roll once")), w.join(" | "));
  w = await refusedRoll(ANN, witch, { trait: "sly", second: "monster", chase: true, [hedge()]: true, [`ability:${dracula.id}:gift:raise`]: true });
  assert.ok(w.some((x) => x.includes("At most one raise per roll")), w.join(" | "));
  // Dracula: Charm d12, Garlic makes it a d10, his Bat (usually: Nimble instead) spent as a raise: back to a d12
  let content = "";
  await rollAs(BEN, dracula, { trait: "charm", second: "monster", chase: true, [`ability:${dracula.id}:gift:raise`]: true }, [9, 4], { seen: (c) => { content = c; } });
  assert.match(content, /any ability may be spent as a raise/);
  assert.match(content, new RegExp(`name="ability:${dracula.id}:gift:raise"`));
  assert.match(content, new RegExp(`name="ability:${witch.id}:gift:raise"`), "the Witch's A Potion for That (her default Gift since 2026-10-20) too, as a raise");
  let card = lastRoll();
  assert.deepEqual([card.trait, card.traitDie, card.abilities.map((a) => [a.name, a.asRaise])], ["charm", 12, [["Bat", true]]]);
  assert.match(cards(CARD.roll).at(-1).content, /Bat \(as a raise\)/);
  assert.equal(dracula.system.charges.value, 2, "it still costs its charge");
  // the Witch: Dracula's Mesmerize (an approach of his own, never in a chase) as a raise on her roll: Sly d10 → d12
  await rollAs(ANN, witch, { trait: "sly", second: "monster", chase: true, [`ability:${dracula.id}:signature:raise`]: true }, [7, 5, 1]);
  card = lastRoll();
  assert.deepEqual([card.traitDie, card.band], [12, "success"]);
  assert.match(cards(CARD.roll).at(-1).content, /Mesmerize \(as a raise\) \(Dracula\)/);
  assert.equal(dracula.system.charges.value, 1, "the helper pays");
  assert.equal(chase().lead, 4, "two Successes: +2");
  await asUser(GM, () => currentHud().runAction("toggleHunt"));
  await settle();
});

test("Wall-Crawler (2026-10-20): in a chase Dracula's Nimble die is one size bigger, the roll's one raise; the dialog says so and the card names it", async () => {
  await newRaid();
  await asUser(GM, () => dracula.update({ "system.perk": "wallCrawler" }));
  diceQueue.push(3); // the flight's ground: the market stalls (Brawn, Nimble)
  await asUser(GM, () => currentHud().runAction("toggleHunt"));
  await settle();
  assert.equal(chase().kind, "final");
  // refused: the Witch's Hedge Spell on his Nimble roll (Wall-Crawler is already its one raise)
  const w = await refusedRoll(BEN, dracula, { trait: "nimble", second: "monster", chase: true, [hedge()]: true });
  assert.ok(w.some((x) => x.includes("Wall-Crawler already makes this Nimble die one size bigger")), w.join(" | "));
  // Nimble d10, one size bigger (Wall-Crawler) and one smaller (Garlic, from round 1): a d10; 9 + 5 = 14 against 11
  let content = "";
  await rollAs(BEN, dracula, { trait: "nimble", second: "monster", chase: true }, [9, 5], { seen: (c) => { content = c; } });
  assert.match(content, new RegExp(`Wall-Crawler: in a chase you can always roll Nimble, and your Nimble die is one size bigger \\(the roll${apos}s one raise`));
  assert.match(content, /d10 \+ d10 against 11/, "the odds line: his Nimble stays a d10 with Garlic");
  const card = lastRoll();
  assert.deepEqual([card.trait, card.baseDie, card.traitDie, card.raises, card.perkRaise, card.band], ["nimble", 10, 10, 1, "Wall-Crawler", "success"]);
  assert.match(cards(CARD.roll).at(-1).content, /Raised one size \(Wall-Crawler\)/);
  assert.match(cards(CARD.roll).at(-1).content, /One size smaller \(the Weakness\)/);
  assert.equal(dracula.system.charges.value, 3, "a Perk costs no charge");
  // on his Brawn, no raise from the Perk: Brawn d8, Garlic, a d6
  await rollAs(ANN, witch, { trait: "nimble", second: "monster", chase: true }, [2, 1, 3]); // ends the round (her Nimble d4: no Perk of his); the next ground: the market stalls again
  assert.equal(lastRoll().perkRaise, "", "only the roller's own Perk");
  await rollAs(BEN, dracula, { trait: "brawn", second: "monster", chase: true }, [3, 3]);
  assert.deepEqual([lastRoll().traitDie, lastRoll().perkRaise], [6, ""]);
  await asUser(GM, () => currentHud().runAction("toggleHunt"));
  await settle();
  await asUser(GM, () => dracula.update({ "system.perk": "hypnoticEyes" }));
});

test("R1: a rescue whose Suspicion brings the Limit frees the captives first; they join the final flight", async () => {
  await newRaid();
  await op(GM, OPS.lockupSet, { actorId: dracula.id, captured: true });
  await adjust(view().limit - 1); // one below the Limit
  // Sly d10 and the Monster at the lock-up: 6 + 7 = 13 against 10, beaten; the Monster shows: +2, the Limit
  await rollAs(ANN, witch, { trait: "sly", second: "monster", lockup: true }, [6, 7, 1]); // then the flight's ground
  const card = lastRoll();
  assert.deepEqual([card.lockup, card.rescued, card.suspicion, card.freedNames], ["rescue", true, 2, ["Dracula"]]);
  assert.deepEqual([view().value, view().hunt, view().huntCause], [view().limit, true, "limit"]);
  assert.equal(dracula.system.status, "active", "freed first");
  assert.deepEqual(chase().members.map((m) => m.name), ["A Witch", "Dracula"], "and he flees with her");
  await asUser(GM, () => currentHud().runAction("toggleHunt"));
  await settle();
});

test("R4: the way out is rolled once a Turn: a second try that Turn is refused, until Next Turn; the switch off allows it", async () => {
  await newRaid();
  // the Witch rolls the way out: Trouble, caught (a local chase the Storyteller calls off)
  await rollAs(ANN, witch, { trait: "sly", second: "mask", wayOut: true }, [1, 1, 1]);
  assert.equal(raid().wayOutTurn, 1);
  await op(GM, OPS.chaseEnd, { outcome: "dropped" });
  await settle();
  assert.match(lastCard(CARD.chase).content, /called the chase off: it raises no Suspicion/);
  // Dracula tries it the same Turn: refused, with the dialog saying why
  let content = "";
  dialogResponders.push((options) => { content = options.content; return press("roll", { trait: "sly", second: "mask", wayOut: true })(options); }, press("cancel"));
  const before = log.warnings.length;
  await asUser(BEN, () => api.roll(dracula, { trait: "sly" }));
  await settle();
  assert.match(content, /The way out has been rolled this Turn/);
  assert.ok(log.warnings.slice(before).some((x) => x.includes("already been rolled this Turn")));
  // Next Turn: it can be rolled again
  await asUser(GM, () => currentHud().runAction("nextTurn"));
  await settle();
  await rollAs(BEN, dracula, { trait: "sly", second: "mask", wayOut: true }, [6, 4]);
  assert.equal(lastRoll().wayOutBeaten, true);
  assert.equal(raid().partyOut?.how, "wayOut");
  // the switch off: a second try the same Turn is allowed
  await setSetting(SETTINGS.wayOutOncePerTurn, false);
  await newRaid();
  await rollAs(ANN, witch, { trait: "sly", second: "mask", wayOut: true }, [1, 1, 1]);
  await op(GM, OPS.chaseEnd, { outcome: "dropped" });
  await settle();
  await rollAs(BEN, dracula, { trait: "sly", second: "mask", wayOut: true }, [6, 4]);
  assert.equal(lastRoll().wayOutBeaten, true);
  await setSetting(SETTINGS.wayOutOncePerTurn, true);
});

test("D1 by hand: with Suspicion by hand, the card that ends the chase offers Apply Suspicion for its one rise", async () => {
  await setSetting(SETTINGS.autoSuspicion, false);
  await newRaid();
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, watched: true }, [1, 1, 1]); // caught (its +1 by hand); the crowded square
  await rollAs(ANN, witch, { trait: "sly", second: "monster", chase: true }, [2, 9, 1]); // the Monster shows
  await rollAs(ANN, witch, { trait: "sly", second: "mask", chase: true }, [6, 4, 1]);
  await rollAs(ANN, witch, { trait: "sly", second: "mask", chase: true }, [6, 4]); // round 3 (Rowan: Sly d8): clear
  assert.equal(chase().outcome, "escaped");
  assert.equal(view().value, 0);
  const end = lastCard(CARD.chase);
  assert.match(end.content, /One chase, one rise: Suspicion \+2 \(the Monster shows\)/);
  assert.match(end.content, /not on the track yet/);
  assert.deepEqual(buttonLabels(end, GM), ["Apply Suspicion"]);
  clickButton(renderMessage(end, GM), "Apply Suspicion", GM);
  await settle();
  assert.equal(view().value, 2);
  await setSetting(SETTINGS.autoSuspicion, true);
});

test("F25: the hunt by hand ends a local chase: its rise so far goes on the track, then the runners join the flight", async () => {
  await newRaid();
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, watched: true }, [1, 1, 1]); // caught (+1); the crowded square
  await rollAs(ANN, witch, { trait: "sly", second: "monster", chase: true }, [2, 9, 1]); // the Monster shows: +2 waits
  const local = chase();
  assert.equal(view().value, 1);
  diceQueue.push(2); // the flight's ground
  await asUser(GM, () => currentHud().runAction("toggleHunt"));
  await settle();
  assert.equal(view().value, 3, "its rise so far, though the hunt is on");
  assert.deepEqual([raid().endedChase.id, raid().endedChase.outcome, chase().kind], [local.id, "ended", "final"]);
  assert.deepEqual(chase().members.map((m) => m.name), ["A Witch", "Dracula"]);
  const end = cards(CARD.chase).find((m) => cardOf(m).chaseId === local.id && cardOf(m).outcome === "ended");
  assert.match(end.content, /its rise so far goes on the track/);
  assert.match(end.content, /One chase, one rise: Suspicion \+2/);
  await asUser(GM, () => currentHud().runAction("toggleHunt"));
  await settle();
});

test("the review's session left no errors, no missing words and no unanswered dialogs", () => {
  assert.deepEqual(log.errors, []);
  assert.deepEqual(log.missingI18n, []);
  assert.equal(dialogResponders.length, 0);
  assert.equal(diceQueue.length, 0);
});
