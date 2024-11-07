import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import updateTextMutation from '@dc/graphql/user/mutations/updateText';
import TextForm from '@dc/components/Admin/Lessons/Form/Items/Text/Form/Form';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';
import useQueryParams from '@shared/hooks/useQueryParams';

AdminLessonItemsTextsEdit.propTypes = {
  text: PropTypes.object,
};

function AdminLessonItemsTextsEdit({ text }) {
  const [updateText] = useMutation(updateTextMutation);
  const { t } = useTranslation();
  const history = useHistory();
  const { params } = useQueryParams();

  const { id, name, content, displayName } = text;

  const returnToTexts = () => {
    if (params.standaloneEdit === 'true') {
      window.close();

      return;
    }
    history.goBack();
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    try {
      await updateText({
        variables: { input: { id, ...values } },
      });
      callToast(
        'success',
        t('common.notifications.success.updated', { name: t('admin.lessons.items.text.label') })
      );
      returnToTexts();
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
          onCancel={returnToTexts}
        />
      )}
    </Formik>
  );
}

export default AdminLessonItemsTextsEdit;
