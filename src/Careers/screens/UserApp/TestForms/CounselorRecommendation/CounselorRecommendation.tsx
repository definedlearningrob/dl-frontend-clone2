import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormWrapper } from '@dc/screens/UserApp/TestForms/FormWrapper/FormWrapper';
import { FormLoader } from '@dc/screens/UserApp/TestForms/FormLoader/FormLoader';
import { FormError } from '@dc/screens/UserApp/TestForms/FormError/FormError';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

import { GET_QUESTIONS } from '../commonAppQueries';
import { FormsInitialData, parseInitialFormValues } from '../forms';

import { CounselorRecommendationForm } from './CounselorRecommendationForm';
import {
  counselorRecommendationInitialValues,
  counselorRecommendationRawQuestions,
} from './CounselorRecommendationSchemas';

export const CounselorRecommendationScreen = () => {
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { t } = useTranslation();

  const { data, loading } = useQuery(GET_QUESTIONS, {
    variables: {
      type: COMMON_APP_FORM_TYPES.COUNSELOR_RECOMMENDATION,
      studentUuid,
    },
    fetchPolicy: 'network-only',
  });

  if (loading) return <FormLoader />;
  if (!data) return <FormError />;

  const initialData: FormsInitialData = data.commonAppForm
    ? {
        ...counselorRecommendationInitialValues,
        ...parseInitialFormValues(
          data.commonAppForm.responses,
          counselorRecommendationRawQuestions
        ),
      }
    : counselorRecommendationInitialValues;

  return (
    <SharedMainContent>
      <FormWrapper formTitle={t('user.postSecondary.commonAppForms.counselorRecommendation')}>
        <CounselorRecommendationForm initialData={initialData} />
      </FormWrapper>
    </SharedMainContent>
  );
};
