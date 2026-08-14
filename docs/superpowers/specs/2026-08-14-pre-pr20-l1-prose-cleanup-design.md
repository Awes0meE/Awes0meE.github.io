# Pre-PR20 Project Prose L1 Cleanup Design

## Goal

Apply the reader-prose L1 rules introduced through pull request #20 to the five
older project families, then make small local style improvements so the repaired
sentences remain natural. This is a narrow cleanup, not a new cognition-led
rewrite.

## Approved Scope

Work on the reader-facing prose for these project families:

1. Arduino Digital Clock: project page, related learning note, and 11 media
   records.
2. Arduino Smart Car: project page, related learning note, and 12 media records.
3. DIY Cooling: project page, related learning note, and 6 media records.
4. Tianjin STM32: project page, five related learning notes, and 3 media records.
5. Nanjing Turing: project page, the model-authored three-week development note,
   and all 19 currently related media records.

The four Nanjing Turing notes that directly render or closely preserve original
source documents remain unchanged. Their artifact prose is outside the
model-authored L1 rewrite scope.

The user's current instruction overrides the earlier protection on the Smart Car
copy for this branch. The FOC, Claude Chime, and Juanyun thermal families remain
outside scope.

## Editing Boundary

- Remove applicable L1 wording, punctuation, and canned-structure hits from
  model-authored reader prose.
- Improve the immediate sentence or paragraph only when needed to avoid an
  awkward mechanical replacement.
- Preserve confirmed facts, authorship, uncertainty, measurements, chronology,
  technical identifiers, links, image placement, and bilingual substance.
- Preserve project and note titles, frontmatter, dates, tags, slugs, visibility,
  covers, public assets, code excerpts, and application behavior.
- Do not add external research, new technical interpretation, invented scenes,
  new first-person claims, or a new article structure.
- Keep media changes limited to the selected records' reader-facing titles and
  captions.

Because this is a narrow wording-and-style pass over already approved prose, it
uses the skill's narrow-edit exception and does not reopen the five project
interviews.

## Workflow

1. Read the current L1 hard-gate and self-review rules.
2. Audit only the scoped model-authored body prose and selected media records.
3. Repair applicable hits and polish the surrounding language without widening
   the claims.
4. Check Chinese and English for equivalent facts and certainty.
5. Review and commit each project family as an independent checkpoint.
6. Run repository-wide content and production verification after all five
   checkpoints.

## Git And Review

- Working branch: `docs/rewrite-pre-pr20-projects`.
- Use one Conventional Commit per completed project family.
- Do not merge to `main` or publish a release without explicit user approval.
- Deliver the final branch as a reviewable set with a concise per-project change
  summary.

## Verification

Each family must pass its scoped L1 audit and `git diff --check`. The completed
branch must pass:

```powershell
npm.cmd run lint
npm.cmd run validate-content
npm.cmd run validate-encoding
npm.cmd run typecheck
npm.cmd run build
```

Representative project, note, and media routes should also be reviewed in both
language modes without changing site layout or assets.
