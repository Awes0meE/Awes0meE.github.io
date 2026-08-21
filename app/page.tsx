import type { Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Github,
  Mail,
  Microchip,
  PlayCircle,
  SquareActivity
} from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { PaperTransitionLink } from "@/components/paper-route-transition";
import { ProjectEvidenceRow } from "@/components/project-evidence-row";
import { TechnicalVisual } from "@/components/technical-visual";
import { getFeaturedProjects, getMediaItems, getNotes } from "@/lib/content";
import { site } from "@/lib/site";

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark"
};

function EducationMark({ school }: { school: "ntu" | "xjtlu" | "liverpool" }) {
  const marks = {
    ntu: { src: "/education/ntu-logo.png", width: 839, height: 1079 },
    xjtlu: { src: "/education/xjtlu-logo-white-inlay.png", width: 56, height: 69 },
    liverpool: { src: "/education/liverpool-crest.svg", width: 97, height: 145 }
  } as const;
  const mark = marks[school];

  return (
    <span className={`signal-education-mark signal-education-mark-${school}`} aria-hidden="true">
      <Image src={mark.src} alt="" width={mark.width} height={mark.height} className="h-full w-auto object-contain" />
    </span>
  );
}

function IridiumMarkDivider({ orientation }: { orientation: "vertical" | "horizontal" }) {
  return (
    <span
      className={`iridium-divider iridium-divider-${orientation}`}
      aria-hidden="true"
    >
      <span className="iridium-divider-marks" />
    </span>
  );
}

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const notes = getNotes().slice(0, 5);
  const media = getMediaItems().slice(0, 6);

  return (
    <main className="signal-theme signal-home">
      <section className="signal-hero" aria-labelledby="signal-hero-title">
        <div className="signal-hero-grid">
          <div className="signal-hero-atmosphere atmosphereConveyor" aria-hidden="true">
            <span className="variantFluid fluidA" />
            <span className="variantFluid fluidB" />
            <span className="variantFluid fluidC" />
            <span className="variantFluid fluidD" />
          </div>
          <IridiumMarkDivider orientation="vertical" />
          <div className="signal-hero-copy">
            <h1 id="signal-hero-title" className="signal-hero-title">
              <BilingualText
                en="Embedded systems, control, power, and motor drives"
                zh="嵌入式、控制、电源与电驱"
              />
            </h1>
            <p className="signal-hero-identity">
              <BilingualText
                en="This is Alvin Li. I develop embedded systems across hardware and firmware. I draw schematics, lay out PCBs, write firmware, and handle board bring-up, hardware-software integration, and bench validation."
                zh="这里是 Alvin Li，主要做嵌入式软硬件全栈开发。平时会画原理图、布 PCB、写固件，也会做板级调试、软硬件联调和台架验证。"
              />
            </p>
            <div className="signal-hero-actions">
              <Link href="#project-evidence" className="signal-primary-action">
                <BilingualText en="View project evidence" zh="查看项目证据" />
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/about" className="signal-secondary-action">
                <BilingualText en="About Alvin" zh="关于 Alvin" />
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <IridiumMarkDivider orientation="horizontal" />
          </div>
          <TechnicalVisual />
        </div>
      </section>

      <section id="project-evidence" className="signal-section signal-project-index" aria-labelledby="project-index-title">
        <header className="signal-section-header">
          <h2 id="project-index-title">
            <BilingualText en="Project evidence index" zh="项目证据索引" />
          </h2>
          <Link href="/work">
            <BilingualText en="Open complete archive" zh="打开完整归档" />
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </header>
        <div className="signal-project-table">
          <div className="signal-project-table-head" aria-hidden="true">
            <span><BilingualText en="No." zh="编号" /></span>
            <span><BilingualText en="Project" zh="项目" /></span>
            <span><BilingualText en="Focus" zh="方向" /></span>
            <span><BilingualText en="Evidence" zh="证据" /></span>
            <span><BilingualText en="Timeline" zh="时间" /></span>
            <span />
          </div>
          {featuredProjects.map((project, index) => (
            <ProjectEvidenceRow key={project.slug} index={index} project={project} />
          ))}
        </div>
      </section>

      <section className="signal-section signal-credentials-section" aria-labelledby="credentials-title">
        <header className="signal-section-header">
          <h2 id="credentials-title">
            <BilingualText en="Education and current direction" zh="教育经历与当前方向" />
          </h2>
        </header>
        <div className="signal-credentials-grid">
          <article className="signal-credential signal-credential-current">
            <EducationMark school="ntu" />
            <div>
              <h3><BilingualText en="Nanyang Technological University, Singapore" zh="南洋理工大学·新加坡" /></h3>
              <p><BilingualText en="Master of Science (Robotics and Intelligent Systems) · Current student" zh="机器人与智能系统理学硕士 · 在读" /></p>
            </div>
          </article>
          <article className="signal-credential">
            <EducationMark school="xjtlu" />
            <div>
              <h3><BilingualText en="Xi'an Jiaotong-Liverpool University, China" zh="西交利物浦大学·中国" /></h3>
              <p><BilingualText en="BEng Telecommunications Engineering" zh="通信工程工学学士" /></p>
            </div>
          </article>
          <article className="signal-credential">
            <EducationMark school="liverpool" />
            <div>
              <h3><BilingualText en="University of Liverpool, United Kingdom" zh="利物浦大学·英国" /></h3>
              <p><BilingualText en="BEng (Hons) Telecommunications Engineering · First Class Honours" zh="通信工程工学学士（荣誉）· 一等荣誉学位" /></p>
            </div>
          </article>
        </div>
      </section>

      <section className="signal-section signal-reading-section">
        <div className="signal-reading-column" aria-labelledby="notes-title">
          <header className="signal-section-header">
            <h2 id="notes-title"><BilingualText en="Engineering notes" zh="工程笔记" /></h2>
            <Link href="/notes"><BilingualText en="All notes" zh="全部笔记" /><ArrowRight size={16} aria-hidden="true" /></Link>
          </header>
          <div className="signal-notes-list">
            {notes.map((note, index) => (
              <PaperTransitionLink
                key={note.slug}
                href={`/notes/${note.slug}`}
                className="signal-note-row"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <strong><BilingualText en={note.title} zh={note.titleZh} /></strong>
                  <small>{note.tags.slice(0, 3).join(" · ")}</small>
                </span>
                <time>{note.date}</time>
                <ArrowRight size={16} aria-hidden="true" />
              </PaperTransitionLink>
            ))}
          </div>
        </div>

        <div className="signal-reading-column signal-media-column" aria-labelledby="media-title">
          <header className="signal-section-header">
            <h2 id="media-title"><BilingualText en="Bench and build media" zh="台架与制作影像" /></h2>
            <Link href="/media"><BilingualText en="All media" zh="全部媒体" /><ArrowRight size={16} aria-hidden="true" /></Link>
          </header>
          <div className="signal-media-grid">
            {media.map((item) => (
              <Link
                key={item.id}
                href={item.projectSlug ? `/media?project=${encodeURIComponent(item.projectSlug)}` : "/media"}
                className="signal-media-item"
              >
                <Image
                  src={item.thumbnail}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 48vw"
                  className="object-cover"
                />
                {item.type === "video" ? (
                  <span className="signal-media-play"><PlayCircle size={21} aria-hidden="true" /></span>
                ) : null}
                <span className="sr-only">
                  <BilingualText en={item.title} zh={item.titleZh ?? item.title} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="signal-section signal-contact-section" aria-labelledby="stack-contact-title">
        <div className="signal-stack">
          <h2 id="stack-contact-title"><BilingualText en="Engineering stack and contact" zh="工程技术栈与联系" /></h2>
          <div className="signal-stack-list">
            <p><Microchip size={19} aria-hidden="true" /><BilingualText en="Embedded control and firmware — STM32, ESP32, C/C++, and bare-metal peripheral development" zh="嵌入式控制与固件——STM32、ESP32、C/C++ 与裸机外设开发" /></p>
            <p><SquareActivity size={19} aria-hidden="true" /><BilingualText en="Hardware development — schematic capture, PCB layout, hand assembly, and staged board bring-up" zh="硬件开发——原理图设计、PCB 布局、手工装配与分阶段板级 bring-up" /></p>
            <p><Code2 size={19} aria-hidden="true" /><BilingualText en="Motor drives and power electronics — PWM, SVPWM, FOC, gate driving, sensing, and power conversion" zh="电机驱动与电力电子——PWM、SVPWM、FOC、栅极驱动、采样与电源变换" /></p>
          </div>
        </div>
        <div className="signal-contact-links">
          <a href={site.github}><Github size={19} aria-hidden="true" /><BilingualText en="GitHub profile" zh="GitHub 主页" /><ArrowRight size={17} aria-hidden="true" /></a>
          <a href={`mailto:${site.email}`}><Mail size={19} aria-hidden="true" />{site.email}<ArrowRight size={17} aria-hidden="true" /></a>
        </div>
      </section>
    </main>
  );
}
