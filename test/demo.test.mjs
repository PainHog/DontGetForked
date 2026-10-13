/**
 * The Halloween one-shot, Lantern Night in Hallowby: its town keeps the book's rules; the script's numbers, places,
 * Tells, Weaknesses, chase ground and epilogue say what the game data says; its generated pages are up to date; and the
 * Demo compendiums carry the same script, Entities with pictures that ship with the system, scenes whose pins open
 * the script's pages, and a macro that really starts the raid (on the fake Foundry). Worked out from the data, not
 * through the generators, so a slip in either shows.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { ROOT, PACKS, readSource, toCliDoc } from "../tools/pack-config.mjs";
import { DGF } from "../module/config.mjs";
import { entitySystem } from "../module/logic/entity.mjs";
import { demoTown, demoParts } from "../book/tools/demo-pages.mjs";
import { townMap } from "../book/tools/town-maps.mjs";
import { installFoundry, asUser, settle, log } from "../tools/fake-foundry.mjs";

const ENT = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&nbsp;": " " };
const plain = (html) => String(html).replace(/<\/?(?:strong|em|b|i)\b[^>]*>/g, "").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/g, (m) => ENT[m] ?? m).replace(/\s+/g, " ").trim();
const CH = join(ROOT, "book", "demo", "chapters");
const chapter = (f) => readFileSync(join(CH, f), "utf8");
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const T = demoTown();
const L = DGF.labels[T.label];
const def = (name) => PACKS.find((d) => d.out === name);

/* ---------------------------------------------------------- the town -- */

test("Hallowby is an Easy town built by the book's rules: four items, one essential, the furniture at the tailor", () => {
  assert.equal(T.label, "easy");
  assert.equal(T.locations.length, L.items);
  assert.deepEqual(T.locations.filter((l) => l.essential).map((l) => l.key), ["tavern"]);
  assert.equal(T.locations.find((l) => l.furniture).key, "tailor");
  assert.equal(T.stats.twelves, 0);
});

test("the one-shot's generated pages and map are up to date (run node book/tools/demo-pages.mjs if not)", () => {
  for (const [file, parts] of Object.entries(demoParts(T))) {
    const html = chapter(file);
    for (const [name, body] of Object.entries(parts)) assert.ok(html.includes(`-->\n${body}\n<!-- /demo:${name} -->`), `${file}: ${name}`);
  }
  assert.equal(readFileSync(join(ROOT, "book", "art", "map-hallowby.svg"), "utf8"), townMap(T));
});

/* -------------------------------------------------------- the script -- */

test("the script's numbers are Easy's: the list, the Limit, the way out, the lock-up, the chases, Turns and charges", () => {
  const p = plain(chapter("10-before.html"));
  for (const s of [
    `${L.items} items. One is essential`, `Turns: ${DGF.turns}, then dawn`, `Charges: ${DGF.charges} for each Entity`,
    `The Limit is ${L.limit}`, `The way out: Difficulty ${L.exit}`, `The lock-up: Difficulty ${L.lockup}`,
    `the Lead starts at ${DGF.lead.localStart}, escape at ${DGF.lead.localEscape}, against a mob of ${DGF.localMob.base} plus half the Suspicion (rounded down, at most ${DGF.localMob.max})`,
    `the Lead starts at ${DGF.lead.finalStart}, escape at ${L.finalEscape}, against a mob of ${L.finalMob}`,
  ]) assert.ok(p.includes(s), s);
  const flight = plain(chapter("45-flight.html"));
  assert.ok(flight.includes(`Your Lead starts at ${DGF.lead.finalStart}. Get it to ${L.finalEscape} and you’re home`));
  assert.ok(flight.includes(`The mob’s Difficulty is ${L.finalMob}, however many run`));
  const happens = plain(chapter("40-happens.html"));
  assert.ok(happens.includes(`Your Lead starts at ${DGF.lead.localStart}. Get it to ${DGF.lead.localEscape} and you’ve lost them`));
  // the local mob by Suspicion, as the tracker and the chase box print it
  const mob = (s) => Math.min(DGF.localMob.max, DGF.localMob.base + Math.floor(s * DGF.localMob.perSuspicion));
  assert.ok(happens.includes(`Suspicion 0–1: ${mob(0)} · 2–3: ${mob(2)} · 4–5: ${mob(4)} · 6–7: ${mob(6)} · 8–10: ${mob(8)}`));
});

