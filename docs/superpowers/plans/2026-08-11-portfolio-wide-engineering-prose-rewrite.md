# Portfolio-Wide Engineering Prose Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite every approved AI-composed portfolio surface into an evidence-led bilingual engineering narrative, update the public identity to the user's current NTU robotics MSc stage, remove public email and location, and preserve all protected notes and assets.

**Architecture:** Treat the portfolio as one content corpus with a shared identity layer and eight project-family checkpoints. Each family is audited, drafted Chinese-first with the repo-local Engineering Writing Skill, adapted into English, integrated with its media copy, verified, and committed before the next family begins; the main agent alone edits the shared `content/media.json` and performs final invariant checks.

**Tech Stack:** Next.js 16.3 App Router, React 19.2, TypeScript, Tailwind CSS, local MDX, JSON media metadata, PowerShell, Git/GitHub CLI, Vercel Preview, and `agent-browser` 0.33.2.

---

## Execution Context

- Worktree: `C:\Users\123\.config\superpowers\worktrees\XJTLU_Portfolio\rewrite-ai-authored-portfolio-copy`
- Branch: `agent/rewrite-ai-authored-portfolio-copy`
- Rewrite baseline: `dc386bb408f0dff217f5f05cd3091cf0c636178d`
- Approved design: `docs/superpowers/specs/2026-08-11-portfolio-wide-engineering-prose-rewrite-design.md`
- Writing system: `skills/engineering-note-writer/SKILL.md` plus every file directly linked from it
- Private identity source: `D:\Develop\Project_Final_Collation\个人信息.txt`
- Digital Clock source: `D:\Develop\Project_Final_Collation\Digital Clock`
- Smart Car source: `D:\Develop\Project_Final_Collation\Smart Car Project`

The design covers one cohesive subsystem: the public portfolio copy corpus. The family checkpoints are intentionally kept in one plan because they share the same content model, media file, immutable baseline, browser matrix, and release gate.

## File Responsibility Map

### Planning records

- Modify: `docs/superpowers/specs/2026-08-11-portfolio-wide-engineering-prose-rewrite-design.md` — record written-spec approval.
- Create: `docs/superpowers/plans/2026-08-11-portfolio-wide-engineering-prose-rewrite.md` — execution sequence and acceptance commands.

### Identity and fixed public copy

- Modify: `app/page.tsx` — Hero, homepage biography, education/current-stage blocks, privacy-first contact block, and current engineering focus.
- Modify: `app/about/page.tsx` — current identity, engineering direction, focus areas, and GitHub-only contact block.
- Modify: `app/layout.tsx` — default metadata and Open Graph wiring only if the existing `site` fields require it.
- Modify: `app/work/page.tsx` — project archive introduction.
- Modify: `app/notes/page.tsx` — notes archive introduction.
- Modify: `app/media/page.tsx` — media archive introduction and evidence framing.
- Modify: `app/work/[slug]/page.tsx` — fixed development-note and related-media descriptions.
- Modify: `app/notes/[slug]/page.tsx` — fixed related-project copy only if the final bilingual sweep identifies a real inconsistency.
- Modify: `components/logo.tsx` — compact identity subtitle.
- Modify: `components/site-footer.tsx` — remove email and retain GitHub/notes.
- Modify: `components/technical-visual.tsx` — evidence-focused English alt text.
- Modify: `lib/site.ts` — current site title/descriptions and GitHub-only public profile fields.
- Modify: `README.md` — current identity and durable public-content state in English and Chinese.

### Rewriteable project and note families

- Modify: `content/projects/arduino-digital-clock-counter.mdx`
- Modify: `content/notes/arduino-digital-clock-counter-course-note.mdx`
- Modify: `content/projects/tianjin-metro-stm32-foundation.mdx`
- Modify: `content/notes/tianjin-metro-environment-monitoring-stm32.mdx`
- Modify: `content/notes/tianjin-rail-control-pid-atc-reading.mdx`
- Modify: `content/notes/tianjin-stm32-environment-setup.mdx`
- Modify: `content/notes/tianjin-stm32-gpio-exti-timer.mdx`
- Modify: `content/notes/tianjin-stm32-pwm-uart-adc.mdx`
- Modify: `content/projects/nanjing-turing-qt-embedded-learning.mdx`
- Modify: `content/notes/turing-three-week-development-log.mdx`
- Modify: `content/projects/juanyun-thermal-hardware.mdx`
- Modify: `content/notes/juanyun-acunit-board.mdx`
- Modify: `content/notes/juanyun-acunit-firmware.mdx`
- Modify: `content/notes/juanyun-acunit-hardware-revision-archive.mdx`
- Modify: `content/notes/juanyun-baseunit-firmware.mdx`
- Modify: `content/notes/juanyun-dht11-am2302-board.mdx`
- Modify: `content/notes/juanyun-legacy-actuator-archive.mdx`
- Modify: `content/projects/juanyun-diy-cooling-prototype.mdx`
- Modify: `content/notes/juanyun-diy-cooling.mdx`
- Modify: `content/projects/juanyun-foc-driver-board.mdx`
- Modify: `content/notes/juanyun-foc-driver.mdx`
- Modify: `content/projects/claude-chime-hardware-power-board.mdx`
- Modify: `content/media.json` — only `title`, `titleZh`, `caption`, and `captionZh`, integrated serially per family.

### Protected files

These seven files must remain identical to the baseline Git blobs:

- `content/projects/arduino-smart-car-line-tracker.mdx`
- `content/notes/arduino-smart-car-line-tracking-learning-note.mdx`
- `content/notes/juanyun-hardware-sop.mdx`
- `content/notes/turing-cmake-build-logic.mdx`
- `content/notes/turing-qt-seamly2d-first-run.mdx`
- `content/notes/turing-release-packaging-cross-platform.mdx`
- `content/notes/turing-sm2d-xml-data-format.mdx`

Every path under `public/uploads/` is also immutable for this rewrite.

## Content Invariants

| Surface | Fields allowed to change | Fields that stay fixed |
| --- | --- | --- |
| Rewritten project MDX | `summary`, `summaryZh`, body prose/headings | filename/slug, `title`, `titleZh`, `date`, `status`, `tags`, `cover`, `featured`, `links`, `assetPaths` |
| Rewritten note MDX | `title`, `titleZh`, `summary`, `summaryZh`, body prose/headings | filename/slug, `date`, `tags`, `visibility`, `projectSlug` |
| Protected MDX | none | complete Git blob |
| `content/media.json` | `title`, `titleZh`, `caption`, `captionZh` | array order and every other field |
| `public/uploads/` | none | complete Git tree |

The final corpus must still contain 8 projects, 21 notes, and 73 media items.

### Task 1: Establish the Execution Baseline and Writing Contract

**Files:**
- Read: `docs/superpowers/specs/2026-08-11-portfolio-wide-engineering-prose-rewrite-design.md`
- Read: `skills/engineering-note-writer/SKILL.md`
- Read: `skills/engineering-note-writer/references/evidence-and-boundaries.md`
- Read: `skills/engineering-note-writer/references/material-led-composition.md`
- Read: `skills/engineering-note-writer/references/voice-rules.md`
- Read: `skills/engineering-note-writer/references/bilingual-writing.md`
- Read: `skills/engineering-note-writer/references/self-review.md`
- Read: `skills/engineering-note-writer/references/style-examples.md`

- [ ] **Step 1: Confirm the isolated branch and clean starting point**

Run:

```powershell
git status --short --branch
git branch --show-current
git rev-parse HEAD
git rev-list --left-right --count origin/agent/rewrite-ai-authored-portfolio-copy...HEAD
```

Expected: branch is `agent/rewrite-ai-authored-portfolio-copy`, the tree contains no uncommitted implementation changes, and remote divergence is `0 0` after the planning commit is pushed.

- [ ] **Step 2: Read the complete Engineering Writing Skill before drafting**

Run each command and continue through every linked reference to EOF:

