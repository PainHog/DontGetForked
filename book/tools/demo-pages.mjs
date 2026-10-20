/**
 * The generated parts of the Halloween one-shot, Lantern Night in Hallowby (book/demo/chapters, built with
 * node book/build.mjs --demo), so they say exactly what the game data says:
 *  - Hallowby at a glance: the town page in Chapter 9's form (book/tools/town-pages.mjs townBlock), from
 *    book/demo/hallowby.json, checked by the same rules as the book's towns (book/tools/towns.mjs);
 *  - its map, book/art/map-hallowby.svg (book/tools/town-maps.mjs);
 *  - the eight Entities as cards to hand out, with the book's defaults (module/config.mjs DGF.entities, spelled
 *    out by module/logic/power-text.mjs as Chapter 2 is), each with its two portraits as Chapter 2 prints them.
 * Each part sits between <!-- demo:NAME --> and <!-- /demo:NAME --> markers; the words around them are hand-written.
 *   node book/tools/demo-pages.mjs           rewrite the generated parts and the map
 *   node book/tools/demo-pages.mjs --check   fail if any is out of date
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { DGF } from "../../module/config.mjs";
import { powerRule, perkParts, weaknessTiming } from "../../module/logic/power-text.mjs";
import { loadTowns } from "./towns.mjs";
import { townBlock } from "./town-pages.mjs";
import { townMap } from "./town-maps.mjs";

export const DEMO_TOWN_FILE = new URL("../demo/hallowby.json", import.meta.url);
const CHAPTERS = new URL("../demo/chapters/", import.meta.url);
const CH2 = new URL("../src/chapters/12-ch02.html", import.meta.url);
const MAP = new URL("../art/map-hallowby.svg", import.meta.url);

/** The one-shot's town, resolved and checked (throws on any broken rule). */
export const demoTown = () => loadTowns(DEMO_TOWN_FILE)[0];

const traitName = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const ctx = { traitName, ease: DGF.openApproachEase };
const em = (s) => (s ? ` <em>${s}</em>` : "");
const diceLine = (dice) => DGF.traits.map((t) => `${traitName(t)} <strong>d${dice[t]}</strong>`).join(" · ");

/** Chapter 2's two portraits of an Entity, with the alt text the book gives them. */
function portraits(e, ch2) {
  return ["costume", "revealed"].map((k) => {
    const art = `${e.key}-${k}`;
    const alt = (ch2.match(new RegExp(`<figure class="art" data-alt="([^"]*)" data-art="${art}">`)) ?? [])[1];
    if (!alt) throw new Error(`Chapter 2 has no portrait ${art}`);
    return `<figure class="art" data-alt="${alt}" data-art="${art}"><figcaption>${k === "costume" ? "In costume" : "Revealed"}</figcaption></figure>`;
  }).join("");
}

/** One Entity's card: its dice, charges, and the book's defaults spelled out (Chapter 2). */
export function pregenCard(e, ch2 = readFileSync(CH2, "utf8")) {
  const gift = e.gift.versions.find((v) => v.default) ?? e.gift.versions[0];
  const perk = e.perks.find((p) => p.default) ?? e.perks[0];
  const { rule, flavour } = perkParts(perk);
  const duty = DGF.duties.find((d) => d.key === e.duty);
  const dice = e.forms
    ? Object.entries(e.forms).map(([f, d]) => `<p class="dice"><strong>${traitName(f)}:</strong> ${diceLine(d)}</p>`).join("")
    : `<p class="dice">${diceLine(e.dice)}</p>`;
  const L = [
    `<article class="pregen" id="pregen-${e.key}">`,
    `<div class="pg-art">${portraits(e, ch2)}</div>`,
    `<div class="pg-body">`,
    `<h3 class="pg-name">${e.name}</h3>`,
    dice,
    `<p class="pg-charges">Charges: <span class="box-check"></span><span class="box-check"></span><span class="box-check"></span> (${DGF.charges}: one per use of an ability)</p>`,
    `<p class="pw-h"><strong>Signature: ${e.signature.name}</strong> <span class="pw-cost">1 charge</span></p>`,
    `<p class="pw">${powerRule(e.signature, ctx)}${em(e.signature.flavour)}</p>`,
    `<p class="pw-h"><strong>Gift: ${e.gift.name} (${gift.name})</strong> <span class="pw-cost">1 charge</span></p>`,
    `<p class="pw">${powerRule(gift, ctx)}${em(gift.text)}</p>`,
    `<p class="pw-h"><strong>Perk: ${perk.name}</strong> <span class="pw-cost">always on</span></p>`,
    `<p class="pw">${rule}${em(flavour)}</p>`,
    `<p class="pw-meta"><strong>Castle Duty</strong> (default): ${duty.name}, who shops for ${duty.kind}. Your trait die is one size bigger on your own rolls at a location whose item is that kind (never in a chase).</p>`,
    `<p class="pw-meta"><strong>Weakness: ${e.weakness.name}.</strong> ${weaknessTiming[e.weakness.timing]}${em(e.weakness.text)}</p>`,
    `<p class="pw-meta"><strong>Tell: ${e.tell.name}.</strong>${em(e.tell.text)}</p>`,
    `<p class="pg-help">Spend a charge before rolling, on your own roll or a friend’s in the same place (in a local chase, only your own). One raise per roll. In the final flight, any ability can be a raise. With no charges left you can still overdraw: Suspicion +2 on top (${e.weakness.timing === "always" ? "never in the final flight, where your Weakness is already in play" : "in the final flight, your Weakness instead"}).</p>`,
    `</div>`,
    `</article>`,
  ];
  // the cards stand without the rulebook: its chapter references go
  return L.join("\n").replace(/ \(Chapter \d+\)/g, "");
}

/** Every generated part: file in book/demo/chapters → { marker name → html }. */
export function demoParts(t = demoTown()) {
  const ch2 = readFileSync(CH2, "utf8");
  return {
    "15-glance.html": { glance: townBlock(t, { newPage: false }) },
    "60-pregens.html": { pregens: DGF.entities.map((e) => pregenCard(e, ch2)).join("\n") },
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const check = process.argv.includes("--check");
  const t = demoTown();
  const stale = [];
  for (const [file, parts] of Object.entries(demoParts(t))) {
    const url = new URL(file, CHAPTERS);
    const now = readFileSync(url, "utf8");
    let next = now;
    for (const [name, html] of Object.entries(parts)) {
      const re = new RegExp(`(<!-- demo:${name} [^>]*-->)[\\s\\S]*?(<!-- /demo:${name} -->)`);
      if (!re.test(next)) throw new Error(`${file} has no <!-- demo:${name} … --> … <!-- /demo:${name} --> markers`);
      next = next.replace(re, (_, a, b) => `${a}\n${html}\n${b}`);
    }
    if (next !== now) { stale.push(file); if (!check) writeFileSync(url, next); }
  }
  const svg = townMap(t);
  let old = "";
  try { old = readFileSync(MAP, "utf8"); } catch {}
  if (old !== svg) { stale.push("map-hallowby.svg"); if (!check) writeFileSync(MAP, svg); }
  if (check && stale.length) { console.error(`out of date: ${stale.join(", ")} — run node book/tools/demo-pages.mjs`); process.exit(1); }
  console.log(check ? "The one-shot's generated pages match the game data." : stale.length ? `wrote ${stale.join(", ")}` : "nothing to change");
}
