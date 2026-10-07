/**
 * V21 (rulebook Chapter 3, Cost): "A dropped item (drop yours any time) falls where you are; picking it up
 * costs your next action." And V22: two list items sharing a place are one location (both come home with
 * whoever carries them). Pure raid logic, then the table on the fake Foundry: a Storyteller and two players.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  installFoundry, asUser, settle, diceQueue, dialogResponders, fakeForm, renderMessage, clickButton, log,
} from "../tools/fake-foundry.mjs";
import { newRaid, normalizeRaid, dropLoot, pickUpLoot, isFurnitureRetake } from "../module/logic/raid.mjs";
import { newChase, endChase, inLocalChase } from "../module/logic/chase.mjs";
import { homeFromCarried, yearFromList } from "../module/logic/year.mjs";

/* ------------------------------------------------------------ the rules -- */

test("V21: a dropped item waits where it fell, in the raid's state, until someone picks it up", () => {
  let s = newRaid({ id: "r" });
  assert.deepEqual(s.dropped, []);
  s = dropLoot(s, { id: "d1", name: "a jar of honey", by: "A Witch" });
  assert.deepEqual(s.dropped.map((d) => [d.id, d.name, d.by, d.turn]), [["d1", "a jar of honey", "A Witch", 1]]);
  const { state, item } = pickUpLoot(s, "d1");
  assert.equal(item.name, "a jar of honey");
  assert.deepEqual(state.dropped, []);
  assert.equal(pickUpLoot(state, "d1").item, null, "picked up once");
  assert.deepEqual(normalizeRaid({ raidId: "old" }).dropped, [], "an older raid has nothing dropped");
});

test("V24: no dropping in a local chase: its members from the moment they're caught until it ends; a final flight is no local chase", () => {
  const local = newChase({ id: "c", kind: "local", members: [{ actorId: "w", name: "A Witch", perk: "", timing: "soon" }] });
  assert.equal(inLocalChase(local, "w"), true);
  assert.equal(inLocalChase(local, "d"), false, "not in it");
  assert.equal(inLocalChase(endChase(local, "escaped"), "w"), false, "over");
  const flight = newChase({ id: "f", kind: "final", members: [{ actorId: "w", name: "A Witch", perk: "", timing: "soon" }] });
  assert.equal(inLocalChase(flight, "w"), false);
  assert.equal(inLocalChase(null, "w"), false);
});

test("V26: taking a set-down piece back up is an action; the first take, or joining a carrier, is free", () => {
  assert.equal(isFurnitureRetake({ furniture: "inPlay", othersCarrying: 0 }), true, "taken earlier, set down, taken back up");
  assert.equal(isFurnitureRetake({ furniture: "", othersCarrying: 0 }), false, "the first take is free");
  assert.equal(isFurnitureRetake({ furniture: "inPlay", othersCarrying: 1 }), false, "joining whoever carries it");
  assert.equal(isFurnitureRetake({ furniture: "out", othersCarrying: 0 }), false);
  assert.equal(isFurnitureRetake({ furniture: "lost", othersCarrying: 0 }), false);
});

test("V22: two items from one shared place, carried home together, both count", () => {
  const list = [
    { name: "a tea service", duty: "butler", essential: true },
    { name: "bed linen", duty: "butler", essential: false },
    { name: "a top hat", duty: "tailor", essential: false },
  ];
  const home = homeFromCarried(list, ["a tea service", "bed linen"]); // the laundry's last obstacle put both in hand
  assert.deepEqual(home.map((i) => i.home), [true, true, false]);
  assert.equal(yearFromList({ list: home }).itemsHome, 2);
});

/* ------------------------------------------------------------ the table -- */

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
const { openHud } = await import("../module/apps/raid-hud.mjs");
const { EntitySheet } = await import("../module/sheets/entity-sheet.mjs");
Hooks.callAll("init");
Hooks.callAll("ready");
await settle();

const api = game.dontGetForked;
const raid = () => api.raid.get();
const cardOf = (m) => m.getFlag(SYSTEM_ID, "card");
const lastRoll = () => game.messages.filter((m) => cardOf(m)?.kind === CARD.roll).at(-1);
const setSetting = (key, value) => asUser(GM, () => game.settings.set(SYSTEM_ID, key, value));
const op = (user, name, args = {}) => asUser(user, () => api.runOp(name, args));
const press = (action, values = {}) => (options) => {
  const b = options.buttons?.find((x) => x.action === action);
  if (!b) throw new Error(`dialog "${options.window?.title}" has no ${action} button`);
  return b.callback ? b.callback({}, { form: fakeForm(values) }, null) : action;
};
async function rollAs(user, actor, values, faces) {
  diceQueue.push(...faces);
  dialogResponders.push(press("roll", values));
  const result = await asUser(user, () => api.roll(actor, { trait: values.trait }));
  await settle();
  return result;
}
const sheetOf = async (user, actor) => { const s = new EntitySheet({ document: actor }); await asUser(user, () => s.render()); return s; };

