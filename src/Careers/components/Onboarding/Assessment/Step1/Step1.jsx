import PropTypes from 'prop-types';
import { useState } from 'react';

import Content from '@dc/components/Onboarding/Assessment/Step1/Content/Content';
import { SplashScreen } from '@dc/components/Onboarding/Assessment/SplashScreen/SplashScreen';
import studyPreferencesOptionsQuery from '@dc/graphql/student/queries/studyPreferencesOptions';
import { AssessmentStep1Provider } from '@dc/hooks/useAssessmentStep1';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

OnboardingAssessmentStep1.propTypes = {
  assessmentType: PropTypes.string,
  isFirstQuestion: PropTypes.bool,
};

function OnboardingAssessmentStep1({ assessmentType, isFirstQuestion }) {
  const [displaySplashScreen, setDisplaySplashScreen] = useState(isFirstQuestion);

  if (displaySplashScreen)
    return (
      <SplashScreen
        assessmentType={assessmentType}
        setDisplaySplashScreen={setDisplaySplashScreen}
        step={1}
      />
    );

  return (
    <SharedDataLoader options={{ fetchPolicy: 'no-cache' }} query={studyPreferencesOptionsQuery}>
      {(data) => (
        <AssessmentStep1Provider studyPreferences={data.studyPreferencesOptions}>
          <Content assessmentType={assessmentType} />
        </AssessmentStep1Provider>
      )}
    </SharedDataLoader>
  );
}

export default OnboardingAssessmentStep1;
