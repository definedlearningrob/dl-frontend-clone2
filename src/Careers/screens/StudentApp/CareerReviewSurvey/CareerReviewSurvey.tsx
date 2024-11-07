import { Redirect, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { map } from 'lodash-es';
import { useToggle } from 'react-use';

import { ReactComponent as LogoType } from '@dc/svg/logotype.svg';
import { ASSESSMENT_STEPS_QUERY } from '@dc/graphql/student/queries/assessmentSteps';
import { OnboardingLoader } from '@dc/components/Onboarding/OnboardingLoader';
import { useSurveyQuestionsQuery } from '@dc/graphql/student/hooks/useSurveyQuestionsQuery';
import { SurveyFormType } from '@dc/components/Student/Lesson/Survey/CareerReviewSurvey';
import { CareerReviewSurveyForm } from '@dc/components/CareerReviewSurveyForm/CareerReviewSurveyForm';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import { useCreateCareerReviewSurveyAnswers } from '@dc/graphql/student/hooks/useCreateCareerReviewSurveyAnswers';
import assessmentAttemptStatusQuery from '@dc/graphql/student/queries/assessmentAttemptStatus';

import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import { LanguageSwitcher } from '@shared/components/LanguageSwitcher/LanguageSwitcher';
import { useLocalize } from '@shared/hooks/useLocalize';
import { ConfirmationModal } from '@shared/components/ConfirmationModal/ConfirmationModal';
import { handleError } from '@shared/utils/handleError';
import { callToast } from '@shared/components/Toaster/Toaster';

export const CareerReviewSurvey = () => {
  const { data, loading } = useQuery(ASSESSMENT_STEPS_QUERY);
  const { data: surveyQuestionData, loading: surveyQuestionLoading } = useSurveyQuestionsQuery();
  const {
    userInfo: { isImpersonated, firstName, lastName },
  } = useUserInfo<TStudentInfo>();

  const history = useHistory();
  const { t } = useTranslation();
  const { localesToSelect, selectedLocale, setLanguage } = useLocalize();

  const [isModalOpen, toggleIsModalOpen] = useToggle(false);

  const [createCareerReviewSurveyAnswers] = useCreateCareerReviewSurveyAnswers({
    refetchQueries: [{ query: assessmentAttemptStatusQuery }],
  });

  if (loading || surveyQuestionLoading) return <OnboardingLoader />;

  if (!surveyQuestionData || !data) return <Redirect to='/' />;

  const surveyQuestions = surveyQuestionData.surveyQuestions;

  const initialValues = surveyQuestions.reduce((acc, { id, type }) => {
    const answers = type === 'single_choice' ? '' : [];

    return { ...acc, [id]: { answers, otherAnswer: '' } };
  }, {} as SurveyFormType);

  const handleSubmit = async (values: SurveyFormType) => {
    try {
      const answers = map(values, (question, questionId) => {
        const answers = Array.isArray(question.answers) ? question.answers : [question.answers];

        if (question.answers.includes('Other')) {
          const restAnswers = answers.filter((answer: string) => answer !== 'Other');

          return { questionId, answer: [...restAnswers, question.otherAnswer] as string[] };
        }

        return { questionId, answer: answers };
      });

      await createCareerReviewSurveyAnswers({ answers });

      callToast('success', 'Your survey has been submitted!');
    } catch (error) {
      handleError(error);
    }

    history.push('/dashboard');
  };

  const handleConfirm = () => {
    history.push('/dashboard');
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <div className='bg-neutral-200 bg-[url(@dc/assets/images/assessment_steps_bg.svg)] bg-cover h-screen pb-[80px] bg-center'>
        <>
          {isImpersonated && (
            <div className='assessment__impersonating-header'>
              {t('student.onboarding.assessment.impersonating', {
                name: `${firstName} ${lastName}`,
              })}
              <button className='assessment__impersonating-button' onClick={toggleIsModalOpen}>
                {t('appHeader.exitSession')}
              </button>
            </div>
          )}
          <header className='assessment__navbar'>
            <SharedButton variant='primary-outlined' onClick={toggleIsModalOpen}>
              {t('student.careerReviewSurvey.backToDashboard')}
            </SharedButton>
            <div className='flex gap-sm items-center'>
              <SharedIcon
                className='h-base border-r border-neutral-300 pr-sm'
                icon={<LogoType />}
              />
              <p className='m-0 font-bold text-xs'>{t('student.onboarding.assessment.title')}</p>
            </div>
            <div>
              <LanguageSwitcher
                languages={localesToSelect}
                selectedLanguage={selectedLocale}
                setLanguage={setLanguage}
              />
            </div>
          </header>
          <ConfirmationModal
            isOpen={isModalOpen}
            title={t('student.careerReviewSurvey.confirmationModalTitle')}
            onClose={toggleIsModalOpen}
            onConfirm={handleConfirm}>
            {t('student.careerReviewSurvey.confirmationModalContent')}
          </ConfirmationModal>
        </>
        <CareerReviewSurveyForm surveyQuestions={surveyQuestions} />
      </div>
    </Formik>
  );
};
