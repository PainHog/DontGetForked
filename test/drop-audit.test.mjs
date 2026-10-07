/**
 * The drop and pick-up audit (docs/audits/FOUNDRY-AUDIT.md, 2026-10-07): one test per confirmed finding in the
 * V21–V28 work (raid.drop, raid.pickUp, the pick-up mark, taking the piece back up, the data model's guards),
 * each written to fail before its fix. The table on the fake Foundry: a Storyteller and two players.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { installFoundry, asUser, settle, diceQueue, dialogResponders, fakeForm, log } from "../tools/fake-foundry.mjs";
import { newRaid, takeFurniture, isFurnitureRetake } from "../module/logic/raid.mjs";

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
const { SYSTEM_ID, SETTINGS, OPS } = await import("../module/contracts.mjs");
const { EntitySheet } = await import("../module/sheets/entity-sheet.mjs");
const { openHud } = await import("../module/apps/raid-hud.mjs");
Hooks.callAll("init");
Hooks.callAll("ready");
await settle();

const api = game.dontGetForked;
const raid = () => api.raid.get();
const setSetting = (key, value) => asUser(GM, () => game.settings.set(SYSTEM_ID, key, value));
const op = (user, name, args = {}) => asUser(user, () => api.runOp(name, args));
const names = (actor) => actor.system.carried.map((c) => c.name);
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
const caught = (user, actor) => rollAs(user, actor, { trait: "sly", second: "mask", difficulty: 8, watched: true }, [1, 1, 1]); // Trouble, watched; the ground
const sheetOf = async (user, actor) => { const s = new EntitySheet({ document: actor }); await asUser(user, () => s.render()); return s; };

let witch, dracula;
/** Each test starts from a new raid with empty hands (whatever the test before it left). */
async function fresh(difficulty = "standard") {
  if (raid().chase && !raid().chase.outcome) await op(GM, OPS.chaseEnd, { outcome: "dropped" });
  if (raid().hunt) await op(GM, OPS.raidHunt, { on: false });
  await setSetting(SETTINGS.autoDrops, true);
  await op(GM, OPS.raidReset, { difficulty });
  await settle();
}

test("boot: two Entities for two players, a new raid", async () => {
  witch = await asUser(GM, () => api.createEntity("witch", { ownerId: ANN.id }));
  dracula = await asUser(GM, () => api.createEntity("dracula", { ownerId: BEN.id }));
  await op(GM, OPS.raidReset, { difficulty: "standard" });
  await settle();
  assert.equal(raid().turn, 1);
});

test("a double click on drop drops one item once: never the same item twice, and never a second item", async () => {
  await fresh();
  await asUser(GM, () => witch.update({ "system.carried": [{ name: "a jar of honey" }, { name: "the silver spoons" }] }));
  await settle();
  const sheet = await sheetOf(ANN, witch);
  await Promise.all([asUser(ANN, () => sheet.runAction("dropItem", { index: "0" })), asUser(ANN, () => sheet.runAction("dropItem", { index: "0" }))]);
  await settle();
  assert.deepEqual(raid().dropped.map((d) => d.name), ["a jar of honey"], "the honey once, nothing else");
  assert.deepEqual(names(witch), ["the silver spoons"]);
});

test("V26: the first carrier who sets the piece down and takes it back up in the Turn of the first take spends an action", async () => {
  await fresh();
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": true })); // the first take: free
  await settle();
  assert.equal(raid().furnitureTakenTurn, raid().turn);
  assert.equal(witch.system.pickedUpTurn, 0);
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": false })); // set down (before a roll, say)
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": true })); // and back up: that's an action
  await settle();
  assert.equal(witch.system.carryingFurniture, true);
  assert.equal(witch.system.pickedUpTurn, raid().turn, "taking it back up is an action, in the first Turn too");
  // a second carrier joining the first take that Turn (someone still carries it) stays free
  await asUser(BEN, () => dracula.update({ "system.carryingFurniture": true, "system.pickedUpTurn": 0, "system.pickedUp": "" }));
  await settle();
  assert.equal(dracula.system.pickedUpTurn, 0, "joining the first take is free");
  await asUser(GM, () => dracula.update({ "system.carryingFurniture": false }));
  // the rule itself: in the Turn of the first take, a piece nobody carries now was set down, so taking it is a retake
  const first = takeFurniture(newRaid({ id: "r" }));
  assert.equal(isFurnitureRetake(first), false, "joining the first take");
  assert.equal(isFurnitureRetake(first, { setDown: true }), true, "taking it back up");
  assert.equal(isFurnitureRetake(newRaid({ id: "r" }), { setDown: true }), false, "the first take itself");
});

