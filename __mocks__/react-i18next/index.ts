/* eslint-disable import/no-import-module-exports */
import { I18nextProvider, initReactI18next } from 'react-i18next';

const useMock = {
  t: (key: string, options: object | undefined): string =>
    options ? `${key} - ${JSON.stringify(options)}` : key,
};

module.exports = {
  useTranslation: () => useMock,
  I18nextProvider,
  initReactI18next,
};
