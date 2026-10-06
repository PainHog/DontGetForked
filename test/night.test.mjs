/**
 * Integration smoke test — slice 2 at the table, on the fake Foundry
 * (tools/fake-foundry.mjs): a Storyteller (GM) and two players, the real entry
 * module, the real dialogs (scripted answers), cards, Raid HUD and chase
 * tracker, with scripted dice. One night in order: the shopping list, Tell
 * checks, a group check that raises Suspicion once, a caught Entity's local
 * chase through to capture, slipping free and a rescue, carried furniture, the
 * final flight at the Limit through to escape and the year; then a new raid
 * forked; then every switch off; and players never write the raid or the chase.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  installFoundry, asUser, settle, diceQueue, dialogResponders, fakeForm, renderMessage, clickButton, buttonLabels, log,
} from "../tools/fake-foundry.mjs";

const { game, Hooks } = installFoundry({
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
const { SYSTEM_ID, SETTINGS, OPS, HOOKS, CARD } = await import("../module/contracts.mjs");
const { DGF } = await import("../module/config.mjs");
const { openHud, currentHud } = await import("../module/apps/raid-hud.mjs");
const { currentChaseTracker, openChaseTracker } = await import("../module/apps/chase-tracker.mjs");
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

/** A scripted DialogV2 answer: press `action` with these form values. */
const press = (action, values = {}) => (options) => {
  const b = options.buttons?.find((x) => x.action === action);
  if (!b) throw new Error(`dialog "${options.window?.title}" has no ${action} button`);
  return b.callback ? b.callback({}, { form: fakeForm(values) }, null) : action;
};
/** Roll as a user through the roll dialog: `values` are the dialog's answers, `faces` the dice that follow. */
async function rollAs(user, actor, values, faces, { opts = {} } = {}) {
  diceQueue.push(...faces);
  dialogResponders.push(press("roll", values));
  const result = await asUser(user, () => api.roll(actor, { trait: values.trait, ...opts }));
  await settle();
  return result;
}
/** A roll the plan refuses: the dialog opens again and the player cancels. */
async function refusedRoll(user, actor, values) {
  dialogResponders.push(press("roll", values), press("cancel"));
  const before = log.warnings.length;
  const result = await asUser(user, () => api.roll(actor, { trait: values.trait }));
  await settle();
  return { result, warnings: log.warnings.slice(before) };
}
const fired = { chaseChanged: 0, chaseEnded: 0, yearDecided: 0 };
for (const k of Object.keys(fired)) Hooks.on(HOOKS[k], () => { fired[k]++; });

let witch, dracula;
const ent = (a) => `entity.${a.id}`;

test("boot: the slice-2 switches are registered and on; the Storyteller's HUD has the new buttons", async () => {
  for (const k of ["autoChase", "autoLockup", "autoGroupChecks", "autoYear", "autoFurniture", "resetOnNewRaid", "chaseTracker"]) {
    assert.equal(game.settings.get(SYSTEM_ID, SETTINGS[k]), true, `${k} on`);
  }
  witch = await asUser(GM, () => api.createEntity("witch", { ownerId: ANN.id }));
  dracula = await asUser(GM, () => api.createEntity("dracula", { ownerId: BEN.id }));
  await settle();
  const hud = await asUser(GM, () => openHud());
  for (const a of ["groupCheck", "tellCheck", "openChase", "shoppingList", "endRaid"]) assert.match(hud.renderedParts.body, new RegExp(`data-action="${a}"`));
  const annHud = await asUser(ANN, () => openHud());
  assert.doesNotMatch(annHud.renderedParts.body, /data-action="tellCheck"/);
  assert.equal(view().lockup, 10);
  assert.equal(raid().chase, null);
  assert.deepEqual(log.errors, []);
});

