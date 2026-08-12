# Cognition-Led Engineering Note Writer Design

**Date:** 2026-08-12
**Status:** Approved in conversation and after written-spec review
**Scope:** Redesign `skills/engineering-note-writer/` and its behavioral trials. Do not bulk-rewrite the existing portfolio.

## Problem

The current writer fixed rigid note archetypes by making composition material-led. In practice, an agent can still turn that instruction into artifact-led writing: files, evidence levels, and publication boundaries become the article's route. `evidence-and-boundaries.md` then escapes its intended role as a factual floor and becomes a reader-facing style.

The final question—“Does this sound like Li Zhiyi or like a compliance report?”—is too late and too soft. A reviewer can pass a factually cautious draft without noticing that the first-person learning path has disappeared.

The writer also assumes that enough personal context already exists. The repository's active rewrite workflow requires a `grill-me` interview, but the runtime writing skill does not. An agent that loads only `engineering-note-writer` can therefore start from artifacts, miss the user's motives and changing understanding, and write a third-person archive report.

## Design Principle

The revised writer will be **cognition-led, research-expanded, and evidence-bounded**.

- The user's changing understanding determines the prose.
- External research expands what the note can teach.
- Project evidence limits claims about actions, artifacts, and results.
- None of these three layers may silently take over another layer's job.

“Linear” means that one thought makes the next thought intelligible. It does not require strict chronology or continuous attention to one subsystem. A note may move from a circuit to desktop code, then to enclosure modelling, and later combine all three into a better understanding of the device.

## Writing Contract

### 1. Establish Shared Understanding Before Substantive Writing

For a new project, a major rewrite, or a request to humanize impersonal prose, the writer must first decide whether a user-confirmed project understanding already exists.

If it does not, the writer must run `grill-me` / `grilling` before drafting. Inspecting files and finding public technical facts remain the agent's responsibility. The interview is for facts that only the user can supply:

- why the project mattered to them;
- what they first thought was happening;
- where their attention moved and why;
- mistakes, abandoned routes, and practical compromises;
- emotional reactions grounded in remembered events;
- what became clearer only after looking at several subsystems together;
- which results are measurements, demonstrations, recollections, or still unknown.

The interview ends with a compact shared-understanding brief. Drafting remains blocked until the user confirms that the brief represents their view. The brief is not an article outline and must not force the eventual prose into its own field order.

When work spans agents or devices in this repository, retain the current, non-sensitive brief in the established active-work handoff rather than preserving a long interview transcript. A confirmed brief may be reused. Typographical corrections, formatting changes, and faithful translation of already-approved prose do not require a new interview.

### 2. Research Beyond The Uploaded Artifacts

After shared understanding and before drafting, identify the technical questions that would deepen the learning record. Search the web rather than limiting the note to uploaded files.

Research should follow the user's curiosity and the project's real connections. Useful additions include:

- the principle that explains an observed behavior;
- why one design choice works and what it trades away;
- a common failure mode that clarifies the user's own false start;
- the connection between two subsystems previously considered separately;
- terminology or a mental model that makes a later realization more precise.

Prefer current primary sources: official documentation, datasheets, standards, vendor application notes, source repositories, and original papers. Use secondary explanations when they materially improve accessibility or when no suitable primary explanation exists. Cross-check claims whose accuracy or currency affects the note.

Keep attribution light. Put a natural source link near the knowledge it supports; do not require academic citation syntax or a compulsory references section. Research notes are internal working material, not a visible literature review.

External knowledge may broaden the learning path, but it must not become a fabricated project event, measurement, implementation, or historical memory. First-person phrasing should express the writer's present understanding—such as “我现在更愿意把它理解为……” or “再往下查，这里其实还牵着……”—without pretending that a general source proves what the physical project did.

### 3. Compose From Attention And Understanding

The central planning object will be a **cognition trail**, not an artifact inventory, chronology, article archetype, or table of contents.

A cognition trail records only the movements that matter:

- what caught the writer's attention;
- which question that produced;
- why attention jumped to another subsystem;
- what was learned there;
- how that learning changed an earlier interpretation;
- where separate observations later recombined.

The trail may branch, skip time, revisit an earlier subject, or leave one question partially unresolved. It only fails when the reader cannot tell why the current thought belongs in this learning record.

Artifacts support individual sentences inside this trail. They do not automatically earn sections, dictate order, or become the article's protagonist. Evidence classifications stay internal unless the uncertainty itself is part of the learning experience.

### 4. Use Headings As Thought Bookmarks

Headings mark a meaningful shift of attention. They may move between circuit design, firmware, desktop software, mechanics, fabrication, testing, or a newly researched concept.

