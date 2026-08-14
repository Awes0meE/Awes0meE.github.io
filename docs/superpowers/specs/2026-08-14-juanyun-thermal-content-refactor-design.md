# Juanyun Thermal Management Content Refactor Design

**Date:** 2026-08-14
**Branch:** `feat/expand-juanyun-thermal-archive`
**Status:** design implemented and fully verified as an uncommitted bilingual draft; user copy review remains

## Objective

Refactor the Juanyun thermal-management project family from an artifact-led archive into a bilingual, evidence-bounded account of a complete embedded product effort. The result should explain how BaseUnit and ACUnit form one refrigeration product, what Alvin independently owned, why he deliberately chose a planned bare-metal architecture, how the system reached real hardware, and how the later `production-line` branch extended the same project into automatic control and maintenance.

The public account must remain useful without publishing complete private firmware, reconstructable product source, internal manufacturing packages, or unverified company test claims as if they were Alvin's measurements.

## Organizational Approaches Considered

### One long project page

This would give the cleanest single narrative, but the hardware, scheduler, automatic-control, desktop-tool, and evidence-boundary discussions would compete for space. It would also make later technical reference difficult.

### One note per artifact or subsystem

This would preserve every source trail, but it would repeat the same product context across many pages and retain the current archive-first feeling. It would also obscure the fact that BaseUnit, ACUnit, firmware, and ControlPanel belong to one product trajectory.

### Project spine plus bounded technical notes — selected

The project page carries the product, ownership, phase, verification, and emotional arc. Notes answer separate engineering questions and do not retell the whole project. Existing narrow archive notes remain available, while two new notes cover automatic control and the production-line tool/maintenance phase. The total remains below ten notes for this project.

## Product and Ownership Model

The product is a phase-change cooler for laptops and other compact computing devices: a small external refrigeration system produces cold air and a base routes that air into the computer's intake path.

- **BaseUnit** sits under the laptop and handles airflow delivery, screen/button interaction, local sensing, fan control, telemetry, and saved settings.
- **ACUnit** is the external three-board controller for the compressor, electronic expansion valve, sensors, fans, communications, and refrigeration logic.
- BaseUnit was developed first as the simpler control system. ACUnit followed after BaseUnit succeeded.

Alvin independently completed BaseUnit hardware, firmware, and real-machine bring-up. He also independently completed the ACUnit three-board PCB design, assembly and soldering, firmware, staged board bring-up, full-chain integration, and V2.1 development SOP. The portfolio may compare this scope retrospectively with hardware-lead responsibilities in a startup, but it must not assign him a formal hardware-manager title.

## Project Phases

1. **BaseUnit proof:** establish the airflow/UI controller and verify that the smaller embedded system works.
2. **ACUnit product controller:** design and assemble the three-board system, plan the firmware architecture, test electrical behavior and peripherals, and connect the complete refrigeration-control chain.
3. **Production-line continuation:** during the later internship and post-delivery maintenance phase, extend the same ACUnit firmware with ControlPanel tooling, automatic EEV/compressor control, operating modes, protection logic, and deployment-oriented robustness.

The third phase is not a mass-production claim. The branch documents substantial productization work, but the repository itself still distinguishes working automatic control from completed long-term calibration and final production parameters.

## Content Map

| Public page | Purpose | Planned treatment |
| --- | --- | --- |
| `content/projects/juanyun-thermal-hardware.mdx` | Product spine | Rewrite around the two-unit system, independent ownership, three phases, direct bring-up, company-reported testing, limitations, and full-chain payoff. Update the project range through July 2026 and replace the stale archive-only status. Preserve the cover. |
| `content/notes/juanyun-baseunit-firmware.mdx` | First complete controller | Rewrite around why BaseUnit came first, its UI/state/data responsibilities, asynchronous telemetry, persistence, and what its success unlocked. |
| `content/notes/juanyun-acunit-board.mdx` | Three-board hardware and bring-up | Add the approved assembled-board and rail-test evidence; explain board roles, staged electrical/peripheral checks, the interaction cable-order correction, unfinished initial pressure-sensor check, and no-respin result. |
| `content/notes/juanyun-acunit-firmware.mdx` | Planned bare-metal architecture | Explain the self-imposed “exam,” App/Service/BSP plan, 1/10/100/500/2000 ms cadence, execution-time budgeting, nonblocking state machines, and protection of the 1 ms EEV path from slow work. |
| New automatic-control note | Refrigeration control | Explain the later portable EEV/compressor control core, automatic modes, continuous compressor control, superheat-related safeguards, pressure derating, and the limits of available validation. |
| New ControlPanel/maintenance note | Observability and 102-commit evolution | Use a present-day retrospective of the commit history to connect ControlPanel, trends/CSV/log separation, deployment robustness, safe startup, validity checks, and clock fallback. Do not invent forgotten incident narratives. |
| `content/notes/juanyun-acunit-hardware-revision-archive.mdx` | Diagram/version comparison | Keep narrow; avoid repeating the full hardware account. |
| `content/notes/juanyun-dht11-am2302-board.mdx` | Sensor-board pinout conflict | Keep narrow and preserve its separate ownership/unfinished-plan boundary. |
| `content/notes/juanyun-legacy-actuator-archive.mdx` and `content/notes/juanyun-hardware-sop.mdx` | Historical actuator trail and original SOP | Preserve as focused reference pages; do not make them duplicate the current-product narrative. |

