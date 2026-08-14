# Pre-PR20 Project Prose L1 Cleanup Implementation Plan

**Execution status:** Completed and merged through pull request #23 on
2026-08-15 at `c89b3b0df031cc2cacfd519c95fb2de522c0b54d`. The checkboxes below are
the preserved implementation scaffold, not an active task list.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the pull request #20 reader-prose L1 rules and local style polish to five older project families without changing their facts, structure, metadata, or assets.

**Architecture:** Treat each project family as an independent red-green prose checkpoint. Run the scoped wording and punctuation audit first, repair only applicable reader-facing prose and related media values, verify bilingual and evidence parity, then commit that family before moving to the next one.

**Tech Stack:** UTF-8 MDX, JSON media metadata, PowerShell 5.1, Git, npm, Next.js 16.3.

---

## Common L1 Audit Rules

Use these patterns for every task. Raw punctuation results must be scoped manually
according to `skills/engineering-note-writer/references/reader-prose-hard-gates.md`.
Frontmatter, Markdown syntax, URLs, code, paths, logs, verbatim artifacts, and
exact technical strings do not count as reader-prose hits.

```powershell
$wordPattern = '说白了|意味着什么|这意味着|本质上|换句话说|不可否认|综上所述|总的来说|值得注意的是|不难发现|让我们来看看|接下来让我们|这是一篇|本文将|下面介绍|这篇笔记整理了|AI工具|某个模型|to put it simply|what does this mean|this means|essentially|in essence|in other words|it is undeniable|in summary|overall|it is worth noting|it is easy to see|let us take a look|next, let us|this article will|this note records|在当今.*时代|在当今.*背景下|随着.*发展|随着技术的不断进步|in today.s rapidly changing era|in today.s landscape|with the continued development of'
$punctuationPattern = '[：:“”＂—]|——|:'
```

Load these read-only helpers into the current PowerShell process before every
family audit:

```powershell
function Invoke-MdxL1Audit([string[]]$Files) {
  rg -n -i -S $wordPattern $Files
  rg -n -S $punctuationPattern $Files
}

function Invoke-MediaL1Audit([string]$Slug) {
  $media = Get-Content -Encoding UTF8 'content/media.json' -Raw | ConvertFrom-Json
  $items = @($media | Where-Object { $_.projectSlug -eq $Slug })
  foreach ($item in $items) {
    foreach ($field in @('title', 'titleZh', 'caption', 'captionZh')) {
      $value = $item.$field
      if ($value -and ($value -match $wordPattern -or $value -match $punctuationPattern)) {
        '{0}|{1}|{2}' -f $item.id, $field, $value
      }
    }
  }
}
```

Expected after each task: no applicable banned wording or punctuation remains in
the scoped MDX reader prose or selected media values. The audit may still print
excluded technical syntax; every printed line must be classified explicitly.

### Task 1: Establish The Baseline And Scope Guard

**Files:**
- Read: `docs/superpowers/specs/2026-08-14-pre-pr20-l1-prose-cleanup-design.md`
- Read: `skills/engineering-note-writer/references/reader-prose-hard-gates.md`
- Read: `skills/engineering-note-writer/references/self-review.md`
- Read: `skills/engineering-note-writer/references/voice-rules.md`
- Read: `skills/engineering-note-writer/references/bilingual-writing.md`
- Read: all MDX files named in Tasks 2-6
- Read: `content/media.json`

- [ ] **Step 1: Confirm the branch and clean planning checkpoint**

```powershell
git status --short --branch
git log -2 --oneline
```

Expected: branch `docs/rewrite-pre-pr20-projects`; only the committed design and
plan checkpoints differ from `main`; no uncommitted content changes exist.

- [ ] **Step 2: Confirm the exact media family counts**

```powershell
$media = Get-Content -Encoding UTF8 'content/media.json' -Raw | ConvertFrom-Json
foreach ($slug in @(
  'arduino-digital-clock-counter',
  'arduino-smart-car-line-tracker',
  'juanyun-diy-cooling-prototype',
  'tianjin-metro-stm32-foundation',
  'nanjing-turing-qt-embedded-learning'
)) {
  $count = @($media | Where-Object { $_.projectSlug -eq $slug }).Count
  '{0}|{1}' -f $slug, $count
}
```

