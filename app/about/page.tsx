import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, Mail, MapPin } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于"
};

const skills = [
  { en: "Control systems", zh: "控制系统" },
  { en: "Embedded C/C++", zh: "嵌入式 C/C++" },
  { en: "Robotics", zh: "机器人" },
  { en: "Microcontrollers", zh: "单片机" },
  { en: "STM32", zh: "STM32" },
  { en: "Free-RTOS", zh: "Free-RTOS" },
  { en: "LVGL", zh: "LVGL" },
  { en: "PCB", zh: "PCB" },
  { en: "Low-voltage electronics", zh: "弱电" },
  { en: "Python tooling", zh: "Python 工具" },
  { en: "Next.js full-stack", zh: "Next.js 全栈" },
  { en: "Technical writing", zh: "技术写作" }
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
      <h1 className="text-5xl font-semibold text-ink">
        <BilingualText en="About" zh="关于" />
      </h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.75fr]">
        <section>
          <p className="text-xl leading-9 text-ink">
            <BilingualText
              en="I am Awes0meE, a Communication Engineering undergraduate at Xi'an Jiaotong-Liverpool University."
              zh="我是 Awes0meE，西交利物浦大学通信工程本科生。"
            />
          </p>
          <p className="mt-5 leading-8 text-graphite">
            <BilingualText
              en="I am interested in systems that connect theory, hardware, and software: control loops that can be measured, embedded tools that can be reused, and robot behaviors that can be explained through evidence."
              zh="兴趣主要集中在理论、硬件和软件之间的连接：能被测量的控制回路、能复用的嵌入式工具，以及能用证据解释的机器人行为。"
            />
          </p>
          <p className="mt-5 leading-8 text-graphite">
            <BilingualText
              en="This website will gradually record engineering projects, learning notes, experiment media, and the process of building the portfolio itself."
              zh="这个网站会逐步记录工程项目、学习笔记、实验媒体和作品集本身的建设过程。"
            />
          </p>
          <Link href="/work" className="mt-8 inline-flex items-center gap-2 rounded-md bg-pine px-5 py-3 text-sm font-semibold text-white hover:bg-ink">
            <BilingualText en="View projects" zh="查看项目" />
            <ArrowRight size={16} />
          </Link>
        </section>
        <aside className="rounded-lg border border-line bg-white p-6">
          <h2 className="text-xl font-semibold text-ink">
            <BilingualText en="Focus Areas" zh="关注方向" />
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.en} className="rounded border border-line bg-paper px-3 py-2 text-sm text-graphite">
                <BilingualText en={skill.en} zh={skill.zh} />
              </span>
            ))}
          </div>
          <h2 className="mt-8 text-xl font-semibold text-ink">
            <BilingualText en="Contact" zh="联系" />
          </h2>
          <div className="mt-5 space-y-4 text-sm text-graphite">
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-pine">
              <Mail size={18} />
              {site.email}
            </a>
            <a href={site.github} className="flex items-center gap-3 hover:text-pine">
              <Github size={18} />
              github.com/Awes0meE
            </a>
            <p className="flex items-center gap-3">
              <MapPin size={18} />
              <BilingualText en={site.location} zh={site.locationZh} />
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
