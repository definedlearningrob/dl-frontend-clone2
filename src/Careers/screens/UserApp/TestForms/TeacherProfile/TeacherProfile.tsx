import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { FormWrapper } from '@dc/screens/UserApp/TestForms/FormWrapper/FormWrapper';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

import { GET_QUESTIONS, TCommonAppFormData, TCommonAppFormInput } from '../commonAppQueries';
import { FormsInitialData, parseInitialFormValues } from '../forms';
import { FormLoader } from '../FormLoader/FormLoader';
import { FormError } from '../FormError/FormError';

import { TeacherProfileForm } from './TeacherProfileForm';
import { teacherProfileRawQuestions, teacherQuestionsInitialData } from './TeacherProfileSchemas';

export const TeacherProfile = () => {
  const { data, loading } = useQuery<TCommonAppFormData, TCommonAppFormInput>(GET_QUESTIONS, {
    variables: { type: COMMON_APP_FORM_TYPES.TEACHER_PROFILE },
    fetchPolicy: 'network-only',
  });
  const { t } = useTranslation();

  if (loading) return <FormLoader />;
  if (!data) return <FormError />;

  const initialData: FormsInitialData = data.commonAppForm
    ? {
        ...teacherQuestionsInitialData,
        ...parseInitialFormValues(data.commonAppForm.responses, teacherProfileRawQuestions),
      }
    : teacherQuestionsInitialData;

  return (
    <SharedMainContent>
      <FormWrapper formTitle={t('user.postSecondary.commonAppForms.teacherProfile')}>
        <TeacherProfileForm initialData={initialData} />
      </FormWrapper>
    </SharedMainContent>
  );
};
