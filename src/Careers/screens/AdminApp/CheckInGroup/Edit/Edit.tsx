import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GraphQLError } from 'graphql';

import { AdminCheckinGroupForm } from '@dc/components/Admin/CheckinGroups/Form/Form';
import checkInGroupQuery, {
  type TCheckInGroupData,
  type TCheckInQuestion,
} from '@dc/graphql/user/queries/checkinGroup';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import updateCheckInGroupMutation from '@dc/graphql/user/mutations/updateCheckInGroup';
import { getFormErrors } from '@dc/utils/graphql';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { callToast } from '@shared/components/Toaster/Toaster';

type FormFields = {
  badges: { id: string; imageUrl: string; name: string }[];
  displayName: string;
  name: string;
  checkInQuestions: TCheckInQuestion[];
};

type ErrorFields = {
  displayName: string;
  name: string;
  checkInQuestions: string;
};

type IncomingProperties = {
  badges: { id: string; imageUrl: string; name: string }[];
  displayName: string;
  name: string;
  questions: TCheckInQuestion[];
};

function AdminAppCheckinEdit() {
  const { t } = useTranslation();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('validation.messages.required')),
  });

  const [updateCheckInGroup] = useMutation(updateCheckInGroupMutation);

  const handleSubmit = async (
    { badges, checkInQuestions, displayName, name }: FormFields,
    { setErrors }: { setErrors?: (error: ErrorFields) => void } = {}
  ) => {
    const parsedCheckInQuestions = checkInQuestions.map((question) => ({
      questionId: question.id,
      step: question.step,
    }));

    try {
      await updateCheckInGroup({
        variables: {
          input: {
            badgeIds: badges.map(({ id }) => id),
            checkInQuestions: parsedCheckInQuestions,
            displayName,
            name,
            id,
          },
        },
      });

      callToast(
        'success',
        t('common.notifications.success.updated', {
          name: t('admin.checkInQuestions.label'),
        })
      );

      history.push('/admin/checkin-groups');
    } catch (error) {
      const errors = getFormErrors<ErrorFields>(error as { graphQLErrors: GraphQLError[] });

      setErrors && setErrors(errors);
    }
  };

  const getInitialValues = ({ badges, name, displayName, questions }: IncomingProperties) => ({
    badges,
    name,
    displayName,
    checkInQuestions: questions,
  });

  return (
    <SharedMainContent>
      <SharedDataLoader<TCheckInGroupData>
        options={{
          fetchPolicy: 'no-cache',
          variables: { id },
        }}
        query={checkInGroupQuery}>
        {({ checkInGroup }) => (
          <Formik
            enableReinitialize={true}
            initialValues={getInitialValues(checkInGroup)}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            <AdminCheckinGroupForm title={t('admin.checkInGroups.form.edit')} />
          </Formik>
        )}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default AdminAppCheckinEdit;
