---
name: Kinetic Signal Ledger
description: One sitewide instrument grammar in two luminance themes (Ember Black, Bench Paper) for Alvin Li's bilingual, evidence-calibrated iRidium engineering portfolio.
scope:
  release: v0.9.0 unified-theme update (2026-10)
  appliesTo: "every route: homepage, work, notes, media, about, project detail, and note detail"
  themes: "Ember Black (dark, default) and Bench Paper (light), selected by html[data-theme]"
  retired: the light pine/graphite paper system and its black-to-paper route handoff
colors:
  # Ember Black (dark, default). Runtime source: RGB triplets on :root in app/globals.css.
  canvas: "#080808"
  surface-deep: "#0B0B0A"
  surface-panel: "#11110F"
  surface-raised: "#171614"
  text: "#FAFAFA"
  warm-white: "#F7F0E8"
  t1: "#E1D9D0"
  t2: "#C4BDB5"
  t3: "#AAA39A"
  t4: "#928B84"
  t5: "#7D7771"
  t6: "#5F5B56"
  rule: "#3B3936"
  line: "rgba(250, 250, 250, 0.20)"
  line-soft: "rgba(250, 250, 250, 0.11)"
  ember: "#FF7400"
  ember-soft: "#FF9A4A"
  ember-text: "#FF9A4A"
  ember-hover: "#FF8A2B"
  focus: "#FFB36B"
  on-ember: "#080808"
  code: "#0D0D0C"
  image-well: "#10100E"
  glow-warm: "#FFD8AD"
  tint: "#0F0A07"
  shadow: "#000000"
  orbit-embedded: "#B9914B"
  orbit-firmware: "#5FA78F"
  orbit-tools: "#9B90B5"
  # Bench Paper (light). Cobalt: Tailwind slate neutrals, cobalt accent, white sheets alternating with faint cobalt bands; no pure black.
  light-canvas: "#FFFFFF"
  light-band: "#F5F9FF"
  light-surface-deep: "#FFFFFF"
  light-surface-panel: "#FFFFFF"
  light-surface-raised: "#F8FAFC"
  light-text: "#0F172A"
  light-warm-ink: "#0F172A"
  light-t1: "#1E293B"
  light-t2: "#334155"
  light-t3: "#526073"
  light-t4: "#5A687C"
  light-t5: "#586476"
  light-t6: "#94A3B8"
  light-rule: "#E2E8F0"
  light-line: "rgba(30, 41, 59, 0.20)"
  light-line-soft: "rgba(30, 41, 59, 0.11)"
  light-accent-mark: "#2563EB"
  light-accent-soft: "#60A5FA"
  light-accent-text: "#00334D"
  light-accent-hover: "#2465FF"
  light-focus: "#1D4ED8"
  light-heading: "#2465FF"
  light-on-accent: "#FFFFFF"
  light-logo-mark: "#2563EB"
  light-logo-word: "#1E3A8A"
  light-code: "#F8FAFC"
  light-image-well: "#EEF4FD"
  light-glow: "#FFFFFF"
  light-glow-warm: "#FFFFFF"
  light-tint: "#FFFFFF"
  light-halo: "#FFFFFF"
  light-shadow: "#0F172A"
  light-daylight-cobalt: "#60A5FA"
  light-daylight-ice: "#93C5FD"
  light-daylight-sky: "#7DD3FC"
  light-daylight-cyan: "#38BDF8"
  light-daylight-frost: "#BAE6FD"
  light-daylight-periwinkle: "#81A0FA"
  light-chrome: "#1E3A8A"
  light-aurora-violet: "#8B5CF6"
  light-aurora-sky: "#0EA5E9"
  light-chrome-deep: "#1B347D"
  light-chrome-panel: "#25449C"
  light-orbit-embedded: "#966E26"
  light-orbit-firmware: "#2E7D63"
  light-orbit-tools: "#6C6096"
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
components:
  bench-plate:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.on-ember}"
    typography: "{typography.display}"
  bench-rail:
    width: "248px"
  bench-reading-column:
    textColor: "{colors.t1}"
    typography: "{typography.body}"
    width: "full reading column"
  image-well:
    backgroundColor: "{colors.image-well}"
geometry:
  interface: sharp
  atom: circular
  language-control: pill
motion:
  orbit-assembly: slow counterclockwise rotation
  electrons: evenly phased orbital travel with tapered comet tails
  nucleus: one prototype at a time, 5s per board with a cross-fade
  separator: repeating iRidium marks scrolling upward
  theme-switch: 620ms circular reveal from the pressed control (view transition type `theme`)
  route-entry: vertical leave-and-arrive on nav-forward and nav-back, shared project-figure morph
---

# Design System: Kinetic Signal Ledger

## Scope

This document is the design authority for the Kinetic Signal Ledger. Since the 2026-10 unified-theme update on top of `v0.9.0`, the system is sitewide: the homepage, `/work`, `/notes`, `/media`, `/about`, every `/work/[slug]` project page, and every `/notes/[slug]` note page share one grammar of sharp fields, 1px rules, mono coordinates, Barlow display, and one ember signal. The former light paper system (pine and graphite accents, rounded cards, cool grid-paper ground) is retired and must not be revived on any route.

The grammar renders in two luminance themes, **Ember Black** (dark, the default) and **Bench Paper** (light). Both themes carry the same layouts, type, geometry, motion, and evidence rules; only token values change. The theme is the `data-theme` attribute on `html`, set before first paint (see *Theme control*). A surface never forks its markup or composition per theme.

