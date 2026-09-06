# Active Work: DIY Cooling Learning Notes

**Updated:** 2026-09-07

**Branch:** `docs/rewrite-diy-cooling-notes`

**State:** Homepage release completed through [PR #36](https://github.com/Awes0meE/Awes0meE.github.io/pull/36), merged as `8e009efd2a00ef8fdbb2a47eaed9bf5b2251020d`. Vercel production succeeded and all 31 production copy/visibility checks passed. Both Arduino car notes and both counter notes, including the ending revision at `f631175`, are approved locally and remain private. The user then selected both DIY cooling topics. Their complete bilingual drafts are ready for review at `http://127.0.0.1:8770/preview.html`; both remain private. The counter approval/selection checkpoint is `2b21af8`, retained on `docs/rewrite-counter-learning-notes`.

**Pre-batch published checkpoint:** [PR #35](https://github.com/Awes0meE/Awes0meE.github.io/pull/35), the approved Claude Chime homepage. The named release tag remains `v0.9.0` and is older than that maintenance PR.

## Current Authorization and Work

The user explicitly requested all seven other project homepages be rewritten using the latest writer and existing confirmed context. This is a one-time authorization for the batch, superseding the earlier freeze on those seven families. Claude Chime's approved narrative remains protected. The user also requested overlapping learning notes be suspended recoverably, and topic candidates be identified without writing new notes.

- Seven homepages now have Chinese-first, English-derived body copy, concise subject headings, and updated summaries. Smart Car and Digital Clock keep their titles; the other titles are shortened to subject labels.
- The published homepage batch changed only the visibility of fifteen notes; all 24 bodies were intact at its merge. Nine notes remain public. The subsequent local Arduino note rewrite is the first body revision; its original is preserved in `docs/experiments/arduino-power-speed-note-2026-09-06/before.mdx` and the release commit.
- Claude Chime changes only by removing the two closing sentences linking to its suspended cold-start note. Its narrative, frontmatter, images, and evidence claims remain intact.
- All 36 existing body images in the seven rewritten pages remain; cover paths, technical metadata, media records, public uploads, application code, and dependencies are unchanged.
- [Review and restoration packet](../experiments/project-homepages-2026-09-06/README.md) includes the complete 24-note action list, original hashes, eight before-page copies, and bilingual comparison page.
- [Future topics](project-note-topics-2026-09-06.md) records the four approved Arduino notes and candidates for the remaining projects. The two DIY drafts are complete and awaiting user review. Research is present study, not a claim about what Alvin already studied or measured during the original build.

- [DIY review packet](../experiments/diy-cooling-notes-2026-09-07/README.md) preserves the old private note and contains both language drafts, Chinese Step 10 records, final checks and the combined preview. The sampling note replaces the old slug; the fan-interface note is a new private source. A faithful PNG render of the existing public ESP32 schematic is added for the second note.

## Writing Contract

Use `skills/engineering-note-writer/SKILL.md` and its current references. The branch includes `ce015f2`, which adds project/note division, and the Chinese sentence gate originally added in `a1253dc`.

Homepages tell what Alvin did and how the work progressed. Notes investigate bounded questions with new explanatory value. Read the family at Step 1, reuse confirmed briefs/topics, choose candidates at Step 2 when delegated, allocate detailed material at Step 5, and recheck cross-page division at Step 12. Necessary context and original-document preservation are allowed; replaying a complete experience under new wording is not.

Compose Chinese from the confirmed brief and evidence. After editorial refinement, review all six Chinese sentence categories before English at Step 10. Derive natural English with equivalent substance and uncertainty, then repeat the full Chinese check at Step 12 alongside Truth, Li Zhiyi, L1-1 through L1-5, and bilingual review. English keeps its existing rules. A lexical scan is not a substitute for sentence-by-sentence judgment.

On 2026-09-06, after reviewing the seven pages, the user rejected excessive evidence-boundary commentary. The current writer removes mandatory explicit caveats: internal fact checks do not belong in the article. Remove missing-test lists, archive inventories and repeated cannot-claim statements. Use accurate retained claims with natural attribution and conditions; real failures and unfinished attempts can still drive the story. The independent editorial-conservation / information-retention gate is removed. English adaptation must not restore deleted material. The seven bilingual homepages now follow this correction, with their pre-feedback versions preserved in `pre-boundary-feedback/`.

Retain confirmed emotion, humor, actors, and accurate results. Present-day reading must not turn into invented historical curiosity, experiments, failures, or causal explanations. Covers and demo media remain user-controlled. The user has approved the seven bilingual homepages for publication. All four Arduino car and counter notes have passed user review, including the later ending feedback. Publication remains a separate action.

The user then clarified that ordinary closing paragraphs are welcome: avoid forced elevation, but finish the account naturally. The seven endings were reviewed; DIY closes beyond its temperature/FPS figures, and Turing finishes on the existing personal reaction rather than a file-submission sentence.

After reviewing the counter drafts, the user found their content sound but
objected to repeated retrospective endings. Their explicit clarification allows
an occasional `下一次再看到……`; do not ban that phrase or similar phrases.
Compare nearby endings by function and avoid repeating the same look-back or
next-time move under new wording. This applies to homepages and notes in both
languages. The local follow-up changes only the ending pairs of the four recent
Arduino notes and DIY homepage. The power/speed note deliberately retains its
concrete proposed logging plan. Original documents and suspended notes awaiting
their own rewrite stay intact. See `../experiments/natural-endings-2026-09-06/`.

## Internal Fact Checks

These are editorial working notes, not sentences to paste into the project pages.

- Smart Car: kit assembly/testing/tuning, not Alvin's original PCB design. The new note follows schematic L7805CV regulation, separate L293D motor/logic rails, 3V3 ITR8307 sensors and D2/D3 rising-edge interrupts. Twelve counts/revolution yields `RPM = 5000 / interval_ms`. `motor_step()` contains a course-library feedback branch; this is not a claim that Alvin authored it or used it in the final race. The old “13 digital pins” assertion is omitted. Numerical voltage, loss and timing examples are calculations, not historical measurements.
- Smart Car second note: the course comment groups black line and sensor lifted off the surface. ITR20001 reflection changes collector current and pulled-up OUT voltage; 74HC165 accepts logic levels. Two cascaded registers serve 7 IR + 6 collision + 2 key inputs. Shared PL loads before serial transmission; the code reads before clocking, first bit to bit 7, and maps reg0 bits 0–6 from leftmost through centre to rightmost. Double logical NOT normalizes IR truth, while switch/key single NOT inverts active-low inputs. The binary 0x08 example is a calculation, not a measurement.
- Digital Clock: working classroom buttons and full marks are confirmed; 17 and 99 were separately flashed versions. Final firmware and button polarity/debounce cannot be reconstructed. New notes study present principles: decimal splitting and ABCD bit order, SN54LS47 open-collector sink paths, segment resistors, input bias, stable states, events and elapsed-time counting. The report's Uno/CD4511 simulation is not the final Nano/SN54LS47 wiring. Proposed reset-on-entry, initial-state handling, resume timing and reset priority are new design choices; resistor and debounce examples are calculations, not past measurements.
- DIY: ESP32 completed the computer-to-fan machine; STM32 reached serial control without reconnecting the Windows/Bluetooth path; the printed enclosure remained a slicing preview. Temperature/FPS figures are memory, not controlled tests. The new sampling note accounts for independent read/send tasks and button-triggered peak resets. The button handler clears the peaks without changing lastUpdateTime and uses the previously saved maxValue; the timing example assumes an automatic mode. The fan note follows the actual PWM/12V+/12V− output connections. Noctua frequency and tach parameters are manufacturer examples, not the unidentified project fan's specifications. The source displays duty without reading tach. Proposed logging and response-curve work remains present study.
- Tianjin: foundational internship demo, not railway-product development. Sixteen-point ADC/PWM mapping is feedforward; I²C errata is a later hypothesis. PID/ATP/ATO/ATS remained reading.
- Turing: local accounts, not online authentication. Company acceptance used the development machine; the later clean Windows test was separate. Mac reached an unsigned DMG, with signing/notarization and clean-second-Mac tests incomplete; later adoption unknown.
- Juanyun: independent BaseUnit and three-board ACUnit engineering, formal role intern. Personal staged bring-up is separate from later company refrigeration feedback and performance/endurance claims. No sensitive raw product packages are added.
- FOC: personal custom hardware, adapted open-source algorithm baseline, Codex-assisted observer debugging. Open-loop compressor operation is confirmed; 30 to 80 Hz is electrical command range, not measured shaft speed. Exact video frequency is uncertain; no complete refrigerant loop or controlled six-step comparison; sensorless handoff unfinished.
- Claude Chime: 4.03 V falling to 1.49 to 1.57 V is protected-pack output, not measured cell collapse. The 3.8 V / 50 mA supply check and unloaded outputs do not establish an exact protection state or inrush waveform. External-supply intervention preceded successful startup, but connection sequence and recovery mechanism are incompletely known. Real-solenoid operation remains client feedback. Alvin did not write the ESP32 firmware.

## Next Action

1. Await the user's review of **温度采样与风扇响应** and **PWM 风扇控制与转速反馈** at `http://127.0.0.1:8770/preview.html`. Direct entries use `?note=sampling&lang=zh` or `?note=fan&lang=zh`; either supports `lang=en`. Both requested drafts are complete; do not repeat topic selection or the project interview.
2. Apply feedback to the relevant Chinese draft first, recheck Chinese, align English and regenerate its MDX/preview. The packet records final hashes and a late excerpt-introduction correction. Source review and page allocation are in `diy-cooling-note-plan-2026-09-07.md`. Move to another project only when the user requests it.
3. All four Arduino notes are approved locally. Counter preview at port 8769 now shows approved status; car previews remain at 8767/8768. Commit `f631175` preserves the approved article bodies and latest writer rules. These notes stay private until publication is requested. `docs/rewrite-arduino-power-speed-note` retains the earlier car checkpoint `6828f59`.
4. Before the next relevant publication, reconcile the car homepage's old six-line-sensor count with the manual, schematic and seven decoded fields. This topic-selection work does not edit that homepage.
5. The last verified `main` and `origin/main` remain at homepage release `8e009ef`. Preserve remote `gh-pages` for the redirect. No remote push, merge or publication is included in this project transition.

## Verification and History

See `../experiments/project-homepages-2026-09-06/verification.json` for homepage pre-release checks, `production-verification.json` for the 31 successful production checks, and the Arduino note packet for draft review. Current local counts are 8 projects and 27 note sources: 9 public and 18 private, comprising the 15 previously suspended sources and 3 new private notes. There are two note-index channels. The deployed homepage-release checkpoint still has 24 note sources. The DIY draft lint, encoding, typecheck and webpack build passed; the build prerendered 24 pages. Eight browser views checked both articles and languages at desktop/mobile widths, including navigation and the embedded schematic. Older 39-page results describe the previous all-public note set.

Historical interviews, release evidence, and cleanup remain in `docs/session-log.md`, project briefs, and dated experiments. The original overlap audit remains a diagnostic snapshot; this handoff and the execution packet define the current state.
