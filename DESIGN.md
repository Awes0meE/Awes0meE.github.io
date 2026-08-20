---
name: Kinetic Signal Ledger
description: Ember Black opt-in visual system for Alvin Li's bilingual, evidence-calibrated iRidium engineering portfolio.
scope:
  branch: feat/frontend-refresh
  appliesTo: "routes rooted by .signal-theme: homepage, work, notes, media, and about"
  excludes: project and note detail routes retain the existing paper system
colors:
  canvas: "#080808"
  surface-deep: "#0D0D0C"
  surface-raised: "#171614"
  elevated-graphite: "#2F2F2F"
  text: "#FAFAFA"
  warm-white: "#F7F0E8"
  muted: "#AAA39A"
  dim: "#77716B"
  line: "rgba(250, 250, 250, 0.20)"
  line-soft: "rgba(250, 250, 250, 0.11)"
  ember: "#FF7400"
  ember-soft: "#FF9A4A"
  focus: "#FFB36B"
  orbit-embedded: "#B9914B"
  orbit-firmware: "#5FA78F"
  orbit-tools: "#9B90B5"
typography:
  display:
    fontFamily: '"Barlow Condensed", "Arial Narrow", sans-serif'
    fontWeight: 600
  display-cjk:
    fontFamily: '"PingFang SC", "Microsoft YaHei", ui-sans-serif, sans-serif'
    fontWeight: 700
  body:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  mono:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
geometry:
  interface: sharp
  atom: circular
  language-control: pill
motion:
  orbit-assembly: slow counterclockwise rotation
  electrons: evenly phased orbital travel with tapered comet tails
  nucleus: slower clockwise rotation
  separator: repeating iRidium marks scrolling upward
---

# Design System: Kinetic Signal Ledger

## Scope

This document is the design authority for the Kinetic Signal Ledger implementation on the separate `feat/frontend-refresh` topic branch. Ember Black is no longer homepage-only: the homepage, `/work`, `/notes`, `/media`, and `/about` currently opt into the shared system. Project and note detail routes retain the existing light paper system unless a future, separately approved redesign changes their scope. The branch remains distinct from the released production site until it is merged and deployed.

The opt-in boundary is the shared `.signal-theme` shell marker on a route's root content. `body:has(.signal-theme)` adapts the shared body, header, navigation, language control, focus treatment, selection, and footer without forking those components. A route that remains in the paper system must not receive the marker, and surface-specific composition still belongs to that route's approved brief rather than becoming a global template.

## Creative North Star

**Kinetic Signal Ledger** presents engineering as a field of connected evidence rather than a marketing gallery. The near-black canvas recalls a hardware bench at low light; fine rules, indices, and compact labels create an instrument grammar; warm white carries information; ember orange identifies the principal signal.

The homepage may be visually kinetic, but every motion must reinforce structure: the separator establishes flow, the nucleus gathers prototype work, the orbits group the technical stack, and project rows lead to inspectable evidence. The animation is an illustrative systems map, not telemetry or proof of project completion.

Key characteristics:

- Full-bleed, sharp-edged instrument fields instead of floating card shells.
- A clear evidence hierarchy: direction first, inspectable work next, credentials and supporting material after.
- Hardware and firmware practice remain the subject; decorative effects stay subordinate.
- Continuous motion is permitted only where it communicates orbit, flow, grouping, or signal direction.
- Bilingual clarity, contrast, reduced-motion behavior, and evidence limits take priority over spectacle.

## Color System

Canvas, text, elevated graphite, and ember are the global Ember Black anchors. Deeper surfaces, warm neutrals, and translucent rules create depth without turning the page into neon cyberpunk.

**The primary-signal rule.** Ember is the only saturated color used broadly across Ember Black interface state: primary actions, focus, directional marks, key rules, and selected controls. It must not become routine paragraph color or a blanket surface fill.

