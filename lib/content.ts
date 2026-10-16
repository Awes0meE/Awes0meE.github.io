import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import yaml from "js-yaml";

const contentRoot = path.join(process.cwd(), "content");

// gray-matter resolves js-yaml 4 through a package.json override (the old js-yaml 3
// chain pulled in vulnerable argparse/sprintf-js); js-yaml 4 removed safeLoad, so
// frontmatter is parsed with its safe `load` explicitly.
const matterOptions = { engines: { yaml: (source: string) => yaml.load(source) as object } };

export type LinkSet = {
  demo?: string;
  repo?: string;
  download?: string;
};

export type ContentVisibility = "public" | "private";

export type Project = {
  slug: string;
  title: string;
  titleZh: string;
  summary: string;
  summaryZh: string;
  date: string;
  status: string;
  tags: string[];
  /**
   * Normalized transparent cover card (subject centred on a 16:10 canvas).
   * Company experience uses the company logo; personal work uses an EDA 3D
   * render of the board (or the closest equivalent when none exists).
   */
  cover: string;
  /** Optional dark-theme variant when the light card does not read on dark. */
  coverDark?: string;
  coverKind: "company" | "render";
  links?: LinkSet;
  assetPaths?: string[];
  featured: boolean;
  body: string;
};

export type Note = {
  slug: string;
  title: string;
  titleZh: string;
  summary: string;
  summaryZh: string;
  date: string;
  tags: string[];
  visibility: ContentVisibility;
  projectSlug?: string;
  body: string;
};

export type MediaItem = {
  id: string;
  title: string;
  titleZh?: string;
  type: "image" | "video";
  src: string;
  thumbnail: string;
  date: string;
  projectSlug?: string;
  caption: string;
  captionZh?: string;
};

function readCollection<T extends { slug: string; date: string }>(
  folder: "projects" | "notes"
) {
  const directory = path.join(contentRoot, folder);

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(directory, file);
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw, matterOptions);

      return {
        slug: file.replace(/\.mdx$/, ""),
        ...data,
        body: content.trim()
      } as unknown as T;
    })
    .sort((a, b) => getContentSortTime(b.date) - getContentSortTime(a.date));
}

function getContentSortTime(value: string) {
  const match = value.match(/\d{4}(?:[.-]\d{1,2})?(?:[.-]\d{1,2})?/);

  if (!match) {
    return 0;
  }

  const [year, month = "1", day = "1"] = match[0].split(/[.-]/);
  return Date.UTC(Number(year), Number(month) - 1, Number(day));
}

export const getProjects = cache(() => readCollection<Project>("projects"));
export const getAllNotes = cache(() =>
  readCollection<Note>("notes").map((note) => ({
    ...note,
    visibility: note.visibility === "public" ? "public" : "private"
  }))
);

export const getNotes = cache(() =>
  getAllNotes().filter((note) => note.visibility === "public")
);

export const getFeaturedProjects = cache(() =>
  getProjects().filter((project) => project.featured)
);

export const getProject = cache((slug: string) =>
  getProjects().find((project) => project.slug === slug)
);

export const getNote = cache((slug: string) =>
  getNotes().find((note) => note.slug === slug)
);

export const getMediaItems = cache(() => {
  const filePath = path.join(contentRoot, "media.json");
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as MediaItem[];
});

export function formatDateRange(value: string) {
  return value.replaceAll("-", ".").replace(" to ", " - ");
}

export function formatDateRangeZh(value: string) {
  return formatDateRange(value).replaceAll("Now", "至今").replaceAll("Present", "至今");
}

export function formatStatusZh(value: string) {
  const statusMap: Record<string, string> = {
    "In Progress": "进行中",
    "Public Archive": "公开归档",
    "Public Hardware Archive": "公开硬件归档",
    "Public Project Archive": "公开项目归档",
    "Private Evidence Review": "私有证据审查",
    "Planning Archive": "计划归档",
    "Archived Prototype": "原型归档",
    "Commissioned Hardware": "委托硬件项目",
    "Completed Internship Project": "已完成实习项目",
    "Public Overview": "公开概览",
    "Ongoing Learning Route": "持续学习 / 阶段原型",
    Draft: "草稿",
    Complete: "已完成",
    Completed: "已完成",
    Archived: "已归档"
  };

  return statusMap[value] ?? value;
}

export type ProjectPhase = "completed" | "ongoing" | "archived";

const phaseLabels: Record<ProjectPhase, { en: string; zh: string }> = {
  completed: { en: "Completed", zh: "已完成" },
  ongoing: { en: "In progress", zh: "进行中" },
  archived: { en: "Archived", zh: "已归档" }
};

/**
 * One short, uniform lifecycle label per project for compact indexes. The full
 * status (which also carries the project type, e.g. commissioned or internship)
 * stays on the project page and chapter metadata.
 */
export function getProjectPhase(status: string) {
  const normalized = status.toLowerCase();
  const phase: ProjectPhase = /ongoing|in progress|draft|planning/.test(normalized)
    ? "ongoing"
    : /archiv/.test(normalized)
      ? "archived"
      : "completed";

  return { phase, ...phaseLabels[phase] };
}

export type ProjectMedia = {
  src: string;
  srcDark?: string;
};

/** The one cover image a project shows everywhere: /work, rails, homepage rows and its page. */
export function getProjectCover(project: Project): ProjectMedia {
  return { src: project.cover, srcDark: project.coverDark };
}

/** Bilingual caption for a public image, from the media index or the image's alt text in the body. */
export function getImageCaption(src: string, body: string) {
  const media = getMediaItems().find((item) => item.src === src || item.thumbnail === src);

  if (media) {
    return { en: media.title, zh: media.titleZh ?? media.title };
  }

  const escaped = src.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const alt = body.match(new RegExp(`!\\[([^\\]]+)\\]\\(${escaped}\\)`))?.[1];

  if (!alt) {
    return null;
  }

  const [en, zh] = alt.split(/\s+\/\s+/);
  return { en: en.trim(), zh: (zh ?? en).trim() };
}
