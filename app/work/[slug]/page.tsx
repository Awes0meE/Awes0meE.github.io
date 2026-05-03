import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ContentRenderer } from "@/components/content-renderer";
import { formatDateRange, getProject, getProjects } from "@/lib/content";

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
