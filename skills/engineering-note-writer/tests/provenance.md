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

## 2026-08-12 Trials 06–11 GREEN Capture

- Capture date: 2026-08-12, Asia/Shanghai.
- Initial candidate runtime commit: `352c82878db75c2b27c0912b40eadd9dcf096181`.
- Runtime-fix commits: `580bb6ee95e185a8cc7698316a1c0c6db0b2ac63` added the review-specific counter to `references/shared-understanding.md`; `9eab429041e3478d3c58c6fc730828d02366477d` promoted the same prohibition into the main workflow after the first fix was bypassed.
- Final runtime commit for affected Trials 09 and 11: `9eab429041e3478d3c58c6fc730828d02366477d`.
- Unchanged retained agents at the original cognition-led runtime: `/root/task6_green_trials/green_06`, `/root/task6_green_trials/green_07`, `/root/task6_green_trials/green_08`, and `/root/task6_green_trials/green_10`.
- Retained affected-case agents at the final runtime: `/root/task6_green_trials/green_09_gate_fix_final_3` and `/root/task6_green_trials/green_11_final`.
- Trial 09 replacements: the earlier retained `/root/task6_green_trials/green_09` was invalidated because the input had no confirmed brief. `/root/task6_green_trials/green_09_gate_fix` at the initial candidate runtime and `/root/task6_green_trials/green_09_gate_fix_final` after the first fix both diagnosed the voice problem but still drafted replacement prose. `/root/task6_green_trials/green_09_gate_fix_final_2` was an additional passing gate run at the final runtime; `/root/task6_green_trials/green_09_gate_fix_final_3` is the verbatim body retained for the final fixture.
- Trial 11 replacements: `/root/task6_green_trials/green_11` passed after the first fix but was superseded after the second runtime commit; `/root/task6_green_trials/green_11_final` is the fresh run retained at the final runtime.
- Body handling: retained response bodies were copied below their YAML provenance headers without prose edits. Manual comparison against the delivered agent messages found no body change.
- Trial 08 web rule: its wrapper explicitly required current external web research, reliable primary sources/direct URLs, and the runtime's light nearby-link rule. The retained body uses direct AMCA, Oriental Motor, and Eaton links.

For Trials 06, 07, 09, 10, and 11, the normal fresh-agent wrapper was the text below, with only `<matching-input>` replaced by the matching input path:

```text
You are a fresh GREEN behavioral trial agent. Work read-only in D:\Develop\Project_Final_Collation\XJTLU_Portfolio. Do not delegate or spawn any agent. Read skills/engineering-note-writer/SKILL.md and only the context and references it explicitly routes for this task. Then execute <matching-input>. Return only the requested user-facing deliverable, with no analysis, test commentary, provenance, or wrapper text. Do not inspect any baseline output, revised output, comparison.md, provenance.md, rubric.md, design spec, implementation plan, git history, memory file, or any other test input. Do not edit or create files.
```

Trial 08 used this exact web-required variant:

```text
You are a fresh GREEN behavioral trial agent. Work read-only in D:\Develop\Project_Final_Collation\XJTLU_Portfolio. Do not delegate or spawn any agent. Read skills/engineering-note-writer/SKILL.md and only the context and references it explicitly routes for this task. Then execute skills/engineering-note-writer/tests/inputs/08-research-expansion.md. This task explicitly requires current external research: use web browsing, prefer reliable primary sources and direct URLs, and comply with the runtime's light nearby-link rule. Return only the requested user-facing deliverable, with no analysis, test commentary, provenance, or wrapper text. Do not inspect any baseline output, revised output, comparison.md, provenance.md, rubric.md, design spec, implementation plan, git history, memory file, or any other test input. Do not edit or create files.
```

### Trial 11 True Old-Runtime Baseline

- Runtime snapshot commit: `663116c8587de716a5eb701548d4dc74e1222511`.
- Trial agent: `/root/task6_green_trials/baseline_11_old_runtime`.
- Temporary snapshot path: `D:\Develop\Project_Final_Collation\.trial-old-runtime-11`, outside the tracked repository.
- Snapshot method: `git archive --format=tar --output=<snapshot>/runtime.tar 663116c8587de716a5eb701548d4dc74e1222511 -- <paths>` archived only `SKILL.md` and the six references that old `SKILL.md` routes: `evidence-and-boundaries.md`, `material-led-composition.md`, `voice-rules.md`, `bilingual-writing.md`, `style-examples.md`, and `self-review.md`. `tar.exe -xf` extracted the archive.
- Snapshot verification: for every archived file, `git hash-object <snapshot-file>` matched `git rev-parse 663116c8587de716a5eb701548d4dc74e1222511:<path>`. The temporary archive and extracted snapshot were removed after the body was captured.
- Input isolation: Trial 11 did not exist at the old commit, so its exact content was supplied inside the agent prompt. The agent was prohibited from reading the current repository runtime, tests, answers, spec, plan, history, or memory.
- Body handling: the response was copied verbatim under the YAML header in `baseline-outputs/11-confirmed-brief-voiceless-review.md`.

