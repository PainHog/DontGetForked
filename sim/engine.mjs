/**
 * Plays one raid strictly by docs/CORE-RULES.md draft 0.2 (and the DESIGN
 * Decisions log it summarises). Comments cite the passage each step follows.
 * Where the rules leave something open, the choice is a named parameter
 * (params.mjs PARAMS); where the players choose, the choice is a documented
 * policy (also in PARAMS, kind "policy").
 *
 * Abstractions (stated up front, sim/README.md §1):
 *  - the party moves together (splitting is not modelled); a freed captive
 *    rejoins it at once;
 *  - one list item per location; a location's obstacles are passed in order;
 *  - no map, distances or entrances (so "Huge pieces don't fit small entrances"
 *    is not modelled);
 *  - Perks are not modelled; Gifts, Duties, Weaknesses and Tells are placeholders
 *    (entities.mjs).
 */
import { MASK, MONSTER, stepUp, stepDown, band, isCritical, outcomeDist, majorityMove, leadMove, monsterShows } from "./rules.mjs";
import { abilitiesOf } from "./entities.mjs";
import { rescueObstacle, CHASE_TABLE } from "./town.mjs";

const LADDER = ["bust", "partial", "win", "grand"];

/** Play one raid. Returns a summary; detailed counts go to `rec`. */
export function playRaid({ party, town, params: P, numbers: N, rng, rec }) {
  const S = {
    party, town, P, N, rng, rec,
    L: town.L,
    susp: 0,
    limit: town.L.limit,
    turn: 0,
    turns: town.L.turns,
    phase: "raid", // raid | done
    at: null, // current location (null = edge of town)
    rescue: null, // the lock-up's current rescue obstacle
    finalTrigger: null,
    forked: false,
    captures: 0,
    wentForFurniture: false,
    furnitureCarried: null,
    skipped: new Set(),
  };
  // furnitureRule "hardLoc"/"both" (S7 candidate): the furniture's location is 2 harder (at most 12).
  if (P.furnitureRule === "hardLoc" || P.furnitureRule === "both") for (const o of town.furnitureLoc.obstacles) o.difficulty = Math.min(12, o.difficulty + 2);
  // furniturePlace "onList" (S7 candidate): the piece stands at one of the list's locations, behind one extra
  // obstacle the party may take on once that location's loot is in hand; no separate trip.
  if (P.furniturePlace === "onList") {
    const host = rng.pick(town.locations);
    const fl = town.furnitureLoc;
    host.furniturePending = { size: fl.furniture.size, obstacle: fl.obstacles[fl.obstacles.length - 1] };
    fl.done = true;
  }
  for (const m of party) {
    m.status = "active";
    m.items = [];
    m.furniture = null;
    m.nextStepDown = 0;
    m.loseTurn = false;
    m.charges = m.chargesStart;
  }

  while (S.phase === "raid") {
    // P5: at dawn, anyone still in town starts the final flight.
    if (S.turn >= S.turns) { finalFlight(S, "dawn"); break; }
    let target = chooseTarget(S);
    if (target === "leave") {
      if (S.P.exitRule === "free" || (S.P.exitRule === "gateCarriers" && !S.furnitureCarried)) { S.turn++; leaveTown(S); break; }
      target = exitLocation(S); // exitRule "gate": getting out is a group check like any other
    }
    if (target === "wait") { S.turn++; captivesAct(S); continue; }
    if (S.at !== target) {
      // P4: each Turn, every Entity either rolls once or moves.
      S.turn++;
      // furnitureRule "slow"/"noisySlow" (S7 candidate): carrying furniture, a move takes two Turns.
      if (S.furnitureCarried && (S.P.furnitureRule === "slow" || S.P.furnitureRule === "noisySlow")) { S.turn++; noisyFurniture(S); if (S.phase !== "raid") break; }
      S.at = target;
      arrive(S, target);
      if (S.phase !== "raid") break;
      captivesAct(S);
      if (S.phase !== "raid") break;
      continue;
    }
    S.turn++;
    workLocation(S, target);
    if (S.phase !== "raid") break;
    captivesAct(S);
    if (S.phase !== "raid") break;
    noisyFurniture(S);
  }
  return summarise(S);
}

/** furnitureRule "noisy"/"both" (S7 candidate): +1 Suspicion at the end of each Turn a piece is carried in town. */
function noisyFurniture(S) {
  if (!S.furnitureCarried || !["noisy", "both", "noisySlow"].includes(S.P.furnitureRule)) return;
  addSusp(S, 1, "furniture");
  if (limitHit(S)) finalFlight(S, "limit");
}

// ---------------------------------------------------------------- helpers

const active = (S) => S.party.filter((m) => m.status === "active");
const captives = (S) => S.party.filter((m) => m.status === "captured");
const carriedItems = (S) => S.party.flatMap((m) => (m.status === "active" ? m.items : []));

/** Raise Suspicion. DESIGN: one town-wide track to a Limit; at the Limit the whole town hunts. */
function addSusp(S, n, why) {
  if (n <= 0) return;
  const before = S.susp;
  S.susp = Math.min(S.limit, S.susp + n);
  S.rec.count(`susp:${why}`, S.susp - before);
  if (S.susp - before < n) S.rec.detect("suspicion past the Limit (lost)", n - (S.susp - before));
}

