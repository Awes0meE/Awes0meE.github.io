# Cross-Device Portfolio Rewrite Handoff Design

> **Historical status / 历史状态:** Implemented and merged through pull request #5, then reconciled during the later cross-device cleanup merged through pull request #7. This specification is retained only as a historical design record; the branch and relay state below are not current work.

**Date:** 2026-08-11

**Status:** Approved in conversation and after written-spec review

**Branch:** `agent/rewrite-ai-authored-portfolio-copy`

**Baseline:** `4a6527344d5f47b3f7aef00e7a8cc098151ffd16`

## Objective

Make the active portfolio-copy rewrite portable between the user's Windows
computer and MacBook without depending on machine-local chat files, Codex
memory, installed skills, or an unpushed worktree.

Both devices will use the same GitHub topic branch in a relay workflow. Only
one device may write repository files at a time. The device being left must
commit and push before the other device pulls and resumes.

## Chosen Approach

Use a repository-tracked active-work document as the canonical task handoff.
GitHub remains the source of truth for code and prose; the active-work document
remains the source of truth for the current interview and next action.

This was selected over two alternatives:

- A GitHub Issue would be easy to view but could drift away from the exact
  repository revision and scatter context across comments.
- A Draft PR description is useful for final review but is too coarse for a
  frequently updated interview and writing checkpoint.

## Relay Protocol

Before leaving the active device:

1. Finish the current coherent checkpoint.
2. Update the active-work document if the interview state or next action
   changed.
3. Run the checks appropriate to the changed files.
4. Commit with a Conventional Commit message.
5. Push `agent/rewrite-ai-authored-portfolio-copy` to `origin`.
6. Confirm the worktree is clean and the local branch matches its upstream.

Before starting on the other device:

1. Fetch `origin`.
2. Switch to `agent/rewrite-ai-authored-portfolio-copy`.
3. Pull with `--ff-only`.
4. Read `AGENTS.md`, `CODEX.md`, and the active-work document before acting.
5. Confirm the worktree is clean.
6. Resume from the active-work document's explicit next action.

If either device has uncommitted changes, the relay stops. The user or Codex
must inspect and preserve those changes before pulling; no reset, forced
checkout, or overwrite is allowed.

## Repository Changes

### Active-work handoff

Create `docs/active-work/portfolio-copy-rewrite.md` with:

- the one-project-at-a-time rewrite objective;
- the instruction to leave the approved Smart Car family unchanged;
- the requirement to run `grill-me` before writing each remaining project;
- the current project, `DIY 压风式散热器原型`;
- confirmed user decisions, including keeping the public demonstration video
  unchanged;
- the evidence already inspected for the DIY cooling project;
- the current Q1-Q8 interview frontier;
- the explicit boundary that no new DIY project or note prose has been written
  since the workflow reset;
- the next action: collect and structure the user's voice answers before
  drafting anything;
- a short update rule so later checkpoints replace stale state instead of
  appending an endless session log.

The active-work document may contain private working context needed to write
the public page, but it must not copy passwords, tokens, private email
addresses, location data, or other secrets into Git.

### Agent entrypoint

Add one pointer to `AGENTS.md` directing a new device or fresh Codex session to
read `docs/active-work/portfolio-copy-rewrite.md` when it exists. Keep the
remainder of `AGENTS.md` focused on portable bootstrap instructions.

### macOS bootstrap

Add a macOS relay section to `docs/environment-toolchain.md` covering:

- a clean clone when the repository is absent;
- fetch, branch switch, and fast-forward-only pull when it already exists;
- Node.js 22 or newer and npm 10 or newer;
- `npm install` and the repository validators;
- global installation of `grill-me` and `grilling` for Codex;
- the rule that the repository-local `engineering-note-writer` arrives with
  the clone and must not be replaced by a similarly named global skill.

### Skill registry

Add `grill-me` and its reusable `grilling` dependency to
`docs/agent-skills.md`, including the upstream repository, global install
command, and their role in the one-project-at-a-time interview workflow.

## Scope Boundaries

This setup changes documentation only. It must not modify:

- project or learning-note MDX;
- `content/media.json`;
- `public/uploads/`;
- the approved Smart Car copy;
- the DIY cooling demonstration video;
- homepage identity or SEO copy;
- application code or dependencies.

It does not merge the current Draft PR into `main`. Both devices continue on
the existing topic branch until the user separately approves final review and
merge.

## Verification

Before publishing the implementation checkpoint:

1. Confirm only the approved documentation files changed.
2. Run `git diff --check`.
3. Scan the active-work file for secrets, private email addresses, and local
   absolute paths that should not be committed.
4. Confirm the Smart Car project/note, all other content MDX, `content/media.json`,
   and `public/uploads/` are unchanged from the baseline.
5. Commit with `docs(collab): add cross-device rewrite handoff`.
6. Push the topic branch and verify local `HEAD` equals
   `origin/agent/rewrite-ai-authored-portfolio-copy`.

## Success Criteria

The setup is complete when a fresh Codex session on the MacBook can clone or
update the topic branch, read one tracked active-work document, recover the
full DIY cooling interview state, and continue with Q1-Q8 without asking the
user to reconstruct earlier context or touching portfolio prose prematurely.