The exact old-runtime Trial 11 wrapper was:

````text
You are a fresh baseline behavioral trial agent. Work read-only. Do not delegate or spawn any agent. Read only D:\Develop\Project_Final_Collation\.trial-old-runtime-11\skills\engineering-note-writer\SKILL.md and only the reference files inside that same snapshot directory which that SKILL.md explicitly routes for this task. Do not inspect the current repository Skill, any current or historical test output, comparison.md, provenance.md, rubric.md, design spec, implementation plan, git history, memory file, or any other test input. Do not edit or create files.

Execute this input, supplied directly here:

# Trial 11: Confirmed Brief, Safe But Voiceless

Review the paragraph below for a Li Zhiyi first-person learning note. Give a clear verdict, then provide a cognition-level Chinese replacement that preserves the factual qualifications and uses the confirmed understanding below. Do not add external research unless it is needed.

## User-confirmed brief

- I first focused on PWM and thought controllable fan speed was the main problem.
- After working on the enclosure and duct, I realised that airflow path and leakage mattered alongside duty cycle.
- The visible demo confirms only that the fan responds to a control command.
- There is no measured cooling-performance result, and the available material does not confirm that PID control was implemented.
- You may use my present personal judgment and change in understanding.
- This brief is confirmed; no new interview is needed.

## Paragraph to review

```text
现有归档包含 ESP32 控制板、上位机代码、串口通信实现与外壳模型。根据演示视频，可以确认风扇能够响应控制指令。现有证据无法证明散热性能，也无法证明 PID 控制已经实现。四类材料分别说明电子、电气、软件和机械部分的存在，但不应据此扩大功能结论。
```

The factual qualifications are correct. The problem is that the target is Li Zhiyi's first-person learning note, not an evidence-audit report. The replacement must rebuild through the confirmed cognition route: initial PWM focus, the enclosure-and-duct correction, and the bounded meaning of the visible demo. Do not relax the evidence boundaries or invent additional project history, measurements, results, emotions, or decisions.

Return only the requested user-facing deliverable, with no analysis, test commentary, provenance, or wrapper text.
````

### GREEN Audit Limits

Canonical agent names, exact wrappers, per-output runtime commits, retained response bodies, and repository hashes are recorded. Platform-internal run IDs and full hidden reasoning are not persisted. Trial 08 source links and claim placement are auditable from the retained body, but the repository does not archive the browser trace. Trials 06, 07, 08, and 10 were intentionally not replaced during the 09/11 test-design correction, so their headers continue to identify runtime `352c82878db75c2b27c0912b40eadd9dcf096181`; Trials 09 and 11 identify final runtime `9eab429041e3478d3c58c6fc730828d02366477d`. The fixtures remain qualitative and may vary on a future model rerun.

## Final Cognition-Led Runtime Snapshot

This manifest contains exactly 34 files: the final cognition-led runtime and repository guidance, every reference file sorted by name, all 11 inputs, and all 11 retained revised outputs. Hashes are lowercase SHA-256 values generated with `Get-FileHash`:

