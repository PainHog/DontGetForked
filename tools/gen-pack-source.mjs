/**
 * DON'T GET FORKED — compendium source generator
 * ----------------------------------------------
 * Writes the source of the system's three compendiums from the game data, so
 * they can't drift from the book:
 *
 *   packs/_source/entities/  the eight Entities, exactly as New Entity makes them
 *                            (module/logic/entity.mjs entitySystem: the book's dice
 *                            and marked defaults, Chapter 2)
 *   packs/_source/tables/    the book's random tables, from module/config.mjs:
 *                            Castle Duties (Ch 2), the chase table (Ch 6), Lantern
 *                            Night, the obstacle table, the shopping list, the
 *                            furniture and the villagers (Ch 8)
 *   packs/_source/journal/   the three premade towns (Ch 9) from book/src/towns.json,
 *                            read through the book's own loader (book/tools/towns.mjs,
 *                            which checks every town against Chapter 8's rules), and a
 *                            guide to the system's tools whose button names come from
 *                            lang/en.json
 *   assets/maps/             each town's map, drawn by the book's map code
 *                            (book/tools/town-maps.mjs), for the towns' map pages
 *
 * Everything here restates the book or the system; nothing is new game content.
 * The few sentences quoted from the book (BOOK_QUOTES) are checked against the
 * chapters by test/packs.test.mjs, so a change to the book's wording shows up.
 *
 * Usage:  node tools/gen-pack-source.mjs           rewrite the generated files
 *         node tools/gen-pack-source.mjs --check   fail if any is out of date
 * (npm run build:packs regenerates first, then compiles; npm run validate checks.)
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { DGF } from "../module/config.mjs";
import { SYSTEM_ID, OPS, SETTINGS } from "../module/contracts.mjs";
import { entitySystem } from "../module/logic/entity.mjs";
import { loadTowns, wayText, TRAIT_NAME } from "../book/tools/towns.mjs";
import { townMap } from "../book/tools/town-maps.mjs";
import { ROOT, SRC } from "./pack-config.mjs";

/** The folders this script owns: every file in them is generated (anything else there is removed). */
export const OWNED = Object.freeze({
  entities: join(SRC, "entities"),
  tables: join(SRC, "tables"),
  journal: join(SRC, "journal"),
  maps: join(ROOT, "assets", "maps"),
});

const LANG = JSON.parse(readFileSync(join(ROOT, "lang", "en.json"), "utf8"));
const MANIFEST = JSON.parse(readFileSync(join(ROOT, "system.json"), "utf8"));

/* ------------------------------------------------------------ helpers -- */

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const low = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const num = (i, key) => `${String(i + 1).padStart(2, "0")}-${key}.json`;
const json = (v) => `${JSON.stringify(v, null, 2)}\n`;
const trait = (t) => TRAIT_NAME[t] ?? cap(t);
/** A word the system shows (lang/en.json); throws if the key is gone, so the guide can't name a button that doesn't exist. */
function L(key) {
  if (!(key in LANG)) throw new Error(`lang/en.json has no "${key}" (named in the compendium guide)`);
  return LANG[key];
}
/** A button or window name, bold; a label with an explanation in brackets is cut before it. */
const B = (key) => `<strong>${esc(L(key).replace(/\s*\(.*$/, ""))}</strong>`;
const packLabel = (name) => MANIFEST.packs?.find((p) => p.name === name)?.label ?? name;

/**
 * Sentences quoted word for word from the book (HTML as printed). test/packs.test.mjs
 * checks each still appears in its chapter.
 */
export const BOOK_QUOTES = Object.freeze({
  duties: { chapter: "12-ch02.html", html: "Each Entity’s entry gives its default Duty; if two defaults clash in a party, the second player picks another or rolls a d6, rerolling any Duty already taken." },
  chase: { chapter: "16-ch06.html", html: "The result says which traits work this round for everyone in the chase, and always includes one that isn’t Nimble." },
  customs: { chapter: "31-ch08.html", html: "Every town keeps it its own way: roll a d6 or pick a custom for each town. Customs are flavour, not rules." },
  obstacles: { chapter: "31-ch08.html", html: "The quiet way gets past without a fuss; the loud way works too, but Suspicion rises by 1 whatever the result (Chapter 5). At a <em>group</em> obstacle, everyone there rolls for themselves (Chapter 4)." },
  shopping: { chapter: "31-ch08.html", html: "For each item, roll a d6 for its kind and a d6 for the item itself; roll again on a repeated item." },
  shoppingKind: { chapter: "31-ch08.html", html: "Only the kind matters to the rules: it decides which Castle Duty gets its edge there." },
  furniture: { chapter: "31-ch08.html", html: "Roll a d6 for the piece of furniture or decor standing at one of the list’s locations (roll or pick; Chapter 4)." },
  villagers: { chapter: "31-ch08.html", html: "Whenever a watched obstacle needs a face, or a Cost needs someone to cause it, roll who it is and what they’re doing." },
  townRows: { chapter: "32-ch09.html", html: "A location’s first two rows are its two ways in: the party picks one and keeps to it. The furniture’s obstacle is already 2 harder." },
  townMove: { chapter: "32-ch09.html", html: "Any move takes one Turn." },
  townMap: { chapter: "32-ch09.html", html: "On the map, an eye marks a watched location, a star the furniture." },
});
const Q = (k) => BOOK_QUOTES[k].html;
const source = (chapter, section) => `<p><em>Rulebook, Chapter ${chapter}: ${section}.</em></p>`;

