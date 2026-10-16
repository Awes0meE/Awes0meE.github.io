"use client";

import { useEffect, useRef } from "react";

/**
 * Motion driver for /about. The page stays server-rendered; this island only
 * toggles data attributes that the CSS module reads:
 * - [data-reveal] gains data-visible once it scrolls into view;
 * - [data-motion-region] runs only while visible and the document is shown;
 * - [data-road] receives --road-progress and lights the stops already passed.
 * Under prefers-reduced-motion nothing is hidden and nothing moves.
 */
export function AboutMotion() {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = anchorRef.current?.closest("main");

    if (!root) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return;
    }

    root.dataset.motionReady = "true";

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            revealObserver.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => revealObserver.observe(node));

    const regions = Array.from(root.querySelectorAll<HTMLElement>("[data-motion-region]"));
    const regionVisible = new Map<Element, boolean>();
    const syncRegions = () => {
      const shown = document.visibilityState === "visible";
      for (const region of regions) {
        region.dataset.motion = shown && regionVisible.get(region) ? "running" : "paused";
      }
    };
    const regionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        regionVisible.set(entry.target, entry.isIntersecting);
      }
      syncRegions();
    });
    regions.forEach((region) => regionObserver.observe(region));
    document.addEventListener("visibilitychange", syncRegions);

    const road = root.querySelector<HTMLElement>("[data-road]");
    const stops = road ? Array.from(road.querySelectorAll<HTMLElement>("[data-road-stop]")) : [];
    let frame = 0;
    const syncRoad = () => {
      frame = 0;
      if (!road) {
        return;
      }
      const line = window.innerHeight * 0.62;
      const box = road.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (line - box.top) / box.height));
      road.style.setProperty("--road-progress", progress.toFixed(4));
      for (const stop of stops) {
        stop.dataset.lit = stop.getBoundingClientRect().top + 14 < line ? "true" : "false";
      }
    };
    const requestRoad = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(syncRoad);
      }
    };
    syncRoad();
    window.addEventListener("scroll", requestRoad, { passive: true });
    window.addEventListener("resize", requestRoad);

    const stopMotion = () => {
      if (reducedMotion.matches) {
        delete root.dataset.motionReady;
        regions.forEach((region) => (region.dataset.motion = "paused"));
      }
    };
    reducedMotion.addEventListener("change", stopMotion);

    return () => {
      revealObserver.disconnect();
      regionObserver.disconnect();
      document.removeEventListener("visibilitychange", syncRegions);
      window.removeEventListener("scroll", requestRoad);
      window.removeEventListener("resize", requestRoad);
      reducedMotion.removeEventListener("change", stopMotion);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return <span ref={anchorRef} hidden />;
}
