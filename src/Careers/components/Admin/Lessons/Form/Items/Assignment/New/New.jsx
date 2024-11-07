import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import AssignmentForm from '@dc/components/Admin/Lessons/Form/Items/Assignment/Form/Form';
import createAssignmentMutation from '@dc/graphql/user/mutations/createAssignment';
import useLessonItems from '@dc/hooks/useLessonItems';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

function AdminLessonsFormItemsAssignmentNew() {
  const [createAssignment] = useMutation(createAssignmentMutation);
  const { addItem, closeForm, refetchQuery } = useLessonItems();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    assetName: Yup.string().required(t('validation.messages.required')),
    description: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string().required(t('validation.messages.required')),
  });

  const handleSubmit = async (values, { setErrors } = {}) => {
    const { assetName, badges, description, displayName, rubrics } = values;
    try {
      const { data } = await createAssignment({
        variables: {
          input: {
            assetName,
            badgeIds: badges.map((badge) => badge.id),
            description,
            displayName,
            rubricIds: rubrics.map((rubric) => rubric.id),
          },
        },
        refetchQueries: [refetchQuery],
      });
      addItem(data.createAssignment.assignment);
      callToast(
        'success',
        t('common.notifications.success.created', {
          name: t('admin.lessons.items.assignment.label'),
        })
      );
      closeForm();
    } catch (e) {
      const errors = getFormErrors(e);
      setErrors(errors);
    }
  };

  const initialValues = {
    badges: [],
    assetName: '',
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
          touched={touched}
          onCancel={closeForm}
        />
      )}
    </Formik>
  );
}

export default AdminLessonsFormItemsAssignmentNew;
