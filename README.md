# XJTLU Portfolio / 西浦个人作品集网站

English | [中文](#中文说明)

## Overview

This repository contains the source code for Li Zhiyi / Awes0meE's bilingual engineering portfolio. It replaces an old Hexo-generated static export with a maintainable Next.js application designed for projects, notes, media, and future full-stack extensions.

The old deployed Hexo output is preserved under `legacy/hexo-export/` for reference only. It is not served by the new application.

Public site:

- Production: `https://www.66ccff-labs.com/`
- Vercel deployment: `https://awes0mee-portfolio.vercel.app/`

## Tech Stack

- Framework: Next.js App Router
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
content/media.json      Media gallery metadata
lib/                    Content loaders and site constants
public/uploads/         Public images, videos, and generated visuals
docs/                   Architecture, content workflow, and memory docs
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
date: "2024.10 to Now"
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

Notes are stored in `content/notes/*.mdx`. Each note should include `visibility: public` or `visibility: private`. Missing visibility is treated as private, so drafts do not accidentally appear on the public site.

Media items are stored in `content/media.json`, with assets under `public/uploads/`. Use optional `titleZh` and `captionZh` when the media card needs Chinese text for the global language switch, and add `projectSlug` so the media page can show which project the image or video comes from.

All source, content, docs, and public-upload text files must be UTF-8. Convert legacy GBK, UTF-16, EDA, Notion, and manufacturing text exports before placing them under `content/` or `public/uploads/`; `npm run lint` includes the encoding gate.

The site has a top-right English / Simplified Chinese toggle. Fixed UI labels use paired text through `components/bilingual-text.tsx`; projects and notes use `title/titleZh` and `summary/summaryZh`. Long MDX body text is still edited manually, so add bilingual body sections only where the article itself needs both languages.

Normal fenced code blocks are rendered as shared technical evidence. If a whole listing belongs only to one language view, prefix the fence language with `en-` or `zh-`, such as `en-text` or `zh-powershell`; the visible code label drops the prefix while the language toggle hides the inactive block.

Use `projectSlug` on notes and media items when they should appear as related material on a project page.

Use optional project `assetPaths` to list uploaded evidence from `public/uploads/` on project pages. Images and videos are previewed; Markdown and text documents render as readable page content; source/code files render in code frames; binary files such as PDFs, spreadsheets, Gerber archives, STEP, EasyEDA, and Word documents are linked directly.

Important privacy rule: `visibility: private` hides a note from the website, but it does not hide the source file from a public GitHub repository. Files under `public/uploads/` are always public after deployment. Do not place private financial, proof, credential, installer, vendor, dependency, or build-output files there. For Juanyun material, `Current_Product_ACUnit_Project*` and `Current_Product_BaseUnit_Project*` remain sensitive; non-Current_Product legacy folders may publish selected reviewed evidence such as small source snippets, Gerber/BOM/PnP exports, EDA files, STEP/3MF files, schematics, PDFs, images, and demo media after pruning noisy raw dumps.

Current main content state:

- `main` has removed the old portfolio rebuild project, PID Starter Kit placeholder project, and several thin Juanyun standalone project pages.
- The Juanyun ACUnit, BaseUnit, DHT11 / AM2302, actuator/fan, and SOP material is consolidated into the larger Juanyun thermal-management archive.
- The site includes real internship material from Juanyun, Nanjing Turing, Tianjin rail-transit STM32 study work, and a Claude Chime hardware power-board archive.
- The media gallery covers 50 project/note images and videos, including processed project covers, board renders, FOC schematic sheets, DIY STM32 board images, EEV driver-board images, and the Notion-exported Nanjing Turing build diagrams.
- The Juanyun SOP / Nanjing Turing text logs render as webpage notes rather than raw code blocks; the CMake/build-logic note now uses the user's Notion-exported Markdown originals instead of PDF text extraction.
- Public project/note bodies have an English coverage pass so the language switch does not drop important article sections.
- Juanyun Current_Product ACUnit/BaseUnit files stay public-safe only; non-Current_Product legacy DIY cooling, FOC, solenoid valve, BLDC quiet fan, DHT planning, and the self-authored hardware SOP can use selected reviewed public evidence.
- Do not publish private financial, billing, proof, credential, installer, vendor, dependency, or build-output files.

## Deployment

The intended deployment target is Vercel.

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

Expected result for this version:

- Lint passes
- Encoding validation passes
- Production build passes
- `npm audit --omit=dev` reports 0 vulnerabilities

## Release Tags

Latest released tag: `v0.6.1`.

Use semantic version tags. Replace the version in these commands for the next release:

```bash
git tag -a v0.6.2 -m "v0.6.2 portfolio update"
git push origin main
git push origin v0.6.2
```

---

## 中文说明

## 项目概览

这个仓库是 Li Zhiyi / Awes0meE 的英中双语工程作品集网站源码。它把原来由 Hexo 教程生成的静态输出，重构成一个可长期维护的 Next.js 应用，用于展示项目、学习笔记、媒体材料，并为未来的全栈功能预留空间。

旧版 Hexo 输出保存在 `legacy/hexo-export/`，只作为历史参考，不再作为新网站的服务内容。

公开访问地址：

- 生产域名：`https://www.66ccff-labs.com/`
- Vercel 部署地址：`https://awes0mee-portfolio.vercel.app/`

## 技术栈

- 框架：Next.js App Router
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
content/media.json      媒体图库数据
lib/                    内容读取和站点常量
public/uploads/         公开图片、视频和视觉素材
docs/                   架构、内容维护和记忆系统文档
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

学习笔记放在 `content/notes/*.mdx`。每篇笔记都应该设置 `visibility: public` 或 `visibility: private`。缺失 `visibility` 会被当作 private，避免草稿误发布。

媒体内容维护在 `content/media.json`，图片和视频资源放在 `public/uploads/`。如果媒体卡片需要随全站语言切换显示中文，使用可选字段 `titleZh` 和 `captionZh`；如果媒体来自某个项目，补上 `projectSlug`，媒体页会显示来源项目。

所有源码、内容、文档和公开上传文本都统一使用 UTF-8。旧资料里的 GBK、UTF-16、EDA/Notion/制造导出文本要先转成 UTF-8，再放进 `content/` 或 `public/uploads/`；`npm run lint` 会连带运行编码校验。

网站右上角有 English / 简体中文切换按钮。固定 UI 文案通过 `components/bilingual-text.tsx` 成对维护；项目和笔记使用 `title/titleZh`、`summary/summaryZh`。长篇 MDX 正文不会自动翻译，需要双语正文时手动补充。

普通代码块会按共享技术证据处理，不会自动跟随英文 / 中文正文隐藏。如果整段列表或代码只属于某一个语言视图，围栏语言前面加 `en-` 或 `zh-`，例如 `en-text`、`zh-text`、`en-powershell`。页面右上角仍然只显示 `text` 或 `powershell`，语言切换时会隐藏另一侧。

如果笔记或媒体需要自动显示在某个项目页面上，使用 `projectSlug` 关联对应项目 slug。

项目可以使用可选的 `assetPaths` 字段，把 `public/uploads/` 下的公开资料直接列到项目页。图片和视频会预览，Markdown 和文本文件会以正文形式显示，源码/代码文件会放进代码框，PDF、表格、Gerber、STEP、EasyEDA、Word 等二进制资料会作为直接链接。

重要隐私规则：`visibility: private` 只会把笔记从网站上隐藏，不会把源码从公开 GitHub 仓库里隐藏。`public/uploads/` 下的文件部署后就是公开静态文件。不要把私密财务、证明、凭据、安装包、vendor、依赖或 build 输出文件放进去。卷云材料里，`Current_Product_ACUnit_Project*` 和 `Current_Product_BaseUnit_Project*` 仍然按敏感资料处理；非 Current_Product 的 legacy 文件夹可以在筛选后发布小段源码、Gerber/BOM/PnP、EDA、STEP/3MF、原理图、PDF、图片和演示媒体等证据，但不能整包倾倒原始目录。

当前 main 内容状态：

- `main` 已删除旧的作品集重构项目、PID Starter Kit 占位项目，以及几个较薄的卷云独立项目页。
- 卷云 ACUnit、BaseUnit、DHT11 / AM2302、执行器 / 风扇和 SOP 材料已合并到更大的热管理硬件与固件开发档案页。
- 站点已整理卷云、南京图灵、天津轨道交通 STM32 学习材料，并新增 Claude Chime 硬件电源管理板档案。
- 媒体页覆盖 50 个项目 / 笔记图片和视频，包括处理后的项目封面、板卡渲染图、FOC 分页原理图、DIY STM32 板图、EEV 驱动小板图，以及南京图灵 Notion 导出的编译逻辑图。
- 卷云 SOP、南京图灵文字日志和 CMake / 编译底层逻辑 Notion 原文都以网页笔记形式展示，不再只放在冰冷的代码框或 PDF 抽取结果里。
- 公开项目和笔记正文已经做过英文覆盖检查，语言切换时不应丢失关键内容。
- 卷云 Current_Product ACUnit/BaseUnit 资料仍然只保留脱敏叙述和截图；非 Current_Product 的 legacy DIY 散热、FOC、螺线管阀门、BLDC 静音风扇、DHT 计划书和自写硬件 SOP 可以使用筛选后的公开证据。
- 不要发布私密财务、开票、证明、凭据、安装包、vendor、依赖或 build 输出文件。

## 部署

推荐部署到 Vercel。

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

预期结果：

- lint 通过
- 编码校验通过
- 生产构建通过
- `npm audit --omit=dev` 显示 0 vulnerabilities

## 版本标签

最新已发布标签：`v0.6.1`。

使用语义化版本标签。下一次发布时替换下面命令里的版本号：

```bash
git tag -a v0.6.2 -m "v0.6.2 portfolio update"
git push origin main
git push origin v0.6.2
```
