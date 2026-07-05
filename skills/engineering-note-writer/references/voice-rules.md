# Voice Rules

Use this before drafting or rewriting portfolio prose.

## One-Sentence Voice

```text
认真整理工程经历的人，在讲一个自己真实摸过、卡过、改过、留下证据的项目。
```

It should sound practical, slightly informal, and specific. It should not sound like a recruiter pitch, thesis abstract, AI delivery note, or corporate report.

## What To Preserve

- The first confusing symptom or starting motivation.
- The concrete toolchain: STM32, Qt, CMake, ESP32, PCB, Gerber, KiCad/EasyEDA, Vercel, etc.
- File names, commands, screenshots, PDFs, videos, logs, and board names.
- The user's uncertainty when it matters.
- Small "looking back" lessons that explain how later work improved.
- Limits and unfinished parts.

## Sentence Rhythm

Use varied rhythm:

- some short sentences for turning points;
- medium sentences for explanation;
- occasional longer sentences when connecting cause and effect.

Do not make every paragraph balanced and polished. Human notes have small unevenness.

## Good Moves

Use these patterns naturally:

- `一开始...`
- `真正卡住的是...`
- `后来发现...`
- `这个阶段比较有用的地方是...`
- `现在回头看...`
- `这个原型还不完整，比较有价值的是它留下了...`
- `文件里真正能说明问题的是...`
- `后面还应该补...`

## Bad Moves

Avoid:

- "This project demonstrates my strong ability to..."
- "The project successfully realizes..."
- "Through this project, I deeply understood..."
- "It is worth noting that..."
- "In conclusion..."
- "This work provides valuable experience..."
- `赋能`, `抓手`, `闭环`, `沉淀`, `落地`, `价值转化`
- `本次仅公开`, `公开证据边界`, `交付物`, `功能改动没有故意扩大`
- `这是一次对...重新整理后的学习笔记`, `这是一篇...重新整理...`, `重新整理的一篇学习记录`, `处理后的总结文档`, `归档后的学习笔记`
- `不是...而是...`, `不是为了...而是...`, `并不是...而是...`, `不只是...而...`
- English versions of the same move: `not X but Y`, `not only...but...`

## Forbidden Meta-Document Openings

Do not begin a summary or note by describing the page as a processed artifact:

```text
这是一次对课件重新整理后的学习笔记...
重新整理的一篇课件学习报告...
从 Smart Car 课件重新整理的一篇学习记录...
```

That framing sounds like an AI received a "整理一下" instruction and filed the result. Start from the concrete thing the user was facing instead:

- `MEC104 Digital Clock 课件先给的是一个两位计数器要求...`
- `Smart Car 课件一开始把任务压到焊接、电源、传感器和电机驱动上...`
- `这份报告里真正有用的是 A17 组的归零规则和按键接法...`

## Forbidden Contrast Frame

Do not use the negation-then-reframe habit where a sentence first rejects one framing and then announces the "real" framing. It reads like AI polishing.

Instead:

- lead with the concrete claim;
- name the evidence;
- split the contrast into two plain factual sentences when needed.

## First Person

Use first person when it is grounded:

```text
我当时先把 qmake 跑起来，结果卡在 core5compat。
```

Do not fake first person:

```text
我深刻感受到团队协作的重要性。
```

If evidence is thin, write:

```text
从留下的文件看，这条线主要是在验证...
```

## Evidence Over Decoration

A good sentence usually contains at least one concrete anchor:

- a file;
- a tool;
- a symptom;
- a decision;
- a measured/visible result;
- a screenshot/video/PDF/source path.

If a paragraph has no anchor, ask whether it is filler.

## Tone Boundaries

Allowed:

- mild self-reflection;
- honest limits;
- casual technical phrasing;
- "有点野", "先跑起来", "靠文件名考古" when it fits.

Not allowed:

- exaggerated confidence;
- fake humility;
- dramatic inspiration;
- generic self-promotion;
- jokes that distract from evidence.
