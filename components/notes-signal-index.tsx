"use client";

import type { CSSProperties, FormEvent } from "react";
import { useMemo, useState } from "react";
import { ArrowRight, RotateCcw, Search, SearchX } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { PaperTransitionLink } from "@/components/paper-route-transition";
import styles from "@/app/notes/notes.module.css";

export type NotesIndexItem = {
  slug: string;
  title: string;
  titleZh: string;
  summary: string;
  summaryZh: string;
  date: string;
  tags: string[];
  projectSlug: string;
  projectTitle: string;
  projectTitleZh: string;
  sequence: number;
};

export type NotesIndexProject = {
  slug: string;
  title: string;
  titleZh: string;
  noteCount: number;
};

type NotesSignalIndexProps = {
  notes: NotesIndexItem[];
  projects: NotesIndexProject[];
};

const allProjects = "all";
const allYears = "all";
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const routeBusContinuation = "V 96 H 443 V 180 H 457 V 264 H 443 V 352 H 477";
const routeBusPath = `M 457 20 ${routeBusContinuation}`;
const routeBusTurns = [
  { y: 96, x: 443 },
  { y: 180, x: 457 },
  { y: 264, x: 443 },
  { y: 352, x: 477 }
] as const;

function getRouteCoordinates(index: number) {
  return {
    sourceY: 32 + index * 64,
    stepX: 238 + index * 14,
    mergeY: 18 + index * 5,
    endpointY: 72 + index * 40
  };
}

function getRouteStemPath(index: number) {
  const { sourceY, stepX, mergeY } = getRouteCoordinates(index);

  return `M 210 ${sourceY} H ${stepX} V ${mergeY} H 457 V 20`;
}

function getActiveRoutePath(index: number) {
  const { sourceY, stepX, mergeY, endpointY } = getRouteCoordinates(index);
  let path = `M 210 ${sourceY} H ${stepX} V ${mergeY} H 457`;

  for (const turn of routeBusTurns) {
    if (endpointY <= turn.y) {
      return `${path} V ${endpointY} H 477`;
    }

    path += ` V ${turn.y} H ${turn.x}`;
  }

  return path;
}

function getRouteBranchPath(index: number) {
  const { endpointY } = getRouteCoordinates(index);
  let branchX = 457;

  for (const turn of routeBusTurns) {
    if (endpointY <= turn.y) {
      break;
    }

    branchX = turn.x;
  }

  return `M ${branchX} ${endpointY} H 477`;
}

function getYear(date: string) {
  return date.match(/\d{4}/)?.[0] ?? "";
}

function ProjectSelect({
  language,
  projects,
  value,
  onChange
}: {
  language: "en" | "zh";
  projects: NotesIndexProject[];
  value: string;
  onChange: (value: string) => void;
}) {
  const isEnglish = language === "en";

  return (
    <select
      className={isEnglish ? "lang-en" : "lang-zh"}
      aria-label={isEnglish ? "Filter notes by project" : "按项目筛选笔记"}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value={allProjects}>{isEnglish ? "All linked projects" : "全部关联项目"}</option>
      {projects.map((project) => (
        <option key={project.slug} value={project.slug}>
          {isEnglish ? project.title : project.titleZh}
        </option>
      ))}
    </select>
  );
}

