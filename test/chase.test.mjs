/**
 * Slice 2's rules logic against the book, with fixed dice: chases (rulebook
 * Chapter 6), the lock-up (Chapter 6), group checks and Tell checks (Chapters
 * 4–5), how the year went (Chapter 7), and what they add to the raid state and
 * the roll plan.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { DGF } from "../module/config.mjs";
import { entitySystem } from "../module/logic/entity.mjs";
import {
  newChase, memberOf, groundOn, mobDifficulty, startRound, traitsFor, weaknessFor, rollContext, recordRoll, roundDone,
  waitingFor, roundMove, resolveRound, adjustLead, endChase, corneredFates, removeMember, addMember, limitEndsLocal, isRunning,
} from "../module/logic/chase.mjs";
import { captureUpdate, freeUpdate, slipProblems, slipFrees, rescueFrees, lockupTraits, captivesOf, newRaidUpdate } from "../module/logic/lockup.mjs";
import { newGroup, groupRecord, groupDone, groupWaiting, groupCaught, closeGroup, awaitsRoll, groupEventId, readTellCheck, needsSecondDie, placeChecked } from "../module/logic/checks.mjs";
import { yearFromList, homeFromCarried, listShape, listItem } from "../module/logic/year.mjs";
import { newRaid, normalizeRaid, recordEvent, suspicionOf, eventAmount, setChase, setGroup, addTell, setList, endRaid, huntDue, setHunt } from "../module/logic/raid.mjs";
import { buildRollPlan, resolvePlannedRoll, costOptions } from "../module/logic/roll-plan.mjs";

const entity = (id, key, patch = {}) => ({ id, name: DGF.entities.find((e) => e.key === key).name, system: { ...entitySystem(key), ...patch } });
const member = (id, key, patch) => memberOf(entity(id, key, patch));

/* ------------------------------------------------------------------ chases -- */

test("a local chase: Lead 1, escape at 4; the mob is 10 + half the Suspicion (at most 12), checked each round", () => {
  const c = newChase({ id: "c1", members: [member("a", "dracula")] });
  assert.equal(c.kind, "local");
  assert.equal(c.lead, 1);
  assert.equal(c.escape, 4);
  assert.equal(c.round, 1);
  assert.equal(mobDifficulty(c, { suspicion: 0 }), 10);
  assert.equal(mobDifficulty(c, { suspicion: 5 }), 12);
  assert.equal(mobDifficulty(c, { suspicion: 11 }), 12);
  const r = startRound(c, { face: 3, suspicion: 3 });
  assert.equal(r.mob, 11);
  assert.deepEqual(r.ground, { face: 3, key: "marketStalls", traits: ["brawn", "nimble"] });
  assert.throws(() => newChase({ id: "x", kind: "car" }));
});

test("the final flight: Lead 2, escape at 6, the mob set by the label whatever the party's size", () => {
  const party = [member("a", "dracula"), member("b", "witch"), member("c", "ghost"), member("d", "mummy"), member("e", "werewolf")];
  for (const label of ["easy", "standard", "hard"]) {
    const c = newChase({ id: "f", kind: "final", cause: "limit", members: party });
    assert.equal(c.lead, 2);
    assert.equal(c.escape, 6);
    assert.equal(mobDifficulty(c, { suspicion: 12, label }), DGF.labels[label].finalMob);
    assert.equal(mobDifficulty({ ...c, members: party.slice(0, 1) }, { label }), DGF.labels[label].finalMob);
  }
  assert.equal(newChase({ id: "f", kind: "final", cause: "dawn", members: party }).byDawn, true);
  assert.equal(newChase({ id: "f", kind: "final", cause: "limit", members: party }).byDawn, false);
});

test("the chase table: one roll for everyone; each row's traits, always one that isn't Nimble", () => {
  for (let f = 1; f <= 6; f++) {
    const g = groundOn(f);
    assert.equal(g.traits.length, 2);
    assert.ok(g.traits.some((t) => t !== "nimble"));
  }
  assert.throws(() => groundOn(7));
});

