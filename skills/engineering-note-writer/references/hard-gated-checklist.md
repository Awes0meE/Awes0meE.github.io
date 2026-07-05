# Engineering Note Writer Hard-Gated Checklist

Use this before drafting, rewriting, translating, or finalizing portfolio prose.

Rule: do not move past a gate until the checklist is satisfied. If a gate fails, revise the draft, gather evidence, or ask one focused question.

## Gate 0 - Context Loaded

- [ ] Task-relevant parts of `CODEX.md`, `MEMORY.md`, and `docs/content-workflow.md` are known.
- [ ] Representative existing notes or the target project page were checked when matching style matters.
- [ ] `references/voice-rules.md` has been read.
- [ ] `references/note-archetypes.md` has been read.
- [ ] `references/bilingual-writing.md` has been read when English or MDX bilingual output is needed.
- [ ] `references/self-review.md` has been read before finalizing.

## Gate 1 - Fact Sheet Exists

- [ ] Project, time range, context, role/action, technical stack, evidence files, result, and uncertainties are recorded internally.
- [ ] Every personal-action claim is supported by user input, existing content, or source evidence.
- [ ] Unknown facts stay unknown instead of being filled with generic claims.
- [ ] Public/private constraints are known when the prose mentions company, internship, lab, client, or third-party material.
- [ ] The draft has at least three concrete anchors when possible: files, tools, symptoms, screenshots, commands, boards, logs, dates, or paths.

## Gate 2 - Structure Chosen

- [ ] One primary archetype is selected.
- [ ] A timeline spine or system spine is written before prose.
- [ ] The first section starts from a concrete situation, file, symptom, or project need.
- [ ] The title/summary/opening does not describe the note as a "重新整理", "处理后", or "归档后" document artifact.
- [ ] The ending has a real looking-back point or next evidence gap.
- [ ] File/evidence lists explain why the evidence matters.

## Gate 3 - Chinese Draft Passes Voice

- [ ] The Chinese draft sounds like a practical engineering note, not a resume, product pitch, thesis abstract, or AI handoff.
- [ ] Paragraphs are grounded in concrete observations rather than broad self-praise.
- [ ] First person is used only when evidence supports it.
- [ ] The prose keeps useful limits, uncertainty, and unfinished parts.
- [ ] Bullets are used only for parallel evidence, file lists, or checklist-like material.

## Gate 4 - Forbidden Wording Scan Passed

- [ ] No corporate filler: `赋能`, `闭环`, `抓手`, `沉淀`, `落地成效`.
- [ ] No AI handoff filler: `本次仅公开`, `公开证据边界`, `功能改动没有故意扩大`.
- [ ] No meta-document openings: `这是一次对...重新整理后的学习笔记`, `这是一篇...重新整理...`, `重新整理的一篇学习记录`, `处理后的总结文档`, `归档后的学习笔记`.
- [ ] No scaffold filler: `首先 / 其次 / 最后` unless a real numbered method needs it.
- [ ] No negation-then-reframe templates: `不是...而是...`, `不是为了...而是...`, `并不是...而是...`, `不只是...而...`, `not X but Y`, `not only...but...`.
- [ ] Any broad claim has been replaced with a concrete file, decision, symptom, or limitation.

Useful scan for MDX or Markdown targets:

```powershell
rg -n "赋能|闭环|抓手|沉淀|落地成效|本次仅公开|公开证据边界|功能改动没有故意扩大|这是一次.*重新整理|这是一篇.*重新整理|这篇.*重新整理|本文.*重新整理|本篇.*重新整理|重新整理的一篇|重新梳理.*学习|整理后.*学习笔记|处理后的总结|总结文档归档|归档后的学习笔记|首先|其次|最后|不是.*而是|不是为了.*而是|并不是.*而是|不只是.*而|not .* but |not only" <target-file>
```

## Gate 5 - Bilingual Equivalence Passed

- [ ] Chinese is the source of truth.
- [ ] English covers the same reasoning, evidence, limits, and reflection.
- [ ] English is not more boastful or more polished than the Chinese.
- [ ] Technical terms stay stable across both languages.
- [ ] Bilingual headings follow the repository style.

## Gate 6 - MDX And Public Boundary Passed

- [ ] `title/titleZh`, `summary/summaryZh`, tags, dates, and visibility are accurate when metadata is requested.
- [ ] Public paths are real or clearly marked as placeholders.
- [ ] No fabricated upload path, repo link, metric, award, or role claim is introduced.
- [ ] Sensitive material is described through safe public evidence or reference-only wording.
- [ ] Code fences and language-scoped blocks are used only where the site expects them.

## Gate 7 - Self Review Completed

- [ ] L1 fact integrity passed.
- [ ] L2 structure passed.
- [ ] L3 voice passed.
- [ ] L4 bilingual equivalence passed when applicable.
- [ ] L5 public boundary passed.
- [ ] L6 MDX readiness passed when applicable.
- [ ] Remaining open questions are listed instead of hidden.
