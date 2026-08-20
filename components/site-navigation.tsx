"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BilingualText } from "@/components/bilingual-text";
import { navItems } from "@/lib/site";

type SiteNavigationProps = {
  variant: "desktop" | "mobile";
};

function currentState(pathname: string, href: string) {
  if (pathname === href) {
    return "page" as const;
  }

  if (pathname.startsWith(`${href}/`)) {
    return "location" as const;
  }

  return undefined;
}

export function SiteNavigation({ variant }: SiteNavigationProps) {
  const pathname = usePathname();
  const isDesktop = variant === "desktop";
  const links = navItems.map((item, index) => {
    const ariaCurrent = currentState(pathname, item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={ariaCurrent}
        data-active={ariaCurrent ? "true" : undefined}
        className={isDesktop ? "site-nav-link" : "site-mobile-nav-link py-2.5 text-center text-xs font-semibold text-ink"}
      >
        {isDesktop ? (
          <span className="site-nav-index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
        <span className="site-nav-label">
          <BilingualText en={item.labelEn} zh={item.labelZh} />
        </span>
      </Link>
    );
  });

  if (isDesktop) {
    return (
      <nav
        aria-label="Primary navigation / 主导航"
        className="site-primary-nav hidden items-center gap-8 text-sm font-medium text-ink md:flex"
      >
        {links}
      </nav>
    );
  }

  return (
    <nav aria-label="Mobile navigation / 移动导航" className="site-mobile-nav border-t border-line/80 md:hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-4 px-3">{links}</div>
    </nav>
  );
}