test("the shopping list: rolled on the d66 table (a d6 for the kind, a d6 for the item); everyone sees it", async () => {
  diceQueue.push(1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6, 6); // 14d6: five items, then spares
  dialogResponders.push(press("roll", { essentials: 1 }));
  await asUser(GM, () => currentHud().runAction("shoppingList"));
  await settle();
  const list = raid().list;
  assert.deepEqual(list.map((i) => i.name), ["a wheel of strong cheese", "a pot of nightshade (purely ornamental)", "a cookbook “for the guests”", "a lace tablecloth", "a coil of rope"]);
  assert.deepEqual(list.map((i) => i.essential), [true, false, false, false, false]);
  assert.deepEqual(list.map((i) => i.duty), ["cook", "gardener", "librarian", "butler", "handyman"]);
  assert.match(lastMessage().content, /The shopping list/);
  assert.match(lastMessage().content, /a coil of rope/);
  const annHud = await asUser(ANN, () => openHud());
  assert.match(annHud.renderedParts.body, /The shopping list \(5\)/);
  assert.equal((await op(ANN, OPS.raidList, { action: "clear" })).reason, "gmOnly");
});

test("a Tell check: a d6, 4–6 goes off; Familiar's Warning needs a second 4–6; whose among those arriving; once per location", async () => {
  diceQueue.push(6, 5, 2); // the check, the Witch's second d6, then whose (of two: Dracula)
  dialogResponders.push(press("ok", { [ent(witch)]: true, [ent(dracula)]: true, place: "The baker's" }));
  await asUser(GM, () => currentHud().runAction("tellCheck"));
  await settle();
  let card = cardOf(lastMessage());
  assert.equal(card.kind, CARD.tell);
  assert.equal(card.goesOff, true);
  assert.equal(card.actorName, "Dracula");
  assert.equal(card.tellName, "No Reflection");
  assert.equal(card.applied, true);
  assert.equal(view().value, 1, "a Tell goes off: Suspicion +1");
  assert.match(lastMessage().content, /No Reflection/);
  assert.match(lastMessage().content, /Familiar/);
  assert.deepEqual(buttonLabels(lastMessage(), GM), ["Cancel Suspicion"]);
  assert.deepEqual(buttonLabels(lastMessage(), ANN), []);

  // the same watched location again: refused
  const r = await op(GM, OPS.raidTell, { arriving: [witch.id], place: "the  baker's" });
  assert.deepEqual(r, { ok: false, reason: "alreadyChecked" });
  // the way out: the d6 says yes, but the cat warns her
  diceQueue.push(5, 2);
  await op(GM, OPS.raidTell, { arriving: [witch.id, dracula.id], place: "the way out" });
  await settle();
  card = cardOf(lastMessage());
  assert.equal(card.goesOff, false);
  assert.equal(view().value, 1);
  assert.match(lastMessage().content, /Nothing gives them away/);
  assert.equal((await op(BEN, OPS.raidTell, { arriving: [dracula.id], place: "x" })).reason, "gmOnly");
});

