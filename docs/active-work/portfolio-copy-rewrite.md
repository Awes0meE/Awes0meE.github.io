# Active Work: One-Project-at-a-Time Portfolio Copy Rewrite

**Updated:** 2026-08-14
**Branch:** `feat/expand-juanyun-thermal-archive`
**Current project:** `Juanyun Thermal Management Hardware and Firmware Archive`
**Last completed project:** `Claude Chime Hardware Power Board`
**State:** source audit, public-safety decisions, Q1–Q17 brief, design, bilingual draft, Truth/Li Zhiyi/L1 review, and full static/browser verification complete; uncommitted copy awaits user review

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
  first-person prose to pass the Truth gate and Li Zhiyi gate, and require
  model-authored article body to pass the scoped zero-hit reader-prose L1 gate.
- Evidence bounds project facts, authorship, results, and publication claims,
  but must not choose the reader-facing structure.

## Confirmed Global Decisions

- Public display name: Alvin Li.
- Public contact remains GitHub-only; email and location stay hidden.
- Project demonstration media remains unchanged unless the user explicitly
  requests an asset edit.
- Project covers and other visual-identity choices remain unchanged during
  prose/content rewrites unless the user explicitly requests or approves the
  visual change.
- A project rewrite reaches `main` only after the user reviews its bilingual
  copy and explicitly approves the merge.

## Confirmed Juanyun Decisions

- On 2026-08-14, the user confirmed publication permission for three assembled
  ACUnit V2.1 board photographs and two power-board measurement photographs.
- Derived high-level bring-up outcomes may be public, including measured rails,
  passed module checks, the unfinished pressure-sensor test, the interaction-board
  cable-order correction, and the no-respin outcome.
- The user independently completed the three-board PCB design, assembly and
  soldering, firmware, bring-up, and V2.1 development SOP.
- The complete firmware tree, internal SOP, requirements, manufacturing files,
  and network/setup documents remain reference-only. The firmware note should
  explain the user's bare-metal control reasoning with reviewed excerpts or
  pseudocode instead of publishing the full source.
- The product is one phase-change laptop-cooling system with two controllers:
  BaseUnit delivers cold air and handles local UI, while the three-board ACUnit
  controls the compressor, EEV, sensing, communications, and refrigeration logic.
- BaseUnit was completed first. The user independently completed its hardware,
  firmware, and real-machine bring-up, then independently completed ACUnit PCB
  design, assembly, firmware, staged bring-up, full-chain integration, and SOP.
- The ACUnit firmware was a deliberate bare-metal “exam.” App/Service/BSP and
  the 1/10/100/500/2000 ms cooperative schedule were planned before coding;
  individual responsibilities matured while functions were decomposed.
- The direct personal validation boundary includes the three boards' electrical
  behavior, individual peripherals, and seeing real compressor Modbus state plus
  ADC temperature telemetry after connecting the complete system.
- Later mode, control, protection, user-trial, performance, and endurance results
  came from the boss or company test team. The user did not see the raw logs or
  complete tests and cannot independently verify the reported 25–40% improvement,
  more-than-ten-user trial, or single-unit run beyond 150 hours.
- Treat the `production-line` branch as the same project's later internship and
  post-delivery maintenance phase. Read its 102 commits retrospectively; do not
  invent forgotten incident stories or feedback-to-change causal sequences.
- Preserve both firmware repositories as private. Public notes may use only two
  or three short reviewed excerpts plus diagrams or pseudocode, each explaining
  a decision rather than reconstructing the firmware.
- Use a project-spine plus bounded-note structure with fewer than ten related
  notes. Preserve the cover and keep automatic control separate from ControlPanel
  observability and maintenance.

## Juanyun Writing Fact Matrix

### Direct personal work and observation

- The user independently completed BaseUnit hardware, firmware, and real-machine
  bring-up, then independently completed the ACUnit three-board PCB design,
  assembly, soldering, firmware, staged bring-up, full-chain integration, and SOP.
- Personal validation covers the three ACUnit boards' electrical behavior,
  individual peripherals, and the complete connection among the boards,
  compressor driver, compressor, power supply, and PC.
- The user personally saw compressor state/data arriving over Modbus and ADC
  temperatures appearing in the ControlPanel. This is the confirmed emotional
  anchor for the “the board came alive” moment.

