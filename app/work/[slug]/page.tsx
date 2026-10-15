import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, ExternalLink, PlayCircle } from "lucide-react";
import { BenchLogRail } from "@/components/bench-log-rail";
import { BilingualText } from "@/components/bilingual-text";
import { ContentRenderer, getContentOutline } from "@/components/content-renderer";
import { ProjectAssets } from "@/components/project-assets";
import { ProjectCover } from "@/components/project-cover";
import { ProjectFigureTransition, RouteStage } from "@/components/route-stage";
import {
  formatDateRange,
  formatDateRangeZh,
  formatStatusZh,
  getImageCaption,
  getMediaItems,
  getNotes,
  getProject,
  getProjectCover,
  getProjects
} from "@/lib/content";
import { openGraphBase, site } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  const socialTitle = `${project.title} | Alvin Li`;

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      ...openGraphBase,
      title: socialTitle,
      description: project.summary,
      url: new URL(`/work/${slug}`, site.url)
    },
    twitter: {
      title: socialTitle,
      description: project.summary
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projects = getProjects();
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const relatedNotes = getNotes().filter((note) => note.projectSlug === slug);
  const relatedMedia = getMediaItems().filter((item) => item.projectSlug === slug);
  const outline = getContentOutline(project.body);
  const lead = getProjectCover(project);
  const leadCaption =
    project.coverKind === "company"
      ? { en: `Company mark · ${project.title}`, zh: `实习单位标识 · ${project.titleZh}` }
      : getImageCaption(lead.src, project.body);
  const number = String(projectIndex + 1).padStart(2, "0");
  const total = String(projects.length).padStart(2, "0");
  const hasFiles = Boolean(project.assetPaths?.length);
  const leadAltEn = leadCaption?.en ?? project.title;
  const leadAltZh = leadCaption?.zh ?? project.titleZh;
  const leadAlt = leadAltEn === leadAltZh ? leadAltEn : `${leadAltEn} / ${leadAltZh}`;

  return (
    <RouteStage>
      <main className="signal-theme bench-page">
        <div className="bench-layout">
          <BenchLogRail
            entries={outline}
            backHref="/work"
            backLabel={{ en: "All projects", zh: "全部项目" }}
          />
          <article className="bench-article">
            <header className="bench-mast">
              <h1 className="bench-title">
                <span className="bench-plate" aria-hidden="true">{number}</span>
                <span className="sr-only">
                  <BilingualText en={`Project ${number} of ${total}: `} zh={`项目 ${number} / ${total}：`} />
                </span>
                <span className="bench-title-text">
                  <BilingualText en={project.title} zh={project.titleZh} />
                </span>
              </h1>
            </header>

            <div className="bench-reading">
              <div className="bench-main">
                <p className="bench-lede">
                  <BilingualText en={project.summary} zh={project.summaryZh} />
                </p>
                {lead ? (
                  <figure className="bench-lead">
                    <div className="bench-lead-frame">
                      <ProjectFigureTransition slug={project.slug}>
                      <span className="project-cover-frame">
                        <ProjectCover
                          media={lead}
                          alt={leadAlt}
                          preload
                          sizes="(min-width: 1280px) 900px, (min-width: 1024px) 70vw, 100vw"
                          className="bench-lead-image"
                        />
                      </span>
                    </ProjectFigureTransition>
                    </div>
                    <figcaption>
                      <span className="bench-fig-label">FIG. 01</span>
                      <BilingualText
                        en={leadCaption?.en ?? project.title}
                        zh={leadCaption?.zh ?? project.titleZh}
                      />
                    </figcaption>
                  </figure>
                ) : null}
                <div className={lead ? "bench-body bench-body-has-lead" : "bench-body"}>
                  <ContentRenderer source={project.body} />
                </div>
              </div>
              <aside className="bench-side" aria-label="Project details / 项目信息">
                <div className="bench-side-inner">
                  <dl className="bench-spec">
                    <div className="bench-spec-project">
                      <dt><BilingualText en="Project" zh="项目" /></dt>
                      <dd>{number} / {total}</dd>
                    </div>
                    <div className="bench-spec-half">
                      <dt><BilingualText en="Status" zh="状态" /></dt>
                      <dd className="bench-spec-status">
                        <BilingualText en={project.status} zh={formatStatusZh(project.status)} />
                      </dd>
                    </div>
                    <div className="bench-spec-half">
                      <dt><BilingualText en="Timeline" zh="时间线" /></dt>
                      <dd>
                        <BilingualText en={formatDateRange(project.date)} zh={formatDateRangeZh(project.date)} />
                      </dd>
                    </div>
                    <div>
                      <dt><BilingualText en="Stack" zh="技术栈" /></dt>
                      <dd className="bench-tags">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </dd>
                    </div>
                    {hasFiles || project.links?.repo || project.links?.demo || project.links?.download ? (
                      <div>
                        <dt><BilingualText en="Files" zh="资料" /></dt>
                        <dd className="bench-spec-links">
                          {hasFiles ? (
                            <a href="#project-files">
                              <BilingualText en="Public files" zh="公开资料" />
                              <ArrowDown size={14} aria-hidden="true" />
                            </a>
                          ) : null}
                          {project.links?.repo ? <ProjectLink href={project.links.repo} labelEn="Repository" labelZh="代码仓库" /> : null}
                          {project.links?.demo ? <ProjectLink href={project.links.demo} labelEn="Demo" labelZh="演示" /> : null}
                          {project.links?.download ? <ProjectLink href={project.links.download} labelEn="Download" labelZh="下载" /> : null}
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                  {relatedNotes.length ? (
                    <nav className="bench-side-notes" aria-label="Development notes / 开发笔记">
                      <p className="bench-side-label">
                        <BilingualText en="Development notes" zh="开发笔记" />
                      </p>
                      <ol>
                        {relatedNotes.map((note, index) => (
                          <li key={note.slug}>
                            <Link href={`/notes/${note.slug}`} transitionTypes={["nav-forward"]}>
                              <span>{String(index + 1).padStart(2, "0")}</span>
                              <BilingualText en={note.title} zh={note.titleZh} />
                            </Link>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  ) : null}
                </div>
              </aside>
            </div>

            {relatedNotes.length ? (
              <section className="bench-section" aria-labelledby="project-notes-title">
                <div className="bench-section-head">
                  <div>
                    <h2 id="project-notes-title" className="bench-section-title">
                      <BilingualText en="Development notes" zh="开发笔记" />
                    </h2>
                    <p className="bench-section-note">
                      <BilingualText
                        en="Debugging records and technical notes tied to the decisions and artifacts on this project page."
                        zh="与这个项目页面中的设计决策和工程材料直接关联的调试记录与技术笔记。"
                      />
                    </p>
                  </div>
                  <span className="bench-count">
                    <BilingualText en={`${relatedNotes.length} notes`} zh={`${relatedNotes.length} 篇`} />
                  </span>
                </div>
                <ol className="bench-note-list">
                  {relatedNotes.map((note, index) => (
                    <li key={note.slug}>
                      <Link href={`/notes/${note.slug}`} transitionTypes={["nav-forward"]} className="bench-note-row">
                        <span className="bench-note-index">{String(index + 1).padStart(2, "0")}</span>
                        <span className="bench-note-copy">
                          <strong><BilingualText en={note.title} zh={note.titleZh} /></strong>
                          <span><BilingualText en={note.summary} zh={note.summaryZh} /></span>
                        </span>
                        <ArrowRight size={18} aria-hidden="true" className="bench-note-arrow" />
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            <ProjectAssets paths={project.assetPaths} />

            {relatedMedia.length ? (
              <section className="bench-section bench-section-wide" aria-labelledby="project-media-title">
                <div className="bench-section-head">
                  <div>
                    <h2 id="project-media-title" className="bench-section-title">
                      <BilingualText en="Related media" zh="相关媒体" />
                    </h2>
                    <p className="bench-section-note">
                      <BilingualText
                        en="Board photos, schematic sheets, videos, and test captures that show this project at specific stages."
                        zh="展示这个项目具体阶段的板卡照片、原理图分页、视频和测试截图。"
                      />
                    </p>
                  </div>
                  <Link href={`/media?project=${project.slug}`} className="bench-section-link">
                    <BilingualText en="Open in media archive" zh="在媒体库中查看" />
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
                <div className="bench-media-grid">
                  {relatedMedia.map((item) => (
                    <a key={item.id} href={item.src} className="bench-media-tile">
                      <span className="bench-media-frame">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 300px, 50vw"
                          className="bench-media-image"
                        />
                        {item.type === "video" ? (
                          <span className="bench-media-video">
                            <PlayCircle size={20} aria-hidden="true" />
                            <BilingualText en="Video" zh="视频" />
                          </span>
                        ) : null}
                      </span>
                      <span className="bench-media-caption">
                        <strong><BilingualText en={item.title} zh={item.titleZh ?? item.title} /></strong>
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            ) : null}
          </article>
        </div>
      </main>
    </RouteStage>
  );
}

function ProjectLink({ href, labelEn, labelZh }: { href: string; labelEn: string; labelZh: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <BilingualText en={labelEn} zh={labelZh} />
      <ExternalLink size={14} aria-hidden="true" />
    </a>
  );
}
