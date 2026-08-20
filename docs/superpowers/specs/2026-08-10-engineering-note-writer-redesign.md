# Engineering Note Writer Redesign

> **Historical status / 历史状态:** Implemented and merged through pull request #4. The material-led runtime specified below was later superseded by the cognition-led redesign merged through pull request #8. This specification is retained only as a historical design record and is not current runtime guidance.

Date: 2026-08-10

## Purpose

Redesign the repository-local `engineering-note-writer` skill so portfolio learning notes retain engineering rigor while reading like a real person recalling a useful, occasionally funny sequence of experiments, mistakes, and discoveries.

The redesign adapts writing principles from the MIT-licensed [`khazix-writer`](https://github.com/KKKKhazix/khazix-skills/tree/main/khazix-writer). It does not copy the source persona, fixed phrases, public-account format, calls to action, or article template. The target voice remains Li Zhiyi's portfolio learning-note voice.

## Scope

In scope:

- `skills/engineering-note-writer/SKILL.md`;
- its `agents/openai.yaml` metadata;
- its bundled references;
- realistic old-versus-new input/output tests;
- minimal routing-document updates required when bundled reference paths change.

Out of scope:

- rewriting the existing 21 portfolio notes;
- changing site rendering, content schemas, routes, or visual design;
- changing `AddProject.skill` beyond keeping its existing writing handoff compatible;
- committing, pushing, merging, or deploying the changes without separate authorization.

## Problems In The Current Skill

### Template pressure

The current workflow says not to force every section, but it requires one note archetype, a timeline or system spine, a concrete opening, and a looking-back ending. Its gate then checks the same shape again. In practice this encourages repeated headings such as `Starting Point / 起点`, `Files / 文件`, and `Looking Back / 回头看`.

### Duplicate policy

The same banned phrases and structural warnings appear in `SKILL.md`, `hard-gated-checklist.md`, `voice-rules.md`, `self-review.md`, `CODEX.md`, and `docs/content-workflow.md`. Repetition consumes context without improving judgment.

### Checklist-driven prose

Seven pre-finalization gates and six self-review levels overlap. The writer is encouraged to fill visible boxes instead of following the material's own tension and information order.

### Missing imitable evidence

The current skill provides abstract voice rules but few realistic before-and-after examples. It tells the writer what to avoid without showing how a stiff engineering summary becomes a specific, funny, technically sound learning note.

### Over-broad lexical bans

Absolute bans on ordinary contrast or sequencing forms can make prose less natural. The redesign will judge repetitive AI-shaped patterns in context instead of treating every isolated occurrence as a failure.

## Design Principles

### Facts stay fixed; composition stays free

Evidence, actions, technical claims, dates, file paths, public boundaries, and unknowns are hard constraints. Paragraph order, pacing, section count, and ending shape emerge from the material.

### Follow changing understanding

The reader should feel how the writer's understanding changed: what looked simple, what behaved strangely, what assumption failed, what evidence clarified it, and what remained unresolved. A note does not need to contain all of these moves.

### Humor comes from observed friction

Humor may come from an absurd error message, conflicting toolchains, a chaotic directory, an incorrect assumption, or the writer's own clumsy first attempt. Do not invent a scene, emotion, or technical failure merely to create a joke.

### Engineering knowledge appears where it becomes useful

Explain a component, command, or concept at the point where it changes the reader's understanding of the current problem. Avoid detached textbook sections unless the material itself is a reference note.

### Preserve the user's identity

Adopt approximately 75 percent of `khazix-writer`'s narrative energy in Chinese and 60 percent in English. Transfer concrete entry points, rhythm variation, honest reactions, light self-mockery, callbacks, and conversational knowledge delivery. Do not transfer Khazix's personal catchphrases, profanity level, newsletter calls to action, audience address habits, or mandatory cultural/philosophical elevation.

## Writing Workflow

### 1. Establish the fact boundary

Build a compact internal record of supported actions, tools, files, symptoms, results, uncertainties, and public/private constraints. Do not expose it as a standard output form unless the user asks for an audit.

Personal-action and emotional claims require evidence from the user, source material, or existing content. Indirect evidence should remain indirect.

### 2. Find the narrative force

Identify the most useful source of forward motion. It may be:

- a surprising symptom;
- a mismatch between expectation and result;
- a technical question that becomes clearer;
- a decision forced by a constraint;
- a revealing file or screenshot;
- a sequence of experiments;
- a change in how the writer understood the system.

Do not assign the note to a named archetype.

### 3. Build a beat map

Plan a small sequence of information moves rather than a section template. A move must introduce at least one new fact, question, interpretation, emotion, or piece of evidence. Most notes will need roughly four to eight moves, but this is guidance rather than an output requirement.

Brief explanatory detours are allowed when they help the current problem. Return to the main thread before the reader has to reconstruct the connection.

### 4. Draft Chinese at 75 percent intensity

Start from a concrete moment, artifact, action, or question. Vary sentence and paragraph length. Allow a short reaction or self-interruption when the material supports it. Use light humor without turning every paragraph into a performance.

Technical terms, commands, paths, files, board names, and observable results remain precise. Emotion accompanies evidence rather than replacing it.

### 5. Derive headings after drafting

Add a heading only when the note finishes one real subject and moves to another. Derive each heading from the content below it. A heading should name the component, conflict, finding, experiment, or decision that follows.

Rules:

- use no more than 15 subheadings in one note;
- allow short notes to use few or no subheadings when the site format remains readable;
- do not use framework labels such as `起点`, `怎么卡住`, `怎么改`, `文件`, `回头看`, or `还要补的记录`;
- do not preselect headings before the material's boundaries are known.

### 6. Adapt the English at 60 percent intensity

Preserve the same facts, order of discovery, important reactions, and humor targets. Use natural English engineering-blog phrasing rather than literal translation. Reduce Chinese-specific slang, exaggerated punctuation, and conversational particles. Do not collapse the English into a marketing summary.

### 7. Stop where the material resolves

End on the last useful verification, remaining technical question, concrete observation, or quiet callback. Do not require a retrospective section, future-work list, evidence list, or philosophical conclusion.

## Voice Boundaries

Encourage:

- concrete first-hand reactions supported by evidence;
- mild self-mockery about a mistaken assumption or awkward workflow;
- short standalone sentences at genuine turns;
- callbacks to an earlier file, error, or expectation;
- specific tools and symptoms instead of generic technical language;
- uncertainty and unfinished work when true.

Avoid:

- invented experience or emotion;
- fixed quotas for slang, jokes, questions, or short paragraphs;
- copying another writer's signature phrases;
- recruiter, press-release, academic-abstract, or compliance-report posture;
- forced cultural elevation or motivational conclusions;
- jokes aimed at colleagues, clients, companies, or identifiable individuals;
- mechanical reuse of the same section titles across notes.

## Skill File Architecture

Target layout:

```text
skills/engineering-note-writer/
├── SKILL.md
├── agents/openai.yaml
├── references/
│   ├── evidence-and-boundaries.md
│   ├── material-led-composition.md
│   ├── voice-rules.md
│   ├── bilingual-writing.md
│   ├── self-review.md
│   └── style-examples.md
└── tests/
    ├── rubric.md
    ├── inputs/
    ├── baseline-outputs/
    └── revised-outputs/
```

Remove the current archetype reference. Merge duplicated pre-draft checks into `evidence-and-boundaries.md`. Keep `self-review.md` focused on the finished reading experience. Use `style-examples.md` for imitable before-and-after transformations.

Update `CODEX.md`, `docs/content-workflow.md`, and `docs/agent-skills.md` only where needed to keep reference paths and the short skill description accurate.

## Validation Design

Run the same realistic inputs through the current and redesigned skill in independent agent contexts. Preserve the raw prompts and outputs.

Test cases:

1. Smart Car course material with LM7805, 74HC165, L293, PWM, soldering, and staged tests.
2. Seamly2D packaging material involving compiler conflicts, `windeployqt`, missing DLLs, and Windows/macOS paths.
3. A messy hardware archive containing filenames, Gerber, BOM, schematic, and incomplete authorship evidence.
4. Sparse material with important unknowns, designed to expose invented first-person experience.
5. A bilingual rewrite where Chinese targets 75 percent narrative intensity and English targets 60 percent.

The rubric evaluates:

- factual integrity and uncertainty handling;
- natural, non-repeated composition;
- content-specific headings and the 15-heading limit;
- forward motion and readable detours;
- evidence-grounded emotion and humor;
- credible first person;
- Chinese/English factual and narrative equivalence;
- absence of template headings and visible checklist prose.

Do not require a fixed count of jokes, colloquial phrases, questions, callbacks, or sentence fragments. Such quotas would recreate the problem being removed.

## Acceptance Criteria

The redesign is ready for user review when:

- no runtime instruction requires a note archetype or fixed section order;
- factual/authorship/public boundaries have one operational reference, while the heading cap and banned labels have one runtime definition in `SKILL.md`;
- headings are derived after drafting and capped at 15;
- Chinese and English intensity guidance is explicit at 75 and 60 percent;
- emotion and humor require factual support;
- at least five realistic input/output cases are preserved;
- baseline and revised outputs use identical source inputs;
- the revised outputs show materially different composition across cases;
- skill metadata and routing references are valid;
- skill validation and repository encoding/content checks pass;
- no existing portfolio note has been rewritten.