test("a group check: both roll together, Suspicion rises once (by the biggest trigger); the one caught flees in a local chase", async () => {
  await asUser(BEN, () => dracula.update({ "system.carried": [{ name: "a pair of candlesticks" }] }));
  dialogResponders.push(press("ok", { [ent(witch)]: true, [ent(dracula)]: true, place: "the crowded shop floor" }));
  await asUser(GM, () => currentHud().runAction("groupCheck"));
  await settle();
  const g = raid().group;
  assert.equal(g.open, true);
  assert.equal(g.label, "the crowded shop floor");
  assert.match(lastMessage().content, /roll together/);
  const hud = await asUser(BEN, () => openHud());
  assert.match(hud.renderedParts.body, /Group check: the crowded shop floor/);

  // the Witch: the Monster shows (+2), a Success
  await rollAs(ANN, witch, { trait: "sly", second: "monster", difficulty: 8, watched: true, group: true }, [3, 9]);
  const w = cardOf(lastMessage());
  assert.equal(w.groupId, g.id);
  assert.equal(w.eventId, `group:${g.id}`);
  assert.equal(w.suspicion, 2);
  assert.equal(view().value, 3);
  assert.equal(raid().group.open, true, "waiting for Dracula");
  // Dracula: Trouble at the watched obstacle (+1, caught). The group rose by 2 already: no more.
  await rollAs(BEN, dracula, { trait: "sly", second: "mask", difficulty: 8, watched: true, group: true }, [1, 2, 1]); // then the ground: 1
  const d = cardOf(lastMessage(), 0);
  const dm = game.messages.find((m) => cardOf(m)?.actorId === dracula.id && cardOf(m)?.groupId === g.id);
  assert.equal(cardOf(dm).caught, true);
  assert.equal(cardOf(dm).suspicion, 1);
  assert.equal(view().value, 3, "one rise for the whole group check, by the biggest trigger");
  assert.equal(R.eventsOf(raid()).find((e) => e.eventId === `group:${g.id}`).amount, 2);
  assert.equal(raid().group.open, false, "everyone has rolled");
  assert.ok(d);

  // the local chase: Dracula alone, Lead 1 (escape 4), the mob 10 + half of 3 = 11, the crowded square
  const c = chase();
  assert.equal(c.kind, "local");
  assert.deepEqual(c.members.map((m) => m.name), ["Dracula"]);
  assert.equal(c.lead, 1);
  assert.equal(c.escape, 4);
  assert.equal(c.mob, 11);
  assert.deepEqual(c.ground.traits, ["sly", "charm"]);
  assert.ok(cardOf(dm).chaseStarted, "the caught card knows its chase started");
  assert.deepEqual(buttonLabels(dm, GM), ["Cancel Suspicion"], "no Start button: it started by itself");
  const chaseCards = cards(CARD.chase);
  assert.ok(chaseCards.some((m) => cardOf(m).event === "start"));
  assert.ok(chaseCards.some((m) => cardOf(m).event === "ground"));
  assert.match(lastCard(CARD.chase).content, /The crowded square/);
  assert.match(lastCard(CARD.chase).content, /Difficulty 11/);
  assert.match(lastCard(CARD.chase).content, /Weakness: Dracula/);
  assert.ok(fired.chaseChanged > 0);
  // everyone's tracker opened; only Ben gets the Roll button for Dracula, only the GM the controls
  const benT = asUser(BEN, () => currentChaseTracker());
  assert.ok(benT?.rendered, "Ben's tracker opened by itself");
  await asUser(BEN, () => benT.render());
  assert.match(benT.renderedParts.body, /data-action="rollFor" data-actor-id="[^"]+"/);
  assert.doesNotMatch(benT.renderedParts.body, /data-action="rollGround"/);
  const annT = await asUser(ANN, () => openChaseTracker());
  assert.doesNotMatch(annT.renderedParts.body, /data-action="rollFor"/, "Ann doesn't own Dracula");
  const gmT = await asUser(GM, () => openChaseTracker());
  assert.match(gmT.renderedParts.body, /data-action="rollGround"/);
  assert.match(gmT.renderedParts.body, /data-lead="1" data-escape="4"/);
});

