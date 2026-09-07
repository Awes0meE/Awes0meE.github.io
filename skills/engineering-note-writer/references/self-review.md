# Self Review

Run the independent Truth and Li Zhiyi gates on the finished draft, then run the reader-prose, Chinese sentence, and cross-page division gates where they apply. Every applicable gate must pass before calling the draft ready.

## Gate 1: Truth

- Do all project actions and results have support?
- Are researched claims accurate, with direct links near the claims they support?
- Is each retained claim accurate in certainty, attribution, and operating conditions? Can an unnecessary uncertain claim simply be omitted?
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

For model-authored project and note article body, run every scoped check in `reader-prose-hard-gates.md`. L1-1 banned wording, prohibited L1-2 punctuation use, L1-3 canned structure, L1-4 note-specific prohibitions, and L1-5 syntax and collocation must all reach zero applicable violations in both languages.

Scan reader-visible `title` and `titleZh` even when they are stored in frontmatter. Do not scan other frontmatter, metadata, Markdown syntax, URL or link destinations, code, commands, file paths, raw errors or logs, verbatim artifacts, or exact technical strings. Do not use these exclusions to shelter ordinary prose. Any applicable hit blocks release.

- Are em dashes and dash substitutes absent from model-authored normal prose?
- Does each colon perform a real semantic job rather than label a template section, and is the same colon frame free from dense repetition?
- Does each quotation mark identify traceable wording, a real utterance, a UI label, a document claim, or a term genuinely being discussed? Are decorative and densely repeated scare quotes absent?
- Do all user-specified prohibitions for this note reach zero hits at the scope the user set: exact forms and obvious variants for an expression ban, or direct functional equivalents for a construction or reader-effect ban?
- Are bare negative-first binary reframes absent in both languages?
- Do current and nearby article endings avoid repeatedly using the same look-back or next-time frame, including differently worded equivalents? Keep an occasional apt use; this is a repetition check, not a banned-phrase scan.
- Does each Chinese learning note have at most one prose paragraph starting with `我`, counting its introduction and all paragraphs under headings? Have the replacements been read for natural variety, complete meaning and unchanged factual status, rather than only passing a prefix count? English has no corresponding numerical limit.
- If `不是说……不行，而是说……` appears, does it prevent a real misreading rather than repeat as scaffolding?
- Is evidence-inventory commentary absent in both languages? Keep fact checking internal; write the supported action, result, or actual engineering question. Do not append lists of what the material cannot prove.
- Does every inanimate or abstract subject carry only licensed native frames or functional verbs, with experiential results expressed through 出现, 发生, 出, 遇到, or a human or situational subject?
- Do English abstract polysemes take the abstract Chinese sense (边界, 要点, 数值, 层面, 范围), with no concretized renderings?
- Do paired Chinese and English passages keep semantic equality without one-to-one clause mirroring in narrative sentences, with the Chinese using native topic-comment and zero-anaphora structure?

## Gate 4: Chinese Sentences

Re-run `chinese-sentence-gate.md` on the complete final Chinese at Step 12, even if it passed before English adaptation at Step 10. Review all six categories: 语序不当, 搭配不当, 成分残缺或赘余, 结构混乱, 表意不明, and 不合逻辑. Its article-prose scope and exclusions follow Reader-Prose L1, restricted to Chinese.

Every established fault must be repaired while preserving facts, uncertainty, and confirmed voice. A stylistic preference alone is not a fault. Recheck any Chinese changed during release review. If a repair affects a bilingual pair, align its English through the existing English and bilingual checks. The six-category gate is not applicable to English; the existing English rules are unchanged.

## Gate 5: Project/Note Division

For new or substantially rewritten project/note prose, run the Step 12 check
in `project-note-division.md` against the homepage and all available sibling
notes in both languages. The homepage must tell the user's work and project
progression; each learning note must develop its selected question with new
explanatory value. Rephrasing the same full experience or reasoning still fails.

Keep enough context for standalone reading and state retained claims precisely.
Check note-to-note overlap, linked destinations, bilingual parity,
and historical versus present learning. On failure, revisit topic and allocation
within the authorized scope. Report unavailable pages or protected-sibling
conflicts honestly; do not edit them or claim a complete family pass. Original
documents and unrelated narrow edits keep the reference's scoped exceptions.

## Supporting Check: Cognition-Led Flow

- Does the opening stand on a concrete artifact, action, symptom, or question?
- Does every section add information or change the reader's understanding?
- Did a detour return to the active engineering problem?
- Is the page title a short, accurate, precise learning-note index rather than a hook, metaphor, thesis sentence, or subtitle pair?
- Was each section written first and its heading then derived from all the following paragraphs? Does the heading directly identify the subject and relevant aspect, without a question hook, abstract label or isolated moment? Keep the anecdote and cognition change in the body. For a heading-only request, confirm that non-heading content is unchanged.
- Does the ending bring the experience or investigation to a natural close? After cuts, does it stop abruptly at data or a file list that still needs a connecting thought? Keep a useful closing paragraph without forcing a grand lesson or a full recap.

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
- Do paired passages keep semantic equality while each surface uses its own idiomatic frame, with narrative sentences re-derived rather than mirrored?
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
Chinese sentence gate (Chinese only; not applicable for English-only work):
Project/note division gate (scoped to the requested pages):
Cognition-flow or humor issue:
Bilingual mismatch:
Recommended revision:
```

Do not wrap normal writing output in an assumptions report, archetype label, or full checklist.
