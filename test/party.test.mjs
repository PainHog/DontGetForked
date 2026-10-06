/**
 * F26 (who is in this raid), V16 (Hidden Pockets keeps loot, not furniture) and
 * the audit's resilience follow-ups (docs/audits/FOUNDRY-AUDIT.md FA-R3–R5), on
 * the fake Foundry: a Storyteller, an Assistant Storyteller who connects later,
 * two players, and Entities in and out of the raid.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  installFoundry, asUser, settle, diceQueue, dialogResponders, fakeForm, log, setConnected,
} from "../tools/fake-foundry.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const { game } = installFoundry({
  users: [
    { id: "gmUser0000000000", name: "Storyteller", isGM: true },
    { id: "annUser000000000", name: "Ann" },
    { id: "benUser000000000", name: "Ben" },
    { id: "astUser000000000", name: "Assistant", isGM: true, active: false },
  ],
});
const GM = game.users.get("gmUser0000000000");
const ANN = game.users.get("annUser000000000");
const BEN = game.users.get("benUser000000000");
const AST = game.users.get("astUser000000000");

await import("../module/dont-get-forked.mjs");
const { SYSTEM_ID, OPS } = await import("../module/contracts.mjs");
const { openHud, currentHud } = await import("../module/apps/raid-hud.mjs");
const { openChaseTracker } = await import("../module/apps/chase-tracker.mjs");
const { EntitySheet } = await import("../module/sheets/entity-sheet.mjs");
const flow = await import("../module/raid/chase-flow.mjs");
const { yearDefaults } = await import("../module/raid/raid-checks.mjs");
const { abilityChoices } = await import("../module/dice/rolling.mjs");
Hooks.callAll("init");
Hooks.callAll("ready");
await settle();

const api = game.dontGetForked;
const raid = () => api.raid.get();
const chase = () => raid().chase;
const lastMessage = () => game.messages.at(-1);
const cardOf = (m) => m.getFlag(SYSTEM_ID, "card");
const lastRoll = () => game.messages.filter((m) => cardOf(m)?.kind === "roll").at(-1);
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
const newRaid = async (difficulty = "standard") => { await op(GM, OPS.raidReset, { difficulty }); await settle(); };
/** The Storyteller's client drops a query on the floor (a connection lost mid-request); returns the undo. */
const dropQueries = () => { GM.query = async () => { throw new Error("connection lost"); }; return () => { delete GM.query; }; };

let witch, dracula, wolf;

test("F26: a new raid puts every Entity with a player owner in the raid, and only those", async () => {
  witch = await asUser(GM, () => api.createEntity("witch", { ownerId: ANN.id }));
  dracula = await asUser(GM, () => api.createEntity("dracula", { ownerId: BEN.id }));
  wolf = await asUser(GM, () => api.createEntity("werewolf")); // dragged in "for later": nobody plays it
  await asUser(GM, () => wolf.update({ "system.perk": "fetch" }));
  await newRaid();
  assert.equal(witch.system.inRaid, true);
  assert.equal(dracula.system.inRaid, true);
  assert.equal(wolf.system.inRaid, false);
});

test("F26: an Entity without the mark (an older world) counts as in the raid", () => {
  assert.equal(flow.inRaid({ system: {} }), true);
  assert.equal(flow.inRaid({ system: { inRaid: false } }), false);
});

test("F26: a Werewolf with Fetch that isn't in the raid doesn't ease the way out; ticked in on the Raid window, it does", async () => {
  await rollAs(ANN, witch, { trait: "sly", second: "mask", wayOut: true }, [6, 4]);
  assert.equal(cardOf(lastRoll()).difficulty, 8);
  await op(GM, OPS.raidBackInTown);
  await settle();
  const hud = await asUser(GM, () => openHud());
  assert.match(hud.renderedParts.body, new RegExp(`data-action="toggleMember" data-actor-id="${wolf.id}"`));
  await asUser(GM, () => currentHud().runAction("toggleMember", { actorId: wolf.id }));
  await settle();
  assert.equal(wolf.system.inRaid, true);
  await rollAs(ANN, witch, { trait: "sly", second: "mask", wayOut: true }, [6, 4]);
  assert.equal(cardOf(lastRoll()).difficulty, 7, "1 easier (Fetch)");
  await op(GM, OPS.raidBackInTown);
  await asUser(GM, () => currentHud().runAction("toggleMember", { actorId: wolf.id }));
  await settle();
  assert.equal(wolf.system.inRaid, false);
  // players can't change who is in the raid
  assert.equal((await op(ANN, OPS.raidMember, { actorId: wolf.id, inRaid: true })).reason, "gmOnly");
});

