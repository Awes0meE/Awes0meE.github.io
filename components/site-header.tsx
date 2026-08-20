import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";
import { LanguageToggle } from "@/components/language-toggle";
import { Logo } from "@/components/logo";
import { SiteNavigation } from "@/components/site-navigation";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="site-header-inner mx-auto flex min-w-0 max-w-7xl items-center justify-between gap-2 px-5 py-4 sm:gap-4 lg:px-8">
        <Logo />
        <SiteNavigation variant="desktop" />
        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle />
          <Link
            href="/work"
            className="site-header-cta hidden items-center gap-2 rounded-md border border-pine px-4 py-2 text-sm font-semibold text-pine transition hover:bg-pine hover:text-white lg:flex"
          >
            <BilingualText en="View Projects" zh="查看项目" />
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <SiteNavigation variant="mobile" />
    </header>
  );
}