```powershell
Get-Content -Encoding UTF8 -LiteralPath 'skills\engineering-note-writer\SKILL.md'
Get-Content -Encoding UTF8 -LiteralPath 'skills\engineering-note-writer\references\evidence-and-boundaries.md'
Get-Content -Encoding UTF8 -LiteralPath 'skills\engineering-note-writer\references\material-led-composition.md'
Get-Content -Encoding UTF8 -LiteralPath 'skills\engineering-note-writer\references\voice-rules.md'
Get-Content -Encoding UTF8 -LiteralPath 'skills\engineering-note-writer\references\bilingual-writing.md'
Get-Content -Encoding UTF8 -LiteralPath 'skills\engineering-note-writer\references\self-review.md'
Get-Content -Encoding UTF8 -LiteralPath 'skills\engineering-note-writer\references\style-examples.md'
```

Expected: the execution agent can state the evidence boundary, Chinese-first drafting rule, English intensity adjustment, heading constraints, and self-review sequence before editing.

- [ ] **Step 3: Confirm the approved local reference sources are present**

Run:

```powershell
Test-Path -LiteralPath 'D:\Develop\Project_Final_Collation\个人信息.txt'
Test-Path -LiteralPath 'D:\Develop\Project_Final_Collation\Digital Clock'
Test-Path -LiteralPath 'D:\Develop\Project_Final_Collation\Smart Car Project'
```

Expected: all three commands return `True`. Treat these as read-only reference sources; do not copy them wholesale into the repository.

- [ ] **Step 4: Re-run the content baseline**

Run:

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
```

Expected: ESLint passes, content validation reports 8 projects/21 notes/73 media items, encoding validation passes, TypeScript passes, and the production build completes with 36 generated routes.

- [ ] **Step 5: Verify protected content and assets are untouched before implementation**

Run:

```powershell
git diff --exit-code dc386bb408f0dff217f5f05cd3091cf0c636178d -- content/projects/arduino-smart-car-line-tracker.mdx content/notes/arduino-smart-car-line-tracking-learning-note.mdx content/notes/juanyun-hardware-sop.mdx content/notes/turing-cmake-build-logic.mdx content/notes/turing-qt-seamly2d-first-run.mdx content/notes/turing-release-packaging-cross-platform.mdx content/notes/turing-sm2d-xml-data-format.mdx
git diff --exit-code dc386bb408f0dff217f5f05cd3091cf0c636178d -- public/uploads
```

Expected: both commands exit 0 with no diff.

### Task 2: Update Identity, Privacy, Static Copy, and SEO

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/work/page.tsx`
- Modify: `app/notes/page.tsx`
- Modify: `app/media/page.tsx`
- Modify: `app/work/[slug]/page.tsx`
- Modify: `app/notes/[slug]/page.tsx` — align the fixed related-project description with the final evidence-led terminology.
- Modify: `components/logo.tsx`
- Modify: `components/site-footer.tsx`
- Modify: `components/technical-visual.tsx`
- Modify: `lib/site.ts`
- Modify: `README.md`

- [ ] **Step 1: Build a private identity fact sheet from the approved source**

Run:

```powershell
Get-Content -Encoding UTF8 -LiteralPath 'D:\Develop\Project_Final_Collation\个人信息.txt'
```

Extract only facts safe for public use: XJTLU Communication Engineering graduate, current first-year NTU MAE MSc (Robotics and Intelligent Systems) student, robotic-systems-hardware direction, control/flight-control boards, schematic and PCB work, bring-up, hardware-firmware integration, motor drives, and power electronics. Convert future-tense NTU statements into current enrolment; do not infer residence, employment, or expert status.

- [ ] **Step 2: Draft the Chinese identity argument before the English adaptation**

Write the Chinese information moves in this order:

1. Lead with the hardware behind intelligent machines.
2. Name the concrete board/system work that supports that direction.
3. Place the current NTU MAE MSc stage after the engineering direction.
4. Connect the XJTLU Communication Engineering background without presenting the user as an undergraduate.
5. End on the portfolio's function as an evidence-backed record of systems, experiments, and changing understanding.

Adapt the same facts into calmer English. Keep the Hero compact enough for the existing `max-w-80`/responsive layout.

- [ ] **Step 3: Replace public identity fields and remove sensitive contact fields**

Keep `lib/site.ts` structurally equivalent to:

```ts
export const site = {
  name: "Awes0meE / Li Zhiyi",
  title: "Awes0meE / Li Zhiyi | Robotic Systems Hardware Portfolio",
  description:
    "Robotic systems hardware portfolio by Li Zhiyi, an NTU MSc (Robotics and Intelligent Systems) student working across embedded control, PCB design, board bring-up, motor drives, and power electronics.",
  descriptionZh:
    "Li Zhiyi 的机器人系统硬件作品集：现为南洋理工大学机器人与智能系统硕士生，关注嵌入式控制、原理图与 PCB、板级 Bring-up、电机驱动和电力电子。",
  url: "https://www.66ccff-labs.com",
  github: "https://github.com/Awes0meE"
};
```

Use these SEO strings unless the Chinese-first drafting review finds a factual mismatch; any wording refinement must preserve the same identity, scope, and privacy boundary. Remove `email`, `location`, and `locationZh`; then remove all `Mail`/`MapPin` imports and empty contact rows from homepage, About, and footer. GitHub remains the only public direct-contact link.

- [ ] **Step 4: Apply the approved identity consistently across fixed-copy surfaces**

Edit the exact files listed for this task. Preserve route structure, components, and visual system. Update the Hero, homepage About block, current-focus block, About biography/focus chips, compact logo subtitle, archive introductions, related-content descriptions, alt text, default SEO/Open Graph source copy, and both README languages. Do not add a location, email substitute, admissions claim, residence claim, or new layout subsystem.

- [ ] **Step 5: Scan for stale public identity and contact data**

Run:

```powershell
rg -n -i "lizhiyi20030401@gmail.com|Suzhou, China|中国苏州|XJTLU Undergraduate|Communication Engineering undergraduate|通信工程本科生|西交利物浦大学本科生" app components lib README.md
```

Expected: no matches. References in historical Git commits and non-public local source files are outside this scan.

- [ ] **Step 6: Run static-copy checks**

Run:

```powershell
git diff --check
npm.cmd run lint
npm.cmd run typecheck
```

Expected: all commands exit 0, with content counts unchanged.

- [ ] **Step 7: Inspect the identity diff and protected baseline**

Run:

```powershell
git diff -- app/page.tsx app/about/page.tsx app/layout.tsx app/work/page.tsx app/notes/page.tsx app/media/page.tsx ':(literal)app/work/[slug]/page.tsx' ':(literal)app/notes/[slug]/page.tsx' components/logo.tsx components/site-footer.tsx components/technical-visual.tsx lib/site.ts README.md
git diff --exit-code dc386bb408f0dff217f5f05cd3091cf0c636178d -- content/projects/arduino-smart-car-line-tracker.mdx content/notes/arduino-smart-car-line-tracking-learning-note.mdx content/notes/juanyun-hardware-sop.mdx content/notes/turing-cmake-build-logic.mdx content/notes/turing-qt-seamly2d-first-run.mdx content/notes/turing-release-packaging-cross-platform.mdx content/notes/turing-sm2d-xml-data-format.mdx public/uploads
```

Expected: only approved static copy/privacy changes appear; the protected command exits 0.

- [ ] **Step 8: Commit the identity checkpoint**

Run:

```powershell
git add -- app/page.tsx app/about/page.tsx app/layout.tsx app/work/page.tsx app/notes/page.tsx app/media/page.tsx ':(literal)app/work/[slug]/page.tsx' ':(literal)app/notes/[slug]/page.tsx' components/logo.tsx components/site-footer.tsx components/technical-visual.tsx lib/site.ts README.md
git commit -m "feat(site): update engineering identity and privacy"
```

Expected: one identity/static-copy commit; no content-family files staged accidentally.

### Task 3: Rewrite the Arduino Digital Clock Family

**Files:**
- Modify: `content/projects/arduino-digital-clock-counter.mdx`
- Modify: `content/notes/arduino-digital-clock-counter-course-note.mdx`
- Modify: `content/media.json` entries where `projectSlug` is `arduino-digital-clock-counter` (11 items)
- Read: `D:\Develop\Project_Final_Collation\Digital Clock`
- Read: `public/uploads/projects/arduino-digital-clock-counter/`

