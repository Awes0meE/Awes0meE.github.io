# Evidence And Boundaries

Read this before making first-person, result, or publication claims. This reference decides only whether project-specific actions, results, uncertainties, and publication claims are supported. It does not choose article structure, headings, emotion, or external knowledge.

## Classify What You Know

Use four evidence levels internally:

| Level | Meaning | Safe writing move |
|---|---|---|
| Confirmed action | The user or a reliable first-hand record says who did what. | Use first person and active verbs. |
| Artifact fact | A file, photo, log, code listing, board, or video directly shows something. | Describe what the artifact shows. |
| Inference | Several clues support a reading but do not prove it. | Attribute the conclusion to the clues and qualify it. |
| Unknown | The material does not answer the question. | Leave it open or ask one focused question. |

Never upgrade an artifact fact into personal authorship. A Gerber archive proves that fabrication files exist; it does not prove who drew the PCB, ordered it, assembled it, or brought it up.

## Project Evidence And Research Are Different

Project evidence supports what Li or the device did. External sources support general principles and current technical facts. A source may help interpret an observation, but it cannot upgrade a recollection into a measurement or an artifact into authorship.

Qualify a claim only nearby and only when the distinction changes its meaning. Do not narrate the whole evidence audit in reader-facing prose.

## Ground First Person And Emotion

Use `我` for an action only when the input or evidence supports it. Ground reactions the same way. If the user confirms that a missing DLL was frustrating, carry that reaction. If the material contains only a log, do not invent “我当时差点崩溃.”

When evidence is indirect, write from the evidence:

```text
从照片和这版原理图能对上的，是几个主要连接器的位置。
```

Do not turn that into:

```text
我完成了这版原理图和 PCB 设计。
```

## Keep Unknowns Useful

Unknowns should sharpen the note rather than flood it with disclaimers.

- If an unknown blocks public accuracy, keep the draft provisional and ask the smallest blocking question.
- Group related unknowns into the smallest number of decision-bearing questions; do not turn every missing field into its own form item.
- If the note can remain accurate without it, write around the gap naturally.
- Mention an uncertainty near the claim it limits; do not collect every uncertainty into a mandatory final section.
- Do not guess sensor models, units, dates, performance, collaboration roles, or version relationships from plausible engineering context.

## Separate Prose Safety From File Publication

This skill describes reviewed evidence. `AddProject.skill` decides what is copied or published.

- Do not fabricate an asset path.
- Use a clear placeholder only when the user requested MDX and the real path is pending.
- Do not call unlinked files private. State what the page currently shows.
- Avoid compliance-report phrases such as `公开证据边界`, `本次仅公开`, and `功能改动没有故意扩大` in reader-facing prose.
- For company, internship, client, or third-party material, describe only the approved public evidence and return ambiguous publication decisions to AddProject.

## Minimum Pre-Draft Check

Before drafting, be able to answer:

- What concrete thing can the opening stand on?
- Which actions are personally attributable?
- Which technical result is actually demonstrated?
- Which unknown would change the claim?
- Which evidence may be named or linked publicly?

Do not expose this checklist unless the user asks for an evidence review.
