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
  - `skills/engineering-note-writer/references/hard-gated-checklist.md`
  - `skills/engineering-note-writer/references/voice-rules.md`
  - `skills/engineering-note-writer/references/note-archetypes.md`
  - `skills/engineering-note-writer/references/bilingual-writing.md`
  - `skills/engineering-note-writer/references/self-review.md`

Purpose:

- Turn rough user bullet points, project details, timelines, technical stacks, evidence files, and oral notes into Chinese-first engineering-note prose with accurate English counterparts.
- Preserve the portfolio's practical learning-log voice: concrete files, symptoms, decisions, evidence, and looking-back reflection rather than resume, paper, corporate, AI handoff language, meta-document openings about "重新整理/处理后/归档后" notes, or negation-then-reframe polishing.
- Use the hard-gated checklist for evidence/fact sheet, structure, banned wording and contrast frames, bilingual equivalence, MDX readiness, and self-review before final copy.
- Support `AddProject.skill` during project imports by drafting project body copy, related notes, summaries, tags, and media captions.

Use it when the user asks to write, rewrite, polish, humanize, or structure project/note/media copy in the user's engineering-note style.

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