### Artifact-supported implementation detail

- `App/Src/app.c` directly records the original 1/10/100/500/2000 ms cooperative
  dispatch and defers the 2000 ms DHT task while the EEV is busy.
- `BSP_drivers/Src/bsp_eev.c` directly records a deadline-driven, nonblocking EEV
  homing state machine. Reviewed public excerpts may show the due-time checks and
  state transitions, but not a complete function or full phase table.
- The BaseUnit repository records App/BSP restructuring, USART1 DMA telemetry,
  a UI state machine, incremental OLED work, and two-page CRC/commit-marker Flash
  persistence. Its seven commits all date to 2026-04-23.
- GitHub comparison rechecked on 2026-08-14 shows `production-line` 102 commits
  ahead of `main` and zero behind. The largest additions are the Windows
  ControlPanel, `branchNewFeatures.md`, the portable EEV/compressor core,
  `svc_control.c`, and control regression/reference assets.
- The production branch records STOP/QUIET/PERF/ZERO, 200 ms compressor control,
  1 s EEV/safety decisions, superheat and pressure guards, safe AUTO+STOP startup,
  data-validity checks, and HSE-startup failure fallback to an HSI-derived 64 MHz
  clock with visible diagnostics.
- The branch README explicitly says automatic control can run while final
  long-term calibration and production parameters remain unfinished. It also
  says the historical control harness no longer covers the current snapshot
  completely, so an old PASS is not a current release result.

### Company-reported, not independently verified

- The boss or test team reported real-machine manual control, automatic modes,
  observable EEV/compressor changes, and triggered low/negative-superheat and
  high-condensing-pressure protection paths.
- The company reported a real external trial with more than ten campus students
  and faculty using heavy workloads such as large renders and AAA games.
- The company reported roughly 25–40% improvement in some sustained workloads
  and one unit running continuously for more than 150 hours.
- The user did not witness those complete tests or receive their raw logs and
  unified benchmark records. Reader-facing prose must attribute the reports and
  state that the numbers cannot be independently verified by the user.

### Present-day technical interpretation from official research