test("V27: the final flight starting in the Turn of the first take: a piece set down in the flight isn't taken back up", async () => {
  await fresh();
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": true })); // the first take
  await settle();
  diceQueue.push(1); // the flight's ground
  await op(GM, OPS.raidHunt, { on: true }); // the Limit, the same Turn
  await settle();
  assert.equal(raid().chase?.kind, "final");
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": false })); // dropped in the flight: left in town
  const warned = log.warnings.length;
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": true }));
  assert.equal(witch.system.carryingFurniture, false, "nothing is picked up in the final flight");
  assert.ok(log.warnings.slice(warned).some((w) => /final flight/i.test(w)));
  await op(GM, OPS.raidHunt, { on: false });
  await op(GM, OPS.raidReset, { difficulty: "standard" });
  await settle();
});

test("V26: the Storyteller taking the piece back up for an Entity (TESTING.md's GM does it for Dracula) marks its action too; in the flight it's a correction", async () => {
  await fresh();
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": true })); // the first take
  await settle();
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": false })); // set down
  await op(GM, OPS.raidTurn, { delta: 1 });
  await settle();
  await asUser(GM, () => dracula.update({ "system.carryingFurniture": true })); // the GM takes it back up for Dracula
  assert.equal(dracula.system.carryingFurniture, true);
  assert.equal(dracula.system.pickedUpTurn, raid().turn, "taking it back up is Dracula's action, whoever ticks it");
  assert.equal(dracula.system.pickedUp, "the furniture");
  // in the final flight a player can't take it back up, but the Storyteller's tick stands (a correction), unmarked
  await asUser(GM, () => dracula.update({ "system.carryingFurniture": false, "system.pickedUpTurn": 0, "system.pickedUp": "" }));
  diceQueue.push(1);
  await op(GM, OPS.raidHunt, { on: true });
  await settle();
  await asUser(GM, () => dracula.update({ "system.carryingFurniture": true }));
  assert.equal(dracula.system.carryingFurniture, true);
  assert.equal(dracula.system.pickedUpTurn, 0);
});

test("with 'Dropped loot waits where it fell' off, the drop and pick-up rules are by hand: nothing refused, no action marked", async () => {
  await fresh("easy");
  await setSetting(SETTINGS.autoDrops, false);
  // taking the piece back up in a later Turn: no mark (picking up is by hand)
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": true }));
  await settle();
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": false }));
  await op(GM, OPS.raidTurn, { delta: 1 });
  await settle();
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": true }));
  assert.equal(witch.system.carryingFurniture, true);
  assert.equal(witch.system.pickedUpTurn, 0, "no action marked by the system");
  // in a local chase: the drop just leaves the sheet; the furniture and the list are the player's to keep
  await asUser(GM, () => witch.update({ "system.carried": [{ name: "a coil of rope" }, { name: "a top hat" }] }));
  await caught(ANN, witch);
  assert.equal(raid().chase?.kind, "local");
  const sheet = await sheetOf(ANN, witch);
  assert.doesNotMatch(sheet.renderedParts.sheet, /data-action="dropItem" data-index="0"[^>]*disabled/, "off: the drop buttons stay usable");
  assert.equal((await op(ANN, OPS.raidDrop, { actorId: witch.id, index: 0 })).ok, true, "off: a drop just leaves the sheet");
  assert.deepEqual(names(witch), ["a top hat"]);
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": false }));
  assert.equal(witch.system.carryingFurniture, false);
  await asUser(ANN, () => witch.update({ "system.carried": [] }));
  assert.deepEqual(names(witch), []);
  await op(GM, OPS.chaseEnd, { outcome: "dropped" });
  // held at the lock-up: the player can write down what the table rules was handed over
  await op(GM, OPS.lockupSet, { actorId: witch.id, captured: true });
  await asUser(ANN, () => witch.update({ "system.carried": [{ name: "a jar of honey" }] }));
  assert.deepEqual(names(witch), ["a jar of honey"]);
  await op(GM, OPS.lockupSet, { actorId: witch.id, captured: false });
  await setSetting(SETTINGS.autoDrops, true);
  await op(GM, OPS.raidReset, { difficulty: "standard" });
  await settle();
});

