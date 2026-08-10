# Engineering Note Writer Trial Comparison

The baseline outputs were captured in separate fresh-agent contexts using the pre-redesign skill. After the runtime rules stabilized, all five revised outputs were rerun against one hashed final redesign snapshot. Response bodies were saved without prose edits; [provenance.md](provenance.md) records the protocol, hashes, and audit limits.

## Baseline Findings

### 01 Smart Car

| Check | Result | Evidence |
|---|---|---|
| F1 | partial | LM7805, 74HC165, L293, PWM, staged tests, and the absence of a lap time remain accurate, but the output adds an unrequested `visibility: public` value. |
| F2 | partial | It does not invent a competition result or exact capacitor count, but public visibility was not confirmed by the input. |
| C1 | partial | The technical order is coherent, but the note returns to the old build-log sequence and reserves standard slots for evidence and reflection. |
| C2 | fail | `Starting From a Bare PCB`, `Files and Evidence`, and `Looking Back` are framework headings rather than titles derived only from the next technical subject. |
| V1 | partial | The Chinese is concrete and readable but mostly report-like; the only strong human turn arrives in the final “硬件和代码互相甩锅” line. |
| V2 | partial | The final joke comes from real debugging friction, but humor and immediate reaction are nearly absent from the body. |
| B1 | pass | English preserves the Chinese facts and section order. |
| R1 | pass | Every section advances through a real circuit or test stage. |
| T1 | fail | A mandatory evidence section and retrospective are visible. |

### 02 Seamly2D Packaging

| Check | Result | Evidence |
|---|---|---|
| F1 | partial | The toolchain, deployment tools, self-signed certificate limits, and unfinished Apple distribution work remain accurate, but the frontmatter adds metadata the input did not request. |
| F2 | fail | It avoids claims of completed distribution, notarization, or formal Apple signing, but invents both `visibility: public` and `projectSlug: nanjing-turing-qt-embedded-learning`. |
| C1 | partial | The body follows packaging concerns rather than internship weeks, but it still resolves through a conventional lesson section. |
| C2 | pass | Headings name actual content such as the matching `windeployqt` environment and Windows/macOS packaging steps. |
| V1 | partial | “看起来很像那么回事” adds a human note, while most paragraphs remain polished technical exposition. |
| V2 | partial | Amusement at a convincing but broken DLL folder is evidence-grounded but underdeveloped. |
| B1 | pass | English and Chinese retain the same facts and limitations. |
| R1 | pass | The note moves from build consistency to dependency collection, installers, macOS, and scripts without a week-by-week detour. |
| T1 | partial | It avoids generic file headings, but ends with a required explanatory conclusion rather than stopping at the last script/packaging insight. |

### 03 Hardware Archive

| Check | Result | Evidence |
|---|---|---|
| F1 | pass | Manufacturing preparation is distinguished from manufacturing and validation. |
| F2 | pass | Schematic revision, authorship, bring-up, waveforms, and performance remain unresolved. |
| C1 | fail | The visible `Draft type: Hardware archive` label exposes archetype selection, followed by a predictable evidence explanation and retrospective. |
| C2 | fail | `从一张板卡照片开始`, `这些文件分别说明什么`, `页面里值得留下的线索`, and `现在回头看` are reusable framework labels. |
| V1 | partial | “版本关系有点野” and filename archaeology help, while most of the note reads like a cautious archive report. |
| V2 | partial | Humor is supported but limited to one early observation. |
| B1 | pass | English preserves the same evidence limits and authorship caution. |
| R1 | pass | The file relationships and evidential limits are explained clearly. |
| T1 | fail | Draft type, assumptions, retrospective, suggested metadata, and open-question wrappers are all visible. |

### 04 Sparse Unknowns

| Check | Result | Evidence |
|---|---|---|
| F1 | pass | The draft does not assign the sensor, units, authorship, or result. |
| F2 | pass | It keeps the artifacts separate and asks two focused blocking questions. |
| C1 | fail | The output is arranged as setup, clue list, inferred chain, retrospective, metadata, and questions. |
| C2 | fail | `回头看 / Looking Back` is a mandatory framework heading; `四条线索` is driven by a count/list rather than a subject. |
| V1 | partial | The “微型工程考古现场” image has personality, but the rest is dominated by audit language. |
| V2 | pass | The joke is based on genuinely missing labels and does not invent a technical event. |
| B1 | pass | English keeps the same uncertainties and slightly calmer tone. |
| R1 | pass | The note moves from artifacts to the narrowest possible data path and the missing provenance. |
| T1 | fail | Draft type, assumptions, retrospective, metadata, and blocking-question wrappers expose the skill's standard output shape. |

