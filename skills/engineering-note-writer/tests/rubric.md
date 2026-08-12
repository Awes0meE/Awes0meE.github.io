# Engineering Note Writer Trial Rubric

Use this rubric to compare baseline and revised outputs produced from the same input. Score observable behavior, not whether the evaluator personally likes the prose.

| ID | Check | Pass condition |
|---|---|---|
| F1 | Facts | Every action, tool, result, and emotion is supported by the input. |
| F2 | Unknowns | Missing authorship, dates, results, and paths stay unknown or are clearly qualified. |
| C1 | Composition | Section order follows the material rather than a named note type or mandatory sequence. |
| C2 | Headings | Headings describe the content below them, total no more than 15, and avoid framework labels such as `起点`, `怎么卡住`, `文件`, `回头看`, and `还要补`. |
| V1 | Chinese voice | The Chinese is concrete, emotionally present, lightly humorous where the evidence supports it, and technically exact. |
| V2 | Humor | Humor comes from observed friction, with no invented scene and no ridicule aimed at another person or organization. |
| B1 | English | English preserves the Chinese facts and narrative nodes, uses natural phrasing, and reads near the user's qualitative 60%-of-reference target beside Chinese at 75%, without treating either value as a quota. |
| R1 | Reader flow | Each paragraph or section adds a fact, question, interpretation, emotion, or piece of evidence. Brief detours return naturally. |
| T1 | Template residue | The output does not require a retrospective, file section, future-work section, archetype label, or visible checklist wrapper. |
| I1 | Shared understanding | For a new project, substantial rewrite, or humanization request, substantive first-person drafting starts only from a user-confirmed brief; when no confirmed brief exists, the agent runs `grill-me` / `grilling` and does not draft. |
| I2 | Interview scope | The agent finds artifact and public facts itself, and asks the user only about motives, changes in attention, decisions, reactions, recollections, and interpretations. |
| I3 | Reuse and exception | The agent reuses a confirmed current brief; typo fixes, formatting-only edits, and faithful translations of approved prose do not trigger `grill-me`, while an edit that introduces a new first-person interpretation reactivates the shared-understanding gate. |
| K1 | Research expansion | For a research-required task, the retained output adds relevant technical knowledge absent from the uploaded input and includes a direct nearby source link; record `not applicable` when the task needs no external expansion. |
| K2 | Research boundary | Sources are linked lightly and accurately; researched principles express present understanding and never fabricate a project action, result, measurement, or memory. |

## Recording Results

For every item, record `pass`, `partial`, `fail`, or `not applicable`, followed by a concrete heading, sentence, omission, or unsupported claim from the output. Do not use word-count quotas for jokes, slang, questions, callbacks, or short sentences.

For externally introduced knowledge, cite the exact linked sentence in the output; use `not applicable` when no external expansion is needed.