test("Perks in a chase: Wall-Crawler and Fly by Night add a trait; Night Runner starts at Lead 2; Fear the Curse makes the local mob 1 easier", () => {
  let c = newChase({ id: "c", members: [member("d", "dracula", { perk: "wallCrawler" }), member("w", "witch", { perk: "flyByNight" }), member("g", "ghost")] });
  c = startRound(c, { face: 1, suspicion: 0 }); // the crowded square: Sly, Charm
  assert.deepEqual(traitsFor(c, "d"), ["sly", "charm", "nimble"]);
  assert.deepEqual(traitsFor(c, "w"), ["sly", "charm", "wits"]);
  assert.deepEqual(traitsFor(c, "g"), ["sly", "charm"]);
  c = startRound({ ...c, rolls: {} }, { face: 2 }); // back alleys already has Nimble
  assert.deepEqual(traitsFor(c, "d"), ["nimble", "sly"]);
  assert.equal(newChase({ id: "n", members: [member("w", "werewolf")] }).lead, 2, "Night Runner is the Werewolf's default Perk");
  assert.equal(newChase({ id: "n", members: [member("w", "werewolf", { perk: "fetch" })] }).lead, 1);
  assert.equal(newChase({ id: "n", kind: "final", cause: "limit", members: [member("w", "werewolf")] }).lead, 2, "only the local chase");
  const curse = newChase({ id: "m", members: [member("m", "mummy", { perk: "fearTheCurse" })] });
  assert.equal(mobDifficulty(curse, { suspicion: 4 }), 11);
  assert.equal(mobDifficulty(newChase({ id: "m", kind: "final", cause: "limit", members: curse.members }), { label: "hard" }), 11, "not in the final flight");
});

test("the Weakness: Always from round 1, Soon from round 3, Dawn only in a flight dawn started; an overdraw puts it in play in the flight", () => {
  const drac = member("d", "dracula"); // Garlic, Always
  const crea = member("c", "creature"); // Fire, Soon
  const local = newChase({ id: "l", members: [drac, crea] });
  assert.equal(weaknessFor(local, "d"), true);
  assert.equal(weaknessFor(local, "c"), false);
  assert.equal(weaknessFor({ ...local, round: 2 }, "c"), false);
  assert.equal(weaknessFor({ ...local, round: 3 }, "c"), true);
  const sunny = { ...crea, timing: "dawn" }; // no Entity has a Dawn Weakness yet: the timing still works
  assert.equal(weaknessFor(newChase({ id: "f", kind: "final", cause: "dawn", members: [sunny] }), "c"), true);
  assert.equal(weaknessFor(newChase({ id: "f", kind: "final", cause: "limit", members: [sunny] }), "c"), false);
  assert.equal(weaknessFor(newChase({ id: "l", members: [sunny] }), "c"), false);
  assert.equal(weaknessFor(newChase({ id: "f", kind: "final", cause: "limit", members: [crea] }), "c", { overdrawn: true }), true);
  assert.equal(weaknessFor(local, "c", { overdrawn: true }), false, "overdraw costs the Weakness only once the hunt is on");
  assert.equal(weaknessFor(local, "nobody"), false);
});

test("rollContext: what a member rolls this round, or why it can't", () => {
  let c = newChase({ id: "c", members: [member("a", "dracula")] });
  assert.equal(rollContext(c, "a").reason, "noGround");
  assert.equal(rollContext(c, "b").reason, "notInChase");
  assert.equal(rollContext(null, "a").reason, "noChase");
  c = startRound(c, { face: 4, suspicion: 2 });
  const ctx = rollContext(c, "a");
  assert.equal(ctx.ok, true);
  assert.equal(ctx.difficulty, 11);
  assert.deepEqual(ctx.traits, ["nimble", "wits"]);
  assert.equal(ctx.weakness, true);
  c = recordRoll(c, "a", { messageId: "m1", round: 1, band: "success" }).chase;
  assert.equal(rollContext(c, "a").reason, "alreadyRolled");
});

