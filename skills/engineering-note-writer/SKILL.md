---
name: engineering-note-writer
description: Use when XJTLU Portfolio work requires writing, rewriting, polishing, translating, or humanizing project pages, learning notes, summaries, captions, or MDX prose from rough bullets, timelines, technical stacks, source folders, screenshots, evidence files, or oral notes in Li Zhiyi's engineering-note voice.
---

# Engineering Note Writer

Write as Li Zhiyi: an engineering learner who can explain what he touched, what behaved strangely, what finally became clear, and why the record is worth keeping. Keep the facts exact. Let the user's changing understanding choose the shape. Evidence is the guardrail for what can be claimed, not the force that dictates section order; research expands what can be understood.

## Non-Negotiables

- Treat `references/evidence-and-boundaries.md` as the authority for factual, authorship, uncertainty, and publication claims; style never overrides it.
- Preserve concrete tools, files, symptoms, constraints, measurements, and unfinished parts.
- Match the Chinese and English substance on public bilingual pages.
- Require model-authored reader-facing project and note body to pass the zero-hit L1 wording, punctuation, and canned-structure gates in `references/reader-prose-hard-gates.md`.

Do not let an artifact inventory substitute for the user's point of view. Do not begin a substantial draft until the shared understanding is confirmed.

After the interview, research beyond uploaded material. Let the user's questions choose the investigation, use reliable sources to support knowledge, and never fabricate a project event from external research.

## Load Context By Stage

Before writing for this repository, read the task-relevant parts of `CODEX.md`, `docs/content-workflow.md`, the target page, and representative notes when style continuity matters.

Use these bundled references:

- Read `references/shared-understanding.md` before substantive first-person writing for a new project, substantial rewrite, or humanization request.
- Read `references/research-expansion.md` after the user confirms the brief and before composing the article.
- Read `references/evidence-and-boundaries.md` before making first-person, result, or publication claims.
- Read `references/cognition-led-composition.md` before arranging a multi-section note or replacing a rigid draft.
- Read `references/voice-rules.md` before drafting or humanizing Chinese prose.
- Read `references/reader-prose-hard-gates.md` before drafting project or note body and before final release review.
- Read `references/bilingual-writing.md` before producing English or bilingual MDX.
- Read `references/style-examples.md` when calibrating voice or repairing template-like prose.
- Read `references/self-review.md` before calling a draft ready.

## Workflow

### 1. Inspect The Material

Read the task-relevant repository context, target material, available artifacts, and public facts. Find artifact and public information yourself; do not make the user perform an inventory.

### 2. Establish Shared Understanding

For a new project, substantial rewrite, or humanization request, follow `references/shared-understanding.md`. If there is no confirmed current brief, run `grill-me` / `grilling`, ask only for the user's personal knowledge, summarize a compact brief, and explicitly obtain confirmation. The brief is a source, not an outline. Do not draft article prose before confirmation.

A review that asks for a humanized or first-person replacement still passes through this gate. You may diagnose the supplied prose, but the paragraph being reviewed is not a confirmed brief: without one, do not write the replacement in the same turn; return the next shared-understanding interview action.

Reuse a confirmed current brief. Typo correction, formatting-only changes, and faithful translation of approved prose are the only narrow exceptions; a new interpretation reactivates the gate.

### 3. Research Beyond Artifacts

After confirmation and before composition, follow `references/research-expansion.md`. Investigate real questions exposed by the brief even when the artifacts already describe the build. Use reliable sources for principles and current technical facts, express later research as present understanding, and never turn it into a fabricated project action, result, measurement, or memory.

### 4. Bound The Facts

Separate supported action, artifact evidence, inference, unknowns, and public constraints. Resolve artifact and public facts yourself. If only personal knowledge can resolve a claim-changing gap, ask one focused question within the shared-understanding scope. Once the gate is passed, keep unresolved claims provisional rather than filling gaps.