function limitHit(S) {
  return S.susp >= S.limit;
}

function turnsLeft(S) {
  return S.turns - S.turn;
}

// ---------------------------------------------------------------- the plan (player policy)

function locationNeed(S, loc) {
  const left = loc.obstacles.filter((o) => !o.cleared).length;
  return (S.at === loc ? 0 : 1) + left;
}

/**
 * Policy: essentials first, then rescue any captive, then extras, then
 * furniture (furniturePolicy), then leave. Skip a location when the Turns left
 * can't cover it plus leaving. Leave early when Suspicion is one step from the
 * Limit and the essentials are in hand.
 */
function chooseTarget(S) {
  const act = active(S);
  if (act.length === 0) return captives(S).length ? "wait" : "leave";
  const left = turnsLeft(S);
  const ess = S.town.locations.filter((l) => !l.done && !S.skipped.has(l) && l.items.some((i) => i.essential));
  const ext = S.town.locations.filter((l) => !l.done && !S.skipped.has(l) && !l.items.some((i) => i.essential));
  const haveEssentials = S.town.items.filter((i) => i.essential).every((i) => carriedItems(S).includes(i));
  const headroom = S.limit - S.susp;

  if (haveEssentials && headroom <= 1 && captives(S).length === 0) return "leave";

  const exitNeed = S.P.exitRule === "free" ? 1 : 2;
  const feasible = (loc) => locationNeed(S, loc) + exitNeed <= left;
  for (const l of ess) {
    if (feasible(l)) return l;
    S.skipped.add(l);
  }
  if (captives(S).length) {
    const need = (S.at && S.at.id === "lockup" ? 0 : 1) + 2;
    if (need + exitNeed <= left) return lockupLocation(S);
  }
  const pol = S.P.furniturePolicy;
  if (pol === "always") {
    const f = furnitureTarget(S, haveEssentials, headroom, left);
    if (f) return f;
  }
  for (const l of ext) {
    if (feasible(l)) return l;
    S.skipped.add(l);
  }
  if (pol === "ifSafe") {
    const f = furnitureTarget(S, haveEssentials, headroom, left);
    if (f) return f;
  }
  return "leave";
}

/** furniturePolicy: "always" goes once the essentials are in hand; "ifSafe" also wants Suspicion and Turns to spare. */
function furnitureTarget(S, haveEssentials, headroom, left) {
  const fl = S.town.furnitureLoc;
  if (fl.done || S.skipped.has(fl) || S.furnitureCarried) return null;
  if (active(S).length < (fl.furniture.size === "huge" ? 2 : 1)) return null;
  if (!haveEssentials) return null;
  const need = locationNeed(S, fl);
  const exitNeed = S.P.exitRule === "free" ? 1 : 2;
  const ok = S.P.furniturePolicy === "always" ? need + exitNeed <= left : headroom >= 3 && need + exitNeed + 1 <= left;
  if (!ok) { S.skipped.add(fl); return null; }
  S.wentForFurniture = true;
  return fl;
}

/**
 * exitRule (gap G15, S4): the way out of town is one watched obstacle — Sly or
 * Nimble, or Brawn the loud way. "gate": a group check for everyone;
 * "gateSingle": one Entity's roll gets the party out; "gateCarriers": a group
 * check only for furniture carriers (everyone else walks out).
 */
function exitLocation(S) {
  if (!S.exitLoc) {
    S.exitLoc = {
      id: "exit", kind: null, items: [], furniture: null, done: false,
      obstacles: [{
        options: [{ trait: "sly", loud: false }, { trait: "nimble", loud: false }, { trait: "brawn", loud: true }],
        difficulty: S.L.exit, witnessed: true, group: S.P.exitRule !== "gateSingle", cleared: false, passed: new Set(),
      }],
    };
  }
  if (S.P.exitRule === "gateCarriers") for (const m of active(S)) if (!m.furniture) S.exitLoc.obstacles[0].passed.add(m.id);
  return S.exitLoc;
}

function lockupLocation(S) {
  if (!S.lockupLoc) S.lockupLoc = { id: "lockup", kind: null, obstacles: [], items: [], furniture: null, done: false };
  if (!S.rescue || S.rescue.cleared) S.rescue = rescueObstacle(S.town);
  S.lockupLoc.obstacles = [S.rescue];
  return S.lockupLoc;
}

// ---------------------------------------------------------------- arriving, working, leaving

