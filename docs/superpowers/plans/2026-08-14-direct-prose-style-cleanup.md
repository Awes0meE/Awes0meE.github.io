# Direct Prose Style Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove decorative Chinese corner quotes and bare negative-first binary reframes from five bilingual project families, then make the same preference a tested rule in the repository-local engineering writer.

**Architecture:** Update the writer's runtime hard gate before touching content, then treat each project family as an independent red-green prose checkpoint. Every candidate is classified semantically so direct assertions replace rhetorical reframes while factual negation, evidence limits, protected titles, and bilingual parity remain intact.

**Tech Stack:** UTF-8 MDX, JSON media metadata, Markdown skill instructions and regression cases, PowerShell 5.1, Git, npm, Next.js 16.3.

---

## File Map

### Writer runtime and regression

- Modify: `skills/engineering-note-writer/SKILL.md`
- Modify: `skills/engineering-note-writer/references/reader-prose-hard-gates.md`
- Modify: `skills/engineering-note-writer/references/voice-rules.md`
- Modify: `skills/engineering-note-writer/references/bilingual-writing.md`
- Modify: `skills/engineering-note-writer/references/self-review.md`
- Modify: `skills/engineering-note-writer/references/style-examples.md`
- Modify: `skills/engineering-note-writer/tests/rubric.md`
- Create: `skills/engineering-note-writer/tests/direct-prose-regression.md`
- Preserve unchanged: `skills/engineering-note-writer/tests/inputs/**`
- Preserve unchanged: `skills/engineering-note-writer/tests/baseline-outputs/**`
- Preserve unchanged: `skills/engineering-note-writer/tests/revised-outputs/**`
- Preserve unchanged: `skills/engineering-note-writer/tests/comparison.md`
- Preserve unchanged: `skills/engineering-note-writer/tests/provenance.md`

### Five project families

- Modify: the 14 MDX files named in Tasks 3–7.
- Modify: `content/media.json` only when a scoped media value contains an
  applicable bare binary reframe.
- Preserve: all metadata, assets, links, code, dates, tags, covers, and public
  uploads outside a reader-visible sentence that directly violates the new
  rule.

## Shared Semantic Rules

Use these rules in every task:

1. Rewrite every `「」` occurrence in scoped reader copy through normal syntax.
   Do not replace it with another quotation style.
2. Reject bare binary corrections such as `不是 A，而是 B`, `这不是 A，这是
   B`, `问题不在 A，而在 B`, `难点不是 A，而是 B`, `not A but B`, and
   `was not A; it was B`.
3. Preserve `不是说 A 不行，而是说 B` when it genuinely prevents a false
   reading. It is an explicit user-approved exception, not a general regex
   escape.
4. Preserve factual negation. Prefer the order `supported fact -> missing scope`
   when an evidence boundary currently begins with a negation.
5. Repair Chinese first, then adapt English around the same information move.
6. Keep the Smart Car project title `Arduino 循迹小车焊接与控制实训`
   byte-for-byte unchanged.

Use these candidate scans. Raw hits require semantic classification.

```powershell
$cornerPattern = '「|」'
$zhBinaryPattern = '不是.{0,100}(而是|这是)|这不是.{0,100}(而是|这是)|(问题|难点|重点|关键)不(在|是).{0,100}(而在|而是)|与其说.{0,100}不如说|不再是.{0,100}(而|开始|变成)'
$enBinaryPattern = '(?i)\bnot\b.{0,120}\bbut\b|\bwasn.t\b.{0,120}\bit was\b|\bisn.t\b.{0,120}\bit is\b|\brather than\b|\bno longer\b.{0,120}\b(became|started|began)\b'
```

The accepted Chinese qualifier may appear in raw output:

```text
不是说 A 不行，而是说 B
```

Classify it as allowed only when A is a real interpretation worth protecting.

### Task 1: Reconfirm The Baseline And Protection Guards

**Files:**
- Read: `docs/superpowers/specs/2026-08-14-direct-prose-style-design.md`
- Read: all files listed in Tasks 2–7
- Read: `content/media.json`

- [ ] **Step 1: Verify branch and clean starting state**

Run:

```powershell
git status --short --branch
git branch --show-current
git log -4 --oneline
```

Expected: branch `docs/rewrite-pre-pr20-projects`, clean worktree, and design
commits `bda17ce` plus `b76974a` at the tip history.

- [ ] **Step 2: Recreate the exact content target list**

