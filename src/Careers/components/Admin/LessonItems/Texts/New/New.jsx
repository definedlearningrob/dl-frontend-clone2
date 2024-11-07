import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import createTextMutation from '@dc/graphql/user/mutations/createText';
import TextForm from '@dc/components/Admin/Lessons/Form/Items/Text/Form/Form';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminLessonItemsTextsNew.propTypes = {
  refetchQuery: PropTypes.object,
};

function AdminLessonItemsTextsNew() {
  const [createText] = useMutation(createTextMutation);
  const { t } = useTranslation();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    content: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
  });

  const returnToTexts = () => {
    history.goBack();
  };

  const handleSubmit = async (values, { setErrors } = {}) => {
    try {
      await createText({
        variables: { input: { ...values } },
      });
      callToast(
        'success',
        t('common.notifications.success.created', { name: t('admin.lessons.items.text.label') })
      );
      returnToTexts();
    } catch (e) {
      const errors = getFormErrors(e);
      setErrors(errors);
    }
  };

  return (
    <Formik
      initialValues={{ name: '', content: '', displayName: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <TextForm errors={errors} submit={submitForm} touched={touched} onCancel={returnToTexts} />
      )}
    </Formik>
  );
}

export default AdminLessonItemsTextsNew;
