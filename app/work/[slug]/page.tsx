import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, PlayCircle, ScrollText } from "lucide-react";
import { ContentRenderer } from "@/components/content-renderer";
import { formatDateRange, getMediaItems, getNotes, getProject, getProjects } from "@/lib/content";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  const relatedNotes = getNotes().filter((note) => note.projectSlug === slug);
  const relatedMedia = getMediaItems().filter((item) => item.projectSlug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <article className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        <Link href="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-pine hover:text-copper">
          <ArrowLeft size={16} />
          Back to work / 返回项目
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h1 className="text-5xl font-semibold text-ink">{project.title}</h1>
            <p className="mt-3 text-2xl font-medium text-ink">{project.titleZh}</p>
            <p className="mt-6 text-lg leading-8 text-graphite">{project.summaryZh}</p>
            <p className="mt-3 text-base leading-7 text-graphite">{project.summary}</p>
          </div>
          <div className="rounded-lg border border-line bg-white p-5">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-graphite">Timeline</dt>
                <dd className="mt-1 font-semibold text-ink">{formatDateRange(project.date)}</dd>
              </div>
              <div>
                <dt className="text-graphite">Status</dt>
                <dd className="mt-1 font-semibold text-ink">{project.status}</dd>
              </div>
              <div>
                <dt className="text-graphite">Stack</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded border border-line bg-paper px-2 py-1 text-xs text-graphite">
                      {tag}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links?.repo ? <ProjectLink href={project.links.repo} label="Repo" /> : null}
              {project.links?.demo ? <ProjectLink href={project.links.demo} label="Demo" /> : null}
              {project.links?.download ? <ProjectLink href={project.links.download} label="Download" /> : null}
            </div>
          </div>
        </div>
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg border border-line bg-chalk">
          <Image src={project.cover} alt={project.title} fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="prose-reset mt-10 border-t border-line pt-2">
          <ContentRenderer source={project.body} />
        </div>
        {relatedNotes.length ? (
          <section className="mt-12 border-t border-line pt-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-ink">Development Notes / 开发笔记</h2>
                <p className="mt-2 text-sm leading-6 text-graphite">
                  First-person logs connected to this project&apos;s hardware, firmware, documentation, and legacy archive.
                </p>
              </div>
              <Link href="/notes" className="text-sm font-semibold text-pine hover:text-copper">
                Open notes archive
              </Link>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {relatedNotes.map((note) => (
                <Link
                  key={note.slug}
                  href={`/notes/${note.slug}`}
                  className="grid grid-cols-[40px_1fr] gap-3 rounded-lg border border-line bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-fine"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-md border border-line text-pine">
                    <ScrollText size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{note.titleZh}</span>
                    <span className="mt-1 block text-xs text-graphite">{note.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
        {relatedMedia.length ? (
          <section className="mt-12 border-t border-line pt-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-ink">Related Media / 相关媒体</h2>
                <p className="mt-2 text-sm leading-6 text-graphite">
                  Images, videos, board renders, and source attachments connected to this project.
                </p>
              </div>
              <Link href="/media" className="text-sm font-semibold text-pine hover:text-copper">
                Open media gallery
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedMedia.map((item) => (
                <a
                  key={item.id}
                  href={item.src}
                  className="group overflow-hidden rounded-lg border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-fine"
                >
                  <div className="relative aspect-[4/3] bg-chalk">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 280px, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    {item.type === "video" ? (
                      <span className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-pine">
                        <PlayCircle size={24} />
                      </span>
                    ) : null}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-graphite">{item.caption}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  );
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-pine px-3 py-2 text-sm font-semibold text-pine hover:bg-pine hover:text-white"
    >
      {label}
      <ExternalLink size={15} />
    </a>
  );
}
