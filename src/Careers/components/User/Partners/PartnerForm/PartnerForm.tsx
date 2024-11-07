import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { VISIBILITY_SCOPE } from '@dc/resources/enums';
import { CreatePartnerFormValues } from '@dc/screens/UserApp/Partners/CreatePartnerScreen';
import { PartnerFormContainer } from '@dc/components/User/Partners/PartnerForm/PartnerFormContainer';

type Props = {
  buttonLabel: string;
  title: string;
  initialValues: CreatePartnerFormValues;
  onSubmit: (values: CreatePartnerFormValues) => void;
};

export const PartnerForm = ({ title, buttonLabel, initialValues, onSubmit }: Props) => {
  const { t } = useTranslation();
  const validationSchema = yup.object().shape({
    about: yup.string().required(t('validation.messages.required')),
    entityUuids: yup.array().when('visibilityScope', {
      is: (visibilityScope: VISIBILITY_SCOPE) => visibilityScope === VISIBILITY_SCOPE.ENTITY,
      then: (schema) => schema.min(1, t('validation.messages.required')),
    }),
    name: yup.string().required(t('validation.messages.required')),
    pathways: yup.array().min(1, t('validation.messages.required')),
    visibilityScope: yup.string().oneOf([VISIBILITY_SCOPE.ALL, VISIBILITY_SCOPE.ENTITY]),
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <PartnerFormContainer buttonLabel={buttonLabel} title={title} />
    </Formik>
  );
};
