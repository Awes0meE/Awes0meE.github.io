import type { Metadata, Viewport } from "next";
import {
  NotesSignalIndex,
  type NotesIndexItem,
  type NotesIndexProject
} from "@/components/notes-signal-index";
import { getNotes, getProjects } from "@/lib/content";
import { openGraphBase, site } from "@/lib/site";

const pageTitle = "Notes";
const pageDescription =
  "Engineering notes on embedded control, hardware debugging, board bring-up, build systems, and the evidence behind project decisions.";
const socialTitle = `${pageTitle} | Alvin Li`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    ...openGraphBase,
    title: socialTitle,
    description: pageDescription,
    url: new URL("/notes", site.url)
  },
  twitter: {
    title: socialTitle,
    description: pageDescription
  }
};

export const viewport: Viewport = {
  themeColor: "#090b0a",
  colorScheme: "dark"
};

function getNoteDateSortTime(value: string) {
  const match = value.match(/\d{4}(?:[.-]\d{1,2})?(?:[.-]\d{1,2})?/);

  if (!match) {
    return 0;
  }

  const [year, month = "1", day = "1"] = match[0].split(/[.-]/);
  return Date.UTC(Number(year), Number(month) - 1, Number(day));
}

export default function NotesPage() {
  const projectMap = new Map(
    getProjects().map((project) => [project.slug, project] as const)
  );
  const sortedNotes = [...getNotes()].sort(
    (a, b) =>
      getNoteDateSortTime(b.date) - getNoteDateSortTime(a.date) ||
      a.slug.localeCompare(b.slug)
  );

  const notes: NotesIndexItem[] = sortedNotes.flatMap((note, index) => {
    const project = note.projectSlug ? projectMap.get(note.projectSlug) : undefined;

    if (!project) {
      return [];
    }

    return [
      {
        slug: note.slug,
        title: note.title,
        titleZh: note.titleZh,
        summary: note.summary,
        summaryZh: note.summaryZh,
        date: note.date,
        tags: note.tags,
        projectSlug: project.slug,
        projectTitle: project.title,
        projectTitleZh: project.titleZh,
        sequence: index + 1
      }
    ];
  });

  const linkedProjectSlugs = [...new Set(notes.map((note) => note.projectSlug))];
  const projects: NotesIndexProject[] = linkedProjectSlugs.flatMap((slug) => {
    const project = projectMap.get(slug);

    if (!project) {
      return [];
    }

    return [
      {
        slug: project.slug,
        title: project.title,
        titleZh: project.titleZh,
        noteCount: notes.filter((note) => note.projectSlug === project.slug).length
      }
    ];
  });

  return <NotesSignalIndex notes={notes} projects={projects} />;
}
