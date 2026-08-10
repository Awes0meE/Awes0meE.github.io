# Engineering Note Writer Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `subagent-driven-development` for independent old/new behavior trials and `executing-plans` for the repository edits. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the template-driven portfolio writing skill with an evidence-grounded, material-led learning-note writer that carries approximately 75 percent narrative energy in Chinese and 60 percent in English.

**Architecture:** Keep `SKILL.md` as a concise workflow router. Move factual boundaries, material-led composition, voice/rhythm, bilingual adaptation, final review, and imitable examples into focused references. Preserve five identical-input baseline/revised output pairs under `tests/` and score them with one qualitative rubric.

**Tech Stack:** Markdown skill files, YAML agent metadata, Git history for baseline isolation, Codex subagent trials, PowerShell, `rg`, the Codex skill validator, and the repository's npm validation commands.

---

## File Map

Create:

- `skills/engineering-note-writer/references/evidence-and-boundaries.md`: pre-draft fact, authorship, uncertainty, and public-boundary rules.
- `skills/engineering-note-writer/references/material-led-composition.md`: narrative-force, beat-map, detour, ending, and content-derived heading guidance.
- `skills/engineering-note-writer/references/style-examples.md`: engineering-note before/after examples and explanations.
- `skills/engineering-note-writer/tests/rubric.md`: qualitative old/new scoring criteria without style quotas.
- `skills/engineering-note-writer/tests/inputs/01-smart-car.md`: course-project test material.
- `skills/engineering-note-writer/tests/inputs/02-seamly2d-packaging.md`: toolchain/debugging test material.
- `skills/engineering-note-writer/tests/inputs/03-hardware-archive.md`: incomplete hardware evidence test material.
- `skills/engineering-note-writer/tests/inputs/04-sparse-unknowns.md`: hallucination-resistance test material.
- `skills/engineering-note-writer/tests/inputs/05-bilingual-rewrite.md`: Chinese/English intensity test material.
- `skills/engineering-note-writer/tests/baseline-outputs/01-smart-car.md` through `05-bilingual-rewrite.md`: outputs from the current skill.
- `skills/engineering-note-writer/tests/revised-outputs/01-smart-car.md` through `05-bilingual-rewrite.md`: outputs from the redesigned skill.
- `skills/engineering-note-writer/tests/comparison.md`: case-by-case rubric result and remaining risks.
- `skills/engineering-note-writer/tests/provenance.md`: source snapshot, fresh-agent protocol, hashes, and audit limitations for the retained trials.

Rewrite:

- `skills/engineering-note-writer/SKILL.md`: concise material-led workflow and reference routing.
- `skills/engineering-note-writer/agents/openai.yaml`: updated trigger-facing UI description and prompt.
- `skills/engineering-note-writer/references/voice-rules.md`: rename responsibility to Chinese voice/rhythm and remove duplicated gates.
- `skills/engineering-note-writer/references/bilingual-writing.md`: implement the 75/60 relationship and natural English adaptation.
- `skills/engineering-note-writer/references/self-review.md`: final-reader review only.

Remove after replacements exist:

- `skills/engineering-note-writer/references/hard-gated-checklist.md`.
- `skills/engineering-note-writer/references/note-archetypes.md`.

Synchronize only routing text:

- `CODEX.md`.
- `docs/content-workflow.md`.
- `docs/agent-skills.md`.

Do not modify `content/notes/*.mdx`, application code, package files, or deployment configuration.

### Task 1: Freeze The Test Contract

- [x] **Step 1: Create the qualitative rubric before changing the skill**

Write `tests/rubric.md` with these required checks:

```text
F1 Facts: every action, tool, result, and emotion is supported.
F2 Unknowns: missing authorship, dates, results, and paths stay unknown.
C1 Composition: section order follows the material rather than a named archetype.
C2 Headings: headings describe their following content; count is <= 15; no framework headings.
V1 Chinese voice: concrete, emotionally present, lightly humorous, technically exact.
V2 Humor: comes from observed friction; no invented scene and no target-directed ridicule.
B1 English: same facts and narrative nodes, with lower intensity and natural English phrasing.
R1 Reader flow: each move adds a fact, question, interpretation, emotion, or evidence.
T1 Template residue: no mandatory retrospective, file section, future-work section, or visible checklist wrapper.
```

- [x] **Step 2: Create five self-contained inputs**

Each input must include the source facts, explicit unknowns, requested output shape, and public constraints. Use real repository facts but do not copy an existing note body as the desired answer.

- [x] **Step 3: Verify the inputs contain no expected prose or leaked diagnosis**

Run:

```powershell
rg -n "expected answer|should write|新版应该|起点.*回头看" skills\engineering-note-writer\tests\inputs
```

Expected: no matches.

### Task 2: Capture Current-Skill Baselines

- [x] **Step 1: Run independent baseline trials before editing runtime skill files**

Give each fresh agent only the current skill path and one input file. Use this prompt shape:

```text
Use the engineering-note-writer skill at <absolute skill path> to complete the writing request in <absolute input path>. Return the finished output only. Do not review the skill or explain your process.
```

- [x] **Step 2: Save raw outputs without polishing**

Place each response in the matching `tests/baseline-outputs/*.md` file. Prefix only this provenance block:

```yaml
---
trial: baseline
input: <matching input filename>
skill_revision: pre-redesign working tree
---
```

- [x] **Step 3: Score baseline behavior**

