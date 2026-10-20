import { setSeed, setRules, V1_RULES, V2_RULES } from './core.mjs';
import { DEFAULT_P } from './raid.mjs';
import { thistlewick, gallowsmere, puddlecombe, rollTown } from './towns.mjs';
import { raidStats } from './run2.mjs';
const P = { ...DEFAULT_P, lambdaBase: 0.03, lambdaSlope: 0.05 };
for (const [nm, r] of [['v0.1', V1_RULES], ['v0.2', V2_RULES], ['v0.2 but Limit 11', { ...V2_RULES, limits: { ...V2_RULES.limits, Standard: 11 } }], ['v0.2 but strongbox 8', { ...V2_RULES, thistleStrongbox: 8 }], ['v0.1 but Limit 10', { ...V1_RULES, limits: { ...V1_RULES.limits, Standard: 10 } }]]) {
  setRules(r); setSeed(1); const x = raidStats(thistlewick(), [3, 4, 5], 4000, P, `Thistlewick reckless, ${nm}`); console.log(x.line);
  setSeed(1); const y = raidStats(() => rollTown('Standard'), [3, 4, 5], 4000, P, `rolled Standard reckless, ${nm}`); console.log(y.line);
}
