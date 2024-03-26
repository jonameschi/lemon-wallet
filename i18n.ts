import i18n from 'i18next';
import {translations} from 'locales';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: translations,
  lng: 'es',
  fallbackLng: 'es',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
  ns: ['app'],
  defaultNS: 'app',
  returnNull: false,
  returnEmptyString: true,
});
