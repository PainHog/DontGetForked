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

test("a party never has duplicate Entities or Castle Duties (R8)", () => {
  for (let i = 0; i < 50; i++) {
    const p = makeParty(makeRng(1, "party", i), 5, 3);
    assert.equal(new Set(p.map((m) => m.id)).size, 5);
    assert.equal(new Set(p.map((m) => m.duty)).size, 5);
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

// ---------------------------------------------------------------- conformance (docs/audits/SIM-AUDIT.md)

import { readFileSync } from "node:fs";
import { ROSTERS } from "../sim/entities.mjs";
import { CHASE_TABLES } from "../sim/town.mjs";
import { internals as E } from "../sim/engine.mjs";
import { Recorder } from "../sim/recorder.mjs";

const T = ["brawn", "nimble", "sly", "charm", "wits"];
const dice = (s) => Object.fromEntries(s.split(" ").map((d, i) => [T[i], Number(d)]));

test("the roster the simulator plays is the book's (Chapter 2: dice, signatures, Gifts, Perks, Weaknesses)", () => {
  // Pinned to the book, so a change to module/config.mjs can't move the simulator's baseline unnoticed (LESSONS: keep
  // the simulator measuring the version it was built for).
  const book = {
    dracula: ["8 10 6 12 4", "open charm", "Bat switch nimble · Mist hidden · Wolf raise", "hypnoticEyes oldMoney wallCrawler", "always"],
    creature: ["12 8 6 4 10", "switch brawn", "Mountain Stride open nimble · Hovel Watcher hidden · Book-Learned raise", "strongBack tireless builtToLast", "soon"],
    mummy: ["10 4 6 8 12", "switch wits", "Royal Bearing open charm · Just a Costume hidden · Old Curse raise", "patienceOfAges keeperOfTreasures fearTheCurse", "soon"],
    werewolf: ["10 12 6 4 8", "hidden", "Keen Nose switch wits · Through the Hedge open brawn · Howl raise", "nightRunner shortcut fetch", "soon"],
    invisible: ["4 8 12 6 10", "hidden", "Through the Gap open nimble · Poltergeist raise · Work It Out switch wits", "outOfSight hiddenPockets lightStep", "soon"],
    ghost: ["4 12 10 8 6", "open sly", "Chill raise · Whisper switch charm · Fade hidden", "spectral rattle alreadyDead", "always"],
    witch: ["6 4 10 8 12", "raise", "Broomstick open nimble · Black Cat hidden · A Potion for That switch wits", "familiarsWarning flyByNight wiseWoman", "soon"],
    "jekyll-hyde": ["4 6 8 12 10", "form", "Doctor’s Bag raise · Pillar of Society hidden · Trample open brawn", "practisedHand steadyNerves bruteStrength", "soon"],
  };
  const roster = ROSTERS.approved;
  assert.deepEqual(roster.map((e) => e.key).sort(), Object.keys(book).sort());
  const engine = readFileSync(new URL("../sim/engine.mjs", import.meta.url), "utf8");
  for (const e of roster) {
    const [d, sig, gifts, perks, timing] = book[e.key];
    assert.deepEqual(e.dice, dice(d), e.key);
    const [effect, trait] = sig.split(" ");
    assert.equal(e.signature.effect, effect, e.key);
    if (trait) assert.equal(e.signature.trait, trait, e.key);
    assert.equal(e.giftOptions.map((g) => [g.name, g.effect, ["switch", "open"].includes(g.effect) ? g.trait : null].filter(Boolean).join(" ")).join(" · "), gifts, e.key);
    assert.deepEqual([...e.perkOptions], perks.split(" "), e.key);
    // every Perk is played by the engine, not a placeholder
    for (const k of e.perkOptions) assert.match(engine, new RegExp(`hasPerk\\([^)]*"${k}"\\)`), `${e.key}: ${k}`);
    assert.equal(e.weakness, "mob", e.key);
    assert.equal(e.weaknessTiming, timing, e.key);
  }
  assert.equal(roster.find((e) => e.key === "ghost").signature.noLoot, true); // C8: not while carrying
  const jh = roster.find((e) => e.key === "jekyll-hyde").formDice;
  assert.deepEqual(jh.jekyll, dice("4 6 8 12 10"));
  assert.deepEqual(jh.hyde, dice("12 10 8 4 6"));
});

test("the simulator's numbers and chase table are the book's (Chapters 4–6 and 8)", () => {
  const L = NUMBERS.labels;
  const row = (k) => ["easy", "standard", "hard"].map((l) => L[l][k]);
  assert.deepEqual(row("items"), [4, 5, 5]);
  assert.deepEqual(row("essentials"), [[1], [1, 2], [2]]);
  assert.deepEqual(row("limit"), [11, 11, 15]);
  assert.deepEqual(row("exit"), [6, 8, 10]);
  assert.deepEqual(row("finalMob"), [10, 11, 11]);
  assert.deepEqual(row("lockup"), [10, 10, 10]); // B7
  assert.deepEqual(["easy", "standard", "hard"].map((l) => L[l].finalEscape ?? NUMBERS.lead.finalEscape), [5, 5, 6]);
  assert.deepEqual(row("turns"), [12, 12, 12]);
  assert.equal(NUMBERS.charges, 3);
  assert.equal(NUMBERS.overdrawSuspicion, 2);
  assert.deepEqual([NUMBERS.lead.localStart, NUMBERS.lead.localEscape, NUMBERS.lead.finalStart], [1, 4, 2]);
  assert.deepEqual(NUMBERS.localMob, { base: 8, perSuspicion: 0.5, max: 12 });
  assert.equal(NUMBERS.finalMobPerExtraEntity, 0); // S5
  assert.deepEqual(CHASE_TABLES.approved, [["sly", "charm"], ["nimble", "sly"], ["brawn", "nimble"], ["nimble", "wits"], ["charm", "sly"], ["brawn", "wits"]]);
});

test("every rule switch defaults to the decided rule", () => {
  const decided = {
    critRule: "doubles", critEffect: "both", costChoice: "mixed", dropRule: "recover", loudRule: "suspicion", openApproach: "easier",
    overdrawAtLimit: "once", furnitureNoise: "carried", finalMove: "margin2", openEase: 2, raiseCap: "perRoll", raiseDie: "trait",
    openTrait: "unlisted", waysIn: "two", overdrawStack: "merge", lootHandover: "free", chaseTable: "approved", captiveItems: "lost",
    multiCaught: "shared", monsterRule: "plus2", chaseSusp: "yes", slipRule: "success", furnitureRule: "noisySlowHard",
    corneredAtLimit: "captured", fetchRule: "flightExit", alreadyDeadTurns: 1, furniturePlace: "onList", exitRule: "gateSingle",
    groupRule: "all", tellScope: "party", triesPerTurn: "each", exitTries: "one", openedRule: "onlyOpener", mesmeriseRule: "watched", spectralRule: "noLoot", roster: "approved", dutyEdge: true,
    tellPartyChance: 0.5, weaknessRule: "timing",
  };
  const D = defaults();
  for (const [k, v] of Object.entries(decided)) assert.equal(D[k], v, k);
  for (const [k, p] of Object.entries(PARAMS)) if (p.kind === "rule") assert.ok(k in decided || ["tellChance"].includes(k), `${k}: a rule switch with no decided default listed here`);
});

/** A scripted dice stream: faces in order, then each die's highest face; `prefer` steers rng.pick (the Storyteller's Cost). */
function script(faces = [], prefer = []) {
  const q = [...faces];
  return {
    die: (f) => (q.length ? q.shift() : f), int: (a) => a, chance: () => false, next: () => 0,
    pick: (arr) => prefer.find((p) => arr.includes(p)) ?? arr[0], shuffle: (a) => a.slice(), weighted: (w) => Object.keys(w)[0], fork() { return this; },
  };
}
const R = Object.fromEntries(ROSTERS.approved.map((e) => [e.key, e]));
const member = (key, { perk = null, gift = 0, charges = 3 } = {}) => ({
  ent: R[key], id: R[key].id, gift: R[key].giftOptions[gift], perk, duty: null, charges, chargesStart: charges,
  status: "active", items: [], furniture: null, nextStepDown: 0,
});
const ob = (traits, difficulty, { watched = false, group = false } = {}) => ({
  options: traits.map((t) => ({ trait: t.replace("!", ""), loud: t.endsWith("!") })), difficulty, witnessed: watched, group, cleared: false, passed: new Set(),
});
function state(party, obstacles = [], { params = {}, faces = [], prefer = [] } = {}) {
  const loc = { id: "loc1", kind: null, obstacles, items: [{ id: "item1", essential: true, kind: "cook" }], furniture: null, done: false };
  const town = { L: NUMBERS.labels.standard, items: loc.items, locations: [loc], lockup: { id: "lockup", difficulty: 10 },
    furnitureLoc: { id: "furniture", obstacles: [ob(["brawn"], 8)], furniture: { size: "bulky" }, done: false } };
  const S = E.makeState({ party, town, params: { ...defaults(), furniturePolicy: "never", ...params }, numbers: NUMBERS, rng: script(faces, prefer), rec: new Recorder() });
  return { S, loc };
}

test("a switch never dodges the loud way, and a helper's switch helps anyone's roll except in a local chase", () => {
  const creature = member("creature"), wolf = member("werewolf"); // Brute Force (Brawn); Keen Nose (Wits)
  const door = ob(["sly", "brawn!"], 8, { watched: true }); // a locked front door: Sly, or Brawn the loud way
  const { S, loc } = state([creature, wolf], [door]);
  const cands = E.rollCandidates(S, creature, E.ctxFor(S, creature, door, loc, "raid"));
  assert.ok(cands.filter((c) => c.trait === "brawn").every((c) => c.loud && !c.via), "Brawn here is loud however you come to roll it");
  assert.ok(cands.some((c) => c.trait === "wits" && c.via?.owner === wolf), "the Werewolf's Keen Nose on the creature's roll");
  const chase = { phase: "local", options: [{ trait: "sly", loud: false }, { trait: "charm", loud: false }], difficulty: 9, witnessed: false, helpers: [], locKind: null, weakness: false };
  const local = E.rollCandidates(S, creature, chase);
  assert.ok(local.some((c) => c.trait === "brawn" && c.via?.owner === creature), "V2: its own switch in a chase");
  assert.ok(!local.some((c) => c.via && c.via.owner !== creature), "in a local chase abilities help only your own roll");
});

test("slipping free: a Cost does nothing (no Storyteller Cost), and frees only with Built to Last", () => {
  const inv = member("invisible"); // Sly d12: faces 5 + 4 = 9 against the lock-up's 10, a Cost
  const { S } = state([inv], [], { faces: [5, 4] });
  inv.status = "captured"; inv.capturedTurn = 0; S.turn = 1;
  E.captivesAct(S);
  assert.equal(inv.status, "captured");
  assert.equal(S.susp, 0);
  assert.equal(!!inv.loseTurn, false);
  assert.equal(inv.nextStepDown, 0);
  const built = member("creature", { perk: "builtToLast" });
  const b = state([built], [], { faces: [5, 4] });
  built.status = "captured"; built.capturedTurn = 0; b.S.turn = 1;
  E.captivesAct(b.S);
  assert.equal(built.status, "active");
  assert.equal(!!built.loseTurn || built.nextStepDown > 0, false);
});

test("B5's Fetch no longer waives picking up a dropped item (that was the Fetch B2 replaced)", () => {
  const wolf = member("werewolf", { perk: "fetch" });
  const { S } = state([wolf], [], { prefer: ["drop"] });
  wolf.items = [{ id: "x", essential: false }];
  assert.equal(E.pickCost(S, wolf, 1), "drop");
  assert.equal(wolf.loseTurn, true);
});

test("F23: a group check's Costs are picked after its rolls, never a Suspicion +1 the group already took", () => {
  const creature = member("creature"), wolf = member("werewolf");
  const tug = ob(["brawn"], 10, { group: true }); // unwatched: Trouble starts no chase
  // the creature 3 + 2 (Trouble), the Werewolf 5 + 4 = 9 (a Cost); the Storyteller would take Suspicion +1 if allowed
  const { S, loc } = state([creature, wolf], [tug], { faces: [3, 2, 5, 4], prefer: ["suspicion"] });
  assert.equal(E.groupCheck(S, loc, tug, [creature, wolf], new Set()), true);
  assert.equal(S.susp, 1); // once, by the biggest trigger
  assert.ok(wolf.loseTurn || wolf.nextStepDown > 0, "the Werewolf's Cost costs something");
  assert.deepEqual([...tug.passed], [wolf.id]);
});

test("Chapter 4: whoever hasn't got past a group obstacle stays behind it; the others go on", () => {
  const creature = member("creature"), wolf = member("werewolf");
  const tug = ob(["brawn"], 10, { group: true }), trapdoor = ob(["brawn"], 6);
  // Turn 1: the creature 6 + 4 (past), the Werewolf 3 + 2 (Trouble); Turn 2: the Werewolf 3 + 2 again, the creature 6 + 4 at the trapdoor
  const { S, loc } = state([creature, wolf], [tug, trapdoor], { faces: [6, 4, 3, 2, 3, 2, 6, 4] });
  S.turn = 1; E.workLocation(S, loc);
  assert.equal(loc.done, false);
  S.turn = 2; E.workLocation(S, loc);
  assert.equal(loc.done, true);
  assert.ok(loc.behind?.has(wolf), "the Werewolf is still behind the tug-of-war");
  assert.deepEqual(creature.items.map((i) => i.id), ["item1"]);
  assert.equal(wolf.items.length, 0);
});

test("the way out: one rolls for all, and on Trouble the party tries again next Turn", () => {
  for (const [exitTries, phase] of [["one", "raid"], ["each", "done"]]) {
    const creature = member("creature"), wolf = member("werewolf", { perk: "nightRunner" });
    const { S } = state([creature, wolf], [], { faces: [1, 1], params: { exitTries } }); // 1 + 1: Trouble, caught; then the highest faces
    S.turn = 5;
    E.workLocation(S, E.exitLocation(S));
    assert.equal(S.phase, phase, exitTries);
    assert.equal(S.rec.rolls.raid.n, exitTries === "one" ? 1 : 2, exitTries);
  }
});

test("the roller plans after handing its loot over (SA-05; the pre-V17 Out of Sight, where that left him unwatched)", () => {
  const inv = member("invisible", { perk: "outOfSight" }), jekyll = member("jekyll-hyde", { charges: 0 }); // Sly d12 against Jekyll's d8
  const neighbour = ob(["sly"], 8, { watched: true });
  const { S, loc } = state([inv, jekyll], [neighbour], { faces: [1, 1], params: { outOfSightRule: "carry" } });
  inv.items = [{ id: "x", essential: false }];
  S.turn = 1; E.workLocation(S, loc);
  assert.ok(S.rec.counts["loot handed over"] >= 1);
  assert.equal(S.rec.rolls.raid.trouble, 1); // his roll (1 + 1)
  assert.equal(S.rec.counts["local chases"] ?? 0, 0, "Trouble with empty hands gets him caught by nobody");
});

test("a lost Turn skips a move: the Entity follows a Turn behind", () => {
  const wolf = member("werewolf");
  const { S } = state([wolf]);
  wolf.loseTurn = true; S.turn = 3;
  E.followsBehind(S, [wolf]);
  assert.equal(wolf.loseTurn, false);
  assert.equal(E.hereOf(S).length, 0);
  S.turn = 4; assert.equal(E.hereOf(S).length, 0);
  S.turn = 5; assert.equal(E.hereOf(S).length, 1);
});

test("Out of Sight (V17): caught while anyone with him carries loot; the other candidates", () => {
  const run = (rule, faces, partnerCarries = false) => {
    const inv = member("invisible", { perk: "outOfSight" }), jekyll = member("jekyll-hyde", { charges: 0 });
    const neighbour = ob(["sly"], 8, { watched: true });
    const { S, loc } = state([inv, jekyll], [neighbour], { faces, params: { outOfSightRule: rule } });
    if (partnerCarries) jekyll.items = [{ id: "x", essential: false }];
    S.turn = 1; E.workLocation(S, loc);
    return S.rec.counts["local chases"] ?? 0;
  };
  assert.equal(defaults().outOfSightRule, "place"); // V17
  assert.equal(run("carry", [1, 1], true), 0); // the book before V17: only what he carries counts
  assert.equal(run("place", [1, 1], true), 1); // V17: his partner's loot gives him away
  assert.equal(run("place", [1, 1]), 0); // nobody with him carries anything
  assert.equal(run("half", [1, 1, 4]), 0); // 4–6: they didn't see him
  assert.equal(run("half", [1, 1, 3]), 1);
});

test("V21: with lootDrop outOfSight the Invisible Man sets loot down before watched rolls, and never by default", () => {
  const ent = (P) => runConfig({ params: { ...defaults(), ...P }, numbers: NUMBERS, runs: 150, seed: 5 }).rec.counts["loot set down (V21)"] ?? 0;
  assert.equal(ent({}), 0);
  assert.ok(ent({ lootDrop: "outOfSight" }) > 0);
});
