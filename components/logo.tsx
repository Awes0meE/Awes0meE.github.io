import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Home">
      <span className="relative grid h-10 w-10 place-items-center border border-pine/70">
        <span className="absolute left-2 top-2 h-5 w-px rotate-45 bg-pine transition-transform group-hover:rotate-[35deg]" />
        <span className="absolute bottom-2 left-2 h-px w-6 bg-pine" />
        <span className="absolute bottom-2 left-2 h-7 w-px bg-pine" />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-ink">Awes0meE / Li Zhiyi</span>
        <span className="block text-xs text-graphite">XJTLU · Undergraduate</span>
      </span>
    </Link>
  );
}
