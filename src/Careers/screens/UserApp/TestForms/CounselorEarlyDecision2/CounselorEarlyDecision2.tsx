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
import { useStudentApplicationsQuery } from '@dc/graphql/user/hooks/useStudentApplicationsQuery';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

import { CounselorEarlyDecision2Form } from './CounselorEarlyDecision2Form';
import {
  counselorEarlyDecisionForm2InitialValues,
  counselorEarlyDecisionForm2RawQuestions,
} from './CounselorEarlyDecision2Schemas';

export const CounselorEarlyDecision2Screen = () => {
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { t } = useTranslation();
  const { data, loading } = useQuery<TCommonAppFormData, TCommonAppFormInput>(GET_QUESTIONS, {
    variables: { type: COMMON_APP_FORM_TYPES.COUNSELOR_EARLY_DECISION_2, studentUuid },
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
        ...counselorEarlyDecisionForm2InitialValues,
        ...parseInitialFormValues(
          data.commonAppForm.responses,
          counselorEarlyDecisionForm2RawQuestions
        ),
      }
    : counselorEarlyDecisionForm2InitialValues;

  return (
    <SharedMainContent>
      <FormWrapper formTitle={t('user.postSecondary.commonAppForms.counselorEarlyDecision2')}>
        <CounselorEarlyDecision2Form initialData={initialData} institutions={studentInstitutions} />
      </FormWrapper>
    </SharedMainContent>
  );
};
