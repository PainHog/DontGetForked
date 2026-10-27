/**
 * The three towns of Chapter 9, ready to play in Foundry (tools/gen-town-source.mjs, tools/town-art.mjs,
 * module/logic/start-raid.mjs, module/raid/start-raid.mjs): each town has a scene whose night map ships with the
 * system, at the scene's size and up to date with the town's layout, with a pin on every place that opens that
 * place's page in the town's journal entry; each location's page gives its obstacles exactly as Chapter 9 prints
 * them, the lock-up's page Chapter 6's table and the way out's Chapter 4's rule; each town's macro starts a raid at
 * its level with its list (refused for players; in campaign play it asks for the castle's extra charges, as New raid
 * does). Then, on the fake Foundry with the system's packs, a Storyteller sets up Gallowsmere and starts its raid.
 * Worked out from book/src/towns.json and the chapters directly, not through the generators, so a slip in either shows.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT, PACKS, readSource, toCliDoc, makeId } from "../tools/pack-config.mjs";
import { artProblems } from "../tools/town-art.mjs";
import { jpegSize } from "../tools/demo-art.mjs";
import { DGF } from "../module/config.mjs";
import { loadTowns } from "../book/tools/towns.mjs";
import { demoTown } from "../book/tools/demo-pages.mjs";
import { townRaid, raidStartSteps, listFitsLevel } from "../module/logic/start-raid.mjs";
import { TOWNS as SETUP_TOWNS } from "../module/logic/demo.mjs";
import { installFoundry, asUser, settle, dialogResponders, fakeForm, log } from "../tools/fake-foundry.mjs";

const ENT = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&nbsp;": " " };
/** HTML as the words a reader sees, with spacing evened out (the book and the journal mark text up differently). */
const plain = (html) => String(html).replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/g, (m) => ENT[m] ?? m).replace(/\s+/g, " ").replace(/\( /g, "(").replace(/ \)/g, ")").trim();
const rows = (tableHtml) => [...tableHtml.replace(/<thead>[\s\S]*?<\/thead>/, "").matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)]
  .map((m) => [...m[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((c) => plain(c[1])));
const chapter = (file) => readFileSync(join(ROOT, "book", "src", "chapters", file), "utf8");
const RAW = JSON.parse(readFileSync(join(ROOT, "book", "src", "towns.json"), "utf8")).towns;
const TOWNS = loadTowns();
const def = (name) => PACKS.find((d) => d.out === name);
const ships = (path) => path.startsWith(`systems/${DGF.id}/`) && existsSync(join(ROOT, path.slice(`systems/${DGF.id}/`.length)));
const journal = () => readSource("journal").map((j, i) => toCliDoc(def("journal"), j, i));
const pretty = (s) => s.replace(/^the /, "The ").replace(/(^|\s)(\w)/g, (m, a, b) => a + b.toUpperCase());

/* ------------------------------------------------------------- the pure part -- */

test("starting a ready-made raid: a new raid at the level, then the list; a bad level or list is refused", () => {
  const list = [{ name: "a wheel of strong cheese", duty: "cook", essential: true }, { name: "seed potatoes", duty: "gardener" }];
  assert.deepEqual(raidStartSteps({ town: "Puddlecombe", difficulty: "easy", list }), {
    ok: true, town: "Puddlecombe", difficulty: "easy",
    steps: [
      { op: "raid.reset", data: { difficulty: "easy" } },
      { op: "raid.list", data: { action: "set", list: [list[0], { ...list[1], essential: false }] } },
    ],
  });
  assert.deepEqual(raidStartSteps({ difficulty: "deadly", list }), { ok: false, reason: "badDifficulty" });
  assert.deepEqual(raidStartSteps({ difficulty: "hard", list: [] }), { ok: false, reason: "badList" });
  assert.deepEqual(raidStartSteps({ difficulty: "hard" }), { ok: false, reason: "badList" });
  assert.deepEqual(raidStartSteps({ difficulty: "hard", list: [{ name: " ", duty: "cook" }] }), { ok: false, reason: "badList" });
  assert.deepEqual(raidStartSteps({ difficulty: "hard", list: [{ name: "a pie", duty: "baker" }] }), { ok: false, reason: "badList" });
  assert.deepEqual(raidStartSteps(null), { ok: false, reason: "badDifficulty" });
});

test("each ready-made game's raid is its town's level and list, which keep the book's shape (Chapter 8)", () => {
  for (const t of [...TOWNS, demoTown()]) {
    const spec = townRaid(t);
    assert.equal(spec.town, t.name);
    assert.equal(spec.difficulty, t.label);
    assert.deepEqual(spec.list.map((it) => it.name), t.locations.map((l) => l.item));
    assert.ok(listFitsLevel(spec.difficulty, spec.list), `${t.key}: ${DGF.labels[t.label].items} items, ${DGF.labels[t.label].essentials.join(" or ")} essential`);
  }
  assert.equal(listFitsLevel("easy", []), false);
  assert.equal(listFitsLevel("deadly", []), false);
  // the setup's towns are the book's, in its order
  assert.deepEqual(SETUP_TOWNS.map((t) => [t.key, t.name, t.label]), RAW.map((t) => [t.key, t.name, t.label]));
});

/* ---------------------------------------------------------------- the scenes -- */

test("each town's scene: its night map and thumbnail ship, at the scene's size, rendered from the town's current layout", () => {
  const scenes = readSource("town-scenes");
  assert.deepEqual(scenes.map((s) => s.key), RAW.map((t) => t.key));
  const hallowby = readSource("demo-scenes").find((s) => s.key === "hallowby");
  assert.deepEqual(artProblems(), [], "run node tools/town-art.mjs");
  for (const s of scenes) {
    const t = RAW.find((x) => x.key === s.key);
    assert.equal(s.name, t.name);
    assert.deepEqual(s.flags, { [DGF.id]: { setup: t.key } });
    assert.equal(s.background.src, `systems/${DGF.id}/assets/towns/${t.key}-map.jpg`);
    assert.ok(ships(s.background.src) && ships(s.thumb), s.key);
    const map = jpegSize(readFileSync(join(ROOT, "assets", "towns", `${t.key}-map.jpg`)));
    assert.deepEqual([map.w, map.h], [s.width, s.height], `${s.key}: the picture fills the scene`);
    const thumb = jpegSize(readFileSync(join(ROOT, "assets", "towns", `${t.key}-thumb.jpg`)));
    assert.equal(thumb.w, 400);
    assert.ok(Math.abs(thumb.h / thumb.w - s.height / s.width) < 0.01, `${s.key}: the thumbnail is the map's shape`);
    // the same look and scale as Hallowby's: a token is one grid square on every map
    assert.equal(s.width, hallowby.width);
    assert.deepEqual(s.grid, hallowby.grid);
    for (const k of ["padding", "backgroundColor", "tokenVision", "fog", "environment"]) assert.deepEqual(s[k], hallowby[k], `${s.key}: ${k}`);
    // a picture under 1.5 MB keeps the release small
    assert.ok(readFileSync(join(ROOT, "assets", "towns", `${t.key}-map.jpg`)).length < 1.5e6, `${s.key}: the map is a sensible size`);
  }
});

test("every place on a town's map has a pin, the Storyteller's, opening that place's page in the town's journal entry", () => {
  const entries = journal();
  for (const s of readSource("town-scenes")) {
    const t = TOWNS.find((x) => x.key === s.key);
    const entry = entries.find((j) => j._id === makeId("journal", t.key));
    assert.equal(entry.name, `${t.name} (${t.labelName})`);
    assert.equal(entry.ownership.default, 0, "the entry is the Storyteller's, so players don't see its pins");
    const want = [...t.locations.map((l) => `${l.n} · ${pretty(l.place)}`), "The Lock-up", "The Way Out"];
    assert.deepEqual(s.notes.map((n) => entry.pages.find((p) => p._id === n.pageId)?.name), want, s.key);
    for (const n of s.notes) {
      assert.equal(n.entryId, entry._id);
      assert.equal(n.global, false);
      assert.ok(n.x > s.grid.size && n.x < s.width - s.grid.size && n.y > s.grid.size && n.y < s.height - s.grid.size, `${n.key}: well inside the map`);
    }
    // each place's yard is its own: no two pins within three grid squares of each other
    for (let i = 0; i < s.notes.length; i++) for (let j = i + 1; j < s.notes.length; j++) {
      const a = s.notes[i], b = s.notes[j];
      assert.ok(Math.hypot(a.x - b.x, a.y - b.y) > 3 * s.grid.size, `${a.key} and ${b.key} are apart`);
    }
  }
});

/* ----------------------------------------------------------------- the pages -- */

/** Chapter 9's printed block for a town: its location groups (rows of plain cells) and its furniture line. */
function bookTown(key) {
  const html = chapter("32-ch09.html");
  const block = html.slice(html.indexOf(`<!-- town:${key} `), html.indexOf(`<!-- /town:${key} -->`));
  const groups = [...block.matchAll(/<tbody>([\s\S]*?)<\/tbody>/g)].map((m) => rows(`<table>${m[1]}</table>`));
  const furniture = plain(block.match(/<p><strong>The furniture:<\/strong>[\s\S]*?<\/p>/)[0]);
  return { groups, furniture };
}

test("each location's page gives its obstacles exactly as Chapter 9's town page prints them, and the furniture where it stands", () => {
  const entries = journal();
  for (const t of TOWNS) {
    const entry = entries.find((j) => j._id === makeId("journal", t.key));
    const book = bookTown(t.key);
    assert.equal(book.groups.length, t.locations.length);
    t.locations.forEach((l, i) => {
      const page = entry.pages.find((p) => p.name === `${l.n} · ${pretty(l.place)}`);
      const got = rows(page.text.content.match(/<table>[\s\S]*?<\/table>/)[0]);
      const [head, ...obstacles] = book.groups[i];
      assert.equal(got[0][0], head[0].replace(/^(\d+) /, "$1. "), `${t.key}/${l.key}: its item, kind and essential mark`);
      assert.deepEqual(got.slice(1), obstacles, `${t.key}/${l.key}: its obstacles in order, their ways, Difficulty and marks`);
      const text = plain(page.text.content);
      assert.equal(text.includes(book.furniture), !!l.furniture, `${t.key}/${l.key}: the furniture's line where it stands`);
      const watched = [...l.waysIn, ...l.then].some((o) => o.watched);
      assert.equal(text.includes("the Storyteller makes a Tell check"), watched, `${t.key}/${l.key}: a watched location's Tell check`);
    });
  }
});

test("the lock-up's page has Chapter 6's table, the way out's page Chapter 4's rule, each at the town's Difficulty", () => {
  const entries = journal();
  const ch6 = chapter("16-ch06.html").match(/<table class="tbl lockup[^"]*">[\s\S]*?<\/table>/)[0];
  const gettingOut = plain(chapter("14-ch04.html").match(/<h3>Getting Out<\/h3>\s*<p>([\s\S]*?)<\/p>/)[1]);
  for (const t of TOWNS) {
    const entry = entries.find((j) => j._id === makeId("journal", t.key));
    const lockup = entry.pages.find((p) => p.name === "The Lock-up").text.content;
    assert.deepEqual(rows(lockup.match(/<table>[\s\S]*?<\/table>/)[0]), rows(ch6), `${t.key}: the book's lock-up table`);
    assert.ok(plain(lockup).includes(`${t.labelName}: Difficulty: the lock-up ${DGF.labels[t.label].lockup}.`));
    const wayOut = plain(entry.pages.find((p) => p.name === "The Way Out").text.content);
    assert.ok(wayOut.includes(gettingOut), `${t.key}: Getting Out, word for word`);
    assert.ok(wayOut.includes(`${t.labelName}: Difficulty: the way out ${DGF.labels[t.label].exit}.`));
  }
});

test("the guide says how to start each ready-made game: its scene and macro, which are in the packs", () => {
  const guide = readSource("journal").find((j) => j.key === "how-to-run-a-raid");
  const ready = guide.pages.find((p) => p.key === "ready").text.content;
  const macros = [...readSource("town-macros"), ...readSource("demo-macros")].map((m) => m.name);
  const scenes = [...readSource("town-scenes"), ...readSource("demo-scenes")].map((s) => s.name);
  for (const t of [demoTown(), ...TOWNS]) {
    const row = rows(ready.match(/<table>[\s\S]*?<\/table>/)[0]).find((r) => r[2] === t.name);
    assert.ok(row, `${t.name} has a row`);
    assert.equal(row[1], t.labelName);
    assert.ok(scenes.includes(row[2]) && macros.includes(row[3]), `${t.name}: ${row[2]}, ${row[3]}`);
  }
  assert.match(plain(ready), /Configure Settings → Set up a ready-made game/);
});

/* ------------------------------------------------------- on the fake Foundry -- */

const GM = { id: "gmUser0000000000", name: "Storyteller", isGM: true };
const ANN = { id: "annUser000000000", name: "Ann" };
const { game, Hooks } = installFoundry({ users: [GM, ANN], packs: true });
await game._packsLoading;
await import("../module/dont-get-forked.mjs");
const { SYSTEM_ID, SETTINGS } = await import("../module/contracts.mjs");
Hooks.callAll("init");
const gm = game.users.get(GM.id), ann = game.users.get(ANN.id);
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const run = (user, command) => asUser(user, () => new AsyncFunction("game", command)(game));

test("a Storyteller sets up Gallowsmere and starts its raid: Hard, its list on the Raid HUD, the player's Entity in it", async () => {
  dialogResponders.push((options) => options.buttons.find((b) => b.action === "import").callback({}, { form: fakeForm({ "setup.gallowsmere": true }) }, null));
  Hooks.callAll("ready");
  await settle();
  const macro = game.macros.find((m) => m.name === "Gallowsmere: Start the Raid");
  const scene = game.scenes.find((s) => s.name === "Gallowsmere");
  const entry = game.journal.find((j) => j.name === "Gallowsmere (Hard)");
  assert.ok(macro && scene && entry, "the town's macro, scene and journal entry");
  assert.equal(game.actors.length, 8, "the eight Entities came with it");
  for (const n of scene.notes) assert.ok(entry.pages.some((p) => p._id === n.pageId), "its pins open its pages");
  // the player owns the Werewolf; the Storyteller runs the macro
  const wolf = game.actors.find((a) => a.name === "The Werewolf");
  await asUser(gm, () => wolf.update({ ownership: { default: 0, [ANN.id]: 3 } }));
  const result = await run(gm, macro.command);
  await settle();
  const t = TOWNS.find((x) => x.key === "gallowsmere");
  assert.deepEqual(result, { ok: true, town: "Gallowsmere", difficulty: "hard" });
  const raid = game.dontGetForked.raid.get();
  assert.equal(raid.difficulty, "hard");
  assert.equal(raid.limit, DGF.labels.hard.limit);
  assert.equal(raid.turn, 1);
  assert.equal(raid.furniture, "", "the piece not yet taken");
  assert.deepEqual(raid.list, t.locations.map((l) => ({ name: l.item, duty: l.kind, essential: l.essential })));
  assert.equal(raid.list.filter((it) => it.essential).length, 2, "Hard: two essentials");
  assert.equal(game.actors.get(wolf.id).system.inRaid, true, "the player's Entity is in the raid");
  assert.ok(log.infos.some((m) => /Gallowsmere: a new Hard raid, with its shopping list/.test(m)));
  assert.deepEqual(log.errors, []);
});

test("each town's macro starts its own raid; a player can't run one; a bad macro starts nothing", async () => {
  for (const m of readSource("town-macros")) {
    const t = TOWNS.find((x) => x.key === m.key);
    assert.equal(m.name, `${t.name}: Start the Raid`);
    assert.deepEqual(m.flags, { [DGF.id]: { setup: t.key } });
    await run(gm, m.command);
    await settle();
    assert.equal(game.dontGetForked.raid.get().difficulty, t.label, m.key);
    assert.deepEqual(game.dontGetForked.raid.get().list.map((it) => it.name), t.locations.map((l) => l.item), m.key);
  }
  const before = game.dontGetForked.raid.get().raidId;
  const warned = log.warnings.length;
  const puddle = readSource("town-macros")[0];
  assert.deepEqual(await run(ann, puddle.command), { ok: false, reason: "gmOnly" });
  assert.deepEqual(await asUser(gm, () => game.dontGetForked.raid.start({ town: "Nowhere", difficulty: "deadly", list: [] })), { ok: false, reason: "badDifficulty" });
  assert.deepEqual(await asUser(gm, () => game.dontGetForked.raid.start({ town: "Nowhere", difficulty: "easy", list: [] })), { ok: false, reason: "badList" });
  assert.equal(game.dontGetForked.raid.get().raidId, before, "no new raid");
  assert.ok(log.warnings.slice(warned).some((w) => /Only the Storyteller can start a raid/.test(w)));
  assert.ok(log.warnings.slice(warned).some((w) => /no raid was started/.test(w)));
});

test("in campaign play the macro asks, as New raid does, who gets the castle's extra charges; cancelling starts nothing", async () => {
  await asUser(gm, () => game.settings.set(SYSTEM_ID, SETTINGS.campaign, true));
  await asUser(gm, () => game.settings.set(SYSTEM_ID, SETTINGS.castleUpgrades, ["a gilt mirror"]));
  const thistle = readSource("town-macros").find((m) => m.key === "thistlewick");
  const before = game.dontGetForked.raid.get().raidId;
  const seen = [];
  dialogResponders.push((options) => { seen.push(options.window?.title); return null; });
  assert.deepEqual(await run(gm, thistle.command), { ok: false, reason: "cancelled" });
  assert.equal(game.dontGetForked.raid.get().raidId, before);
  const wolf = game.actors.find((a) => a.name === "The Werewolf");
  dialogResponders.push((options) => options.buttons.find((b) => b.action === "ok").callback({}, { form: fakeForm({ [`extra.${wolf.id}`]: 1 }) }, null));
  assert.equal((await run(gm, thistle.command)).ok, true);
  await settle();
  assert.equal(seen.length, 1);
  assert.equal(game.dontGetForked.raid.get().difficulty, "standard");
  assert.equal(game.actors.get(wolf.id).system.charges.extra, DGF.campaign.chargesPerUpgrade, "the Werewolf's extra charge");
  await asUser(gm, () => game.settings.set(SYSTEM_ID, SETTINGS.campaign, false));
});

test("the towns' session left no errors, no missing words and no unanswered dialogs", () => {
  assert.deepEqual(log.errors, []);
  assert.deepEqual(log.missingI18n, []);
  assert.equal(dialogResponders.length, 0);
});
