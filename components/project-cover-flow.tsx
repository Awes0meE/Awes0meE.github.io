"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, type CSSProperties, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { tagZh } from "@/lib/tags";
import { PROJECT_FIGURE_SIZES, ProjectCover } from "@/components/project-cover";
import { ProjectFigureTransition } from "@/components/route-stage";
import type { ProjectMedia } from "@/lib/content";
import styles from "./project-cover-flow.module.css";

export type CoverFlowItem = {
  slug: string;
  title: string;
  titleZh: string;
  shortTitle: string;
  shortTitleZh: string;
  status: string;
  statusZh: string;
  timeline: string;
  timelineZh: string;
  tags: string[];
  cover: ProjectMedia;
};

type ProjectCoverFlowProps = {
  items: CoverFlowItem[];
};

const pad = (value: number) => String(value).padStart(2, "0");

/** Pinned scroll before the first and after the last cover, in steps. Keep in sync with the CSS height. */
const HOLD = 0.2;

/** "Hit the wall" spring after a wheel gesture reaches an end: a push past the end that settles back. */
const bounceOffset = (elapsed: number) => (elapsed > 720 ? 0 : 0.3 * Math.exp(-elapsed / 170) * Math.sin(elapsed / 90));

function scrollToCover(root: HTMLElement, step: number, index: number, last: number, smooth: boolean) {
  const clamped = Math.min(last, Math.max(0, index));
  const offsetTop = parseFloat(getComputedStyle(root).getPropertyValue("--cf-top") || "0");
  const top = root.getBoundingClientRect().top + window.scrollY - offsetTop + (clamped + HOLD) * step;
  window.scrollTo({ top: Math.round(top), behavior: smooth ? "smooth" : "auto" });
}

/**
 * Homepage project wheel. While the section is pinned, page scroll turns the covers along
 * an arc over the hero's moving light field; the legend hides while the wheel is between
 * two covers. A wheel gesture that reaches the first or last cover stops there with a
 * spring; the next gesture carries on. Under reduced motion the CSS lays the same links out
 * as a flat grid and this component never animates.
 */