test("the local chase through to capture: the ground each round, the Weakness, the Lead; cornered = captured, the loot taken", async () => {
  // a chase roll off the ground is refused
  const off = await refusedRoll(BEN, dracula, { trait: "nimble", second: "mask", chase: true });
  assert.ok(off.warnings.some((w) => w.includes("the ground lets you roll Sly or Charm")));
  // round 1: Charm d12, one size smaller (Garlic: Always) → d10; 6 + 5 = 11 against 11: Success, Lead 2; the next ground: 3
  await rollAs(BEN, dracula, { trait: "charm", second: "mask", chase: true }, [6, 5, 3]);
  let card = cardOf(game.messages.filter((m) => cardOf(m)?.kind === CARD.roll).at(-1));
  assert.equal(card.traitDie, 10);
  assert.ok(card.downParts.some((p) => p.key === "weakness"));
  assert.equal(card.chaseRound, 1);
  assert.equal(card.leadMove, 1);
  assert.equal(chase().lead, 2);
  assert.equal(chase().round, 2);
  assert.deepEqual(chase().ground.traits, ["brawn", "nimble"]);
  assert.ok(cards(CARD.chase).some((m) => cardOf(m).event === "round" && cardOf(m).move === 1));
  // round 2: Nimble d10 → d8: Trouble: Lead 1, Suspicion +1 (a local chase still raises it); the mob for round 3 is 12
  await rollAs(BEN, dracula, { trait: "nimble", second: "mask", chase: true }, [1, 1, 6]);
  assert.equal(chase().lead, 1);
  assert.equal(view().value, 4);
  assert.equal(chase().mob, 12, "checked each round: 10 + half of 4");
  // round 3: Trouble again: cornered → captured; the town takes back the candlesticks
  await rollAs(BEN, dracula, { trait: "brawn", second: "mask", chase: true }, [1, 2]);
  assert.equal(chase().outcome, "cornered");
  assert.equal(chase().lead, 0);
  assert.equal(chase().history.length, 3);
  assert.equal(dracula.system.status, "captured");
  assert.equal(dracula.system.capturedTurn, 1);
  assert.deepEqual(dracula.system.carried, []);
  assert.equal(view().value, 5);
  const lock = lastCard(CARD.chase);
  assert.equal(cardOf(lock).event, "captured");
  assert.match(lock.content, /Dracula is captured/);
  assert.match(lock.content, /a pair of candlesticks/);
  assert.ok(fired.chaseEnded >= 1);
  const hud = await asUser(ANN, () => openHud());
  assert.match(hud.renderedParts.body, /The lock-up \(Difficulty 10\)/);
  assert.match(hud.renderedParts.body, /Dracula/);
  // a captive's one roll is slipping free
  const plain = await refusedRoll(BEN, dracula, { trait: "sly", second: "mask", difficulty: 8 });
  assert.ok(plain.warnings.some((w) => w.includes("Held at the lock-up")));
});

test("slipping free: from the Turn after the capture, once per Turn; Trouble raises Suspicion but starts no chase", async () => {
  const soon = await refusedRoll(BEN, dracula, { trait: "sly", second: "mask", lockup: true });
  assert.ok(soon.warnings.some((w) => w.includes("Turn after its capture")));
  await asUser(GM, () => currentHud().runAction("nextTurn"));
  await settle();
  assert.equal(view().turn, 2);
  // Brawn the loud way, Trouble: Suspicion +1 (one roll, one rise), still held, no chase
  await rollAs(BEN, dracula, { trait: "brawn", second: "mask", lockup: true }, [1, 1]);
  const card = cardOf(lastMessage());
  assert.equal(card.lockup, "slip");
  assert.equal(card.loud, true);
  assert.equal(card.difficulty, 10);
  assert.equal(card.caught, false);
  assert.equal(card.suspicion, 1);
  assert.deepEqual(card.costs, []);
  assert.match(lastMessage().content, /Still held: Suspicion rises, but no chase starts/);
  assert.equal(view().value, 6);
  assert.equal(dracula.system.status, "captured");
  assert.equal(dracula.system.slipTurn, 2);
  assert.ok(!chase() || chase().outcome, "no chase");
  const again = await refusedRoll(BEN, dracula, { trait: "sly", second: "mask", lockup: true });
  assert.ok(again.warnings.some((w) => w.includes("once per Turn")));
});

