import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import createPresentationMutation from '@dc/graphql/user/mutations/createExternalPresentation';
import PresentationForm from '@dc/components/Admin/Lessons/Form/Items/ExternalPresentation/Form/Form';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminLessonItemsExternalPresentationsNew.propTypes = {
  refetchQuery: PropTypes.object,
};

function AdminLessonItemsExternalPresentationsNew() {
  const [createPresentation] = useMutation(createPresentationMutation);
  const { t } = useTranslation();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    displayName: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
    source: Yup.string().url().required(t('validation.messages.required')),
  });

  const returnToPresentations = () => {
    history.goBack();
  };

  const handleSubmit = async (values, { setErrors } = {}) => {
    try {
      await createPresentation({
        variables: { input: { ...values } },
      });

      callToast(
        'success',
        t('common.notifications.success.created', {
          name: t('admin.lessons.items.presentation.label'),
        })
      );
      returnToPresentations();
    } catch (error) {
      const errors = getFormErrors(error);

      setErrors(errors);
    }
  };

  return (
    <Formik
      initialValues={{ displayName: '', name: '', source: '', isExpandable: false }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <PresentationForm
          errors={errors}
          submit={submitForm}
          touched={touched}
          onCancel={returnToPresentations}
        />
      )}
    </Formik>
  );
}

export default AdminLessonItemsExternalPresentationsNew;