The shell rules apply globally on `body`: the shared body, header, navigation, preference pill, focus treatment, selection, and footer read the theme tokens directly, with no route-level opt-in. Every route's root content still carries the `.signal-theme` marker, which exposes the `--signal-*` aliases that surface styles use. Surface-specific composition belongs to that route's approved section below rather than becoming a global template.

## Creative North Star

**Kinetic Signal Ledger** presents engineering as a field of connected evidence rather than a marketing gallery. In Ember Black the near-black canvas recalls a hardware bench at low light; in Bench Paper a clean drafting-sheet white recalls the same bench under daylight. In both, fine rules, indices, and compact labels create an instrument grammar; warm white or warm ink carries information; one signal colour identifies the principal signal, ember orange in Ember Black and cobalt in Bench Paper.

The homepage may be visually kinetic, but every motion must reinforce structure: the separator establishes flow, the nucleus gathers prototype work, the orbits group the technical stack, and project rows lead to inspectable evidence. The animation is an illustrative systems map, not telemetry or proof of project completion.

Key characteristics:

- Full-bleed, sharp-edged instrument fields instead of floating card shells.
- A clear evidence hierarchy: direction first, inspectable work next, credentials and supporting material after.
- Hardware and firmware practice remain the subject; decorative effects stay subordinate.
- Continuous motion is permitted only where it communicates orbit, flow, grouping, or signal direction.
- Bilingual clarity, contrast, reduced-motion behavior, and evidence limits take priority over spectacle.
- One grammar in two luminance themes; a page reads as the same instrument in either.

## Color System

Every color is a theme token declared once on `:root` in `app/globals.css` as an RGB triplet (`--c-canvas: 8 8 8`), so any surface can apply its own alpha with `rgb(var(--c-fg) / 0.14)`. Ember Black is the `:root` / `:root[data-theme="dark"]` block; Bench Paper overrides it under `:root[data-theme="light"]`, and the same light values repeat under `@media (prefers-color-scheme: light)` for `:root:not([data-theme])`, so a page without the attribute still follows the system. The frontmatter mirrors these triplets in hex: unprefixed keys are Ember Black, `light-*` keys are Bench Paper. Tailwind color names map to the same tokens in `tailwind.config.ts` (`ink` → warm, `graphite` → t3, `dim` → t5, `line` → rule, `paper` → canvas, `chalk` → panel, `raised`, `code`, `well`, `pine` and `moss` → ember text, `copper` → ember hover, `ember`, `on-ember`); the legacy names survive only as aliases and no longer mean pine or graphite colors.

### Ember Black (dark, default)

Canvas, deep, panel, and raised surfaces step up from near-black in small warm increments. Text is near-white for headings and warm white for display and reading anchors; the `t1`–`t6` warm-grey ramp steps down from body copy (`t1`) through metadata (`t3`–`t4`) to quiet annotation (`t5`–`t6`). Ember text uses the softer ember so links and status read comfortably on black. Shadows use pure black at full strength.

### Bench Paper (light)