/** Placeholder Tells: each Entity may give itself away on arriving where there are witnesses. */
function arrive(S, loc) {
  // T3: one check the first time anyone reaches each watched location.
  if (loc.tellChecked) return;
  loc.tellChecked = true;
  if (!loc.obstacles.some((o) => o.witnessed || (o.alt && S.P.waysIn === "two" && o.alt.witnessed))) return;
  // tellScope "party" (S5 candidate): one chance for the whole party, as likely as four Entities' together.
  const who = S.P.tellScope === "party" ? [null] : active(S);
  const chance = S.P.tellScope === "party" ? Math.min(1, 1 - (1 - S.P.tellChance) ** 4) : S.P.tellChance;
  for (const m of who) {
    if (S.rng.chance(chance)) {
      addSusp(S, 1, "tell"); // DESIGN Suspicion package: a Tell +1 when triggered (its own event)
      S.rec.count("tells");
      if (limitHit(S)) return finalFlight(S, "limit");
    }
  }
}

/** One Turn of work at a location: every available Entity rolls once (P4). */
function workLocation(S, loc) {
  const acted = new Set();
  const tried = new Set();
  for (const m of active(S)) if (m.loseTurn) { m.loseTurn = false; acted.add(m); S.rec.count("lost turns"); }

  while (S.phase === "raid") {
    const ob = loc.obstacles.find((o) => !o.cleared);
    if (!ob) break;
    const avail = active(S).filter((m) => !acted.has(m));
    if (avail.length === 0) break;
    if (ob.alt) pickWayIn(S, ob, loc, avail);

    if (ob.group) {
      // P6: everyone rolls and gets through on their own result; Suspicion rises once, by the worst.
      // groupRule "best3" (S5 candidate): at most three roll, and the rest get through with them.
      const cap = S.P.groupRule === "best3" ? 3 : S.P.groupRule === "best4" ? 4 : Infinity;
      const need = Math.min(cap, active(S).length);
      const passedNow = () => active(S).filter((m) => ob.passed.has(m.id)).length;
      if (passedNow() >= need) { ob.cleared = true; continue; }
      let rollers = avail.filter((m) => !ob.passed.has(m.id)).map((m) => ({ m, plan: planRoll(S, m, ctxFor(S, m, ob, loc, "raid")) }));
      if (cap < Infinity) rollers = rollers.sort((a, b) => b.plan.value - a.plan.value).slice(0, need - passedNow());
      if (rollers.length === 0) { ob.cleared = true; continue; }
      let worst = 0;
      const caught = [];
      for (const { m, plan } of rollers) {
        acted.add(m);
        if (plan.value <= 0 && rollers.length > 1) S.rec.count("group: forced low-value roll");
        const r = executeRoll(S, m, plan, "raid");
        worst = Math.max(worst, r.suspGain);
        if (r.band !== "trouble") ob.passed.add(m.id);
        if (r.caught) caught.push(m);
      }
      S.rec.count("group checks");
      addSusp(S, worst, "roll");
      if (limitHit(S)) return finalFlight(S, "limit");
      if (caught.length > 1 && S.P.multiCaught === "shared") {
        groupChase(S, caught); // S11 candidate: one chase on a shared Lead (majority rule)
        if (S.phase !== "raid") return;
      } else {
        for (const m of caught) {
          localChase(S, m);
          if (S.phase !== "raid") return;
        }
      }
      if (active(S).length === 0) break;
      if (passedNow() >= Math.min(cap, active(S).length)) ob.cleared = true;
      continue;
    }

    // A single obstacle: the best-placed available Entity tries it.
    // triesPerTurn "one" (S11 candidate): only one Entity may try a given obstacle each Turn.
    if (S.P.triesPerTurn === "one" && tried.has(ob)) break;
    let best = null;
    for (const m of avail) {
      const plan = planRoll(S, m, ctxFor(S, m, ob, loc, "raid"));
      if (!best || plan.value > best.plan.value) best = { m, plan };
    }
    if (best.plan.value <= 0) { S.rec.count("declined rolls"); break; }
    acted.add(best.m);
    tried.add(ob);
    const r = executeRoll(S, best.m, best.plan, "raid", { noCost: loc.id === "exit" }); // T4: an exit Cost costs nothing more
    addSusp(S, r.suspGain, "roll");
    if (r.band !== "trouble") ob.cleared = true;
    if (limitHit(S)) return finalFlight(S, "limit");
    if (r.caught) {
      localChase(S, best.m);
      if (S.phase !== "raid") return;
    }
  }

  if (S.phase === "raid" && active(S).length && loc.obstacles.every((o) => o.cleared)) completeLocation(S, loc);
}

/**
 * T2: the first obstacle comes in two versions (front door or back window); the
 * party picks one, the version its best-placed Entity likes better, and keeps it.
 */
function pickWayIn(S, ob, loc, avail) {
  const alt = ob.alt;
  delete ob.alt;
  if (S.P.waysIn !== "two") return;
  const bestValue = (o) => Math.max(...avail.map((m) => planRoll(S, m, ctxFor(S, m, o, loc, "raid")).value));
  if (bestValue(alt) > bestValue(ob)) Object.assign(ob, { options: alt.options, difficulty: alt.difficulty, witnessed: alt.witnessed, group: alt.group });
}

