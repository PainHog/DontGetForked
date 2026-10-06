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

test("a local chase: Lead 1, escape at 4; the mob is 8 + half the Suspicion (at most 12), checked each round", () => {
  const c = newChase({ id: "c1", members: [member("a", "dracula")] });
  assert.equal(c.kind, "local");
  assert.equal(c.lead, 1);
  assert.equal(c.escape, 4);
  assert.equal(c.round, 1);
  assert.equal(mobDifficulty(c, { suspicion: 0 }), 8);
  assert.equal(mobDifficulty(c, { suspicion: 5 }), 10);
  assert.equal(mobDifficulty(c, { suspicion: 8 }), 12);
  assert.equal(mobDifficulty(c, { suspicion: 11 }), 12);
  const r = startRound(c, { face: 3, suspicion: 3 });
  assert.equal(r.mob, 9);
  assert.deepEqual(r.ground, { face: 3, key: "marketStalls", traits: ["brawn", "nimble"] });
  assert.throws(() => newChase({ id: "x", kind: "car" }));
});

test("the final flight: Lead 2, escape at the label's number (B3: 5 Easy and Standard, 6 Hard), the mob set by the label whatever the party's size", () => {
  const party = [member("a", "dracula"), member("b", "witch"), member("c", "ghost"), member("d", "mummy")];
  for (const [label, escape] of [["easy", 5], ["standard", 5], ["hard", 6]]) {
    const c = newChase({ id: "f", kind: "final", cause: "limit", members: party, label });
    assert.equal(c.lead, 2);
    assert.equal(c.escape, escape);
    assert.equal(c.escape, DGF.labels[label].finalEscape);
    assert.equal(mobDifficulty(c, { suspicion: 12, label }), DGF.labels[label].finalMob);
    assert.equal(mobDifficulty({ ...c, members: party.slice(0, 1) }, { label }), DGF.labels[label].finalMob);
  }
  assert.equal(newChase({ id: "f", kind: "final", cause: "dawn", members: party, label: "easy" }).cause, "dawn", "dawn still starts a final flight");
  assert.equal(newChase({ id: "l", members: party, label: "hard" }).escape, 4, "a local chase escapes at 4 everywhere");
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
  // a Perk that sets the final flight's starting Lead (if the book has one), only in the flight
  const flightPerk = Object.entries(DGF.perkRules).find(([, r]) => r.finalLead);
  if (flightPerk) {
    const owner = DGF.entities.find((e) => e.perks.some((p) => p.key === flightPerk[0]));
    const m = member("x", owner.key, { perk: flightPerk[0] });
    assert.equal(newChase({ id: "f", kind: "final", cause: "limit", members: [member("a", "dracula"), m] }).lead, flightPerk[1].finalLead);
    assert.equal(newChase({ id: "l", members: [{ ...m, perk: flightPerk[0] }] }).lead, 1);
  }
  const curse = newChase({ id: "m", members: [member("m", "mummy", { perk: "fearTheCurse" })] });
  assert.equal(mobDifficulty(curse, { suspicion: 4 }), 9);
  assert.equal(mobDifficulty(newChase({ id: "m", kind: "final", cause: "limit", members: curse.members }), { label: "hard" }), 11, "not in the final flight");
});

