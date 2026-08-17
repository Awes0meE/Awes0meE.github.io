import Image from "next/image";
import Link from "next/link";
import { BilingualText } from "@/components/bilingual-text";

export function Logo() {
  return (
    <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="Home">
      <Image
        src="/brand/iridium-mark.png"
        alt=""
        width={581}
        height={581}
        sizes="44px"
        loading="eager"
        className="h-11 w-11 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <span className="min-w-0 leading-tight">
        <span className="block truncate text-sm font-semibold text-ink">
          <BilingualText en="iRidium" zh="铱" />
        </span>
        <span className="block truncate text-xs text-graphite">
          <BilingualText en="Alvin Li · Robotic systems hardware" zh="Alvin Li · 机器人系统硬件" />
        </span>
      </span>
    </Link>
  );
}
