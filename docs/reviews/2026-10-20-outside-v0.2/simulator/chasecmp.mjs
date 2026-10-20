// Local chase comparison, v0.1 (Limit 11/15) vs v0.2 (Limit 10/13), solo, default kit.
// Columns: clean escape (escaped, raid goes on) / captured / chase ends the raid (Limit reached, any outcome) / mean Suspicion added by the chase itself.
import { setSeed, NAMES, makeEntity, localChase, setRules, V1_RULES, V2_RULES } from './core.mjs';
import { DEFAULT_P } from './raid.mjs';
const pct = (x) => (100 * x).toFixed(0);
const charges = +(process.argv[2] || 0);
function row(name, S0, L, R = 20000) {
  let clean = 0, cap = 0, lim = 0, add = 0; setSeed(1000 + S0);
  for (let i = 0; i < R; i++) {
    const e = makeEntity(name); e.charges = charges;
    const st = { S: S0, L, mob: 11, esc: 5, hunt: false, suspLog: [], rolls: 0, crits: 0, troubles: 0, shows: 0, chargesSpent: 0, localChases: 0, flightParty: [], lastFree: 3 };
    const r = localChase([e], st, DEFAULT_P);
    const hit = st.S >= L || r === 'flight';
    if (r === 'captured') cap++; else if (!hit) clean++;
    if (hit) lim++; add += st.S - S0;
  }
  return `${pct(clean / R)} / ${pct(cap / R)} / ${pct(lim / R)}, +${(add / R).toFixed(1)}`;
}
for (const [lvl, L1, L2] of [['Standard', 11, 10], ['Hard', 15, 13]]) {
  console.log(`\n### ${lvl}: v0.1 Limit ${L1} vs v0.2 Limit ${L2}, ${charges} charges. clean escape / captured / Limit reached, +Suspicion`);
  console.log('| Entity | v0.1 start 0 | v0.2 start 0 | v0.1 start 4 | v0.2 start 4 | v0.1 start 8 | v0.2 start 8 |\n|---|---|---|---|---|---|---|');
  for (const n of NAMES) {
    const c = [];
    for (const S0 of [0, 4, 8]) { setRules(V1_RULES); c.push(row(n, S0, L1)); setRules(V2_RULES); c.push(row(n, S0, L2)); }
    console.log(`| ${n} | ${c.join(' | ')} |`);
  }
}