Expected counts in order: `11`, `12`, `6`, `3`, and `19`.

- [ ] **Step 3: Run the initial banned-wording scan**

```powershell
$allFiles = @(
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
Invoke-MdxL1Audit $allFiles
```

Expected: the baseline fails the future zero-hit gate, including the confirmed
`这意味着` hit in `content/notes/juanyun-diy-cooling.mdx`.

- [ ] **Step 4: Record the protected out-of-scope files**

```powershell
$protectedPaths = @(
  'content/projects/juanyun-foc-driver-board.mdx',
  'content/notes/juanyun-foc-driver.mdx',
  'content/projects/claude-chime-hardware-power-board.mdx',
  'content/notes/claude-chime-cold-start-battery-protection.mdx',
  'content/projects/juanyun-thermal-hardware.mdx',
  'content/notes/turing-cmake-build-logic.mdx',
  'content/notes/turing-qt-seamly2d-first-run.mdx',
  'content/notes/turing-release-packaging-cross-platform.mdx',
  'content/notes/turing-sm2d-xml-data-format.mdx'
)
git diff --quiet main...HEAD -- $protectedPaths
```

Expected: exit code `0`.

### Task 2: Clean Arduino Digital Clock Prose

**Files:**
- Modify: `content/projects/arduino-digital-clock-counter.mdx`
- Modify: `content/notes/arduino-digital-clock-counter-course-note.mdx`
- Modify: `content/media.json` only for `projectSlug: "arduino-digital-clock-counter"`

- [ ] **Step 1: Run the failing family audit**

```powershell
$files = @(
  'content/projects/arduino-digital-clock-counter.mdx',
  'content/notes/arduino-digital-clock-counter-course-note.mdx'
)
Invoke-MdxL1Audit $files
Invoke-MediaL1Audit 'arduino-digital-clock-counter'
```

Expected: applicable decorative colons, dashes, or double quotes are present even
if the banned-word scan is empty.

- [ ] **Step 2: Repair only scoped reader prose**

Use `apply_patch`. Replace canned wording directly, recast decorative colons and
dashes as commas or sentences, and replace narrative double quotes with `「」`,
inline code, or unquoted prose. Polish only the surrounding sentence needed to
make the repair natural. Keep both rollover versions, contribution boundaries,
demo limits, and unresolved switch polarity/debounce unchanged.

- [ ] **Step 3: Verify the family gate and content integrity**

Load the common audit helpers, recreate the exact `$files` array from Step 1,
and run:

```powershell
Invoke-MdxL1Audit $files
Invoke-MediaL1Audit 'arduino-digital-clock-counter'
git diff --check
npm.cmd run validate-content
npm.cmd run validate-encoding
git diff -- content/projects/arduino-digital-clock-counter.mdx content/notes/arduino-digital-clock-counter-course-note.mdx content/media.json
```

Expected: zero applicable L1 hits; both validators pass; only the two MDX files
and the 11 selected media records contain prose changes.

- [ ] **Step 4: Commit the Digital Clock checkpoint**

```powershell
git add content/projects/arduino-digital-clock-counter.mdx content/notes/arduino-digital-clock-counter-course-note.mdx content/media.json
git commit -m "docs(content): clean Digital Clock prose"
```

### Task 3: Clean Arduino Smart Car Prose

**Files:**
- Modify: `content/projects/arduino-smart-car-line-tracker.mdx`
- Modify: `content/notes/arduino-smart-car-line-tracking-learning-note.mdx`
- Modify: `content/media.json` only for `projectSlug: "arduino-smart-car-line-tracker"`

- [ ] **Step 1: Run the failing family audit**

```powershell
$files = @(
  'content/projects/arduino-smart-car-line-tracker.mdx',
  'content/notes/arduino-smart-car-line-tracking-learning-note.mdx'
)
Invoke-MdxL1Audit $files
Invoke-MediaL1Audit 'arduino-smart-car-line-tracker'
```

