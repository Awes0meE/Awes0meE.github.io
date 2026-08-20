import Image from "next/image";
import Link from "next/link";
import { BilingualText } from "@/components/bilingual-text";

export function Logo() {
  return (
    <Link href="/" className="site-logo group flex min-w-0 items-center gap-3" aria-label="iRidium home">
      <Image
        src="/brand/iridium-mark.png"
        alt=""
        width={581}
        height={581}
        sizes="44px"
        loading="eager"
        className="site-logo-mark h-11 w-11 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <span className="min-w-0 leading-tight">
        <span className="block h-[26px]">
          <Image
            src="/brand/iridium-wordmark-script.png"
            alt=""
            width={1417}
            height={363}
            sizes="102px"
            loading="eager"
            className="site-logo-wordmark h-[26px] w-auto object-contain object-left"
          />
        </span>
        <span className="site-logo-subtitle block truncate text-xs text-graphite">
          <BilingualText en="Alvin Li · Robotic systems hardware" zh="Alvin Li · 机器人系统硬件" />
        </span>
      </span>
    </Link>
  );
}