test("a rescue: the lock-up (Sly, always watched) beaten frees every captive", async () => {
  await rollAs(ANN, witch, { trait: "sly", second: "mask", lockup: true }, [6, 4]); // 10 against 10
  const card = cardOf(lastMessage());
  assert.equal(card.lockup, "rescue");
  assert.equal(card.watched, true);
  assert.equal(card.rescued, true);
  assert.deepEqual(card.freedNames, ["Dracula"]);
  assert.match(lastMessage().content, /every captive there is free/);
  assert.equal(dracula.system.status, "active");
  assert.equal(dracula.system.capturedTurn, 0);
  const hud = await asUser(ANN, () => openHud());
  assert.doesNotMatch(hud.renderedParts.body, /The lock-up \(Difficulty/);
});

test("furniture (B2): its extra obstacle is 2 harder; carried, it raises Suspicion at the end of each Turn", async () => {
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 10, furniture: true }, [6, 6]);
  const card = cardOf(lastMessage());
  assert.equal(card.difficulty, 12);
  assert.match(lastMessage().content, /2 harder \(the furniture/);
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": true }));
  const v = view().value;
  await asUser(GM, () => currentHud().runAction("nextTurn"));
  await settle();
  assert.equal(view().value, v + 1);
  assert.equal(R.eventsOf(raid())[0].eventId, "furniture:2");
  assert.match(currentHud().renderedParts.body, /carrying furniture/);
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": false }));
  await asUser(GM, () => currentHud().runAction("nextTurn"));
  await settle();
  assert.equal(view().value, v + 1, "nothing carried, nothing raised");
  assert.equal(view().turn, 4);
});

test("the final flight at the Limit: everyone free flees together; the majority rule; overdraw brings the Weakness; escape; then the year", async () => {
  await asUser(ANN, () => witch.update({ "system.carried": [{ name: "A wheel of strong cheese" }, { name: "a coil of rope" }], "system.charges.value": 0 }));
  diceQueue.push(2); // the first round's ground: back alleys (Nimble, Sly)
  for (let v = view().value; v < view().limit; v++) await op(GM, OPS.raidAdjust, { delta: 1 });
  await settle();
  assert.equal(view().hunt, true);
  assert.equal(view().huntCause, "limit");
  let c = chase();
  assert.equal(c.kind, "final");
  assert.equal(c.cause, "limit");
  assert.deepEqual(c.members.map((m) => m.name), ["A Witch", "Dracula"]);
  assert.equal(c.lead, 2);
  assert.equal(c.escape, 6);
  assert.equal(c.mob, DGF.labels.standard.finalMob);
  assert.deepEqual(c.ground.traits, ["nimble", "sly"]);
  assert.ok(cards(CARD.chase).some((m) => cardOf(m).event === "start" && cardOf(m).chaseKind === "final"));

  const hedge = `ability:${witch.id}:signature`;
  // round 1: the Witch overdraws Hedge Spell (no charges: once the hunt is on, it costs her Weakness); Sly d10 → d12; a Critical
  await rollAs(ANN, witch, { trait: "sly", second: "monster", chase: true, [hedge]: true }, [6, 6]);
  let card = cardOf(lastMessage());
  assert.equal(card.traitDie, 12);
  assert.equal(card.critical, true);
  assert.equal(card.suspicion, 0, "Suspicion has stopped");
  assert.equal(witch.system.weaknessInPlay, true, "from her next roll to the end of the flight");
  assert.equal(chase().round, 1, "waiting for Dracula");
  // Dracula: Nimble d10 → d8 (Garlic), Monster d10: 11, a Success. Majority: 3 Successes, no Trouble → +1
  await rollAs(BEN, dracula, { trait: "nimble", second: "monster", chase: true }, [5, 6, 2]);
  assert.equal(chase().lead, 3);
  assert.equal(chase().round, 2);
  assert.ok(cards(CARD.chase).some((m) => cardOf(m).event === "round" && cardOf(m).chaseKind === "final" && cardOf(m).move === 1));
  // round 2: the overdraw's Weakness: Sly d10 → d8
  await rollAs(ANN, witch, { trait: "sly", second: "monster", chase: true }, [6, 5]);
  card = cardOf(lastMessage());
  assert.equal(card.traitDie, 8);
  await rollAs(BEN, dracula, { trait: "nimble", second: "monster", chase: true }, [5, 6, 2]);
  assert.equal(chase().lead, 4);
  // rounds 3 and 4: both Succeed; the Lead reaches 6: home with the goods
  await rollAs(ANN, witch, { trait: "sly", second: "monster", chase: true }, [6, 5]);
  await rollAs(BEN, dracula, { trait: "nimble", second: "monster", chase: true }, [5, 6, 2]);
  await rollAs(ANN, witch, { trait: "sly", second: "monster", chase: true }, [6, 5]);
  await rollAs(BEN, dracula, { trait: "nimble", second: "monster", chase: true }, [5, 6]);
  c = chase();
  assert.equal(c.outcome, "escaped");
  assert.equal(c.lead, 6);
  assert.equal(witch.system.weaknessInPlay, false, "the flight is over");
  const home = cards(CARD.raid).at(-1);
  assert.equal(cardOf(home).event, "home");
  assert.match(home.content, /outran the mob/);
  assert.deepEqual(buttonLabels(home, GM), ["How the year went"]);
  assert.deepEqual(buttonLabels(home, ANN), []);

  // how the year went: the form starts from the list and what the Witch carries; the Storyteller ticks two more
  dialogResponders.push((options) => {
    const html = options.content;
    assert.match(html, /name="home\.0" checked/, "the cheese the Witch carries looks home");
    assert.match(html, /name="home\.4" checked/, "and the rope");
    assert.doesNotMatch(html, /name="home\.2" checked/);
    return press("ok", { "home.1": true, "home.3": true })(options);
  });
  clickButton(renderMessage(home, GM), "How the year went", GM);
  await settle();
  const year = cardOf(lastMessage());
  assert.equal(year.kind, CARD.year);
  assert.equal(year.result, "win");
  assert.deepEqual(year.lines, [DGF.epilogue.year.win, DGF.epilogue.missing.librarian]);
  assert.match(lastMessage().content, /How the year went: Win/);
  assert.match(lastMessage().content, /Full larders/);
  assert.match(lastMessage().content, /Nobody knows what the town is saying/);
  assert.equal(view().over.result, "win");
  assert.equal(fired.yearDecided, 1);
  assert.match((await asUser(ANN, () => openHud())).renderedParts.body, /The raid is over: Win/);
  assert.deepEqual(await op(GM, OPS.raidEnd, { list: raid().list.map((i) => ({ ...i, home: true })) }), { ok: false, reason: "raidOver" });
});