test("F26: the final flight takes only the Entities in the raid; helpers come only from the raid", async () => {
  assert.ok(!abilityChoices(witch).some((a) => a.payerId === wolf.id), "the wolf can't help");
  assert.ok(abilityChoices(witch).some((a) => a.payerId === dracula.id));
  diceQueue.push(1); // the flight's ground
  await op(GM, OPS.raidHunt, { on: true });
  await settle();
  assert.deepEqual(chase().members.map((m) => m.actorId), [witch.id, dracula.id]);
  await op(GM, OPS.raidHunt, { on: false });
  await newRaid();
});

test("F26: group and Tell checks pick from the Entities in the raid only", async () => {
  let content = "";
  dialogResponders.push((options) => { content = options.content; return null; });
  await asUser(GM, () => currentHud().runAction("groupCheck"));
  await settle();
  assert.match(content, /A Witch/);
  assert.doesNotMatch(content, /The Werewolf/);
  const before = log.warnings.length;
  assert.equal((await op(GM, OPS.raidGroup, { action: "open", members: [witch.id, wolf.id] })).reason, "tooFew");
  assert.equal((await op(GM, OPS.raidTell, { arriving: [wolf.id], place: "the baker" })).reason, "nobodyArriving");
  assert.equal(log.warnings.length, before);
});

test("F26: the lock-up and the year count only the Entities in the raid", async () => {
  await op(GM, OPS.lockupSet, { actorId: wolf.id, captured: true });
  await settle();
  const hud = asUser(GM, () => currentHud());
  assert.doesNotMatch(hud.renderedParts.body, new RegExp(`data-action="freeCaptive" data-actor-id="${wolf.id}"`));
  const d = asUser(GM, () => yearDefaults());
  assert.equal(d.leftBehind, 0, "the wolf wasn't on this raid: nobody is left behind");
});

test("F26: a new raid resets only the Entities in it; one ticked in later is made ready then", async () => {
  await asUser(GM, () => wolf.update({ "system.charges.value": 0 }));
  await asUser(GM, () => witch.update({ "system.charges.value": 1 }));
  await newRaid();
  assert.equal(witch.system.charges.value, 3);
  assert.equal(wolf.system.charges.value, 0, "not in the raid: untouched");
  assert.equal(wolf.system.status, "captured");
  await asUser(GM, () => wolf.update({ "system.inRaid": true })); // the Storyteller ticks it on its sheet
  await settle();
  assert.equal(wolf.system.charges.value, 3);
  assert.equal(wolf.system.status, "active");
  await asUser(GM, () => wolf.update({ "system.charges.value": 1 }));
  await asUser(GM, () => wolf.update({ "system.inRaid": false }));
  await asUser(GM, () => wolf.update({ "system.inRaid": true }));
  await settle();
  assert.equal(wolf.system.charges.value, 1, "made ready once per raid");
  await asUser(GM, () => wolf.update({ "system.inRaid": false }));
  await settle();
});

test("F26: the sheet shows the Storyteller the tick; a player can't change it there", async () => {
  const gmSheet = new EntitySheet({ document: wolf });
  await asUser(GM, () => gmSheet.render());
  assert.match(gmSheet.renderedParts.sheet, /name="system.inRaid"/);
  const annSheet = new EntitySheet({ document: witch });
  await asUser(ANN, () => annSheet.render());
  assert.doesNotMatch(annSheet.renderedParts.sheet, /name="system.inRaid"/);
});

test("the manifest claims the Foundry version it was tested on (13) until Richard tests on 14", () => {
  const manifest = JSON.parse(readFileSync(join(ROOT, "system.json"), "utf8"));
  assert.equal(manifest.compatibility.minimum, "13");
  assert.equal(manifest.compatibility.verified, "13");
});

test("V16: captured, Hidden Pockets keeps the loot but not the furniture (F15)", async () => {
  const ghostly = await asUser(GM, () => api.createEntity("invisible", { ownerId: BEN.id }));
  await asUser(GM, () => ghostly.update({ "system.perk": "hiddenPockets", "system.carried": [{ name: "the silver spoons" }], "system.carryingFurniture": true }));
  await settle();
  assert.equal(raid().furniture, "inPlay");
  const facts = await op(GM, OPS.lockupSet, { actorId: ghostly.id, captured: true });
  await settle();
  assert.deepEqual(ghostly.system.carried.map((c) => c.name), ["the silver spoons"], "the loot stays in his pockets");
  assert.equal(ghostly.system.carryingFurniture, false);
  assert.equal(raid().furniture, "lost", "the piece is gone for the night");
  assert.deepEqual(facts.kept, ["the silver spoons"]);
  assert.equal(facts.furniture, true);
  await asUser(GM, () => ghostly.delete());
  await newRaid();
});

