import * as Yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import createRubricMutation from '@dc/graphql/user/mutations/createRubric';
import Form from '@dc/components/Admin/Rubrics/CreateModal/Form/Form';
import { getFormErrors } from '@dc/utils/graphql';

import createRubricHeadingMutation from '@shared/graphql/user/mutations/createRubricHeading';
import createRubricCriteriaLabelMutation from '@shared/graphql/user/mutations/createRubricCriteriaLabel';
import SharedModal from '@shared/components/Modal/Modal';
import { callToast } from '@shared/components/Toaster/Toaster';

import '@dc/components/Admin/Rubrics/CreateModal/CreateModal.sass';

AdminRubricsCreateModal.propTypes = {
  onClose: PropTypes.func,
};

function AdminRubricsCreateModal({ onClose }) {
  const { t } = useTranslation();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(t('validation.messages.required')),
    displayName: Yup.string(),
    name: Yup.string().required(t('validation.messages.required')),
  });

  const [createRubric] = useMutation(createRubricMutation);
  const [createRubricCriteriabel] = useMutation(createRubricCriteriaLabelMutation);
  const [createRubricHeading] = useMutation(createRubricHeadingMutation);

  const createCriteriaLabels = (rubric) =>
    [1, 2].map((score) =>
      createRubricCriteriabel({
        variables: {
          input: { score, rubricId: rubric.id },
        },
      })
    );

  const createCriteriaHeadings = (rubric) => {
    const defaultHeading = {
      rubricId: rubric.id,
      name: t('admin.rubrics.defaultHeading'),
      multiplier: 1,
    };

    return [1, 2].map((_) => createRubricHeading({ variables: { input: { ...defaultHeading } } }));
  };

  const handleSubmit = async ({ name, description, displayName }, { setErrors } = {}) => {
    try {
      const {
        data: {
          createRubric: { rubric },
        },
      } = await createRubric({
        variables: {
          input: {
            name,
            description,
            displayName: displayName || name,
          },
        },
      });

      await Promise.all([...createCriteriaLabels(rubric), ...createCriteriaHeadings(rubric)]);

      callToast(
        'success',
        t('common.notifications.success.created', { name: t('admin.rubrics.label') })
      );

      history.push(`/admin/rubrics/${rubric.id}/edit`);
    } catch (e) {
      const errors = getFormErrors(e);
      setErrors(errors);
    }
  };

  const initialValues = {
    name: '',
    displayName: '',
    description: '',
  };

  return (
    <SharedModal isOpen={true} onDismiss={onClose}>
      <SharedModal.Header>
        <SharedModal.Heading>{t('admin.rubrics.modal.title')}</SharedModal.Heading>
      </SharedModal.Header>
      <SharedModal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ errors, touched }) => <Form errors={errors} touched={touched} onClose={onClose} />}
        </Formik>
      </SharedModal.Body>
    </SharedModal>
  );
}

export default AdminRubricsCreateModal;
