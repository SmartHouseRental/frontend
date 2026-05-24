import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { UI_STRINGS, formatUiString } from '@/lib/i18n/uiStrings';

const STORAGE_KEY = 'shr_locale';
const SUPPORTED_LOCALES = ['en', 'am'];

function readStoredLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LOCALES.includes(stored)) return stored;
  } catch {
    /* private mode / blocked storage */
  }
  return 'en';
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(readStoredLocale);

  const setLocale = useCallback((next) => {
    const value = SUPPORTED_LOCALES.includes(next) ? next : 'en';
    setLocaleState(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'am' : 'en');
  }, [locale, setLocale]);

  const t = useCallback(
    (key, vars) => {
      const template =
        UI_STRINGS[locale]?.[key] ?? UI_STRINGS.en[key] ?? key;
      return vars ? formatUiString(template, vars) : template;
    },
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, t }),
    [locale, setLocale, toggleLocale, t],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
