/**
 * Integration smoke test — the v0.2 review's decisions (DESIGN 2026-10-21), on the fake Foundry (tools/fake-foundry.mjs):
 * a Storyteller (GM) and two players, the real entry module, dialogs (scripted answers), cards, Raid HUD and chase
 * tracker, with scripted dice.
 *  - a local chase lasts at most 6 rounds: the tracker counts them; still running after round 6, Lead 2+ escapes and
 *    less is cornered (captured); with the switch off, no cap;
 *  - giving up only once the round's ground is read;
 *  - in a local chase any of your own abilities may be spent as a raise;
 *  - a Huge piece one of whose carriers is caught can't move (the way out is refused) and, that carrier captured, the
 *    town takes it;
 *  - Jekyll: Hyde takes over when the Monster shows, even when an ability kept its Suspicion off;
 *  - five Entities: the Limit is 1 lower on Easy and Standard, on the Raid HUD too (and the switch off).
 * Spectral at a way in is in test/audit.test.mjs, one overdraw per local chase in test/review.test.mjs, the final
 * flight's overdraw step in test/night.test.mjs.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { installFoundry, asUser, settle, diceQueue, dialogResponders, fakeForm, log } from "../tools/fake-foundry.mjs";

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
const { openChaseTracker } = await import("../module/apps/chase-tracker.mjs");
Hooks.callAll("init");
Hooks.callAll("ready");
await settle();

const api = game.dontGetForked;
const raid = () => api.raid.get();
const view = () => api.raid.view();
const chase = () => raid().chase;
const cardOf = (m) => m.getFlag(SYSTEM_ID, "card");
const cards = (kind) => game.messages.filter((m) => cardOf(m)?.kind === kind);
const lastCard = (kind) => cards(kind).at(-1);
const setSetting = (key, value) => asUser(GM, () => game.settings.set(SYSTEM_ID, key, value));
const op = (user, name, args = {}) => asUser(user, () => api.runOp(name, args));
const newRaid = async (difficulty = "standard") => { await op(GM, OPS.raidReset, { difficulty }); await settle(); };

const press = (action, values = {}) => (options) => {
  const b = options.buttons?.find((x) => x.action === action);
  if (!b) throw new Error(`dialog "${options.window?.title}" has no ${action} button`);
  return b.callback ? b.callback({}, { form: fakeForm(values) }, null) : action;
};
async function rollAs(user, actor, values, faces, { seen } = {}) {
  diceQueue.push(...faces);
  dialogResponders.push((options) => { seen?.(options.content); return press("roll", values)(options); });
  const result = await asUser(user, () => api.roll(actor, { trait: values.trait }));
  await settle();
  return result;
}
async function refusedRoll(user, actor, values) {
  dialogResponders.push(press("roll", values), press("cancel"));
  const before = log.warnings.length;
  await asUser(user, () => api.roll(actor, { trait: values.trait }));
  await settle();
  return log.warnings.slice(before);
}
const lastRoll = () => cardOf(cards(CARD.roll).at(-1));
const free = (actor) => op(GM, OPS.lockupSet, { actorId: actor.id, captured: false });

let witch, dracula;

test("boot: the four new switches are registered, on by default", async () => {
  for (const k of ["localOverdrawOnce", "localRoundCap", "limitByPartySize", "hugePieceHeld"]) assert.equal(game.settings.get(SYSTEM_ID, SETTINGS[k]), true, `${k} on`);
  witch = await asUser(GM, () => api.createEntity("witch", { ownerId: ANN.id }));
  dracula = await asUser(GM, () => api.createEntity("dracula", { ownerId: BEN.id }));
  await settle();
  await newRaid();
  assert.deepEqual([view().limit, view().partySize], [10, 2]);
  assert.deepEqual(log.errors, []);
});

test("a local chase lasts at most 6 rounds: still running after round 6, a Lead of 1 is cornered (captured), a Lead of 2 escapes", async () => {
  await newRaid();
  // caught (Trouble +1 → 1): the mob is 8; the ground: the crowded square (Sly, Charm)
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, watched: true }, [1, 1, 1]);
  let c = chase();
  assert.deepEqual([c.kind, c.lead, c.mob, c.roundCap], ["local", 1, 8, 6]);
  const start = cards(CARD.chase).filter((m) => cardOf(m).event === "start").at(-1);
  assert.match(start.content, /At most 6 rounds: still running after round 6, a Lead of 2 or more escapes, anything less is cornered/);
  // five Costs (3 + 3 = 6 against 8): the Lead stays at 1
  for (let r = 1; r <= 5; r++) await rollAs(ANN, witch, { trait: "sly", second: "mask", chase: true }, [3, 3, 1]);
  c = chase();
  assert.deepEqual([c.round, c.lead, c.outcome], [6, 1, ""]);
  const tracker = await asUser(ANN, () => openChaseTracker());
  assert.match(tracker.renderedParts.body, /round 6 of 6 at most/);
  // round 6: another Cost, and the Lead decides it: cornered, captured
  await rollAs(ANN, witch, { trait: "sly", second: "mask", chase: true }, [3, 3]);
  c = raid().chase;
  assert.deepEqual([c.outcome, c.capped, c.lead], ["cornered", true, 1]);
  assert.equal(witch.system.status, "captured");
  assert.ok(cards(CARD.chase).some((m) => /Round 6 was the last: Lead 1 \(2 or more escapes\)/.test(m.content)));
  await free(witch);
  // Dracula: caught (+1 → 2, the mob 9); round 1 a Success (Charm d12 → d10 with Garlic: 6 + 4 = 10), then five Costs (4 + 3 = 7)
  await rollAs(BEN, dracula, { trait: "sly", second: "mask", difficulty: 8, watched: true }, [1, 1, 1]);
  assert.equal(chase().mob, 9);
  await rollAs(BEN, dracula, { trait: "charm", second: "mask", chase: true }, [6, 4, 1]);
  assert.equal(chase().lead, 2);
  for (let r = 2; r <= 5; r++) await rollAs(BEN, dracula, { trait: "charm", second: "mask", chase: true }, [4, 3, 1]);
  await rollAs(BEN, dracula, { trait: "charm", second: "mask", chase: true }, [4, 3]);
  c = raid().chase;
  assert.deepEqual([c.outcome, c.capped, c.lead], ["escaped", true, 2]);
  assert.equal(dracula.system.status, "active");
  assert.deepEqual(log.errors, []);
});

test("the round cap's switch off: the chase runs until the Lead ends it", async () => {
  await newRaid();
  await setSetting(SETTINGS.localRoundCap, false);
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, watched: true }, [1, 1, 1]);
  assert.equal(chase().roundCap, 0);
  const tracker = await asUser(ANN, () => openChaseTracker());
  assert.match(tracker.renderedParts.body, /round 1</);
  assert.doesNotMatch(tracker.renderedParts.body, /of 6 at most/);
  await op(GM, OPS.chaseEnd, { outcome: "dropped" });
  await settle();
  await setSetting(SETTINGS.localRoundCap, true);
});

test("giving up only once the round's ground is read (and before anyone rolls)", async () => {
  await newRaid();
  await setSetting(SETTINGS.autoChase, false); // the Storyteller starts the chase and rolls the ground by hand
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, watched: true }, [1, 1]);
  const caught = cards(CARD.roll).at(-1);
  assert.equal(raid().chase, null, "nothing starts by itself with the switch off");
  await op(GM, OPS.chaseStart, { messageId: caught.id });
  await settle();
  assert.equal(chase().ground, null);
  assert.deepEqual(await op(ANN, OPS.chaseGiveUp, { actorId: witch.id }), { ok: false, reason: "noGround" });
  const tracker = await asUser(ANN, () => openChaseTracker());
  assert.doesNotMatch(tracker.renderedParts.body, /data-action="giveUp"/, "no Give up button before the ground");
  diceQueue.push(2);
  await op(GM, OPS.chaseGround, {});
  await settle();
  assert.equal(chase().ground.key, "backAlleys");
  assert.match((await asUser(ANN, () => openChaseTracker())).renderedParts.body, /data-action="giveUp"/);
  assert.equal((await op(ANN, OPS.chaseGiveUp, { actorId: witch.id })).ok, true);
  await settle();
  assert.equal(witch.system.status, "captured");
  await setSetting(SETTINGS.autoChase, true);
  await free(witch);
});

test("in a local chase any of your own abilities may be spent as a raise, even one that does something else", async () => {
  await newRaid();
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, watched: true }, [1, 1, 1]); // the crowded square
  const gift = `ability:${witch.id}:gift`; // A Potion for That: use Wits instead (a switch)
  let content = "";
  await rollAs(ANN, witch, { trait: "sly", second: "mask", chase: true, [`${gift}:raise`]: true }, [9, 3], { seen: (h) => { content = h; } });
  assert.match(content, /any of your own abilities may be spent as a raise on this roll/);
  assert.match(content, new RegExp(`name="${gift}:raise"`), "the dialog offers it as a raise");
  assert.doesNotMatch(content, new RegExp(`name="ability:${dracula.id}:gift:raise"`), "a friend's helps nobody in a local chase");
  const card = lastRoll();
  assert.deepEqual([card.trait, card.baseDie, card.traitDie], ["sly", 10, 12], "Sly d10 → d12 as a raise, not the switch to Wits");
  assert.deepEqual(card.abilities.map((a) => [a.name, a.asRaise]), [["A Potion for That", true]]);
  assert.match(cards(CARD.roll).at(-1).content, /A Potion for That \(as a raise\)/);
  await op(GM, OPS.chaseEnd, { outcome: "dropped" });
  await settle();
  await asUser(ANN, () => witch.update({ "system.charges.value": 3 }));
});

test("a Huge piece one of whose carriers is caught: it can't move (the way out is refused); that carrier captured, the town takes it", async () => {
  await newRaid();
  // both carry the piece (a Huge one needs two)
  await asUser(ANN, () => witch.update({ "system.carryingFurniture": true }));
  await asUser(BEN, () => dracula.update({ "system.carryingFurniture": true }));
  await settle();
  assert.equal(raid().furniture, "inPlay");
  // the Witch is caught (carriers roll the Monster: 1 + 1, Trouble); the ground: the crowded square
  await rollAs(ANN, witch, { trait: "sly", second: "monster", difficulty: 8, watched: true }, [1, 1, 1]);
  assert.equal(chase().kind, "local");
  const hud = await asUser(GM, () => openHud());
  assert.match(hud.renderedParts.body, /The Huge piece can.{1,6}t move until the chase is over/);
  const refused = await refusedRoll(BEN, dracula, { trait: "sly", second: "monster", wayOut: true });
  assert.ok(refused.some((w) => /The Huge piece can.t move until the chase is over/.test(w)), refused.join(" | "));
  assert.equal(raid().partyOut, null, "nobody left town");
  // the Witch is cornered (Trouble at Lead 1) and captured: the town takes the piece; nobody carries it now
  await rollAs(ANN, witch, { trait: "sly", second: "monster", chase: true }, [1, 1]);
  assert.equal(witch.system.status, "captured");
  assert.deepEqual([raid().furniture, raid().furnitureLost], ["lost", true]);
  assert.equal(dracula.system.carryingFurniture, false);
  await free(witch);
  assert.deepEqual(log.errors, []);
});

test("Jekyll: Hyde takes over when the Monster shows, even when an ability kept its Suspicion off", async () => {
  await newRaid();
  const jh = await asUser(GM, () => api.createEntity("jekyll-hyde", { ownerId: BEN.id }));
  await settle();
  await asUser(BEN, () => jh.update({ "system.gift": "pillarOfSociety" }));
  assert.equal(jh.system.form, "jekyll");
  const pillar = `ability:${jh.id}:gift`; // Pillar of Society: the Monster without risking Suspicion
  await rollAs(BEN, jh, { trait: "sly", second: "monster", difficulty: 8, [pillar]: true }, [3, 7]); // the Monster beats Sly
  const card = lastRoll();
  assert.deepEqual([card.showed, card.show, card.suspicion, card.formShift], [true, false, 0, true]);
  assert.equal(jh.system.form, "hyde", "Hyde takes over");
  assert.equal(view().value, 0);
  await asUser(GM, () => jh.delete());
  await settle();
});

test("five Entities in the raid: the Limit is 1 lower on Easy and Standard (the Raid HUD says so); Hard's stays; the switch off", async () => {
  const extra = [];
  for (const [key, owner] of [["mummy", ANN], ["werewolf", BEN], ["ghost", ANN]]) extra.push(await asUser(GM, () => api.createEntity(key, { ownerId: owner.id })));
  await settle();
  // the new-raid dialog shows each label's Limit for this party
  let content = "";
  dialogResponders.push((options) => { content = options.content; return null; });
  await asUser(GM, () => openHud().then((h) => h.runAction("newRaid")));
  await settle();
  assert.match(content, /Standard — Limit 9/);
  assert.match(content, /Hard — Limit 13/);
  await newRaid("standard");
  assert.deepEqual([view().partySize, view().limit], [5, 9]);
  let hud = await asUser(GM, () => openHud());
  assert.match(hud.renderedParts.body, /5 Entities: the Limit is 9 \(Standard.{1,6}s is 10, 1 lower with five\)/);
  // one leaves the raid: four, the label's Limit; back in: five again
  await op(GM, OPS.raidMember, { actorId: extra[0].id, inRaid: false });
  await settle();
  assert.deepEqual([view().partySize, view().limit], [4, 10]);
  await op(GM, OPS.raidMember, { actorId: extra[0].id, inRaid: true });
  await settle();
  assert.deepEqual([view().partySize, view().limit], [5, 9]);
  await newRaid("easy");
  assert.equal(view().limit, 8);
  await newRaid("hard");
  assert.equal(view().limit, 13);
  hud = await asUser(GM, () => openHud());
  assert.match(hud.renderedParts.body, /5 Entities: on Hard the Limit stays 13/);
  // the switch off: the label's Limit whatever the party's size (and switching it sets the Limit again at once)
  await newRaid("standard");
  await setSetting(SETTINGS.limitByPartySize, false);
  await settle();
  assert.deepEqual([view().partySize, view().limit], [0, 10]);
  await setSetting(SETTINGS.limitByPartySize, true);
  await settle();
  assert.deepEqual([view().partySize, view().limit], [5, 9]);
  for (const a of extra) await asUser(GM, () => a.delete());
  await settle();
});

test("the session left no errors, no missing words and no unanswered dialogs", () => {
  assert.deepEqual(log.errors, []);
  assert.deepEqual(log.missingI18n, []);
  assert.equal(dialogResponders.length, 0, "every scripted dialog was used");
});
