import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BilingualTextProps = {
  en: string;
  zh: ReactNode;
  className?: string;
};

export function BilingualText({ en, zh, className }: BilingualTextProps) {
  return (
    <span className={cn("bilingual-text", className)}>
      <span className="lang-en">{en}</span>
      <span className="lang-zh">{zh}</span>
    </span>
  );
}
