import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';
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

import { CounselorMidYearReportForm } from './CounselorMidYearReportForm';
import {
  counselorMidYearReportFormInitialValues,
  counselorMidYearReportFormRawQuestions,
} from './CounselorMidYearReportSchemas';

export const CounselorMidYearReportScreen = () => {
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { t } = useTranslation();
  // counselor school report
  const { data: schoolReportData, loading: schoolReportLoading } = useQuery(GET_QUESTIONS, {
    variables: { type: COMMON_APP_FORM_TYPES.COUNSELOR_SECONDARY_REPORT, studentUuid },
    fetchPolicy: 'network-only',
  });

  const { data, loading } = useQuery<TCommonAppFormData, TCommonAppFormInput>(GET_QUESTIONS, {
    variables: { type: COMMON_APP_FORM_TYPES.COUNSELOR_MIDYEAR_REPORT, studentUuid },
    fetchPolicy: 'network-only',
  });

  if (schoolReportLoading || loading) return <FormLoader />;
  if (!schoolReportData || !data) return <FormError />;

  // TODO: will be handled differently, most likely not needed
  if (!schoolReportData.commonAppForm) {
    return (
      <SharedMainContent>
        <div>Please complete "School Report" form first</div>
        <Link to='/forms/schoolReport'>Go To "School Report" form</Link>
      </SharedMainContent>
    );
  }

  const initialData: FormsInitialData = data.commonAppForm
    ? {
        ...counselorMidYearReportFormInitialValues,
        ...parseInitialFormValues(
          data.commonAppForm.responses,
          counselorMidYearReportFormRawQuestions
        ),
      }
    : counselorMidYearReportFormInitialValues;

  return (
    <SharedMainContent>
      <FormWrapper formTitle={t('user.postSecondary.commonAppForms.counselorMidYearReport')}>
        <CounselorMidYearReportForm initialData={initialData} />
      </FormWrapper>
    </SharedMainContent>
  );
};
