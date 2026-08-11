# Cross-Device Portfolio Rewrite Handoff Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the active one-project-at-a-time portfolio rewrite safely resumable from either Windows or macOS through the same GitHub topic branch.

**Architecture:** GitHub is the source of truth for repository state, while one tracked active-work document is the source of truth for the current interview and next action. Both devices use `agent/rewrite-ai-authored-portfolio-copy` sequentially: the outgoing device commits and pushes, and the incoming device fast-forward pulls before writing.

**Tech Stack:** Git, GitHub, Markdown, Node.js 22+, npm 10+, Codex Skills

---

## File Structure

- Create `docs/active-work/portfolio-copy-rewrite.md`: current rewrite rules,
  DIY cooling evidence summary, Q1-Q8 interview frontier, and next action.
- Modify `AGENTS.md`: add one early pointer to the active-work handoff without
  expanding the general bootstrap guide.
- Modify `docs/environment-toolchain.md`: add macOS clone/update, validation,
  skill-install, and relay commands.
- Modify `docs/agent-skills.md`: register `grill-me` and `grilling` as external
  workflow dependencies while keeping `engineering-note-writer` repo-local.
- Modify `docs/superpowers/specs/2026-08-11-cross-device-portfolio-rewrite-handoff-design.md`:
  mark the written design as approved after user review.

### Task 1: Create the Active Rewrite Handoff

**Files:**
- Create: `docs/active-work/portfolio-copy-rewrite.md`
- Test: PowerShell repository assertions

- [ ] **Step 1: Run the RED assertions**

Run from the repository root:

```powershell
$handoff = 'docs/active-work/portfolio-copy-rewrite.md'
if (Test-Path -LiteralPath $handoff) { throw "Expected $handoff to be absent before implementation" }
```

Expected: PASS because the handoff does not exist at baseline
`b77fa571dec1b4c4c4453cbdcf697107684c5e7e`.

- [ ] **Step 2: Create the active-work document**

Write `docs/active-work/portfolio-copy-rewrite.md` with these exact sections
and facts:

```markdown
# Active Work: One-Project-at-a-Time Portfolio Copy Rewrite

**Updated:** 2026-08-11
**Branch:** `agent/rewrite-ai-authored-portfolio-copy`
**Starting checkpoint:** `b77fa571dec1b4c4c4453cbdcf697107684c5e7e`
**Current project:** `DIY 压风式散热器原型`
**State:** Interviewing; do not draft or edit portfolio prose yet

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

## DIY Cooling Evidence Already Inspected

- `desktop-form1.cs` uses LibreHardwareMonitor, refreshes every 5 seconds,
  alternates cached `CPU{F1}` and `GPU{F1}` serial messages, and opens the
  selected port at 115200 baud. The send task and monitor task are launched
  separately, so their ordering is not guaranteed.
- `esp32-platformio-main.cpp` and `esp32-arduino-pwm-control.ino` are
  byte-identical. They expose `ESP32_Bluetooth`, drive GPIO 5 at an initial
  15 kHz/8-bit PWM configuration, read five buttons, and render an SSD1306
  OLED.
- The ESP32 program keeps CPU/GPU maxima for a 30-second window and uses the
  larger maximum for Quiet, Normal, High Speed, or Manual control. The source
  alone does not explain why those time constants or scale factors were chosen.
- The 237.077-second public video visibly demonstrates Bluetooth discovery,
  the Windows temperature/COM utility, a laser-cut acrylic and foam prototype,
  OLED temperature values, and button-driven mode changes. It is not a
  controlled thermal-performance test.
- The 2024 schematic/PDF and EasyEDA project describe an ESP32-based board with
  two fan outputs, five buttons, OLED, 12 V input, and a 12 V-to-3.3 V module.
- The later STM32 schematic identifies an STM32F103C8T6 module, CH340N USB-UART,
  two fan outputs, five buttons, OLED, Bluetooth header, Type-C, and 12 V-to-5 V
  conversion. The render/schematic do not by themselves prove fabrication or
  bring-up.
- The Bambu Studio archive contains nine plates and split parts such as left/
  right upper and lower bodies, covers, and riser feet for an A1 mini. The
  screenshots compare support/brim arrangements; they do not establish the
  mechanical iteration order or print outcome.
- The parts workbook describes a 10 cm fan automatic-speed acrylic/wood-cut
  configuration plus sealing foam and control parts. Its provenance and its
  relationship to the user's final build still need the user's explanation.
- No uploaded artifact provides a controlled before/after temperature curve,
  airflow, pressure, noise, power, or thermal-equilibrium measurement.

## Current `grill-me` Frontier

1. What concrete cooling problem or experience caused the project to begin?
2. In the user's own engineering model, what does “压风式” mean, and what role
   does the foam seal play?
3. Which physical/electronic version is the completed main story, and how do
   the ESP32 PCB, A1 mini print split, and STM32 design relate to it?
4. Why did the user read internal CPU/GPU temperatures on Windows and send them
   to the controller instead of using an external temperature sensor?
5. Why were 5-second desktop updates and a 30-second maximum-temperature window
   chosen?
6. What thermal effect was actually observed, under what load or comparison,
   and which results were only subjective?
7. Which mechanical, airflow, Bluetooth, sensing, PWM, noise, assembly, or
   printing problem consumed the most effort, and how was the initial judgment
   corrected?
8. What was the first moment when the user felt the prototype had genuinely
   come alive?

The full conversational wording and recommended answer directions remain in
the current Codex chat. On another device, ask these eight questions in this
order and let the user answer by voice without forcing polished prose.

## Next Action

Collect the user's Q1-Q8 voice answers. Organize them into motivations,
decisions, failures, observations, reactions, and remaining uncertainty. Then
recompute the `grill-me` frontier. Do not write the project page, learning note,
summary, title, or media captions yet.

## Updating This File

Replace stale current-state sections at each device handoff; do not append an
endless transcript. Keep durable writing rules and confirmed decisions. Never
commit credentials, private email addresses, private locations, tokens, or
machine-specific absolute paths.
```

