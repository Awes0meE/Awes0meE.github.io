import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "content");

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
  cover: string;
  links?: LinkSet;
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
      const { data, content } = matter(raw);

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
  return formatDateRange(value).replaceAll("Now", "至今");
}

export function formatStatusZh(value: string) {
  const statusMap: Record<string, string> = {
    "In Progress": "进行中",
    "Public Archive": "公开归档",
    "Private Evidence Review": "私有证据审查",
    "Planning Archive": "计划归档",
    "Archived Prototype": "原型归档",
    "Public Overview": "公开概览",
    Draft: "草稿",
    Complete: "已完成",
    Completed: "已完成",
    Archived: "已归档"
  };

  return statusMap[value] ?? value;
}
