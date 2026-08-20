# Sensorless FOC Learning Route Refactor Implementation Plan

> **Historical status — completed:** Pull request #25 completed this work at `df5b91322a09f00cf0f813dacd8b871f91cba47f`; follow-up commit `9f80eab` closed the handoff. The instructions below are retained as implementation history and are not an active plan.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Replace the legacy Juanyun-labelled FOC archive with an independent, bilingual personal learning route that proves the custom hardware and open-loop compressor result, explains the observer-handoff lesson, and preserves every confirmed evidence boundary.

**Architecture:** Keep the project page and note as two related but non-duplicative narratives. The project page follows the hardware from design through physical compressor operation; the note follows the change in understanding from six-step commutation through SVPWM and into the failed sensorless handoff. Publish a curated evidence set under a new personal-project asset root, generate one code-grounded SVG, retain the firmware repository as an external link, and preserve legacy URLs with redirects.

**Tech Stack:** Next.js 16.3, React 19, TypeScript, MDX, JSON, Node.js 22, Sharp, PowerShell 5.1, FFmpeg/FFprobe, Git.

---

## Fixed Inputs And Safety Gates

- Authoritative source folder: `C:\Users\123\Desktop\FOC公开材料_已更新_2026-08-16`
- Portfolio repository: `D:\Develop\Project_Final_Collation\XJTLU_Portfolio`
- Working branch: `feat/sensorless-foc-learning-route`
- New asset root: `public/uploads/projects/sensorless-foc-learning-route/`
- Firmware evidence link: `https://github.com/Awes0meE/STM32_Sensorless_FOC`
- User learning source: `https://zhuanlan.zhihu.com/p/147659820`
- No firmware-repository modification is in scope.
- No commit, push, pull request, merge, or deployment command may run without a separate explicit authorization from the user.
- Do not delete the old FOC asset directory until content validation passes and `rg` proves that no live source references it.
- Preserve the Desktop source folder byte-for-byte.

### Task 1: Establish An Isolated, Passing Baseline

**Files:**
- Read: `docs/superpowers/specs/2026-08-16-sensorless-foc-learning-route-refactor-design.md`
- Read: `docs/superpowers/plans/2026-08-16-sensorless-foc-learning-route-refactor.md`
- Read: `package.json`
- Read: `.gitignore`

- [x] **Step 1: Confirm repository identity, branch, and current changes**

```powershell
git rev-parse --show-toplevel
git branch --show-current
git status --short --branch
git log -2 --oneline
```

Expected: repository root is `D:\Develop\Project_Final_Collation\XJTLU_Portfolio`, branch is `feat/sensorless-foc-learning-route`, and only the approved design plus this implementation plan are untracked.

- [x] **Step 2: Finish worktree setup only after the user answers the active consent request**

Use `using-git-worktrees` exactly. If the user approves an isolated worktree, prefer a user-approved directory outside the repository tree so that no `.gitignore` commit is needed. If the user declines, continue on the already isolated topic branch in the current checkout. Do not infer consent from silence.

After choosing the workspace, run:

```powershell
git rev-parse --git-dir
git rev-parse --git-common-dir
git rev-parse --show-superproject-working-tree
git branch --show-current
git status --short --branch
```

Expected: the active path and branch are unambiguous, there is no submodule confusion, and the design and plan remain present with identical SHA-256 hashes.

Execution note: no additional worktree was created without consent. Implementation continues in place on the dedicated `feat/sensorless-foc-learning-route` branch under the user's explicit start authorization.

- [x] **Step 3: Confirm the installed Node toolchain and dependencies**

```powershell
node --version
npm.cmd --version
npm.cmd ls --depth=0
```

Expected: Node is at least 22, npm is at least 10, and the existing dependency tree is usable. Do not reinstall dependencies unless `npm.cmd ls --depth=0` reports a real missing-package failure.

- [x] **Step 4: Run the pre-change content baseline**

```powershell
npm.cmd run validate-content
npm.cmd run validate-encoding
npm.cmd run typecheck
```

Expected: `Content validation passed: 8 projects, 24 notes, 78 media items.`, UTF-8 validation passes, and TypeScript reports no errors. Stop and report if this existing baseline fails.

- [x] **Step 5: Record the legacy scope before migration**

```powershell
rg -n -S "juanyun-foc-driver-board|juanyun-foc-driver|juanyun-public/foc-driver" content app components lib next.config.mjs CODEX.md docs scripts
Get-ChildItem -LiteralPath 'public/uploads/projects/juanyun-public/foc-driver' -File | Sort-Object Name | Select-Object Name,Length
```

Expected: live references are confined to the old project, old note, six media records, documentation, and the old public asset directory. Historical specifications, plans, and session records may retain historical names.

### Task 2: Stage And Verify The Curated Public Evidence

