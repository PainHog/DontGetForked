/**
 * Plays one raid strictly by the rulebook (book/src/chapters/*.html; docs/CORE-RULES.md
 * summarises it, docs/DESIGN.md logs each decision). Comments cite the passage or
 * decision each step follows. Where the rules leave something open, the choice is a
 * named parameter (params.mjs PARAMS); where the players choose, the choice is a
 * documented policy (also in PARAMS, kind "policy"). docs/audits/SIM-AUDIT.md checks
 * it rule by rule against the book.
 *
 * Abstractions (stated up front, sim/README.md §1):
 *  - the party splits into pairs (partyPolicy "pairs", the default; "singles"), each
 *    taking its own location, or moves together ("together"); everyone regroups at
 *    the way out;
 *  - one list item per location; a location's obstacles are passed in order;
 *  - no map or distances (any move is one Turn) and no small entrances (a rolled town
 *    has none, B3);
 *  - the Entities are the approved roster (entities.mjs, read from module/config.mjs):
 *    dice, signatures, Gifts, Perks (the list above hasPerk), Weakness timings; a Tell is +1.
 */
import { MASK, MONSTER, stepUp, stepDown, band, isCritical, outcomeDist, majorityMove, leadMove, monsterShows } from "./rules.mjs";
import { abilitiesOf } from "./entities.mjs";
import { rescueObstacle, CHASE_TABLE, CHASE_TABLES } from "./town.mjs";

const LADDER = ["bust", "partial", "win", "grand"];

/** Play one raid. Returns a summary; detailed counts go to `rec`. */
export function playRaid({ party, town, params, numbers, rng, rec }) {
  const S = makeState({ party, town, params, numbers, rng, rec });
  if (S.P.partyPolicy !== "together") playSplit(S);
  while (S.phase === "raid") {
    // P5: at dawn, anyone still in town starts the final flight.
    if (S.turn >= S.turns) { finalFlight(S, "dawn"); break; }
    let target = chooseTarget(S);
    if (target === "leave") {
      if (S.P.exitRule === "free" || (S.P.exitRule === "gateCarriers" && !S.furnitureCarried)) { S.turn++; leaveTown(S); break; }
      target = exitLocation(S); // exitRule "gate": getting out is a group check like any other
    }
    if (target === "wait") { S.turn++; captivesAct(S); if (S.phase !== "raid") break; noisyFurniture(S, "wait"); continue; }
    if (S.at !== target) {
      // P4: each Turn, every Entity either rolls once or moves.
      S.turn++;
      // furnitureRule "slow"/"noisySlow" (S7 candidate): carrying furniture, a move takes two Turns.
      if (S.furnitureCarried && ["slow", "noisySlow", "slowHard", "slowWatched", "noisySlowHard"].includes(S.P.furnitureRule) && !(S.P.fetchRule === "carry" && S.party.some((c) => c.furniture === S.furnitureCarried && hasPerk(c, "fetch")))) { S.turn++; noisyFurniture(S, "move"); if (S.phase !== "raid") break; }
      const moving = !!S.furnitureCarried;
      followsBehind(S, active(S));
      S.at = target;
      arrive(S, target);
      if (S.phase !== "raid") break;
      captivesAct(S);
      if (S.phase !== "raid") break;
      if (moving) noisyFurniture(S, "move"); // the end of the move's last Turn
      continue;
    }
    S.turn++;
    workLocation(S, target);
    if (S.phase !== "raid") break;
    captivesAct(S);
    if (S.phase !== "raid") break;
    noisyFurniture(S, "work");
  }
  return summarise(S);
}

/** The state of one raid at its start (the furniture placed, the party reset). */
function makeState({ party, town, params: P, numbers: N, rng, rec }) {
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
    // a premade town (sim/premade.mjs) names where its piece stands; a rolled town picks at random
    const host = town.furnitureHost ? town.locations.find((l) => l.id === town.furnitureHost) : rng.pick(town.locations);
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
    m.form = "jekyll"; // Jekyll & Hyde starts each raid as Jekyll
  }
  return S;
}

// ---------------------------------------------------------------- split play (partyPolicy)

/**
 * partyPolicy "pairs"/"singles" (PT1–PT2: real players split up): the party splits
 * into groups of two (or one), each taking its own location. Abilities help only
 * within a group (P7, same location); Tells are checked once per watched location
 * (T3); the party leaves together, so every group regroups at the way out before
 * the exit roll (T4). A carrying group's moves take two Turns (S7).
 */
function playSplit(S) {
  const size = S.P.partyPolicy === "singles" ? 1 : 2;
  const order = S.rng.fork("split").shuffle([...S.party]);
  S.groups = [];
  for (let i = 0; i < order.length; i += size) S.groups.push({ id: S.groups.length, members: order.slice(i, i + size), at: null, busy: 0 });
  const exit = exitLocation(S);
  const live = (g) => g.members.some((m) => m.status === "active");

  while (S.phase === "raid") {
    if (S.turn >= S.turns) { finalFlight(S, "dawn"); break; }
    S.turn++;
    regroup(S);
    let carriedMoved = false; // furnitureNoise "moving": did a carried piece move this Turn?
    const groups = S.groups.filter(live);
    if (groups.length === 0) { captivesAct(S); continue; }
    // T4: once every group waits at the way out with nothing left to do, one Entity rolls for all.
    if (groups.every((g) => g.at === exit && g.busy === 0 && g.members.every((m) => arrived(S, m)) && chooseTargetSplit(S, g) === "exit")) {
      S.here = null;
      workLocation(S, exit);
      if (S.phase !== "raid") break;
    } else {
      for (const g of groups) {
        if (S.phase !== "raid") break;
        if (!live(g)) continue;
        if (g.busy > 0) { g.busy--; carriedMoved = true; continue; } // the second Turn of a move while carrying furniture
        const target = chooseTargetSplit(S, g);
        const dest = target === "exit" ? exit : target;
        if (g.at !== dest) {
          g.at = dest;
          if (g.members.some((m) => m.status === "active" && m.furniture)) { g.busy = 1; carriedMoved = true; }
          followsBehind(S, g.members);
          S.arrivers = g.members.filter((m) => arrived(S, m));
          arrive(S, dest);
          S.arrivers = null;
          continue;
        }
        if (dest === exit) continue; // waiting for the others
        S.here = g.members;
        workLocation(S, dest);
        S.here = null;
        if (dest.done || dest.id === "lockup") releaseClaim(S, g, dest);
      }
      if (S.phase !== "raid") break;
    }
    captivesAct(S);
    if (S.phase !== "raid") break;
    noisyFurniture(S, carriedMoved ? "move" : "work");
  }
}

