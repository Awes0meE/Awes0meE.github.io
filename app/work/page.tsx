import type { Metadata } from "next";
import { BilingualText } from "@/components/bilingual-text";
import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "项目"
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
            en="Case studies for control systems, embedded hardware, robotics, and the portfolio platform itself."
            zh="这里会持续整理项目背景、工程过程、技术栈、实验记录和可验证成果。"
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