/** Each place's obstacle boxes in order: quiet trait, loud trait, Difficulty, watched. */
function boxes(placeHtml) {
  return [...placeHtml.matchAll(/<p class="roll">([\s\S]*?)<\/p>/g)].map((m) => {
    const s = plain(m[1]);
    return { quiet: s.match(/^(\w+)/)[1].toLowerCase(), loud: (s.match(/Or (\w+), the loud way/) ?? [])[1]?.toLowerCase() ?? null, d: +s.match(/Difficulty (\d+)/)[1], watched: /\bWatched\b/.test(s) };
  });
}

test("every obstacle the script reads out is the town's: its traits, loud way, Difficulty and whether it's watched", () => {
  const html = chapter("35-places.html");
  const parts = html.split(/(?=<h3>)/);
  const part = (re) => parts.filter((p) => re.test(p.slice(0, 60))).join("");
  const want = (o) => ({ quiet: o.quiet, loud: o.loud, d: o.difficulty, watched: o.watched });
  for (const l of T.locations) {
    const sec = l.key === "tailor" ? part(/^<h3>4 · |^<h3>The Mirror/) : part(new RegExp(`^<h3>${l.n} · `));
    const obs = [...l.waysIn, ...l.then, ...(l.furniture ? [l.furniture.obstacle] : [])];
    assert.deepEqual(boxes(sec), obs.map(want), l.key);
  }
  assert.deepEqual(boxes(part(/^<h3>The Way Out/)), [{ quiet: "one", loud: "brawn", d: L.exit, watched: true }]);
  assert.ok(plain(part(/^<h3>The Way Out/)).includes("Sly to slip across with the crowd, or Nimble"));
  const h = chapter("40-happens.html");
  const rescue = plain(h.slice(h.indexOf('id="if-rescue"'), h.indexOf('id="if-drop"')));
  assert.equal([...rescue.matchAll(/Difficulty (\d+)/g)].map((m) => +m[1]).join(), `${L.lockup},${L.lockup}`);
});

test("the Tells and Weaknesses are the Entities', each Weakness from the round its timing says", () => {
  const html = chapter("40-happens.html");
  const tells = rowsAfter(html, 'id="if-tell"');
  const weak = rowsAfter(html, 'id="if-weakness"');
  const short = (e) => e.name.replace("Frankenstein’s ", "The ");
  assert.deepEqual(tells.map((r) => r[0]), DGF.entities.map(short));
  assert.deepEqual(weak.map((r) => r[0]), DGF.entities.map((e) => `${short(e)}: ${e.weakness.name}`));
  assert.deepEqual(weak.map((r) => r[1]), DGF.entities.map((e) => (e.weakness.timing === "always" ? "Round 1" : `Round ${DGF.weaknessSoonRound}`)));
});

test("the chase ground and the epilogue are the book's, word for word", () => {
  const ground = rowsAfter(chapter("40-happens.html"), 'id="if-ground"');
  assert.deepEqual(ground.map((r) => r[0]), DGF.chaseTable.map((_, i) => String(i + 1)));
  assert.deepEqual(ground.map((r) => `${r[1]} ${r[2]}`), DGF.chaseTable.map((c) => `${c.name} ${c.text} ${c.traits.map(cap).join(", ")}.`));
  const year = chapter("50-year.html");
  for (const line of Object.values(DGF.epilogue.year)) assert.ok(plain(year).includes(line), line);
  for (const l of T.locations) assert.ok(plain(year).includes(DGF.epilogue.missing[l.kind]), l.kind);
});

