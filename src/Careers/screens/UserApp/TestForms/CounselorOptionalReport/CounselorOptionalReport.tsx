import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormWrapper } from '@dc/screens/UserApp/TestForms/FormWrapper/FormWrapper';
import { FormError } from '@dc/screens/UserApp/TestForms/FormError/FormError';
import { FormLoader } from '@dc/screens/UserApp/TestForms/FormLoader/FormLoader';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

import Link from '@shared/components/Link';

import { GET_QUESTIONS } from '../commonAppQueries';
import { FormsInitialData, parseInitialFormValues } from '../forms';

import { CounselorOptionalReportForm } from './CounselorOptionalReportForm';
import {
  counselorOptionalReportFormInitialValues,
  counselorOptionalReportFormRawQuestions,
} from './CounselorOptionalReportSchemas';

export const CounselorOptionalReportScreen = () => {
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { t } = useTranslation();

  const { data, loading } = useQuery(GET_QUESTIONS, {
    variables: { type: COMMON_APP_FORM_TYPES.COUNSELOR_OPTIONAL_REPORT, studentUuid },
    fetchPolicy: 'network-only',
  });

  const { data: secondaryReportData, loading: secondaryReportLoading } = useQuery(GET_QUESTIONS, {
    variables: { type: COMMON_APP_FORM_TYPES.COUNSELOR_SECONDARY_REPORT, studentUuid },
    fetchPolicy: 'network-only',
  });

  if (loading || secondaryReportLoading) return <FormLoader />;
  if (!data || !secondaryReportData) return <FormError />;

  // TODO: to be handled differently
  if (!secondaryReportData.commonAppForm) {
    return (
      <SharedMainContent>
        <div>Please complete "Secondary report (school report)" form first</div>
        <Link to='/forms/schoolReport'>Go To "Secondary report (school report)" form</Link>
      </SharedMainContent>
    );
  }
  //
  const initialData: FormsInitialData = data.commonAppForm
    ? {
        ...counselorOptionalReportFormInitialValues,
        ...parseInitialFormValues(
          data.commonAppForm.responses,
          counselorOptionalReportFormRawQuestions
        ),
      }
    : counselorOptionalReportFormInitialValues;

  return (
    <SharedMainContent>
      <FormWrapper formTitle={t('user.postSecondary.commonAppForms.counselorOptionalReport')}>
        <CounselorOptionalReportForm initialData={initialData} />
      </FormWrapper>
    </SharedMainContent>
  );
};