test("one Entity alone: Success +1, a Critical +2, Cost 0, Trouble −1; escape at 4, cornered at 0", () => {
  const solo = () => startRound(newChase({ id: "c", members: [member("a", "dracula", { perk: "oldMoney" })] }), { face: 1 });
  let c = solo();
  assert.equal(recordRoll(c, "a", { messageId: "m", round: 2, band: "success" }).reason, "otherRound");
  c = recordRoll(c, "a", { messageId: "m1", round: 1, band: "success", critical: true }).chase;
  assert.equal(recordRoll(c, "a", { messageId: "m1", round: 1, band: "success" }).reason, "noop");
  assert.equal(recordRoll(c, "a", { messageId: "m2", round: 1, band: "success" }).reason, "alreadyRolled");
  assert.equal(roundDone(c), true);
  let out = resolveRound(c);
  assert.equal(out.move, 2);
  assert.equal(out.chase.lead, 3);
  assert.equal(out.outcome, "");
  assert.equal(out.chase.round, 2);
  assert.equal(out.chase.ground, null, "the ground is rolled again each round");
  assert.equal(out.chase.history.length, 1);
  c = recordRoll(startRound(out.chase, { face: 2 }), "a", { messageId: "m3", round: 2, band: "success" }).chase;
  out = resolveRound(c);
  assert.equal(out.outcome, "escaped");
  assert.equal(out.chase.lead, 4);
  assert.equal(isRunning(out.chase), false);
  assert.equal(recordRoll(out.chase, "a", { messageId: "m4", band: "success" }).reason, "chaseOver");

  c = recordRoll(solo(), "a", { messageId: "t", round: 1, band: "trouble" }).chase;
  out = resolveRound(c);
  assert.equal(out.outcome, "cornered");
  assert.equal(out.chase.lead, 0);
  c = recordRoll(solo(), "a", { messageId: "k", round: 1, band: "cost" }).chase;
  assert.equal(resolveRound(c).move, 0);
  assert.throws(() => resolveRound(solo()), /not everyone has rolled/);
});

test("several caught together, and every final flight: the majority rule (a Critical counts as two Successes)", () => {
  let c = startRound(newChase({ id: "c", members: [member("a", "dracula"), member("b", "witch"), member("e", "mummy")] }), { face: 5 });
  assert.equal(roundDone(c), false);
  c = recordRoll(c, "a", { messageId: "1", band: "success", critical: true }).chase;
  c = recordRoll(c, "b", { messageId: "2", band: "trouble" }).chase;
  assert.deepEqual(waitingFor(c).map((m) => m.actorId), ["e"]);
  c = recordRoll(c, "e", { messageId: "3", band: "trouble" }).chase;
  assert.equal(roundMove(c), 0, "2 Successes against 2 Trouble");
  // a party of one in the final flight still moves by the majority rule: a Critical is +1
  let f = startRound(newChase({ id: "f", kind: "final", cause: "dawn", members: [member("a", "dracula")] }), { face: 1, label: "hard" });
  f = recordRoll(f, "a", { messageId: "1", band: "success", critical: true }).chase;
  assert.equal(roundMove(f), 1);
  // shared local Lead: 2 Successes, 1 Trouble → +1
  let s = startRound(newChase({ id: "s", members: [member("a", "dracula"), member("b", "witch"), member("e", "mummy")] }), { face: 5 });
  for (const [id, band] of [["a", "success"], ["b", "success"], ["e", "trouble"]]) s = recordRoll(s, id, { messageId: id, band }).chase;
  assert.equal(resolveRound(s).chase.lead, 2);
});

test("cornered: captured in a local chase (Already Dead loses its next Turn instead); forked in the final flight", () => {
  const local = newChase({ id: "c", members: [member("a", "dracula"), member("g", "ghost", { perk: "alreadyDead" })] });
  assert.deepEqual(corneredFates(local).map((f) => f.fate), ["captured", "loseTurn"]);
  const flight = newChase({ id: "f", kind: "final", cause: "limit", members: local.members });
  assert.deepEqual(corneredFates(flight).map((f) => f.fate), ["forked", "forked"]);
});