/* ------------------------------------------------------------ entities -- */

/** The eight, in the book's order, each as New Entity makes it (createEntity → entitySystem). */
export function entityDocs() {
  return DGF.entities.map((e) => ({ key: e.key, name: e.name, system: entitySystem(e.key) }));
}

/* -------------------------------------------------------------- tables -- */

/** A table on one die: result i is face i + 1. */
const dieTable = (die, rows) => ({ formula: `1d${die}`, results: rows.map((r, i) => ({ ...r, range: [i + 1, i + 1] })) });

/**
 * The shopping list is a d66: a d6 for the kind (Castle Duty order), a d6 for the
 * item. Foundry draws a table from one roll total, so it is one 36-result table on
 * `1d6 * 10 + 1d6`: the total reads as the two dice (34 = kind 3, item 4), each
 * result's range is that one number, and the roll card still shows both dice. (Two
 * tables, a kind and then six item tables, would need two draws and a lookup by
 * hand; 1–36 numbering would hide the dice behind a sum nobody can read.)
 */
export const D66_FORMULA = "1d6 * 10 + 1d6";

/** The book's random tables, in the book's order. */
export function tableDocs() {
  const dutyOf = (key) => DGF.duties.find((d) => d.key === key);
  const tables = [
    {
      key: "castle-duties", name: "Castle Duties (d6)",
      description: `<p>${Q("duties")}</p>${source(2, "Castle Duties")}`,
      ...dieTable(6, DGF.duties.map((d) => ({
        key: d.key,
        description: `<p><strong>${esc(d.name)}</strong></p><p>Shops for: ${esc(d.kind)}<br>Where in town: ${esc(d.where)}<br>At the castle: ${esc(d.role)}</p>`,
      }))),
    },
    {
      key: "chase-table", name: "The Chase Table (d6)",
      description: `<p>${Q("chase")}</p>${source(6, "The Chase Table")}<p>In Foundry the chase tracker rolls the ground each round (${B("DGF.Chase.rollGround")} when chases are run by hand).</p>`,
      ...dieTable(6, DGF.chaseTable.map((c) => ({
        key: c.key,
        description: `<p><strong>${esc(c.name)}.</strong> ${esc(c.text)}</p><p>Traits that work: ${c.traits.map(trait).join(", ")}</p>`,
      }))),
    },
    {
      key: "lantern-night", name: "Lantern Night: Local Customs (d6)",
      description: `<p>${Q("customs")}</p>${source(8, "Lantern Night")}`,
      ...dieTable(6, DGF.festival.customs.map((c) => ({ key: c.key, description: `<p>${esc(c.text)}</p>` }))),
    },
    {
      key: "obstacle-table", name: "The Obstacle Table (d20)",
      description: `<p>${Q("obstacles")}</p>${source(8, "The Obstacle Table")}`,
      ...dieTable(20, DGF.obstacleTable.map((o) => ({
        key: o.key,
        description: `<p><strong>${esc(o.name)}</strong>${o.group ? " <em>(group)</em>" : ""}</p><p>Quiet way: ${esc(wayText(o.quiet, o.quietText))}<br>Loud way: ${o.loud ? esc(wayText(o.loud, o.loudText)) : "—"}</p>`,
      }))),
    },
    {
      key: "shopping-list", name: "The Shopping List (d66)",
      description: `<p>${Q("shopping")} ${Q("shoppingKind")}</p>${source(8, "The Shopping List")}`
        + `<p>Read the total as the two dice, tens then units: 34 is a 3 for the kind and a 4 for the item. On the Raid HUD, ${B("DGF.Raid.list")} → ${B("DGF.List.roll")} rolls a whole list on this table (a repeat is rolled again) and keeps it on the HUD.</p>`,
      formula: D66_FORMULA,
      results: DGF.shoppingTable.flatMap((row, a) => {
        const duty = dutyOf(row.duty);
        return row.items.map((item, b) => ({
          key: `${row.duty}-${b + 1}`,
          range: [(a + 1) * 10 + b + 1, (a + 1) * 10 + b + 1],
          description: `<p><strong>${esc(cap(duty.kind))}:</strong> ${esc(item)}</p><p>Where in town: ${esc(duty.where)}</p>`,
        }));
      }),
    },
    {
      key: "furniture", name: "The Furniture (d6)",
      description: `<p>${Q("furniture")}</p>${source(8, "The Furniture")}`,
      ...dieTable(6, DGF.furniture.map((f) => ({ key: f.key, description: `<p><strong>${esc(f.name)}</strong></p><p>Size: ${cap(f.size)}</p>` }))),
    },
    {
      key: "villagers-who", name: "The Villagers: Who (d6)",
      description: `<p>${Q("villagers")}</p>${source(8, "The Villagers")}`,
      ...dieTable(6, DGF.villagers.who.map((w, i) => ({ key: `who-${i + 1}`, description: `<p>${esc(w)}</p>` }))),
    },
    {
      key: "villagers-doing", name: "The Villagers: What They’re Doing (d6)",
      description: `<p>${Q("villagers")}</p>${source(8, "The Villagers")}`,
      ...dieTable(6, DGF.villagers.doing.map((w, i) => ({ key: `doing-${i + 1}`, description: `<p>${esc(w)}</p>` }))),
    },
  ];
  return tables.map((t) => ({ key: t.key, name: t.name, description: t.description, formula: t.formula, results: t.results }));
}

