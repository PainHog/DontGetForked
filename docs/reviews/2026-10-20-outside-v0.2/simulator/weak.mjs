import { setSeed, makeEntity, localChase } from './core.mjs';
import { DEFAULT_P } from './raid.mjs';
const pct = (x) => (100 * x).toFixed(1) + '%';
function run(name, over, S0) {
  let esc = 0, cap = 0, fl = 0, add = 0, rounds = 0; const R = 40000; setSeed(99);
  for (let i = 0; i < R; i++) {
    const e = makeEntity(name, over); e.charges = 0;
    const st = { S: S0, L: 11, mob: 11, esc: 5, hunt: false, suspLog: [], rolls: 0, crits: 0, troubles: 0, shows: 0, chargesSpent: 0, localChases: 0, flightParty: [] };
    const r = localChase([e], st, DEFAULT_P);
    if (r === 'escaped') esc++; else if (r === 'captured') cap++; else fl++;
    add += st.S - S0; rounds += st.rolls;
  }
  return `${pct(esc / R)} esc / ${pct(cap / R)} cap / ${pct(fl / R)} flight, +${(add / R).toFixed(1)} Susp, ${(rounds / R).toFixed(1)} rounds`;
}
for (const S0 of [0, 4]) {
  console.log(`-- start Suspicion ${S0} --`);
  console.log('Dracula, Always (as written):', run('Dracula', {}, S0));
  console.log('Dracula, if Soon            :', run('Dracula', { weak: 3 }, S0));
  console.log('Ghost, Always (as written)  :', run('Ghost', {}, S0));
  console.log('Ghost, if Soon              :', run('Ghost', { weak: 3 }, S0));
  console.log('Werewolf, Night Runner      :', run('Werewolf', {}, S0));
  console.log('Werewolf, no perk           :', run('Werewolf', { perk: 'none' }, S0));
  console.log('Mummy, Fear the Curse       :', run('Mummy', { perk: 'fearcurse' }, S0));
  console.log('Mummy, default              :', run('Mummy', {}, S0));
  console.log('Witch, Fly by Night         :', run('Witch', { perk: 'flybynight' }, S0));
  console.log('Dracula, Wall-Crawler       :', run('Dracula', { perk: 'wallcrawler' }, S0));
}
