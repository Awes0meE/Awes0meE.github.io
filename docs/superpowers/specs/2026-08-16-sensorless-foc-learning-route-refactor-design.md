# Sensorless FOC Learning Route Refactor Design

**Date:** 2026-08-16
**Branch:** `feat/sensorless-foc-learning-route`
**Status:** approved in conversation; implementation authorized on 2026-08-16

## Objective

Refactor the existing FOC portfolio entry into an independent personal motor-control learning route. The result should connect Alvin's complete hardware work, the adaptation of an open-source FOC example, the real 12 V compressor bench, and the still-unfinished sensorless handoff without treating the work as a Juanyun/company project.

The project page and learning note have separate jobs:

- the project page proves what Alvin designed, manufactured, adapted, and ran;
- the learning note follows how his understanding of six-step commutation, FOC, SVPWM, current-vector control, and sensorless state estimation changed through the build.

The refactor covers the portfolio only. The public firmware repository remains unchanged and is linked as external evidence.

## Confirmed Project Identity

- This is one of Alvin's independent personal learning routes.
- It was not split from Juanyun and must not be attributed to Juanyun.
- The compressor entered the story by circumstance: while Alvin was working on another project, a small compressor happened to be available in his workshop.
- Alvin had begun by studying sensorless FOC but did not own a suitable three-phase brushless motor. Once he understood that the compressor contained a brushless permanent-magnet motor, he chose it as a demanding real load.
- Future thermal-management use was a direction, not the ownership or original definition of the project.

## Confirmed Timeline

| Period | Confirmed event |
| --- | --- |
| 2025-11-25 | Began drawing the driver board; this date appears on the PCB silkscreen. |
| 2026-01 | Finished the PCB design and sent it for fabrication. |
| 2026-02 | Lunar New Year break. |
| 2026-03 | Work paused after the university term resumed. |
| 2026-04 to 2026-05 | Took over the firmware, adapted it to the custom board, and debugged the compressor. |
| 2026-05 | Froze the safe 30-80 Hz low-speed open-loop demo as the current stage endpoint. |
| Present | The learning route remains active; general sensorless closed-loop control is still a future goal. |

The canonical public date range is `2025-11 – Present`.

## Ownership and Contribution Boundary

Alvin independently completed:

- schematic capture and component selection;
- PCB layout;
- Gerber and BOM export;
- ordering and manufacturing coordination;
- SMT feeder loading;
- pick-and-place coordinate setup and machine operation;
- rework, soldering, assembly, and power-on checks;
- board pin/peripheral mapping;
- current and voltage scaling;
- OLED, button, and EC11 interaction;
- compressor startup behavior and the voltage/current/fault/restart protection state machine;
- bench operation, physical observation, test execution, and acceptance decisions.

The firmware began from officially permitted, publicly downloadable FOC course example code. The user has explicitly approved the public description `open-source FOC example code`; the portfolio should not name the course provider.

During later compressor adaptation, Alvin directed the bench experiments and interpreted the physical results. Codex assisted with code inspection and implementation for the RAM trace facility, EKF parameter work, and the Kalman-gain overwrite diagnosis. Public prose may describe that collaboration where it explains the diagnostic method, but it must preserve Alvin's ownership of the hardware, test decisions, physical experiments, and engineering judgment.

## Approaches Considered

### Hardware-build spine

Lead with the cost of the teaching kit and Alvin's decision to design his own board, then move through fabrication, bring-up, and compressor operation. This makes independent hardware ownership obvious but risks reducing the work to a conventional DIY build log.

### Observer-handoff question

Lead with the paradox that the EKF speed estimate looked plausible while closed-loop takeover still failed. This provides the strongest cognition trail, but hardware and manufacturing work can disappear behind the algorithm if both public pages use the same structure.

### Open-ended personal route

Lead with the chance encounter with the compressor and carry the story toward joint motors, servo control, and force feedback. This has the strongest personal horizon but can overemphasize work that has not yet been completed.

### Selected combination

- Use the hardware-build spine for the project page.
- Use the observer-handoff question for the learning note.
- Reserve the open-ended route for the closing movement only.

## Public Naming and Routes

### Project

- Chinese title: `从自制驱动板到压缩机运行：我的无感 FOC 学习路线`
- English title: `From a Custom Driver Board to a Running Compressor: My Sensorless FOC Learning Route`
- New source file: `content/projects/sensorless-foc-learning-route.mdx`
- New route: `/work/sensorless-foc-learning-route`
- Display state: ongoing learning route / stage prototype

### Learning note

