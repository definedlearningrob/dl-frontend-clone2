import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import updateReseachLinkMutation from '@dc/graphql/user/mutations/updateResearchLink';
import ResearchLinkForm from '@dc/components/Admin/Lessons/Form/Items/ResearchLink/Form/Form';
import useLessonItems from '@dc/hooks/useLessonItems';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminLessonsFormItemsResearchLinkEdit.propTypes = {
  researchLink: PropTypes.shape({
    author: PropTypes.string,
    displayName: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    resourceLink: PropTypes.string,
    sourceName: PropTypes.string,
  }),
};

function AdminLessonsFormItemsResearchLinkEdit({
  researchLink: { id, author, name, displayName, resourceLink, sourceName },
}) {
  const [updateResearchLink] = useMutation(updateReseachLinkMutation);
  const { closeForm } = useLessonItems();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    author: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
    resourceLink: Yup.string().required(t('validation.messages.required')),
    sourceName: Yup.string().required(t('validation.messages.required')),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    try {
      await updateResearchLink({ variables: { input: { id, ...values } } });
      callToast(
        'success',
        t('common.notifications.success.updated', {
          name: t('admin.lessons.items.researchLink.label'),
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
      initialValues={{ author, displayName, resourceLink, sourceName, name }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <ResearchLinkForm
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

export default AdminLessonsFormItemsResearchLinkEdit;
