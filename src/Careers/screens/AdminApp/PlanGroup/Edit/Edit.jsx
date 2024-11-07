import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AdminPlanGroupsForm from '@dc/components/Admin/PlanGroups/Form/Form';
import planGroupQuery from '@dc/graphql/user/queries/planGroup';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import updatePlanGroupMutation from '@dc/graphql/user/mutations/updatePlanGroup';
import { getFormErrors } from '@dc/utils/graphql';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { callToast } from '@shared/components/Toaster/Toaster';

function AdminAppPlanGroupNew() {
  const { t } = useTranslation();
  const history = useHistory();
  const { id } = useParams();

  const validationSchema = Yup.object().shape({
    description: Yup.string().required(t('validation.messages.required')),
    name: Yup.string().required(t('validation.messages.required')),
    statements: Yup.array().required(t('validation.messages.required')),
  });

  const [updatePlanGroup] = useMutation(updatePlanGroupMutation);

  const goToGroups = () => history.push('/admin/plan-groups');

  const handleSubmit = async (
    { id, name, description, displayName, statements },
    { setErrors } = {}
  ) => {
    try {
      await updatePlanGroup({
        variables: {
          input: {
            id,
            name,
            description,
            displayName,
            statementsOrder: statements.map(({ id, step }) => ({ id, step })),
          },
        },
      });

      callToast(
        'success',
        t('common.notifications.success.updated', {
          name: t('admin.planGroups.label'),
        })
      );

      goToGroups();
    } catch (e) {
      const errors = getFormErrors(e);
      setErrors(errors);
    }
  };

  const getInitialValues = ({ id, name, description, displayName, statements }) => ({
    id,
    name,
    description,
    displayName,
    statements,
  });

  return (
    <SharedMainContent>
      <SharedDataLoader options={{ variables: { id } }} query={planGroupQuery}>
        {({ planGroup }) => (
          <Formik
            enableReinitialize={true}
            initialValues={getInitialValues(planGroup)}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <AdminPlanGroupsForm
                errors={errors}
                group={planGroup}
                title={t('admin.planGroups.form.edit')}
                touched={touched}
              />
            )}
          </Formik>
        )}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default AdminAppPlanGroupNew;