test("the Storyteller's hand: Lead ±1 (reaching 4 or 0 ends it), end the chase, add or remove a member; the Limit ends a local chase", () => {
  let c = newChase({ id: "c", members: [member("a", "dracula")] });
  c = adjustLead(c, 1);
  assert.equal(c.lead, 2);
  c = adjustLead(adjustLead(c, 1), 1);
  assert.equal(c.outcome, "escaped");
  assert.throws(() => adjustLead(c, 1));
  assert.equal(endChase(newChase({ id: "c", members: [] }), "cornered").lead, 0);
  assert.throws(() => endChase(c, "won"));
  let s = startRound(newChase({ id: "s", members: [member("a", "dracula"), member("b", "witch")] }), { face: 1 });
  s = recordRoll(s, "b", { messageId: "x", band: "success" }).chase;
  s = removeMember(s, "b");
  assert.deepEqual(s.rolls, {});
  assert.equal(s.members.length, 1);
  assert.equal(addMember(s, member("a", "dracula")).members.length, 1);
  assert.equal(addMember(s, member("b", "witch")).members.length, 2);
  assert.equal(limitEndsLocal(s), true);
  assert.equal(limitEndsLocal(newChase({ id: "f", kind: "final", cause: "limit", members: [] })), false);
  assert.equal(limitEndsLocal(endChase(s, "escaped")), false);
  assert.throws(() => startRound(endChase(s, "dropped"), { face: 1 }));
  assert.throws(() => startRound(recordRoll(startRound(s, { face: 1 }), "a", { messageId: "q", band: "cost" }).chase, { face: 2 }), /already rolled/);
});

/* --------------------------------------------------------------- the lock-up -- */

test("captured: the town takes back what it carried (Hidden Pockets keeps it); the furniture goes either way", () => {
  const sys = { ...entitySystem("dracula"), carried: [{ name: "a jar of honey" }, { name: "a top hat" }], carryingFurniture: true };
  const c = captureUpdate(sys, { turn: 5 });
  assert.deepEqual(c.update, { status: "captured", capturedTurn: 5, slipTurn: 0, carried: [], carryingFurniture: false });
  assert.deepEqual(c.taken, ["a jar of honey", "a top hat"]);
  assert.equal(c.furniture, true);
  const pockets = captureUpdate({ ...entitySystem("invisible"), perk: "hiddenPockets", carried: [{ name: "a top hat" }] }, { turn: 2 });
  assert.deepEqual(pockets.update.carried, [{ name: "a top hat" }]);
  assert.deepEqual(pockets.kept, ["a top hat"]);
  assert.deepEqual(pockets.taken, []);
  assert.deepEqual(freeUpdate(), { status: "active", capturedTurn: 0, slipTurn: 0 });
});

test("slipping free: once per Turn, from the Turn after the capture; only a Success frees you (Built to Last: a Cost too)", () => {
  const held = { ...entitySystem("creature"), status: "captured", capturedTurn: 4, slipTurn: 0 };
  assert.deepEqual(slipProblems(held, { turn: 4 }), ["slipTooSoon"]);
  assert.deepEqual(slipProblems(held, { turn: 5 }), []);
  assert.deepEqual(slipProblems({ ...held, slipTurn: 5 }, { turn: 5 }), ["slipOncePerTurn"]);
  assert.deepEqual(slipProblems(entitySystem("creature"), { turn: 5 }), ["notCaptured"]);
  assert.equal(slipFrees("success"), true);
  assert.equal(slipFrees("cost"), false);
  assert.equal(slipFrees("cost", "builtToLast"), true);
  assert.equal(slipFrees("trouble", "builtToLast"), false);
  assert.equal(rescueFrees("cost"), true);
  assert.equal(rescueFrees("trouble"), false);
  assert.deepEqual(lockupTraits("rescue"), { quiet: ["sly"], loud: ["brawn"] });
  assert.deepEqual(lockupTraits("slip"), { quiet: ["sly", "nimble"], loud: ["brawn"] });
  assert.throws(() => lockupTraits("escape"));
  assert.deepEqual(captivesOf([{ id: "a", system: held }, { id: "b", system: entitySystem("witch") }]).map((e) => e.id), ["a"]);
});

test("a new raid frees everyone, refills the charges (castle upgrades included) and clears the last raid's marks", () => {
  const u = newRaidUpdate({ ...entitySystem("witch", { upgrades: 1 }), status: "captured", skipTurn: 4, nextRollSmaller: 1, weaknessInPlay: true, charges: { value: 0, start: 4 } });
  assert.deepEqual(u, { status: "active", capturedTurn: 0, slipTurn: 0, skipTurn: 0, nextRollSmaller: 0, weaknessInPlay: false, "charges.value": 4 });
});

