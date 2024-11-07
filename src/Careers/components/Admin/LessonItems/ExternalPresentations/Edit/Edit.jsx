import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import PresentationForm from '@dc/components/Admin/Lessons/Form/Items/ExternalPresentation/Form/Form';
import updatePresentationMutation from '@dc/graphql/user/mutations/updateExternalPresentation';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';
import useQueryParams from '@shared/hooks/useQueryParams';

AdminLessonItemsExternalPresentationsEdit.propTypes = {
  externalPresentation: PropTypes.object,
};

function AdminLessonItemsExternalPresentationsEdit({ externalPresentation }) {
  const [updatePresentation] = useMutation(updatePresentationMutation);
  const { t } = useTranslation();
  const history = useHistory();
  const { params } = useQueryParams();

  const { displayName, id, name, source, isExpandable } = externalPresentation;

  const returnToPresentations = () => {
    if (params.standaloneEdit === 'true') {
      window.close();

      return;
    }
    history.goBack();
  };

  const validationSchema = Yup.object().shape({
    displayName: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
    source: Yup.string().url().required(t('validation.messages.required')),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    try {
      await updatePresentation({
        variables: { input: { id, ...values } },
      });

      callToast(
        'success',
        t('common.notifications.success.updated', {
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
      initialValues={{ name, source, displayName, isExpandable }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <PresentationForm
          errors={errors}
          id={id}
          submit={submitForm}
          touched={touched}
          onCancel={returnToPresentations}
        />
      )}
    </Formik>
  );
}

export default AdminLessonItemsExternalPresentationsEdit;