test("a Storyteller who takes over (the active one drops) catches up on the rolls the other never saw", async () => {
  await newRaid("easy");
  setConnected(AST, true); // the Assistant is connected, but the Storyteller is the active GM
  await settle();
  const restore = dropQueries();
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, watched: true }, [1, 1]);
  const m = lastRoll();
  assert.equal(cardOf(m).caught, true);
  assert.equal(cardOf(m).gmSeen, false, "the request was lost");
  restore();
  diceQueue.push(1); // the ground, once the chase starts
  setConnected(GM, false); // the Storyteller drops: the Assistant is now the active GM
  await settle();
  assert.equal(game.users.activeGM.id, AST.id);
  assert.equal(chase()?.kind, "local", "the Assistant's client picked up Ann's caught roll");
  assert.equal(cardOf(m).gmSeen, true);
  setConnected(GM, true);
  setConnected(AST, false);
  await settle();
  await op(GM, OPS.chaseEnd, { outcome: "dropped" });
  await settle();
});

test("a chase roll whose request was lost still counts; the Storyteller can roll a member's chase roll for them", async () => {
  await newRaid("easy");
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, watched: true }, [1, 1, 1]); // caught; the ground: the crowded square
  assert.equal(chase()?.kind, "local");
  assert.deepEqual(chase().ground.traits, ["sly", "charm"]);
  const restore = dropQueries();
  await rollAs(ANN, witch, { trait: "sly", second: "mask", chase: true }, [10, 6, 1]); // a Success; then next round's ground
  restore();
  assert.equal(chase().history.length, 1, "the Storyteller's client recorded her roll from the card");
  assert.equal(chase().lead, 2);
  // Ann has dropped: the Storyteller rolls her chase roll from the tracker
  const tracker = await asUser(GM, () => openChaseTracker());
  assert.match(tracker.renderedParts.body, new RegExp(`data-action="rollFor" data-actor-id="${witch.id}"`));
  diceQueue.push(10, 6, 1);
  dialogResponders.push(press("roll", { trait: "sly", second: "mask", chase: true }));
  await asUser(GM, () => tracker.runAction("rollFor", { actorId: witch.id }));
  await settle();
  assert.equal(chase().history.length, 2);
  assert.equal(chase().lead, 3);
  await op(GM, OPS.chaseEnd, { outcome: "dropped" });
  await settle();
});

test("a deleted Entity leaves a running chase and an open group check", async () => {
  await newRaid();
  const extra = await asUser(GM, () => api.createEntity("ghost", { ownerId: BEN.id }));
  await settle();
  await op(GM, OPS.raidGroup, { action: "open", members: [witch.id, dracula.id, extra.id], label: "the crowded shop floor" });
  await settle();
  assert.equal(raid().group.members.length, 3);
  await asUser(GM, () => extra.delete());
  await settle();
  assert.deepEqual(raid().group.members.map((m) => m.actorId), [witch.id, dracula.id]);
  await op(GM, OPS.raidGroup, { action: "close" });
  await settle();

  const extra2 = await asUser(GM, () => api.createEntity("ghost", { ownerId: BEN.id }));
  await settle();
  diceQueue.push(1); // the flight's ground: the crowded square (Sly, Charm)
  await op(GM, OPS.raidHunt, { on: true });
  await settle();
  assert.equal(chase().members.length, 3);
  await rollAs(ANN, witch, { trait: "sly", second: "monster", chase: true }, [10, 5]);
  await rollAs(BEN, dracula, { trait: "charm", second: "monster", chase: true }, [10, 5]);
  assert.equal(chase().history.length, 0, "the round waits for the third");
  diceQueue.push(1); // the next round's ground
  await asUser(GM, () => extra2.delete());
  await settle();
  assert.deepEqual(chase().members.map((m) => m.actorId), [witch.id, dracula.id]);
  assert.equal(chase().history.length, 1, "with the third gone, the round is complete and the Lead moves");
  await op(GM, OPS.raidHunt, { on: false });
  await newRaid();
});

test("the party's session left no errors, no missing words and no unanswered dialogs", () => {
  assert.deepEqual(log.errors, []);
  assert.deepEqual(log.missingI18n, []);
  assert.equal(dialogResponders.length, 0);
});