```powershell
$allContentFiles = @(
  'content/projects/arduino-digital-clock-counter.mdx',
  'content/notes/arduino-digital-clock-counter-course-note.mdx',
  'content/projects/arduino-smart-car-line-tracker.mdx',
  'content/notes/arduino-smart-car-line-tracking-learning-note.mdx',
  'content/projects/juanyun-diy-cooling-prototype.mdx',
  'content/notes/juanyun-diy-cooling.mdx',
  'content/projects/tianjin-metro-stm32-foundation.mdx',
  'content/notes/tianjin-metro-environment-monitoring-stm32.mdx',
  'content/notes/tianjin-rail-control-pid-atc-reading.mdx',
  'content/notes/tianjin-stm32-environment-setup.mdx',
  'content/notes/tianjin-stm32-gpio-exti-timer.mdx',
  'content/notes/tianjin-stm32-pwm-uart-adc.mdx',
  'content/projects/nanjing-turing-qt-embedded-learning.mdx',
  'content/notes/turing-three-week-development-log.mdx'
)
```

Expected: `$allContentFiles.Count` is `14`.

- [ ] **Step 3: Run the failing corner-quote baseline**

```powershell
$cornerCount = 0
foreach ($file in $allContentFiles) {
  $text = Get-Content -Raw -Encoding UTF8 $file
  $cornerCount += ([regex]::Matches($text, $cornerPattern)).Count
}
'CORNER_CHARACTERS={0}' -f $cornerCount
```

Expected: `CORNER_CHARACTERS=120`, representing 60 pairs.

- [ ] **Step 4: Record protected paths**

```powershell
$protectedPaths = @(
  'content/projects/juanyun-foc-driver-board.mdx',
  'content/notes/juanyun-foc-driver.mdx',
  'content/projects/claude-chime-hardware-power-board.mdx',
  'content/notes/claude-chime-cold-start-battery-protection.mdx',
  'content/projects/juanyun-thermal-hardware.mdx',
  'content/notes/juanyun-acunit-automatic-control.mdx',
  'content/notes/juanyun-acunit-board.mdx',
  'content/notes/juanyun-acunit-firmware.mdx',
  'content/notes/juanyun-acunit-hardware-revision-archive.mdx',
  'content/notes/juanyun-dht11-am2302-board.mdx',
  'content/notes/juanyun-baseunit-firmware.mdx',
  'content/notes/juanyun-hardware-sop.mdx',
  'content/notes/juanyun-legacy-actuator-archive.mdx',
  'content/notes/juanyun-production-line-control-panel.mdx',
  'content/notes/turing-cmake-build-logic.mdx',
  'content/notes/turing-qt-seamly2d-first-run.mdx',
  'content/notes/turing-release-packaging-cross-platform.mdx',
  'content/notes/turing-sm2d-xml-data-format.mdx'
)
git diff --quiet main...HEAD -- $protectedPaths
```

Expected: exit code `0`.

### Task 2: Make Direct Assertion A Writer Release Rule

**Files:**
- Modify: `skills/engineering-note-writer/SKILL.md`
- Modify: `skills/engineering-note-writer/references/reader-prose-hard-gates.md`
- Modify: `skills/engineering-note-writer/references/voice-rules.md`
- Modify: `skills/engineering-note-writer/references/bilingual-writing.md`
- Modify: `skills/engineering-note-writer/references/self-review.md`
- Modify: `skills/engineering-note-writer/references/style-examples.md`
- Modify: `skills/engineering-note-writer/tests/rubric.md`
- Create: `skills/engineering-note-writer/tests/direct-prose-regression.md`

- [ ] **Step 1: Run the failing runtime-guidance scan**

```powershell
rg -n -S 'use `「」`|我说「理论上」|下一次再看到「|habitual `不是\.\.\.而是\.\.\.`' `
  skills/engineering-note-writer/SKILL.md `
  skills/engineering-note-writer/references `
  skills/engineering-note-writer/tests/rubric.md
```

Expected: hits in `reader-prose-hard-gates.md`, `voice-rules.md`, and
`style-examples.md`.

- [ ] **Step 2: Update the runtime rule hierarchy**

Use `apply_patch` to make these exact behavioral changes:

```markdown
# SKILL.md, Non-Negotiables
- Prefer direct assertions over bare negative-first binary reframes. Preserve
  ordinary factual negation and the confirmed conversational qualifier
  `不是说……不行，而是说……` when it protects real nuance.

# reader-prose-hard-gates.md, L1-2
- straight, curly, full-width, or corner quotation marks, `"`, `“”`, `＂`, or
  `「」` -> recast the sentence, use no marks, or use inline code for an exact
  technical token.

