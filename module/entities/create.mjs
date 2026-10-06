/**
 * DON'T GET FORKED — making an Entity
 * The Storyteller creates a player's Entity from one of the eight premades
 * (rulebook Chapter 2), filled with the book's dice and marked defaults
 * (module/logic/entity.mjs entitySystem). Entry points: the "New Entity" button
 * in the Actors sidebar, the sheet's "Choose Entity" (for a blank Entity), and
 * game.dontGetForked.createEntity(key, { ownerId }).
 */
import { SYSTEM_ID, ACTOR_TYPES } from "../contracts.mjs";
import { DGF } from "../config.mjs";
import { entitySystem } from "../logic/entity.mjs";
import { t } from "../helpers/i18n.mjs";

const TEMPLATE = `systems/${SYSTEM_ID}/templates/apps/choose-entity.hbs`;
const OWNER = () => CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER;
const OBSERVER = () => CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER;

/**
 * GM: create an Entity actor pre-filled from the book. The party can see each
 * other's sheets (Observer), so they can help each other's rolls; `ownerId`
 * (a player) owns it.
 */
export async function createEntity(key, { name, ownerId = "", upgrades = 0 } = {}) {
  const e = DGF.entities.find((x) => x.key === key);
  if (!e) throw new Error(`unknown Entity: ${key}`);
  const ownership = { default: OBSERVER() };
  if (ownerId) ownership[ownerId] = OWNER();
  // A linked token: rolls from a token on a scene change this actor, the one the raid tracks.
  return Actor.create({ name: name || e.name, type: ACTOR_TYPES.entity, system: entitySystem(key, { upgrades }), ownership, prototypeToken: { actorLink: true } });
}

/** The update that turns an existing actor into this premade Entity (the book's defaults). */
export function becomeEntityUpdate(key) {
  return { system: entitySystem(key) };
}

/**
 * Ask which Entity (and, when creating, for which player). Entities already in
 * the world are marked: no two players in a party play the same one.
 * Resolves to { key, ownerId } or null.
 */
export async function chooseEntity({ withOwner = false, current = "" } = {}) {
  const taken = new Set(game.actors.filter((a) => a.type === ACTOR_TYPES.entity).map((a) => a.system.entityKey).filter(Boolean));
  const context = {
    entities: DGF.entities.map((e, i) => ({ key: e.key, name: e.name, taken: taken.has(e.key) && e.key !== current, selected: current ? e.key === current : i === 0 })),
    withOwner,
    players: game.users.filter((u) => !u.isGM).map((u) => ({ id: u.id, name: u.name })),
  };
  const content = await foundry.applications.handlebars.renderTemplate(TEMPLATE, context);
  const answer = await foundry.applications.api.DialogV2.wait({
    window: { title: t(withOwner ? "DGF.Create.title" : "DGF.Create.chooseTitle") },
    classes: ["dont-get-forked", "dgf-choose-entity"],
    content,
    buttons: [
      {
        action: "ok", label: t(withOwner ? "DGF.Create.create" : "DGF.Create.choose"), default: true,
        callback: (event, button) => ({
          key: button.form.elements.namedItem("entity")?.value ?? "",
          ownerId: button.form.elements.namedItem("owner")?.value ?? "",
        }),
      },
      { action: "cancel", label: t("DGF.Dialog.cancel") },
    ],
    rejectClose: false,
  });
  return answer && typeof answer === "object" && answer.key ? answer : null;
}

/** The sidebar button's flow: choose, then create (GM only). */
export async function newEntityFlow() {
  if (!game.user?.isGM) return null;
  const answer = await chooseEntity({ withOwner: true });
  if (!answer) return null;
  const actor = await createEntity(answer.key, { ownerId: answer.ownerId });
  actor?.sheet?.render?.(true);
  return actor;
}

/** renderActorDirectory: a "New Entity" button for the Storyteller. */
export function onRenderActorDirectory(app, html) {
  if (!game.user?.isGM || !html?.querySelector) return;
  if (html.querySelector(".dgf-new-entity")) return;
  const host = html.querySelector(".header-actions") ?? html.querySelector(".directory-header") ?? html;
  const b = document.createElement("button");
  b.type = "button";
  b.className = "dgf-new-entity";
  b.innerHTML = `<i class="fa-solid fa-ghost"></i> ${t("DGF.Create.button")}`;
  b.addEventListener("click", (event) => { event?.preventDefault?.(); newEntityFlow(); });
  host.appendChild(b);
}