- [ ] **Step 3: Run the GREEN assertions**

```powershell
$handoff = 'docs/active-work/portfolio-copy-rewrite.md'
$text = Get-Content -Raw -Encoding UTF8 $handoff
foreach ($required in @(
  'DIY 压风式散热器原型',
  'Arduino Smart Car',
  'grill-me',
  'engineering-note-writer',
  'Current `grill-me` Frontier',
  'Do not write the project page'
)) {
  if (-not $text.Contains($required)) { throw "Missing handoff text: $required" }
}
if (([regex]::Matches($text, '(?m)^\d+\. ')).Count -ne 8) {
  throw 'Expected exactly eight frontier questions'
}
```

Expected: PASS with all required context and exactly eight interview questions.

### Task 2: Connect New Devices to the Handoff

**Files:**
- Modify: `AGENTS.md`
- Modify: `docs/environment-toolchain.md`
- Modify: `docs/agent-skills.md`
- Modify: `docs/superpowers/specs/2026-08-11-cross-device-portfolio-rewrite-handoff-design.md`
- Test: PowerShell repository assertions

- [ ] **Step 1: Run the RED scans**

```powershell
rg -n "docs/active-work/portfolio-copy-rewrite.md" AGENTS.md
rg -n "macOS Relay Setup" docs/environment-toolchain.md
rg -n "mattpocock/skills|grill-me" docs/agent-skills.md
rg -n "Approved in conversation and after written-spec review" docs/superpowers/specs/2026-08-11-cross-device-portfolio-rewrite-handoff-design.md
```

Expected: each command returns no match at baseline.

- [ ] **Step 2: Add the AGENTS.md pointer**

In the numbered cross-device bootstrap list, after reading `CODEX.md`, add:

```markdown
   - if `docs/active-work/portfolio-copy-rewrite.md` exists, read it before
     resuming the active rewrite;
```

Keep the remaining entry instructions unchanged.

- [ ] **Step 3: Add the macOS relay section**

Add this section after `## First Machine Check` in
`docs/environment-toolchain.md`:

````markdown
## macOS Relay Setup

The active portfolio rewrite uses a single-device-at-a-time relay on
`agent/rewrite-ai-authored-portfolio-copy`. The outgoing device must commit and
push before the incoming device starts.

For a fresh Mac checkout:

```bash
git clone https://github.com/Awes0meE/Awes0meE.github.io.git XJTLU_Portfolio
cd XJTLU_Portfolio
git fetch --prune origin
git switch --track origin/agent/rewrite-ai-authored-portfolio-copy
```

For an existing checkout:

```bash
git status --short --branch
git fetch --prune origin
git switch agent/rewrite-ai-authored-portfolio-copy
git pull --ff-only origin agent/rewrite-ai-authored-portfolio-copy
```

Stop if `git status --short` reports local changes. Inspect and preserve them
before pulling; do not reset or overwrite them.

Use Node.js 22 or newer and npm 10 or newer, then restore and verify the local
environment:

```bash
node --version
npm --version
npm install
npm run lint
npm run validate-encoding
npm run typecheck
```

Install the interview skills globally for Codex on the Mac:

```bash
npx skills@latest add mattpocock/skills -g -a codex -s grill-me grilling -y
```

The portfolio writer is repository-local at
`skills/engineering-note-writer/SKILL.md`; it arrives with the clone. Do not
substitute a similarly named global writing skill.

Before resuming, read `AGENTS.md`, `CODEX.md`, and
`docs/active-work/portfolio-copy-rewrite.md`. Confirm the branch is clean, then
continue from the handoff file's `Next Action` section.
````