/* ------------------------------------------------------------- journal -- */

const SIZE = { bulky: "Bulky", huge: "Huge" };
const textPage = (key, name, content) => ({ key, name, type: "text", text: { format: 1, content } });

/** The script macro that puts a town's list on the Raid HUD (the raid.list operation's "set"). */
export function listMacro(t) {
  const items = t.locations.map((l) => `  { name: ${JSON.stringify(l.item)}, duty: ${JSON.stringify(l.kind)}, essential: ${l.essential} }`);
  return `// ${t.name}: put this shopping list on the Raid HUD (run as the Storyteller, after New raid → ${t.labelName}).\n`
    + `game.dontGetForked.runOp(${JSON.stringify(OPS.raidList)}, { action: "set", list: [\n${items.join(",\n")}\n] });`;
}

function obstacleRow(step, o) {
  const name = `${esc(o.name)}${o.group ? " <em>(group)</em>" : ""}${o.watched ? " <strong>watched</strong>" : ""}`;
  return `<tr><td><strong>${step}</strong> ${name}</td><td>${esc(wayText(o.quiet, o.quietText))}</td><td>${o.loud ? esc(wayText(o.loud, o.loudText)) : "—"}</td><td>${o.difficulty}</td></tr>`;
}

/** One premade town as a journal entry: the town, its location key, its map. */
function townDoc(t) {
  const L = t.locations;
  const host = L.find((l) => l.furniture);
  const list = L.map((l) => `<li>${l.essential ? `<strong>${esc(cap(l.item))}</strong> (essential)` : esc(cap(l.item))}</li>`).join("");
  const villagers = t.villagers.map((v) => `${esc(low(v.who))} (${esc(low(v.doing))})`).join("; ");
  const overview = [
    `<p><strong>${t.labelName}.</strong> ${esc(t.description)}</p>`,
    `<p><strong>Lantern Night:</strong> ${esc(t.custom)}</p>`,
    `<p><strong>The shopping list</strong> (${L.length} items):</p>`,
    `<ol>${list}</ol>`,
    `<p><strong>The furniture:</strong> ${esc(low(host.furniture.name))} (${SIZE[host.furniture.size]}), at ${esc(host.place)} (${host.n}).</p>`,
    `<p><strong>Villagers:</strong> ${villagers}.</p>`,
    `<p><strong>${t.labelName}:</strong> Suspicion Limit ${t.limit} · the way out ${t.wayOut.difficulty} · the lock-up ${t.lockup.difficulty} · the final flight: mob ${t.finalMob}, escape at Lead ${t.finalEscape}.</p>`,
    `<h2>In Foundry</h2>`,
    `<p>On the Raid HUD, ${B("DGF.Raid.newRaid")} → <strong>${t.labelName}</strong> sets these numbers. To put this town’s list on the HUD (so its items show there and the end of the raid starts from them), run this as a script macro:</p>`,
    `<pre><code>${esc(listMacro(t))}</code></pre>`,
  ].join("\n");
  const rows = [];
  for (const l of L) {
    rows.push(`<tr><th colspan="4">${l.n}. ${esc(cap(l.place))}: ${esc(l.item)} (${esc(l.kindName)})${l.essential ? " · <strong>essential</strong>" : ""}</th></tr>`);
    rows.push(obstacleRow("Way in", l.waysIn[0]));
    rows.push(obstacleRow("or", l.waysIn[1]));
    for (const o of l.then) rows.push(obstacleRow("Then", o));
    if (l.furniture) rows.push(obstacleRow("Furniture", l.furniture.obstacle));
  }
  const locations = [
    `<p>${Q("townRows")} ${Q("townMove")}</p>`,
    `<table>`,
    `<thead><tr><th>Location · obstacle</th><th>Quiet way</th><th>Loud way</th><th>Difficulty</th></tr></thead>`,
    `<tbody>`,
    ...rows,
    `</tbody>`,
    `</table>`,
  ].join("\n");
  return {
    key: t.key,
    name: `${t.name} (${t.labelName})`,
    pages: [
      textPage("town", t.name, overview),
      textPage("locations", "Locations", locations),
      { key: "map", name: "Map", type: "image", src: `systems/${SYSTEM_ID}/assets/maps/${t.key}.svg`, image: { caption: Q("townMap") } },
    ],
  };
}