# reader-prose-hard-gates.md, L1-3
Reject bare negative-first binary reframes such as `不是 A，而是 B`, `这不是
A，这是 B`, `问题不在 A，而在 B`, `难点不是 A，而是 B`, `not A but B`,
and `was not A; it was B`. State the useful conclusion directly. Ordinary
factual negation remains available. The confirmed qualifier
`不是说 A 不行，而是说 B` remains available when it prevents a real
misreading and is not used as a repeated scaffold.
```

Also make these local repairs:

- `voice-rules.md`: keep `不是说……不行，而是说……`; change
  `我说「理论上」是因为我自己还没完全跑通` to
  `我说理论上，是因为我自己还没完全跑通`; replace the habitual-reframe
  smell paragraph with the bare-binary distinction.
- `bilingual-writing.md`: require direct English assertion instead of literal
  `not A but B`, while keeping fact limits.
- `self-review.md`: add separate checks for corner quotes, bare binary
  reframes, the accepted qualifier, and fact-boundary order.
- `style-examples.md`: change `下一次再看到「开发机上能跑」` to
  `下一次再看到开发机上能跑的结果`.
- `tests/rubric.md`: extend G4 with the same direct-assertion behavior and note
  that frozen Trials 01–11 are historical evidence rather than current-rule
  fixtures.

- [ ] **Step 3: Add the current-rule regression case**

Create `skills/engineering-note-writer/tests/direct-prose-regression.md` with
this complete content:

```markdown
# Direct Prose Current-Rule Regression

Use this case to review the active runtime after 2026-08-14. It does not alter
or supersede the frozen Trials 01–11.

## Rejected Chinese Binary Reframe

Input:

`屏幕显示的不是风扇转速，而是占空比。`

Expected repair:

`屏幕显示的是占空比命令，代码没有测量风扇转速。`

## Accepted Chinese Conversational Qualifier

Allowed when the first idea needs genuine protection:

`不是说固定比例不行，而是说我当时还没有定义清楚控制目标。`

## Accepted Chinese Factual Boundary

`这次测试确认程序能在干净的 Windows 机器上启动。测试发生在实习以后，不计入公司正式验收。`

## Rejected English Binary Reframe

Input:

`The screen did not show fan speed; it showed duty cycle.`

Expected repair:

`The screen showed a duty command. The code did not measure fan speed.`

## Release Expectation

- Reader prose contains no `「」`.
- Bare binary reframes are repaired in both languages.
- The confirmed Chinese qualifier remains available when it carries real nuance.
- Missing tests, implementations, evidence, authorship, and publication limits
  remain explicit.
```

- [ ] **Step 4: Verify the writer rule**

Run:

```powershell
rg -n -S 'use `「」`|我说「理论上」|下一次再看到「|habitual `不是\.\.\.而是\.\.\.`' `
  skills/engineering-note-writer/SKILL.md `
  skills/engineering-note-writer/references `
  skills/engineering-note-writer/tests/rubric.md

py -3.12 -X utf8 `
  'C:\Users\123\.codex\skills\.system\skill-creator\scripts\quick_validate.py' `
  'skills\engineering-note-writer'

git diff --check
```

Expected: the conflict scan returns no hits; skill validation succeeds; diff
check returns exit code `0`. Manually confirm that the approved qualifier still
appears in `voice-rules.md`, the hard gate, and the regression case.

- [ ] **Step 5: Commit the writer checkpoint**

```powershell
git add -- `
  skills/engineering-note-writer/SKILL.md `
  skills/engineering-note-writer/references/reader-prose-hard-gates.md `
  skills/engineering-note-writer/references/voice-rules.md `
  skills/engineering-note-writer/references/bilingual-writing.md `
  skills/engineering-note-writer/references/self-review.md `
  skills/engineering-note-writer/references/style-examples.md `
  skills/engineering-note-writer/tests/rubric.md `
  skills/engineering-note-writer/tests/direct-prose-regression.md
git commit -m "refactor(skill): prefer direct prose assertions"
```

### Task 3: Repair Digital Clock Prose

**Files:**
- Modify: `content/projects/arduino-digital-clock-counter.mdx`
- Modify: `content/notes/arduino-digital-clock-counter-course-note.mdx`
- Audit only: Digital Clock records in `content/media.json`

- [ ] **Step 1: Run the family red scan**

```powershell
$files = @(
  'content/projects/arduino-digital-clock-counter.mdx',
  'content/notes/arduino-digital-clock-counter-course-note.mdx'
)
rg -n -S $cornerPattern $files
rg -n -i -S "$zhBinaryPattern|$enBinaryPattern" $files
```

Expected: 8 corner-quote pairs and binary-reframe candidates.

- [ ] **Step 2: Rewrite the project page directly**

Use `apply_patch` around the existing lines that discuss the assignment,
display diagnosis, assessment variants, and incomplete early understanding.
Implement these information moves in both languages:

- Replace the labelled assignment phrase with a direct description of writing
  the counter program.
- State that the seven-segment display first overturned the software-only
  explanation.
- State directly that the two assessment versions were flashed and verified
  separately after changing the threshold.
- State that the early mental map was still being assembled from slides, CSDN,
  and breadboard tests.
- Integrate the idea that flashing the program did not finish the task without
  using corner quotes or a bare reframe.

- [ ] **Step 3: Rewrite the learning note directly**

Use `apply_patch` to implement these paired repairs:

- Open with the observed behavior: the code counted while the display alternated
  between darkness and nonsense.
- Rename the BCD heading to `The Current Path Beyond Four BCD Bits / 四个 BCD
  bit 之外，还有电流路径`.
- State the verified pause/reset result before noting that the missing final
  source leaves the debounce algorithm unknown.
- State that the slide provides a model and the bench part determines the real
  current path.
- End the debugging advice directly: identify the part and measure conduction
  before editing code.
- Integrate all six remaining corner-quoted ideas into normal syntax.

- [ ] **Step 4: Verify and commit Digital Clock**

```powershell
rg -n -S $cornerPattern $files
rg -n -i -S "$zhBinaryPattern|$enBinaryPattern" $files
npm.cmd run validate-content
npm.cmd run validate-encoding
git diff --check
git diff -- $files
git add -- $files
git commit -m "docs(content): use direct Digital Clock prose"
```

Expected: zero corner hits; zero applicable binary reframes after semantic
classification; validators and diff check pass. Digital Clock media stays
unchanged because its negation records evidence and identity boundaries.

### Task 4: Repair Smart Car Prose

**Files:**
- Modify: `content/projects/arduino-smart-car-line-tracker.mdx`
- Modify: `content/notes/arduino-smart-car-line-tracking-learning-note.mdx`
- Audit only: Smart Car records in `content/media.json`

- [ ] **Step 1: Run the family red scan**

```powershell
$files = @(
  'content/projects/arduino-smart-car-line-tracker.mdx',
  'content/notes/arduino-smart-car-line-tracking-learning-note.mdx'
)
rg -n -S $cornerPattern $files
rg -n -i -S "$zhBinaryPattern|$enBinaryPattern" $files
```

Expected: 18 corner-quote pairs and binary-reframe candidates.

- [ ] **Step 2: Rewrite the project page directly**

Use `apply_patch` while preserving the protected project title. Make these
paired moves:

- Open with the bare purple PCB, bags of parts, manual, and test programs.
- State that correct soldering required more detail than expected.
- Rename the signal-chain heading to `Reading the Purple PCB as a Signal Chain /
  把紫色 PCB 读成一条信号链`.
- State that the manual's functional blocks made the populated board readable.
- State directly that the power path controls whether downstream blocks behave
  sensibly.
- Explain left turning through the sensor position and two motor commands.
- Integrate every use of the labelled ideas for tracking, correctness, power,
  seeing, digital signals, turning, and speed into normal syntax.

- [ ] **Step 3: Rewrite the learning note directly**

Use `apply_patch` to make these paired repairs:

- State that the Nano was one future part of a board that still needed the
  remaining components and interfaces.
- Rename the power heading to `LM7805 Put Power Into Circuit Terms / LM7805
  把电源拆成稳压与滤波`.
- Put the CP1/CM3/CM4 damage warning first, then note that the report lacks a
  complete single-failure story.
- State that fourteen required inputs exceed the Nano's thirteen digital I/O
  pins.
- State that each motor integer directly controls wheel acceleration, slowdown,
  or reversal.
- State that a whole-car first test exposes too many failure points at once.
- Turn line departure into a traceable chain from wheel motion back to the
  soldered component.
- Integrate the remaining nine labelled phrases into normal syntax.

- [ ] **Step 4: Verify protected title, family gate, and commit**

```powershell
$protectedTitle = git show main:content/projects/arduino-smart-car-line-tracker.mdx |
  Select-String -SimpleMatch 'titleZh:'
$currentTitle = Get-Content -Encoding UTF8 `
  content/projects/arduino-smart-car-line-tracker.mdx |
  Select-String -SimpleMatch 'titleZh:'
$protectedTitle.Line
$currentTitle.Line

