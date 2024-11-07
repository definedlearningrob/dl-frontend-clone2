import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import updateVocabularyMutation from '@dc/graphql/user/mutations/updateVocabulary';
import useLessonItems from '@dc/hooks/useLessonItems';
import VocabularyForm from '@dc/components/Admin/Lessons/Form/Items/Vocabulary/Form/Form';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminLessonsFormItemsVocabularyEdit.propTypes = {
  vocabulary: PropTypes.shape({
    definition: PropTypes.string,
    id: PropTypes.string,
    term: PropTypes.string,
  }),
};

function AdminLessonsFormItemsVocabularyEdit({ vocabulary: { id, term, definition } }) {
  const [updateVocabulary] = useMutation(updateVocabularyMutation);
  const { closeForm } = useLessonItems();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    definition: Yup.string().required(t('validation.messages.required')),
    term: Yup.string().required(t('validation.messages.required')),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    try {
      await updateVocabulary({ variables: { input: { id, ...values } } });
      callToast(
        'success',
        t('common.notifications.success.updated', {
          name: t('admin.lessons.items.vocabulary.label'),
        })
      );
      closeForm();
    } catch (e) {
      const errors = getFormErrors(e);
      setErrors(errors);
    }
  };

  return (
    <Formik
      initialValues={{ term, definition }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <VocabularyForm
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

export default AdminLessonsFormItemsVocabularyEdit;
