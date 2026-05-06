import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type SectionHeadingProps = {
  title: ReactNode;
  action?: {
    href: string;
    label: ReactNode;
  };
};

export function SectionHeading({ title, action }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 className="text-2xl font-semibold tracking-normal text-ink">{title}</h2>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 text-sm font-medium text-pine transition hover:text-copper"
        >
          {action.label}
          <ArrowRight size={15} />
        </Link>
      ) : null}
    </div>
  );
}
