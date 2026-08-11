import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { openGraphBase, site } from "@/lib/site";

const pageTitle = "About";
const pageDescription =
  "About Zhiyi Li, an NTU MSc (Robotics and Intelligent Systems) student focused on robotic systems hardware, PCB design, bring-up, and hardware–firmware integration.";
const socialTitle = `${pageTitle} | Zhiyi Li`;

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
  { en: "Robotic systems hardware", zh: "机器人系统硬件" },
  { en: "Robot control hardware", zh: "机器人主控硬件" },
  { en: "Flight-control electronics", zh: "飞控电子" },
  { en: "Schematic & PCB design", zh: "原理图与 PCB 设计" },
  { en: "Board bring-up & debugging", zh: "板级 bring-up 与调试" },
  { en: "Hardware–firmware integration", zh: "软硬件联调" },
  { en: "Motor-drive electronics", zh: "电机驱动电子" },
  { en: "Power electronics", zh: "电力电子" },
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
              en="I’m Zhiyi Li, a first-year student in the Master of Science (Robotics and Intelligent Systems) programme at Nanyang Technological University’s School of Mechanical and Aerospace Engineering. I graduated from Xi'an Jiaotong-Liverpool University in Communication Engineering."
              zh="我是 Zhiyi Li，现为南洋理工大学机械与航空航天工程学院机器人与智能系统硕士一年级学生，本科毕业于西交利物浦大学通信工程专业。"
            />
          </p>
          <p className="mt-5 leading-8 text-graphite">
            <BilingualText
              en="My direction is robotic systems hardware. I am building experience across robot control and flight-control electronics, schematic and PCB design, board bring-up, and hardware–firmware integration."
              zh="我的长期方向是机器人系统硬件。目前，我正在机器人主控与飞控电子、原理图与 PCB 设计、板级 bring-up 和软硬件联调等方面逐步积累经验。"
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
              github.com/Awes0meE
            </a>
          </div>
        </aside>
      </div>
    </main>
  );
}
