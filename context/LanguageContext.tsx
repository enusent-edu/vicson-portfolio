"use client";

import { createContext, useContext, useMemo } from "react";
import { translations, Language } from "@/lib/translations";

interface LanguageContextValue {
  language: Language;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language: Language = "en";

  const t = useMemo(() => {
    return (key: string) => {
      const dict = translations[language] as Record<string, string>;
      return dict[key] ?? key;
    };
  }, [language]);

  const value = useMemo(() => ({ language, t }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
