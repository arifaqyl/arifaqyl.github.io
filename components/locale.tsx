"use client";

import { useEffect, useSyncExternalStore } from "react";

export type Locale = "en" | "ms";

const STORAGE_KEY = "arifaqyl-locale";
const DEFAULT_LOCALE: Locale = "en";

type Entry = { en: string; ms: string };
type Dict = Record<string, Entry>;

const DICTIONARY: Dict = {
  "nav.home": { en: "home", ms: "utama" },
  "nav.live": { en: "live", ms: "langsung" },
  "nav.projects": { en: "projects", ms: "projek" },
  "nav.now": { en: "now", ms: "kini" },
  "nav.contact": { en: "contact", ms: "hubung" },
  "nav.github": { en: "github", ms: "github" },
  "footer.tagline": {
    en: "Built to explain the work, not just decorate it.",
    ms: "Dibina untuk menerangkan kerja, bukan sekadar hiasan."
  },
  "footer.stack": {
    en: "Next.js + Prisma + PostgreSQL-ready portfolio system.",
    ms: "Sistem portfolio Next.js + Prisma + sedia PostgreSQL."
  },
  "locale.toggle-to": {
    en: "Tukar ke Bahasa Melayu",
    ms: "Switch to English"
  },
  "locale.label": { en: "BM", ms: "EN" },
  "a11y.skip": { en: "Skip to content", ms: "Langkau ke kandungan" }
};

function readStored(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "ms") return stored;
  } catch {
    // localStorage unavailable (private mode) — fall through to default.
  }
  return DEFAULT_LOCALE;
}

let currentLocale: Locale =
  typeof window !== "undefined" ? readStored() : DEFAULT_LOCALE;
const listeners = new Set<() => void>();

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): Locale {
  return currentLocale;
}

function getServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

function setLocale(next: Locale): void {
  if (next === currentLocale) return;
  currentLocale = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Ignore write failures (private mode).
  }
  listeners.forEach((listener) => listener());
}

function toggleLocale(): void {
  setLocale(currentLocale === "en" ? "ms" : "en");
}

export function useLocale() {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Reflect the active locale onto <html lang> after hydration so the
  // server-rendered attribute hydrates cleanly, then tracks the stored value.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return {
    locale,
    setLocale,
    toggle: toggleLocale,
    t: (key: string): string => {
      const entry = DICTIONARY[key];
      return entry ? entry[locale] : key;
    }
  };
}

