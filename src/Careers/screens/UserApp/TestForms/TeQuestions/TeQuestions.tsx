import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { TeQuestionsForm } from '@dc/screens/UserApp/TestForms/TeQuestions/TeQuestionsForm';
import { FormWrapper } from '@dc/screens/UserApp/TestForms/FormWrapper/FormWrapper';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

import { GET_QUESTIONS } from '../commonAppQueries';
import { FormsInitialData, parseInitialFormValues } from '../forms';
import { FormLoader } from '../FormLoader/FormLoader';
import { FormError } from '../FormError/FormError';

import { teacherEvaluationRawQuestions, teQuestionsInitialData } from './TeQuestionsSchemas';

//TODO: make it dynamic

// this forms has questions that are linked to the previous form
// we might add it to a parser if more forms have this
const neededQuestionsFromPreviousForm = [1397];

export const TeQuestions = () => {
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { t } = useTranslation();

  // previous form
  const { data: profileData, loading: profileLoading } = useQuery(GET_QUESTIONS, {
    variables: { type: COMMON_APP_FORM_TYPES.TEACHER_PROFILE },
    fetchPolicy: 'network-only',
  });

  // current form
  const { data, loading } = useQuery(GET_QUESTIONS, {
    variables: { type: COMMON_APP_FORM_TYPES.TEACHER_RECOMMENDATION, studentUuid },
    fetchPolicy: 'network-only',
  });

  // TODO: will be handled differently
  if (profileLoading || loading) return <FormLoader />;
  if (!profileData || !data) return <FormError />;

  const linkedQuestions = profileData.commonAppForm?.responses.filter((r) =>
    neededQuestionsFromPreviousForm.includes(r.questionId)
  );

  // TODO: will be handled differently
  if (!profileData.commonAppForm || !linkedQuestions.length) {
    return (
      <SharedMainContent>
        <div>Please complete profile form</div>
        <Link to='/teacherquestions'>Go to teacher profile</Link>
      </SharedMainContent>
    );
  }

  const initialData: FormsInitialData = data.commonAppForm
    ? {
        ...teQuestionsInitialData,
        ...parseInitialFormValues(
          data.commonAppForm?.responses || [],
          teacherEvaluationRawQuestions
        ),
      }
    : teQuestionsInitialData;

  linkedQuestions.forEach(({ questionId, response }) => {
    initialData[questionId] = parseInt(response!);
  });

  return (
    <SharedMainContent>
      <FormWrapper formTitle={t('user.postSecondary.commonAppForms.teacherEvaluation')}>
        <TeQuestionsForm initialData={initialData} />
      </FormWrapper>
    </SharedMainContent>
  );
};
