/**
 * DON'T GET FORKED — Compendium Pack Builder
 * ------------------------------------------
 * Compiles the per-document source JSON in packs/_source/<name>/ into Foundry
 * LevelDB compendium packs in packs/<name>/ using Foundry's OFFICIAL
 * @foundryvtt/foundryvtt-cli `compilePack` — the same writer Foundry's own
 * systems use — so the on-disk format (including embedded-document hierarchy,
 * e.g. a JournalEntry's `pages: [ids]`) is exactly what Foundry expects.
 *
 * Our source stays human-friendly (a `key` slug, no ids); this script turns
 * each doc into a CLI-ready document with a deterministic 16-char `_id`, a
 * `_key`, `_stats`, and inline embedded pages and table results, stages them
 * outside the repo, then compiles. Packs are declared in tools/pack-config.mjs.
 *
 * The source of all three packs is generated from the game data, so the build
 * first regenerates it (tools/gen-pack-source.mjs), then compiles. The compiled
 * packs are committed: the release zips the repository as it is (it doesn't
 * build), and CI checks the committed packs against the source.
 *
 * Usage:  node tools/build-packs.mjs   |   node tools/build-packs.mjs --clean
 */

import { compilePack } from "@foundryvtt/foundryvtt-cli";
import { rmSync, mkdirSync, mkdtempSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { OUT, PACKS, makeId, readSource, toCliDoc, embeddedOf } from "./pack-config.mjs";
import { writeGenerated } from "./gen-pack-source.mjs";

/** Fail loudly if any two source entries would produce the same document id. */
function scanForDuplicateIds() {
  const seen = new Map();
  for (const def of PACKS) {
    readSource(def.file).forEach(raw => {
      if (!raw.key) throw new Error(`A document in ${def.file} has no "key".`);
      const check = (id, where) => {
        if (seen.has(id)) throw new Error(`Duplicate id ${id}: ${where} collides with ${seen.get(id)}`);
        seen.set(id, where);
      };
      check(makeId(def.out, raw.key), `${def.out}::${raw.key}`);
      embeddedOf(def, raw).forEach((sub, p) =>
        check(makeId(def.out, raw.key, sub.key ?? String(p)), `${def.out}::${raw.key}#${sub.key ?? p}`));
    });
  }
  console.log(`  id scan: ${seen.size} unique ids, no collisions.`);
}

async function buildPack(def, stagingRoot) {
  const staging = join(stagingRoot, def.out);
  mkdirSync(staging, { recursive: true });
  const raws = readSource(def.file);
  let pages = 0, results = 0;
  raws.forEach((raw, i) => {
    const doc = toCliDoc(def, raw, i);
    pages += doc.pages?.length ?? 0;
    results += doc.results?.length ?? 0;
    writeFileSync(join(staging, `${raw.key}.json`), JSON.stringify(doc, null, 2));
  });

  const outPath = join(OUT, def.out);
  if (existsSync(outPath)) rmSync(outPath, { recursive: true, force: true });
  await compilePack(staging, outPath, { log: false });

  const extra = pages ? ` (+${pages} pages)` : results ? ` (+${results} results)` : "";
  console.log(`  ✓ ${def.out.padEnd(10)} ${String(raws.length).padStart(3)} docs${extra}`);
  return raws.length;
}

async function main() {
  if (process.argv.includes("--clean")) {
    for (const def of PACKS) rmSync(join(OUT, def.out), { recursive: true, force: true });
    console.log(`Cleaned ${PACKS.length} compiled pack(s).`);
    return;
  }
  console.log("Building Don't Get Forked compendium packs (official foundryvtt-cli)…");
  const gen = writeGenerated();
  console.log(`  source: ${gen.total} generated files, ${gen.written.length} rewritten, ${gen.removed.length} removed.`);
  if (!PACKS.length) { console.log("  no packs configured yet (tools/pack-config.mjs PACKS is empty) — nothing to build."); return; }
  scanForDuplicateIds();
  const stagingRoot = mkdtempSync(join(tmpdir(), "dgf-packs-"));
  try {
    let total = 0;
    for (const def of PACKS) total += await buildPack(def, stagingRoot);
    console.log(`Done. ${total} primary documents across ${PACKS.length} packs.`);
  } finally {
    rmSync(stagingRoot, { recursive: true, force: true });
  }
}

main().catch(err => { console.error(err); process.exit(1); });
