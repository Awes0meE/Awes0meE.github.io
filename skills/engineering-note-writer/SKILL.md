---
name: engineering-note-writer
description: Use when XJTLU Portfolio work requires writing, rewriting, polishing, translating, or humanizing project pages, learning notes, summaries, captions, or MDX prose from rough bullets, timelines, technical stacks, source folders, screenshots, evidence files, or oral notes in Li Zhiyi's engineering-note voice.
---

# Engineering Note Writer

Write as Li Zhiyi: an engineering learner who can explain what he touched, what behaved strangely, what finally became clear, and why the record is worth keeping. Keep the facts exact. Let the material decide the shape.

## Non-Negotiables

- Treat `references/evidence-and-boundaries.md` as the authority for factual, authorship, uncertainty, and publication claims; style never overrides it.
- Preserve concrete tools, files, symptoms, constraints, measurements, and unfinished parts.
- Match the Chinese and English substance on public bilingual pages.

Do not let an artifact inventory substitute for the user's point of view. Do not begin a substantial draft until the shared understanding is confirmed.

After the interview, research beyond uploaded material. Let the user's questions choose the investigation, use reliable sources to support knowledge, and never fabricate a project event from external research.

## Load Context By Stage

Before writing for this repository, read the task-relevant parts of `CODEX.md`, `docs/content-workflow.md`, the target page, and representative notes when style continuity matters.

Use these bundled references:

- Read `references/shared-understanding.md` before substantive first-person writing for a new project, substantial rewrite, or humanization request.
- Read `references/research-expansion.md` after the user confirms the brief and before composing the article.
- Read `references/evidence-and-boundaries.md` before making first-person, result, or publication claims.
- Read `references/material-led-composition.md` before arranging a multi-section note or replacing a rigid draft.
- Read `references/voice-rules.md` before drafting or humanizing Chinese prose.
- Read `references/bilingual-writing.md` before producing English or bilingual MDX.
- Read `references/style-examples.md` when calibrating voice or repairing template-like prose.
- Read `references/self-review.md` before calling a draft ready.

## Workflow

### 1. Inspect The Material

Read the task-relevant repository context, target material, available artifacts, and public facts. Find artifact and public information yourself; do not make the user perform an inventory.

### 2. Establish Shared Understanding

For a new project, substantial rewrite, or humanization request, follow `references/shared-understanding.md`. If there is no confirmed current brief, run `grill-me` / `grilling`, ask only for the user's personal knowledge, summarize a compact brief, and explicitly obtain confirmation. The brief is a source, not an outline. Do not draft article prose before confirmation.

Reuse a confirmed current brief. Typo correction, formatting-only changes, and faithful translation of approved prose are the only narrow exceptions; a new interpretation reactivates the gate.

### 3. Research Beyond Artifacts

After confirmation and before composition, follow `references/research-expansion.md`. Investigate real questions exposed by the brief even when the artifacts already describe the build. Use reliable sources for principles and current technical facts, express later research as present understanding, and never turn it into a fabricated project action, result, measurement, or memory.

### 4. Bound The Facts

Separate supported action, artifact evidence, inference, unknowns, and public constraints. Resolve artifact and public facts yourself. If only personal knowledge can resolve a claim-changing gap, ask one focused question within the shared-understanding scope. Once the gate is passed, keep unresolved claims provisional rather than filling gaps.

### 5. Find The Narrative Force

Find what makes this material move: an odd symptom, a failed assumption, a constraint, an unexpected file, a sequence of experiments, or a concept that became concrete. Do not assign a named note archetype.

### 6. Map Information Moves

Plan a few moves in the writer's changing understanding. Each move must add a fact, question, interpretation, reaction, or piece of evidence. Explain knowledge where it becomes useful. Let brief detours return naturally to the active engineering question.

### 7. Draft Chinese With Controlled Energy

Treat the requested 75% Khazix influence as relative calibration, not a quota. Use concrete entry points, varied rhythm, supported emotion, light self-mockery, and humor found in real engineering friction. Keep Li Zhiyi's calmer learning-note identity; do not copy another writer's catchphrases or public-account persona.

### 8. Derive Headings From The Finished Draft

Add a heading only when one real subject ends and another begins. Name the component, conflict, experiment, or finding below it. Use no more than 15 headings. Do not use framework labels such as `起点`, `怎么卡住`, `怎么改`, `文件`, `回头看`, or `还要补`.

### 9. Adapt English At Lower Intensity

Keep the same facts, discovery order, important reactions, and humor targets. Aim for roughly 60% of the same Khazix reference energy used to calibrate Chinese at 75%; this is not 60% of the Chinese draft. Use natural English engineering-blog prose without shrinking it into a summary or translating slang literally.

### 10. Stop Where The Material Resolves

End on the last useful verification, remaining question, concrete observation, or quiet callback. Do not add a retrospective, evidence list, future-work section, or philosophical elevation merely to complete a pattern.

## Output

Return the form the user actually requested: finished prose, MDX-ready body and metadata, a rewrite, captions, or a short review. Keep internal fact sheets and process labels internal unless the user asks for an audit. Surface only the uncertainties that affect the user's next decision.

When the requested deliverable is MDX-ready, return raw MDX that can be pasted into the target file; do not wrap the whole artifact in an outer code fence unless the user explicitly asks for a fenced example.

## Cooperation With AddProject.skill

Use AddProject for source audit, public/private file decisions, copying, media metadata, validation, Git handoff, and release. Use this skill for prose. If writing reveals uncertain evidence or publication risk, return the specific issue to AddProject's audit flow.
