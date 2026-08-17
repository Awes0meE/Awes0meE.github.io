import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github, Mail } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { openGraphBase, site } from "@/lib/site";

const pageTitle = "About";
const pageDescription =
  "About Alvin Li, an NTU Master of Science (Robotics and Intelligent Systems) student focused on embedded control hardware, PCB design, board bring-up, motor drives, and power electronics.";
const socialTitle = `${pageTitle} | Alvin Li`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    ...openGraphBase,
    title: socialTitle,
    description: pageDescription,
    url: new URL("/about", site.url)
  },
  twitter: {
    title: socialTitle,
    description: pageDescription
  }
};

const skills = [
  { en: "Embedded control hardware", zh: "嵌入式控制硬件" },
  { en: "STM32 & ESP32 firmware", zh: "STM32 与 ESP32 固件" },
  { en: "Schematic capture & PCB layout", zh: "原理图设计与 PCB 布局" },
  { en: "Board bring-up & failure analysis", zh: "板级 bring-up 与故障分析" },
  { en: "Hardware–firmware integration", zh: "软硬件联调" },
  { en: "Motor drives, FOC & SVPWM", zh: "电机驱动、FOC 与 SVPWM" },
  { en: "Power conversion & sensing", zh: "电源变换与采样" },
  { en: "Embedded C/C++", zh: "嵌入式 C/C++" }
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
              en="I’m Alvin Li, currently pursuing the Master of Science (Robotics and Intelligent Systems) at the School of Mechanical and Aerospace Engineering, Nanyang Technological University, Singapore. I hold a BEng (Hons) in Telecommunications Engineering with First Class Honours from Xi'an Jiaotong-Liverpool University."
              zh="我是 Alvin Li，现于新加坡南洋理工大学机械与航空航天工程学院攻读机器人与智能系统理学硕士；本科毕业于西交利物浦大学通信工程专业，获一等荣誉学位。"
            />
          </p>
          <p className="mt-5 leading-8 text-graphite">
            <BilingualText
              en="My engineering work focuses on embedded control hardware, schematic capture and PCB layout, board bring-up, firmware integration, motor-drive electronics, and power conversion."
              zh="我的工程实践集中在嵌入式控制硬件、原理图设计与 PCB 布局、板级 bring-up、固件联调、电机驱动和电源变换。"
            />
          </p>
          <p className="mt-5 leading-8 text-graphite">
            <BilingualText
              en="The project pages stay close to the work itself: schematics, board renders, firmware, measurements, bring-up notes, and test media. Where a prototype or validation step is unfinished, the limitation stays visible."
              zh="项目页面尽量贴近工作本身：原理图、板卡渲染、固件、测量结果、bring-up 记录和测试媒体。原型或验证尚未完成时，限制也会明确保留下来。"
            />
          </p>
          <p className="mt-5 leading-8 text-graphite">
            <BilingualText
              en="I am especially interested in motor-drive electronics and power electronics, where control decisions become voltage, current, heat, and physical motion."
              zh="我也特别关注电机驱动和电力电子，因为控制决策最终会在这里变成真实的电压、电流、温升和机械运动。"
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
            <a href={site.github} className="flex items-center gap-3 hover:text-pine">
              <Github size={18} />
              <BilingualText en="GitHub profile" zh="GitHub 主页" />
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-pine">
              <Mail size={18} />
              {site.email}
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}
