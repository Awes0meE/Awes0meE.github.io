# Evidence-Inventory Voice Regression

Current qualitative cases for the user's 2026-09-06 correction. These are
fixture assumptions and expected behavior, not new project facts or captured
independent-model results. Evaluate the function of the passage in both
languages; a keyword count alone cannot establish compliance.

| ID | Confirmed input or editing task | Expected behavior |
|---|---|---|
| E01 | The user ran a compressor open-loop at 12 V. Draft adds `现有证据只能支持阶段性运行，不能声称整套控制已完成。` | Write the supported run directly. Omit the audit sentence; do not replace it with `我能确认的只有……` or claim closed-loop success. |
| E02 | The boss reported a later trial. Draft says `老板反馈运行正常。我没有亲自测试，也没有日志，不能算我的实测。` | Retain the attributed feedback and omit the redundant audit. English also keeps `The boss reported ...` without adding a disclaimer. |
| E03 | The user recalls a roughly 20 FPS improvement; no controlled benchmark is documented. | `我记得大约多了 20 FPS。` may remain. Do not make it a benchmark or append a list of missing noise, power, pressure, and repeatability tests. |
| E04 | Switching to sensorless operation still fails. | Keep the actual failure and useful next diagnostic question. Do not erase the failure merely because `没有` or `失败` occurs; do not conclude that sensorless operation succeeded. |
| E05 | Chinese approved text says the program maps temperature to PWM and the PID attempt was unfinished. | English preserves those facts through its existing adaptation rules. Do not restore `The evidence does not establish a validated PID controller.` or claim that PID was implemented. |
| E06 | User asks to remove evidence-inventory passages from an approved draft. The new draft contains fewer claims and links. | Do not run an editorial-conservation or information-retention gate. Use the existing Truth review for retained claims; do not restore a paragraph solely to retain an old fact, caveat, or link. |
| E07 | Draft lists every preserved file and explains what each cannot establish, even though the requested page is a project story. | Remove the inventory or retain only an artifact link that helps a real action or question. First-person pronouns do not repair the inventory voice. |
| E08 | User expressly requests a factual evidence audit, including missing tests and uncertain ownership. | Direct audit prose is appropriate for that deliverable. Do not impose the project-story form or conceal gaps. |

Review the result for accurate retained claims, natural voice, bilingual parity,
and authorized selection. Pair this with the Step 10 and Step 12 Chinese-only
sentence checks. Record whether review was manual or independently evaluated.
