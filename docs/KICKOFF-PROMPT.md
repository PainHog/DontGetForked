# Kickoff prompt for the first design session

Start a new session with the **DontGetForked** repository selected, then paste everything below the line.

---

I'm Richard Moore, starting my second tabletop RPG: **Don't Get Forked**. You helped me finish my first, *Heisty Spideys*. This repository already has the same toolchain set up (rulebook pipeline, simulator skeleton, Foundry VTT system skeleton) and three documents to read first:

1. `AGENTS.md`: how we work. I decide all game content. You propose options and I choose.
2. `docs/DESIGN.md`: my pitch, the decisions so far, and the open questions.
3. `docs/LESSONS.md`: what went wrong on Heisty Spideys and what to decide up front this time.

`docs/reference/` holds Heisty's balance study and its Foundry automation design, for reference. If we decide to reuse Heisty's engine, ask me to attach the SpideyHeist repository to the session so you can read its rulebook and code directly. It is read-only reference: never change, commit or push anything there (see `AGENTS.md`).

Read all three, then let's design the game together. Today's goal is the **core design**, not writing chapters:

- Interview me through the open questions in `docs/DESIGN.md`, in order. Ask one topic at a time, and give two or three concrete options for each, with your recommendation and why. Use what we learned on Heisty Spideys.
- Start with question 1, the engine: reuse the Heisty Spideys engine, adapt it, or build new. Lay out the trade-offs.
- After each decision, record it in the Decisions log in `docs/DESIGN.md`, then commit and push.
- Once the engine, the Entities' shape, the charges, the town structure and the chase are settled, write a one-page core rules summary in `docs/CORE-RULES.md`. Then build a first rough simulation in `sim/` against the win-rate targets we agree on.
- Don't write rulebook chapters or art until I've approved the core rules.

Keep an eye out for anything in my ideas that would cause the kinds of problems listed in `docs/LESSONS.md`, and flag it early.
