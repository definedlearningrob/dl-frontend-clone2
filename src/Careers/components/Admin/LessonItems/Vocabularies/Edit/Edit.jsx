import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import updateVocabularyMutation from '@dc/graphql/user/mutations/updateVocabulary';
import VocabularyForm from '@dc/components/Admin/Lessons/Form/Items/Vocabulary/Form/Form';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';
import useQueryParams from '@shared/hooks/useQueryParams';

AdminLessonItemsVocabulariesEdit.propTypes = {
  vocabulary: PropTypes.object,
};

function AdminLessonItemsVocabulariesEdit({ vocabulary }) {
  const [updateVocabulary] = useMutation(updateVocabularyMutation);
  const { t } = useTranslation();
  const history = useHistory();
  const { params } = useQueryParams();

  const { id, term, definition } = vocabulary;

  const returnToVocabularies = () => {
    if (params.standaloneEdit === 'true') {
      window.close();

      return;
    }
    history.goBack();
  };

  const validationSchema = Yup.object().shape({
    definition: Yup.string().required(t('validation.messages.required')),
    term: Yup.string().required(t('validation.messages.required')),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    try {
      await updateVocabulary({
        variables: { input: { id, ...values } },
      });
      callToast(
        'success',
        t('common.notifications.success.updated', {
          name: t('admin.lessons.items.vocabulary.label'),
        })
      );
      returnToVocabularies();
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
          onCancel={returnToVocabularies}
        />
      )}
    </Formik>
  );
}

export default AdminLessonItemsVocabulariesEdit;
