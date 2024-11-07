import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminPlanGroupsForm from '@dc/components/Admin/PlanGroups/Form/Form';
import createPlanGroupMutation from '@dc/graphql/user/mutations/createPlanGroup';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

function AdminAppPlanGroupNew() {
  const { t } = useTranslation();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
  });

  const [createPlanGroup] = useMutation(createPlanGroupMutation);

  const goToGroupEdit = (id) => {
    history.push(`/admin/plan-groups/${id}/edit`);
  };

  const handleSubmit = async ({ name, description, displayName }, { setErrors } = {}) => {
    try {
      const {
        data: {
          createPlanGroup: { planGroup },
        },
      } = await createPlanGroup({
        variables: {
          input: {
            name,
            description,
            displayName,
          },
        },
      });

      callToast(
        'success',
        t('common.notifications.success.created', {
          name: t('admin.planGroups.label'),
        })
      );

      goToGroupEdit(planGroup.id);
    } catch (e) {
      const errors = getFormErrors(e);
      setErrors(errors);
    }
  };

  const initialValues = {
    name: '',
    description: '',
    displayName: '',
  };

  return (
    <SharedMainContent>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <AdminPlanGroupsForm
            errors={errors}
            title={t('admin.planGroups.form.new')}
            touched={touched}
          />
        )}
      </Formik>
    </SharedMainContent>
  );
}

export default AdminAppPlanGroupNew;
