import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import {
  WorkProjectRail,
  type WorkRailProject
} from "@/components/work-project-rail";
import {
  formatDateRange,
  formatDateRangeZh,
  formatStatusZh,
  getProjects,
  type Project
} from "@/lib/content";
import { openGraphBase, site } from "@/lib/site";

const pageTitle = "Work";
const pageDescription =
  "Evidence-first project archives covering embedded control, schematic and PCB design, board bring-up, hardware–firmware integration, and robotic systems hardware.";
const socialTitle = `${pageTitle} | Alvin Li`;

const workMediaBySlug: Record<string, { src: string; fit: "contain" | "cover" }> = {
  "claude-chime-hardware-power-board": {
    src: "/uploads/projects/claude-chime-hardware/board-3d-render.png",
    fit: "cover"
  },
  "juanyun-thermal-hardware": {
    src: "/uploads/projects/juanyun-public/covers/cirro-tech-cover.jpg",
    fit: "contain"
  },
  "sensorless-foc-learning-route": {
    src: "/uploads/projects/sensorless-foc-learning-route/cover.png",
    fit: "contain"
  },
  "nanjing-turing-qt-embedded-learning": {
    src: "/uploads/projects/nanjing-turing/turing-ai-institute-cover.jpg",
    fit: "contain"
  }
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark"
};

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    ...openGraphBase,
    title: socialTitle,
    description: pageDescription,
    url: new URL("/work", site.url)
  },
  twitter: {
    title: socialTitle,
    description: pageDescription
  }
};

function ProjectSignalBand() {
  return (
    <div
      className="signal-work-signal-band"
      data-work-signal-band
      data-motion="paused"
      aria-hidden="true"
    >
      <span className="signal-work-signal-track" />
    </div>
  );
}

function WorkProjectChapter({
  index,
  project,
  projectCount
}: {
  index: number;
  project: Project;
  projectCount: number;
}) {
  const statusZh = formatStatusZh(project.status);
  const timelineEn = formatDateRange(project.date);
  const timelineZh = formatDateRangeZh(project.date);
  const focus = project.tags.slice(0, 3);
  const evidenceEn = project.assetPaths?.length ? "Case study + public files" : "Case study";
  const evidenceZh = project.assetPaths?.length ? "项目记录 + 公开文件" : "项目记录";
  const media = workMediaBySlug[project.slug] ?? { src: project.cover, fit: "cover" as const };
  const chapterNumber = String(index + 1).padStart(2, "0");
  const total = String(projectCount).padStart(2, "0");
  const titleId = `work-project-${project.slug}-title`;
  const detailsId = `work-project-${project.slug}-details`;

  return (
    <article
      id={`work-project-${project.slug}`}
      className="signal-work-chapter"
      data-work-chapter={project.slug}
      aria-labelledby={titleId}
    >
      <Link
        href={`/work/${project.slug}`}
        className="signal-work-chapter-link"
        aria-labelledby={titleId}
        aria-describedby={detailsId}
      >
        <div className="signal-work-copy">
          <span className="signal-work-chapter-number" aria-hidden="true">
            <strong>{chapterNumber}</strong>
            <span>/ {total}</span>
          </span>
          <h2 id={titleId} className="signal-work-title">
            <BilingualText en={project.title} zh={project.titleZh} />
          </h2>
          <dl className="signal-work-meta">
            <div>
              <dt><BilingualText en="Status" zh="状态" /></dt>
              <dd><BilingualText en={project.status} zh={statusZh} /></dd>
            </div>
            <div>
              <dt><BilingualText en="Timeline" zh="时间" /></dt>
              <dd><BilingualText en={timelineEn} zh={timelineZh} /></dd>
            </div>
          </dl>
          <p className="signal-work-summary">
            <BilingualText en={project.summary} zh={project.summaryZh} />
          </p>
          <div className="signal-work-focus" aria-label="Project focus / 项目方向">
            {focus.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <span className="signal-work-evidence">
            <FileText size={16} aria-hidden="true" />
            <BilingualText en={evidenceEn} zh={evidenceZh} />
          </span>
          <span className="signal-work-case-action">
            <BilingualText en="View case study" zh="查看项目记录" />
            <ArrowUpRight size={20} aria-hidden="true" />
          </span>
        </div>
        <div className="signal-work-media" aria-hidden="true">
          <Image
            src={media.src}
            alt=""
            fill
            preload={index === 0}
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) calc(100vw - 148px), (max-width: 1199px) 54vw, 56vw"
            className={`signal-work-image signal-work-image-${media.fit}`}
          />
          <span className="signal-work-media-index">{chapterNumber} / APERTURE</span>
        </div>
        <span id={detailsId} className="sr-only">
          <BilingualText
            en={`Status: ${project.status}. Timeline: ${timelineEn}. Focus: ${focus.join(", ")}. Evidence: ${evidenceEn}.`}
            zh={`状态：${statusZh}。时间：${timelineZh}。方向：${focus.join("、")}。证据：${evidenceZh}。`}
          />
        </span>
      </Link>
    </article>
  );
}

export default function WorkPage() {
  const projects = getProjects();
  const railProjects: WorkRailProject[] = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    titleZh: project.titleZh,
    status: project.status,
    statusZh: formatStatusZh(project.status),
    cover: workMediaBySlug[project.slug]?.src ?? project.cover
  }));

  return (
    <main className="signal-theme signal-work">
      <div className="signal-work-shell">
        <WorkProjectRail projects={railProjects} />
        <div className="signal-work-stage">
          <header className="signal-work-mobile-header">
            <h1><BilingualText en="Project archive" zh="项目档案" /></h1>
            <p>
              <BilingualText
                en="Eight engineering records, with status and validation limits left visible."
                zh="八份工程项目记录，状态与验证边界保持可见。"
              />
            </p>
          </header>
          {projects.map((project, index) => (
            <div key={project.slug} className="signal-work-sequence-item">
              <WorkProjectChapter
                index={index}
                project={project}
                projectCount={projects.length}
              />
              {index < projects.length - 1 ? <ProjectSignalBand /> : null}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
