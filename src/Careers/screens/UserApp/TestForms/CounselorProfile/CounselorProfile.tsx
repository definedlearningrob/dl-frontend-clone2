import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormWrapper } from '@dc/screens/UserApp/TestForms/FormWrapper/FormWrapper';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

import { GET_QUESTIONS, TCommonAppFormData, TCommonAppFormInput } from '../commonAppQueries';
import { FormsInitialData, parseInitialFormValues } from '../forms';

import { CounselorProfileForm } from './CounselorProfileForm';
import { counselorInitialValues, counselorProfileRawQuestions } from './CounselorProfileSchemas';

export const CounselorProfileScreen = () => {
  const { data, loading } = useQuery<TCommonAppFormData, TCommonAppFormInput>(GET_QUESTIONS, {
    variables: { type: COMMON_APP_FORM_TYPES.COUNSELOR_PROFILE },
    fetchPolicy: 'network-only',
  });
  const { t } = useTranslation();

  // TODO: to be handled differently
  if (loading) return <div>loading</div>;
  if (!data) return <div>error</div>;

  const initialData: FormsInitialData = data.commonAppForm
    ? {
        ...counselorInitialValues,
        ...parseInitialFormValues(data.commonAppForm.responses, counselorProfileRawQuestions),
      }
    : counselorInitialValues;

  return (
    <SharedMainContent>
      <FormWrapper formTitle={t('user.postSecondary.commonAppForms.counselorProfile')}>
        <CounselorProfileForm initialData={initialData} />
      </FormWrapper>
    </SharedMainContent>
  );
};
