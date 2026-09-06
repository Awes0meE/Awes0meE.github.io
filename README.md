# Robotic Systems Hardware Portfolio / 机器人系统硬件作品集

English | [中文](#中文说明)

## Overview

This repository contains the source code for Alvin Li's bilingual robotic systems hardware portfolio, with iRidium / 铱 as the engineering archive brand. It organizes projects, notes, and media around embedded control, schematic and PCB design, board bring-up, hardware–firmware integration, motor drives, and power electronics.

As of `2026-08-21`, Alvin Li is pursuing the Master of Science (Robotics and Intelligent Systems) at Nanyang Technological University, Singapore. Through XJTLU's dual-degree programme, he holds a BEng in Telecommunications Engineering from Xi'an Jiaotong-Liverpool University and a BEng (Hons) in Telecommunications Engineering with First Class Honours from the University of Liverpool.

The old deployed Hexo output is preserved under `legacy/hexo-export/` for reference only. It is not served by the new application.

Public site:

- Production: `https://www.66ccff-labs.com/`
- Vercel deployment: `https://awes0mee-portfolio.vercel.app/`

## Identity And Privacy

- The public site leads with the robotic systems hardware direction; student status provides current-stage context rather than the primary headline.
- Reader-facing contact surfaces expose GitHub and the public NTU student email `ZHIYI012@e.ntu.edu.sg`; location remains omitted.

## Tech Stack

- Framework: Next.js 16.3 App Router
- Language: TypeScript
- UI: React 19, Tailwind CSS
- Content: local MDX files with typed frontmatter
- Metadata: JSON for media items
- Icons: lucide-react
- Deployment target: Vercel
- Package manager: npm

## Project Structure

```text
app/                    Next.js routes and pages
components/             Reusable UI components
content/projects/       Project case studies in MDX
content/notes/          Learning notes in MDX
content/media.json      Project-linked media archive metadata
lib/                    Content loaders and site constants
public/uploads/         Public images, videos, and generated visuals
public/brand/           Approved iRidium identity assets
docs/                   Architecture, content workflow, and memory docs
docs/experiments/       Read-only writing-tool comparison archives
CODEX.md                AI-agent operating guide for this repository
MEMORY.md               Durable project memory and decisions
legacy/hexo-export/     Archived old Hexo deployment output
```

## AI And Maintenance Docs

- `CODEX.md`: project rules for Codex and other AI agents.
- `AGENTS.md`: compatibility pointer to `CODEX.md`.
- `MEMORY.md`: current durable project memory.
- `docs/environment-toolchain.md`: Node.js, npm, PowerShell, Git, Vercel, and local preview setup.
- `docs/memory-system.md`: how memory should be read and updated.
- `docs/content-workflow.md`: how to add projects, notes, images, and videos.
- `docs/architecture.md`: routes, data flow, deployment, and non-goals.
- `docs/experiments/`: dated, non-production writing-tool comparisons and their fact audits.

## Local Development

Toolchain baseline:

- Node.js 22 LTS or newer; `.nvmrc` uses `22`.
- npm 10 or newer.
- Use npm only. The repository intentionally keeps a single `package-lock.json`.
- On Windows PowerShell, prefer `npm.cmd` because `npm` can resolve to a blocked `npm.ps1` shim.

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

Local troubleshooting:

- Detailed setup and recovery commands live in `docs/environment-toolchain.md`.
- Do not run `npm run build` while `npm run dev` is still running. Both commands write to `.next/`, and mixing them can corrupt the local development cache.
- If a note page fails with an error like `Cannot find module './vendor-chunks/esprima.js'`, stop all local Next.js/Node processes for this project, delete `.next/`, then run `npm run dev` again.
- On Windows PowerShell, use `npm.cmd` if the shell blocks `npm.ps1`.

## Common Commands

```bash
npm run dev              # Start local development server
npm run lint             # Run ESLint, content validation, and encoding validation
npm run build            # Build the production site
npm run start            # Start a production server after build
npm run typecheck        # Run TypeScript without emitting files
npm run validate-content # Check frontmatter, projectSlug joins, and local upload refs
npm run validate-encoding # Check Git-managed text files are clean UTF-8
```

Use the same commands with `npm.cmd` on Windows PowerShell, for example `npm.cmd run lint`.

## Content Editing

Projects are stored in `content/projects/*.mdx`. Each project uses frontmatter:

```yaml
---
title: "Example Hardware Archive"
titleZh: "示例硬件档案"
summary: "English summary"
summaryZh: "中文摘要"
date: "2024.10"
status: "In Progress"
tags: ["STM32", "Control", "PCB"]
cover: "/uploads/projects/example-hardware/cover.jpg"
featured: true
links:
  repo: "https://github.com/Awes0meE/example"
assetPaths:
  - "/uploads/projects/example-hardware"
---
```

Notes are stored in `content/notes/*.mdx`. Each note should include `visibility: public` or `visibility: private`. Missing visibility is treated as private, so drafts do not accidentally appear on the public site. `projectSlug` is optional in the content schema, but a public note needs a valid matching project to enter the current `/notes` Routed Signal Map.

Media items are stored in `content/media.json`, with assets under `public/uploads/`. Use optional `titleZh` and `captionZh` when the media record needs Chinese text for the global language switch, and add `projectSlug` to every project-owned record so `/media` can keep it inside the correct project chapter.

All source, content, docs, and public-upload text files must be UTF-8. Convert legacy GBK, UTF-16, EDA, Notion, and manufacturing text exports before placing them under `content/` or `public/uploads/`; `npm run lint` includes the encoding gate.

The site has a top-right English / Simplified Chinese toggle. A first visit starts in English; a valid saved choice in browser `localStorage` wins on later visits. Fixed UI labels use paired text through `components/bilingual-text.tsx`; projects and notes use `title/titleZh` and `summary/summaryZh`. Long MDX body text is still edited manually, so add bilingual body sections only where the article itself needs both languages.

Normal fenced code blocks are rendered as shared technical evidence. If a whole listing belongs only to one language view, prefix the fence language with `en-` or `zh-`, such as `en-text` or `zh-powershell`; the visible code label drops the prefix while the language toggle hides the inactive block.

Use `projectSlug` on notes and media items when they should appear as related material on a project page. A public note without a valid project join can still have a detail route, but it is not placed into a fabricated “unassigned” channel on `/notes`.

Use optional project `assetPaths` to list uploaded evidence from `public/uploads/` on project pages. The project page shows a left-side file index and a right-side preview panel. Images and videos preview inline; Markdown and text documents render as readable page content; source/code files render in code frames; PDFs embed from page one where the browser supports it; binary files such as spreadsheets, Gerber archives, STEP, EasyEDA, and Word documents keep direct open links. Uploaded Markdown previews resolve relative links/images from the source file path. HTML and SVG uploads are treated as download-only artifacts rather than inline previews.

Important privacy rule: `visibility: private` hides a note from the website, but it does not hide the source file from a public GitHub repository. Files under `public/uploads/` are always public after deployment. Do not place private financial, proof, credential, installer, vendor, dependency, or build-output files there. For Juanyun material, `Current_Product_ACUnit_Project*` and `Current_Product_BaseUnit_Project*` remain sensitive; non-Current_Product legacy folders may publish selected reviewed evidence such as small source snippets, Gerber/BOM/PnP exports, EDA files, STEP/3MF files, schematics, PDFs, images, and demo media after pruning noisy raw dumps.

Current repository content state, 2026-09-07:

The source collection contains 8 project pages, 27 learning notes and 84 media
records. Fifteen notes are public across five project channels; twelve older
notes remain suspended while their projects await a focused note rewrite.

- Arduino Smart Car has two bilingual notes on power and wheel-speed measurement,
  and on line sensing with input acquisition.
- The two-digit counter has two bilingual notes on common-anode displays and BCD,
  and on latching switches with counter control.
- DIY Cooling has two bilingual notes on temperature sampling and fan response,
  and on PWM fan control with speed feedback.
- The nine previously public Juanyun technical/source notes and Nanjing Turing
  source-document notes remain available. Project pages, note links and the
  index use the same `visibility` and `projectSlug` data.

The six approved notes replace the three former project narratives. Their old
backup copies and completed review pages have been removed; the current MDX
files are the editing source of truth. Git retains the previous versions.
The Smart Car homepage now consistently identifies seven IR tracking inputs.

The [release record](docs/releases/engineering-notes-2026-09-07/README.md) lists
all six routes and checks. The [active handoff](docs/active-work/portfolio-copy-rewrite.md)
tracks the remaining projects. The repository-local
[Engineering Note Writer](skills/engineering-note-writer/SKILL.md) contains the
Chinese sentence gates, cross-page division, internal fact checking and
contextual ending-variety review. Full design and asset constraints live in
`PRODUCT.md`, `DESIGN.md` and `docs/content-workflow.md`.

## Deployment

The intended deployment target is Vercel.

GitHub Pages is only a redirect fallback for the username repository. Keep GitHub Pages source set to `gh-pages:/`, where `index.html` and `404.html` redirect to the production domain. Do not set Pages source to `main:/`, and do not deploy the full Next.js source tree through Pages.

Recommended Vercel settings:

- Framework preset: Next.js
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: leave default
- Node.js: use the repository `engines` baseline or Vercel's current Node LTS

## Quality Checks

Before publishing:

```bash
npm run lint
npm run validate-content
npm run validate-encoding
npm run typecheck
npm run build
npm audit --omit=dev
```

Expected result for a release candidate:

- Lint passes
- Encoding validation passes
- Production build passes
- Review the current `npm audit --omit=dev` output; do not reuse an older vulnerability count

## Release Tags

Latest released tag: `v0.9.0`.

Use semantic version tags only after the topic branch has passed review and its pull request has merged. Synchronize `main`, verify the exact release commit, then create and push only the tag:

```bash
git fetch --prune origin
git switch main
git pull --ff-only origin main
git status --short --branch
git tag -a v0.9.1 -m "v0.9.1 portfolio update"
git push origin v0.9.1
```

---

## 中文说明

## 项目概览

这个仓库是 Alvin Li 的英中双语机器人系统硬件作品集源码，iRidium / 铱 作为工程档案品牌。项目、笔记和媒体内容围绕嵌入式控制、原理图与 PCB 设计、板级 bring-up、软硬件联调、电机驱动和电力电子展开。

截至 `2026-08-21`，Alvin Li 在新加坡南洋理工大学攻读机器人与智能系统理学硕士；本科阶段通过西交利物浦大学双学位项目，获得西交利物浦大学通信工程工学学士学位，以及英国利物浦大学通信工程荣誉工学学士学位（一等荣誉）。

旧版 Hexo 输出保存在 `legacy/hexo-export/`，只作为历史参考，不再作为新网站的服务内容。

公开访问地址：

- 生产域名：`https://www.66ccff-labs.com/`
- Vercel 部署地址：`https://awes0mee-portfolio.vercel.app/`

## 身份定位与隐私

- 公开站点首先呈现机器人系统硬件方向，学生身份只用于说明当前阶段，不作为主标题。
- 面向读者的联系入口公开 GitHub 与南洋理工大学学生邮箱 `ZHIYI012@e.ntu.edu.sg`，不公开所在地。

## 技术栈

- 框架：Next.js 16.3 App Router
- 语言：TypeScript
- UI：React 19、Tailwind CSS
- 内容：本地 MDX 文件 + typed frontmatter
- 媒体数据：JSON
- 图标：lucide-react
- 部署目标：Vercel
- 包管理器：npm

## 项目结构

```text
app/                    Next.js 路由和页面
components/             可复用 UI 组件
content/projects/       MDX 项目案例
content/notes/          MDX 学习笔记
content/media.json      按项目关联的媒体档案数据
lib/                    内容读取和站点常量
public/uploads/         公开图片、视频和视觉素材
public/brand/           已确认的 iRidium 品牌识别资源
docs/                   架构、内容维护和记忆系统文档
docs/experiments/       只读写作工具对照实验档案
CODEX.md                本仓库的 AI 协作指南
MEMORY.md               项目长期记忆和决策记录
legacy/hexo-export/     旧版 Hexo 输出归档
```

## AI 协作与维护文档

- `CODEX.md`：给 Codex 和其他 AI agent 的项目规则。
- `AGENTS.md`：指向 `CODEX.md` 的兼容入口。
- `MEMORY.md`：本项目长期记忆。
- `docs/memory-system.md`：记忆系统的读取和更新方法。
- `docs/content-workflow.md`：如何添加项目、笔记、图片和视频。
- `docs/architecture.md`：路由、数据流、部署和非目标。

## 本地开发

安装依赖：

```bash
npm install
```

启动本地开发服务器：

```bash
npm run dev
```

浏览器打开：

```text
http://127.0.0.1:3000
```

本地问题排查：

- 不要在 `npm run dev` 还开着的时候同时跑 `npm run build`。这两个命令都会写 `.next/`，混在一起容易把本地开发缓存弄坏。
- 如果打开笔记页时看到类似 `Cannot find module './vendor-chunks/esprima.js'` 的报错，先停掉当前项目相关的 Next.js/Node 进程，删除 `.next/`，再重新运行 `npm run dev`。
- 在 Windows PowerShell 里如果 `npm.ps1` 被执行策略拦住，可以改用 `npm.cmd`。

## 常用命令

```bash
npm run dev       # 启动本地开发服务器
npm run lint      # 运行 ESLint、内容校验和编码校验
npm run build     # 构建生产版本
npm run start     # 构建后启动生产服务器
npm run typecheck # 运行 TypeScript 类型检查
npm run validate-content # 检查 frontmatter、projectSlug 和本地上传引用
npm run validate-encoding # 检查 Git 管理的文本文件是否都是干净 UTF-8
```

## 内容维护

项目内容放在 `content/projects/*.mdx`。每个项目使用 frontmatter 描述元数据。

学习笔记放在 `content/notes/*.mdx`。每篇笔记都应该设置 `visibility: public` 或 `visibility: private`。缺失 `visibility` 会被当作 private，避免草稿误发布。`projectSlug` 在内容结构里仍是可选字段，但公开笔记只有关联到真实项目后，才会进入当前 `/notes` Routed Signal Map。

媒体内容维护在 `content/media.json`，图片和视频资源放在 `public/uploads/`。如果媒体记录需要随全站语言切换显示中文，使用可选字段 `titleZh` 和 `captionZh`；每一条属于具体项目的媒体都要补上 `projectSlug`，这样 `/media` 才会把它保留在正确的项目分区中。

所有源码、内容、文档和公开上传文本都统一使用 UTF-8。旧资料里的 GBK、UTF-16、EDA/Notion/制造导出文本要先转成 UTF-8，再放进 `content/` 或 `public/uploads/`；`npm run lint` 会连带运行编码校验。

网站右上角有 English / 简体中文切换按钮。首次访问默认进入英文；之后浏览器 `localStorage` 中有效的已保存选择优先。固定 UI 文案通过 `components/bilingual-text.tsx` 成对维护；项目和笔记使用 `title/titleZh`、`summary/summaryZh`。长篇 MDX 正文不会自动翻译，需要双语正文时手动补充。

普通代码块会按共享技术证据处理，不会自动跟随英文 / 中文正文隐藏。如果整段列表或代码只属于某一个语言视图，围栏语言前面加 `en-` 或 `zh-`，例如 `en-text`、`zh-text`、`en-powershell`。页面右上角仍然只显示 `text` 或 `powershell`，语言切换时会隐藏另一侧。

如果笔记或媒体需要自动显示在某个项目页面上，使用 `projectSlug` 关联对应项目 slug。未正确关联项目的公开笔记仍可拥有详情路由，但 `/notes` 不会为它虚构“未分配”通道。

项目可以使用可选的 `assetPaths` 字段，把 `public/uploads/` 下的公开资料放进项目页的文件浏览器。左侧是项目文件索引，右侧是当前文件预览。图片和视频会内嵌预览，Markdown 和文本文件会以正文形式显示，源码/代码文件会放进代码框，PDF 会尽量从第一页内嵌预览，表格、Gerber、STEP、EasyEDA、Word 等二进制资料保留直接打开链接。上传 Markdown 里的相对链接和图片会按源文件路径解析；HTML 和 SVG 上传物只作为下载附件处理，不做内嵌预览。

重要隐私规则：`visibility: private` 只会把笔记从网站上隐藏，不会把源码从公开 GitHub 仓库里隐藏。`public/uploads/` 下的文件部署后就是公开静态文件。不要把私密财务、证明、凭据、安装包、vendor、依赖或 build 输出文件放进去。卷云材料里，`Current_Product_ACUnit_Project*` 和 `Current_Product_BaseUnit_Project*` 仍然按敏感资料处理；非 Current_Product 的 legacy 文件夹可以在筛选后发布小段源码、Gerber/BOM/PnP、EDA、STEP/3MF、原理图、PDF、图片和演示媒体等证据，但不能整包倾倒原始目录。

当前工作区内容状态：

2026-09-07 内容状态：8 个项目主页、27 个笔记源文件、84 条媒体记录。其中 15 篇笔记公开，分布在 5 个项目通道；另有 12 篇旧笔记暂挂，随各项目后续重写逐篇处理。

- Arduino 小车有两篇双语笔记，分别研究供电与轮速测量、循迹信号与输入采集。
- 两位计数器有两篇双语笔记，分别研究共阳数码管与 BCD、自锁按键与计数控制。
- DIY 散热器有两篇双语笔记，分别研究温度采样与响应、PWM 风扇控制与转速反馈。
- 原先公开的 9 篇卷云技术或来源资料、南京图灵原始文档笔记继续可读。主页关联列表、笔记索引与详情页共同使用 `visibility` 和 `projectSlug`。

六篇获批新稿已替换三个项目的旧叙事笔记。对应旧稿备份与已完成的审稿副本已删除，后续编辑以 `content/notes/` 中的正式文件为准；历史版本仍在 Git 中。小车主页已统一为七路红外循迹输入。

[发布记录](docs/releases/engineering-notes-2026-09-07/README.md)列出六篇入口和检查结果，[接力文档](docs/active-work/portfolio-copy-rewrite.md)记录剩余项目。最新 [Engineering Note Writer](skills/engineering-note-writer/SKILL.md)包含中文病句门禁、跨页面分工、内部事实检查与结尾重复检查。完整设计和公开资料规则见 `PRODUCT.md`、`DESIGN.md` 和 `docs/content-workflow.md`。

## 部署

推荐部署到 Vercel。

GitHub Pages 只作为用户名仓库的跳转兜底使用。Pages source 要保持为 `gh-pages:/`，其中 `index.html` 和 `404.html` 只负责跳转到生产域名。不要把 Pages source 改回 `main:/`，也不要用 Pages 发布完整的 Next.js 源码树。

当前公开访问地址：

- 生产域名：`https://www.66ccff-labs.com/`
- Vercel 部署地址：`https://awes0mee-portfolio.vercel.app/`

Vercel 推荐配置：

- Framework preset：Next.js
- Install command：`npm install`
- Build command：`npm run build`
- Output directory：保持默认
- Node.js：使用 Vercel 默认 LTS

## 质量检查

发布前建议运行：

```bash
npm run lint
npm run validate-content
npm run validate-encoding
npm run typecheck
npm run build
npm audit --omit=dev
```

发布候选的预期结果：

- lint 通过
- 编码校验通过
- 生产构建通过
- 检查本次 `npm audit --omit=dev` 输出，不复用旧的漏洞数量

## 版本标签

最新已发布标签：`v0.9.0`。

主题分支通过评审并由 Pull Request 合并后，再创建语义化版本标签。先同步 `main` 并核对准确发布提交，然后只推送标签：

```bash
git fetch --prune origin
git switch main
git pull --ff-only origin main
git status --short --branch
git tag -a v0.9.1 -m "v0.9.1 portfolio update"
git push origin v0.9.1
```

Further note work proceeds one project at a time from `docs/active-work/portfolio-copy-rewrite.md`.
