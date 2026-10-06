/**
 * Integration smoke test — slice 1 at the table, on the fake Foundry
 * (tools/fake-foundry.mjs): the real entry module booted for a Storyteller (GM)
 * and two players, driven through the real dialogs (scripted answers), the real
 * sheets, cards and HUD, with scripted dice. The steps run in order and share
 * one world, like a session.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  installFoundry, asUser, settle, diceQueue, dialogResponders, fakeForm, renderMessage, clickButton, buttonLabels, FakeElement, log,
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
const { EntitySheet } = await import("../module/sheets/entity-sheet.mjs");
const { openHud, currentHud } = await import("../module/apps/raid-hud.mjs");
Hooks.callAll("init");
Hooks.callAll("ready");
await settle();

const api = game.dontGetForked;
const raid = () => api.raid.view();
const lastMessage = () => game.messages.at(-1);
const cardOf = (m) => m.getFlag(SYSTEM_ID, "card");
const setSetting = (key, value) => asUser(GM, () => game.settings.set(SYSTEM_ID, key, value));

// This session checks slice 1 (the hunt without its chase): the chase automation is off here;
// test/night.test.mjs runs slice 2 (chases, the lock-up, group and Tell checks, the year).
await setSetting(SETTINGS.autoChase, false);
await settle();

/** A scripted DialogV2 answer: press `action` with these form values. */
const press = (action, values = {}) => (options) => {
  const b = options.buttons?.find((x) => x.action === action);
  if (!b) throw new Error(`dialog "${options.window?.title}" has no ${action} button`);
  return b.callback ? b.callback({}, { form: fakeForm(values) }, null) : action;
};
/** Roll as a user through the roll dialog: `values` are the dialog's answers, `faces` the dice. */
async function rollAs(user, actor, values, faces) {
  diceQueue.push(...faces);
  dialogResponders.push(press("roll", values));
  const result = await asUser(user, () => api.roll(actor, { trait: values.trait }));
  await settle();
  return result;
}
/** Count the GM operations that travel over User#query. */
const opsSent = [];
const realQuery = GM.query.bind(GM);
GM.query = async (name, data, opts) => { opsSent.push(data?.op); return realQuery(name, data, opts); };

/** Our hooks, as every client sees them. */
const fired = { rollResolved: 0, raidChanged: 0, suspicionChanged: 0, huntStarted: 0 };
for (const k of Object.keys(fired)) Hooks.on(HOOKS[k], () => { fired[k]++; });

let witch, dracula, jekyll;

test("boot: settings registered, a raid seeded, the HUD shows the Storyteller's controls", () => {
  for (const key of Object.values(SETTINGS)) assert.ok(game.settings.settings.has(`${SYSTEM_ID}.${key}`), `setting ${key} registered`);
  assert.ok(raid().raidId, "the GM seeded a raid");
  assert.equal(raid().limit, 11); // Standard (B3)
  assert.equal(raid().turn, 1);
  const hud = currentHud();
  assert.ok(hud?.rendered, "the GM's HUD is open");
  assert.match(hud.renderedParts.body, /data-action="suspicionUp"/);
  assert.match(hud.renderedParts.body, /data-value="0" data-limit="11"/);
  assert.deepEqual(log.errors, []);
});

test("the Storyteller creates an Entity from the eight (sidebar button, book defaults, owner)", async () => {
  const html = new FakeElement("section");
  html.innerHTML = `<header class="directory-header"><div class="header-actions"></div></header>`;
  asUser(GM, () => Hooks.callAll("renderActorDirectory", {}, html));
  const button = html.querySelector(".dgf-new-entity");
  assert.ok(button, "the GM gets a New Entity button");
  const playerHtml = new FakeElement("section");
  playerHtml.innerHTML = `<div class="header-actions"></div>`;
  asUser(ANN, () => Hooks.callAll("renderActorDirectory", {}, playerHtml));
  assert.equal(playerHtml.querySelector(".dgf-new-entity"), null, "players don't");

  dialogResponders.push(press("ok", { entity: "witch", owner: ANN.id }));
  asUser(GM, () => button.click());
  await settle();
  witch = game.actors.getName("A Witch");
  assert.ok(witch, "the Witch exists");
  assert.equal(witch.type, "entity");
  assert.deepEqual({ ...witch.system.traits }, { brawn: 6, nimble: 4, sly: 10, charm: 8, wits: 12 });
  assert.deepEqual({ ...witch.system.charges }, { value: 3, start: 3 });
  assert.equal(witch.system.gift, "broomstick");
  assert.equal(witch.system.perk, "familiarsWarning");
  assert.equal(witch.system.duty, "cook");
  assert.equal(witch.system.status, "active");
  assert.equal(witch.ownership[ANN.id], 3);
  assert.ok(witch.testUserPermission(BEN, "OBSERVER"), "the party can see each other's sheets");

  dracula = await asUser(GM, () => api.createEntity("dracula", { ownerId: BEN.id }));
  jekyll = await asUser(GM, () => api.createEntity("jekyll-hyde", { ownerId: ANN.id }));
  assert.equal(jekyll.system.form, "jekyll");
  await assert.rejects(asUser(ANN, () => api.createEntity("ghost")), /lacks permission/);
});

