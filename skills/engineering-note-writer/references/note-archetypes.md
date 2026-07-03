# Note Archetypes

Use one primary archetype per note. Mix only when the material really needs it.

## 1. Debugging Recap / 调试复盘型

Use when the material centers on a failure, error, or blocked path.

Spine:

```text
起点 -> 报错/症状 -> 第一种误判 -> 真正原因 -> 修改 -> 验证 -> 回头看
```

Good sections:

```markdown
## 症状 / Symptom
## 怎么卡住 / Where It Got Stuck
## 怎么改 / What Changed
## 验证 / Verification
## 回头看 / Looking Back
```

## 2. Environment Setup / 环境搭建型

Use for Qt, STM32, build tools, compilers, SDKs, package/release setup.

Spine:

```text
目标环境 -> 安装顺序 -> 第一次失败 -> 版本/路径/工具链问题 -> 跑通方法 -> 后续注意
```

Focus on exact versions, paths, commands, and failure messages.

## 3. Hardware Archive / 硬件归档型

Use for boards, schematics, PCB files, Gerber, BOM, STEP/3MF, physical prototypes.

Spine:

```text
硬件目标 -> 结构/电路组成 -> 关键约束 -> 文件证据 -> 哪些还不完整 -> 回头看
```

Mention why each public file matters. Avoid dumping a file list without interpretation.

## 4. Project Build Log / 项目构建记录型

Use for a broader project with multiple modules or phases.

Spine:

```text
问题/目标 -> 模块拆分 -> 时间线 -> 关键决策 -> 当前结果 -> 证据 -> 下一步
```

This is often better for project pages than single notes.

## 5. Learning Path / 学习路径型

Use for internship/course/self-study notes.

Spine:

```text
为什么学这个 -> 从哪个基础开始 -> 哪个概念变清楚 -> 做了什么小练习 -> 和后续项目怎么接上
```

Keep it grounded. Do not turn it into "I mastered X".

## 6. Evidence/File Explanation / 文件证据说明型

Use when the note exists mainly to make uploaded files readable.

Spine:

```text
这些文件从哪里来 -> 各自说明什么 -> 应该怎么读 -> 哪些不能过度解读 -> 后续还缺什么
```

Good for old TXT/Markdown/PDF/source snippets.

## 7. Project Overview / 项目总览型

Use when writing a project page body rather than a narrow note.

Spine:

```text
背景 -> 做了什么 -> 技术栈 -> 关键证据 -> 相关笔记 -> 当前限制 -> 回头看
```

Keep summaries precise. Let related notes carry detailed debugging stories.

## Choosing Rules

- If there is an error message, choose Debugging Recap.
- If versions/paths/toolchains dominate, choose Environment Setup.
- If boards/files dominate, choose Hardware Archive.
- If the user gives many project phases, choose Project Build Log.
- If the user gives learning points, choose Learning Path.
- If uploaded text/file artifacts are the main material, choose Evidence/File Explanation.
- If writing for `/work/<slug>`, choose Project Overview unless the project is tiny.
