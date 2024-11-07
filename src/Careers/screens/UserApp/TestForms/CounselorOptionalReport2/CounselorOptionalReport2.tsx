import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormWrapper } from '@dc/screens/UserApp/TestForms/FormWrapper/FormWrapper';
import { FormLoader } from '@dc/screens/UserApp/TestForms/FormLoader/FormLoader';
import { FormError } from '@dc/screens/UserApp/TestForms/FormError/FormError';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

import { GET_QUESTIONS, TCommonAppFormData, TCommonAppFormInput } from '../commonAppQueries';
import { FormsInitialData, parseInitialFormValues } from '../forms';

import { CounselorOptionalReport2Form } from './CounselorOptionalReport2Form';
import {
  counselorOptionalReport2FormInitialValues,
  counselorOptionalReport2FormRawQuestions,
} from './CounselorOptionalReport2Schemas';

export const CounselorOptionalReport2Screen = () => {
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { t } = useTranslation();
  const { data, loading } = useQuery<TCommonAppFormData, TCommonAppFormInput>(GET_QUESTIONS, {
    variables: { type: COMMON_APP_FORM_TYPES.COUNSELOR_OPTIONAL_REPORT_2, studentUuid },
    fetchPolicy: 'network-only',
  });

  if (loading) return <FormLoader />;
  if (!data) return <FormError />;

  const initialData: FormsInitialData = data.commonAppForm
    ? {
        ...counselorOptionalReport2FormInitialValues,
        ...parseInitialFormValues(
          data.commonAppForm.responses,
          counselorOptionalReport2FormRawQuestions
        ),
      }
    : counselorOptionalReport2FormInitialValues;

  return (
    <SharedMainContent>
      <FormWrapper formTitle={t('user.postSecondary.commonAppForms.counselorOptionalReport2')}>
        <CounselorOptionalReport2Form initialData={initialData} />
      </FormWrapper>
    </SharedMainContent>
  );
};