/** Freed captives join the group at the lock-up, or start a group of their own there. */
function regroup(S) {
  const inGroup = new Set(S.groups.flatMap((g) => g.members));
  for (const m of S.party) {
    if (m.status !== "active" || inGroup.has(m)) continue;
    const there = S.groups.find((g) => g.at === S.lockupLoc && g.members.some((x) => x.status === "active"));
    if (there) there.members.push(m);
    else S.groups.push({ id: S.groups.length, members: [m], at: S.lockupLoc, busy: 0 });
  }
  // a captured Entity leaves its group; it rejoins through the lock-up
  for (const g of S.groups) g.members = g.members.filter((m) => m.status === "active");
  for (const g of S.groups) if (!g.members.length) for (const l of S.town.locations) if (l.claimedBy === g) l.claimedBy = null;
}

function releaseClaim(S, g, loc) {
  if (loc.claimedBy === g) loc.claimedBy = null;
  if (S.rescuer === g) S.rescuer = null;
}

function needFor(S, g, loc) {
  const carrying = g.members.some((m) => m.status === "active" && m.furniture);
  return (g.at === loc ? 0 : carrying ? 2 : 1) + workTurns(S, loc, g.members.filter((m) => m.status === "active").length);
}

/** How well the group's best Entity likes a location's next obstacle (either way in). */
function fitFor(S, g, loc) {
  const ob = loc.obstacles.find((o) => !o.cleared);
  if (!ob) return 0;
  const here = g.members.filter((m) => m.status === "active");
  const prev = S.here;
  S.here = here;
  let best = -Infinity;
  for (const o of ob.alt && S.P.waysIn === "two" ? [ob, ob.alt] : [ob]) for (const m of here) best = Math.max(best, planRoll(S, m, ctxFor(S, m, o, loc, "raid")).value);
  S.here = prev;
  return best;
}

/**
 * Split-play policy for one group: keep working its location; otherwise claim the
 * best-fitting essential no other group holds, then rescue a captive (one group),
 * then the best extra; else head for the way out. Leave early when Suspicion is
 * one step from the Limit and the essentials are in hand.
 */
function chooseTargetSplit(S, g) {
  const left = turnsLeft(S);
  const exitNeed = 2;
  const haveEssentials = S.town.items.filter((i) => i.essential).every((i) => carriedItems(S).includes(i));
  if (haveEssentials && S.limit - S.susp <= 1 && captives(S).length === 0) return "exit";
  const alive = (h) => h && h.members.some((m) => m.status === "active");
  const mine = (l) => l.claimedBy === g;
  if (g.at && mine(g.at) && !g.at.done && needFor(S, g, g.at) + exitNeed <= left) return g.at;
  const free = (l) => !l.done && !S.skipped.has(l) && (!l.claimedBy || mine(l) || !alive(l.claimedBy));
  const pick = (ls) => {
    const ok = ls.filter((l) => free(l) && needFor(S, g, l) + exitNeed <= left);
    if (!ok.length) return null;
    const best = ok.reduce((a, b) => (fitFor(S, g, b) > fitFor(S, g, a) ? b : a));
    best.claimedBy = g;
    return best;
  };
  const ess = pick(S.town.locations.filter((l) => l.items.some((i) => i.essential)));
  if (ess) return ess;
  if (captives(S).length && (!alive(S.rescuer) || S.rescuer === g)) {
    const lock = lockupLocation(S);
    if ((g.at === lock ? 0 : 1) + 2 + exitNeed <= left) { S.rescuer = g; return lock; }
  }
  const ext = pick(S.town.locations.filter((l) => !l.items.some((i) => i.essential)));
  if (ext) return ext;
  return "exit";
}

/** furnitureRule "noisy"/"both" (S7 candidate): +1 Suspicion at the end of each Turn a piece is carried in town. */
/** B2: a carried piece raises Suspicion by 1 at the end of a Turn. furnitureNoise "carried" = every Turn it's carried (as written);
 *  "moving" = only a Turn it moves (PT5 m9 candidate). Before PT5, together-play counted one per two-Turn move and no waiting Turns. */
function noisyFurniture(S, kind = "work") {
  if (!S.furnitureCarried || !["noisy", "both", "noisySlow", "noisySlowHard"].includes(S.P.furnitureRule)) return;
  const rule = S.P.furnitureNoise ?? "carried";
  if (rule === "moving" && kind !== "move") return;
  addSusp(S, 1, "furniture");
  if (limitHit(S)) finalFlight(S, "limit");
}

// ---------------------------------------------------------------- helpers

const active = (S) => S.party.filter((m) => m.status === "active");
const captives = (S) => S.party.filter((m) => m.status === "captured");
/** The Entities working the current location: the whole party, or (split play) one group. */
const arrived = (S, m) => !(m.arrivesAfter >= S.turn); // see followsBehind()
const hereOf = (S) => (S.here ?? active(S)).filter((m) => m.status === "active" && arrived(S, m));

/**
 * "Lose a Turn (you skip your next action)" (Chapter 3), and picking up a dropped item, which costs your next action:
 * when that next action would have been a move with the others, the Entity skips it and follows a Turn behind, so it
 * isn't there to roll or help until the Turn after next (a move is an action: Chapter 4). Before the audit it moved with
 * the others and skipped its next roll at the new place instead, where it could still help with its charges meanwhile.
 */
function followsBehind(S, members) {
  for (const m of members) {
    if (m.status !== "active" || !m.loseTurn) continue;
    m.loseTurn = typeof m.loseTurn === "number" && m.loseTurn > 1 ? m.loseTurn - 1 : false;
    m.arrivesAfter = S.turn + 1;
    S.rec.count("lost turns");
    S.rec.count("lost turns: followed a Turn behind");
  }
}
/**
 * Perks (C5: narrow, always on). The engine plays all 24 of the book's (C6–C9; Fetch as B5), by key:
 *  oldMoney      a Cost on a Charm roll is never Suspicion +1
 *  hypnoticEyes  on Charm rolls the Monster shows only if it beats the trait die by 2+
 *  wallCrawler   in a chase you can always roll Nimble
 *  strongBack    carries a Huge piece alone
 *  tireless      carrying doesn't make Nimble smaller
 *  builtToLast   slips free from the lock-up on a Success or a Cost
 *  patienceOfAges   "lose a Turn" is never your Cost
 *  keeperOfTreasures "drop an item" is never your Cost
 *  fearTheCurse  the mob in your local chase is 1 easier
 *  nightRunner   your local chase starts at Lead 2
 *  shortcut      the way out is 2 easier when you roll it
 *  fetch         a final flight you're in starts at Lead 3; the way out is 1 easier while you're there (B5; fetchRule)
 *  outOfSight    Trouble gets you caught only while you carry loot or furniture
 *  hiddenPockets captured, you keep what you carry
 *  lightStep     the loud way costs you no Suspicion
 *  spectral      you get past group obstacles without rolling
 *  rattle        the Monster showing on your roll is +1 Suspicion, not +2
 *  alreadyDead   cornered in a local chase, you lose your next Turn instead of being captured (V5: at the Limit, you join the flight)
 *  familiarsWarning  a Tell check where you arrive goes off only if a second d6 also does
 *  flyByNight    in a chase you can always roll Wits
 *  wiseWoman     a Cost on your Wits roll is never "lose a Turn"
 *  practisedHand changing back to Jekyll costs no charge
 *  steadyNerves  Hyde takes over only if the Monster beats Jekyll's trait die by 2+
 *  bruteStrength as Hyde, carrying doesn't make your Nimble smaller
 */
