import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import AssignmentForm from '@dc/components/Admin/Lessons/Form/Items/Assignment/Form/Form';
import updateAssignmentMutation from '@dc/graphql/user/mutations/updateAssignment';
import { getFormErrors } from '@dc/utils/graphql';
import { shapeAssignment } from '@dc/resources/typeDefs';

import { callToast } from '@shared/components/Toaster/Toaster';
import useQueryParams from '@shared/hooks/useQueryParams';

AdminLessonItemsAssignmentsEdit.propTypes = {
  assignment: shapeAssignment,
  refetchQuery: PropTypes.object,
};

function AdminLessonItemsAssignmentsEdit({ assignment }) {
  const [updateAssignment] = useMutation(updateAssignmentMutation);
  const { t } = useTranslation();
  const history = useHistory();
  const { params } = useQueryParams();

  const { assetName, badges, description, displayName, id, rubrics } = assignment;

  const returnToLessonItems = () => {
    if (params.standaloneEdit === 'true') {
      window.close();

      return;
    }
    history.goBack();
  };

  const validationSchema = Yup.object().shape({
    assetName: Yup.string().required(t('validation.messages.required')),
    description: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
  });

  const initialValues = {
    assetName,
    badges,
    description,
    displayName,
    rubrics,
  };

  const handleSubmit = async (values, { setErrors } = {}) => {
    const { assetName, badges, description, displayName, rubrics } = values;

    try {
      await updateAssignment({
        variables: {
          input: {
            assetName,
            badgeIds: badges.map((badge) => badge.id),
            description,
            displayName,
            id,
            rubricIds: rubrics.map((rubric) => rubric.id),
          },
        },
      });
      callToast(
        'success',
        t('common.notifications.success.updated', {
          name: t('admin.lessons.items.assignment.label'),
        })
      );
      returnToLessonItems();
    } catch (e) {
      const errors = getFormErrors(e);
      setErrors(errors);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched, submitForm }) => (
        <AssignmentForm
          errors={errors}
          id={id}
          submit={submitForm}
          touched={touched}
          onCancel={returnToLessonItems}
        />
      )}
    </Formik>
  );
}

export default AdminLessonItemsAssignmentsEdit;
