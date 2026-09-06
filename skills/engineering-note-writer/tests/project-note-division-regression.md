# Project/Note Division Regression

Qualitative review cases for `references/project-note-division.md`. These are
inputs and expected decisions, not captured independent-model outputs or an
automatic duplication benchmark. Technical details below are fixture premises,
not additional claims about the portfolio.

| ID | Situation | Expected decision |
|---|---|---|
| D01 | A project page follows assignment, assembly, six tests, tuning, and competition result. Its note follows the same route in new words, adding two component definitions. | Fail division: the note still retells the journey. Choose a bounded question and develop its explanation; changed wording and a little extra detail are insufficient. |
| D02 | The project records finding a startup failure, the checks performed, and the handoff. A note briefly introduces the failure, then examines what the recorded voltage and resistance tests can distinguish, startup behavior from linked sources, and a still-unmeasured current waveform. | Pass division if grounded: the symptom can appear on both pages. Preserve uncertainty; the investigation adds value without repeating the complete project story. |
| D03 | A cold-start note keeps the observed voltage collapse but drops the protected-pack-output qualifier because the homepage already explains it. | Fail: removing repeated wording has made the local claim misleading. Restore the measurement location beside the voltage. |
| D04 | A user requests several learning notes without topics; a confirmed project brief and artifacts exist. | Read the family, offer distinct grounded questions, and ask one concise interest question. Reuse the brief; do not re-interview the entire project or make the user inventory files. |
| D05 | The user explicitly chooses encoder signal interpretation, or delegates choosing topics from the confirmed material. | Use the choice or choose supportable distinct questions. Do not ask to approve the same topic again. Ask only if missing personal knowledge would change a claim. |
| D06 | A sensor exists in the files, but no historical account records curiosity or datasheet reading. The agent finds a useful source today. | Present the investigation as current learning. Reject a scene claiming the user became curious, read that source, or ran an experiment during the original build. |
| D07 | A proposed topic asks why a 5 V MCU works when the device uses a 9 V battery. The regulator and wiring have not been inspected. | Investigate the actual input-to-rail path before explaining it. Do not claim direct 9 V MCU tolerance, a tested voltage, a MOSFET bridge, or a specific encoder topology from the question alone. |
| D08 | A note on motor supply follows battery voltage through regulation, driver drop, and PWM to explain the observed behavior. | Related concepts may stay together when they answer the same question. Do not force a separate note for each component or call every subsystem change a scope violation. |
| D09 | Two notes independently reproduce the same complete calibration derivation, although neither duplicates the homepage. | Fail: cross-page review includes note-to-note overlap. Choose the detailed destination; retain only the necessary use or short explanation and a link in the other authorized page. |
| D10 | A note rewrite removes a repeated handoff story that remains on the protected homepage, linking to it in both languages. A measurement found only in the note is still relevant to its conclusion. | The handoff reduction is allowed. Keep the conclusion accurate with the measurement and conditions it actually needs, or omit that conclusion if outside the chosen focus. Do not run an old-draft retention gate. |
| D11 | A unique confirmed event does not fit the proposed note focus and would require adding material to a protected homepage to preserve it. | The event may be omitted from the selected article and retained in internal source material. Do not create a new passage solely to preserve every fact, request another approval merely for omission, or silently edit the protected homepage. |
| D12 | Chinese has been narrowed to the selected investigation; English still includes the original full project journey. | Fail division and bilingual parity. Apply the same substantive allocation in English through the existing English rules; keep the Chinese sentence gate at Steps 10 and 12 only. |
| D13 | A verbatim source-document note includes build history also summarized on the homepage. The user requests preserving the original. | Preserve the original text. Check authored framing and links; do not rewrite the source into a fabricated first-person exploration or delete repeated commands and evidence. |
| D14 | The user requests a typo fix or faithful translation on one page. Other notes have longstanding overlap. | Complete the narrow task. Do not demand a family rewrite, fresh topic selection, or another interview; do not claim a whole-family pass. |
| D15 | The target can be read, but one linked sibling is unavailable. | Review available material and state the specific coverage limit when reporting readiness. Do not infer the missing page's contents or claim all-page verification. |
| D16 | The user asks for five notes, but only two distinct questions have enough grounding and useful depth. | Propose the smaller supported set with a brief reason. Do not manufacture curiosity, divide one explanation artificially, or retell the project to reach five. |

## Review Procedure

For each case, identify the page role, the permitted context, the new explanatory
value, and any claim or scope boundary. Judge the decisions above by meaning,
not heading names, word counts, or matching strings. Record manual review as
manual; structural validation does not establish fresh-model behavior.

Also validate the skill, reference paths, UTF-8, and diff whitespace. Preserve
frozen Trials 01-11 and their provenance; their historical results do not prove
compliance with this newly added division rule.
