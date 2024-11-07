import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { merge } from 'lodash-es';

import translation from '@dc/locales/en-us/translation';

import sharedTranslation from '@shared/locales/en-us/translation';

i18n.use(initReactI18next).init({
  fallbackLng: 'en-us',
  debug: import.meta.env.MODE === 'development',
  lng: 'en-us',
  resources: {
    'en-US': {
      translation: merge(translation, sharedTranslation),
    },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