- Chinese title: `速度估计对了，闭环为什么还是接不住？`
- English title: `The Speed Estimate Looked Right—Why Couldn't the Loop Take Over?`
- New source file: `content/notes/sensorless-foc-handoff.mdx`
- New route: `/notes/sensorless-foc-handoff`

### Compatibility

- Redirect `/work/juanyun-foc-driver-board` to the new project route.
- Redirect `/notes/juanyun-foc-driver` to the new note route.
- Update project-note relationships, media metadata, internal links, and repository documentation.
- Remove the project from Juanyun-specific classifications and inventories.

## Project Page Composition

The project page is the evidence-facing case study. Its attention moves are:

1. Start with the practical constraint: Alvin had studied sensorless FOC, had no suitable brushless motor, and found the teaching hardware too expensive, so he chose to build the missing hardware himself.
2. Introduce the compressor as the unexpected real load available in the workshop, without naming the company or assigning the project to it.
3. Show the board becoming physical: schematic, component selection, layout, manufacturing package, pick-and-place setup, soldering, and power-on checks.
4. Explain the firmware boundary: an open-source FOC example became useful only after hardware mapping, scaling, standalone controls, startup behavior, and protection were adapted to the custom board and compressor.
5. Present the verified 12 V bench result with the real board, compressor, power supply, video, and trace-backed 30/45/60 Hz operating points.
6. State the final 30-80 Hz EC11 range, subjective six-step comparison, protection behavior, test boundary, and unfinished sensorless takeover.
7. Close on the continuing route toward general brushless/servo control, robot-joint control, and force feedback.

The page should remain understandable without opening the learning note. It should not reproduce the detailed coordinate-transform or observer explanation.

## Learning Note Composition

The learning note follows changing understanding instead of repeating the artifact inventory. Exact headings will be derived from the finished Chinese narrative rather than imposed in advance.

### Entry scene: when the compressor sounded different

Begin with the same compressor under comparable bench conditions:

- a low-cost fan-oriented controller produced ordinary six-step square-wave commutation, confirmed by Alvin with an oscilloscope;
- Alvin remembers stronger noise, more heating, and weaker suction;
- the custom FOC board ran more quietly and produced much stronger perceived suction.

This is a first-person, uncontrolled comparison. It may explain why Alvin trusted that the new drive was doing continuous mechanical work, but it must not become a quantitative claim that FOC universally outperformed six-step control.

### What FOC became in Alvin's head

Explain the actual control chain through the repository implementation:

`Ia/Ib/Ic → Clarke → Iα/Iβ → Park → Id/Iq → current PI → Vd/Vq → inverse Park → Vα/Vβ → SVPWM → timer compare values → inverter switching`

The explanation should connect each abstraction to a practical reason:

- two current samples reconstruct the third phase current;
- Clarke converts the three-axis representation into a stationary orthogonal plane;
- Park rotates that plane with the electrical angle so sinusoidal phase quantities become controllable `d/q` components;
- the current controllers produce `Vd/Vq` commands;
- inverse Park returns the command to the stationary plane;
- SVPWM translates the desired voltage vector into realizable inverter switching times.

The note should compare six-step commutation with FOC as control/commutation strategies, not falsely present `BLDC` and `FOC` as mutually exclusive motor types.

### Where the saddle-shaped traces come from

The note must distinguish four different waveform layers:

1. three phase duty or compare-value trajectories produced by SVPWM;
2. the saddle-shaped modulation traces visible when those values are plotted over electrical angle;
3. the center-aligned timer's digital triangular-carrier behavior;
4. the resulting MOSFET gate pulses and motor phase currents.

In this firmware, `SVPWM_Calc()` does not explicitly create a stored saddle waveform or add a named third-harmonic array. It:

- identifies the space-vector sector;
- computes adjacent-vector dwell times `Tx` and `Ty`;
- limits them to the PWM period;
- symmetrically allocates zero-vector time;
- maps the result to `Tcmp1`, `Tcmp2`, and `Tcmp3`.

When those compare values are plotted while the reference vector rotates, their trajectories form the characteristic saddle shape. The prose must not call that trace a literal motor phase voltage or phase current.

### Where the triangle comes from

The code configures TIM1 in `TIM_CounterMode_CenterAligned1`. The MCU timer counts up and down, which behaves like a digital triangular carrier. The calculated compare values are written to `CCR1-3`; timer comparison then produces the center-aligned PWM pulses. The CPU is not manually generating a sampled triangle array on every cycle.

### The observer paradox

Use the real debugging chronology:

1. stable 45 Hz open-loop operation established that the hardware, current loop, SVPWM path, and power stage could produce continuous work;
2. 30/45/60 Hz tests showed repeatable mechanical behavior and speed-related electrical trends;
3. EKF sign, motor-parameter, and code defects were investigated;
4. corrected estimates became close to the open-loop frequency;
5. closed-loop handoff still failed because speed agreement did not guarantee a sufficiently accurate rotor angle, a converged observer state, or a continuous reference-frame transition.

The central cognition statement is: a plausible speed estimate is evidence that the observer is seeing motion; it is not yet authority to control the current-vector angle.

### Future direction

High-frequency injection may be discussed as a current research direction for low-speed or standstill position information, especially where back-EMF-based methods are weak. It must not be described as implemented in this project. Robot joints, general servo motors, sensorless closed-loop control, and force feedback remain future learning directions.

## Technical Research and Attribution Policy

The user identified Zhihui Jun's article [`自制FOC驱动器：深入浅出讲解FOC控制与SVPWM技术`](https://zhuanlan.zhihu.com/p/147659820) as an important source in his learning. The note may acknowledge and link that source near the relevant explanation.

Use it for concepts such as:

- PWM area/effective-value intuition;
- the move from three phase quantities to orthogonal and rotating coordinates;
- `d/q` current regulation;
- voltage-vector synthesis from adjacent active vectors and zero vectors;
- symmetrical seven-segment SVPWM sequencing;
- compare-register generation for the inverter.

Do not copy long passages, reproduce its diagrams, or inherit its prose structure. Paraphrase the technical ideas in Alvin's present voice, rebuild any visual from this project's own code, and cross-check claims against primary or official technical sources.

Preferred external references include:

- TI's official comparison of trapezoidal, sinusoidal, and FOC commutation;
- ST's STM32 PMSM FOC documentation for sensorless startup and high-frequency injection;
- primary space-vector modulation references for vector states, dwell times, and symmetric switching;
- STM32 timer documentation for center-aligned PWM behavior.

External research is current understanding, not evidence that Alvin held every formulation at the time of the experiment. The prose should use retrospective signals such as `后来我才把这几层波形分开` when necessary.

## Explanatory Visual

Create one original project-specific diagram:

`phase currents → Clarke/Park → d/q current control → inverse Park → αβ voltage vector → sector/dwell-time calculation → saddle-shaped compare traces → center-aligned timer carrier → six complementary PWM outputs`

The diagram must be derived from the actual firmware and use original artwork. It must visually separate modulation references, timer carrier behavior, gate pulses, and phase current.

## Public Material Selection

The 2026-08-16 user-curated folder is the authoritative source set. The user confirmed that every item in it may be public, but publication remains selective for usability and provenance.

### Page media

- `cover.png`
- front and back PCB renders
- five schematic PNG exports
- `onsite_test.jpg`
- `onsite_SMT_pickandplace.mp4`
- `runtime_record.mp4`
- the new original FOC/SVPWM explanatory diagram

### Downloads and links

- `BOM_FOC_PCB1_1_2026-08-16.xlsx`
- `Gerber_PCB1_1_2026-08-16.zip`
- `PCB_PCB1_1_2026-08-16.pdf`
- Panasonic 6MD030Z manual
- relevant component datasheets where they materially support the design
- external link to `https://github.com/Awes0meE/STM32_Sensorless_FOC`

### Excluded from the portfolio asset tree

- the full 4,600-file firmware copy;
- vendor/dependency trees such as `Libraries/` and `.pack/`;
- `Debug/`, `Release/`, object files, dependency files, and other generated output;
- raw `log.md` and `codex.md` files;
- toolchain and IDE caches.

The source repository remains the place for full firmware access.

## Media Processing

- Preserve the user's Desktop source folder unchanged.
- Copy only selected assets into `public/uploads/projects/sensorless-foc-learning-route/`.
- Produce web-sized image derivatives while preserving enough resolution for schematic inspection.
- Transcode the HEVC runtime recording to broadly supported H.264/AAC MP4.
- Compress the roughly 33 MB SMT recording to a practical web delivery size while retaining 1080p evidence quality when possible.
- Use explicit captions that state what each artifact proves and what it does not prove.
- Do not assign an exact 80 Hz setpoint to `runtime_record.mp4`; describe it as the final 30-80 Hz EC11 demo version.

## Evidence and Claim Boundaries

### Directly supported

