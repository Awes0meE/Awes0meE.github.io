# Juanyun Thermal Content Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the Juanyun thermal-management archive into an evidence-bounded bilingual project narrative plus distinct hardware, firmware, automatic-control, and maintenance notes without exposing reconstructable private source.

**Architecture:** Keep one project page as the product and ownership spine. Rewrite three existing core notes plus BaseUnit as separate engineering questions, add two notes for automatic refrigeration control and the later ControlPanel/maintenance phase, and leave narrow legacy notes unchanged. Direct personal tests, artifact-supported facts, current technical research, and company-reported results remain visibly separate.

**Tech Stack:** Next.js 16 content repository, bilingual MDX-like project/note files, JSON media metadata, static assets under `public/uploads`, private STM32F1 C firmware as reference-only evidence, npm validation/build scripts.

**Outcome:** Completed, approved, and merged through pull request #22 at `e473b8c13f99308398a9c3221e1402d78634498d` on 2026-08-14. The user's final public title and canonical `2025-11 to 2026-05` date range supersede the earlier planning language about extending the project through July 2026.

---

## File Map

**Create**

- `content/notes/juanyun-acunit-automatic-control.mdx` — automatic EEV/compressor control and safeguards.
- `content/notes/juanyun-production-line-control-panel.mdx` — ControlPanel, observability, robustness, and the 102-commit retrospective.

**Rewrite**

- `content/projects/juanyun-thermal-hardware.mdx` — complete product, ownership, phase, validation, trial, limitation, and emotional spine.
- `content/notes/juanyun-baseunit-firmware.mdx` — why BaseUnit came first and how its state/data loop worked.
- `content/notes/juanyun-acunit-board.mdx` — three-board design, physical build, staged bring-up, and approved photographic evidence.
- `content/notes/juanyun-acunit-firmware.mdx` — planned bare-metal layering, multi-rate dispatch, and nonblocking control.

**Update as supporting records**

- `content/media.json` — five approved ACUnit V2.1 bring-up entries, already staged in the working tree.
- `docs/juanyun-tech-source-inventory.md` — final public/private decision record and updated archive counts.
- `docs/active-work/portfolio-copy-rewrite.md` — confirmed brief, implementation progress, and fresh verification state.
- `docs/superpowers/specs/2026-08-14-juanyun-thermal-content-refactor-design.md` — status only after implementation reaches copy review.

**Preserve without prose rewrite**

- `content/notes/juanyun-acunit-hardware-revision-archive.mdx`
- `content/notes/juanyun-dht11-am2302-board.mdx`
- `content/notes/juanyun-legacy-actuator-archive.mdx`
- `content/notes/juanyun-hardware-sop.mdx`
- project cover `/uploads/projects/juanyun-public/covers/cirro-tech-cover.jpg`

## Task 1: Lock the research and evidence matrix

**Files:**

- Read: `skills/engineering-note-writer/references/research-expansion.md`
- Read: `skills/engineering-note-writer/references/evidence-and-boundaries.md`
- Read: `skills/engineering-note-writer/references/cognition-led-composition.md`
- Read: `skills/engineering-note-writer/references/voice-rules.md`
- Read: `skills/engineering-note-writer/references/reader-prose-hard-gates.md`
- Read: `skills/engineering-note-writer/references/bilingual-writing.md`
- Read: `skills/engineering-note-writer/references/style-examples.md`
- Modify: `docs/active-work/portfolio-copy-rewrite.md`

- [x] **Step 1: Read every stage-specific writing reference in full**

Confirm the following independent gates before drafting: confirmed shared understanding, current-research layer, evidence/publication boundary, cognition-led structure, Li Zhiyi voice, bilingual equivalence, and zero-hit reader-prose L1 language.

- [x] **Step 2: Research only the technical questions exposed by the brief**

Use primary sources for:

- Cortex-M3/SysTick and STM32 HAL tick behavior;
- cooperative superloop timing and why blocking work delays other responsibilities;
- STM32F1 clock-security or HSE-to-HSI fallback behavior where official documentation supports it;
- Modbus serial timing/error concepts if needed to explain nonblocking communication;
- electronic expansion valve/superheat control principles only at the level needed to explain the later control decisions.