let witch, dracula;

test("V21 at the table: Ann drops her honey from the sheet, any time; it waits on the Raid window where everyone sees it", async () => {
  witch = await asUser(GM, () => api.createEntity("witch", { ownerId: ANN.id }));
  dracula = await asUser(GM, () => api.createEntity("dracula", { ownerId: BEN.id }));
  await op(GM, OPS.raidReset, { difficulty: "standard" });
  await asUser(ANN, () => witch.update({ "system.carried": [{ name: "a jar of honey" }, { name: "the silver spoons" }] }));
  await settle();
  assert.equal(game.settings.get(SYSTEM_ID, SETTINGS.autoDrops), true, "on to start with");
  const sheet = await sheetOf(ANN, witch);
  assert.match(sheet.renderedParts.sheet, /data-action="dropItem" data-index="0"/);
  await asUser(ANN, () => sheet.runAction("dropItem", { index: "0" }));
  await settle();
  assert.deepEqual(witch.system.carried.map((c) => c.name), ["the silver spoons"]);
  assert.deepEqual(raid().dropped.map((d) => [d.name, d.by]), [["a jar of honey", "A Witch"]]);
  assert.match(game.messages.at(-1).content, /A Witch drops a jar of honey/);
  const benHud = await asUser(BEN, () => openHud());
  assert.match(benHud.renderedParts.body, /a jar of honey/);
  assert.match(benHud.renderedParts.body, /data-action="pickUp"/);
});

test("V25: picking it up is that Entity's action for the Turn: marked with the Turn; the roll dialog says so only in that Turn", async () => {
  const dropId = raid().dropped[0].id;
  const benHud = await asUser(BEN, () => openHud());
  await asUser(BEN, () => benHud.runAction("pickUp", { dropId })); // Ben has one Entity: no question asked
  await settle();
  assert.deepEqual(raid().dropped, []);
  assert.deepEqual(dracula.system.carried.map((c) => c.name), ["a jar of honey"]);
  assert.equal(dracula.system.pickedUpTurn, raid().turn);
  assert.equal(dracula.system.pickedUp, "a jar of honey");
  assert.match(game.messages.at(-1).content, /Dracula picks up a jar of honey: that’s its action this Turn/);
  // more pick-ups the same Turn are the same action: they add to the mark, nothing more
  await op(BEN, OPS.raidDrop, { actorId: dracula.id, index: 0 });
  await asUser(GM, () => witch.update({ "system.carried": [{ name: "the silver spoons" }] }));
  await op(ANN, OPS.raidDrop, { actorId: witch.id, index: 0 });
  await settle();
  for (const d of [...raid().dropped]) await op(BEN, OPS.raidPickUp, { dropId: d.id, actorId: dracula.id });
  await settle();
  assert.equal(dracula.system.pickedUp, "a jar of honey, the silver spoons");
  assert.equal(dracula.system.pickedUpTurn, raid().turn);
  const sheet = await sheetOf(BEN, dracula);
  assert.match(sheet.renderedParts.sheet, /Picked up a jar of honey, the silver spoons: that’s its action this Turn/);
  // rolling again the same Turn: the dialog says so (and the mark stays)
  let content = "";
  dialogResponders.push((options) => { content = options.content; return press("roll", { trait: "charm", second: "mask", difficulty: 8 })(options); });
  diceQueue.push(6, 4);
  await asUser(BEN, () => api.roll(dracula, { trait: "charm" }));
  await settle();
  assert.match(content, /picked up a jar of honey, the silver spoons this Turn/i);
  assert.equal(dracula.system.pickedUpTurn, raid().turn, "the roll doesn't clear it");
  // the next Turn: the mark goes, and the dialog says nothing
  await op(GM, OPS.raidTurn, { delta: 1 });
  await settle();
  assert.equal(dracula.system.pickedUpTurn, 0);
  assert.equal(dracula.system.pickedUp, "");
  dialogResponders.push((options) => { content = options.content; return null; });
  await asUser(BEN, () => api.roll(dracula, { trait: "charm" }));
  await settle();
  assert.doesNotMatch(content, /picked up/i);
  await asUser(GM, () => dracula.update({ "system.carried": [{ name: "a jar of honey" }] }));
});

