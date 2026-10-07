/**
 * DON'T GET FORKED — Cross-package contracts.
 * Constants only: no imports, no Foundry globals, no logic. Every name that two
 * parts of the system must agree on (setting keys, chat-card kinds, GM operation
 * names, hook names, flag scopes) is declared here once and imported everywhere,
 * so packages built in parallel cannot drift apart; a test asserts each one is
 * actually used. Change it only on purpose, together with every user of it.
 */
export const SYSTEM_ID = "dont-get-forked";
/** Flag scope for documents (flags["dont-get-forked"]). */
export const FLAG = "dont-get-forked";
/** CONFIG.queries handler name for GM-authoritative operations. */
export const QUERY = "dont-get-forked.op";
/** Socket channel (system.json "socket": true). */
export const SOCKET = "system.dont-get-forked";

/** The one Actor type: a player's Entity. */
export const ACTOR_TYPES = Object.freeze({ entity: "entity" });

/** World/client setting keys. */
export const SETTINGS = Object.freeze({
  migrationVersion: "systemMigrationVersion", // world, hidden: version-keyed migrations (none yet)
  raidState: "raidState",                     // world, hidden: the raid (module/logic/raid.mjs); GM writes only
  autoSuspicion: "autoSuspicion",             // world: rolls raise Suspicion on the HUD by themselves
  autoCharges: "autoCharges",                 // world: abilities spend charges; a Critical gives one back
  autoForm: "autoForm",                       // world: Jekyll becomes Hyde when the Monster shows
  autoCosts: "autoCosts",                     // world: a Cost the Storyteller picks applies itself
  autoHunt: "autoHunt",                       // world: the hunt starts by itself at the Limit or at dawn
  hudVisible: "hudVisible",                   // world: show the Raid HUD to everyone
  autoChase: "autoChase",                     // world: chases run themselves (start, the ground, the Lead, the end)
  autoLockup: "autoLockup",                   // world: capture, slipping free and rescue change the Entities by themselves
  autoGroupChecks: "autoGroupChecks",         // world: a group check's rolls share one Suspicion rise; its caught flee together
  autoYear: "autoYear",                       // world: the end of the raid offers (or, when forked, posts) how the year went
  autoFurniture: "autoFurniture",             // world: carried furniture raises Suspicion at the end of each Turn
  resetOnNewRaid: "resetOnNewRaid",           // world: a new raid frees the Entities, refills charges, clears marks
  chaseTracker: "chaseTracker",               // world: open the chase tracker for everyone when a chase starts
  autoDrops: "autoDrops",                     // world: dropped loot waits where it fell; picking it up spends the next action (V21)
  campaign: "campaign",                       // world: the optional campaign rules: castle upgrades (default off)
  castleUpgrades: "castleUpgrades",           // world, hidden: the castle's upgrades (the pieces brought home, three at most)
  showOdds: "showOdds"                        // client: show the odds in the roll dialog
});

/** Chat-card kinds (flags["dont-get-forked"].card.kind). */
export const CARD = Object.freeze({
  roll: "roll",       // an Entity's roll (dice, band, the Monster, Suspicion, Costs)
  ability: "ability", // a charge spent outside a roll (the sheet), or the Draught
  raid: "raid",       // the raid's announcements (new raid, dawn, the hunt, group checks)
  chase: "chase",     // a chase: its start, the ground, each round's Lead, the end and what it cost
  tell: "tell",       // a Tell check (the d6, whose Tell, Suspicion +1)
  year: "year"        // how the year went: the result and the epilogue
});

/** GM-authoritative operation names (module/net/gm-ops.mjs). */
export const OPS = Object.freeze({
  raidApplyCard: "raid.applyCard",       // anyone: apply a card's Suspicion to the ledger
  raidCost: "raid.cost",                 // GM: the Storyteller picks a Cost on a roll card
  raidAdjust: "raid.adjust",             // GM: Suspicion +1 / −1 by hand
  raidCancel: "raid.cancel",             // GM: cancel (or restore) one event
  raidUndo: "raid.undo",                 // GM: cancel the newest event that still counts
  raidTurn: "raid.turn",                 // GM: next / previous Turn (dawn after the last)
  raidHunt: "raid.hunt",                 // GM: start or stop the hunt by hand
  raidReset: "raid.reset",               // GM: a new raid at a difficulty
  actorSpendCharges: "actor.spendCharges", // anyone: a roll card's helpers pay for the abilities they lent (once, as the card says)
  raidRoll: "raid.roll",                 // anyone: a roll card's Suspicion, group check, chase, capture and lock-up effects
  raidGroup: "raid.group",               // GM: open or close a group check
  raidTell: "raid.tell",                 // GM: a Tell check for the Entities arriving at a watched location
  raidList: "raid.list",                 // GM: roll, set or clear the shopping list
  raidEnd: "raid.end",                   // GM: how the year went (the end of the raid)
  raidFurniture: "raid.furniture",       // GM: the furniture's piece in play, out of town or lost, by hand
  raidBackInTown: "raid.backInTown",     // GM: take back a mistaken leaving of town (before the year is read)
  raidMember: "raid.member",             // GM: tick an Entity into this raid or out of it (F26)
  castleUpgrade: "castle.upgrade",       // GM: a piece brought home becomes a castle upgrade (campaign play)
  raidDrop: "raid.drop",                 // the Entity's owner: drop one of its loot items where it is (V21)
  raidPickUp: "raid.pickUp",             // an Entity's owner: pick a dropped item up (it costs that Entity's next action)
  chaseStart: "chase.start",             // GM: start a local chase from a caught card, or the final flight, by hand
  chaseGround: "chase.ground",           // GM: roll the ground for the round
  chaseResolve: "chase.resolve",         // GM: move the Lead by the round's rolls
  chaseLead: "chase.lead",               // GM: Lead +1 / −1 by hand
  chaseEnd: "chase.end",                 // GM: end the chase by hand (escaped, cornered, called off)
  chaseMember: "chase.member",           // GM: add an Entity to the chase or take it out
  lockupSet: "lockup.set"                // GM: capture or free an Entity by hand
});

/** Hooks this system fires (other modules may listen). */
export const HOOKS = Object.freeze({
  rollResolved: "dontGetForked.rollResolved",         // (message, card) on the roller's client
  raidChanged: "dontGetForked.raidChanged",           // (state, previous) on every client
  suspicionChanged: "dontGetForked.suspicionChanged", // (value, previous) on every client
  huntStarted: "dontGetForked.huntStarted",           // (state) on every client
  chaseChanged: "dontGetForked.chaseChanged",         // (chase, previous) on every client
  chaseEnded: "dontGetForked.chaseEnded",             // (chase) on every client, once its outcome is known
  yearDecided: "dontGetForked.yearDecided"            // (year) on the Storyteller's client, when the year card is posted
});