/* ---------------------------------------------------- group and Tell checks -- */

test("a group check: several roll together; they share one Suspicion event; everyone caught flees together", () => {
  assert.throws(() => newGroup({ id: "g", members: [{ actorId: "a" }] }), /several/);
  let g = newGroup({ id: "g1", label: "the rooftops", turn: 3, members: [{ actorId: "a", name: "A" }, { actorId: "b", name: "B" }, { actorId: "c", name: "C" }, { actorId: "a", name: "A" }] });
  assert.equal(g.members.length, 3, "each Entity once");
  assert.equal(groupEventId("g1"), "group:g1");
  assert.equal(awaitsRoll(g, "a"), true);
  g = groupRecord(g, "a", { messageId: "m1", caught: true }).group;
  assert.equal(awaitsRoll(g, "a"), false);
  assert.equal(groupRecord(g, "a", { messageId: "m1" }).reason, "noop");
  assert.equal(groupRecord(g, "a", { messageId: "m9" }).reason, "alreadyRolled");
  assert.equal(groupRecord(g, "z", { messageId: "m9" }).reason, "notInGroup");
  g = groupRecord(g, "b", { messageId: "m2", caught: false }).group;
  assert.equal(groupDone(g), false);
  assert.deepEqual(groupWaiting(g).map((m) => m.actorId), ["c"]);
  g = groupRecord(g, "c", { messageId: "m3", caught: true }).group;
  assert.equal(groupDone(g), true);
  assert.deepEqual(groupCaught(g).map((m) => m.actorId), ["a", "c"]);
  g = closeGroup(g);
  assert.equal(groupRecord(g, "a", { messageId: "x" }).reason, "groupClosed");
  assert.equal(awaitsRoll(g, "b"), false);

  // the ledger: the rolls of a group share one event: Suspicion rises once, by the biggest trigger
  let s = newRaid({ id: "r" });
  s = recordEvent(s, { eventId: "group:g1", amount: 1, source: "roll", messageId: "m1" });
  s = recordEvent(s, { eventId: "group:g1", amount: 2, source: "roll", messageId: "m2" });
  s = recordEvent(s, { eventId: "group:g1", amount: 1, source: "roll", messageId: "m3" });
  s = recordEvent(s, { eventId: "group:g1", amount: 2, source: "roll", messageId: "m2" }); // a retried request
  assert.equal(suspicionOf(s).value, 2);
  assert.equal(eventAmount(s, "group:g1"), 2);
  assert.equal(s.ledger.length, 3);
});

test("a Tell check: a d6, 4–6 goes off; roll to see whose among those arriving; Familiar's Warning needs a second 4–6", () => {
  const arriving = [entity("d", "dracula"), entity("c", "creature")].map((e) => ({ actorId: e.id, name: e.name, perk: e.system.perk, entityKey: e.system.entityKey }));
  assert.equal(readTellCheck({ arriving, face: 3 }).goesOff, false);
  const off = readTellCheck({ arriving, face: 4, whoseFace: 2 });
  assert.equal(off.goesOff, true);
  assert.equal(off.whose.actorId, "c");
  assert.equal(off.whose.tell.name, "Head and Shoulders");
  const withWitch = [...arriving, { actorId: "w", name: "A Witch", perk: "familiarsWarning", entityKey: "witch" }];
  assert.equal(needsSecondDie(withWitch), true);
  assert.equal(needsSecondDie(arriving), false);
  assert.throws(() => readTellCheck({ arriving: withWitch, face: 6 }), /second d6/);
  assert.equal(readTellCheck({ arriving: withWitch, face: 6, second: 3 }).goesOff, false, "the cat warns you");
  assert.equal(readTellCheck({ arriving: withWitch, face: 6, second: 4, whoseFace: 3 }).whose.tell.name, "A Black Cat");
  assert.throws(() => readTellCheck({ arriving: [], face: 6 }));
  const tells = [{ place: "The Baker's" }];
  assert.equal(placeChecked(tells, "  the baker's "), true);
  assert.equal(placeChecked(tells, "the way out"), false);
  assert.equal(placeChecked(tells, ""), false);
});

