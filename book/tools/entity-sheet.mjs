#!/usr/bin/env node
/**
 * Prints the Chapter 2 HTML for an Entity's approved picks, Weakness and Tell from
 * module/config.mjs, so the book entry and the Foundry data say the same thing.
 * The book is the source of truth: when the author changes an entry, change the
 * config to match and re-run this to check.   node book/tools/entity-sheet.mjs dracula
 */
import { DGF } from "../../module/config.mjs";

const TRAIT = { brawn: "Brawn", nimble: "Nimble", sly: "Sly", charm: "Charm", wits: "Wits" };
const effect = (v) => ({
  switch: `use ${TRAIT[v.trait]} instead of the trait called`,
  hidden: "roll the Monster die without risking Suspicion",
  raise: "raise a trait die one size",
  open: `open an approach with ${TRAIT[v.trait]}`,
})[v.effect];
const cap = (s) => s[0].toUpperCase() + s.slice(1);

export function sheetHtml(e) {
  const out = [];
  if (e.gift) {
    out.push(`<p class="pick"><strong>Gift: ${e.gift.name}.</strong> ${e.gift.versions.map((v) => `<em>${v.name}</em>${v.default ? " (default)" : ""}: ${effect(v)}. ${v.text}`).join(" · ")}</p>`);
  }
  if (e.perks) {
    out.push(`<p class="pick"><strong>Perk.</strong> ${e.perks.map((k) => `<em>${k.name}</em>${k.default ? " (default)" : ""}: ${k.text.replace(/^([“"]?)(\p{Lu})/u, (_, q, c) => q + c.toLowerCase())}`).join(" · ")}</p>`);
  }
  if (e.weakness) out.push(`<p class="sig"><strong>Weakness: ${e.weakness.name}</strong> (${cap(e.weakness.timing)}). ${e.weakness.text}</p>`);
  if (e.tell) out.push(`<p class="sig"><strong>Tell: ${e.tell.name}.</strong> ${e.tell.text}</p>`);
  return out.join("\n    ");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const key of process.argv.slice(2)) console.log(sheetHtml(DGF.entities.find((e) => e.key === key)));
}
