"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowDown, ArrowRight, ExternalLink, Play } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import type { MediaItem } from "@/lib/content";
import styles from "./media.module.css";

export type MediaFocusGroup = {
  slug: string;
  shortTitle: string;
  shortTitleZh: string;
  title: string;
  titleZh: string;
  mediaCount: number;
  imageCount: number;
  videoCount: number;
  projectHref?: string;
  featured: Pick<
    MediaItem,
    "id" | "title" | "titleZh" | "caption" | "captionZh" | "date" | "type" | "src" | "thumbnail"
  > & {
    archiveIndex: number;
  };
};

type MediaFocusApertureProps = {
  groups: MediaFocusGroup[];
  totals: {
    records: number;
    images: number;
    videos: number;
    projects: number;
  };
  initialSlug: string;
};

function count(value: number) {
  return String(value).padStart(3, "0");
}

function recordType(type: MediaItem["type"]) {
  return type === "video"
    ? { en: "Video", zh: "视频" }
    : { en: "Image", zh: "图像" };
}

const htmlDatePattern = /^\d{4}(?:-\d{2}(?:-\d{2})?)?$/;

export function MediaFocusAperture({ groups, totals, initialSlug }: MediaFocusApertureProps) {
  const fallbackSlug = groups[0]?.slug ?? "";
  const [activeSlug, setActiveSlug] = useState(
    groups.some((group) => group.slug === initialSlug) ? initialSlug : fallbackSlug
  );
  const activeGroup = groups.find((group) => group.slug === activeSlug) ?? groups[0];

  if (!activeGroup) {
    return null;
  }

  const activeType = recordType(activeGroup.featured.type);

  return (
    <section className={styles.aperture} aria-labelledby="media-page-title">
      <div className={styles.ledger}>
        <div className={styles.routeMark} aria-hidden="true">
          <span>03</span>
          <span>/</span>
          <span>MEDIA</span>
        </div>
        <h1 id="media-page-title" className={styles.pageTitle}>
          <BilingualText en="Media" zh="媒体" />
        </h1>
        <p className={styles.intro}>
          <BilingualText
            en="Board photos, schematic sheets, renders, videos, and test captures stay attached to the projects and engineering stages they document."
            zh="板卡照片、原理图分页、渲染图、视频和测试截图，都按它们所记录的项目与工程阶段归档。"
          />
        </p>

        <dl className={styles.totals}>
          <div>
            <dt><BilingualText en="Records" zh="媒体记录" /></dt>
            <dd>{count(totals.records)}</dd>
          </div>
          <div>
            <dt><BilingualText en="Images" zh="图像" /></dt>
            <dd>{count(totals.images)}</dd>
          </div>
          <div>
            <dt><BilingualText en="Videos" zh="视频" /></dt>
            <dd>{count(totals.videos)}</dd>
          </div>
          <div>
            <dt><BilingualText en="Projects" zh="关联项目" /></dt>
            <dd>{count(totals.projects)}</dd>
          </div>
        </dl>
      </div>

      <nav className={styles.sourceIndex} aria-label="Project sources / 项目来源">
        <div className={styles.sourceHeading}>
          <span><BilingualText en="Project source" zh="项目来源" /></span>
          <span>{count(groups.length)}</span>
        </div>
        <ol>
          {groups.map((group, index) => {
            const isActive = group.slug === activeGroup.slug;

            return (
              <li key={group.slug}>
                <button
                  type="button"
                  className={styles.sourceButton}
                  data-active={isActive ? "true" : undefined}
                  aria-pressed={isActive}
                  onClick={() => setActiveSlug(group.slug)}
                >
                  <span className={styles.sourceNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.sourceLabel}>
                    <BilingualText en={group.shortTitle} zh={group.shortTitleZh} />
                  </span>
                  <span className={styles.sourceCount}>{count(group.mediaCount)}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className={styles.sourceActions}>
          <a href={`#media-project-${activeGroup.slug}`}>
            <BilingualText en="Enter this library" zh="进入这个项目媒体库" />
            <ArrowDown size={16} aria-hidden="true" />
          </a>
          {activeGroup.projectHref ? (
            <Link href={activeGroup.projectHref}>
              <BilingualText en="View case study" zh="查看项目详情" />
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </nav>

      <div className={styles.focusStage}>
        <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          <BilingualText
            en={`Selected ${activeGroup.shortTitle}. Lead record: ${activeGroup.featured.title}.`}
            zh={`已选择${activeGroup.shortTitleZh}。主记录：${activeGroup.featured.titleZh ?? activeGroup.featured.title}。`}
          />
        </span>
        <div className={styles.focusToolbar}>
          <span>
            <BilingualText en={activeType.en} zh={activeType.zh} /> {count(activeGroup.featured.archiveIndex)} / {count(totals.records)}
          </span>
          <time dateTime={htmlDatePattern.test(activeGroup.featured.date) ? activeGroup.featured.date : undefined}>
            {activeGroup.featured.date}
          </time>
          <span className={styles.focusProjectName}>
            <BilingualText en={activeGroup.shortTitle} zh={activeGroup.shortTitleZh} />
          </span>
        </div>

        <div key={activeGroup.featured.id} className={styles.focusImage}>
          <Image
            src={activeGroup.featured.thumbnail}
            alt={`${activeGroup.featured.titleZh ?? activeGroup.featured.title} / ${activeGroup.featured.title}`}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1180px) 56vw, (min-width: 768px) 68vw, 100vw"
            className={styles.focusImageAsset}
          />
          <span className={styles.cropTopLeft} aria-hidden="true" />
          <span className={styles.cropTopRight} aria-hidden="true" />
          <span className={styles.cropBottomLeft} aria-hidden="true" />
          <span className={styles.cropBottomRight} aria-hidden="true" />
          <span className={styles.scanRule} aria-hidden="true" />
          {activeGroup.featured.type === "video" ? (
            <span className={styles.focusVideoBadge}>
              <Play size={16} aria-hidden="true" />
              <BilingualText en="Video record" zh="视频记录" />
            </span>
          ) : null}
        </div>

        <div className={styles.focusCaption}>
          <div>
            <h2>
              <BilingualText
                en={activeGroup.featured.title}
                zh={activeGroup.featured.titleZh ?? activeGroup.featured.title}
              />
            </h2>
            <p>
              <BilingualText
                en={activeGroup.featured.caption}
                zh={activeGroup.featured.captionZh ?? activeGroup.featured.caption}
              />
            </p>
          </div>
          <a href={activeGroup.featured.src} className={styles.openMedia}>
            <BilingualText en="Open media" zh="打开媒体" />
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      <a className={styles.archiveCue} href={`#media-project-${activeGroup.slug}`}>
        <span><BilingualText en="Grouped project library" zh="按项目分类的媒体库" /></span>
        <strong>
          <BilingualText en={activeGroup.title} zh={activeGroup.titleZh} />
        </strong>
        <ArrowDown size={18} aria-hidden="true" />
      </a>
    </section>
  );
}

export function MediaFocusApertureFromQuery(props: MediaFocusApertureProps) {
  const searchParams = useSearchParams();
  const requestedSlug = searchParams.get("project");
  const initialSlug = requestedSlug && props.groups.some((group) => group.slug === requestedSlug)
    ? requestedSlug
    : props.initialSlug;

  return <MediaFocusAperture {...props} initialSlug={initialSlug} />;
}
