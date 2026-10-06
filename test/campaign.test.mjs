/**
 * The optional campaign rules (rulebook Chapter 7, "Optional: Campaign Play"; audit FA-R9): "each piece of
 * furniture or decor brought home becomes a castle upgrade. In every later raid, each upgrade gives one Entity
 * of the players' choice one extra charge. The castle holds three upgrades at most; bringing home a fourth
 * replaces one of them." On the fake Foundry: a Storyteller and two players.
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
Hooks.callAll("init");
Hooks.callAll("ready");
await settle();

const api = game.dontGetForked;
const raid = () => api.raid.get();
const cardOf = (m) => m.getFlag(SYSTEM_ID, "card");
const cards = (kind) => game.messages.filter((m) => cardOf(m)?.kind === kind);
const castle = () => game.settings.get(SYSTEM_ID, SETTINGS.castleUpgrades);
const setSetting = (key, value) => asUser(GM, () => game.settings.set(SYSTEM_ID, key, value));
const op = (user, name, args = {}) => asUser(user, () => api.runOp(name, args));
const press = (action, values = {}) => (options) => {
  const b = options.buttons?.find((x) => x.action === action);
  if (!b) throw new Error(`dialog "${options.window?.title}" has no ${action} button`);
  return b.callback ? b.callback({}, { form: fakeForm(values) }, null) : action;
};
/** A year that brings a piece home (a Grand Year): the Storyteller reads it. */
async function grandYear() {
  await op(GM, OPS.raidEnd, { list: [{ name: "a wheel of strong cheese", duty: "cook", essential: true, home: true }], furnitureHome: true });
  await settle();
  return cards(CARD.year).at(-1);
}
const UPGRADE = "Add a castle upgrade";

let witch, dracula;

test("campaign play is off to start with: no castle upgrade is offered or kept", async () => {
  witch = await asUser(GM, () => api.createEntity("witch", { ownerId: ANN.id }));
  dracula = await asUser(GM, () => api.createEntity("dracula", { ownerId: BEN.id }));
  await settle();
  assert.equal(game.settings.get(SYSTEM_ID, SETTINGS.campaign), false);
  assert.deepEqual(castle(), []);
  const year = await grandYear();
  assert.equal(cardOf(year).result, "grand");
  assert.ok(!buttonLabels(year, GM).includes(UPGRADE));
  assert.equal((await op(GM, OPS.castleUpgrade, { messageId: year.id, name: "a gilt mirror" })).reason, "campaignOff");
  assert.deepEqual(castle(), []);
});

test("with campaign play on, a year that brings a piece home offers the Storyteller a castle upgrade, once", async () => {
  await setSetting(SETTINGS.campaign, true);
  await op(GM, OPS.raidReset, { difficulty: "standard" });
  await settle();
  const year = await grandYear();
  assert.ok(buttonLabels(year, GM).includes(UPGRADE));
  assert.deepEqual(buttonLabels(year, ANN), [], "the players see no button");
  assert.equal((await op(ANN, OPS.castleUpgrade, { messageId: year.id, name: "mine" })).reason, "gmOnly");
  dialogResponders.push(press("ok", { name: "a gilt mirror" }));
  clickButton(renderMessage(year, GM), UPGRADE, GM);
  await settle();
  assert.deepEqual(castle(), ["a gilt mirror"]);
  assert.ok(!buttonLabels(year, GM).includes(UPGRADE), "one upgrade per piece");
  assert.equal((await op(GM, OPS.castleUpgrade, { messageId: year.id, name: "again" })).reason, "already");
  assert.match(game.messages.at(-1).content, /a gilt mirror/);
  const hud = await asUser(GM, () => openHud());
  assert.match(hud.renderedParts.body, /The castle: 1 of 3 upgrades/);
  const annHud = await asUser(ANN, () => openHud());
  assert.match(annHud.renderedParts.body, /The castle: 1 of 3 upgrades/);
});

test("at a new raid the Storyteller gives each upgrade's extra charge to an Entity in the raid, which starts with it", async () => {
  dialogResponders.push(press("ok", { difficulty: "standard" }), press("ok", { [`extra.${witch.id}`]: 1 }));
  await asUser(GM, () => currentHud().runAction("newRaid"));
  await settle();
  assert.equal(witch.system.charges.value, 4);
  assert.equal(witch.system.charges.extra, 1);
  assert.equal(dracula.system.charges.value, 3);
  assert.equal(dracula.system.charges.extra, 0);
  // her starting number is 4 now: a Critical gives a spent charge back up to 4
  diceQueue.push(5, 5);
  dialogResponders.push(press("roll", { trait: "sly", second: "mask", difficulty: 8, [`ability:${witch.id}:signature`]: true }));
  await asUser(ANN, () => api.roll(witch, { trait: "sly" }));
  await settle();
  assert.equal(cardOf(game.messages.filter((m) => cardOf(m)?.kind === CARD.roll).at(-1)).critical, true);
  assert.equal(witch.system.charges.value, 4, "spent one, got one back, up to her starting 4");
  // no more extra charges than upgrades, and only to Entities in the raid
  const id = raid().raidId;
  assert.equal((await op(GM, OPS.raidReset, { difficulty: "standard", extra: { [witch.id]: 2 } })).reason, "tooManyExtra");
  const wolf = await asUser(GM, () => api.createEntity("werewolf")); // nobody plays it: not in the next raid
  assert.equal((await op(GM, OPS.raidReset, { difficulty: "standard", extra: { [wolf.id]: 1 } })).reason, "extraNotInRaid");
  assert.equal(raid().raidId, id, "a refused new raid changes nothing");
  await asUser(GM, () => wolf.delete());
  // the next raid: the players choose again (here, nobody)
  await op(GM, OPS.raidReset, { difficulty: "standard" });
  await settle();
  assert.equal(witch.system.charges.value, 3);
  assert.equal(witch.system.charges.extra, 0);
});

test("the castle holds three upgrades: a fourth replaces the one the Storyteller names", async () => {
  for (const name of ["a stuffed bear", "a suit of armour"]) {
    const year = await grandYear();
    assert.equal((await op(GM, OPS.castleUpgrade, { messageId: year.id, name })).ok, true);
    await op(GM, OPS.raidReset, { difficulty: "standard" });
    await settle();
  }
  assert.deepEqual(castle(), ["a gilt mirror", "a stuffed bear", "a suit of armour"]);
  const year = await grandYear();
  assert.equal((await op(GM, OPS.castleUpgrade, { messageId: year.id, name: "a four-poster bed" })).reason, "full");
  let content = "";
  dialogResponders.push((options) => { content = options.content; return press("ok", { name: "a four-poster bed", replace: "0" })(options); });
  clickButton(renderMessage(year, GM), UPGRADE, GM);
  await settle();
  assert.match(content, /name="replace"/);
  assert.deepEqual(castle(), ["a four-poster bed", "a stuffed bear", "a suit of armour"]);
});

test("the campaign's session left no errors, no missing words and no unanswered dialogs", () => {
  assert.deepEqual(log.errors, []);
  assert.deepEqual(log.missingI18n, []);
  assert.equal(dialogResponders.length, 0);
});
