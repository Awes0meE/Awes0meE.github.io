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
- `docs/memory-system.md`: how memory should be read and updated.
- `docs/content-workflow.md`: how to add projects, notes, images, and videos.
- `docs/architecture.md`: routes, data flow, deployment, and non-goals.

## Local Development

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

## Common Commands

```bash
npm run dev       # Start local development server
npm run lint      # Run Next.js ESLint checks
npm run build     # Build the production site
npm run start     # Start a production server after build
npm run typecheck # Run a production build without lint
```

## Content Editing

Projects are stored in `content/projects/*.mdx`. Each project uses frontmatter:

```yaml
---
title: "PID Starter Kit"
titleZh: "个人 PID 控制器开发套件"
summary: "English summary"
summaryZh: "中文摘要"
date: "2024.10 to Now"
status: "In Progress"
tags: ["STM32", "Control", "PCB"]
cover: "/uploads/visuals/circuit-board.svg"
featured: true
links:
  repo: "https://github.com/Awes0meE/PID-Starter-Kit"
---
```

Notes are stored in `content/notes/*.mdx`. Media items are stored in `content/media.json`, with assets under `public/uploads/`.

Use `projectSlug` on notes and media items when they should appear as related material on a project page.

Current draft content branch:

- `content/juanyun-tech`
- Contains Juanyun Technology project pages, development notes, media entries, and technical assets under `public/uploads/projects/juanyun-tech/`.
- Review all public attachments before merging this branch to `main`.
- Do not publish private financial, billing, credential, installer, vendor, or build-output files.

## Deployment

The intended deployment target is Vercel.

Recommended Vercel settings:

- Framework preset: Next.js
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: leave default
- Node.js: Vercel default LTS is fine

## Quality Checks

Before publishing:

```bash
npm run lint
npm run build
npm audit --omit=dev
```

Expected result for this version:

- Lint passes
- Production build passes
- `npm audit --omit=dev` reports 0 vulnerabilities

## Release Tags

Use semantic version tags:

```bash
git tag -a v0.1.0 -m "v0.1.0 portfolio rebuild"
git push origin main
git push origin v0.1.0
```

---

## 中文说明

## 项目概览

这个仓库是 Li Zhiyi / Awes0meE 的英中双语工程作品集网站源码。它把原来由 Hexo 教程生成的静态输出，重构成了一个可长期维护的 Next.js 应用，用于展示项目、学习笔记、媒体材料，并为未来的全栈功能预留空间。

旧版 Hexo 输出已完整保存在 `legacy/hexo-export/`，仅作为参考资料，不再作为新网站服务内容。

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

## 常用命令

```bash
npm run dev       # 启动本地开发服务器
npm run lint      # 运行 Next.js ESLint 检查
npm run build     # 构建生产版本
npm run start     # 构建后启动生产服务器
npm run typecheck # 跳过 lint 的生产构建检查
```

## 内容维护

项目内容放在 `content/projects/*.mdx`。每个项目使用 frontmatter 描述元数据：

```yaml
---
title: "PID Starter Kit"
titleZh: "个人 PID 控制器开发套件"
summary: "English summary"
summaryZh: "中文摘要"
date: "2024.10 to Now"
status: "In Progress"
tags: ["STM32", "Control", "PCB"]
cover: "/uploads/visuals/circuit-board.svg"
featured: true
links:
  repo: "https://github.com/Awes0meE/PID-Starter-Kit"
---
```

学习笔记放在 `content/notes/*.mdx`。媒体内容维护在 `content/media.json`，图片和视频资源放在 `public/uploads/`。

如果笔记或媒体需要自动显示在某个项目页面上，使用 `projectSlug` 关联对应项目 slug。

当前草稿内容分支：

- `content/juanyun-tech`
- 包含卷云科技项目页、开发笔记、媒体条目和 `public/uploads/projects/juanyun-tech/` 下的技术资产。
- 合并到 `main` 前需要复查所有公开附件。
- 不要发布私密财务、开票、证明、安装包、vendor 包或 build 输出文件。

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
npm run build
npm audit --omit=dev
```

本版本预期结果：

- lint 通过
- 生产构建通过
- `npm audit --omit=dev` 显示 0 vulnerabilities

## 版本标签

使用语义化版本标签：

```bash
git tag -a v0.1.0 -m "v0.1.0 portfolio rebuild"
git push origin main
git push origin v0.1.0
```