Record only observable results in `tests/comparison.md`: repeated headings, fixed order, unsupported claims, tone, English compression, and reader-flow breaks.

### Task 3: Replace The Runtime Writing Model

- [x] **Step 1: Rewrite `SKILL.md`**

The file must contain:

```text
1. Trigger metadata covering project/note/media prose and bilingual learning notes.
2. One core identity sentence for Li Zhiyi's portfolio voice.
3. Non-negotiable facts/authorship/public-boundary rules.
4. Reference routing by task stage.
5. Material-led workflow: fact boundary -> narrative force -> beat map -> Chinese draft -> derived headings -> English adaptation -> final review.
6. Heading rules: derive after drafting, content-specific, <= 15, no framework labels.
7. No fixed standalone output wrapper.
8. AddProject cooperation boundary.
```

- [x] **Step 2: Create `evidence-and-boundaries.md`**

Move only pre-draft constraints into this file. Require concrete evidence for first-person action and emotion; keep indirect evidence indirect; distinguish writing safety from AddProject's file-publication decisions.

- [x] **Step 3: Create `material-led-composition.md`**

Define narrative force, information moves, brief detours, callbacks, organic endings, and content-derived headings. Explicitly reject named note archetypes and mandatory section sequences.

- [x] **Step 4: Rewrite `voice-rules.md`**

Implement Chinese 75-percent narrative energy through concrete entry, rhythm variation, supported reactions, light self-mockery, and friction-based humor. Do not prescribe copied catchphrases, profanity, or quotas.

- [x] **Step 5: Rewrite `bilingual-writing.md`**

Require the same factual and narrative nodes in both languages. Keep English around 60-percent intensity through restrained slang/punctuation while preserving humor targets and writer attitude.

- [x] **Step 6: Rewrite `self-review.md`**

Review the finished text in four passes: fact/unknowns, material-led flow, voice/humor, bilingual/MDX. Do not repeat pre-draft intake instructions.

- [x] **Step 7: Create `style-examples.md`**

Include at least four short engineering-specific transformations: template heading replacement, evidence-grounded humor, natural technical explanation, and Chinese-to-English intensity adaptation. Explain the transferable move rather than prescribing exact wording.

- [x] **Step 8: Update `agents/openai.yaml`**

Keep `display_name` stable. Update `short_description` and `default_prompt` so they route to the material-led workflow without summarizing every implementation step.

- [x] **Step 9: Remove obsolete duplicated references**

Delete `hard-gated-checklist.md` and `note-archetypes.md` only after no runtime or documentation reference points to them.

### Task 4: Synchronize Repository Routing

- [x] **Step 1: Update `CODEX.md` writing direction**

Replace the archetype/checklist description with the new references and material-led heading rule. Do not change unrelated project state or deployment instructions.

- [x] **Step 2: Update `docs/content-workflow.md`**

Remove recommended framework headings. State that headings name real technical subjects and remain at or below 15 per note.

- [x] **Step 3: Update `docs/agent-skills.md`**

List the new reference files and summarize the material-led, 75/60 bilingual behavior.

- [x] **Step 4: Prove no stale reference remains**

Run:

```powershell
rg -n "hard-gated-checklist|note-archetypes|Starting Point / 起点|Looking Back / 回头看" skills\engineering-note-writer CODEX.md docs\content-workflow.md docs\agent-skills.md
```

Expected: no runtime routing references or recommended template headings. Historical test outputs may still contain them and are excluded from this command.

### Task 5: Run Revised Trials

- [x] **Step 1: Validate the skill structure before behavioral trials**

Run:

```powershell
$env:PYTHONUTF8='1'
python "C:\Users\123\.codex\skills\.system\skill-creator\scripts\quick_validate.py" "skills\engineering-note-writer"
```

Expected: skill validation passes.

- [x] **Step 2: Run fresh independent revised trials**

Use the same prompt shape and identical `tests/inputs/*.md` files. Do not expose baseline outputs or the comparison diagnosis to revised-trial agents.

- [x] **Step 3: Save raw revised outputs**

Use the same provenance header with `trial: revised` and `skill_revision: redesigned working tree`.

- [x] **Step 4: Complete the comparison**

Score every rubric item with concrete excerpts or heading names. Record regressions as well as improvements. Revise the skill only for failures observed in the trials.

- [x] **Step 5: Re-run any case affected by a revision**

Replace that revised output with a fresh independent run and update its comparison evidence.

### Task 6: Repository Verification And Review

- [x] **Step 1: Validate UTF-8 and Markdown whitespace**

Run:

```powershell
npm.cmd run validate-encoding
git diff --check
```

Expected: both commands exit 0.

- [x] **Step 2: Run repository checks required for documentation/content-adjacent edits**

Run:

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
```

Expected: all commands exit 0.

- [x] **Step 3: Confirm scope**

Run:

```powershell
git diff --name-only
git status --short
```

Expected: changes are limited to the design/plan docs, `engineering-note-writer`, its tests, and the three routing documents. No `content/notes/*.mdx` file appears.

- [x] **Step 4: Perform final skill review**

Check the diff for duplicated runtime rules, fixed structures, copied Khazix catchphrases, unsupported intensity quotas, stale paths, and test leakage.

- [x] **Step 5: Leave changes uncommitted**

Report the suggested Conventional Commit message without executing it:

```text
refactor(skills): make engineering notes material-led
```
