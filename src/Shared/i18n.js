import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import sharedTranslation from '@shared/locales/en-us/translation';

i18n.use(initReactI18next).init({
  fallbackLng: 'en-us',
  // eslint-disable-next-line no-undef
  debug: import.meta.env.MODE === 'development',
  lng: 'en-us',
  resources: {
    'en-US': {
      translation: sharedTranslation,
    },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
