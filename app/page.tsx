import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Github,
  Mail,
  Microchip,
  PlayCircle,
  ScrollText,
  SquareActivity
} from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { TechnicalVisual } from "@/components/technical-visual";
import { getFeaturedProjects, getMediaItems, getNotes } from "@/lib/content";
import { site } from "@/lib/site";

function EducationMark({ school }: { school: "ntu" | "xjtlu" | "liverpool" }) {
  const marks = {
    ntu: { src: "/education/ntu-logo.png", width: 839, height: 1079 },
    xjtlu: { src: "/education/xjtlu-logo.png", width: 56, height: 69 },
    liverpool: { src: "/education/liverpool-crest.svg", width: 97, height: 145 }
  } as const;
  const mark = marks[school];

  return (
    <span className="mt-0.5 flex h-11 w-9 shrink-0 items-start justify-center" aria-hidden="true">
      <Image src={mark.src} alt="" width={mark.width} height={mark.height} className="h-11 w-auto object-contain" />
    </span>
  );
}

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const notes = getNotes().slice(0, 5);
  const media = getMediaItems().slice(0, 6);

  return (
    <main>
      <section className="border-b border-line bg-paper/80">
        <div className="mx-auto grid min-w-0 max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[0.78fr_1fr] lg:px-8 lg:py-16">
          <div
            className="flex w-full min-w-0 flex-col justify-center lg:max-w-none"
            style={{ maxWidth: "calc(100vw - 40px)" }}
          >
            <h1 className="max-w-80 text-balance text-4xl font-semibold tracking-normal text-ink sm:max-w-full sm:text-5xl md:text-6xl">
              <BilingualText
                en="Engineering embedded control, power, and motor-drive hardware."
                zh="设计嵌入式控制、电源与电机驱动硬件。"
              />
            </h1>
            <p className="text-wrap-safe mt-7 w-full max-w-80 text-lg leading-8 text-ink sm:max-w-xl">
              <BilingualText
                en="I’m Alvin Li. I develop embedded control hardware from schematic capture and PCB layout through board bring-up, firmware integration, and bench validation."
                zh="我是 Alvin Li，围绕嵌入式控制硬件开展原理图设计、PCB 布局、板级 bring-up、固件联调与台架验证。"
              />
            </p>
            <p className="text-wrap-safe mt-3 w-full max-w-80 text-base leading-7 text-graphite sm:max-w-xl">
              <BilingualText
                en="My current work spans STM32 and ESP32 systems, power conversion, motor-drive electronics, and FOC/SVPWM experiments, with validation limits documented alongside each result."
                zh="当前实践覆盖 STM32 与 ESP32 系统、电源变换、电机驱动和 FOC/SVPWM 实验；每项结果都会同时说明验证范围与尚未完成的边界。"
              />
            </p>
            <div className="mt-8 h-px w-12 bg-copper" />
            <div className="mt-8 grid gap-5 text-sm text-ink">
              <div className="flex min-w-0 items-start gap-3">
                <EducationMark school="ntu" />
                <div className="min-w-0">
                  <p className="font-semibold">
                    <BilingualText en="Nanyang Technological University, Singapore" zh="南洋理工大学·新加坡" />
                  </p>
                  <p className="mt-1 min-w-0 break-words text-xs text-graphite">
                    <BilingualText
                      en="Master of Science (Robotics and Intelligent Systems) · Current student"
                      zh="机器人与智能系统理学硕士 · 在读"
                    />
                  </p>
                </div>
              </div>
              <div className="border-t border-line pt-4">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-copper">
                  <BilingualText en="Dual-degree undergraduate awards" zh="本科双学位" />
                </p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex min-w-0 items-start gap-3">
                    <EducationMark school="xjtlu" />
                    <div className="min-w-0">
                      <p className="font-semibold">
                        <BilingualText en="Xi'an Jiaotong-Liverpool University, China" zh="西交利物浦大学·中国" />
                      </p>
                      <p className="mt-1 min-w-0 break-words text-xs text-graphite">
                        <BilingualText en="BEng Telecommunications Engineering" zh="通信工程工学学士" />
                      </p>
                    </div>
                  </div>
                  <div className="flex min-w-0 items-start gap-3">
                    <EducationMark school="liverpool" />
                    <div className="min-w-0">
                      <p className="font-semibold">
                        <BilingualText en="University of Liverpool, United Kingdom" zh="利物浦大学·英国" />
                      </p>
                      <p className="mt-1 min-w-0 break-words text-xs text-graphite">
                        <BilingualText
                          en="BEng (Hons) Telecommunications Engineering"
                          zh="通信工程工学学士（荣誉）"
                        />
                      </p>
                      <p className="mt-1 text-xs font-semibold text-copper">
                        <BilingualText en="First Class Honours" zh="一等荣誉学位" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 grid w-full max-w-80 gap-3 sm:flex sm:max-w-full sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-pine px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-ink"
              >
                <BilingualText en="View Projects" zh="查看项目" />
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-pine transition hover:border-pine hover:text-copper sm:border-0 sm:px-2"
              >
                <BilingualText en="About Me" zh="关于我" />
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <TechnicalVisual />
        </div>
      </section>

      <section className="border-b border-line py-10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            title={<BilingualText en="Featured Projects" zh="精选项目" />}
            action={{ href: "/work", label: <BilingualText en="View all projects" zh="查看全部项目" /> }}
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="border-line px-5 py-10 lg:border-r lg:px-8">
            <SectionHeading
              title={<BilingualText en="Notes" zh="学习笔记" />}
              action={{ href: "/notes", label: <BilingualText en="View all notes" zh="查看全部笔记" /> }}
            />
            <div className="divide-y divide-line rounded-lg border border-line bg-white">
              {notes.map((note) => (
                <Link
                  key={note.slug}
                  href={`/notes/${note.slug}`}
                  className="grid grid-cols-[40px_1fr_auto] gap-4 p-4 transition hover:bg-chalk/70"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-md border border-line text-pine">
                    <ScrollText size={18} />
                  </span>
                  <span>
                    <span className="block font-medium text-ink">
                      <BilingualText en={note.title} zh={note.titleZh} />
                    </span>
                    <span className="mt-2 flex flex-wrap gap-2">
                      {note.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded border border-line bg-paper px-2 py-0.5 text-xs text-graphite">
                          {tag}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="hidden text-sm text-graphite sm:block">{note.date}</span>
                </Link>
              ))}
            </div>
            <Link href="/notes" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-pine hover:text-copper">
              <BilingualText en="More notes" zh="更多笔记" />
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="px-5 py-10 lg:px-8">
            <SectionHeading
              title={<BilingualText en="Media" zh="媒体" />}
              action={{ href: "/media", label: <BilingualText en="View all media" zh="查看全部媒体" /> }}
            />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {media.map((item) => (
                <Link key={item.id} href="/media" className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-chalk">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 16vw, 45vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  {item.type === "video" ? (
                    <span className="absolute bottom-2 left-2 grid h-9 w-9 place-items-center rounded-full bg-white/88 text-pine">
                      <PlayCircle size={22} />
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-9 md:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div>
            <h2 className="text-xl font-semibold text-ink">
              <BilingualText en="Contact" zh="联系" />
            </h2>
            <div className="mt-5 space-y-4 text-sm text-graphite">
              <a className="flex items-center gap-3 hover:text-pine" href={site.github}>
                <Github size={18} />
                <BilingualText en="GitHub profile" zh="GitHub 主页" />
              </a>
              <a className="flex items-center gap-3 hover:text-pine" href={`mailto:${site.email}`}>
                <Mail size={18} />
                {site.email}
              </a>
            </div>
          </div>
          <div className="border-line md:border-l md:pl-8">
            <h2 className="text-xl font-semibold text-ink">
              <BilingualText en="Engineering Stack" zh="工程技术栈" />
            </h2>
            <div className="mt-5 space-y-4 text-sm text-graphite">
              <p className="flex items-start gap-3"><Microchip className="mt-0.5 shrink-0" size={18} /><BilingualText en="Embedded control and firmware — STM32, ESP32, C/C++, and bare-metal peripheral development" zh="嵌入式控制与固件——STM32、ESP32、C/C++ 与裸机外设开发" /></p>
              <p className="flex items-start gap-3"><SquareActivity className="mt-0.5 shrink-0" size={18} /><BilingualText en="Hardware development — schematic capture, PCB layout, hand assembly, and staged board bring-up" zh="硬件开发——原理图设计、PCB 布局、手工装配与分阶段板级 bring-up" /></p>
              <p className="flex items-start gap-3"><Code2 className="mt-0.5 shrink-0" size={18} /><BilingualText en="Motor drives and power electronics — PWM, SVPWM, FOC, gate driving, sensing, and power conversion" zh="电机驱动与电力电子——PWM、SVPWM、FOC、栅极驱动、采样与电源变换" /></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