rg -n -S $cornerPattern $files
rg -n -i -S "$zhBinaryPattern|$enBinaryPattern" $files
npm.cmd run validate-content
npm.cmd run validate-encoding
git diff --check
git add -- $files
git commit -m "docs(content): use direct Smart Car prose"
```

Expected: identical protected title lines, zero corner hits, zero applicable
binary reframes, and passing validators. Smart Car media stays unchanged because
its negative statements are evidence boundaries.

### Task 5: Repair DIY Cooling Prose

**Files:**
- Modify: `content/projects/juanyun-diy-cooling-prototype.mdx`
- Modify: `content/notes/juanyun-diy-cooling.mdx`
- Audit only: DIY Cooling records in `content/media.json`

- [ ] **Step 1: Run the family red scan**

```powershell
$files = @(
  'content/projects/juanyun-diy-cooling-prototype.mdx',
  'content/notes/juanyun-diy-cooling.mdx'
)
rg -n -S $cornerPattern $files
rg -n -i -S "$zhBinaryPattern|$enBinaryPattern" $files
```

Expected: 5 corner-quote pairs and direct-assertion candidates.

- [ ] **Step 2: Rewrite the project page directly**

Use `apply_patch` across the Connect, control, PID, enclosure, STM32, and result
paragraphs. Preserve every factual boundary. Required information moves:

- Begin the payoff with the first click on **Connect**.
- Describe the controlled chain directly, without labelling it as a controlled
  system.
- State that undefined control target, sensor identity, actuator response, and
  thermal curve left PID with nothing reliable to tune.
- State the surviving fixed-ratio behavior before its limitations.
- State the STM32 hardware improvement first, then note that the complete
  Windows chain was not restored on that board.
- State that temperature and frame-rate changes are personal memories and were
  not captured as a controlled benchmark.

- [ ] **Step 3: Rewrite the learning note directly**

Use `apply_patch` to make these paired repairs:

- State that the OLED shows a duty command and the code does not measure RPM.
- Describe command and measurement as separate data roles without corner marks.
- State the desired sensor-selection behavior directly before explaining the
  current desktop implementation.
- State that the two asynchronous tasks can send the previous sample.
- Describe the 30-second peak-hold behavior directly.
- Keep the fixed-ratio accomplishment and then state that PID work began before
  the controlled state had been defined.
- Preserve every missing-sensor, missing-log, timing, and measurement boundary.

- [ ] **Step 4: Verify and commit DIY Cooling**

```powershell
rg -n -S $cornerPattern $files
rg -n -i -S "$zhBinaryPattern|$enBinaryPattern" $files
npm.cmd run validate-content
npm.cmd run validate-encoding
git diff --check
git add -- $files
git commit -m "docs(content): use direct DIY cooling prose"
```

Expected: zero corner hits; zero applicable bare reframes; personal observations
remain explicitly outside controlled benchmark evidence. DIY media stays
unchanged.

### Task 6: Repair Tianjin STM32 Prose And Two Media Captions

**Files:**
- Modify: `content/projects/tianjin-metro-stm32-foundation.mdx`
- Modify: `content/notes/tianjin-metro-environment-monitoring-stm32.mdx`
- Modify: `content/notes/tianjin-rail-control-pid-atc-reading.mdx`
- Modify: `content/notes/tianjin-stm32-environment-setup.mdx`
- Modify: `content/notes/tianjin-stm32-gpio-exti-timer.mdx`
- Modify: `content/notes/tianjin-stm32-pwm-uart-adc.mdx`
- Modify: `content/media.json` only for `stm32f103c8t6-pinout` and
  `tianjin-rail-transit-cover`

- [ ] **Step 1: Run the family red scan**

```powershell
$files = @(
  'content/projects/tianjin-metro-stm32-foundation.mdx',
  'content/notes/tianjin-metro-environment-monitoring-stm32.mdx',
  'content/notes/tianjin-rail-control-pid-atc-reading.mdx',
  'content/notes/tianjin-stm32-environment-setup.mdx',
  'content/notes/tianjin-stm32-gpio-exti-timer.mdx',
  'content/notes/tianjin-stm32-pwm-uart-adc.mdx'
)
rg -n -S $cornerPattern $files
rg -n -i -S "$zhBinaryPattern|$enBinaryPattern" $files
```

Expected: 15 corner-quote pairs and direct-assertion candidates across all six
MDX files.

- [ ] **Step 2: Rewrite the Tianjin project page**

Use `apply_patch` to state these ideas directly in both languages:

- The first obstacle was the Keil device pack, compiler, library path, target
  address, and download configuration.
- GPIO, EXTI, Timer, PWM, UART, ADC, I2C, and the final superloop each changed
  the level of reasoning without using binary rhetorical turns.
- The hardware-I2C BUSY lock remains a present-day hypothesis; missing register
  state, waveform, and exact pins prevent a confirmed root cause.
- The 16 measured points are feedforward calibration data, not lux metrology;
  state the measured relationship before listing missing repeats, error bars,
  and temperature drift.
- The application logic and integration work are personal contributions; the
  peripheral drivers came from the standard library and public examples.
- Integrate all fifteen labelled phrases into ordinary clauses.

- [ ] **Step 3: Rewrite the five Tianjin learning notes**

Use `apply_patch` and these file-specific outcomes:

- `tianjin-stm32-environment-setup.mdx`: describe the Keil toolchain as a
  concrete chain; integrate all five labelled phrases; state the bring-up order
  first and the missing logs/waveforms afterward.
- `tianjin-stm32-gpio-exti-timer.mdx`: state the observed polling, EXTI,
  direction, and timer relationships directly; remove binary heading and
  paragraph turns without weakening contact-bounce or retained-code limits.
- `tianjin-stm32-pwm-uart-adc.mdx`: keep positive-first headings when they are
  direct; rewrite all negative-first turns; state the measured 16-point table
  before the theoretical-curve limit; state low-frequency-demo usefulness
  before the metrology limit; keep UART behavior uncertainty explicit.
- `tianjin-metro-environment-monitoring-stm32.mdx`: state that the final demo's
  core task was sharing one MCU, one `main()`, and finite update time; describe
  flags and slow tasks directly; state the confirmed flag structure before the
  missing interrupt/timing evidence; state contribution boundaries directly.
- `tianjin-rail-control-pid-atc-reading.mdx`: state how PID concepts mapped onto
  MCU peripherals; then record that the internship included no PID
  implementation, tuning, or step response; rename binary headings; describe
  ATP, ATO, and ATS as system-scale concepts with their safety and lifecycle
  requirements.

- [ ] **Step 4: Rewrite exactly two Tianjin media records**

Use `apply_patch` in `content/media.json`:

- `stm32f103c8t6-pinout`: state that GPIO, USART, ADC, and Timer became real
  pins whose ports, channels, and remap relationships had to be checked.
- `tianjin-rail-transit-cover`: state that the image frames the internship as
  foundational MCU/control learning and does not claim production rail-control
  implementation, with the supported description first.

Do not change the other Tianjin media records.

- [ ] **Step 5: Verify media scope, family gate, and commit**

```powershell
rg -n -S $cornerPattern $files
rg -n -i -S "$zhBinaryPattern|$enBinaryPattern" $files

