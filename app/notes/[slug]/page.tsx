import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { ContentRenderer } from "@/components/content-renderer";
import { getNote, getNotes, getProject } from "@/lib/content";

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

  return {
    title: note.title,
    description: note.summary
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNote(slug);
  const relatedProject = note?.projectSlug ? getProject(note.projectSlug) : undefined;

  if (!note) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
      <Link href="/notes" className="inline-flex items-center gap-2 text-sm font-semibold text-pine hover:text-copper">
        <ArrowLeft size={16} />
        <BilingualText en="Back to notes" zh="返回笔记" />
      </Link>
      <article className="mt-8">
        <p className="text-sm font-medium text-graphite">{note.date}</p>
        <h1 className="mt-3 text-5xl font-semibold text-ink">
          <BilingualText en={note.title} zh={note.titleZh} />
        </h1>
        <p className="mt-6 text-lg leading-8 text-graphite">
          <BilingualText en={note.summary} zh={note.summaryZh} />
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <span key={tag} className="rounded border border-line bg-paper px-2 py-1 text-xs text-graphite">
              {tag}
            </span>
          ))}
        </div>
        {relatedProject ? (
          <Link
            href={`/work/${relatedProject.slug}`}
            className="mt-6 flex items-center justify-between gap-4 rounded-lg border border-line bg-white p-4 text-sm transition hover:-translate-y-0.5 hover:shadow-fine"
          >
            <span>
              <span className="block font-semibold text-ink">
                <BilingualText en="Related Project" zh="相关项目" />
              </span>
              <span className="mt-1 block text-graphite">
                <BilingualText en={relatedProject.title} zh={relatedProject.titleZh} />
              </span>
            </span>
            <ArrowRight className="shrink-0 text-pine" size={18} />
          </Link>
        ) : null}
        <div className="mt-10 border-t border-line pt-2">
          <ContentRenderer source={note.body} />
        </div>
      </article>
    </main>
  );
}
