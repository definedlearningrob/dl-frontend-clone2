import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { GraphQLError } from 'graphql';

import { AdminCheckinGroupForm } from '@dc/components/Admin/CheckinGroups/Form/Form';
import createCheckInGroupMutation from '@dc/graphql/user/mutations/createCheckInGroup';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { getFormErrors } from '@dc/utils/graphql';
import { type TCheckInQuestion } from '@dc/graphql/user/queries/checkinGroup';

import { callToast } from '@shared/components/Toaster/Toaster';

type FormFields = {
  displayName: string;
  badges: { id: string; imageUrl: string; name: string }[];
  name: string;
  checkInQuestions: TCheckInQuestion[];
};

type ErrorFields = {
  displayName: string;
  name: string;
  checkInQuestions: string;
};

export const NewCheckinGroup = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('validation.messages.required')),
  });

  const [createCheckInGroup] = useMutation(createCheckInGroupMutation);

  const handleSubmit = async (
    { badges, checkInQuestions, displayName, name }: FormFields,
    { setErrors }: { setErrors?: (error: ErrorFields) => void } = {}
  ) => {
    const parsedCheckInQuestions = checkInQuestions.map((question) => ({
      questionId: question.id,
      step: question.step,
    }));

    try {
      await createCheckInGroup({
        variables: {
          input: {
            badgeIds: badges.map(({ id }) => id),
            checkInQuestions: parsedCheckInQuestions,
            displayName,
            name,
          },
        },
      });

      callToast(
        'success',
        t('common.notifications.success.created', {
          name: t('admin.checkInGroups.label'),
        })
      );

      history.push('/admin/checkin-groups');
    } catch (error) {
      const errors = getFormErrors<ErrorFields>(error as { graphQLErrors: GraphQLError[] });

      setErrors && setErrors(errors);
    }
  };

  const initialValues = {
    name: '',
    displayName: '',
    checkInQuestions: [],
    badges: [],
  };

  return (
    <SharedMainContent>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <AdminCheckinGroupForm title={t('admin.checkInGroups.form.new')} />
      </Formik>
    </SharedMainContent>
  );
};
