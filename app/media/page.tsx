import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, ExternalLink, Play } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import {
  formatDateRange,
  formatDateRangeZh,
  formatStatusZh,
  getMediaItems,
  getProjects,
  type MediaItem,
  type Project
} from "@/lib/content";
import { openGraphBase, site } from "@/lib/site";
import {
  MediaFocusAperture,
  MediaFocusApertureFromQuery,
  type MediaFocusGroup
} from "./media-focus-aperture";
import styles from "./media.module.css";

const pageTitle = "Media";
const pageDescription =
  "Board photos, schematic sheets, renders, videos, and test captures grouped by Alvin Li’s engineering projects.";
const socialTitle = `${pageTitle} | Alvin Li`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    ...openGraphBase,
    title: socialTitle,
    description: pageDescription,
    url: new URL("/media", site.url)
  },
  twitter: {
    title: socialTitle,
    description: pageDescription
  }
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark"
};

const mediaProjectConfig = [
  {
    slug: "juanyun-thermal-hardware",
    shortTitle: "Cirro thermal hardware",
    shortTitleZh: "卷云相变散热系统",
    featuredId: "juanyun-acunit-v20-block"
  },
  {
    slug: "sensorless-foc-learning-route",
    shortTitle: "Sensorless FOC",
    shortTitleZh: "无感 FOC 学习路线",
    featuredId: "sensorless-foc-cover"
  },
  {
    slug: "juanyun-diy-cooling-prototype",
    shortTitle: "DIY cooling",
    shortTitleZh: "DIY 压风式散热器",
    featuredId: "juanyun-diy-cooling-stm32-pcb-render"
  },
  {
    slug: "nanjing-turing-qt-embedded-learning",
    shortTitle: "Nanjing Qt log",
    shortTitleZh: "南京图灵 Qt 实习",
    featuredId: "turing-ai-institute-cover"
  },
  {
    slug: "tianjin-metro-stm32-foundation",
    shortTitle: "Tianjin STM32",
    shortTitleZh: "天津津铁 STM32 实习",
    featuredId: "tianjin-rail-transit-cover"
  },
  {
    slug: "arduino-digital-clock-counter",
    shortTitle: "Digital counter",
    shortTitleZh: "Arduino 数码管计数器",
    featuredId: "arduino-digital-clock-cover"
  },
  {
    slug: "arduino-smart-car-line-tracker",
    shortTitle: "Line-tracking car",
    shortTitleZh: "Arduino 循迹小车",
    featuredId: "arduino-smart-car-cover"
  },
  {
    slug: "claude-chime-hardware-power-board",
    shortTitle: "Claude Chime power",
    shortTitleZh: "Claude Chime 电源板",
    featuredId: "claude-chime-logo"
  }
] as const;

type MediaProjectGroup = {
  slug: string;
  shortTitle: string;
  shortTitleZh: string;
  featuredId: string;
  project?: Project;
  items: MediaItem[];
};

function count(value: number) {
  return String(value).padStart(3, "0");
}

function mediaType(type: MediaItem["type"]) {
  return type === "video"
    ? { en: "Video", zh: "视频" }
    : { en: "Image", zh: "图像" };
}

const htmlDatePattern = /^\d{4}(?:-\d{2}(?:-\d{2})?)?$/;