test("the Weakness: Always from round 1, Soon from round 3 (B3: no Dawn timing); an overdraw puts it in play in the flight", () => {
  const drac = member("d", "dracula"); // Garlic, Always
  const crea = member("c", "creature"); // Fire, Soon
  const local = newChase({ id: "l", members: [drac, crea] });
  assert.equal(weaknessFor(local, "d"), true);
  assert.equal(weaknessFor(local, "c"), false);
  assert.equal(weaknessFor({ ...local, round: 2 }, "c"), false);
  assert.equal(weaknessFor({ ...local, round: 3 }, "c"), true);
  assert.equal(weaknessFor(newChase({ id: "f", kind: "final", cause: "dawn", members: [crea] }), "c"), false, "a flight dawn started brings nothing extra");
  assert.ok(DGF.entities.every((e) => DGF.weaknessTimings.includes(e.weakness.timing)));
  assert.throws(() => weaknessFor(newChase({ id: "x", members: [{ ...crea, timing: "dawn" }] }), "c"), /unknown Weakness timing/);
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
  assert.equal(ctx.difficulty, 9);
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
  // a party of one in the final flight still moves by the majority rule (B6: a Critical alone is two Successes: +2)
  let f = startRound(newChase({ id: "f", kind: "final", cause: "dawn", members: [member("a", "dracula")] }), { face: 1, label: "hard" });
  f = recordRoll(f, "a", { messageId: "1", band: "success", critical: true }).chase;
  assert.equal(roundMove(f), 2);
  let f1 = startRound(newChase({ id: "f1", kind: "final", cause: "dawn", members: [member("a", "dracula")] }), { face: 1, label: "hard" });
  f1 = recordRoll(f1, "a", { messageId: "1", band: "success" }).chase;
  assert.equal(roundMove(f1), 1, "one plain Success: +1");
  // B6: two caught together, both Succeed: +2 (from Lead 1 to 3)
  let two = startRound(newChase({ id: "t", members: [member("a", "dracula"), member("b", "witch")] }), { face: 5 });
  for (const id of ["a", "b"]) two = recordRoll(two, id, { messageId: id, band: "success" }).chase;
  assert.equal(resolveRound(two).chase.lead, 3);
  let both = startRound(newChase({ id: "u", members: [member("a", "dracula"), member("b", "witch")] }), { face: 5 });
  for (const id of ["a", "b"]) both = recordRoll(both, id, { messageId: id, band: "trouble" }).chase;
  const out = resolveRound(both);
  assert.equal(out.move, -2);
  assert.equal(out.outcome, "cornered");
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
  const u = newRaidUpdate({ ...entitySystem("witch", { upgrades: 1 }), status: "captured", skipTurn: 4, nextRollSmaller: 1, weaknessInPlay: true, overdrewInFlight: true, carried: [{ name: "a coil of rope" }], carryingFurniture: true, charges: { value: 0, start: 4 } });
  // last year's loot and piece went home: nobody carries them into the new town (else the first Turn's end takes the piece: V4)
  assert.deepEqual(u, { status: "active", capturedTurn: 0, slipTurn: 0, skipTurn: 0, nextRollSmaller: 0, weaknessInPlay: false, overdrewInFlight: false, carried: [], carryingFurniture: false, "charges.value": 4 });
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
  assert.deepEqual(y.lines, [DGF.epilogue.year.forked], "m11: after Forked, only the Forked line");
  assert.deepEqual(y.missingDuties, []);
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
  return { slot, name: a.name, effect: a.effect, trait: a.trait ?? null, noLoot: !!a.noLoot, watchedOnly: !!a.watchedOnly, payerId: r.id, payerName: "Me", payer: { charges: r.system.charges.value, weaknessInPlay: !!r.system.weaknessInPlay } };
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

/* --------------------------------------------------------- B2: furniture -- */

test("B2: the furniture's extra obstacle is 2 harder than rolled, at most 12", async () => {
  const { furnitureObstacleDifficulty } = await import("../module/logic/rules.mjs");
  assert.equal(furnitureObstacleDifficulty(6), 8);
  assert.equal(furnitureObstacleDifficulty(10), 12);
  assert.equal(furnitureObstacleDifficulty(12), 12);
  const p = plan(roller("creature"), { trait: "brawn", difficulty: 8, furniture: true });
  assert.equal(p.difficulty, 10);
  assert.deepEqual(p.diffParts, [{ key: "furniture", n: 2 }]);
  const capped = plan(roller("creature"), { trait: "brawn", difficulty: 12, furniture: true });
  assert.equal(capped.difficulty, 12);
  assert.deepEqual(capped.diffParts, []);
  // an approach of its own still takes 2 off the (harder) obstacle
  const drac = roller("dracula");
  assert.equal(plan(drac, { trait: "sly", difficulty: 8, furniture: true, watched: true, abilities: [own(drac, "signature")] }).difficulty, 8);
});

test("B2: while furniture is carried, Suspicion rises by 1 at the end of each Turn (its own event per Turn)", async () => {
  const { endOfTurnFurniture, undoEndOfTurnFurniture, advanceTurn, eventsOf } = await import("../module/logic/raid.mjs");
  let s = newRaid({ id: "r" });
  s = endOfTurnFurniture(s, []);
  assert.equal(suspicionOf(s).value, 0, "nothing carried, nothing raised");
  s = advanceTurn(endOfTurnFurniture(s, ["Frankenstein’s Creature"]), 1); // Turn 1 ends
  s = advanceTurn(endOfTurnFurniture(s, ["Frankenstein’s Creature"]), 1); // Turn 2 ends
  assert.equal(s.turn, 3);
  assert.equal(suspicionOf(s).value, 2);
  assert.deepEqual(eventsOf(s).map((e) => [e.eventId, e.source]), [["furniture:2", "furniture"], ["furniture:1", "furniture"]]);
  // the Storyteller steps back a Turn: Turn 2 hadn't ended; ending it again counts once
  s = advanceTurn(undoEndOfTurnFurniture(s), -1);
  assert.equal(s.turn, 2);
  assert.equal(suspicionOf(s).value, 1);
  s = advanceTurn(endOfTurnFurniture(s, ["x"]), 1);
  assert.equal(suspicionOf(s).value, 2);
  assert.equal(s.ledger.length, 2);
  // the last Turn ends (dawn): it counts; after dawn there are no more Turns
  for (let i = s.turn; i < 12; i++) s = advanceTurn(s, 1);
  s = advanceTurn(endOfTurnFurniture(s, ["x"]), 1);
  assert.equal(s.dawn, true);
  assert.equal(suspicionOf(s).value, 3);
  assert.equal(endOfTurnFurniture(s, ["x"]), s);
  s = advanceTurn(undoEndOfTurnFurniture(s), -1);
  assert.equal(s.dawn, false);
  assert.equal(suspicionOf(s).value, 2);
});

/* ------------------------------------------- F13–F16 (approved 2026-10-06) -- */

test("F13: in a shared local chase every roll of a round shares one Suspicion event (once, by the biggest); alone, one roll one rise", async () => {
  const { chaseEventId, isSharedLocal } = await import("../module/logic/chase.mjs");
  const shared = newChase({ id: "s", members: [member("a", "dracula"), member("b", "witch")] });
  assert.equal(isSharedLocal(shared), true);
  assert.equal(chaseEventId(shared), "chase:s:1");
  assert.equal(chaseEventId({ ...shared, round: 3 }), "chase:s:3");
  assert.equal(chaseEventId(newChase({ id: "l", members: [member("a", "dracula")] })), null);
  assert.equal(chaseEventId(newChase({ id: "f", kind: "final", cause: "limit", members: shared.members })), null);
  let s = newRaid({ id: "r" });
  s = recordEvent(s, { eventId: "chase:s:1", amount: 1, source: "roll", messageId: "m1" }); // Trouble
  s = recordEvent(s, { eventId: "chase:s:1", amount: 2, source: "roll", messageId: "m2" }); // the Monster shows
  s = recordEvent(s, { eventId: "chase:s:2", amount: 1, source: "roll", messageId: "m3" }); // the next round rises again
  assert.equal(suspicionOf(s).value, 3);
});

test("F14: Night Runner and Fear the Curse work only for an Entity fleeing alone, never in a shared chase", () => {
  assert.equal(DGF.perkRules.nightRunner.aloneOnly, true);
  assert.equal(DGF.perkRules.fearTheCurse.aloneOnly, true);
  const runner = member("w", "werewolf", { perk: "nightRunner" });
  const curse = member("m", "mummy", { perk: "fearTheCurse" });
  assert.equal(newChase({ id: "a", members: [runner] }).lead, 2);
  assert.equal(newChase({ id: "b", members: [runner, member("d", "dracula")] }).lead, 1);
  assert.equal(mobDifficulty(newChase({ id: "c", members: [curse] }), { suspicion: 0 }), 7);
  assert.equal(mobDifficulty(newChase({ id: "d", members: [curse, runner] }), { suspicion: 0 }), 8);
  // the Storyteller takes the other one out: now it flees alone, and the mob is easier from the next round
  assert.equal(mobDifficulty(removeMember(newChase({ id: "e", members: [curse, runner] }), "w"), { suspicion: 0 }), 7);
});

test("F15: a captured carrier's furniture is lost for the night: it can't come home", async () => {
  const { loseFurniture } = await import("../module/logic/raid.mjs");
  let s = newRaid({ id: "r" });
  assert.equal(s.furnitureLost, false);
  s = loseFurniture(s);
  assert.equal(s.furnitureLost, true);
  assert.equal(loseFurniture(s), s);
  assert.equal(normalizeRaid(JSON.parse(JSON.stringify(s))).furnitureLost, true);
  assert.equal(normalizeRaid({}).furnitureLost, false);
  const list = [{ name: "cheese", duty: "cook", essential: true, home: true }, { name: "rope", duty: "handyman", home: true }];
  assert.equal(yearFromList({ list, furnitureHome: true }).result, "grand");
  const lost = yearFromList({ list, furnitureHome: true, furnitureLost: true });
  assert.equal(lost.result, "win");
  assert.equal(lost.furnitureHome, false);
  assert.equal(captureUpdate({ ...entitySystem("creature"), carryingFurniture: true }, { turn: 3 }).furniture, true);
});

test("F16: essentials: Easy one, Hard two; on Standard any die: odd one, even two", async () => {
  const { essentialsFor } = await import("../module/logic/year.mjs");
  for (let f = 1; f <= 6; f++) {
    assert.equal(essentialsFor("easy", f), 1);
    assert.equal(essentialsFor("hard", f), 2);
    assert.equal(essentialsFor("standard", f), f % 2 ? 1 : 2);
  }
  assert.equal(essentialsFor("standard", 19), 1);
  assert.equal(essentialsFor("standard", 20), 2);
});

/* ------------------------------------------------- B3 (after playtest PT4) -- */

test("B3 + V5: cornered in the round the Limit comes: captured first (Already Dead just joins the flight); otherwise the chase just ends", async () => {
  const { endLocalAtLimit } = await import("../module/logic/chase.mjs");
  // one Entity, its round complete and cornered: it stays behind
  let solo = startRound(newChase({ id: "a", members: [member("d", "dracula")] }), { face: 1 });
  solo = recordRoll(solo, "d", { messageId: "m", band: "trouble" }).chase;
  let out = endLocalAtLimit(solo);
  assert.equal(out.chase.outcome, "cornered");
  assert.deepEqual(out.staysBehind, ["d"]);
  // V5: Already Dead cornered as the Limit comes isn't captured and loses no Turn: it simply joins the flight
  let ghost = startRound(newChase({ id: "b", members: [member("g", "ghost", { perk: "alreadyDead" })] }), { face: 1 });
  ghost = recordRoll(ghost, "g", { messageId: "m", band: "trouble" }).chase;
  out = endLocalAtLimit(ghost);
  assert.equal(out.chase.outcome, "cornered");
  assert.equal(out.chase.atLimit, true);
  assert.deepEqual(out.staysBehind, []);
  assert.deepEqual(corneredFates(out.chase).map((f) => f.fate), ["flees"]);
  assert.deepEqual(corneredFates(resolveRound(ghost).chase).map((f) => f.fate), ["loseTurn"], "any other round: loses its next Turn");
  // a shared chase whose round isn't complete: it ends at once, nobody is cornered
  let shared = startRound(newChase({ id: "c", members: [member("d", "dracula"), member("w", "witch")] }), { face: 1 });
  shared = recordRoll(shared, "d", { messageId: "m", band: "trouble" }).chase;
  out = endLocalAtLimit({ ...shared, lead: 1 });
  assert.equal(out.chase.outcome, "ended");
  assert.deepEqual(out.staysBehind, []);
  // a round that doesn't corner: ended (or clear)
  let ok = startRound(newChase({ id: "e", members: [member("d", "dracula")] }), { face: 1 });
  ok = recordRoll(ok, "d", { messageId: "m", band: "cost" }).chase;
  assert.equal(endLocalAtLimit(ok).chase.outcome, "ended");
  assert.equal(endLocalAtLimit(endChase(ok, "escaped")).chase.outcome, "escaped", "a chase already over is left alone");
});

test("B3: overdraw in the final flight at most once per Entity per flight (refused in the roll plan)", () => {
  const broke = roller("dracula", { charges: { value: 0, start: 3 }, overdrewInFlight: true });
  const gift = own(broke, "gift");
  const once = plan(broke, { chase: true, hunt: true, chaseTraits: ["sly", "charm"], trait: "charm", second: "monster", abilities: [{ ...gift, payer: { charges: 0, weaknessInPlay: false, overdrewInFlight: true } }] });
  assert.ok(once.errors.some((e) => e.code === "overdrawOnce"));
  const fresh = roller("dracula", { charges: { value: 0, start: 3 } });
  const sig = own(fresh, "signature");
  const two = plan(fresh, { chase: true, hunt: true, chaseTraits: ["sly", "charm"], trait: "charm", second: "monster", abilities: [own(fresh, "gift"), { ...sig, effect: "hidden" }] });
  assert.ok(two.errors.some((e) => e.code === "overdrawOnce"), "two abilities at no charges is two overdraws");
  const first = plan(fresh, { chase: true, hunt: true, chaseTraits: ["sly", "charm"], trait: "charm", second: "monster", abilities: [own(fresh, "gift")] });
  assert.equal(first.ok, true);
  assert.equal(first.payments[0].weakness, true);
  // before the hunt there is no such limit (overdraw is Suspicion +2)
  const local = plan(fresh, { trait: "charm", abilities: [own(fresh, "gift"), { ...sig, effect: "hidden" }] });
  assert.equal(local.errors.some((e) => e.code === "overdrawOnce"), false);
});

/* ----------------------------------------------- B6 and the PT5 rulings -- */

test("V2: a switch ability's trait works in a chase, replacing the ground's traits (local and final); opening an approach never does", () => {
  const mummy = roller("mummy"); // Ancient Lore: use Wits instead
  const lore = own(mummy, "signature");
  const local = plan(mummy, { chase: true, chaseTraits: ["sly", "charm"], trait: "wits", abilities: [lore] });
  assert.equal(local.ok, true, local.errors.map((e) => e.code).join());
  assert.equal(local.trait, "wits");
  assert.equal(local.traitDie, 12);
  assert.ok(plan(mummy, { chase: true, chaseTraits: ["sly", "charm"], trait: "wits" }).errors.some((e) => e.code === "notOnGround"), "without it, only the ground's traits");
  // the final flight: a helper's switch on someone else's roll
  const drac = roller("dracula");
  const helper = { ...lore, payerId: "mummy", payerName: "The Mummy", payer: { charges: 3, weaknessInPlay: false } };
  const flight = plan(drac, { chase: true, hunt: true, chaseTraits: ["brawn", "nimble"], trait: "sly", second: "monster", abilities: [helper] });
  assert.equal(flight.ok, true, flight.errors.map((e) => e.code).join());
  assert.equal(flight.trait, "wits");
  assert.ok(plan(drac, { chase: true, chaseTraits: ["brawn", "nimble"], trait: "sly", abilities: [helper] }).errors.some((e) => e.code === "helpInLocalChase"), "in a local chase, only your own roll");
  assert.ok(plan(drac, { chase: true, chaseTraits: ["brawn", "nimble"], trait: "sly", abilities: [own(drac, "signature")] }).errors.some((e) => e.code === "openInChase"));
});

test("V4: the furniture is noisy from the Turn it is taken until it leaves town or is lost, even while set down", async () => {
  const { takeFurniture, furnitureLeaves, loseFurniture, setFurniture, endOfTurnFurniture, advanceTurn } = await import("../module/logic/raid.mjs");
  let s = newRaid({ id: "r" });
  assert.equal(s.furniture, "");
  s = advanceTurn(endOfTurnFurniture(s, []), 1);
  assert.equal(suspicionOf(s).value, 0, "not taken: no noise");
  s = advanceTurn(endOfTurnFurniture(s, ["A Witch"]), 1); // carried at a Turn's end: taken
  assert.equal(s.furniture, "inPlay");
  assert.equal(suspicionOf(s).value, 1);
  s = advanceTurn(endOfTurnFurniture(s, []), 1); // set down: still noisy
  assert.equal(suspicionOf(s).value, 2);
  s = advanceTurn(endOfTurnFurniture(furnitureLeaves(s), []), 1);
  assert.equal(s.furniture, "out");
  assert.equal(suspicionOf(s).value, 2, "out of town: quiet");
  assert.equal(takeFurniture(s).furniture, "out", "taken only once");
  let t = takeFurniture(newRaid({ id: "t" }));
  assert.equal(t.furniture, "inPlay");
  t = loseFurniture(t);
  assert.equal(t.furniture, "lost");
  assert.equal(t.furnitureLost, true);
  assert.equal(suspicionOf(advanceTurn(endOfTurnFurniture(t, ["x"]), 1)).value, 0, "lost: quiet, whoever ticks it");
  assert.equal(setFurniture(t, "").furnitureLost, false);
  assert.throws(() => setFurniture(t, "broken"));
  assert.equal(normalizeRaid({ furnitureLost: true }).furniture, "lost", "an older state");
  assert.equal(normalizeRaid({ furniture: "inPlay" }).furniture, "inPlay");
  // only a carried piece leaves town; one set down when the party leaves stays put, abandoned
  assert.equal(furnitureLeaves(takeFurniture(newRaid({ id: "c" })), { carried: true }).furniture, "out");
  const down = furnitureLeaves(takeFurniture(newRaid({ id: "d" })), { carried: false });
  assert.equal(down.furniture, "lost");
  assert.equal(down.furnitureLost, true, "it can't come home");
  // set down, its noise isn't anybody's: the event says so
  const quiet = endOfTurnFurniture(takeFurniture(newRaid({ id: "e" })), []);
  assert.deepEqual([quiet.ledger[0].label, quiet.ledger[0].actorName], ["furnitureDown", ""]);
  assert.equal(endOfTurnFurniture(takeFurniture(newRaid({ id: "f" })), ["A Witch"]).ledger[0].label, "furniture");
});

test("M3: a new raid starts Jekyll & Hyde as Jekyll", () => {
  const hyde = { ...entitySystem("jekyll-hyde"), form: "hyde", traits: { brawn: 12, nimble: 10, sly: 8, charm: 4, wits: 6 } };
  const u = newRaidUpdate(hyde);
  assert.equal(u.form, "jekyll");
  assert.deepEqual(u.traits, DGF.entities.find((e) => e.key === "jekyll-hyde").forms.jekyll);
  assert.equal(entitySystem("jekyll-hyde").form, "jekyll", "a new Entity starts as Jekyll");
  assert.equal("form" in newRaidUpdate(entitySystem("witch")), false, "one form: nothing to change");
});