**The orbital exception.** The technical atom uses three tightly scoped semantic colors:

- muted gold for embedded systems;
- restrained green for firmware development;
- soft violet for engineering tools.

These colors identify orbit membership only. They may tint the corresponding orbit, dash flow, electron edge, comet tail, and category label. They must not spread into unrelated navigation, project rows, education, or ordinary copy.

**The mark exception.** Technology and institution marks may retain their recognizable brand colors. Every technology mark sits on the same black electron-badge surface. If a mark is too dark to remain legible, use an approved lightened derivative, white inlay, or restrained contrast treatment documented with that asset; do not add inconsistent white badge backgrounds.

**The contrast rule.** Essential reading copy uses text or warm white on the canvas. Muted and dim tokens are reserved for metadata and nonessential annotation.

## Typography

The local Barlow Condensed SemiBold face is the English display voice. Chinese display copy uses PingFang SC, then Microsoft YaHei and the system sans stack. Body copy uses the native UI sans stack; indices, dates, tags, and instrument labels use the native monospace stack.

- English hero and section headings use the display token; Chinese headings use `display-cjk` with independent line-height and width tuning.
- On Ember Black desktop surfaces, English navigation reuses the same display token as `Project evidence index`; Chinese navigation keeps the CJK display stack. The `01`–`04` prefixes remain compact monospace metadata rather than part of the label voice.
- The hero keeps one concise personal introduction in ember orange beneath the primary direction statement.
- Long paragraphs remain in the body face. Mono is for compact technical metadata, not novelty body copy.
- English and Chinese may wrap differently, but factual meaning and visual hierarchy must remain equivalent.

## Homepage Structure

The homepage is one continuous instrument field divided by restrained rules. Its information order is:

1. shared header;
2. hero direction, identity, actions, and technical atom;
3. project evidence index;
4. education and current direction;
5. notes and bench media;
6. engineering stack and contact;
7. shared footer.

The wide hero has three explicit visual zones:

1. **Left — text field.** The direction statement, one orange identity paragraph, and actions form the reading anchor. A narrow moving signal texture may reinforce the outer edge without competing with the copy.
2. **Middle — iRidium separator.** Repeated instances of the existing iRidium mark form a vertical, ember-colored band that scrolls upward. The band is translucent, has no extra centerline, and separates rather than fences off the two sides.
3. **Right — orbital technical visual.** A tilted atom combines the five prototype images with three technical-category orbits. It fills the available visual field without colliding with the separator or header.

At narrower widths, preserve the same reading order while allowing the hero zones to stack or simplify. The separator may become horizontal or recede when a vertical band would consume useful reading width. The atom must remain complete and legible rather than being cropped into a decorative fragment.

The hero background may use several low-contrast, irregular warm radiances that drift subtly across the full text-and-atom field. They should feel like light moving behind a dark material, not detached gradient blobs. Right-side corner brackets may frame the atom without adding a full card border.

## Orbital Technical Visual

### Nucleus

The nucleus is a compact cluster of five circular prototype presentation images from `public/uploads/hero/`. The circles overlap enough to read as one bound core while leaving each prototype distinguishable. Images remain in color and use consistent framing; the cluster must not expand into a five-card grid.

The nucleus represents a portfolio core, not five completed case-study claims. Its arrangement is presentational and may be adjusted for balance without implying sequence, scale, or technical relationship.

### Orbits and electrons

The atom has exactly three equal-size elliptical orbit paths centered on the same nucleus and rotated to `0°`, `60°`, and `120°`. Their geometry must match; only orientation and semantic color differ.

Each orbit contains exactly five electrons placed at equal path-phase intervals. All three orbits initialize from deterministic, interleaved phases so the first frame is balanced. Adding or removing a technology requires re-establishing equal spacing rather than clustering spare electrons together.

