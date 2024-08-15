import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import de from "../locales/de/translation.json";
import en from "../locales/en/translation.json";
import es from "../locales/es/translation.json";
import fr from "../locales/fr/translation.json";
import it from "../locales/it/translation.json";
import jp from "../locales/jp/translation.json";
import pt from "../locales/pt/translation.json";
import zh from "../locales/zh/translation.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  de: {
    translation: de
  },
  en: {
    translation: en
  },
  es: {
    translation: es
  },
  fr: {
    translation: fr
  },
  it: {
    translation: it
  },
  jp: {
    translation: jp
  },
  pt: {
    translation: pt
  },
  zh: {
    translation: zh
  }
};

const detectionOptions = {
  // order and from where user language should be detected
  order: [ 'localStorage','sessionStorage', 'navigator', 'querystring', 'cookie', 'htmlTag', 'path', 'subdomain'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    resources,
    supportedLngs: ['en', 'de', 'es', 'fr', 'it', 'jp', 'pt', 'zh'],
    fallbackLng: 'en',
    detection: detectionOptions,
  });

export default i18n;
