# Direct Prose Style Cleanup Design

**Date:** 2026-08-14
**Branch:** `docs/rewrite-pre-pr20-projects`

## Context

The five pre-PR20 project families have completed an L1 surface cleanup. A
follow-up review found one remaining style pattern that the user does not want
in the public prose:

- Chinese corner quotation marks, `「」`, often turn an ordinary idea into a
  labelled phrase when a direct sentence would read more naturally.
- Bare negative-first reframes delay the actual point, especially structures
  such as `不是 A，而是 B`, `这不是 A，这是 B`, and their English equivalents.

The current `engineering-note-writer` still recommends `「」` as a replacement
for double quotation marks and retains several examples that can reproduce the
same style. This pass therefore changes both the five project families and the
writer guidance used for the later FOC work.

The read-only baseline audit found 60 pairs of `「」` across the 14 scoped MDX
files. It also found roughly one hundred Chinese and English contrast units that
need semantic review. Some are the unwanted rhetorical form; others are factual
limits that must remain.

## Goals

1. Remove every `「」` pair from the scoped reader-facing project, note, title,
   summary, and media copy by rewriting the surrounding sentence naturally.
2. Remove bare negative-first binary reframes in Chinese and English.
3. Preserve necessary factual negation, uncertainty, test limits, authorship,
   and publication boundaries.
4. Keep Chinese and English equivalent in facts, reasoning, and confidence.
5. Update `engineering-note-writer` so the later FOC draft does not recreate
   the rejected style.

## Non-Goals

- No paragraph-level narrative reconstruction or new cognition route.
- No new engineering claim, measurement, event, source, or interpretation.
- No change to application code, layout, covers, public assets, links, code
  samples, commands, paths, logs, or verbatim technical tokens.
- No change to FOC, Claude Chime, Juanyun Thermal, or the four excluded Nanjing
  source-document notes.
- No push, pull request, merge, or production deployment in this pass.

## Content Scope

The content scope stays identical to the preceding five-family cleanup.

### Digital Clock

- `content/projects/arduino-digital-clock-counter.mdx`
- `content/notes/arduino-digital-clock-counter-course-note.mdx`
- Media records whose `projectSlug` is `arduino-digital-clock-counter`

### Smart Car

- `content/projects/arduino-smart-car-line-tracker.mdx`
- `content/notes/arduino-smart-car-line-tracking-learning-note.mdx`
- Media records whose `projectSlug` is `arduino-smart-car-line-tracker`

The protected title `Arduino 循迹小车焊接与控制实训` must remain unchanged.

### DIY Cooling

- `content/projects/juanyun-diy-cooling-prototype.mdx`
- `content/notes/juanyun-diy-cooling.mdx`
- Media records whose `projectSlug` is `juanyun-diy-cooling-prototype`

### Tianjin STM32

- `content/projects/tianjin-metro-stm32-foundation.mdx`
- `content/notes/tianjin-metro-environment-monitoring-stm32.mdx`
- `content/notes/tianjin-rail-control-pid-atc-reading.mdx`
- `content/notes/tianjin-stm32-environment-setup.mdx`
- `content/notes/tianjin-stm32-gpio-exti-timer.mdx`
- `content/notes/tianjin-stm32-pwm-uart-adc.mdx`
- Media records whose `projectSlug` is `tianjin-metro-stm32-foundation`

### Nanjing Turing

- `content/projects/nanjing-turing-qt-embedded-learning.mdx`
- `content/notes/turing-three-week-development-log.mdx`
- Media records whose `projectSlug` is
  `nanjing-turing-qt-embedded-learning`

These four source-document notes remain unchanged:

- `content/notes/turing-cmake-build-logic.mdx`
- `content/notes/turing-qt-seamly2d-first-run.mdx`
- `content/notes/turing-release-packaging-cross-platform.mdx`
- `content/notes/turing-sm2d-xml-data-format.mdx`

The five media families contain 51 records. Only reader-facing `title`,
`titleZh`, `caption`, and `captionZh` values belong to this review.

## Confirmed Language Rules

### Remove Chinese corner quotation marks

Every `「」` occurrence in scoped reader copy must be resolved through sentence
structure rather than another quotation style.

- Ordinary concepts become ordinary nouns or clauses.
- A paraphrased artifact claim is introduced directly, without decorative
  quotation marks.
- Exact technical tokens use inline code where that notation is appropriate.
- A sentence must be rewritten when simply deleting the marks would make it
  awkward or change its meaning.

For example, a sentence that labels fan duty as `「风扇实际转速」` should state
directly that the screen shows a duty command and the code does not measure RPM.

### Remove bare binary reframes

Reject structures that deny A mainly to introduce B:

- `不是 A，而是 B`
- `这不是 A，这是 B`
- `问题不在 A，而在 B`
- `难点不是 A，而是 B`
- `not A but B`
- `was not A; it was B`
- other semantically equivalent negative-first binary corrections

