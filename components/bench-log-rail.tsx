"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import type { ContentOutlineEntry } from "@/components/content-renderer";
import styles from "@/components/bench-log.module.css";

type RailEntry = ContentOutlineEntry & {
  numberEn?: string;
  numberZh?: string;
};

type BenchLogRailProps = {
  entries: ContentOutlineEntry[];
  backHref: string;
  backLabel: { en: string; zh: string };
};

/** Sticky distance from the viewport top at which a section counts as current. */
const ACTIVE_OFFSET = 180;

function numberEntries(entries: ContentOutlineEntry[]): RailEntry[] {
  let en = 0;
  let zh = 0;

  return entries.map((entry) => {
    const numbered: RailEntry = { ...entry };

    if (entry.language !== "zh") {
      en += 1;
      numbered.numberEn = String(en).padStart(2, "0");
    }

    if (entry.language !== "en") {
      zh += 1;
      numbered.numberZh = String(zh).padStart(2, "0");
    }

    return numbered;
  });
}

function languageClass(entry: ContentOutlineEntry) {
  if (entry.language === "en") {
    return "lang-en";
  }

  return entry.language === "zh" ? "lang-zh" : undefined;
}

function EntryNumber({ entry }: { entry: RailEntry }) {
  return (
    <>
      {entry.numberEn ? <span className="lang-en">§{entry.numberEn}</span> : null}
      {entry.numberZh ? <span className="lang-zh">§{entry.numberZh}</span> : null}
    </>
  );
}

function isRendered(element: HTMLElement) {
  return element.getClientRects().length > 0;
}

export function BenchLogRail({ entries, backHref, backLabel }: BenchLogRailProps) {
  const numbered = useMemo(() => numberEntries(entries), [entries]);
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null);
  const [contentsOpen, setContentsOpen] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const enCount = numbered.filter((entry) => entry.numberEn).length;
  const zhCount = numbered.filter((entry) => entry.numberZh).length;

  useEffect(() => {
    if (!entries.length) {
      return;
    }

    let frame = 0;

    function update() {
      frame = 0;
      let current: string | null = null;

      for (const entry of entries) {
        const heading = document.getElementById(entry.id);

        if (!heading || !isRendered(heading)) {
          continue;
        }

        if (heading.getBoundingClientRect().top - ACTIVE_OFFSET <= 0) {
          current = entry.id;
        } else if (current === null) {
          current = entry.id;
          break;
        } else {
          break;
        }
      }

      setActiveId(current);
    }

    function schedule() {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const languageObserver = new MutationObserver(schedule);
    languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      languageObserver.disconnect();
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [entries]);

  useEffect(() => {
    if (!contentsOpen) {
      return;
    }

    function close(event: MouseEvent | KeyboardEvent) {
      if (event instanceof KeyboardEvent) {
        if (event.key === "Escape") {
          setContentsOpen(false);
        }
        return;
      }

      if (stripRef.current && !stripRef.current.contains(event.target as Node)) {
        setContentsOpen(false);
      }
    }

    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [contentsOpen]);

  const active = numbered.find((entry) => entry.id === activeId) ?? numbered[0];
  const activeIndex = active ? numbered.indexOf(active) : -1;

  const list = (onNavigate?: () => void) => (
    <ol className={styles.railList}>
      {numbered.map((entry, index) => (
        <li key={entry.id} className={languageClass(entry)}>
          <a
            href={`#${entry.id}`}
            className={styles.railLink}
            data-state={index < activeIndex ? "read" : undefined}
            aria-current={entry.id === activeId ? "location" : undefined}
            onClick={onNavigate}
          >
            <span className={styles.railNumber}>
              <EntryNumber entry={entry} />
            </span>
            <span className={styles.railTitle}>
              <BilingualText en={entry.en} zh={entry.zh} />
            </span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <div className={styles.rail}>
        <div className={styles.railInner}>
          {entries.length ? (
            <>
              <p className={styles.railLabel}>
                <span className="lang-en">Contents · {enCount}</span>
                <span className="lang-zh">目录 · {zhCount}</span>
              </p>
              <nav aria-label="Sections / 章节">{list()}</nav>
            </>
          ) : null}
          <Link href={backHref} transitionTypes={["nav-back"]} className={styles.railBack}>
            <ArrowLeft size={15} aria-hidden="true" />
            <BilingualText en={backLabel.en} zh={backLabel.zh} />
          </Link>
        </div>
      </div>

      {entries.length ? (
        <div className={styles.strip} ref={stripRef}>
          <div className={styles.stripBar}>
            <span className={styles.stripNumber}>{active ? <EntryNumber entry={active} /> : null}</span>
            <span className={styles.stripTitle}>
              {active ? <BilingualText en={active.en} zh={active.zh} /> : null}
            </span>
            {numbered.length <= 12 ? (
              <span className={styles.stripTicks} aria-hidden="true">
                {numbered.map((entry, index) => (
                  <i
                    key={entry.id}
                    className={languageClass(entry)}
                    data-state={index < activeIndex ? "read" : index === activeIndex ? "current" : undefined}
                  />
                ))}
              </span>
            ) : (
              <span className={styles.stripCounter} aria-hidden="true">
                {active?.numberEn ? <span className="lang-en">{active.numberEn}/{String(enCount).padStart(2, "0")}</span> : null}
                {active?.numberZh ? <span className="lang-zh">{active.numberZh}/{String(zhCount).padStart(2, "0")}</span> : null}
              </span>
            )}
            <button
              type="button"
              className={styles.stripToggle}
              aria-expanded={contentsOpen}
              aria-controls="bench-log-contents"
              onClick={() => setContentsOpen((open) => !open)}
            >
              <BilingualText en="Contents" zh="目录" />
              <ChevronDown size={15} aria-hidden="true" />
            </button>
          </div>
          <nav
            id="bench-log-contents"
            className={styles.stripPanel}
            aria-label="Sections / 章节"
            hidden={!contentsOpen}
          >
            {list(() => setContentsOpen(false))}
          </nav>
        </div>
      ) : null}
    </>
  );
}
