/**
 * The Foundry system audit (docs/audits/FOUNDRY-AUDIT.md): one test per confirmed
 * finding, each written to fail before its fix. Rules first (pure roll plan),
 * then the table on the fake Foundry (tools/fake-foundry.mjs): a Storyteller,
 * two players and an Assistant GM who isn't connected.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  installFoundry, asUser, settle, diceQueue, dialogResponders, fakeForm, renderMessage, clickButton, buttonLabels, log,
} from "../tools/fake-foundry.mjs";
import { entitySystem, rollAbilities } from "../module/logic/entity.mjs";
import { buildRollPlan, resolvePlannedRoll } from "../module/logic/roll-plan.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ------------------------------------------------------------- the rules -- */

const roller = (key, patch = {}) => ({ id: "me", system: { ...entitySystem(key), ...patch } });
const ownAbility = (r, slot) => {
  const a = rollAbilities(r.system).find((x) => x.slot === slot);
  return { ...a, payerId: r.id, payerName: "Me", payer: { charges: r.system.charges.value, weaknessInPlay: false } };
};
const plan = (r, opts = {}) => buildRollPlan({ roller: r, trait: "sly", second: "mask", difficulty: 8, abilities: [], ...opts });

test("Chapter 5: a trait the way out or the lock-up lists as loud is loud however you came to roll it", () => {
  // Brute Force (use Brawn instead) at the way out: Brawn is its loud way
  const creature = roller("creature");
  const brute = plan(creature, { wayOut: true, trait: "sly", abilities: [ownAbility(creature, "signature")] });
  assert.equal(brute.ok, true);
  assert.equal(brute.trait, "brawn");
  assert.equal(brute.loud, true, "rolling Brawn at the way out is the loud way");
  assert.ok(resolvePlannedRoll(brute, 6, 5).triggers.some((x) => x.key === "loud"));
  // the other way round: Brawn called, but Keen Nose rolls Wits: not the loud way
  const ww = roller("werewolf");
  const nose = plan(ww, { wayOut: true, trait: "brawn", abilities: [ownAbility(ww, "gift")] });
  assert.equal(nose.trait, "wits");
  assert.equal(nose.loud, false, "Wits isn't the way out's loud way");
  // the lock-up: a captive slipping free with Brute Force rolls Brawn, the loud way
  const held = roller("creature", { status: "captured", capturedTurn: 1 });
  const slip = plan(held, { lockup: "slip", turn: 2, difficulty: 10, trait: "sly", abilities: [ownAbility(held, "signature")] });
  assert.equal(slip.ok, true);
  assert.equal(slip.loud, true);
});

test("Chapter 4 (T4): a Cost at the way out gets everyone out, free: the Storyteller picks no Cost", () => {
  const ww = roller("werewolf");
  const way = resolvePlannedRoll(plan(ww, { wayOut: true, trait: "nimble" }), 3, 3); // 6 against 8: a Cost
  assert.equal(way.band, "cost");
  assert.equal(way.wayOutBeaten, true);
  assert.deepEqual(way.costs, []);
  // a rescue's Cost still costs as usual
  const rescue = resolvePlannedRoll(plan(ww, { lockup: "rescue", trait: "sly", difficulty: 10 }), 4, 4);
  assert.equal(rescue.band, "cost");
  assert.ok(rescue.costs.length > 0);
});

test("Chapter 2 (F19): no Castle Duty raise in a chase, whether or not the tracker runs it", () => {
  const witch = roller("witch"); // Sly d10, Cook
  const local = plan(witch, { duty: true, chase: true });
  assert.equal(local.raises, 0);
  assert.equal(local.traitDie, 10);
  assert.equal(local.duty, false);
  const flight = plan(witch, { duty: true, hunt: true, second: "monster" });
  assert.equal(flight.raises, 0);
  assert.equal(flight.traitDie, 10);
  // so Hedge Spell and a ticked Duty in a chase are one raise, not two
  const both = plan(witch, { duty: true, chase: true, abilities: [ownAbility(witch, "signature")] });
  assert.equal(both.ok, true);
  assert.equal(both.traitDie, 12);
  // away from a chase the Duty still raises
  assert.equal(plan(witch, { duty: true }).traitDie, 12);
});