**Files:**
- Create directory: `public/uploads/projects/sensorless-foc-learning-route/`
- Create: `public/uploads/projects/sensorless-foc-learning-route/cover.png`
- Create: `public/uploads/projects/sensorless-foc-learning-route/board-render-front.png`
- Create: `public/uploads/projects/sensorless-foc-learning-route/board-render-back.png`
- Create: `public/uploads/projects/sensorless-foc-learning-route/schematic-mcu.png`
- Create: `public/uploads/projects/sensorless-foc-learning-route/schematic-conn.png`
- Create: `public/uploads/projects/sensorless-foc-learning-route/schematic-adc.png`
- Create: `public/uploads/projects/sensorless-foc-learning-route/schematic-mos.png`
- Create: `public/uploads/projects/sensorless-foc-learning-route/schematic-driver.png`
- Create: `public/uploads/projects/sensorless-foc-learning-route/onsite-test.jpg`
- Create: `public/uploads/projects/sensorless-foc-learning-route/onsite-smt-pick-and-place.mp4`
- Create: `public/uploads/projects/sensorless-foc-learning-route/onsite-smt-pick-and-place-poster.jpg`
- Create: `public/uploads/projects/sensorless-foc-learning-route/runtime-open-loop.mp4`
- Create: `public/uploads/projects/sensorless-foc-learning-route/runtime-open-loop-poster.jpg`
- Create: `public/uploads/projects/sensorless-foc-learning-route/bom.xlsx`
- Create: `public/uploads/projects/sensorless-foc-learning-route/gerber.zip`
- Create: `public/uploads/projects/sensorless-foc-learning-route/pcb-fabrication-drawing.pdf`
- Create: `public/uploads/projects/sensorless-foc-learning-route/compressor-6md030z-datasheet.pdf`
- Create: `public/uploads/projects/sensorless-foc-learning-route/drv8301-datasheet.pdf`
- Create: `public/uploads/projects/sensorless-foc-learning-route/hy3010d-datasheet.pdf`
- Create: `public/uploads/projects/sensorless-foc-learning-route/stm32f446re-datasheet.pdf`
- Create: `public/uploads/projects/sensorless-foc-learning-route/lm358a-datasheet.pdf`

- [x] **Step 1: Resolve and validate both exact paths before any copy**

```powershell
$focSource = (Resolve-Path -LiteralPath 'C:\Users\123\Desktop\FOC公开材料_已更新_2026-08-16').Path
$focTarget = [System.IO.Path]::GetFullPath((Join-Path (Get-Location) 'public\uploads\projects\sensorless-foc-learning-route'))
$repoRoot = [System.IO.Path]::GetFullPath((git rev-parse --show-toplevel))
$focSource
$focTarget
$repoRoot
if (-not $focTarget.StartsWith($repoRoot, [System.StringComparison]::OrdinalIgnoreCase)) { throw 'FOC target escaped the repository root.' }
```

Expected: source resolves to the Desktop handoff, target resolves inside the portfolio repository, and the guard does not throw.

- [x] **Step 2: Create the target and copy only the approved static originals**

```powershell
New-Item -ItemType Directory -Force -Path $focTarget | Out-Null
$copyMap = [ordered]@{
  'cover.png' = 'cover.png'
  'foc-driver-board-render-front.png' = 'board-render-front.png'
  'foc-driver-board-render-back.png' = 'board-render-back.png'
  'foc-schematic-mcu.png' = 'schematic-mcu.png'
  'foc-schematic-conn.png' = 'schematic-conn.png'
  'foc-schematic-adc.png' = 'schematic-adc.png'
  'foc-schematic-mos.png' = 'schematic-mos.png'
  'foc-schematic-driver.png' = 'schematic-driver.png'
  'BOM_FOC_PCB1_1_2026-08-16.xlsx' = 'bom.xlsx'
  'Gerber_PCB1_1_2026-08-16.zip' = 'gerber.zip'
  'PCB_PCB1_1_2026-08-16.pdf' = 'pcb-fabrication-drawing.pdf'
  '6MD030Z_松下24V压缩机数据手册.pdf' = 'compressor-6md030z-datasheet.pdf'
  'drv8301-datasheet.pdf' = 'drv8301-datasheet.pdf'
  'hy3010d-mosfet-datasheet.pdf' = 'hy3010d-datasheet.pdf'
  'stm32f446re.pdf' = 'stm32f446re-datasheet.pdf'
  'TI-LM358A.pdf' = 'lm358a-datasheet.pdf'
}
foreach ($entry in $copyMap.GetEnumerator()) {
  Copy-Item -LiteralPath (Join-Path $focSource $entry.Key) -Destination (Join-Path $focTarget $entry.Value)
}
```

Expected: exactly sixteen static originals are copied. `Related_Codes.txt`, the full firmware tree, raw logs, caches, libraries, and generated builds remain absent.

- [x] **Step 3: Prove every static copy matches its source**

