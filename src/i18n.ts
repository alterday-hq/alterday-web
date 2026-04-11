import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import pl from './locales/pl.json';

const LANG_KEY = 'alterday-lang';
const saved = localStorage.getItem(LANG_KEY);
const initialLng = saved === 'pl' ? 'pl' : 'en';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pl: { translation: pl },
  },
  lng: initialLng,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng) => localStorage.setItem(LANG_KEY, lng));

export default i18n;
