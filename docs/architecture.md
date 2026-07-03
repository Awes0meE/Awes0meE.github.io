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
- Node.js 22 LTS or newer with npm 10 or newer
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
5. Next.js prerenders static pages during `npm run build`. Project and note detail routes use `generateStaticParams()` with `dynamicParams = false`, so unknown slugs resolve as generated 404s instead of depending on runtime route fallback behavior.

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

Current content state in this workspace, extending release `v0.7.0`, as of `2026-07-04`:

- 7 project files total;
- 20 public note files total;
- 3 Juanyun project pages and 9 Juanyun notes;
- 1 Claude Chime hardware power-board archive;
- 1 Nanjing Turing Qt/CMake/packaging project and 5 related notes;
- 1 Tianjin rail-transit STM32 foundation project and 5 related notes;
- 1 Arduino Digital Clock course project and 1 related note from `C:\Users\123\Desktop\Digital Clock`;
- 58 media gallery items covering project/note images, Notion-exported Nanjing Turing build diagrams, processed project covers, FOC schematic sheets, DIY STM32 board images, EEV driver-board images, the DIY demo video, and Digital Clock screenshots/demo media;
- the old portfolio rebuild project, PID starter-kit project, Juanyun ACUnit/BaseUnit/DHT standalone pages, and actuator/fan standalone page have been removed or merged.
- the Nanjing Turing CMake/build-logic note renders the user's Notion-exported Markdown originals directly instead of relying on PDF text extraction;
- public project/note body content has an English coverage pass so the language toggle does not hide key article sections.
- public project-file archives render through a two-pane file browser with server-side path normalization, strict UTF-8 reads, directory/file/preview-size caps, relative Markdown link resolution, and a `juanyun-tech` allowlist gate checked by content validation.

## Rendering Notes

The site does not execute arbitrary MDX components. Body content is rendered through `components/content-renderer.tsx`, which supports simple headings, heading anchors, paragraphs, lists, links, blockquotes, fenced code, inline code, separators, ordered lists, basic Markdown tables, standalone Markdown image blocks, and consecutive Markdown image blocks as clickable responsive galleries. Evidence figures use direct public image URLs after the assets have been compressed, which keeps long archive pages from showing stale optimizer placeholders. Standalone HTML comments are ignored so internal content markers do not appear on public pages. Normal fenced code blocks are shared technical evidence; scoped fences such as `en-text` and `zh-powershell` can be used when a whole listing belongs to one language view. This was chosen to keep file-based content simple and avoid unnecessary remote-MDX risk.

Project detail pages also derive related notes from note frontmatter and related media from `content/media.json` by matching `projectSlug`. The detail page order is project body, development notes, public project files, then related media.

Project pages can also render public project-file archives through `components/project-assets.tsx` and the interactive `components/project-asset-browser.tsx`. A project's `assetPaths` can reference individual public files or a directory under `public/uploads/`; the archive renders as a two-pane file browser with a left project-file index and a right preview panel. Markdown and text documents are rendered as readable article content, source/code files are rendered in code frames, images and videos are previewed, PDF files are embedded on the first page where the browser supports it, and binary documents / fabrication / CAD / archive files keep a direct open action. Image previews in this archive also use direct public URLs, so the asset-prep step should resize/crop large source images before committing them. Uploaded Markdown previews resolve relative links and images from the source file path. HTML and SVG files are kept as download-only artifacts rather than inline previews. Percent-encoded upload paths are decoded before filesystem lookup. The server resolver uses strict UTF-8 decoding for previewed text, directory-depth and file-count caps for broad folders, and an aggregate preview-size cap so a large evidence folder cannot over-expand the rendered page. The component blocks unreviewed `public/uploads/projects/juanyun-tech/` files unless they are in the explicit ACUnit screenshot / DIY demo allowlist.

## Language Layer

The language toggle is intentionally lightweight:

- `components/language-toggle.tsx` is the only interactive control.
- The selected value is persisted in `localStorage` and reflected on `html[data-lang]`.
- `components/bilingual-text.tsx` renders paired English/Simplified Chinese text.
- `app/layout.tsx` runs a small bootstrap script at the start of `<body>` so saved language state is applied before the main UI renders.
- `app/globals.css` hides `.lang-en` or `.lang-zh` based on `html[data-lang]`.
- The app remains statically generated; language switching does not require dynamic routes, middleware, cookies, or server-side rendering.

Project and note cards use paired frontmatter fields. Media cards use optional `titleZh` and `captionZh`. `ContentRenderer` can split simple bilingual headings and hide language-detected body blocks, headings, and tables only when both English and Chinese body text exist. Chinese-only or English-only notes stay readable instead of showing placeholder fallback notices. For authored MDX, use `English title / 中文标题` for simple bilingual headings or captions. If the English side contains technical slashes, the renderer splits at the last valid slash separator whose right side contains Chinese, so titles such as `DHT11 / AM2302 Breakout / 温湿度小板` are handled correctly. Real MDX body translation remains a content-authoring task, not an automatic runtime translation feature.

## Deployment

- Production domain: `https://www.66ccff-labs.com/`
- Apex domain: `https://66ccff-labs.com/` redirects to `www`.
- Vercel handles the Next.js deployment.
- Cloudflare manages DNS.
- Local and deployment toolchain details live in `docs/environment-toolchain.md`; `package.json` declares Node/npm engines and `.nvmrc` pins the portable Node baseline to `22`.
- The root `.nojekyll` file is intentional. This repository name also triggers GitHub Pages, but the live site is not a Jekyll site; `.nojekyll` prevents GitHub Pages from treating source content and `public/uploads/` Markdown/code archives as Liquid/Jekyll templates.
- Legacy project-slug redirects live in `next.config.mjs`, so they are a Vercel / Next.js hosting feature. If the site is ever exported or served as plain static files, those redirects need host-level equivalents.

## Non-Goals For The Current Version

- No database.
- No CMS.
- No login.
- No admin upload panel.
- No server-side API required for portfolio content.

## Public Asset Boundary

Portfolio downloads are static files in `public/uploads/`. Only reviewed technical evidence is intended to be public. Do not publish invoices, reimbursements, billing records, internship proof documents, executable installers, vendor package trees, or generated build outputs.

Static files in `public/uploads/` are public even if no page links to them. For the Juanyun material, `Current_Product_ACUnit_Project` and `Current_Product_BaseUnit_Project` remain sensitive: do not publish Gerber archives, schematic PDFs, BOM/PnP files, EDA/CAD source files, complete firmware source dumps, internal requirement/manufacturing packages, or product build outputs from those folders unless they have been explicitly reviewed and desensitized.

Other Juanyun legacy folders are treated as public after pruning noisy project output. Current `main` may serve selected legacy PDFs, images, source snippets, Gerber/BOM/PnP exports, EDA files, STEP/3MF models, and schematics under `public/uploads/projects/juanyun-public/`, while excluding installers, vendor/dependency folders, generated build outputs, duplicate raw dumps, and private financial/proof documents. `scripts/validate-content.mjs` also enforces the explicit `public/uploads/projects/juanyun-tech/` allowlist so WPS-synced raw files cannot silently become public assets.
