/**
 * i18n Configuration for House Rental Project
 *
 * Two approaches for localization:
 *
 * 1. Static UI Keys (locales/en/translation.json, locales/am/translation.json)
 *    - Used with useTranslation() hook: const { t } = useTranslation()
 *    - Example: t('owner.reviews.title') → "My Reviews" or Amharic equivalent
 *
 * 2. API-Backed Localized Fields
 *    For objects from the API that have multilingual fields like { en, am }:
 *
 *    a) getLocalizedText(value, preferredLanguage)
 *       - Located in: src/lib/utils/i18n.js
 *       - Usage: const text = getLocalizedText(property.title, 'am')
 *       - Fallback order: preferredLanguage → en → am → first available string
 *       - Best for: Any API field with { en, am } structure
 *
 *    b) getLocalizedField(field, locale)
 *       - Located in: src/lib/i18n/getLocalizedField.js
 *       - Usage: const text = getLocalizedField(property.description, 'am')
 *       - Fallback order: locale → en → am → first available string
 *       - Best for: Defensive access to multilingual API fields
 */

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import amTranslation from './locales/am/translation.json';

const resources = {
  en: { translation: enTranslation },
  am: { translation: amTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'am'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'shr_locale',
      caches: ['localStorage'],
    },
  });

export default i18n;
