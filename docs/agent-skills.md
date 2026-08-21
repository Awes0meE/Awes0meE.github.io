# Agent Skills Used

This project uses two repository-local workflows and guidance from five external sources.

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
  - `skills/engineering-note-writer/references/shared-understanding.md`
  - `skills/engineering-note-writer/references/research-expansion.md`
  - `skills/engineering-note-writer/references/cognition-led-composition.md`
  - `skills/engineering-note-writer/references/voice-rules.md`
  - `skills/engineering-note-writer/references/editorial-fusion.md`
  - `skills/engineering-note-writer/references/reader-prose-hard-gates.md`
  - `skills/engineering-note-writer/references/bilingual-writing.md`
  - `skills/engineering-note-writer/references/self-review.md`
  - `skills/engineering-note-writer/references/style-examples.md`
- direct-prose regression fixture:
  - `skills/engineering-note-writer/tests/direct-prose-regression.md`

Purpose:

- Turn rough user bullet points, project details, timelines, technical stacks, evidence files, and a user-confirmed brief into cognition-led Chinese-first engineering-note prose with accurate English counterparts.
- Research current reliable knowledge beyond the uploaded material after the brief, without converting external context into invented project history, actions, results, or measurements.
- Keep facts and authorship evidence-gated while following the user's changing understanding across systems or chronology, without imposing a cognition template.
- Carry stronger emotion, rhythm, and evidence-grounded humor in Chinese, with a slightly calmer but substantively equivalent English version.
- Run one repository-local voice-preserving editorial pass after the Chinese cognition draft, keeping Li Zhiyi's identity and confirmed emotional intensity unchanged in both languages.
- Require first-person learning-note prose to pass the Truth gate and Li Zhiyi gate, and require model-authored project/note article body to pass the scoped zero-hit reader-prose L1 gate; keep requested neutral audits, summaries, and captions scoped to their neutral purpose.
- Use direct assertions and normal sentence syntax in scoped normal narration, with no Chinese corner quotes there and inline code for exact technical tokens. Reject bare negative-first binary reframes; preserve ordinary factual negation and the exact user-confirmed `不是说 A 不行，而是说 B` form.
- Support `AddProject.skill` during project imports by drafting project body copy, related notes, summaries, tags, and media captions.

Use it when the user asks to write, rewrite, polish, humanize, or structure project/note/media copy in the user's engineering-note style.

Dated five-way comparison inputs, blind candidates, mappings, and fact audits live under `docs/experiments/`. They are maintenance evidence for the repository-local writer and are not imported into the website or promoted into public content automatically.

## impeccable

Source:

- `https://github.com/pbakaus/impeccable`

Machine-local Codex path:

- `.agents/skills/impeccable`

Purpose:

- Audit, critique, redesign, and polish web interfaces with explicit product context, visual direction, responsive behavior, accessibility, and meaningful motion.
- Keep the portfolio's evidence boundary intact while improving hierarchy, layout, typography, color, interaction, and visual coherence.
- Treat `PRODUCT.md` as the durable product contract and `DESIGN.md` as the durable visual and interaction contract for future sessions and other machines.

The `.agents/` skill installation and `.impeccable/` tool/session state are machine-local and excluded from version control. They may be recreated on another device from the upstream source, but they are not durable project memory and must not replace `PRODUCT.md` or `DESIGN.md`.

## grill-me and grilling

Source:

- `https://github.com/mattpocock/skills`

Global Codex install:

```bash
npx skills@latest add mattpocock/skills -g -a codex -s grill-me grilling -y
```

Purpose:

- Treat `grill-me` as a required runtime dependency for substantial new project prose, rewrites, or humanization when no user-confirmed brief exists.
- Reuse a confirmed brief for the same project and scope. A new interview is not required for a narrow neutral audit, summary, or caption that introduces no personal claims.
- Work through the current decision frontier in numbered rounds rather than
  asking every possible follow-up at once.
- Turn disordered voice answers into shared understanding before invoking the
  repository-local `engineering-note-writer`.
- Keep public and artifact fact investigation as the agent's responsibility;
  ask the user only for personal motivations, decisions, reactions, and
  remembered observations.

These skills are machine-global and do not travel with the Git clone. Install
them separately on each device; the active interview state travels through
`docs/active-work/portfolio-copy-rewrite.md`.

## karpathy-guidelines

Source:

- `https://github.com/forrestchang/andrej-karpathy-skills`

Expected user-level Codex skill:

- `karpathy-guidelines`

Rules incorporated into `CODEX.md`:

- make assumptions explicit;
- avoid hidden confusion;
- keep changes simple;
- edit surgically;
- define success criteria and verify.

## neat-freak

Source:

- `https://github.com/KKKKhazix/khazix-skills/blob/main/neat-freak/SKILL.md`

Expected user-level Codex skill:

- `neat-freak`

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
