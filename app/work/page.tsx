import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { tagZh } from "@/lib/tags";
import { PROJECT_FIGURE_SIZES, ProjectCover } from "@/components/project-cover";
import { ProjectFigureTransition, RouteStage } from "@/components/route-stage";
import {
  WorkProjectRail,
  type WorkRailProject
} from "@/components/work-project-rail";
import {
  formatDateRange,
  formatDateRangeZh,
  formatStatusZh,
  getProjectCover,
  getProjectPhase,
  getProjects,
  type Project
} from "@/lib/content";
import { openGraphBase, site } from "@/lib/site";

const pageTitle = "Work";
const pageDescription =
  "Evidence-first project archives covering embedded control, schematic and PCB design, board bring-up, hardware–firmware integration, and robotic systems hardware.";
const socialTitle = `${pageTitle} | Alvin Li`;

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
  const media = getProjectCover(project);
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
        transitionTypes={["nav-forward"]}
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
              <span key={tag}><BilingualText en={tag} zh={tagZh(tag)} /></span>
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
          <ProjectFigureTransition slug={project.slug}>
            <span className="project-cover-frame">
              <ProjectCover
                media={media}
                alt=""
                preload={index === 0}
                sizes={PROJECT_FIGURE_SIZES}
                className="signal-work-image"
              />
            </span>
          </ProjectFigureTransition>
          <span className="signal-work-media-index">{chapterNumber} / APERTURE</span>
        </div>
        <span id={detailsId} className="sr-only">
          <BilingualText
            en={`Status: ${project.status}. Timeline: ${timelineEn}. Focus: ${focus.join(", ")}. Evidence: ${evidenceEn}.`}
            zh={`状态：${statusZh}。时间：${timelineZh}。方向：${focus.map(tagZh).join("、")}。证据：${evidenceZh}。`}
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
    ...(({ phase, en, zh }) => ({ phase, phaseEn: en, phaseZh: zh }))(getProjectPhase(project.status)),
    cover: getProjectCover(project)
  }));

  return (
    <RouteStage>
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
    </RouteStage>
  );
}
