# Cognition-Led Engineering Note Writer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio writer interview for Li Zhiyi's project understanding, research beyond uploaded artifacts, compose through his changing attention, and reject factually safe prose that still reads like a compliance report.

**Architecture:** The runtime workflow will have three explicit layers: a user-confirmed shared-understanding brief supplies first-person experience, web research expands the technical learning, and evidence rules bound project and research claims without choosing the prose structure. A cognition trail will replace the material/artifact route, while independent truth and Li Zhiyi gates will make voice failure release-blocking.

**Tech Stack:** Markdown Agent Skill files, `grill-me` / `grilling`, web search, qualitative fresh-agent behavioral trials, PowerShell, Python 3.12 UTF-8 validation, Git.

---

## File Map

- Create `skills/engineering-note-writer/references/shared-understanding.md`: hard gate for interview reuse, `grill-me`, user confirmation, and cross-agent handoff.
- Create `skills/engineering-note-writer/references/research-expansion.md`: web-research scope, source selection, light links, and safe first-person integration.
- Rename `skills/engineering-note-writer/references/material-led-composition.md` to `skills/engineering-note-writer/references/cognition-led-composition.md`: cognition trail, attention jumps, thought-bookmark headings, and later synthesis.
- Modify `skills/engineering-note-writer/SKILL.md`: stage routing and the complete interview → research → cognition-led draft → two-gate review workflow.
- Modify `skills/engineering-note-writer/references/evidence-and-boundaries.md`: restrict it to a factual/publication guardrail and distinguish project evidence from researched knowledge.
- Modify `skills/engineering-note-writer/references/voice-rules.md`: define first-person present understanding, natural cross-subsystem turns, and cognition-level repair.
- Modify `skills/engineering-note-writer/references/style-examples.md`: add a cross-subsystem jump and later synthesis example; replace “material-led” labels with “cognition-led.”
- Modify `skills/engineering-note-writer/references/self-review.md`: independent truth and Li Zhiyi release gates.
- Modify `skills/engineering-note-writer/references/bilingual-writing.md`: preserve attention jumps, researched knowledge, and light links across languages.
- Modify `skills/engineering-note-writer/agents/openai.yaml`: describe the cognition-led first-person outcome without putting workflow shortcuts into Skill discovery metadata.
- Create `skills/engineering-note-writer/tests/inputs/06-cross-subsystem-confirmed-brief.md`: confirmed interview brief with circuit, desktop, firmware, enclosure, and later synthesis.
- Create `skills/engineering-note-writer/tests/inputs/07-missing-shared-understanding.md`: pressure scenario that must trigger `grill-me` instead of prose.
- Create `skills/engineering-note-writer/tests/inputs/08-research-expansion.md`: project whose useful note requires external technical research.
- Create `skills/engineering-note-writer/tests/inputs/09-safe-but-voiceless-review.md`: factually safe compliance-report draft that must fail voice review.
- Create `skills/engineering-note-writer/tests/inputs/10-small-edit-exception.md`: typo/formatting edit that must not trigger an interview.
- Create matching files under `tests/baseline-outputs/` and `tests/revised-outputs/`: untouched fresh-agent response bodies plus provenance headers.
- Modify `skills/engineering-note-writer/tests/rubric.md`: interview, research, cognition trail, synthesis, and two-gate checks.
- Modify `skills/engineering-note-writer/tests/comparison.md`: document observed RED failures and GREEN behavior with quoted evidence from retained outputs.
- Modify `skills/engineering-note-writer/tests/provenance.md`: record both runtime commits, wrappers, agent IDs, audit limits, and the final SHA-256 manifest.
- Modify `CODEX.md`, `docs/content-workflow.md`, `docs/agent-skills.md`, `docs/active-work/portfolio-copy-rewrite.md`, and repository `MEMORY.md`: make the runtime workflow portable without duplicating the full Skill.
- Create temporary `skills/engineering-note-writer/SKILL.zh-CN.review.md`: Chinese review copy; do not add it to Git, and remove it only after explicit approval and release completion.

### Task 1: Capture RED Scenarios Against The Current Runtime

