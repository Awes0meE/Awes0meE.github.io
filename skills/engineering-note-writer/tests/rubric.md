# Engineering Note Writer Trial Rubric

Use this rubric to compare baseline and revised outputs produced from the same input. Score observable behavior, not whether the evaluator personally likes the prose.

| ID | Check | Pass condition |
|---|---|---|
| G1 | Truth gate | Project actions and results, researched claims and nearby links, and uncertainty and publication claims independently pass factual review. |
| G2 | Li Zhiyi gate | For a first-person learning note, the available source-supported cognition route is traceable through the writer's selection, judgment, or change in understanding. Unsupported move categories are never mandatory or manufactured. |
| G3 | Compliance-report rejection | For a target first-person learning note, a factually safe compliance-report, archive-description, project-handoff, recruiter-summary, academic-abstract, or neutral-survey voice fails overall and must be rebuilt at the cognition level. A requested factual summary, caption, audit, or review may remain neutral when appropriate. |
| G4 | Reader-prose L1 gate | Model-authored reader-facing project and note body passes the scoped L1-1 wording, L1-2 punctuation, and L1-3 canned-structure scans with zero hits in both languages. Metadata, Markdown syntax, links, code, paths, raw logs, verbatim artifacts, and exact technical strings stay outside the scan. Existing thought-bookmark heading, genuine-parallel bullet, and ordinary sequencing-word rules remain unchanged. |
| F1 | Facts | Every action, tool, result, and emotion is supported by the input. A confirmed real event plus confirmed emotional direction may be reconstructed in natural first person, but no new time, place, action, dialogue, participant, technical result, or causal order is added. |
| F2 | Unknowns | Missing authorship, dates, results, and paths stay unknown or are clearly qualified. |
| C1 | Composition | Section order follows the material rather than a named note type or mandatory sequence. |
| C2 | Headings | Headings describe the content below them, total no more than 15, and avoid framework labels such as `起点`, `怎么卡住`, `文件`, `回头看`, and `还要补`. |
| C3 | Cognition trail | The chosen attention route is locally intelligible: the reader can follow why the current thought belongs here and, when a change exists, what changes. No fixed sequence of noticed detail, question, jump, interpretation, or synthesis is required. |
| C4 | Cross-subsystem movement | The note may jump among electronics, firmware, desktop software, mechanics, fabrication, and research without imposing a fake strict chronology. |
| C5 | Later synthesis | When genuine later synthesis exists in the source or confirmed brief, a later passage may reuse earlier learning coherently. If the material contains no such synthesis, record `not applicable` and do not manufacture one. |
| C6 | Thought-bookmark headings | Headings mark the current subject or thought without becoming a complete taxonomy or writing framework. |
| V1 | Chinese voice | The Chinese is concrete, emotionally present, lightly humorous where the evidence supports it, technically exact, and uses the approved spoken palette only where it sounds natural. Audience calls and copied creator persona remain absent. |
| V2 | Humor | Humor comes from observed friction, with no invented scene and no ridicule aimed at another person or organization. |
| B1 | English | English preserves the Chinese facts and narrative nodes, uses natural phrasing, and reads near the user's qualitative 60%-of-reference target beside Chinese at 75%, without treating either value as a quota. |
| R1 | Reader flow | Each paragraph or section adds a fact, question, interpretation, emotion, or piece of evidence. Brief detours return naturally. |
| T1 | Template residue | The output does not require a retrospective, file section, future-work section, archetype label, or visible checklist wrapper. |
| I1 | Shared understanding | For a new project, substantial rewrite, or humanization request, substantive first-person drafting starts only from a user-confirmed brief; when no confirmed brief exists, the agent runs `grill-me` / `grilling` and does not draft. |
| I2 | Interview scope | The agent finds artifact and public facts itself, and asks the user only about motives, changes in attention, decisions, reactions, recollections, and interpretations. |
| I3 | Reuse and exception | The agent reuses a confirmed current brief; typo fixes, formatting-only edits, and faithful translations of approved prose do not trigger `grill-me`, while an edit that introduces a new first-person interpretation reactivates the shared-understanding gate. |
| K1 | Research expansion | For a research-required task, the retained output adds relevant technical knowledge absent from the uploaded input and includes a direct nearby source link; record `not applicable` when the task needs no external expansion. |
| K2 | Research boundary | Sources are linked lightly and accurately; researched principles express present understanding and never fabricate a project action, result, measurement, or memory. |

For a first-person learning-note trial produced under a runtime containing `reader-prose-hard-gates.md`, any applicable G1-G4 failure makes the whole trial fail. Factual safety cannot compensate for missing voice or an L1 hit. Record `not applicable` for a move unsupported by the source; never manufacture it. For other requested forms, judge whether the output matches that form rather than falsely applying the learning-note voice gate.

Historical retained Trials 01-11 predate G4 and remain frozen evidence for their recorded runtimes. Do not retroactively claim that they passed the new reader-prose L1 gate.

## Recording Results

For every item, record `pass`, `partial`, `fail`, or `not applicable`, followed by a concrete heading, sentence, omission, or unsupported claim from the output. Do not use word-count quotas for jokes, slang, questions, callbacks, or short sentences.

For externally introduced knowledge, cite the exact linked sentence in the output; use `not applicable` when no external expansion is needed.