- The STM32F1 [RM0008 reference manual](https://www.st.com/resource/en/reference_manual/rm0008-stm32f101xx-stm32f102xx-stm32f103xx-stm32f105xx-and-stm32f107xx-advanced-armbased-32bit-microcontrollers-stmicroelectronics.pdf)
  confirms that STM32F1 SysTick can use HCLK or HCLK/8 and that an HSI/2 PLL input
  can produce a 64 MHz system clock. It also documents CSS behavior when a running
  HSE source fails. The project branch separately implements startup-time HSE
  initialization fallback; do not conflate that code path with proof that CSS/NMI
  runtime recovery was enabled and tested.
- The official [Modbus serial-line guide](https://www.modbus.org/docs/Modbus_over_serial_line_V1_02.pdf)
  describes a master issuing explicit requests and processing slave responses.
  It supports the general communication explanation, not a claim that every
  project timeout or retry path was tested on hardware.
- Danfoss's [electronic expansion-valve control explanation](https://www.danfoss.com/en-us/service-and-support/case-stories/dcs/the-pioneer-in-electronic-expansion-valve-control/)
  connects low superheat with liquid-return/compressor risk and explains why the
  stable superheat point changes with load and suction pressure. Use this only to
  explain the current engineering interpretation of the branch's safeguards;
  it does not validate Cirro's parameters or results.

## Completed Rewrite Checkpoints

- Arduino Smart Car is approved and remains protected from unsolicited rewrites.
- DIY Cooling completed its interview-led and cognition-led passes through pull
  requests #5 and #9. Remembered thermal and frame-rate effects remain personal
  recollection rather than controlled benchmark results.
- The cognition-led `engineering-note-writer` reached `main` through pull request
  #8. It requires confirmed shared understanding, post-confirmation research,
  Chinese-first drafting, equivalent English adaptation, and independent Truth
  and Li Zhiyi release gates.
- Arduino Digital Clock completed the same workflow through pull request #10 at
  `80c3743d938236ed36968c5b5adb6047a3edd3ce`; the surviving video, early
  `main.c`, final switch polarity/debounce, and later-found datasheet retain their
  documented evidence limits.
- Tianjin STM32 completed the same workflow through pull request #12 at
  `bb06ad81304643f8eb3afe4badf06fa04f828bfe`; the 16-point map remains
  feedforward, hardware-I2C lockup remains a present-day hypothesis, and PID plus
  ATP/ATO/ATS remain reading-layer concepts.
- Nanjing Turing completed the same workflow through pull request #14 at
  `f5e1082e778a49cb4a740f42e483a17c397a7eac`; formal development-machine
  acceptance, the later clean Windows test, the unsigned macOS DMG, and unknown
  post-handoff adoption remain separate claims.
- Claude Chime completed the same workflow through pull request #16 at
  `03f5ba5a22cfc5be1d67a5e489c519ccb77154c9`. The approved release adds the
  bilingual commissioned-hardware case study, one cold-start note, one media-copy
  update, and 10 reviewed public artifacts including the original software handoff.
- Alvin owned the Claude Chime board requirements breakdown, architecture,
  calculations and selection, schematic, PCB, manufacturing outputs, ordering,
  hand assembly, and scoped bring-up. ESP32 firmware and final real-load system
  integration remained with the client.
- Direct Claude Chime evidence covers two no-load 5 V readings, charge current
  plus later battery-voltage rise, the manually enabled ADC divider, and repeated
  no-load control switching. Real-solenoid and complete-device operation remain
  client chat feedback; cold-start protection triggering remains a bounded
  inference without a measured inrush waveform. V1.0 needed no rework or respin.
- On 2026-08-14, the Claude Chime cold-start note became the first real forward
  test for the hardened reader-prose L1 gate. The project-page body then received
  the same pass. Pull request #20 merged both rewrites and the hardened skill at
  `b3dc51cbc1620163fbfdcac0c8ca624d08a2434f`, without changing the project
  frontmatter, cover, media, public artifacts, or evidence boundaries.
- Before the current Juanyun import branch, `main` contained 8 projects, 22 notes,
  and 73 media items.

## Next Action

1. Hand the uncommitted bilingual copy to the user for review. Do not commit,
   push, open a pull request, or merge until the user explicitly approves it.
2. If the user requests copy changes, keep claims inside the confirmed evidence
   boundaries and rerun the affected static and browser checks.
3. Do not reopen Smart Car, DIY Cooling, Arduino Digital Clock, Tianjin STM32,
   Nanjing Turing, or Claude Chime unless explicitly requested.

## Current Verification

- On `feat/expand-juanyun-thermal-archive`, content validation passes with
  8 projects, 24 notes, and 78 media items; UTF-8 validation passes for 291
  text files.
- The five imported JPEGs are pixel-identical to the approved archive sources
  after lossless optimization, and their public copies contain no EXIF tags.
- The thermal project now has exactly nine related public notes, including two
  new notes for automatic control and the ControlPanel/maintenance phase.
- The six rewritten or added reader-facing bodies pass the scoped L1 wording,
  punctuation, and canned-structure scan with zero applicable hits.
- The Truth and Li Zhiyi reviews keep direct work, artifact facts, company
  reports, and present-day research separate; Chinese and English carry the same
  ownership, result, uncertainty, limitation, and emotional claims.
- Every ACUnit board-note image path resolves, and public project/note bodies
  contain no links to the two private firmware repositories.
- Fresh `git diff --check`, full lint, independent content/encoding validation,
  TypeScript checking, and the Next.js production build all pass. The build
  prerenders 39 pages, including both new Juanyun note routes.
- `npm.cmd audit --omit=dev` reports zero known production vulnerabilities.
- A local production server was reviewed at 1440 by 1000 in Chinese and 390 by
  844 in English across `/`, `/work`, `/media`, the Juanyun project, and all five
  rewritten or added Juanyun notes. Every route had meaningful content, the
  expected translated heading, no framework overlay, no browser or console
  error, no horizontal overflow, no failed image request, and no private
  firmware link.
- The language controls changed the ControlPanel note between its Chinese and
  English headings without leaving the route, and a project-to-firmware-note
  link plus browser return both resolved correctly. Visual screenshots of the
  project, the photograph-heavy ACUnit board note, and the longest mobile note
  title showed no layout or image defect.

## Updating This File

Replace stale current-state sections at each device handoff; do not append an
endless transcript. Keep durable writing rules and confirmed decisions. Never
commit credentials, private email addresses, private locations, tokens, or
machine-specific absolute paths.
