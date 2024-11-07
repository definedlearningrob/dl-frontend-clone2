import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import AssignmentForm from '@dc/components/Admin/Lessons/Form/Items/Assignment/Form/Form';
import createAssignmentMutation from '@dc/graphql/user/mutations/createAssignment';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminLessonItemsAssignmentsNew.propTypes = {
  refetchQuery: PropTypes.object,
};

function AdminLessonItemsAssignmentsNew() {
  const [createAssignment] = useMutation(createAssignmentMutation);
  const { t } = useTranslation();
  const history = useHistory();

  const returnToAssignments = () => {
    history.goBack();
  };

  const validationSchema = Yup.object().shape({
    assetName: Yup.string().required(t('validation.messages.required')),
    description: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    const { assetName, badges, description, displayName, rubrics } = values;
    try {
      await createAssignment({
        variables: {
          input: {
            assetName,
            badgeIds: badges.map((badge) => badge.id),
            description,
            displayName,
            rubricIds: rubrics.map((rubric) => rubric.id),
          },
        },
      });
      callToast(
        'success',
        t('common.notifications.success.created', {
          name: t('admin.lessons.items.assignment.label'),
        })
      );
      returnToAssignments();
    } catch (e) {
      const errors = getFormErrors(e);
      setErrors(errors);
    }
  };

  const initialValues = {
    assetName: '',
    badges: [],
    description: '',
    displayName: '',
    rubrics: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <AssignmentForm
          errors={errors}
          submit={submitForm}
          title={t('admin.lessons.items.assignment.new')}
          touched={touched}
          onCancel={returnToAssignments}
        />
      )}
    </Formik>
  );
}

export default AdminLessonItemsAssignmentsNew;