/** Rows (cells as plain text) of the first table after a marker. */
function rowsAfter(html, marker) {
  const at = html.indexOf(marker);
  assert.ok(at >= 0, marker);
  const tbl = html.slice(at).match(/<table[\s\S]*?<\/table>/)[0];
  return [...tbl.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((m) => [...m[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((c) => plain(c[1])));
}

/* ---------------------------------------------------------- Foundry -- */

const ships = (path) => path.startsWith(`systems/${DGF.id}/`) && existsSync(join(ROOT, path.slice(`systems/${DGF.id}/`.length)));

test("the Demo Entities are the eight as New Entity makes them, each with a token and picture that ship", () => {
  const docs = readSource("demo-entities");
  assert.deepEqual(docs.map((d) => d.key), DGF.entities.map((e) => e.key));
  for (const d of docs) {
    assert.deepEqual(d.system, entitySystem(d.key), d.key);
    assert.ok(ships(d.img), d.img);
    const tok = toCliDoc(def("demo-entities"), d, 0).prototypeToken;
    assert.ok(ships(tok.texture.src), tok.texture.src);
    assert.equal(tok.actorLink, true);
    assert.equal(tok.disposition, 1);
  }
});

test("the Demo scenes' pictures ship, and every pin on Hallowby opens its place's page in the script", () => {
  const scenes = readSource("demo-scenes");
  const journal = readSource("demo-journal").map((j, i) => toCliDoc(def("demo-journal"), j, i));
  const script = journal.find((j) => j.name.startsWith("Lantern Night"));
  for (const s of scenes) {
    assert.ok(ships(s.background.src), s.background.src);
    if (s.thumb) assert.ok(ships(s.thumb), s.thumb);
    for (const n of s.notes) {
      assert.equal(n.entryId, script._id);
      assert.ok(script.pages.some((p) => p._id === n.pageId), `${s.key}: pin ${n.key}`);
      assert.ok(n.x >= 0 && n.x <= s.width && n.y >= 0 && n.y <= s.height, `${s.key}: pin ${n.key} on the map`);
    }
  }
  const hallowby = scenes.find((s) => s.key === "hallowby");
  const pageName = (id) => script.pages.find((p) => p._id === id).name;
  assert.deepEqual(hallowby.notes.map((n) => pageName(n.pageId)), ["1 · The Tavern Cellar", "2 · The Florist", "3 · The Carpenter", "4 · The Tailor", "The Lock-up", "The Way Out"]);
});

test("the Demo script says everything the PDF reads aloud, and every rule line, in the same words", () => {
  const script = readSource("demo-journal").find((j) => j.key === "lantern-night");
  const all = plain(script.pages.map((p) => p.text.content).join(" "));
  const files = readdirSync(CH).filter((f) => /^(10|20|30|35|40|45|50)-/.test(f));
  for (const f of files) {
    const html = chapter(f).replace(/<header[\s\S]*?<\/header>/, "").replace(/<!--[\s\S]*?-->/g, "");
    for (const m of html.matchAll(/<(p|li|td)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
      const words = plain(m[2]);
      if (words) assert.ok(all.includes(words), `${f}: "${words.slice(0, 60)}…"`);
    }
  }
  for (const p of script.pages) assert.match(p.text.content, /^<div class="dgf-script">/, p.name);
});

test("the Demo macro starts an Easy raid with Hallowby's list on the Raid HUD", async () => {
  const GM = { id: "gmUser0000000000", name: "Storyteller", isGM: true };
  const { game, Hooks } = installFoundry({ users: [GM] });
  await import("../module/dont-get-forked.mjs");
  Hooks.callAll("init");
  Hooks.callAll("ready");
  await settle();
  const [macro] = readSource("demo-macros");
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  await asUser(game.users.get(GM.id), () => new AsyncFunction("game", macro.command)(game));
  await settle();
  const raid = game.dontGetForked.raid.get();
  assert.equal(raid.difficulty, "easy");
  assert.equal(raid.limit, L.limit);
  assert.equal(raid.turn, 1);
  assert.deepEqual(raid.list, T.locations.map((l) => ({ name: l.item, duty: l.kind, essential: !!l.essential })));
  assert.deepEqual(log.errors, []);
});