```powershell
foreach ($entry in $copyMap.GetEnumerator()) {
  $sourceHash = (Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $focSource $entry.Key)).Hash
  $targetHash = (Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $focTarget $entry.Value)).Hash
  if ($sourceHash -ne $targetHash) { throw "Hash mismatch for $($entry.Key)" }
  '{0}|{1}' -f $entry.Value, $targetHash
}
```

Expected: sixteen successful SHA-256 comparisons and no exception.

- [x] **Step 4: Create the web-sized bench photograph with Sharp**

```powershell
node -e "const sharp=require('sharp'); sharp(process.argv[1]).rotate().resize({width:1800,height:1800,fit:'inside',withoutEnlargement:true}).jpeg({quality:84,mozjpeg:true}).toFile(process.argv[2]).then(x=>console.log(JSON.stringify(x)))" (Join-Path $focSource 'onsite_test.jpg') (Join-Path $focTarget 'onsite-test.jpg')
```

Expected: a valid JPEG no larger than 1800 pixels on either side, visually preserving the complete board/compressor bench.

- [x] **Step 5: Transcode both videos and create posters**

```powershell
$ffmpeg = 'C:\Users\123\Documents\Codex\2026-08-10\hyperframes-plugin-hyperframes-openai-curated-remote\work\tools\npm-ffmpeg\extracted\package\ffmpeg.exe'
& $ffmpeg -y -i (Join-Path $focSource 'onsite_SMT_pickandplace.mp4') -vf 'fps=30,scale=1080:-2:flags=lanczos' -c:v libx264 -preset slow -crf 25 -profile:v high -level:v 4.1 -refs 4 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart (Join-Path $focTarget 'onsite-smt-pick-and-place.mp4')
& $ffmpeg -y -ss 00:00:05 -i (Join-Path $focTarget 'onsite-smt-pick-and-place.mp4') -frames:v 1 -q:v 2 (Join-Path $focTarget 'onsite-smt-pick-and-place-poster.jpg')
& $ffmpeg -y -i (Join-Path $focSource 'runtime_record.mp4') -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart (Join-Path $focTarget 'runtime-open-loop.mp4')
& $ffmpeg -y -ss 00:00:12 -i (Join-Path $focTarget 'runtime-open-loop.mp4') -frames:v 1 -q:v 2 (Join-Path $focTarget 'runtime-open-loop-poster.jpg')
```

Expected: both web videos use H.264 video, AAC audio, and fast-start MP4; the rotated SMT source becomes a correctly oriented 1080 x 1920 derivative; the runtime recording is no longer HEVC; both poster frames are readable evidence images.

- [x] **Step 6: Verify media codecs, dimensions, duration, and selection boundary**

