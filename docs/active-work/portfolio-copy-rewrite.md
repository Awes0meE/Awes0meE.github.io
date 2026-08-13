# Active Work: One-Project-at-a-Time Portfolio Copy Rewrite

**Updated:** 2026-08-13
**Branch:** `docs/rewrite-claude-chime`
**Current project:** `Claude Chime Hardware Power Board`
**Last completed project:** `南京图灵 Qt、编译与打包实习记录`
**State:** Chinese and English copy approved; public integration and local verification complete; release approved and ready to merge

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

## Claude Chime Confirmed Brief

- `Claude Chime` is the product, `Clawdy Family` is the mascot/family, and
  `Accele AI` is the commissioning company. Public copy may describe this as a
  paid, independent hardware commission.
- The product is a 3D-printed crab on a 5 V push-pull solenoid. An external
  ESP32-S3 core board receives a computer-side Claude completion event and
  makes the crab jump as a physical notification.
- Alvin independently completed requirements breakdown, architecture,
  calculations and selection, schematic, PCB layout, BOM/Gerber, ordering,
  hand assembly, basic hardware bring-up, debugging, and the software-interface
  handoff. He did not write the ESP32 firmware or personally perform the final
  integrated-system acceptance test. All archived EDA author marks refer to him.
- V1.0 was the only board spin. It required no flywires, cuts, component-value
  changes, added capacitors, or PCB revision after assembly and scoped bring-up.
- Alvin directly verified two no-load boost outputs at about 5.12 V and 5.08 V
  from a 3.8 V / 50 mA limited bench supply, but no longer remembers which
  reading belongs to which rail. He also verified charge current plus later
  battery-voltage rise, the manually enabled ADC divider, and repeated no-load
  SOL_CTRL switching from a simulated 3.3 V logic signal.
- The client firmware engineer later reported successful ESP32 communication,
  ADC battery reading, charging control, repeated real-solenoid actuation, and
  full-device operation. This remains customer chat feedback, not a result Alvin
  personally witnessed.
- A protected cell measured 4.03 V before connection and 1.49-1.57 V afterward.
  Battery-terminal voltage collapse, disconnect recovery, and external-supply
  unlock are highly consistent with cold-start inrush triggering its DW01A/8205A
  protection path, but no current waveform or exact threshold was measured.
- The public software handoff is Alvin's original delivery work. The later DOCX
  design retrospective was reconstructed from contemporaneous chat records and
  must not be described as an original project-time log.
- Narrative route: a local solenoid-driver request expanded into a full power-
  path problem; the learning note closes on the debugging move from suspected
  PCB short to a bounded battery-protection/cold-start hypothesis.

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
- Tianjin STM32 completed the same workflow on 2026-08-13. Pull request #12
  merged the approved bilingual project page, five learning notes, and three
  media-copy records into `main` at
  `bb06ad81304643f8eb3afe4badf06fa04f828bfe`.
- The final account follows Alvin from Arduino-style high/low calls through
  Keil/ST-Link bring-up, GPIO/EXTI/timer reasoning, ADC/PWM/UART roles, and one
  bare-metal integrated demo. The supervising engineer's involvement remains
  informal training guidance rather than production rail-system work.
- The 16-point target-to-PWM mapping remains explicitly feedforward; the later
  hardware-I2C lockup explanation remains a present-day hypothesis; PID and
  ATP/ATO/ATS remain reading-layer concepts rather than implemented control.
  All four public C excerpts and all public uploads were unchanged.
- Nanjing Turing completed the same workflow on 2026-08-13. Pull request #14
  merged the approved bilingual project page, three-week note, and five
  media-copy records into `main` at
  `f5e1082e778a49cb4a740f42e483a17c397a7eac`.
- The final account covers a three-week full-time Qt internship beginning with
  school-level C++ and no Qt or large-repository experience, then moving through
  Seamly2D bring-up, a local `QSettings` account/role layer, Git practice,
  Windows packaging, and a bounded macOS packaging attempt.
- Keep the validation boundaries distinct: company acceptance covered the
  development-machine demonstration; the clean Windows installation test happened
  later on a separate home PC; macOS reached a launched unsigned DMG but not
  completed signing/notarization; later adoption after handoff is unknown. The
  four source-document notes and every public upload were unchanged.

## Next Action

1. Commit, push, open, verify, and merge the approved Claude Chime rewrite.
2. After merge, synchronize `main`, confirm the deployment checks, and update
   this relay for the next remaining project selection.
3. Do not reopen Smart Car, DIY Cooling, Arduino Digital Clock, Tianjin STM32,
   Nanjing Turing, or Claude Chime unless explicitly requested.

## Current Verification

- `npm run lint` passed on 2026-08-13 for the final Claude Chime bilingual
  project page, learning note, media caption, assets, and software handoff.
- `npm run typecheck` passed on 2026-08-13.
- `next build --webpack` passed with 37 static pages, including the new Claude
  Chime learning-note route. The default Turbopack build was attempted twice but
  its CSS worker could not bind a local port in the current Codex environment;
  both failures occurred before content compilation.
- Local production-preview browser checks passed for the project and note in
  English and Chinese at 1440 × 1000 and 390 × 844. There was no horizontal
  overflow, error overlay, broken loaded image, or page error; the related-media
  logo also loaded after entering its lazy-load viewport.
- Content validation now covers 8 projects, 22 notes, and 73 media records;
  UTF-8 validation covers 286 text files.
- `npm run lint` passed on 2026-08-13 for the Nanjing Turing bilingual draft.
- `npm run typecheck` passed on 2026-08-13 for the Nanjing Turing bilingual draft.
- `npm run build` passed on 2026-08-13 with 36 static pages.
- Pull request #14's two Vercel checks passed before the approved merge; its
  preview required an authenticated Vercel session.
- Content validation remains 8 projects, 21 notes, and 73 media records; UTF-8
  validation covers 283 text files.
- English/Chinese paragraph counts match within all 14 rewritten sections.
- The four protected Turing source-document notes and every public upload remain
  unchanged. Media order and non-copy fields remain unchanged; five records have
  aligned title/caption copy updates only.

## Updating This File

Replace stale current-state sections at each device handoff; do not append an
endless transcript. Keep durable writing rules and confirmed decisions. Never
commit credentials, private email addresses, private locations, tokens, or
machine-specific absolute paths.