function completeLocation(S, loc) {
  if (loc.done) return;
  if (loc.id === "exit") return leaveTown(S);
  if (loc.id === "lockup") {
    for (const c of captives(S)) freeCaptive(S, c, "rescued");
    loc.done = false; // a later capture needs a new rescue
    return;
  }
  const act = active(S);
  if (act.length === 0) return; // everyone was caught: nobody is here to take the loot
  loc.done = true;
  if (!loc.itemsTaken) {
    loc.itemsTaken = true;
    for (const it of loc.items) {
      const holder = act.reduce((a, b) => (b.items.length < a.items.length ? b : a), act[0]);
      holder.items.push(it);
    }
  }
  if (loc.furniturePending && wantsFurnitureHere(S, loc)) {
    // furniturePlace "onList": take on the extra obstacle; the piece is carried once it is cleared.
    loc.obstacles.push(loc.furniturePending.obstacle);
    loc.furniture = { size: loc.furniturePending.size };
    loc.furniturePending = null;
    loc.done = false;
    S.wentForFurniture = true;
    return;
  }
  if (loc.furniture && !S.furnitureCarried) {
    // Carrying (DESIGN): Bulky = one carrier, Huge = two. Policy: the Entities with the smallest Nimble carry.
    const n = loc.furniture.size === "huge" ? 2 : 1;
    const carriers = [...act].sort((a, b) => a.ent.dice.nimble - b.ent.dice.nimble).slice(0, n);
    if (carriers.length === n) {
      const piece = { ...loc.furniture, carriers: carriers.map((c) => c.id) };
      for (const c of carriers) c.furniture = piece;
      S.furnitureCarried = piece;
    }
  }
}

/**
 * Policy for furniturePlace "onList": "always" takes it whenever there are carriers;
 * "ifSafe" wants Suspicion to spare (headroom ≥ 3) and Turns for the rest of the list
 * plus 2; "never" never does.
 */
function wantsFurnitureHere(S, loc) {
  const pol = S.P.furniturePolicy;
  if (pol === "never") return false;
  if (active(S).length < (loc.furniturePending.size === "huge" ? 2 : 1)) return false;
  if (pol === "always") return true;
  const rest = S.town.locations.filter((l) => !l.done && l !== loc).reduce((a, l) => a + locationNeed(S, l), 0);
  return S.limit - S.susp >= 3 && rest + 1 + 2 + 2 <= turnsLeft(S);
}

function dropFurniture(S, why) {
  const piece = S.furnitureCarried;
  if (!piece) return;
  for (const m of S.party) if (m.furniture === piece) m.furniture = null;
  S.furnitureCarried = null;
  S.rec.count(`furniture dropped: ${why}`);
}

function leaveTown(S) {
  for (const m of active(S)) m.status = "home";
  for (const m of captives(S)) m.status = "left";
  S.phase = "done";
  S.finalTrigger = S.finalTrigger || null;
}

// ---------------------------------------------------------------- rolls

function ctxFor(S, m, ob, loc, phase) {
  const helpers = active(S).filter((h) => h !== m);
  return {
    phase, options: ob.options, difficulty: ob.difficulty, witnessed: ob.witnessed,
    helpers, locKind: loc ? loc.kind : null, weakness: false,
  };
}

function chargeCost(S, phase) {
  const late = turnsLeft(S) <= 3;
  if (S.P.chargePolicy === "hoard") return phase === "raid" ? 0.35 : 0.04;
  return phase === "raid" ? (late ? 0.02 : 0.08) : 0.02;
}

/**
 * Overdraw (CORE-RULES Abilities) once the hunt is on (gap G4, overdrawAtLimit):
 * free; forbidden; "weakness" = allowed, but the overdrawing Entity's Weakness is
 * in play for the rest of the flight (so not when it already is); "fury" = allowed,
 * its +2 feeds the mob's fury instead of Suspicion.
 */
function overdrawAllowed(S, phase, owner, ctx) {
  if (phase !== "final") return true;
  const r = S.P.overdrawAtLimit;
  if (r === "forbidden") return false;
  if (r === "weakness") return !(ctx && ctx.weakOf && ctx.weakOf(owner));
  return true;
}

/** Usable ability sources: {owner, ability}. An owner at zero may overdraw if allowed. */
function sources(S, m, ctx, effect) {
  const out = [];
  const owners = ctx.phase === "local" || ctx.phase === "slip" ? [m] : [m, ...ctx.helpers]; // P7: same location
  for (const o of owners) {
    for (const ab of abilitiesOf(o)) {
      if (ab.effect !== effect) continue;
      if (o.charges > 0 || overdrawAllowed(S, ctx.phase, o, ctx)) out.push({ owner: o, ability: ab });
    }
  }
  // Prefer owners with the most charges left.
  return out.sort((a, b) => b.owner.charges - a.owner.charges);
}

function applySteps(base, net) {
  if (net > 0) return stepUp(base, net);
  if (net < 0) { const r = stepDown(base, -net); return { die: r.die, over: 0, under: r.under }; }
  return { die: base, over: 0, under: 0 };
}

/**
 * Choose how to make one roll (player policy, monsterPolicy / chargePolicy):
 * which listed trait (or an ability's trait), Mask or Monster, and which
 * abilities to spend. Evaluates every combination exactly.
 */
