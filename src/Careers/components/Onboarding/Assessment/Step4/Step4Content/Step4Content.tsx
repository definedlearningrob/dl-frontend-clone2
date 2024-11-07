import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useField } from 'formik';
import { useUpdateEffect } from 'react-use';
import { useEffect } from 'react';
import { castArray } from 'lodash-es';

import useAssessment from '@dc/hooks/useAssessment';
import { ContentWrapper } from '@dc/components/Onboarding/Assessment/ContentWrapper/ContentWrapper';
import { TCareerReviewSurveyQuestion } from '@dc/resources/types';
import { useCreateCareerReviewSurveyAnswers } from '@dc/graphql/student/hooks/useCreateCareerReviewSurveyAnswers';
import { CAREER_REVIEW_SURVEY_ANSWER_CONTEXT_TYPES } from '@dc/resources/enums';
import assessmentAttemptStatusQuery from '@dc/graphql/student/queries/assessmentAttemptStatus';
import { ASSESSMENT_STATUSES } from '@dc/resources/constants';
import { CareerReviewWizardQuestion } from '@dc/components/Onboarding/Assessment/Step4/Step4Content/CareerReviewWizardQuestion';

type Props = {
  assessmentType: string;
  surveyQuestions: TCareerReviewSurveyQuestion[];
};

const CAREER_REVIEW_SURVEY_QUESTION_COUNT = 5;

export const Step4Content = ({ assessmentType, surveyQuestions }: Props) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { questionNumber } = useParams<{ questionNumber: string }>();
  const {
    saveProgress,
    saving,
    triggerTooltip,
    setCurrentRoute,
    assessment,
    finishAssessment,
    currentRoute,
  } = useAssessment();

  const [createCareerReviewSurveyAnswers, { loading }] = useCreateCareerReviewSurveyAnswers({
    refetchQueries: [{ query: assessmentAttemptStatusQuery }],
  });

  const question = surveyQuestions[parseInt(questionNumber) - 1];

  const fieldName = `${question.id}.answers`;
  const otherAnswerFieldName = `${question.id}.otherAnswer`;

  const [inputField] = useField<string | string[]>(fieldName);
  const [otherAnswerField] = useField<string>(otherAnswerFieldName);

  const nextQuestionClick = async () => {
    const getAnswers = () => {
      if (Array.isArray(inputField.value) && inputField.value.includes('Other')) {
        const restAnswers = inputField.value.filter((answer: string) => answer !== 'Other');

        return [...restAnswers, otherAnswerField.value];
      }

      return castArray(inputField.value);
    };

    await createCareerReviewSurveyAnswers({
      contextId: assessment.attempt.id,
      contextType: CAREER_REVIEW_SURVEY_ANSWER_CONTEXT_TYPES.ASSESSMENT,
      answers: [
        {
          questionId: question.id,
          answer: getAnswers(),
        },
      ],
    });

    const isAssessmentLastQuestion =
      parseInt(questionNumber) === CAREER_REVIEW_SURVEY_QUESTION_COUNT;

    const nextUrl = isAssessmentLastQuestion
      ? '/onboarding/processing-assessment'
      : `/onboarding/assessment/step/4/question/${parseInt(questionNumber) + 1}`;

    if (isAssessmentLastQuestion) {
      await finishAssessment();

      triggerTooltip({ message: t('student.onboarding.assessment.step1Completed') });
    }

    setCurrentRoute(nextUrl);
  };

  useUpdateEffect(() => {
    history.push(currentRoute);
  }, [currentRoute]);

  useEffect(() => {
    // Handle broken assessment when filled but lost connection
    // between last save and finish mutation
    const processFinishAssessment = async () => {
      await finishAssessment();
      history.push('/onboarding/processing-assessment');
    };

    const filledWithoutFinished =
      assessment.status.reviewSurvey === ASSESSMENT_STATUSES.COMPLETED &&
      assessment.attempt.status !== ASSESSMENT_STATUSES.COMPLETED;

    if (filledWithoutFinished) {
      processFinishAssessment();
    }
  }, [assessment]);

  const checkIfQuestionHasAnswer = () => {
    if (inputField.value.length === 1 && inputField.value[0] === 'Other') {
      return otherAnswerField.value.length > 0;
    }

    return inputField.value.length > 0;
  };

  const description =
    question.type === 'single_choice'
      ? t('student.onboarding.assessment.step4.singleChoice')
      : t('student.onboarding.assessment.step4.multiChoice');

  return (
    <ContentWrapper
      assessmentType={assessmentType}
      isSaving={loading || saving}
      nextDisabled={!checkIfQuestionHasAnswer()}
      onNext={nextQuestionClick}
      onSaveProgress={saveProgress}>
      <CareerReviewWizardQuestion description={description} question={question} />
    </ContentWrapper>
  );
};
