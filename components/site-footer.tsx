import Link from "next/link";
import { Github, Mail, Rss } from "lucide-react";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 text-sm text-graphite md:grid-cols-[1fr_auto] lg:px-8">
        <p>(c) 2026 Awes0meE / Lizhiyi. Built with Next.js, TypeScript, MDX, and Tailwind CSS.</p>
        <div className="flex items-center gap-5 text-ink">
          <a href={site.github} aria-label="GitHub" className="transition hover:text-pine">
            <Github size={18} />
          </a>
          <a href={`mailto:${site.email}`} aria-label="Email" className="transition hover:text-pine">
            <Mail size={18} />
          </a>
          <Link href="/notes" aria-label="Notes feed" className="transition hover:text-pine">
            <Rss size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