const hasPerk = (m, k) => m.perk === k;
const carrying = (m) => m.items.length > 0 || !!m.furniture;

/**
 * Out of Sight (C8, the Invisible Man): the chance that Trouble at a watched obstacle gets him caught.
 * outOfSightRule (candidate texts after the audit, sim/FINDINGS.md):
 *  carry   "only while you carry loot or furniture" (the book now);
 *  place   … "or someone at your place does";
 *  half    "on Trouble at a watched obstacle you're caught only on a 1–3 on a d6";
 *  handed  … "or you were handed loot or handed it over this Turn";
 *  handedSmart  handed, played by a party that dodges it (he never takes the loot when someone else there can).
 */
function seenChance(S, m) {
  if (!hasPerk(m, "outOfSight")) return 1;
  const rule = S.P.outOfSightRule ?? "carry";
  if (rule === "half") return 0.5;
  if (carrying(m)) return 1;
  if (rule === "place" && hereOf(S).some((o) => o !== m && carrying(o))) return 1;
  if ((rule === "handed" || rule === "handedSmart") && m.handTurn === S.turn) return 1;
  return 0;
}

/** An Entity's dice now (Jekyll & Hyde: the form it's in). */
const diceOf = (m) => (m.ent.formDice ? m.ent.formDice[m.form === "hyde" ? "hyde" : "jekyll"] : m.ent.dice);
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
  return (S.at === loc ? 0 : 1) + workTurns(S, loc, active(S).length);
}

/**
 * planTime (policy): the Turns the players expect a location's obstacles left to take. "perObstacle" = one each (as if
 * one Entity rolled a Turn); "perTurn" = shared among the Entities there, at least one (each can take on the next
 * obstacle in the same Turn, Chapter 4).
 */
function workTurns(S, loc, n) {
  const left = loc.obstacles.filter((o) => !o.cleared).length;
  if (S.P.planTime !== "perTurn" || left === 0) return left;
  return Math.max(1, Math.ceil(left / Math.max(1, n)));
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
  let chance = S.P.tellScope === "party" ? S.P.tellPartyChance : S.P.tellChance; // C4: 4–6 on a d6 for the party
  if ((S.arrivers || hereOf({ ...S, here: null })).some((m) => m.status === "active" && hasPerk(m, "familiarsWarning"))) chance *= chance; // the cat warns: roll again
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
  // T4: the party leaves together, so the way out waits for anyone still following a Turn behind (followsBehind).
  if (loc.id === "exit" && active(S).some((m) => !arrived(S, m))) return;
  const acted = new Set();
  const tried = new Set();
  for (const m of hereOf(S)) if (m.loseTurn) { m.loseTurn = typeof m.loseTurn === "number" && m.loseTurn > 1 ? m.loseTurn - 1 : false; acted.add(m); S.rec.count("lost turns"); }

  // T5: past an obstacle someone opened, only the opener goes on (if it's caught, the way closes again).
  if (loc.solo && loc.solo.status !== "active") {
    for (const o of loc.obstacles) if (o.openedOnly) { o.cleared = false; o.openedOnly = false; }
    loc.solo = null;
  }
  const past = () => pastHere(S, loc);
  // Behind a group obstacle the others got past (below): each who wants past rolls for itself again (Chapter 4).
  if (loc.behind) {
    const ob = loc.behindOb;
    for (const m of [...loc.behind]) if (m.status !== "active") loc.behind.delete(m);
    const alone = pastHere(S, loc).length === 0; // nobody here is past it: they must roll to get anywhere
    const rollers = hereOf(S).filter((m) => loc.behind.has(m) && !acted.has(m) && (alone || planRoll(S, m, ctxFor(S, m, ob, loc, "raid")).value > 0));
    if (rollers.length && !groupCheck(S, loc, ob, rollers, acted)) return;
    for (const m of [...loc.behind]) if (ob.passed.has(m.id)) loc.behind.delete(m);
    if (!loc.behind.size) { loc.behind = null; loc.behindOb = null; }
  }
  while (S.phase === "raid") {
    const ob = loc.obstacles.find((o) => !o.cleared);
    if (!ob) break;
    const avail = past().filter((m) => !acted.has(m));
    if (avail.length === 0) break;
    if (ob.alt) pickWayIn(S, ob, loc, avail);

    if (ob.group) {
      // P6: everyone rolls and gets through on their own result; Suspicion rises once, by the worst.
      // groupRule "best3" (S5 candidate): at most three roll, and the rest get through with them.
      const cap = S.P.groupRule === "best3" ? 3 : S.P.groupRule === "best4" ? 4 : Infinity;
      const need = Math.min(cap, past().length);
      const passedNow = () => past().filter((m) => ob.passed.has(m.id)).length;
      for (const m of avail) if (hasPerk(m, "spectral")) ob.passed.add(m.id); // drifts past without rolling
      if (passedNow() >= need) { ob.cleared = true; continue; }
      let rollers = avail.filter((m) => !ob.passed.has(m.id));
      if (cap < Infinity) rollers = rollers.map((m) => ({ m, v: planRoll(S, m, ctxFor(S, m, ob, loc, "raid")).value })).sort((a, b) => b.v - a.v).slice(0, need - passedNow()).map((x) => x.m);
      if (rollers.length === 0) {
        // Everyone free to act is past it, and someone here isn't (it got Trouble). Those past go on; the others stay
        // behind it and try again for themselves (above). Before the audit the obstacle was cleared for everyone here,
        // so one who never got past went on with the rest.
        loc.behind = new Set(past().filter((m) => !ob.passed.has(m.id)));
        loc.behindOb = ob;
        S.rec.count("group: left behind a group obstacle");
        ob.cleared = true;
        continue;
      }
      if (!groupCheck(S, loc, ob, rollers, acted)) return;
      if (past().length === 0) break;
      if (passedNow() >= Math.min(cap, past().length)) ob.cleared = true;
      continue;
    }

    // A single obstacle: the best-placed available Entity tries it.
    // triesPerTurn "one" (S11 candidate): only one Entity may try a given obstacle each Turn.
    if (S.P.triesPerTurn === "one" && tried.has(ob)) break;
    // exitTries "one" (Chapter 4, Getting Out): one rolls for all; on Trouble, try again next Turn.
    if (loc.id === "exit" && (S.P.exitTries ?? "one") === "one" && tried.has(ob)) break;
    let best = null;
    for (const m of avail) {
      const plan = planRoll(S, m, ctxFor(S, m, ob, loc, "raid"));
      if (!best || plan.value > best.plan.value) best = { m, plan };
    }
    if (best.plan.value <= 0) { S.rec.count("declined rolls"); break; }
    acted.add(best.m);
    tried.add(ob);
    // U2 (policy): before a watched roll, the roller hands its loot to someone at the same place (free).
    if (S.P.lootHandover === "free" && best.plan.witnessed && best.m.items.length) {
      const others = past().filter((h) => h !== best.m);
      if (others.length) {
        const to = others.reduce((a, b) => (b.items.length < a.items.length ? b : a));
        to.items.push(...best.m.items);
        best.m.items = [];
        best.m.handTurn = to.handTurn = S.turn; // outOfSightRule "handed"
        S.rec.count("loot handed over");
        // Plan again with empty hands: Out of Sight's "only while you carry loot", Through the Wall's "not while you carry
        // loot" (before the audit the roll kept the plan made while still carrying).
        best.plan = planRoll(S, best.m, ctxFor(S, best.m, ob, loc, "raid"));
      }
    }
    const r = executeRoll(S, best.m, best.plan, "raid", { noCost: loc.id === "exit" }); // T4: an exit Cost costs nothing more
    addSusp(S, r.suspGain, "roll");
    if (r.band !== "trouble") {
      ob.cleared = true;
      const opened = S.P.openTrait === "unlisted" && best.plan.cand.via && best.plan.cand.via.ability.effect === "open" && loc.id !== "exit" && loc.id !== "lockup";
      if (opened && !loc.solo && past().length > 1) { loc.solo = best.m; ob.openedOnly = true; S.rec.count("opened: only the opener goes on"); }
    }
    if (limitHit(S)) return finalFlight(S, "limit");
    if (r.caught) {
      localChase(S, best.m);
      if (S.phase !== "raid") return;
    }
  }

  if (S.phase === "raid" && hereOf(S).length && loc.obstacles.every((o) => o.cleared)) completeLocation(S, loc);
}