- [ ] **Step 1: Audit the course brief, report, code, images, and current Git history**

Read the source folder and published evidence without modifying either. Separate group/course material, personal actions, artifact facts, inferred circuit behavior, and unverified outcomes. Preserve Arduino Nano, SN54LS47, BCD digit splitting, two seven-segment displays, button logic, and the evidence-backed build sequence.

- [ ] **Step 2: Draft the project Chinese-first around the circuit becoming a working counter**

Replace generic archive headings with headings derived from the actual constraint changes: two-digit rollover, decoder wiring, switch levels, and staged sketches. Keep the existing project `title`/`titleZh` unchanged. Rewrite only `summary`, `summaryZh`, and body prose/headings.

- [ ] **Step 3: Draft the note Chinese-first, then derive its final title**

Let the note explain what the course brief changed in the writer's understanding of BCD decoding, display wiring, and switch inputs. After the Chinese body is stable, derive `titleZh`; then adapt English and derive `title`. Preserve note date, tags, visibility, and `projectSlug`.

- [ ] **Step 4: Rewrite the 11 Digital Clock media records**

For the 11 records under `arduino-digital-clock-counter`, change only `title`, `titleZh`, `caption`, and `captionZh`. Make each caption say what the image/video directly shows and why it matters; do not promote course slides or report excerpts into personal authorship.

- [ ] **Step 5: Run the family semantic review**

Check every first-person action, result, and reaction against the source folder or committed artifact. Compare Chinese/English component identifiers, counts, rollover behavior, and ending beat. Record the note's old-title → new-title pair for the checkpoint and final handoff.

- [ ] **Step 6: Validate and inspect the family diff**

Run:

```powershell
git diff --check
npm.cmd run validate-content
npm.cmd run validate-encoding
git diff -- content/projects/arduino-digital-clock-counter.mdx content/notes/arduino-digital-clock-counter-course-note.mdx content/media.json
```

Expected: validation reports 8 projects/21 notes/73 media; only the two MDX files and 11 media-copy records change.

- [ ] **Step 7: Re-run the protected guards and commit**

Run:

```powershell
git diff --exit-code dc386bb408f0dff217f5f05cd3091cf0c636178d -- content/projects/arduino-smart-car-line-tracker.mdx content/notes/arduino-smart-car-line-tracking-learning-note.mdx content/notes/juanyun-hardware-sop.mdx content/notes/turing-cmake-build-logic.mdx content/notes/turing-qt-seamly2d-first-run.mdx content/notes/turing-release-packaging-cross-platform.mdx content/notes/turing-sm2d-xml-data-format.mdx public/uploads
git add -- content/projects/arduino-digital-clock-counter.mdx content/notes/arduino-digital-clock-counter-course-note.mdx content/media.json
git commit -m "docs(content): rewrite digital clock family"
```

Expected: the guard exits 0 and the commit contains one project, one note, and the Digital Clock media-copy changes.

### Task 4: Rewrite the Tianjin Metro STM32 Training Family

**Files:**
- Modify: `content/projects/tianjin-metro-stm32-foundation.mdx`
- Modify: `content/notes/tianjin-metro-environment-monitoring-stm32.mdx`
- Modify: `content/notes/tianjin-rail-control-pid-atc-reading.mdx`
- Modify: `content/notes/tianjin-stm32-environment-setup.mdx`
- Modify: `content/notes/tianjin-stm32-gpio-exti-timer.mdx`
- Modify: `content/notes/tianjin-stm32-pwm-uart-adc.mdx`
- Modify: `content/media.json` entries where `projectSlug` is `tianjin-metro-stm32-foundation` (3 items)
- Read: `public/uploads/projects/tianjin-metro/`

- [ ] **Step 1: Build the Tianjin evidence boundary**

Read the current project, five notes, and public source files. Separate STM32F103C8T6 learning exercises, the small environment-monitoring integration, and rail-control reading from production railway engineering. Do not invent a field deployment, failure scene, measured control quality, or operational responsibility.

- [ ] **Step 2: Rewrite the project around the progression from toolchain to integration**

Draft Chinese first around Keil/ST-Link setup, GPIO/EXTI/timer foundations, PWM/UART/ADC, sensor integration, and the point where separate exercises became one demo. Preserve project titles and every non-prose frontmatter field; adapt English with identical identifiers and result strength.

- [ ] **Step 3: Rewrite the five notes as distinct engineering questions**

Give each note one technical center: environment-monitoring integration; PID/ATC reading; environment setup; GPIO/EXTI/timer timing; PWM/UART/ADC interfaces. Derive each note title after its Chinese body is stable, then adapt English. Preserve dates, tags, visibility, slugs, and `projectSlug`.

- [ ] **Step 4: Rewrite the 3 Tianjin media records**

Edit only the four copy fields. Keep the pinout, internship cover, and servo parameter evidence at the strength visible in each artifact.

- [ ] **Step 5: Review facts, bilingual parity, and title maps**

Confirm exact MCU identifiers, peripheral names, timer/PWM language, and demo scope. Record five old-title → new-title pairs. Ensure English never upgrades `learning`, `reading`, or `demo` into production delivery.

- [ ] **Step 6: Validate, guard, and commit**

Run:

```powershell
git diff --check
npm.cmd run validate-content
npm.cmd run validate-encoding
git diff -- content/projects/tianjin-metro-stm32-foundation.mdx content/notes/tianjin-metro-environment-monitoring-stm32.mdx content/notes/tianjin-rail-control-pid-atc-reading.mdx content/notes/tianjin-stm32-environment-setup.mdx content/notes/tianjin-stm32-gpio-exti-timer.mdx content/notes/tianjin-stm32-pwm-uart-adc.mdx content/media.json
git diff --exit-code dc386bb408f0dff217f5f05cd3091cf0c636178d -- content/projects/arduino-smart-car-line-tracker.mdx content/notes/arduino-smart-car-line-tracking-learning-note.mdx content/notes/juanyun-hardware-sop.mdx content/notes/turing-cmake-build-logic.mdx content/notes/turing-qt-seamly2d-first-run.mdx content/notes/turing-release-packaging-cross-platform.mdx content/notes/turing-sm2d-xml-data-format.mdx public/uploads
git add -- content/projects/tianjin-metro-stm32-foundation.mdx content/notes/tianjin-metro-environment-monitoring-stm32.mdx content/notes/tianjin-rail-control-pid-atc-reading.mdx content/notes/tianjin-stm32-environment-setup.mdx content/notes/tianjin-stm32-gpio-exti-timer.mdx content/notes/tianjin-stm32-pwm-uart-adc.mdx content/media.json
git commit -m "docs(content): rewrite Tianjin STM32 family"
```

Expected: all checks pass and the commit contains the Tianjin project, five notes, and three media-copy records.

### Task 5: Rewrite the Nanjing Turing Family

**Files:**
- Modify: `content/projects/nanjing-turing-qt-embedded-learning.mdx`
- Modify: `content/notes/turing-three-week-development-log.mdx`
- Modify: `content/media.json` entries where `projectSlug` is `nanjing-turing-qt-embedded-learning` (19 items)
- Read: `public/uploads/projects/nanjing-turing/`
- Protect: the four original/self-authored Turing notes listed in the protected set

- [ ] **Step 1: Audit raw logs and upstream material**

Read the three weekly log files, onboarding text, source snippet, scripts, published Notion exports, and current MDX. Mark Seamly2D, Qt/CMake, institutional marks, and generated diagrams as upstream/third-party where that is what the artifact proves. Keep Windows/macOS signing and notarization unverified unless the records explicitly show completion.

- [ ] **Step 2: Rewrite the project around the build-and-release learning chain**

Draft Chinese first from getting Seamly2D running through the small account/role layer into build logic and packaging. Preserve project titles and non-prose frontmatter. Let headings name the actual technical transition rather than `Starting Point`, `Source Folder`, or `Looking Back`.

- [ ] **Step 3: Rewrite the three-week note from the raw logs**