```powershell
foreach ($video in @('onsite-smt-pick-and-place.mp4','runtime-open-loop.mp4')) {
  $videoPath = Join-Path $focTarget $video
  $probeLines = & $ffmpeg -hide_banner -i $videoPath 2>&1
  $probeText = $probeLines -join "`n"
  if ($probeText -notmatch 'Video: h264') { throw "$video is not H.264" }
  if ($probeText -notmatch 'Audio: aac') { throw "$video does not contain AAC audio" }
  $probeLines | Where-Object { $_ -match 'Duration:|Video: h264|Audio: aac' }
}
node -e "const sharp=require('sharp'); Promise.all(process.argv.slice(1).map(async p=>({p,...await sharp(p).metadata()}))).then(x=>console.log(JSON.stringify(x,null,2)))" (Join-Path $focTarget 'onsite-test.jpg') (Join-Path $focTarget 'onsite-smt-pick-and-place-poster.jpg') (Join-Path $focTarget 'runtime-open-loop-poster.jpg')
Get-ChildItem -LiteralPath $focTarget -File | Sort-Object Name | Select-Object Name,Length
```

Expected: SMT duration remains about 11.32 seconds, runtime duration remains about 39.32 seconds, video streams are `h264`, audio streams are `aac`, and exactly the approved curated set is present at this point.

### Task 3: Generate The Original Code-Grounded FOC And SVPWM Visual

**Files:**
- Create: `scripts/generate-foc-svpwm-visual.mjs`
- Create: `public/uploads/projects/sensorless-foc-learning-route/foc-svpwm-signal-chain.svg`

- [x] **Step 1: Write a pre-generation assertion and confirm it fails**

```powershell
node -e "const fs=require('fs'); const p='public/uploads/projects/sensorless-foc-learning-route/foc-svpwm-signal-chain.svg'; if(!fs.existsSync(p)) throw new Error('missing generated FOC/SVPWM SVG')"
```

Expected: non-zero exit with `missing generated FOC/SVPWM SVG`.

- [x] **Step 2: Implement a deterministic SVG generator**

Use `apply_patch` to create `scripts/generate-foc-svpwm-visual.mjs`. The script must:

- reproduce the firmware's sector selection, adjacent-vector dwell times, zero-vector allocation, and `Tcmp1-3` mapping closely enough to plot the compare trajectories;
- draw the actual chain `phase currents → Clarke/Park → d/q PI → inverse Park → αβ vector → SVPWM dwell times → Tcmp1-3 → center-aligned timer → six complementary PWM outputs`;
- visually separate compare trajectories, the timer's up/down carrier, switching pulses, and phase current;
- label the compare trajectories as compare or duty references, never as literal phase voltage or phase current;
- include a small source note naming `SVPWM_Calc()`, TIM1 center-aligned mode, and `CCR1-3` without embedding copied third-party artwork;
- create a viewBox-based responsive SVG with English and Chinese labels and no external font or image dependency.

- [x] **Step 3: Generate and structurally validate the SVG**

```powershell
node scripts/generate-foc-svpwm-visual.mjs
node -e "const fs=require('fs'); const p='public/uploads/projects/sensorless-foc-learning-route/foc-svpwm-signal-chain.svg'; const s=fs.readFileSync(p,'utf8'); for(const x of ['Clarke','Park','SVPWM','Tcmp1','center-aligned','CCR1-3','compare','phase current']) if(!s.includes(x)) throw new Error('missing label '+x); if((s.match(/<path\b/g)||[]).length<8) throw new Error('insufficient plotted paths'); console.log('FOC/SVPWM SVG structure passed')"
```

Expected: generator reports the output path and the structural assertion prints `FOC/SVPWM SVG structure passed`.

- [x] **Step 4: Render and inspect the SVG at desktop and mobile widths**

Use the local browser or an SVG raster preview after generation. Check for clipped labels, overlapping bilingual text, illegible line weights, false waveform labels, and any implication that the CPU manually generates a triangle array.

Expected: both widths remain legible and the four waveform layers are visibly distinct.

### Task 4: Add The Independent Routes And Metadata Before Rewriting Prose

**Files:**
- Modify: `next.config.mjs`
- Modify: `lib/content.ts`
- Create: `content/projects/sensorless-foc-learning-route.mdx`
- Create: `content/notes/sensorless-foc-handoff.mdx`
- Delete after replacements exist: `content/projects/juanyun-foc-driver-board.mdx`
- Delete after replacements exist: `content/notes/juanyun-foc-driver.mdx`

- [x] **Step 1: Prove both compatibility redirects are currently absent**

```powershell
node -e "const fs=require('fs'); const s=fs.readFileSync('next.config.mjs','utf8'); const required=['/work/juanyun-foc-driver-board','/notes/juanyun-foc-driver']; if(required.every(x=>s.includes(x))) process.exit(0); throw new Error('FOC redirects absent')"
```

Expected: non-zero exit with `FOC redirects absent`.

- [x] **Step 2: Add permanent legacy redirects**

Use `apply_patch` to add:

- `/work/juanyun-foc-driver-board` → `/work/sensorless-foc-learning-route`
- `/notes/juanyun-foc-driver` → `/notes/sensorless-foc-handoff`

Set both to `permanent: true`.

- [x] **Step 3: Add the ongoing-route display translations**

Use `apply_patch` in `lib/content.ts` so:

- `formatDateRangeZh()` replaces both `Now` and `Present` with `至今`;
- `formatStatusZh()` maps `Ongoing Learning Route` to `持续学习 / 阶段原型`.

- [x] **Step 4: Create complete frontmatter and one-sentence body stubs, then remove the legacy sources**

The new project frontmatter must contain:

```yaml
title: "From a Custom Driver Board to a Running Compressor: My Sensorless FOC Learning Route"
titleZh: "从自制驱动板到压缩机运行：我的无感 FOC 学习路线"
date: "2025-11 to Present"
status: "Ongoing Learning Route"
tags: ["FOC", "Motor Control", "STM32F4", "DRV8301", "PCB", "SVPWM"]
cover: "/uploads/projects/sensorless-foc-learning-route/cover.png"
featured: false
links:
  repo: "https://github.com/Awes0meE/STM32_Sensorless_FOC"
assetPaths:
  - "/uploads/projects/sensorless-foc-learning-route"
