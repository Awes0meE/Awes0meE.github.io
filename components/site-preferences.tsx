"use client";

import { useEffect, useState } from "react";
import { Languages, Moon, Sun } from "lucide-react";

type Language = "en" | "zh";
type Theme = "light" | "dark";

const themeColors: Record<Theme, string> = {
  dark: "#080808",
  light: "#1e3a8a"
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

/**
 * Switch themes by revealing the new one as a circle that grows from the
 * pressed control. Falls back to a plain swap without View Transition types
 * or under reduced motion.
 */
function applyTheme(theme: Theme, origin?: HTMLElement | null) {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (origin) {
    const rect = origin.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    root.style.setProperty("--theme-reveal-x", `${x}px`);
    root.style.setProperty("--theme-reveal-y", `${y}px`);
    root.style.setProperty("--theme-reveal-r", `${radius}px`);
  }

  if (!reduceMotion && typeof document.startViewTransition === "function") {
    try {
      document.startViewTransition({ update: () => setDocumentTheme(theme), types: ["theme"] });
    } catch {
      document.startViewTransition(() => setDocumentTheme(theme));
    }
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

  function handleThemeChange(nextTheme: Theme, origin: HTMLElement) {
    if (nextTheme === theme) {
      return;
    }
    setTheme(nextTheme);
    applyTheme(nextTheme, origin);
  }

  return (
    <div className="language-toggle site-preferences inline-flex shrink-0 items-center gap-1 rounded-full border p-1">
      <span className="language-toggle-icon grid h-8 w-8 place-items-center rounded-full" aria-hidden="true">
        <Languages size={16} />
      </span>
      <div className="site-preference-group site-preference-language" role="group" aria-label="Language / 语言">
        <span className="site-preference-thumb" aria-hidden="true" />
        <button
          type="button"
          aria-pressed={language === "en"}
          onClick={() => handleLanguageChange("en")}
          className="language-option-en rounded-full text-xs font-semibold"
        >
          EN
        </button>
        <button
          type="button"
          aria-pressed={language === "zh"}
          onClick={() => handleLanguageChange("zh")}
          className="language-option-zh rounded-full text-xs font-semibold"
        >
          <span className="lang-en">ZH</span>
          <span className="lang-zh">简中</span>
        </button>
      </div>
      <span className="site-preference-divider" aria-hidden="true" />
      <div className="site-preference-group site-preference-theme" role="group" aria-label="Color theme / 显示主题">
        <span className="site-preference-thumb" aria-hidden="true" />
        <button
          type="button"
          aria-pressed={theme === "light"}
          onClick={(event) => handleThemeChange("light", event.currentTarget)}
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
          onClick={(event) => handleThemeChange("dark", event.currentTarget)}
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