Each electron contains one recognizable technology mark on a uniform black circular badge. Marks use a consistent optical scale rather than identical raw image bounds. Transparent negative space must reveal the shared black badge. Short labels associated with an orbit remain upright relative to the viewport even while the orbit assembly rotates; labels must never turn upside down with their parent path.

The three categories describe the portfolio's technical stack:

- embedded systems;
- firmware development;
- engineering tools.

They are a taxonomy, not a proficiency score, endorsement, certification, or claim that every tool was used in every pictured prototype.

### Motion model

Motion establishes two complementary systems:

- the complete three-orbit assembly rotates slowly counterclockwise;
- electrons continue to travel around their own orbit paths while preserving equal spacing;
- long orbit dashes flow along each ellipse and remain visibly faster than the overall assembly rotation;
- every electron carries a tapered comet tail, widest and brightest near the badge and narrowing toward the trailing end;
- the five-image nucleus rotates slowly clockwise as a compact group;
- the central iRidium separator scrolls upward, while any outer-left signal texture may move in the opposite direction to create controlled counterflow.

Do not attach fabricated waveform meaning, sensor values, stage completion, or live-system status to these motions. Avoid arbitrary bouncing, hover-chasing, or independent random movement that breaks the orbital model.

Animation pauses whenever the technical visual is outside the viewport or the document is hidden. Under `prefers-reduced-motion: reduce`, the atom renders as a balanced static composition: orbit assembly, electrons, dash flow, nucleus, separator, tails, and background drift stop; comet tails may be removed. No information or navigation may depend on motion.

## Components

### Shared header and footer

`SiteHeader` and `SiteFooter` remain shared components. Ember Black styling is scoped through the route-level `.signal-theme` marker and the shared `body:has(.signal-theme)` shell rules; do not fork the components or apply the dark treatment to paper-system routes.

Desktop Ember Black navigation places a low-opacity `01`–`04` index before each label. Hover, keyboard focus, and the current route brighten the item and reveal one ember line spanning both index and label; press feedback is brief and restrained. Exact routes expose `aria-current="page"`, nested routes expose `aria-current="location"`, and the homepage itself does not invent a current item. The compact mobile row omits the indices.

Under `prefers-reduced-motion: reduce`, navigation state remains visible but lift, press, and line-growth transitions become immediate. The numbered display treatment belongs to the opted-in Ember Black shell; semantic current-route state remains available on the shared navigation across every route.

Preserve `public/brand/iridium-mark.png` and `public/brand/iridium-wordmark-script.png` with their intrinsic proportions. The wordmark always reads exactly `iRidium` in both languages. The middle separator repeats the mark glyph, not a replacement text logo. Filtering may adapt an existing transparent asset to the homepage theme, but must not alter its geometry.

### Hero actions

The primary action is a sharp ember-outline control that fills on hover or focus. The secondary action is a warm-white text link with an ember directional underline. Both retain visible keyboard focus, descriptive text, and comfortable touch targets.

### Project evidence rows

`ProjectEvidenceRow` is the reusable project record. Its title, localized status, tags, evidence availability, timeline, cover, and destination come from project metadata. The complete row remains one accessible link with a clear screen-reader summary. Never add achievements or evidence claims solely for visual density.

Project and media covers may be restrained at rest and reveal more color on hover or focus. Their animation remains brief and subordinate to the evidence itself.

### Education and current direction

Keep the full-width NTU master's entry above the two undergraduate awards on layouts where space permits. Institution marks use intrinsic proportions and contain fitting; they are never stretched, cropped, exchanged, or used as decorative wallpaper.

Dark-background derivatives may add white only inside intended shield or crest cutouts while preserving transparent space outside the mark and preserving the original geometry. Source, ownership, and derivative treatment belong in `public/education/README.md`.

## Evidence and Asset Boundaries

The five files under `public/uploads/hero/` are homepage presentation derivatives. Their inclusion in the nucleus does not establish exact components, silkscreen, fabrication, bring-up, integration, measurement, validation, ownership, or completion. Use original photographs, drawings, Gerbers, logs, traces, and other direct artifacts on project evidence surfaces.

