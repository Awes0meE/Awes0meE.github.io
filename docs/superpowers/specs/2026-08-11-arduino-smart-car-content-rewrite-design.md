# Arduino Smart Car Content Rewrite Design

> **Historical status / 历史状态:** Implemented in project and note commits `1db6758` and `dc386bb`, with later prose refinements recorded separately. This specification is retained only as a historical design record; its material-led terminology and old branch name are not current guidance.

## Goal

Rewrite the Arduino smart-car project page and its related learning note with the refactored repository-local `engineering-note-writer` skill. The result should read as a material-led engineering record rather than a report template, while preserving the existing evidence, bilingual coverage, routes, and project identity.

## Confirmed Decisions

- Keep the project Chinese title exactly as `Arduino 循迹小车焊接与控制实训`.
- Keep the project English title as `Arduino Smart Car Line-Tracking Kit`.
- Rename the learning note to:
  - Chinese: `从焊点到循迹：Smart Car 的第一次完整 Bring-up`
  - English: `From Solder Joints to Line Tracking: My First Full Smart-Car Bring-Up`
- Work only on the topic branch `agent/rewrite-arduino-smart-car-content`.
- Push the branch for review; do not merge it into `main` as part of this task.

## Scope

Rewrite only these public content files:

- `content/projects/arduino-smart-car-line-tracker.mdx`
- `content/notes/arduino-smart-car-line-tracking-learning-note.mdx`

The rewrite may update the two files' summaries, learning-note title pair, body headings, paragraphs, image placement, captions, and evidence-link wording. It will not change project or note slugs, dates, tags, visibility, project linkage, media metadata, public assets, application code, or site layout.

## Evidence Boundary

First-person claims may rely on the user's source-side `项目描述.txt`, which confirms that this was the user's first embedded-systems project, that the kit began as a bare PCB and loose components, that the user developed a strong interest while learning the unfamiliar concepts, and that the team's car finished in the top 5 percent of the campus lap-speed challenge.

Technical claims may rely on:

- the two-page Smart Car report for the large/medium/small steering strategy, `comm.h`, `motor.h`, PWM values from 0 to 255, the 12 V lithium-battery change, repeated track tuning, and the CP1/CM3/CM4 capacitor warning;
- the Smart Car manual for the LM7805 supply path, collision-switch pull-ups, IR reflection sensing, two 74HC165 devices collecting fourteen digital inputs, L293 motor driving, installation order, and staged functional tests;
- the course slides for the assignment objectives, soldering process, component concepts, six basic tests, and optional racing challenge;
- the published photos and testing-code archive for the physical build, soldering scene, function-specific sketches, `reload_shift_reg()`, and `motor_set_PWM(left, right)`.

The rewrite will not invent a specific failed solder joint, measured lap time, individual team-member contribution, unrecorded debug episode, or performance metric beyond the confirmed top-5-percent result.

## Project Page Composition

The project page will present the whole artifact and outcome. Its information moves are:

1. Enter through the bare PCB and the user's then-unfamiliarity with PCB, regulator, resistor, and capacitor concepts.
2. Use the finished car and system diagram to show how the crowded board became a set of connected blocks.
3. Explain the power path and fourteen-input constraint where they became practical: stable rails, collision/IR inputs, and the 74HC165 pair.
4. Connect the L293 and PWM interface to visible wheel behavior rather than treating them as detached component definitions.
5. Show why the staged testing-code archive mattered before a full racing program.
6. Resolve on the documented steering grades, battery change, repeated tuning, and top-5-percent result.

Headings will name the technical subject below them. Generic framework headings such as `Project Brief`, `Files And Evidence`, and `Looking Back` will be removed. Evidence links will remain available, but they will be placed where they support the active subject instead of forming a compulsory audit section.

## Learning Note Composition

The learning note will follow the user's changing understanding rather than repeat the project overview. Its information moves are:

1. Enter through the soldering-bench photo: before the car could follow a line, it was still a bare board under the iron.
2. Explain why low-to-high, center-to-edge assembly order mattered on this board.
3. Let the LM7805 and its capacitors turn “power” from a label into a condition for stable logic and sensors, including the report's component-damage warning.
4. Use the six collision switches, six IR tracking sensors, and two keys to motivate the two 74HC165 devices and `reload_shift_reg()`.
5. Connect the L293 H-bridge and `motor_set_PWM()` to direction, wheel-speed difference, and steering strength.
6. Treat the six function-specific tests as a diagnostic ladder that kept hardware and code from becoming one undifferentiated failure.
7. End on the track: soldering quality, sensor state, code, PWM, and mechanical motion became one observable chain.

The note will carry mild, evidence-grounded humor about a beginner expecting “all the parts are soldered” to mean “the car should work,” without inventing a dramatic failure scene. The English version will keep the same narrative nodes and technical detail at a calmer intensity.

## Bilingual And MDX Requirements

- Draft Chinese as the narrative source, then adapt English without reducing it to a summary.
- Keep paired headings equivalent in subject and certainty.
- Preserve exact technical identifiers such as `LM7805`, `74HC165`, `L293`, `comm.h`, `motor.h`, `reload_shift_reg()`, and `motor_set_PWM(left, right)`.
- Keep every public path real and reuse only existing images and downloads.
- Keep the number of headings below the skill limit of fifteen per page.
- Preserve the repository's English-first, Chinese-second MDX body order.

## Success Criteria

- The project title `Arduino 循迹小车焊接与控制实训` is byte-for-byte unchanged.
- The learning-note title pair matches the confirmed new title.
- The two pages have distinct roles: project case study versus learning narrative.
- Every first-person action, result, and technical claim is supported by the reviewed source material.
- English and Chinese retain the same facts, uncertainty, technical explanation, and ending beat.
- No unrelated files are changed except this design document and, during implementation, the two target MDX files.
- `git diff --check`, lint, content validation, encoding validation, typecheck, and production build pass.
- The two public routes render successfully in a local preview in both language modes.
