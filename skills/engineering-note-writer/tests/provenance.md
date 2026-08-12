# Engineering Note Writer Trial Provenance

These files are qualitative behavioral regression fixtures, not a deterministic benchmark. Language-model output can vary between runs even when the input and skill snapshot are identical.

## Legacy 2026-08-10 Trials 01–05 Capture

- Capture date: 2026-08-10, Asia/Shanghai.
- Baseline runtime source: repository commit `995a2eba53f8568d70628c697c90c4213c650ce9`; the pre-redesign skill can be recovered with `git show <commit>:skills/engineering-note-writer/<path>`.
- Revised runtime source: repository commit `85460fb1867ffc683ff9e4a6e135d3b247d86d0b`; the approved redesign is bound to the same runtime files recorded below.
- Inputs: the five legacy files from `tests/inputs/01-smart-car.md` through `tests/inputs/05-bilingual-rewrite.md`.
- Outputs: the matching Trials 01–05 model response bodies were preserved without prose edits. The small YAML block at the top of each file was added only as trial provenance.

## Legacy 2026-08-10 Trials 01–05 Fresh-Agent Protocol

Each of Trials 01–05 was run in a fresh subagent context with one input. Trial agents were told not to inspect baseline outputs, revised outputs, `comparison.md`, or this provenance file.

The canonical wrapper was:

```text
Read skills/engineering-note-writer/SKILL.md and only the context and references it routes for this task. Execute <matching input file>. Return only the requested final deliverable, with no analysis or test commentary. Do not inspect any baseline outputs, revised outputs, comparison.md, or provenance.md.
```

The Trials 01–05 final-snapshot revised outputs additionally record `trial_agent` in their provenance header. Earlier diagnostic reruns for that legacy capture used the same isolation rule but were replaced after they exposed a behavior-changing rule failure, as required by the implementation plan.

## 2026-08-12 Trials 06–10 Cognition-Led Red Baseline Capture

- Capture date: 2026-08-12, Asia/Shanghai.
- Runtime commit before every trial: `663116c8587de716a5eb701548d4dc74e1222511`.
- Runtime skill SHA-256 before and after the trials: `306d21ed971a367ac69abdb25f1080be033dc05fa2d93b004aa2c9b96e7e42d8`.
- Trial agents: `/root/task1_red_fixtures/baseline_06`, `/root/task1_red_fixtures/baseline_07`, `/root/task1_red_fixtures/baseline_08`, `/root/task1_red_fixtures/baseline_09`, and `/root/task1_red_fixtures/baseline_10`.
- Output provenance: each Trials 06–10 header records `trial: baseline`, the matching `tests/inputs/<filename>.md` path, the capture phase, the exact runtime commit, the canonical trial-agent identity, and the capture date.

The exact fresh-agent wrapper was the text below, with only `<matching-input>` replaced by the matching path from `06-cross-subsystem-confirmed-brief.md` through `10-small-edit-exception.md`:

```text
You are a fresh baseline trial agent. Work read-only in D:\Develop\Project_Final_Collation\XJTLU_Portfolio. Do not delegate or spawn any agent. Read skills/engineering-note-writer/SKILL.md and only the context/reference files that SKILL.md explicitly routes for this task. Then execute <matching-input>. Return only the requested final deliverable, with no analysis, trial commentary, provenance, or wrapper text. Do not inspect any baseline output, revised output, comparison.md, provenance.md, rubric.md, implementation plan, design spec, git history, memory file, or any other test input. Do not edit or create files.
```

Observed behavior was mixed, so the retained files should not be read as five uniform failures:

- `baseline_06` preserved the false start, evidence boundaries, Connect payoff, and later enclosure synthesis, but converted the attention path into a polished four-section article that repeatedly reintroduced named artifacts and subsystem roles. It therefore provides a partial RED example for the requested cognition-led, non-inventory composition.
- `baseline_07` refused to draft or infer a personal story and returned one compact request for the missing shared understanding. No RED failure was observed in this sample.
- `baseline_08` used nearby Greenheck and Eaton links to explain fan/system interaction and bypass flow while explicitly withholding unmeasured pressure, flow, leakage, and cooling claims. No RED failure was observed in this sample.
- `baseline_09` correctly diagnosed the audit voice and added first-person judgment, but the replacement remained an evidence-led catalog with little lived reaction, emotional movement, or learning beyond epistemic restraint. This is the clearest RED voice failure.
- `baseline_10` made only the duplicated-word and Markdown-spacing corrections and returned one sentence. No RED failure was observed in this sample.

