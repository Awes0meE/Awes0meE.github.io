# Portfolio Writing Handoff

**Updated:** 2026-09-07

All sixteen new bilingual study notes across the eight projects are approved. Publication is tracked by [PR #38](https://github.com/Awes0meE/Awes0meE.github.io/pull/38); use its live merge/deployment state when resuming. The final ten have been promoted into `content/notes/`, together with the approved concrete-heading and natural-paragraph-opening corrections. Twelve suspended old notes have been retired. Current content: 8 projects, 25 public notes, 8 note channels and 84 media records. There are no remaining note drafts awaiting review.

The [release record](../releases/remaining-engineering-notes-2026-09-07/README.md) lists canonical routes, exact promotion/retirement hashes and verification. Completed review servers on ports 8771 and 8772 and their generated preview files are retired after publication. Dated review JSON records preserve the earlier checks; their old draft paths are historical.

Preserve `docs/rewrite-about-copy` at `af3ace5` (prose checkpoint `bd6cdc9`). The user paused its unapproved wording. Main's About page is excluded from this note release. Preserve remote `gh-pages`, which redirects old GitHub Pages visits. The latest named tag remains `v0.9.0`; this maintenance release does not create a tag.

## Writing Contract

Use [Engineering Note Writer](../../skills/engineering-note-writer/SKILL.md) and its current references. Project homepages tell what Alvin did and how the work progressed. Notes explore a specific question with new explanatory value, using only the context needed to understand it. Read the project family at Step 1, reuse confirmed briefs and selected topics, allocate material at Step 5 and recheck page division at Step 12.

Compose Chinese first. After editorial refinement, review all six Chinese sentence categories at Step 10 before deriving English; recheck Chinese at Step 12 alongside the existing Truth, voice, L1 and bilingual reviews. English keeps its established checks. Do not reintroduce the removed information-retention gate or add evidence inventories and repeated cannot-claim sentences to reader-facing prose.

Normal closing paragraphs are welcome. Avoid forced elevation and repeated look-back or next-time endings, including synonymous versions. An occasional apt retrospective or `下一次再看到……` is allowed; there is no phrase blacklist or quota. Keep confirmed emotion and humor, and distinguish present study from historical actions internally while writing natural, accurate prose.

Write each section first, then derive a short heading that identifies its actual subject and aspect. Questions, abstract hooks and isolated moments such as `高电平从哪里来`, `一个名字的特殊含义` and `重启之后` fail this heading check. Name the actual principle, procedure, rule or measurement in both languages; preserve accepted paragraphs during a heading-only request.

Each Chinese learning note may contain at most one prose paragraph beginning with `我`, counting the introduction and every paragraph under headings. Zero is allowed. Recompose other openings around their concrete content; do not merely prefix filler, remove confirmed ownership, or turn suggested tests into historical results. First-person phrasing inside paragraphs remains available. English keeps natural semantic alignment without this numerical Chinese-only quota.

## Next Work

No note rewrite or approval is pending. Future topics should add a specific independent investigation, reusing confirmed briefs and asking only claim-changing questions. The completed [topic decisions](../releases/remaining-engineering-notes-2026-09-07/topic-decisions.md) and original overlap audit are historical rationale, not a queue to execute. Do not restore the retired sources or reapply the former suspension manifest.

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
