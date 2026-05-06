# Architecture

## Overview

This is a Next.js App Router portfolio site for `Awes0meE / Lizhiyi`, deployed on Vercel with DNS managed through Cloudflare.

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
- markdown-like body content.

Media:

- JSON object with thumbnail, source path, caption, date, and optional related project.

## Rendering Notes

The site does not execute arbitrary MDX components. Body content is rendered through `components/content-renderer.tsx`, which supports simple headings, paragraphs, lists, and links. This was chosen to keep file-based content simple and avoid unnecessary remote-MDX risk.

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