Give the note a changing-understanding arc across Qt setup, login/user management, roles, and release packaging. Derive its Chinese and English titles after the bodies stabilize. Preserve the note's date, tags, visibility, slug, and project link.

- [ ] **Step 4: Rewrite the 19 Nanjing media records**

Change only the four copy fields. Identify logo/diagram/source provenance in the caption; explain what a diagram helps the reader see without claiming it was authored by the user when provenance is upstream or generated.

- [ ] **Step 5: Confirm protected Turing notes remain exact**

Run:

```powershell
git diff --exit-code dc386bb408f0dff217f5f05cd3091cf0c636178d -- content/notes/turing-cmake-build-logic.mdx content/notes/turing-qt-seamly2d-first-run.mdx content/notes/turing-release-packaging-cross-platform.mdx content/notes/turing-sm2d-xml-data-format.mdx
```

Expected: exit 0 with no output.

- [ ] **Step 6: Review, validate, and record the title map**

Compare the project/note against the weekly logs and public files, check bilingual parity, and record the three-week note's old-title → new-title pair. Confirm no sentence says signing, notarization, or cross-platform packaging succeeded beyond the evidence.

- [ ] **Step 7: Commit the Nanjing checkpoint**

Run:

```powershell
git diff --check
npm.cmd run validate-content
npm.cmd run validate-encoding
git diff -- content/projects/nanjing-turing-qt-embedded-learning.mdx content/notes/turing-three-week-development-log.mdx content/media.json
git diff --exit-code dc386bb408f0dff217f5f05cd3091cf0c636178d -- content/projects/arduino-smart-car-line-tracker.mdx content/notes/arduino-smart-car-line-tracking-learning-note.mdx content/notes/juanyun-hardware-sop.mdx content/notes/turing-cmake-build-logic.mdx content/notes/turing-qt-seamly2d-first-run.mdx content/notes/turing-release-packaging-cross-platform.mdx content/notes/turing-sm2d-xml-data-format.mdx public/uploads
git add -- content/projects/nanjing-turing-qt-embedded-learning.mdx content/notes/turing-three-week-development-log.mdx content/media.json
git commit -m "docs(content): rewrite Nanjing Turing family"
```

Expected: one project, one AI-composed note, and 19 media-copy records are committed; four protected Turing notes remain unchanged.

### Task 6: Rewrite the Juanyun Thermal and Control Platform Family

**Files:**
- Modify: `content/projects/juanyun-thermal-hardware.mdx`
- Modify: `content/notes/juanyun-acunit-board.mdx`
- Modify: `content/notes/juanyun-acunit-firmware.mdx`
- Modify: `content/notes/juanyun-acunit-hardware-revision-archive.mdx`
- Modify: `content/notes/juanyun-baseunit-firmware.mdx`
- Modify: `content/notes/juanyun-dht11-am2302-board.mdx`
- Modify: `content/notes/juanyun-legacy-actuator-archive.mdx`
- Modify: `content/media.json` entries where `projectSlug` is `juanyun-thermal-hardware` (15 items)
- Read: reviewed public evidence under `public/uploads/projects/juanyun-tech/` and `public/uploads/projects/juanyun-public/`
- Protect: `content/notes/juanyun-hardware-sop.mdx`

- [ ] **Step 1: Re-establish the Juanyun privacy/evidence boundary**

Use only the reviewed public files already present in the repository. Do not seek or publish raw `Current_Product` ACUnit/BaseUnit packages. Treat renders as visible structure, not proof of personal authorship, timing, rationale, bring-up completion, or production performance.

- [ ] **Step 2: Rewrite the thermal project around interfaces and verification limits**

Draft Chinese first around board splitting, interfaces, firmware rhythm, sensor/actuator boards, and the SOP as a separate self-authored artifact. Preserve the project title and non-prose frontmatter. Keep unsupported timing, ownership, and result claims beside their uncertainty rather than in a disclaimer pile.

- [ ] **Step 3: Rewrite the six AI-composed thermal notes**

Give each note a distinct evidence-led center: ACUnit board structure; ACUnit firmware rhythm; early hardware revisions; BaseUnit firmware; DHT11/AM2302 sensor-board constraints; legacy actuator/EEV evidence. Derive titles after each Chinese body, then adapt English. Preserve non-prose note fields.

- [ ] **Step 4: Rewrite the 15 thermal media records**

Change only the four media-copy fields. Captions must distinguish system-block diagrams, front/back renders, parameter screenshots, SOP cover, DHT plan, company cover, and EEV board/schematic evidence without inventing ownership or validation.

- [ ] **Step 5: Review privacy, evidence, bilingual parity, and title maps**

Check that sensitive Current_Product data is absent, visible structures are not presented as measured performance, and all six notes have recorded old-title → new-title pairs. Keep `juanyun-hardware-sop.mdx` exact.

- [ ] **Step 6: Validate, guard, and commit**

Run:

```powershell
git diff --check
npm.cmd run validate-content
npm.cmd run validate-encoding
git diff -- content/projects/juanyun-thermal-hardware.mdx content/notes/juanyun-acunit-board.mdx content/notes/juanyun-acunit-firmware.mdx content/notes/juanyun-acunit-hardware-revision-archive.mdx content/notes/juanyun-baseunit-firmware.mdx content/notes/juanyun-dht11-am2302-board.mdx content/notes/juanyun-legacy-actuator-archive.mdx content/media.json
git diff --exit-code dc386bb408f0dff217f5f05cd3091cf0c636178d -- content/projects/arduino-smart-car-line-tracker.mdx content/notes/arduino-smart-car-line-tracking-learning-note.mdx content/notes/juanyun-hardware-sop.mdx content/notes/turing-cmake-build-logic.mdx content/notes/turing-qt-seamly2d-first-run.mdx content/notes/turing-release-packaging-cross-platform.mdx content/notes/turing-sm2d-xml-data-format.mdx public/uploads
git add -- content/projects/juanyun-thermal-hardware.mdx content/notes/juanyun-acunit-board.mdx content/notes/juanyun-acunit-firmware.mdx content/notes/juanyun-acunit-hardware-revision-archive.mdx content/notes/juanyun-baseunit-firmware.mdx content/notes/juanyun-dht11-am2302-board.mdx content/notes/juanyun-legacy-actuator-archive.mdx content/media.json
git commit -m "docs(content): rewrite Juanyun thermal family"
```

Expected: one project, six AI-composed notes, and 15 media-copy records are committed with protected assets/SOP unchanged.

### Task 7: Rewrite the DIY Pressure-Flow Cooling Family

**Files:**
- Modify: `content/projects/juanyun-diy-cooling-prototype.mdx`
- Modify: `content/notes/juanyun-diy-cooling.mdx`
- Modify: `content/media.json` entries where `projectSlug` is `juanyun-diy-cooling-prototype` (6 items)
- Read: `public/uploads/projects/juanyun-tech/` selected DIY assets
- Read: `public/uploads/projects/juanyun-public/diy-cooling/`

- [ ] **Step 1: Audit what the artifacts prove**

Separate the mechanical iterations, 3D-print previews, desktop demo, STM32 PCB render/schematic, and code/files from any cooling-performance claim. Without measurements, describe structure, control intent, and prototype iteration only.

- [ ] **Step 2: Rewrite project and note Chinese-first**

Make the project explain how mechanical, code, desktop-demo, and PCB iterations converged without claiming measured thermal performance. Make the note center on the pressure/flow cooling question and what remains unverified. Preserve the project title; derive the note title only after its Chinese body stabilizes; then adapt English.

- [ ] **Step 3: Rewrite the 6 DIY media records**

Edit only `title`, `titleZh`, `caption`, and `captionZh`. State whether each item is a demo, print preview, PCB render, or schematic and avoid language such as `proved cooling performance`.

- [ ] **Step 4: Review, validate, and commit**

Record the note's old-title → new-title pair, compare English/Chinese result strength, then run:

```powershell
git diff --check
npm.cmd run validate-content
npm.cmd run validate-encoding
git diff -- content/projects/juanyun-diy-cooling-prototype.mdx content/notes/juanyun-diy-cooling.mdx content/media.json
git diff --exit-code dc386bb408f0dff217f5f05cd3091cf0c636178d -- content/projects/arduino-smart-car-line-tracker.mdx content/notes/arduino-smart-car-line-tracking-learning-note.mdx content/notes/juanyun-hardware-sop.mdx content/notes/turing-cmake-build-logic.mdx content/notes/turing-qt-seamly2d-first-run.mdx content/notes/turing-release-packaging-cross-platform.mdx content/notes/turing-sm2d-xml-data-format.mdx public/uploads
git add -- content/projects/juanyun-diy-cooling-prototype.mdx content/notes/juanyun-diy-cooling.mdx content/media.json
git commit -m "docs(content): rewrite DIY cooling family"
```

Expected: one project, one note, and six media-copy records are committed; no performance result is stated without a measurement.

### Task 8: Rewrite the FOC Driver Board Family

**Files:**
- Modify: `content/projects/juanyun-foc-driver-board.mdx`
- Modify: `content/notes/juanyun-foc-driver.mdx`
- Modify: `content/media.json` entries where `projectSlug` is `juanyun-foc-driver-board` (6 items)
- Read: `public/uploads/projects/juanyun-public/foc-driver/`

- [ ] **Step 1: Audit board/source existence separately from bring-up**

Identify what the STM32F4/DRV8301 board files, schematics, renders, and source snippets show. Keep startup, waveform, sampling, protection, tuning, and performance evidence explicitly missing where the archive does not contain it.

- [ ] **Step 2: Rewrite the project and note Chinese-first**

Frame the project as a readable hardware/source archive rather than a successful motor-control result. Let the note show how the board can be read through MCU, connector, ADC, MOSFET, and gate-driver sheets. Preserve project titles; derive the note title after its body; adapt English without strengthening completion claims.

- [ ] **Step 3: Rewrite the 6 FOC media records**

Edit only the four copy fields. Each schematic caption must name the sheet's visible subsystem and avoid claiming verified operation.

- [ ] **Step 4: Review, validate, and commit**

Record the note title map and confirm missing evidence remains visible. Run:

```powershell
git diff --check
npm.cmd run validate-content
npm.cmd run validate-encoding
git diff -- content/projects/juanyun-foc-driver-board.mdx content/notes/juanyun-foc-driver.mdx content/media.json
git diff --exit-code dc386bb408f0dff217f5f05cd3091cf0c636178d -- content/projects/arduino-smart-car-line-tracker.mdx content/notes/arduino-smart-car-line-tracking-learning-note.mdx content/notes/juanyun-hardware-sop.mdx content/notes/turing-cmake-build-logic.mdx content/notes/turing-qt-seamly2d-first-run.mdx content/notes/turing-release-packaging-cross-platform.mdx content/notes/turing-sm2d-xml-data-format.mdx public/uploads
git add -- content/projects/juanyun-foc-driver-board.mdx content/notes/juanyun-foc-driver.mdx content/media.json
git commit -m "docs(content): rewrite FOC driver family"
```

Expected: one project, one note, and six media-copy records are committed with no unsupported bring-up claim.

### Task 9: Rewrite the Claude Chime Power Board Family

**Files:**
- Modify: `content/projects/claude-chime-hardware-power-board.mdx`
- Modify: `content/media.json` entry where `projectSlug` is `claude-chime-hardware-power-board` (1 item)
- Read: `public/uploads/projects/claude-chime-hardware/`

- [ ] **Step 1: Audit schematic/BOM/Gerber/EasyEDA evidence**

Bound the visible single-channel electromagnetic-lock power structure and ESP32-S3 control direction. Do not convert file existence into unqualified authorship, exact personal contribution, successful fabrication, or verified completion.

- [ ] **Step 2: Rewrite the project Chinese-first and adapt English**

Preserve both project titles and all non-prose frontmatter. Build the narrative around what can be read from the power path and archive, followed by the verification that is not present.

- [ ] **Step 3: Rewrite the single Claude media record**

Change only the four copy fields. Identify the logo as a project/brand visual rather than hardware validation evidence.

- [ ] **Step 4: Review, validate, and commit**

Run:

```powershell
git diff --check
npm.cmd run validate-content
npm.cmd run validate-encoding
git diff -- content/projects/claude-chime-hardware-power-board.mdx content/media.json
git diff --exit-code dc386bb408f0dff217f5f05cd3091cf0c636178d -- content/projects/arduino-smart-car-line-tracker.mdx content/notes/arduino-smart-car-line-tracking-learning-note.mdx content/notes/juanyun-hardware-sop.mdx content/notes/turing-cmake-build-logic.mdx content/notes/turing-qt-seamly2d-first-run.mdx content/notes/turing-release-packaging-cross-platform.mdx content/notes/turing-sm2d-xml-data-format.mdx public/uploads
git add -- content/projects/claude-chime-hardware-power-board.mdx content/media.json
git commit -m "docs(content): rewrite Claude Chime board family"
```

Expected: one project and one media-copy record are committed; authorship and completion remain bounded.

### Task 10: Align Smart Car Media and Sweep Remaining Fixed Copy

**Files:**
- Modify: `content/media.json` entries where `projectSlug` is `arduino-smart-car-line-tracker` (12 items)
- Read only: `content/projects/arduino-smart-car-line-tracker.mdx`
- Read only: `content/notes/arduino-smart-car-line-tracking-learning-note.mdx`
- Read only: `D:\Develop\Project_Final_Collation\Smart Car Project`
- Inspect: fixed reader-facing copy under `app/` and `components/`

- [ ] **Step 1: Read the approved Smart Car narrative without editing it**

Use the project and note as the authoritative voice/claim boundary for media copy. Keep the approved note title `从焊点到循迹：Smart Car 的第一次完整 Bring-up` and both protected MDX blobs unchanged.

- [ ] **Step 2: Rewrite the 12 Smart Car media records**

Change only the four copy fields. Align assembly, soldering, LM7805 power, sensor/switch inputs, 74HC165, L293/PWM, basic tests, and racing challenge captions with what the protected project/note and visible images support.

- [ ] **Step 3: Sweep fixed functional prose without redesigning navigation**

Scan `app/` and `components/` for remaining prose that conflicts with the evidence-led positioning. Change only genuinely stale descriptive sentences; keep navigation labels, action labels, route structure, and component architecture concise and stable.

- [ ] **Step 4: Verify the protected Smart Car blobs immediately**

Run:

```powershell
git diff --exit-code dc386bb408f0dff217f5f05cd3091cf0c636178d -- content/projects/arduino-smart-car-line-tracker.mdx content/notes/arduino-smart-car-line-tracking-learning-note.mdx
```

Expected: exit 0 with no output.

- [ ] **Step 5: Validate, inspect, and commit**

Run:

```powershell
git diff --check
npm.cmd run validate-content
npm.cmd run validate-encoding
git diff -- content/media.json app components
git diff --exit-code dc386bb408f0dff217f5f05cd3091cf0c636178d -- content/projects/arduino-smart-car-line-tracker.mdx content/notes/arduino-smart-car-line-tracking-learning-note.mdx content/notes/juanyun-hardware-sop.mdx content/notes/turing-cmake-build-logic.mdx content/notes/turing-qt-seamly2d-first-run.mdx content/notes/turing-release-packaging-cross-platform.mdx content/notes/turing-sm2d-xml-data-format.mdx public/uploads
$fixedCopyFiles = git diff --name-only -- app components
foreach ($file in $fixedCopyFiles) { git add -- ":(literal)$file" }
git add -- content/media.json
git commit -m "docs(content): align Smart Car media copy"
```

Expected: 12 Smart Car media-copy records plus any necessary fixed descriptive copy are committed; protected MDX/assets remain unchanged.

### Task 11: Perform Cross-Corpus Semantic and Title Review

**Files:**
- Review: all 7 rewritten project MDX files
- Review: all 15 rewritten note MDX files
- Review: `content/media.json`
- Review: identity/static-copy files from Task 2

- [ ] **Step 1: Scan rewritten targets for exposed template headings**

Run a targeted warning scan across rewritten files:

