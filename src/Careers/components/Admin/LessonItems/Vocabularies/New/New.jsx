import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import createVocabularyMutation from '@dc/graphql/user/mutations/createVocabulary';
import VocabularyForm from '@dc/components/Admin/Lessons/Form/Items/Vocabulary/Form/Form';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

function AdminLessonItemsVocabulariesNew() {
  const [createVocabulary] = useMutation(createVocabularyMutation);
  const { t } = useTranslation();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    definition: Yup.string().required(t('validation.messages.required')),
    term: Yup.string().required(t('validation.messages.required')),
  });

  const returnToVocabularies = () => {
    history.goBack();
  };

  const handleSubmit = async (values, { setErrors } = {}) => {
    try {
      await createVocabulary({
        variables: { input: { ...values } },
      });
      callToast('success', t('common.notifications.success.created', { name: 'Vocabulary' }));
      returnToVocabularies();
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
          onCancel={returnToVocabularies}
        />
      )}
    </Formik>
  );
}

export default AdminLessonItemsVocabulariesNew;
