/**
 * DON'T GET FORKED — the Demo compendiums' source (the Halloween one-shot, Lantern Night in Hallowby)
 * -------------------------------------------------------------------------------------------------
 * Part of tools/gen-pack-source.mjs's generate(): everything here is made from the one-shot's own files, so Foundry
 * says what the PDF says.
 *
 *   packs/_source/demo-entities/  the eight Entities as New Entity makes them (the book's defaults), each with its
 *                                 token and picture (assets/demo/tokens, drawn by tools/demo-art.mjs)
 *   packs/_source/demo-scenes/    The Castle (Part One) and Hallowby (the players' map, assets/demo/hallowby-map.jpg),
 *                                 its pins opening the script's page for each place
 *   packs/_source/demo-journal/   the script, page by page, converted from book/demo/chapters (the same words as the
 *                                 PDF; the hand-outs and the paper tracker stay in the PDF), and a guide to running
 *                                 it in Foundry
 *   packs/_source/demo-macros/    one macro: a new Easy raid with Hallowby's shopping list on the Raid HUD
 *   assets/maps/hallowby.svg      the Storyteller's map (book/tools/town-maps.mjs), for the town's page
 *
 * The pictures themselves are rendered by tools/demo-art.mjs (Chromium) and committed; the validator checks they exist.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DGF } from "../module/config.mjs";
import { SYSTEM_ID } from "../module/contracts.mjs";
import { townRaid } from "../module/logic/start-raid.mjs";
import { entitySystem } from "../module/logic/entity.mjs";
import { wayText } from "../book/tools/towns.mjs";
import { townMap } from "../book/tools/town-maps.mjs";
import { demoTown } from "../book/tools/demo-pages.mjs";
import { sceneMap } from "../book/tools/scene-map.mjs";
import { ROOT, makeId } from "./pack-config.mjs";

/** The players' map is rendered this many pixels wide (tools/demo-art.mjs); the scene and its pins use the same scale. */
export const DEMO_MAP_WIDTH = 4200;
/** A token's side on the map: one grid square, about a fifth of a place's yard. */
export const DEMO_GRID = 140;
export const SCRIPT_KEY = "lantern-night";
const ASSET = (p) => `systems/${SYSTEM_ID}/assets/${p}`;
const CHAPTERS = join(ROOT, "book", "demo", "chapters");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const low = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const textPage = (key, name, content) => ({ key, name, type: "text", text: { format: 1, content } });

/* ----------------------------------------------------------- entities -- */

/** The eight, as New Entity makes them, with their tokens: friendly, linked to the actor, named on hover. */
export function demoEntityDocs() {
  return DGF.entities.map((e) => ({
    key: e.key,
    name: e.name,
    img: ASSET(`demo/tokens/${e.key}.png`),
    system: entitySystem(e.key),
    prototypeToken: {
      name: e.name,
      texture: { src: ASSET(`demo/tokens/${e.key}.png`) },
      width: 1, height: 1, lockRotation: true,
      disposition: 1, displayName: 30, displayBars: 0,
      sight: { enabled: false },
    },
  }));
}

/* ------------------------------------------------------------ journal -- */

/** A chapter of the script as journal HTML: no headers or pictures, headings one level up, classes prefixed (ds-). */
export function scriptHtml(html) {
  let s = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<header class="chapter-head">[\s\S]*?<\/header>/g, "")
    .replace(/<figure\b[\s\S]*?<\/figure>/g, "")
    .replace(/<(\/?)h3\b/g, "<$1h2")
    .replace(/<(\/?)h4\b/g, "<$1h3")
    .replace(/ class="([^"]*)"/g, (_, c) => {
      const cls = c.split(/\s+/).filter((x) => x && !["keep", "opener", "chapter", "script"].includes(x)).map((x) => `ds-${x}`);
      return cls.length ? ` class="${cls.join(" ")}"` : "";
    })
    .replace(/\n\s*\n+/g, "\n")
    .trim();
  return `<div class="dgf-script">\n${s}\n</div>`;
}

/** The inside of a chapter file's <section>. */
const sectionOf = (file) => {
  const html = readFileSync(join(CHAPTERS, file), "utf8");
  return html.replace(/^[\s\S]*?<section\b[^>]*>/, "").replace(/<\/section>\s*$/, "");
};

