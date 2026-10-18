import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { FilmStrip, TicketTape, type FilmRecord, type TicketRecord } from "@/components/home-feed-strips";
import { getMediaItems, getNotes, getProjects } from "@/lib/content";
import styles from "./home-feed.module.css";

/** Round-robin: the first of every group, then the second of every group, and so on. */
function interleave<T>(groups: T[][]): T[] {
  const longest = Math.max(0, ...groups.map((group) => group.length));
  return Array.from({ length: longest }, (_, round) => groups.flatMap((group) => (round < group.length ? [group[round]] : []))).flat();
}

/**
 * Homepage bench media and engineering notes as two endless strips running in opposite
 * directions: a film of media frames and a tape of note stubs. Both come up in a random
 * order on every visit (see `components/home-feed-strips.tsx`); the server renders a fixed
 * first order, dealt project by project, for the first paint and for readers without
 * script. The pointer never stops either strip (a note stub glows under it); keyboard focus
 * stops a strip; every record is a link. Under reduced motion the strips stand still and scroll sideways.
 */
export function HomeFeed() {
  const projects = getProjects();
  const byProject = new Map(projects.map((project) => [project.slug, { en: project.shortTitle, zh: project.shortTitleZh }]));

  const film: FilmRecord[] = interleave(
    projects.map((project) =>
      getMediaItems()
        .filter((item) => item.projectSlug === project.slug)
        .sort((a, b) => Number(a.type === "video") - Number(b.type === "video"))
    )
  ).map((item) => ({
    id: item.id,
    href: item.projectSlug ? `/media?project=${encodeURIComponent(item.projectSlug)}` : "/media",
    thumbnail: item.thumbnail,
    video: item.type === "video",
    title: item.title,
    titleZh: item.titleZh ?? item.title,
    group: item.projectSlug ?? "",
    project: (item.projectSlug && byProject.get(item.projectSlug)) || null
  }));

  const tape: TicketRecord[] = interleave(
    projects.map((project) => getNotes().filter((note) => note.projectSlug === project.slug))
  ).map((note) => ({
    slug: note.slug,
    title: note.title,
    titleZh: note.titleZh,
    tags: note.tags,
    group: note.projectSlug ?? "",
    project: (note.projectSlug && byProject.get(note.projectSlug)) || null
  }));

  return (
    <div className={`signal-section ${styles.feed}`}>
      <section aria-labelledby="media-title">
        <header className="signal-section-header">
          <h2 id="media-title"><BilingualText en="Bench and build media" zh="台架与制作影像" /></h2>
          <Link href="/media"><BilingualText en="All media" zh="全部媒体" /><ArrowRight size={16} aria-hidden="true" /></Link>
        </header>
        <FilmStrip records={film} />
      </section>
      <section aria-labelledby="notes-title">
        <header className="signal-section-header">
          <h2 id="notes-title"><BilingualText en="Engineering notes" zh="工程笔记" /></h2>
          <Link href="/notes"><BilingualText en="All notes" zh="全部笔记" /><ArrowRight size={16} aria-hidden="true" /></Link>
        </header>
        <TicketTape records={tape} />
      </section>
    </div>
  );
}