/** The Entities here who are past this location's obstacles so far: not behind a group obstacle, and (T5) only the opener past an opened approach. */
function pastHere(S, loc) {
  return hereOf(S).filter((m) => (!loc.solo || m === loc.solo) && !(loc.behind && loc.behind.has(m)));
}

/**
 * A group check (P6, Chapter 4): the rollers declare their dice and abilities, then roll together; each gets past on its
 * own result; Suspicion rises once, by the biggest trigger among the rolls; everyone in Trouble at a watched obstacle is
 * caught together (R4). Plans are made in turn with the charges already promised set aside, so two rollers never count
 * on the same last charge (before the audit they did, and the second paid an overdraw nobody chose). Costs are picked
 * after all the rolls, so a Cost is never a Suspicion +1 the group already took (F23). Returns false if the raid ended.
 */
function groupCheck(S, loc, ob, rollers, acted) {
  const promised = new Map();
  const planned = rollers.map((m) => {
    const plan = planRoll(S, m, ctxFor(S, m, ob, loc, "raid"));
    for (const u of plan.uses) {
      if (u.ability.effect === "form" && u.owner === m && m.form === "hyde" && hasPerk(m, "practisedHand")) continue; // costs no charge
      if (u.owner.charges > 0) { u.owner.charges -= 1; promised.set(u.owner, (promised.get(u.owner) || 0) + 1); }
    }
    return { m, plan };
  });
  for (const [o, n] of promised) o.charges += n;
  let worst = 0;
  const caught = [];
  const results = [];
  for (const { m, plan } of planned) {
    acted.add(m);
    if (plan.value <= 0 && planned.length > 1) S.rec.count("group: forced low-value roll");
    const r = executeRoll(S, m, plan, "raid", { deferCost: true });
    results.push({ m, r });
    worst = Math.max(worst, r.suspGain);
    if (r.band !== "trouble") ob.passed.add(m.id);
    if (r.caught) caught.push(m);
  }
  for (const { m, r } of results) {
    if (!r.costPending) continue;
    r.costKind = pickCost(S, m, hasPerk(m, "oldMoney") && m.lastTrait === "charm" ? 9 : worst);
    if (r.costKind === "suspicion") worst = Math.max(worst, 1);
  }
  S.rec.count("group checks");
  addSusp(S, worst, "roll");
  if (limitHit(S)) { finalFlight(S, "limit"); return false; }
  if (caught.length > 1 && S.P.multiCaught === "shared") {
    groupChase(S, caught); // R4: one chase on a shared Lead (majority rule)
    if (S.phase !== "raid") return false;
  } else {
    for (const m of caught) {
      localChase(S, m);
      if (S.phase !== "raid") return false;
    }
  }
  return true;
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
  const act = loc.solo && loc.solo.status === "active" ? [loc.solo] : pastHere(S, loc); // T5: only the opener got through; not who is behind a group obstacle
  if (act.length === 0) return; // everyone was caught: nobody is here to take the loot
  loc.done = true;
  if (!loc.itemsTaken) {
    loc.itemsTaken = true;
    // outOfSightRule "handedSmart": the party keeps the loot out of the Invisible Man's hands when someone else is there.
    const takers = S.P.outOfSightRule === "handedSmart" && act.some((m) => !hasPerk(m, "outOfSight")) ? act.filter((m) => !hasPerk(m, "outOfSight")) : act;
    for (const it of loc.items) {
      const holder = takers.reduce((a, b) => (b.items.length < a.items.length ? b : a), takers[0]);
      holder.items.push(it);
    }
  }
  if (loc.furniturePending && wantsFurnitureHere(S, loc)) {
    // furniturePlace "onList": take on the extra obstacle; the piece is carried once it is cleared.
    const fob = loc.furniturePending.obstacle;
    if (S.P.furnitureRule === "slowHard" || S.P.furnitureRule === "noisySlowHard") fob.difficulty = Math.min(12, fob.difficulty + 2);
    if (S.P.furnitureRule === "slowWatched") fob.witnessed = true;
    loc.obstacles.push(fob);
    loc.furniture = { size: loc.furniturePending.size };
    loc.furniturePending = null;
    loc.done = false;
    S.wentForFurniture = true;
    return;
  }
  if (loc.furniture && !S.furnitureCarried) {
    // Carrying (DESIGN): Bulky = one carrier, Huge = two. Policy: the Entities with the smallest Nimble carry.
    const strong = act.find((m) => hasPerk(m, "strongBack"));
    const n = loc.furniture.size === "huge" && !strong ? 2 : 1;
    const carriers = strong ? [strong] : [...act].sort((a, b) => diceOf(a).nimble - diceOf(b).nimble).slice(0, n);
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
  const past = pastHere(S, loc); // "whoever is past all its obstacles may take on the extra one" (Chapter 4)
  const strong = past.some((m) => hasPerk(m, "strongBack"));
  if (past.length < (loc.furniturePending.size === "huge" && !strong ? 2 : 1)) return false;
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
  const helpers = hereOf(S).filter((h) => h !== m); // P7: only Entities at the same location
  return {
    phase, options: ob.options, difficulty: ob.difficulty - (loc && loc.id === "exit" && hasPerk(m, "shortcut") ? 2 : 0) - (loc && loc.id === "lockup" && ["lockup", "flightLockup"].includes(S.P.fetchRule) && hasPerk(m, "fetch") ? 2 : 0)
      - (loc && loc.id === "exit" && S.P.fetchRule === "flightExit" && [m, ...helpers].some((o) => hasPerk(o, "fetch")) ? 1 : 0), witnessed: ob.witnessed,
    helpers, locKind: loc ? loc.kind : null, weakness: false, noCost: !!loc && loc.id === "exit", // T4: an exit Cost costs nothing more
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
  if (r === "once") return !(ctx && ctx.weakOf && ctx.weakOf(owner)) && !owner.overdrewInFlight;
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
 * What a roll can be made with (Chapter 3): each listed trait (the loud way marked), a switch to a trait the obstacle
 * doesn't list (its owner's or a helper's), the Draught's other form, and opening an approach (your own roll only).
 */
function rollCandidates(S, m, ctx) {
  const P = S.P;
  const phase = ctx.phase;
  const cands = ctx.options.map((o) => ({ trait: o.trait, loud: o.loud, quiet: false, via: null }));
  // "Use the ability's trait instead" (Chapter 3; V2: in a chase, instead of the ground's). Only a trait the obstacle
  // (or the ground) doesn't list: a trait it lists as loud is loud however you came to roll it (Chapter 5), so a switch
  // to a listed trait is that option at the price of a charge. An ability can help any Entity's roll at the same place
  // (Chapter 3; only opening an approach is your own roll's, F1), so a helper's switch counts too; sources() keeps it to
  // your own in a local chase and at the lock-up. (Before the audit: own switches only, and a switch to a trait listed
  // as loud was rolled quiet.)
  const listed = new Set(ctx.options.map((o) => o.trait));
  for (const src of sources(S, m, ctx, "switch")) {
    if (listed.has(src.ability.trait)) continue;
    listed.add(src.ability.trait); // sources() puts the owner with the most charges first
    cands.push({ trait: src.ability.trait, loud: false, quiet: false, via: src });
  }
  for (const ab of abilitiesOf(m)) {
    if (!(m.charges > 0 || overdrawAllowed(S, phase, m, ctx))) continue;
    // C2 (Jekyll & Hyde): The Draught changes form, so this roll and the next use the other form's dice.
    if (ab.effect === "form" && m.ent.formDice) {
      const other = m.ent.formDice[m.form === "hyde" ? "jekyll" : "hyde"];
      for (const o of ctx.options) cands.push({ trait: o.trait, loud: o.loud, quiet: false, die: other[o.trait], formChange: true, via: { owner: m, ability: ab } });
    }
    if (ab.effect === "open") {
      if (ab.noLoot && (m.items.length || m.furniture)) continue; // what you carry doesn't pass through walls
      // openTrait "unlisted" (T5): only an approach the obstacle doesn't already offer, and never in a chase.
      if (P.openTrait === "unlisted" && (phase === "local" || phase === "final" || ctx.options.some((o) => o.trait === ab.trait))) continue;
      // openApproach (gap G3, S10): "quiet" = unwatched; "switch" = just the ability's trait;
      // "easier" = the ability's trait at Difficulty 2 lower, watched as usual.
      const quiet = phase === "raid" && P.openApproach === "quiet";
      const easier = (phase === "raid" || (phase === "slip" && P.openTrait === "unlisted")) && P.openApproach === "easier" ? (P.openEase ?? 2) : 0; // T5: the lock-up is an obstacle too; openEase: how much lower
      cands.push({ trait: ab.trait, loud: false, quiet, easier, via: { owner: m, ability: ab } });
    }
  }
  return cands;
}

/**
 * Choose how to make one roll (player policy, monsterPolicy / chargePolicy):
 * which listed trait (or an ability's trait), Mask or Monster, and which
 * abilities to spend. Evaluates every combination exactly.
 */
function planRoll(S, m, ctx) {
  const P = S.P;
  const phase = ctx.phase;
  const cands = rollCandidates(S, m, ctx);
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
  const showVal = P.monsterRule === "plus2" && !hasPerk(m, "rattle") ? 2 : 1;

  const headroom = S.limit - S.susp;
  const lambda = phase === "final" ? (ctx.furyLambda || 0) : 1.2 / Math.max(0.5, headroom);
  const mu = phase === "raid" ? P.caughtWeight : 0;
  const cc = chargeCost(S, phase);
  const costSuspP = ctx.noCost ? 0 : P.costChoice === "suspicion" ? 1 : P.costChoice === "mixed" ? (m.items.length ? 0.25 : 1 / 3) : 0;
  const loudSusp = P.loudRule === "suspicion" || P.loudRule === "both";
  const loudWitness = P.loudRule === "witness" || P.loudRule === "both";
  const critKey = P.critRule === "doubles" ? "critDoubles" : "critBeat4"; // value estimate only (beatN uses beat4's odds)
  const critExtra = (P.critEffect === "lead2" || P.critEffect === "both") && (phase === "local" || phase === "final");

  let best = null;
  for (const c of cands) {
    const base = c.die ?? diceOf(m)[c.trait];
    let up = 0;
    let down = m.nextStepDown;
    const duty = P.dutyEdge && phase === "raid" && ctx.locKind && ctx.locKind === m.duty;
    if (duty) up += 1;
    if (c.trait === "nimble" && carrying && !hasPerk(m, "tireless") && !(hasPerk(m, "bruteStrength") && m.form === "hyde")) down += 1; // carriers roll Nimble one size smaller
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
          const loudS = c.loud && loudSusp && !hasPerk(m, "lightStep") ? 1 : 0;
          const fixed = P.overdrawStack === "stack" ? loudS : Math.max(loudS, odSusp);
          const odExtra = P.overdrawStack === "stack" ? odSusp : 0;
          const showS = d.show.success, showC = d.show.cost, showT = d.show.trouble;
          const eSusp =
            (d.success - showS) * fixed + showS * Math.max(fixed, showVal) +
            (d.cost - showC) * (fixed >= 1 ? fixed : costSuspP) + showC * Math.max(fixed, showVal) +
            (d.trouble - showT) * Math.max(fixed, 1) + showT * Math.max(fixed, showVal, 1) + odExtra;
          // monsterRule "maskSafe" (S2 candidate): trouble on a Mask roll never gets you caught.
          const seenP = seenChance(S, m);
          const witnessed = phase === "raid" && ((ctx.witnessed && !c.quiet) || (c.loud && loudWitness)) && !(P.monsterRule === "maskSafe" && !isMon) && seenP > 0;
          let gain;
          if (phase === "local" || phase === "final") gain = d.success - d.trouble + (critExtra ? d[critKey] : 0);
          else if (phase === "slip") gain = d.success + (P.slipRule === "cost" || hasPerk(m, "builtToLast") ? 0.8 * d.cost : 0); // a Cost does nothing (Chapter 6) unless it frees you
          else gain = d.success + 0.6 * d.cost;
          // Overdraw once the hunt is on puts your Weakness in play for the rest of the flight (S1; B3 "once"). Before the audit this
          // cost was weighed only under "weakness", so with "once" (the default since B3) the players overdrew almost for free.
          const weakCost = phase === "final" && (P.overdrawAtLimit === "weakness" || P.overdrawAtLimit === "once") ? 0.3 * overdraws : 0;
          const value = gain - lambda * eSusp - mu * (witnessed ? seenP * d.trouble : 0) - cc * uses.length - (overdraws ? 0.15 : 0) - weakCost;
          if (!best || value > best.value + 1e-12) {
            best = { value, cand: c, traitDie: td.die, under: td.under, over: td.over, second, secondDie: sd, hidden: hid, uses, overdraws, witnessed, seenP, difficulty: D, fixedSusp: fixed };
          }
        }
      }
    }
  }
  return best;
}