```

The project must also have evidence-bounded English and Chinese summaries. The new note must use the approved titles, `date: "2026-05-09"`, public visibility, and `projectSlug: "sensorless-foc-learning-route"`. Give both files one complete bilingual sentence as their temporary body so no validator ever sees a blank page. Delete the two legacy MDX sources with `apply_patch` only after both new files exist.

- [x] **Step 5: Verify route, slug, and frontmatter integrity**

```powershell
node -e "const fs=require('fs'); const cfg=fs.readFileSync('next.config.mjs','utf8'); for(const x of ['/work/juanyun-foc-driver-board','/work/sensorless-foc-learning-route','/notes/juanyun-foc-driver','/notes/sensorless-foc-handoff']) if(!cfg.includes(x)) throw new Error('missing '+x); console.log('FOC redirects present')"
npm.cmd run validate-content
```

Expected: redirect assertion passes and content validation reports 8 projects and 24 notes. During execution, media migration was completed before this assertion to avoid an invalid intermediate `projectSlug`, so the verified media count is already 84.

### Task 5: Write The Evidence-Led Project Page

**Files:**
- Modify: `content/projects/sensorless-foc-learning-route.mdx`
- Read: `skills/engineering-note-writer/SKILL.md`
- Read: `skills/engineering-note-writer/references/evidence-and-boundaries.md`
- Read: `skills/engineering-note-writer/references/voice-rules.md`
- Read: `skills/engineering-note-writer/references/bilingual-writing.md`
- Read: `skills/engineering-note-writer/references/reader-prose-hard-gates.md`

- [x] **Step 1: Draft the Chinese narrative from the approved hardware-build spine**

The Chinese draft must move through these attention shifts without adopting a fixed report template:

1. no suitable brushless motor and an unaffordable teaching kit;
2. deciding to design the missing driver board;
3. the chance arrival of the compressor as a real and demanding load;
4. schematic, selection, layout, Gerber/BOM, ordering, SMT setup/operation, rework, and power-on checks completed independently;
5. the open-source FOC example code and the user's hardware mapping, sampling conversion, controls, startup behavior, and protection work;
6. the 12 V compressor bench, trace-backed 30/45/60 Hz points, and final 30-80 Hz EC11 stage;
7. the uncontrolled six-step comparison and its subjective status;
8. the failed sensorless handoff and continuing learning direction.

Write first person where ownership matters. Keep Codex assistance limited to RAM trace, EKF parameter work, and the Kalman-gain overwrite diagnosis. Do not name the course provider or company.

- [x] **Step 2: Integrate artifacts where they answer a claim**

Use the cover, front/back renders, five schematic sheets, SMT video, bench photo, runtime video, BOM, Gerber, PCB drawing, compressor manual, relevant datasheets, original signal-chain SVG, and external firmware link. Captions must say what each artifact proves and what it does not prove.

For `runtime-open-loop.mp4`, say it is the final 30-80 Hz EC11 demo version under 12 V with both compressor ports open. Do not assign an exact 80 Hz setpoint. Describe manual inlet restriction as a disturbance observation showing continued FOC operation and strong perceived suction with low noise, not as refrigeration-loop validation.

- [x] **Step 3: Adapt the finished Chinese movement into English**

Preserve the same facts, uncertainty, ownership, technical depth, and ending. English should read naturally rather than mirror Chinese sentence order. Keep paired content in the repository's English-then-Chinese presentation convention.

- [x] **Step 4: Run the project-page evidence and voice audit**

Explicitly verify:

- project identity is personal throughout;
- the chance compressor encounter remains the narrative turn;
- hardware authorship is complete and specific;
- inherited firmware, user-led adaptations, and Codex-assisted diagnostics are separate;
- no completed sensorless closed-loop claim appears;
- no pressure, flow, acoustic, efficiency, or thermal-performance metric is invented;
- future joint motor, servo, HFI, and force-feedback work is grammatically future work;
- the project page does not become a textbook treatment of Clarke/Park/SVPWM.

Expected: Truth, Li Zhiyi, L1, evidence, voice, and bilingual gates all pass for this page.

### Task 6: Write The Cognition-Led Learning Note

**Files:**
- Modify: `content/notes/sensorless-foc-handoff.mdx`
- Read: `skills/engineering-note-writer/references/cognition-led-composition.md`
- Read: `skills/engineering-note-writer/references/research-expansion.md`
- Read: `skills/engineering-note-writer/references/self-review.md`

- [x] **Step 1: Draft the Chinese note around the observer paradox**

Open on the same compressor under comparable but uncontrolled conditions. The low-cost fan-oriented board produced ordinary six-step square-wave commutation, confirmed by oscilloscope. Preserve stronger noise, more heating, and weaker suction only as remembered first-person observations. Let that sensory contrast motivate the control question rather than act as performance proof.

- [x] **Step 2: Explain the control chain through this firmware**

Connect the actual implementation:

`Ia/Ib/Ic → Clarke → Iα/Iβ → Park → Id/Iq → current PI → Vd/Vq → inverse Park → Vα/Vβ → SVPWM → Tcmp1-3 → CCR1-3 → complementary PWM`

Explain why the third current is reconstructed, how Park makes a rotating current vector controllable as `d/q`, and how inverse Park plus SVPWM returns the controller's voltage request to realizable inverter switching times. Compare six-step and FOC as commutation/control strategies; never imply that `BLDC` and `FOC` are mutually exclusive motor types.

- [x] **Step 3: Separate all waveform layers in first-person understanding**

State precisely:

- `SVPWM_Calc()` selects a sector, computes adjacent-vector dwell times `Tx/Ty`, limits them, distributes zero-vector time symmetrically, and maps them to `Tcmp1-3`;
- the characteristic saddle-shaped traces emerge when these compare values are plotted over rotating electrical angle;
- the code does not create a named stored saddle array or explicitly add a third-harmonic lookup table;
- TIM1 `TIM_CounterMode_CenterAligned1` produces digital up/down counter behavior analogous to a triangular carrier;
- writing `Tcmp1-3` into `CCR1-3` creates timer comparisons and switching pulses;
- compare references, carrier, MOSFET gate pulses, motor terminal voltage, and phase current are different layers.

Use the original SVG beside this explanation.

- [x] **Step 4: Reconstruct the debugging chronology and central lesson**

Use stable 45 Hz open-loop operation, repeatable 30/45/60 Hz behavior, EKF sign/parameter/code investigation, corrected speed estimates, and the still-failed takeover. The core first-person cognition is that a plausible speed estimate showed the observer could see motion, but did not prove rotor-angle accuracy, full-state convergence, or reference-frame continuity sufficient for current-vector control.

Describe RAM trace and the EKF/Kalman-gain code work as collaborative Codex-assisted implementation/inspection while retaining the user's ownership of the experiments and judgments.

- [x] **Step 5: Attribute research without importing another author's voice**

Link Zhihui Jun's article near the relevant retrospective explanation and state that it helped the user's understanding. Paraphrase PWM area intuition, coordinate transforms, adjacent vectors, zero-vector allocation, seven-segment symmetry, and compare-register generation. Cross-check the finalized explanation against official TI, ST, STM32 timer, and primary space-vector sources. Do not copy article paragraphs, diagrams, or heading structure.

- [x] **Step 6: Close on the unfinished route and adapt to English**

Keep HFI, robot joints, general servo control, sensorless closed loop, and force feedback as directions. End with the compressor's open-loop run as a gentle attempt and a small-scale image of the longer sensorless FOC route, without presenting the stage freeze as a final success. Then write an idiomatic English adaptation with equal uncertainty and technical depth.

- [x] **Step 7: Run the note cognition and evidence audit**

Expected:

- the title question is answered by the note's changed understanding;
- the note is not a second hardware inventory;
- external knowledge is marked as retrospective understanding where appropriate;
- the six-step comparison remains subjective;
- no closed-loop takeover, HFI implementation, or refrigeration-loop result is claimed;
- there are at most 15 headings;
- Truth, Li Zhiyi, L1, cognition, evidence, voice, and bilingual gates all pass.

### Task 7: Replace Media Metadata And Reconcile Repository Documentation

**Files:**
- Modify: `content/media.json`
- Modify: `CODEX.md`
- Modify: `docs/architecture.md`
- Modify: `docs/juanyun-tech-source-inventory.md`

- [x] **Step 1: Replace the six legacy FOC media records with twelve new records**

Create records under `projectSlug: "sensorless-foc-learning-route"` for:

1. cover;
2. front render;
3. back render;
4. MCU schematic;
5. connector schematic;
6. ADC schematic;
7. MOSFET power stage;
8. DRV8301 sheet;
9. onsite SMT video plus poster thumbnail;
10. onsite bench photograph;
11. open-loop runtime video plus poster thumbnail;
12. FOC/SVPWM signal-chain SVG.

Use dates consistent with the approved timeline. Every bilingual caption must distinguish design evidence, manufacturing evidence, physical runtime evidence, and explanatory artwork. The runtime caption must avoid an exact setpoint.

- [x] **Step 2: Confirm the media delta and file existence**

```powershell
$media = Get-Content -Encoding UTF8 'content/media.json' -Raw | ConvertFrom-Json
@($media | Where-Object { $_.projectSlug -eq 'sensorless-foc-learning-route' }).Count
@($media | Where-Object { $_.projectSlug -eq 'juanyun-foc-driver-board' }).Count
npm.cmd run validate-content
```

Expected: counts are `12` and `0`; validation reports `8 projects, 24 notes, 84 media items`.

- [x] **Step 3: Correct current documentation without rewriting history**

Update the three live documentation files so they:

- classify FOC as an independent personal learning route;
- point to the new content sources and asset root;
- state the curated-public boundary and external firmware repository;
- update the current media count from 78 to 84 where applicable;
- remove FOC from the Juanyun current inventory/classification;
- retain historical specs, plans, and session records unchanged.

- [x] **Step 4: Scan for stale live classifications**

```powershell
rg -n -S "juanyun-foc-driver-board|juanyun-foc-driver|juanyun-public/foc-driver|Legacy_慧驱动FOC_Project" content app components lib next.config.mjs CODEX.md docs/architecture.md docs/juanyun-tech-source-inventory.md scripts
```

Expected: only the two deliberate redirect sources may retain old slugs. No live document classifies FOC as Juanyun. `Legacy_慧驱动FOC_Project` is absent from the current inventory after reconciliation.

### Task 8: Retire The Superseded Public Asset Directory Safely

**Files:**
- Delete: `public/uploads/projects/juanyun-public/foc-driver/`

- [x] **Step 1: Resolve and guard the exact old directory**

```powershell
$oldFocAssets = [System.IO.Path]::GetFullPath((Join-Path (git rev-parse --show-toplevel) 'public\uploads\projects\juanyun-public\foc-driver'))
$expectedOldFocAssets = [System.IO.Path]::GetFullPath('D:\Develop\Project_Final_Collation\XJTLU_Portfolio\public\uploads\projects\juanyun-public\foc-driver')
$oldFocAssets
if ($oldFocAssets -ne $expectedOldFocAssets) { throw 'Old FOC asset path does not match the exact approved target.' }
if (-not (Test-Path -LiteralPath $oldFocAssets -PathType Container)) { throw 'Old FOC asset directory is already absent.' }
```

Expected: exact resolved path matches and both guards pass.

- [x] **Step 2: Prove there are no live references before deletion**

```powershell
npm.cmd run validate-content
$liveRefs = rg -n -S "juanyun-public/foc-driver" content app components lib next.config.mjs CODEX.md docs/architecture.md docs/juanyun-tech-source-inventory.md scripts
if ($LASTEXITCODE -eq 0) { $liveRefs; throw 'Live references still point to the old FOC asset directory.' }
```

Expected: content validation passes and `rg` returns no live references.

- [x] **Step 3: Remove only the exact guarded directory**

```powershell
Remove-Item -LiteralPath $oldFocAssets -Recurse -Force
if (Test-Path -LiteralPath $oldFocAssets) { throw 'Old FOC asset directory still exists.' }
```

Expected: only `public/uploads/projects/juanyun-public/foc-driver/` is removed. Git retains recoverability until any future authorized commit.

- [x] **Step 4: Re-run public-reference validation**

```powershell
npm.cmd run validate-content
git status --short
```

Expected: validation remains at 8 projects, 24 notes, 84 media items, and the status shows the intentional old-file deletions plus new curated assets.

### Task 9: Run The Engineering-Writing Gates And Create The Review Artifact

**Files:**
- Review: `content/projects/sensorless-foc-learning-route.mdx`
- Review: `content/notes/sensorless-foc-handoff.mdx`
- Review: FOC records in `content/media.json`
- Create outside repository: `D:\Develop\Project_Final_Collation\FOC项目重构审阅稿_2026-08-16.md`

- [x] **Step 1: Run the reader-prose L1 scanner**

```powershell
$focFiles = @(
  'content/projects/sensorless-foc-learning-route.mdx',
  'content/notes/sensorless-foc-handoff.mdx'
)
$wordPattern = '说白了|意味着什么|这意味着|本质上|换句话说|不可否认|综上所述|总的来说|值得注意的是|不难发现|让我们来看看|接下来让我们|这是一篇|本文将|下面介绍|这篇笔记整理了|AI工具|某个模型|to put it simply|what does this mean|this means|essentially|in essence|in other words|it is undeniable|in summary|overall|it is worth noting|it is easy to see|let us take a look|next, let us|this article will|this note records|在当今.*时代|在当今.*背景下|随着.*发展|随着技术的不断进步|in today.s rapidly changing era|in today.s landscape|with the continued development of'
$punctuationPattern = '[：:“”＂—]|——|:'
rg -n -i -S $wordPattern $focFiles
rg -n -S $punctuationPattern $focFiles
$media = Get-Content -Encoding UTF8 'content/media.json' -Raw | ConvertFrom-Json
$focMedia = @($media | Where-Object { $_.projectSlug -eq 'sensorless-foc-learning-route' })
foreach ($item in $focMedia) {
  foreach ($field in @('title','titleZh','caption','captionZh')) {
    $value = $item.$field
    if ($value -and ($value -match $wordPattern -or $value -match $punctuationPattern)) {
      '{0}|{1}|{2}' -f $item.id, $field, $value
    }
  }
}
```

Expected: zero applicable L1 hits in reader-facing prose. Manually classify allowed frontmatter, Markdown syntax, URLs, technical identifiers, equations, and exact titles before accepting raw punctuation output.

- [x] **Step 2: Complete the Truth, Li Zhiyi, evidence, voice, and bilingual review**

Use the repo-local writer checklist line by line. Pay special attention to:

- every first-person action having confirmed support;
- `open-source FOC example code` as the only provider description;
- Codex collaboration transparency;
- personal observations staying subjective;
- saddle traces, carrier, switching pulses, voltages, and currents staying distinct;
- English and Chinese preserving the same uncertainty strength;
- project and note retaining different narrative jobs.

Expected: no unresolved claim, ownership, translation, or voice issue remains.

- [x] **Step 3: Create an independent bilingual review artifact**

Use `apply_patch` to write `D:\Develop\Project_Final_Collation\FOC项目重构审阅稿_2026-08-16.md` containing:

- both titles, routes, summaries, dates, status, and tags;
- the complete project copy in English and Chinese;
- the complete note copy in English and Chinese;
- all twelve media captions;
- the selected download list;
- redirects and evidence-boundary checklist;
- an explicit statement that no commit, push, PR, merge, or deployment has occurred.

Expected: the user can review all public prose in one file without navigating the site.

### Task 10: Run Full Technical And Browser Verification

**Files:**
- Verify all modified repository files and generated assets.

- [x] **Step 1: Run whitespace, content, encoding, lint, and type checks**

```powershell
git diff --check
npm.cmd run lint
npm.cmd run typecheck
```

Expected: all commands exit zero; lint includes successful content and encoding validation.

- [x] **Step 2: Run a clean production build**

```powershell
npm.cmd run build
```

Expected: Next.js 16.3 production build exits zero and emits both new dynamic routes without MDX or asset errors.

- [x] **Step 3: Run the dependency audit**

```powershell
npm.cmd audit
```

Expected: zero known vulnerabilities, or a clearly reported pre-existing external advisory before proceeding.

- [x] **Step 4: Start the production server for browser verification**

```powershell
$serverCommand = 'npm.cmd run start -- --hostname 127.0.0.1 --port 3000'
Start-Process -FilePath 'cmd.exe' -WindowStyle Hidden -WorkingDirectory (Get-Location) -ArgumentList @('/c', $serverCommand)
```

Expected: the production server responds on `http://127.0.0.1:3000`.

