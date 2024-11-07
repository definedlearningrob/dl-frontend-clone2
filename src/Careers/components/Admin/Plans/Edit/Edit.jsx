import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import createPlanMutation from '@dc/graphql/user/mutations/updatePlan';
import AdminPlansForm from '@dc/components/Admin/Plans/Form/Form';
import { getFormErrors } from '@dc/utils/graphql';
import { shapePlan } from '@dc/resources/typeDefs';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminPlansEdit.propTypes = {
  plan: shapePlan,
  refetchQuery: PropTypes.object,
};

function AdminPlansEdit({ plan: { description, groups, id, name } }) {
  const { t } = useTranslation();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
  });

  const [updatePlan] = useMutation(createPlanMutation);

  const handleSubmit = async ({ description, id, name, planGroups }, { setErrors } = {}) => {
    try {
      await updatePlan({
        variables: {
          input: {
            description,
            id,
            name,
            planGroups: planGroups.map(({ id, step }) => ({ id, step })),
          },
        },
      });

      callToast(
        'success',
        t('common.notifications.success.updated', { name: t('admin.plans.label') })
      );

      history.goBack();
    } catch (e) {
      const errors = getFormErrors(e);
      setErrors(errors);
    }
  };

  const initialValues = {
    id,
    name,
    description,
    planGroups: groups,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <AdminPlansForm errors={errors} title={t('admin.plans.form.edit')} touched={touched} />
      )}
    </Formik>
  );
}

export default AdminPlansEdit;