/* ---------------------------------------------------------- how the year went -- */

test("the year from the list: Win, Grand Year, Partial, Bust, left behind, forked; the epilogue's missing kinds", () => {
  const list = [
    { name: "a wheel of strong cheese", duty: "cook", essential: true, home: true },
    { name: "seed potatoes", duty: "gardener", essential: false, home: true },
    { name: "this week's newspapers", duty: "librarian", essential: false, home: false },
    { name: "a tea service", duty: "butler", essential: false, home: true },
    { name: "a box of nails", duty: "handyman", essential: false, home: true },
  ];
  let y = yearFromList({ list });
  assert.equal(y.result, "win");
  assert.deepEqual(y.missingDuties, ["librarian"]);
  assert.deepEqual(y.lines, [DGF.epilogue.year.win, DGF.epilogue.missing.librarian]);
  assert.equal(yearFromList({ list, furnitureHome: true }).result, "grand");
  assert.equal(yearFromList({ list, furnitureHome: true, leftBehind: 1 }).result, "win");
  assert.equal(yearFromList({ list, leftBehind: 1 }).result, "partial");
  const noEssential = list.map((it, i) => (i === 0 ? { ...it, home: false } : it));
  assert.equal(yearFromList({ list: noEssential }).result, "partial");
  const thin = list.map((it, i) => ({ ...it, home: i === 1 }));
  assert.equal(yearFromList({ list: thin }).result, "bust");
  assert.equal(yearFromList({ list: thin, leftBehind: 3 }).result, "bust", "Bust is as low as it goes");
  y = yearFromList({ list, forked: true, furnitureHome: true });
  assert.equal(y.result, "forked");
  assert.equal(y.itemsHome, 0);
  assert.equal(y.lines[0], DGF.epilogue.year.forked);
  assert.equal(y.lines.length, 1 + 5);
  assert.throws(() => yearFromList({ list: [] }), /empty/);
  assert.throws(() => listItem({ name: "x", duty: "astronomer" }));
  // two items of one kind missing: one line for the kind
  const twoBooks = [...list.slice(0, 2), { name: "ink", duty: "librarian", home: false }, { name: "a cookbook", duty: "librarian", home: false }];
  assert.deepEqual(yearFromList({ list: twoBooks }).missingDuties, ["librarian"]);
  assert.deepEqual(listShape("easy"), { size: 4, essentials: [1] });
  assert.deepEqual(listShape("standard"), { size: 5, essentials: [1, 2] });
});

test("what came home: list items carried by the Entities who got out (matching names, each once)", () => {
  const list = [{ name: "A Jar of Honey", duty: "cook" }, { name: "a top hat", duty: "tailor" }, { name: "a top hat", duty: "tailor" }];
  assert.deepEqual(homeFromCarried(list, ["a jar of  honey", "a top hat"]).map((i) => i.home), [true, true, false]);
  assert.deepEqual(homeFromCarried(list, []).map((i) => i.home), [false, false, false]);
});

/* ------------------------------------------------------------ the raid state -- */

test("the raid state keeps the chase, the group check, the Tell checks, the list, and the end; old states are filled in", () => {
  let s = newRaid({ id: "r" });
  assert.equal(s.chase, null);
  assert.deepEqual(s.tells, []);
  const old = normalizeRaid({ raidId: "x", turn: 3 }); // a slice-1 state
  assert.equal(old.chase, null);
  assert.equal(old.group, null);
  assert.deepEqual(old.list, []);
  assert.equal(old.over, null);
  assert.equal(normalizeRaid({ chase: { nonsense: true } }).chase, null);
  s = setChase(s, newChase({ id: "c", members: [member("a", "dracula")] }));
  assert.equal(normalizeRaid(JSON.parse(JSON.stringify(s))).chase.id, "c");
  s = setGroup(s, newGroup({ id: "g", members: [{ actorId: "a" }, { actorId: "b" }] }));
  s = addTell(s, { id: "t1", place: "the baker's", goesOff: true });
  assert.equal(s.tells[0].turn, 1);
  s = setList(s, [{ name: "honey", duty: "cook", essential: 1, junk: true }]);
  assert.deepEqual(s.list, [{ name: "honey", duty: "cook", essential: true }]);
  s = endRaid(s, { result: "win" });
  assert.equal(s.over.result, "win");
  assert.equal(s.chase.outcome, "dropped");
  assert.equal(s.group.open, false);
  // once the raid is over, no hunt starts
  let t = newRaid({ id: "r", difficulty: "easy" });
  for (let i = 0; i < 6; i++) t = recordEvent(t, { eventId: `e${i}`, amount: 2, source: "roll" });
  assert.equal(huntDue(t), "limit");
  assert.equal(huntDue(endRaid(t, { result: "bust" })), "");
  assert.equal(huntDue(setHunt(t, true)), "");
});

