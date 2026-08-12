# Active Work: One-Project-at-a-Time Portfolio Copy Rewrite

**Updated:** 2026-08-12
**Branch:** `docs/cognition-led-engineering-writer`
**Current project:** None selected
**Last completed project:** `DIY 压风式散热器原型`
**State:** Cognition-led writer redesign is complete on Windows; continue from the pushed topic branch on macOS

## Working Contract

- Leave the approved Arduino Smart Car project, note, and media copy unchanged.
- Rewrite every other project family one at a time, never as a batch.
- Before writing each project, inspect its uploaded public materials, then
  reuse a user-confirmed brief for the same scope or run a `grill-me` interview.
- Treat the user's voice answers as primary first-person material. They may be
  disordered; extract engineering decisions, mistakes, reactions, and changes
  in understanding before drafting.
- Store confirmed understanding as a compact, non-sensitive brief rather than
  an interview transcript.
- Only after confirmation, research current reliable knowledge beyond the
  uploaded material; use nearby links lightly and keep new first-person insight
  in the present, never as invented project history, action, result, or measurement.
- Use `skills/engineering-note-writer/SKILL.md` to draft Chinese through the
  user's cognition trail, allowing genuine cross-subsystem or non-strictly
  chronological attention without imposing a cognition template.
- Adapt English with the same facts and calmer intensity, then require
  first-person prose to pass both the Truth gate and Li Zhiyi gate.
- Evidence bounds project facts, authorship, results, and publication claims,
  but must not choose the reader-facing structure.

## Confirmed Global Decisions

- Public display name: Alvin Li.
- Public contact remains GitHub-only; email and location stay hidden.
- Project demonstration media remains unchanged unless the user explicitly
  requests an asset edit.
- A project rewrite reaches `main` only after the user reviews its bilingual
  copy and explicitly approves the merge.

## Completed DIY Cooling Checkpoint

- Pull request #5 merged into `main` on 2026-08-12 at merge commit
  `83ca508319d0bb5412b2c001c734674763d1a621`.
- The bilingual project page, learning note, and six related media records now
  follow the CSGO frame-drop motivation, Windows/Bluetooth/ESP32 control chain,
  PID false start, assembled ESP32 machine, serial-tested STM32 board, and the
  A1 mini enclosure revision that was modeled and sliced but never printed.
- The remembered 20-30 FPS improvement and roughly 92-93 C to 84 C temperature
  change remain clearly framed as personal recollection without synchronized
  logs or a controlled benchmark.
- The approved Smart Car family and the DIY cooling demonstration video were
  not changed by the final DIY pass.

## Cognition-Led Writer Checkpoint

- The repository-local writer now treats evidence as the factual floor instead
  of the article structure. Substantive first-person writing requires a
  user-confirmed shared-understanding brief or a `grill-me` interview first.
- After confirmation, the workflow researches relevant current knowledge beyond
  uploaded artifacts, keeps source links light and nearby, and writes new
  knowledge as present understanding rather than invented project history.
- Composition follows the writer's changing attention. It may move among
  circuits, firmware, desktop software, mechanics, fabrication, and later
  synthesis without pretending to follow strict chronology or a fixed template.
- Truth and Li Zhiyi voice are independent release gates. A factually careful
  compliance report still fails if the reader cannot follow a human learning
  route.
- Behavioral Trials 06-11 run against final runtime commit `9eab429`; the final
  manifest contains 34 hashed runtime/input/output files. The retained GREEN
  outputs pass every applicable gate.
- No `content/**/*.mdx`, `content/media.json`, or `public/uploads/` file changed.
  The existing 21 published notes remain outside this redesign.

## Next Action

On the Mac, preserve any local work and then resume the pushed topic branch:

```bash
git status --short --branch
git fetch --prune origin
git switch --track origin/docs/cognition-led-engineering-writer
```

If the local branch already exists, use:

```bash
git switch docs/cognition-led-engineering-writer
git pull --ff-only origin docs/cognition-led-engineering-writer
```

Then read `AGENTS.md`, `CODEX.md`, this file, and the draft PR before editing.
Restore dependencies and run at least `npm run lint` and `npm run typecheck`.
Continue writer work on this branch until the PR is reviewed; do not merge it
without the user's explicit approval. No portfolio project is currently active.
After this writer PR is resolved, select the next project from synchronized
`main`, create a semantic topic branch, and resume the one-project interview and
writing contract above.

## Updating This File

Replace stale current-state sections at each device handoff; do not append an
endless transcript. Keep durable writing rules and confirmed decisions. Never
commit credentials, private email addresses, private locations, tokens, or
machine-specific absolute paths.
