# Active Work: Homepage Release and Arduino Car Learning Note

**Updated:** 2026-09-06

**Branch:** `docs/rewrite-arduino-power-speed-note`

**State:** Homepage release completed through [PR #36](https://github.com/Awes0meE/Awes0meE.github.io/pull/36), merged as `8e009efd2a00ef8fdbb2a47eaed9bf5b2251020d`. Vercel production succeeded and all 31 production copy/visibility checks passed. The first combined Arduino power/speed note is drafted in both languages and awaiting user review, with `visibility: private`.

**Pre-batch published checkpoint:** [PR #35](https://github.com/Awes0meE/Awes0meE.github.io/pull/35), the approved Claude Chime homepage. The named release tag remains `v0.9.0` and is older than that maintenance PR.

## Current Authorization and Work

The user explicitly requested all seven other project homepages be rewritten using the latest writer and existing confirmed context. This is a one-time authorization for the batch, superseding the earlier freeze on those seven families. Claude Chime's approved narrative remains protected. The user also requested overlapping learning notes be suspended recoverably, and topic candidates be identified without writing new notes.

- Seven homepages now have Chinese-first, English-derived body copy, concise subject headings, and updated summaries. Smart Car and Digital Clock keep their titles; the other titles are shortened to subject labels.
- The published homepage batch changed only the visibility of fifteen notes; all 24 bodies were intact at its merge. Nine notes remain public. The subsequent local Arduino note rewrite is the first body revision; its original is preserved in `docs/experiments/arduino-power-speed-note-2026-09-06/before.mdx` and the release commit.
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

- Smart Car: kit assembly/testing/tuning, not Alvin's original PCB design. The new note follows schematic L7805CV regulation, separate L293D motor/logic rails, 3V3 ITR8307 sensors and D2/D3 rising-edge interrupts. Twelve counts/revolution yields `RPM = 5000 / interval_ms`. `motor_step()` contains a course-library feedback branch; this is not a claim that Alvin authored it or used it in the final race. The old “13 digital pins” assertion is omitted. Numerical voltage, loss and timing examples are calculations, not historical measurements.
- Digital Clock: working classroom buttons and full marks are confirmed; 17 and 99 were separately flashed versions. The 17-second video lacks button operation, final source is missing, early `main.c` is incomplete, and final polarity/debounce cannot be reconstructed.
- DIY: ESP32 completed the computer-to-fan machine; STM32 reached serial control without reconnecting the Windows/Bluetooth path; the printed enclosure remained a slicing preview. Temperature/FPS figures are memory, not controlled tests. Duty is not measured RPM.
- Tianjin: foundational internship demo, not railway-product development. Sixteen-point ADC/PWM mapping is feedforward; I²C errata is a later hypothesis. PID/ATP/ATO/ATS remained reading.
- Turing: local accounts, not online authentication. Company acceptance used the development machine; the later clean Windows test was separate. Mac reached an unsigned DMG, with signing/notarization and clean-second-Mac tests incomplete; later adoption unknown.
- Juanyun: independent BaseUnit and three-board ACUnit engineering, formal role intern. Personal staged bring-up is separate from later company refrigeration feedback and performance/endurance claims. No sensitive raw product packages are added.
- FOC: personal custom hardware, adapted open-source algorithm baseline, Codex-assisted observer debugging. Open-loop compressor operation is confirmed; 30 to 80 Hz is electrical command range, not measured shaft speed. Exact video frequency is uncertain; no complete refrigerant loop or controlled six-step comparison; sensorless handoff unfinished.
- Claude Chime: 4.03 V falling to 1.49 to 1.57 V is protected-pack output, not measured cell collapse. The 3.8 V / 50 mA supply check and unloaded outputs do not establish an exact protection state or inrush waveform. External-supply intervention preceded successful startup, but connection sequence and recovery mechanism are incompletely known. Real-solenoid operation remains client feedback. Alvin did not write the ESP32 firmware.

## Next Action

1. Review the combined **Arduino 小车的供电与轮速测量 / Arduino Car Power and Wheel-Speed Measurement** draft with the user. Local review page: `http://127.0.0.1:8767/preview.html`; the self-contained HTML and language drafts are in `docs/experiments/arduino-power-speed-note-2026-09-06/`.
2. Apply feedback to this note only. Chinese refinement and Step 10 sentence review preceded English; repeat Step 12 Chinese, Truth, voice and bilingual checks after any new edits. Assembly, battery replacement, track tuning and results stay on the protected homepage.
3. Keep `visibility: private` until the user approves restoring the note. The draft branch is local; no unreviewed note release or second project has started. The old note remains recoverable from `before.mdx` or `8e009ef`.
4. Homepage release branches `docs/refactor-project-homepages` and `feat/project-note-division` were removed after their commits were merged. `main` matches `origin/main` at `8e009ef`; preserve remote `gh-pages` for the GitHub Pages redirect.

## Verification and History

See `../experiments/project-homepages-2026-09-06/verification.json` for homepage pre-release checks, `production-verification.json` for the 31 successful production checks, and the Arduino note packet for draft review. Expected counts are 8 projects and 24 note sources; the public subset is 9 notes and two note-index channels. A production build should prerender 24 pages. Older 39-page results describe the previous all-public note set.

Historical interviews, release evidence, and cleanup remain in `docs/session-log.md`, project briefs, and dated experiments. The original overlap audit remains a diagnostic snapshot; this handoff and the execution packet define the current state.
