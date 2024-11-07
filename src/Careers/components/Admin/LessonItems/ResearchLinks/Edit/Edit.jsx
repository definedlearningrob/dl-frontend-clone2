import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import updateReseachLinkMutation from '@dc/graphql/user/mutations/updateResearchLink';
import ResearchLinkForm from '@dc/components/Admin/Lessons/Form/Items/ResearchLink/Form/Form';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';
import useQueryParams from '@shared/hooks/useQueryParams';

AdminLessonItemsResearchLinksEdit.propTypes = {
  researchLink: PropTypes.object,
};

function AdminLessonItemsResearchLinksEdit({ researchLink }) {
  const [updateResearchLink] = useMutation(updateReseachLinkMutation);
  const history = useHistory();
  const { t } = useTranslation();
  const { params } = useQueryParams();

  const { id, author, name, displayName, resourceLink, sourceName } = researchLink;

  const validationSchema = Yup.object().shape({
    author: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
    resourceLink: Yup.string().required(t('validation.messages.required')),
    sourceName: Yup.string().required(t('validation.messages.required')),
  });

  const returnToResearchLinks = () => {
    if (params.standaloneEdit === 'true') {
      window.close();

      return;
    }
    history.goBack();
  };

  const handleSubmit = async (values, { setErrors } = {}) => {
    try {
      await updateResearchLink({
        variables: { input: { id, ...values } },
      });
      callToast(
        'success',
        t('common.notifications.success.updated', {
          name: t('admin.lessons.items.researchLink.label'),
        })
      );
      returnToResearchLinks();
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
          onCancel={returnToResearchLinks}
        />
      )}
    </Formik>
  );
}

export default AdminLessonItemsResearchLinksEdit;
