import type { Metadata } from "next";
import { BilingualText } from "@/components/bilingual-text";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/content";
import { openGraphBase, site } from "@/lib/site";

const pageTitle = "Work";
const pageDescription =
  "Project archives covering embedded control, schematic and PCB design, board bring-up, hardware–firmware integration, and robotic systems hardware.";
const socialTitle = `${pageTitle} | Alvin Li`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    ...openGraphBase,
    title: socialTitle,
    description: pageDescription,
    url: new URL("/work", site.url)
  },
  twitter: {
    title: socialTitle,
    description: pageDescription
  }
};

export default function WorkPage() {
  const projects = getProjects();

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-semibold text-ink">
          <BilingualText en="Work" zh="项目" />
        </h1>
        <p className="mt-5 text-lg leading-8 text-graphite">
          <BilingualText
            en="Project archives built around schematics, PCB work, firmware, debugging records, and test media, with unfinished prototype and validation limits kept visible."
            zh="这里按项目整理原理图、PCB、固件、调试记录和测试媒体，也保留原型阶段尚未完成的工作与验证限制。"
          />
        </p>
      </div>
      <div className="mt-10 grid gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