$baseMedia = (git show HEAD:content/media.json | Out-String) | ConvertFrom-Json
$currentMedia = Get-Content -Raw -Encoding UTF8 content/media.json | ConvertFrom-Json
$baseById = @{}
foreach ($item in $baseMedia) { $baseById[$item.id] = $item }
$changedIds = @()
foreach ($item in $currentMedia) {
  if (($baseById[$item.id] | ConvertTo-Json -Depth 20 -Compress) -ne
      ($item | ConvertTo-Json -Depth 20 -Compress)) {
    $changedIds += $item.id
  }
}
$changedIds

npm.cmd run validate-content
npm.cmd run validate-encoding
git diff --check
git add -- $files content/media.json
git commit -m "docs(content): use direct Tianjin STM32 prose"
```

Expected: changed media IDs are exactly `stm32f103c8t6-pinout` and
`tianjin-rail-transit-cover`; all gates pass.

### Task 7: Repair Nanjing Turing Prose

**Files:**
- Modify: `content/projects/nanjing-turing-qt-embedded-learning.mdx`
- Modify: `content/notes/turing-three-week-development-log.mdx`
- Audit only: Nanjing Turing records in `content/media.json`
- Preserve unchanged: four Nanjing source-document notes

- [ ] **Step 1: Run the family red scan**

```powershell
$files = @(
  'content/projects/nanjing-turing-qt-embedded-learning.mdx',
  'content/notes/turing-three-week-development-log.mdx'
)
rg -n -S $cornerPattern $files
rg -n -i -S "$zhBinaryPattern|$enBinaryPattern" $files
```

Expected: 14 corner-quote pairs and direct-assertion candidates.

- [ ] **Step 2: Rewrite the Nanjing project page**

Use `apply_patch` to implement these paired outcomes:

- State that Qt 5 compatibility exceeded the task and led to installing Qt
  6.5.3 with the matching toolchain.
- Describe operating system, architecture, and compiler as one configuration
  coordinate set.
- State directly what branches identify in a changing repository.
- Describe the input-behavior failures before the role state machine.
- Put public excerpts/log evidence first and the unpublished full-source limit
  afterward.
- State that installed `windeployqt` remained invisible to the Release build.
- Separate macOS runtime collection from platform trust in two direct claims.
- State the clean-machine verification result before its post-internship and
  non-acceptance boundary.
- End by listing the location, identity, and verification questions attached to
  a green run button.
- Integrate all six corner-quoted concepts into normal syntax.

- [ ] **Step 3: Rewrite the three-week learning note**

Use `apply_patch` to implement these paired outcomes:

- State that version, compiler, and architecture form one binary agreement.
- State that Enter triggered Cancel and input failures could block the entry
  before permission logic ran.
- State that `QSettings` provides local persistence; remote accounts require a
  different architecture.
- Rename the administrator heading to `Role Rules Became Guarded State
  Transitions / 管理员权限落在一组受限状态转换上`.
- State what the interface exposes and what transitions the code must guard.
- State public excerpt/log evidence before the unpublished-source limit.
- Describe the remembered three-day frustration without a binary memory turn.
- State that both Windows settings and the build process environment must carry
  the tool path.
- Rename the clean-machine heading to `A Clean Windows Machine Supplied the
  Missing Test / 干净 Windows 机器补上换机验证`.
- State the clean-machine result before the formal-acceptance limit.
- State the remaining Developer ID, signing, notarization, and platform checks
  directly.
- State the large-codebase achievement before the still-entry-level Qt limit.
- End with the green triangle at the start of the longer verification chain.
- Integrate all eight corner-quoted concepts into normal syntax.

- [ ] **Step 4: Verify artifact guard and commit**

```powershell
$artifactNotes = @(
  'content/notes/turing-cmake-build-logic.mdx',
  'content/notes/turing-qt-seamly2d-first-run.mdx',
  'content/notes/turing-release-packaging-cross-platform.mdx',
  'content/notes/turing-sm2d-xml-data-format.mdx'
)

