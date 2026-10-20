// Chapter 9 towns and the Chapter 8 random generator.
import { B, N, S, C, W, die, RULES } from './core.mjs';
const o = (name, quiet, loud, D, watched = false, group = false) => ({ name, quiet: [quiet], loud: loud === null ? [] : [loud], D, watched, group });

export const OBS_TABLE = [ // d20: name, quiet, loud, group
  ['heavy cellar trapdoor', B, null, false], ['tug-of-war', B, null, true], ['cart', B, N, false], ['bolted back gate', B, C, false],
  ['high garden wall', N, B, false], ['shuttered window', N, B, false], ['rooftops', N, null, true], ['rickety drainpipe', N, null, false],
  ['locked front door', S, B, false], ['nosy neighbour', S, W, false], ['crowded shop floor', S, null, true], ['muddy yard of geese', S, N, false],
  ['shopkeeper', C, S, false], ['guard dog', C, N, false], ['doorman', C, W, false], ['children in costumes', C, null, true],
  ['locked strongbox', W, C, false], ['dark back room', W, S, false], ['night watchman', W, null, false], ['maze of stalls', W, null, true],
];

const PUDDLECOMBE0 = {
  name: 'Puddlecombe', level: 'Easy', L: 0, wayOut: 6, mob: 10, esc: 5,
  locs: [
    { name: 'tavern cellar', items: [{ kind: 1, ess: true }], waysIn: [o('front door', S, B, 8, true), o('trapdoor', B, null, 8, true)], then: [o('back room', W, S, 6)] },
    { name: 'market garden', items: [{ kind: 2 }], waysIn: [o('garden wall', N, B, 8), o('geese', S, N, 6)], then: [o('night watchman', W, null, 8, true)] },
    { name: 'draper', items: [{ kind: 6 }], waysIn: [o('shopkeeper', C, S, 8, true), o('shuttered window', N, B, 10)], then: [] },
    { name: 'schoolhouse', items: [{ kind: 3 }], waysIn: [o('back gate', B, C, 8), o('drainpipe', N, null, 10)], then: [o('children', C, null, 8, true, true)] },
  ],
};
const THISTLEWICK0 = {
  name: 'Thistlewick', level: 'Standard', L: 0, wayOut: 8, mob: 11, esc: 5,
  locs: [
    { name: 'baker', items: [{ kind: 1, ess: true }], waysIn: [o('crowded shop floor', S, null, 8, true, true), o('shuttered window', N, B, 8)], then: [o('shopkeeper', C, S, 8, true)] },
    { name: 'china shop', items: [{ kind: 4, ess: true }], waysIn: [o('front door', S, B, 8), o('back gate', B, C, 10, true)], then: [o('back room', W, S, 8)] },
    { name: 'hatter', items: [{ kind: 6 }], waysIn: [o('nosy neighbour', S, W, 8, true), o('rooftops', N, null, 10, false, true)], then: [] },
    { name: 'ironmonger', items: [{ kind: 5 }], waysIn: [o('cart', B, N, 6), o('garden wall', N, B, 8)], then: [o('strongbox', W, C, 'STRONGBOX', true)] },
    { name: 'seed merchant', items: [{ kind: 2 }], waysIn: [o('maze', W, null, 8, false, true), o('geese', S, N, 6)], then: [o('night watchman', W, null, 10, true)] },
  ],
};
const GALLOWSMERE0 = {
  name: 'Gallowsmere', level: 'Hard', L: 0, wayOut: 10, mob: 11, esc: 6,
  locs: [
    { name: 'smithy', items: [{ kind: 5, ess: true }], waysIn: [o('back gate', B, C, 10, true), o('garden wall', N, B, 8, true)], then: [o('night watchman', W, null, 10, true)] },
    { name: 'silversmith', items: [{ kind: 4, ess: true }], waysIn: [o('front door', S, B, 10, true), o('shuttered window', N, B, 8, true)], then: [o('guard dog', C, N, 8, true), o('strongbox', W, C, 10)] },
    { name: 'printer', items: [{ kind: 3 }], waysIn: [o('nosy neighbour', S, W, 8, true), o('rooftops', N, null, 10, false, true)], then: [o('back room', W, S, 8)] },
    { name: 'tailor', items: [{ kind: 6 }], waysIn: [o('doorman', C, W, 10, true), o('drainpipe', N, null, 8)], then: [o('crowded shop floor', S, null, 10, true, true)] },
    { name: 'butcher', items: [{ kind: 1 }], waysIn: [o('geese', S, N, 8, true), o('cart', B, N, 10, true)], then: [o('shopkeeper', C, S, 10, true), o('tug-of-war', B, null, 12, false, true)] },
  ],
};

