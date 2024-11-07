import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import createVocabularyMutation from '@dc/graphql/user/mutations/createVocabulary';
import useLessonItems from '@dc/hooks/useLessonItems';
import VocabularyForm from '@dc/components/Admin/Lessons/Form/Items/Vocabulary/Form/Form';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

function AdminLessonsFormItemsVocabularyNew() {
  const [createVocabulary] = useMutation(createVocabularyMutation);
  const { addItem, closeForm, refetchQuery } = useLessonItems();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    definition: Yup.string().required(t('validation.messages.required')),
    term: Yup.string().required(t('validation.messages.required')),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    try {
      const { data } = await createVocabulary({
        variables: { input: { ...values } },
        refetchQueries: [refetchQuery],
      });
      addItem(data.createVocabulary.vocabulary);
      callToast('success', t('common.notifications.success.created', { name: 'Vocabulary' }));
      closeForm();
    } catch (e) {
      const errors = getFormErrors(e);
      setErrors(errors);
    }
  };

  return (
    <Formik
      initialValues={{ term: '', definition: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <VocabularyForm
          errors={errors}
          submit={submitForm}
          touched={touched}
          onCancel={closeForm}
        />
      )}
    </Formik>
  );
}

export default AdminLessonsFormItemsVocabularyNew;
