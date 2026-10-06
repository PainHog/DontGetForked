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
  showOdds: "showOdds"                        // client: show the odds in the roll dialog
});

/** Chat-card kinds (flags["dont-get-forked"].card.kind). */
export const CARD = Object.freeze({
  roll: "roll",       // an Entity's roll (dice, band, the Monster, Suspicion, Costs)
  ability: "ability", // a charge spent outside a roll (the sheet), or the Draught
  raid: "raid"        // the raid's announcements (new raid, dawn, the hunt)
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
  actorSpendCharges: "actor.spendCharges" // anyone: a helper's charges for an ability on someone else's roll
});

/** Hooks this system fires (other modules may listen). */
export const HOOKS = Object.freeze({
  rollResolved: "dontGetForked.rollResolved",         // (message, card) on the roller's client
  raidChanged: "dontGetForked.raidChanged",           // (state, previous) on every client
  suspicionChanged: "dontGetForked.suspicionChanged", // (value, previous) on every client
  huntStarted: "dontGetForked.huntStarted"            // (state) on every client
});
