import PropTypes from 'prop-types';
import { useState } from 'react';

import Content from '@dc/components/Onboarding/Assessment/Step3/Content/Content';
import { SplashScreen } from '@dc/components/Onboarding/Assessment/SplashScreen/SplashScreen';
import workValuesPairsQuery from '@dc/graphql/student/queries/workValuesPairs';
import { AssessmentStep3Provider } from '@dc/hooks/useAssessmentStep3';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

OnboardingAssessmentStep3.propTypes = {
  assessmentType: PropTypes.string,
  isFirstQuestion: PropTypes.bool,
};

function OnboardingAssessmentStep3({ assessmentType, isFirstQuestion }) {
  const [displaySplashScreen, setDisplaySplashScreen] = useState(isFirstQuestion);

  if (displaySplashScreen)
    return (
      <SplashScreen
        assessmentType={assessmentType}
        setDisplaySplashScreen={setDisplaySplashScreen}
        step={3}
      />
    );

  return (
    <SharedDataLoader options={{ fetchPolicy: 'no-cache' }} query={workValuesPairsQuery}>
      {(data) => (
        <AssessmentStep3Provider workValuesPairs={data.workValuesPairs}>
          <Content assessmentType={assessmentType} />
        </AssessmentStep3Provider>
      )}
    </SharedDataLoader>
  );
}

export default OnboardingAssessmentStep3;
