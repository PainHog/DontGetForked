/**
 * The compendiums (tools/gen-pack-source.mjs → packs/_source → packs/): their
 * source is up to date with the game data; the Entities are what New Entity
 * makes; the tables have the config's results on the right dice and say what the
 * book's tables print; the towns are book/src/towns.json, row by row; and each
 * town's list macro really puts its list on the Raid HUD (on the fake Foundry).
 * The expectations here are worked out from the data directly, not through the
 * generator, so a slip in the generator shows. (Compiled packs = source: the
 * validator, npm run validate.)
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT, PACKS, readSource, toCliDoc } from "../tools/pack-config.mjs";
import { staleFiles, BOOK_QUOTES } from "../tools/gen-pack-source.mjs";
import { DGF } from "../module/config.mjs";
import { entitySystem } from "../module/logic/entity.mjs";
import { installFoundry, asUser, settle, log } from "../tools/fake-foundry.mjs";

/* ------------------------------------------------------------ helpers -- */

const ENTITIES = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&nbsp;": " " };
/** An HTML fragment as the words a reader sees. */
const plain = (html) => String(html).replace(/<\/?(?:em|i)\b[^>]*>/g, "").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/g, (m) => ENTITIES[m] ?? m).replace(/\s+/g, " ").trim();
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const low = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const chapter = (file) => readFileSync(join(ROOT, "book", "src", "chapters", file), "utf8");
/** The rows (cells as plain text) of an HTML table's body. */
const rowsOf = (tableHtml) => [...tableHtml.replace(/<thead>[\s\S]*?<\/thead>/, "").matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)]
  .map((m) => [...m[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g)].map((c) => plain(c[1])));
/** The first table after a chapter's <h3>heading</h3>, as rows. */
function bookTable(file, heading) {
  const html = chapter(file);
  const at = html.indexOf(`<h3>${heading}</h3>`);
  assert.ok(at >= 0, `${file} has a "${heading}" heading`);
  return rowsOf(html.slice(at).match(/<table[\s\S]*?<\/table>/)[0]);
}
const def = (name) => PACKS.find((d) => d.out === name);
const table = (key) => readSource("tables").find((t) => t.key === key);
const way = (trait, text) => `${cap(trait)}${text ? ` (${text})` : ""}`;

const GM = { id: "gmUser0000000000", name: "Storyteller", isGM: true };
const { game, Hooks } = installFoundry({ users: [GM] });
await import("../module/dont-get-forked.mjs");
Hooks.callAll("init");
Hooks.callAll("ready");
await settle();
const gm = game.users.get(GM.id);

/* -------------------------------------------------------------- source -- */

test("the compendium source is exactly what the game data makes (run npm run build:packs if not)", () => {
  const { stale, extra } = staleFiles();
  assert.deepEqual([...stale, ...extra].map((p) => p.slice(ROOT.length + 1)), []);
});

test("system.json declares the three packs the build makes, in one folder", () => {
  const manifest = JSON.parse(readFileSync(join(ROOT, "system.json"), "utf8"));
  assert.deepEqual(manifest.packs.map((p) => [p.name, p.type, p.path]), PACKS.map((d) => [d.out, d.type, `packs/${d.out}`]));
  assert.deepEqual(manifest.packFolders.flatMap((f) => f.packs), PACKS.map((d) => d.out));
});

/* ------------------------------------------------------------ entities -- */

test("the Entities pack holds the eight in the book's order, each exactly as New Entity makes it", async () => {
  const source = readSource("entities");
  assert.deepEqual(source.map((d) => d.key), DGF.entities.map((e) => e.key));
  for (const [i, raw] of source.entries()) {
    assert.deepEqual(raw.system, entitySystem(raw.key), `${raw.key}: the book's dice and marked defaults`);
    const doc = toCliDoc(def("entities"), raw, i); // what the compendium holds
    const made = await asUser(gm, () => game.dontGetForked.createEntity(raw.key));
    const dragged = await asUser(gm, () => Actor.create({ name: doc.name, type: doc.type, system: doc.system }));
    assert.equal(dragged.name, made.name);
    assert.equal(dragged.type, made.type);
    assert.deepEqual(dragged.toObject().system, made.toObject().system, `${raw.key} from the pack = New Entity`);
    // linked tokens both ways, so a roll from a token changes the actor the raid tracks
    assert.equal(doc.prototypeToken.actorLink, true, `${raw.key}: the pack's token is linked`);
    assert.equal(made.prototypeToken.actorLink, true, `${raw.key}: New Entity's token is linked`);
  }
  assert.deepEqual(log.errors, []);
});

/* -------------------------------------------------------------- tables -- */