```powershell
rg -n "^## (Starting Point|Project Brief|Source Folder|Files|Current State|Looking Back)( /|$)" content/projects/arduino-digital-clock-counter.mdx content/projects/tianjin-metro-stm32-foundation.mdx content/projects/nanjing-turing-qt-embedded-learning.mdx content/projects/juanyun-thermal-hardware.mdx content/projects/juanyun-diy-cooling-prototype.mdx content/projects/juanyun-foc-driver-board.mdx content/projects/claude-chime-hardware-power-board.mdx content/notes/arduino-digital-clock-counter-course-note.mdx content/notes/tianjin-metro-environment-monitoring-stm32.mdx content/notes/tianjin-rail-control-pid-atc-reading.mdx content/notes/tianjin-stm32-environment-setup.mdx content/notes/tianjin-stm32-gpio-exti-timer.mdx content/notes/tianjin-stm32-pwm-uart-adc.mdx content/notes/turing-three-week-development-log.mdx content/notes/juanyun-acunit-board.mdx content/notes/juanyun-acunit-firmware.mdx content/notes/juanyun-acunit-hardware-revision-archive.mdx content/notes/juanyun-baseunit-firmware.mdx content/notes/juanyun-dht11-am2302-board.mdx content/notes/juanyun-legacy-actuator-archive.mdx content/notes/juanyun-diy-cooling.mdx content/notes/juanyun-foc-driver.mdx
```

Expected: no exact generic framework headings. Review any match semantically before changing it.

- [ ] **Step 2: Review every strong claim and uncertainty**

Search manually through first-person verbs, completion words, measurements, and superlatives. For every claim, point to a public artifact, source record, or explicit user statement. Downgrade or qualify claims about authorship, successful bring-up, deployment, performance, control quality, manufacturing, signing, and production use when evidence is incomplete.

- [ ] **Step 3: Compare Chinese and English as factual twins**

For every rewritten project and note, compare identifiers, quantities, constraints, links, verification state, emotional beat, and final paragraph. English may be calmer but must not omit limitations or add success.

- [ ] **Step 4: Produce the 15-note old-title → new-title ledger**

Run the following from the repository root and preserve the output for the final handoff:

```powershell
@'
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";

const baseline = "dc386bb408f0dff217f5f05cd3091cf0c636178d";
const files = [
  "content/notes/arduino-digital-clock-counter-course-note.mdx",
  "content/notes/tianjin-metro-environment-monitoring-stm32.mdx",
  "content/notes/tianjin-rail-control-pid-atc-reading.mdx",
  "content/notes/tianjin-stm32-environment-setup.mdx",
  "content/notes/tianjin-stm32-gpio-exti-timer.mdx",
  "content/notes/tianjin-stm32-pwm-uart-adc.mdx",
  "content/notes/turing-three-week-development-log.mdx",
  "content/notes/juanyun-acunit-board.mdx",
  "content/notes/juanyun-acunit-firmware.mdx",
  "content/notes/juanyun-acunit-hardware-revision-archive.mdx",
  "content/notes/juanyun-baseunit-firmware.mdx",
  "content/notes/juanyun-dht11-am2302-board.mdx",
  "content/notes/juanyun-legacy-actuator-archive.mdx",
  "content/notes/juanyun-diy-cooling.mdx",
  "content/notes/juanyun-foc-driver.mdx"
];

for (const file of files) {
  const before = matter(execFileSync("git", ["show", `${baseline}:${file}`], { encoding: "utf8" })).data;
  const after = matter(fs.readFileSync(file, "utf8")).data;
  console.log(`${file}\n  ZH: ${before.titleZh} -> ${after.titleZh}\n  EN: ${before.title} -> ${after.title}`);
}
'@ | node --input-type=module
```

Expected: exactly 15 bilingual mappings, one per AI-composed note.

- [ ] **Step 5: Apply and commit semantic-review corrections when present**

After each fix, rerun `npm.cmd run validate-content` and `npm.cmd run validate-encoding`. If the semantic review changes files after their family commits, stage only those files and commit:

```powershell
git commit -m "docs(content): reconcile portfolio rewrite semantics"
```

If no files change, do not create an empty commit.

### Task 12: Enforce Field-Level and Protected-File Invariants

**Files:**
- Verify: every project/note frontmatter file
- Verify: `content/media.json`
- Verify: protected MDX and `public/uploads/`

- [ ] **Step 1: Check the seven protected Git blobs and public asset tree**

Run:

```powershell
git diff --exit-code dc386bb408f0dff217f5f05cd3091cf0c636178d -- content/projects/arduino-smart-car-line-tracker.mdx content/notes/arduino-smart-car-line-tracking-learning-note.mdx content/notes/juanyun-hardware-sop.mdx content/notes/turing-cmake-build-logic.mdx content/notes/turing-qt-seamly2d-first-run.mdx content/notes/turing-release-packaging-cross-platform.mdx content/notes/turing-sm2d-xml-data-format.mdx
git diff --exit-code dc386bb408f0dff217f5f05cd3091cf0c636178d -- public/uploads
```

Expected: both commands exit 0 with no output.

- [ ] **Step 2: Compare immutable frontmatter and media fields programmatically**

Run:

```powershell
@'
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import matter from "gray-matter";

const baseline = "dc386bb408f0dff217f5f05cd3091cf0c636178d";
const projectFiles = fs.readdirSync("content/projects").filter((name) => name.endsWith(".mdx")).map((name) => `content/projects/${name}`);
const noteFiles = fs.readdirSync("content/notes").filter((name) => name.endsWith(".mdx")).map((name) => `content/notes/${name}`);
const protectedFiles = new Set([
  "content/projects/arduino-smart-car-line-tracker.mdx",
  "content/notes/arduino-smart-car-line-tracking-learning-note.mdx",
  "content/notes/juanyun-hardware-sop.mdx",
  "content/notes/turing-cmake-build-logic.mdx",
  "content/notes/turing-qt-seamly2d-first-run.mdx",
  "content/notes/turing-release-packaging-cross-platform.mdx",
  "content/notes/turing-sm2d-xml-data-format.mdx"
]);

function baselineText(file) {
  return execFileSync("git", ["show", `${baseline}:${file}`], { encoding: "utf8" });
}

function withoutKeys(value, keys) {
  return Object.fromEntries(Object.entries(value).filter(([key]) => !keys.has(key)));
}

function assertEqual(label, before, after) {
  if (JSON.stringify(before) !== JSON.stringify(after)) {
    throw new Error(`${label} changed outside the approved rewrite fields`);
  }
}

for (const file of projectFiles) {
  const before = matter(baselineText(file)).data;
  const after = matter(fs.readFileSync(file, "utf8")).data;
  const mutable = protectedFiles.has(file) ? new Set() : new Set(["summary", "summaryZh"]);
  assertEqual(file, withoutKeys(before, mutable), withoutKeys(after, mutable));
}

for (const file of noteFiles) {
  const before = matter(baselineText(file)).data;
  const after = matter(fs.readFileSync(file, "utf8")).data;
  const mutable = protectedFiles.has(file) ? new Set() : new Set(["title", "titleZh", "summary", "summaryZh"]);
  assertEqual(file, withoutKeys(before, mutable), withoutKeys(after, mutable));
}

const beforeMedia = JSON.parse(baselineText("content/media.json"));
const afterMedia = JSON.parse(fs.readFileSync("content/media.json", "utf8"));
if (beforeMedia.length !== 73 || afterMedia.length !== 73) {
  throw new Error(`media count changed: ${beforeMedia.length} -> ${afterMedia.length}`);
}
const mutableMediaKeys = new Set(["title", "titleZh", "caption", "captionZh"]);
for (let index = 0; index < beforeMedia.length; index += 1) {
  if (beforeMedia[index].id !== afterMedia[index].id) {
    throw new Error(`media order changed at index ${index}`);
  }
  assertEqual(`content/media.json:${beforeMedia[index].id}`, withoutKeys(beforeMedia[index], mutableMediaKeys), withoutKeys(afterMedia[index], mutableMediaKeys));
}

console.log("Rewrite-scope invariants passed.");
'@ | node --input-type=module
```

Expected: `Rewrite-scope invariants passed.`

- [ ] **Step 3: Inspect the complete branch file list**

Run:

