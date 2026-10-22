# Architecture

## Overview

This is Alvin Li's Next.js App Router portfolio, with `iRidium / 铱` as the engineering archive brand. It is deployed on Vercel with DNS managed through Cloudflare.

The implementation is deliberately file-based. Projects, notes, and media are versioned with Git so the portfolio can grow gradually without needing a database or admin backend.

## Runtime Stack

- Next.js 16.3 App Router
- React 19.2
- TypeScript
- Tailwind CSS
- local file content via `gray-matter`, parsing YAML frontmatter with js-yaml 4 (`package.json` overrides gray-matter's js-yaml, and `lib/content.ts` / `scripts/validate-content.mjs` pass `yaml.load` as the engine)
- Node.js 22 LTS or newer with npm 10 or newer
- Vercel hosting
- Cloudflare DNS

## Route Map

| Route | Purpose | Source |
| --- | --- | --- |
| `/` | Homepage with hero, pinned project wheel (all projects, `components/project-cover-flow.tsx`), education, the bench-media film and notes tape (`components/home-feed.tsx`), and the contact label (`components/home-contact.tsx`) | `app/page.tsx` |
| `/work` | Evidence-first Project Aperture Sequence index | `app/work/page.tsx` |
| `/work/[slug]` | Project detail | `app/work/[slug]/page.tsx` |
| `/notes` | Project-routed engineering note index with metadata search and project/year filters | `app/notes/page.tsx` |
| `/notes/[slug]` | Note detail | `app/notes/[slug]/page.tsx` |
| `/media` | Project-grouped media evidence archive with an interactive lead aperture | `app/media/page.tsx` |
| `/about` | Online CV: introduction, dated route, current work, off-the-clock and contact | `app/about/page.tsx` |

## Data Flow

1. Content files live under `content/`.
2. `lib/content.ts` reads project and note frontmatter with `gray-matter`.
3. Route components call the content helpers.
4. Project/media assets are served from `public/uploads/`; approved identity assets are isolated under `public/brand/`.
5. Next.js prerenders static pages during `npm run build`. Project and note detail routes use `generateStaticParams()` with `dynamicParams = false`, so unknown slugs resolve as generated 404s instead of depending on runtime route fallback behavior.

## Content Types

Project:

- slug from filename;
- metadata from frontmatter, including required `shortTitle` / `shortTitleZh` and `coverKind`, plus optional `coverDark` and project-owned `mediaLead`;
- markdown-like body content;
- optional links for repo/demo/download;
- optional `assetPaths` entries pointing to files or folders under `public/uploads/` for project-file rendering.

Note:

- slug from filename;
- metadata from frontmatter;
- markdown-like body content;
- `visibility` controls public routing;
- optional `projectSlug` at schema level; a valid matching project is required for the current `/notes` project-channel index and project-detail related-note sections.

Note dates use `YYYY.MM.DD`, enforced by `validate-content`; rendering converts them to ISO for `<time dateTime>`.

The public note helpers intentionally filter to `visibility: public`. Missing `visibility` is normalized to private in `lib/content.ts`, so a newly added draft note is hidden unless it is explicitly published. An unlinked public note can still generate its detail route, but the Routed Signal Map does not place it into an invented unassigned channel.

Media:

- JSON object with thumbnail, source path, caption, optional Chinese title/caption, date, and optional related project.

Current repository interface and content state, verified against `fe11492` on `2026-10-19`; `v0.9.0` remains the latest named tag:

- public identity and metadata use `Alvin Li`; the engineering archive brand is `iRidium / 铱`, with exact capitalization fixed as lowercase `i`, uppercase `R`, then lowercase `idium`;
- the shared header uses the approved transparent five-rectangle mark from `public/brand/iridium-mark.png`, with equal `156 × 156` pixel bounds for the upper-left and lower-right blocks; the user-selected B-style `iRidium` script is served from `public/brand/iridium-wordmark-script.png` at a compact 26px display height so its appearance remains fixed in both language modes and across devices. `components/site-navigation.tsx` reads `usePathname()` to expose exact routes as `aria-current="page"` and nested routes as `aria-current="location"`; desktop headers share the same `01`–`04` indices, sizing, typography, and interaction motion in both themes, reading their colors from the theme tokens, and the mobile row stays compact and unnumbered;
- the homepage education block uses one full-width NTU master's row followed by a two-column undergraduate dual-degree row for Xi'an Jiaotong-Liverpool University and the University of Liverpool; the Liverpool `BEng (Hons) Telecommunications Engineering` carries the `First Class Honours` classification;
- `components/technical-visual.tsx` and `components/technical-visual.module.css` render the homepage's atom-like technical visual. the nucleus cross-fades through nine transparent prototype cutouts from `public/uploads/hero/`, one every 5 seconds over a 45-second cycle through CSS animation delays; `boardSize()` normalizes visible board area; three equal-sized orbits separated by 60 degrees each carry five evenly spaced technology marks for embedded systems, firmware development, and engineering tools;
- the atom's prototype images and third-party technology marks are representative presentation material, not project evidence or claims of fabrication, validation, affiliation, endorsement, or proficiency. Technology-mark provenance lives in `public/skills/icons/README.md`, and institution-mark provenance lives in `public/education/README.md`;
- the client component uses `IntersectionObserver`, document visibility, and the system `prefers-reduced-motion` preference to pause offscreen or hidden animation and to provide a static reduced-motion state;
- every route uses one token set (`app/globals.css`, RGB-triplet `--c-*` variables) in two themes selected by `html[data-theme]`: dark Ember Black and light Bench Paper, following the saved preference or otherwise the operating-system setting. `tailwind.config.ts` maps the Tailwind colour names to the same tokens. `/work/[slug]` and `/notes/[slug]` render the Bench Log layout: `components/bench-log-rail.tsx` (sticky section rail on desktop, contents strip below 1024px) reads the section outline from `getContentOutline` in `components/content-renderer.tsx`, so rail ids always match rendered heading ids. Project frontmatter carries one normalized cover card (`cover`, optional `coverDark`, `coverKind` company|render) that `getProjectCover` and `components/project-cover.tsx` render on `/work`, the rail, homepage rows and the project lead figure;
- `/work` remains statically generated and evidence-first: `app/work/page.tsx` loads all ten repository projects on the server, renders each chapter as one complete semantic link, and places exactly nine signal intervals between adjacent chapters. The small `WorkProjectRail` client island observes chapter and interval visibility to update the locating rail and pause offscreen or document-hidden tick motion. Route changes use React `<ViewTransition>` through `components/route-stage.tsx`: links into details carry the `nav-forward` transition type and back links `nav-back`, the viewport-sized root snapshot animates out and in vertically while `<main>` has no separate named snapshot (avoiding page-height Safari captures), the `/work` chapter image and the project lead figure share `project-figure-<slug>` and morph, and the header stays anchored. Untyped navigations (history, refresh) and reduced motion swap without movement;
- `/notes` remains statically generated and metadata-light: `app/notes/page.tsx` sorts public notes deterministically, keeps only records whose `projectSlug` resolves to one of the ten repository projects, and projects the 34 currently public note metadata records into `NotesSignalIndex`. The client island searches bilingual titles, summaries, tags, and project names and filters by project/year; its detail rows carry the same forward transition while note bodies stay on the server-side detail routes and are not shipped in the index payload;
- `/media` remains statically generated and project-first: `app/media/page.tsx` loads and groups all 119 repository records across ten projects on the server, renders the archive totals and complete project chapters, and passes only the ten lead records into the small `MediaFocusAperture` client island for source selection. Sources follow the `/work` order and take their names and lead records from project frontmatter (`shortTitle`, `shortTitleZh`, `mediaLead`). A validated `project` query initializes the matching lead without moving archive truth to the client. The current content set is 114 images and five videos with no unassigned media;
- `/about` remains statically generated: `app/about/page.tsx` owns the bilingual online-CV content (introduction, dated route linking to `/work/[slug]`, current work, off-the-clock, contact). `app/about/about.module.css` owns the route layout and motion, and the small `AboutMotion` client island in `components/about-motion.tsx` only toggles data attributes for scroll reveals, the timeline rail fill and lit stops, and visibility-gated loops (portrait orbit, ticker, scope). Reduced-motion mode keeps everything visible and static;
- 10 project files total;
- 34 public note source files total across ten project channels; all twelve formerly suspended sources are retired;
- 2 Juanyun project pages and 9 Juanyun-prefixed notes;
- 1 independent sensorless FOC learning-route project and 2 related studies;
- 1 Claude Chime commissioned hardware case study and 2 related studies;
- 1 Nanjing Turing Qt/CMake/packaging project and 6 related notes;
- 1 Tianjin rail-transit STM32 foundation project and 2 related notes;
- 1 Arduino Digital Clock course project and 2 related notes from `C:\Users\123\Desktop\Digital Clock`, with selected course screenshots re-rendered without the top-right XJTLU logo and the original homework report PDF published as project evidence;
- 1 Arduino Smart Car line-tracking course project and 2 related notes from `C:\Users\123\Desktop\Smart Car Project`, with selected course screenshots re-rendered without the school logo area, the public kit manual PDF, the project report PDF, cleaned car photos, and Arduino testing code published as project evidence;
- 1 GaN quadrotor ESC final-year project with five notes and 1 AD831 active mixer coursework project with four notes;
- 119 project-bound media records covering project/note images and videos, including 12 independent FOC records for renders, schematic sheets, onsite SMT, the assembled compressor bench, open-loop runtime, and an original code-grounded FOC/SVPWM visual;
- the first eight projects have two approved bilingual studies each, and the GaN quadrotor ESC final-year project has five, and the AD831 active mixer coursework has four. Nine existing technical/source-document pages remain. The twelve formerly suspended old notes and completed previews are retired, with history retained in Git;
- note-to-project joins and visibility use the existing loaders. All ten projects appear as note channels. Paragraphs and inline code use the safe-wrap class to avoid mobile overflow, and the legacy FOC note redirect points directly to `/notes/foc-angle-handoff`;
- all 119 media records and existing project assets retain their previous roles;
- see `releases/remaining-engineering-notes-2026-09-07/README.md` for routes and checks, and `active-work/portfolio-copy-rewrite.md` for the current handoff.

## Rendering Notes

The site does not execute arbitrary MDX components. Body content is rendered through `components/content-renderer.tsx`, which supports simple headings, heading anchors, paragraphs, lists, links, blockquotes, fenced code, inline code, separators, ordered lists, basic Markdown tables, standalone Markdown image blocks, and consecutive Markdown image blocks as clickable responsive galleries. Article figures use Next Image optimization at their display size and keep the original public URL for the lightbox. Project-file image previews remain unoptimized and use direct public URLs. Standalone HTML comments are ignored so internal content markers do not appear on public pages. Normal fenced code blocks are shared technical evidence; scoped fences such as `en-text` and `zh-powershell` can be used when a whole listing belongs to one language view. This was chosen to keep file-based content simple and avoid unnecessary remote-MDX risk.

Project detail pages also derive related notes from note frontmatter and related media from `content/media.json` by matching `projectSlug`. The detail page order is project body, development notes, public project files, then related media.

Project pages can also render public project-file archives through `components/project-assets.tsx` and the interactive `components/project-asset-browser.tsx`. A project's `assetPaths` can reference individual public files or a directory under `public/uploads/`; the archive renders as a two-pane file browser with a left project-file index and a right preview panel. Markdown and text documents are rendered as readable article content, source/code files are rendered in code frames, images and videos are previewed, PDF files are embedded on the first page where the browser supports it, and binary documents / fabrication / CAD / archive files keep a direct open action. Clicking an image preview, like every article figure and image media tile, opens the site-wide `components/image-lightbox.tsx` viewer on the same page instead of navigating to the file. Image previews in this archive also use direct public URLs, so the asset-prep step should resize/crop large source images before committing them. Uploaded Markdown previews resolve relative links and images from the source file path. HTML and SVG files are kept as download-only artifacts rather than inline previews. Percent-encoded upload paths are decoded before filesystem lookup. The server resolver uses strict UTF-8 decoding for previewed text, directory-depth and file-count caps for broad folders, and an aggregate preview-size cap so a large evidence folder cannot over-expand the rendered page. The component blocks unreviewed `public/uploads/projects/juanyun-tech/` files unless they are in the explicit ACUnit screenshot / DIY demo allowlist.

## Language Layer

The language layer is intentionally lightweight:

- `components/site-preferences.tsx` is the only control that owns language and theme state.
- `components/site-navigation.tsx` is a small client component whose only runtime input is the current pathname; it renders the shared desktop/mobile links and their semantic current-route state without changing content delivery.
- The selected value is persisted in `localStorage` and reflected on `html[data-lang]`.
- `components/bilingual-text.tsx` renders paired English/Simplified Chinese text.
- `app/layout.tsx` runs a small bootstrap script at the start of `<body>` so saved language state is applied before the main UI renders, and sets `html[data-theme]` plus the theme-color meta from the saved theme or `prefers-color-scheme` before first paint (`#080808` in dark, header cobalt `#1e3a8a` in light).
- `app/globals.css` hides `.lang-en` or `.lang-zh` based on `html[data-lang]`.
- The app remains statically generated; language switching does not require dynamic routes, middleware, cookies, or server-side rendering.

Chinese project titles on `/work` and homepage note-strip titles are segmented on the server by `lib/zh-words.ts` (`Intl.Segmenter` plus particle and single-character joining). `components/zh-words.tsx` inserts `<wbr>` boundaries, while `.zh-words` prevents breaks inside a word. Client strips receive the precomputed words so server and client segmentation cannot diverge.

Project and note cards use paired frontmatter fields. Media cards use optional `titleZh` and `captionZh`. `ContentRenderer` can split simple bilingual headings and hide language-detected body blocks, headings, and tables only when both English and Chinese body text exist. Chinese-only or English-only notes stay readable instead of showing placeholder fallback notices. For authored MDX, use `English title / 中文标题` for simple bilingual headings or captions. If the English side contains technical slashes, the renderer splits at the last valid slash separator whose right side contains Chinese, so titles such as `DHT11 / AM2302 Breakout / 温湿度小板` are handled correctly. Real MDX body translation remains a content-authoring task, not an automatic runtime translation feature.

## Deployment

- Production domain: `https://www.66ccff-labs.com/`
- Apex domain: `https://66ccff-labs.com/` redirects to `www`.
- Vercel handles the Next.js deployment.
- Cloudflare manages DNS.
- Local and deployment toolchain details live in `docs/environment-toolchain.md`; `package.json` declares Node/npm engines and `.nvmrc` pins the portable Node baseline to `22`.
- GitHub Pages is a redirect fallback only. Because this is the `Awes0meE.github.io` username repository, Pages may remain enabled, but its source must stay on `gh-pages:/`; do not set it to `main:/` or deploy the Next.js source tree through Pages.
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

The FOC learning route is independent of Juanyun. Its curated public evidence lives under `public/uploads/projects/sensorless-foc-learning-route/`; the full firmware, vendor libraries, generated output, caches, and raw logs stay outside the portfolio asset tree, while the public firmware repository remains an external project link.
