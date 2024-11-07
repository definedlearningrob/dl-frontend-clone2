import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import updateTextMutation from '@dc/graphql/user/mutations/updateText';
import TextForm from '@dc/components/Admin/Lessons/Form/Items/Text/Form/Form';
import useLessonItems from '@dc/hooks/useLessonItems';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminLessonsFormItemsTextEdit.propTypes = {
  text: PropTypes.shape({
    content: PropTypes.string,
    displayName: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

function AdminLessonsFormItemsTextEdit({ text: { id, name, content, displayName } }) {
  const [updateText] = useMutation(updateTextMutation);
  const { closeForm } = useLessonItems();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    content: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    try {
      await updateText({ variables: { input: { id, ...values } } });
      callToast(
        'success',
        t('common.notifications.success.updated', { name: t('admin.lessons.items.text.label') })
      );
      closeForm();
    } catch (e) {
      const errors = getFormErrors(e);
      setErrors(errors);
    }
  };

  return (
    <Formik
      initialValues={{ name, content, displayName }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <TextForm
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

export default AdminLessonsFormItemsTextEdit;