/** Every total a table's formula can roll. */
const d = (n) => Array.from({ length: n }, (_, i) => i + 1);
const D66 = d(6).flatMap((a) => d(6).map((b) => a * 10 + b));
const TABLES = {
  "castle-duties": { formula: "1d6", totals: d(6), count: DGF.duties.length },
  "chase-table": { formula: "1d6", totals: d(6), count: DGF.chaseTable.length },
  "lantern-night": { formula: "1d6", totals: d(6), count: DGF.festival.customs.length },
  "obstacle-table": { formula: "1d20", totals: d(20), count: DGF.obstacleTable.length },
  "shopping-list": { formula: "1d6 * 10 + 1d6", totals: D66, count: DGF.shoppingTable.reduce((n, r) => n + r.items.length, 0) },
  "furniture": { formula: "1d6", totals: d(6), count: DGF.furniture.length },
  "villagers-who": { formula: "1d6", totals: d(6), count: DGF.villagers.who.length },
  "villagers-doing": { formula: "1d6", totals: d(6), count: DGF.villagers.doing.length },
};

test("each table has the config's results, its die's formula, and every total draws exactly one result", () => {
  const source = readSource("tables");
  assert.deepEqual(source.map((t) => t.key), Object.keys(TABLES));
  for (const [i, raw] of source.entries()) {
    const want = TABLES[raw.key];
    assert.equal(raw.formula, want.formula, `${raw.key} formula`);
    assert.equal(raw.results.length, want.count, `${raw.key} results`);
    assert.equal(want.totals.length, want.count, `${raw.key}: one result per face`);
    for (const total of want.totals) {
      const hits = raw.results.filter((r) => r.range[0] <= total && total <= r.range[1]);
      assert.equal(hits.length, 1, `${raw.key}: a roll of ${total} draws one result`);
    }
    for (const r of raw.results) assert.ok(want.totals.includes(r.range[0]) && want.totals.includes(r.range[1]), `${raw.key}: range ${r.range} can be rolled`);
    // As the compendium holds it: text results, words in the description, drawn with replacement.
    const doc = toCliDoc(def("tables"), raw, i);
    assert.equal(doc.replacement, true);
    for (const r of doc.results) {
      assert.equal(r.type, "text");
      assert.ok(plain(r.description).length > 0);
    }
  }
});

test("each table's results say what the book's table prints, row by row", () => {
  const text = (key) => table(key).results.map((r) => plain(r.description));
  const byFace = (rows) => rows.map((cells, i) => { assert.equal(Number(cells[0]), i + 1, "the book's rows run 1, 2, 3…"); return cells; });

  byFace(bookTable("12-ch02.html", "Castle Duties")).forEach(([, duty, shops, where, castle], i) => {
    const t = text("castle-duties")[i];
    assert.equal(t.toLowerCase(), `${duty} Shops for: ${shops} Where in town: ${where} At the castle: ${castle}`.toLowerCase());
  });
  byFace(bookTable("16-ch06.html", "The Chase Table")).forEach(([, ground, traits], i) => {
    assert.equal(text("chase-table")[i], `${ground} Traits that work: ${traits}`);
  });
  byFace(bookTable("31-ch08.html", "Lantern Night")).forEach(([, custom], i) => assert.equal(text("lantern-night")[i], custom));
  byFace(bookTable("31-ch08.html", "The Obstacle Table")).forEach(([, obstacle, quiet, loud], i) => {
    assert.equal(text("obstacle-table")[i], `${obstacle} Quiet way: ${quiet} Loud way: ${loud}`);
  });
  const shopping = table("shopping-list").results;
  byFace(bookTable("31-ch08.html", "The Shopping List")).forEach(([, kind, items], a) => {
    const faces = items.split(" · ").map((x) => x.match(/^(\d) (.*)$/));
    assert.equal(faces.length, 6);
    faces.forEach(([, b, item]) => {
      const r = shopping.find((x) => x.range[0] === (a + 1) * 10 + Number(b));
      const [head] = plain(r.description).split(" Where in town: ");
      const [k, it] = head.split(": ");
      assert.ok(kind.startsWith(k), `${k} is the book's kind ${a + 1}`);
      assert.equal(it, item, `${a + 1}${b}`);
    });
  });
  byFace(bookTable("31-ch08.html", "The Furniture")).forEach(([, piece, size], i) => assert.equal(text("furniture")[i], `${piece} Size: ${size}`));
  byFace(bookTable("31-ch08.html", "The Villagers")).forEach(([, who, doing], i) => {
    assert.equal(text("villagers-who")[i], who);
    assert.equal(text("villagers-doing")[i], doing);
  });
});

test("every sentence the compendiums quote from the book is still in the book, word for word", () => {
  for (const [key, q] of Object.entries(BOOK_QUOTES)) {
    assert.ok(plain(chapter(q.chapter)).includes(plain(q.html)), `${key}: "${plain(q.html)}" is in ${q.chapter}`);
  }
});

/* ------------------------------------------------------------- journal -- */

const TOWNS = JSON.parse(readFileSync(join(ROOT, "book", "src", "towns.json"), "utf8")).towns;
const itemOf = (l) => DGF.shoppingTable[l.item[0] - 1].items[l.item[1] - 1];
const dutyOf = (l) => DGF.duties.find((x) => x.key === DGF.shoppingTable[l.item[0] - 1].duty);
/** A page's code block, as the Storyteller would copy it. */
const codeOf = (html) => html.match(/<pre><code>([\s\S]*?)<\/code><\/pre>/)[1].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