function planRoll(S, m, ctx) {
  const P = S.P;
  const phase = ctx.phase;
  const cands = ctx.options.map((o) => ({ trait: o.trait, loud: o.loud, quiet: false, via: null }));
  for (const ab of abilitiesOf(m)) {
    if (!(m.charges > 0 || overdrawAllowed(S, phase, m, ctx))) continue;
    if (ab.effect === "switch") cands.push({ trait: ab.trait, loud: false, quiet: false, via: { owner: m, ability: ab } });
    if (ab.effect === "open") {
      // openTrait "unlisted" (T5): only an approach the obstacle doesn't already offer, and never in a chase.
      if (P.openTrait === "unlisted" && (phase === "local" || phase === "final" || ctx.options.some((o) => o.trait === ab.trait))) continue;
      // openApproach (gap G3, S10): "quiet" = unwatched; "switch" = just the ability's trait;
      // "easier" = the ability's trait at Difficulty 2 lower, watched as usual.
      const quiet = phase === "raid" && P.openApproach === "quiet";
      const easier = (phase === "raid" || (phase === "slip" && P.openTrait === "unlisted")) && P.openApproach === "easier" ? 2 : 0; // T5: the lock-up is an obstacle too
      cands.push({ trait: ab.trait, loud: false, quiet, easier, via: { owner: m, ability: ab } });
    }
  }
  const raiseSrc = sources(S, m, ctx, "raise");
  const hiddenSrc = sources(S, m, ctx, "hidden");
  const carrying = !!m.furniture;
  let seconds;
  const MON = P.monsterRule === "d8" ? 8 : MONSTER;
  if (carrying || phase === "final") seconds = [MON]; // carrying: no Mask; S1: once the hunt is on the Mask is off
  else if (P.monsterPolicy === "mask") seconds = [MASK];
  else if (P.monsterPolicy === "monster") seconds = [MON];
  else seconds = [MASK, MON];
  const tie = P.monsterRule === "tie";
  const showVal = P.monsterRule === "plus2" ? 2 : 1;

  const headroom = S.limit - S.susp;
  const lambda = phase === "final" ? (ctx.furyLambda || 0) : 1.2 / Math.max(0.5, headroom);
  const mu = phase === "raid" ? P.caughtWeight : 0;
  const cc = chargeCost(S, phase);
  const costSuspP = P.costChoice === "suspicion" ? 1 : P.costChoice === "mixed" ? (m.items.length ? 0.25 : 1 / 3) : 0;
  const loudSusp = P.loudRule === "suspicion" || P.loudRule === "both";
  const loudWitness = P.loudRule === "witness" || P.loudRule === "both";
  const critKey = P.critRule === "doubles" ? "critDoubles" : "critBeat4"; // value estimate only (beatN uses beat4's odds)
  const critExtra = (P.critEffect === "lead2" || P.critEffect === "both") && (phase === "local" || phase === "final");

  let best = null;
  for (const c of cands) {
    const base = m.ent.dice[c.trait];
    let up = 0;
    let down = m.nextStepDown;
    const duty = P.dutyEdge && phase === "raid" && ctx.locKind && ctx.locKind === m.duty;
    if (duty) up += 1;
    if (c.trait === "nimble" && carrying) down += 1; // carriers roll Nimble one size smaller
    if (ctx.weakness) down += 1; // the mob brought your Weakness: one size smaller in the chase
    const traitRaised = duty; // counts toward P7's cap
    for (const second of seconds) {
      const raiseOpts = [{ t: 0, s: 0 }];
      const maxRaises = P.raiseCap === "perRoll" ? (traitRaised ? 0 : 1) : 2;
      if (raiseSrc.length >= 1 && maxRaises >= 1) {
        if (!traitRaised) raiseOpts.push({ t: 1, s: 0 });
        if (P.raiseDie !== "trait") raiseOpts.push({ t: 0, s: 1 }); // raiseDie "trait": the Mask/Monster die stays its size
      }
      if (raiseSrc.length >= 2 && maxRaises >= 2 && !traitRaised && P.raiseDie !== "trait") raiseOpts.push({ t: 1, s: 1 });
      const isMon = second !== MASK;
      const hidOpts = isMon && hiddenSrc.length ? [false, true] : [false];
      for (const ro of raiseOpts) {
        for (const hid of hidOpts) {
          const td = applySteps(base, up + ro.t - down);
          const sd = ro.s ? stepUp(second, 1).die : second;
          const D = Math.max(2, ctx.difficulty - (c.easier || 0));
          const d = outcomeDist(td.die, sd, D, { monster: isMon, hidden: hid, tie });
          // Ability uses for this plan, and how many must be overdrawn.
          const uses = [];
          if (c.via) uses.push(c.via);
          for (let k = 0; k < ro.t + ro.s; k++) uses.push(raiseSrc[k]);
          if (hid) uses.push(hiddenSrc[0]);
          const need = new Map();
          for (const u of uses) need.set(u.owner, (need.get(u.owner) || 0) + 1);
          let overdraws = 0;
          for (const [o, n] of need) overdraws += Math.max(0, n - o.charges);
          let odBlocked = false;
          for (const [o, n] of need) if (n > o.charges && !overdrawAllowed(S, phase, o, ctx)) odBlocked = true;
          if (odBlocked) continue;
          const odSusp = overdraws ? S.N.overdrawSuspicion : 0;
          // Expected Suspicion: one roll raises it once, by its biggest trigger.
          const fixed = Math.max(c.loud && loudSusp ? 1 : 0, odSusp);
          const showS = d.show.success, showC = d.show.cost, showT = d.show.trouble;
          const eSusp =
            (d.success - showS) * fixed + showS * Math.max(fixed, showVal) +
            (d.cost - showC) * (fixed >= 1 ? fixed : costSuspP) + showC * Math.max(fixed, showVal) +
            (d.trouble - showT) * Math.max(fixed, 1) + showT * Math.max(fixed, showVal, 1);
          // monsterRule "maskSafe" (S2 candidate): trouble on a Mask roll never gets you caught.
          const witnessed = phase === "raid" && ((ctx.witnessed && !c.quiet) || (c.loud && loudWitness)) && !(P.monsterRule === "maskSafe" && !isMon);
          let gain;
          if (phase === "local" || phase === "final") gain = d.success - d.trouble + (critExtra ? d[critKey] : 0);
          else if (phase === "slip") gain = d.success + 0.8 * d.cost;
          else gain = d.success + 0.6 * d.cost;
          const weakCost = phase === "final" && P.overdrawAtLimit === "weakness" ? 0.3 * overdraws : 0;
          const value = gain - lambda * eSusp - mu * (witnessed ? d.trouble : 0) - cc * uses.length - (overdraws ? 0.15 : 0) - weakCost;
          if (!best || value > best.value + 1e-12) {
            best = { value, cand: c, traitDie: td.die, under: td.under, over: td.over, second, secondDie: sd, hidden: hid, uses, overdraws, witnessed, difficulty: D, fixedSusp: fixed };
          }
        }
      }
    }
  }
  return best;
}

