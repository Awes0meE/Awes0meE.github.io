import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { BenchLogRail } from "@/components/bench-log-rail";
import { BilingualText } from "@/components/bilingual-text";
import { tagZh } from "@/lib/tags";
import { ContentRenderer, getContentOutline } from "@/components/content-renderer";
import { RouteStage } from "@/components/route-stage";
import { getNote, getNotes, getProjects } from "@/lib/content";
import { openGraphBase, site } from "@/lib/site";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) {
    return {};
  }

  const socialTitle = `${note.title} | Alvin Li`;

  return {
    title: note.title,
    description: note.summary,
    openGraph: {
      ...openGraphBase,
      title: socialTitle,
      description: note.summary,
      url: new URL(`/notes/${slug}`, site.url)
    },
    twitter: {
      title: socialTitle,
      description: note.summary
    }
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNote(slug);

  if (!note) {
    notFound();
  }

  const projects = getProjects();
  const projectIndex = note.projectSlug ? projects.findIndex((project) => project.slug === note.projectSlug) : -1;
  const relatedProject = projectIndex >= 0 ? projects[projectIndex] : undefined;
  const projectNumber = projectIndex >= 0 ? String(projectIndex + 1).padStart(2, "0") : null;
  const outline = getContentOutline(note.body);
  // Number each note within its project, in the same order the project
  // page lists its development notes.
  const projectNotes = note.projectSlug ? getNotes().filter((item) => item.projectSlug === note.projectSlug) : [];
  const noteIndex = projectNotes.findIndex((item) => item.slug === note.slug);
  const noteNumber = noteIndex >= 0 ? String(noteIndex + 1).padStart(2, "0") : null;
  const noteTotal = String(projectNotes.length).padStart(2, "0");
  const siblingNotes = projectNotes.filter((item) => item.slug !== note.slug);

  return (
    <RouteStage>
      <main className="signal-theme bench-page bench-page-note">
        <div className="bench-layout">
          <BenchLogRail
            entries={outline}
            backHref="/notes"
            backLabel={{ en: "All notes", zh: "全部笔记" }}
          />
          <article className="bench-article">
            <header className="bench-mast">
              <h1 className="bench-title">
                {noteNumber ? (
                  <>
                    <span className="bench-plate" aria-hidden="true">{noteNumber}</span>
                    <span className="sr-only">
                      <BilingualText en={`Note ${noteNumber} of ${noteTotal}: `} zh={`笔记 ${noteNumber} / ${noteTotal}：`} />
                    </span>
                  </>
                ) : null}
                <span className="bench-title-text">
                  <BilingualText en={note.title} zh={note.titleZh} />
                </span>
              </h1>
            </header>

            <div className="bench-reading">
              <div className="bench-main">
                <p className="bench-lede">
                  <BilingualText en={note.summary} zh={note.summaryZh} />
                </p>
                <div className="bench-body">
                  <ContentRenderer source={note.body} />
                </div>
              </div>
              <aside className="bench-side" aria-label="Note details / 笔记信息">
                <div className="bench-side-inner">
                  <dl className="bench-spec">
                    {relatedProject ? (
                      <div>
                        <dt><BilingualText en="Project" zh="所属项目" /></dt>
                        <dd className="bench-spec-links">
                          <Link href={`/work/${relatedProject.slug}`} transitionTypes={["nav-back"]}>
                            <span>{projectNumber} · </span>
                            <BilingualText en={relatedProject.title} zh={relatedProject.titleZh} />
                            <ArrowRight size={14} aria-hidden="true" />
                          </Link>
                        </dd>
                      </div>
                    ) : null}
                    {noteNumber ? (
                      <div className="bench-spec-half">
                        <dt><BilingualText en="Note" zh="笔记" /></dt>
                        <dd>{noteNumber} / {noteTotal}</dd>
                      </div>
                    ) : null}
                    <div className="bench-spec-half">
                      <dt><BilingualText en="Date" zh="日期" /></dt>
                      <dd><time>{note.date}</time></dd>
                    </div>
                    <div>
                      <dt><BilingualText en="Tags" zh="标签" /></dt>
                      <dd className="bench-tags">
                        {note.tags.map((tag) => (
                          <span key={tag}><BilingualText en={tag} zh={tagZh(tag)} /></span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                  {siblingNotes.length ? (
                    <nav className="bench-side-notes" aria-label="More from this project / 同项目的其他笔记">
                      <p className="bench-side-label">
                        <BilingualText en="More from this project" zh="同项目的其他笔记" />
                      </p>
                      <ol>
                        {siblingNotes.map((sibling) => (
                          <li key={sibling.slug}>
                            <Link href={`/notes/${sibling.slug}`} transitionTypes={["nav-forward"]}>
                              <ArrowRight size={13} aria-hidden="true" />
                              <BilingualText en={sibling.title} zh={sibling.titleZh} />
                            </Link>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  ) : null}
                </div>
              </aside>
            </div>

            {relatedProject ? (
              <section className="bench-section" aria-label="Related project / 相关项目">
                <Link
                  href={`/work/${relatedProject.slug}`}
                  transitionTypes={["nav-back"]}
                  className="bench-note-row bench-return-row"
                >
                  <span className="bench-note-index">{projectNumber}</span>
                  <span className="bench-note-copy">
                    <strong><BilingualText en="Back to the project" zh="回到项目" /></strong>
                    <span><BilingualText en={relatedProject.title} zh={relatedProject.titleZh} /></span>
                  </span>
                  <ArrowRight size={18} aria-hidden="true" className="bench-note-arrow" />
                </Link>
              </section>
            ) : null}
          </article>
        </div>
      </main>
    </RouteStage>
  );
}