### 5. Sketch An Internal Cognition Trail

Sketch how attention and understanding moved: a noticed detail, the real question it raised, an attention jump, new knowledge, a changed interpretation, or a later synthesis. This is an internal aid, not an outline. None of these move types is mandatory, and the trail may branch, revisit an earlier point, recombine ideas, or leave a question unresolved. Do not assign fixed slots, required transitions, or a named note archetype.

### 6. Compose Through Attention

Follow what caught the writer's attention rather than forcing a strict timeline or artifact inventory. The route may move from circuit behavior to firmware, desktop software, mechanics, fabrication, or research, then return and recombine what those systems revealed. Keep each jump locally intelligible with a short bridge when needed: show why attention is here and what this changes. Let artifacts support sentences; they do not automatically earn sections, determine order, or become the protagonist.

Prefer a short, natural spoken bridge when a transition needs help. Keep the existing thought-bookmark heading and genuine-parallel-list rules; do not replace them with a rigid no-heading or no-list policy.

### 7. Draft Chinese With Controlled Energy

Treat the requested 75% Khazix influence as relative calibration, not a quota. Use concrete entry points, varied rhythm, supported emotion, light self-mockery, and humor found in real engineering friction. Use the user-approved phrase palette in `references/voice-rules.md` naturally. Do not copy another writer's audience calls, public-account persona, or fixed performance patterns.

### 8. Add Thought-Bookmark Headings After Drafting

Use headings as thought bookmarks only when attention changes enough that the reader benefits from one. Name the current subject, question, connection, component, conflict, experiment, or finding. A short note may need no headings. Do not turn headings into a complete taxonomy or visible writing framework. Use no more than 15 headings; the ceiling is never a target. Do not use framework labels such as `起点`, `怎么卡住`, `怎么改`, `文件`, `回头看`, or `还要补`.

### 9. Adapt English At Lower Intensity

Keep the same facts, attention jumps, researched explanations, later synthesis, important reactions, and humor targets. Aim for roughly 60% of the same Khazix reference energy used to calibrate Chinese at 75%; this is not 60% of the Chinese draft. Use natural English engineering-blog prose without shrinking it into a summary or translating slang literally.

Apply the reader-prose hard gates to the English article body as well as the Chinese body. Preserve excluded technical syntax and verbatim evidence exactly.

### 10. Stop Where The Cognition Resolves

End where the writer's current understanding reaches its last useful verification, remaining question, new connection, concrete observation, or quiet callback. Do not add a retrospective, evidence list, future-work section, or philosophical elevation merely to complete a pattern.

### 11. Run The Release Gates

Follow `references/self-review.md`; detailed review mechanics live only there. For first-person learning-note prose, both applicable Truth and Li Zhiyi gates must pass before release, and Truth alone is insufficient. If the Li Zhiyi gate fails, return to the cognition trail and rebuild from it rather than making cosmetic voice edits.

For model-authored project and note body, the reader-prose L1 gate must also pass with zero applicable hits. This gate does not scan metadata, Markdown syntax, code, links, paths, logs, verbatim artifacts, or exact technical strings.

Use `Li Zhiyi or compliance report?` as the operational release decision for first-person learning-note prose. A requested factual summary, caption, audit, or review may remain neutral when that matches the requested form.

## Output

Return the form the user actually requested: finished prose, MDX-ready body and metadata, a rewrite, captions, or a short review. Keep internal fact sheets and process labels internal unless the user asks for an audit. Surface only the uncertainties that affect the user's next decision.

When the requested deliverable is MDX-ready, return raw MDX that can be pasted into the target file; do not wrap the whole artifact in an outer code fence unless the user explicitly asks for a fenced example.

## Cooperation With AddProject.skill

Use AddProject for source audit, public/private file decisions, copying, media metadata, validation, Git handoff, and release. Use this skill for prose. If writing reveals uncertain evidence or publication risk, return the specific issue to AddProject's audit flow.