/** Make the roll a plan describes, spend what it spends, and read the result (P2, CORE-RULES Rolling). */
function executeRoll(S, m, plan, phase, { noCost = false } = {}) {
  const P = S.P;
  const overdrawn = [];
  for (const u of plan.uses) {
    if (u.owner.charges > 0) { u.owner.charges -= 1; S.rec.count("charges spent"); }
    else { S.rec.count(`overdraws:${phase}`); overdrawn.push(u.owner); }
    S.rec.count(`ability:${u.ability.effect}`);
  }
  if (plan.overdraws && phase === "final" && P.overdrawAtLimit === "free") S.rec.detect("overdraw in the final flight (its Suspicion cost means nothing)");
  if (plan.under > 0) S.rec.detect("a die stepped below d4 (floored at d4)");
  if (plan.over > 0) S.rec.detect("a raise past d12 (lost)");
  m.nextStepDown = 0;
  const t = S.rng.die(plan.traitDie);
  const s = S.rng.die(plan.secondDie);
  const b = band(t + s, plan.difficulty);
  const critical = isCritical(t, s, plan.difficulty, P.critRule);
  const show = plan.second !== MASK && !plan.hidden && monsterShows(t, s, P.monsterRule === "tie");
  // critEffect "charge"/"both" (S8 candidate): a Critical outside the chases gives the roller back one spent charge.
  if (critical && (P.critEffect === "charge" || P.critEffect === "both") && phase !== "local" && phase !== "final" && m.charges < m.chargesStart) {
    m.charges += 1;
    S.rec.count("charges regained by a Critical");
  }
  let gain = plan.fixedSusp;
  if (b === "trouble") gain = Math.max(gain, 1); // a trouble result +1
  if (show) gain = Math.max(gain, P.monsterRule === "plus2" ? 2 : 1); // the Monster shows +1
  let costKind = null;
  if (b === "cost" && phase !== "local" && phase !== "final" && !noCost) {
    costKind = pickCost(S, m, gain);
    if (costKind === "suspicion") gain = Math.max(gain, 1);
  }
  S.rec.roll({
    phase, band: b, second: plan.second, show,
    critDoubles: isCritical(t, s, plan.difficulty, "doubles"),
    critBeat4: isCritical(t, s, plan.difficulty, "beat4"),
    margin: t + s - plan.difficulty,
    entity: m.id,
  });
  return { band: b, critical, show, suspGain: gain, caught: b === "trouble" && plan.witnessed, costKind, overdrawn };
}