test("a new raid resets the Entities; the final flight cornered: forked, and the year card posts itself", async () => {
  await op(GM, OPS.raidReset, { difficulty: "standard" });
  await settle();
  assert.equal(raid().chase, null);
  assert.deepEqual(raid().list, []);
  assert.equal(witch.system.charges.value, 3, "a new year: charges refill");
  diceQueue.push(1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6, 6);
  await op(GM, OPS.raidList, { action: "roll", essentials: 2 });
  await settle();
  assert.deepEqual(raid().list.map((i) => i.essential), [true, true, false, false, false]);
  assert.equal((await op(GM, OPS.raidList, { action: "roll", essentials: 3 })).reason, "badEssentials");

  diceQueue.push(4); // the rooftops (Nimble, Wits)
  await asUser(GM, () => currentHud().runAction("toggleHunt"));
  await settle();
  assert.equal(chase().kind, "final");
  assert.equal(chase().cause, "manual");
  // two rounds of Trouble for both: Lead 2 → 1 → 0
  await rollAs(ANN, witch, { trait: "wits", second: "monster", chase: true }, [1, 2]);
  await rollAs(BEN, dracula, { trait: "nimble", second: "monster", chase: true }, [1, 1, 4]);
  assert.equal(chase().lead, 1);
  await rollAs(ANN, witch, { trait: "wits", second: "monster", chase: true }, [1, 2]);
  await rollAs(BEN, dracula, { trait: "nimble", second: "monster", chase: true }, [1, 1]);
  assert.equal(chase().outcome, "cornered");
  assert.match(cards(CARD.chase).at(-1).content, /Forked: the monsters are killed/);
  const year = cardOf(lastMessage());
  assert.equal(year.kind, CARD.year);
  assert.equal(year.result, "forked");
  assert.equal(year.lines[0], DGF.epilogue.year.forked);
  assert.equal(year.lines.length, 1 + 5, "every kind on the list went missing");
  assert.equal(view().over.result, "forked");
  assert.equal(dracula.system.status, "active", "forked is not captured");
});

