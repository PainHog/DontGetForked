// Exact single-roll odds for Don't Get Forked v0.1 (Chapter 3).
// Roll = trait die + second die (Mask d6 or Monster d10) vs Difficulty.
// Success >= D; Cost = 1-2 short; Trouble = 3+ short; Critical = Success on doubles.
// Monster shows if Monster die > trait die (Hypnotic Eyes: by 2+).
const SZ = [4, 6, 8, 10, 12];
const pct = (x) => (100 * x).toFixed(1).padStart(5);

export function joint(s, sec, D, thr = 1) {
  const v = { S: 0, C: 0, T: 0, crit: 0, show: 0, showT: 0, showNotT: 0, Tns: 0 };
  const n = s * sec;
  for (let a = 1; a <= s; a++) for (let b = 1; b <= sec; b++) {
    const m = a + b - D;
    const r = m >= 0 ? 'S' : m >= -2 ? 'C' : 'T';
    const sh = sec === 10 && b - a >= thr;
    v[r] += 1 / n;
    if (r === 'S' && a === b) v.crit += 1 / n;
    if (sh) { v.show += 1 / n; if (r === 'T') v.showT += 1 / n; else v.showNotT += 1 / n; }
    else if (r === 'T') v.Tns += 1 / n;
  }
  // expected Suspicion rise from the roll itself (one roll, one rise): Trouble +1, show +2
  v.rise = v.show * 2 + v.Tns * 1;
  v.pass = v.S + v.C;
  return v;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('=== Single roll: pass(S+C) / Success / Cost / Trouble / Critical / Monster shows / E[Suspicion from roll] ===');
  for (const D of [6, 8, 10, 12]) {
    console.log(`\n-- Difficulty ${D} --`);
    console.log('trait  | MASK d6: pass  succ  cost  trbl  crit  E[susp] | MONSTER d10: pass  succ  cost  trbl  crit  shows E[susp]');
    for (const s of SZ) {
      const m = joint(s, 6, D), M = joint(s, 10, D);
      console.log(`d${String(s).padEnd(3)}  |        ${pct(m.pass)} ${pct(m.S)} ${pct(m.C)} ${pct(m.T)} ${pct(m.crit)}  ${m.rise.toFixed(2)}   |           ${pct(M.pass)} ${pct(M.S)} ${pct(M.C)} ${pct(M.T)} ${pct(M.crit)} ${pct(M.show)} ${M.rise.toFixed(2)}`);
    }
  }
  console.log('\n=== Monster shows (any Difficulty) by trait die: normal vs Hypnotic Eyes (beat by 2+) ===');
  for (const s of SZ) console.log(`d${s}: ${pct(joint(s, 10, 8).show)}  hypnotic: ${pct(joint(s, 10, 8, 2).show)}`);

  console.log('\n=== Value of one charge (pass chance, Mask unless stated) ===');
  console.log('trait | D | base Mask | raise (Mask) | Monster w/o Susp | approach D-2 (Mask) ');
  for (const D of [8, 10, 12]) for (const s of SZ) {
    const base = joint(s, 6, D).pass;
    const up = SZ[Math.min(4, SZ.indexOf(s) + 1)];
    const raise = joint(up, 6, D).pass;
    const mon = joint(s, 10, D).pass;
    const appr = joint(s, 6, D - 2).pass;
    console.log(`d${String(s).padEnd(3)} ${String(D).padStart(2)} | ${pct(base)} | ${pct(raise)} (+${(100 * (raise - base)).toFixed(1)}) | ${pct(mon)} (+${(100 * (mon - base)).toFixed(1)}) | ${pct(appr)} (+${(100 * (appr - base)).toFixed(1)})`);
  }

  // Overall Critical rate for typical rolls: best die d10/d12 with Mask vs D8/D10
  console.log('\n=== Critical rate for typical rolls ===');
  for (const [s, sec, D] of [[12, 6, 8], [10, 6, 8], [12, 6, 10], [10, 6, 10], [8, 6, 8], [12, 10, 10], [12, 10, 11], [10, 10, 11]]) {
    const j = joint(s, sec, D);
    console.log(`d${s}+${sec === 6 ? 'Mask' : 'Monster'} vs ${D}: crit ${pct(j.crit)}  success ${pct(j.S)}`);
  }
}