export function ProjectCoverFlow({ items }: ProjectCoverFlowProps) {
  const rootRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tickRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const legendRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const stepCountRef = useRef<HTMLSpanElement>(null);
  const flowRef = useRef({ active: false, step: 1, current: 0, target: 0, shown: -1 });
  const count = items.length;
  const last = count - 1;

  const render = useCallback(
    (position: number) => {
      const resting = Math.min(last, Math.max(0, position));
      const nearest = Math.round(resting);
      const settle = Math.max(0, 1 - Math.abs(resting - nearest) * 2.6);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const offset = index - position;
        card.style.setProperty("--d", offset.toFixed(4));
        card.style.setProperty("--ad", Math.abs(offset).toFixed(4));
        const z = String(100 - Math.round(Math.abs(offset) * 10));
        if (card.style.zIndex !== z) card.style.zIndex = z;
      });

      legendRef.current?.style.setProperty("--settle", (settle * settle).toFixed(4));

      const state = flowRef.current;
      captionRefs.current.forEach((caption, index) => {
        if (!caption) return;
        caption.style.setProperty("--settle", index === nearest ? settle.toFixed(4) : "0");
      });

      if (state.shown !== nearest) {
        state.shown = nearest;
        captionRefs.current.forEach((caption, index) => caption?.toggleAttribute("data-active", index === nearest));
        cardRefs.current.forEach((card, index) => card?.toggleAttribute("data-active", index === nearest));
        tickRefs.current.forEach((tick, index) => {
          if (!tick) return;
          if (index === nearest) tick.setAttribute("aria-current", "true");
          else tick.removeAttribute("aria-current");
        });
        for (const node of [counterRef.current, stepCountRef.current]) {
          if (node) node.textContent = pad(nearest + 1);
        }
      }
    },
    [last]
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const state = flowRef.current;
    let frame = 0;
    let near = false;
    let raw = 0;
    let idle = 0;
    // Layout values cached by measure(), so scroll and wheel handlers never force a layout.
    let sectionTop = 0;
    let headerHeight = 0;
    // Wheel tracking for the end stop.
    let lastWheelAt = 0;
    let lastWheelAbs = 0;
    let lastWheelDir = 0;
    let headingY = 0;
    let blockedSince = 0;
    let blockDir = 0;
    let passDir = 0;
    let bounceDir = 0;
    let bounceAt = 0;
    let scrollDir = 0;

    const measure = () => {
      const header = document.querySelector<HTMLElement>(".site-header");
      headerHeight = Math.round(header?.getBoundingClientRect().height ?? 0);
      root.style.setProperty("--cf-top", `${headerHeight}px`);
      const stage = root.firstElementChild as HTMLElement | null;
      state.step = Math.max(1, (root.offsetHeight - (stage?.offsetHeight ?? 0)) / Math.max(1, last + HOLD * 2));
      sectionTop = root.getBoundingClientRect().top + window.scrollY;
    };

    const rawAt = (y: number) => (y - sectionTop + headerHeight) / state.step - HOLD;
    const yAt = (value: number) => sectionTop - headerHeight + (value + HOLD) * state.step;

    // Inside the short holds past either end the wheel gives a little, like a rubber band.
    const band = (overshoot: number) => 0.08 * (1 - Math.exp(-overshoot * 8));
    const readTarget = () => {
      raw = rawAt(window.scrollY);
      state.target = raw > last ? last + band(raw - last) : raw < 0 ? -band(-raw) : raw;
    };

    const tick = () => {
      frame = 0;
      const delta = state.target - state.current;
      state.current = Math.abs(delta) < 0.0008 ? state.target : state.current + delta * 0.16;
      const elapsed = performance.now() - bounceAt;
      const bouncing = bounceDir !== 0 && elapsed < 720;
      render(state.current + (bouncing ? bounceDir * bounceOffset(elapsed) : 0));
      if (!bouncing) bounceDir = 0;
      if ((state.current !== state.target || bouncing) && near && !document.hidden) frame = requestAnimationFrame(tick);
    };

    const run = () => {
      if (!frame && near && !document.hidden) frame = requestAnimationFrame(tick);
    };

    // Settling moves only forward, in the direction the visitor was scrolling.
    const scrollToRaw = (value: number) => {
      const top = scrollDir > 0 ? Math.ceil(yAt(value)) : Math.floor(yAt(value));
      if ((top - window.scrollY) * scrollDir <= 0) return;
      window.scrollTo({ top, behavior: "smooth" });
    };

    // When scrolling rests between two covers, ease on to the next cover in the direction the
    // visitor was scrolling. The page is never moved back against them, and nothing moves once
    // they are past either end cover.
    const settle = () => {
      if (!state.active || !near || !scrollDir || raw <= 0 || raw >= last) return;
      // Within 2% of a cover counts as on it, so a landing a pixel past it never chains on.
      const ahead = scrollDir > 0 ? Math.ceil(raw - 0.02) : Math.floor(raw + 0.02);
      if (Math.abs(raw - ahead) > 0.02) scrollToRaw(Math.min(last, Math.max(0, ahead)));
    };

    const wake = () => {
      if (!state.active) return;
      const before = raw;
      readTarget();
      if (Math.abs(raw - before) > 0.001) scrollDir = Math.sign(raw - before);
      // Once the wheel is back among the covers, the next end stop applies again.
      if (passDir > 0 ? raw < last - 0.6 : passDir < 0 ? raw > 0.6 : false) passDir = 0;
      window.clearTimeout(idle);
      idle = window.setTimeout(settle, 180);
      run();
    };

    // End stop. A wheel or trackpad gesture that carries the wheel onto the first or last
    // cover stops there and the covers spring once, like hitting a wall. Only two things are
    // dropped: further scrolling for 260ms after the hit, and a trackpad's decaying momentum
    // tail. Any other input (a new flick, a fresh wheel notch after the wall, a turn) passes
    // at once and carries on past the end; nothing is blocked away from the end cover and
    // nothing scrolls against the visitor.
    // Browsers animate wheel scrolling, so the live position lags a fast flick; the stop
    // tracks where the gesture is heading so it acts before the page could overshoot.
    const onWheel = (event: WheelEvent) => {
      if (!state.active || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const now = performance.now();
      const dy = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
      const dir = Math.sign(dy);
      if (!dir) return;
      const abs = Math.abs(dy);
      const gap = now - lastWheelAt;
      // Trackpad momentum never grows and repeats only small values; mouse notches repeat large ones.
      const momentum = dir === lastWheelDir && gap < 100 && (abs < lastWheelAbs || (abs === lastWheelAbs && abs < 40) || abs <= 3);
      if (gap > 180 || dir !== lastWheelDir) headingY = window.scrollY;
      lastWheelAt = now;
      lastWheelAbs = abs;
      lastWheelDir = dir;
      if (dir !== passDir) passDir = 0;

      if (blockedSince) {
        const edge = blockDir > 0 ? last : 0;
        // Still on the last stretch before the end cover (the live position may lag the stop).
        const gap = (edge - rawAt(window.scrollY)) * blockDir;
        const atEdge = gap > -HOLD - 0.05 && gap < 1.05;
        const held = now - blockedSince < 260 || (momentum && now - blockedSince < 3000);
        if (dir === blockDir && atEdge && held) {
          event.preventDefault();
          return;
        }
        blockedSince = 0;
        passDir = dir === blockDir ? dir : 0;
        headingY = window.scrollY;
      }

      const heading = rawAt(headingY);
      const next = rawAt(headingY + dy);
      const crosses = dir > 0 ? heading < last - 0.03 && next > last : heading > 0.03 && next < 0;
      if (!crosses || passDir === dir) {
        headingY += dy;
        return;
      }

      event.preventDefault();
      blockedSince = now;
      blockDir = dir;
      bounceDir = dir;
      bounceAt = now;
      // The blocked event would have carried past the end; finish the move onto the end cover,
      // but only forward: if the page is already at or past it, leave it where it is.
      const edge = dir > 0 ? last : 0;
      if ((edge - rawAt(window.scrollY)) * dir > 0.01) scrollToRaw(edge);
      run();
    };

    const setMode = () => {
      state.active = !reduced.matches;
      root.toggleAttribute("data-flow", state.active);
      if (state.active) {
        measure();
        readTarget();
        state.current = state.target;
      }
      render(state.active ? state.current : 0);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        root.toggleAttribute("data-near", near);
        wake();
      },
      { rootMargin: "25% 0px" }
    );
    const resize = new ResizeObserver(() => {
      if (!state.active) return;
      measure();
      wake();
    });
    const onWindowResize = () => {
      if (!state.active) return;
      measure();
      wake();
    };

    setMode();
    observer.observe(root);
    resize.observe(root);
    if (root.previousElementSibling) resize.observe(root.previousElementSibling);
    const stage = root.firstElementChild as HTMLElement | null;
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", onWindowResize, { passive: true });
    // Only the pinned stage listens to the wheel, so scrolling elsewhere on the page never waits on it.
    stage?.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("visibilitychange", wake);
    reduced.addEventListener("change", setMode);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(idle);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", onWindowResize);
      stage?.removeEventListener("wheel", onWheel);
      document.removeEventListener("visibilitychange", wake);
      reduced.removeEventListener("change", setMode);
    };
  }, [last, render]);

  const goTo = useCallback(
    (index: number, smooth = true) => {
      const root = rootRef.current;
      if (!root || !flowRef.current.active) return;
      scrollToCover(root, flowRef.current.step, index, last, smooth);
    },
    [last]
  );

  const onCardClick = (index: number) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!flowRef.current.active || index === flowRef.current.shown) return;
    event.preventDefault();
    goTo(index);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!flowRef.current.active) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = flowRef.current.shown + (event.key === "ArrowRight" ? 1 : -1);
    goTo(next);
    cardRefs.current[Math.min(last, Math.max(0, next))]?.focus({ preventScroll: true });
  };

  // Horizontal swipe or drag on the wheel steps one cover; vertical stays native scroll.
  const swipe = useRef<{ x: number; y: number; id: number } | null>(null);
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!flowRef.current.active || event.button !== 0) return;
    swipe.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
    suppressClick.current = true;
    goTo(flowRef.current.shown + (dx < 0 ? 1 : -1));
  };
  const suppressClick = useRef(false);
  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!suppressClick.current) return;
    suppressClick.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <section
      ref={rootRef}
      id="project-evidence"
      className={styles.flow}
      style={{ "--cf-count": count } as CSSProperties}
      aria-labelledby="project-index-title"
      onKeyDown={onKeyDown}
    >
      <div className={styles.stage}>
        <div className={styles.field} aria-hidden="true">
          <span className={`${styles.glow} ${styles.glowA}`} />
          <span className={`${styles.glow} ${styles.glowB}`} />
          <span className={`${styles.glow} ${styles.glowC}`} />
          <span className={`${styles.glow} ${styles.glowD}`} />
        </div>

        <span
          ref={legendRef}
          className={styles.legend}
          aria-hidden="true"
        >
          <BilingualText en="Projects" zh="项目" />
        </span>

        <header
          className={`signal-section-header ${styles.header}`}
        >
          <h2 id="project-index-title">
            <BilingualText en="Projects" zh="项目" />
          </h2>
          <span className={styles.counter} aria-hidden="true">
            <span ref={counterRef}>01</span> / {pad(count)}
          </span>
          <Link href="/work">
            <BilingualText en="All projects" zh="全部项目" />
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </header>

        <div
          className={styles.wheel}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            swipe.current = null;
          }}
          onClickCapture={onClickCapture}
        >
          {items.map((item, index) => (
            <Link
              key={item.slug}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              href={`/work/${item.slug}`}
              transitionTypes={["nav-forward"]}
              className={styles.card}
              style={{ "--d": index, "--ad": index, zIndex: 100 - index * 10 } as CSSProperties}
              data-active={index === 0 ? "" : undefined}
              onClick={onCardClick(index)}
              onFocus={(event) => {
                // Keyboard focus brings the cover to the centre; pointer clicks are handled on click.
                if (flowRef.current.shown !== index && event.currentTarget.matches(":focus-visible")) goTo(index, false);
              }}
              draggable={false}
            >
              <ProjectFigureTransition slug={item.slug}>
                <span className={styles.cover}>
                  <ProjectCover media={item.cover} alt="" sizes={PROJECT_FIGURE_SIZES} preload={index === 0} />
                </span>
              </ProjectFigureTransition>
              <span className={styles.cardIndex} aria-hidden="true">{pad(index + 1)}</span>
              <span className={styles.cardLabel}>
                <strong>
                  <span className="sr-only">{pad(index + 1)} / {pad(count)} · </span>
                  <BilingualText en={item.title} zh={item.titleZh} />
                </strong>
                <small>
                  <BilingualText en={`${item.status} · ${item.timeline}`} zh={`${item.statusZh} · ${item.timelineZh}`} />
                </small>
              </span>
            </Link>
          ))}
        </div>

        <div
          className={styles.captions}
          aria-hidden="true"
        >
          {items.map((item, index) => (
            <div
              key={item.slug}
              ref={(node) => {
                captionRefs.current[index] = node;
              }}
              className={styles.caption}
              data-active={index === 0 ? "" : undefined}
              style={{ "--settle": index === 0 ? 1 : 0 } as CSSProperties}
            >
              <Link href={`/work/${item.slug}`} transitionTypes={["nav-forward"]} className={styles.captionTitle} tabIndex={-1}>
                <BilingualText en={item.title} zh={item.titleZh} />
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <p className={styles.captionMeta}>
                <span><BilingualText en={item.status} zh={item.statusZh} /></span>
                <span><BilingualText en={item.timeline} zh={item.timelineZh} /></span>
                <span>
                  <BilingualText en={item.tags.slice(0, 3).join(" / ")} zh={item.tags.slice(0, 3).map(tagZh).join(" / ")} />
                </span>
              </p>
            </div>
          ))}
        </div>

        <div
          className={styles.controls}
        >
          <button type="button" className={styles.step} onClick={() => goTo(flowRef.current.shown - 1)}>
            <ArrowLeft size={18} aria-hidden="true" />
            <span className="sr-only"><BilingualText en="Previous project" zh="上一个项目" /></span>
          </button>
          <span className={styles.ticks}>
            {items.map((item, index) => (
              <button
                key={item.slug}
                ref={(node) => {
                  tickRefs.current[index] = node;
                }}
                type="button"
                className={styles.tick}
                aria-current={index === 0 ? "true" : undefined}
                onClick={() => goTo(index)}
              >
                <span aria-hidden="true">{pad(index + 1)}</span>
                <span className={styles.tickTip} aria-hidden="true">
                  <BilingualText en={item.shortTitle} zh={item.shortTitleZh} />
                </span>
                <span className="sr-only">
                  <BilingualText en={`Show ${item.title}`} zh={`显示${item.titleZh}`} />
                </span>
              </button>
            ))}
          </span>
          <span className={styles.stepCount} aria-hidden="true">
            <span ref={stepCountRef}>01</span> / {pad(count)}
          </span>
          <button type="button" className={styles.step} onClick={() => goTo(flowRef.current.shown + 1)}>
            <ArrowRight size={18} aria-hidden="true" />
            <span className="sr-only"><BilingualText en="Next project" zh="下一个项目" /></span>
          </button>
          {/* Leave the wheel for the full list without scrolling through every cover. */}
          <Link href="/work" className={styles.all}>
            <BilingualText en="View all" zh="查看全部" />
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
