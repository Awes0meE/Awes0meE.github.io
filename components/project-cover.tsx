import Image from "next/image";
import type { ProjectMedia } from "@/lib/content";

/**
 * One `sizes` for every place a cover morphs into the project page's lead figure (the
 * homepage wheel, the /work chapter and the lead itself). The browser then picks the same
 * file on both sides, so the project page reuses the image already decoded instead of
 * fetching and decoding a larger one while the entry transition runs.
 */
export const PROJECT_FIGURE_SIZES = "(min-width: 1280px) 900px, (min-width: 1024px) 70vw, 100vw";

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
