import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormWrapper } from '@dc/screens/UserApp/TestForms/FormWrapper/FormWrapper';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

import { GET_QUESTIONS, TCommonAppFormData, TCommonAppFormInput } from '../commonAppQueries';
import { FormsInitialData, parseInitialFormValues } from '../forms';
import { FormLoader } from '../FormLoader/FormLoader';
import { FormError } from '../FormError/FormError';

import { SchoolReportForm } from './SchoolReportForm';
import { srInitialValues, schoolReportRawQuestions } from './SchoolReportSchemas';

const neededQuestionsFromPreviousForm = [1246, 1247];

export const SchoolReportScreen = () => {
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { t } = useTranslation();

  // counselor profile form
  const { data: profileData, loading: profileLoading } = useQuery(GET_QUESTIONS, {
    variables: { type: COMMON_APP_FORM_TYPES.COUNSELOR_PROFILE },
    fetchPolicy: 'network-only',
  });

  const { data, loading } = useQuery<TCommonAppFormData, TCommonAppFormInput>(GET_QUESTIONS, {
    variables: {
      type: COMMON_APP_FORM_TYPES.COUNSELOR_SECONDARY_REPORT,
      studentUuid,
    },
    fetchPolicy: 'network-only',
  });

  // TODO: will be handled separately
  if (profileLoading || loading) return <FormLoader />;
  if (!profileData || !data) return <FormError />;

  const linkedQuestions = neededQuestionsFromPreviousForm.map((questionId) => ({
    questionId,
    response:
      profileData.commonAppForm?.responses.find((response) => response.questionId === questionId)
        ?.response || null,
  }));

  const initialData: FormsInitialData = data.commonAppForm
    ? {
        ...srInitialValues,
        ...parseInitialFormValues(data.commonAppForm?.responses || [], schoolReportRawQuestions),
      }
    : srInitialValues;

  linkedQuestions.forEach(({ questionId, response }) => {
    // @ts-ignore
    initialData[questionId] = parseInt(response!);
  });

  return (
    <SharedMainContent>
      <FormWrapper formTitle={t('user.postSecondary.commonAppForms.schoolReport')}>
        <SchoolReportForm initialData={initialData} />
      </FormWrapper>
    </SharedMainContent>
  );
};