/* ------------------------------------------------------------- the table -- */

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
const { SYSTEM_ID, SETTINGS, OPS, CARD, QUERY, SOCKET } = await import("../module/contracts.mjs");
const { openHud, currentHud } = await import("../module/apps/raid-hud.mjs");
const dialogs = await import("../module/apps/raid-dialogs.mjs");
Hooks.callAll("init");
Hooks.callAll("ready");
await settle();

const api = game.dontGetForked;
const raid = () => api.raid.get();
const view = () => api.raid.view();
const lastMessage = () => game.messages.at(-1);
const cardOf = (m) => m.getFlag(SYSTEM_ID, "card");
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

const EVIL = "Witchy <img src=x onerror=alert(1)>";
let witch, dracula;

test("boot: two Entities for two players", async () => {
  witch = await asUser(GM, () => api.createEntity("witch", { ownerId: ANN.id }));
  dracula = await asUser(GM, () => api.createEntity("dracula", { ownerId: BEN.id }));
  await settle();
  assert.deepEqual(log.errors, []);
});

test("no HTML from a player's Entity name runs on the Storyteller's client: the drop-an-item and overdraw dialogs escape it", async () => {
  await asUser(ANN, () => witch.update({ name: EVIL, "system.carried": [{ name: "a jar of honey" }, { name: "the silver spoons" }] }));
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8 }, [4, 3]); // 7 against 8: a Cost
  const msg = lastMessage();
  assert.equal(cardOf(msg).band, "cost");
  let seen = "";
  dialogResponders.push((options) => { seen = options.content; return 0; });
  clickButton(renderMessage(msg, GM), "Drop an item", GM);
  await settle();
  assert.ok(seen, "the Storyteller was asked which item drops");
  assert.doesNotMatch(seen, /<img/);
  assert.match(seen, /&lt;img/);
  // the overdraw confirmation (a GM can press the sheet's button for any Entity)
  await asUser(GM, () => witch.update({ "system.charges.value": 0 }));
  let asked = "";
  dialogResponders.push((options) => { asked = options.content; return false; });
  await asUser(GM, () => api.spendCharge(witch));
  await settle();
  assert.ok(asked);
  assert.doesNotMatch(asked, /<img/);
  await asUser(GM, () => witch.update({ name: "A Witch", "system.charges.value": 3, "system.carried": [] }));
  await settle();
});

test("a forged card can't act on someone else's Entity: the card's Entity must belong to whoever posted it", async () => {
  await op(GM, OPS.lockupSet, { actorId: dracula.id, captured: true });
  await settle();
  assert.equal(dracula.system.status, "captured");
  const forge = (fields) => asUser(ANN, () => ChatMessage.create({
    content: "<p>forged</p>",
    flags: { [SYSTEM_ID]: { card: { v: 1, kind: CARD.roll, raidId: raid().raidId, eventId: `roll:${fields.id}`, actorId: dracula.id, actorName: "Dracula", band: "success", suspicion: 0, gmSeen: false, applied: false, cancelled: false, ...fields } } },
  }));
  // a slip-free card for Ben's Dracula, posted by Ann
  const slip = await forge({ id: "forged1", lockup: "slip", freed: true });
  const r = await op(ANN, OPS.raidRoll, { messageId: slip.id });
  await settle();
  assert.equal(r.ok, false);
  assert.equal(r.reason, "notTheirs");
  assert.equal(dracula.system.status, "captured", "Dracula is still held");
  // a card that would raise Suspicion in Dracula's name
  const before = view().value;
  const loud = await forge({ id: "forged2", suspicion: 2, triggers: [{ key: "monster", amount: 2 }] });
  assert.equal((await op(ANN, OPS.raidApplyCard, { messageId: loud.id })).reason, "notTheirs");
  await settle();
  assert.equal(view().value, before);
  // Ann's own card still counts
  await rollAs(ANN, witch, { trait: "sly", second: "monster", difficulty: 8 }, [1, 9]);
  assert.equal(cardOf(lastMessage()).applied, true);
  assert.equal(view().value, before + 2);
  await op(GM, OPS.lockupSet, { actorId: dracula.id, captured: false });
  await settle();
});

