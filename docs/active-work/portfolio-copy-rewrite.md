# Active Work: One-Project-at-a-Time Portfolio Copy Rewrite

**Updated:** 2026-08-13
**Branch:** `docs/rewrite-digital-clock`
**Current project:** `Arduino 面包板两位数码管计数器`
**Last completed project:** `DIY 压风式散热器原型`
**State:** The bilingual rewrite is approved and Draft PR #10 is open; merge still requires separate user approval

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

- Pull request #5 merged the first approved interview-led rewrite into `main`
  on 2026-08-12 at merge commit `83ca508319d0bb5412b2c001c734674763d1a621`.
- The bilingual project page, learning note, and six related media records now
  follow the CSGO frame-drop motivation, Windows/Bluetooth/ESP32 control chain,
  PID false start, assembled ESP32 machine, serial-tested STM32 board, and the
  A1 mini enclosure revision that was modeled and sliced but never printed.
- The remembered 20-30 FPS improvement and roughly 92-93 C to 84 C temperature
  change remain clearly framed as personal recollection without synchronized
  logs or a controlled benchmark.
- The approved Smart Car family and the DIY cooling demonstration video were
  not changed by the final DIY pass.
- After the cognition-led writer reached `main`, pull request #9 applied the
  final cognition-led DIY project, note, and media-copy pass and merged into
  `main` at `baa7c98ff30b0fc7988c3c339d621459e2e661ba`.

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
- Pull request #8 merged this writer redesign into `main` at
  `39a1129e87d9776d1f598a43e1d75d060afe1e85`. The skill redesign itself did not
  change `content/**/*.mdx`, `content/media.json`, or `public/uploads/`.

## Digital Clock Starting Boundary

- Scope is one project family: `content/projects/arduino-digital-clock-counter.mdx`,
  `content/notes/arduino-digital-clock-counter-course-note.mdx`, and the 11
  related media-copy records. Public uploads stay unchanged unless the user
  separately requests an asset edit.
- The committed evidence includes the two-page A17 project report, two course
  demo sketches, the 17-second bench video, the Nano breadboard photo, selected
  course/report images, and the SN54LS47 datasheet. Course material and group
  artifacts do not by themselves prove individual authorship or personal decisions.
- A Mac-local Xcode `DigitalClockTest/main.c` development snapshot is dated
  2024-04-19. It starts `Num` at 15 and resets at 18, explaining the visible
  `16 -> 17 -> 00` sequence, but it only implements one switch, leaves the
  second switch unfinished, contains a missing semicolon, and mislabels the
  reset condition as "after 99." Treat it as a development trace, not final source.
- The surviving report conflicts internally about button polarity: it describes
  pressed-high behavior, shows one `HIGH` and one `LOW` code branch, then describes
  a 10k-ohm pull-up with pressed-low behavior. Preserve that documentary conflict;
  do not invent a final debounce or polarity implementation from it.
- The correct SN54LS47 datasheet in the public archive was found later during
  portfolio curation. It is valid for present explanation but was not a resource
  used during the original project.
- The approved Smart Car family and the completed DIY Cooling family remain
  unchanged.

## Confirmed Digital Clock Shared Understanding

- The user joined Group A17 at a friend's invitation and personally carried the
  main technical implementation: breadboard construction, pin research,
  decoder/display wiring, Arduino programming, button debugging, and final
  integration. Other members handled the report, video, and general group work.
- This was the user's second embedded project. The initial mental model was only
  "write a counting program and flash it to Arduino"; BCD, seven-segment display
  behavior, and component internals were learned while reading course material
  and online examples during the build.
- The most important failure was a hardware/reference mismatch. The course PPT
  showed a common-cathode CD4511-style solution, while the supplied display and
  LS47 path required the common terminal to connect to VCC. Following the PPT
  produced blank or garbled output. The user discovered the working polarity by
  probing segment behavior on the breadboard, reported it to the professor, and
  the professor announced the correction to the class because multiple groups
  had encountered the same problem.
- The six-pin self-locking switches arrived without a datasheet. No response,
  unstable readings, and double triggers appeared while the internal topology
  was still unknown. The user borrowed a multimeter from the teacher and used
  continuity testing across the pins to map the connection changes. The final
  pause and reset controls both worked, but the surviving material does not prove
  the exact final polarity or debounce method.
- The group-number rollover and the 99 rollover were two separately modified and
  flashed firmware versions, each verified by the teacher; they were not runtime
  modes. The user-written `main.c` is an early A17-oriented development snapshot,
  not the final source. Xcode appears only because macOS opened the file with the
  editor already associated with the user's basic C exercises.
- The final classroom demonstration to the TA passed with both buttons working
  and received full marks. The surviving 17-second video only shows changing
  digits, so it should not be presented as video proof of the button functions.
- Present-day synthesis may connect Arduino state, BCD inputs, decoder outputs,
  LED current paths, documentation mismatch, and measurement-led debugging. Mark
  that system-level interpretation as something formed in retrospect, not as the
  user's complete understanding at the time.
- Reader-facing split: the project page covers the whole build, individual
  technical ownership, two separately flashed versions, and formal result. The
  learning note centers the common-anode/common-cathode mismatch and the move
  from random jumper experiments to measuring actual component behavior, with
  BCD and button work as support.

## Digital Clock Bilingual Draft Checkpoint

- The user approved the Chinese project page, learning note, and 11 related
  media-copy records on 2026-08-13.
- The user approved the completed bilingual rewrite on 2026-08-13.
- The English adaptation now preserves the same cognition route, authorship
  boundary, separately flashed firmware versions, professor announcement,
  multimeter-led switch investigation, formal full-mark result, and archive limits.
- Present-day technical explanation links the official TI LS47 and CD4511B
  material beside the polarity discussion, and links Arduino references beside
  debounce and blocking-delay interpretation. None of those later sources are
  presented as resources used during the original project.
- Truth and Li Zhiyi review gates pass for the bilingual draft. The video remains
  evidence only for changing digits; the user-written `main.c` remains an early
  development trace; final button polarity and debounce implementation remain
  unresolved rather than reconstructed.
- `npm run lint`, `npm run typecheck`, and `npm run build` pass. Content validation
  reports 8 projects, 21 notes, and 73 media items; encoding validation reports
  283 UTF-8 text files; the production build generates 36 static pages.
- Draft pull request #10 targets `main` from `docs/rewrite-digital-clock` and
  contains the approved rewrite plus the preceding `/neat` handoff reconciliation.

## Next Action

1. Let Draft PR #10 finish its remote checks and address only actionable failures
   or review comments.
2. Merge only after the user's separate explicit merge approval.

## Updating This File

Replace stale current-state sections at each device handoff; do not append an
endless transcript. Keep durable writing rules and confirmed decisions. Never
commit credentials, private email addresses, private locations, tokens, or
machine-specific absolute paths.
