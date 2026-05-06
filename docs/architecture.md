# Architecture

## Overview

This is a Next.js App Router portfolio site for `Awes0meE / Li Zhiyi`, deployed on Vercel with DNS managed through Cloudflare.

The implementation is deliberately file-based. Projects, notes, and media are versioned with Git so the portfolio can grow gradually without needing a database or admin backend.

## Runtime Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- local file content via `gray-matter`
- Vercel hosting
- Cloudflare DNS

## Route Map

| Route | Purpose | Source |
| --- | --- | --- |
| `/` | Homepage with hero, featured projects, notes, media, about | `app/page.tsx` |
| `/work` | Project list | `app/work/page.tsx` |
| `/work/[slug]` | Project detail | `app/work/[slug]/page.tsx` |
| `/notes` | Notes list | `app/notes/page.tsx` |
| `/notes/[slug]` | Note detail | `app/notes/[slug]/page.tsx` |
| `/media` | Media gallery | `app/media/page.tsx` |
| `/about` | Profile and contact | `app/about/page.tsx` |

## Data Flow

1. Content files live under `content/`.
2. `lib/content.ts` reads project and note frontmatter with `gray-matter`.
3. Route components call the content helpers.
4. Static assets are served from `public/uploads/`.
5. Next.js prerenders static pages during `npm run build`.

## Content Types

Project:

- slug from filename;
- metadata from frontmatter;
- markdown-like body content;
- optional links for repo/demo/download;
- optional `assetPaths` entries pointing to files or folders under `public/uploads/` for project-file rendering.

Note:

- slug from filename;
- metadata from frontmatter;
- markdown-like body content;
- `visibility` controls public routing;
- optional `projectSlug` for project-detail related-note sections.

The public note helpers intentionally filter to `visibility: public`. Missing `visibility` is normalized to private in `lib/content.ts`, so a newly added draft note is hidden unless it is explicitly published.

Media:

- JSON object with thumbnail, source path, caption, optional Chinese title/caption, date, and optional related project.

Current content state on `main` release `v0.6.0`, as of `2026-05-07`:

- 6 project files total;
- 19 public note files total;
- 3 Juanyun project pages and 9 Juanyun notes;
- 1 Claude Chime hardware power-board archive;
- 1 Nanjing Turing Qt/CMake/packaging project and 5 related notes;
- 1 Tianjin rail-transit STM32 foundation project and 5 related notes;
- 29 media gallery items covering project/note images, the DIY demo video, and site visual assets;
- the old portfolio rebuild project, PID starter-kit project, Juanyun ACUnit/BaseUnit/DHT standalone pages, and actuator/fan standalone page have been removed or merged.

## Rendering Notes

The site does not execute arbitrary MDX components. Body content is rendered through `components/content-renderer.tsx`, which supports simple headings, paragraphs, lists, links, blockquotes, fenced code, inline code, separators, ordered lists, and standalone Markdown image blocks. This was chosen to keep file-based content simple and avoid unnecessary remote-MDX risk.

Project detail pages also derive related notes from note frontmatter and related media from `content/media.json` by matching `projectSlug`.

Project pages can also render public project-file archives through `components/project-assets.tsx`. A project's `assetPaths` can reference individual public files or a directory under `public/uploads/`; Markdown and text documents are rendered as readable article content, source/code files are rendered in code frames, images and videos are previewed, and binary documents / fabrication / CAD / archive files are linked directly. The component blocks unreviewed `public/uploads/projects/juanyun-tech/` files unless they are in the explicit ACUnit screenshot / DIY demo allowlist.

## Language Layer

The language toggle is intentionally lightweight:

- `components/language-toggle.tsx` is the only interactive control.
- The selected value is persisted in `localStorage` and reflected on `html[data-lang]`.
- `components/bilingual-text.tsx` renders paired English/Simplified Chinese text.
- `app/layout.tsx` runs a small bootstrap script at the start of `<body>` so saved language state is applied before the main UI renders.
- `app/globals.css` hides `.lang-en` or `.lang-zh` based on `html[data-lang]`.
- The app remains statically generated; language switching does not require dynamic routes, middleware, cookies, or server-side rendering.

Project and note cards use paired frontmatter fields. Media cards use optional `titleZh` and `captionZh`. `ContentRenderer` can split simple bilingual headings and hide language-detected body blocks only when both English and Chinese body text exist. Chinese-only or English-only notes stay readable instead of showing placeholder fallback notices. Real MDX body translation remains a content-authoring task, not an automatic runtime translation feature.

## Deployment

- Production domain: `https://www.66ccff-labs.com/`
- Apex domain: `https://66ccff-labs.com/` redirects to `www`.
- Vercel handles the Next.js deployment.
- Cloudflare manages DNS.
- The root `.nojekyll` file is intentional. This repository name also triggers GitHub Pages, but the live site is not a Jekyll site; `.nojekyll` prevents GitHub Pages from treating source content and `public/uploads/` Markdown/code archives as Liquid/Jekyll templates.

## Non-Goals For The Current Version

- No database.
- No CMS.
- No login.
- No admin upload panel.
- No server-side API required for portfolio content.

## Public Asset Boundary

Portfolio downloads are static files in `public/uploads/`. Only reviewed technical evidence is intended to be public. Do not publish invoices, reimbursements, billing records, internship proof documents, executable installers, vendor package trees, or generated build outputs.

Static files in `public/uploads/` are public even if no page links to them. For the Juanyun material, `Current_Product_ACUnit_Project` and `Current_Product_BaseUnit_Project` remain sensitive: do not publish Gerber archives, schematic PDFs, BOM/PnP files, EDA/CAD source files, complete firmware source dumps, internal requirement/manufacturing packages, or product build outputs from those folders unless they have been explicitly reviewed and desensitized.

Other Juanyun legacy folders are treated as public after pruning noisy project output. Current `main` may serve selected legacy PDFs, images, source snippets, Gerber/BOM/PnP exports, EDA files, STEP/3MF models, and schematics under `public/uploads/projects/juanyun-public/`, while excluding installers, vendor/dependency folders, generated build outputs, duplicate raw dumps, and private financial/proof documents.