test("every slice-2 automation can be switched off", async () => {
  // a new raid without the reset: charges stay where they were
  await asUser(ANN, () => witch.update({ "system.charges.value": 1 }));
  await setSetting(SETTINGS.resetOnNewRaid, false);
  await op(GM, OPS.raidReset, { difficulty: "easy" });
  await settle();
  assert.equal(witch.system.charges.value, 1);
  await setSetting(SETTINGS.resetOnNewRaid, true);

  // chases and the lock-up by hand
  await setSetting(SETTINGS.autoChase, false);
  await setSetting(SETTINGS.autoLockup, false);
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, watched: true }, [1, 1]);
  const caught = lastMessage();
  assert.equal(cardOf(caught).caught, true);
  assert.equal(raid().chase, null, "no chase starts by itself");
  assert.deepEqual(buttonLabels(caught, GM), ["Cancel Suspicion", "Start the local chase"]);
  assert.deepEqual(buttonLabels(caught, ANN), []);
  clickButton(renderMessage(caught, GM), "Start the local chase", GM);
  await settle();
  assert.equal(chase().kind, "local");
  assert.equal(chase().ground, null, "the Storyteller rolls the ground");
  assert.deepEqual(buttonLabels(caught, GM), ["Cancel Suspicion"]);
  const off = await refusedRoll(ANN, witch, { trait: "sly", second: "mask", chase: true });
  assert.ok(off.warnings.some((w) => w.includes("isn't rolled yet")));
  const gmT = await asUser(GM, () => openChaseTracker());
  diceQueue.push(1);
  await asUser(GM, () => gmT.runAction("rollGround"));
  await settle();
  assert.deepEqual(chase().ground.traits, ["sly", "charm"]);
  await rollAs(ANN, witch, { trait: "sly", second: "mask", chase: true }, [1, 1]);
  assert.equal(chase().lead, 1, "the Lead waits for the Storyteller");
  await asUser(GM, () => gmT.runAction("resolveRound"));
  await settle();
  assert.equal(chase().outcome, "cornered");
  assert.equal(witch.system.status, "active", "the lock-up by hand: not captured");
  // the Storyteller captures by hand from the rules' side, then frees her from the HUD
  await op(GM, OPS.lockupSet, { actorId: witch.id, captured: true });
  await settle();
  assert.equal(witch.system.status, "captured");
  await asUser(GM, () => currentHud().runAction("freeCaptive", { actorId: witch.id }));
  await settle();
  assert.equal(witch.system.status, "active");
  await setSetting(SETTINGS.autoLockup, true);

  // the Storyteller's hand on the tracker: Lead ±1, escaped, members
  await asUser(GM, () => gmT.runAction("startFlight")); // the final flight by hand (the button shows during the hunt)
  await settle();
  assert.equal(chase().kind, "final");
  assert.equal(chase().ground, null, "the automation is off: nobody rolls the ground but the Storyteller");
  assert.equal((await op(GM, OPS.chaseStart, { final: true })).reason, "chaseRunning");
  await asUser(GM, () => gmT.runAction("leadUp"));
  await settle();
  assert.equal(chase().lead, 3);
  await asUser(GM, () => gmT.runAction("removeMember", { actorId: dracula.id }));
  await settle();
  assert.deepEqual(chase().members.map((m) => m.name), ["A Witch"]);
  await asUser(GM, () => gmT.runAction("addMember", { actorId: dracula.id }));
  await settle();
  assert.equal(chase().members.length, 2);
  await asUser(GM, () => gmT.runAction("dropChase"));
  await settle();
  assert.equal(chase().outcome, "dropped");
  await setSetting(SETTINGS.autoChase, true);

  // no group checks: every roll stands alone
  await setSetting(SETTINGS.autoGroupChecks, false);
  assert.equal((await op(GM, OPS.raidGroup, { action: "open", members: [witch.id, dracula.id] })).reason, "groupChecksOff");
  const hud = await asUser(GM, () => openHud());
  assert.doesNotMatch(hud.renderedParts.body, /data-action="groupCheck"/);
  await setSetting(SETTINGS.autoGroupChecks, true);

  // furniture's Suspicion by hand
  await setSetting(SETTINGS.autoFurniture, false);
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": true }));
  let v = view().value;
  await asUser(GM, () => currentHud().runAction("nextTurn"));
  await settle();
  assert.equal(view().value, v);
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": false }));
  await setSetting(SETTINGS.autoFurniture, true);

  // no year card by itself, no tracker opening by itself
  await setSetting(SETTINGS.autoYear, false);
  await setSetting(SETTINGS.chaseTracker, false);
  const benT = asUser(BEN, () => currentChaseTracker());
  await asUser(BEN, () => benT.close());
  const years = cards(CARD.year).length;
  diceQueue.push(3);
  await op(GM, OPS.chaseStart, { final: true });
  await settle();
  assert.equal(asUser(BEN, () => currentChaseTracker()).rendered, false, "Ben's tracker stays closed");
  await op(GM, OPS.chaseEnd, { outcome: "cornered" });
  await settle();
  assert.equal(cards(CARD.year).length, years);
  assert.equal(view().over, null);
  await setSetting(SETTINGS.autoYear, true);
  await setSetting(SETTINGS.chaseTracker, true);
});