test("a request off the wire that claims to come from the active Storyteller, or from a user who isn't connected, is refused", async () => {
  const v = view().value;
  // User#query: Ann asks the GM's client, claiming to be the GM
  const asGM = await asUser(ANN, () => GM.query(QUERY, { op: OPS.raidAdjust, args: { delta: 3 }, userId: GM.id, requestId: "spoof-000000001" }));
  assert.deepEqual(asGM, { ok: false, reason: "spoofed" });
  // … or the Assistant GM, who isn't connected
  const asAst = await asUser(ANN, () => GM.query(QUERY, { op: OPS.raidReset, args: { difficulty: "easy" }, userId: AST.id, requestId: "spoof-000000002" }));
  assert.deepEqual(asAst, { ok: false, reason: "spoofed" });
  // the socket fallback too
  await asUser(ANN, () => game.socket.emit(SOCKET, { type: "request", op: OPS.raidAdjust, args: { delta: 3 }, userId: GM.id, requestId: "spoof-000000003" }));
  await settle();
  assert.equal(view().value, v);
  assert.equal(raid().difficulty, "standard");
  // a real request from Ann still works
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, loud: true }, [6, 6]);
  assert.equal(view().value, v + 1);
});

test("the Raid HUD follows the Entities: a captive appears at the lock-up when captured, and goes when freed", async () => {
  const gmHud = await asUser(GM, () => openHud());
  const annHud = await asUser(ANN, () => openHud());
  // the lock-up's list (F26 added the party's list, which names everyone)
  const listed = (hud) => /dgf-hud-lockup/.test(hud.renderedParts.body) && hud.renderedParts.body.split("dgf-hud-lockup")[1].includes(`data-actor-id="${witch.id}"`);
  assert.equal(listed(gmHud), false);
  await op(GM, OPS.lockupSet, { actorId: witch.id, captured: true }); // carrying nothing: the raid itself doesn't change
  await settle();
  assert.equal(listed(gmHud), true, "the Storyteller's HUD shows her at the lock-up");
  assert.equal(listed(annHud), true, "so does Ann's");
  await asUser(GM, () => currentHud().runAction("freeCaptive", { actorId: witch.id }));
  await settle();
  assert.equal(witch.system.status, "active");
  assert.equal(listed(gmHud), false, "freed: no longer listed (and no Free button left to press)");
  assert.equal(listed(annHud), false);
});

test("a group check the Storyteller can't open says why", async () => {
  const before = log.warnings.length;
  dialogResponders.push(press("ok", { [`entity.${witch.id}`]: true, place: "the crowded shop floor" }));
  const r = await asUser(GM, () => currentHud().runAction("groupCheck"));
  await settle();
  assert.equal(r.reason, "tooFew");
  const said = log.warnings.slice(before).filter((w) => w.startsWith("Storyteller:"));
  assert.equal(said.length, 1);
  assert.doesNotMatch(said[0], /DGF\./);
});

test("a refusal without words of its own still reads as words, never as a key", () => {
  const text = asUser(GM, () => dialogs.refusalText("DGF.Tell.refused", "error"));
  assert.ok(text);
  assert.doesNotMatch(text, /DGF\./);
  assert.equal(asUser(GM, () => dialogs.refusalText("DGF.Tell.refused", "alreadyChecked")), game.i18n.localize("DGF.Tell.refused.alreadyChecked"));
  assert.equal(asUser(GM, () => dialogs.refusalText("DGF.Year.refused", "failed")), "", "a lost connection: runOp has already said so");
  assert.ok(!log.missingI18n.some((k) => k.includes(".refused.")), log.missingI18n.join(", "));
});

test("a Cost left on a card from the last raid can't be picked in the new one", async () => {
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8 }, [4, 3]);
  const msg = lastMessage();
  assert.equal(cardOf(msg).band, "cost");
  assert.ok(buttonLabels(msg, GM).includes("Next roll one size smaller"));
  await op(GM, OPS.raidReset, { difficulty: "standard" });
  await settle();
  assert.deepEqual(buttonLabels(msg, GM), [], "no Cost buttons on the old card");
  assert.equal((await op(GM, OPS.raidCost, { messageId: msg.id, choice: "smaller" })).reason, "otherRaid");
  await settle();
  assert.equal(witch.system.nextRollSmaller, 0, "the new raid's Witch keeps her full die");
});

