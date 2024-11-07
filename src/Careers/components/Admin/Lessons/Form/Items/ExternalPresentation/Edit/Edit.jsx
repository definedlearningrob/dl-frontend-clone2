import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import updateExternalPresentationMutation from '@dc/graphql/user/mutations/updateExternalPresentation';
import PresentationForm from '@dc/components/Admin/Lessons/Form/Items/ExternalPresentation/Form/Form';
import useLessonItems from '@dc/hooks/useLessonItems';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminLessonsFormItemsExternalPresentationEdit.propTypes = {
  presentation: PropTypes.shape({
    displayName: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    source: PropTypes.string,
  }),
};

function AdminLessonsFormItemsExternalPresentationEdit({
  presentation: { id, name, source, displayName },
}) {
  const [updateExternalPresentation] = useMutation(updateExternalPresentationMutation);
  const { closeForm } = useLessonItems();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    displayName: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
    source: Yup.string().url().required(t('validation.messages.required')),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    try {
      await updateExternalPresentation({ variables: { input: { id, ...values } } });

      callToast(
        'success',
        t('common.notifications.success.updated', {
          name: t('admin.lessons.items.presentation.label'),
        })
      );
      closeForm();
    } catch (error) {
      const errors = getFormErrors(error);

      setErrors(errors);
    }
  };

  return (
    <Formik
      initialValues={{ name, source, displayName }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <PresentationForm
          errors={errors}
          id={id}
          submit={submitForm}
          touched={touched}
          onCancel={closeForm}
        />
      )}
    </Formik>
  );
}

export default AdminLessonsFormItemsExternalPresentationEdit;
