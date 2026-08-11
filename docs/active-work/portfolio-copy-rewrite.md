# Active Work: One-Project-at-a-Time Portfolio Copy Rewrite

**Updated:** 2026-08-12
**Branch:** `agent/rewrite-ai-authored-portfolio-copy`
**Relay checkpoint before this rewrite:** `4bfc21bd537cc7b14c05f9da5cbfb2eb8ef038d6`
**Current project:** `DIY 压风式散热器原型`
**State:** Bilingual rewrite complete; Draft PR review pending

## Working Contract

- Leave the approved Arduino Smart Car project, note, and media copy unchanged.
- Rewrite every other project family one at a time, never as a batch.
- Before writing each project, inspect its uploaded public materials and run a
  `grill-me` interview.
- Treat the user's voice answers as primary first-person material. They may be
  disordered; extract the engineering decisions, mistakes, reactions, and
  changes in understanding before drafting.
- Use `skills/engineering-note-writer/SKILL.md` only after the interview has
  reached shared understanding.
- Draft Chinese first in the user's personal engineering-note voice, then
  adapt the English version with the same facts and a calmer intensity.
- Do not return to archive-audit narration such as “this image shows” or “the
  code provides” as the page's dominant voice. Artifacts constrain facts; they
  do not replace the user's story.
- Do not edit project prose until the user confirms the interview has reached
  shared understanding.

## Confirmed Global Decisions

- Public display name: Alvin Li.
- Public contact remains GitHub-only; email and location stay hidden.
- The existing DIY cooling demonstration video remains unchanged.
- Draft PR #5 stays open and unmerged until the user separately approves a
  final review and merge.

## Confirmed DIY Cooling Interview Synthesis

- The project began with CSGO frame drops and laptop temperatures that stayed
  high after tuning the machine and cleaning the heatsink. The foam perimeter
  was intended to reduce air escaping around an ordinary cooling stand and to
  direct more flow toward the laptop intake. No pressure or airflow measurement
  was taken, so the page does not present this as a validated aerodynamic claim.
- The story centres on the Windows-to-controller-to-fan chain and the ESP32 and
  STM32 PCBs, not on the enclosure as an isolated artifact.
- The Windows program is a C# WinForms application using LibreHardwareMonitor.
  It connects to the ESP32 Bluetooth Classic SPP virtual COM port at 115200
  baud, reads CPU/GPU temperatures, and sends them automatically. Physical
  buttons handle mode, PWM, and frequency adjustment.
- The desktop side sends once every five seconds while alternating CPU and GPU,
  so each value is sent about once every ten seconds. The ESP32 retains their
  maxima for a 30-second window and controls the fan from the higher value.
- The completed control was not PID and not a lookup table. It used
  mode-dependent proportional scaling: Quiet x0.5, Normal x0.7, High Speed
  direct, and Manual retaining the selected duty. A PID attempt consumed about
  half a week before being abandoned as too complex to tune at that stage.
- The ESP32 PCB was fabricated, assembled, powered, installed in the acrylic
  and foam prototype, and used for roughly two or three days. The user remembers
  CSGO improving by roughly 20-30 FPS and peak temperature falling from about
  92-93 C to about 84 C, but has no synchronized logs or controlled test. The
  page presents this only as a dated personal observation, never a benchmark.
- The later STM32F103C8T6/CH340N board was fabricated, soldered, powered, and
  responded to serial commands that changed the physical fan. Its firmware was
  written, but it was not connected back to the Windows automatic-temperature
  path and was not installed in the acrylic prototype.
- The A1 mini enclosure revision reached modelling and nine-plate slicing only;
  it was never printed or assembled.
- The emotional turning point was clicking Connect and seeing a first Windows
  application make a physical embedded controller and fan respond. That
  beginner's excitement, plus the decision to simplify PID into a working
  proportional controller, forms the learning-note story.

## Review Frontier

- Review the bilingual project page, learning note, and six related media
  captions in Draft PR #5.
- Keep the experience and engineering decisions in the foreground. Evidence
  boundaries prevent overclaiming but must not turn the prose into a compliance
  report or an artifact-by-artifact inventory.
- Do not start another project rewrite until the user approves this project's
  bilingual copy. Keep Draft PR #5 open and unmerged.

## Next Action

Review the deployed preview or diff for this project's bilingual copy, make any
user-requested corrections, and wait for explicit approval before selecting the
next project. Do not merge Draft PR #5 without explicit approval.

## Updating This File

Replace stale current-state sections at each device handoff; do not append an
endless transcript. Keep durable writing rules and confirmed decisions. Never
commit credentials, private email addresses, private locations, tokens, or
machine-specific absolute paths.
