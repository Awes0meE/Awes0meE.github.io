# Agent Skills Used

This project has incorporated guidance from three external sources.

## repo-local add-project

Source:

- `skills/add-project/SKILL.md`
- root shortcut: `AddProject.skill`

Purpose:

- Import a user-provided local project folder into this portfolio as a polished branch.
- Audit the source folder, curate public-safe assets, create bilingual notes, create the project page, update `content/media.json`, verify, push each milestone to GitHub, and run `/neat`-style handoff cleanup.

Use it when the user says they want to add/deploy a new project, note set, or media set from a local path.

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