/** The Places chapter, one page per place (the mirror goes with the tailor). */
const PLACE_PAGES = [
  ["tavern", /^1 · /], ["florist", /^2 · /], ["carpenter", /^3 · /], ["tailor", /^4 · /], ["tailor", /^The Mirror$/],
  ["lockup", /^The Lock-up$/], ["wayout", /^The Way Out$/],
];
function placePages() {
  const inner = sectionOf("35-places.html");
  const parts = inner.split(/(?=<h3>)/);
  const pages = [textPage("places", "The Places", scriptHtml(parts[0]))];
  for (const part of parts.slice(1)) {
    const title = (part.match(/^<h3>([\s\S]*?)<\/h3>/) ?? [])[1];
    const hit = PLACE_PAGES.find(([, re]) => re.test(title));
    if (!hit) throw new Error(`The Places: no page for "${title}"`);
    const body = part.replace(/^<h3>[\s\S]*?<\/h3>/, "");
    const old = pages.find((p) => p.key === hit[0]);
    if (old) old.text.content = old.text.content.replace(/\n<\/div>$/, `\n${scriptHtml(`<h3>${title}</h3>${body}`).replace(/^<div class="dgf-script">\n/, "")}`);
    else pages.push(textPage(hit[0], title, scriptHtml(body)));
  }
  return pages;
}

/** Hallowby at a glance: the town, its location key and the Storyteller's map (as the book's town pages). */
function glancePage(t) {
  const L = t.locations;
  const host = L.find((l) => l.furniture);
  const row = (step, o, tag = "") => `<tr><td><strong>${step}</strong> ${esc(o.name)}${o.group ? " <em>(group)</em>" : ""}${o.watched ? " <strong>watched</strong>" : ""}${tag ? ` <em>${tag}</em>` : ""}</td><td>${esc(wayText(o.quiet, o.quietText))}</td><td>${o.loud ? esc(wayText(o.loud, o.loudText)) : "—"}</td><td>${o.difficulty}</td></tr>`;
  const rows = L.flatMap((l) => [
    `<tr><th colspan="4">${l.n}. ${esc(cap(l.place))}: ${esc(l.item)} (${esc(l.kindName)})${l.essential ? " · <strong>essential</strong>" : ""}</th></tr>`,
    row("Way in", l.waysIn[0]), row("or", l.waysIn[1]), ...l.then.map((o) => row("Then", o)),
    ...(l.furniture ? [row("Then", l.furniture.obstacle, "for the piece")] : []),
  ]);
  const key = (readFileSync(join(CHAPTERS, "15-glance.html"), "utf8").match(/<p class="cue"><strong>Reading the key\.<\/strong>[\s\S]*?<\/p>/) ?? [""])[0];
  return textPage("glance", "Hallowby at a Glance", [
    `<div class="dgf-script">`,
    `<p><strong>${t.labelName}.</strong> ${esc(t.description)}</p>`,
    `<p><strong>Lantern Night:</strong> ${esc(t.custom)}</p>`,
    `<p><strong>The shopping list</strong> (${L.length} items):</p>`,
    `<ol>${L.map((l) => `<li>${l.essential ? `<strong>${esc(cap(l.item))}</strong> (essential)` : esc(cap(l.item))}</li>`).join("")}</ol>`,
    `<p><strong>The furniture:</strong> ${esc(low(host.furniture.name))} (Bulky: one carrier), at ${esc(host.place)} (${host.n}).</p>`,
    `<p><strong>Villagers:</strong> ${t.villagers.map((v) => `${esc(low(v.who))} (${esc(low(v.doing))})`).join("; ")}.</p>`,
    `<p><strong>${t.labelName}:</strong> Suspicion Limit ${t.limit}${t.limitFive !== t.limit ? ` (${t.limitFive} with five players)` : ""} · Difficulty: the way out ${t.wayOut.difficulty}, the lock-up ${t.lockup.difficulty} · the final flight: mob ${t.finalMob}, Lead ${DGF.lead.finalStart}, escape at ${t.finalEscape}.</p>`,
    `<table><thead><tr><th>Location · obstacle</th><th>Quiet way</th><th>Loud way</th><th>Difficulty</th></tr></thead><tbody>`,
    ...rows,
    `</tbody></table>`,
    key.replace(' class="cue"', ' class="ds-cue"'),
    `<p><img src="${ASSET("maps/hallowby.svg")}" alt="The Storyteller’s map of Hallowby: the four places, the lock-up and the way out; an eye on each watched place, a star at the mirror."></p>`,
    `</div>`,
  ].join("\n"));
}