/** P3: the Storyteller picks a Cost (costChoice). */
function pickCost(S, m, gain = 0) {
  const P = S.P;
  const items = m.items; // T10: "drop an item" drops one of the roller's own items
  let kind;
  if (P.costChoice === "suspicion") kind = "suspicion";
  else if (P.costChoice === "lenient") kind = items.length === 0 ? "drop" : "stepdown";
  else {
    // T10: the Storyteller never picks a Cost that costs nothing (a Suspicion +1 the roll already raised).
    const opts = ["turn", "stepdown"];
    if (gain < 1) opts.push("suspicion");
    if (items.length) opts.push("drop");
    kind = S.rng.pick(opts);
  }
  S.rec.count(`cost:${kind}`);
  if (kind === "drop") {
    if (items.length === 0) { S.rec.detect("\"drop an item\" Cost with nothing carried (costs nothing)"); return kind; }
    if (P.dropRule === "recover") { m.loseTurn = true; return kind; } // picking it up again takes the next action
    if (P.dropRule === "extrasOnly") {
      // Only an extra can be dropped (and is lost); with none carried the Storyteller picks another Cost.
      const extras = m.items.filter((i) => !i.essential);
      if (extras.length === 0) { kind = S.rng.pick(["suspicion", "turn", "stepdown"]); S.rec.count(`cost:${kind} (instead of drop)`); return applyCost(S, m, kind); }
      m.items.splice(m.items.indexOf(S.rng.pick(extras)), 1);
      return kind;
    }
    m.items.splice(S.rng.int(0, m.items.length - 1), 1);
  } else applyCost(S, m, kind);
  return kind;
}

function applyCost(S, m, kind) {
  if (kind === "turn") m.loseTurn = true;
  else if (kind === "stepdown") m.nextStepDown += 1;
  return kind;
}

// ---------------------------------------------------------------- chases, capture

function chaseGround(S) {
  return CHASE_TABLE[S.rng.int(0, CHASE_TABLE.length - 1)].map((t) => ({ trait: t, loud: false }));
}

/** DESIGN Chase (Lead track) + Two kinds of chase: a local chase; cornered = captured. */
function localChase(S, m) {
  const N = S.N;
  S.rec.count("local chases");
  const weak = m.ent.weakness === "mob" && S.rng.chance(S.P.weaknessLocal);
  let lead = N.lead.localStart;
  const critW = S.P.critEffect === "lead2" || S.P.critEffect === "both" ? 2 : 1;
  for (let round = 0; round < N.maxChaseRounds; round++) {
    const mobD = Math.min(N.localMob.max, N.localMob.base + Math.floor(S.susp * N.localMob.perSuspicion));
    const ctx = { phase: "local", options: chaseGround(S), difficulty: mobD, witnessed: false, helpers: [], locKind: null, weakness: weak };
    const plan = planRoll(S, m, ctx);
    const r = executeRoll(S, m, plan, "local");
    lead += leadMove(r, critW);
    if (S.P.chaseSusp === "yes") addSusp(S, r.suspGain, "chase"); // chaseSusp "no" (S6 candidate): chase rolls don't raise Suspicion
    if (limitHit(S)) { S.rec.count("local chase ended by the Limit"); return finalFlight(S, "limit"); }
    if (lead >= N.lead.localEscape) { S.rec.count("local chase escaped"); return; }
    if (lead <= 0) return capture(S, m);
  }
  S.rec.detect("local chase stalled (no end after max rounds)");
}

/** multiCaught "shared" (S11 candidate): several Entities caught by one roll flee together on one Lead. */
function groupChase(S, group) {
  const N = S.N;
  S.rec.count("local chases (shared)");
  const weak = new Map(group.map((m) => [m, m.ent.weakness === "mob" && S.rng.chance(S.P.weaknessLocal)]));
  let lead = N.lead.localStart;
  const critW = S.P.critEffect === "lead2" || S.P.critEffect === "both" ? 2 : 1;
  for (let round = 0; round < N.maxChaseRounds; round++) {
    const mobD = Math.min(N.localMob.max, N.localMob.base + Math.floor(S.susp * N.localMob.perSuspicion));
    const ground = chaseGround(S);
    const results = group.map((m) => executeRoll(S, m, planRoll(S, m, { phase: "local", options: ground, difficulty: mobD, witnessed: false, helpers: [], locKind: null, weakness: weak.get(m) }), "local"));
    lead += majorityMove(results, critW);
    if (S.P.chaseSusp === "yes") addSusp(S, Math.max(0, ...results.map((r) => r.suspGain)), "chase");
    if (limitHit(S)) return finalFlight(S, "limit");
    if (lead >= N.lead.localEscape) return;
    if (lead <= 0) { for (const m of group) capture(S, m); return; }
  }
  S.rec.detect("local chase stalled (no end after max rounds)");
}

function capture(S, m) {
  m.status = "captured";
  S.captures++;
  S.rec.count("captures");
  if (S.P.captiveItems === "lost") m.items = [];
  if (m.furniture) dropFurniture(S, "carrier captured");
}

function freeCaptive(S, m, how) {
  m.status = "active";
  S.rec.count(`captive ${how}`);
}

/** DESIGN Captured: once per Turn a captive may try to slip free (a failed attempt: Suspicion +1). */
function captivesAct(S) {
  for (const m of captives(S)) {
    if (S.phase !== "raid") return;
    if (m.loseTurn) { m.loseTurn = false; continue; }
    const ctx = {
      phase: "slip",
      options: [{ trait: "sly", loud: false }, { trait: "nimble", loud: false }, { trait: "brawn", loud: true }], // T8: like the way out
      difficulty: S.town.lockup.difficulty, witnessed: false, helpers: [], locKind: null, weakness: false,
    };
    const plan = planRoll(S, m, ctx);
    if (plan.value <= 0.05) continue;
    const r = executeRoll(S, m, plan, "slip");
    addSusp(S, r.suspGain, "slip");
    // slipRule (S6 candidate): "cost" = a Success or a Cost frees you; "success" = only a Success does.
    if (r.band === "success" || (r.band === "cost" && S.P.slipRule === "cost")) freeCaptive(S, m, "slipped free");
    if (limitHit(S)) return finalFlight(S, "limit");
  }
}