```powershell
git diff --name-status dc386bb408f0dff217f5f05cd3091cf0c636178d
```

Expected: only the planning docs, approved static-copy files, 7 rewritten project files, 15 rewritten note files, and `content/media.json`; no source asset, dependency, lockfile, protected MDX, or unrelated file.

### Task 13: Run the Complete Local Verification Suite

**Files:**
- Verify the complete branch

- [ ] **Step 1: Stop any development server using this worktree**

Identify the exact process by command line and stop only that PID. Do not run `next build` while the worktree's dev server is writing `.next/`.

- [ ] **Step 2: Run all repository checks from a clean working tree**

Run:

```powershell
git diff --check
npm.cmd run lint
npm.cmd run validate-content
npm.cmd run validate-encoding
npm.cmd run typecheck
npm.cmd run build
npm.cmd audit --omit=dev
```

Expected:

- `git diff --check`: no whitespace errors.
- `lint`: exit 0.
- `validate-content`: `Content validation passed: 8 projects, 21 notes, 73 media items.`
- `validate-encoding`: exit 0 with every Git-managed text file valid UTF-8.
- `typecheck`: exit 0.
- `build`: exit 0 and 36 routes generated.
- `audit`: 0 vulnerabilities.

- [ ] **Step 3: Confirm there are no uncommitted verification or package changes**

Run:

```powershell
git status --short --branch
```

Expected: clean branch. If `package-lock.json` or another file changed unexpectedly, investigate rather than staging it.

### Task 14: Verify All Public Routes and Browser Behavior

**Files:**
- Write ignored screenshots under: `test-results/portfolio-rewrite/`
- Verify: all public routes

- [ ] **Step 1: Load the installed browser CLI's version-matched core guide**

Run:

```powershell
agent-browser skills get core --full
agent-browser --version
```

Expected: core guide loads and version reports `agent-browser 0.33.2` or a newer compatible version.

- [ ] **Step 2: Start the built production server on an isolated port**

Run from the worktree and record the returned PID:

```powershell
Start-Process -FilePath 'npm.cmd' -ArgumentList 'run','start','--','--hostname','127.0.0.1','--port','3001' -WorkingDirectory (Get-Location) -WindowStyle Hidden -PassThru
```

Expected: the process remains running and `http://127.0.0.1:3001` becomes reachable.

- [ ] **Step 3: Smoke-test every public route for HTTP 200**

Run:

```powershell
$routes = @('/', '/work', '/notes', '/media', '/about')
$routes += Get-ChildItem -LiteralPath 'content\projects' -Filter '*.mdx' | ForEach-Object { "/work/$($_.BaseName)" }
$routes += Get-ChildItem -LiteralPath 'content\notes' -Filter '*.mdx' | ForEach-Object { "/notes/$($_.BaseName)" }
foreach ($route in $routes) {
  $response = Invoke-WebRequest -UseBasicParsing -Uri "http://127.0.0.1:3001$route"
  if ($response.StatusCode -ne 200) { throw "$route returned $($response.StatusCode)" }
  "$($response.StatusCode)`t$route"
}
```

Expected: 34 public routes return HTTP 200.

- [ ] **Step 4: Create the screenshot directory and open a named browser session**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'test-results\portfolio-rewrite'
agent-browser --session portfolio-rewrite open http://127.0.0.1:3001
```

Expected: homepage opens without a browser error.

- [ ] **Step 5: Review the five static pages in both languages and viewports**

Run the complete static-page matrix:

```powershell
$staticRoutes = @('/', '/about', '/work', '/notes', '/media')
$viewports = @(
  @{ Name = 'desktop'; Width = 1440; Height = 1000 },
  @{ Name = 'mobile'; Width = 390; Height = 844 }
)
$languages = @('en', 'zh')

foreach ($route in $staticRoutes) {
  $routeName = if ($route -eq '/') { 'home' } else { $route.Trim('/').Replace('/', '-') }
  foreach ($viewport in $viewports) {
    agent-browser --session portfolio-rewrite set viewport $viewport.Width $viewport.Height
    foreach ($language in $languages) {
      agent-browser --session portfolio-rewrite open "http://127.0.0.1:3001$route"
      agent-browser --session portfolio-rewrite eval "localStorage.setItem('portfolio-language','$language')"
      agent-browser --session portfolio-rewrite reload
      agent-browser --session portfolio-rewrite wait 300
      agent-browser --session portfolio-rewrite snapshot -c -d 3
      $expectedLang = if ($language -eq 'en') { 'en' } else { 'zh-CN' }
      agent-browser --session portfolio-rewrite eval "if(document.documentElement.dataset.lang!=='$language'||document.documentElement.lang!=='$expectedLang'||document.documentElement.scrollWidth>document.documentElement.clientWidth){throw new Error('language or overflow assertion failed')} JSON.stringify({lang:document.documentElement.lang,dataLang:document.documentElement.dataset.lang,overflow:false})"
      agent-browser --session portfolio-rewrite screenshot "test-results/portfolio-rewrite/local-$routeName-$language-$($viewport.Name).png" --full
    }
  }
}
```

Expected: `overflow` is `false`; English reports `en`; Chinese reports `zh-CN`; the current language persists after route navigation and reload.

- [ ] **Step 6: Screenshot one project and one note per family**

Use desktop English and mobile Chinese for these representative pairs:

| Family | Project route | Note route |
| --- | --- | --- |
| Digital Clock | `/work/arduino-digital-clock-counter` | `/notes/arduino-digital-clock-counter-course-note` |
| Tianjin | `/work/tianjin-metro-stm32-foundation` | `/notes/tianjin-metro-environment-monitoring-stm32` |
| Nanjing | `/work/nanjing-turing-qt-embedded-learning` | `/notes/turing-three-week-development-log` |
| Juanyun thermal | `/work/juanyun-thermal-hardware` | `/notes/juanyun-acunit-board` |
| DIY cooling | `/work/juanyun-diy-cooling-prototype` | `/notes/juanyun-diy-cooling` |
| FOC | `/work/juanyun-foc-driver-board` | `/notes/juanyun-foc-driver` |
| Claude Chime | `/work/claude-chime-hardware-power-board` | no note exists |
| Smart Car regression | `/work/arduino-smart-car-line-tracker` | `/notes/arduino-smart-car-line-tracking-learning-note` |

Run:

```powershell
$representativeRoutes = @(
  '/work/arduino-digital-clock-counter',
  '/notes/arduino-digital-clock-counter-course-note',
  '/work/tianjin-metro-stm32-foundation',
  '/notes/tianjin-metro-environment-monitoring-stm32',
  '/work/nanjing-turing-qt-embedded-learning',
  '/notes/turing-three-week-development-log',
  '/work/juanyun-thermal-hardware',
  '/notes/juanyun-acunit-board',
  '/work/juanyun-diy-cooling-prototype',
  '/notes/juanyun-diy-cooling',
  '/work/juanyun-foc-driver-board',
  '/notes/juanyun-foc-driver',
  '/work/claude-chime-hardware-power-board',
  '/work/arduino-smart-car-line-tracker',
  '/notes/arduino-smart-car-line-tracking-learning-note'
)
$representativeModes = @(
  @{ Name = 'desktop-en'; Width = 1440; Height = 1000; Language = 'en'; HtmlLang = 'en' },
  @{ Name = 'mobile-zh'; Width = 390; Height = 844; Language = 'zh'; HtmlLang = 'zh-CN' }
)

foreach ($route in $representativeRoutes) {
  $routeName = $route.Trim('/').Replace('/', '-')
  foreach ($mode in $representativeModes) {
    agent-browser --session portfolio-rewrite set viewport $mode.Width $mode.Height
    agent-browser --session portfolio-rewrite open "http://127.0.0.1:3001$route"
    agent-browser --session portfolio-rewrite eval "localStorage.setItem('portfolio-language','$($mode.Language)')"
    agent-browser --session portfolio-rewrite reload
    agent-browser --session portfolio-rewrite wait 300
    agent-browser --session portfolio-rewrite snapshot -c -d 4
    agent-browser --session portfolio-rewrite eval "if(document.documentElement.dataset.lang!=='$($mode.Language)'||document.documentElement.lang!=='$($mode.HtmlLang)'||document.documentElement.scrollWidth>document.documentElement.clientWidth){throw new Error('representative-route assertion failed')} if([...document.images].some((image)=>!image.complete||image.naturalWidth===0)){throw new Error('broken image detected')} true"
    agent-browser --session portfolio-rewrite screenshot "test-results/portfolio-rewrite/local-$routeName-$($mode.Name).png" --full
  }
}
```

