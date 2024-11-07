import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { GraphQLError } from 'graphql';

import AdminCheckinsForm from '@dc/components/Admin/CheckinQuestions/Form/Form';
import createCheckInQuestionMutation from '@dc/graphql/user/mutations/createCheckinQuestion';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { getFormErrors } from '@dc/utils/graphql';

import { callToast } from '@shared/components/Toaster/Toaster';

type TFormFields = {
  question: string;
};

type TErrorFields = {
  question: string;
};

function AdminAppCheckinNew() {
  const { t } = useTranslation();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    question: Yup.string().required(t('validation.messages.required')),
  });

  const [createCheckInQuestion] = useMutation(createCheckInQuestionMutation);

  const handleSubmit = async (
    { question }: TFormFields,
    { setErrors }: { setErrors?: (error: TErrorFields) => void } = {}
  ) => {
    try {
      await createCheckInQuestion({
        variables: {
          input: {
            question,
          },
        },
      });

      callToast(
        'success',
        t('common.notifications.success.created', {
          name: t('admin.checkInQuestions.label'),
        })
      );

      history.push('/admin/check-ins');
    } catch (error) {
      const errors = getFormErrors<TErrorFields>(error as { graphQLErrors: GraphQLError[] });

      setErrors && setErrors(errors);
    }
  };

  const initialValues = {
    question: '',
  };

  return (
    <SharedMainContent>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <AdminCheckinsForm
            errors={errors}
            title={t('admin.checkInQuestions.form.new')}
            touched={touched}
          />
        )}
      </Formik>
    </SharedMainContent>
  );
}

export default AdminAppCheckinNew;