/* ----------------------------------------------------------- the roll plan -- */

const roller = (key, patch = {}) => ({ id: "me", system: { ...entitySystem(key), ...patch } });
const plan = (r, opts = {}) => buildRollPlan({ roller: r, trait: "sly", second: "mask", difficulty: 8, abilities: [], ...opts });
const own = (r, slot) => {
  const e = DGF.entities.find((x) => x.key === r.system.entityKey);
  const a = slot === "signature" ? e.signature : e.gift.versions.find((v) => v.key === r.system.gift);
  return { slot, name: a.name, effect: a.effect, trait: a.trait ?? null, noLoot: !!a.noLoot, payerId: r.id, payerName: "Me", payer: { charges: r.system.charges.value, weaknessInPlay: !!r.system.weaknessInPlay } };
};

test("a chase roll the tracker runs: only the ground's traits; the Weakness in play steps the die down and blocks overdraw in the flight", () => {
  const drac = roller("dracula");
  const p = plan(drac, { chase: true, chaseTraits: ["nimble", "wits"], trait: "sly", difficulty: 11 });
  assert.ok(p.errors.some((e) => e.code === "notOnGround"));
  const q = plan(drac, { chase: true, chaseTraits: ["nimble", "wits"], trait: "nimble", difficulty: 11, weakness: true });
  assert.equal(q.ok, true);
  assert.equal(q.traitDie, 8, "Nimble d10, one size smaller");
  assert.ok(q.downParts.some((d) => d.key === "weakness"));
  assert.equal(q.tracked, true);
  // Bat (use Nimble instead) still works on the ground's Sly
  const bat = plan(drac, { chase: true, chaseTraits: ["sly", "charm"], trait: "sly", abilities: [own(drac, "gift")] });
  assert.equal(bat.ok, true);
  assert.equal(bat.trait, "nimble");
  // the Weakness in play (by its timing) blocks overdraw once the hunt is on
  const broke = roller("dracula", { charges: { value: 0, start: 3 } });
  const od = plan(broke, { chase: true, hunt: true, chaseTraits: ["sly", "charm"], trait: "charm", second: "monster", weakness: true, abilities: [own(broke, "gift")] });
  assert.ok(od.errors.some((e) => e.code === "overdrawWeakness"));
  const okOd = plan(broke, { chase: true, hunt: true, chaseTraits: ["sly", "charm"], trait: "charm", second: "monster", abilities: [own(broke, "gift")] });
  assert.equal(okOd.ok, true);
  // a chase roll's result: the Lead move for one Entity
  assert.equal(resolvePlannedRoll(q, 5, 4).leadMove, 0); // 9 against 11: a Cost
  assert.equal(resolvePlannedRoll(q, 6, 6).leadMove, 2);
  assert.equal(resolvePlannedRoll(q, 1, 1).leadMove, -1);
  assert.equal(resolvePlannedRoll(q, 6, 6).caught, false, "Trouble in a chase starts no other chase");
});