Expected: headings and summaries fit, English/Chinese bodies are non-empty, media and file browsers load, primary links work, and no horizontal overflow appears.

- [ ] **Step 7: Regress the long protected notes**

Open and inspect:

- `/notes/turing-cmake-build-logic`
- `/notes/turing-release-packaging-cross-platform`
- `/notes/juanyun-hardware-sop`

Run:

```powershell
$longProtectedRoutes = @(
  '/notes/turing-cmake-build-logic',
  '/notes/turing-release-packaging-cross-platform',
  '/notes/juanyun-hardware-sop'
)
foreach ($route in $longProtectedRoutes) {
  $routeName = $route.Trim('/').Replace('/', '-')
  agent-browser --session portfolio-rewrite set viewport 1440 1000
  foreach ($language in @('en', 'zh')) {
    agent-browser --session portfolio-rewrite open "http://127.0.0.1:3001$route"
    agent-browser --session portfolio-rewrite eval "localStorage.setItem('portfolio-language','$language')"
    agent-browser --session portfolio-rewrite reload
    agent-browser --session portfolio-rewrite wait 300
    agent-browser --session portfolio-rewrite snapshot -c -d 4
    agent-browser --session portfolio-rewrite eval "if(document.querySelector('main').innerText.trim().length<500||document.documentElement.scrollWidth>document.documentElement.clientWidth){throw new Error('protected-note render assertion failed')} true"
    agent-browser --session portfolio-rewrite screenshot "test-results/portfolio-rewrite/local-$routeName-$language-desktop.png" --full
  }
}
```

Expected: long content renders, internal structures remain readable, and language switching does not produce empty bodies or layout overflow.

- [ ] **Step 8: Check browser console, page errors, links, and accessibility**

Run on the homepage, one rewritten project, one rewritten note, the media page, and one protected long note:

```powershell
$diagnosticRoutes = @(
  '/',
  '/work/juanyun-thermal-hardware',
  '/notes/tianjin-metro-environment-monitoring-stm32',
  '/media',
  '/notes/turing-cmake-build-logic'
)
foreach ($route in $diagnosticRoutes) {
  agent-browser --session portfolio-rewrite console --clear
  agent-browser --session portfolio-rewrite errors --clear
  agent-browser --session portfolio-rewrite open "http://127.0.0.1:3001$route"
  agent-browser --session portfolio-rewrite wait 300
  agent-browser --session portfolio-rewrite console
  agent-browser --session portfolio-rewrite errors
  agent-browser --session portfolio-rewrite a11y --tags wcag2a,wcag2aa
}
```

Expected: no console/page errors caused by the rewrite, no broken primary links/images, and no new serious/critical accessibility violations.

- [ ] **Step 9: Close the browser and stop the exact production-server PID**

Run:

```powershell
agent-browser --session portfolio-rewrite close
$serverConnection = Get-NetTCPConnection -LocalPort 3001 -State Listen | Select-Object -First 1
$serverProcess = Get-CimInstance Win32_Process -Filter "ProcessId = $($serverConnection.OwningProcess)"
$serverProcess | Select-Object ProcessId, CommandLine
if ($serverProcess.CommandLine -notmatch 'next.+start.+3001') { throw 'Port 3001 is not owned by the expected Next.js production server.' }
Stop-Process -Id $serverProcess.ProcessId
```

Expected: the command line is inspected before termination and only the Next.js server listening on port 3001 is stopped.

### Task 15: Push, Create the Draft PR, Verify Vercel Preview, and Hand Off

**Files:**
- No source edits expected

- [ ] **Step 1: Confirm clean history and remote base**

Run:

```powershell
git status --short --branch
git fetch origin
git merge-base --is-ancestor origin/main HEAD
git log --oneline --decorate origin/main..HEAD
```

Expected: working tree is clean, `origin/main` is an ancestor, and commits are family-scoped Conventional Commits.

- [ ] **Step 2: Push the complete topic branch and verify the remote SHA**

Run:

```powershell
git push
git rev-list --left-right --count origin/agent/rewrite-ai-authored-portfolio-copy...HEAD
git ls-remote --heads origin agent/rewrite-ai-authored-portfolio-copy
git rev-parse HEAD
```

Expected: divergence is `0 0` and the remote SHA equals local `HEAD`.

- [ ] **Step 3: Create or update a draft pull request to `main`**

First inspect:

```powershell
gh pr view agent/rewrite-ai-authored-portfolio-copy --json number,url,isDraft,state
```

If no PR exists, run:

```powershell
$prBody = @"
## Summary

- updates the public identity to an XJTLU Communication Engineering graduate and current NTU MAE MSc (Robotics and Intelligent Systems) student, led by robotic-systems-hardware work
- removes public email and location while retaining GitHub
- rewrites 7 project pages and 15 AI-composed notes with the repo-local Engineering Writing Skill
- rewrites all 73 media title/caption records without changing media order or asset paths
- preserves 7 protected MDX files and the complete public/uploads tree

## Validation

- npm.cmd run lint
- npm.cmd run validate-content (8 projects, 21 notes, 73 media)
- npm.cmd run validate-encoding
- npm.cmd run typecheck
- npm.cmd run build (36 routes)
- npm.cmd audit --omit=dev (0 vulnerabilities)
- local HTTP and agent-browser desktop/mobile, English/Chinese matrix

## Review gate

This PR remains draft. Do not merge until the Vercel Preview has been reviewed and the user explicitly authorizes release.
"@
gh pr create --draft --base main --head agent/rewrite-ai-authored-portfolio-copy --title "docs(content): rewrite portfolio engineering prose" --body $prBody
```

Expected: one open draft PR targeting `main`; do not merge it.

- [ ] **Step 4: Wait for Vercel/GitHub checks**

Run:

```powershell
gh pr checks --watch --interval 10
gh pr checks --json name,state,bucket,link
$prNumber = gh pr view agent/rewrite-ai-authored-portfolio-copy --json number --jq '.number'
$comments = gh api "repos/Awes0meE/Awes0meE.github.io/issues/$prNumber/comments" | ConvertFrom-Json
$commentText = ($comments | ForEach-Object { $_.body }) -join "`n"
$previewMatches = [regex]::Matches($commentText, 'https://[A-Za-z0-9.-]+\.vercel\.app(?:/[A-Za-z0-9._~:/?#\[\]@!$&''()*+,;=%-]*)?')
$previewMatches | ForEach-Object { $_.Value } | Select-Object -Unique
```

Expected: required checks, including Vercel Preview, complete successfully. Use the unique `vercel.app` deployment URL printed from the Vercel bot comment; if the comment contains no deployment URL, open the Vercel check link from `gh pr checks` and copy the deployment's Visit URL.

- [ ] **Step 5: Re-run the browser smoke matrix against Vercel Preview**

Use the deployment URL from Step 4 as `$previewUrl`, create `test-results/portfolio-rewrite/preview/`, and open it in a new `portfolio-rewrite-preview` agent-browser session. Repeat the exact static, representative, protected-note, error, overflow, image, link, and metadata checks from Task 14 with `$previewUrl` replacing `http://127.0.0.1:3001` and preview-specific screenshot paths.

Expected: preview matches local verified behavior and introduces no preview-only route, image, or metadata failure.

- [ ] **Step 6: Deliver the review handoff without merging**

Provide:

- branch name and final SHA;
- draft PR and Vercel Preview links;
- identity/privacy outcome;
- project/note/media counts;
- all 15 old-title → new-title pairs;
- protected-file and public-asset proof;
- local/browser/Vercel verification results;
- any explicitly unresolved factual limitation.

Stop before merge. `main` changes only after the user reviews the preview and explicitly authorizes release.
