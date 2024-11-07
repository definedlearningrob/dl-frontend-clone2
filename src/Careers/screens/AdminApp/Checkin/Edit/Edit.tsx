import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GraphQLError } from 'graphql';

import AdminCheckInQuestionsForm from '@dc/components/Admin/CheckinQuestions/Form/Form';
import checkInQuestionQuery, {
  type TCheckInQuestionData,
} from '@dc/graphql/user/queries/checkinQuestion';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import updateCheckInQuestionMutation from '@dc/graphql/user/mutations/updateCheckInQuestion';
import { getFormErrors } from '@dc/utils/graphql';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { callToast } from '@shared/components/Toaster/Toaster';

type TFormFields = {
  question: string;
};

type TErrorFields = {
  question: string;
};

function AdminAppCheckinEdit() {
  const { t } = useTranslation();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const validationSchema = Yup.object().shape({
    question: Yup.string().required(t('validation.messages.required')),
  });

  const [updateCheckInQuestion] = useMutation(updateCheckInQuestionMutation);

  const handleSubmit = async (
    { question }: TFormFields,
    { setErrors }: { setErrors?: (error: TErrorFields) => void } = {}
  ) => {
    try {
      await updateCheckInQuestion({
        variables: {
          input: {
            id,
            question,
          },
        },
      });

      callToast(
        'success',
        t('common.notifications.success.updated', {
          name: t('admin.checkInQuestions.label'),
        })
      );

      history.push('/admin/check-ins');
    } catch (error) {
      const errors = getFormErrors<TErrorFields>(error as { graphQLErrors: GraphQLError[] });

      setErrors && setErrors(errors);
    }
  };

  const getInitialValues = ({ question }: TErrorFields) => ({
    question,
  });

  return (
    <SharedMainContent>
      <SharedDataLoader<TCheckInQuestionData>
        options={{ variables: { id } }}
        query={checkInQuestionQuery}>
        {({ checkInQuestion }) => (
          <Formik
            enableReinitialize={true}
            initialValues={getInitialValues(checkInQuestion)}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <AdminCheckInQuestionsForm
                errors={errors}
                title={t('admin.checkInQuestions.form.edit')}
                touched={touched}
              />
            )}
          </Formik>
        )}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default AdminAppCheckinEdit;
