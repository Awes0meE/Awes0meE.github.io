import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { navItems } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-ink md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="underline-offset-[10px] transition hover:text-pine hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/work"
          className="hidden items-center gap-2 rounded-md border border-pine px-4 py-2 text-sm font-semibold text-pine transition hover:bg-pine hover:text-white sm:flex"
        >
          View Projects / 查看项目
          <ArrowRight size={16} />
        </Link>
      </div>
    </header>
  );
}