test("the journal holds the guide, then the three towns in Chapter 9's order", () => {
  const journal = readSource("journal");
  assert.deepEqual(journal.map((j) => j.key), ["how-to-run-a-raid", ...TOWNS.map((t) => t.key)]);
  assert.deepEqual(journal[0].pages.map((p) => p.name), ["Before the raid", "During the raid", "After the raid"]);
});

test("each town's journal is book/src/towns.json: its list, furniture, custom, villagers and numbers", () => {
  const journal = readSource("journal");
  for (const t of TOWNS) {
    const doc = journal.find((j) => j.key === t.key);
    const label = cap(t.label);
    const L = DGF.labels[t.label];
    assert.equal(doc.name, `${t.name} (${label})`);
    assert.deepEqual(doc.pages.map((p) => [p.name, p.type]), [[t.name, "text"], ["Locations", "text"], ["Map", "image"]]);
    const html = doc.pages[0].text.content;
    const ov = plain(html);
    assert.ok(ov.includes(t.description));
    assert.ok(ov.includes(`Lantern Night: ${DGF.festival.customs.find((c) => c.key === t.custom).text}`));
    const list = [...html.match(/<ol>([\s\S]*?)<\/ol>/)[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => plain(m[1]));
    assert.deepEqual(list, t.locations.map((l) => `${cap(itemOf(l))}${l.essential ? " (essential)" : ""}`));
    assert.equal(list.length, L.items, `a ${t.label} list has ${L.items} items`);
    const at = t.locations.findIndex((l) => l.furniture);
    const piece = DGF.furniture.find((f) => f.key === t.locations[at].furniture.piece);
    assert.ok(ov.includes(`The furniture: ${low(piece.name)} (${cap(piece.size)}: ${piece.size === "huge" ? "two carriers" : "one carrier"}), at ${t.locations[at].place} (${at + 1}).`));
    const villagers = t.villagers.map((v) => `${low(DGF.villagers.who[v.who - 1])} (${low(DGF.villagers.doing[v.doing - 1])})`).join("; ");
    assert.ok(ov.includes(`Villagers: ${villagers}.`));
    assert.ok(ov.includes(`${label}: Suspicion Limit ${L.limit} · Difficulty: the way out ${L.exit}, the lock-up ${L.lockup} · the final flight: mob ${L.finalMob}, Lead ${DGF.lead.finalStart}, escape at ${L.finalEscape}.`));
  }
});

test("each town's location key is its locations and obstacles, row by row (the furniture's 2 harder)", () => {
  const journal = readSource("journal");
  const row = (step, o, harder = 0, tag = "") => {
    const e = DGF.obstacleTable.find((x) => x.key === o.obstacle);
    return [
      `${step} ${e.name}${e.group ? " (group)" : ""}${o.watched ? " watched" : ""}${tag ? ` ${tag}` : ""}`,
      way(e.quiet, e.quietText),
      e.loud ? way(e.loud, e.loudText) : "—",
      String(Math.min(DGF.furnitureObstacle.max, o.difficulty + harder)),
    ];
  };
  for (const t of TOWNS) {
    const want = t.locations.flatMap((l, n) => [
      [`${n + 1}. ${cap(l.place)}: ${itemOf(l)} (${dutyOf(l).kind})${l.essential ? " · essential" : ""}`],
      row("Way in", l.waysIn[0]),
      row("or", l.waysIn[1]),
      ...l.then.map((o) => row("Then", o)),
      ...(l.furniture ? [row("Then", l.furniture.obstacle, DGF.furnitureObstacle.harder, "for the piece")] : []),
    ]);
    const page = journal.find((j) => j.key === t.key).pages[1];
    assert.deepEqual(rowsOf(page.text.content.match(/<table>[\s\S]*<\/table>/)[0]), want, t.key);
  }
});

test("each town's map page shows its map, which ships with the system", () => {
  const journal = readSource("journal");
  for (const t of TOWNS) {
    const map = journal.find((j) => j.key === t.key).pages[2];
    assert.equal(map.src, `systems/${DGF.id}/assets/maps/${t.key}.svg`);
    const file = join(ROOT, "assets", "maps", `${t.key}.svg`);
    assert.ok(existsSync(file));
    assert.match(readFileSync(file, "utf8"), new RegExp(`^<svg [^>]*>\\s*<title[^>]*>Map of ${t.name}`));
  }
});

test("each town's macro puts its shopping list on the Raid HUD", async () => {
  const journal = readSource("journal");
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
  for (const t of TOWNS) {
    const code = codeOf(journal.find((j) => j.key === t.key).pages[0].text.content);
    await asUser(gm, () => new AsyncFunction("game", code)(game));
    await settle();
    assert.deepEqual(game.dontGetForked.raid.get().list, t.locations.map((l) => ({ name: itemOf(l), duty: dutyOf(l).key, essential: !!l.essential })), t.key);
  }
  assert.deepEqual(log.errors, []);
});