Execution note: port `3100` was used because it was the available local verification port; the production server responded successfully there and was stopped after the browser session closed.

- [x] **Step 5: Verify desktop and mobile in English and Chinese**

Inspect:

- `/work/sensorless-foc-learning-route`
- `/notes/sensorless-foc-handoff`
- `/media`
- `/work/juanyun-foc-driver-board`
- `/notes/juanyun-foc-driver`

At desktop and mobile widths, test language switching, all images, both videos, posters, download links, repo link, related-project/note navigation, responsive SVG labels, and redirect destinations. Confirm the old slugs do not 404.

Expected: no broken asset, overflow, unreadable diagram, stale Juanyun classification, playback failure, or bilingual mismatch.

- [x] **Step 6: Record the final uncommitted handoff state**

```powershell
git status --short --branch
git diff --stat
git diff --check
```

Expected: only the approved FOC refactor, its design/plan, documentation reconciliation, generated diagram, curated assets, and old FOC asset retirement are present. No unrelated change is included.

### Task 11: Stop At The User Copy-Approval Gate

- [x] **Step 1: Deliver the review artifact and verification summary**

Report the exact paths, routes, checks, asset counts, remaining limitations, and absence of any commit/release action. Explicitly mention that the old Juanyun FOC asset folder was removed from the working tree only after reference validation and remains recoverable from Git history.

