# Arduino Smart Car Content Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the Arduino smart-car project page and learning note as distinct, evidence-bound bilingual engineering narratives while preserving the project title and existing public routes/assets.

**Architecture:** Keep the file-based portfolio architecture unchanged. Rewrite only the two existing MDX content records: the project page will carry the full build/result case study, while the note will carry the changing-understanding narrative from soldering through bring-up and track tuning. Reuse the current public images, PDFs, and code paths without adding or moving assets.

**Tech Stack:** Next.js 16.3 content pipeline, MDX-like Markdown, YAML frontmatter, repository-local `engineering-note-writer`, npm validation scripts, Git/Vercel branch previews.

---

### Task 1: Rewrite The Project Case Study

**Files:**
- Modify: `content/projects/arduino-smart-car-line-tracker.mdx`
- Reference: `docs/superpowers/specs/2026-08-11-arduino-smart-car-content-rewrite-design.md`
- Reference: `skills/engineering-note-writer/references/evidence-and-boundaries.md`
- Reference: `skills/engineering-note-writer/references/material-led-composition.md`

- [ ] **Step 1: Record the protected title and current public references**

Run:

```powershell
rg -n '^titleZh:|^title:|/uploads/projects/arduino-smart-car-line-tracker' content/projects/arduino-smart-car-line-tracker.mdx
```

Expected: `titleZh` is exactly `Arduino 循迹小车焊接与控制实训`, and all body assets resolve under `/uploads/projects/arduino-smart-car-line-tracker/`.

- [ ] **Step 2: Replace the project summary pair**

Use equivalent frontmatter summaries with these factual nodes:

```yaml
summary: "A first embedded-systems build that began as a bare PCB and ended in a top-5-percent campus lap: soldering the kit, reading the LM7805/74HC165/L293 circuit blocks, staging Arduino tests, and tuning line-tracking PWM."
summaryZh: "第一次接触嵌入式，就从一块裸 PCB 开始：焊接整车、读懂 LM7805/74HC165/L293 电路、分模块测试 Arduino，再把循迹 PWM 一路调到校内圈速赛前 5%。"
```

Do not change `title`, `titleZh`, date, status, tags, cover, links, or `assetPaths`.

- [ ] **Step 3: Rewrite the Chinese project narrative around six material-led beats**

Draft the Chinese source text first. Use no more than these six subject headings, refining their wording only if the finished paragraphs demand it:

```markdown
## The Car Arrived As A Bare PCB / 小车到手时还只是一块裸 PCB
## The Board Stopped Looking Like One Purple Mystery / 这块紫色 PCB 终于不再是一整团
## Fourteen Inputs Had To Queue Up / 十四路输入得先排个队
## L293 Turned PWM Into Wheel Speed / L293 把 PWM 变成轮速
## Six Small Tests Before One Fast Lap / 跑圈之前，先过六个小测试
## Three Steering Grades And A Lighter Battery / 三档转向和一块更轻的电池
```

The paragraph sequence must retain these supported facts:

```text
bare PCB and loose components -> first embedded project and unfamiliar PCB/power concepts
finished-car photo and system diagram -> power/controller/input/motor blocks
LM7805 plus capacitors -> stable 5 V logic path and CP1/CM3/CM4 warning
6 collision switches + 6 IR tracking sensors + 2 keys -> two 74HC165 devices and reload_shift_reg()
L293 + motor_set_PWM(left, right) -> direction and 0-255 wheel-speed control
six isolated test groups -> hardware bring-up before integrated racing code
large/medium/small steering -> 12 V lithium-battery change -> repeated tuning -> top 5 percent
```

Place the report, manual, and testing-code links beside the paragraphs they support. Remove the generic `Project Brief`, `Files And Evidence`, and `Looking Back` sections.

- [ ] **Step 4: Adapt the English project narrative**

Write English before Chinese in the final MDX pairing. Keep every narrative node, technical identifier, uncertainty, image, and ending beat from the Chinese draft. Use calmer phrasing without shrinking the English into a summary.

- [ ] **Step 5: Run the project-page self-review**

Run:

```powershell
rg -n '^titleZh: "Arduino 循迹小车焊接与控制实训"$' content/projects/arduino-smart-car-line-tracker.mdx
rg -n 'Project Brief|Files And Evidence|Looking Back|起点|怎么卡住|怎么改|回头看|还要补' content/projects/arduino-smart-car-line-tracker.mdx
npm.cmd run validate-content
npm.cmd run validate-encoding
git diff --check -- content/projects/arduino-smart-car-line-tracker.mdx
```

Expected: the protected title has one exact match; the generic-heading scan has no matches; both validators pass; `git diff --check` is silent.

- [ ] **Step 6: Commit the project-page rewrite**

```powershell
git add -- content/projects/arduino-smart-car-line-tracker.mdx
git commit -m "docs(projects): rewrite Arduino smart car case study"
```

Expected: one commit containing only the project MDX rewrite.

### Task 2: Rewrite The Learning Note

**Files:**
- Modify: `content/notes/arduino-smart-car-line-tracking-learning-note.mdx`
- Reference: `skills/engineering-note-writer/references/voice-rules.md`
- Reference: `skills/engineering-note-writer/references/bilingual-writing.md`
- Reference: `skills/engineering-note-writer/references/style-examples.md`

- [ ] **Step 1: Replace the learning-note title and summary pairs**

Use exactly:

