"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { tagZh } from "@/lib/tags";
import styles from "./home-feed.module.css";

type ProjectName = { en: string; zh: string } | null;

export type FilmRecord = {
  id: string;
  href: string;
  thumbnail: string;
  video: boolean;
  title: string;
  titleZh: string;
  group: string;
  project: ProjectName;
};

export type TicketRecord = {
  slug: string;
  title: string;
  titleZh: string;
  tags: string[];
  group: string;
  project: ProjectName;
};

/** How many media records the film shows per visit, drawn at random from the archive. */
const FILM_LENGTH = 24;

/**
 * Fisher–Yates shuffle, then one pass that swaps a record forward when it would sit next
 * to another from the same project, so the order is random but neighbours still differ.
 */
function shuffle<T extends { group: string }>(items: T[]): T[] {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  for (let i = 1; i < list.length; i += 1) {
    if (list[i].group !== list[i - 1].group) continue;
    const k = list.findIndex((item, index) => index > i && item.group !== list[i - 1].group);
    if (k > 0) [list[i], list[k]] = [list[k], list[i]];
  }
  return list;
}

/** A flat ticket barcode, different for every note: bar widths come from a hash of its slug. */
function Barcode({ seed }: { seed: string }) {
  let hash = 2166136261;
  for (const char of seed) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (let i = 0; x < 64; i += 1) {
    hash = Math.imul(hash ^ (hash >>> 13), 1274126177);
    const w = 1 + ((hash >>> 3) & 1) + ((hash >>> 7) & 1 ? 0 : 1);
    if (i % 2 === 0) bars.push({ x, w: Math.min(w, 64 - x) });
    x += w;
  }
  return (
    <svg className={styles.barcode} viewBox="0 0 64 14" width="64" height="14" aria-hidden="true" focusable="false">
      {bars.map((bar) => (
        <rect key={bar.x} x={bar.x} y={0} width={bar.w} height={14} />
      ))}
    </svg>
  );
}

const name = (project: ProjectName) => (project ? <BilingualText en={project.en} zh={project.zh} /> : null);

function Strip({ kind, count, run }: { kind: "film" | "tape"; count: number; run: (copy: boolean) => ReactNode }) {
  return (
    <div className={`${styles.strip} ${kind === "film" ? styles.film : styles.tape}`} style={{ "--n": count } as CSSProperties}>
      <div className={styles.track}>
        <div className={styles.run}>{run(false)}</div>
        {/* The loop copy stays clickable (it is half of what is on screen) but is skipped by
            assistive technology and the tab order. */}
        <div className={`${styles.run} ${styles.copy}`} aria-hidden="true">
          {run(true)}
        </div>
      </div>
    </div>
  );
}

/**
 * The film: the server renders a fixed first order; after hydration every visit draws
 * FILM_LENGTH records at random from the whole archive and shuffles them.
 */
export function FilmStrip({ records }: { records: FilmRecord[] }) {
  const [order, setOrder] = useState(() => records.slice(0, FILM_LENGTH));
  useEffect(() => {
    const frame = requestAnimationFrame(() => setOrder(shuffle(records).slice(0, FILM_LENGTH)));
    return () => cancelAnimationFrame(frame);
  }, [records]);

  const run = (copy: boolean) =>
    order.map((item) => (
      <Link key={item.id} href={item.href} className={styles.frame} tabIndex={copy ? -1 : undefined}>
        <span className={styles.well}>
          <Image src={item.thumbnail} alt="" fill sizes="240px" className={styles.mediaImage} />
          {item.video ? (
            <span className={styles.play}>
              <PlayCircle size={18} aria-hidden="true" />
              <span className="sr-only"><BilingualText en="Video" zh="视频" /></span>
            </span>
          ) : null}
        </span>
        <span className="sr-only">
          {name(item.project)}: <BilingualText en={item.title} zh={item.titleZh} />
        </span>
      </Link>
    ));

  return <Strip kind="film" count={order.length} run={run} />;
}

/** The notes tape: every public note, shuffled on each visit. */
export function TicketTape({ records }: { records: TicketRecord[] }) {
  const [order, setOrder] = useState(records);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setOrder(shuffle(records)));
    return () => cancelAnimationFrame(frame);
  }, [records]);

  const run = (copy: boolean) =>
    order.map((note) => (
      <Link
        key={note.slug}
        href={`/notes/${note.slug}`}
        transitionTypes={["nav-forward"]}
        className={styles.ticket}
        tabIndex={copy ? -1 : undefined}
      >
        <span className={styles.ticketBody}>
          <span className={styles.ticketProject}>{name(note.project)}</span>
          <strong className={styles.ticketTitle}>
            <BilingualText en={note.title} zh={note.titleZh} />
          </strong>
          <span className={styles.ticketTags}>
            <BilingualText en={note.tags.slice(0, 3).join(" · ")} zh={note.tags.slice(0, 3).map(tagZh).join(" · ")} />
          </span>
        </span>
        <ArrowUpRight className={styles.ticketArrow} size={18} aria-hidden="true" />
        <Barcode seed={note.slug} />
      </Link>
    ));

  return <Strip kind="tape" count={order.length} run={run} />;
}