Expected: applicable punctuation hits occur throughout the two bilingual bodies
and selected media captions.

- [ ] **Step 2: Repair only scoped reader prose**

Use `apply_patch`. Preserve the project Chinese title byte-for-byte, preserve the
approved learning-note title pair, and keep the bare-PCB opening, LM7805,
74HC165, L293, staged tests, battery change, and top-five-percent result intact.
Do not invent a failed solder joint, lap time, or individual team contribution.

- [ ] **Step 3: Verify the family gate and content integrity**

Load the common audit helpers, recreate the exact `$files` array from Step 1,
run `Invoke-MdxL1Audit $files` and
`Invoke-MediaL1Audit 'arduino-smart-car-line-tracker'`, then run
`git diff --check`, `npm.cmd run validate-content`, and
`npm.cmd run validate-encoding`. Inspect the full scoped diff. Expected: zero
applicable L1 hits and no title, metadata, link, or asset change.

- [ ] **Step 4: Commit the Smart Car checkpoint**

```powershell
git add content/projects/arduino-smart-car-line-tracker.mdx content/notes/arduino-smart-car-line-tracking-learning-note.mdx content/media.json
git commit -m "docs(content): clean Smart Car prose"
```

### Task 4: Clean DIY Cooling Prose

**Files:**
- Modify: `content/projects/juanyun-diy-cooling-prototype.mdx`
- Modify: `content/notes/juanyun-diy-cooling.mdx`
- Modify: `content/media.json` only for `projectSlug: "juanyun-diy-cooling-prototype"`

- [ ] **Step 1: Run the failing family audit**

```powershell
$files = @(
  'content/projects/juanyun-diy-cooling-prototype.mdx',
  'content/notes/juanyun-diy-cooling.mdx'
)
Invoke-MdxL1Audit $files
Invoke-MediaL1Audit 'juanyun-diy-cooling-prototype'
```

Expected: the note contains an applicable `这意味着` hit and the family contains
punctuation hits.

- [ ] **Step 2: Repair only scoped reader prose**

Use `apply_patch`. State the OLED timing consequence directly instead of using
`这意味着`, then repair the remaining punctuation and nearby rhythm. Preserve
the CSGO motivation, Windows/Bluetooth/ESP32 chain, abandoned PID attempt,
assembled ESP32 prototype, serial-tested STM32 board, unprinted A1 mini enclosure,
and personal-observation boundary for temperature and frame rate.

- [ ] **Step 3: Verify the family gate and content integrity**

Load the common audit helpers, recreate the exact `$files` array from Step 1,
run `Invoke-MdxL1Audit $files` and
`Invoke-MediaL1Audit 'juanyun-diy-cooling-prototype'`, then run
`git diff --check`, `npm.cmd run validate-content`, and
`npm.cmd run validate-encoding`. Inspect the scoped diff. Expected: zero
applicable hits and no expanded performance claim.

- [ ] **Step 4: Commit the DIY Cooling checkpoint**

```powershell
git add content/projects/juanyun-diy-cooling-prototype.mdx content/notes/juanyun-diy-cooling.mdx content/media.json
git commit -m "docs(content): clean DIY cooling prose"
```

### Task 5: Clean Tianjin STM32 Prose

**Files:**
- Modify: `content/projects/tianjin-metro-stm32-foundation.mdx`
- Modify: `content/notes/tianjin-metro-environment-monitoring-stm32.mdx`
- Modify: `content/notes/tianjin-rail-control-pid-atc-reading.mdx`
- Modify: `content/notes/tianjin-stm32-environment-setup.mdx`
- Modify: `content/notes/tianjin-stm32-gpio-exti-timer.mdx`
- Modify: `content/notes/tianjin-stm32-pwm-uart-adc.mdx`
- Modify: `content/media.json` only for `projectSlug: "tianjin-metro-stm32-foundation"`

- [ ] **Step 1: Run the failing family audit**

