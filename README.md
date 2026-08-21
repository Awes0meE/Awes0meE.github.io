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

Current workspace content state:

- The sitewide public identity and SEO metadata use Alvin Li. The exact English brand spelling is always `iRidium`—lowercase `i`, uppercase `R`, then lowercase `idium`. iRidium / 铱 is the engineering archive brand; the previous public aliases no longer appear as reader-facing identity labels.
- The approved iRidium mark uses five rectilinear outlined blocks inside a square boundary: two left blocks, one uninterrupted full-height centre rectangle, and two right blocks, with equal square bounds for the upper-left and lower-right blocks. The transparent lockup, square header mark, and user-selected B-style script wordmark live under `public/brand/`; the header serves the wordmark as a portable transparent asset so it stays visually identical in both language modes and across devices.
- Desktop paper and Ember headers share the same low-key `01`–`04` indices, sizing, typography, lift, press feedback, and line-growth motion; only their pine/graphite and orange/warm-white palettes differ. The shared route state remains semantic, the compact mobile navigation stays unnumbered, and the first keyboard stop is a bilingual skip link. Standalone header and archive controls keep at least 44px touch targets across themes.
- The homepage education block uses one full-width NTU row and a second two-column row for XJTLU's dual-degree undergraduate awards. It lists `BEng Telecommunications Engineering` from Xi'an Jiaotong-Liverpool University and `BEng (Hons) Telecommunications Engineering` with `First Class Honours` from the University of Liverpool.
- Release `v0.9.0` replaces the homepage's former five-card mosaic with an atom-like technical visual. Five prototype images from `public/uploads/hero/` form a slowly rotating nucleus; three equal-sized orbits separated by 60 degrees each carry five evenly spaced technology marks for embedded systems, firmware, and engineering tools. The prototype images and third-party marks are representative presentation material only: they do not prove fabrication, validation, affiliation, endorsement, or proficiency. Technology-mark provenance is recorded in `public/skills/icons/README.md`, and institution-mark provenance is recorded in `public/education/README.md`.
- The atom motion pauses when the visual leaves the viewport or the document is hidden, and it falls back to a static composition when the operating system requests reduced motion. Ember Black is an opt-in shared shell rather than a global replacement; `/work`, `/notes`, `/media`, and `/about` have their own approved Project Aperture Sequence, Routed Signal Map, Focus Aperture, and Tension Signal Column structures, while project and note detail routes retain the paper system. Current route scope is authoritative in `DESIGN.md`.
- The `/work` Project Aperture Sequence presents all eight projects as complete evidence-first chapter links. A sticky `01`–`08` rail locates the current chapter on desktop and becomes horizontal on mobile. Seven spacious black intervals separate adjacent projects; their short orange ticks move right to left, pause offscreen or while the document is hidden, and remain static under reduced-motion preferences.
- The `/notes` Routed Signal Map places all 24 currently linked public notes across eight real-project channels and one continuous reading ledger. The selected orange route follows the existing graphite stem and zig-zag bus to a project-specific ledger endpoint. On wide screens the Project channels and Route controls keep a stable shared depth while only the note ledger follows result height; titles use the available ledger width without overflowing smaller screens. Visitors can search bilingual titles, summaries, tags, and project names, filter by project or frontmatter year, reset the controls, and open any complete row; its dates describe archive coverage rather than a strict engineering-activity timeline.
- Work chapters, Notes ledger rows, and homepage note rows use one bounded dark-to-paper handoff: the live dark surface fades to black, black interpolates to paper white over the same duration, the destination mounts below an opaque paper mask, and the complete paper page is revealed after first-viewport assets are ready. Direct visits, refreshes, browser history, paper-to-paper links, and reduced-motion navigation remain immediate.
- The `/media` Focus Aperture keeps all 84 records attached to eight project sources. Choosing a source updates one authentic lead record, homepage media thumbnails initialize the matching source, and complete server-rendered project chapters remain below; technical evidence uses contain fitting and motion stops under reduced-motion preferences.
- The `/about` Tension Signal Column uses CV-grounded bilingual copy to trace Alvin's path from telecommunications study into hardware, firmware, bring-up, measurement, and handoff without repeating the homepage capability list. The portrait remains the original complete white field with black line art; four route nodes and one restrained pulse describe connection only, not rank, progress, or validation.
- Reader-facing contact surfaces expose GitHub and `ZHIYI012@e.ntu.edu.sg`; location remains omitted.
- `main` has removed the old portfolio rebuild project, PID Starter Kit placeholder project, and several thin Juanyun standalone project pages.
- The Juanyun ACUnit, BaseUnit, DHT11 / AM2302, actuator/fan, and SOP material is consolidated into the larger Juanyun thermal-management archive.
- The approved Juanyun thermal refactor presents BaseUnit and the three-board ACUnit as one phase-change laptop-cooling system, adds distinct automatic-control and ControlPanel/maintenance notes, and includes five reviewed ACUnit V2.1 bring-up photographs. Complete firmware and reconstructable product source remain private; later performance, endurance, and user-test results stay attributed to the company and unverified by Alvin.
- The site includes real internship material from Juanyun, Nanjing Turing, and Tianjin rail-transit STM32 study work, plus an approved bilingual Claude Chime commissioned-hardware case study, a related cold-start debugging note, and reviewed public design/bring-up evidence.
- The site also includes an Arduino Digital Clock course project from MEC104, with an approved bilingual first-person project page, one related learning note, 11 media records, selected public course/report evidence, Arduino sketches, a cleaned demo video, and the SN54LS47 datasheet. The copy preserves personal contribution boundaries, treats the rollover thresholds as separately flashed versions, and does not overstate what the surviving video, early `main.c`, or unresolved final switch implementation proves.
- The site also includes an Arduino Smart Car line-tracking course project from MEC104, with a project page, one related learning note, selected course screenshots with the school logo area removed, the public kit manual PDF, the project report PDF, cleaned car photos, and Arduino testing code.
- The sensorless FOC project is an independent personal motor-control learning route. Its project page, observer-handoff note, 12 media records, and 22 curated public files cover the custom STM32F446/DRV8301 board, onsite SMT, 12 V compressor operation, and code-grounded SVPWM interpretation while keeping completed sensorless takeover outside the claimed result.
- The DIY pressure-flow cooling project page, learning note, and six media records now use the approved first-person engineering story gathered through the one-project-at-a-time interview workflow; remembered temperature and frame-rate changes remain explicitly personal observations rather than a controlled benchmark.
- The Tianjin Jintie Communications STM32 project page, five learning notes, and three media records now use the approved bilingual first-person learning story: Keil/ST-Link bring-up, peripheral-level GPIO/EXTI/timer reasoning, distinct ADC/PWM/UART roles, and one bare-metal integrated demo. The 16-point map remains feedforward, hardware-I2C lockup remains a present-day hypothesis, and PID plus ATP/ATO/ATS remain reading-layer concepts rather than implemented railway control.
- The Nanjing Turing Qt/Seamly2D project page, three-week note, and five media records now use the approved bilingual first-person internship story: starting with school-level C++ and no Qt, bringing up the large upstream codebase, adding a local `QSettings` account/role entrance, practising the Git workflow, and packaging on Windows and macOS. The copy keeps online authentication out of scope, separates formal development-machine acceptance from the later clean Windows PC test, stops macOS at a launched unsigned DMG with signing/notarization unfinished, and leaves later adoption after handoff unknown.
- The project-grouped media archive contains 84 records across eight projects: 80 images and four videos. It includes 12 independent FOC learning-route records, processed project covers, board renders, DIY STM32 board images, EEV driver-board images, five approved ACUnit V2.1 bring-up photographs, the Notion-exported Nanjing Turing build diagrams, Digital Clock screenshots/demo/report media, and Smart Car photos/tutorial screenshots.
- The Juanyun SOP / Nanjing Turing text logs render as webpage notes rather than raw code blocks; the CMake/build-logic note now uses the user's Notion-exported Markdown originals instead of PDF text extraction.
- Public project/note bodies have an English coverage pass so the language switch does not drop important article sections.
- Public project files render through a two-pane browser with server-side path normalization, strict UTF-8 reads, directory/file/preview-size caps, and a `juanyun-tech` allowlist checked by `npm run validate-content`.
- Juanyun Current_Product ACUnit/BaseUnit files stay public-safe only; non-Current_Product legacy DIY cooling, solenoid valve, BLDC quiet fan, DHT planning, and the self-authored hardware SOP can use selected reviewed public evidence. FOC is maintained under its separate personal-project boundary.
- Do not publish private financial, billing, proof, credential, installer, vendor, dependency, or build-output files.

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

