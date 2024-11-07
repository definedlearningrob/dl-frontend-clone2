import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useField, useFormikContext } from 'formik';

import { SplashScreen } from '@dc/components/Onboarding/Assessment/SplashScreen/SplashScreen';
import { CareerReviewWizardQuestion } from '@dc/components/Onboarding/Assessment/Step4/Step4Content/CareerReviewWizardQuestion';
import { ProgressBar } from '@dc/components/Onboarding/Assessment/ContentWrapper/ProgressBar/ProgressBar';
import { TCareerReviewSurveyQuestion } from '@dc/resources/types';

import SharedButton from '@shared/components/Button/Button';

type Props = {
  surveyQuestions: TCareerReviewSurveyQuestion[];
};

export const CareerReviewSurveyForm = ({ surveyQuestions }: Props) => {
  const { t } = useTranslation();
  const { submitForm } = useFormikContext();
  const [step, setStep] = useState(0);
  const [displaySplashScreen, setDisplaySplashScreen] = useState(true);

  const question = surveyQuestions[step];

  const fieldName = `${question.id}.answers`;
  const otherAnswerFieldName = `${question.id}.otherAnswer`;

  const [inputField] = useField(fieldName);
  const [otherAnswerField] = useField(otherAnswerFieldName);

  if (displaySplashScreen)
    return (
      <SplashScreen
        customTitle={t('student.careerReviewSurvey.title')}
        setDisplaySplashScreen={setDisplaySplashScreen}
        step={4}
      />
    );

  const description =
    question.type === 'single_choice'
      ? t('student.onboarding.assessment.step4.singleChoice')
      : t('student.onboarding.assessment.step4.multiChoice');

  const checkIfQuestionHasAnswer = () => {
    if (inputField.value.length === 1 && inputField.value[0] === 'Other') {
      return otherAnswerField.value.length > 0;
    }

    return inputField.value.length > 0;
  };

  const stepNumber = step + 1;

  const isLastQuestion = stepNumber === surveyQuestions.length;

  const progress = (stepNumber / surveyQuestions.length) * 100;

  const buttonLabel = isLastQuestion
    ? t('student.onboarding.assessment.submit')
    : t('student.onboarding.assessment.nextQuestion');

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      return submitForm();
    }

    setStep((prev) => prev + 1);
  };

  return (
    <>
      <CareerReviewWizardQuestion description={description} question={question} />
      <footer className='assessment__progress-footer'>
        <div className='assessment__progress-footer__content'>
          <ProgressBar className='assessment__progress-footer__progress-bar' progress={progress} />
          <SharedButton
            className='whitespace-nowrap ml-xs'
            disabled={!checkIfQuestionHasAnswer()}
            variant='primary'
            onClick={handleNextQuestion}>
            {buttonLabel}
          </SharedButton>
        </div>
      </footer>
    </>
  );
};