State B directly. If A contains a real evidence boundary, write the supported
fact first and place the limit afterward.

### Preserve the confirmed conversational exception

The phrase `不是说 A 不行，而是说 B` remains acceptable when it genuinely
protects A from an unintended reading and then narrows the claim. It remains an
optional spoken move, not a recurring paragraph scaffold.

The English article should express the same nuance naturally. It does not need
to reproduce a literal `not A but B` construction.

### Preserve ordinary factual negation

Negation remains necessary for facts such as:

- a test that was not run;
- a feature that was not implemented;
- source code or evidence that was not retained;
- an authorship or publication limit;
- a technical condition that cannot be satisfied;
- an unknown cause that the evidence cannot establish.

Where possible, lead with the supported fact and add the missing scope after it.
This changes the rhetoric without weakening the boundary.

## Writer Skill Changes

The runtime writer guidance will be updated before the content pass.

1. Add `「」` to the scoped reader-prose punctuation ban in
   `references/reader-prose-hard-gates.md`.
2. Remove the current recommendation to replace double quotation marks with
   `「」`; recommend direct syntax, no marks, or inline code for exact technical
   tokens.
3. Add the bare binary-reframe rule in Chinese and English, with an explicit
   exception for `不是说 A 不行，而是说 B`.
4. Keep that confirmed phrase in `references/voice-rules.md`, while removing or
   rewriting examples that normalize decorative `「」`.
5. Add the new checks to `references/self-review.md`, bilingual guidance, and
   the skill test rubric.
6. Add one narrow current-rule regression case that distinguishes the rejected
   binary reframe, the accepted conversational qualifier, and ordinary factual
   negation.
7. Scan runtime references for conflicting examples. Historical inputs,
   baseline outputs, revised outputs, comparison notes, and provenance records
   remain unchanged because Trials 01–11 are frozen evidence for their recorded
   runtimes rather than release-ready fixtures for the new rule.

The interview, evidence, cognition-led composition, truth, and bilingual parity
workflows remain unchanged.

## Rewrite Method

Each candidate receives a semantic classification before editing:

1. Decorative corner-quote label: integrate the phrase into normal syntax.
2. Bare binary reframe: state the useful conclusion directly.
3. Evidence boundary written as a reframe: state the supported result first,
   then the limitation.
4. Ordinary factual negation: retain it unless local sentence order needs a
   small repair.
5. Confirmed conversational qualifier: retain it when it performs real nuance,
   not merely rhythm.

Chinese is repaired first. English is then adapted around the same information
move rather than patched word for word. Nearby sentences may be adjusted only
as much as needed for natural rhythm.

## Verification

### Automated scans

- Zero `「」` occurrences in all scoped reader-facing content and media values.
- Zero applicable bare binary-reframe patterns in Chinese and English.
- The accepted `不是说 A 不行，而是说 B` form is exempted explicitly rather
  than hidden by a broad regex exclusion.
- Runtime writer guidance and the new current-rule regression case contain no
  instruction or expected output that conflicts with the new rule.

Automated pattern scans are candidate finders. Every negative sentence still
receives semantic review so factual boundaries are not deleted.

### Scope guards

- The 14 approved MDX files, selected media values, writer runtime files, test
  rubric, new current-rule regression case, design, and implementation plan are
  the only allowed changes.
- FOC, Claude Chime, Juanyun Thermal, and the four Nanjing source-document notes
  must have zero diff.
- Covers, assets, dates, tags, links, visibility, code, and public uploads must
  remain unchanged.

### Repository checks

- `npm.cmd run lint`
- `npm.cmd run validate-content`
- `npm.cmd run validate-encoding`
- `npm.cmd run typecheck`
- `npm.cmd run build`
- writer-skill validation and regression review
- `git diff --check`

### Browser review

The current production preview must be stopped before rebuilding because it
shares `.next/`. After the checks pass, restart the preview and inspect
representative Chinese and English project/note pages at desktop and mobile
widths. Confirm meaningful content, stable layout, no horizontal overflow, and
no browser console errors.

## Commit Structure

1. Design document.
2. Implementation plan.
3. Writer-skill rule and regression update.
4. One content commit for each of the five project families.

The branch remains local for user review. It will not be pushed or merged
without separate approval.

## Acceptance Criteria

The pass is ready for review when:

- all 60 baseline corner-quote pairs have been rewritten naturally;
- no applicable bare binary reframe remains in scoped Chinese or English copy;
- the accepted conversational qualifier remains available in the writer;
- factual negation and evidence strength remain intact;
- Chinese and English still carry the same facts and limits;
- protected content and assets have no diff;
- skill, repository, build, and browser checks pass;
- the branch is clean and the local preview shows the revised copy.
