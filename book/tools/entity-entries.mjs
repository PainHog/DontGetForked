/**
 * Writes the eight Entities' powers in Chapter 2 (book/src/chapters/12-ch02.html) from the game data
 * (module/config.mjs, DGF.entities) and the spelled-out rules (module/logic/power-text.mjs), so the book says
 * exactly what the data does. Each entry keeps its hand-made heading, portraits and dice line; everything after the
 * dice line is generated: the signature, the Gift and its three versions, the three Perks, the Castle Duty, the
 * Weakness and the Tell. Rules first, flavour in italics. Each ability names its kind and says only what is its own
 * (powerShort); the four kinds are spelled out once, in a box before the first entry (between <!-- kinds --> markers,
 * generated from kindRules), so the entries don't repeat the same sentences (Richard, 2026-10-13).
 *   node book/tools/entity-entries.mjs           rewrite the entries
 *   node book/tools/entity-entries.mjs --check   fail if the chapter is out of date
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { DGF } from "../../module/config.mjs";
import { powerShort, kindRules, perkParts, weaknessTiming } from "../../module/logic/power-text.mjs";

export const CHAPTER = fileURLToPath(new URL("../src/chapters/12-ch02.html", import.meta.url));
const traitName = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const ctx = { traitName, ease: DGF.openApproachEase };
const em = (s) => (s ? ` <em>${s}</em>` : "");
const def = (x) => (x.default ? " (default)" : "");

/** The generated part of one entry: everything after its dice line. */
export function powersHtml(e) {
  const duty = DGF.duties.find((d) => d.key === e.duty);
  const L = [];
  L.push(`    <p class="pw-h"><strong>Signature: ${e.signature.name}</strong> <span class="pw-cost">1 charge</span></p>`);
  L.push(`    <p class="pw">${powerShort(e.signature, ctx)}${em(e.signature.flavour)}</p>`);
  L.push(`    <p class="pw-h"><strong>Gift: ${e.gift.name}</strong> <span class="pw-cost">pick one · 1 charge a use</span></p>`);
  L.push(`    <ul class="pw-list">`);
  for (const v of e.gift.versions) L.push(`      <li><strong>${v.name}</strong>${def(v)}: ${powerShort(v, ctx)}${em(v.text)}</li>`);
  L.push(`    </ul>`);
  L.push(`    <p class="pw-h"><strong>Perk</strong> <span class="pw-cost">pick one · always on</span></p>`);
  L.push(`    <ul class="pw-list">`);
  for (const k of e.perks) { const { rule, flavour } = perkParts(k); L.push(`      <li><strong>${k.name}</strong>${def(k)}: ${rule}${em(flavour)}</li>`); }
  L.push(`    </ul>`);
  L.push(`    <p class="pw-meta"><strong>Castle Duty</strong> (default): ${duty.name}, who shops for ${duty.kind}.</p>`);
  L.push(`    <p class="pw-meta"><strong>Weakness: ${e.weakness.name}.</strong> ${weaknessTiming[e.weakness.timing]}${em(e.weakness.text)}</p>`);
  L.push(`    <p class="pw-meta"><strong>Tell: ${e.tell.name}.</strong>${em(e.tell.text)}</p>`);
  return L.join("\n");
}

/** The box that spells out the four kinds of ability once, before the entries. */
export function kindsHtml() {
  const L = [
    `  <aside class="box list kinds"><h4>Four Kinds of Ability</h4>`,
    `    <p>Every Signature and Gift but Jekyll’s Draught does one of these four things. The entries name the kind, then add what is the ability’s own, such as its trait and where it works.</p>`,
    `    <ul>`,
    ...kindRules({ ease: DGF.openApproachEase }).map((k) => `      <li><strong>${k.name}</strong> ${k.rule}</li>`),
    `    </ul>`,
    `  </aside>`,
  ];
  return L.join("\n");
}

/** The chapter with the kinds box and every entry's powers rewritten. */
export function rewrite(html) {
  const re = /(<!-- kinds [^>]*-->)[\s\S]*?(<!-- \/kinds -->)/;
  if (!re.test(html)) throw new Error("Chapter 2 has no <!-- kinds … --> … <!-- /kinds --> markers");
  html = html.replace(re, (_, a, b) => `${a}\n${kindsHtml()}\n  ${b}`);
  return DGF.entities.reduce((out, e, i) => {
    const open = `<article class="entry" id="entity-${i + 1}">`;
    const a = out.indexOf(open);
    if (a < 0) throw new Error(`no entry ${i + 1} (${e.name}) in Chapter 2`);
    const b = out.indexOf("</article>", a);
    const lastDice = out.lastIndexOf('<p class="dice">', b);
    if (lastDice < a) throw new Error(`${e.name}: no dice line`);
    const afterDice = out.indexOf("</p>", lastDice) + "</p>".length;
    return `${out.slice(0, afterDice)}\n${powersHtml(e)}\n  ${out.slice(b)}`;
  }, html);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const now = readFileSync(CHAPTER, "utf8");
  const next = rewrite(now);
  if (process.argv.includes("--check")) {
    if (next !== now) { console.error("Chapter 2's entries are out of date with the game data: run node book/tools/entity-entries.mjs"); process.exit(1); }
    console.log("Chapter 2's entries match the game data.");
  } else {
    writeFileSync(CHAPTER, next);
    console.log("wrote 12-ch02.html (the eight entries' powers)");
  }
}