test("an Entity that isn't in this raid drops nothing into the town: nobody in the raid can pick it up", async () => {
  await fresh();
  await op(GM, OPS.raidMember, { actorId: dracula.id, inRaid: false });
  await asUser(GM, () => dracula.update({ "system.carried": [{ name: "a candelabra" }] }));
  await settle();
  await op(BEN, OPS.raidDrop, { actorId: dracula.id, index: 0 });
  await settle();
  assert.deepEqual(raid().dropped, [], "not on the Raid window");
  assert.deepEqual(names(dracula), [], "it just leaves the sheet, as with the switch off");
  await op(GM, OPS.raidMember, { actorId: dracula.id, inRaid: true });
  await settle();
});

test("a drop refused in a local chase says why, even from a sheet opened before the chase began", async () => {
  await fresh("easy");
  await asUser(GM, () => witch.update({ "system.carried": [{ name: "a coil of rope" }] }));
  await settle();
  const sheet = await sheetOf(ANN, witch); // open before she's caught
  await caught(ANN, witch);
  assert.equal(raid().chase?.kind, "local");
  const warned = log.warnings.length;
  await asUser(ANN, () => sheet.runAction("dropItem", { index: "0" }));
  await settle();
  assert.deepEqual(names(witch), ["a coil of rope"]);
  assert.ok(log.warnings.slice(warned).some((w) => w.startsWith("Ann:") && /local chase/.test(w)), "Ann is told why");
  await op(GM, OPS.chaseEnd, { outcome: "dropped" });
  await op(GM, OPS.raidReset, { difficulty: "standard" });
  await settle();
});

test("the pick-up notice is for the Turn's own rolls: a flight roll later that Turn isn't a second action", async () => {
  await fresh();
  await asUser(GM, () => dracula.update({ "system.carried": [{ name: "a gravy boat" }], "system.pickedUpTurn": 0, "system.pickedUp": "" }));
  await op(BEN, OPS.raidDrop, { actorId: dracula.id, index: 0 });
  await settle();
  await op(BEN, OPS.raidPickUp, { dropId: raid().dropped[0].id, actorId: dracula.id }); // his action for Turn 1
  await settle();
  assert.equal(dracula.system.pickedUpTurn, raid().turn);
  diceQueue.push(1); // the flight's ground
  await op(GM, OPS.raidHunt, { on: true }); // the Limit, later the same Turn
  await settle();
  assert.equal(raid().chase?.kind, "final");
  let content = "";
  dialogResponders.push((options) => { content = options.content; return null; });
  await asUser(BEN, () => api.roll(dracula, { trait: "nimble" }));
  await settle();
  assert.ok(content, "the roll dialog opened");
  assert.doesNotMatch(content, /picked up/i, "everyone flees; the flight's rolls aren't the Turn's action");
});

test("once the party is out of town, nothing left in town is picked up: it can't come home", async () => {
  await fresh();
  await asUser(GM, () => witch.update({ "system.carried": [{ name: "a jar of honey" }] }));
  await op(ANN, OPS.raidDrop, { actorId: witch.id, index: 0 }); // dropped in town
  await settle();
  const dropId = raid().dropped[0].id;
  await rollAs(BEN, dracula, { trait: "nimble", second: "mask", difficulty: 8, wayOut: true }, [9, 5]); // the way out beaten: everyone is out
  assert.equal(raid().partyOut?.how, "wayOut");
  assert.notEqual((await op(BEN, OPS.raidPickUp, { dropId, actorId: dracula.id })).ok, true, "nobody is there to pick it up");
  assert.deepEqual(names(dracula), [], "so it doesn't come home with him");
  const hud = await asUser(BEN, () => openHud());
  assert.doesNotMatch(hud.renderedParts.body, /data-action="pickUp"/, "no pick-up buttons once the party is out");
});

test("the drop audit's session left no errors, no missing words and no unanswered dialogs", () => {
  assert.deepEqual(log.errors, []);
  assert.deepEqual(log.missingI18n, []);
  assert.equal(dialogResponders.length, 0);
});
