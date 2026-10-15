"use client";

import { useEffect, useState } from "react";
import { BilingualText } from "@/components/bilingual-text";
import { ProjectCover } from "@/components/project-cover";
import type { ProjectMedia } from "@/lib/content";

export type WorkRailProject = {
  slug: string;
  title: string;
  titleZh: string;
  phase: "completed" | "ongoing" | "archived";
  phaseEn: string;
  phaseZh: string;
  cover: ProjectMedia;
};

export function WorkProjectRail({ projects }: { projects: WorkRailProject[] }) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");

  useEffect(() => {
    const chapters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-work-chapter]")
    );
    const signalBands = Array.from(
      document.querySelectorAll<HTMLElement>("[data-work-signal-band]")
    );

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (activeEntry) {
          const slug = (activeEntry.target as HTMLElement).dataset.workChapter;
          if (slug) setActiveSlug(slug);
        }
      },
      {
        rootMargin: "-32% 0px -52% 0px",
        threshold: [0, 0.01, 0.25]
      }
    );

    const setSignalMotion = (band: HTMLElement, isVisible: boolean) => {
      band.dataset.motion = isVisible && !document.hidden ? "running" : "paused";
    };

    const signalObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setSignalMotion(entry.target as HTMLElement, entry.isIntersecting);
        });
      },
      { rootMargin: "120px 0px", threshold: 0.01 }
    );

    const refreshSignalMotion = () => {
      signalBands.forEach((band) => {
        const bounds = band.getBoundingClientRect();
        const isVisible = bounds.bottom >= -120 && bounds.top <= window.innerHeight + 120;
        setSignalMotion(band, isVisible);
      });
    };

    chapters.forEach((chapter) => chapterObserver.observe(chapter));
    signalBands.forEach((band) => signalObserver.observe(band));
    document.addEventListener("visibilitychange", refreshSignalMotion);
    refreshSignalMotion();

    return () => {
      chapterObserver.disconnect();
      signalObserver.disconnect();
      document.removeEventListener("visibilitychange", refreshSignalMotion);
    };
  }, []);

  return (
    <aside className="signal-work-rail" aria-label="Project index / 项目索引">
      <header className="signal-work-rail-header">
        <h1>
          <BilingualText en="Project archive" zh="项目档案" />
        </h1>
        <p>
          <BilingualText en={`${projects.length} evidence records`} zh={`${projects.length} 份项目记录`} />
        </p>
      </header>
      <nav className="signal-work-rail-nav" aria-label="Project chapters / 项目章节">
        {projects.map((project, index) => {
          const isActive = activeSlug === project.slug;

          return (
            <a
              key={project.slug}
              href={`#work-project-${project.slug}`}
              className="signal-work-rail-link"
              data-active={isActive ? "true" : "false"}
              aria-current={isActive ? "location" : undefined}
              aria-label={`Go to ${project.title} / 前往${project.titleZh}`}
            >
              <span className="signal-work-rail-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="signal-work-rail-cover" aria-hidden="true">
                <ProjectCover media={project.cover} alt="" sizes="72px" />
              </span>
              <span className="signal-work-rail-status" data-phase={project.phase} aria-hidden="true">
                <BilingualText en={project.phaseEn} zh={project.phaseZh} />
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
