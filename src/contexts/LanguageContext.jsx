import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const SUPPORTED_LOCALES = ['en', 'am'];

export function LanguageProvider({ children }) {
  return children;
}

export function useLanguage() {
  const { i18n, t } = useTranslation();

  return useMemo(() => {
    const activeLang = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0];
    const locale = SUPPORTED_LOCALES.includes(activeLang) ? activeLang : 'en';

    const setLocale = (nextLocale) => {
      const lang = SUPPORTED_LOCALES.includes(nextLocale) ? nextLocale : 'en';
      i18n.changeLanguage(lang);
    };

    return {
      locale,
      setLocale,
      toggleLocale: () => setLocale(locale === 'en' ? 'am' : 'en'),
      t,
    };
  }, [i18n, t]);
}
