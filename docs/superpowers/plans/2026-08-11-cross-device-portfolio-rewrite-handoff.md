# Cross-Device Portfolio Rewrite Handoff Implementation Plan

> **Historical status / 历史状态:** Completed and merged through pull request #5, then reconciled during the later cross-device cleanup merged through pull request #7. This document is retained only as a historical implementation record; the branch, interview frontier, and unchecked steps below are not current state or active work.

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

1. **Q1 - 项目最初为什么会出现：** 当时是什么具体问题让你决定自己做散热器？是现成散热底座效果差、笔记本进风不足、游戏时温度高，还是单纯想验证“集中送风”这个想法？请尽量讲一个真实场景。

   **推荐回答方向：** 如果符合事实，从一次明确的不满写起：普通散热底座只是把风吹向机器底部，大量气流从周围漏掉，因此你想做一个能把风集中送到笔记本进风口的结构。

2. **Q2 - “压风式”到底是什么意思：** 在你的理解里，它与普通散热底座最核心的差别是什么？泡棉承担了什么作用？你当时是在追求更高静压、减少漏风、对准进风口，还是几项都有？

   **推荐回答方向：** 把它解释成一个朴素的工程直觉：用泡棉把笔记本底部围成相对封闭的送风空间，减少旁路漏风，迫使风扇送出的空气更集中地经过进风区域；除非确实测过，否则不写成经过验证的空气动力学结论。

3. **Q3 - 哪个版本才是这篇故事的主角：** 实体演示使用亚克力板、泡棉、ESP32、OLED 和五个按键；此外还有 A1 mini 拆件打印方案、ESP32 PCB，以及后来的 STM32 PCB。你心里真正“完成并使用过”的是哪一版？其余版本分别是什么定位？

   **推荐回答方向：** 把实体 ESP32 原型作为主线，因为它有完整演示；3D 打印方案作为机械结构改进，STM32 PCB 如果没有实际焊接运行，就诚实写成后续重构尝试，不把它冒充成已经验证的成品。

4. **Q4 - 温度为什么要经过电脑再传给 ESP32：** 你为什么选择由 Windows 程序读取 CPU/GPU 温度，再通过蓝牙发送，而不是让控制器自己接温度传感器？这个方案当时解决了什么问题，又带来了什么麻烦？

   **推荐回答方向：** 可能的关键判断是电脑内部温度已经可以由 LibreHardwareMonitor 直接读取，没必要再用外置传感器猜测机身温度；代价是系统依赖桌面程序、蓝牙配对和通信状态。必须按用户的真实想法纠正或补充。

5. **Q5 - 五秒与三十秒是怎么定下来的：** 桌面程序每五秒刷新并交替发送 CPU/GPU 温度，ESP32 则在三十秒窗口内保留两者峰值，再据此调 PWM。为什么没有直接使用最新温度？你是为了避免转速频繁跳动、抓住短时峰值，还是这些数字主要来自调试经验？

   **推荐回答方向：** 可以写成对“响应速度”和“风扇来回变速”之间的折中：五秒保证数据不会太陈旧，三十秒峰值窗口让短时高负载不会马上被后一个低读数覆盖，但必须以用户的真实理由为准。

6. **Q6 - 实际散热效果究竟怎样：** 你有没有做过同一负载下的开关机对比、温度下降记录、稳定温度观察，或者哪怕是明显的主观体验？如果没有正式数据，也请说明实际看到、听到或摸到的变化。

   **推荐回答方向：** 最理想的是提供一个仍记得的测试条件和大致结果；如果确实没有受控测试，就明确写成“控制链与实体送风已经跑通，但没有形成可比较的温度曲线”，绝不硬编性能提升。

7. **Q7 - 最折磨你的问题是什么：** 机械密封、亚克力装配、泡棉选型、风道漏风、风扇噪声、蓝牙连接、温度读取、PWM 调速、3D 打印支撑——哪一个最费时间？你最初怎么判断错了，后来又怎么改？

   **推荐回答方向：** 只挑一到两个最具体的坑深写，例如“结构看起来封住了，实际风从缝里跑掉”或“长零件为了塞进 A1 mini，不得不重新拆件和调整支撑”。真实失误会成为学习笔记最有个人味道的部分。

8. **Q8 - 第一次觉得‘这东西真的活了’是什么瞬间：** 是 Windows 程序第一次读出 CPU/GPU 温度，ESP32 第一次收到蓝牙数据，OLED 上第一次出现真实温度，按键切换 Quiet/Normal/High Speed/Manual，还是把笔记本放上去后真正感觉到风被压进去了？

   **推荐回答方向：** 可以用一个可视化瞬间做开头：电脑端温度终于出现在实体 OLED 上，按下按钮后模式和转速随之变化。必须由用户补充当时真实发生的细节和反应。

On another device, ask these eight questions in this order and let the user
answer by voice without forcing polished prose.

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
git add -- AGENTS.md docs/active-work/portfolio-copy-rewrite.md docs/agent-skills.md docs/environment-toolchain.md docs/superpowers/plans/2026-08-11-cross-device-portfolio-rewrite-handoff.md docs/superpowers/specs/2026-08-11-cross-device-portfolio-rewrite-handoff-design.md
git commit -m "docs(collab): add cross-device rewrite handoff"
```

Expected: one documentation commit containing only the six planned files.

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
