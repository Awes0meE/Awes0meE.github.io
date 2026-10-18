import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { HomeContact } from "@/components/home-contact";
import { HomeFeed } from "@/components/home-feed";
import { RouteStage } from "@/components/route-stage";
import { ProjectCoverFlow, type CoverFlowItem } from "@/components/project-cover-flow";
import { TechnicalVisual } from "@/components/technical-visual";
import {
  formatDateRange,
  formatDateRangeZh,
  formatStatusZh,
  getProjectCover,
  getProjects
} from "@/lib/content";

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
  const coverFlowItems: CoverFlowItem[] = getProjects().map((project) => ({
    slug: project.slug,
    title: project.title,
    titleZh: project.titleZh,
    status: project.status,
    statusZh: formatStatusZh(project.status),
    timeline: formatDateRange(project.date),
    timelineZh: formatDateRangeZh(project.date),
    tags: project.tags,
    cover: getProjectCover(project)
  }));

  return (
    <RouteStage>
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
                <span className="bilingual-text">
                  <span className="lang-en">Embedded systems, control, power, and motor drives</span>
                  <span className="lang-zh">
                    {/* Explicit lines: Safari will not break CJK after "、" under keep-all. */}
                    <span className="signal-hero-title-line">嵌入式、控制、</span>
                    <span className="signal-hero-title-line">电源与电驱</span>
                  </span>
                </span>
              </h1>
              <p className="signal-hero-identity">
                <BilingualText
                  en="This is Alvin Li. I develop embedded systems across hardware and firmware. I draw schematics, lay out PCBs, write firmware, and handle board bring-up, hardware-software integration, and bench validation."
                  zh="这里是 Alvin Li，主要做嵌入式软硬件全栈开发。平时会画原理图、布 PCB、写固件，也会做板级调试、软硬件联调和台架验证。"
                />
              </p>
              <div className="signal-hero-actions">
                <Link href="#project-evidence" className="signal-primary-action signal-fill">
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

        <ProjectCoverFlow items={coverFlowItems} />

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

        <HomeFeed />

        <HomeContact />
      </main>
    </RouteStage>
  );
}