### 05 Bilingual Rewrite

| Check | Result | Evidence |
|---|---|---|
| F1 | pass | Polling, EXTI, B-phase direction, OLED observation, contact bounce, and the introductory limit remain accurate. |
| F2 | pass | It does not claim production debounce or mastery. |
| C1 | pass | A short note stays on one compact movement rather than expanding into a full template. |
| C2 | pass | `From Polling to EXTI / 从轮询到 EXTI` names the actual transition. |
| V1 | pass | “旋转编码器就没这么客气了” and “偷偷给自己加戏” add supported humor without losing technical clarity. |
| V2 | pass | Both jokes come from the confirmed difference between polling and contact bounce behavior. |
| B1 | pass | English keeps the same experience with a calmer “little flourish of its own.” |
| R1 | pass | Two paragraphs cover the method change and the confirmed cause of the jump. |
| T1 | pass | No fixed wrapper or generic ending is added. |

## RED Conclusion

The old skill usually preserves technical claims and bilingual equivalence, but it is not uniformly safe: two MDX-oriented baselines fill unsupported visibility or routing metadata. Its prose failure is also not universal—the tightly scoped EXTI rewrite already works well. The repeatable structural problem appears when material is broad or uncertain. The skill makes its internal controls visible through archetype labels, assumptions blocks, evidence sections, retrospectives, metadata bundles, and reusable headings. It also places most emotional texture at the opening or final reflection instead of letting reactions accompany the actual technical friction.

## Revised Findings

### 01 Smart Car

| Check | Result | Evidence |
|---|---|---|
| F1 | pass | The note stays with confirmed group participation, LM7805, 74HC165, L293, PWM, and staged tests. Reactions such as code “looking guilty” are attached to the confirmed hardware-versus-code debugging lesson. |
| F2 | pass | It gives no lap time, competition result, or exact damaged-capacitor count. Evidence links remain explicit placeholders. |
| C1 | pass | The movement follows the diagnostic chain from bare PCB and power to serialized inputs, motor control, staged tests, and the final interpretation. No note type is named. |
| C2 | pass | Five headings name actual subjects, including `Fourteen Inputs Had to Queue Up` and `The Complete Racing Program Came Last`. |
| V1 | pass | Chinese reactions appear beside assembly, power, and staged-test friction instead of being saved for a generic conclusion. |
| V2 | pass | The “背锅” and “嫌疑名单” language comes from the confirmed lesson that hardware symptoms could resemble code bugs. |
| B1 | pass | English retains the same technical nodes and humor targets with calmer wording such as “looking guilty.” |
| R1 | pass | Each section changes the active layer of the investigation; no detached file inventory interrupts the route. |
| T1 | pass | There is no evidence section, retrospective heading, archetype label, or invented metadata field. The final rerun returns raw MDX rather than an outer code fence. |

The first revised run wrapped the artifact in an outer `mdx` fence. After the output rule was clarified, the next run removed the fence but invented a `projectSlug`. The final rerun followed the requested metadata set and is the raw output retained in `revised-outputs/01-smart-car.md`.

### 02 Seamly2D Packaging

| Check | Result | Evidence |
|---|---|---|
| F1 | pass | Qt kit consistency, `windeployqt`, the Windows installer, macOS Qt differences, ad-hoc signing limits, and unfinished Apple distribution work remain accurate. |
| F2 | pass | The note does not claim notarization, official Apple signing, or completed public distribution. |
| C1 | pass | The route follows what “working” means as the executable moves from Qt Creator toward another machine. |
| C2 | pass | Seven headings identify real packaging conflicts, including `MSVC, CMake, Ninja, and the Selected Kit Had to Agree` and `The Scripts Preserved the Order, Not the Environment`. |
| V1 | pass | Chinese personality appears at the DLL failure and environment mismatches while technical explanation remains exact. |
| V2 | pass | The comic turns come from the confirmed executable/DLL/toolchain friction and do not invent a colleague or incident. |
| B1 | pass | Both languages preserve the same build, deployment, signing, and distribution limits; English uses fewer colloquial turns. |
| R1 | pass | Every move changes either the toolchain assumption, package boundary, platform constraint, or automation value. |
| T1 | pass | The note ends by calling back to Qt Creator's green Run button instead of adding a standard retrospective or future-work block. |

### 03 Hardware Archive

