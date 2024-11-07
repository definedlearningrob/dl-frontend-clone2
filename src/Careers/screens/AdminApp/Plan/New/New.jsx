import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminPlansForm from '@dc/components/Admin/Plans/Form/Form';
import createPlanMutation from '@dc/graphql/user/mutations/createPlan';
import { getFormErrors } from '@dc/utils/graphql';
import SharedMainContent from '@dc/shared/MainContent/MainContent';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminAppPlanNew.propTypes = {
  refetchQuery: PropTypes.object,
};

function AdminAppPlanNew() {
  const { t } = useTranslation();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
  });

  const [createPlan] = useMutation(createPlanMutation);

  const handleSubmit = async ({ description, name, planGroups }, { setErrors } = {}) => {
    try {
      await createPlan({
        variables: {
          input: {
            description,
            name,
            planGroups: planGroups.map(({ id, step }) => ({ id, step })),
          },
        },
      });

      callToast(
        'success',
        t('common.notifications.success.created', { name: t('admin.plans.label') })
      );

      history.goBack();
    } catch (e) {
      const errors = getFormErrors(e);
      setErrors(errors);
    }
  };

  const initialValues = {
    name: '',
    description: '',
    planGroups: [],
  };

  return (
    <SharedMainContent>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <AdminPlansForm errors={errors} title={t('admin.plans.form.new')} touched={touched} />
        )}
      </Formik>
    </SharedMainContent>
  );
}

export default AdminAppPlanNew;