```yaml
title: "From Solder Joints to Line Tracking: My First Full Smart-Car Bring-Up"
titleZh: "从焊点到循迹：Smart Car 的第一次完整 Bring-up"
summary: "A first embedded bring-up told from soldering bench to black-line tracking: assembly order, LM7805 power, fourteen inputs through 74HC165, L293/PWM motor control, and staged tests that kept hardware and code separable."
summaryZh: "第一次完整 bring-up 从焊台开始：按顺序装板、理解 LM7805 电源、让 74HC165 收下十四路输入、用 L293/PWM 驱动双轮，再靠分段测试把硬件问题和代码问题拆开。"
```

Preserve date, tags, `visibility: public`, and `projectSlug: "arduino-smart-car-line-tracker"`.

- [ ] **Step 2: Draft the Chinese learning narrative around six information moves**

Start from `soldering-bench.jpg`, not a summary of the course. Use no more than these six subject headings, refining them only after the body is complete:

```markdown
## Before It Followed A Line, It Needed Every Joint / 会循迹之前，先得把每个焊点交代清楚
## LM7805 Made Power Less Abstract / LM7805 让“电源”不再只是两个字
## Fourteen Inputs, Thirteen Arduino Pins / 十四路输入，Arduino 只有十三个数字引脚
## L293 Sat Between A Number And A Wheel / L293 夹在一个数字和一只轮子之间
## Six Tests Kept The Whole Car From Becoming One Bug / 六个测试，免得整车变成一个大 bug
## The Track Joined The Chain / 上赛道，整条链路终于接起来
```

Use this narrative sequence:

```text
soldering bench -> low-to-high and center-to-edge installation order
beginner expectation that correctly soldered parts should simply work -> need for staged bring-up
LM7805 and filter capacitors -> stable logic/sensor supply -> documented capacitor warning
14 input signals versus 13 Arduino Nano digital IO pins -> two 74HC165 devices -> reload_shift_reg()
L293 H-bridge and motor_set_PWM() -> signed direction and 0-255 speed values -> steering strength
LED/key/collision/IR/motor/speed tests -> isolate one block before racing
three steering grades + battery/tuning evidence -> top-5-percent lap result -> solder-signal-code-motion chain
```

Keep humor attached to the supported beginner assumption and the real possibility that hardware and code could take turns looking guilty. Do not invent a burned component, failed lap, measured voltage, or exact debugging conversation.

- [ ] **Step 3: Adapt the English learning narrative**

Keep the same images, facts, explanation order, humor target, and ending. Translate the comic mechanism rather than Chinese particles; English may be calmer but must remain a full article.

- [ ] **Step 4: Run the learning-note self-review**

Run:

```powershell
rg -n '^titleZh: "从焊点到循迹：Smart Car 的第一次完整 Bring-up"$' content/notes/arduino-smart-car-line-tracking-learning-note.mdx
rg -n 'Starting From The Tutorial|What I Would Keep|Looking Back|起点|怎么卡住|怎么改|回头看|还要补' content/notes/arduino-smart-car-line-tracking-learning-note.mdx
npm.cmd run validate-content
npm.cmd run validate-encoding
git diff --check -- content/notes/arduino-smart-car-line-tracking-learning-note.mdx
```

Expected: the new title has one exact match; the generic-heading scan has no matches; both validators pass; `git diff --check` is silent.

- [ ] **Step 5: Commit the learning-note rewrite**

```powershell
git add -- content/notes/arduino-smart-car-line-tracking-learning-note.mdx
git commit -m "docs(notes): rewrite Arduino smart car bring-up note"
```

Expected: one commit containing only the learning-note MDX rewrite.

### Task 3: Verify The Two Pages As One Bilingual Content Set

**Files:**
- Verify: `content/projects/arduino-smart-car-line-tracker.mdx`
- Verify: `content/notes/arduino-smart-car-line-tracking-learning-note.mdx`

- [ ] **Step 1: Compare the final diff against the design boundary**

Run:

```powershell
git diff origin/main...HEAD -- content/projects/arduino-smart-car-line-tracker.mdx content/notes/arduino-smart-car-line-tracking-learning-note.mdx
git diff origin/main...HEAD --name-only
```

Expected: prose changes are supported by the approved design; tracked changes contain the design document, this plan, and the two intended MDX files only.

- [ ] **Step 2: Run the complete content-only validation suite**

Run:

```powershell
npm.cmd run lint
npm.cmd run validate-content
npm.cmd run validate-encoding
npm.cmd run typecheck
npm.cmd run build
git diff origin/main...HEAD --check
```

Expected: lint passes; content validation reports 8 projects, 21 notes, and 73 media items; encoding validation passes; TypeScript passes; Next.js generates 36 static pages; the final diff check is silent.

- [ ] **Step 3: Start a local preview and smoke-test both routes**

Run the dev server in the background:

```powershell
Start-Process -FilePath "npm.cmd" -ArgumentList @("run", "dev", "--", "-H", "127.0.0.1", "-p", "3000") -WorkingDirectory (Get-Location) -WindowStyle Hidden
```

Then request:

```powershell
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:3000/work/arduino-smart-car-line-tracker
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:3000/notes/arduino-smart-car-line-tracking-learning-note
```

Expected: both responses return HTTP 200.

- [ ] **Step 4: Review desktop and mobile pages in both language modes**

Inspect both routes at desktop and mobile widths. Verify:

```text
project Chinese title remains Arduino 循迹小车焊接与控制实训
learning-note Chinese title is 从焊点到循迹：Smart Car 的第一次完整 Bring-up
English and Chinese body sections switch without missing content
headings and images render in the intended order
no broken links, horizontal overflow, or exposed internal markers
```

- [ ] **Step 5: Push the review branch**

Run:

```powershell
git status --short --branch
git push -u origin agent/rewrite-arduino-smart-car-content
```

Expected: the branch tracks `origin/agent/rewrite-arduino-smart-car-content`, allowing Vercel to generate a branch preview. Do not merge to `main`.
