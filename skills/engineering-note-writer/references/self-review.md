# Self Review

Run the independent Truth and Li Zhiyi gates on the finished draft, then run the reader-prose and editorial-conservation gates where they apply. Every applicable gate must pass before calling the draft ready.

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

For model-authored project and note article body, run every scoped check in `reader-prose-hard-gates.md`. L1-1 banned wording, prohibited L1-2 punctuation use, L1-3 canned structure, and L1-4 note-specific prohibitions must all reach zero applicable violations in both languages.

Scan reader-visible `title` and `titleZh` even when they are stored in frontmatter. Do not scan other frontmatter, metadata, Markdown syntax, URL or link destinations, code, commands, file paths, raw errors or logs, verbatim artifacts, or exact technical strings. Do not use these exclusions to shelter ordinary prose. Any applicable hit blocks release.

- Are em dashes and dash substitutes absent from model-authored normal prose?
- Does each colon perform a real semantic job rather than label a template section, and is the same colon frame free from dense repetition?
- Does each quotation mark identify traceable wording, a real utterance, a UI label, a document claim, or a term genuinely being discussed? Are decorative and densely repeated scare quotes absent?
- Do all user-specified prohibitions for this note reach zero hits at the scope the user set: exact forms and obvious variants for an expression ban, or direct functional equivalents for a construction or reader-effect ban?
- Are bare negative-first binary reframes absent in both languages?
- If `不是说……不行，而是说……` appears, does it prevent a real misreading rather than repeat as scaffolding?
- Are factual, evidence, authorship, and publication boundaries explicit and kept near the claims they limit? When a supported positive fact exists, it may lead; when the negative boundary is itself the fact, state it directly without inventing a positive lead.

## Gate 4: Editorial Conservation

Use `editorial-fusion.md` to compare the approved source and finished draft.

- Are every retained claim, actor, number, date, version, link, quotation, citation, exact technical token, uncertainty, and publication boundary unchanged in meaning?
- Are the source-supported cognition changes and cross-subsystem connections still present after paragraph consolidation?
- Are the confirmed emotional intensity, reaction, humor target, self-correction, and unresolved tension still present without being neutralized or amplified?
- Is the voice still Li Zhiyi's, without imported vocabulary, register, cadence, cultural pose, audience relationship, or persona from another writer?
- Were AI-pattern repairs made by function and recurrence instead of mechanical word replacement?

An unsupported addition, lost claim, changed actor, flattened voice anchor, or imported persona blocks release. Restore the protected material instead of adding a disclaimer.

## Supporting Check: Cognition-Led Flow

- Does the opening stand on a concrete artifact, action, symptom, or question?
- Does every section add information or change the reader's understanding?
- Did a detour return to the active engineering problem?
- Is the page title a short, accurate, precise learning-note index rather than a hook, metaphor, thesis sentence, or subtitle pair?
- Are section headings concise labels for the following work or study block, with the body carrying the anecdote and cognition change?
- Does the ending stop at the last useful beat instead of completing a template?

Delete repeated lessons and shorten headings without deleting the exact subject or scope needed to identify the material.

## Supporting Check: Voice And Humor

- Is personality present beside the actual friction, not only in the conclusion?
- Does humor come from a real tool, file, symptom, mismatch, or mistaken assumption?
- Do related facts, explanations, and judgments share substantial paragraphs where they belong?
- Do paragraph and sentence lengths vary naturally without a style quota, while a one-sentence paragraph appears only when a real pause earns it?
- Is technical detail doing more work than broad praise?
- Are known tools and models named exactly, with unknown names left unguessed?

If a joke could survive after replacing every technical noun with `某工具`, it is probably generic. Ground it or remove it.

## Supporting Check: Bilingual And MDX

- Do Chinese and English contain the same narrative nodes and ending?
- Does English sound natural without lowering or amplifying the confirmed emotional intensity or becoming shorter in substance?
- Are technical terms stable?
- Do paired titles and headings name the same concise subject and scope without forcing identical word order or paragraph boundaries?
- Are frontmatter, links, captions, code fences, and visibility accurate for the target file?

## Report Only When Useful

Return the finished prose by default. If the user requests a review, keep it short:

```text
Truth gate:
Li Zhiyi gate:
Reader-prose L1 gate:
Editorial-conservation gate:
Cognition-flow or humor issue:
Bilingual mismatch:
Recommended revision:
```

Do not wrap normal writing output in an assumptions report, archetype label, or full checklist.