test("V21: nobody drops or picks up for an Entity that isn't theirs", async () => {
  assert.equal((await op(ANN, OPS.raidDrop, { actorId: dracula.id, index: 0 })).reason, "notYours");
  assert.deepEqual(dracula.system.carried.map((c) => c.name), ["a jar of honey"]);
  await op(BEN, OPS.raidDrop, { actorId: dracula.id, index: 0 });
  await settle();
  const dropId = raid().dropped[0].id;
  assert.equal((await op(ANN, OPS.raidPickUp, { dropId, actorId: dracula.id })).reason, "notYours");
  // a captive can't pick anything up
  await op(GM, OPS.lockupSet, { actorId: witch.id, captured: true });
  assert.equal((await op(ANN, OPS.raidPickUp, { dropId, actorId: witch.id })).reason, "captured");
  await op(GM, OPS.lockupSet, { actorId: witch.id, captured: false });
  // the Storyteller picks up for anyone in the raid (a question when there are several)
  const gmHud = await asUser(GM, () => openHud());
  dialogResponders.push(press("ok", { actor: witch.id }));
  await asUser(GM, () => gmHud.runAction("pickUp", { dropId }));
  await settle();
  assert.deepEqual(witch.system.carried.map((c) => c.name), ["a jar of honey"]);
  assert.equal(witch.system.pickedUp, "a jar of honey");
  assert.equal(witch.system.pickedUpTurn, raid().turn);
});

test("V21: a Cost's 'drop an item' goes down the same path: it waits where it fell, to be picked up", async () => {
  await asUser(GM, () => witch.update({ "system.carried": [{ name: "a jar of honey" }], "system.pickedUpTurn": 0, "system.pickedUp": "" }));
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8 }, [4, 3]); // a Cost
  clickButton(renderMessage(lastRoll(), GM), "Drop an item", GM);
  await settle();
  assert.deepEqual(witch.system.carried, []);
  assert.deepEqual(raid().dropped.map((d) => d.name), ["a jar of honey"]);
  assert.match(lastRoll().content, /drops a jar of honey here/);
});

test("V21: a new raid leaves last year's dropped loot and marks behind", async () => {
  await asUser(GM, () => dracula.update({ "system.pickedUpTurn": 3, "system.pickedUp": "a lamp" }));
  await op(GM, OPS.raidReset, { difficulty: "standard" });
  await settle();
  assert.deepEqual(raid().dropped, []);
  assert.equal(dracula.system.pickedUpTurn, 0);
  assert.equal(dracula.system.pickedUp, "");
});

test("V24 at the table: in a local chase nothing is dropped (loot or furniture) and the sheet says why; in the final flight it is", async () => {
  await op(GM, OPS.raidReset, { difficulty: "easy" });
  await asUser(GM, () => witch.update({ "system.carried": [{ name: "a coil of rope" }, { name: "a top hat" }] }));
  await settle();
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, watched: true }, [1, 1, 1]); // caught; the ground
  assert.equal(raid().chase?.kind, "local");
  assert.equal((await op(ANN, OPS.raidDrop, { actorId: witch.id, index: 0 })).reason, "inChase");
  assert.equal(witch.system.carried.length, 2);
  const sheet = await sheetOf(ANN, witch);
  assert.match(sheet.renderedParts.sheet, /data-action="dropItem" data-index="0"[^>]*disabled/);
  assert.match(sheet.renderedParts.sheet, /not in a local chase/i);
  // nor the furniture: setting it down waits until the chase is over
  await asUser(GM, () => witch.update({ "system.carryingFurniture": true }));
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": false }));
  assert.equal(witch.system.carryingFurniture, true);
  // a Cost's drop comes from a raid roll, not the chase: not this rule (and Dracula, not chased, may drop his own)
  await asUser(GM, () => dracula.update({ "system.carried": [{ name: "a lamp and a can of oil" }] }));
  assert.equal((await op(BEN, OPS.raidDrop, { actorId: dracula.id, index: 0 })).ok, true);
  await op(GM, OPS.chaseEnd, { outcome: "dropped" });
  await settle();
  // the final flight isn't a local chase: dropping is allowed there
  diceQueue.push(1);
  await op(GM, OPS.raidHunt, { on: true });
  await settle();
  assert.equal(raid().chase?.kind, "final");
  assert.equal((await op(ANN, OPS.raidDrop, { actorId: witch.id, index: 0 })).ok, true);
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": false }));
  assert.equal(witch.system.carryingFurniture, false);
  await op(GM, OPS.raidHunt, { on: false });
  await op(GM, OPS.raidReset, { difficulty: "standard" });
  await settle();
});

