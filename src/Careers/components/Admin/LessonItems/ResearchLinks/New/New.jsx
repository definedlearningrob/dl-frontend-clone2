import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import createReseachLinkMutation from '@dc/graphql/user/mutations/createResearchLink';
import ResearchLinkForm from '@dc/components/Admin/Lessons/Form/Items/ResearchLink/Form/Form';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminLessonItemsResearchLinksNew.propTypes = {
  refetchQuery: PropTypes.object,
};

function AdminLessonItemsResearchLinksNew() {
  const [createResearchLink] = useMutation(createReseachLinkMutation);
  const { t } = useTranslation();
  const history = useHistory();

  const returnToResearchLinks = () => {
    history.goBack();
  };

  const validationSchema = Yup.object().shape({
    author: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
    resourceLink: Yup.string().required(t('validation.messages.required')),
    sourceName: Yup.string().required(t('validation.messages.required')),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    try {
      await createResearchLink({
        variables: { input: { ...values } },
      });
      callToast(
        'success',
        t('common.notifications.success.created', {
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
      initialValues={{ author: '', displayName: '', name: '', resourceLink: '', sourceName: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <ResearchLinkForm
          errors={errors}
          submit={submitForm}
          touched={touched}
          onCancel={returnToResearchLinks}
        />
      )}
    </Formik>
  );
}

export default AdminLessonItemsResearchLinksNew;