/** The guide: where the system's tools are, in the order a raid uses them. Facts about the system only. */
function guideDoc() {
  // Every world switch in Configure Settings (the client's odds line isn't an automation).
  const settings = Object.values(SETTINGS).filter((k) => `DGF.Settings.${k}.Name` in LANG && k !== SETTINGS.showOdds)
    .map((k) => `<em>${esc(L(`DGF.Settings.${k}.Name`))}</em>`).join(", ");
  const before = [
    `<p>The Storyteller runs the raid from ${B("DGF.Raid.title")} window (the Raid HUD): everyone sees Suspicion, the Limit and the Turn; the Storyteller’s copy has the buttons.</p>`,
    `<ol>`,
    `<li><strong>The Entities.</strong> In the Actors sidebar, ${B("DGF.Create.button")} makes one of the eight with the book’s dice and marked defaults, for the player you pick, and lets the party see each other’s sheets. The same eight are in the compendium <strong>${esc(packLabel("entities"))}</strong>, to drag into the world; then give the player ownership (Configure Ownership). Change the Gift, Perk and Castle Duty on the sheet.</li>`,
    `<li><strong>The town.</strong> Run one of the three premade towns in this compendium (Chapter 9), or build one with the book’s tables in the <strong>${esc(packLabel("tables"))}</strong> compendium (Chapter 8).</li>`,
    `<li><strong>A new raid.</strong> Press ${B("DGF.Raid.newRaid")} and pick the town’s difficulty: Suspicion goes back to 0, the Turn to 1, and the Limit is the difficulty’s. With <em>${esc(L("DGF.Settings.resetOnNewRaid.Name"))}</em> on, every Entity is free again and its charges refill.</li>`,
    `<li><strong>The shopping list.</strong> For a rolled town, ${B("DGF.Raid.list")} → ${B("DGF.List.roll")} rolls it; a premade town’s page has a macro that puts its list on the HUD.</li>`,
    `</ol>`,
  ].join("\n");
  const during = [
    `<ul>`,
    `<li><strong>Rolling.</strong> Click a trait on the Entity’s sheet. The roll dialog asks for the second die (Mask or Monster) and the Difficulty, offers the Entity’s abilities and help from the others, and has ticks for the situation: Castle Duty, the loud way, watched, the way out of town, the furniture’s extra obstacle and the lock-up. The roll card shows the result, and Suspicion goes on the HUD by itself: one roll, one rise.</li>`,
    `<li><strong>Costs.</strong> On a Cost, the Storyteller picks one on the roll card, and it applies itself.</li>`,
    `<li><strong>Turns.</strong> Press ${B("DGF.Raid.nextTurn")} at the end of each Turn. After the last Turn comes dawn.</li>`,
    `<li><strong>Tell checks.</strong> When the book calls for a Tell check (Chapter 5), press ${B("DGF.Raid.tellCheck")}, tick who is arriving, name the place, then ${B("DGF.Tell.check")}. The system rolls the dice, says whose Tell goes off and raises Suspicion; each place is checked once.</li>`,
    `<li><strong>Group obstacles.</strong> Press ${B("DGF.Raid.groupCheck")} before several Entities roll the same group obstacle: their rolls raise Suspicion once, by the biggest trigger among them, and everyone caught flees together.</li>`,
    `<li><strong>Chases.</strong> Trouble at a watched obstacle starts a local chase (by itself, or from the roll card when chases are run by hand), and ${B("DGF.Chase.title")} tracker opens for everyone: the Lead, the ground, the mob and who still has to roll. Each fleeing Entity rolls from it. ${B("DGF.Raid.chase")} on the HUD opens it again.</li>`,
    `<li><strong>The lock-up.</strong> Cornered in a local chase, an Entity is captured and the HUD shows it at the lock-up. From the next Turn its roll is slipping free (tick <em>${esc(L("DGF.Roll.lockupSlip").replace(/\s*\(.*$/, ""))}</em>); a rescue that beats the lock-up frees every captive there.</li>`,
    `<li><strong>The hunt.</strong> At the Limit, or at dawn, the whole town hunts, and the final flight runs on the chase tracker.</li>`,
    `</ul>`,
  ].join("\n");
  const after = [
    `<p>When the party gets out, the ${B("DGF.RaidCard.home.title")} card gives the Storyteller ${B("DGF.Card.yearButton")} (or use ${B("DGF.Raid.endRaid")} on the HUD). Tick what came home, then ${B("DGF.Year.decide")}: the card gives the result and the epilogue. A forked party’s year card posts itself.</p>`,
    `<p><strong>Running it by hand.</strong> Every automation has a switch in Configure Settings → ${esc(MANIFEST.title)}: ${settings}.</p>`,
    `<p><strong>The compendiums.</strong> ${esc(packLabel("entities"))}: the eight Entities. ${esc(packLabel("tables"))}: the book’s random tables. ${esc(packLabel("journal"))}: this guide and the three towns of Chapter 9, each with its list, location key and map.</p>`,
  ].join("\n");
  return {
    key: "how-to-run-a-raid",
    name: "How to Run a Raid in Foundry",
    pages: [textPage("before", "Before the raid", before), textPage("during", "During the raid", during), textPage("after", "After the raid", after)],
  };
}