rg -n -S $cornerPattern $files
rg -n -i -S "$zhBinaryPattern|$enBinaryPattern" $files
git diff --quiet main...HEAD -- $artifactNotes
npm.cmd run validate-content
npm.cmd run validate-encoding
git diff --check
git add -- $files
git commit -m "docs(content): use direct Nanjing Turing prose"
```

Expected: zero corner hits, zero applicable bare reframes, artifact guard exit
code `0`, and unchanged Nanjing media because its negative sentences are author
and asset-origin boundaries.

### Task 8: Run Full Release Verification And Restore Preview

**Files:**
- Verify: all files changed on `docs/rewrite-pre-pr20-projects`
- Read: design and implementation plan

- [ ] **Step 1: Run the combined content audit**

Recreate `$allContentFiles` and the shared patterns from Task 1, then run:

```powershell
$cornerHits = @(rg -n -S $cornerPattern $allContentFiles)
$zhCandidates = @(rg -n -S $zhBinaryPattern $allContentFiles)
$enCandidates = @(rg -n -i -S $enBinaryPattern $allContentFiles)
'CORNER_HITS={0}' -f $cornerHits.Count
'ZH_BINARY_CANDIDATES={0}' -f $zhCandidates.Count
'EN_BINARY_CANDIDATES={0}' -f $enCandidates.Count
$zhCandidates
$enCandidates
```

Expected: `CORNER_HITS=0`. Manually classify every remaining binary candidate;
each must be ordinary factual negation, a positive-first evidence limit, or the
explicitly accepted conversational qualifier. Applicable count must be zero.

- [ ] **Step 2: Audit all 51 selected media records**

```powershell
$media = Get-Content -Raw -Encoding UTF8 content/media.json | ConvertFrom-Json
$slugs = @(
  'arduino-digital-clock-counter',
  'arduino-smart-car-line-tracker',
  'juanyun-diy-cooling-prototype',
  'tianjin-metro-stm32-foundation',
  'nanjing-turing-qt-embedded-learning'
)
$items = @($media | Where-Object { $slugs -contains $_.projectSlug })
$mediaCandidates = @()
foreach ($item in $items) {
  foreach ($field in @('title','titleZh','caption','captionZh')) {
    $value = [string]$item.$field
    if ($value -match $cornerPattern -or $value -match $zhBinaryPattern -or
        $value -match $enBinaryPattern) {
      $mediaCandidates += '{0}|{1}|{2}' -f $item.id, $field, $value
    }
  }
}
'MEDIA_ITEMS={0}' -f $items.Count
$mediaCandidates
```

Expected: `MEDIA_ITEMS=51`; every remaining candidate is an approved factual
boundary. Only the two Tianjin IDs changed during this pass.

- [ ] **Step 3: Verify writer runtime and frozen trials**

```powershell
py -3.12 -X utf8 `
  'C:\Users\123\.codex\skills\.system\skill-creator\scripts\quick_validate.py' `
  'skills\engineering-note-writer'

git diff --quiet main...HEAD -- `
  skills/engineering-note-writer/tests/inputs `
  skills/engineering-note-writer/tests/baseline-outputs `
  skills/engineering-note-writer/tests/revised-outputs `
  skills/engineering-note-writer/tests/comparison.md `
  skills/engineering-note-writer/tests/provenance.md
```

