# Active Work: One-Project-at-a-Time Portfolio Copy Rewrite

**Updated:** 2026-08-16
**Copy-rewrite active branch:** none; the next rewrite starts from synchronized `main`
**Current project:** none selected
**Last completed project:** `从自制驱动板到压缩机运行：我的无感 FOC 学习路线`
**State:** pull request #25 merged the user-approved FOC refactor into `main` at `df5b91322a09f00cf0f813dacd8b871f91cba47f`; the project is closed unless the user explicitly reopens it

## Working Contract

- Handle substantive portfolio rewrites one project family at a time.
- Start each new family from a clean, synchronized `main` on a semantic topic
  branch.
- Inspect the available evidence before drafting. Reuse a user-confirmed brief
  for the same project and scope or run a `grill-me` interview.
- Research current reliable knowledge only after shared understanding is
  confirmed. Use external sources for present-day interpretation, never for
  invented project history, actions, results, or measurements.
- Draft Chinese through the user's cognition trail with the repository-local
  `skills/engineering-note-writer/SKILL.md`, then adapt English with equivalent
  facts and uncertainty.
- Require the Truth gate, Li Zhiyi gate, bilingual gate, and scoped reader-prose
  L1 gate before review.
- Preserve user-controlled covers and demonstration media unless the user
  explicitly requests or approves a visual change.
- Merge only after the user reviews the bilingual copy and explicitly approves
  publication.

## Completed Sensorless FOC Checkpoint

- FOC is an independent personal motor-control learning route. It is not a
  Juanyun or company project.
- The public project is `content/projects/sensorless-foc-learning-route.mdx`;
  its related learning note is `content/notes/sensorless-foc-handoff.mdx`.
- The project page follows the hardware and manufacturing evidence. The note
  follows the change in understanding from six-step commutation through
  Clarke/Park, SVPWM compare trajectories, TIM1 center-aligned PWM, and the
  failed sensorless handoff.
- Alvin independently completed the schematic, component selection, PCB layout,
  Gerber/BOM export, ordering, onsite SMT setup and operation, rework, assembly,
  and power-on checks.
- Firmware began from an open-source FOC example. Alvin led pin mapping,
  sampling conversion, OLED/buttons/EC11, protection logic, physical testing,
  and engineering judgment. Codex assistance is limited to RAM tracing, EKF
  parameter work, and inspection of the Kalman-gain overwrite problem.
- The final demonstrated stage is 12 V, 30–80 Hz EC11-controlled open-loop
  compressor operation with both ports open. Manual inlet restriction is a
  disturbance observation, not pressure, flow, acoustic, thermal, efficiency,
  or refrigeration-loop validation.
- The comparison with a low-cost six-step fan controller remains subjective and
  uncontrolled. Remembered differences in noise, heating, suction, and feel do
  not establish a performance ratio.
- A plausible EKF speed estimate does not prove rotor-angle accuracy,
  full-state convergence, reference-frame continuity, or successful sensorless
  takeover. Sensorless closed loop, HFI, robot joints, servo control, and force
  feedback remain future directions.
- The reviewed public set contains 12 media records and 22 files under
  `public/uploads/projects/sensorless-foc-learning-route/`. The complete firmware
  tree remains external at `https://github.com/Awes0meE/STM32_Sensorless_FOC`.
- Legacy routes redirect permanently:
  - `/work/juanyun-foc-driver-board` → `/work/sensorless-foc-learning-route`
  - `/notes/juanyun-foc-driver` → `/notes/sensorless-foc-handoff`

## Protected Completed Families

Do not reopen these approved families unless the user explicitly requests it:

- Arduino Smart Car;
- DIY pressure-flow cooling;
- Arduino Digital Clock;
- Tianjin STM32;
- Nanjing Turing;
- Claude Chime;
- Juanyun phase-change thermal management;
- sensorless FOC learning route.

Pull request #23 was a one-time explicitly authorized surface-cleanup exception,
not standing permission to bulk-rewrite approved content.

## Next Action

1. Wait for the user to select the next project family or a narrow maintenance
   scope.
2. Before starting, fetch/prune and fast-forward local `main`; stop if the
   worktree is dirty.
3. Reuse the one-project interview, evidence, cognition-led writing, bilingual
   review, and explicit merge-approval workflow.

## 2026-08-16 FOC Release Verification

- Pull request #25 used exact head
  `049aa57209a14776f2a7a7da9ee8dca5deb957d9`; its Vercel status passed before
  GitHub merged it at `df5b91322a09f00cf0f813dacd8b871f91cba47f`.
- Content validation passes for 8 projects, 24 public notes, and 84 media items.
- UTF-8 validation passes for 289 text files.
- Lint, TypeScript checking, the 39-page Next.js production build, and the
  production dependency audit pass.
- Desktop/mobile English and Chinese views, both videos, all 22 public files,
  the media route, the responsive FOC/SVPWM SVG, and both legacy redirects were
  verified before release.

## Updating This File

Replace the current-state sections at each handoff. Keep durable writing rules
and confirmed boundaries; do not append interview transcripts, secrets,
credentials, or machine-specific checkout paths.
