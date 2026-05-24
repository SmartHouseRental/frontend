/**
 * Get localized text from a multi-language object
 * @param {Object|string} value - The value which can be an object with {en, am} keys or a string
 * @param {string} preferredLanguage - The preferred language ('en' or 'am')
 * @returns {string} The localized text
 */
export const getLocalizedText = (value, preferredLanguage = 'en') => {
  if (typeof value === 'string') {
    return value;
  }
  
  if (typeof value === 'object' && value !== null) {
    // Return the preferred language if available, otherwise fallback to the other language
    return value[preferredLanguage] || value.en || value.am || '';
  }
  
  return value || '';
};