The historical actuator and SOP pages may both remain linked even though the project has nine related notes in total; they answer separate archival questions and do not require a new combined page.

## Cognition and Voice

The central firmware account begins with a deliberate decision, not an RTOS-versus-bare-metal slogan. Alvin knew RTOS concepts but had not used one and was not yet comfortable with it. The MCU was limited, the peripheral count was high, and the concurrency could still be controlled through explicit cooperative scheduling. He also wanted the timing discipline itself as foundational training for understanding later operating systems.

The App/Service/BSP split and multi-rate task table were planned before implementation. Individual responsibilities matured while functions were decomposed, but the architecture was not retrofitted after the firmware became tangled.

The prose may reconstruct the confirmed feeling of the full-chain moment—seeing real Modbus compressor state and ADC temperatures on the PC made the board feel alive—but it may not add an invented date, location, dialogue, failure, or causal sequence.

The closing emotional register should combine achievement and gratitude. The boss's story about previously moving an EEV with a magnet may appear only as an attributed team anecdote or joke, not as an objective company claim.

## Evidence and Claim Boundaries

### Directly supported personal work and observation

- Independent BaseUnit hardware, firmware, and real-machine bring-up.
- Independent ACUnit PCB design, assembly, soldering, firmware, staged bring-up, integration, and SOP.
- Electrical checks on the three boards and individual peripheral tests.
- Full-chain connection with the three boards, compressor driver, compressor, power supply, and PC.
- Personal observation of Modbus compressor data/state and ADC temperature telemetry.
- V2.1 rail measurements and module results documented by the self-authored SOP.

### Company-reported, not independently verified

- Later real-machine operation of manual controls, QUIET/PERF/ZERO modes, automatic EEV/compressor behavior, and protection paths.
- A small external trial with more than ten campus students and faculty using heavy workloads such as large renders and AAA games.
- Roughly 25–40% performance improvement in some sustained heavy workloads.
- A single device running continuously for more than 150 hours.
- Strong cooling feedback and the repeated complaint that the product remained too large and insufficiently portable.

Every numeric or test-result claim in this category must be attributed to the company, boss, or test team. The text must say that Alvin did not see the raw logs, complete process, or unified benchmark records and cannot independently verify those numbers. Avoid “proven,” “universally,” and equivalent language.

### Commit-history retrospective

The 102-commit `production-line` history supports a present-day reading of major evolution lines. It does not support reconstructed memories of why each change happened. The note may say “Looking back through the commit history, the clearest lines are…” and cover:

1. telemetry becoming a Windows ControlPanel with trends, CSV export, and separated monitoring/debug views;
2. extraction of the EEV/compressor control core and the growth of automatic modes and safeguards;
3. repeated refinement around low opening, superheat, startup, negative superheat, and condensing pressure;
4. safe startup, data-validity checks, and HSE-to-HSI clock fallback with diagnostics.

## Code and Publication Policy

- Keep both firmware repositories private and omit inaccessible repository links from public frontmatter.
- Do not publish a complete firmware tree or consecutive excerpts that reconstruct a subsystem.
- Use at most two or three short reviewed real-code excerpts across the main firmware notes.
- Each excerpt must explain one decision, such as deadline-based dispatch, nonblocking homing, or communication timeout handling.
- Prefer a timing diagram and pseudocode when real source would expose too much contiguous implementation.
- Exclude credentials, setup defaults, private network material, manufacturing files, internal requirements, complete SOP source, installers, dependency/vendor trees, and generated outputs.
- Keep the existing project cover and the five already approved bring-up photographs.

## Bilingual and Structural Rules

- Draft Chinese first through the confirmed cognition trail, then adapt English with equivalent facts, uncertainty, technical depth, and emotional turns.
- Use headings only when attention genuinely changes. Do not force every note into the same problem/process/result template.
- Keep the project page readable to a recruiter or engineer without requiring note traversal; keep low-level detail in notes.
- Do not duplicate the product introduction, ownership list, test caveats, or closing reflection verbatim across pages.
- Related notes may link to each other when a question crosses hardware, scheduler, and control boundaries.

## Verification and Acceptance

The refactor is ready for user copy review when:

- the project page and selected notes contain equivalent Chinese and English bodies;
- the project page no longer says assembled-board or measurement evidence is absent;
- direct tests and company-reported results remain visibly separate;
- the 25–40%, more-than-ten-user, and over-150-hour claims are explicitly attributed and marked unverified by Alvin;
- no page implies mass production or completed final calibration;
- public source excerpts are short, discontinuous, and decision-focused;
- the project stays below ten related notes and the notes do not retell the same story;
- `git diff --check`, lint, content validation, UTF-8 validation, typecheck, build, and production dependency audit pass;
- desktop and mobile views of the project, edited notes, media gallery, and both languages receive a browser review;
- no commit, push, pull request, or merge occurs without explicit user authorization and copy approval.

## Design Self-Review

- No placeholders or unresolved structural decisions remain.
- Direct and attributed evidence categories do not overlap.
- The project-spine approach matches the nine-note ceiling and avoids creating pages solely to display artifacts.
- The design does not require public release of either private repository.
- The two new notes have distinct questions: automatic refrigeration control versus production-line observability and maintenance.
- The scope remains limited to the Juanyun thermal-management project family and its supporting public media.