/** The guide first, then the towns in the book's order (Easy, Standard, Hard). */
export function journalDocs(towns = loadTowns()) {
  return [guideDoc(), ...towns.map(townDoc)];
}

/* ------------------------------------------------------------ generate -- */

/** Every generated file: absolute path → contents. */
export function generate() {
  const files = new Map();
  entityDocs().forEach((d, i) => files.set(join(OWNED.entities, num(i, d.key)), json(d)));
  tableDocs().forEach((d, i) => files.set(join(OWNED.tables, num(i, d.key)), json(d)));
  const towns = loadTowns();
  journalDocs(towns).forEach((d, i) => files.set(join(OWNED.journal, num(i, d.key)), json(d)));
  for (const t of towns) files.set(join(OWNED.maps, `${t.key}.svg`), townMap(t));
  return files;
}

const existing = () => Object.values(OWNED).flatMap((dir) => (existsSync(dir) ? readdirSync(dir).map((f) => join(dir, f)) : []));

/** What is out of date: files to write (missing or different) and files to remove. */
export function staleFiles(files = generate()) {
  const stale = [...files].filter(([path, body]) => !existsSync(path) || readFileSync(path, "utf8") !== body).map(([path]) => path);
  const extra = existing().filter((path) => !files.has(path));
  return { stale, extra };
}

/** Rewrite what is out of date; returns the relative paths written and removed. */
export function writeGenerated() {
  const files = generate();
  const { stale, extra } = staleFiles(files);
  for (const dir of Object.values(OWNED)) mkdirSync(dir, { recursive: true });
  for (const path of stale) writeFileSync(path, files.get(path));
  for (const path of extra) rmSync(path, { force: true });
  const rel = (p) => relative(ROOT, p);
  return { written: stale.map(rel), removed: extra.map(rel), total: files.size };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  if (process.argv.includes("--check")) {
    const { stale, extra } = staleFiles();
    const bad = [...stale, ...extra].map((p) => relative(ROOT, p));
    if (bad.length) {
      console.error(`Compendium source out of date (${bad.length}): ${bad.join(", ")}\n  run: npm run build:packs`);
      process.exit(1);
    }
    console.log("Compendium source matches the game data.");
  } else {
    const { written, removed, total } = writeGenerated();
    console.log(written.length || removed.length
      ? `Compendium source: wrote ${written.length}, removed ${removed.length} (of ${total} files).`
      : `Compendium source: nothing to change (${total} files).`);
  }
}

