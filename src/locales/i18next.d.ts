import {translations} from 'locales';

declare module 'i18next' {
  interface CustomTypeOptions {
    allowObjectInHTMLChildren: false;
    defaultNS: 'app';
    resources: (typeof translations)['es'];
    returnEmptyString: true;
    returnNull: false;
  }
}