export function NotesSignalIndex({ notes, projects }: NotesSignalIndexProps) {
  const [query, setQuery] = useState("");
  const [activeProject, setActiveProject] = useState(allProjects);
  const [activeYear, setActiveYear] = useState(allYears);
  const years = useMemo(
    () => [...new Set(notes.map((note) => getYear(note.date)).filter(Boolean))].sort(),
    [notes]
  );

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return notes.filter((note) => {
      const matchesProject =
        activeProject === allProjects || note.projectSlug === activeProject;
      const matchesYear = activeYear === allYears || getYear(note.date) === activeYear;
      const searchText = [
        note.title,
        note.titleZh,
        note.summary,
        note.summaryZh,
        note.projectTitle,
        note.projectTitleZh,
        ...note.tags
      ]
        .join(" ")
        .toLocaleLowerCase();

      return matchesProject && matchesYear && searchText.includes(normalizedQuery);
    });
  }, [activeProject, activeYear, notes, query]);

  const selectedProject = projects.find((project) => project.slug === activeProject);
  const activeProjectIndex = projects.findIndex((project) => project.slug === activeProject);
  const hasProjectRoute = activeProjectIndex >= 0;
  const hasFilters =
    query.trim().length > 0 ||
    activeProject !== allProjects ||
    activeYear !== allYears;
  const listMotionKey = `${activeProject}-${activeYear}`;
  const activeRoutePath = hasProjectRoute
    ? getActiveRoutePath(activeProjectIndex)
    : null;
  const activeRouteEndpointY = hasProjectRoute
    ? getRouteCoordinates(activeProjectIndex).endpointY
    : null;

  function resetFilters() {
    setQuery("");
    setActiveProject(allProjects);
    setActiveYear(allYears);
  }

  function preventSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className={`signal-theme signal-notes-index ${styles.root}`}>
      <div className={styles.shell}>
        <header className={styles.intro}>
          <div className={styles.introCopy}>
            <h1>
              <BilingualText en="Engineering notes" zh="工程笔记" />
            </h1>
            <p>
              <BilingualText
                en="Trace hardware, firmware, and control questions through failures, source files, board bring-up, and verification."
                zh="沿着故障、源文件、板级调试与验证，追踪硬件、固件和控制问题。"
              />
            </p>
          </div>
          <dl className={styles.coverage} aria-label="Archive coverage / 档案范围">
            <div>
              <dt><BilingualText en="notes" zh="篇记录" /></dt>
              <dd>{notes.length}</dd>
            </div>
            <div>
              <dt><BilingualText en="linked projects" zh="个关联项目" /></dt>
              <dd>{projects.length}</dd>
            </div>
            <div>
              <dt><BilingualText en="years represented" zh="个记录年份" /></dt>
              <dd>{years.length}</dd>
            </div>
          </dl>
        </header>

        <div
          className={styles.workspace}
          data-route-active={hasFilters ? "true" : "false"}
          data-project-route={hasProjectRoute ? "true" : "false"}
        >
          <svg
            className={styles.routeMap}
            viewBox="0 0 1000 512"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <g className={styles.routeStems}>
              {projects.map((project, index) => (
                <path key={project.slug} d={getRouteStemPath(index)} />
              ))}
            </g>
            <path className={styles.routeBus} d={routeBusPath} />
            <g className={styles.routeBranches}>
              {projects.map((project, index) => (
                <path key={project.slug} d={getRouteBranchPath(index)} />
              ))}
            </g>
            <g className={styles.routeJunctions}>
              <circle
                cx="443"
                cy="96"
                r="4"
                data-route-reached={activeProjectIndex >= 1 ? "true" : undefined}
              />
              <circle
                cx="457"
                cy="180"
                r="4"
                data-route-reached={activeProjectIndex >= 3 ? "true" : undefined}
              />
              <circle
                cx="443"
                cy="264"
                r="4"
                data-route-reached={activeProjectIndex >= 5 ? "true" : undefined}
              />
              <rect
                x="472"
                y="347"
                width="9"
                height="9"
                data-route-reached={activeProjectIndex >= 7 ? "true" : undefined}
              />
            </g>
            {activeRoutePath ? (
              <>
                <path className={styles.activeRoute} d={activeRoutePath} />
                <circle
                  className={styles.activeRouteEndpoint}
                  cx="477"
                  cy={activeRouteEndpointY ?? 0}
                  r="4"
                />
              </>
            ) : null}
          </svg>
          <section className={styles.projectPanel} aria-labelledby="project-channels-title">
            <header className={styles.regionHeader}>
              <h2 id="project-channels-title">
                <BilingualText en="Project channels" zh="项目通道" />
              </h2>
              <button
                type="button"
                className={styles.allChannels}
                aria-pressed={activeProject === allProjects}
                onClick={() => setActiveProject(allProjects)}
              >
                <BilingualText en="All signals" zh="全部信号" />
              </button>
            </header>
            <div className={styles.channels}>
              {projects.map((project, index) => {
                const isActive = activeProject === project.slug;

                return (
                  <button
                    key={project.slug}
                    type="button"
                    className={styles.channel}
                    aria-label={`${project.titleZh} / ${project.title}`}
                    aria-pressed={isActive}
                    data-active={isActive ? "true" : undefined}
                    onClick={() => setActiveProject(isActive ? allProjects : project.slug)}
                    style={{ "--channel-index": index } as CSSProperties}
                  >
                    <span className={styles.channelIndex} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.channelTitle}>
                      <BilingualText en={project.title} zh={project.titleZh} />
                    </span>
                    <span className={styles.channelCount} aria-hidden="true">
                      {String(project.noteCount).padStart(2, "0")}
                    </span>
                    <span className={styles.channelNode} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </section>

          <section className={styles.routingPanel} aria-labelledby="route-controls-title">
            <header className={styles.regionHeader}>
              <h2 id="route-controls-title">
                <BilingualText en="Route controls" zh="路由控制" />
              </h2>
              <span className={styles.routeState}>
                {selectedProject ? (
                  <BilingualText en={selectedProject.title} zh={selectedProject.titleZh} />
                ) : (
                  <BilingualText en="Archive open" zh="归档全开" />
                )}
              </span>
            </header>

            <form className={styles.controls} onSubmit={preventSubmit}>
              <div className={styles.controlGroup}>
                <label className="lang-en" htmlFor="notes-search-en">Search metadata</label>
                <label className="lang-zh" htmlFor="notes-search-zh">搜索元数据</label>
                <div className={styles.searchField}>
                  <Search size={17} strokeWidth={1.8} aria-hidden="true" />
                  <input
                    id="notes-search-en"
                    className="lang-en"
                    type="search"
                    value={query}
                    autoComplete="off"
                    aria-label="Search note titles, summaries, tags, or projects"
                    placeholder="Title, summary, tag, project"
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <input
                    id="notes-search-zh"
                    className="lang-zh"
                    type="search"
                    value={query}
                    autoComplete="off"
                    aria-label="搜索标题、摘要、标签或项目"
                    placeholder="标题、摘要、标签或项目"
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
              </div>

              <div className={styles.controlGroup}>
                <label>
                  <BilingualText en="Linked project" zh="关联项目" />
                </label>
                <div className={styles.selectField}>
                  <ProjectSelect
                    language="en"
                    projects={projects}
                    value={activeProject}
                    onChange={setActiveProject}
                  />
                  <ProjectSelect
                    language="zh"
                    projects={projects}
                    value={activeProject}
                    onChange={setActiveProject}
                  />
                </div>
              </div>

              <fieldset className={styles.yearGroup}>
                <legend><BilingualText en="Frontmatter year" zh="记录年份" /></legend>
                <div className={styles.yearOptions}>
                  <button
                    type="button"
                    aria-pressed={activeYear === allYears}
                    onClick={() => setActiveYear(allYears)}
                  >
                    <BilingualText en="All" zh="全部" />
                  </button>
                  {years.map((year) => (
                    <button
                      key={year}
                      type="button"
                      aria-pressed={activeYear === year}
                      onClick={() => setActiveYear(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className={styles.routeSummary}>
                <span className={styles.routePulse} aria-hidden="true" />
                <span>
                  <BilingualText
                    en={`${filteredNotes.length} records on route`}
                    zh={`当前路由 ${filteredNotes.length} 篇记录`}
                  />
                </span>
                {hasFilters ? (
                  <button type="button" onClick={resetFilters}>
                    <RotateCcw size={14} aria-hidden="true" />
                    <BilingualText en="Reset" zh="重置" />
                  </button>
                ) : null}
              </div>
            </form>
          </section>

          <section className={styles.ledger} aria-labelledby="note-ledger-title">
            <header className={styles.ledgerHeader}>
              <div>
                <h2 id="note-ledger-title">
                  <BilingualText en="Note ledger" zh="笔记台账" />
                </h2>
                <p><BilingualText en="Newest frontmatter date first" zh="按记录日期倒序" /></p>
              </div>
              <output aria-live="polite" aria-atomic="true">
                <strong>{filteredNotes.length}</strong>
                <span aria-hidden="true"> / {notes.length}</span>
                <span className={styles.srOnly}>
                  <BilingualText en=" matching notes" zh=" 篇匹配笔记" />
                </span>
              </output>
            </header>

            {filteredNotes.length > 0 ? (
              <ol key={listMotionKey} className={styles.noteList}>
                {filteredNotes.map((note, index) => {
                  const hiddenTagCount = Math.max(0, note.tags.length - 3);
                  const isIsoDate = isoDatePattern.test(note.date);

                  return (
                    <li
                      key={note.slug}
                      data-route-match={
                        hasProjectRoute && note.projectSlug === activeProject ? "true" : undefined
                      }
                      style={{
                        "--row-delay": `${Math.min(index, 7) * 28}ms`
                      } as CSSProperties}
                    >
                      <PaperTransitionLink
                        href={`/notes/${note.slug}`}
                        className={styles.noteRow}
                      >
                        <span className={styles.noteSequence} aria-hidden="true">
                          {String(note.sequence).padStart(2, "0")}
                          <span />
                        </span>
                        <span className={styles.noteBody}>
                          <span className={styles.noteMeta}>
                            <span className={styles.noteProject}>
                              <BilingualText en={note.projectTitle} zh={note.projectTitleZh} />
                            </span>
                            <time dateTime={isIsoDate ? note.date : undefined}>{note.date}</time>
                          </span>
                          <span className={styles.noteTitle}>
                            <BilingualText en={note.title} zh={note.titleZh} />
                          </span>
                          <span className={styles.noteSummary}>
                            <BilingualText en={note.summary} zh={note.summaryZh} />
                          </span>
                          <span className={styles.noteTags} aria-label="Tags / 标签">
                            {note.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span key={`${tag}-${tagIndex}`}>{tag}</span>
                            ))}
                            {hiddenTagCount > 0 ? <span>+{hiddenTagCount}</span> : null}
                          </span>
                        </span>
                        <span className={styles.noteArrow} aria-hidden="true">
                          <ArrowRight size={18} strokeWidth={1.7} />
                        </span>
                      </PaperTransitionLink>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <div className={styles.emptyState} role="status">
                <SearchX size={28} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3><BilingualText en="No notes on this route" zh="这条路由暂无笔记" /></h3>
                  <p>
                    <BilingualText
                      en="Change the search terms or reopen the full archive."
                      zh="请调整搜索词，或重新打开完整归档。"
                    />
                  </p>
                </div>
                <button type="button" onClick={resetFilters}>
                  <BilingualText en="Reset filters" zh="重置筛选" />
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
