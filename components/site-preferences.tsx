"use client";

import { useEffect, useState } from "react";
import { Languages, Moon, Sun } from "lucide-react";

type Language = "en" | "zh";
type Theme = "light" | "dark";

const themeColors: Record<Theme, string> = {
  dark: "#080808",
  light: "#eeede9"
};

function readDocumentLanguage(): Language {
  return document.documentElement.dataset.lang === "zh" ? "zh" : "en";
}

function readDocumentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyLanguage(language: Language) {
  document.documentElement.dataset.lang = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  try {
    window.localStorage.setItem("portfolio-language", language);
  } catch {
    // Storage can be unavailable in private windows; the choice still applies to this page.
  }
}

function setDocumentTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
    meta.content = themeColors[theme];
  });
}

function applyTheme(theme: Theme) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion && typeof document.startViewTransition === "function") {
    document.startViewTransition(() => setDocumentTheme(theme));
  } else {
    setDocumentTheme(theme);
  }

  try {
    window.localStorage.setItem("portfolio-theme", theme);
  } catch {
    // Storage can be unavailable in private windows; the choice still applies to this page.
  }
}

export function SitePreferences() {
  const [language, setLanguage] = useState<Language | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setLanguage(readDocumentLanguage());
      setTheme(readDocumentTheme());
    });

    // Until the visitor chooses, keep following the operating-system setting.
    const media = window.matchMedia("(prefers-color-scheme: light)");
    function followSystem(event: MediaQueryListEvent) {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem("portfolio-theme");
      } catch {
        stored = null;
      }
      if (stored === "light" || stored === "dark") {
        return;
      }
      const next: Theme = event.matches ? "light" : "dark";
      setDocumentTheme(next);
      setTheme(next);
    }
    media.addEventListener("change", followSystem);

    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener("change", followSystem);
    };
  }, []);

  function handleLanguageChange(nextLanguage: Language) {
    setLanguage(nextLanguage);
    applyLanguage(nextLanguage);
  }

  function handleThemeChange(nextTheme: Theme) {
    if (nextTheme === theme) {
      return;
    }
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <div className="language-toggle site-preferences inline-flex shrink-0 items-center gap-1 rounded-full border p-1">
      <span className="language-toggle-icon grid h-8 w-8 place-items-center rounded-full" aria-hidden="true">
        <Languages size={16} />
      </span>
      <div className="site-preference-group" role="group" aria-label="Language / 语言">
        <button
          type="button"
          aria-pressed={language === "en"}
          onClick={() => handleLanguageChange("en")}
          className="language-option-en rounded-full px-3 py-1.5 text-xs font-semibold transition"
        >
          EN
        </button>
        <button
          type="button"
          aria-pressed={language === "zh"}
          onClick={() => handleLanguageChange("zh")}
          className="language-option-zh rounded-full px-3 py-1.5 text-xs font-semibold transition"
        >
          <span className="lang-en">ZH</span>
          <span className="lang-zh">简中</span>
        </button>
      </div>
      <span className="site-preference-divider" aria-hidden="true" />
      <div className="site-preference-group" role="group" aria-label="Color theme / 显示主题">
        <button
          type="button"
          aria-pressed={theme === "light"}
          onClick={() => handleThemeChange("light")}
          className="theme-option theme-option-light rounded-full"
        >
          <Sun size={16} aria-hidden="true" />
          <span className="sr-only">
            <span className="lang-en">Light theme</span>
            <span className="lang-zh">浅色主题</span>
          </span>
        </button>
        <button
          type="button"
          aria-pressed={theme === "dark"}
          onClick={() => handleThemeChange("dark")}
          className="theme-option theme-option-dark rounded-full"
        >
          <Moon size={16} aria-hidden="true" />
          <span className="sr-only">
            <span className="lang-en">Dark theme</span>
            <span className="lang-zh">深色主题</span>
          </span>
        </button>
      </div>
    </div>
  );
}
