# Active Work: Homepage Release and Arduino Car Learning Note

**Updated:** 2026-09-06

**Branch:** `docs/refactor-project-homepages`

**State:** Seven homepages approved for release on 2026-09-06. Complete the PR and production verification, then work on the selected Arduino note. GitHub records the live merge and deployment status.

**Pre-batch published checkpoint:** [PR #35](https://github.com/Awes0meE/Awes0meE.github.io/pull/35), the approved Claude Chime homepage. The named release tag remains `v0.9.0` and is older than that maintenance PR.

## Current Authorization and Work

The user explicitly requested all seven other project homepages be rewritten using the latest writer and existing confirmed context. This is a one-time authorization for the batch, superseding the earlier freeze on those seven families. Claude Chime's approved narrative remains protected. The user also requested overlapping learning notes be suspended recoverably, and topic candidates be identified without writing new notes.

- Seven homepages now have Chinese-first, English-derived body copy, concise subject headings, and updated summaries. Smart Car and Digital Clock keep their titles; the other titles are shortened to subject labels.
- Fifteen notes have only `visibility` changed to `private`. All 24 note bodies are intact; nine independent topics or original-document notes remain public.
- Claude Chime changes only by removing the two closing sentences linking to its suspended cold-start note. Its narrative, frontmatter, images, and evidence claims remain intact.
- All 36 existing body images in the seven rewritten pages remain; cover paths, technical metadata, media records, public uploads, application code, and dependencies are unchanged.
- [Review and restoration packet](../experiments/project-homepages-2026-09-06/README.md) includes the complete 24-note action list, original hashes, eight before-page copies, and bilingual comparison page.
- [Future topics](project-note-topics-2026-09-06.md) gives a priority and alternative question for each project. These are proposals for later learning, not new claims about what Alvin already studied or measured.

## Writing Contract

Use `skills/engineering-note-writer/SKILL.md` and its current references. The branch includes `ce015f2`, which adds project/note division, and the Chinese sentence gate originally added in `a1253dc`.

Homepages tell what Alvin did and how the work progressed. Notes investigate bounded questions with new explanatory value. Read the family at Step 1, reuse confirmed briefs/topics, choose candidates at Step 2 when delegated, allocate detailed material at Step 5, and recheck cross-page division at Step 12. Necessary context and original-document preservation are allowed; replaying a complete experience under new wording is not.

Compose Chinese from the confirmed brief and evidence. After editorial refinement, review all six Chinese sentence categories before English at Step 10. Derive natural English with equivalent substance and uncertainty, then repeat the full Chinese check at Step 12 alongside Truth, Li Zhiyi, L1-1 through L1-5, and bilingual review. English keeps its existing rules. A lexical scan is not a substitute for sentence-by-sentence judgment.

On 2026-09-06, after reviewing the seven pages, the user rejected excessive evidence-boundary commentary. The current writer removes mandatory explicit caveats: internal fact checks do not belong in the article. Remove missing-test lists, archive inventories and repeated cannot-claim statements. Use accurate retained claims with natural attribution and conditions; real failures and unfinished attempts can still drive the story. The independent editorial-conservation / information-retention gate is removed. English adaptation must not restore deleted material. The seven bilingual homepages now follow this correction, with their pre-feedback versions preserved in `pre-boundary-feedback/`.

Retain confirmed emotion, humor, actors, and accurate results. Present-day reading must not turn into invented historical curiosity, experiments, failures, or causal explanations. Covers and demo media remain user-controlled. The user has approved the seven bilingual homepages for publication. New note prose still needs its own review.

The user then clarified that ordinary closing paragraphs are welcome: avoid forced elevation, but finish the account naturally. The seven endings were reviewed; DIY now closes beyond its temperature/FPS figures, and Turing finishes on the existing personal reaction rather than a file-submission sentence. The other five endings already close their accounts and remain unchanged.

## Internal Fact Checks

These are editorial working notes, not sentences to paste into the project pages.

- Smart Car: kit assembly/testing/tuning, not Alvin's original PCB design. Reported 12 V battery voltage is not MCU or motor-terminal voltage. The suspended note's “13 digital pins” needs correction before republication; check Nano pinout and actual allocation. L293 is not a MOSFET H bridge.
- Digital Clock: working classroom buttons and full marks are confirmed; 17 and 99 were separately flashed versions. The 17-second video lacks button operation, final source is missing, early `main.c` is incomplete, and final polarity/debounce cannot be reconstructed.
- DIY: ESP32 completed the computer-to-fan machine; STM32 reached serial control without reconnecting the Windows/Bluetooth path; the printed enclosure remained a slicing preview. Temperature/FPS figures are memory, not controlled tests. Duty is not measured RPM.
- Tianjin: foundational internship demo, not railway-product development. Sixteen-point ADC/PWM mapping is feedforward; I²C errata is a later hypothesis. PID/ATP/ATO/ATS remained reading.
- Turing: local accounts, not online authentication. Company acceptance used the development machine; the later clean Windows test was separate. Mac reached an unsigned DMG, with signing/notarization and clean-second-Mac tests incomplete; later adoption unknown.
- Juanyun: independent BaseUnit and three-board ACUnit engineering, formal role intern. Personal staged bring-up is separate from later company refrigeration feedback and performance/endurance claims. No sensitive raw product packages are added.
- FOC: personal custom hardware, adapted open-source algorithm baseline, Codex-assisted observer debugging. Open-loop compressor operation is confirmed; 30 to 80 Hz is electrical command range, not measured shaft speed. Exact video frequency is uncertain; no complete refrigerant loop or controlled six-step comparison; sensorless handoff unfinished.
- Claude Chime: 4.03 V falling to 1.49 to 1.57 V is protected-pack output, not measured cell collapse. The 3.8 V / 50 mA supply check and unloaded outputs do not establish an exact protection state or inrush waveform. External-supply intervention preceded successful startup, but connection sequence and recovery mechanism are incompletely known. Real-solenoid operation remains client feedback. Alvin did not write the ESP32 firmware.

## Next Action

1. Publish the approved homepage/writer revision through a checked PR to `main`, and verify production. Preserve `gh-pages`, which supplies the GitHub Pages redirect.
2. Start the Arduino Smart Car note on a new topic branch from updated `main`. The user chose both power delivery and speed sensing in one note. Follow battery input through regulation and the motor driver, then explain how the installed sensor and test code turn rotation into a measurable signal. Use the confirmed project brief; do not restart the full interview.
3. Keep assembly, track tuning, the battery-change decision and competition results on the homepage. The note develops circuit operation, PWM, sensing and conversion to wheel speed. Do not replay the project journey or invent a historical closed-loop speed controller.
4. Draft Chinese first, complete the sentence and voice review, then adapt English. Keep the note recoverable and show its draft before restoring public visibility. Do not begin another project until this one is reviewed.

## Verification and History

See `../experiments/project-homepages-2026-09-06/verification.json` for final checks. Expected counts are 8 projects and 24 note sources; the public subset is 9 notes and two note-index channels. A production build should prerender 24 pages. Older 39-page results describe the previous all-public note set.

Historical interviews, release evidence, and cleanup remain in `docs/session-log.md`, project briefs, and dated experiments. The original overlap audit remains a diagnostic snapshot; this handoff and the execution packet define the current state.