External research may explain present understanding. It must not create a project event, measurement, test result, or memory.

- [x] **Step 3: Recheck private repository evidence for only the excerpts and change lines that will be discussed**

Select no more than three discontinuous excerpts in total:

1. deadline-based multi-rate dispatch;
2. nonblocking EEV homing or step scheduling;
3. timeout/retry communication state or deferred persistence.

Reject excerpts containing credentials, complete tables, contiguous subsystem implementations, or enough adjacent context to reconstruct the product firmware.

- [x] **Step 4: Update the active-work fact matrix**

Record four categories in `docs/active-work/portfolio-copy-rewrite.md`:

- direct personal work/observation;
- artifact-supported implementation detail;
- company-reported result not independently verified;
- present-day technical interpretation from official research.

- [x] **Step 5: Run a claim-boundary scan**

Run:

```powershell
rg -n '25.?40|150|十余|more than ten|量产|mass production|验证|verified|proven' docs/active-work/portfolio-copy-rewrite.md docs/superpowers/specs/2026-08-14-juanyun-thermal-content-refactor-design.md
```

Expected: every numeric result is either in the confirmed-boundary section or explicitly marked company-reported and not independently verified.

## Task 2: Verify the public media and metadata checkpoint

**Files:**

- Modify: `content/media.json`
- Verify: `public/uploads/projects/juanyun-public/acunit-v21-bringup/*.jpg`
- Modify: `content/projects/juanyun-thermal-hardware.mdx`

- [x] **Step 1: Confirm the five public files and only those five files exist in the bring-up folder**

Run:

```powershell
Get-ChildItem public/uploads/projects/juanyun-public/acunit-v21-bringup -File | Select-Object Name,Length
```

Expected filenames:

- `acunit-v21-main-board-assembled.jpg`
- `acunit-v21-power-board-assembled.jpg`
- `acunit-v21-interaction-board-assembled.jpg`
- `acunit-v21-power-board-12v-test.jpg`
- `acunit-v21-power-board-24v-test.jpg`

- [x] **Step 2: Confirm each media record is bilingual and linked to the thermal project**

Run:

```powershell
rg -n 'juanyun-acunit-v21-(main-board-assembled|power-board-assembled|interaction-board-assembled|power-board-12v-test|power-board-24v-test)|juanyun-thermal-hardware' content/media.json
```

Expected: five unique IDs, five `projectSlug` assignments, and paired English/Chinese titles and captions.

- [x] **Step 3: Confirm the project exposes the folder once**

Run:

```powershell
rg -n '/uploads/projects/juanyun-public/acunit-v21-bringup' content/projects/juanyun-thermal-hardware.mdx
```

Expected: one `assetPaths` entry.

- [x] **Step 4: Validate the current content checkpoint**

Run:

```powershell
npm.cmd run validate-content
npm.cmd run validate-encoding
```

Expected before new notes: 8 projects, 22 notes, 78 media items; both commands exit 0.

## Task 3: Rewrite the project page as the product spine

**Files:**

- Modify: `content/projects/juanyun-thermal-hardware.mdx`

- [x] **Step 1: Update frontmatter without changing visual identity**

Set the date range through July 2026, replace `Public Project Archive` with a completed internship-project status, and rewrite both summaries to name the phase-change laptop cooler, BaseUnit/ACUnit split, independent end-to-end ownership, and real-hardware scope. Preserve `cover`, `featured`, existing public `assetPaths`, and empty/inaccessible private-repository links.

- [x] **Step 2: Draft the Chinese product spine**

The Chinese body must:

- explain the “small air conditioner under a laptop” without turning into marketing copy;
- distinguish BaseUnit and ACUnit and show why BaseUnit came first;
- state independent ownership of hardware, firmware, bring-up, and SOP;
- move from the BaseUnit proof to ACUnit three-board integration and the later production-line phase;
- separate personal bench/full-chain observation from company-reported later tests;
- attribute the 25–40%, more-than-ten-user, and over-150-hour figures and state that raw data was unavailable to Alvin;
- preserve the no-mass-production, incomplete-final-calibration, footprint, and portability limits;
- end at the confirmed full-chain “the board came alive” feeling and attributed magnet anecdote without inventing dialogue.