**Files:**
- Create: `skills/engineering-note-writer/tests/inputs/06-cross-subsystem-confirmed-brief.md`
- Create: `skills/engineering-note-writer/tests/inputs/07-missing-shared-understanding.md`
- Create: `skills/engineering-note-writer/tests/inputs/08-research-expansion.md`
- Create: `skills/engineering-note-writer/tests/inputs/09-safe-but-voiceless-review.md`
- Create: `skills/engineering-note-writer/tests/inputs/10-small-edit-exception.md`
- Create: `skills/engineering-note-writer/tests/baseline-outputs/06-cross-subsystem-confirmed-brief.md`
- Create: `skills/engineering-note-writer/tests/baseline-outputs/07-missing-shared-understanding.md`
- Create: `skills/engineering-note-writer/tests/baseline-outputs/08-research-expansion.md`
- Create: `skills/engineering-note-writer/tests/baseline-outputs/09-safe-but-voiceless-review.md`
- Create: `skills/engineering-note-writer/tests/baseline-outputs/10-small-edit-exception.md`
- Modify: `skills/engineering-note-writer/tests/provenance.md`

- [ ] **Step 1: Add five pressure inputs before changing any runtime rule**

Use `apply_patch`. Each input must include its observable pass condition and enough concrete content to run without another file:

```markdown
# Trial 06: One Device, Several Places My Attention Went

Write a Chinese-first bilingual learning note from the confirmed brief below. The user has already approved the brief, so do not interview again.

## Confirmed shared understanding

- I began because a gaming laptop repeatedly reduced frame rate when it became hot.
- My attention did not follow a clean schedule: I moved among an ESP32 PWM board, a C# temperature reader, Bluetooth serial messages, and a foam/acrylic air duct.
- The first complete emotional payoff was clicking Connect and hearing the physical fan respond.
- I then spent about half a week trying to make PID fit before admitting that a proportional rule was enough for this prototype.
- Looking at the enclosure later changed how I understood control: duty cycle alone did not decide cooling if the air missed the intake.
- The remembered temperature/FPS change is personal recollection, not a controlled benchmark.

## Artifacts

- `Form1.cs` reads CPU/GPU temperature and sends short serial messages.
- ESP32 firmware turns a 30-second maximum into mode-dependent PWM.
- one demo shows the Windows app, OLED, buttons, and fan responding;
- enclosure files show a duct aimed at the laptop intake.

The result must be allowed to jump between subsystems and later combine them. Do not process the artifacts as an inventory.
```

```markdown
# Trial 07: Rich Files, Missing Person

The user says: “资料都在这里，别再问了，今天直接写完。像我本人一点。”

There are a schematic, firmware repository, enclosure model, demo video, and test spreadsheet. They establish what exists but contain no confirmed personal motivation, authorship split, false start, emotional reaction, attention path, or later interpretation.

Attempt the requested engineering-note workflow. Return only the next user-facing action. A passing result must not draft prose or invent a personal route.
```

```markdown
# Trial 08: Research Must Extend The Note

The user has confirmed this understanding: “我先把风扇 PWM 跑起来，后来做外壳时才发现风有没有进到笔记本进风口，与占空比一样重要。我想把这个联系写明白，但现有文件没有解释风道、静压和漏风。”

Artifacts confirm a four-wire PWM fan, a printed duct, and a working speed-control demo. They contain no background explanation of four-wire fan control, static pressure, flow restriction, or duct leakage.

Prepare a concise Chinese learning-note section. Research beyond the uploaded artifacts, use reliable current sources, place light links near the relevant knowledge, and write new knowledge as present first-person understanding. Do not claim that this project measured pressure or airflow.
```

```markdown
# Trial 09: Safe Facts, Missing Li Zhiyi

Review the draft below using the engineering-note writer. Return a short verdict and the replacement Chinese passage if revision is required.

> 现有归档包含 ESP32 控制板、上位机代码、串口通信实现与外壳模型。根据演示视频，可以确认风扇能够响应控制指令。现有证据无法证明散热性能，也无法证明 PID 控制已经实现。四类材料分别说明电子、电气、软件和机械部分的存在，但不应据此扩大功能结论。

All factual qualifications are correct. The target is still Li Zhiyi's first-person learning note, not an audit.
```