```powershell
$files = @(
  'content/projects/tianjin-metro-stm32-foundation.mdx',
  'content/notes/tianjin-metro-environment-monitoring-stm32.mdx',
  'content/notes/tianjin-rail-control-pid-atc-reading.mdx',
  'content/notes/tianjin-stm32-environment-setup.mdx',
  'content/notes/tianjin-stm32-gpio-exti-timer.mdx',
  'content/notes/tianjin-stm32-pwm-uart-adc.mdx'
)
Invoke-MdxL1Audit $files
Invoke-MediaL1Audit 'tianjin-metro-stm32-foundation'
```

Expected: one or more applicable punctuation or canned-structure hits across the
six bodies or three media records.

- [ ] **Step 2: Repair only scoped reader prose**

Use `apply_patch`. Keep the self-directed internship route and exact peripheral
names. Preserve the 16-point mapping as feedforward, hardware-I2C lockup as a
present-day hypothesis, PID and ATP/ATO/ATS as reading-layer concepts, adapted
driver versus personal application-code boundaries, and informal review status.

- [ ] **Step 3: Verify the family gate and content integrity**

Load the common audit helpers, recreate the exact `$files` array from Step 1,
run `Invoke-MdxL1Audit $files` and
`Invoke-MediaL1Audit 'tianjin-metro-stm32-foundation'`, then run
`git diff --check`, `npm.cmd run validate-content`, and
`npm.cmd run validate-encoding`. Inspect all six MDX diffs and the three selected
media records. Expected: zero applicable L1 hits with all uncertainty strengths
unchanged.

- [ ] **Step 4: Commit the Tianjin checkpoint**

```powershell
git add content/projects/tianjin-metro-stm32-foundation.mdx content/notes/tianjin-metro-environment-monitoring-stm32.mdx content/notes/tianjin-rail-control-pid-atc-reading.mdx content/notes/tianjin-stm32-environment-setup.mdx content/notes/tianjin-stm32-gpio-exti-timer.mdx content/notes/tianjin-stm32-pwm-uart-adc.mdx content/media.json
git commit -m "docs(content): clean Tianjin STM32 prose"
```

### Task 6: Clean Nanjing Turing Prose

**Files:**
- Modify: `content/projects/nanjing-turing-qt-embedded-learning.mdx`
- Modify: `content/notes/turing-three-week-development-log.mdx`
- Modify: `content/media.json` only for `projectSlug: "nanjing-turing-qt-embedded-learning"`
- Preserve unchanged: `content/notes/turing-cmake-build-logic.mdx`
- Preserve unchanged: `content/notes/turing-qt-seamly2d-first-run.mdx`
- Preserve unchanged: `content/notes/turing-release-packaging-cross-platform.mdx`
- Preserve unchanged: `content/notes/turing-sm2d-xml-data-format.mdx`

- [ ] **Step 1: Run the failing family audit**

```powershell
$files = @(
  'content/projects/nanjing-turing-qt-embedded-learning.mdx',
  'content/notes/turing-three-week-development-log.mdx'
)
Invoke-MdxL1Audit $files
Invoke-MediaL1Audit 'nanjing-turing-qt-embedded-learning'
```

Expected: applicable punctuation hits occur in the two model-authored bodies and
among the 19 media records.

- [ ] **Step 2: Repair only scoped reader prose**

Use `apply_patch`. Keep local `QSettings` separate from online authentication,
formal development-machine acceptance separate from the later clean Windows
test, macOS bounded at a launched unsigned DMG without signing/notarization, and
post-handoff adoption unknown. Keep exact tool names such as `qmake`,
`windeployqt`, `macdeployqt`, CMake, Ninja, Qt Creator, and DeepSeek.

- [ ] **Step 3: Verify the family gate and artifact-note guard**

Load the common audit helpers, recreate the exact `$files` array from Step 1,
run `Invoke-MdxL1Audit $files` and
`Invoke-MediaL1Audit 'nanjing-turing-qt-embedded-learning'`, then run
`git diff --check`, `npm.cmd run validate-content`,
`npm.cmd run validate-encoding`, and this artifact guard:

