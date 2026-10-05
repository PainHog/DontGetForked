/**
 * Pure rules logic (module/logic/) against docs/CORE-RULES.md 1.0, with fixed
 * dice — and a cross-check that the simulator reads the decided rules the same way.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  band, isCritical, monsterShows, suspicionForRoll, resolveRoll, rollOdds, stepUp, stepDown,
  leadMove, majorityMove, localMobDifficulty, openApproachDifficulty, yearResult, tellGoesOff, weaknessInPlay,
} from "../module/logic/rules.mjs";
import { foldSuspicion, addEntry, cancelEvent } from "../module/logic/suspicion.mjs";
import * as simRules from "../sim/rules.mjs";
import { DGF } from "../module/config.mjs";

test("P2 bands and S8 Criticals", () => {
  assert.equal(band(8, 8), "success");
  assert.equal(band(6, 8), "cost");
  assert.equal(band(5, 8), "trouble");
  assert.equal(isCritical(4, 4, 8), true);
  assert.equal(isCritical(3, 3, 8), false); // doubles, but short
  assert.equal(isCritical(6, 5, 8), false);
});

test("S2: the Monster shows only when it rolls higher, and costs +2", () => {
  assert.equal(monsterShows(3, 4), true);
  assert.equal(monsterShows(4, 4), false);
  const r = resolveRoll({ traitFace: 3, secondFace: 7, difficulty: 8, second: "monster" });
  assert.equal(r.band, "success");
  assert.equal(r.show, true);
  assert.equal(r.suspicion, 2);
  assert.equal(resolveRoll({ traitFace: 3, secondFace: 7, difficulty: 8, second: "monster", hidden: true }).suspicion, 0);
});

test("one roll raises Suspicion once, by its biggest trigger (R1, S2, overdraw, P3)", () => {
  assert.equal(suspicionForRoll({ band: "trouble" }), 1);
  assert.equal(suspicionForRoll({ band: "trouble", show: true }), 2);
  assert.equal(suspicionForRoll({ band: "success", loud: true }), 1);
  assert.equal(suspicionForRoll({ band: "trouble", loud: true, overdraw: true }), 2);
  assert.equal(suspicionForRoll({ band: "cost", costSuspicion: true }), 1);
  assert.equal(suspicionForRoll({ band: "success" }), 0);
});

test("S1: once the hunt is on, rolls raise no Suspicion", () => {
  assert.equal(resolveRoll({ traitFace: 1, secondFace: 9, difficulty: 12, second: "monster", hunt: true }).suspicion, 0);
});

test("R6 and die steps", () => {
  assert.deepEqual(stepDown(4, 1), { die: 4, under: 1 });
  assert.deepEqual(stepUp(12, 1), { die: 12, over: 1 });
  assert.deepEqual(stepUp(6, 1), { die: 8, over: 0 });
});

test("S10, S9 and the chase rules", () => {
  assert.equal(openApproachDifficulty(10), 8);
  assert.equal(localMobDifficulty(0), 10);
  assert.equal(localMobDifficulty(3), 11);
  assert.equal(localMobDifficulty(9), 12);
  assert.equal(leadMove({ band: "success", critical: true }), 2);
  assert.equal(leadMove({ band: "cost" }), 0);
  assert.equal(majorityMove([{ band: "success" }, { band: "trouble" }, { band: "trouble" }]), -1);
  assert.equal(majorityMove([{ band: "success", critical: true }, { band: "trouble" }, { band: "trouble" }]), 0);
});

test("exact odds: d8 trait + Mask at Difficulty 8", () => {
  const o = rollOdds(8, 6, 8);
  assert.ok(Math.abs(o.success - 27 / 48) < 1e-12);
  assert.ok(Math.abs(o.trouble - 10 / 48) < 1e-12);
  assert.equal(o.show, 0);
});

test("how the year went (P8, Grand Year, left behind)", () => {
  const base = { listSize: 4, itemsHome: 4, essentialsAllHome: true, extrasMissing: 0 };
  assert.equal(yearResult({ ...base, furnitureHome: true }), "grand");
  assert.equal(yearResult(base), "win");
  assert.equal(yearResult({ ...base, itemsHome: 3, extrasMissing: 1 }), "win");
  assert.equal(yearResult({ ...base, itemsHome: 2, extrasMissing: 2 }), "partial");
  assert.equal(yearResult({ ...base, itemsHome: 3, essentialsAllHome: false, extrasMissing: 0 }), "partial");
  assert.equal(yearResult({ ...base, itemsHome: 1, essentialsAllHome: false, extrasMissing: 2 }), "bust");
  assert.equal(yearResult({ ...base, leftBehind: 1 }), "partial");
  assert.equal(yearResult({ ...base, itemsHome: 1, essentialsAllHome: false, extrasMissing: 2, leftBehind: 2 }), "bust");
  assert.equal(yearResult({ ...base, forked: true }), "forked");
});

test("the Suspicion ledger: one event one trigger, the Limit, the hunt, cancels", () => {
  let L = [];
  L = addEntry(L, { eventId: "roll1", amount: 1, source: "trouble" });
  L = addEntry(L, { eventId: "roll1", amount: 2, source: "monster" }); // same roll: biggest wins
  L = addEntry(L, { eventId: "group7", amount: 1, source: "trouble" }); // group check: once, by the worst
  L = addEntry(L, { eventId: "group7", amount: 2, source: "monster" });
  assert.equal(foldSuspicion(L, 13).value, 4);
  L = addEntry(L, { eventId: "tell3", amount: 1, source: "tell" });
  assert.deepEqual(foldSuspicion(L, 4), { value: 4, atLimit: true, lost: 1, events: 3 }); // R11
  assert.equal(foldSuspicion(cancelEvent(L, "roll1"), 13).value, 3);
  L = addEntry(L, { eventId: "flight", amount: 2, source: "overdraw", hunt: true }); // S1
  assert.equal(foldSuspicion(L, 13).value, 5);
  assert.throws(() => foldSuspicion([{ eventId: "x", amount: -1, source: "success" }], 13));
  assert.equal(foldSuspicion([{ eventId: "a", amount: 3, source: "trouble" }, { eventId: "b", amount: -1, source: "perk" }], 13).value, 2);
});

test("the simulator reads the decided rules the same way as the Foundry logic", () => {
  for (let D = 4; D <= 14; D++) for (let t = 1; t <= 12; t++) for (let s = 1; s <= 10; s++) {
    assert.equal(simRules.band(t + s, D), band(t + s, D));
    assert.equal(simRules.isCritical(t, s, D, "doubles"), isCritical(t, s, D));
    assert.equal(simRules.monsterShows(t, s), monsterShows(t, s));
  }
});

test("C1: every Entity (and Hyde) has one each of d12, d10, d8, d6 and d4", () => {
  const ok = (dice) => assert.deepEqual(DGF.traits.map((t) => dice[t]).sort((a, b) => a - b), [...DGF.dieSteps]);
  assert.equal(DGF.entities.length, 8);
  for (const e of DGF.entities) {
    ok(e.dice);
    for (const f of Object.values(e.forms || {})) ok(f);
  }
});

test("C4 Tells go off on 4-6; C3 Weakness timings", () => {
  assert.deepEqual([1, 2, 3, 4, 5, 6].map(tellGoesOff), [false, false, false, true, true, true]);
  assert.equal(weaknessInPlay({ timing: "always", round: 1 }), true);
  assert.equal(weaknessInPlay({ timing: "soon", round: 2 }), false);
  assert.equal(weaknessInPlay({ timing: "soon", round: 3 }), true);
  assert.equal(weaknessInPlay({ timing: "dawn", round: 1, final: true, byDawn: false }), false);
  assert.equal(weaknessInPlay({ timing: "dawn", round: 1, final: true, byDawn: true }), true);
  assert.equal(weaknessInPlay({ timing: "dawn", round: 1, final: false }), false);
  assert.equal(weaknessInPlay({ timing: "soon", round: 1, overdrawn: true }), true);
});

test("C13: Lantern Night has six local customs, one per face of a d6", () => {
  assert.equal(DGF.festival.name, "Lantern Night");
  assert.equal(DGF.festival.customs.length, 6);
  assert.equal(new Set(DGF.festival.customs.map((c) => c.key)).size, 6);
});