Bench Paper uses the **Cobalt** palette (the owner's final choice after Slate Sky read too pale for the logo and emphasis): white sheets with Tailwind-slate neutrals, alternating with faint cobalt bands (`#F5F9FF`) behind the homepage hero, education, contact and the detail masthead, so the page has a white–band–white rhythm instead of one empty field. Bench Paper is designed, not inverted: it trades ember for **cobalt** as its signal. **The cobalt-signal rule**: marks, fills, the number plate, dimension lines, crop marks, rail markers, the selected-language fill and the drafting grid use cobalt `#2563EB`; all coloured text (small labels, links, status, eyebrows, chapter numbers) on every page uses owner-picked deep sea `#00334D` (13.3:1 on white, 12.6:1 on the band), lighting to `#2465FF` on hover. Homepage section titles use owner-picked bright blue `#2465FF` (`--c-heading`, 4.8:1 on white, 4.5:1 on the band), so the titles carry the colour and the small text stays quiet; the focus ring stays cobalt `#1D4ED8`; text on a cobalt fill is white (5.2:1). The header logo pairs a cobalt mark with a deep-cobalt `#1E3A8A` wordmark. **The no-pure-black rule** sets headings, body, rules, and logos in near-black slate ink (`#0F172A` for headings, `#1E293B` body, `#334155` secondary, then `#526073` → `#586476` meta at 4.5:1 or better, including on the band, `#94A3B8` only for non-text), never `#000`. The owner asked for the ink to lean toward black. **The no-glow rule**: every atmospheric ember glow, radiance, tint, and halo in Ember Black reads through the `--c-halo`, `--c-glow-warm`, and `--c-tint` tokens, which Bench Paper sets to its canvas so they vanish; depth comes from hairlines and quiet slate shadows (`--shadow-k` 0.28). **The full-colour rule**: Ember Black dims and desaturates covers and media thumbnails at rest; Bench Paper shows them in full colour, because the same filter reads as a grey film on white. **Daylight** gives Bench Paper its own living field, the counterpart of the Ember glow: the homepage hero drops the drafting grid for four broad, low-alpha blue lights (cobalt, sky, periwinkle and a white highlight) over a white-to-pale-cobalt wash. They roam on long multi-point paths (64–86s loops), so the light travels across the field rather than sitting as fixed patches; they pause offscreen or when hidden and stop under reduced motion. The detail masthead keeps a static two-light wash. **Aurora chrome** frames the light page the way near-black chrome frames the Ember hero: the header (including the mobile nav row) and the footer are a deep cobalt `#1E3A8A` base carrying three soft lights (cyan `#38BDF8`, violet `#8B5CF6`, sky `#0EA5E9`) that drift on a 24s loop under a fine overlay grain, with their own scoped on-blue tokens. Logo, nav labels, indices and footer text are white for contrast over every part of the aurora; the active nav adds a soft ice glow and the sky underline; the selected language is a white thumb with cobalt text; the pill sits on a translucent navy field. The drift stops under reduced motion. Other Bench Paper details remain: ember-equivalent cobalt dimension lines under homepage section titles, crop marks on figures, and dashed heading rules. These appear only in Bench Paper. The orbit category colors are darkened for paper.

### Shared roles

- **The on-ember rule.** Content set on a solid ember fill (the bench plate, selected language and theme options, selection, filled actions) uses the near-black on-ember token in both themes, never white.
- **The image-well rule.** Image frames sit on the neutral image-well token, so evidence reads on paper-deep in Bench Paper and near-black in Ember Black. The two transparent `-system-block` diagrams carry white labels and keep the Ember Black image-well value as a dark plate in both themes.
- **The logo-ink rule.** The header mark and script wordmark are CSS masks of the approved PNGs filled with `--logo-mark-color` and `--logo-word-color`: warm white in Ember Black; in Bench Paper a cobalt mark (`#2563EB`) beside a deep-cobalt wordmark (`#1E3A8A`). Geometry is never altered.
- **Lines.** Rules and borders are the foreground at low alpha (about 0.11–0.20), so the same declaration produces a light hairline on black and a dark hairline on paper.

**The primary-signal rule.** Ember is the only saturated color used broadly across interface state in either theme: primary actions, focus, directional marks, key rules, and selected controls. It must not become routine paragraph color or a blanket surface fill.

**The orbital exception.** The technical atom uses three tightly scoped semantic colors:

- muted gold for embedded systems;
- restrained green for firmware development;
- soft violet for engineering tools.

These colors identify orbit membership only. They may tint the corresponding orbit, dash flow, electron edge, comet tail, and category label. They must not spread into unrelated navigation, project rows, education, or ordinary copy.

**The mark exception.** Technology and institution marks may retain their recognizable brand colors. Every technology mark sits on the same canvas-toned electron-badge surface. If a mark is too dark to remain legible, use an approved lightened derivative, white inlay, or restrained contrast treatment documented with that asset; do not add inconsistent white badge backgrounds.

**The contrast rule.** Essential reading copy uses text, warm white or warm ink, or `t1` on the canvas. The `t3`–`t6` steps are reserved for metadata and nonessential annotation.

## Typography

The local Barlow Condensed SemiBold face is the English display voice. Chinese display copy uses PingFang SC, then Microsoft YaHei and the system sans stack. Body copy uses the native UI sans stack; indices, dates, tags, and instrument labels use the native monospace stack.

- English hero and section headings use the display token; Chinese headings use `display-cjk` with independent line-height and width tuning.
- On desktop, in both themes, English navigation reuses the same display token as `Project evidence index`; Chinese navigation keeps the CJK display stack. The `01`–`04` prefixes remain compact monospace metadata rather than part of the label voice.
- The hero keeps one concise personal introduction in ember orange beneath the primary direction statement.
- Long paragraphs remain in the body face; detail-page reading copy is set at 17px (see *Detail pages — Bench Log*). Mono is for compact technical metadata, not novelty body copy. Paragraphs and inline code use `text-wrap-safe` so long identifiers can wrap on narrow screens; fenced code retains its own horizontal scrolling.
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

The headline is the heaviest element in the hero: the copy column takes about 46% (ZH) / 44% (EN) of the width and is a size container. The title runs up to 5.8rem (ZH) / 6rem (EN). The Chinese title sets two explicit lines, 嵌入式、控制、 / 电源与电驱, never relying on automatic CJK wrapping (Safari would not break at the commas). Its size is capped at `13.5cqi`, so the seven-glyph first line always fits between the ruler and the separator. The atom stage renders at 0.86 scale. The wide hero has three explicit visual zones:

1. **Left — text field.** The direction statement, one orange identity paragraph, and actions form the reading anchor. An outer-edge ruler (20px wide, a 1.5px major tick every 38px with three 1px minor ticks between; the copy always keeps clear of it) falls along the left edge at exactly the separator's pitch and speed, so the two edges of the copy move as one counter-flowing pair without competing with the copy.
2. **Middle — iRidium separator.** Repeated instances of the existing iRidium mark form a vertical, ember-colored band that scrolls upward. The band is translucent, has no extra centerline, and separates rather than fences off the two sides.
3. **Right — orbital technical visual.** A tilted atom combines a rotating prototype nucleus with three technical-category orbits. It fills the available visual field without colliding with the separator or header.

At narrower widths, preserve the same reading order while allowing the hero zones to stack or simplify. The separator may become horizontal or recede when a vertical band would consume useful reading width. The atom must remain complete and legible rather than being cropped into a decorative fragment.

The hero background may use several low-contrast, irregular warm radiances across the full text-and-atom field. They stay static so the separator and the atom are the only moving systems, and they should feel like light behind a material, not detached gradient blobs. Right-side corner brackets may frame the atom without adding a full card border.

## Orbital Technical Visual

### Nucleus

The nucleus shows one prototype at a time. Five transparent presentation cutouts from `public/uploads/hero/` take turns at the center, each held for 5 seconds and cross-fading into the next, at about 180px wide on desktop so the board reads clearly without crowding the orbits. The boards keep their own color and a soft contact shadow on a faint ember glow, with no circular crop, white photo field, or card frame, so they sit on either theme's canvas. The nucleus never expands into a grid or shows several boards at once.

The nucleus represents a portfolio core, not five completed case-study claims. The rotation order is presentational: it does not imply sequence, progress, scale, or technical relationship.

### Orbits and electrons

The atom has exactly three equal-size elliptical orbit paths centered on the same nucleus and rotated to `0°`, `60°`, and `120°`. Their geometry must match; only orientation and semantic color differ.

Each orbit contains exactly five electrons placed at equal path-phase intervals. All three orbits initialize from deterministic, interleaved phases so the first frame is balanced. Adding or removing a technology requires re-establishing equal spacing rather than clustering spare electrons together.

Each electron contains one recognizable technology mark on a uniform circular badge filled with the canvas token (near-black in Ember Black, white in Bench Paper). Marks use a consistent optical scale rather than identical raw image bounds. Transparent negative space must reveal the shared badge. Short labels associated with an orbit remain upright relative to the viewport even while the orbit assembly rotates; labels must never turn upside down with their parent path.

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
- the nucleus cross-fades to the next prototype every 5 seconds;
- the central iRidium separator (38px marks in a 48px band, never larger than the 44px header mark) scrolls upward while the outer-left ruler falls at the same pitch and speed in counterflow; the Ember radiances stay still, and the Bench Paper daylight roams slowly.

Do not attach fabricated waveform meaning, sensor values, stage completion, or live-system status to these motions. Avoid arbitrary bouncing, hover-chasing, or independent random movement that breaks the orbital model.

Animation pauses whenever the technical visual is outside the viewport or the document is hidden. Under `prefers-reduced-motion: reduce`, the atom renders as a balanced static composition: orbit assembly, electrons, dash flow, nucleus rotation, and separator stop; the nucleus holds its first prototype, and comet tails may be removed. No information or navigation may depend on motion.

## Components

### Shared header and footer

`SiteHeader` and `SiteFooter` remain shared components. Their styling comes from the global `body` shell rules and the theme tokens, identically on every route; do not fork the components per route or per theme. The header is the one anchored element during route transitions (view-transition name `site-header`).

Desktop navigation places a low-opacity `01`–`04` index before each label on every route. Size, spacing, typography, lift, press feedback, and line growth are one control system; the theme changes only token values (warm label, `t3` index, ember-text active state, ember line). Exact routes expose `aria-current="page"`, nested routes expose `aria-current="location"`, and the homepage itself does not invent a current item. The compact mobile row omits the indices.

Under `prefers-reduced-motion: reduce`, navigation state remains visible but lift, press, and line-growth transitions become immediate. Semantic current-route state remains available on the shared navigation across every route.

Preserve `public/brand/iridium-mark.png` and `public/brand/iridium-wordmark-script.png` with their intrinsic proportions. The wordmark always reads exactly `iRidium` in both languages. The middle separator repeats the mark glyph, not a replacement text logo. The header renders them as CSS masks filled per theme (`--logo-mark-color`, `--logo-word-color`), which recolors them without altering their geometry.

### Theme control

The theme control is a sun/moon two-state segment inside the existing language pill (`SitePreferences`), after a hairline divider; the pill keeps its rounded language-control geometry and the 44px targets. Each option is a native button with `aria-pressed` and a bilingual screen-reader label; the selected option fills with ember and on-ember content, the same treatment as the selected language.

- On a first visit the theme follows `prefers-color-scheme`, and keeps following live system changes.
- A click stores `portfolio-theme` (`light` or `dark`) in `localStorage`; from then on the stored choice wins and the system setting is ignored.
- A bootstrap script in `app/layout.tsx` runs before paint, restoring both `portfolio-language` and `portfolio-theme`, setting `html[data-theme]`, `color-scheme`, and the `theme-color` meta (canvas value of the chosen theme), so neither theme flashes.
- Switching reveals the new theme as a circle that grows from the pressed sun or moon button over 620ms (`document.startViewTransition` with the `theme` transition type; the old page stays still underneath). Browsers without transition types fall back to a crossfade. Under `prefers-reduced-motion: reduce`, or where view transitions are unsupported, the switch is instant.

### Hero actions

The primary action is a sharp ember-outline control that fills on hover or focus. The secondary action is a warm-white text link with an ember directional underline. Both retain visible keyboard focus, descriptive text, and comfortable touch targets.

### Project evidence rows

`ProjectEvidenceRow` is the reusable project record. Its title, localized status, tags, evidence availability, timeline, cover, and destination come from project metadata. The complete row remains one accessible link with a clear screen-reader summary. Never add achievements or evidence claims solely for visual density.

Project and media covers may be restrained at rest and reveal more color on hover or focus. Their animation remains brief and subordinate to the evidence itself.

### Education and current direction

Keep the full-width NTU master's entry above the two undergraduate awards on layouts where space permits. Institution marks use intrinsic proportions and contain fitting; they are never stretched, cropped, exchanged, or used as decorative wallpaper.

Dark-background derivatives may add white only inside intended shield or crest cutouts while preserving transparent space outside the mark and preserving the original geometry. Source, ownership, and derivative treatment belong in `public/education/README.md`.

### Interaction motion

Every control shares one quiet motion vocabulary (`app/globals.css`, *Interaction motion*). Exits run faster than entrances, and the shared ease is `cubic-bezier(0.16, 1, 0.3, 1)`.

- **Image lightbox.** Clicking an evidence image opens it in a modal viewer on the same page instead of navigating to the bare file: article figures, project media tiles, `/media` image records and file-browser image previews. The image sits uncropped over a canvas-tinted, blurred backdrop with a bilingual caption, an "Original" link and a close button. Clicking outside the image, pressing Escape or the close button dismisses it, and focus returns to the opener. Modified clicks keep the browser default, videos are untouched, and the open animation stops under reduced motion.
- **Signal fill.** Outlined actions (`.signal-fill`: hero primary, header CTA, About primary, Media "Open media", file "Open file", 404 action) fill with the signal colour as a left-to-right wipe: 420ms in, 240ms out. The label turns to on-signal text a beat later.
- **Drawn underline.** Section-header links and detail section links draw a 1px underline from the left. The hero secondary link and prose links tighten their existing underline offset.
- **Directional arrow.** Arrows lean 3px toward their destination on hover and focus. Download arrows drop 2px.
- **Press.** Pill options, the logo, and filled actions settle 1px on press (60ms).
- **Sliding thumb.** The language and theme pill each have one thumb that slides between options (340ms). Its position comes from `html[data-lang]` / `html[data-theme]`, so it is correct before hydration. The sun icon turns 45° and the moon 18° on hover.
- **Settling focus ring.** The focus outline settles from 7px to 3px offset.
- **Panels and swaps.** The mobile contents strip unfolds by grid rows (0fr → 1fr) with a fading list and stays `inert` while closed. A newly selected file preview eases in over 260ms. Rows move their title and arrow together 4px. Media tiles keep their slow image ease.

Under `prefers-reduced-motion: reduce`, all spatial movement (wipes, thumbs, arrows, icon turns, press offsets, unfold, preview rise) is removed. Colour and state changes stay immediate and legible.

## Evidence and Asset Boundaries

The five files under `public/uploads/hero/` are homepage presentation derivatives: four `*-cutout-v4.webp` background-removed cutouts made from the earlier studio-photo derivatives (shadows kept as translucent black, no board content added or altered) plus the original AD831 cutout. Their inclusion in the nucleus does not establish exact components, silkscreen, fabrication, bring-up, integration, measurement, validation, ownership, or completion. Use original photographs, drawings, Gerbers, logs, traces, and other direct artifacts on project evidence surfaces.

Technology marks under `public/skills/icons/` identify tools and platforms only. Their source, license where applicable, trademark ownership, derivative treatment, and non-endorsement boundary are maintained in `public/skills/icons/README.md`. Institution-mark provenance and dark-background adaptations are maintained separately in `public/education/README.md`.

Do not place unreviewed third-party marks into the homepage, infer permission from search-engine availability, or claim endorsement. Source-only working files should not remain publicly served unless their public purpose is documented.

## Bilingual, Responsive, and Accessible Behavior

`BilingualText` renders paired English and Simplified Chinese nodes; `html[data-lang]` exposes one language at a time. The site restores `portfolio-language` before the interface renders and updates the document `lang` attribute. Do not concatenate mixed-language labels as a substitute for equivalent localized content.

The technical atom is announced as one meaningful visual with a concise bilingual description. Its internal orbit paths, repeated marks, comet tails, and decorative traces remain hidden from assistive technology. Technology names conveyed only through logos must also exist in accessible text.

Keyboard focus is always visible. A bilingual skip link is the first keyboard stop and moves focus directly to the current route content without adding a second main landmark. Shared header navigation, logo, language controls, homepage archive actions, and other standalone controls expose at least 44px touch targets in both Ember Black and Bench Paper. Interactions do not depend on hover, color, or motion alone. Text, including mono metadata and controls, never renders below 14px (`0.875rem`); only the decorative, `aria-hidden` orbit labels may sit at 13px. At the owner's request, every small size sits two 1px steps above its original value, in both themes; sizes reaching 1rem stopped there. Tailwind `text-xs`/`text-sm` resolve to 14px/16px. The compact header runs up to 599px. Verify both languages in both themes at desktop, tablet, and mobile widths, including keyboard navigation, contrast, overflow, document visibility changes, offscreen pausing, and reduced motion.

## Do's and Don'ts

### Do

- Use ember sparingly as the main interface signal, and use the ember-text token, not the ember mark, wherever ember carries readable text.
- Keep gold, green, and violet confined to their three orbital categories.
- Keep all electron badges on the same canvas-toned surface and adjust dark marks with documented, recognizable contrast treatments.
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
- Do not revive the retired paper system: no pine or graphite accents, rounded cards, cool grid-paper ground, or thick left borders, on any route or in either theme.
- Do not hard-code a color that differs between themes; read it from the theme tokens.

## `/work` — Project Aperture Sequence

This section governs the `/work` project index in release `v0.9.0`, now rendered in both themes. Project detail routes are governed by *Detail pages — Bench Log*. The route uses **Experience mode**: authentic project evidence leads, while the archive interface recedes into a precise locating and inspection system.

**Direction record.** The approved direction is **Project Aperture Sequence / 检视窗序列**, selected from three visualized structures with surface seed `c576f6e6`. Machine-local Impeccable comps may preserve the review process, but they are excluded from Git and are not portable design authority. This section and the shipping implementation are the durable record; generated review rasters never ship as project imagery.

### Spatial model and project chapters

- On wide screens, a sticky left rail keeps the current eight-project sequence visible as `01`–`08`. Each rail entry shows one uniform lifecycle label from `getProjectPhase` (Completed / In progress / Archived, with a filled, outlined, or dimmed square); the full status, which also names the project type, stays in the chapter and on the project page. The right stage carries vertically stacked, evidence-first apertures with one real project image beside the localized title, status, timeline, focus tags, evidence availability, and case-study action.
- Each project chapter is one complete semantic link to its case study. Do not split its image, copy, metadata, or action into nested or competing links.
- The active rail item follows the chapter in view and exposes location state. On tablet, compress the rail without losing the sequence. On mobile, keep a sticky horizontal `01`–`08` rail and repeat the project number inside each chapter so orientation does not depend on the desktop composition.
- English and Simplified Chinese use the same information hierarchy. Long titles may wrap differently, but neither language may be clipped, abbreviated into a different claim, or allowed to create horizontal overflow.

### Inter-project signal interval

Every adjacent pair of project chapters is separated by a generous canvas-colored interval containing one low-contrast band of short, thin, upright ember-orange ticks. With eight current projects, the page has exactly seven intervals; in general, the invariant is one interval per adjacent pair. The band belongs only to the right project stage and never crosses or animates beneath the left rail.

The repeating tick phase travels continuously from right to left at approximately `12px/s`. Motion runs only while its own interval is near the viewport and the document is visible; it pauses offscreen and while the page is hidden. Under `prefers-reduced-motion: reduce`, the short ticks remain present as a static separator. The interval means only “next archive record.” It is decorative and must not imply progress, telemetry, completion, chronology, or a measured signal.

Keep this separator quiet: broad canvas breathing room above and below, low orange contrast, no solid bar, arrows, waveform, grid, glow halo, blur, or horizontal-dash substitution.

### Evidence and asset boundary

Titles, statuses, dates, tags, summaries, evidence availability, project order, and destinations come from the repository content model. All production chapter and rail imagery comes from reviewed project assets under `public/uploads/projects/`; preserve each source image's aspect ratio and never substitute the approved mock, a generated placeholder, or a homepage presentation derivative. The final `/work` surface must remain inspectable evidence, not an invented metric or outcome wrapped in an archive aesthetic.

Opening a project or note from the `/work` or `/notes` archive, or from a homepage row, stays inside one surface: there is no theme change and no mask. React `<ViewTransition>` (`components/route-stage.tsx`) runs the route change. Links into detail pages carry the `nav-forward` transition type and Bench Log back links carry `nav-back`. On `nav-forward` the old page content fades up and away (150ms) and the new content rises into place (380ms, after a 110ms overlap); `nav-back` runs the same pair downward. The `/work` chapter image and the project page's lead figure share the view-transition name `project-figure-<slug>` and morph between their positions (440ms), so the visitor recognises the project they clicked. The header stays anchored under its own `site-header` name and never moves. Untyped navigations (direct visits, refresh, browser history) swap without directional motion, and under `prefers-reduced-motion: reduce` every view-transition duration is 0.

## `/media` — Focus Aperture

The `/media` route uses **Experience mode** inside the shared Kinetic Signal Ledger shell, in both themes. Its approved direction is **Focus Aperture / 深焦检视窗**, selected from three visualized structures with surface seed `568122f0`. Machine-local Impeccable comps are non-portable review aids; this section and the shipping implementation are the durable record, and generated rasters never ship as evidence. The page's governing idea is project-bound media: a visitor chooses a named project source, inspects one lead record, and then enters that project's complete grouped library or case study. It must never collapse back into a loose, site-wide image wall.

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

Motion is bounded to the focus-aperture model: a 460ms aperture reveal, an eight-second ambient ember scan rule, short source-selection transitions, and precise image or metadata hover wipes. These effects indicate selection and inspection only; they never imply telemetry, measurement, validation, completion, progress, or chronology. Under `prefers-reduced-motion: reduce`, the reveal, scan, transforms, and transitions stop completely while selection state, focus visibility, record identity, and every action remain available.

## `/notes` — Routed Signal Map

This section governs the `/notes` index in release `v0.9.0`, now rendered in both themes. Individual `/notes/[slug]` pages are governed by *Detail pages — Bench Log*. The index uses **Read mode**: its routing form helps visitors locate an engineering question or project thread, while the note record remains the destination.

**Direction record.** The approved direction is **Routed Signal Map**, candidate `7 / 7` from surface seed `be3086ea`. Machine-local Impeccable comps and screenshots may record the review process, but `.impeccable/` is excluded from Git and cannot serve as cross-device evidence. This section, the bundled font provenance, and the shipping implementation are the durable record; generated review images never ship as interface or note evidence.

### Tonal field and typography

- The index uses the shared tonal steps: surface-deep for the net ground and opening band, surface-panel for routing panels and control fills, surface-raised for hover, and fine foreground rules at several low opacities. Neutral text steps from warm white (warm ink in Bench Paper) through the `t1`–`t6` ramp so headings, summaries, labels, and tertiary metadata remain distinct without introducing another accent.
- Ember orange remains the only selected navigation signal. It may illuminate a chosen channel, its routed line, control state, ledger edge, matching record stems, focus treatment, and row interaction; it must not become routine body copy or a broad panel fill.
- English headings and note titles use the self-hosted Barlow Condensed display face. Chinese headings and note titles use the same explicit PingFang SC, Microsoft YaHei, and system sans stack as the Media title surfaces, at a semibold weight for legibility. The former ZCOOL QingKe HuangYou subset and SIL OFL record remain archived in `app/fonts/` as provenance for the earlier `v0.9.0` treatment, but the current runtime does not load them. Body copy remains the native UI sans stack, while indices, counts, dates, tags, and control labels use the mono stack.

### Routed index topology

- The compact opening band states the archive scope without becoming a second hero. The three values are derived from public notes, their linked projects, and available frontmatter years. With the 2026-09-07 note release they are `25 / 8 / 2` (public notes / linked projects / years); they must follow the content data.
- On wide screens, one stepped route stem per available project channel leaves the project-channel column, join one graphite bus, pass the search, project, and year junctions, and converge at the note ledger. The visible geometry explains how to navigate the index; native controls and semantic list links remain the operative interface.
- Selecting a project creates one continuous, unmasked orange navigation path by lighting the selected stepped graphite stem, the corresponding prefix of the existing zig-zag bus, and that project's graphite branch into the ledger. The orange route never invents a perimeter shortcut. Its endpoint advances down the ledger edge for each successive project, so lower channel selections visibly extend the route instead of leaving a fixed full-height line. Only junctions the selected route has reached illuminate; the ledger edge and only the records linked to that project receive the matching orange continuation. Search and year filters update the real result set and their control states without inventing additional signal paths.
- Each ledger row is one full semantic link carrying the real sequence number, linked project, frontmatter date, bilingual title and summary, and up to three visible tags. The row's node, underline, title shift, and arrow act as one hover/focus cue; they do not split the destination into competing actions.

### Motion, responsive behavior, and meaning

- Bounded channel and row resolves, the selected-node pulse, and dashed active-route travel explain assembly and current selection. They are decorative navigation feedback only; the former full-height orange entry sweep is intentionally absent because it read as a transient loading frame during navigation. Under `prefers-reduced-motion: reduce`, the same channels, selected path, junctions, ledger edge, matching records, focus states, and result counts remain visible as a complete static equivalent; stagger, pulse, dash travel, and transform transitions stop.
- Note titles use the full ledger width instead of an arbitrary character cap. At wide desktop widths they stay on one line; narrower desktop, tablet, and mobile layouts restore natural wrapping, with emergency word breaking only on mobile to prevent horizontal overflow.
- The first desktop viewport stays compact enough to show the shared header, scope band, all eight project channels, search/project/year controls, and the opening ledger records together. At intermediate widths the ledger moves below the two control columns and the decorative route map recedes. On mobile, the topology collapses into document order: scope, a two-column grid of eight project channels, stacked controls, then the full-width ledger. No route or control depends on horizontal scrolling.
- On wide screens, Project channels and Route controls form a stable control deck with a shared `37.625rem` minimum depth; changing the result set may grow or shrink only the note ledger, not those two columns. The search, linked-project, and year boxes terminate at their own borders without decorative trailing rules. Below the three-column breakpoint, both control regions return to the existing responsive flow rather than reserving desktop-height empty space.
- The counters, channel quantities, filters, and ledger records are derived from repository content. Frontmatter dates provide archive sorting and filtering metadata only; neither date order nor line travel implies an engineering timeline, live telemetry, progress, completion, status, throughput, or measurement. Motion and orange state must never manufacture evidence.

## `/about` — Online CV

The `/about` route uses **Read mode** inside the shared Kinetic Signal Ledger shell, in both themes. Since 2026-10-16 it is Alvin's online CV in his own voice: who he is, how he came to embedded hardware, what he works on now, and who he is away from the bench. It replaced the earlier Tension Signal Column (four-node load path and single pulse), which repeated the same hardware-to-handoff chain four times and read as model-written.

### Content and order

- **Hero.** Mono `01 · About` eyebrow, `Alvin Li`, the tongue-in-cheek statement "The whole world is just one giant embedded system / 这个世界就是一台巨大的嵌入式", one first-person introduction, and the portrait plate.
- **Embedded-world ticker.** One band of everyday-to-extreme embedded systems (traffic lights through lithography machines), echoing the hero statement. It is illustration, not a claim about Alvin's work.
- **02 我走的路 / The Road So Far.** A sticky story column (how the turn from telecommunications happened, plus the XJTLU Hardware Studio role) beside a dated timeline whose stops link to the matching `/work/[slug]` pages. Each stop gets one or two sentences; project detail stays on the project pages.
- **03 在做的事 / Work in Progress.** Current NTU study and lab work, the control and signal-processing algorithms he uses, the embodied-AI direction, and an availability note (student-pass hours; RA or part-time roles). A decorative scope figure beside it shows a raw trace and a clean lock-in trace.
- **04 认真之余 / Off the Clock.** Hobby chips and two paragraphs on working with AI. The Chinese text may carry the internet meme the owner asked for; English keeps only the floor-and-ceiling idea.
- **Say Hello / 保持联系.** Email, GitHub and LinkedIn, each exactly once. Education stays on the homepage and is not repeated here.
- English headings are idiomatic adaptations of the Chinese ones, never literal translations. Section headings name their content plainly; no metaphor headings.

### Portrait and motion

**The original-portrait rule.** `public/uploads/projects/avatar.jpg` is the shipping identity asset, with SHA-256 `19fc1f897595b113d413f34f1b3b99689c91213ae8fdcfad0f3bf81736939fc2`. Preserve its complete square white field and black line art with contain fitting; never crop, invert, recolor, filter, blend, fade, trace, or replace it with generated artwork. The plate stays white in both themes. Motion lives only in the dashed orbit drawn behind the plate.

**Motion.** The hero rises in with CSS alone. `components/about-motion.tsx` reveals later blocks as they enter the viewport, fills the timeline rail and lights each stop as the reader passes it, and runs the portrait orbit, ticker and scope only while each is visible and the document is shown. Under `prefers-reduced-motion: reduce` nothing is hidden or moves: the ticker becomes a static wrapped list and every block is visible. Hover adds small lifts and arrow nudges only on fine pointers. All colour comes from theme tokens, so the signal is ember in Ember Black and cobalt in Bench Paper.

### Responsive and evidence boundaries

Below 980px every two-column block stacks in document order and the sticky columns become static. Timeline stops, hobbies and contacts reflow to one column on phones. No content depends on hover, motion or horizontal scrolling.

Biographical, employment, project and current-study statements follow the owner-confirmed brief (summarised in `docs/active-work/portfolio-copy-rewrite.md`), the project pages and his public LinkedIn profile. The ticker and scope figure are presentation only and never strengthen a factual claim.

## Detail pages — Bench Log

Every `/work/[slug]` project page and `/notes/[slug]` note page uses the **Bench Log** layout in **Read mode**, in both themes. The page reads as one entry in Alvin's bench log: a numbered masthead and a margin index of entries in the order the work happened, around a calm reading column. It refuses the generic blog article (rounded cards, system-sans title, colored links, grid-paper ground). The direction contract is the surface brief for `app/work/[slug]/page.tsx`; this section and the shipping implementation (`app/globals.css` Bench Log block, `components/bench-log-rail.tsx`, `components/bench-log.module.css`, `components/content-renderer.tsx`) are the durable record.

### Margin rail and contents strip

- On desktop, a 248px sticky margin rail sits left of the article, below the header, with a 1px rule on its right edge. It lists one `§NN` entry per `h2` of the active language (language-scoped headings are counted per language), each with a mono number and the heading text, on a 1px vertical spine.
- Each entry has a small square marker: unread is an outlined square on the canvas, read is filled `t4`, and the current entry is filled ember, with the current number in ember text, a warm 600-weight title, and `aria-current="location"`, so the state never depends on the square alone. A mono uppercase back link in ember text closes the rail.
- At 1023px and below the rail becomes a sticky strip under the header: the current `§NN`, the current title, one progress square per entry (or an `NN/NN` counter when there are more than 12 entries), and a `Contents` disclosure that opens the full entry list and closes when an entry is chosen.

### Masthead

- One solid ember plate per page, set beside the Barlow title, with on-ember display numerals. On a project page the plate is the project's number; on a note page it is the note's number within its project (in the project page's development-note order), with a `Note 01 / 02` ledger row. The numerals sit optically centred: a fixed-height grid plate, `text-box: trim-both cap alphabetic`, and proportional numerals. There is no eyebrow kicker above the title.
- The title row spans the whole article width so long titles stay on one or two lines. The English title is uppercase Barlow at a 0.96 line-height; Chinese uses `display-cjk` at 700 with an independent size and 1.2 line-height. Below 640px both titles step down (English about 2–2.5rem at line-height 1) so long titles wrap in three lines or fewer.
- Under the title, the page splits into a reading column and a sticky side ledger (280–340px) that runs the full length of the body, so the right side of a wide screen always carries the project record. The lede opens the reading column at about 64ch in `t1`.
- The side ledger opens with a 2px warm rule and separates rows with 1px rules: uppercase `t4` mono labels, `t1` values with tabular figures, status in ember text, tags as 1px-outlined chips, and ember-text links for public files. On project pages a compact development-notes list follows it; on note pages the ledger holds the project link, date, and tags, followed by the project's other notes.
- At 1180px and below the side ledger stops being sticky and sits between the lead figure and the body (lede, figure, ledger, body); its notes list is dropped because the related-records ledger follows the body. At 640px and below the spec becomes a two-column ledger, short rows pair up, and the Project row is hidden because the plate and title already carry it.

### Lead figure

**Cover rule.** Every project has exactly one cover card, shown on `/work`, in the `/work` rail, in the homepage project index, and as the project page's `FIG. 01` (the `/work` image morphs into it). Company or internship experience (`coverKind: "company"`) uses the company's logo; personal work (`coverKind: "render"`) uses the board's EDA 3D render, or the closest equivalent when no render exists (the course-kit photo and the Tinkercad wiring view of the two Arduino projects). Cards are normalized transparent WebP files: the subject is separated from its background, cropped, and centred on a 1600×1200 canvas at roughly 42% of the area (never wider than 84% or taller than 78%), so logos and boards carry the same visual weight. The mat is CSS, not pixels: the image-well token (light `#EEF4FD`, dark `#10100E`). A logo that does not read on one of the mats ships a second `coverDark` card in a reversed colourway (white type for dark, navy type for light); `ProjectCover` renders both and the theme shows one. `scripts/validate-content.mjs` checks `cover`, `coverDark` and `coverKind`. The lead figure is a 16:9 image well with a 1px rule at the head of the reading column, after the lede; below 1180px it sits between the lede and the ledger. It shares the `project-figure-<slug>` transition name with the `/work` chapter image.

### Reading column

- Project and note reading text (lede, paragraphs, list items) is justified: Chinese spreads by character on a slightly tightened `-0.02em` base tracking so it still reads close-set, and English hyphenates (`hyphens: auto`, `text-justify: inter-word`) so word gaps stay even.
- Running text, the lede, figures, code blocks, and tables all share the full reading-column width (about 666px at 1440), so justified text and figures line up at both edges. Text sets at 17px with a 1.75 line-height (1.9 in Chinese), in `t1`. The owner asked for the edges to match once the text was justified.
- Each `h2` opens with a 1px rule and is set inline with an ember-text mono `§NN` counter that matches the rail. `h3` and `h4` use the body face at a heavier weight.
- Figures are numbered `FIG. NN` in ember-text mono, continuing from the lead figure, and sit in the image well.
- Code blocks use the code token with a 1px border and a mono label bar; inline code uses a faint foreground tint. Tables open with a 2px warm rule and use tabular figures. Quotes are a faint ember-tinted field with a 1px ember border. Bullet lists use square markers and numbered lists use leading-zero numerals, both in ember-text mono.
- **The no-left-bar rule.** No element in the reading column uses a thick colored left border. Rules are 1px and horizontal, or a full 1px frame.
- **The zero-radius rule.** Every Bench Log surface, figure, chip, and control is square.

### Related records

The related-notes ledger, public files, and related media use the same grammar: Barlow section titles with 1px-outlined mono counts, 1px row rules, one full-row link per note with its index, copy, and arrow, image-well media tiles in an auto-fill grid of 220px minimum, and sharp ember-outline actions that fill with ember and on-ember text on hover. The ledger, its counts, and its links come from repository content; the layout adds no claims.