test("the Storyteller's own roll mode doesn't hide the raid's announcements from the players", async () => {
  const kinds = [];
  const real = ChatMessage.applyRollMode;
  ChatMessage.applyRollMode = (data, mode) => { kinds.push(data.flags?.[SYSTEM_ID]?.card?.kind); return data; };
  try {
    await op(GM, OPS.raidReset, { difficulty: "standard" }); // a raid card, posted by the GM
    await settle();
    assert.ok(cardOf(lastMessage()).kind === CARD.raid);
    assert.deepEqual(kinds, [], "a raid card isn't a private roll");
    await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8 }, [6, 4]);
    assert.deepEqual(kinds, [CARD.roll], "a player's roll still follows the roll mode");
  } finally {
    ChatMessage.applyRollMode = real;
  }
});

test("a chase roll made while no Storyteller was connected is picked up when one returns, even with Suspicion by hand", async () => {
  await setSetting(SETTINGS.autoSuspicion, false);
  await op(GM, OPS.raidReset, { difficulty: "easy" });
  await settle();
  GM.active = false;
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, watched: true }, [1, 1]);
  const m = lastMessage();
  assert.equal(cardOf(m).caught, true);
  assert.equal(cardOf(m).gmSeen, false);
  GM.active = true;
  diceQueue.push(2); // the ground, once the chase starts
  await asUser(GM, () => api.raid.reconcile());
  await settle();
  assert.equal(raid().chase?.kind, "local", "her chase starts");
  assert.equal(cardOf(m).gmSeen, true);
  assert.equal(view().value, 0, "Suspicion is still the Storyteller's to apply");
  await op(GM, OPS.chaseEnd, { outcome: "dropped" });
  await setSetting(SETTINGS.autoSuspicion, true);
  await settle();
});

test("a helper's charges are spent only as a roll card says, once: no player spends another's charges at will", async () => {
  // Ann asks the GM to spend Ben's Dracula's charges (and mark his Weakness) with no roll at all
  const r = await op(ANN, OPS.actorSpendCharges, { actorId: dracula.id, count: 3, weakness: true });
  await settle();
  assert.equal(r.ok, false);
  assert.equal(dracula.system.charges.value, 3);
  assert.equal(dracula.system.weaknessInPlay, false);
  // a real helped roll: Dracula's Bat on Ann's roll costs Dracula one charge, once
  const bat = `ability:${dracula.id}:gift`;
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, [bat]: true }, [5, 4]);
  const msg = lastMessage();
  assert.equal(cardOf(msg).payments.find((p) => !p.own).spend, 1);
  assert.equal(dracula.system.charges.value, 2);
  assert.equal(cardOf(msg).helpersPaid, true);
  await op(ANN, OPS.actorSpendCharges, { messageId: msg.id }); // asked again: nothing more
  await settle();
  assert.equal(dracula.system.charges.value, 2);
  await asUser(GM, () => dracula.update({ "system.charges.value": 3 }));
  await settle();
});

test("a helped roll made while no Storyteller was connected charges the helper when one returns", async () => {
  GM.active = false;
  const bat = `ability:${dracula.id}:gift`;
  await rollAs(ANN, witch, { trait: "sly", second: "mask", difficulty: 8, [bat]: true }, [5, 4]);
  const msg = lastMessage();
  assert.equal(dracula.system.charges.value, 3, "nobody could charge Dracula yet");
  assert.equal(cardOf(msg).helpersPaid, false);
  GM.active = true;
  await asUser(GM, () => api.raid.reconcile());
  await settle();
  assert.equal(dracula.system.charges.value, 2, "the card's charge is spent once the Storyteller is back");
  assert.equal(cardOf(msg).helpersPaid, true);
  assert.equal(await asUser(GM, () => api.raid.reconcile()), 0, "and only once");
  await asUser(GM, () => dracula.update({ "system.charges.value": 3 }));
  await settle();
});

