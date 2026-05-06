import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, Mail, MapPin } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About / 关于"
};

const skills = [
  "Control systems",
  "Embedded C/C++",
  "Robotics",
  "Microcontrollers",
  "STM32",
  "Free-RTOS",
  "LVGL",
  "PCB",
  "Low-voltage electronics",
  "Python tooling",
  "Next.js full-stack",
  "Technical writing"
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
      <h1 className="text-5xl font-semibold text-ink">About / 关于</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.75fr]">
        <section>
          <p className="text-xl leading-9 text-ink">
            我是 Awes0meE，西交利物浦大学通信工程本科生。这个网站会逐步记录我的工程项目、学习笔记、实验媒体和作品集建设过程。
          </p>
          <p className="mt-5 leading-8 text-graphite">
            I am interested in systems that connect theory, hardware, and software: control loops that can be measured, embedded tools that can be reused, and robot behaviors that can be explained through evidence.
          </p>
          <p className="mt-5 leading-8 text-graphite">
            第一版先把内容结构和视觉风格搭起来，后续会继续补充真实项目截图、视频、论文材料、实验数据和更完整的 case study。
          </p>
          <Link href="/work" className="mt-8 inline-flex items-center gap-2 rounded-md bg-pine px-5 py-3 text-sm font-semibold text-white hover:bg-ink">
            View projects / 查看项目
            <ArrowRight size={16} />
          </Link>
        </section>
        <aside className="rounded-lg border border-line bg-white p-6">
          <h2 className="text-xl font-semibold text-ink">Focus Areas</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="rounded border border-line bg-paper px-3 py-2 text-sm text-graphite">
                {skill}
              </span>
            ))}
          </div>
          <h2 className="mt-8 text-xl font-semibold text-ink">Contact</h2>
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
              {site.location}
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
