/**
 * The rulebook's numbers and tables (book/src/chapters/*.html) against the game data
 * (module/config.mjs) and the rules logic, so a change made in one place and not the
 * other fails here. The book is the source of truth: when one of these fails, decide
 * which side is wrong (the book first, then the config and the Foundry system), never
 * just the test. Also checked: Chapter 9's towns against book/src/towns.json, and every
 * roll total, Lead and Suspicion in Chapter 9's example of play, recomputed from its dice.
 * Finding ids (BA-n) are in docs/audits/BOOK-AUDIT.md.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DGF } from "../module/config.mjs";
import { powerRule, perkParts, weaknessTiming } from "../module/logic/power-text.mjs";
import { rewrite as rewriteEntries } from "../book/tools/entity-entries.mjs";
import { band, isCritical, monsterShows, suspicionForRoll, leadMove, majorityMove, localMobDifficulty, stepUp, stepDown, tellGoesOff } from "../module/logic/rules.mjs";

/* ------------------------------------------------------------ helpers -- */

const ROOT = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, ROOT), "utf8");
const chapter = (file) => read(`book/src/chapters/${file}`);
const ENT = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&nbsp;": " " };
/** An HTML fragment as the words a reader sees (inline emphasis joins its word; other tags are spaces). */
const plain = (html) => String(html)
  .replace(/<!--[\s\S]*?-->/g, " ")
  .replace(/<\/?(?:strong|em|b|i|a)\b[^>]*>/g, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/&[a-z#0-9]+;/gi, (m) => ENT[m] ?? m)
  .replace(/\s+/g, " ")
  .replace(/ ([,.;:)])/g, "$1")
  .replace(/\( /g, "(")
  .trim();
const rowsOf = (tableHtml) => [...tableHtml.replace(/<thead>[\s\S]*?<\/thead>/, "").matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)]
  .map((m) => [...m[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((c) => plain(c[1])));
/** The HTML from a chapter's <h3>heading</h3> up to its next <h3> (or the end). */
function section(file, heading) {
  const html = chapter(file);
  const at = html.indexOf(`<h3>${heading}</h3>`);
  assert.ok(at >= 0, `${file} has a "${heading}" heading`);
  const next = html.indexOf("<h3", at + 4);
  return html.slice(at, next < 0 ? undefined : next);
}
/** The rows of the first table after a heading. */
const tableAfter = (file, heading) => {
  const html = chapter(file);
  const at = html.indexOf(`<h3>${heading}</h3>`);
  assert.ok(at >= 0, `${file} has a "${heading}" heading`);
  return rowsOf(html.slice(at).match(/<table[\s\S]*?<\/table>/)[0]);
};
/** A reader's text must contain `want`. */
const says = (text, want, where) => assert.ok(text.includes(want), `${where} should say "${want}"`);
const match = (text, re, where) => { const m = text.match(re); assert.ok(m, `${where} should match ${re}`); return m.slice(1).map(Number); };

const CH = { ch1: "11-ch01.html", ch2: "12-ch02.html", ch3: "13-ch03.html", ch4: "14-ch04.html", ch5: "15-ch05.html", ch6: "16-ch06.html", ch7: "17-ch07.html", ch8: "31-ch08.html", ch9: "32-ch09.html", sheet: "40-entity-sheet.html", ref: "41-reference.html" };
const TXT = Object.fromEntries(Object.entries(CH).map(([k, f]) => [k, plain(chapter(f))]));

const L = DGF.labels;
const LABELS = ["easy", "standard", "hard"];
const LABEL = { easy: "Easy", standard: "Standard", hard: "Hard" };
const TRAIT = { brawn: "Brawn", nimble: "Nimble", sly: "Sly", charm: "Charm", wits: "Wits" };
const WORD = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const ORDINAL = ["zeroth", "first", "second", "third", "fourth", "fifth", "sixth"];
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const low = (s) => s.charAt(0).toLowerCase() + s.slice(1);
/** House style after a colon: the first word lower-cased (past an opening quote). */
const lowFirst = (s) => s.replace(/^([“"]?)(\p{L})/u, (m, q, c) => q + c.toLowerCase());
/** "A Ghost" → "a Ghost", "The Mummy" → "the Mummy", "Dracula" stays. */
const article = (name) => name.replace(/^(A|The) /, (m) => m.toLowerCase());
const way = (trait, text) => `${TRAIT[trait]}${text ? ` (${text})` : ""}`;
/** "Sly or Nimble, or Brawn the loud way" from { quiet, loud }. */
const ways = ({ quiet, loud }) => `${quiet.map((t) => TRAIT[t]).join(" or ")}${loud.length ? `, or ${loud.map((t) => TRAIT[t]).join(" or ")} the loud way` : ""}`;
const range = (lo, hi) => (lo === hi ? `${lo}` : `${lo}–${hi}`);
const essentials = (e) => range(e[0], e[e.length - 1]);
const mixRow = (mix) => `${[6, 8, 10, 12].map((d) => Math.round((mix[d] ?? 0) * 100)).join(" · ")}%`;

/* ----------------------------------------------- Chapter 3: the roll -- */

test("the Difficulty ladder (Chapter 3, At the Table) is DGF.difficulty", () => {
  const D = DGF.difficulty;
  const ladder = `${D.easy} easy, ${D.standard} standard, ${D.hard} hard, ${D.daunting} daunting`;
  says(TXT.ch3, `compare the total with the Difficulty: ${ladder}`, "Chapter 3, The Roll");
  says(TXT.ref, `against the Difficulty: ${ladder}`, "At the Table, The Roll");
});

test("the result bands (Chapter 3) are what the rules logic reads", () => {
  says(TXT.ch3, "Success: the total meets the Difficulty", "Chapter 3, Results");
  says(TXT.ch3, "Cost: 1–2 short", "Chapter 3, Results");
  says(TXT.ch3, "Trouble: 3 or more short", "Chapter 3, Results");
  for (const d of Object.values(DGF.difficulty)) {
    assert.equal(band(d, d), "success");
    assert.equal(band(d - 1, d), "cost");
    assert.equal(band(d - 2, d), "cost");
    assert.equal(band(d - 3, d), "trouble");
  }
  says(TXT.ch3, "Critical: a Success where both dice show the same face", "Chapter 3, Results");
  assert.equal(isCritical(4, 4, 8), true);
  assert.equal(isCritical(3, 3, 8), false, "doubles that miss are not a Critical");
  says(TXT.ch3, "In a chase it counts as two Successes", "Chapter 3, Results");
  says(TXT.ch3, "came up higher than your trait die", "Chapter 3, The Monster Shows");
  assert.equal(monsterShows(4, 5), true);
  assert.equal(monsterShows(5, 5), false, "a tie shows nothing");
});

test("the dice: one each of d12…d4, the Mask d6 and the Monster d10 (Chapters 2–3, Entity Sheet)", () => {
  const set = [...DGF.dieSteps].reverse().map((d) => `d${d}`);
  says(TXT.ch2, `Every Entity has one each of ${set.slice(0, -1).join(", ")} and ${set.at(-1)}`, "Chapter 2, Five Traits");
  says(TXT.sheet, `One each of ${set.slice(0, -1).join(", ")} and ${set.at(-1)}`, "the Entity Sheet");
  const { mask, monster } = DGF.second;
  says(TXT.ch2, `the Mask d${mask}, passing as human, or the Monster d${monster}`, "Chapter 2, The Mask and the Monster");
  says(TXT.ch3, `the Mask d${mask} or the Monster d${monster}`, "Chapter 3, The Roll");
  says(TXT.sheet, `the Mask d${mask} or the Monster d${monster}`, "the Entity Sheet");
  says(TXT.ref, `the Mask d${mask} or the Monster d${monster}`, "At the Table");
  says(TXT.ch3, `a d${DGF.dieSteps.at(-1)} can’t go higher`, "Chapter 3, Abilities");
  says(TXT.ch3, `Nothing makes a die smaller than a d${DGF.dieSteps[0]}`, "Chapter 3, Abilities");
  assert.equal(stepUp(DGF.dieSteps.at(-1)).die, DGF.dieSteps.at(-1));
  assert.equal(stepDown(DGF.dieSteps[0]).die, DGF.dieSteps[0]);
});

test("abilities: opening an approach is 2 lower; the Costs in the book's order (Chapter 3, At the Table)", () => {
  says(TXT.ch3, `roll that trait at ${DGF.openApproachEase} lower Difficulty`, "Chapter 3, Abilities");
  says(TXT.ref, `open your own approach with an unlisted trait (${DGF.openApproachEase} lower`, "At the Table, Abilities");
  const COST = { suspicion: `Suspicion +${DGF.suspicion.cost}`, drop: "drop an item", loseTurn: "lose a Turn", smaller: "one size smaller" };
  for (const [where, text] of [["Chapter 3, Results", TXT.ch3.slice(TXT.ch3.indexOf("Cost: 1–2 short"))], ["At the Table", TXT.ref.slice(TXT.ref.indexOf("Cost:"))]]) {
    const at = DGF.costs.map((k) => text.indexOf(COST[k]));
    assert.ok(at.every((i) => i >= 0), `${where} lists the four Costs`);
    assert.deepEqual([...at].sort((a, b) => a - b), at, `${where} lists the Costs in DGF.costs order`);
  }
});

/* -------------------------------------- charges, Turns, the campaign -- */

test("3 charges, 12 Turns, the castle upgrades (Chapters 2, 4, 7, 8, Entity Sheet, At the Table)", () => {
  says(TXT.ch2, `Every Entity has ${DGF.charges} charges.`, "Chapter 2, Charges");
  says(TXT.ch4, `The night lasts ${DGF.turns} Turns.`, "Chapter 4, Turns");
  says(TXT.ch4, `Dawn comes when the ${DGF.turns}th Turn ends`, "Chapter 4, Turns");
  says(TXT.ref, `${DGF.turns} Turns, then dawn.`, "At the Table, Turns");
  const sheet = chapter(CH.sheet);
  assert.equal((sheet.match(/<span class="pip"><\/span>/g) ?? []).length, DGF.charges, "the Entity Sheet has a pip per charge");
  assert.equal((sheet.match(/<span class="pip dashed"><\/span>/g) ?? []).length, DGF.campaign.maxUpgrades, "the Entity Sheet has a dashed pip per castle upgrade");
  const C = DGF.campaign;
  says(TXT.ch7, `each upgrade gives one Entity of the players’ choice ${WORD[C.chargesPerUpgrade]} extra charge`, "Chapter 7, Campaign Play");
  says(TXT.ch7, `The castle holds ${WORD[C.maxUpgrades]} upgrades at most; bringing home a ${ORDINAL[C.maxUpgrades + 1]} replaces one`, "Chapter 7, Campaign Play");
});

/* --------------------------------------------- the difficulty labels -- */

test("Chapter 8's Difficulty table is DGF.labels, row by row", () => {
  const rows = tableAfter(CH.ch8, "Difficulty");
  const want = [
    ["Shopping list (essentials)", (l) => `${l.items} (${essentials(l.essentials)})`],
    ["Obstacle Difficulties: share of 6 · 8 · 10 · 12", (l) => mixRow(l.mix)],
    ["Suspicion Limit", (l) => `${l.limit}`],
    ["The final flight: escape at Lead", (l) => `${l.finalEscape}`],
    ["The way out: Difficulty", (l) => `${l.exit}`],
    ["The final flight: mob Difficulty", (l) => `${l.finalMob}`],
    ["The lock-up: Difficulty", (l) => `${l.lockup}`],
  ];
  assert.deepEqual(rows.map((r) => r[0]), want.map((w) => w[0]), "the table's rows");
  for (const [i, [label, f]] of want.entries()) assert.deepEqual(rows[i].slice(1), LABELS.map((k) => f(L[k])), label);
  says(TXT.ch8, "on Standard, roll any die: odd, one; even, two", "Chapter 8, The Shopping List");
  assert.deepEqual(L.standard.essentials, [1, 2]);
});

test("At the Table's numbers table is DGF.labels", () => {
  const html = chapter(CH.ref);
  const rows = rowsOf(html.match(/<table class="tbl ref-numbers">[\s\S]*?<\/table>/)[0]);
  const want = {
    "Shopping list (essentials)": (l) => `${l.items} (${essentials(l.essentials)})`,
    "Suspicion Limit": (l) => `${l.limit}`,
    "The way out": (l) => `${l.exit}`,
    "The final flight: mob · escape at": (l) => `${l.finalMob} · ${l.finalEscape}`,
    "The lock-up": (l) => `${l.lockup}`,
  };
  assert.deepEqual(rows.map((r) => r[0]), Object.keys(want));
  for (const r of rows) assert.deepEqual(r.slice(1), LABELS.map((k) => want[r[0]](L[k])), r[0]);
});

test("the labels' numbers in the chapters' prose (Chapters 4, 5, 6) are DGF.labels", () => {
  const [eItems, shItems] = match(TXT.ch4, /(\d+) items on Easy, (\d+) on Standard and Hard/, "Chapter 4, The Shopping List");
  assert.deepEqual([L.easy.items, L.standard.items, L.hard.items], [eItems, shItems, shItems]);
  const [esLimit, hLimit] = match(TXT.ch5, /Limit: (\d+) on Easy and Standard, (\d+) on Hard/, "Chapter 5's opener");
  assert.deepEqual([L.easy.limit, L.standard.limit, L.hard.limit], [esLimit, esLimit, hLimit]);
  const [lock] = match(TXT.ch6, /lock-up Difficulty \((\d+)\)/, "Chapter 6, Captured"); // B7: one lock-up Difficulty for every label
  assert.deepEqual([L.easy.lockup, L.standard.lockup, L.hard.lockup], [lock, lock, lock]);
  const [start, esEscape, hEscape] = match(TXT.ch6, /The Lead starts at (\d+) and the party escapes at (\d+) \(at (\d+) on Hard\)/, "Chapter 6, The Final Flight");
  assert.equal(start, DGF.lead.finalStart);
  assert.deepEqual([L.easy.finalEscape, L.standard.finalEscape, L.hard.finalEscape], [esEscape, esEscape, hEscape]);
  const [eMob, shMob] = match(TXT.ch6, /set by the town’s difficulty \((\d+) on Easy, (\d+) on Standard and Hard\)/, "Chapter 6, The Final Flight");
  assert.deepEqual([L.easy.finalMob, L.standard.finalMob, L.hard.finalMob], [eMob, shMob, shMob]);
  const [rStart, rEsc, rHard] = match(TXT.ref, /Final flight:.*?Lead (\d+), escape at (\d+) \((\d+) on Hard\)/, "At the Table, Chases");
  assert.deepEqual([rStart, rEsc, rHard], [DGF.lead.finalStart, L.standard.finalEscape, L.hard.finalEscape]);
});

/* ------------------------------------------------------------ chases -- */

test("the local chase (Chapters 6 and 8, At the Table) is DGF.lead and DGF.localMob", () => {
  const { localStart, localEscape } = DGF.lead;
  const M = DGF.localMob;
  assert.equal(M.perSuspicion, 0.5, "the book says “half the Suspicion”");
  says(TXT.ch6, `Your Lead starts at ${localStart} and you escape at ${localEscape}.`, "Chapter 6, The Local Chase");
  says(TXT.ch6, `The mob’s Difficulty is ${M.base} plus half the Suspicion (round down), at most ${M.max}, checked each round.`, "Chapter 6, The Local Chase");
  says(TXT.ch8, `On every difficulty: ${DGF.charges} charges per Entity, ${DGF.turns} Turns, overdraw +${DGF.suspicion.overdraw} Suspicion; a local chase starts at Lead ${localStart} and escapes at ${localEscape} against a mob of ${M.base} plus half the Suspicion (at most ${M.max}); the final flight starts at Lead ${DGF.lead.finalStart}.`, "Chapter 8, under the Difficulty table");
  says(TXT.ref, `Local chase: Lead ${localStart}, escape at ${localEscape}, against ${M.base} + half the Suspicion (at most ${M.max})`, "At the Table, Chases");
  assert.equal(localMobDifficulty(3), 9, "8 + half of 3, rounded down");
  assert.equal(localMobDifficulty(100), M.max);
});

test("the Lead and the majority rule (Chapter 6, At the Table) are what the rules logic does", () => {
  says(TXT.ch6, "Success: Lead +1 (a Critical: +2)", "Chapter 6, The Lead");
  says(TXT.ch6, "Cost: no change", "Chapter 6, The Lead");
  says(TXT.ch6, "Trouble: Lead −1", "Chapter 6, The Lead");
  assert.deepEqual([leadMove({ band: "success" }), leadMove({ band: "success", critical: true }), leadMove({ band: "cost" }), leadMove({ band: "trouble" })], [1, 2, 0, -1]);
  says(TXT.ch6, "If Successes outnumber Trouble, the Lead rises by 1, or by 2 if they outnumber it by two or more; if Trouble outnumbers Successes, it falls the same way; otherwise it stays. A Critical counts as two Successes.", "Chapter 6, The Majority Rule");
  const S = { band: "success" }, T = { band: "trouble" }, C = { band: "cost" }, X = { band: "success", critical: true };
  assert.deepEqual([majorityMove([S, T]), majorityMove([S, C]), majorityMove([S, S]), majorityMove([S, S, S, T]), majorityMove([T, T, C]), majorityMove([X])], [0, 1, 2, 2, -2, 2]);
});

test("Weakness timings (Chapters 2 and 6, At the Table, Entity Sheet) are the Entities' data", () => {
  const always = DGF.entities.filter((e) => e.weakness.timing === "always").map((e) => article(e.name));
  says(TXT.ch6, `Always: from the first round of any chase (${always.join(", ")}).`, "Chapter 6, Your Weakness");
  says(TXT.ch6, `Soon: from the ${ORDINAL[DGF.weaknessSoonRound]} round of any chase (everyone else).`, "Chapter 6, Your Weakness");
  says(TXT.ref, `(Always: round 1; Soon: round ${DGF.weaknessSoonRound})`, "At the Table, Chases");
  assert.deepEqual([...DGF.weaknessTimings], ["always", "soon"]);
  assert.match(chapter(CH.sheet), /<span class="box-check"><\/span>Always<span class="box-check"><\/span>Soon<\/div>/, "the sheet's Weakness boxes are the two timings");
});

test("the chase table (Chapter 6, At the Table) is DGF.chaseTable", () => {
  const want = DGF.chaseTable.map((r, i) => [`${i + 1}`, `${r.name}. ${r.text}`, r.traits.map((t) => TRAIT[t]).join(", ")]);
  assert.deepEqual(tableAfter(CH.ch6, "The Chase Table"), want);
  const ref = chapter(CH.ref).match(/<table class="tbl ref-numbers">[\s\S]*?<\/table>/g)[1];
  assert.deepEqual(rowsOf(ref), want, "At the Table's chase table");
  assert.ok(DGF.chaseTable.every((r) => r.traits.some((t) => t !== "nimble")), "every ground offers a trait that isn't Nimble (Chapter 6)");
});

test("the way out and the lock-up's traits (Chapters 4 and 6, At the Table) are DGF.wayOut and DGF.lockup", () => {
  says(TXT.ch4, `The way out is one watched obstacle: ${ways(DGF.wayOut)}.`, "Chapter 4, Getting Out");
  says(TXT.ref, `The way out: ${ways(DGF.wayOut)}; one roll for all.`, "At the Table, Turns");
  says(TXT.ch6, `the lock-up is an obstacle — ${ways(DGF.lockup.rescue)}, always watched —`, "Chapter 6, Captured (rescue)");
  says(TXT.ch6, `a captive may try to slip free: ${ways(DGF.lockup.slip)}, at the lock-up Difficulty`, "Chapter 6, Captured (slipping free)");
});

/* --------------------------------------------------------- Suspicion -- */

test("what raises Suspicion (Chapter 5's table, Chapter 3, At the Table, Entity Sheet) is DGF.suspicion", () => {
  const S = DGF.suspicion;
  const KEY = [[/^Trouble$/, "trouble"], [/Monster shows/, "monsterShows"], [/loud way/, "loud"], [/^A Cost/, "cost"], [/^Overdraw$/, "overdraw"], [/Tell/, "tell"], [/furniture/i, "furniture"]];
  const rows = tableAfter(CH.ch5, "What Raises It");
  const seen = rows.map(([label, value]) => {
    const k = KEY.find(([re]) => re.test(label))?.[1];
    assert.ok(k, `Chapter 5's trigger "${label}" is in DGF.suspicion`);
    assert.equal(value, `+${S[k]}`, label);
    return k;
  });
  assert.deepEqual([...seen].sort(), Object.keys(S).sort(), "Chapter 5's table lists every trigger once");
  says(TXT.ch3, `the monster did the work and it showed: Suspicion +${S.monsterShows}`, "Chapter 3, The Monster Shows");
  says(TXT.ch3, `overdraw costs Suspicion +${S.overdraw}`, "Chapter 3, Abilities");
  says(TXT.ref, `Trouble +${S.trouble} · the Monster shows +${S.monsterShows} · the loud way +${S.loud} · a Cost chosen as Suspicion +${S.cost} · overdraw +${S.overdraw} · a Tell +${S.tell}`, "At the Table, Suspicion");
  says(TXT.ref, `furniture, each Turn once taken +${S.furniture}`, "At the Table, Suspicion");
  says(TXT.sheet, `it shows if it rolls higher than your trait die: Suspicion +${S.monsterShows}`, "the Entity Sheet");
  says(TXT.sheet, `overdraw: Suspicion +${S.overdraw}`, "the Entity Sheet");
  assert.equal(suspicionForRoll({ band: "trouble", show: true }), Math.max(S.trouble, S.monsterShows), "one roll, one rise");
});

test("Tells go off on 4–6 on a d6 (Chapters 2 and 5, At the Table) as DGF.tell", () => {
  const { die, goesOffOn } = DGF.tell;
  says(TXT.ch5, `roll a d${die}, and on ${goesOffOn}–${die} a Tell goes off`, "Chapter 5, Tells");
  says(TXT.ref, `(${goesOffOn}–${die} on a d${die}`, "At the Table, Suspicion");
  says(TXT.ch2, `a second d${die} also rolls ${goesOffOn}–${die}`, "Chapter 2, Familiar’s Warning");
  assert.deepEqual([1, 2, 3, 4, 5, 6].map(tellGoesOff), [1, 2, 3, 4, 5, 6].map((f) => f >= goesOffOn));
});

/* ---------------------------------------------------- the furniture -- */

test("the furniture's obstacle is 2 harder, at most 12 (Chapters 4, 8, 9) as DGF.furnitureObstacle", () => {
  const F = DGF.furnitureObstacle;
  says(TXT.ch4, `behind one extra obstacle, ${F.harder} harder (at most ${F.max})`, "Chapter 4, Furniture");
  says(TXT.ch8, `the furniture’s extra one, ${F.harder} harder`, "Chapter 8, Rolling a Town");
  says(TXT.ch8, `(the furniture’s obstacle counts by its roll, before its +${F.harder})`, "Chapter 8, Rolling a Town");
  says(TXT.ch9, `The furniture’s obstacle is already ${F.harder} harder.`, "Chapter 9's opener");
});

test("the furniture table (Chapter 8) is DGF.furniture", () => {
  assert.deepEqual(tableAfter(CH.ch8, "The Furniture"), DGF.furniture.map((f, i) => [`${i + 1}`, f.name, cap(f.size)]));
});

/* --------------------------------------------------------- Chapter 2 -- */

test("the five traits (Chapter 2, Entity Sheet) are DGF.traits, in order", () => {
  assert.deepEqual(tableAfter(CH.ch2, "Five Traits").map((r) => r[0]), DGF.traits.map((t) => TRAIT[t]));
  assert.deepEqual([...chapter(CH.sheet).match(/<table class="sheet-grid">[\s\S]*?<\/thead>/)[0].matchAll(/<th>([^<]*)<\/th>/g)].map((m) => m[1]), DGF.traits.map((t) => TRAIT[t]));
});

test("the Castle Duties table (Chapter 2) is DGF.duties", () => {
  assert.deepEqual(tableAfter(CH.ch2, "Castle Duties"), DGF.duties.map((d, i) => [`${i + 1}`, d.name, d.kind, d.where, cap(d.role)]));
});

/** Each Entity's entry in Chapter 2, as the reader's text of its parts. */
const ENTRIES = [...chapter(CH.ch2).matchAll(/<article class="entry" id="entity-(\d+)">([\s\S]*?)<\/article>/g)].map((m) => ({
  n: Number(m[1]),
  name: plain(m[2].match(/<h4 class="name">([\s\S]*?)<\/h4>/)[1]),
  dice: [...m[2].matchAll(/<p class="dice">([\s\S]*?)<\/p>/g)].map((d) => plain(d[1])),
  paras: [...m[2].matchAll(/<p class="(?:pw-h|pw|pw-meta)">([\s\S]*?)<\/p>/g)].map((d) => plain(d[1])),
  items: [...m[2].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((d) => plain(d[1])),
}));
const diceLine = (dice) => DGF.traits.map((t) => `${TRAIT[t]} d${dice[t]}`).join(" · ");
const effectText = (v) => ({
  switch: `use ${TRAIT[v.trait]} instead of the trait called`,
  hidden: "roll the Monster die without risking Suspicion",
  raise: "raise a trait die one size",
  open: `open an approach with ${TRAIT[v.trait]}`,
  form: "change form",
})[v.effect];

test("Chapter 2 has the eight Entities in DGF.entities order, each with its dice", () => {
  assert.deepEqual(ENTRIES.map((e) => [e.n, e.name]), DGF.entities.map((e, i) => [i + 1, e.name]));
  for (const [i, e] of DGF.entities.entries()) {
    const entry = ENTRIES[i];
    assert.deepEqual(Object.values(e.dice).sort((a, b) => a - b), [...DGF.dieSteps], `${e.key}: one each of the five dice`);
    if (e.forms) {
      assert.deepEqual(entry.dice, [`Jekyll: ${diceLine(e.forms.jekyll)}`, `Hyde: ${diceLine(e.forms.hyde)}`], `${e.key}: both forms`);
      assert.deepEqual(e.dice, e.forms.jekyll, `${e.key} starts as Jekyll`);
      assert.deepEqual(Object.values(e.forms.hyde).sort((a, b) => a - b), [...DGF.dieSteps], `${e.key}: Hyde has one each of the five dice`);
    } else {
      assert.deepEqual(entry.dice, [diceLine(e.dice)], `${e.key}: dice`);
    }
  }
});

test("each Entity's powers (Chapter 2) are generated from DGF.entities, and the chapter is up to date", () => {
  assert.equal(rewriteEntries(readFileSync(new URL("../book/src/chapters/12-ch02.html", import.meta.url), "utf8")), readFileSync(new URL("../book/src/chapters/12-ch02.html", import.meta.url), "utf8"), "run node book/tools/entity-entries.mjs");
  const ctx = { traitName: (t) => TRAIT[t], ease: DGF.openApproachEase };
  for (const [i, e] of DGF.entities.entries()) {
    const { paras, items } = ENTRIES[i];
    const has = (x, what) => assert.ok(paras.includes(x) || items.includes(x), `${e.key}: ${what} ("${x}")`);
    has(`Signature: ${e.signature.name} 1 charge`, "the signature's heading and cost");
    has(`${powerRule(e.signature, ctx)}${e.signature.flavour ? ` ${e.signature.flavour}` : ""}`, "the signature's rule");
    has(`Gift: ${e.gift.name} pick one · 1 charge a use`, "the Gift's heading");
    for (const v of e.gift.versions) has(`${v.name}${v.default ? " (default)" : ""}: ${powerRule(v, ctx)} ${v.text}`, `Gift ${v.name}`);
    has("Perk pick one · always on", "the Perk heading");
    for (const k of e.perks) { const { rule, flavour } = perkParts(k); has(`${k.name}${k.default ? " (default)" : ""}: ${rule}${flavour ? ` ${flavour}` : ""}`, `Perk ${k.name}`); }
    const duty = DGF.duties.find((d) => d.key === e.duty);
    has(`Castle Duty (default): ${duty.name}, who shops for ${duty.kind}.`, "the default Duty");
    has(`Weakness: ${e.weakness.name}. ${weaknessTiming[e.weakness.timing]} ${e.weakness.text}`, "the Weakness");
    has(`Tell: ${e.tell.name}. ${e.tell.text}`, "the Tell");
    assert.equal(e.gift.versions.filter((v) => v.default).length, 1, `${e.key}: one default Gift`);
    assert.equal(e.perks.filter((v) => v.default).length, 1, `${e.key}: one default Perk`);
  }
  // Every standard power's rule says what its effect does, in the words Chapter 3 uses.
  assert.match(powerRule({ effect: "raise" }, ctx), /one size bigger/);
  assert.match(powerRule({ effect: "switch", trait: "brawn" }, ctx), /^Roll Brawn instead of the trait the obstacle calls for/);
  assert.match(powerRule({ effect: "hidden" }, ctx), /without risking Suspicion/);
  assert.match(powerRule({ effect: "open", trait: "sly" }, ctx), new RegExp(`roll Sly at ${DGF.openApproachEase} lower Difficulty`));
});

test("each signature ability's data says its standard effect (what the Foundry sheet shows)", () => {
  for (const e of DGF.entities) assert.ok(e.signature.text.startsWith(effectText(e.signature)), `${e.key}: the signature's text starts with its effect (${e.signature.effect})`);
});

test("the Perks' numbers (Chapter 2) are DGF.perkRules", () => {
  const perk = (key) => {
    const e = DGF.entities.find((x) => x.perks.some((k) => k.key === key));
    const k = e.perks.find((x) => x.key === key);
    const line = ENTRIES[DGF.entities.indexOf(e)].items.find((s) => s.startsWith(`${k.name}:`) || s.startsWith(`${k.name} (default):`));
    assert.ok(line, `${key} is in the book`);
    // The entry capitalises the rule after the name; the checks below quote it mid-sentence. Offer both spellings
    // (a lower-cased "hyde" alone would miss "Hyde takes over").
    const at = line.indexOf(": ") + 2;
    return `${line} | ${line.slice(0, at)}${lowFirst(line.slice(at))}`;
  };
  const R = DGF.perkRules;
  says(perk("hypnoticEyes"), `on ${TRAIT[R.hypnoticEyes.trait]} rolls, the Monster shows only if it beats your trait die by ${R.hypnoticEyes.showMargin} or more`, "Hypnotic Eyes");
  says(perk("steadyNerves"), `Hyde takes over only if the Monster beats your trait die by ${R.steadyNerves.formMargin} or more`, "Steady Nerves");
  says(perk("oldMoney"), `a Cost on a ${TRAIT[R.oldMoney.trait]} roll is never Suspicion +${DGF.suspicion.cost}`, "Old Money");
  says(perk("wiseWoman"), `a Cost on your ${TRAIT[R.wiseWoman.trait]} roll is never “lose a Turn”`, "Wise Woman");
  says(perk("rattle"), `Suspicion +${R.rattle.monsterShows}, not +${DGF.suspicion.monsterShows}`, "Rattle");
  says(perk("lightStep"), "the loud way costs you no Suspicion", "Light Step");
  assert.equal(R.lightStep.loud, 0);
  says(perk("shortcut"), `the way out is ${R.shortcut.exitEase} easier when you roll it`, "Shortcut");
  says(perk("fetch"), `The way out is ${R.fetch.partyExitEase} easier, whoever rolls it, while you’re there, and a final flight you’re in starts at Lead ${R.fetch.finalLead}`, "Fetch");
  says(perk("nightRunner"), `when you flee alone, your local chase starts at Lead ${R.nightRunner.localLead}`, "Night Runner");
  says(perk("fearTheCurse"), `when you flee alone, the mob in your local chase is ${R.fearTheCurse.localMobEase} easier`, "Fear the Curse");
  says(perk("wallCrawler"), `in a chase you can always roll ${TRAIT[R.wallCrawler.chaseTrait]}`, "Wall-Crawler");
  says(perk("flyByNight"), `in a chase you can always roll ${TRAIT[R.flyByNight.chaseTrait]}`, "Fly by Night");
  says(perk("familiarsWarning"), `a second d${DGF.tell.die} also rolls ${DGF.tell.goesOffOn}–${DGF.tell.die}`, "Familiar’s Warning");
});

/* --------------------------------------------------------- Chapter 7 -- */

test("the year's results and the epilogue (Chapter 7) are DGF.results and DGF.epilogue", () => {
  const NAME = { grand: "Grand Year", win: "Win", partial: "Partial", bust: "Bust", forked: "Forked" };
  const order = [...[...DGF.results].reverse(), "forked"];
  const html = chapter(CH.ch7);
  const tables = html.match(/<table[\s\S]*?<\/table>/g).map(rowsOf);
  assert.deepEqual(tables[0].map((r) => r[0]), order.map((k) => NAME[k]), "the results table, best to worst, then Forked");
  assert.deepEqual(tables[1], order.map((k) => [NAME[k], DGF.epilogue.year[k]]), "the year's lines");
  assert.deepEqual(tables[2], DGF.duties.map((d) => [cap(d.kind), DGF.epilogue.missing[d.key]]), "what the castle went without, by kind in Castle Duty order");
});

/* --------------------------------------------------------- Chapter 8 -- */

test("Lantern Night and its customs (Chapters 4 and 8) are DGF.festival", () => {
  says(TXT.ch4, `the town’s yearly festival, ${DGF.festival.name}`, "Chapter 4's opener");
  assert.deepEqual(tableAfter(CH.ch8, DGF.festival.name), DGF.festival.customs.map((c, i) => [`${i + 1}`, c.text]));
});

test("rolling a town (Chapter 8's d20/d10 table and the ceiling) is DGF.townDice, and its shares are the label mix", () => {
  const T = DGF.townDice;
  const COUNT = { 1: "one", 2: "two", 3: "three" };
  const rows = tableAfter(CH.ch8, "Rolling a Town");
  assert.deepEqual(rows.map((r) => r[0]), ["Obstacles at a location (d20)", "Difficulty (d20)", "Watched (d10)"]);
  assert.deepEqual(rows[0].slice(1), LABELS.map((k) => T.obstacles[k].map(([lo, hi, n]) => `${range(lo, hi)}: ${COUNT[n]}`).join(" · ")), "obstacles per location");
  assert.deepEqual(rows[1].slice(1), LABELS.map((k) => T.difficulty[k].map(([lo, hi, d]) => `${range(lo, hi)}: ${d}`).join(" · ")), "Difficulty");
  assert.deepEqual(rows[2].slice(1), LABELS.map((k) => `1–${T.watchedOn[k]}`), "watched");
  assert.equal(T.twelves.easy, T.twelves.standard);
  says(TXT.ch8, `at most ${WORD[T.twelves.easy]} Difficulty 12 in an Easy or Standard town, ${WORD[T.twelves.hard]} in a Hard town`, "Chapter 8, Rolling a Town");
  for (const k of LABELS) {
    const share = {};
    for (const [lo, hi, d] of T.difficulty[k]) share[d] = (hi - lo + 1) / 20;
    assert.equal(mixRow(share), mixRow(L[k].mix), `${k}: the d20 gives the Difficulty table's shares`);
    for (const bands of [T.obstacles[k], T.difficulty[k]]) {
      assert.equal(bands[0][0], 1);
      assert.equal(bands.at(-1)[1], 20);
      bands.slice(1).forEach(([lo], j) => assert.equal(lo, bands[j][1] + 1, `${k}: the bands cover 1–20 without gaps`));
    }
  }
});

test("the obstacle table (Chapter 8) is DGF.obstacleTable", () => {
  assert.deepEqual(tableAfter(CH.ch8, "The Obstacle Table"), DGF.obstacleTable.map((o, i) => [
    `${i + 1}`, `${o.name}${o.group ? " (group)" : ""}`, way(o.quiet, o.quietText), o.loud ? way(o.loud, o.loudText) : "—",
  ]));
});

test("the shopping table (Chapter 8) is DGF.shoppingTable, its kinds and places DGF.duties", () => {
  assert.deepEqual(DGF.shoppingTable.map((r) => r.duty), DGF.duties.map((d) => d.key), "kinds in Castle Duty order");
  assert.deepEqual(tableAfter(CH.ch8, "The Shopping List"), DGF.shoppingTable.map((r, i) => {
    const d = DGF.duties.find((x) => x.key === r.duty);
    return [`${i + 1}`, `${cap(d.kind)} ${d.where}`, r.items.map((it, j) => `${j + 1} ${it}`).join(" · ")];
  }));
});

test("every kind has three places, and Chapter 8 says how to place a list (V15)", () => {
  for (const d of DGF.duties) assert.equal(d.where.split(", ").length, 3, `${d.name}: three places, so a d3 always lands on one`);
  says(TXT.ch8, "a d3 or pick, one item per place; if a kind has more items than places, two may share a place", "Chapter 8, Rolling a Town");
});

test("the villagers (Chapter 8) are DGF.villagers", () => {
  assert.deepEqual(tableAfter(CH.ch8, "The Villagers"), DGF.villagers.who.map((w, i) => [`${i + 1}`, w, DGF.villagers.doing[i]]));
});

/* --------------------------------------------------------- Chapter 9 -- */

const TOWNS = JSON.parse(read("book/src/towns.json")).towns;
const itemOf = (l) => DGF.shoppingTable[l.item[0] - 1].items[l.item[1] - 1];
const dutyOf = (l) => DGF.duties.find((d) => d.key === DGF.shoppingTable[l.item[0] - 1].duty);
const obstacleOf = (o) => DGF.obstacleTable.find((x) => x.key === o.obstacle);

test("Chapter 9's towns are book/src/towns.json, built from the tables, with their label's numbers", () => {
  const html = chapter(CH.ch9);
  assert.deepEqual(TOWNS.map((t) => t.label), LABELS, "one town per difficulty, in order");
  for (const t of TOWNS) {
    const block = html.match(new RegExp(`<div class="town[^"]*" id="town-${t.key}">([\\s\\S]*?)<!-- /town:${t.key} -->`));
    assert.ok(block, `${t.key}: a town block`);
    const b = block[1];
    const text = plain(b);
    const Lb = L[t.label];
    const label = LABEL[t.label];
    says(text, `${label} ${t.name} ${t.description}`, t.key);
    says(text, `Lantern Night: ${DGF.festival.customs.find((c) => c.key === t.custom).text}`, t.key);
    says(text, `The shopping list (${Lb.items} items):`, t.key);
    assert.equal(t.locations.length, Lb.items, `${t.key}: a ${t.label} list has ${Lb.items} items`);
    assert.ok(Lb.essentials.includes(t.locations.filter((l) => l.essential).length), `${t.key}: essentials`);
    const list = [...b.match(/<ol class="town-list">([\s\S]*?)<\/ol>/)[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => plain(m[1]));
    assert.deepEqual(list, t.locations.map((l) => `${cap(itemOf(l))}${l.essential ? " (essential)" : ""}`), `${t.key}: the list`);
    const at = t.locations.findIndex((l) => l.furniture);
    const piece = DGF.furniture.find((f) => f.key === t.locations[at].furniture.piece);
    says(text, `The furniture: ${low(piece.name)} (${cap(piece.size)}), at ${t.locations[at].place} (${at + 1}).`, t.key);
    says(text, `Villagers: ${t.villagers.map((v) => `${low(DGF.villagers.who[v.who - 1])} (${low(DGF.villagers.doing[v.doing - 1])})`).join("; ")}.`, t.key);
    says(text, `${label}: Suspicion Limit ${Lb.limit} · the way out ${Lb.exit} · the lock-up ${Lb.lockup} · the final flight: mob ${Lb.finalMob}, escape at Lead ${Lb.finalEscape}.`, t.key);
    const row = (step, o, harder = 0) => {
      const e = obstacleOf(o);
      return [`${step} ${e.name}${e.group ? " (group)" : ""}${o.watched ? " watched" : ""}`, way(e.quiet, e.quietText), e.loud ? way(e.loud, e.loudText) : "—", `${Math.min(DGF.furnitureObstacle.max, o.difficulty + harder)}`];
    };
    const want = t.locations.flatMap((l, n) => [
      [`${n + 1} ${cap(l.place)}: ${itemOf(l)} (${dutyOf(l).kind})${l.essential ? " · essential" : ""}`],
      row("Way in", l.waysIn[0]), row("or", l.waysIn[1]),
      ...l.then.map((o) => row("Then", o)),
      ...(l.furniture ? [row("Furniture", l.furniture.obstacle, DGF.furnitureObstacle.harder)] : []),
    ]);
    assert.deepEqual(rowsOf(b.match(/<table class="tbl town-key">[\s\S]*?<\/table>/)[0]), want, `${t.key}: the location key`);
    // the town keeps Chapter 8's rules for building one
    const rollable = new Set(DGF.townDice.difficulty[t.label].map(([, , d]) => d));
    const all = t.locations.flatMap((l) => [...l.waysIn, ...l.then, ...(l.furniture ? [l.furniture.obstacle] : [])]);
    assert.ok(all.every((o) => rollable.has(o.difficulty)), `${t.key}: every Difficulty can be rolled on the ${t.label} d20`);
    assert.ok(all.filter((o) => o.difficulty === 12).length <= DGF.townDice.twelves[t.label], `${t.key}: the ceiling on Difficulty 12 (the furniture's counted by its roll)`);
    for (const l of t.locations) {
      assert.ok(dutyOf(l).where.split(", ").includes(l.place), `${t.key}: ${l.place} is one of ${dutyOf(l).kind}'s places`);
      assert.notEqual(obstacleOf(l.waysIn[0]).quiet, obstacleOf(l.waysIn[1]).quiet, `${t.key}: ${l.place}'s two ways in have different quiet traits`);
      const count = 1 + l.then.length;
      assert.ok(count >= 1 && count <= 3, `${t.key}: ${l.place} has 1–3 obstacles`);
    }
    const map = read(`book/art/map-${t.key}.svg`).match(/<title[^>]*>([^<]*)<\/title>/)[1];
    // a location is watched if any of its obstacles is, either way in (not the furniture's): Chapter 4
    const watched = t.locations.map((l, n) => [n + 1, l]).filter(([, l]) => [...l.waysIn, ...l.then].some((o) => o.watched));
    const eyes = watched.length === t.locations.length ? "Every location is watched" : watched.length ? `Watched: ${watched.map(([n, l]) => `${n} ${l.place}`).join(", ")}` : "No location is watched";
    assert.equal(map, `Map of ${t.name}: ${t.locations.map((l, n) => `${n + 1} ${l.place}`).join(", ")}, the lock-up and the way out. ${eyes}; the star marks the furniture, at ${t.locations[at].place}.`, `${t.key}: the map's title (its alt text) names its locations, the eyes and the star`);
  }
});

test("Chapter 9's example of play: every total, Lead, mob and Suspicion follows from its dice", () => {
  const html = chapter(CH.ch9);
  const ex = section(CH.ch9, "An Example of Play");
  const text = plain(ex);
  // the dice, in the order the comment under the example records them (rolled for real)
  const comment = ex.match(/<!-- Every die above was rolled for real[\s\S]*?-->/);
  assert.ok(comment, "the example records its dice");
  says(comment[0].replace(/\s+/g, " "), "Tell checks d6 2, 1; Werewolf d12 10 + Mask 4; Witch d10 1 + Monster 4; chase ground d6 6, Witch d12 12 + Monster 3; ground 6, d12 2 + Monster 9; ground 5, d10 5 + Monster 7; Dracula d8 7 + Mask 2; Creature d10 5 + Mask 2; Witch d10 7 + Monster 4; Tell check d6 4; whose (1–3 Dracula, 4–6 the Creature) d6 6", "the example's dice comment");
  assert.ok(html.indexOf("<h3>An Example of Play</h3>") > html.indexOf('id="town-thistlewick"'), "the example follows Thistlewick");

  const town = TOWNS.find((t) => t.key === "thistlewick");
  const Lb = L[town.label];
  const loc = (key) => town.locations.find((l) => l.key === key);
  const ob = (l, key) => [...l.waysIn, ...l.then].find((o) => o.obstacle === key);
  const E = Object.fromEntries(DGF.entities.map((e) => [e.key, e]));
  const raise = (die, ...steps) => steps.reduce((d, s) => (s > 0 ? stepUp(d).die : stepDown(d).die), die);
  const dutyHere = (e, l) => e.duty === dutyOf(l).key;
  let suspicion = 0;

  says(text, `Suspicion starts at 0; the Limit is ${Lb.limit}.`, "the example");
  says(text, `with their default picks (${["dracula", "witch", "creature", "werewolf"].map((k) => DGF.duties.find((d) => d.key === E[k].duty).name).join(", ").replace(/, (\w+)$/, " and $1")})`, "the example");
  assert.ok(dutyHere(E.witch, loc("baker")) && dutyHere(E.dracula, loc("china")), "the Witch's Duty is the baker's kind, Dracula's the china shop's");
  assert.ok(loc("baker").waysIn.concat(loc("baker").then).some((o) => o.watched) && loc("china").waysIn.some((o) => o.watched), "both are watched");
  assert.ok(!tellGoesOff(2) && !tellGoesOff(1), "Tell checks of 2 and 1: no Tells");

  // Turn 2, the baker: the Werewolf's window, then the Witch at the shopkeeper
  const window = ob(loc("baker"), "window");
  let r = { t: 10, s: 4, d: window.difficulty };
  assert.equal(E.werewolf.dice.nimble, 12);
  assert.equal(band(r.t + r.s, r.d), "success");
  says(text, `Nimble d12 with the Mask: ${r.t} + ${r.s} = ${r.t + r.s} against ${r.d}, a Success`, "Turn 2");
  const shop = ob(loc("baker"), "shopkeeper");
  const witchCharm = raise(E.witch.dice.charm, +1);
  says(text, `Her Charm d${E.witch.dice.charm} is a d${witchCharm} here`, "Turn 2");
  r = { t: 1, s: 4, d: shop.difficulty };
  assert.ok(r.t <= witchCharm && shop.watched);
  assert.equal(band(r.t + r.s, r.d), "trouble");
  assert.equal(monsterShows(r.t, r.s), true);
  suspicion += suspicionForRoll({ band: "trouble", show: true });
  says(text, `${r.t} + ${r.s} = ${r.t + r.s}. That is ${r.d - r.t - r.s} short, Trouble`, "Turn 2");
  says(text, `Suspicion goes up by the bigger trigger, to ${suspicion}`, "Turn 2");

  // the Witch's local chase
  let lead = DGF.lead.localStart;
  let mob = localMobDifficulty(suspicion);
  says(text, `Her Lead starts at ${lead}, and the mob is ${DGF.localMob.base} + half the Suspicion: ${mob}`, "the chase");
  const ground = (f) => DGF.chaseTable[f - 1];
  const rounds = [
    { f: 6, trait: "wits", t: 12, s: 3, said: (x) => `Round 1, a dead end: Wits d12 and the Monster, ${x.t} + ${x.s} = ${x.t + x.s}, Lead ${x.lead}` },
    { f: 6, trait: "wits", t: 2, s: 9, said: (x) => `Round 2, another dead end: ${x.t} + ${x.s} = ${x.t + x.s}, Lead ${x.lead}, but the Monster showed: Suspicion ${x.susp}, and the mob is now ${x.mob}` },
    { f: 5, trait: "sly", t: 5, s: 7, weakness: true, hedge: true, said: (x) => `rolls ${x.t} + ${x.s} = ${x.t + x.s}: Lead ${x.lead}, and she escapes. The Monster showed again: Suspicion ${x.susp}` },
  ];
  for (const [i, x] of rounds.entries()) {
    const g = ground(x.f);
    assert.ok(g.traits.includes(x.trait), `round ${i + 1}: ${x.trait} works on ${g.name}`);
    const soon = E.witch.weakness.timing === "soon" && i + 1 >= DGF.weaknessSoonRound;
    assert.equal(soon, !!x.weakness, `round ${i + 1}: the Witch's Weakness (${E.witch.weakness.timing})`);
    const die = raise(E.witch.dice[x.trait], ...(x.weakness ? [-1] : []), ...(x.hedge ? [+1] : []));
    if (x.weakness) says(text, `her Weakness makes her Sly d${E.witch.dice.sly} a d${raise(E.witch.dice.sly, -1)}`, `round ${i + 1}`);
    assert.ok(x.t <= die && x.s <= DGF.second.monster, `round ${i + 1}: faces fit the dice`);
    const b = band(x.t + x.s, mob);
    lead += leadMove({ band: b, critical: isCritical(x.t, x.s, mob) });
    if (monsterShows(x.t, x.s)) suspicion += suspicionForRoll({ band: b, show: true });
    mob = localMobDifficulty(suspicion);
    says(text, x.said({ ...x, lead, susp: suspicion, mob }), `round ${i + 1}`);
  }
  assert.equal(lead, DGF.lead.localEscape, "she escapes at the local chase's escape number");
  assert.ok(ground(5).name.toLowerCase().includes("festival parade"));

  // the china shop: Dracula's front door, the creature's back room (a Cost chosen as Suspicion)
  const door = ob(loc("china"), "frontDoor");
  const dracSly = raise(E.dracula.dice.sly, +1);
  r = { t: 7, s: 2, d: door.difficulty };
  says(text, `Sly d${E.dracula.dice.sly}, a d${dracSly} with his Butler Duty, ${r.t} + ${r.s} = ${r.t + r.s} against ${r.d}`, "Turn 2, the china shop");
  assert.equal(band(r.t + r.s, r.d), "success");
  const back = ob(loc("china"), "backRoom");
  r = { t: 5, s: 2, d: back.difficulty };
  assert.ok(!dutyHere(E.creature, loc("china")));
  says(text, `Wits d${E.creature.dice.wits} and the Mask: ${r.t} + ${r.s} = ${r.t + r.s}, one short, a Cost`, "Turn 2, the china shop");
  assert.equal(r.d - r.t - r.s, 1);
  assert.equal(band(r.t + r.s, r.d), "cost");
  suspicion += suspicionForRoll({ band: "cost", costSuspicion: true });
  says(text, `a teacup smashes. Suspicion ${suspicion}.`, "Turn 2, the china shop");

  // Turn 3: the Witch again, with Good Dog; the ironmonger's Tell check
  assert.equal(E.werewolf.signature.effect, "hidden");
  r = { t: 7, s: 4, d: shop.difficulty };
  assert.ok(r.t <= witchCharm);
  assert.equal(band(r.t + r.s, r.d), "success");
  says(text, `${r.t} + ${r.s} = ${r.t + r.s}, a Success`, "Turn 3");
  assert.ok([...loc("ironmonger").waysIn, ...loc("ironmonger").then].some((o) => o.watched), "the ironmonger is watched");
  assert.ok(tellGoesOff(4), "a Tell check of 4 goes off");
  suspicion += DGF.suspicion.tell;
  says(text, `the Tell check is a 4, and a second roll picks the Creature, who stands a head above the crowd. Suspicion ${suspicion}.`, "Turn 3");
  says(text, `Three Turns gone, ${WORD[DGF.turns - 3]} to go.`, "Turn 3");
  says(text, `Suspicion is ${suspicion} of ${Lb.limit}`, "Turn 3");
  assert.ok(suspicion < Lb.limit, "the hunt hasn't started");
});

/* ----------------------------------------------------- docs/CORE-RULES -- */

test("docs/CORE-RULES.md's Starting numbers table is DGF.labels", () => {
  const md = read("docs/CORE-RULES.md");
  const row = (label) => {
    const m = md.match(new RegExp(`^\\| ${label.replace(/[()]/g, "\\$&")} \\|(.*)\\|$`, "m"));
    assert.ok(m, `CORE-RULES has a "${label}" row`);
    return m[1].split("|").map((s) => s.trim());
  };
  assert.deepEqual(row("List size (essentials)"), LABELS.map((k) => `${L[k].items} (${essentials(L[k].essentials)})`));
  assert.deepEqual(row("Suspicion Limit"), LABELS.map((k) => `${L[k].limit}`));
  assert.deepEqual(row("Final flight: escape at Lead"), LABELS.map((k) => `${L[k].finalEscape}`));
  assert.deepEqual(row("Exit Difficulty"), LABELS.map((k) => `${L[k].exit}`));
  assert.deepEqual(row("Final-flight mob Difficulty"), LABELS.map((k) => `${L[k].finalMob}`));
  assert.deepEqual(row("Lock-up Difficulty"), LABELS.map((k) => `${L[k].lockup}`));
});

test("docs/CORE-RULES.md's chase summary gives the escape numbers by label (BA-21)", () => {
  says(read("docs/CORE-RULES.md"), `Reach the escape number [S9, B3: ${DGF.lead.localEscape} in a local chase; in the final flight ${L.easy.finalEscape} on Easy and Standard, ${L.hard.finalEscape} on Hard]`, "CORE-RULES, Chases");
  assert.equal(L.easy.finalEscape, L.standard.finalEscape);
});
