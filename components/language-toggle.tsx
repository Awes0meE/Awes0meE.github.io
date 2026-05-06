"use client";

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";

type Language = "en" | "zh";

function readDocumentLanguage(): Language {
  return document.documentElement.dataset.lang === "en" ? "en" : "zh";
}

function applyLanguage(language: Language) {
  document.documentElement.dataset.lang = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  window.localStorage.setItem("portfolio-language", language);
}

export function LanguageToggle() {
  const [language, setLanguage] = useState<Language | null>(null);

  useEffect(() => {
    setLanguage(readDocumentLanguage());
  }, []);

  function handleLanguageChange(nextLanguage: Language) {
    setLanguage(nextLanguage);
    applyLanguage(nextLanguage);
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-line bg-white p-1 shadow-sm">
      <span className="grid h-8 w-8 place-items-center rounded-full text-graphite">
        <Languages size={16} />
      </span>
      <button
        type="button"
        aria-pressed={language === "en"}
        onClick={() => handleLanguageChange("en")}
        className="language-option-en rounded-full px-3 py-1.5 text-xs font-semibold text-graphite transition hover:text-pine"
      >
        EN
      </button>
      <button
        type="button"
        aria-pressed={language === "zh"}
        onClick={() => handleLanguageChange("zh")}
        className="language-option-zh rounded-full px-3 py-1.5 text-xs font-semibold text-graphite transition hover:text-pine"
      >
        简中
      </button>
    </div>
  );
}