A heading should tell the reader what the writer is thinking about now. It does not need to make the whole article look architecturally complete. Later sections may call back to several earlier headings and combine their ideas. Short transitions may acknowledge a jump, but the writer need not justify every change of subject like a formal report.

The existing ban on reusable framework headings remains. The heading limit remains a guard against fragmentation, not a target.

### 5. Keep Evidence As A Guardrail

`evidence-and-boundaries.md` remains authoritative only for:

- personal authorship and action claims;
- project-specific results and measurements;
- uncertainty strength;
- public/private material and publication claims.

It must not choose the opening, paragraph order, heading set, conclusion, emotional register, or amount of external knowledge. Passing factual review is necessary but insufficient.

The draft should not repeatedly announce evidential limits. Place a qualification only where it changes the meaning of a nearby claim. A remembered result may remain first-person recollection; an external principle may explain it; neither turns the recollection into controlled evidence.

### 6. Make Voice Review A Release Gate

The final review separates two independent gates:

1. **Truth gate:** Are personal actions, project results, researched claims, uncertainty, and publication boundaries supportable?
2. **Li Zhiyi gate:** Does the reader experience a person noticing, wondering, switching focus, correcting himself, and joining ideas together?

A draft fails the second gate even when every sentence is factually safe if it reads like an archive description, compliance report, project handoff, recruiter summary, or neutral survey. The reviewer must return it for a cognition-level rewrite rather than adding a joke or replacing a few formal words.

The rewrite should restore the missing path of attention, including supported uncertainty, imperfect turns, personal judgment, and later synthesis. It must not manufacture emotion or force a fixed number of questions, jokes, callbacks, or digressions.

## Workflow

The runtime skill will direct agents through this order:

1. inspect the repository and project material;
2. locate an existing user-confirmed shared-understanding brief;
3. if absent, run `grill-me` and obtain user confirmation;
4. identify learning questions and research them online;
5. bound project claims and research claims separately;
6. sketch an internal cognition trail;
7. draft Chinese in first-person learning-note voice;
8. derive thought-bookmark headings from the draft;
9. adapt English with equal substance and calmer intensity;
10. run the truth gate and Li Zhiyi gate independently.

The user receives finished prose by default. Interview trees, evidence matrices, research notes, and cognition trails remain internal unless an audit or handoff is requested.

## Behavioral Verification

The redesign will follow the existing skill-testing discipline: capture failures before changing the runtime rules, then rerun fresh-agent scenarios against the revised skill.

At minimum, the trials must cover:

1. **Cross-subsystem embedded project:** mixed circuit, firmware, desktop software, communication, and enclosure material. A passing output may jump between them and later synthesize them; it must not process the files in inventory order.
2. **Missing personal context:** rich artifacts but no confirmed motivation or learning path. A passing agent starts `grill-me` instead of drafting an archive report.
3. **Existing confirmed brief:** enough shared understanding is already present. A passing agent reuses it without interrogating the user again.
4. **Research expansion:** uploaded material omits an explanatory concept. A passing agent searches beyond the repository, adds relevant current knowledge with light links, and does not invent a project result.
5. **Safe but voiceless draft:** all facts are qualified, but the prose resembles a compliance report. A passing reviewer fails the Li Zhiyi gate and requests a cognition-level rewrite.
6. **Small edit exception:** a typo, formatting correction, or faithful translation does not trigger a full interview.

The rubric will score interview gating, quality of the cognition trail, meaningful cross-subsystem jumps, later synthesis, research relevance and source quality, first-person presence, factual boundaries, bilingual equivalence, and compliance-report residue. Factual correctness alone cannot produce an overall pass.

## Expected Repository Changes

After this design is approved, implementation is expected to revise:

- `skills/engineering-note-writer/SKILL.md`;
- the composition, evidence, voice, and self-review references;
- the behavioral rubric, provenance, inputs, and baseline/revised trial outputs;
- portable project guidance where the new runtime workflow must remain discoverable across devices.

The exact file edits and test sequence belong in the later implementation plan. Existing published project pages and the 21 existing notes remain outside this change unless the user separately approves a rewrite.

## Success Criteria

The redesign succeeds when a fresh agent:

- refuses to draft a substantial personal project note without confirmed user understanding;
- researches useful knowledge beyond the uploaded artifacts;
- writes through Li Zhiyi's changing attention rather than through an evidence inventory;
- can move naturally across subsystems and recombine earlier learning later;
- uses light source links without turning the note into an academic report;
- keeps evidence as the factual floor rather than the prose style;
- rejects factually safe prose that still sounds like a compliance report;
- preserves the existing no-bulk-rewrite and bilingual-content boundaries.
