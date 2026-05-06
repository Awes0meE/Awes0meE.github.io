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
- optional links for repo/demo/download.

Note:

- slug from filename;
- metadata from frontmatter;
- markdown-like body content;
- `visibility` controls public routing;
- optional `projectSlug` for project-detail related-note sections.

The public note helpers intentionally filter to `visibility: public`. Missing `visibility` is normalized to private in `lib/content.ts`, so a newly added draft note is hidden unless it is explicitly published.

Media:

- JSON object with thumbnail, source path, caption, optional Chinese title/caption, date, and optional related project.

Current content state on `main` as of the `v0.3.0` release:

- 10 project files total, including 7 Juanyun project pages;
- 14 note files total, including 9 Juanyun notes;
- Juanyun notes are public, while public Juanyun assets are limited to approved screenshots/renders and one prototype demo video.

## Rendering Notes

The site does not execute arbitrary MDX components. Body content is rendered through `components/content-renderer.tsx`, which supports simple headings, paragraphs, lists, links, and standalone Markdown image blocks. This was chosen to keep file-based content simple and avoid unnecessary remote-MDX risk.

Project detail pages also derive related notes from note frontmatter and related media from `content/media.json` by matching `projectSlug`.

## Language Layer

The language toggle is intentionally lightweight:

- `components/language-toggle.tsx` is the only interactive control.
- The selected value is persisted in `localStorage` and reflected on `html[data-lang]`.
- `components/bilingual-text.tsx` renders paired English/Simplified Chinese text.
- `app/layout.tsx` runs a small bootstrap script at the start of `<body>` so saved language state is applied before the main UI renders.
- `app/globals.css` hides `.lang-en` or `.lang-zh` based on `html[data-lang]`.
- The app remains statically generated; language switching does not require dynamic routes, middleware, cookies, or server-side rendering.

Project and note cards use paired frontmatter fields. Media cards use optional `titleZh` and `captionZh`. `ContentRenderer` can split simple bilingual headings, hide language-detected body blocks, and show a fallback notice when one body language is still missing. Real MDX body translation remains a content-authoring task, not an automatic runtime translation feature.

## Deployment

- Production domain: `https://www.66ccff-labs.com/`
- Apex domain: `https://66ccff-labs.com/` redirects to `www`.
- Vercel handles the Next.js deployment.
- Cloudflare manages DNS.

## Non-Goals For The Current Version

- No database.
- No CMS.
- No login.
- No admin upload panel.
- No server-side API required for portfolio content.

## Public Asset Boundary

Portfolio downloads are static files in `public/uploads/`. On the Juanyun content branch, only technical evidence is intended to be public. Do not publish invoices, reimbursements, billing records, internship proof documents, executable installers, vendor package trees, or generated build outputs.

Static files in `public/uploads/` are public even if no page links to them. For company work, do not publish Gerber archives, schematic PDFs, BOM/PnP files, EDA/CAD source files, complete firmware source dumps, or internal requirement/manufacturing packages unless they have been explicitly reviewed and desensitized.
