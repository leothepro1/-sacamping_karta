import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import sv from './locales/sv.json';
import en from './locales/en.json';
import de from './locales/de.json';

const htmlLang = document.documentElement.lang;
const supportedLangs = ['sv', 'en', 'de'] as const;
const detectedLang = supportedLangs.find((l) => htmlLang.startsWith(l)) ?? 'sv';

void i18n.use(initReactI18next).init({
  resources: {
    sv: { translation: sv },
    en: { translation: en },
    de: { translation: de },
  },
  lng: detectedLang,
  fallbackLng: 'sv',
  interpolation: { escapeValue: false },
});

export default i18n;