- complete board-design and manufacturing work described above;
- real assembled-board and compressor bench setup;
- successful compile/flash path;
- stable 12 V open-loop operation at documented 30/45/60 Hz points;
- final 30-80 Hz EC11 operating range;
- trace-backed current-loop and observer diagnostics;
- failed EKF handoff attempts;
- protection behavior under recorded conditions.

### Personal observation

- the six-step board sounded louder, heated the compressor more, and produced weaker suction under comparable conditions;
- suction at approximately 80 Hz felt sufficient;
- the runtime video may have been recorded near 80 Hz, but the exact setpoint is not certain.

These observations may appear in first person but cannot become controlled performance claims.

### Explicit limitations

- the inlet and outlet were open and not connected to a complete refrigeration loop;
- manually restricting the suction inlet is a disturbance observation, not validation against a real system pressure differential;
- no audited evidence establishes completed sensorless closed-loop takeover;
- no pressure, flow, acoustic, efficiency, or controlled thermal benchmark exists;
- future HFI, joint-motor, servo, and force-feedback work is not yet implemented here.

## Bilingual and Voice Rules

- Draft Chinese first with the repository-local `engineering-note-writer`, then adapt English with equivalent facts, uncertainty, technical depth, and emotional movement.
- Keep the project page evidence-led and the note cognition-led.
- Use first-person technical understanding throughout the note, but distinguish remembered experience from present-day researched understanding.
- Introduce equations only when they resolve a concrete observation from the project.
- Avoid a textbook chapter that could belong to any FOC project.
- Avoid fixed problem/process/result templates and derive headings after the Chinese draft has found its attention flow.
- Avoid Chinese corner quotes and bare `not A but B` rhetorical reframes in ordinary narration.
- Do not duplicate the hardware inventory, evidence boundary, or closing reflection across the two pages.

## Repository Migration Scope

Expected content and metadata changes include:

- replace `content/projects/juanyun-foc-driver-board.mdx` with the new project source;
- replace `content/notes/juanyun-foc-driver.mdx` with the new note source;
- migrate selected assets from `public/uploads/projects/juanyun-public/foc-driver/` to the new independent asset directory;
- update `content/media.json` and any project-note relationships;
- add route compatibility for the two legacy slugs;
- correct `CODEX.md`, `docs/architecture.md`, and `docs/juanyun-tech-source-inventory.md` where they classify FOC as Juanyun material;
- update other content indexes or tests discovered during implementation.

The old asset folder may be retired only after all live references are migrated and route/content validation proves there are no broken public references.

## Non-Goals

- Do not modify the firmware repository, its README, branches, code, or license presentation.
- Do not implement sensorless closed-loop control, HFI, joint-motor control, or force feedback.
- Do not refactor the portfolio UI or unrelated projects.
- Do not reopen the completed Juanyun thermal project prose.
- Do not publish every dependency or generated file merely because it is cleared for public release.
- Do not commit, push, open a pull request, merge, or deploy without the user's explicit authorization at the corresponding gate.

## Verification and Acceptance

The implementation is ready for copy review when:

- the new project and note titles, routes, dates, and personal-project identity are correct in both languages;
- project and note have visibly different jobs;
- the technical explanation matches the actual Clarke/Park/current-PI/inverse-Park/SVPWM/timer path in the firmware;
- saddle-shaped compare traces, triangular carrier behavior, gate pulses, and phase currents are not conflated;
- all first-person actions and results remain inside the confirmed evidence boundary;
- the six-step comparison is explicitly subjective;
- no page claims completed sensorless closed-loop takeover or real refrigeration-loop validation;
- the explanatory visual is original and code-grounded;
- selected downloads and media resolve, render, and play in major browsers;
- legacy project and note routes redirect correctly;
- no live reference remains under the old Juanyun FOC asset path before retirement;
- English and Chinese retain the same facts, uncertainty, technical depth, and ending beat;
- `git diff --check`, lint, content validation, UTF-8 validation, typecheck, production build, and dependency audit pass;
- desktop and mobile browser review covers the project page, learning note, media, downloads, legacy redirects, and both languages;
- an independent bilingual review artifact is generated for user approval before any commit or release action.

## Design Self-Review

- The project is consistently personal rather than company-owned.
- Hardware authorship, firmware inheritance, and Codex collaboration are separately described.
- The project page and note do not compete for the same narrative role.
- The technical additions arise from this board's actual code and test history.
- The user-provided Zhihui Jun article is treated as an attributed learning source, not prose to reproduce.
- Current results, remembered observations, external knowledge, and future directions remain visibly separate.
- The updated public-material handoff is authoritative without turning the portfolio into a source-code or vendor-library mirror.
