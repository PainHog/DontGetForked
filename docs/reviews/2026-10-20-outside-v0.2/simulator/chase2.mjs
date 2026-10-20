import { setSeed, NAMES, makeEntity, localChase } from './core.mjs';
import { DEFAULT_P } from './raid.mjs';
const pct = (x) => (100 * x).toFixed(1) + '%';
console.log('Local chase solo, Limit 11, 0 charges: escape / captured / ->flight, mean Susp added, mean rounds');
for (const lam of [0, 0.1, 0.3, 5]) {
  console.log(`-- chase Suspicion weight ${lam} (${lam >= 5 ? 'effectively Mask only' : lam === 0 ? 'ignore Suspicion' : ''}) --`);
  for (const n of ['Creature', 'Werewolf', 'Dracula', 'Witch']) {
    const row = [];
    for (const S0 of [0, 4, 8]) {
      let esc = 0, cap = 0, fl = 0, add = 0; const R = 20000; setSeed(11);
      for (let i = 0; i < R; i++) {
        const e = makeEntity(n); e.charges = 0;
        const st = { S: S0, L: 11, mob: 11, esc: 5, hunt: false, suspLog: [], rolls: 0, crits: 0, troubles: 0, shows: 0, chargesSpent: 0, localChases: 0, flightParty: [] };
        const r = localChase([e], st, { ...DEFAULT_P, lambdaChase: lam });
        if (r === 'escaped') esc++; else if (r === 'captured') cap++; else fl++;
        add += st.S - S0;
      }
      row.push(`S0=${S0}: ${pct(esc / R)}/${pct(cap / R)}/${pct(fl / R)} +${(add / R).toFixed(1)}`);
    }
    console.log(n.padEnd(9), row.join('   '));
  }
}
