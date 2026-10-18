import type { ReactElement } from "react";
import { ViewTransition } from "react";

const routeMotion = {
  "nav-forward": "entry-forward",
  "nav-back": "entry-back",
  default: "none"
};

/**
 * Page-level view transition. Links into a project or note carry the
 * `nav-forward` type, back links carry `nav-back`; untyped navigations
 * (browser history, refresh) swap without directional motion.
 * The child must be a single DOM element such as `<main>`. The motion itself runs on the
 * root snapshot (see the `main` rule in `app/globals.css`): main keeps no snapshot of its
 * own, because Safari renders a named element's snapshot at its full page height.
 */
export function RouteStage({ children }: { children: ReactElement }) {
  return (
    <ViewTransition enter={routeMotion} exit={routeMotion} default="none">
      {children}
    </ViewTransition>
  );
}

/** Pairs the /work chapter image with the project page's lead figure. */
export function ProjectFigureTransition({ slug, children }: { slug: string; children: ReactElement }) {
  return (
    <ViewTransition name={`project-figure-${slug}`} share="project-figure" default="none">
      {children}
    </ViewTransition>
  );
}