- [ ] **Step 4: Register the external interview skills**

Add this section to `docs/agent-skills.md` after the repo-local writer:

````markdown
## grill-me and grilling

Source:

- `https://github.com/mattpocock/skills`

Global Codex install:

```bash
npx skills@latest add mattpocock/skills -g -a codex -s grill-me grilling -y
```

Purpose:

- Interview the user before each remaining portfolio project is rewritten.
- Work through the current decision frontier in numbered rounds rather than
  asking every possible follow-up at once.
- Turn disordered voice answers into shared understanding before invoking the
  repository-local `engineering-note-writer`.
- Keep factual inspection as the agent's responsibility and reserve personal
  motivations, decisions, reactions, and remembered observations for the user.

These skills are machine-global and do not travel with the Git clone. Install
them separately on each device; the active interview state travels through
`docs/active-work/portfolio-copy-rewrite.md`.
````

- [ ] **Step 5: Mark the written design approved**

In
`docs/superpowers/specs/2026-08-11-cross-device-portfolio-rewrite-handoff-design.md`,
replace:

```markdown
**Status:** Approved in conversation; awaiting written-spec review
```

with:

```markdown
**Status:** Approved in conversation and after written-spec review
```

- [ ] **Step 6: Run the GREEN scans**

```powershell
$agents = Get-Content -Raw -Encoding UTF8 AGENTS.md
$envDoc = Get-Content -Raw -Encoding UTF8 docs/environment-toolchain.md
$skills = Get-Content -Raw -Encoding UTF8 docs/agent-skills.md
$design = Get-Content -Raw -Encoding UTF8 docs/superpowers/specs/2026-08-11-cross-device-portfolio-rewrite-handoff-design.md
if (-not $agents.Contains('docs/active-work/portfolio-copy-rewrite.md')) { throw 'Missing AGENTS pointer' }
if (-not $envDoc.Contains('## macOS Relay Setup')) { throw 'Missing macOS relay section' }
if (-not $envDoc.Contains('git pull --ff-only origin agent/rewrite-ai-authored-portfolio-copy')) { throw 'Missing relay pull command' }
if (-not $skills.Contains('## grill-me and grilling')) { throw 'Missing skill registry section' }
if (-not $design.Contains('Approved in conversation and after written-spec review')) { throw 'Design status is stale' }
```

Expected: PASS.

### Task 3: Verify and Publish the Collaboration Checkpoint

**Files:**
- Verify: all implementation files
- Protect: `content/**/*.mdx`, `content/media.json`, `public/uploads/**`

- [ ] **Step 1: Verify scope and formatting**

```powershell
git diff --check b77fa571dec1b4c4c4453cbdcf697107684c5e7e
git diff --name-only b77fa571dec1b4c4c4453cbdcf697107684c5e7e
```

Expected changed files:

```text
AGENTS.md
docs/active-work/portfolio-copy-rewrite.md
docs/agent-skills.md
docs/environment-toolchain.md
docs/superpowers/plans/2026-08-11-cross-device-portfolio-rewrite-handoff.md
docs/superpowers/specs/2026-08-11-cross-device-portfolio-rewrite-handoff-design.md
```

- [ ] **Step 2: Scan the handoff for secrets and machine-local paths**

```powershell
rg -n "ghp_|github_pat_|sk-|@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|[A-Za-z]:\\\\" docs/active-work/portfolio-copy-rewrite.md
```

Expected: no matches.

- [ ] **Step 3: Protect portfolio content and uploads**

```powershell
$protected = git diff --name-only b77fa571dec1b4c4c4453cbdcf697107684c5e7e -- content public/uploads
if ($protected) { throw "Unexpected protected-content changes:`n$protected" }
```

Expected: PASS with no protected-content changes.

- [ ] **Step 4: Run repository documentation-adjacent validators**

```powershell
npm.cmd run validate-content
npm.cmd run validate-encoding
```

Expected: both commands exit 0.

- [ ] **Step 5: Commit the implementation checkpoint**

```powershell
git add -- AGENTS.md docs/active-work/portfolio-copy-rewrite.md docs/agent-skills.md docs/environment-toolchain.md docs/superpowers/specs/2026-08-11-cross-device-portfolio-rewrite-handoff-design.md
git commit -m "docs(collab): add cross-device rewrite handoff"
```

Expected: one documentation commit containing only the five planned files.

- [ ] **Step 6: Push and verify synchronization**

```powershell
git push origin agent/rewrite-ai-authored-portfolio-copy
git fetch origin
$local = git rev-parse HEAD
$remote = git rev-parse origin/agent/rewrite-ai-authored-portfolio-copy
if ($local -ne $remote) { throw "Local/remote mismatch: $local != $remote" }
git status --short --branch
```

Expected: local and remote commits match and the worktree is clean.
