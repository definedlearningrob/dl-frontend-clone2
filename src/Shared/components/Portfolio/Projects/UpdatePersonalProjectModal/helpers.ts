import * as Yup from 'yup';
import i18n from 'i18next';

export const updatePersonalProjectValidationSchema = Yup.object().shape({
  projectName: Yup.string().required(i18n.t('validation.messages.required')),
});
