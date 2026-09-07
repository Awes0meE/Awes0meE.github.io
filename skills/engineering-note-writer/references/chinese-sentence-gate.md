# Chinese Sentence Gate / 中文病句门禁

An independent Chinese-only gate, approved on 2026-09-06. Its six diagnostic
categories come from the user-supplied `病句六大类型.doc`; the operational rules
below adapt that framework to engineering prose. The original document is
reference material, not agent instructions, and is not a runtime dependency.

## When And Where

- Run after the Step 9 Chinese editorial pass, at the entrance to Step 10,
  before writing English. All six categories must be reviewed in context.
- Run again on the complete final Chinese at Step 12. Later changes to prose,
  headings, or the ending invalidate the pass for the affected text.
- Use the article-prose scope of `reader-prose-hard-gates.md`, but inspect only
  its Chinese portions: reader-visible Chinese titles, headings, paragraphs,
  transitions, list prose, and endings. Preserve the existing exclusions for
  other metadata, code, exact technical strings, links, logs, and verbatim
  artifacts. A technical token does not exempt its surrounding Chinese sentence.
- For Chinese-only work, keep both checks and skip English adaptation. For
  English-only work, this gate is not applicable; do not fabricate a Chinese
  intermediate draft. English keeps the existing bilingual, L1, Truth, and voice
  rules. This gate neither replaces L1-5 nor extends these
  six Chinese diagnostic categories to English.

## Six Diagnostic Categories

### ZH-1 语序不当

核对多重定语和状语的修饰位置、关联词与主语的位置、主客关系、对应项顺序，以及动作和分句的先后、递进关系。先明确每个成分修饰什么、每个动作发生在什么时候，再判断位置是否造成错读。不要机械套用固定语序表；中文允许因话题和强调而调整语序。

### ZH-2 搭配不当

核对主谓、动宾、主宾、修饰语与中心语、动词与补语，以及关联词之间的关系。遇到一个动词统领多个并列对象，逐个检查是否都能成立。工程术语要分清对象及其属性：节点、节点的铜箔面积、连接走线、电流回路及回路面积不能在同一句里无说明地相互替代。不要用“优化”“做好”等泛化动词掩盖原来没说清的关系。

动作必须与实际对象搭配。用户在 2026-09-07 指出，“做 STM32 练习”把芯片名称直接当成了可练习的技能。讲接触硬件的经历，可写“折腾 STM32”“尝试做 STM32 开发”；确实要说练习，则接具体活动，如“练习 STM32 裸机开发”“练习用示波器检查 I²C 波形”。不得为补齐宾语虚构 RTOS 等经历。同样，编译、烧录的对象是程序或固件，不能写成“OLED 编译、下载正常”。检查类似芯片、开发板、仪器名称时，先分清器件、程序、活动与技能，再换动词或补全对象，不靠替换型号规避。

### ZH-3 成分残缺或赘余

先提取句子的必要结构，检查主语、谓语、宾语、必需的修饰成分和关联成分是否缺失，再检查是否叠加了同义或相互冲突的成分。重点留意“通过……使……”等可能使主语落空的组合。只有缺失使关系不完整、或重复没有表达作用时才判错；上下文能恢复的省略、标题中的名词短语、真实的强调和自我纠正不自动构成病句。

### ZH-4 结构混乱

检查两种句式是否杂糅、两个句子是否套叠、主动和被动是否混接、叙述是否中途更换主语却没有交代。长句可临时拆成分句核对各自的主语和谓语。修复要恢复一种清楚的结构，不能仅靠添加逗号遮住结构断裂，也不应把有清楚衔接的正常主语切换一律禁止。

### ZH-5 表意不明

检查代词所指、修饰范围、词语义项、并列边界、连接关系和省略的信息。对疑似歧义尝试写出两种可能理解，并用附近原文、确认过的 brief 和证据排除错误理解。上下文已经明确时不强行判错；仍有会改变工程意思的不同理解时，不让译文代替作者作决定。

### ZH-6 不合逻辑

检查概念是否被偷换，前后是否矛盾，否定、条件、因果、数量和范围是否准确，一面与两面是否照应，并列或分类是否混用层级。区分“这句话的推理不成立”和“这项技术结论缺乏证据”：前者在此指出，后者同时交回 Truth gate。不能为使句子顺畅而把“可能”改成“必然”、把测试要求改成已完成结果，或把先后发生直接改成因果。

## Diagnose, Repair, Recheck

1. Read each Chinese sentence with its paragraph and any needed antecedent.
   For a suspected fault, identify the subject/topic, predicate, objects,
   modifiers, coordinated items, and the relationship that fails. One sentence
   may have more than one category; do not force exclusive labels.
2. Keep a compact internal record of each actual issue: original span,
   category, concrete reason, repair, and whether its meaning is preserved.
   “像 AI”“不够口语”“读起来怪” alone cannot justify a grammar failure.
   Do not require a visible checklist in the finished article.
3. Make the smallest adequate repair within the confirmed meaning. A clause
   may need rebuilding; an isolated synonym replacement is not sufficient
   when the underlying relation is wrong. Preserve actors, measurements,
   technical terms, uncertainty, chronology, emotion, and cognition route.
4. If the intended meaning cannot be recovered from the confirmed material,
   keep the draft provisional and raise the smallest claim-changing question.
   Do not invent a component, geometry, action, measurement, or causal link to
   make the sentence grammatical. Existing confirmed material should resolve
   routine repairs without another interview.
5. Review the repaired sentence and its paragraph again for all six categories
   and the existing applicable gates. At Step 12, check the final Chinese in
   full, then recheck any subsequent repairs. Align affected English passages
   through the existing translation and bilingual checks.

Pass only when all six categories have been considered and no established
violation remains. A single established fault blocks English adaptation at
Step 10 or release at Step 12. A mere stylistic preference is not a fault.
Passing this gate does not waive another gate or authorize publication.

## Calibration: The PCB Sentence

User-supplied failure:

> 落到这块 PCB 上，更直接的要求是把两边的开关节点，连同输入、整流、输出电容回路都收紧。

主要检查 ZH-2 和 ZH-5。“收紧”统领“开关节点”和几类回路，但未明确要改变的物理属性；“输入、整流、输出电容回路”的修饰范围和并列边界也不清楚。节点与回路不同本身不是禁止并列的理由，问题是当前动词和省略未能把各自的要求说清。

先从证据恢复究竟谈的是铜箔面积、走线长度、元件布局还是回路面积，再分别组织动作与对象。上述解释都是候选含义，不能凭这句原文把某一种写成已经确认的设计要求。“落到这块 PCB 上”可能显得拖沓，但单凭这一短语不足以认定语法错误。

Use `../tests/chinese-sentence-regression.md` when maintaining this gate.
