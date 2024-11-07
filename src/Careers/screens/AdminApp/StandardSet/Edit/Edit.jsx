import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AdminStandardSetsForm from '@dc/components/Admin/StandardSets/Form/Form';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import standardSetQuery from '@dc/graphql/user/queries/standardSet';
import updateStandardSetMutation from '@dc/graphql/user/mutations/updateStandardSet';
import { getFormErrors } from '@dc/utils/graphql';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { callToast } from '@shared/components/Toaster/Toaster';

function AdminAppStandardSetEdit() {
  const { t } = useTranslation();
  const history = useHistory();
  const { standardSetId } = useParams();

  const validationSchema = Yup.object().shape({
    displayName: Yup.string().required(t('validation.messages.required')),
  });

  const [updateStandardSet] = useMutation(updateStandardSetMutation);

  const handleSubmit = async ({ id, displayName }, { setErrors } = {}) => {
    try {
      await updateStandardSet({
        variables: {
          input: {
            id,
            displayName,
          },
        },
      });

      callToast(
        'success',
        t('common.notifications.success.updated', {
          name: t('admin.standardSets.label'),
        })
      );

      history.goBack();
    } catch (error) {
      const errors = getFormErrors(error);
      setErrors(errors);
    }
  };

  const getInitialValues = ({ id, displayName }) => ({
    id,
    displayName,
  });

  return (
    <SharedMainContent>
      <SharedDataLoader options={{ variables: { id: standardSetId } }} query={standardSetQuery}>
        {({ standardSet }) => (
          <Formik
            initialValues={getInitialValues(standardSet)}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <AdminStandardSetsForm
                errors={errors}
                standardSet={standardSet}
                title={t('admin.standardSets.formTitle')}
                touched={touched}
              />
            )}
          </Formik>
        )}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default AdminAppStandardSetEdit;
