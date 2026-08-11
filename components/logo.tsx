import Link from "next/link";
import { BilingualText } from "@/components/bilingual-text";

export function Logo() {
  return (
    <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="Home">
      <span className="relative grid h-10 w-10 shrink-0 place-items-center border border-pine/70">
        <span className="absolute left-2 top-2 h-5 w-px rotate-45 bg-pine transition-transform group-hover:rotate-[35deg]" />
        <span className="absolute bottom-2 left-2 h-px w-6 bg-pine" />
        <span className="absolute bottom-2 left-2 h-7 w-px bg-pine" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-sm font-semibold text-ink">
          Awes0meE<span className="hidden sm:inline"> / 66CCFF Labs</span>
        </span>
        <span className="block truncate text-xs text-graphite">
          <BilingualText en="Robotic systems hardware" zh="机器人系统硬件" />
        </span>
      </span>
    </Link>
  );
}
