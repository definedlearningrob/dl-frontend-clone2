import * as Yup from 'yup';
import { t } from 'i18next';

import { isUrlValid } from '@dc/utils/isUrlValid';

import { CONTACT_LINK_TYPES } from '@shared/resources/enums';

export const imageDataValidationSchema = Yup.object()
  .shape({
    uuid: Yup.string().nullable(),
  })
  .test(
    'uuid-file-relationship',
    t('validation.messages.required'),
    (imageData) => !!imageData.file || !!imageData.url
  );

export const customLinkUrlValidationSchema = Yup.object().shape({
  type: Yup.string(),
  value: Yup.string().when('type', {
    is: CONTACT_LINK_TYPES.EMAIL,
    then: Yup.string().email(t('validation.messages.invalidEmail')),
    otherwise: Yup.string().when('type', {
      is: CONTACT_LINK_TYPES.CUSTOM,
      then: Yup.string().test('url', t('validation.messages.invalidURL'), isUrlValid),
      otherwise: Yup.string(),
    }),
  }),
  visible: Yup.boolean(),
});