// The towns as the current RULES set them (v0.2: Limits 9/10/13, Thistlewick strongbox 10; v0.1: 11/11/15, 8).
function withRules(t) {
  return { ...t, L: RULES.limits[t.level], locs: t.locs.map((l) => ({ ...l, then: l.then.map((x) => (x.D === 'STRONGBOX' ? { ...x, D: RULES.thistleStrongbox } : x)) })) };
}
export const puddlecombe = () => withRules(PUDDLECOMBE0);
export const thistlewick = () => withRules(THISTLEWICK0);
export const gallowsmere = () => withRules(GALLOWSMERE0);

const LEVELS = {
  Easy: { items: 4, ess: () => 1, nObs: [10, 18, 20], diff: [[3, 6], [13, 8], [19, 10], [20, 12]], watch: 4, L: 0, wayOut: 6, mob: 10, esc: 5, max12: 1 },
  Standard: { items: 5, ess: () => (die(6) % 2 ? 1 : 2), nObs: [6, 15, 20], diff: [[3, 6], [13, 8], [19, 10], [20, 12]], watch: 5, L: 0, wayOut: 8, mob: 11, esc: 5, max12: 1 },
  Hard: { items: 5, ess: () => 2, nObs: [4, 13, 20], diff: [[8, 8], [17, 10], [20, 12]], watch: 6, L: 0, wayOut: 10, mob: 11, esc: 6, max12: 2 },
};

export function rollTown(level, stats) {
  const lv = LEVELS[level];
  const list = []; const seen = new Set();
  while (list.length < lv.items) { const k = die(6), it = die(6); if (seen.has(k * 10 + it)) continue; seen.add(k * 10 + it); list.push({ kind: k }); }
  const ne = lv.ess(); list.forEach((x, i) => { x.ess = i < ne; });
  // place items: d3 among the kind's 3 places; share if more items than places
  const used = new Map(); const locs = [];
  for (const it of list) {
    const k = it.kind; const taken = used.get(k) || [];
    if (taken.length >= 3) { const l = locs.find((x) => x.kind === k && x.items.length === 1) || locs.find((x) => x.kind === k); l.items.push(it); if (stats) stats.shared++; continue; }
    let p; do { p = Math.ceil(die(6) / 2); } while (taken.includes(p));
    taken.push(p); used.set(k, taken);
    locs.push({ name: `kind${k}-place${p}`, kind: k, items: [it] });
  }
  let n12 = 0;
  const rollD = () => {
    for (;;) {
      const r = die(20); const D = lv.diff.find(([hi]) => r <= hi)[1];
      if (D === 12) { if (n12 >= lv.max12) continue; n12++; }
      return D;
    }
  };
  const rollObs = (notQuiet) => {
    for (;;) {
      const r = OBS_TABLE[die(20) - 1];
      if (notQuiet !== undefined && r[1] === notQuiet) continue;
      return { name: r[0], quiet: [r[1]], loud: r[2] === null ? [] : [r[2]], D: rollD(), watched: die(10) <= lv.watch, group: r[3] };
    }
  };
  for (const l of locs) {
    const r = die(20); const n = r <= lv.nObs[0] ? 1 : r <= lv.nObs[1] ? 2 : 3;
    const a = rollObs(); const b = rollObs(a.quiet[0]);
    l.waysIn = [a, b]; l.then = []; for (let i = 1; i < n; i++) l.then.push(rollObs());
  }
  return { name: `rolled ${level}`, level, L: RULES.limits[level], wayOut: lv.wayOut, mob: lv.mob, esc: lv.esc, locs };
}

// Legacy names for the older experiment scripts (chase2, extra, misc, s3, trace, weak): v0.2 values at import time.
export const PUDDLECOMBE = puddlecombe(), THISTLEWICK = thistlewick(), GALLOWSMERE = gallowsmere();