test("the sheet shows the book: dice, signature, Gift, Perk, Duty, Weakness, Tell", async () => {
  const sheet = new EntitySheet({ document: witch });
  await asUser(ANN, () => sheet.render());
  const html = sheet.renderedParts.sheet;
  for (const s of ["Hedge Spell", "hers or a friend’s", "Broomstick", "open an approach with Nimble", "Familiar’s Warning", "Cook", "Rowan", "A Black Cat", "d12", 'data-action="rollTrait"', 'data-action="spendCharge"'])
    assert.ok(html.includes(s), `the sheet shows ${s}`);
  assert.ok(!html.includes('data-action="drinkDraught"'), "only Jekyll & Hyde has the Draught");
  const jh = new EntitySheet({ document: jekyll });
  await asUser(ANN, () => jh.render());
  assert.ok(jh.renderedParts.sheet.includes('data-action="drinkDraught"'));
  assert.ok(jh.renderedParts.sheet.includes("Jekyll"));
});

test("a player rolls: dialog → dice → card; the GM's client applies the Suspicion via the query op", async () => {
  opsSent.length = 0;
  const before = fired.rollResolved;
  const r = await rollAs(ANN, witch, { trait: "sly", second: "monster", difficulty: 8 }, [2, 9]);
  assert.equal(r.ok, true);
  assert.equal(log.rolls.at(-2).formula, "1d10");
  assert.equal(log.rolls.at(-1).formula, "1d10");
  const msg = lastMessage();
  const card = cardOf(msg);
  assert.equal(card.kind, CARD.roll);
  assert.equal(msg.author, ANN.id);
  assert.equal(card.total, 11);
  assert.equal(card.band, "success");
  assert.equal(card.show, true);
  assert.equal(card.suspicion, 2);
  assert.equal(card.applied, true, "the GM marked the card applied");
  assert.deepEqual(opsSent, [OPS.raidApplyCard], "the player's client asked the GM through User#query");
  assert.equal(raid().value, 2);
  assert.equal(fired.rollResolved, before + 1);
  // the card, as each viewer sees it
  assert.match(msg.content, /Success/);
  assert.match(msg.content, /The Monster shows/);
  assert.match(msg.content, /Suspicion \+2/);
  assert.deepEqual(buttonLabels(msg, ANN), [], "players get no Storyteller buttons");
  assert.deepEqual(buttonLabels(msg, GM), ["Cancel Suspicion"]);
  // the HUD on a player's client
  const hud = await asUser(ANN, () => openHud());
  assert.match(hud.renderedParts.body, /data-value="2" data-limit="11"/);
  assert.doesNotMatch(hud.renderedParts.body, /suspicionUp/, "no controls for players");
});