/** The script, page by page: the same words as the PDF. */
function scriptDoc(t) {
  const chapter = (key, file, name) => textPage(key, name, scriptHtml(sectionOf(file)));
  return {
    key: SCRIPT_KEY,
    name: "Lantern Night in Hallowby (the script)",
    pages: [
      chapter("before", "10-before.html", "Before You Play"),
      glancePage(t),
      chapter("castle", "20-castle.html", "Part One: The Castle"),
      chapter("raid", "30-raid.html", "Part Two: Into Hallowby"),
      ...placePages(),
      chapter("happens", "40-happens.html", "When It Happens"),
      chapter("flight", "45-flight.html", "The Final Flight"),
      chapter("year", "50-year.html", "Part Three: How the Year Went"),
    ],
  };
}

/**
 * A ready-made game's macro: game.dontGetForked.raid.start (module/raid/start-raid.mjs) with the town's level and its
 * shopping list (module/logic/start-raid.mjs townRaid), the same for the one-shot and the three towns of Chapter 9.
 */
export function startMacroCommand(t, title = t.name) {
  const spec = townRaid(t);
  const items = spec.list.map((it) => `    { name: ${JSON.stringify(it.name)}, duty: ${JSON.stringify(it.duty)}, essential: ${it.essential} }`);
  return [
    `// ${title}: a new ${t.labelName} raid, with ${t.name}'s shopping list on the Raid HUD.`,
    `// Run it as the Storyteller once each player owns their Entity: the raid takes every Entity with a player owner.`,
    `return game.dontGetForked.raid.start({`,
    `  town: ${JSON.stringify(spec.town)}, difficulty: ${JSON.stringify(spec.difficulty)},`,
    `  list: [`,
    items.join(",\n"),
    `  ],`,
    `});`,
  ].join("\n");
}

/** How to set the one-shot up in Foundry, and what does what during it. Facts about the system only. */
function guideDoc(t, L, B) {
  const setup = [
    `<p>Everything for the one-shot is in the <strong>Demo</strong> folder of the Compendium Packs tab. The script is the same as the PDF’s; at the table the PDF’s Entity cards and tracker are for players without Foundry, and here the sheets and the Raid HUD do their jobs.</p>`,
    `<ol>`,
    `<li><strong>Bring it in.</strong> The first time the Storyteller opens a world, the system offers to set it up (or Configure Settings → ${B("DGF.Settings.demoImport.Label")}, tick <em>${L("DGF.Demo.name.hallowby")}</em>): the four Demo compendiums come into the world in folders named after them, keeping their IDs (the map’s pins open the script’s pages by them). By hand: right-click each Demo compendium and choose Import All Content, the script and guide first, then the scenes, the Entities and the macro, keeping the documents’ IDs if Foundry asks.</li>`,
    `<li><strong>The scenes.</strong> Activate <em>The Castle</em> for Part One, then <em>Hallowby</em> for Part Two. Hallowby has no grid: tokens stand anywhere, and every move takes one Turn, so where a token stands only says which place it’s at.</li>`,
    `<li><strong>The Entities.</strong> When the players have chosen (Part One), give each player Owner of their Entity (right-click the actor, Configure Ownership). Change Castle Duties on the sheets.</li>`,
    `<li><strong>Start the raid.</strong> Drag the macro <em>Hallowby: Start the Raid</em> to the hotbar and run it: a new ${t.labelName} raid on ${B("DGF.Raid.title")} window (the Raid HUD), Suspicion 0, Turn 1, with Hallowby’s list. Run it after the players own their Entities: the raid takes every Entity with a player owner (or tick ${B("DGF.Sheet.inRaid")} on a sheet).</li>`,
    `<li><strong>The tokens.</strong> Drag each Entity onto Hallowby, onto the yard at <em>The Way Out</em>: the party starts at the edge of town.</li>`,
    `</ol>`,
  ].join("\n");
  const during = [
    `<ul>`,
    `<li><strong>Reading.</strong> Open the script journal, or click a pin on the map: each place’s pin opens its page.</li>`,
    `<li><strong>Rolling.</strong> Players click a trait on their sheet. The roll dialog asks for the Mask or the Monster and the Difficulty (read it from the place’s page), offers abilities and friends’ help, and has ticks for Castle Duty, the loud way, watched, the way out, the furniture’s obstacle and the lock-up. Suspicion goes on the HUD by itself.</li>`,
    `<li><strong>Turns.</strong> ${B("DGF.Raid.nextTurn")} on the HUD at the end of each Turn. After the 12th comes dawn.</li>`,
    `<li><strong>Tell checks and crowds.</strong> ${B("DGF.Raid.tellCheck")} when the script says to make one; ${B("DGF.Raid.groupCheck")} before two or more roll the florist’s crowd in one Turn.</li>`,
    `<li><strong>Chases.</strong> Trouble at a watched obstacle opens ${B("DGF.Chase.title")} tracker for everyone; the final flight runs on it too. Captures show on the HUD at the lock-up.</li>`,
    `<li><strong>The end.</strong> When the party is out, ${B("DGF.Card.yearButton")} on the card gives the result and the epilogue; Part Three of the script says the same words.</li>`,
    `<li><strong>By hand.</strong> Every automation has a switch in Configure Settings, and the HUD has Suspicion and Turn buttons for anything the dice didn’t do.</li>`,
    `</ul>`,
  ].join("\n");
  return { key: "running-the-demo", name: "Running the Demo in Foundry", pages: [textPage("setup", "Setting up", setup), textPage("during", "During the game", during)] };
}