- [x] **Step 3: Adapt the English project spine**

Keep the same facts, phase boundaries, uncertainty, limitation, and emotional endpoint. Do not shorten the company-report caveat or omit the distinction between Alvin's tests and the company's later tests.

- [x] **Step 4: Add links to the four core technical notes and two new notes**

Use internal routes only:

- `/notes/juanyun-baseunit-firmware`
- `/notes/juanyun-acunit-board`
- `/notes/juanyun-acunit-firmware`
- `/notes/juanyun-acunit-automatic-control`
- `/notes/juanyun-production-line-control-panel`
- narrow archive links only where they answer a specific question.

- [x] **Step 5: Run targeted boundary checks**

Run:

```powershell
rg -n '25.?40|150|ten|十余|量产|mass production|raw|原始|公司|company|测试团队|test team' content/projects/juanyun-thermal-hardware.mdx
```

Expected: the numeric claims appear only beside attribution and inability to independently verify; no mass-production claim appears.

## Task 4: Rewrite BaseUnit as the first complete controller

**Files:**

- Modify: `content/notes/juanyun-baseunit-firmware.mdx`

- [x] **Step 1: Replace archive-distance language with the confirmed first-person account**

Explain that the simpler BaseUnit was chosen first to validate the airflow/UI side before attempting the ACUnit controller. Preserve the real responsibilities: DHT11/DHT22, presence input, fan PWM, OLED, buttons, Bluetooth telemetry, and Flash-backed settings.

- [x] **Step 2: Use repository evidence to explain the engineering decisions**

Cover the App/BSP restructuring, USART DMA telemetry, UI/state coordination, incremental display work where evidenced, and the two-page CRC/commit-marker persistence design. Do not claim a measured endurance figure or a personally observed power-cut recovery unless evidence supports it.

- [x] **Step 3: Write equivalent English after Chinese**

End at the practical change in confidence: BaseUnit proved that the first complete control chain could work and made the more complicated ACUnit a reasonable next step.

- [x] **Step 4: Validate the note**

Run:

```powershell
npm.cmd run validate-content
```

Expected: command exits 0 and the note remains public under `juanyun-thermal-hardware`.

## Task 5: Rewrite the ACUnit three-board hardware and bring-up note

**Files:**

- Modify: `content/notes/juanyun-acunit-board.mdx`

- [x] **Step 1: Reframe the note around staged bring-up**

Move from visible interfaces to why the system was split across power, main-control, and interaction boards. State Alvin's independent PCB design, assembly, soldering, and bring-up ownership.

- [x] **Step 2: Add the approved physical evidence**

Use the three assembled-board photographs and two rail-test photographs. Keep the existing interface map/renders only where they help a reader connect intended architecture to built hardware.

- [x] **Step 3: Report the bounded test results**

Include:

- 24.07 V input/bus and 12.03 V output on the power board;
- 12.03 V, 4.99 V, and 3.32 V rails on the main board;
- approximately 18 mA no-load current where the SOP records it;
- NTC around 24.7 °C against 24.8–24.9 °C references and DHT consistency;
- fan PWM/TACH, EEV, MCU/ESP/OLED/UI, and basic compressor-UART checks;
- the initial pressure-transmitter test remained unfinished;
- the interaction-board connector-order issue was corrected with a swapped cable and did not require a board respin.

Do not imply that these bring-up results prove long-term refrigeration performance.

- [x] **Step 4: Adapt an equivalent English version**

Preserve exact measurements and the same unfinished-test and no-respin boundaries.

- [x] **Step 5: Confirm every image path resolves**

Run:

```powershell
rg -o '/uploads/[^)]+' content/notes/juanyun-acunit-board.mdx
```

Expected: every reported path exists under `public/`.

## Task 6: Rewrite the planned bare-metal firmware note

**Files:**

- Modify: `content/notes/juanyun-acunit-firmware.mdx`

- [x] **Step 1: Draft the Chinese cognition trail**

