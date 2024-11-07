import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import AssignmentForm from '@dc/components/Admin/Lessons/Form/Items/Assignment/Form/Form';
import updateAssignmentMutation from '@dc/graphql/user/mutations/updateAssignment';
import useLessonItems from '@dc/hooks/useLessonItems';
import { getFormErrors } from '@dc/utils/graphql';
import { shapeAssignment } from '@dc/resources/typeDefs';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminLessonsFormItemsAssignmentEdit.propTypes = {
  assignment: shapeAssignment,
};

function AdminLessonsFormItemsAssignmentEdit({ assignment }) {
  const [updateAssignment] = useMutation(updateAssignmentMutation);
  const { closeForm } = useLessonItems();
  const { t } = useTranslation();

  const { assetName, description, displayName, id, rubrics } = assignment;

  const validationSchema = Yup.object().shape({
    assetName: Yup.string().required(t('validation.messages.required')),
    description: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
  });

  const initialValues = {
    assetName,
    description,
    displayName,
    rubrics,
  };

  const handleSubmit = async (values, { setErrors } = {}) => {
    const { assetName, description, displayName, rubrics } = values;
    try {
      await updateAssignment({
        variables: {
          input: {
            assetName,
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
      closeForm();
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
          onCancel={closeForm}
        />
      )}
    </Formik>
  );
}

export default AdminLessonsFormItemsAssignmentEdit;