test("the way out lists Sly or Nimble, or Brawn the loud way: the loud way is automatic", () => {
  const ww = roller("werewolf");
  assert.ok(plan(ww, { wayOut: true, trait: "charm" }).errors.some((e) => e.code === "notListed.wayOut"));
  const loud = plan(ww, { wayOut: true, trait: "brawn" });
  assert.equal(loud.loud, true);
  assert.equal(plan(ww, { wayOut: true, trait: "nimble", loud: true }).loud, false);
  assert.equal(loud.watched, true);
  const r = resolvePlannedRoll(plan(ww, { wayOut: true, trait: "nimble" }), 5, 3);
  assert.equal(r.wayOutBeaten, true);
  assert.equal(resolvePlannedRoll(plan(ww, { wayOut: true, trait: "nimble" }), 1, 1).caught, true);
  // an approach of its own at the way out: only with a trait it doesn't list (U1, T5)
  const drac = roller("dracula");
  const mes = own(drac, "signature"); // Mesmerise: open with Charm
  assert.equal(plan(drac, { wayOut: true, trait: "sly", abilities: [mes] }).ok, true);
  const mummy = roller("invisible");
  const gap = own(mummy, "gift"); // Through the Gap: open with Nimble — the way out lists Nimble
  assert.ok(plan(mummy, { wayOut: true, trait: "sly", abilities: [gap] }).errors.some((e) => e.code === "openListed"));
});

test("the lock-up in the roll plan: a captive's one roll is slipping free; rescue is always watched; Costs and hunts", () => {
  const held = roller("creature", { status: "captured", capturedTurn: 3, perk: "builtToLast" });
  assert.ok(plan(held, { trait: "sly" }).errors.some((e) => e.code === "captiveOnlySlips"));
  assert.ok(plan(held, { lockup: "slip", turn: 3, difficulty: 10 }).errors.some((e) => e.code === "slipTooSoon"));
  const slip = plan(held, { lockup: "slip", turn: 4, difficulty: 10, trait: "brawn", watched: true });
  assert.equal(slip.ok, true);
  assert.equal(slip.loud, true, "Brawn is the loud way");
  assert.equal(slip.watched, false, "slipping free starts no chase");
  const t = resolvePlannedRoll(slip, 1, 1);
  assert.equal(t.band, "trouble");
  assert.equal(t.caught, false);
  assert.equal(t.slipTrouble, true);
  assert.equal(t.troubleUnwatched, false);
  assert.equal(t.suspicion, 1);
  const cost = resolvePlannedRoll(slip, 4, 4); // 8 against 10
  assert.equal(cost.band, "cost");
  assert.equal(cost.freed, true, "Built to Last");
  assert.deepEqual(cost.costs, [], "slipping free, a Cost does nothing");
  const plain = plan(roller("dracula", { status: "captured", capturedTurn: 1 }), { lockup: "slip", turn: 2, difficulty: 10 });
  assert.equal(resolvePlannedRoll(plain, 4, 4).freed, false);
  assert.equal(resolvePlannedRoll(plain, 6, 6).freed, true);
  assert.ok(plan(roller("dracula"), { lockup: "slip", turn: 2 }).errors.some((e) => e.code === "notCaptured"));
  assert.ok(plan(roller("dracula", { status: "captured" }), { lockup: "slip", turn: 2, trait: "charm" }).errors.some((e) => e.code === "notListed.slip"));
  // U1: a captive may open its own way out (a trait the lock-up doesn't list)
  const drac = roller("dracula", { status: "captured", capturedTurn: 1 });
  const open = plan(drac, { lockup: "slip", turn: 2, difficulty: 10, abilities: [own(drac, "signature")] });
  assert.equal(open.ok, true);
  assert.equal(open.difficulty, 8);
  // rescue: Sly, or Brawn the loud way; always watched; a Success or a Cost frees every captive
  const resc = plan(roller("witch"), { lockup: "rescue", trait: "sly", difficulty: 10 });
  assert.equal(resc.watched, true);
  assert.ok(plan(roller("witch"), { lockup: "rescue", trait: "nimble" }).errors.some((e) => e.code === "notListed.rescue"));
  assert.equal(resolvePlannedRoll(resc, 4, 4).rescued, true);
  assert.equal(resolvePlannedRoll(resc, 1, 1).rescued, false);
  assert.equal(resolvePlannedRoll(resc, 1, 1).caught, true);
  assert.ok(resolvePlannedRoll(resc, 4, 4).costs.length > 0, "a Cost at the lock-up is still a Cost");
  assert.ok(plan(roller("witch"), { lockup: "rescue", trait: "sly", hunt: true }).errors.some((e) => e.code === "lockupInHunt"));
  assert.deepEqual(costOptions({ band: "cost", trait: "sly", slip: true }), []);
});