/**
 * The final flight (DESIGN Two kinds of chase, Q8g): every Entity who isn't
 * captured flees together on one shared Lead that moves by majority. Escape =
 * home with the goods; cornered = forked.
 */
function finalFlight(S, trigger) {
  if (S.phase !== "raid") return;
  S.phase = "done";
  S.finalTrigger = trigger;
  S.rec.count(`final flight: ${trigger}`);
  const N = S.N;
  const fleeing = active(S);
  for (const m of captives(S)) m.status = "left";
  if (fleeing.length === 0) { S.rec.count("final flight with nobody free"); return; }
  const weak = new Map(fleeing.map((m) => [m, m.ent.weakness === "mob" ? S.rng.chance(S.P.weaknessFinal) : trigger === "dawn"]));
  const baseMob = S.L.finalMob + (fleeing.length - 4) * N.finalMobPerExtraEntity;
  const critW = S.P.critEffect === "lead2" || S.P.critEffect === "both" ? 2 : 1;
  const furyRule = S.P.overdrawAtLimit === "fury";
  let fury = 0; // overdrawAtLimit "fury": what would raise Suspicion makes the mob harder instead
  let lead = S.L.finalStart ?? N.lead.finalStart; // a label may set its own starting Lead
  for (let round = 0; round < N.maxChaseRounds; round++) {
    const mobD = baseMob + fury;
    // Policy: carriers drop the furniture when the mob is about to corner them.
    if (lead <= 1 && S.furnitureCarried) dropFurniture(S, "final flight");
    const ground = chaseGround(S);
    const results = [];
    for (const m of fleeing) {
      const ctx = {
        phase: "final", options: ground, difficulty: mobD, witnessed: false, helpers: fleeing.filter((h) => h !== m),
        locKind: null, weakness: weak.get(m), weakOf: (o) => weak.get(o),
        furyLambda: furyRule && fury < N.furyCap ? N.furyLambda : 0,
      };
      const plan = planRoll(S, m, ctx);
      const r = executeRoll(S, m, plan, "final");
      if (S.P.overdrawAtLimit === "weakness") for (const o of r.overdrawn) { if (!weak.get(o)) S.rec.count("weakness taken by overdraw"); weak.set(o, true); }
      results.push(r);
    }
    if (furyRule) {
      // The round raises the fury once, by its biggest trigger (as a group check raises Suspicion).
      const add = Math.max(0, ...results.map((r) => r.suspGain));
      const before = fury;
      fury = Math.min(N.furyCap, fury + add);
      S.rec.count("fury", fury - before);
    }
    lead += majorityMove(results, critW);
    if (lead >= N.lead.finalEscape) {
      for (const m of fleeing) m.status = "home";
      S.rec.count("final flight escaped");
      return;
    }
    if (lead <= 0) {
      for (const m of fleeing) m.status = "forked";
      S.forked = true;
      S.rec.count("forked");
      return;
    }
  }
  for (const m of fleeing) m.status = "home";
  S.rec.detect("final flight stalled (no end after max rounds)");
}

// ---------------------------------------------------------------- result

/** P8 + DESIGN Furniture: how the year went. Each Entity left behind drops the result one step. */
function summarise(S) {
  const home = S.party.filter((m) => m.status === "home");
  const items = new Set(home.flatMap((m) => m.items));
  const list = S.town.items;
  const essentialsHome = list.filter((i) => i.essential).every((i) => items.has(i));
  const extras = list.filter((i) => !i.essential);
  const extrasMissing = extras.filter((i) => !items.has(i)).length;
  const furnitureHome = !!S.furnitureCarried && home.some((m) => m.furniture === S.furnitureCarried);
  const leftBehind = S.party.filter((m) => m.status === "left").length;
  let result;
  if (S.forked) result = "forked";
  else {
    let step;
    if (essentialsHome && extrasMissing <= 1) step = furnitureHome ? 3 : 2;
    else if (items.size * 2 >= list.length) step = 1;
    else step = 0;
    step = Math.max(0, step - leftBehind);
    result = LADDER[step];
  }
  return {
    result,
    win: result === "win" || result === "grand",
    forked: S.forked,
    finalTrigger: S.finalTrigger,
    captures: S.captures,
    leftBehind,
    wentForFurniture: S.wentForFurniture,
    furnitureHome,
    susp: S.susp,
    turnsUsed: S.turn,
    spend: S.party.map((m) => ({ id: m.id, gift: m.gift, duty: m.duty, frac: m.chargesStart ? (m.chargesStart - Math.max(0, m.charges)) / m.chargesStart : 0 })),
  };
}