```powershell
$artifactNotes = @(
  'content/notes/turing-cmake-build-logic.mdx',
  'content/notes/turing-qt-seamly2d-first-run.mdx',
  'content/notes/turing-release-packaging-cross-platform.mdx',
  'content/notes/turing-sm2d-xml-data-format.mdx'
)
git diff --quiet main...HEAD -- $artifactNotes
```

Expected: zero applicable L1 hits in the scoped prose; the artifact-note guard
exits `0`; all 19 related media values were audited.

- [ ] **Step 4: Commit the Nanjing Turing checkpoint**

```powershell
git add content/projects/nanjing-turing-qt-embedded-learning.mdx content/notes/turing-three-week-development-log.mdx content/media.json
git commit -m "docs(content): clean Nanjing Turing prose"
```

### Task 7: Run Final Scope, Content, And Production Verification

**Files:**
- Verify: all files changed on `docs/rewrite-pre-pr20-projects`
- Read: `docs/superpowers/specs/2026-08-14-pre-pr20-l1-prose-cleanup-design.md`
- Read: `docs/superpowers/plans/2026-08-14-pre-pr20-l1-prose-cleanup.md`

- [ ] **Step 1: Run the combined final L1 audit**

Load the common audit helpers and recreate Task 1's exact `$allFiles` array, then
run:

```powershell
Invoke-MdxL1Audit $allFiles
foreach ($slug in @(
  'arduino-digital-clock-counter',
  'arduino-smart-car-line-tracker',
  'juanyun-diy-cooling-prototype',
  'tianjin-metro-stm32-foundation',
  'nanjing-turing-qt-embedded-learning'
)) {
  Invoke-MediaL1Audit $slug
}
```

Manually classify every raw punctuation result using the hard-gate exclusions.

Expected: zero applicable L1-1, L1-2, or L1-3 hits in model-authored body prose
and all 51 selected media records.

- [ ] **Step 2: Verify branch scope**

```powershell
git diff --check main...HEAD
git diff --name-only main...HEAD
$protectedPaths = @(
  'content/projects/juanyun-foc-driver-board.mdx',
  'content/notes/juanyun-foc-driver.mdx',
  'content/projects/claude-chime-hardware-power-board.mdx',
  'content/notes/claude-chime-cold-start-battery-protection.mdx',
  'content/projects/juanyun-thermal-hardware.mdx',
  'content/notes/turing-cmake-build-logic.mdx',
  'content/notes/turing-qt-seamly2d-first-run.mdx',
  'content/notes/turing-release-packaging-cross-platform.mdx',
  'content/notes/turing-sm2d-xml-data-format.mdx'
)
git diff --quiet main...HEAD -- $protectedPaths
```

Expected: diff check passes; changed paths are limited to the approved spec,
plan, 14 scoped MDX files, and `content/media.json`; the protected-path guard
exits `0`.

- [ ] **Step 3: Run the full repository verification**

```powershell
npm.cmd run lint
npm.cmd run validate-content
npm.cmd run validate-encoding
npm.cmd run typecheck
npm.cmd run build
```

Expected: every command exits `0`; content remains at 8 projects, 24 notes, and
78 media items; the production build completes without route errors.

- [ ] **Step 4: Review representative routes**

Run the production site locally and inspect these route pairs in Chinese and
English at desktop and mobile widths:

```text
/work/arduino-digital-clock-counter
/notes/arduino-digital-clock-counter-course-note
/work/arduino-smart-car-line-tracker
/notes/arduino-smart-car-line-tracking-learning-note
/work/juanyun-diy-cooling-prototype
/notes/juanyun-diy-cooling
/work/tianjin-metro-stm32-foundation
/notes/tianjin-stm32-pwm-uart-adc
/work/nanjing-turing-qt-embedded-learning
/notes/turing-three-week-development-log
/media
```

Expected: meaningful bilingual content, no horizontal overflow, no missing
images, no console errors, and unchanged covers/layout.

- [ ] **Step 5: Prepare the review handoff**

```powershell
git status --short --branch
git log --oneline main..HEAD
git diff --stat main...HEAD
```

Expected: clean branch with one design commit, one plan commit, and five content
checkpoints. Do not merge or push until the user reviews the branch and grants
the next action.
