import { useState } from 'react';
import { Formik } from 'formik';

import { Step4Content } from '@dc/components/Onboarding/Assessment/Step4/Step4Content/Step4Content';
import { SplashScreen } from '@dc/components/Onboarding/Assessment/SplashScreen/SplashScreen';
import { useSurveyQuestionsQuery } from '@dc/graphql/student/hooks/useSurveyQuestionsQuery';

type SurveyFormType = {
  [questionId: string]: {
    answers: string[];
    otherAnswer: string;
  };
};

type Props = {
  assessmentType: string;
  isFirstQuestion: boolean;
};

export const Step4 = ({ assessmentType, isFirstQuestion }: Props) => {
  const [displaySplashScreen, setDisplaySplashScreen] = useState(isFirstQuestion);
  const { data } = useSurveyQuestionsQuery();

  if (displaySplashScreen)
    return (
      <SplashScreen
        assessmentType={assessmentType}
        setDisplaySplashScreen={setDisplaySplashScreen}
        step={4}
      />
    );

  if (!data) return null;

  const surveyQuestions = data.surveyQuestions;

  const initialValues: SurveyFormType = surveyQuestions.reduce((acc, { id, type }) => {
    const answers = type === 'single_choice' ? '' : [];

    return { ...acc, [id]: { answers, otherAnswer: '' } };
  }, {});

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <Step4Content assessmentType={assessmentType} surveyQuestions={surveyQuestions} />
    </Formik>
  );
};
