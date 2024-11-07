import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormWrapper } from '@dc/screens/UserApp/TestForms/FormWrapper/FormWrapper';
import { FormLoader } from '@dc/screens/UserApp/TestForms/FormLoader/FormLoader';
import { FormError } from '@dc/screens/UserApp/TestForms/FormError/FormError';
import {
  GET_QUESTIONS,
  TCommonAppFormData,
  TCommonAppFormInput,
} from '@dc/screens/UserApp/TestForms/commonAppQueries';
import { FormsInitialData, parseInitialFormValues } from '@dc/screens/UserApp/TestForms/forms';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

import { CounselorFeeWaiverForm } from './CounselorFeeWaiverForm';
import {
  counselorFeeWaiverFormInitialValues,
  counselorFeeWaiverFormRawQuestions,
} from './CounselorFeeWaiverSchemas';

export const CounselorFeeWaiverScreen = () => {
  const { t } = useTranslation();
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { data, loading } = useQuery<TCommonAppFormData, TCommonAppFormInput>(GET_QUESTIONS, {
    variables: { type: COMMON_APP_FORM_TYPES.COUNSELOR_FEE_WAIVER, studentUuid },
    fetchPolicy: 'network-only',
  });

  if (loading) return <FormLoader />;
  if (!data) return <FormError />;

  const initialData: FormsInitialData = data.commonAppForm
    ? {
        ...counselorFeeWaiverFormInitialValues,
        ...parseInitialFormValues(data.commonAppForm.responses, counselorFeeWaiverFormRawQuestions),
      }
    : counselorFeeWaiverFormInitialValues;

  return (
    <SharedMainContent>
      <FormWrapper formTitle={t('user.postSecondary.commonAppForms.counselorFeeWaiver')}>
        <CounselorFeeWaiverForm initialData={initialData} />
      </FormWrapper>
    </SharedMainContent>
  );
};