- 全站公开姓名与 SEO 元数据统一使用 Alvin Li；英文品牌必须严格写作 `iRidium`，即小写 `i`、大写 `R`、其余 `idium` 小写。iRidium / 铱 作为工程档案品牌，旧公开别名不再作为面向读者的身份标签。
- 已确认的 iRidium 图形由正方形边界内的五个直角矩形轮廓构成：左侧两块、中央一根不分割的通长矩形、右侧两块，其中左上角与右下角使用相同的正方形边界。透明完整锁定稿、页头正方形标记和用户选定的 B 款花体字标保存在 `public/brand/`；页头直接加载透明字标资产，因此在中英文模式和不同设备上都保持同一个英文 `iRidium` 外观。
- 纸白与 Ember 两套桌面页头现在共用低透明度的 `01`–`04` 编号、尺寸、字体、抬升、按压反馈和信号线生长动画，只保留松绿/石墨与橙色/暖白的配色差异。共享导航保留语义化的当前路由状态，紧凑移动导航不显示编号；键盘第一个焦点是双语 Skip link，页头和档案中的独立控件在两种主题里都保持至少 44px 的触控尺寸。
- 首页教育区第一行显示“南洋理工大学·新加坡”及机器人与智能系统理学硕士在读；第二行以双栏展示本科双学位：西交利物浦大学通信工程工学学士，以及英国利物浦大学通信工程荣誉工学学士（一等荣誉）。
- `v0.9.0` 已把首页原来的五图拼贴替换为原子式技术可视化：`public/uploads/hero/` 中的五张 prototype 图片组成缓慢旋转的核团，三条尺寸一致、互成 60 度的轨道分别承载嵌入式系统、固件开发和工程工具三类技术栈，每条轨道上有五个等距标识。prototype 图片和第三方标识只用于代表性视觉展示，不能证明制造、验证、关联、背书或熟练度。技术标识来源记录在 `public/skills/icons/README.md`，学校标识来源记录在 `public/education/README.md`。
- 原子动效在可视化离开视口或页面被隐藏时暂停；当操作系统启用“减少动态效果”时，页面会降级为静态构图。Ember Black 是按路由主动启用的共享外壳，不是全站强制替换；`/work`、`/notes`、`/media` 与 `/about` 分别采用批准后的项目检视窗序列、路由信号图、深焦检视窗和张力信号柱，项目与笔记详情页继续使用 paper system。当前路由范围以 `DESIGN.md` 为准。
- `/work` 项目检视窗序列把 8 个真实项目分别做成可整体点击的证据章节。桌面端用粘性的 `01`–`08` rail 标记当前位置，移动端将其改为横向 rail；相邻项目之间共有 7 段留白更大的黑色间隔，橙色短竖线由右向左移动，离开视口或页面隐藏时暂停，并在“减少动态效果”模式下保持静态。
- `/notes` 路由信号图把当前 24 篇已关联的公开笔记分布到 8 个真实项目通道和一条连续阅读台账中。选中的橙色路径会沿既有灰色 stem 与折线 bus 前进，并落到对应项目的台账端点。宽屏下“项目通道”和“路由控制”保持固定的共同深度，只让右侧笔记台账随结果高度变化；标题会利用完整台账宽度，并在小屏安全换行。访客可以搜索中英文标题、摘要、标签与项目名，按项目或 frontmatter 年份筛选，重置条件，并点击完整记录行进入详情；日期只描述档案覆盖，不代表严格的工程活动时间线。
- Work 项目章节、Notes 台账行和首页笔记行共用一套受限的暗色到纸白交接：暗色内容先渐隐到黑场，再用相同时长从黑场过渡到纸白；目标页在不透明纸白遮罩下完成首屏加载，随后整页一次显现。直接访问、刷新、浏览器历史、纸白页之间的链接，以及“减少动态效果”模式都保持即时导航。
- `/media` 深焦检视窗把 84 条记录绑定到 8 个项目来源。选择来源会更新一条真实主记录，首页媒体缩略图会初始化对应来源，完整的服务端项目分组仍保留在下方；技术证据使用 contain 适配，“减少动态效果”模式会停止检视窗动效。
- `/about` 张力信号柱使用以简历事实为边界的双语文案，梳理 Alvin 从通信工程学习走向硬件、固件、bring-up、测量与交接的路径，避免重复首页的能力清单。头像保留原图完整白底与黑色线稿；四个节点与一次克制的脉冲只表达连接，不表示排名、进度或验证。
- 面向读者的联系入口公开 GitHub 与 `ZHIYI012@e.ntu.edu.sg`，不公开所在地。
- `main` 已删除旧的作品集重构项目、PID Starter Kit 占位项目，以及几个较薄的卷云独立项目页。
- 卷云 ACUnit、BaseUnit、DHT11 / AM2302、执行器 / 风扇和 SOP 材料已合并到更大的热管理硬件与固件开发档案页。
- 已确认的卷云热管理重构把 BaseUnit 与三板 ACUnit 写成同一套相变笔记本散热系统，新增自动控制与 ControlPanel / 维护阶段笔记，并公开 5 张经过审核的 ACUnit V2.1 bring-up 照片。完整固件与可还原产品的连续源码继续保持私有；后期性能、耐久与用户测试结果仍明确归因于公司，Alvin 无法独立验证。
- 站点已整理卷云、南京图灵、天津轨道交通 STM32 学习材料，并发布确认后的 Claude Chime 双语受委托硬件案例、冷启动排障笔记，以及经过公开性审查的设计与 bring-up 证据。
- 站点还包括已确认双语第一人称文案的 MEC104 Arduino Digital Clock 课程项目：项目页、1 篇学习笔记、11 条媒体记录、精选课件与报告证据、Arduino sketch、清理过元数据的演示视频和 SN54LS47 数据手册。文案保留个人贡献边界，将两个计数上限写成分别烧录的版本，并且不夸大现存视频、早期 `main.c` 或尚未确认的最终按键实现所能证明的内容。
- 站点还新增了 MEC104 Arduino Smart Car 循迹小车课程项目，包括项目页、1 篇学习笔记、去掉学校 logo 区域的精选公开课件截图、公开套件 manual PDF、项目报告 PDF、清理过元数据的小车照片和 Arduino 测试代码。
- 无感 FOC 项目是一条独立的个人电机控制学习路线。项目页、观测器接管笔记、12 条媒体记录和 22 个精选公开文件覆盖自制 STM32F446/DRV8301 驱动板、现场 SMT、12 V 压缩机运行和基于代码的 SVPWM 理解，同时明确没有把无感闭环接管写成已完成结果。
- DIY 压风式散热器的项目页、学习笔记和 6 条媒体文案现已采用逐项目访谈后确认的第一人称工程故事；回忆中的温度与帧率变化仍明确写作个人观察，不作为受控性能测试。
- 天津津铁通信 STM32 项目页、5 篇学习笔记和 3 条媒体文案现已采用确认后的双语第一人称成长线：从 Keil/ST-Link bring-up 进入 GPIO、EXTI、Timer 的外设级理解，再区分 ADC/PWM/UART 并完成一个裸机综合 demo。16 点映射仍明确写作前馈，硬件 I²C 锁死只是现今回看的可能解释，PID 与 ATP/ATO/ATS 仍是阅读层概念而非真实轨道控制实现。
- 南京图灵 Qt/Seamly2D 项目页、三周开发笔记和 5 条媒体文案现已采用确认后的双语第一人称实习故事：从学校入门课水平的 C++ 和零 Qt 经验开始，拉起大型上游代码库，加入本地 `QSettings` 账户与角色入口，实战 Git 流程，再分别推进 Windows 与 macOS 打包。文案不把它写成在线鉴权系统，明确区分公司在开发机上的正式验收与后来家中新 Windows 台式机的干净环境测试；macOS 只到可启动的无签名 DMG，签名与公证未完成，交接后的采用情况未知。
- 按项目分类的媒体档案包含 8 个项目的 84 条记录，其中有 80 张图像和 4 段视频；内容包括 12 条独立 FOC 学习路线记录、处理后的项目封面、板卡渲染图、DIY STM32 板图、EEV 驱动小板图、5 张已批准的 ACUnit V2.1 bring-up 照片、南京图灵 Notion 导出的编译逻辑图、Digital Clock 截图 / 演示 / 作业报告媒体和 Smart Car 照片 / 课件截图。
- 卷云 SOP、南京图灵文字日志和 CMake / 编译底层逻辑 Notion 原文都以网页笔记形式展示，不再只放在冰冷的代码框或 PDF 抽取结果里。
- 公开项目和笔记正文已经做过英文覆盖检查，语言切换时不应丢失关键内容。
- 项目公开资料通过双栏文件浏览器展示，并在服务端做路径归一化、严格 UTF-8 读取、目录/文件/预览体积上限，以及由 `npm run validate-content` 检查的 `juanyun-tech` allowlist。
- 卷云 Current_Product ACUnit/BaseUnit 资料仍然只保留脱敏叙述和截图；非 Current_Product 的 legacy DIY 散热、螺线管阀门、BLDC 静音风扇、DHT 计划书和自写硬件 SOP 可以使用筛选后的公开证据。FOC 按独立个人项目边界维护。
- 不要发布私密财务、开票、证明、凭据、安装包、vendor、依赖或 build 输出文件。

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
