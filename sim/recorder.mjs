/**
 * Counts what happens while the engine plays, and collects issue detectors
 * (sim/README.md §6). Detectors are keyed by a readable message and point at
 * the gaps listed in notes.mjs.
 */
const PHASES = ["raid", "slip", "local", "final"];

function emptyRolls() {
  return { n: 0, success: 0, cost: 0, trouble: 0, critDoubles: 0, critBeat4: 0, mask: 0, monster: 0, show: 0, margin: {} };
}

export class Recorder {
  constructor() {
    this.counts = {};
    this.detectors = {};
    this.rolls = Object.fromEntries(PHASES.map((p) => [p, emptyRolls()]));
  }

  count(key, n = 1) {
    this.counts[key] = (this.counts[key] || 0) + n;
  }

  detect(key, n = 1) {
    this.detectors[key] = (this.detectors[key] || 0) + n;
  }

  roll({ phase, band, second, show, critDoubles, critBeat4, margin }) {
    const r = this.rolls[phase];
    r.n++;
    if (margin >= 0) r.margin[margin] = (r.margin[margin] || 0) + 1;
    r[band]++;
    if (critDoubles) r.critDoubles++;
    if (critBeat4) r.critBeat4++;
    if (second === 6) r.mask++;
    else r.monster++;
    if (show) r.show++;
  }

  /** All phases summed (or a subset). */
  rollTotals(phases = PHASES) {
    const t = emptyRolls();
    for (const p of phases) {
      for (const k of Object.keys(t)) if (k !== "margin") t[k] += this.rolls[p][k];
      for (const [m, v] of Object.entries(this.rolls[p].margin)) t.margin[m] = (t.margin[m] || 0) + v;
    }
    return t;
  }

  merge(other) {
    for (const [k, v] of Object.entries(other.counts)) this.count(k, v);
    for (const [k, v] of Object.entries(other.detectors)) this.detect(k, v);
    for (const p of PHASES) {
      for (const k of Object.keys(this.rolls[p])) if (k !== "margin") this.rolls[p][k] += other.rolls[p][k];
      for (const [m, v] of Object.entries(other.rolls[p].margin)) this.rolls[p].margin[m] = (this.rolls[p].margin[m] || 0) + v;
    }
  }
}
