# Self Review

Run the independent Truth and Li Zhiyi gates on the finished draft, then run the reader-prose L1 gate where it applies. Every applicable gate must pass before calling the draft ready.

## Gate 1: Truth

- Do all project actions and results have support?
- Are researched claims accurate, with direct links near the claims they support?
- Does each uncertainty have the right strength and stay near the claim it limits?
- Are Chinese and English factually equivalent?
- Are publication paths real or clearly provisional?
- If a first-person scene was reconstructed, are its event and emotional direction confirmed, with no invented surrounding facts?

Repair or remove unsupported claims. Do not compensate with a longer visible disclaimer.

## Gate 2: Li Zhiyi

- Can the reader follow what I noticed?
- Can the reader follow why my attention moved when it did, where a focus change genuinely exists?
- Can the reader see what corrected me or changed my mind or understanding?
- Can the reader see where earlier learning came together, when the source contains that synthesis?

Do not require every move type when the source does not support it. Evaluate the genuine cognition route available. If the reader cannot follow a person noticing, learning, correcting himself, changing focus where relevant, or combining ideas where supported, this gate fails even when Gate 1 passes.

The following voices fail this gate: compliance report, archive description, project handoff, recruiter summary, academic abstract, neutral survey, and imitation of another creator.

On failure, return to the cognition trail and rebuild around attention and changed understanding. Adding first-person pronouns or jokes, or swapping formal terms for casual ones, is cosmetic and still fails.

## Gate 3: Reader-Prose L1

For model-authored project and note article body, run every scoped check in `reader-prose-hard-gates.md`. L1-1 banned wording, L1-2 banned punctuation, and L1-3 canned structure must all reach zero hits in both languages.

Do not scan frontmatter, metadata, Markdown syntax, URL or link destinations, code, commands, file paths, raw errors or logs, verbatim artifacts, or exact technical strings. Do not use these exclusions to shelter ordinary prose. Any applicable hit blocks release.

- Are corner quotation marks absent from scoped reader prose?
- Are bare negative-first binary reframes absent in both languages?
- If `不是说……不行，而是说……` appears, does it prevent a real misreading rather than repeat as scaffolding?
- When a supported fact needs a factual, evidence, authorship, or publication limit, is the supported fact stated before its limit?

## Supporting Check: Cognition-Led Flow

- Does the opening stand on a concrete artifact, action, symptom, or question?
- Does every section add information or change the reader's understanding?
- Did a detour return to the active engineering problem?
- Do headings name the content below them and obey the heading constraints in `SKILL.md`?
- Does the ending stop at the last useful beat instead of completing a template?

Delete repeated lessons and rename generic headings from the content underneath them.

## Supporting Check: Voice And Humor

- Is personality present beside the actual friction, not only in the conclusion?
- Does humor come from a real tool, file, symptom, mismatch, or mistaken assumption?
- Does the prose vary rhythm without using a style quota?
- Is technical detail doing more work than broad praise?
- Are known tools and models named exactly, with unknown names left unguessed?

If a joke could survive after replacing every technical noun with `某工具`, it is probably generic. Ground it or remove it.

## Supporting Check: Bilingual And MDX

- Do Chinese and English contain the same narrative nodes and ending?
- Is English slightly calmer without becoming flat or shorter in substance?
- Are technical terms stable?
- Do paired headings name the same subject?
- Are frontmatter, links, captions, code fences, and visibility accurate for the target file?

## Report Only When Useful

Return the finished prose by default. If the user requests a review, keep it short:

```text
Truth gate:
Li Zhiyi gate:
Reader-prose L1 gate:
Cognition-flow or humor issue:
Bilingual mismatch:
Recommended revision:
```

Do not wrap normal writing output in an assumptions report, archetype label, or full checklist.
