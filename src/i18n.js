import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to LearnHub",
      joinFree: "Join Free",
      // Add all your strings here
    },
  },

hi: {
    translation: {
      welcome: "स्वागत है",
      Login: "लॉग इन करें",
      Register: "पंजीकरण करें",
      Email: "ईमेल",
      Password: "पासवर्ड",
      Submit: "सबमिट करें"
    },
  },




  es: {
    translation: {
      welcome: "Bienvenido a LearnHub",
      joinFree: "Únete Gratis",
      // Spanish translations
    },
  },
  // Add more languages here
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;