Expected: skill validation passes. The frozen-trial command requires special
interpretation because these files may differ from `main` due to earlier PR20
history; verify instead that Task 2 introduced no new diff in them by comparing
Task 2's parent and current commit when needed:

```powershell
$skillCommit = git log --format='%H' --grep='refactor(skill): prefer direct prose assertions' -1
$skillParent = git rev-parse "$skillCommit^"
git diff --quiet $skillParent $skillCommit -- `
  skills/engineering-note-writer/tests/inputs `
  skills/engineering-note-writer/tests/baseline-outputs `
  skills/engineering-note-writer/tests/revised-outputs `
  skills/engineering-note-writer/tests/comparison.md `
  skills/engineering-note-writer/tests/provenance.md
```

Expected: exit code `0` for the commit-local frozen-trial guard.

- [ ] **Step 4: Verify protected content and repository scope**

```powershell
git diff --quiet main...HEAD -- $protectedPaths
git diff --check main...HEAD
git status --short --branch
git log --oneline main..HEAD
git diff --stat main...HEAD
```

Expected: protected guard and diff check return exit code `0`; worktree is
clean; the log contains the writer checkpoint and five new content checkpoints.

- [ ] **Step 5: Stop the current preview before building**

Resolve the exact listener first:

```powershell
$listenerLine = netstat -ano -p tcp |
  Select-String -Pattern '^\s*TCP\s+127\.0\.0\.1:3000\s+.*LISTENING\s+\d+\s*$' |
  Select-Object -First 1
if ($listenerLine) {
  $previewPid = [int](($listenerLine.Line.Trim() -split '\s+')[-1])
  Get-CimInstance Win32_Process -Filter "ProcessId=$previewPid" |
    Select-Object ProcessId, Name, CommandLine
  Stop-Process -Id $previewPid -Force
}
```

Expected: only the verified `next start` listener on port 3000 is stopped.

- [ ] **Step 6: Run fresh repository verification sequentially**

```powershell
npm.cmd run lint
npm.cmd run validate-content
npm.cmd run validate-encoding
npm.cmd run typecheck
npm.cmd run build
```

Expected: all commands exit `0`; content remains 8 projects, 24 notes, and 78
media items; the production build generates 39 static pages.

- [ ] **Step 7: Restart the local production preview**

Use a hidden direct process launch so the preview remains available after the
verification shell returns:

```powershell
$startInfo = New-Object System.Diagnostics.ProcessStartInfo
$startInfo.FileName = "$env:SystemRoot\System32\cmd.exe"
$startInfo.Arguments = '/d /s /c "npm.cmd run start"'
$startInfo.WorkingDirectory = (Get-Location).Path
$startInfo.UseShellExecute = $true
$startInfo.WindowStyle = [System.Diagnostics.ProcessWindowStyle]::Hidden
[System.Diagnostics.Process]::Start($startInfo) | Out-Null

$previewUrl = 'http://127.0.0.1:3000/work/arduino-smart-car-line-tracker'
$ready = $false
for ($attempt = 0; $attempt -lt 30; $attempt++) {
  Start-Sleep -Milliseconds 500
  try {
    $response = Invoke-WebRequest -UseBasicParsing -Uri $previewUrl -TimeoutSec 2
    if ($response.StatusCode -eq 200) { $ready = $true; break }
  } catch {}
}
if (-not $ready) { throw 'Local preview did not become ready.' }
```

Expected: the Smart Car preview returns HTTP `200`.

- [ ] **Step 8: Inspect representative pages in both languages and viewports**

Use the in-app browser and keep the final Smart Car page open as a deliverable.
Inspect at minimum:

```text
/work/arduino-digital-clock-counter
/notes/arduino-smart-car-line-tracking-learning-note
/work/juanyun-diy-cooling-prototype
/notes/tianjin-metro-environment-monitoring-stm32
/work/nanjing-turing-qt-embedded-learning
/notes/turing-three-week-development-log
```

For desktop English, desktop Chinese, and a mobile viewport, verify:

```text
meaningful visible h1 and body
no 404 or Next.js error overlay
no horizontal overflow
no browser console errors
language toggle changes visible prose
```

Expected: all checks pass. Leave
`http://127.0.0.1:3000/work/arduino-smart-car-line-tracker` open for user review.

- [ ] **Step 9: Prepare the handoff**

```powershell
git status --short --branch
git log --oneline main..HEAD
git diff --stat main...HEAD
```

Expected: clean local branch. Do not push or merge until the user reviews the
new preview and grants the next action.