test("V21 with the switch off: Drop just takes the item off the sheet; nothing waits on the Raid window", async () => {
  await setSetting(SETTINGS.autoDrops, false);
  await asUser(ANN, () => witch.update({ "system.carried": [{ name: "a coil of rope" }] }));
  const sheet = await sheetOf(ANN, witch);
  await asUser(ANN, () => sheet.runAction("dropItem", { index: "0" }));
  await settle();
  assert.deepEqual(witch.system.carried, []);
  assert.deepEqual(raid().dropped, []);
  const hud = await asUser(ANN, () => openHud());
  assert.doesNotMatch(hud.renderedParts.body, /data-action="pickUp"/);
  await setSetting(SETTINGS.autoDrops, true);
});

test("V26 at the table: the first take is free; setting the piece down and taking it back up is the carrier's action that Turn", async () => {
  await op(GM, OPS.raidReset, { difficulty: "standard" });
  await settle();
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": true })); // the first take
  await settle();
  assert.equal(raid().furniture, "inPlay");
  assert.equal(witch.system.pickedUpTurn, 0, "free");
  // Dracula joins her carrying it: free too
  await asUser(BEN, () => dracula.update({ "system.carryingFurniture": true }));
  await settle();
  assert.equal(dracula.system.pickedUpTurn, 0);
  // both set it down; the Witch takes it back up: her action this Turn
  await asUser(BEN, () => dracula.update({ "system.carryingFurniture": false }));
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": false }));
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": true }));
  await settle();
  assert.equal(witch.system.carryingFurniture, true);
  assert.equal(witch.system.pickedUpTurn, raid().turn);
  assert.equal(witch.system.pickedUp, "the furniture");
  const sheet = await sheetOf(ANN, witch);
  assert.match(sheet.renderedParts.sheet, /Picked up the furniture: that’s its action this Turn/);
  await op(GM, OPS.raidTurn, { delta: 1 });
  await settle();
  assert.equal(witch.system.pickedUpTurn, 0, "the next Turn: the mark goes");
});

test("V27: nothing is picked up in the final flight; anything dropped in the flight is left in town", async () => {
  await asUser(GM, () => dracula.update({ "system.carried": [{ name: "a gravy boat" }] }));
  await op(BEN, OPS.raidDrop, { actorId: dracula.id, index: 0 }); // dropped before the hunt: it waits
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": false })); // the piece set down in town
  await settle();
  const before = raid().dropped.map((d) => d.id);
  diceQueue.push(1); // the flight's ground
  await op(GM, OPS.raidHunt, { on: true });
  await settle();
  assert.equal(raid().chase?.kind, "final");
  assert.equal((await op(ANN, OPS.raidPickUp, { dropId: before[0], actorId: witch.id })).reason, "flight");
  const hud = await asUser(ANN, () => openHud());
  assert.doesNotMatch(hud.renderedParts.body, /data-action="pickUp"/, "no pick-up buttons in the flight");
  assert.match(hud.renderedParts.body, /left in town/i);
  // nor taking the set-down piece back up
  const warned = log.warnings.length;
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": true }));
  assert.equal(witch.system.carryingFurniture, false);
  assert.ok(log.warnings.slice(warned).some((w) => /final flight/i.test(w)));
  // dropping in the flight: it leaves the sheet and is left in town, not listed for picking up
  await asUser(GM, () => witch.update({ "system.carried": [{ name: "a lace tablecloth" }] }));
  assert.equal((await op(ANN, OPS.raidDrop, { actorId: witch.id, index: 0 })).ok, true);
  await settle();
  assert.deepEqual(witch.system.carried, []);
  assert.deepEqual(raid().dropped.map((d) => d.id), before, "not listed");
  assert.match(game.messages.at(-1).content, /A Witch drops a lace tablecloth: left in town/);
  await op(GM, OPS.raidHunt, { on: false });
  await op(GM, OPS.raidReset, { difficulty: "standard" });
  await settle();
});

test("the drop session left no errors, no missing words and no unanswered dialogs", () => {
  assert.deepEqual(log.errors, []);
  assert.deepEqual(log.missingI18n, []);
  assert.equal(dialogResponders.length, 0);
});
