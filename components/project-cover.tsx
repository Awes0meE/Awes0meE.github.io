import Image from "next/image";
import type { ProjectMedia } from "@/lib/content";

type ProjectCoverProps = {
  media: ProjectMedia;
  alt: string;
  sizes: string;
  className?: string;
  preload?: boolean;
};

/**
 * A project cover card. When a dark variant exists both are rendered and the
 * theme stylesheet shows the matching one, so the image never flashes on a
 * theme switch.
 */
export function ProjectCover({ media, alt, sizes, className, preload }: ProjectCoverProps) {
  const base = `project-cover-image${className ? ` ${className}` : ""}`;

  if (!media.srcDark) {
    return <Image src={media.src} alt={alt} fill sizes={sizes} preload={preload} className={base} />;
  }

  return (
    <span className="project-cover-pair">
      <Image src={media.src} alt={alt} fill sizes={sizes} preload={preload} className={`${base} theme-image-light`} />
      <Image src={media.srcDark} alt={alt} fill sizes={sizes} preload={preload} className={`${base} theme-image-dark`} />
    </span>
  );
}
