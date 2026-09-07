# Portfolio Writing Handoff

**Updated:** 2026-09-07

The user paused the unapproved About rewrite and requested the next project’s learning notes. The current branch is `docs/rewrite-tianjin-notes`, based on synchronized `main` at `007decf`. Two bilingual Tianjin Jintie STM32 candidate drafts are ready for review: light calibration/lookup control and I2C/OLED debugging. They remain outside the public content collection in [the review packet](../experiments/tianjin-notes-2026-09-07/README.md). Preview: `http://127.0.0.1:8771/preview.html?note=calibration&lang=zh`. The user has not approved either draft yet.

Preserve the separate About branch `docs/rewrite-about-copy` at `af3ace5` (prose checkpoint `bd6cdc9`). Its wording was not approved; do not publish it or carry it into the note branch.

## Current Source State

- Eight project pages, 27 note sources, 15 public notes, 12 suspended notes and 84 media records. The Notes index has five project channels and two archive years.
- Each of the three completed families has two public studies. Three existing slugs now contain replacement articles; three companion articles use new slugs. Their six bodies match approved checkpoint `2337f2d`.
- The three old-note backups, twelve separate language drafts and four completed preview pages have been removed. Current prose lives only in `content/notes/`; earlier versions remain in Git. Review observations remain as dated history.
- Smart Car now states seven IR tracking inputs in both homepage languages, matching the manual, schematic and decoded fields. Its six collision switches and six test groups are unchanged.
- The DIY homepage ending and current writer ending-variety rules are included in this release. The other approved homepage narratives, including Claude Chime, retain their publication state.

The [2026-09-07 release record](../releases/engineering-notes-2026-09-07/README.md) lists routes, verification and publication tracking. The release was merged through [PR #37](https://github.com/Awes0meE/Awes0meE.github.io/pull/37) at `007decf`. The three completed note-writing branches were removed before the About and Tianjin draft branches began. Preserve remote `gh-pages`, which serves the old GitHub Pages redirect. The named tag remains `v0.9.0`; this maintenance release does not create a new tag.

## Writing Contract

Use [Engineering Note Writer](../../skills/engineering-note-writer/SKILL.md) and its current references. Project homepages tell what Alvin did and how the work progressed. Notes explore a specific question with new explanatory value, using only the context needed to understand it. Read the project family at Step 1, reuse confirmed briefs and selected topics, allocate material at Step 5 and recheck page division at Step 12.

Compose Chinese first. After editorial refinement, review all six Chinese sentence categories at Step 10 before deriving English; recheck Chinese at Step 12 alongside the existing Truth, voice, L1 and bilingual reviews. English keeps its established checks. Do not reintroduce the removed information-retention gate or add evidence inventories and repeated cannot-claim sentences to reader-facing prose.

Normal closing paragraphs are welcome. Avoid forced elevation and repeated look-back or next-time endings, including synonymous versions. An occasional apt retrospective or `下一次再看到……` is allowed; there is no phrase blacklist or quota. Keep confirmed emotion and humor, and distinguish present study from historical actions internally while writing natural, accurate prose.

## Next Writing Work

The six published notes remain approved. Review the two Tianjin candidate drafts next; the other four project families remain in the backlog. The [topic backlog](project-note-topics-2026-09-06.md) retains candidates for Tianjin STM32, Nanjing Turing, Juanyun phase-change cooling, sensorless FOC and Claude Chime. Reuse their confirmed briefs and ask only questions that change the claims or selected topic.

The 12 other suspended notes remain recoverable sources. Do not restore them wholesale or apply the old homepage-suspension manifest over the six rewritten notes. Completed review URLs on ports 8767–8770 are retired; use the actual website routes from the release record.

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


## History

The seven-homepage release is [PR #36](https://github.com/Awes0meE/Awes0meE.github.io/pull/36), merged at `8e009ef`; its nine-public-note counts and 31 production checks describe that checkpoint. Claude Chime's approved homepage was published through PR #35. Earlier interviews and decisions are in project briefs and `docs/session-log.md`; dated experiment packets preserve review evidence rather than current publication instructions.