```text
df4a913abfaece4f0b9c49fd847b1e50386299904a83b5cd4cb464f4c16880da  CODEX.md
50ef1f793a211696d49708b5e5076b9e1299b9b4923e9e7ddd90fc8eb96b9745  docs/content-workflow.md
6ca8dff7eaea560e809c8fb3909e08dea996122ffa21f4556571dc6be1b87181  skills/engineering-note-writer/SKILL.md
e7f8614a509536cfe30135b3f80dda61993eadb2c7e91cb9fccd002437fec7c2  skills/engineering-note-writer/agents/openai.yaml
c1bdd91181384ae23c3db8682030bb86a936e8f7859f4815ebfdb4a4e32f32a8  skills/engineering-note-writer/references/bilingual-writing.md
a79431bcfeddde07a316130664dfb1d282853a64170f5a4d4adf2292c2721a1b  skills/engineering-note-writer/references/cognition-led-composition.md
98eac1728f3851c833860c3fe3d0ee9343d07aa4fb3d22d458d5004ea5575d6c  skills/engineering-note-writer/references/evidence-and-boundaries.md
9d4b4c99dcbcb12d3b250c9ac8308e5198e624c306a3bcf39b561e949ab20953  skills/engineering-note-writer/references/research-expansion.md
1be8311a0d2d54114494b9129039f32290a44ecd9a51591e63607c35b878528c  skills/engineering-note-writer/references/self-review.md
7ac73499b09154c7f88c4faa8795df0a8f5c298555fe5a2bc4a280fc4c15375c  skills/engineering-note-writer/references/shared-understanding.md
fc44346022d567fdf112dfc489718b39867568bfa00058d2f25f8fa793097c2a  skills/engineering-note-writer/references/style-examples.md
9cd4157882a18fa58dfd31bfa61a0bf12ea4f930ce21efa986cba94ee3618264  skills/engineering-note-writer/references/voice-rules.md
f35efbf8641b64074fa2d540c5c0b026f84c8383859b19b1f49d566bc9055f36  skills/engineering-note-writer/tests/inputs/01-smart-car.md
dac286e053d3dba3af33f27fdd0451fa434d3bd1fc413aa3880fd26759a2b0b3  skills/engineering-note-writer/tests/inputs/02-seamly2d-packaging.md
3ed16f8e99b2d0169d3379f37df9754d2ca0ddb3c18233ac6f507fd600dde424  skills/engineering-note-writer/tests/inputs/03-hardware-archive.md
6ea05fd7c3e3bd499acf7ca402722440e6c8c7081ec1ffd85165eb8454bc99e9  skills/engineering-note-writer/tests/inputs/04-sparse-unknowns.md
e2d19197e685cc96ed42b6e320b0db2beb20b417a9d2db0957fe0474037a850f  skills/engineering-note-writer/tests/inputs/05-bilingual-rewrite.md
0a034996c5904f0dfeccf508a13de0e8efaa21f65ea2e0a07656847eb8ac9591  skills/engineering-note-writer/tests/inputs/06-cross-subsystem-confirmed-brief.md
fb9b3694876a8916cc6c020dfe454a422c0cb164864e2f13d5263df3e9cf843c  skills/engineering-note-writer/tests/inputs/07-missing-shared-understanding.md
d63842bea57db511d9bc52a36f6cc97c4f2d499f11044084f0e6339a7bd08da5  skills/engineering-note-writer/tests/inputs/08-research-expansion.md
4b2bbb8160e612caf0c5b0e8fd5163f17fda876d0d349c5a86b744037f8eb99f  skills/engineering-note-writer/tests/inputs/09-safe-but-voiceless-review.md
a53f8a0081689fc151e7eb6ccfd18a36dc1f5df5b99151e58b94f5cd515c41da  skills/engineering-note-writer/tests/inputs/10-small-edit-exception.md
9685a7685f4f7c36f81cfb40471a384d06c8b5c018a7b6a772ee4452e26b9435  skills/engineering-note-writer/tests/inputs/11-confirmed-brief-voiceless-review.md
d0f1d0248102780e37c052c6659c05687a33abd0ad9cb925b9f4ba7048ceb76a  skills/engineering-note-writer/tests/revised-outputs/01-smart-car.md
6d7e18cdaffa5c669a58e745696dde371942712ec62384e994425a62e05d3b62  skills/engineering-note-writer/tests/revised-outputs/02-seamly2d-packaging.md
84b4a3a145bb87155ee203f08bd01913ead422d5e7296d87a1b069073df6df50  skills/engineering-note-writer/tests/revised-outputs/03-hardware-archive.md
ff1424ece805546d0efcdb09fbed5f61806e7b5cd2c784638610b86ebb632ecb  skills/engineering-note-writer/tests/revised-outputs/04-sparse-unknowns.md
128d991b3c42c0c4db64838bf6125cfe07c225a1c36c20c1509abc0bc2692ec7  skills/engineering-note-writer/tests/revised-outputs/05-bilingual-rewrite.md
f3b1d63e9df5f74d3877884fbd0a80bb952e0426730aed05029cca09698b5e2e  skills/engineering-note-writer/tests/revised-outputs/06-cross-subsystem-confirmed-brief.md
be7b74794222fdc2be3f42a8bcec715f8408bd6a62c5e46d45dcd82db8865f24  skills/engineering-note-writer/tests/revised-outputs/07-missing-shared-understanding.md
1e5a503489cc296093b0a158e5d13efd2c88d266cd7849e0ed6b4b6c7a3dd452  skills/engineering-note-writer/tests/revised-outputs/08-research-expansion.md
1a9d14051c3fbe55db567dd6cf39cdeac5006ea3adbee2bf7106448cecb54a10  skills/engineering-note-writer/tests/revised-outputs/09-safe-but-voiceless-review.md
8f4aa621b9f6b5440dbdaa2ef564bf25fc4ea2ea5bb995e54d3b1c94148a3193  skills/engineering-note-writer/tests/revised-outputs/10-small-edit-exception.md
f6764f59c4522498e23d4c3fa144d90ff35cfb0b397aca701b582a6cbfca42e5  skills/engineering-note-writer/tests/revised-outputs/11-confirmed-brief-voiceless-review.md
```
