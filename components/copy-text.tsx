"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";

export function CopyText({ text, label, className }: { text: string; label: { en: string; zh: string }; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      className={className}
      data-copied={copied || undefined}
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => setCopied(true), () => setCopied(false));
      }}
    >
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      <span className="sr-only"><BilingualText en={label.en} zh={label.zh} /></span>
      <span aria-live="polite">
        {copied ? <BilingualText en="Copied" zh="已复制" /> : <BilingualText en="Copy" zh="复制" />}
      </span>
    </button>
  );
}
