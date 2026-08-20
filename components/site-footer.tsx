import Link from "next/link";
import { Github, Rss } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer border-t border-line bg-paper">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 text-sm text-graphite md:grid-cols-[1fr_auto] lg:px-8">
        <div className="site-footer-copy">
          <p>
            <BilingualText
              en="(c) 2026 Alvin Li · iRidium. Built with Next.js, TypeScript, MDX, and Tailwind CSS."
              zh="(c) 2026 Alvin Li · 铱。使用 Next.js、TypeScript、MDX 和 Tailwind CSS 构建。"
            />
          </p>
          <p className="site-footer-visual-note">
            <BilingualText
              en="Tracks indicate skill groups, not proficiency. Prototype imagery is illustrative; third-party marks belong to their owners."
              zh="轨道仅表示技术类别，不代表熟练度；原型图片用于视觉展示，第三方标识归各自权利人所有。"
            />
          </p>
        </div>
        <div className="site-footer-links flex items-center gap-5 text-ink">
          <a href={site.github} aria-label="GitHub" className="transition hover:text-pine">
            <Github size={18} />
          </a>
          <Link href="/notes" aria-label="Notes" className="transition hover:text-pine">
            <Rss size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