/** Make the roll a plan describes, spend what it spends, and read the result (P2, CORE-RULES Rolling). */
function executeRoll(S, m, plan, phase, { noCost = false, deferCost = false } = {}) {
  const P = S.P;
  const overdrawn = [];
  for (const u of plan.uses) {
    if (u.ability.effect === "form" && u.owner === m && m.form === "hyde" && hasPerk(m, "practisedHand")) { S.rec.count("practised hand"); continue; }
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
  m.lastTrait = plan.cand.trait;
  const eyes = hasPerk(m, "hypnoticEyes") && plan.cand.trait === "charm"; // shows only if it beats the trait die by 2+
  const show = plan.second !== MASK && !plan.hidden && (eyes ? s - t >= 2 : monsterShows(t, s, P.monsterRule === "tie"));
  if (plan.cand.formChange) { m.form = m.form === "hyde" ? "jekyll" : "hyde"; S.rec.count("the draught"); }
  // C2b: when the Monster shows on one of Jekyll's rolls, Hyde takes over, free.
  if (m.ent.formDice && m.form !== "hyde" && plan.second !== MASK && (hasPerk(m, "steadyNerves") ? s - t >= 2 : monsterShows(t, s, P.monsterRule === "tie"))) { m.form = "hyde"; S.rec.count("Hyde takes over"); }
  // critEffect "charge"/"both" (S8 candidate): a Critical outside the chases gives the roller back one spent charge.
  if (critical && (P.critEffect === "charge" || P.critEffect === "both") && phase !== "local" && phase !== "final" && m.charges < m.chargesStart) {
    m.charges += 1;
    S.rec.count("charges regained by a Critical");
  }
  let gain = plan.fixedSusp;
  if (b === "trouble") gain = Math.max(gain, 1); // a trouble result +1
  if (show) gain = Math.max(gain, P.monsterRule === "plus2" && !hasPerk(m, "rattle") ? 2 : 1); // the Monster shows +2 (rattle: +1)
  let costKind = null;
  const costPending = deferCost && b === "cost" && phase !== "local" && phase !== "final" && !noCost; // a group check picks its Costs after all its rolls
  if (b === "cost" && phase !== "local" && phase !== "final" && !noCost && !deferCost) {
    costKind = pickCost(S, m, hasPerk(m, "oldMoney") && plan.cand.trait === "charm" ? 9 : gain);
    if (costKind === "suspicion") gain = Math.max(gain, 1);
  }
  S.rec.roll({
    phase, band: b, second: plan.second, show,
    critDoubles: isCritical(t, s, plan.difficulty, "doubles"),
    critBeat4: isCritical(t, s, plan.difficulty, "beat4"),
    margin: t + s - plan.difficulty,
    entity: m.id,
  });
  if (P.overdrawStack === "stack" && plan.overdraws) gain += S.N.overdrawSuspicion; // paid on top of the roll's rise
  // Out of Sight, outOfSightRule "half": seen on a 1–3 on a d6.
  const caught = b === "trouble" && plan.witnessed && (plan.seenP === undefined || plan.seenP >= 1 || S.rng.die(6) <= 3);
  return { band: b, critical, show, suspGain: gain, caught, costKind, costPending, overdrawn };
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
    const opts = hasPerk(m, "patienceOfAges") || (hasPerk(m, "wiseWoman") && m.lastTrait === "wits") ? ["stepdown"] : ["turn", "stepdown"];
    if (gain < 1) opts.push("suspicion");
    if (items.length && !hasPerk(m, "keeperOfTreasures") && !(S.P.fetchRule === "keeper" && hasPerk(m, "fetch"))) opts.push("drop");
    kind = S.rng.pick(opts);
  }
  S.rec.count(`cost:${kind}`);
  if (kind === "drop") {
    if (items.length === 0) { S.rec.detect("\"drop an item\" Cost with nothing carried (costs nothing)"); return kind; }
    // Picking it up again takes the next action. Only the superseded Fetch (fetchRule "pickup", before B2) waived that;
    // the audit (docs/audits/SIM-AUDIT.md) found the waiver still applied under B5's Fetch.
    if (P.dropRule === "recover") { if (!(P.fetchRule === "pickup" && hasPerk(m, "fetch"))) m.loseTurn = true; return kind; }
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
  const table = CHASE_TABLES[S.P.chaseTable] || CHASE_TABLE;
  const row = S.rng.int(0, table.length - 1);
  S.groundRow = row;
  return table[row].map((t) => ({ trait: t, loud: false }));
}

/** wallCrawler: in a chase you can always roll Nimble. */
function groundFor(m, ground) {
  const extra = hasPerk(m, "wallCrawler") ? "nimble" : hasPerk(m, "flyByNight") ? "wits" : null;
  return extra && !ground.some((o) => o.trait === extra) ? [...ground, { trait: extra, loud: false }] : ground;
}

/**
 * weaknessRule (C3 candidates): when the mob brings a mob-type Weakness.
 * "chance" = a placeholder chance at the start of each chase (weaknessLocal / weaknessFinal);
 * "always" = from the first round of every chase; "soon" = from the third round;
 * "table" = from the round the chase table shows a 6, for everyone in that chase.
 * Sunlight-type Weaknesses only bite in a dawn flight, from its first round.
 */
function weakStart(S, m, final, trigger) {
  if (m.ent.weakness !== "mob") return final && trigger === "dawn";
  const r = S.P.weaknessRule === "timing" ? (m.ent.weaknessTiming ?? "soon") : S.P.weaknessRule;
  if (r === "always") return true;
  if (r === "soon" || r === "table") return false;
  return S.rng.chance(final ? S.P.weaknessFinal : S.P.weaknessLocal);
}
function weakNow(S, m, was, round) {
  if (was || m.ent.weakness !== "mob") return was;
  const r = S.P.weaknessRule === "timing" ? (m.ent.weaknessTiming ?? "soon") : S.P.weaknessRule;
  return (r === "soon" && round >= 2) || (r === "table" && S.groundRow === CHASE_TABLE.length - 1);
}

/** DESIGN Chase (Lead track) + Two kinds of chase: a local chase; cornered = captured. */
/** A local chase, with its length and the Suspicion it raised kept as histograms ("hist local …"). */
function localChase(S, m) {
  const s0 = S.susp, t = { r: 0 };
  try { return localChaseBody(S, m, t); } finally { S.rec.count(`hist local rounds ${t.r}`); S.rec.count(`hist local susp ${S.susp - s0}`); }
}

function localChaseBody(S, m, t) {
  const N = S.N;
  S.rec.count("local chases");
  let weak = weakStart(S, m, false);
  let lead = N.lead.localStart + (hasPerk(m, "nightRunner") ? 1 : 0);
  const curse = hasPerk(m, "fearTheCurse") ? 1 : 0;
  const critW = S.P.critEffect === "lead2" || S.P.critEffect === "both" ? 2 : 1;
  for (let round = 0; round < N.maxChaseRounds; round++) {
    t.r = round + 1;
    const mobD = Math.min(N.localMob.max, N.localMob.base + Math.floor(S.susp * N.localMob.perSuspicion)) - curse;
    const options = chaseGround(S);
    weak = weakNow(S, m, weak, round);
    const ctx = { phase: "local", options: groundFor(m, options), difficulty: mobD, witnessed: false, helpers: [], locKind: null, weakness: weak };
    const plan = planRoll(S, m, ctx);
    const r = executeRoll(S, m, plan, "local");
    lead += leadMove(r, critW);
    if (S.P.chaseSusp === "yes") addSusp(S, r.suspGain, "chase"); // chaseSusp "no" (S6 candidate): chase rolls don't raise Suspicion
    else if (S.P.chaseSusp.startsWith("cap")) { const add = Math.min(r.suspGain, Number(S.P.chaseSusp.slice(3)) - (t.gain ?? 0)); if (add > 0) { t.gain = (t.gain ?? 0) + add; addSusp(S, add, "chase"); } } // PT5 candidate: at most N per chase
    // B3: cornered in the round the Limit comes, you're captured first; then the final flight starts without you.
    if (lead <= 0 && S.P.corneredAtLimit === "captured") {
      if (hasPerk(m, "alreadyDead")) { m.loseTurn = S.P.alreadyDeadTurns > 1 ? S.P.alreadyDeadTurns : true; S.rec.count("already dead: drifted off"); }
      else capture(S, m);
      if (limitHit(S)) { S.rec.count("local chase ended by the Limit"); finalFlight(S, "limit"); }
      return;
    }
    if (limitHit(S)) { S.rec.count("local chase ended by the Limit"); return finalFlight(S, "limit"); }
    if (lead >= N.lead.localEscape) { S.rec.count("local chase escaped"); return; }
    if (lead <= 0) {
      if (hasPerk(m, "alreadyDead")) { m.loseTurn = S.P.alreadyDeadTurns > 1 ? S.P.alreadyDeadTurns : true; S.rec.count("already dead: drifted off"); return; }
      return capture(S, m);
    }
  }
  S.rec.detect("local chase stalled (no end after max rounds)");
}

/** multiCaught "shared" (S11 candidate): several Entities caught by one roll flee together on one Lead. */
function groupChase(S, group) {
  const N = S.N;
  S.rec.count("local chases (shared)");
  const weak = new Map(group.map((m) => [m, weakStart(S, m, false)]));
  let lead = N.lead.localStart, gained = 0;
  const critW = S.P.critEffect === "lead2" || S.P.critEffect === "both" ? 2 : 1;
  for (let round = 0; round < N.maxChaseRounds; round++) {
    const mobD = Math.min(N.localMob.max, N.localMob.base + Math.floor(S.susp * N.localMob.perSuspicion));
    const ground = chaseGround(S);
    for (const m of group) weak.set(m, weakNow(S, m, weak.get(m), round));
    const results = group.map((m) => executeRoll(S, m, planRoll(S, m, { phase: "local", options: groundFor(m, ground), difficulty: mobD, witnessed: false, helpers: [], locKind: null, weakness: weak.get(m) }), "local"));
    lead += majorityMove(results, critW, S.P.finalMove ?? "majority");
    if (S.P.chaseSusp === "yes") addSusp(S, Math.max(0, ...results.map((r) => r.suspGain)), "chase");
    else if (S.P.chaseSusp.startsWith("cap")) { const add = Math.min(Math.max(0, ...results.map((r) => r.suspGain)), Number(S.P.chaseSusp.slice(3)) - gained); if (add > 0) { gained += add; addSusp(S, add, "chase"); } }
    if (lead <= 0 && S.P.corneredAtLimit === "captured") {
      for (const m of group) { if (hasPerk(m, "alreadyDead")) m.loseTurn = S.P.alreadyDeadTurns > 1 ? S.P.alreadyDeadTurns : true; else capture(S, m); }
      if (limitHit(S)) finalFlight(S, "limit");
      return;
    }
    if (limitHit(S)) return finalFlight(S, "limit");
    if (lead >= N.lead.localEscape) return;
    if (lead <= 0) { for (const m of group) { if (hasPerk(m, "alreadyDead")) m.loseTurn = S.P.alreadyDeadTurns > 1 ? S.P.alreadyDeadTurns : true; else capture(S, m); } return; }
  }
  S.rec.detect("local chase stalled (no end after max rounds)");
}

function capture(S, m) {
  m.status = "captured";
  S.captures++;
  m.capturedTurn = S.turn; // the capture used this Turn: the first slip try is next Turn
  S.rec.count("captures");
  if (S.P.fetchRule === "grab" && m.items.length && !hasPerk(m, "hiddenPockets")) {
    // B2 candidate: a Werewolf with Fetch beside the captive grabs what it carried.
    const dog = (S.here ?? active(S)).find((o) => o !== m && o.status === "active" && hasPerk(o, "fetch"));
    if (dog) { dog.items.push(...m.items); m.items = []; S.rec.count("fetch: grabbed a captive's loot"); }
  }
  if (S.P.captiveItems === "lost" && !hasPerk(m, "hiddenPockets")) m.items = [];
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
    if (m.capturedTurn === S.turn) continue;
    const ctx = {
      phase: "slip",
      options: [{ trait: "sly", loud: false }, { trait: "nimble", loud: false }, { trait: "brawn", loud: true }], // T8: like the way out
      difficulty: S.town.lockup.difficulty, witnessed: false, helpers: [], locKind: null, weakness: false, noCost: true,
    };
    const plan = planRoll(S, m, ctx);
    if (plan.value <= 0.05) continue;
    // Chapter 6: "Only a Success frees you; a Cost does nothing" (no Storyteller Cost on a slip roll; Built to Last: a Cost frees).
    const r = executeRoll(S, m, plan, "slip", { noCost: true });
    addSusp(S, r.suspGain, "slip");
    // slipRule (S6 candidate): "cost" = a Success or a Cost frees you; "success" = only a Success does.
    if (r.band === "success" || (r.band === "cost" && (S.P.slipRule === "cost" || hasPerk(m, "builtToLast")))) freeCaptive(S, m, "slipped free");
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
  const weak = new Map(fleeing.map((m) => [m, weakStart(S, m, true, trigger)]));
  const baseMob = S.L.finalMob + (fleeing.length - 4) * N.finalMobPerExtraEntity;
  const critW = S.P.critEffect === "lead2" || S.P.critEffect === "both" ? 2 : 1;
  const furyRule = S.P.overdrawAtLimit === "fury";
  let fury = 0; // overdrawAtLimit "fury": what would raise Suspicion makes the mob harder instead
  let lead = (S.L.finalStart ?? N.lead.finalStart) + (["flight", "flightExit", "flightLockup"].includes(S.P.fetchRule) && active(S).some((o) => hasPerk(o, "fetch")) ? (S.P.fetchLead ?? 1) : 0); // a label may set its own starting Lead; B2 candidate: Fetch +1
  for (let round = 0; round < N.maxChaseRounds; round++) {
    const closeIn = N.finalCloseIn > 0 && round + 1 >= N.finalCloseIn ? round + 2 - N.finalCloseIn : 0;
    const mobD = Math.min(Math.max(baseMob, N.finalCloseCap ?? 12), baseMob + closeIn) + fury;
    const fetchEase = S.P.fetchMob && fleeing.some((o) => o.status !== "captured" && hasPerk(o, "fetch")) ? S.P.fetchMob : 0; // B4 candidate
    // Policy: carriers drop the furniture when the mob is about to corner them.
    if (lead <= 1 && S.furnitureCarried) dropFurniture(S, "final flight");
    const ground = chaseGround(S);
    for (const m of fleeing) weak.set(m, weakNow(S, m, weak.get(m), round));
    const results = [];
    for (const m of fleeing) {
      const ctx = {
        phase: "final", options: groundFor(m, ground), difficulty: mobD - fetchEase, witnessed: false, helpers: fleeing.filter((h) => h !== m),
        locKind: null, weakness: weak.get(m), weakOf: (o) => weak.get(o),
        furyLambda: furyRule && fury < N.furyCap ? N.furyLambda : 0,
      };
      const plan = planRoll(S, m, ctx);
      const r = executeRoll(S, m, plan, "final");
      if (S.P.overdrawAtLimit === "weakness" || S.P.overdrawAtLimit === "once") for (const o of r.overdrawn) { if (!weak.get(o)) S.rec.count("weakness taken by overdraw"); weak.set(o, true); o.overdrewInFlight = true; }
      results.push(r);
    }
    if (furyRule) {
      // The round raises the fury once, by its biggest trigger (as a group check raises Suspicion).
      const add = Math.max(0, ...results.map((r) => r.suspGain));
      const before = fury;
      fury = Math.min(N.furyCap, fury + add);
      S.rec.count("fury", fury - before);
    }
    lead += majorityMove(results, critW, S.P.finalMove ?? "majority");
    if (lead >= (S.L.finalEscape ?? N.lead.finalEscape)) { // a label may set its own escape
      for (const m of fleeing) m.status = "home";
      S.rec.count("final flight escaped");
      S.rec.count("final flight rounds", round + 1);
      S.rec.count(`hist final ${round + 1}`);
      return;
    }
    if (lead <= 0) {
      for (const m of fleeing) m.status = "forked";
      S.forked = true;
      S.rec.count("forked");
      S.rec.count("final flight rounds", round + 1);
      S.rec.count(`hist final ${round + 1}`);
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

/** Internals for test/sim.test.mjs (not part of the simulator's interface). */
export const internals = { makeState, rollCandidates, planRoll, executeRoll, pickCost, workLocation, groupCheck, exitLocation, captivesAct, ctxFor, followsBehind, hereOf };
