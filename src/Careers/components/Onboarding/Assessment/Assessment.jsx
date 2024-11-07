import cx from 'classnames';
import { useHistory, useParams } from 'react-router-dom';

import NavigationBar from '@dc/components/Onboarding/Assessment/Navigation/Navigation';
import Step1 from '@dc/components/Onboarding/Assessment/Step1/Step1';
import Step2 from '@dc/components/Onboarding/Assessment/Step2/Step2';
import Step3 from '@dc/components/Onboarding/Assessment/Step3/Step3';
import { Step4 } from '@dc/components/Onboarding/Assessment/Step4/Step4';
import useAssessment from '@dc/hooks/useAssessment';
import { ASSESSMENT_STATUSES } from '@dc/resources/constants';

import '@dc/components/Onboarding/Assessment/Assessment.sass';
import { useBlockNavigation } from '@shared/hooks/useBlockNaviation';

export const Assessment = () => {
  const { stepNumber } = useParams();
  const history = useHistory();
  const { assessment } = useAssessment();

  useBlockNavigation();

  const isFirstQuestion = history.location.pathname.split('question/').pop() === '1';
  const isHigherStep = Number(stepNumber) > 1;
  const wrapperClass = cx('assessment', { '-second-background': isHigherStep });

  const ComponentForStep = {
    1: Step1,
    2: Step2,
    3: Step3,
    4: Step4,
  }[stepNumber];

  if (assessment.attempt?.status === ASSESSMENT_STATUSES.FINISHED) {
    return null;
  }

  return (
    <div className={wrapperClass}>
      <NavigationBar />
      <ComponentForStep isFirstQuestion={isFirstQuestion} />
    </div>
  );
};
