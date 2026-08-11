import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Code2,
  Github,
  GraduationCap,
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
                en="Building the hardware behind intelligent machines."
                zh="构建智能机器背后的硬件。"
              />
            </h1>
            <p className="text-wrap-safe mt-7 w-full max-w-80 text-lg leading-8 text-ink sm:max-w-xl">
              <BilingualText
                en="I’m Alvin Li, building experience across robot control hardware, flight-control electronics, schematic and PCB design, and hardware–firmware integration."
                zh="我是 Alvin Li，正在机器人主控、飞控电子、原理图与 PCB 设计和软硬件联调等方面逐步积累经验。"
              />
            </p>
            <p className="text-wrap-safe mt-3 w-full max-w-80 text-base leading-7 text-graphite sm:max-w-xl">
              <BilingualText
                en="My projects follow boards from design into bring-up and debugging, with growing interests in motor-drive electronics and power electronics."
                zh="我的项目会把板卡从设计带到 bring-up 和调试，并继续向电机驱动与电力电子延伸。"
              />
            </p>
            <div className="mt-8 h-px w-12 bg-copper" />
            <div className="mt-8 grid gap-5 text-sm text-ink sm:grid-cols-2">
              <div className="flex min-w-0 items-start gap-3">
                <Building2 className="mt-1 shrink-0 text-ink" size={26} strokeWidth={1.7} />
                <div className="min-w-0">
                  <p className="font-semibold">
                    <BilingualText en="Nanyang Technological University" zh="南洋理工大学" />
                  </p>
                  <p className="mt-1 min-w-0 break-words text-xs text-graphite">
                    <BilingualText
                      en="MAE · MSc (Robotics and Intelligent Systems) · First year"
                      zh="机械与航空航天工程学院 · 机器人与智能系统硕士 · 一年级"
                    />
                  </p>
                </div>
              </div>
              <div className="flex min-w-0 items-start gap-3">
                <GraduationCap className="mt-1 shrink-0 text-ink" size={26} strokeWidth={1.7} />
                <div className="min-w-0">
                  <p className="font-semibold">
                    <BilingualText en="Xi'an Jiaotong-Liverpool University" zh="西交利物浦大学" />
                  </p>
                  <p className="mt-1 text-xs text-graphite">
                    <BilingualText en="Communication Engineering graduate" zh="通信工程毕业生" />
                  </p>
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
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
          <div className="grid gap-6 sm:grid-cols-[120px_1fr]">
            <div className="relative h-28 w-28 overflow-hidden rounded-full border border-line bg-chalk">
              <Image src="/uploads/projects/avatar.jpg" alt="Portrait of Alvin Li" fill sizes="112px" className="object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-ink">
                <BilingualText en="About" zh="关于" />
              </h2>
              <p className="mt-4 leading-7 text-graphite">
                <BilingualText
                  en="I’m Alvin Li, a first-year student in NTU’s Master of Science (Robotics and Intelligent Systems) programme and a Communication Engineering graduate of Xi'an Jiaotong-Liverpool University."
                  zh="我是 Alvin Li，现为南洋理工大学机器人与智能系统硕士一年级学生，本科毕业于西交利物浦大学通信工程专业。"
                />
              </p>
              <p className="mt-3 leading-7 text-graphite">
                <BilingualText
                  en="This portfolio records schematics, PCB work, embedded control, board bring-up, and the measurements, debugging, revisions, and unfinished validation behind each project."
                  zh="这个作品集记录原理图与 PCB、嵌入式控制、板级 bring-up，以及项目中的测量、调试、修改和尚未完成的验证。"
                />
              </p>
              <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-pine hover:text-copper">
                <BilingualText en="More about me" zh="了解更多" />
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="border-line md:border-l md:pl-8">
            <h2 className="text-xl font-semibold text-ink">
              <BilingualText en="Contact" zh="联系" />
            </h2>
            <div className="mt-5 space-y-4 text-sm text-graphite">
              <a className="flex items-center gap-3 hover:text-pine" href={site.github}>
                <Github size={18} />
                github.com/Awes0meE
              </a>
            </div>
          </div>
          <div className="border-line md:border-l md:pl-8">
            <h2 className="text-xl font-semibold text-ink">
              <BilingualText en="Currently" zh="当前" />
            </h2>
            <div className="mt-5 space-y-4 text-sm text-graphite">
              <p className="flex items-center gap-3"><Microchip size={18} /><BilingualText en="Robot control and flight-control electronics" zh="机器人主控与飞控电子" /></p>
              <p className="flex items-center gap-3"><SquareActivity size={18} /><BilingualText en="Board bring-up and hardware–firmware debugging" zh="板级 bring-up 与软硬件调试" /></p>
              <p className="flex items-center gap-3"><Code2 size={18} /><BilingualText en="Motor drives and power electronics" zh="电机驱动与电力电子" /></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