function buildMediaGroups(media: MediaItem[], projects: Project[]) {
  const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));
  const itemsByProject = new Map<string, MediaItem[]>();

  for (const item of media) {
    const slug = item.projectSlug ?? "unassigned";
    const items = itemsByProject.get(slug) ?? [];
    items.push(item);
    itemsByProject.set(slug, items);
  }

  const configuredSlugs = new Set<string>(mediaProjectConfig.map((entry) => entry.slug));
  const configuredGroups: MediaProjectGroup[] = mediaProjectConfig.flatMap((entry) => {
    const items = itemsByProject.get(entry.slug) ?? [];

    if (!items.length) {
      return [];
    }

    return [{
      ...entry,
      project: projectsBySlug.get(entry.slug),
      items
    }];
  });

  const additionalGroups: MediaProjectGroup[] = [...itemsByProject.entries()]
    .filter(([slug]) => slug !== "unassigned" && !configuredSlugs.has(slug))
    .map(([slug, items]) => {
      const project = projectsBySlug.get(slug);

      return {
        slug,
        shortTitle: project?.title ?? slug,
        shortTitleZh: project?.titleZh ?? project?.title ?? slug,
        featuredId: items[0].id,
        project,
        items
      };
    });

  const unassignedItems = itemsByProject.get("unassigned") ?? [];
  const unassignedGroup: MediaProjectGroup[] = unassignedItems.length
    ? [{
        slug: "unassigned",
        shortTitle: "Unassigned records",
        shortTitleZh: "待归类记录",
        featuredId: unassignedItems[0].id,
        items: unassignedItems
      }]
    : [];

  return [...configuredGroups, ...additionalGroups, ...unassignedGroup];
}

function groupTitle(group: MediaProjectGroup) {
  return {
    en: group.project?.title ?? group.shortTitle,
    zh: group.project?.titleZh ?? group.shortTitleZh
  };
}

