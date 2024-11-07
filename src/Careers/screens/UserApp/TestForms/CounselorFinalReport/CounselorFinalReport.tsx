import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormWrapper } from '@dc/screens/UserApp/TestForms/FormWrapper/FormWrapper';
import {
  GET_QUESTIONS,
  TCommonAppFormData,
  TCommonAppFormInput,
} from '@dc/screens/UserApp/TestForms/commonAppQueries';
import { FormsInitialData, parseInitialFormValues } from '@dc/screens/UserApp/TestForms/forms';
import { FormLoader } from '@dc/screens/UserApp/TestForms/FormLoader/FormLoader';
import { FormError } from '@dc/screens/UserApp/TestForms/FormError/FormError';
import { useStudentApplicationsQuery } from '@dc/graphql/user/hooks/useStudentApplicationsQuery';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

import { CounselorFinalReportForm } from './CounselorFinalReportForm';
import {
  counselorFinalReportFormInitialValues,
  counselorFinalReportFormRawQuestions,
} from './CounselorFinalReportSchemas';

export const CounselorFinalReportScreen = () => {
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { t } = useTranslation();
  const { data, loading } = useQuery<TCommonAppFormData, TCommonAppFormInput>(GET_QUESTIONS, {
    variables: { type: COMMON_APP_FORM_TYPES.COUNSELOR_FINAL_REPORT, studentUuid },
    fetchPolicy: 'network-only',
  });
  const { data: studentApplicationsData, loading: studentApplicationsLoading } =
    useStudentApplicationsQuery({ studentUuid });

  if (loading || studentApplicationsLoading) return <FormLoader />;
  if (!data || !studentApplicationsData) return <FormError />;

  const studentInstitutions = studentApplicationsData.studentApplications.map((application) => ({
    label: application.institution.name,
    value: application.institution.id,
  }));

  const initialData: FormsInitialData = data.commonAppForm
    ? {
        ...counselorFinalReportFormInitialValues,
        ...parseInitialFormValues(
          data.commonAppForm.responses,
          counselorFinalReportFormRawQuestions
        ),
      }
    : counselorFinalReportFormInitialValues;

  return (
    <SharedMainContent>
      <FormWrapper formTitle={t('user.postSecondary.commonAppForms.counselorFinalReportForm')}>
        <CounselorFinalReportForm initialData={initialData} institutions={studentInstitutions} />
      </FormWrapper>
    </SharedMainContent>
  );
};