/* ------------------------------------------------------------- scenes -- */

export const sceneBase = { padding: 0, backgroundColor: "#141a1d", tokenVision: false, fog: { exploration: false }, environment: { globalLight: { enabled: true } }, navigation: true };

/** A pin opening one page of the script. */
const pin = (sceneKey, key, x, y, text = "") => ({
  key: `${sceneKey}-${key}`,
  entryId: makeId("demo-journal", SCRIPT_KEY), pageId: makeId("demo-journal", SCRIPT_KEY, key),
  x, y, elevation: 0, sort: 0,
  texture: { src: "icons/svg/book.svg" }, iconSize: 72,
  text, fontSize: 32, textAnchor: 1, textColor: "#efe6d2", global: false, flags: {},
});

export function demoSceneDocs(t) {
  const m = sceneMap(t);
  const k = DEMO_MAP_WIDTH / m.width;
  const W = DEMO_MAP_WIDTH, H = Math.round(m.height * k);
  return [
    {
      key: "castle", name: "The Castle",
      background: { src: ASSET("demo/castle.jpg") }, width: 2458, height: 1900,
      grid: { type: 0, size: DEMO_GRID }, initial: { x: 1229, y: 950, scale: 0.5 },
      ...sceneBase,
      notes: [pin("castle", "castle", 1229, 1560, "Part One")],
    },
    {
      key: "hallowby", name: "Hallowby",
      background: { src: ASSET("demo/hallowby-map.jpg") }, width: W, height: H, thumb: ASSET("demo/hallowby-thumb.jpg"),
      grid: { type: 0, size: DEMO_GRID }, initial: { x: Math.round(W / 2), y: Math.round(H / 2), scale: 0.35 },
      ...sceneBase,
      notes: Object.entries(m.places).map(([key, p]) => pin("hallowby", key, Math.round(p.x * k), Math.round(p.y * k))),
    },
  ];
}

/* --------------------------------------------------------------- all -- */

/** Every Demo document, by pack: { entities, scenes, journal, macros }, and the Storyteller's map. */
export function demoDocs({ L, B }) {
  const t = demoTown();
  return {
    entities: demoEntityDocs(),
    scenes: demoSceneDocs(t),
    journal: [scriptDoc(t), guideDoc(t, L, B)],
    macros: [{ key: "start-the-raid", name: "Hallowby: Start the Raid", type: "script", img: "icons/svg/fire.svg", command: startMacroCommand(t, "Lantern Night in Hallowby") }],
    map: townMap(t),
  };
}
