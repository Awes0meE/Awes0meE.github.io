---
name: Kinetic Signal Ledger
description: Homepage-scoped Ember Black visual system for Alvin Li's bilingual, evidence-calibrated iRidium engineering portfolio.
scope:
  branch: feat/frontend-refresh
  appliesTo: homepage only
  excludes: project, note, media, and about routes retain the existing paper system
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

This document is the design authority for the homepage work on the separate `feat/frontend-refresh` topic branch. The branch redesigns the homepage only and is not a released sitewide theme. Project, note, media, about, and detail routes retain the existing light paper system unless a future, separately approved redesign changes their scope.

Homepage-only Ember Black rules must remain attached to the homepage scope. Shared components may respond to that scope, but the dark system must not leak into the rest of the site.

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

**The primary-signal rule.** Ember is the only saturated color used broadly across homepage interface state: primary actions, focus, directional marks, key rules, and selected controls. It must not become routine paragraph color or a blanket surface fill.

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

`SiteHeader` and `SiteFooter` remain shared components. Homepage-only Ember Black styling is scoped through the homepage body state; do not fork the components or apply the dark treatment to paper-system routes.

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
- Do not propagate the homepage dark system onto routes that remain in the paper design.
