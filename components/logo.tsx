import Link from "next/link";
import { BilingualText } from "@/components/bilingual-text";

/*
 * The iRidium mark and script wordmark are drawn as CSS masks over
 * themeable colours (see .site-logo-mark / .site-logo-wordmark), so the
 * approved PNG geometry stays untouched while each theme picks its ink.
 */
export function Logo() {
  return (
    <Link href="/" className="site-logo group flex min-w-0 items-center gap-3" aria-label="iRidium home">
      <span className="site-logo-mark" aria-hidden="true" />
      <span className="min-w-0 leading-tight">
        <span className="site-logo-wordmark" aria-hidden="true" />
        <span className="site-logo-subtitle block truncate text-xs text-graphite">
          <BilingualText en="Alvin Li · Robotic systems hardware" zh="Alvin Li · 机器人系统硬件" />
        </span>
      </span>
    </Link>
  );
}