## Legacy 2026-08-10 Trials 01–05 Audit Limits

The legacy Trials 01–05 capture did not persist platform run IDs, full conversation traces, or exact per-agent wrapper wording. Its bodies remain useful for qualitative old/new comparison, but they are not a cryptographically auditable external benchmark. Claims in `comparison.md` are intentionally limited to observable text in the retained Trials 01–05 files. These limits do not describe the separately recorded Trials 06–10 capture above.

## Legacy 2026-08-10 Trials 01–05 Final Runtime Snapshot

The unchanged legacy manifest below covers the 2026-08-10 runtime skill, routed repository guidance, Trials 01–05 inputs, and the five retained Trials 01–05 final-snapshot revised outputs:

```text
2c9ed235774ef0cba7e7f7647917c6e42a49388d2320a27ff14d77af2a3b07f8  CODEX.md
fc88595f982eff39de0700782e7d48ce895dfacbe82bca5723515eed489b3a40  docs/content-workflow.md
306d21ed971a367ac69abdb25f1080be033dc05fa2d93b004aa2c9b96e7e42d8  skills/engineering-note-writer/SKILL.md
8a4f85a8693cf775e560204f6f9bbb08be8348bb6911a43d863b8669c551e1c6  skills/engineering-note-writer/agents/openai.yaml
5e8cb32c31fb9a1384fab0a34fedeb2cb82aacd1b4aeebce31648d9ce91f074d  skills/engineering-note-writer/references/evidence-and-boundaries.md
77f550f7612cf922c77001038caedabe8205d06ab13c2cc7347c22ab74d50d34  skills/engineering-note-writer/references/material-led-composition.md
69e1ce118d76d19803f3fdbd27f6d6eb61bdfa056e898ff89b5b0797708847cf  skills/engineering-note-writer/references/voice-rules.md
3ca879483a383da99ddaeaa4a966a52a3bafebf859f9154b83132e5a24a5fca3  skills/engineering-note-writer/references/bilingual-writing.md
e3c6135a4a81912541b47b9189574f3a9772f950274ecf553810fe4b065e3bd4  skills/engineering-note-writer/references/style-examples.md
a6c3ece23e64ee2c7b4e7b0310d82a8611f898fb30983049b34773011c7283a2  skills/engineering-note-writer/references/self-review.md
f35efbf8641b64074fa2d540c5c0b026f84c8383859b19b1f49d566bc9055f36  skills/engineering-note-writer/tests/inputs/01-smart-car.md
dac286e053d3dba3af33f27fdd0451fa434d3bd1fc413aa3880fd26759a2b0b3  skills/engineering-note-writer/tests/inputs/02-seamly2d-packaging.md
3ed16f8e99b2d0169d3379f37df9754d2ca0ddb3c18233ac6f507fd600dde424  skills/engineering-note-writer/tests/inputs/03-hardware-archive.md
6ea05fd7c3e3bd499acf7ca402722440e6c8c7081ec1ffd85165eb8454bc99e9  skills/engineering-note-writer/tests/inputs/04-sparse-unknowns.md
e2d19197e685cc96ed42b6e320b0db2beb20b417a9d2db0957fe0474037a850f  skills/engineering-note-writer/tests/inputs/05-bilingual-rewrite.md
d0f1d0248102780e37c052c6659c05687a33abd0ad9cb925b9f4ba7048ceb76a  skills/engineering-note-writer/tests/revised-outputs/01-smart-car.md
6d7e18cdaffa5c669a58e745696dde371942712ec62384e994425a62e05d3b62  skills/engineering-note-writer/tests/revised-outputs/02-seamly2d-packaging.md
84b4a3a145bb87155ee203f08bd01913ead422d5e7296d87a1b069073df6df50  skills/engineering-note-writer/tests/revised-outputs/03-hardware-archive.md
ff1424ece805546d0efcdb09fbed5f61806e7b5cd2c784638610b86ebb632ecb  skills/engineering-note-writer/tests/revised-outputs/04-sparse-unknowns.md
128d991b3c42c0c4db64838bf6125cfe07c225a1c36c20c1509abc0bc2692ec7  skills/engineering-note-writer/tests/revised-outputs/05-bilingual-rewrite.md
```