export default function MediaPage() {
  const media = getMediaItems();
  const projects = getProjects();
  const groups = buildMediaGroups(media, projects);
  const archiveIndexById = new Map(media.map((item, index) => [item.id, index + 1]));
  const totals = {
    records: media.length,
    images: media.filter((item) => item.type === "image").length,
    videos: media.filter((item) => item.type === "video").length,
    projects: groups.filter((group) => group.project).length
  };
  const focusGroups: MediaFocusGroup[] = groups.map((group) => {
    const featured = group.items.find((item) => item.id === group.featuredId) ?? group.items[0];
    const title = groupTitle(group);

    return {
      slug: group.slug,
      shortTitle: group.shortTitle,
      shortTitleZh: group.shortTitleZh,
      title: title.en,
      titleZh: title.zh,
      mediaCount: group.items.length,
      imageCount: group.items.filter((item) => item.type === "image").length,
      videoCount: group.items.filter((item) => item.type === "video").length,
      projectHref: group.project ? `/work/${group.slug}` : undefined,
      featured: {
        ...featured,
        archiveIndex: archiveIndexById.get(featured.id) ?? 1
      }
    };
  });

  return (
    <main className={`signal-theme ${styles.page}`}>
      <Suspense
        fallback={(
          <MediaFocusAperture
            groups={focusGroups}
            totals={totals}
            initialSlug={focusGroups[0]?.slug ?? ""}
          />
        )}
      >
        <MediaFocusApertureFromQuery
          groups={focusGroups}
          totals={totals}
          initialSlug={focusGroups[0]?.slug ?? ""}
        />
      </Suspense>

      <section className={styles.library} aria-labelledby="project-library-title">
        <header className={styles.libraryHeader}>
          <div>
            <h2 id="project-library-title">
              <BilingualText en="Media, grouped by project" zh="按项目分类的媒体库" />
            </h2>
            <p>
              <BilingualText
                en="Each chapter keeps its source project, engineering context, and records together."
                zh="每一个分区都把项目来源、工程背景和对应媒体放在一起，不再混成一张总图墙。"
              />
            </p>
          </div>
          <div className={styles.libraryScope} aria-label="Archive scope / 档案范围">
            <span>{count(totals.projects)} <BilingualText en="projects" zh="个项目" /></span>
            <span>{count(totals.records)} <BilingualText en="records" zh="条记录" /></span>
          </div>
        </header>

        <div className={styles.projectGroups}>
          {groups.map((group, groupIndex) => {
            const title = groupTitle(group);
            const imageCount = group.items.filter((item) => item.type === "image").length;
            const videoCount = group.items.length - imageCount;

            return (
              <section
                key={group.slug}
                id={`media-project-${group.slug}`}
                className={styles.projectGroup}
                aria-labelledby={`media-project-title-${group.slug}`}
              >
                <header className={styles.projectHeader}>
                  <div className={styles.projectSequence} aria-hidden="true">
                    <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                    <span>/</span>
                    <span>{String(groups.length).padStart(2, "0")}</span>
                  </div>
                  <div className={styles.projectIdentity}>
                    <h3 id={`media-project-title-${group.slug}`}>
                      <BilingualText en={title.en} zh={title.zh} />
                    </h3>
                    {group.project ? (
                      <p>
                        <BilingualText en={group.project.summary} zh={group.project.summaryZh} />
                      </p>
                    ) : (
                      <p>
                        <BilingualText
                          en="Records awaiting a confirmed project relationship."
                          zh="这些记录仍在等待确认对应的项目关系。"
                        />
                      </p>
                    )}
                  </div>
                  <dl className={styles.projectFacts}>
                    <div>
                      <dt><BilingualText en="Records" zh="记录" /></dt>
                      <dd>{count(group.items.length)}</dd>
                    </div>
                    <div>
                      <dt><BilingualText en="Images" zh="图像" /></dt>
                      <dd>{count(imageCount)}</dd>
                    </div>
                    <div>
                      <dt><BilingualText en="Videos" zh="视频" /></dt>
                      <dd>{count(videoCount)}</dd>
                    </div>
                  </dl>
                  <div className={styles.projectContext}>
                    {group.project ? (
                      <>
                        <span>
                          <BilingualText en={group.project.status} zh={formatStatusZh(group.project.status)} />
                        </span>
                        <span>
                          <BilingualText
                            en={formatDateRange(group.project.date)}
                            zh={formatDateRangeZh(group.project.date)}
                          />
                        </span>
                        <Link href={`/work/${group.slug}`}>
                          <BilingualText en="Open project" zh="打开项目" />
                          <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                      </>
                    ) : null}
                  </div>
                </header>

                <ol className={styles.mediaGrid}>
                  {group.items.map((item, itemIndex) => {
                    const type = mediaType(item.type);

                    return (
                      <li key={item.id}>
                        <a
                          href={item.src}
                          className={styles.mediaCell}
                          aria-label={`${item.titleZh ?? item.title} / ${item.title}`}
                        >
                          <div className={styles.mediaVisual}>
                            <Image
                              src={item.thumbnail}
                              alt=""
                              fill
                              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                              className={styles.mediaImage}
                            />
                            {item.type === "video" ? (
                              <span className={styles.videoMarker}>
                                <Play size={14} aria-hidden="true" />
                                <BilingualText en="Video" zh="视频" />
                              </span>
                            ) : null}
                            <span className={styles.mediaOpenIcon} aria-hidden="true">
                              <ExternalLink size={15} />
                            </span>
                          </div>
                          <div className={styles.mediaMetadata}>
                            <span>{String(groupIndex + 1).padStart(2, "0")}.{String(itemIndex + 1).padStart(2, "0")}</span>
                            <span><BilingualText en={type.en} zh={type.zh} /></span>
                            <time dateTime={htmlDatePattern.test(item.date) ? item.date : undefined}>
                              <BilingualText en={formatDateRange(item.date)} zh={formatDateRangeZh(item.date)} />
                            </time>
                          </div>
                          <h4>
                            <BilingualText en={item.title} zh={item.titleZh ?? item.title} />
                          </h4>
                          <p>
                            <BilingualText en={item.caption} zh={item.captionZh ?? item.caption} />
                          </p>
                          <span className={styles.mediaSource}>
                            <BilingualText
                              en={`Project source · ${group.shortTitle}`}
                              zh={`项目来源 · ${group.shortTitleZh}`}
                            />
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}