test("a Cost: the Storyteller picks one on the card and it applies itself", async () => {
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8 }, [3, 4]); // 7 vs 8
  const msg = lastMessage();
  assert.equal(cardOf(msg).band, "cost");
  assert.deepEqual(cardOf(msg).costs, ["suspicion", "loseTurn", "smaller"], "no 'drop an item' while she carries nothing");
  assert.match(msg.content, /the Storyteller picks one/);
  assert.deepEqual(buttonLabels(msg, ANN), []);
  assert.deepEqual(buttonLabels(msg, GM), ["Suspicion +1", "Lose a Turn", "Next roll one size smaller"]);
  clickButton(renderMessage(msg, GM), "Next roll one size smaller", GM);
  await settle();
  assert.equal(cardOf(msg).cost, "smaller");
  assert.equal(witch.system.nextRollSmaller, 1);
  assert.deepEqual(buttonLabels(msg, GM), [], "a Cost is picked once");

  // the next roll's trait die is one size smaller, then the mark is gone
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8 }, [6, 3]);
  assert.equal(log.rolls.at(-2).formula, "1d8");
  assert.equal(witch.system.nextRollSmaller, 0);

  // Suspicion +1 as the Cost: the roll's own event rises once
  const value = raid().value;
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8 }, [4, 3]);
  clickButton(renderMessage(lastMessage(), GM), "Suspicion +1", GM);
  await settle();
  assert.equal(raid().value, value + 1);
  assert.equal(cardOf(lastMessage()).suspicion, 1);

  // Lose a Turn marks the Turn the Entity skips
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8 }, [4, 3]);
  clickButton(renderMessage(lastMessage(), GM), "Lose a Turn", GM);
  await settle();
  assert.equal(witch.system.skipTurn, raid().turn + 1);
  assert.match(lastMessage().content, /loses Turn 2/);

  // drop an item: only when carrying, and it leaves the sheet
  await asUser(ANN, () => witch.update({ "system.carried": [{ name: "a jar of honey" }] }));
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8 }, [4, 3]);
  assert.ok(cardOf(lastMessage()).costs.includes("drop"));
  clickButton(renderMessage(lastMessage(), GM), "Drop an item", GM);
  await settle();
  assert.deepEqual(witch.system.carried, []);
  assert.match(lastMessage().content, /drops a jar of honey/);
});

test("abilities: a helper's charge is spent by the GM, the roller's own by itself; a Critical gives one back", async () => {
  // Ben's Dracula rolls Sly (d6); Ann's Witch helps with Hedge Spell (a raise): d6 → d8
  const witchHedge = `ability:${witch.id}:signature`;
  await rollAs(BEN, dracula, { trait: "sly", second: "mask", difficulty: 8, [witchHedge]: true }, [5, 5]);
  const card = cardOf(lastMessage());
  assert.equal(card.traitDie, 8);
  assert.equal(card.critical, true);
  assert.equal(witch.system.charges.value, 2, "the helper paid, through the GM");
  assert.equal(dracula.system.charges.value, 3, "a Critical never goes above the starting number");
  await assert.rejects(asUser(BEN, () => witch.update({ "system.charges.value": 3 })), /lacks permission/);

  // the Witch on her own roll: Hedge Spell on Sly (d10 → d12); a Critical gives the charge back
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, [witchHedge]: true }, [4, 4]);
  assert.equal(cardOf(lastMessage()).traitDie, 12);
  assert.equal(witch.system.charges.value, 2, "spent one, got one back");
  // a raise on a d12 is lost, and the card says so
  await rollAs(ANN, witch, { trait: "wits", second: "mask", difficulty: 8, [witchHedge]: true }, [7, 2]);
  assert.match(lastMessage().content, /A d12 can(&#x27;|')t go higher: the raise is lost/);
  await asUser(ANN, () => witch.update({ "system.charges.value": 2 }));

  // at most one raise per roll: Hedge Spell + Castle Duty is refused, then rolled without the Duty
  diceQueue.push(9, 1);
  dialogResponders.push(press("roll", { trait: "sly", second: "mask", difficulty: 8, [witchHedge]: true, duty: true }));
  dialogResponders.push(press("roll", { trait: "sly", second: "mask", difficulty: 8, [witchHedge]: true }));
  await asUser(ANN, () => api.roll(witch, { trait: "sly" }));
  await settle();
  assert.ok(log.warnings.some((w) => w.includes("At most one raise per roll")), "the player is told why");
  assert.equal(cardOf(lastMessage()).traitDie, 12);

  // overdraw: no charges left, the ability still works for Suspicion +2
  await asUser(ANN, () => witch.update({ "system.charges.value": 0 }));
  const value = raid().value;
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, [witchHedge]: true }, [10, 6]);
  const od = cardOf(lastMessage());
  assert.equal(od.band, "success");
  assert.equal(od.suspicion, 2);
  assert.deepEqual(od.triggers.map((x) => x.key), ["overdraw"]);
  assert.equal(raid().value, value + 2);
  assert.equal(witch.system.charges.value, 0);
  await asUser(ANN, () => witch.update({ "system.charges.value": 3 }));
});

