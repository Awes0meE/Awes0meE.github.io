import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import {
  formatDateRange,
  formatDateRangeZh,
  formatStatusZh,
  type Project
} from "@/lib/content";

type ProjectEvidenceRowProps = {
  index: number;
  project: Project;
};

export function ProjectEvidenceRow({ index, project }: ProjectEvidenceRowProps) {
  const evidenceEn = project.assetPaths?.length ? "Case study + public files" : "Case study";
  const evidenceZh = project.assetPaths?.length ? "项目记录 + 公开文件" : "项目记录";
  const statusZh = formatStatusZh(project.status);
  const timelineEn = formatDateRange(project.date);
  const timelineZh = formatDateRangeZh(project.date);
  const focus = project.tags.slice(0, 3);
  const titleId = `project-${project.slug}-title`;
  const detailsId = `project-${project.slug}-details`;

  return (
    <article className="signal-project-row">
      <Link
        href={`/work/${project.slug}`}
        className="signal-project-row-link"
        aria-labelledby={titleId}
        aria-describedby={detailsId}
      >
        <span className="signal-project-number">{String(index + 1).padStart(2, "0")}</span>
        <span className="signal-project-identity">
          <span className="signal-project-cover">
            <Image
              src={project.cover}
              alt=""
              fill
              sizes="(min-width: 900px) 96px, 76px"
              className="object-cover"
            />
          </span>
          <span className="min-w-0">
            <strong id={titleId}><BilingualText en={project.title} zh={project.titleZh} /></strong>
            <small>
              <BilingualText en={project.status} zh={statusZh} />
            </small>
          </span>
        </span>
        <span className="signal-project-focus">
          {focus.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
        <span className="signal-project-evidence">
          <BilingualText en={evidenceEn} zh={evidenceZh} />
        </span>
        <span className="signal-project-timeline">
          <BilingualText en={timelineEn} zh={timelineZh} />
        </span>
        <ArrowUpRight className="signal-project-arrow" size={19} aria-hidden="true" />
        <span id={detailsId} className="sr-only">
          <BilingualText
            en={`Status: ${project.status}. Focus: ${focus.join(", ")}. Evidence: ${evidenceEn}. Timeline: ${timelineEn}.`}
            zh={`状态：${statusZh}。方向：${focus.join("、")}。证据：${evidenceZh}。时间：${timelineZh}。`}
          />
        </span>
      </Link>
    </article>
  );
}
