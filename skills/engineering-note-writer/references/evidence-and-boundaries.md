# Evidence And Boundaries

Read this before making first-person, result, or publication claims. This reference decides only whether project-specific actions, results, uncertainties, and publication claims are supported. It does not choose the opening, order, headings, emotion, external knowledge, or research questions.

## Classify What You Know

Use four evidence levels internally:

| Level | Meaning | Safe writing move |
|---|---|---|
| Confirmed action | The user or a reliable first-hand record says who did what. | Use first person and active verbs. |
| Artifact fact | A file, photo, log, code listing, board, or video directly shows something. | Use the supported detail when it helps the story; do not make a file inventory the story. |
| Inference | Several clues support a reading but do not prove it. | If useful to the account, express the interpretation naturally; otherwise omit it. |
| Unknown | The material does not answer the question. | Keep it in working notes, omit the unsupported claim, or ask if the answer is needed. |

Never upgrade an artifact fact into personal authorship. A Gerber archive proves that fabrication files exist; it does not prove who drew the PCB, ordered it, assembled it, or brought it up.

## Project Evidence And Research Are Different

Project evidence supports what Li or the device did. External sources support general principles and current technical facts. A source may help interpret an observation, but it cannot upgrade a recollection into a measurement or an artifact into authorship.

## Keep The Audit Out Of The Article

The user removed the requirement to state evidence boundaries explicitly in project and note prose on 2026-09-06. Checking support remains an internal responsibility; it does not earn a sentence in the article.

Write what the user did, what happened, and what they learned. Remove passages whose job is to certify what the archive proves, announce what it cannot prove, or list measurements and implementations absent from it. This includes first-person versions such as `我能确认的只有……` when they still read as an audit. An explicit evidence-audit request is a different deliverable and may discuss these matters directly.

Choose the supported claim itself instead of adding a disclaimer after a broad one. `我在 12 V 下让压缩机开环运行` states the result; it does not need a list of other tests. `老板反馈……` identifies who observed the later result; it does not need another sentence saying it is not my measurement. If an uncertain numerical recollection is worth retaining, `我记得大约……` is often enough. Omit optional claims that need a long defense.

An actual unresolved problem can still drive the story: `一切换到无感接管，电机就停了。` Likewise, a concrete operating condition belongs with a result when it defines that result. These are engineering facts, not a mandatory boundary section. Do not erase a real failure, invent success, strip necessary attribution, or replace a removed disclaimer with another disclaimer in different words.

## Ground First Person And Emotion

Use `我` for an action only when the input or evidence supports it. Ground reactions the same way. If the user confirms that a missing DLL was frustrating, carry that reaction. If the material contains only a log, do not invent “我当时差点崩溃.”

When the user confirms both a real event and the direction or intensity of the emotion, reconstruct the moment in natural first person without requiring the user's exact wording. Keep the reconstruction inside the confirmed anchor. Do not add a new time, place, action, dialogue, participant, technical result, or causal sequence. If only an emotion is confirmed, do not build an unconfirmed scene around it.

Indirect evidence does not establish personal authorship. A photo showing connectors cannot justify `我完成了这版原理图和 PCB 设计`. If the connector observation serves no purpose in the user's story, omit it rather than writing an evidence-inventory sentence about the photo.

## Name Known Tools Exactly

Use the exact product, model, command, component, or file name when it is known, such as `Claude Code`, `Codex`, `Seedance 2.0`, `Deepresearch`, or `Clawbot`. Do not replace an unknown `AI tool` or `model` with a plausible brand. Ask one focused question when the name changes the story; otherwise omit it, retain the uncertainty internally, or write around it.

## Keep Unknowns Useful

Unknowns should sharpen the note rather than flood it with disclaimers.

- If an unknown blocks public accuracy, keep the draft provisional and ask the smallest blocking question.
- Group related unknowns into the smallest number of decision-bearing questions; do not turn every missing field into its own form item.
- If the note can remain accurate without it, write around the gap naturally.
- Keep uncertainty in the internal fact sheet. Include a remaining question only when it is part of the user's actual inquiry; there is no requirement to publish a boundary sentence or missing-test list.
- Do not guess sensor models, units, dates, performance, collaboration roles, or version relationships from plausible engineering context.

## Separate Prose Safety From File Publication

This skill describes reviewed evidence. `AddProject.skill` decides what is copied or published.

- Do not fabricate an asset path.
- Use a clear placeholder only when the user requested MDX and the real path is pending.
- Do not call unlinked files private. State what the page currently shows.
- Avoid compliance-report phrases such as `公开证据边界`, `本次仅公开`, and `功能改动没有故意扩大` in reader-facing prose.
- For company, internship, client, or third-party material, describe only the approved public evidence and return ambiguous publication decisions to AddProject.

## Minimum Supportability Check

Before drafting, be able to answer:

- Which actions are personally attributable?
- Which technical result is actually demonstrated?
- Which unknown would change the claim?
- Which evidence may be named or linked publicly?

Do not expose this checklist unless the user asks for an evidence review.