Technology marks under `public/skills/icons/` identify tools and platforms only. Their source, license where applicable, trademark ownership, derivative treatment, and non-endorsement boundary are maintained in `public/skills/icons/README.md`. Institution-mark provenance and dark-background adaptations are maintained separately in `public/education/README.md`.

Do not place unreviewed third-party marks into the homepage, infer permission from search-engine availability, or claim endorsement. Source-only working files should not remain publicly served unless their public purpose is documented.

## Bilingual, Responsive, and Accessible Behavior

`BilingualText` renders paired English and Simplified Chinese nodes; `html[data-lang]` exposes one language at a time. The site restores `portfolio-language` before the interface renders and updates the document `lang` attribute. Do not concatenate mixed-language labels as a substitute for equivalent localized content.

The technical atom is announced as one meaningful visual with a concise bilingual description. Its internal orbit paths, repeated marks, comet tails, and decorative traces remain hidden from assistive technology. Technology names conveyed only through logos must also exist in accessible text.

Keyboard focus is always visible. Interactions do not depend on hover, color, or motion alone. Verify both languages at desktop, tablet, and mobile widths, including keyboard navigation, contrast, overflow, document visibility changes, offscreen pausing, and reduced motion.

## Do's and Don'ts

### Do

- Use ember sparingly as the main interface signal.
- Keep gold, green, and violet confined to their three orbital categories.
- Keep all electron badges black and adjust dark marks with documented, recognizable contrast treatments.
- Preserve the atom's equal orbit geometry, equal electron spacing, upright labels, and symmetric starting composition.
- Let project metadata and public-file presence drive evidence rows.
- Keep prototype, technology-mark, and institution-mark provenance explicit.
- Preserve sharp interface geometry while allowing circles where the atom metaphor requires them.
- Test offscreen, hidden-document, reduced-motion, bilingual, keyboard, and responsive behavior.

### Don't

- Do not revive the former five-card mosaic or four-stage workflow ledger inside the hero.
- Do not turn semantic orbit colors into a general multicolor interface.
- Do not add inconsistent white electron backgrounds, arbitrary icon lettering, or unreadably dark marks.
- Do not invent telemetry, dates, metrics, fabrication status, validation outcomes, or project ownership.
- Do not treat hero derivatives, orbit motion, or technology marks as engineering evidence.
- Do not distort the iRidium wordmark or institution marks.
- Do not introduce random or motion-only meaning, hover-only controls, scroll hijacking, or undersized targets.
- Do not apply `.signal-theme` to routes that remain in the paper design.

## `/work` — Project Aperture Sequence

This section governs the `/work` project index on `feat/frontend-refresh`. Project detail routes remain outside this surface decision. The route uses **Experience mode**: authentic project evidence leads, while the archive interface recedes into a precise locating and inspection system.

**Direction record.** The approved direction is **Project Aperture Sequence / 检视窗序列**, selected from three visualized structures with surface seed `c576f6e6`. Machine-local Impeccable comps may preserve the review process, but they are excluded from Git and are not portable design authority. This section and the shipping implementation are the durable record; generated review rasters never ship as project imagery.

### Spatial model and project chapters

- On wide screens, a sticky left rail keeps the current eight-project sequence visible as `01`–`08`. The right stage carries vertically stacked, evidence-first apertures with one real project image beside the localized title, status, timeline, focus tags, evidence availability, and case-study action.
- Each project chapter is one complete semantic link to its case study. Do not split its image, copy, metadata, or action into nested or competing links.
- The active rail item follows the chapter in view and exposes location state. On tablet, compress the rail without losing the sequence. On mobile, keep a sticky horizontal `01`–`08` rail and repeat the project number inside each chapter so orientation does not depend on the desktop composition.
- English and Simplified Chinese use the same information hierarchy. Long titles may wrap differently, but neither language may be clipped, abbreviated into a different claim, or allowed to create horizontal overflow.