- [x] **Step 2: Wait for explicit copy approval**

Do not commit or publish while the user is reviewing.

- [x] **Step 3: If the user later authorizes commits, use coherent Conventional Commit checkpoints**

Suggested commit messages, to be used only after authorization:

```text
docs(foc): add learning-route refactor design and plan
feat(foc): publish sensorless FOC learning route
docs(foc): reconcile portfolio evidence boundaries
```

Run all Task 10 checks again against the exact commit head before any later push, pull request, merge, or deployment request.

Execution note: on 2026-08-16 the user approved the bilingual copy and explicitly authorized commits, pull-request merge, `/neat`, remote/local synchronization, and workspace cleanup.

Release note: pull request #25 used exact head `049aa57209a14776f2a7a7da9ee8dca5deb957d9`, passed its Vercel status, and merged into `main` at `df5b91322a09f00cf0f813dacd8b871f91cba47f`.

## Plan Self-Review

- [x] Every section of the approved design is represented by an implementation task.
- [x] Every created, modified, moved, or deleted path is named explicitly.
- [x] Source-folder preservation, curated-public selection, old-asset retirement, and firmware non-modification are testable.
- [x] The project page and note have separate composition and acceptance criteria.
- [x] The FOC/SVPWM visual is derived from this firmware and distinguishes all waveform layers.
- [x] Runtime and six-step claims preserve the confirmed uncertainty level.
- [x] Chinese-first drafting and English adaptation are explicit.
- [x] The plan contains no placeholder prose, unspecified file destination, or implied commit permission.
- [x] Status/date values are consistent with the existing TypeScript data model.
- [x] The final gate returns control to the user before any commit or release action.
