# Writing Experiments Archive

This directory stores dated, read-only comparisons used to evaluate writing and
humanization workflows. It is evidence for maintaining the repository-local
`engineering-note-writer`; it is not website content and is not imported by the
Next.js application.

The five-way trials keep their own source snapshot, shared fact package, isolated
tool configurations, named outputs, blind copies, answer key, comparison sheet,
and fact/ownership/privacy audit. Direct fusion trials keep the approved rewrite
and its before/after audit. Material is promoted into `content/projects/` or
`content/notes/` only after explicit user approval; the experiment copy then
remains as frozen decision evidence.

Current archives:

- `de-ai-note-comparison-2026-08-21/`: ACUnit automatic-control note comparison.
- `de-ai-seamly2d-comparison-2026-08-21/`: Seamly2D three-week development-note comparison.
- `engineering-writer-fusion-claude-chime-2026-08-21/`: user-approved full-note
  trial of the fused engineering writer, with the accepted MDX snapshot and
  before/after audit.
- `chinese-gate-claude-chime-project-2026-09-06/`: complete bilingual Claude
  Chime project-page rewrite using the Chinese sentence gate, with original
  and candidate MDX, full Markdown/HTML comparisons, and a fact/gate review.
  The user approved the candidate on 2026-09-06 and it was copied exactly into
  the project content file for publication. The comparison and audit remain
  frozen evidence of the earlier review stage; their original pending-review
  labels describe that stage, not the current approval state. Current handoff:
  `docs/active-work/portfolio-copy-rewrite.md`.
- `claude-chime-homepage-three-way-2026-10-13/`: Chinese-first comparison of
  the live Claude Chime homepage (`00-current.mdx`), a free-form rewrite
  (`01-free.mdx`), a writer-skill rewrite (`02-skill.mdx`), the first merge the
  user rejected for its counted-question framing (`03-merged.mdx`) and the
  published bilingual candidate (`04-final.mdx`). PR #40 published the final
  version; PR #39 turned the two rejected patterns into writer rules.

Keep future experiment directories date-stamped. Preserve their original inputs,
candidate mapping, and final audits so later writing-rule changes can be traced
without rewriting historical outputs.
