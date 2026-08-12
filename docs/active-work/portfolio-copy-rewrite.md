# Active Work: One-Project-at-a-Time Portfolio Copy Rewrite

**Updated:** 2026-08-13
**Branch:** `docs/rewrite-tianjin-stm32`
**Current project:** `天津轨道交通 STM32 基础实习记录`
**Last completed project:** `Arduino 面包板两位数码管计数器`
**State:** Final bilingual rewrite approved and verified; branch ready for pull-request review and merge

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

## Completed Rewrite Checkpoints

- Arduino Smart Car is approved and remains protected from unsolicited rewrites.
- DIY Cooling completed its interview-led and cognition-led passes through pull
  requests #5 and #9. Remembered thermal and frame-rate effects remain personal
  recollection rather than controlled benchmark results.
- The cognition-led `engineering-note-writer` reached `main` through pull request
  #8. It requires confirmed shared understanding, post-confirmation research,
  Chinese-first drafting, equivalent English adaptation, and independent Truth
  and Li Zhiyi release gates.
- Arduino Digital Clock completed the same workflow on 2026-08-13. Pull request
  #10 merged the approved bilingual project page, learning note, and 11 media-copy
  records into `main` at `80c3743d938236ed36968c5b5adb6047a3edd3ce`.
- The Digital Clock account attributes breadboard construction, pin research,
  decoder/display wiring, Arduino firmware, switch investigation, and integration
  to the user; report/video/general work remains attributed to other group members.
- Its core learning route is the CD4511 common-cathode reference versus the
  common-anode LS47/display path, followed by multimeter-led mapping of the
  undocumented six-pin switches. The two rollover thresholds were separately
  flashed and verified, both final buttons worked, and the classroom result was
  full marks.
- The surviving video still proves only changing digits, `main.c` remains an
  early development trace, and final switch polarity/debounce remain unresolved.
  The archived LS47 datasheet and linked external sources explain present-day
  understanding; they are not presented as resources used during the project.
- Smart Car, DIY Cooling, and all public uploads were unchanged by pull request
  #10. The verified content counts remain 8 projects, 21 notes, and 73 media items.

## Current Confirmed Brief: Tianjin STM32

- In 2025-02, Alvin completed a one-month embedded-intern placement with
  Tianjin Jintie Communications while working in the Tianjin Rail Transit Group
  headquarters. A Jintie engineer provided materials and informal guidance;
  the work was self-directed training, not production rail-system development.
- He began with Arduino Nano course-project experience but no working knowledge
  of Keil, ST-Link, the STM32 Standard Peripheral Library, interrupts, timers,
  PWM, UART, or ADC. GPIO modes, peripheral clocks, registers, and timers first
  made the behavior behind Arduino-style high/low calls visible.
- The bench used an STM32F103C8T6 Blue Pill plus breadboarded OLED, encoder,
  buttons, DHT11, light sensor, LED, and servo modules. He wrote the application
  logic and adapted the peripheral drivers from ST and public examples; do not
  describe those drivers as clean-room originals.
- Keil/device-pack/ST-Link setup was the first substantial friction. A later
  OLED no-display case was resolved by moving to other GPIO pins and software
  I2C. Hardware-I2C lockup is only a present-day hypothesis, not a proven root
  cause, because no pin record, register trace, or waveform survives.
- Across roughly 20 workdays he first ran the peripherals separately, then
  integrated them in one bare-metal demo. Buttons switched the encoder between
  target-light and servo-speed modes; UART sent light data and debug output;
  GPIOC13 acted as a status LED. The code used a superloop, interrupts/timer
  flags, and some blocking delays rather than an RTOS.
- He measured the 16-point ADC-to-PWM table and used linear interpolation. The
  surviving excerpt supports target-to-PWM feedforward plus displayed measured
  light, not automatic feedback correction; a closed-loop extension was
  considered but should not be claimed as implemented.
- The demo ran on the bench. The supervising engineer viewed it, heard Alvin's
  explanation, and said the learning was solid; this was informal feedback, not
  a formal acceptance, field deployment, or production handoff.
- PID and ATP/ATO/ATS came from the engineer's training material and were read
  conceptually. Alvin did not implement or tune PID and did not control railway
  equipment. The later FOC project is the preferred ending: timer, ADC,
  interrupt, and PWM concepts first learned separately reappeared together in a
  stricter motor-control chain.

## Next Action

1. Review the approved bilingual project page, five notes, and three media
   records through the pull request for `docs/rewrite-tianjin-stm32`.
2. Keep all four public C excerpts unchanged and merge only after the branch
   checks and preview remain healthy.
3. After merge, synchronize local `main`, verify the clean merged state, and
   select the next project family rather than extending this branch.

## Current Verification

- `npm run lint` passed on 2026-08-13.
- `npm run typecheck` passed on 2026-08-13.
- `npm run build` passed on 2026-08-13 with 36 static pages.
- Content validation remains 8 projects, 21 notes, and 73 media records; UTF-8
  validation covers 283 text files.

## Updating This File

Replace stale current-state sections at each device handoff; do not append an
endless transcript. Keep durable writing rules and confirmed decisions. Never
commit credentials, private email addresses, private locations, tokens, or
machine-specific absolute paths.