Begin from the self-imposed “exam”: limited MCU, many peripherals, RTOS concepts known but no practical experience, manageable cooperative concurrency, and a deliberate wish to learn scheduling fundamentals. Then explain that App/Service/BSP and the task cadence were planned before coding.

- [x] **Step 2: Explain the five-rate scheduler accurately**

Use the evidenced responsibilities:

- 1 ms EEV stepping;
- 10 ms fan/key/encoder work;
- 100 ms compressor, sensor/network, and deferred-save work as evidenced by source;
- 500 ms OLED refresh;
- 2000 ms DHT, deferred while EEV work is active.

State that these are intended dispatch periods, not measured worst-case execution times or jitter guarantees.

- [x] **Step 3: Add one or two short decision-focused excerpts**

Prefer a shortened dispatch excerpt and a shortened nonblocking-state excerpt. Surround each with an explanation of the invariant it protects. Exclude complete functions, lookup tables, credentials, private constants, and reconstructable adjacent logic.

- [x] **Step 4: Add a compact timing diagram or pseudocode**

Use a language-neutral fenced block that shows the priority relationship without copying source:

```text
every loop:
  service due 1 ms actuator work
  advance nonblocking communication state
  run other due cadences
  defer slow sensor work while actuator timing is active
```

- [x] **Step 5: Adapt equivalent English**

Keep the project-specific motivation and emotional stakes. Avoid generic bare-metal tutorials or claims that an RTOS would have been wrong.

- [x] **Step 6: Scan for unsupported timing claims**

Run:

```powershell
rg -n 'guarantee|guaranteed|保证|抖动|jitter|worst.case|最坏|实时系统|real.time system' content/notes/juanyun-acunit-firmware.mdx
```

Expected: no hard-real-time or measured-jitter claim unless immediately bounded as unavailable.

## Task 7: Add the automatic-control note

**Files:**

- Create: `content/notes/juanyun-acunit-automatic-control.mdx`

- [x] **Step 1: Create complete bilingual frontmatter**

Use a title about turning manual EEV/compressor commands into bounded automatic control, date `2026-07-22`, public visibility, `juanyun-thermal-hardware` project link, and tags for STM32, control, EEV, compressor, and refrigeration.

- [x] **Step 2: Draft Chinese from the code-history evidence**

Explain the evolution from manual actuation to a portable control core, STOP/QUIET/PERF/ZERO modes, 200 ms compressor adjustment, 1 s EEV/safety decisions, and the engineering need for startup and sensor-validity guards.

- [x] **Step 3: Explain protections without claiming final calibration**

Discuss low and negative superheat, high condensing pressure derating, and low compressor-temperature stop as bounded control intentions present in source/history. State that the company test team reported observing real-machine changes and protection triggers, but Alvin did not personally witness or independently verify those later tests.

- [x] **Step 4: Adapt equivalent English**

Preserve the distinction between implemented logic, company-reported hardware behavior, repository regression assets, and unfinished long-term parameter calibration.

- [x] **Step 5: Verify frontmatter and links**

Run:

```powershell
npm.cmd run validate-content
```

Expected after this first new note exists: 8 projects, 23 notes, 78 media items.

## Task 8: Add the ControlPanel and maintenance-history note

**Files:**

- Create: `content/notes/juanyun-production-line-control-panel.mdx`

- [x] **Step 1: Create complete bilingual frontmatter**

Use a title about making the refrigeration controller observable during the 102-commit maintenance phase, date `2026-07-22`, public visibility, and the thermal-project link.

- [x] **Step 2: Draft the commit-history retrospective without invented memories**

Use the explicit framing “Looking back through the 102 commits…” / “现在回看这 102 条提交……”. Cover:

- raw telemetry becoming the Windows ControlPanel;
- real-time values, trends, CSV, Monitor/Debug separation, and manual control surfaces;
- mock/regression tooling as development evidence, kept separate from real-machine evidence;
- safe AUTO+STOP startup, sensor/communication validity, and HSE-to-HSI fallback diagnostics;
- the role of this tool in handing testing and maintenance to the company team.

- [x] **Step 3: Bound the company trial and endurance reports**

If these results appear here, keep the details brief and link back to the project page rather than repeating the full caveat. Still attribute them and state that raw data was not available for independent verification.