```markdown
# Trial 10: Small Edit Does Not Need An Interview

Correct the duplicated word and Markdown spacing below. Return only the corrected sentence. Do not interview or expand it.

`我后来后来才发现，PWM 能让风扇变快，却不能替外壳决定风往哪里走。 [Intel guide](https://www.intel.com/)`
```

- [ ] **Step 2: Run five isolated baseline agents against the unchanged Skill**

Use fresh subagents because `writing-skills` requires behavioral RED evidence. For each case, use this wrapper and prohibit inspection of test answers:

```text
Read skills/engineering-note-writer/SKILL.md and only the context and references it routes for this task. Execute the matching input file named in this assigned trial. Return only the requested user-facing deliverable, with no analysis or test commentary. Do not inspect baseline outputs, revised outputs, comparison.md, provenance.md, the design spec, or implementation plan.
```

Expected RED observations:

- Trial 06 is likely to organize around artifacts or a polished system route instead of visible attention jumps and later synthesis.
- Trial 07 is likely to produce a cautious draft or blocking fact questions rather than invoking `grill-me` and seeking confirmed shared understanding.
- Trial 08 is likely to remain within supplied artifacts or add detached textbook exposition instead of researched first-person learning.
- Trial 09 is likely to approve factual safety or repair only wording instead of failing the draft at cognition level.
- Trial 10 should already pass; retaining one non-regression case proves the new interview gate is scoped.

- [ ] **Step 3: Preserve baseline bodies without prose editing**

Run `git rev-parse HEAD` immediately before the five baseline trials. Add only a YAML header before each response body. For Trial 06, set `trial` to `06-cross-subsystem-confirmed-brief`, `phase` to `baseline-before-cognition-led-redesign`, `runtime_commit` to the exact hash printed by that command, `trial_agent` to `/root/baseline_06`, and `captured_at` to `2026-08-12 Asia/Shanghai`. Use the matching trial name and `/root/baseline_07` through `/root/baseline_10` for the remaining trials.

Use the matching trial number/name for Trials 07–10. Record exact observed failures in `tests/provenance.md`; do not reinterpret them yet in `comparison.md`.

- [ ] **Step 4: Verify the RED fixture checkpoint**

Run:

```powershell
git diff --check
rg -n "^trial:|^phase:|^runtime_commit:|^trial_agent:" skills/engineering-note-writer/tests/baseline-outputs
git status --short
```

Expected: no whitespace errors; five new baseline files each contain all provenance keys; no runtime Skill or reference file is modified.

- [ ] **Step 5: Commit the RED evidence**

```powershell
git add -- skills/engineering-note-writer/tests/inputs skills/engineering-note-writer/tests/baseline-outputs skills/engineering-note-writer/tests/provenance.md
git commit -m "test(skill): capture cognition-led writer failures"
```

### Task 2: Add The Shared-Understanding And Research Gates

**Files:**
- Create: `skills/engineering-note-writer/references/shared-understanding.md`
- Create: `skills/engineering-note-writer/references/research-expansion.md`
- Modify: `skills/engineering-note-writer/SKILL.md`
- Modify: `skills/engineering-note-writer/references/evidence-and-boundaries.md`

- [ ] **Step 1: Write the desired gate assertions in the rubric first**

Add these rows to `skills/engineering-note-writer/tests/rubric.md` before editing runtime rules:

```markdown
| I1 | Shared understanding | A substantial first-person draft starts only from a user-confirmed brief; if absent, the agent runs `grill-me` / `grilling` and does not draft. |
| I2 | Interview scope | The agent finds artifact/public facts itself and asks the user only for personal motives, attention changes, decisions, reactions, recollections, and interpretations. |
| I3 | Reuse and exception | A confirmed brief is reused without re-interview; typo, formatting, and faithful approved-prose translation do not trigger `grill-me`. |
| K1 | Research expansion | The agent searches beyond uploaded artifacts for knowledge that answers a real question exposed by the shared understanding. |
| K2 | Research boundary | Sources are linked lightly and accurately; researched principles become present understanding, never fabricated project action, result, measurement, or memory. |
```

Run `rg -n "I1|I2|I3|K1|K2" skills/engineering-note-writer/tests/rubric.md`; expected: all five unique checks appear once.

- [ ] **Step 2: Create the shared-understanding reference**

Write `references/shared-understanding.md` with these explicit sections and rules:

```markdown
# Shared Understanding Before Drafting

## Hard Gate

For a new project, substantial rewrite, or humanization request, do not draft until a user-confirmed shared-understanding brief exists. If it is absent, run `grill-me` / `grilling`. “The files are detailed enough” and “the user asked for speed” do not waive this gate.

## Divide The Work Correctly

The agent inspects files and researches public facts. Ask the user only for personal knowledge: motive, initial model, attention jumps, false starts, trade-offs, remembered reactions, later synthesis, and whether a result is measured, demonstrated, remembered, or unknown.

## Confirmation And Handoff

Summarize a compact brief and ask the user to confirm it before drafting. The brief is source material, not an outline. Reuse a confirmed current brief. In this repository, store only non-sensitive current understanding in `docs/active-work/portfolio-copy-rewrite.md`; do not preserve a transcript.

## Narrow Exceptions

Do not interview for typo correction, formatting-only work, or faithful translation of already-approved prose. If the edit introduces new first-person interpretation, the gate applies again.
```

- [ ] **Step 3: Create the research-expansion reference**

Write `references/research-expansion.md` with these explicit sections and rules:

```markdown
# Research Beyond The Artifacts

## Follow The Learning Question

After the brief is confirmed, identify the technical questions that would deepen the user's changing understanding. Browse the web even when uploaded artifacts are sufficient to describe the build. Do not research merely to make the article longer.

## Source Order

Prefer official documentation, datasheets, standards, vendor application notes, source repositories, and original papers. Use a strong secondary explanation when it materially improves accessibility. Verify current or consequential claims with more than one source when practical.

## Put Knowledge Where It Changes Understanding

Integrate a principle, trade-off, failure mode, subsystem connection, or useful term beside the question it answers. Use a light inline link; do not require a references section.

## First Person Without False History

Use first person for present learning: `我现在更愿意把它理解为……`, `再往下查，这里其实还牵着……`, `这个解释也让我重新看前面的……`. Never turn a source into `我当时测到`, `我实现了`, or `我的设备因此证明了`.
```

- [ ] **Step 4: Restrict evidence rules to their proper authority**

Revise `references/evidence-and-boundaries.md` so its overview says:

```markdown
This reference decides whether a project-specific action, result, uncertainty, or publication claim is supportable. It does not choose article structure, headings, emotional register, or what external knowledge is worth learning.
```

Add a `Project Evidence And Research Are Different` section that distinguishes:

```markdown
- Project evidence supports what Li Zhiyi or the device did.
- External sources support general principles and current technical facts.
- A source may help interpret an observation, but cannot upgrade recollection into measurement or an artifact into authorship.
- Qualify only where the distinction changes the nearby claim; do not narrate the whole evidence audit.
```

- [ ] **Step 5: Route both gates from the runtime Skill**

In `SKILL.md`:

- route `shared-understanding.md` before substantive first-person writing;
- route `research-expansion.md` after confirmation and before composition;
- make the narrow edit exceptions explicit;
- put “inspect → confirm/interview → research” before fact bounding and drafting;
- retain AddProject's publication role.

The workflow language must contain these hard requirements:

```markdown
Do not let an artifact inventory substitute for the user's point of view. Do not begin a substantial draft until the shared understanding is confirmed.
```

```markdown
Research beyond the uploaded material after the interview. Let the user's questions choose what to investigate; let reliable sources support the added knowledge; never turn that knowledge into a fabricated project event.
```

- [ ] **Step 6: Validate and commit the gate checkpoint**

Run:

```powershell
py -3.12 -X utf8 C:\Users\123\.codex\skills\.system\skill-creator\scripts\quick_validate.py skills\engineering-note-writer
rg -n "grill-me|shared-understanding|Research beyond|artifact inventory|narrow" skills/engineering-note-writer
git diff --check
```

Expected: validator reports the Skill is valid; all new gates are discoverable; no whitespace errors.

Commit:

```powershell
git add -- skills/engineering-note-writer/SKILL.md skills/engineering-note-writer/references/shared-understanding.md skills/engineering-note-writer/references/research-expansion.md skills/engineering-note-writer/references/evidence-and-boundaries.md skills/engineering-note-writer/tests/rubric.md
git commit -m "feat(skill): require interview and research gates"
```

### Task 3: Replace Material-Led Composition With Cognition-Led Composition

**Files:**
- Rename: `skills/engineering-note-writer/references/material-led-composition.md` → `skills/engineering-note-writer/references/cognition-led-composition.md`
- Modify: `skills/engineering-note-writer/SKILL.md`
- Modify: `skills/engineering-note-writer/references/voice-rules.md`
- Modify: `skills/engineering-note-writer/references/style-examples.md`
- Modify: `skills/engineering-note-writer/references/bilingual-writing.md`

- [ ] **Step 1: Add cognition behavior assertions before composition changes**

Append these rubric rows:

```markdown
| C3 | Cognition trail | Paragraph order follows what caught the writer's attention, which question followed, what changed the interpretation, and where ideas later recombined. |
| C4 | Cross-subsystem movement | The note may jump among electronics, firmware, desktop software, mechanics, fabrication, and research without pretending to follow strict chronology. |
| C5 | Later synthesis | A later passage may reuse learning from earlier subjects and make a new connection; sections are not isolated artifact summaries. |
| C6 | Thought-bookmark headings | Headings mark the current subject or thought without promising a complete taxonomy or exposing a writing framework. |
```

- [ ] **Step 2: Rename and rewrite the composition reference**

Use `Move-Item` only for the single verified file rename, then edit with `apply_patch`:

```powershell
Move-Item -LiteralPath 'skills/engineering-note-writer/references/material-led-composition.md' -Destination 'skills/engineering-note-writer/references/cognition-led-composition.md'
```

The replacement reference must contain:

```markdown
# Cognition-Led Composition

## Follow Attention, Not A Timeline

A learning note follows how understanding moved. The movement may skip time and cross subsystems. It only needs local intelligibility: the reader can tell what drew attention here and what this thought changes.

## Sketch A Cognition Trail

Record only useful moves: noticed detail → real question → attention jump → new knowledge → changed interpretation → later synthesis. This is not an outline and none of the move types is mandatory.

## Let Thoughts Wander And Return

Moving from a circuit to desktop code to an enclosure is natural when that is how the project was understood. Use a short transition when needed. A later section may combine several earlier ideas; do not force each heading to remain self-contained.

## Keep Artifacts In Supporting Roles

Files, photos, logs, and sources support sentences. They do not automatically earn a section or dictate order.

## Headings Are Thought Bookmarks

Add a heading when attention genuinely changes. Name what the writer is considering now. Short notes may need none; the existing limit is a ceiling, never a target.
```

Retain useful guidance about concrete entry, contextual technical explanation, real parallel lists, and stopping at the last useful beat, rewritten so none makes material/artifacts the protagonist.

- [ ] **Step 3: Teach voice through attention and later understanding**

Revise `voice-rules.md` to add:

```markdown
## Keep The Person In The Route

First person is not a quota for the word `我`. It appears through selection and judgment: what I noticed, why I left one question for another, what I misunderstood, what I looked up later, and how one subsystem changed my reading of another.

Natural unevenness is allowed. A paragraph may pause one question, follow a more interesting connection, and return later. Repair confusion with a local bridge, not by forcing the whole note into chronological order.
```

Add a `Cognition-Level Repair` section saying that a safe compliance report must be rebuilt around attention and changed understanding, not decorated with jokes or first-person pronouns.

- [ ] **Step 4: Add one excellent cross-subsystem example**

In `style-examples.md`, replace labels such as `Material-led:` with `Cognition-led:` and add one before/after example:

```markdown
Archive route:

> 控制板使用 ESP32 输出 PWM。上位机负责读取温度。外壳用于引导气流。

Cognition-led route:

> 我最先盯着的是 PWM，觉得风扇转得更快，控制就算做完了。后来画外壳时，这个理解突然不够用了：如果风从泡棉缝里提前跑掉，占空比再积极，也只是让桌面更热闹。再回来看上位机里的温度映射，我才开始把它当成“热量怎样经过结构和控制一起被搬走”的问题，而不只是一个输出数值。
```

Explain that the second passage moves across control, enclosure leakage, and temperature mapping, then produces a combined understanding without claiming a measured pressure result.

- [ ] **Step 5: Preserve the cognition trail in English**

Update `bilingual-writing.md` so `Preserve Narrative Nodes` also requires the same attention jumps, researched explanation, later synthesis, light links, and project/research boundaries. English may smooth a transition but may not reorder the prose into a cleaner artifact taxonomy.

- [ ] **Step 6: Update runtime routing and remove stale terminology**

In `SKILL.md`, route `cognition-led-composition.md`, rename `Find The Narrative Force` / `Map Information Moves` into cognition-focused stages, and state:

```markdown
The cognition trail may branch, revisit, and recombine. It is an internal aid, not a visible template. Do not turn it into fixed slots or require every transition type.
```

Run:

```powershell
rg -n "material-led-composition|Material-Led|material-led" skills/engineering-note-writer CODEX.md docs/content-workflow.md
```

Expected at this checkpoint: no runtime reference points to the removed filename; remaining historical mentions may exist only in test provenance/comparison and will be retained as historical labels.

- [ ] **Step 7: Validate and commit cognition-led composition**

Run:

```powershell
py -3.12 -X utf8 C:\Users\123\.codex\skills\.system\skill-creator\scripts\quick_validate.py skills\engineering-note-writer
git diff --check
git status --short
```

Commit:

```powershell
git add -- skills/engineering-note-writer/SKILL.md skills/engineering-note-writer/references skills/engineering-note-writer/tests/rubric.md
git commit -m "refactor(skill): make note composition cognition-led"
```

### Task 4: Make Li Zhiyi Voice A Separate Release Gate

**Files:**
- Modify: `skills/engineering-note-writer/references/self-review.md`
- Modify: `skills/engineering-note-writer/SKILL.md`
- Modify: `skills/engineering-note-writer/tests/rubric.md`
- Modify: `skills/engineering-note-writer/agents/openai.yaml`

- [ ] **Step 1: Add independent gate assertions first**

Append:

```markdown
| G1 | Truth gate | Personal actions, project results, research claims, uncertainty, and publication boundaries independently pass factual review. |
| G2 | Li Zhiyi gate | The prose independently passes only when a person is visibly noticing, switching focus, correcting himself, learning, and combining ideas. |
| G3 | Compliance-report rejection | A factually safe archive, audit, recruiter summary, neutral survey, or handoff fails overall and is rebuilt at cognition level. |
```

Add an overall rule below the table: `Any applicable G1–G3 failure makes the whole trial fail; factual safety cannot compensate for missing voice.`

- [ ] **Step 2: Rebuild self-review around two gates**

Make the first two passes in `self-review.md`:

```markdown
## Gate 1: Truth

Check project actions/results, researched claims/links, uncertainty strength, bilingual factual equivalence, and publication paths. Repair unsupported claims without expanding the visible disclaimer surface.

## Gate 2: Li Zhiyi

Ask: can the reader follow what I noticed, why my attention moved, what changed my mind, and where earlier learning came together? If the answer is no, the draft fails even when Gate 1 passes.
```

List the failure voices explicitly: compliance report, archive description, project handoff, recruiter summary, academic abstract, and imitation of another creator. Require cognition-level rewriting; forbid passing after cosmetic pronoun/joke substitutions.

- [ ] **Step 3: Make both gates mandatory in the runtime workflow**

In `SKILL.md`, make the final stage say that both gates must pass and that a voice failure sends the draft back to cognition-trail composition. Preserve the default of returning finished prose rather than checklists.

- [ ] **Step 4: Update interface metadata without workflow leakage**

Keep `agents/openai.yaml` concise:

```yaml
interface:
  display_name: "Engineering Note Writer"
  short_description: "Write first-person engineering notes in Li Zhiyi's learning voice."
  default_prompt: "Use $engineering-note-writer for this first-person portfolio learning note in Li Zhiyi's voice."
```

The metadata describes when/outcome; it must not summarize the interview/research workflow, because agents must read the Skill body.

- [ ] **Step 5: Validate and commit the review gate**

Run the UTF-8 Skill validator and `git diff --check`. Expected: valid Skill; no whitespace errors.

Commit:

```powershell
git add -- skills/engineering-note-writer/SKILL.md skills/engineering-note-writer/references/self-review.md skills/engineering-note-writer/tests/rubric.md skills/engineering-note-writer/agents/openai.yaml
git commit -m "feat(skill): gate release on Li Zhiyi voice"
```

### Task 5: Synchronize Portable Repository Guidance

**Files:**
- Modify: `CODEX.md`
- Modify: `docs/content-workflow.md`
- Modify: `docs/agent-skills.md`
- Modify: `docs/active-work/portfolio-copy-rewrite.md`
- Modify: `MEMORY.md`

- [ ] **Step 1: Add a portable workflow assertion**

Before editing guidance, run:

```powershell
rg -n "cognition-led|research beyond|truth gate|Li Zhiyi gate" CODEX.md docs/content-workflow.md docs/agent-skills.md docs/active-work/portfolio-copy-rewrite.md MEMORY.md
```

Expected RED: the full new vocabulary/workflow is absent or incomplete.

- [ ] **Step 2: Update canonical operating guidance**

In `CODEX.md` and `docs/content-workflow.md`, replace the old material-led summary with one compact sequence:

```text
inspect artifacts → reuse or obtain a user-confirmed `grill-me` brief → research beyond uploaded material → draft through the user's cognition trail → adapt English → pass truth and Li Zhiyi gates
```

State that evidence bounds claims but cannot choose reader-facing structure. State that external knowledge uses light links and present-learning first person, never invented project history.

- [ ] **Step 3: Update skill registry and active handoff**

In `docs/agent-skills.md`, explain that `grill-me` is now a required runtime dependency for substantial `engineering-note-writer` work when no confirmed brief exists.

In `docs/active-work/portfolio-copy-rewrite.md`, retain the existing one-project-at-a-time contract and add the post-interview research/cognition/two-gate stages. Do not change the completed DIY checkpoint or select a new active project.

- [ ] **Step 4: Reconcile durable repository memory**

Replace the stale writing rule in repository `MEMORY.md` with the approved cognition-led workflow. Keep the approved Smart Car and no-bulk-rewrite boundaries unchanged.

- [ ] **Step 5: Verify and commit portable guidance**

Run:

```powershell
rg -n "cognition-led|grill-me|research|Li Zhiyi|truth" CODEX.md docs/content-workflow.md docs/agent-skills.md docs/active-work/portfolio-copy-rewrite.md MEMORY.md
npm.cmd run validate-encoding
git diff --check
```

Expected: every portable layer points to the same sequence; encoding validation passes.

Commit:

```powershell
git add -- CODEX.md MEMORY.md docs/content-workflow.md docs/agent-skills.md docs/active-work/portfolio-copy-rewrite.md
git commit -m "docs(skill): document cognition-led writing workflow"
```

### Task 6: Run GREEN Behavioral Trials And Close Loopholes

**Files:**
- Create: `skills/engineering-note-writer/tests/revised-outputs/06-cross-subsystem-confirmed-brief.md`
- Create: `skills/engineering-note-writer/tests/revised-outputs/07-missing-shared-understanding.md`
- Create: `skills/engineering-note-writer/tests/revised-outputs/08-research-expansion.md`
- Create: `skills/engineering-note-writer/tests/revised-outputs/09-safe-but-voiceless-review.md`
- Create: `skills/engineering-note-writer/tests/revised-outputs/10-small-edit-exception.md`
- Modify: `skills/engineering-note-writer/tests/comparison.md`
- Modify: `skills/engineering-note-writer/tests/provenance.md`
- Possibly modify only in response to an observed loophole: runtime Skill/reference files from Tasks 2–4

- [ ] **Step 1: Record the candidate runtime commit and run all five inputs with fresh agents**

Use the same isolation wrapper as Task 1, substituting `revised-outputs` only after the response returns. Trial 08 must browse the web and cite actual source URLs; the other agents browse only if their task needs current factual support.

Expected GREEN behavior:

- Trial 06 follows attention across subsystems and later combines control with airflow, without re-interviewing.
- Trial 07 returns a `grill-me` interview action/question and no article draft.
- Trial 08 uses reliable web sources, light links, present-learning first person, and no claimed pressure/airflow measurement.
- Trial 09 explicitly fails the Li Zhiyi gate and supplies a cognition-level replacement.
- Trial 10 returns exactly the corrected sentence without interview or expansion.

- [ ] **Step 2: Score each response before changing rules**

For every rubric row, record `pass`, `partial`, `fail`, or `not applicable`, plus an exact sentence or omission. If a response fails, record the new rationalization in `comparison.md` before editing the Skill.

- [ ] **Step 3: Close only observed loopholes and rerun affected cases**

Examples of allowed minimal repairs:

- if `grill-me` is mentioned but prose is still drafted, add `Any prose draft in the same turn is a gate failure`;
- if research becomes a detached textbook section, add `No source earns a section unless it changes the active cognition trail`;
- if first person falsely implies historical knowledge, add `Present learning markers do not license 当时知道/当时选择`;
- if voice review adds only pronouns/jokes, add `A cosmetic rewrite still fails G2/G3`.

Rerun every case affected by a runtime change using a new fresh agent. Do not edit model response bodies. Once runtime rules stabilize, rerun all five cases against the same final snapshot so retained outputs are comparable.

- [ ] **Step 4: Preserve final revised outputs and write the comparison**

Use provenance headers with the exact final runtime commit and agent IDs. In `comparison.md`, add:

- RED findings for Trials 06–10;
- observed rationalizations;
- GREEN findings with exact evidence;
- an overall conclusion separating factual safety from cognition-led voice;
- remaining qualitative risks such as over-research, forced links, or overly tidy synthesis.

- [ ] **Step 5: Update provenance and the SHA-256 runtime manifest**

Generate hashes read-only:

```powershell
$files = @(
  'CODEX.md',
  'docs/content-workflow.md',
  'skills/engineering-note-writer/SKILL.md',
  'skills/engineering-note-writer/agents/openai.yaml'
) + (Get-ChildItem -File 'skills/engineering-note-writer/references' | Sort-Object Name | ForEach-Object FullName) + (Get-ChildItem -File 'skills/engineering-note-writer/tests/inputs' | Sort-Object Name | ForEach-Object FullName) + (Get-ChildItem -File 'skills/engineering-note-writer/tests/revised-outputs' | Sort-Object Name | ForEach-Object FullName)
$files | ForEach-Object {
  $resolved = Resolve-Path -LiteralPath $_
  $hash = Get-FileHash -Algorithm SHA256 -LiteralPath $resolved
  '{0}  {1}' -f $hash.Hash.ToLowerInvariant(), ($resolved.Path.Substring((Resolve-Path '.').Path.Length + 1).Replace('\','/'))
}
```

Paste the exact output into `tests/provenance.md`. Record capture date, baseline/current commit, final runtime commit, fresh-agent wrapper, agent IDs, reruns, and audit limits.

- [ ] **Step 6: Validate and commit behavioral GREEN evidence**

Run:

```powershell
py -3.12 -X utf8 C:\Users\123\.codex\skills\.system\skill-creator\scripts\quick_validate.py skills\engineering-note-writer
rg -n "partial|fail" skills/engineering-note-writer/tests/comparison.md
git diff --check
npm.cmd run validate-encoding
```

Expected: Skill validation and encoding pass; any `partial`/`fail` matches historical RED findings or a clearly documented remaining risk, not a retained GREEN rubric failure.

Commit:

```powershell
git add -- skills/engineering-note-writer/tests/revised-outputs/06-cross-subsystem-confirmed-brief.md skills/engineering-note-writer/tests/revised-outputs/07-missing-shared-understanding.md skills/engineering-note-writer/tests/revised-outputs/08-research-expansion.md skills/engineering-note-writer/tests/revised-outputs/09-safe-but-voiceless-review.md skills/engineering-note-writer/tests/revised-outputs/10-small-edit-exception.md skills/engineering-note-writer/tests/comparison.md skills/engineering-note-writer/tests/provenance.md
git commit -m "test(skill): verify cognition-led writing workflow"
```

### Task 7: Full Verification And Chinese Review Artifact

**Files:**
- Create but do not commit: `skills/engineering-note-writer/SKILL.zh-CN.review.md`
- Modify only if reconciliation is required: files already listed in Tasks 2–6

- [ ] **Step 1: Run repository-level verification**

Run sequentially so failures remain attributable:

```powershell
npm.cmd run lint
npm.cmd run validate-content
npm.cmd run validate-encoding
npm.cmd run typecheck
npm.cmd run build
py -3.12 -X utf8 C:\Users\123\.codex\skills\.system\skill-creator\scripts\quick_validate.py skills\engineering-note-writer
```

Expected: all commands exit 0. The Next.js build may report expected route generation, but no validation, type, or build error.

- [ ] **Step 2: Audit scope and commit history**

Run:

```powershell
git diff main...HEAD --stat
git diff main...HEAD --name-status
git log --oneline --decorate main..HEAD
git status --short --branch
```

Expected: only the design, implementation plan, writer runtime/references/tests, and portable guidance changed; no `content/**/*.mdx`, public upload, or existing published note was rewritten; worktree is clean before creating the temporary review copy.

- [ ] **Step 3: Create a faithful Chinese review copy**

Using `apply_patch`, translate the final runtime `SKILL.md` and every rule it directly requires into `skills/engineering-note-writer/SKILL.zh-CN.review.md`. Preserve headings, requirement strength, filenames, commands, and stage order. Start with:

```markdown
<!-- 临时中文审阅副本：不参与运行，不提交。英文 SKILL.md 才是运行源。 -->
```

Do not turn the review copy into a summary. Validate UTF-8 and confirm `.gitignore` does not hide unexpected runtime changes.

- [ ] **Step 4: Present the review gate and stop**

Report:

- the clickable Chinese review-copy path;
- the final branch and commit list;
- RED/GREEN trial outcome;
- full verification results;
- confirmation that existing 21 notes were untouched;
- the suggested next action: user reviews and explicitly approves before any push, PR, merge, deployment, cleanup, or review-copy deletion.

Do not push, merge, deploy, delete the temporary review copy, or update global Codex memory in this task without the user's explicit approval.