### Inter-project signal interval

Every adjacent pair of project chapters is separated by a generous black interval containing one low-contrast band of short, thin, upright ember-orange ticks. With eight current projects, the page has exactly seven intervals; in general, the invariant is one interval per adjacent pair. The band belongs only to the right project stage and never crosses or animates beneath the left rail.

The repeating tick phase travels continuously from right to left at approximately `12px/s`. Motion runs only while its own interval is near the viewport and the document is visible; it pauses offscreen and while the page is hidden. Under `prefers-reduced-motion: reduce`, the short ticks remain present as a static separator. The interval means only “next archive record.” It is decorative and must not imply progress, telemetry, completion, chronology, or a measured signal.

Keep this separator quiet: broad black breathing room above and below, low orange contrast, no solid bar, arrows, waveform, grid, glow halo, blur, or horizontal-dash substitution.

### Evidence and asset boundary

Titles, statuses, dates, tags, summaries, evidence availability, project order, and destinations come from the repository content model. All production chapter and rail imagery comes from reviewed project assets under `public/uploads/projects/`; preserve each source image's aspect ratio and never substitute the approved mock, a generated placeholder, or a homepage presentation derivative. The final `/work` surface must remain inspectable evidence, not an invented metric or outcome wrapped in an archive aesthetic.

## `/media` — Focus Aperture

The `/media` route uses **Experience mode** inside the shared Ember Black shell. Its approved direction is **Focus Aperture / 深焦检视窗**, selected from three visualized structures with surface seed `568122f0`. Machine-local Impeccable comps are non-portable review aids; this section and the shipping implementation are the durable record, and generated rasters never ship as evidence. The page's governing idea is project-bound media: a visitor chooses a named project source, inspects one lead record, and then enters that project's complete grouped library or case study. It must never collapse back into a loose, site-wide image wall.

### Project-first archive structure

- The current repository-backed archive contains 84 records across eight real projects: 80 images and four videos, with no unassigned records. These totals are derived from `content/media.json`; interface counters must continue to follow the content rather than preserving stale hard-coded numbers.
- The first viewport is a three-zone aperture on wide screens: an archive ledger at left, one uncropped focus record in the center, and the eight-project source index at right. A grouped-library cue touches the lower edge and leads directly to the selected project's chapter.
- Below the aperture, one server-rendered section per project keeps the full localized project title, summary, status, timeline, record counts, case-study action, and continuous contact sheet directly attached to its media records. Project identity must not be separated from the images it qualifies.
- `app/media/page.tsx` owns data loading, grouping, counters, project chapters, and record links as a Server Component. `MediaFocusAperture` is the deliberately small client island: it owns only project-source selection and the lead-record swap. Do not move the full 84-record archive or its factual grouping into client state.

### Responsive sequence

The wide aperture uses the ledger / focus / project-source composition. Tablet reflows the ledger and source chooser ahead of a full-width focus stage. Mobile has one explicit reading order: **archive ledger → project source chooser → focus record → grouped project chapters**. Each chapter's identity header stays directly attached to its records, and the contact sheet becomes one column at the narrowest width without horizontal overflow or clipped bilingual titles.

### Evidence imagery and interaction

The focus record and every media cell use the repository's real thumbnail and source paths. Technical images use contain fitting with internal breathing room so schematics, PCB renders, board photographs, diagrams, and screenshots remain complete; never crop evidence merely to mimic the approved comp. Generated decision imagery, homepage presentation derivatives, placeholders, and decorative substitutions do not belong in this archive.

Project-source choices are native buttons with `aria-pressed`; the selected focus stage announces its update politely. Homepage media thumbnails preserve source context through the `project` query parameter, which initializes the small focus client island without moving the 84-record archive into client state. Media and project destinations remain native links with visible focus treatment and at least 44px interaction targets. Video records carry both an icon and localized text, selection never depends on orange alone, and English and Simplified Chinese expose the same titles, captions, project relationships, counts, and actions.

