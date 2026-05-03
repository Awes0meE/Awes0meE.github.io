import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { formatDateRange, type Project } from "@/lib/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group grid overflow-hidden rounded-lg border border-line bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-fine md:grid-cols-[1.05fr_0.95fr]">
      <div className="relative min-h-64 overflow-hidden bg-chalk">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex min-h-64 flex-col p-6">
        <Link href={`/work/${project.slug}`} className="text-xl font-semibold text-ink hover:text-pine">
          {project.title}
        </Link>
        <p className="mt-1 text-base font-medium text-ink">{project.titleZh}</p>
        <p className="mt-4 text-sm leading-6 text-graphite">{project.summaryZh}</p>
        <p className="mt-3 text-sm leading-6 text-graphite">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded border border-line bg-paper px-2 py-1 text-xs text-graphite">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-5 text-sm text-graphite">
          <span className="inline-flex items-center gap-2">
            <CalendarDays size={15} />
            {formatDateRange(project.date)}
          </span>
          <Link href={`/work/${project.slug}`} aria-label={`Open ${project.title}`} className="text-ink">
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
