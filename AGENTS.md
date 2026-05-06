# AGENTS.md

## Cross-Device Bootstrap For New Codex Sessions

The user may continue this portfolio on multiple computers. A new machine may not have the same Node.js install, npm PATH, Codex skills, global memory, or local dev environment.

When starting work on a new computer or a fresh Codex session:

1. Inspect the repo first:
   - `git status --short --branch`
   - `git remote -v`
   - list root files and `docs/`
2. Read project context in this order:
   - `CODEX.md`
   - `MEMORY.md`
   - `docs/memory-system.md`
   - `docs/architecture.md`
   - `docs/content-workflow.md`
   - `README.md`
3. Check local environment:
   - `node --version`
   - `npm --version`
   - if PowerShell cannot find npm, check `C:\Program Files\nodejs` and refresh PATH.
4. Check whether external Codex skills exist:
   - `karpathy-guidelines`
   - `neat-freak`
   If missing, install them from the sources listed in `docs/agent-skills.md`, or fall back to the rules already summarized in `CODEX.md`.
5. Run verification before substantial edits:
   - `npm install` if `node_modules/` is missing or stale.
   - `npm run lint`
   - `npm run build`

Do not assume another device has the same global memory, PATH, installed plugins, or uncommitted files. Use the project-local docs as the portable source of truth and rebuild missing context quickly.

This repository uses `CODEX.md` as the canonical AI-agent operating guide.

Before making non-trivial changes, read:

1. `CODEX.md`
2. `MEMORY.md`
3. `docs/architecture.md`
4. `docs/content-workflow.md`
5. `docs/memory-system.md`

Keep `AGENTS.md` short. Put detailed project rules in `CODEX.md` so all agents have one source of truth.
