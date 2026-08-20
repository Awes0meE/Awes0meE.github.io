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
   - if `docs/active-work/portfolio-copy-rewrite.md` exists, read it before
     resuming the active rewrite;
   - `PRODUCT.md` for product, scope, and evidence constraints;
   - `DESIGN.md` for visual, layout, interaction, or motion work;
   - `MEMORY.md`
   - `docs/environment-toolchain.md`
   - `docs/memory-system.md`
   - `docs/architecture.md`
   - `docs/content-workflow.md`
   - `README.md`
3. Check local environment:
   - `node --version`
   - `npm --version`, `command -v node`, and `command -v npm` on macOS/Linux
   - `npm.cmd --version`, `where.exe node`, and `where.exe npm.cmd` on Windows PowerShell
   - if PowerShell cannot find npm, check `C:\Program Files\nodejs` and refresh PATH.
4. Check whether external Codex skills exist:
   - `karpathy-guidelines`
   - `neat-freak`
   - `grill-me`
   - `grilling`
   - `impeccable`
   If missing, install them from the sources listed in `docs/agent-skills.md`, or fall back to the rules already summarized in `CODEX.md`.
5. Run verification before substantial edits:
   - use `npm` on macOS/Linux and `npm.cmd` on Windows PowerShell;
   - install if `node_modules/` is missing or stale;
   - run lint, typecheck, and the production build.

Do not assume another device has the same global memory, PATH, installed plugins, or uncommitted files. Use the project-local docs as the portable source of truth and rebuild missing context quickly.

Use Conventional Commits for commit messages. Name topic branches with a Conventional Commits-aligned semantic prefix and a concise kebab-case purpose, such as `docs/update-handoff` or `fix/mobile-overflow`. Treat Codex-authored work like ordinary human-authored development: never use identity prefixes such as `agent/`, `codex/`, `ai/`, or `bot/`.

This repository uses `CODEX.md` as the canonical AI-agent operating guide.

Before making non-trivial changes, read:

1. `CODEX.md`
2. `PRODUCT.md` when the task affects product scope or public evidence.
3. `DESIGN.md` when the task affects visuals, layout, interaction, or motion.
4. `MEMORY.md`
5. `docs/architecture.md`
6. `docs/content-workflow.md`
7. `docs/memory-system.md`

Keep `AGENTS.md` short. Put detailed project rules in `CODEX.md` so all agents have one source of truth.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
