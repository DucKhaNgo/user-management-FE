import en from './locales/en';
import errorEn from './locales/en/error';

export const DEFAULT_LANGUAGE = 'en';

// Language options
export const LANGUAGES = [
  {
    value: 'en',
    label: 'English',
  },
];

// Translations for i18n
export const RESOURCES = {
  en: {
    translation: en,
    error: errorEn,
  },
};
