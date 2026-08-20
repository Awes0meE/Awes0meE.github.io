# Project Memory System

This is a lightweight project-local memory system inspired by `claude-mem`, adapted for Codex and other agents without requiring a background worker.

## Goals

- Preserve project context across long website-maintenance sessions.
- Avoid rediscovering deployment, architecture, and content decisions.
- Keep docs, agent instructions, and memory synchronized with code.
- Provide enough context for a future AI or human maintainer to continue safely.

## Memory Layers

| Layer | File | Audience | Purpose |
| --- | --- | --- | --- |
| Agent guide | `CODEX.md` | AI agents | How to work in this repository |
| Compatibility pointer | `AGENTS.md` | AI agents | Short pointer to `CODEX.md` |
| Product definition | `PRODUCT.md` | user, product/design contributors, AI agents | Durable audience, purpose, scope, evidence, and constraints |
| Design system | `DESIGN.md` | user, designers, developers, AI agents | Durable visual direction, interaction rules, tokens, and component behavior |
| Active rewrite handoff | `docs/active-work/portfolio-copy-rewrite.md` | AI agents and the user | Current project, branch, interview state, and next action |
| Durable memory | `MEMORY.md` | AI agents and maintainers | Current facts, decisions, open work |
| Chronology | `docs/session-log.md` | AI agents and maintainers | Append-only event history |
| Environment | `docs/environment-toolchain.md` | developers and agents | Local setup, Node/npm, PowerShell, Git, preview, and deployment tooling |
| Architecture | `docs/architecture.md` | developers and agents | How the site works |
| Content operations | `docs/content-workflow.md` | user, developers, agents | How to add portfolio content |

## Retrieval Workflow

At the start of a substantial session:

1. Read `CODEX.md`.
2. If `docs/active-work/portfolio-copy-rewrite.md` exists, read it before resuming a portfolio rewrite.
3. Read `PRODUCT.md` for product, evidence, scope, or public-surface work.
4. Read `DESIGN.md` for visual, interaction, layout, responsive, or motion work.
5. Read `MEMORY.md`.
6. Read `docs/environment-toolchain.md` when setting up or verifying a machine.
7. Read task-relevant docs under `docs/`.
8. Inspect the live code before making changes.

Do not rely on memory when the code can cheaply verify the fact.

## Update Workflow

At the end of a milestone:

1. Update `MEMORY.md` with durable facts and decisions.
2. Append a short entry to `docs/session-log.md`.
3. Update `PRODUCT.md` if audience, purpose, scope, evidence on hand, or product constraints changed.
4. Update `DESIGN.md` if the durable visual system, interaction behavior, motion, or component rules changed.
5. Update `docs/environment-toolchain.md` if Node/npm, shell, local preview, or deployment tooling changed.
6. Update `docs/architecture.md` if routes, data flow, deployment, or dependencies changed.
7. Update `docs/content-workflow.md` if content operations changed.
8. Update `README.md` or `USER_GUIDE.md` if human-facing usage changed.

## What Belongs In MEMORY.md

Store:

- stable decisions;
- deployment facts;
- domain facts;
- content model facts;
- non-obvious project conventions;
- open work that future sessions should know.

Do not store:

- secrets;
- access tokens;
- private credentials;
- noisy command logs;
- every small edit;
- stale speculation.

## Session Log Format

Append entries like:

```markdown
## 2026-05-06

- Summary: ...
- Files changed: ...
- Verification: ...
- Follow-up: ...
```

Use absolute dates and concise language.

## Installed External Skills

- `karpathy-guidelines`: reduce LLM coding mistakes through assumptions, simplicity, surgical edits, and verifiable goals.
- `neat-freak`: reconcile project docs, agent memory, and code at development milestones.
- `grill-me` and `grilling`: interview the user one project at a time and turn voice answers into shared understanding before the repository-local writer is used.
- `impeccable`: external web-design workflow from `https://github.com/pbakaus/impeccable`, installed machine-locally at `.agents/skills/impeccable`. Its `.agents/` tooling and `.impeccable/` session state do not travel with Git; durable product and design decisions belong in `PRODUCT.md` and `DESIGN.md`.

Restart Codex after installing external skills so they appear in the tool's native skill list.