| Check | Result | Evidence |
|---|---|---|
| F1 | pass | The archive is described through the photograph, schematic relationship, and fabrication outputs without converting them into unsupported bring-up results. |
| F2 | pass | Exact revision, individual authorship, commissioning, waveforms, and performance remain unresolved. |
| C1 | pass | The note follows the evidential relationship among files rather than exposing a `Hardware archive` article type. |
| C2 | pass | Headings such as `连接器对上了，版本号还没有` and `What the Gerbers Actually Establish` state the actual finding. |
| V1 | pass | The `final2` filename supplies curiosity and restrained amusement without weakening the archive analysis. |
| V2 | pass | Humor targets the filename/revision ambiguity present in the material, not a fabricated engineering mishap. |
| B1 | pass | English carries the same three evidence limits and the same unresolved final beat at lower intensity. |
| R1 | pass | Each section narrows what one artifact can and cannot prove. |
| T1 | pass | No draft-type label, assumptions wrapper, metadata bundle, or compulsory retrospective is exposed. |

### 04 Sparse Unknowns

| Check | Result | Evidence |
|---|---|---|
| F1 | pass | The draft states only that the photo shows a connection, `main.c` contains GPIO/ADC/UART operations, and the video shows changing terminal values. |
| F2 | pass | Sensor identity, value meaning, units, revision relationship, authorship, context, result strength, and publication permission remain open. |
| C1 | pass | The note moves through three artifacts as they almost—but do not yet—form one data path. The provisional status is a safety decision, not an archetype. |
| C2 | pass | The title pairs provisional status with the real subject: ``environment_test` 里那串会动的数字`. The body heading states exactly where the evidence stops. |
| V1 | pass | Chinese lets the “相当积极”的 folder name try to answer the project question while keeping every limitation close to its claim. |
| V2 | pass | The silent-terminal and half-finished-project-description humor comes directly from the sparse artifacts. |
| B1 | pass | English keeps the same evidence chain, qualifications, jokes, and unresolved ending in calmer language. |
| R1 | pass | Each paragraph adds an artifact fact, an inference boundary, or the exact missing connection. |
| T1 | pass | The only final question block is required by the input because final-public prose is unsafe; it contains three grouped decisions rather than a standard metadata/checklist package. |

The first revised run asked four field-like questions. A rule to group related unknowns produced three decision-bearing questions, but that rerun used only `暂定稿 / Provisional Draft` as its page title. After clarifying that the title is also a content heading, the final fresh run fixed both issues and is retained in `revised-outputs/04-sparse-unknowns.md`.

### 05 Bilingual Rewrite

| Check | Result | Evidence |
|---|---|---|
| F1 | pass | Polling, EXTI edges, B-phase direction, OLED observation, contact bounce, and the introductory scope remain unchanged. |
| F2 | pass | The note does not claim production debounce or broader mastery. |
| C1 | pass | The short material remains one compact movement rather than being expanded to satisfy a multi-section shape. |
| C2 | pass | The single heading, `计数器偶尔抢跑 / When the Counter Got Ahead of Itself`, names the confirmed observation. |
| V1 | pass | Chinese uses `编码器像是趁我不注意给自己加戏` and `背锅的不是 NVIC` beside the actual bounce diagnosis. |
| V2 | pass | The humor is inseparable from the observed extra counts and confirmed mechanical contact bounce. |
| B1 | pass | English preserves the full causal chain and joke target at the 60%-of-reference calibration, using the calmer “a small flourish while I was not looking.” |
| R1 | pass | Two paragraphs move directly from implementation to visible symptom and cause. |
| T1 | pass | No extra sections, reflection, evidence list, or future-work wrapper are added. |

## GREEN Conclusion

Across the five retained revised trials, all rubric checks pass. The largest change is not “more jokes”; it is that the facts now create the route. Reactions arrive beside LM7805 instability, missing DLL assumptions, `final2`, unlabeled terminal values, and contact bounce, while headings expose those subjects instead of the writing framework.

The trials also caught three concrete regressions during redesign: an outer MDX fence, invented metadata, and field-by-field blocking questions. The runtime rules were narrowed only in response to those observed outputs. After the last rule change, all five revised cases were rerun with fresh agents against the hashed final snapshot.

Remaining risk is qualitative rather than structural. A long input can still produce dense bilingual prose, and the 75/60 voice relationship cannot be reduced to a deterministic score without recreating the template problem. Placeholder paths also remain publication placeholders: AddProject must still validate real destinations before any note is released.
