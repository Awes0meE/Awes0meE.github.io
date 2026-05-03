import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Code2,
  Github,
  Mail,
  MapPin,
  Microchip,
  PlayCircle,
  ScrollText,
  SquareActivity
} from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { TechnicalVisual } from "@/components/technical-visual";
import { formatDateRange, getFeaturedProjects, getMediaItems, getNotes } from "@/lib/content";
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
              Awes0meE / Lizhiyi
            </h1>
            <p className="text-wrap-safe mt-7 w-full max-w-80 text-lg leading-8 text-ink sm:max-w-xl">
              电子与电气工程本科生，专注于控制、嵌入式系统与机器人技术的学习与实践。
            </p>
            <p className="text-wrap-safe mt-3 w-full max-w-80 text-base leading-7 text-graphite sm:max-w-xl">
              ECE undergraduate at XJTLU. I build control systems, embedded hardware, and robotics solutions with engineering rigor and curiosity.
            </p>
            <div className="mt-8 h-px w-12 bg-copper" />
            <div className="mt-8 grid gap-5 text-sm text-ink sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Building2 className="mt-1 text-ink" size={26} strokeWidth={1.7} />
                <div>
                  <p className="font-semibold">西交利物浦大学 (XJTLU)</p>
                  <p className="mt-1 text-xs text-graphite">School of Advanced Technology</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Code2 className="mt-1 text-ink" size={26} strokeWidth={1.7} />
                <div>
                  <p className="font-semibold">Next.js Full-Stack</p>
                  <p className="mt-1 text-xs text-graphite">TypeScript · Tailwind · MDX</p>
                </div>
              </div>
            </div>
            <div className="mt-8 grid w-full max-w-80 gap-3 sm:flex sm:max-w-full sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-pine px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-ink"
              >
                View Projects / 查看项目
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-semibold text-pine transition hover:border-pine hover:text-copper sm:border-0 sm:px-2"
              >
                About Me / 关于我
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <TechnicalVisual />
        </div>
      </section>

      <section className="border-b border-line py-10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading title="Featured Projects / 精选项目" action={{ href: "/work", label: "View all projects / 查看全部项目" }} />
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
            <SectionHeading title="Notes / 学习笔记" action={{ href: "/notes", label: "View all notes / 查看全部笔记" }} />
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
                    <span className="block font-medium text-ink">{note.titleZh}</span>
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
              更多笔记 / More notes
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="px-5 py-10 lg:px-8">
            <SectionHeading title="Media / 媒体" action={{ href: "/media", label: "View all media / 查看全部媒体" }} />
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
              <Image src="/uploads/visuals/lab-notes.svg" alt="Lizhiyi profile visual" fill sizes="112px" className="object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-ink">About / 关于</h2>
              <p className="mt-4 leading-7 text-graphite">
                热爱工程与创造，关注控制、嵌入式与机器人方向。喜欢从原理出发，把想法变成可运行的系统。
              </p>
              <p className="mt-3 leading-7 text-graphite">
                Passionate about engineering and building real systems. Focused on control, embedded systems, and robotics.
              </p>
              <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-pine hover:text-copper">
                More about me / 了解更多
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="border-line md:border-l md:pl-8">
            <h2 className="text-xl font-semibold text-ink">Let&apos;s connect / 联系我</h2>
            <div className="mt-5 space-y-4 text-sm text-graphite">
              <a className="flex items-center gap-3 hover:text-pine" href={`mailto:${site.email}`}>
                <Mail size={18} />
                {site.email}
              </a>
              <a className="flex items-center gap-3 hover:text-pine" href={site.github}>
                <Github size={18} />
                github.com/Awes0meE
              </a>
              <p className="flex items-center gap-3">
                <MapPin size={18} />
                {site.location}
              </p>
            </div>
          </div>
          <div className="border-line md:border-l md:pl-8">
            <h2 className="text-xl font-semibold text-ink">Currently</h2>
            <div className="mt-5 space-y-4 text-sm text-graphite">
              <p className="flex items-center gap-3"><Microchip size={18} />PID Starter Kit 开发中</p>
              <p className="flex items-center gap-3"><SquareActivity size={18} />Robotics & SLAM 学习中</p>
              <p className="flex items-center gap-3"><Code2 size={18} />Next.js 全栈作品集中</p>
              <p className="flex items-center gap-3"><CalendarDays size={18} />{formatDateRange("2026.05 to Now")}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