test("V17 Out of Sight at the table: the roll dialog's tick for someone with him who carries, ticked when another in the raid carries; the card says which", async () => {
  const inv = await asUser(GM, () => api.createEntity("invisible", { ownerId: BEN.id })); // Out of Sight is his default Perk
  await settle();
  // nobody else carries: the tick is there, unticked
  let content = "";
  dialogResponders.push((options) => { content = options.content; return null; });
  await asUser(BEN, () => api.roll(inv, { trait: "sly" }));
  await settle();
  assert.match(content, /name="companionCarrying"/);
  assert.doesNotMatch(content, /name="companionCarrying" checked/);
  // the Witch carries loot: ticked to start with
  await asUser(ANN, () => witch.update({ "system.carried": [{ name: "a jar of honey" }] }));
  dialogResponders.push((options) => { content = options.content; return null; });
  await asUser(BEN, () => api.roll(inv, { trait: "sly" }));
  await settle();
  assert.match(content, /name="companionCarrying" checked/);
  // Trouble where watched, with the tick: caught, and the card says why
  const lastRoll = () => game.messages.filter((m) => cardOf(m)?.kind === CARD.roll).at(-1);
  await rollAs(BEN, inv, { trait: "sly", second: "mask", difficulty: 12, watched: true, companionCarrying: true }, [1, 1]);
  let card = cardOf(lastRoll());
  assert.equal(card.caught, true);
  assert.equal(card.carryingBy, "companion");
  assert.match(lastRoll().content, /someone with him carries loot or furniture/i);
  await op(GM, OPS.chaseEnd, { outcome: "dropped" });
  await settle();
  // without the tick: unseen, no chase
  await rollAs(BEN, inv, { trait: "sly", second: "mask", difficulty: 12, watched: true }, [1, 1]);
  card = cardOf(lastRoll());
  assert.equal(card.caught, false);
  assert.equal(card.unseen, true);
  // other Entities' dialogs have no such tick
  dialogResponders.push((options) => { content = options.content; return null; });
  await asUser(ANN, () => api.roll(witch, { trait: "sly" }));
  await settle();
  assert.doesNotMatch(content, /companionCarrying/);
  await asUser(ANN, () => witch.update({ "system.carried": [] }));
  await asUser(GM, () => inv.delete());
  await settle();
});

test("the roll dialog's furniture tick and the furniture switch say what they do", () => {
  const lang = JSON.parse(readFileSync(join(ROOT, "lang/en.json"), "utf8"));
  // a premade town prints the furniture's obstacle already 2 harder (Chapter 9): the tick must not add it twice
  assert.match(lang["DGF.Roll.furniture"], /premade/i);
  // V4: the piece is noisy from the Turn it is taken, even while it is set down
  assert.match(lang["DGF.Settings.autoFurniture.Hint"], /set down/);
});

test("every word in lang/en.json is used by the system", () => {
  const lang = JSON.parse(readFileSync(join(ROOT, "lang/en.json"), "utf8"));
  const walk = (dir) => readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
  const src = [...walk("module"), ...walk("templates"), "tools/gen-pack-source.mjs"].map((f) => readFileSync(join(ROOT, f), "utf8")).join("\n");
  // keys built at run time: `DGF.Band.${band}`, or a prefix handed on ("DGF.Tell.refused" + "." + reason)
  const prefixes = [...src.matchAll(/`(DGF\.[A-Za-z0-9_.]*)\$\{/g)].map((m) => m[1])
    .concat([...src.matchAll(/["'`](DGF\.[A-Za-z0-9_.]+?)["'`]/g)].map((m) => `${m[1]}.`));
  const unused = Object.keys(lang).filter((k) => !k.startsWith("TYPES.") && !src.includes(`"${k}"`) && !src.includes(`\`${k}\``) && !prefixes.some((p) => k.startsWith(p)));
  assert.deepEqual(unused, []);
});

test("the release ships only what Foundry needs, and only after the checks pass", () => {
  const yml = readFileSync(join(ROOT, ".github/workflows/release.yml"), "utf8");
  for (const path of ["AGENTS.md", "PORTAL.md", "TESTING.md", "docs/*", "book/*", "sim/*", "tools/*", "test/*", "packs/_source/*", "node_modules/*"]) {
    assert.ok(yml.includes(`-x "${path}"`), `${path} is left out of system.zip`);
  }
  const check = yml.indexOf("npm run check"), zip = yml.indexOf("zip -r system.zip");
  assert.ok(check > 0 && check < zip, "the checks run before the zip is built");
});

test("the audit's session left no errors, no missing words and no unanswered dialogs", () => {
  assert.deepEqual(log.errors, []);
  assert.deepEqual(log.missingI18n, []);
  assert.equal(dialogResponders.length, 0);
});