### Motion and reduced motion

Motion is bounded to the focus-aperture model: a 460ms aperture reveal, an eight-second ambient Ember scan rule, short source-selection transitions, and precise image or metadata hover wipes. These effects indicate selection and inspection only; they never imply telemetry, measurement, validation, completion, progress, or chronology. Under `prefers-reduced-motion: reduce`, the reveal, scan, transforms, and transitions stop completely while selection state, focus visibility, record identity, and every action remain available.

## `/notes` — Routed Signal Map

This section governs the separately approved Ember Black treatment for the `/notes` index on `feat/frontend-refresh`. Individual `/notes/[slug]` pages remain outside this decision and retain their existing design until the page-by-page rollout reaches them. The index uses **Read mode**: its routing form helps visitors locate an engineering question or project thread, while the note record remains the destination.

**Direction record.** The approved direction is **Routed Signal Map**, candidate `7 / 7` from surface seed `be3086ea`. Machine-local Impeccable comps and screenshots may record the review process, but `.impeccable/` is excluded from Git and cannot serve as cross-device evidence. This section, the bundled font provenance, and the shipping implementation are the durable record; generated review images never ship as interface or note evidence.

### Tonal field and typography

- The index keeps the established Ember anchors while adding a local graphite ramp: net ground `#090B0A`, deep routing panels `#0B0D0C`, control fill `#10110F`, raised hover graphite `#171614`, and fine warm-white rules at several low opacities. Neutral text steps from warm white through restrained warm greys so headings, summaries, labels, and tertiary metadata remain distinct without introducing another accent.
- Ember orange remains the only selected navigation signal. It may illuminate a chosen channel, its routed line, control state, ledger edge, matching record stems, focus treatment, and row interaction; it must not become routine body copy or a broad panel fill.
- English headings and note titles use the self-hosted Barlow Condensed display face. Chinese headings and note titles use the self-hosted, notes-specific subset of **ZCOOL QingKe HuangYou**, then fall back to PingFang SC, Microsoft YaHei, and the system sans stack. The runtime subset, source-text inventory, and SIL OFL record live at `app/fonts/ZCOOLQingKeHuangYou-NotesSubset.woff2`, `app/fonts/ZCOOLQingKeHuangYou-NotesSubset.txt`, and `app/fonts/OFL-ZCOOL-QingKe-HuangYou.txt`; regeneration guidance lives in `app/fonts/README.md`. Body copy remains the native UI sans stack, while indices, counts, dates, tags, and control labels use the mono stack.

### Routed index topology

- The compact opening band states the archive scope without becoming a second hero. Its `24 / 8 / 3` values mean exactly 24 public notes, 8 linked projects, and 3 available frontmatter years in the current repository data.
- On wide screens, eight distinct stepped route stems leave the project-channel column, join one graphite bus, pass the search, project, and year junctions, and converge at the note ledger. The visible geometry explains how to navigate the index; native controls and semantic list links remain the operative interface.
- Selecting a project creates one continuous orange navigation path from that project channel through the routing field to the ledger. The ledger edge and only the records linked to that project receive the matching orange continuation. Search and year filters update the real result set and their control states without inventing additional signal paths.
- Each ledger row is one full semantic link carrying the real sequence number, linked project, frontmatter date, bilingual title and summary, and up to three visible tags. The row's node, underline, title shift, and arrow act as one hover/focus cue; they do not split the destination into competing actions.

### Motion, responsive behavior, and meaning