test("players can't write the raid or the chase: every chase, lock-up and check operation is the Storyteller's", async () => {
  const before = JSON.stringify(game.settings.get(SYSTEM_ID, SETTINGS.raidState));
  for (const [name, args] of [
    [OPS.chaseStart, { final: true }], [OPS.chaseGround, {}], [OPS.chaseResolve, {}], [OPS.chaseLead, { delta: 1 }],
    [OPS.chaseEnd, { outcome: "escaped" }], [OPS.chaseMember, { actorId: witch.id }], [OPS.lockupSet, { actorId: witch.id, captured: false }],
    [OPS.raidGroup, { action: "open", members: [witch.id, dracula.id] }], [OPS.raidTell, { arriving: [witch.id] }],
    [OPS.raidList, { action: "clear" }], [OPS.raidEnd, { list: [] }],
  ]) assert.deepEqual(await op(ANN, name, args), { ok: false, reason: "gmOnly" }, `${name} refused`);
  await assert.rejects(asUser(BEN, () => game.settings.set(SYSTEM_ID, SETTINGS.raidState, { chase: { id: "mine", members: [] } })), /lacks permission/);
  const t = await asUser(ANN, () => openChaseTracker());
  await asUser(ANN, () => t.runAction("leadUp"));
  await settle();
  assert.equal(JSON.stringify(game.settings.get(SYSTEM_ID, SETTINGS.raidState)), before);
  // a roll op only reads a real roll card of this raid
  const raidCard = cards(CARD.raid).at(-1);
  assert.equal((await op(ANN, OPS.raidRoll, { messageId: raidCard.id })).reason, "notARoll");
  const oldRoll = game.messages.find((m) => cardOf(m)?.kind === CARD.roll);
  assert.equal((await op(ANN, OPS.raidRoll, { messageId: oldRoll.id })).reason, "otherRaid");
  // a captive can't free itself on the sheet's behalf of another: Ann can't touch Dracula
  await assert.rejects(asUser(ANN, () => dracula.update({ "system.status": "captured" })), /lacks permission/);
});

test("the night left no errors, no missing words and no unanswered dialogs", () => {
  assert.deepEqual(log.errors, []);
  assert.deepEqual(log.missingI18n, []);
  assert.equal(dialogResponders.length, 0);
  assert.equal(diceQueue.length, 0);
});