- [x] **Step 4: Adapt equivalent English**

Do not translate the retrospective into a changelog inventory. Preserve the interpretation that observability changed what the team could inspect and operate.

- [x] **Step 5: Confirm the private repository is not exposed as a public link**

Run:

```powershell
rg -n 'github.com/Awes0meE/Cirro_STM32F1_Product_(ACUnit|Base)_FW' content/projects/juanyun-thermal-hardware.mdx content/notes/juanyun-*.mdx
```

Expected: zero public-body links to inaccessible private repositories.

- [x] **Step 6: Validate both new notes**

Run:

```powershell
npm.cmd run validate-content
```

Expected: 8 projects, 24 notes, 78 media items; command exits 0.

## Task 9: Run prose, bilingual, duplication, and documentation gates

**Files:**

- Modify: all six edited/created MDX files
- Modify: `docs/active-work/portfolio-copy-rewrite.md`
- Modify: `docs/superpowers/specs/2026-08-14-juanyun-thermal-content-refactor-design.md`

- [x] **Step 1: Read `references/self-review.md` in full**

Apply its Truth, Li Zhiyi, bilingual, evidence, and reader-prose checks independently to the project page and each first-person note.

- [x] **Step 2: Run the repository's reader-prose hard-gate scans**

Use the exact commands and patterns from `reader-prose-hard-gates.md`. Expected: zero applicable L1 hits in model-authored project/note bodies after excluding metadata, code, paths, links, and verbatim evidence.

- [x] **Step 3: Compare Chinese and English substance**

For each page, verify both language sections contain the same ownership, direct-test, company-report, uncertainty, limitation, and emotional claims. Repair any one-sided detail rather than translating word-for-word.

- [x] **Step 4: Check cross-page duplication**

Search distinctive project sentences and caveat phrases across the six files. Expected: shared facts may recur briefly, but no paragraph, ownership list, complete trial caveat, or closing reflection is reused verbatim.

- [x] **Step 5: Update durable work status**

Mark the design as implemented and awaiting bilingual copy review. Replace stale active-work counts and validation statements; do not append duplicate history.

- [x] **Step 6: Prepare conditional commit checkpoints**

Do not commit without explicit authorization. If authorization is granted, use scoped Conventional Commits such as:

```text
feat(content): add juanyun bring-up evidence
docs(content): rewrite juanyun hardware and firmware notes
feat(content): document juanyun automatic control phase
docs(content): complete juanyun bilingual project narrative
```

## Task 10: Full repository and browser verification

**Files:**

- Verify: all changed files

- [x] **Step 1: Run static checks sequentially**

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

- every command exits 0;
- 8 projects, 24 notes, and 78 media items validate;
- UTF-8 validation reports no invalid text;
- production dependency audit reports zero known vulnerabilities.

- [x] **Step 2: Start the production build locally without colliding with another Next process**

Confirm no existing dev/build process is writing `.next`, then serve the built site on an available local port.

- [x] **Step 3: Review desktop and mobile routes in both languages**

Review:

- `/`
- `/work`
- `/media`
- `/work/juanyun-thermal-hardware`
- `/notes/juanyun-baseunit-firmware`
- `/notes/juanyun-acunit-board`
- `/notes/juanyun-acunit-firmware`
- `/notes/juanyun-acunit-automatic-control`
- `/notes/juanyun-production-line-control-panel`

Verify covers remain unchanged, five new photographs render, language switching preserves equivalent content, tables/code/images do not overflow, internal links resolve, and private source is absent.

- [x] **Step 4: Inspect the final diff and worktree**

Run:

```powershell
git status --short --branch
git diff --stat
git diff -- content/projects/juanyun-thermal-hardware.mdx content/notes/juanyun-baseunit-firmware.mdx content/notes/juanyun-acunit-board.mdx content/notes/juanyun-acunit-firmware.mdx content/notes/juanyun-acunit-automatic-control.mdx content/notes/juanyun-production-line-control-panel.mdx
```

Expected: only the Juanyun content, reviewed media, design/plan, inventory, and active-work documentation are changed. No commit, push, pull request, or merge occurs before explicit user approval.