- The entry sweep, bounded channel and row resolves, selected-node pulse, and dashed active-route travel explain assembly and current selection. They are decorative navigation feedback only. Under `prefers-reduced-motion: reduce`, the same channels, selected path, junctions, ledger edge, matching records, focus states, and result counts remain visible as a complete static equivalent; stagger, pulse, sweep, dash travel, and transform transitions stop.
- The first desktop viewport stays compact enough to show the shared header, scope band, all eight project channels, search/project/year controls, and the opening ledger records together. At intermediate widths the ledger moves below the two control columns and the decorative route map recedes. On mobile, the topology collapses into document order: scope, a two-column grid of eight project channels, stacked controls, then the full-width ledger. No route or control depends on horizontal scrolling.
- The counters, channel quantities, filters, and ledger records are derived from repository content. Frontmatter dates provide archive sorting and filtering metadata only; neither date order nor line travel implies an engineering timeline, live telemetry, progress, completion, status, throughput, or measurement. Motion and orange state must never manufacture evidence.

## `/about` — Tension Signal Column

The `/about` route uses **Read mode** inside the shared Ember Black shell. Its approved direction is **Tension Signal Column / 张力信号柱**, selected from three visualized structures with surface seed `b1f777a9`. Machine-local Impeccable comps, approval sidecars, and screenshots are non-portable review aids because `.impeccable/` is excluded from Git. This section and the shipping implementation are the durable record; generated rasters never ship as portrait or interface artwork.

### Identity narrative and first viewport

- About traces Alvin's route from telecommunications study into connected systems work, then explains the working method across hardware, firmware, bring-up, measurement, handoff, and iteration. It is an identity-and-method narrative, not another homepage capability inventory.
- On wide screens, the opening field is an asymmetrical split: the left side carries `Alvin Li`, the statement “After the schematic leaves the page,” two CV-grounded paragraphs, the project, GitHub, and email routes; the right side carries the identity plate and four-node load path. A clear next-ledger cue touches the fold so the route continues into practice evidence and current coordinates.
- The lower ledger uses selected CV-grounded contexts to show where the method took shape, then separates current study and contact from project evidence. The sequence describes a route through practice; it does not rank projects or turn experience into a score.
- English and Simplified Chinese preserve equivalent claims and hierarchy even when their headings, paragraphs, and controls wrap differently.

### Portrait plate and load path

**The original-portrait rule.** `public/uploads/projects/avatar.jpg` is the shipping identity asset, with SHA-256 `19fc1f897595b113d413f34f1b3b99689c91213ae8fdcfad0f3bf81736939fc2`. Preserve its complete square white field and black line art with contain fitting; never crop, invert, recolor, filter, blend, fade, trace, or replace it with generated artwork.

**The route-not-score rule.** The four visible stages are system framing, firmware and protocols, bring-up and measurement, and handoff and iteration. They form one semantic ordered route and must not imply proficiency, rank, completion, validation, or telemetry.

**The single-pulse rule.** Exactly one restrained ember pulse may travel along the hairline tension graph to communicate connection and flow. It carries no status or progress meaning, runs only while the column is in view and the document is visible, and stops completely under `prefers-reduced-motion: reduce` while every label and relationship remains legible.

The About surface keeps the shared compressed display, warm-white reading hierarchy, mono coordinates, one-pixel rules, and Ember signal. Its planar regions and actions remain sharp and zero-radius; circles are reserved for the graph nodes and moving pulse. The portrait's source white and page-local supporting warm greys do not become new global palette roles.

### Responsive and evidence boundaries

At mobile widths, the desktop split becomes one document-order sequence: identity and method, actions and contact, the untouched portrait plate, the four-node load path, then the practice ledger and current coordinates. No essential relationship depends on the desktop graph geometry, hover, motion, or horizontal scrolling.

Every biographical, educational, employment, project, and current-study statement stays proportional to the supplied CV and repository evidence. Keep direct contribution, direct measurement, client report, inference, recollection, and unfinished validation distinct; the route geometry, portrait treatment, comp, review capture, and pulse establish presentation only and never strengthen a factual claim.
