import { ENT, NAMES, GROUND, TN, setSeed, die, step } from './core.mjs';
import { joint } from './odds.mjs';
import { rollTown, PUDDLECOMBE, THISTLEWICK, GALLOWSMERE } from './towns.mjs';
const pct = (x) => (100 * x).toFixed(1) + '%';
console.log('=== Chase ground: best die per row (rows 1..6), and P(Success) per round vs mob 10 / 11 / 12, Mask(local) and Monster ===');
const rows = (t) => GROUND.map((g) => Math.max(t[g[0]], t[g[1]]));
for (const n of NAMES) {
  const e = ENT[n];
  for (const [label, t] of e.hyde ? [['Jekyll', e.t], ['Hyde', e.hyde]] : [[n, e.t]]) {
    const r = rows(t);
    const out = [];
    for (const D of [8, 10, 11, 12]) {
      let mS = 0, mT = 0, MS = 0, MT = 0, wS = 0;
      for (const s of r) { const a = joint(s, 6, D), b = joint(s, 10, D), w = joint(step(s, -1), 10, D); mS += a.S / 6; mT += a.T / 6; MS += b.S / 6; MT += b.T / 6; wS += w.S / 6; }
      out.push(`D${D}: Mask ${pct(mS)}/${pct(mT)} Mon ${pct(MS)}/${pct(MT)} (weak Mon ${pct(wS)})`);
    }
    console.log(label.padEnd(10), r.map((x) => 'd' + x).join(' '), '|', out.join(' | '));
  }
}
console.log('\nTrait frequency in chase table rows:', TN.map((t, i) => `${t} ${GROUND.filter((g) => g.includes(i)).length}/6`).join(', '));

console.log('\n=== Rolled towns: structure (100k each) ===');
for (const lvl of ['Easy', 'Standard', 'Hard']) {
  setSeed(3); const R = 100000;
  let locs = 0, obs = 0, watchedLoc = 0, groupAny = 0, groupLast = 0, n12 = 0, has12 = 0, shared = 0, dist = { 6: 0, 8: 0, 10: 0, 12: 0 }, nObs = 0, wayGroup = 0, oneWayWatched = 0;
  const stats = { shared: 0 };
  for (let i = 0; i < R; i++) {
    const t = rollTown(lvl, stats);
    let any12 = false;
    for (const l of t.locs) {
      locs++;
      const all = [...l.waysIn, ...l.then];
      if (all.some((x) => x.watched)) watchedLoc++;
      if (all.some((x) => x.group)) groupAny++;
      const last = l.then.length ? l.then[l.then.length - 1] : null;
      if (last ? last.group : l.waysIn.some((x) => x.group)) groupLast++;
      if (l.waysIn.some((x) => x.group)) wayGroup++;
      for (const x of all) { dist[x.D]++; nObs++; if (x.D === 12) any12 = true; }
    }
    if (any12) has12++;
  }
  console.log(`${lvl}: watched locations ${pct(watchedLoc / locs)}, locations with any group obstacle ${pct(groupAny / locs)}, item guarded last by a group obstacle (or a group way in for 1-obstacle locations) ${pct(groupLast / locs)}, a way in is group ${pct(wayGroup / locs)}, towns with a 12 ${pct(has12 / R)}, shared places ${pct(stats.shared / R)} of towns`);
  console.log(`   Difficulty mix of all rolled obstacles: ` + Object.entries(dist).map(([k, v]) => `${k}: ${pct(v / nObs)}`).join(' '));
}
for (const t of [PUDDLECOMBE, THISTLEWICK, GALLOWSMERE]) {
  const all = t.locs.flatMap((l) => [...l.waysIn, ...l.then]);
  const d = {}; for (const x of all) d[x.D] = (d[x.D] || 0) + 1;
  console.log(`${t.name}: obstacles ${all.length}, watched ${all.filter((x) => x.watched).length}, group ${all.filter((x) => x.group).length}, Difficulty mix ${JSON.stringify(d)}`);
}
// P(two items share a place, and five of one kind)
setSeed(8); let five = 0, four = 0; const R = 1e6;
for (let i = 0; i < R; i++) { const seen = new Set(); const k = [0, 0, 0, 0, 0, 0, 0]; while (seen.size < 5) { const a = die(6), b = die(6); if (seen.has(a * 10 + b)) continue; seen.add(a * 10 + b); k[a]++; } const m = Math.max(...k); if (m >= 5) five++; if (m >= 4) four++; }
console.log(`\n5-item list: P(4+ of one kind) ${pct(four / R)}, P(5 of one kind) ${(100 * five / R).toFixed(3)}%`);
