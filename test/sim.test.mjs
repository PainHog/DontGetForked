/**
 * Simulator tests (sim/README.md §10): the dice rules against hand-worked
 * values, the placeholder roster's legality, determinism, and every parameter
 * value running to a legal result.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { band, isCritical, monsterShows, stepUp, stepDown, outcomeDist, majorityMove, leadMove, MASK, MONSTER } from "../sim/rules.mjs";
import { ROSTER, validateEntity, makeParty, TRAITS } from "../sim/entities.mjs";
import { makeRng } from "../sim/rng.mjs";
import { PARAMS, PRESETS, NUMBERS, defaults } from "../sim/params.mjs";
import { runConfig, metrics, merge } from "../sim/run.mjs";

test("P2 bands: meet the Difficulty = Success, 1–2 short = Cost, 3+ short = Trouble", () => {
  assert.equal(band(8, 8), "success");
  assert.equal(band(12, 8), "success");
  assert.equal(band(7, 8), "cost");
  assert.equal(band(6, 8), "cost");
  assert.equal(band(5, 8), "trouble");
});

test("Critical candidates: doubles on a Success; beat by 4", () => {
  assert.equal(isCritical(4, 4, 8, "doubles"), true);
  assert.equal(isCritical(3, 3, 8, "doubles"), false); // doubles but short
  assert.equal(isCritical(6, 6, 8, "beat4"), true);
  assert.equal(isCritical(6, 5, 8, "beat4"), false);
});

test("the Monster shows only when the Monster die is higher than the trait die", () => {
  assert.equal(monsterShows(3, 4), true);
  assert.equal(monsterShows(4, 4), false);
  assert.equal(monsterShows(9, 2), false);
});

test("die steps stop at d12 and floor at d4, reporting the lost steps", () => {
  assert.deepEqual(stepUp(10, 1), { die: 12, over: 0 });
  assert.deepEqual(stepUp(12, 1), { die: 12, over: 1 });
  assert.deepEqual(stepDown(6, 1), { die: 4, under: 0 });
  assert.deepEqual(stepDown(4, 2), { die: 4, under: 2 });
});

test("exact odds: d8 trait + Mask d6 at Difficulty 8", () => {
  const d = outcomeDist(8, MASK, 8);
  assert.ok(Math.abs(d.success - 27 / 48) < 1e-12);
  assert.ok(Math.abs(d.trouble - 10 / 48) < 1e-12);
  assert.ok(Math.abs(d.success + d.cost + d.trouble - 1) < 1e-12);
  assert.equal(d.show.success + d.show.cost + d.show.trouble, 0); // the Mask never shows
});

test("exact odds: the Monster shows 55% of the time over a d8 trait", () => {
  const d = outcomeDist(8, MONSTER, 8, { monster: true });
  const show = d.show.success + d.show.cost + d.show.trouble;
  assert.ok(Math.abs(show - 44 / 80) < 1e-12);
  const hidden = outcomeDist(8, MONSTER, 8, { monster: true, hidden: true });
  assert.equal(hidden.show.success + hidden.show.cost + hidden.show.trouble, 0);
});

test("final flight majority rule and local Lead moves", () => {
  const S = { band: "success" }, C = { band: "cost" }, T = { band: "trouble" };
  assert.equal(majorityMove([S, S, T]), 1);
  assert.equal(majorityMove([S, T]), 0);
  assert.equal(majorityMove([T, T, C]), -1);
  assert.equal(majorityMove([{ band: "success", critical: true }, T, T], 2), 0);
  assert.equal(leadMove(S), 1);
  assert.equal(leadMove(C), 0);
  assert.equal(leadMove(T), -1);
});

test("placeholder roster keeps guardrail 1 (one each of d4–d12) with distinct arrangements", () => {
  assert.equal(ROSTER.length, 8);
  for (const e of ROSTER) assert.deepEqual(validateEntity(e), []);
  const arr = new Set(ROSTER.map((e) => TRAITS.map((t) => e.dice[t]).join(",")));
  assert.equal(arr.size, 8);
});

test("a party never has duplicate Entities", () => {
  for (let i = 0; i < 50; i++) {
    const p = makeParty(makeRng(1, "party", i), 5, 3);
    assert.equal(new Set(p.map((m) => m.id)).size, 5);
  }
});

test("same seed → same raids", () => {
  const run = () => runConfig({ params: defaults(), numbers: NUMBERS, runs: 30, seed: 7 }).raids.map((r) => `${r.result}|${r.susp}|${r.turnsUsed}|${r.captures}`).join(";");
  assert.equal(run(), run());
});

test("every raid ends in a legal result", () => {
  const { raids } = runConfig({ params: defaults(), numbers: NUMBERS, runs: 60, seed: 3 });
  for (const r of raids) {
    assert.ok(["grand", "win", "partial", "bust", "forked"].includes(r.result), r.result);
    if (r.forked) assert.ok(r.finalTrigger, "forked only in a final flight");
    if (r.result === "grand") assert.ok(r.furnitureHome);
    assert.ok(r.turnsUsed <= NUMBERS.labels[r.label].turns);
  }
});

test("every parameter value and preset runs", () => {
  const P = defaults();
  const variants = [...Object.values(PRESETS)];
  for (const [k, def] of Object.entries(PARAMS)) for (const v of def.values) variants.push({ [k]: v });
  for (const v of variants) {
    const res = runConfig({ params: { ...P, ...v }, numbers: NUMBERS, runs: 4, seed: 11 });
    const M = metrics(res);
    assert.ok(Number.isFinite(M.byLabel.hard.win), JSON.stringify(v));
  }
});

test("--numbers overrides merge deeply", () => {
  const n = merge(NUMBERS, { labels: { hard: { limit: 9 } } });
  assert.equal(n.labels.hard.limit, 9);
  assert.equal(n.labels.hard.items, NUMBERS.labels.hard.items);
  assert.equal(merge(NUMBERS, null), NUMBERS);
});
