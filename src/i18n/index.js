import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { RESOURCES, DEFAULT_LANGUAGE } from './configs';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources: RESOURCES,
    fallbackLng: DEFAULT_LANGUAGE,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
