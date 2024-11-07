import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import createTextMutation from '@dc/graphql/user/mutations/createText';
import TextForm from '@dc/components/Admin/Lessons/Form/Items/Text/Form/Form';
import useLessonItems from '@dc/hooks/useLessonItems';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

function AdminLessonsFormItemsTextNew() {
  const [createText] = useMutation(createTextMutation);
  const { addItem, closeForm, refetchQuery } = useLessonItems();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    content: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    try {
      const { data } = await createText({
        variables: { input: { ...values } },
        refetchQueries: [refetchQuery],
      });
      addItem(data.createText.text);
      callToast(
        'success',
        t('common.notifications.success.created', { name: t('admin.lessons.items.text.label') })
      );
      closeForm();
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
        <TextForm errors={errors} submit={submitForm} touched={touched} onCancel={closeForm} />
      )}
    </Formik>
  );
}

export default AdminLessonsFormItemsTextNew;
