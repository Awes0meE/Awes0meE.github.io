# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary users are hiring managers and engineering leads evaluating Alvin Li for embedded systems, robotics hardware, motor-drive, power-electronics, and adjacent engineering roles. Academic mentors and engineering peers are secondary readers who may inspect the work in greater technical depth.

The primary evaluation is time-constrained: within roughly three to five minutes, a reader should be able to understand Alvin's engineering direction, identify representative work, and decide whether to inspect the supporting evidence or make contact.

## Product Purpose

This is Alvin Li's bilingual engineering portfolio and the public iRidium / 铱 engineering archive. It makes projects, engineering notes, media, and selected source artifacts available in one place so visitors can evaluate work spanning schematic capture, PCB layout, firmware, board bring-up, hardware–firmware integration, motor drives, power conversion, and bench validation.

Success means that a relevant visitor can quickly verify the breadth and depth of the work, understand the limits of each claim, and feel confident contacting Alvin or inviting him to an interview.

## Positioning

The portfolio is an evidence-calibrated engineering archive rather than a gallery of polished outcomes. It connects project narratives to schematics, board renders, firmware excerpts, measurements, bring-up records, failure analysis, test media, and selected files while keeping personal contribution, direct measurement, recollection, client feedback, inference, and unfinished work distinct.

## Operating Context

Visitors enter through the homepage or the project index, then move between project case studies, related learning notes, media, and public technical files. Project pages may expose a two-pane file browser for reviewing selected artifacts without leaving the case study. The global language control switches fixed interface copy and bilingual metadata between Simplified Chinese and English; long-form MDX content may contain explicit language sections.

The public site is deployed on Vercel and uses `https://www.66ccff-labs.com/` as its production domain. The source repository is also part of the public evidence surface, so material that is private cannot be protected merely by hiding it from site navigation.

The design iteration active on the separate `feat/frontend-refresh` topic branch as of `2026-08-20` is intentionally homepage-only and is not released. It must not be described as a redesign of the project index, project details, notes, media, about page, or production site.

## Capabilities and Constraints

- Preserve the public routes for the homepage, projects, project details, notes, note details, media, and about page.
- Preserve the existing Next.js 16.3 App Router, React 19, TypeScript, Tailwind CSS, local MDX, and JSON content architecture unless a future technical task explicitly changes it.
- Support both Simplified Chinese and English, as well as desktop and mobile browsing.
- Preserve the existing project, note, media, and public-file relationships, including `projectSlug`, `assetPaths`, visibility controls, and server-side file-safety limits.
- Treat `visibility: private` as a navigation control, not a repository privacy boundary. Files under `public/uploads/` are public after deployment.
- Do not publish private financial, billing, proof, credential, installer, vendor, dependency, build-output, complete reconstructable product source, or other restricted material.
- Do not fabricate outcomes, measurements, benchmarks, customers, testimonials, ownership, deployment, or validation. Keep incomplete work and evidentiary limits visible.
- Page structure, information architecture, hierarchy, and copy density may be refactored as long as the confirmed product truth and evidence boundaries remain intact.
- Animated homepage presentation must retain a useful static state under reduced-motion preferences and must not make evidence claims through motion alone.

## Brand Commitments

- The reader-facing personal identity is `Alvin Li`.
- The engineering archive and future venture brand is exactly `iRidium / 铱`; the English spelling is lowercase `i`, uppercase `R`, followed by lowercase `idium`.
- The header uses the English `iRidium` wordmark in both language modes. Approved brand assets live under `public/brand/` and must not be silently redrawn or distorted.
- The public identity leads with robotic-systems hardware and embedded engineering. Current student status provides context but is not the primary headline.
- Education facts must remain accurate: MSc Robotics and Intelligent Systems at Nanyang Technological University, Singapore; BEng Telecommunications Engineering from Xi'an Jiaotong-Liverpool University; and BEng (Hons) Telecommunications Engineering with First Class Honours from the University of Liverpool.
- Public contact surfaces expose the GitHub profile and `ZHIYI012@e.ntu.edu.sg`; location remains omitted.
- The voice is precise, first-person, and engineering-led. It distinguishes archive/design evidence, direct measurement, recollection, client-reported information, inference, and unfinished work.

## Evidence on Hand

- Bilingual project case studies under `content/projects/` and engineering notes under `content/notes/`.
- Project-linked images and videos indexed through `content/media.json` and stored under `public/uploads/`.
- Selected schematics, PCB renders, fabrication files, BOMs, datasheets, firmware excerpts, logs, reports, test photographs, and demonstration media attached to individual projects.
- Public examples include the STM32F446/DRV8301 sensorless-FOC learning route, commissioned Claude Chime power hardware, Juanyun thermal-management hardware, Nanjing Turing Qt/Seamly2D work, Tianjin STM32 learning work, and Arduino course projects.
- Approved iRidium identity assets under `public/brand/` and education marks under `public/education/`.
- Five hardware presentation derivatives under `public/uploads/hero/`. Release `v0.8.0` used them in a five-card mosaic; the separate `2026-08-20` topic-branch checkpoint reuses them in a prototype nucleus. These derivatives are visual presentation, not exact component, fabrication, bring-up, measurement, or validation evidence.
- Representative technology marks under `public/skills/icons/`, with source, derivative, trademark, and non-affiliation notes in `public/skills/icons/README.md`. They identify technologies in the homepage orbit but do not prove project use, proficiency, endorsement, affiliation, or any engineering result.
- There are no approved general testimonials, universal performance benchmarks, production-volume claims, or completed sensorless-takeover claims. Future work must not invent them.

## Product Principles

1. Let inspectable engineering evidence carry more weight than self-description.
2. Make technical depth easy to enter quickly without flattening the underlying work.
3. Keep claims proportional to what the surviving files, measurements, and first-person account can support.
4. Preserve one coherent bilingual identity across projects, notes, media, and contact surfaces.
5. Make limitations, failures, and unfinished validation part of the engineering record rather than hiding them.
