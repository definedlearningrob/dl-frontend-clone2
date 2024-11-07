import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import createPresentationMutation from '@dc/graphql/user/mutations/createExternalPresentation';
import PresentationForm from '@dc/components/Admin/Lessons/Form/Items/ExternalPresentation/Form/Form';
import useLessonItems from '@dc/hooks/useLessonItems';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

function AdminLessonsFormItemsExternalPresentationNew() {
  const [createPresentation] = useMutation(createPresentationMutation);
  const { addItem, closeForm, refetchQuery } = useLessonItems();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    displayName: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
    source: Yup.string().url().required(t('validation.messages.required')),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    try {
      const { data } = await createPresentation({
        variables: { input: { ...values } },
        refetchQueries: [refetchQuery],
      });

      addItem(data.createExternalPresentation.presentation);
      callToast(
        'success',
        t('common.notifications.success.created', {
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
      initialValues={{ displayName: '', name: '', source: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <PresentationForm
          errors={errors}
          submit={submitForm}
          touched={touched}
          onCancel={closeForm}
        />
      )}
    </Formik>
  );
}

export default AdminLessonsFormItemsExternalPresentationNew;
