# Agent Skills Used

This project has incorporated guidance from three external sources.

## repo-local add-project

Source:

- `skills/add-project/SKILL.md`
- root shortcut: `AddProject.skill`
- focused references:
  - `skills/add-project/references/hard-gated-checklist.md`
  - `skills/add-project/references/intake-template.md`
  - `skills/add-project/references/source-audit.md`
  - `skills/add-project/references/public-safety.md`
  - `skills/add-project/references/content-build.md`
  - `skills/add-project/references/review-and-release.md`

Purpose:

- Turn a user-provided raw project-material folder into portfolio-ready content.
- Run a staged SOP: intake, read-only source audit, public/private classification, user confirmation for ambiguous material, public-safe upload normalization, bilingual project/note/media creation, local preview, verification, Git handoff, optional release, and memory/docs cleanup.
- Use the hard-gated checklist as the live phase gate before copying, writing, verifying, committing, pushing, merging, tagging, or releasing.
- Keep the public boundary explicit: `public/uploads/` is public internet, and sensitive/company/private files must not be copied merely because they are unlinked.

Use it when the user says they want to add/deploy/update a project, note set, media set, or public project archive from a local path.

## repo-local engineering-note-writer

Source:

- `skills/engineering-note-writer/SKILL.md`
- focused references:
  - `skills/engineering-note-writer/references/evidence-and-boundaries.md`
  - `skills/engineering-note-writer/references/material-led-composition.md`
  - `skills/engineering-note-writer/references/voice-rules.md`
  - `skills/engineering-note-writer/references/bilingual-writing.md`
  - `skills/engineering-note-writer/references/self-review.md`
  - `skills/engineering-note-writer/references/style-examples.md`

Purpose:

- Turn rough user bullet points, project details, timelines, technical stacks, evidence files, and oral notes into Chinese-first engineering-note prose with accurate English counterparts.
- Keep facts and authorship evidence-gated while letting the material's own question, failure, constraint, or discovery determine the structure.
- Carry stronger emotion, rhythm, and evidence-grounded humor in Chinese, with a slightly calmer but substantively equivalent English version.
- Derive content-specific headings after drafting and follow the skill's heading limit instead of reusable framework headings or fixed closing sections.
- Support `AddProject.skill` during project imports by drafting project body copy, related notes, summaries, tags, and media captions.

Use it when the user asks to write, rewrite, polish, humanize, or structure project/note/media copy in the user's engineering-note style.

## grill-me and grilling

Source:

- `https://github.com/mattpocock/skills`

Global Codex install:

```bash
npx skills@latest add mattpocock/skills -g -a codex -s grill-me grilling -y
```

Purpose:

- Interview the user before each remaining portfolio project is rewritten.
- Work through the current decision frontier in numbered rounds rather than
  asking every possible follow-up at once.
- Turn disordered voice answers into shared understanding before invoking the
  repository-local `engineering-note-writer`.
- Keep factual inspection as the agent's responsibility and reserve personal
  motivations, decisions, reactions, and remembered observations for the user.

These skills are machine-global and do not travel with the Git clone. Install
them separately on each device; the active interview state travels through
`docs/active-work/portfolio-copy-rewrite.md`.

## karpathy-guidelines

Source:

- `https://github.com/forrestchang/andrej-karpathy-skills`

Installed local skill:

- `C:\Users\123\.codex\skills\karpathy-guidelines`

Rules incorporated into `CODEX.md`:

- make assumptions explicit;
- avoid hidden confusion;
- keep changes simple;
- edit surgically;
- define success criteria and verify.

## neat-freak

Source:

- `https://github.com/KKKKhazix/khazix-skills/blob/main/neat-freak/SKILL.md`

Installed local skill:

- `C:\Users\123\.codex\skills\neat-freak`

Rules incorporated into `CODEX.md` and `docs/memory-system.md`:

- reconcile docs and memory at milestones;
- keep agent-facing and human-facing docs separate;
- prefer editing/merging over blind appending;
- remove stale facts;
- use absolute dates.

## claude-mem

Source:

- `https://github.com/thedotmack/claude-mem`

Not installed into this repo. Its ideas were adapted into a lightweight project-local system:

- current durable memory: `MEMORY.md`;
- chronological log: `docs/session-log.md`;
- retrieval/update workflow: `docs/memory-system.md`;
- AI operating guide: `CODEX.md`.

The project-local system deliberately avoids background workers, vector databases, and hidden automation. It is plain Markdown so it is easy to inspect and version with Git.