test("spending a charge from the sheet, and Jekyll & Hyde's change of form", async () => {
  await asUser(ANN, () => api.spendCharge(witch));
  await settle();
  assert.equal(witch.system.charges.value, 2);
  assert.equal(cardOf(lastMessage()).kind, CARD.ability);

  // the Monster shows on Jekyll's roll (Brawn d4: 2, Monster 5): Hyde takes over, free
  await rollAs(ANN, jekyll, { trait: "brawn", second: "monster", difficulty: 8 }, [2, 5]);
  assert.equal(cardOf(lastMessage()).formShift, true);
  assert.equal(jekyll.system.form, "hyde");
  assert.equal(jekyll.system.traits.brawn, 12);
  assert.equal(jekyll.system.charges.value, 3);
  assert.match(lastMessage().content, /Hyde takes over/);
  // the Draught back to Jekyll: Practised Hand makes it free
  await asUser(ANN, () => api.drinkDraught(jekyll));
  await settle();
  assert.equal(jekyll.system.form, "jekyll");
  assert.equal(jekyll.system.traits.charm, 12);
  assert.equal(jekyll.system.charges.value, 3);
  assert.match(lastMessage().content, /drinks the Draught: now Jekyll/);
  // and to Hyde costs a charge
  await asUser(ANN, () => api.drinkDraught(jekyll));
  await settle();
  assert.equal(jekyll.system.form, "hyde");
  assert.equal(jekyll.system.charges.value, 2);
});

test("the Storyteller's HUD: +1 / −1, undo, cancel and restore an event (the card follows)", async () => {
  const hud = await asUser(GM, () => openHud());
  const v0 = raid().value;
  await asUser(GM, () => hud.runAction("suspicionUp"));
  await settle();
  assert.equal(raid().value, v0 + 1);
  await asUser(GM, () => hud.runAction("undo"));
  await settle();
  assert.equal(raid().value, v0);
  await asUser(GM, () => hud.runAction("suspicionDown"));
  await settle();
  assert.equal(raid().value, v0 - 1);
  await asUser(GM, () => hud.runAction("undo"));
  await settle();
  assert.equal(raid().value, v0);

  // cancel the first roll's +2 from the HUD's event list
  const first = game.messages.find((m) => cardOf(m)?.kind === CARD.roll && cardOf(m).suspicion === 2);
  const eventId = cardOf(first).eventId;
  assert.match(hud.renderedParts.body, new RegExp(`data-event-id="${eventId}"`));
  await asUser(GM, () => hud.runAction("cancelEvent", { eventId }));
  await settle();
  assert.equal(raid().value, v0 - 2);
  assert.equal(cardOf(first).cancelled, true);
  assert.deepEqual(buttonLabels(first, GM), ["Restore Suspicion"]);
  assert.match(first.content, /cancelled by the Storyteller/);
  clickButton(renderMessage(first, GM), "Restore Suspicion", GM);
  await settle();
  assert.equal(raid().value, v0);
  assert.equal(cardOf(first).cancelled, false);
});

test("Turns, dawn and the hunt: dawn starts the hunt; then Suspicion stops and the Mask is off", async () => {
  const hud = currentHud();
  const hunts = fired.huntStarted;
  for (let i = 0; i < 11; i++) await asUser(GM, () => hud.runAction("nextTurn"));
  await settle();
  assert.equal(raid().turn, 12);
  assert.equal(raid().hunt, false);
  await asUser(GM, () => hud.runAction("nextTurn"));
  await settle();
  assert.equal(raid().dawn, true);
  assert.equal(raid().hunt, true);
  assert.equal(raid().huntCause, "dawn");
  assert.ok(fired.huntStarted >= hunts + 1, "every client heard huntStarted");
  assert.equal(cardOf(lastMessage()).kind, CARD.raid);
  assert.match(lastMessage().content, /The whole town hunts/);
  assert.match(hud.renderedParts.body, /Dawn/);

  const value = raid().value;
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8 }, [1, 1]);
  const card = cardOf(lastMessage());
  assert.equal(card.second, "monster", "the Mask is off");
  assert.equal(card.band, "trouble");
  assert.equal(card.suspicion, 0);
  assert.equal(raid().value, value);

  await asUser(GM, () => hud.runAction("toggleHunt"));
  await asUser(GM, () => hud.runAction("prevTurn"));
  await settle();
  assert.equal(raid().hunt, false);
  assert.equal(raid().dawn, false);
});

test("players cannot write the raid: not the setting, not a GM-only operation", async () => {
  const before = JSON.stringify(game.settings.get(SYSTEM_ID, SETTINGS.raidState));
  await assert.rejects(asUser(ANN, () => game.settings.set(SYSTEM_ID, SETTINGS.raidState, { raidId: "mine" })), /lacks permission/);
  for (const [op, args] of [[OPS.raidAdjust, { delta: 5 }], [OPS.raidReset, { difficulty: "easy" }], [OPS.raidHunt, { on: true }], [OPS.raidTurn, { delta: 1 }], [OPS.raidUndo, {}]]) {
    const r = await asUser(ANN, () => api.runOp(op, args));
    assert.deepEqual(r, { ok: false, reason: "gmOnly" }, `${op} refused`);
  }
  // a player pressing a HUD action anyway changes nothing
  const hud = await asUser(BEN, () => openHud());
  await asUser(BEN, () => hud.runAction("suspicionUp"));
  await settle();
  assert.equal(JSON.stringify(game.settings.get(SYSTEM_ID, SETTINGS.raidState)), before);
  // a roll card can't be replayed into another raid
  assert.equal((await asUser(ANN, () => api.runOp(OPS.raidApplyCard, { messageId: "nope" }))).ok, false);
});

test("a new raid; the Limit starts the hunt; the track never goes past it", async () => {
  const hud = currentHud();
  dialogResponders.push(press("ok", { difficulty: "easy" }));
  await asUser(GM, () => hud.runAction("newRaid"));
  await settle();
  assert.equal(raid().limit, 11); // Easy (B3)
  assert.equal(raid().value, 0);
  assert.equal(jekyll.system.form, "jekyll", "M3: Jekyll & Hyde starts each raid as Jekyll");
  assert.equal(jekyll.system.traits.charm, 12);
  assert.equal(jekyll.system.charges.value, 3, "charges refill");
  assert.equal(raid().turn, 1);
  assert.match(lastMessage().content, /A new raid/);
  // an old card belongs to the old raid
  const old = game.messages.find((m) => cardOf(m)?.kind === CARD.roll && cardOf(m).suspicion > 0);
  assert.deepEqual(await asUser(GM, () => api.runOp(OPS.raidApplyCard, { messageId: old.id })), { ok: false, reason: "otherRaid" });
  assert.deepEqual(buttonLabels(old, GM), [], "no Suspicion buttons on a card from an earlier raid");

  for (let i = 0; i < 12; i++) await asUser(GM, () => api.runOp(OPS.raidAdjust, { delta: 1 }));
  await settle();
  assert.equal(raid().value, 11, "the track never goes past the Limit");
  assert.equal(raid().hunt, true);
  assert.equal(raid().huntCause, "limit");
  assert.match(hud.renderedParts.body, /The whole town hunts/);
  await asUser(GM, () => api.runOp(OPS.raidReset, { difficulty: "standard" }));
  await settle();
});

test("no Storyteller connected: nothing changes; when the GM returns, the roll is reconciled", async () => {
  GM.active = false;
  await rollAs(ANN, witch, { trait: "sly", second: "monster", difficulty: 8 }, [1, 9]);
  const msg = lastMessage();
  assert.equal(cardOf(msg).suspicion, 2);
  assert.equal(cardOf(msg).applied, false);
  assert.ok(log.warnings.some((w) => w.startsWith("Ann:") && w.includes("isn't connected")));
  assert.equal(raid().value, 0);
  GM.active = true;
  const n = await asUser(GM, () => api.raid.reconcile());
  await settle();
  assert.equal(n, 1);
  assert.equal(raid().value, 2);
  assert.equal(cardOf(msg).applied, true);
  assert.equal(await asUser(GM, () => api.raid.reconcile()), 0, "reconciling twice adds nothing");
});

test("the socket fallback carries the request when User#query is missing", async () => {
  GM.query = null;
  const value = raid().value;
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, loud: true }, [6, 6]);
  await settle();
  assert.equal(cardOf(lastMessage()).suspicion, 1, "the loud way: +1 whatever the result");
  assert.equal(cardOf(lastMessage()).applied, true);
  assert.equal(raid().value, value + 1);
  assert.ok(log.emits.some((e) => e.payload?.type === "request" && e.from === ANN.id));
  GM.query = async (name, data, opts) => { opsSent.push(data?.op); return realQuery(name, data, opts); };
});

test("every automation can be switched off", async () => {
  // Suspicion by hand: the card waits for the Storyteller's Apply
  await setSetting(SETTINGS.autoSuspicion, false);
  let value = raid().value;
  await rollAs(ANN, witch, { trait: "sly", second: "monster", difficulty: 8 }, [1, 9]);
  let msg = lastMessage();
  assert.equal(cardOf(msg).applied, false);
  assert.equal(raid().value, value);
  assert.deepEqual(buttonLabels(msg, GM), ["Apply Suspicion"]);
  clickButton(renderMessage(msg, GM), "Apply Suspicion", GM);
  await settle();
  assert.equal(raid().value, value + 2);
  await setSetting(SETTINGS.autoSuspicion, true);

  // charges by hand
  await setSetting(SETTINGS.autoCharges, false);
  const charges = witch.system.charges.value;
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, [`ability:${witch.id}:signature`]: true }, [12, 6]);
  assert.equal(witch.system.charges.value, charges);
  await setSetting(SETTINGS.autoCharges, true);

  // Jekyll stays Jekyll; the card says Hyde takes over (the new raid above started him as Jekyll: M3)
  assert.equal(jekyll.system.form, "jekyll");
  await setSetting(SETTINGS.autoForm, false);
  await rollAs(ANN, jekyll, { trait: "brawn", second: "monster", difficulty: 8 }, [1, 6]);
  assert.equal(jekyll.system.form, "jekyll");
  assert.match(lastMessage().content, /automatic changes of form are off/);
  await setSetting(SETTINGS.autoForm, true);

  // a Cost only recorded
  await setSetting(SETTINGS.autoCosts, false);
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8 }, [4, 3]);
  msg = lastMessage();
  clickButton(renderMessage(msg, GM), "Next roll one size smaller", GM);
  await settle();
  assert.equal(cardOf(msg).cost, "smaller");
  assert.equal(witch.system.nextRollSmaller, 0);
  await setSetting(SETTINGS.autoCosts, true);

  // the hunt by hand: the Limit is announced, the hunt waits for the Storyteller
  await setSetting(SETTINGS.autoHunt, false);
  value = raid().value;
  for (let i = value; i < raid().limit; i++) await asUser(GM, () => api.runOp(OPS.raidAdjust, { delta: 1 }));
  await settle();
  assert.equal(raid().atLimit, true);
  assert.equal(raid().hunt, false);
  assert.match(lastMessage().content, /At the Limit/);
  await setSetting(SETTINGS.autoHunt, true);
  await asUser(GM, () => api.runOp(OPS.raidReset, { difficulty: "standard" }));
  await settle();

  // the HUD off: it closes and won't open
  await setSetting(SETTINGS.hudVisible, false);
  await settle();
  assert.equal(asUser(GM, () => currentHud()).rendered, false);
  assert.equal(await asUser(GM, () => openHud()), null);
  await setSetting(SETTINGS.hudVisible, true);
  await settle();
  assert.equal(asUser(GM, () => currentHud()).rendered, true);
});

test("a retried request applies once; only the active GM's client acts on a query", async () => {
  const { handleQuery } = await import("../module/net/gm-ops.mjs");
  const { User } = await import("../tools/fake-foundry.mjs");
  // a second Storyteller, connected but not the active GM: its requests travel to the active GM's client
  const AST = new User({ id: "astUser000000000", name: "Assistant", isGM: true });
  game.users.push(AST);
  const v = raid().value;
  const payload = { op: OPS.raidAdjust, args: { delta: 1 }, userId: AST.id, requestId: "retry-0000000001" };
  await asUser(GM, () => handleQuery(payload));
  await asUser(GM, () => handleQuery(payload));
  await settle();
  assert.equal(raid().value, v + 1);
  assert.deepEqual(await asUser(ANN, () => handleQuery({ ...payload, requestId: "retry-0000000002" })), { ok: false, reason: "notActiveGM" });
  assert.deepEqual(await asUser(GM, () => handleQuery({ op: "raid.nonsense", args: {}, userId: AST.id })), { ok: false, reason: "unknownOp" });
  // the active GM never asks itself over the wire: a request claiming to be from it is refused
  assert.deepEqual(await asUser(GM, () => handleQuery({ ...payload, userId: GM.id, requestId: "retry-0000000003" })), { ok: false, reason: "spoofed" });
  await asUser(GM, () => api.runOp(OPS.raidUndo, {}));
  await settle();
  assert.equal(raid().value, v);
  AST.active = false;
  game.users.splice(game.users.indexOf(AST), 1);
});

test("the session left no errors, no missing words and no unanswered dialogs", () => {
  assert.deepEqual(log.errors, []);
  assert.deepEqual(log.missingI18n, []);
  assert.equal(dialogResponders.length, 0);
  assert.equal(diceQueue.length, 0);
  assert.ok(fired.raidChanged > 0 && fired.suspicionChanged > 0);
});
