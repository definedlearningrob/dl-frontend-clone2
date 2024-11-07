import PropTypes from 'prop-types';
import { useState } from 'react';

import Content from '@dc/components/Onboarding/Assessment/Step2/Content/Content';
import { SplashScreen } from '@dc/components/Onboarding/Assessment/SplashScreen/SplashScreen';
import interestsGroupsQuery from '@dc/graphql/student/queries/interestsGroups';
import { AssessmentStep2Provider } from '@dc/context/assessmentStep2Context';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

OnboardingAssessmentStep2.propTypes = {
  assessmentType: PropTypes.string,
  isFirstQuestion: PropTypes.bool,
};

function OnboardingAssessmentStep2({ assessmentType, isFirstQuestion }) {
  const [displaySplashScreen, setDisplaySplashScreen] = useState(isFirstQuestion);

  if (displaySplashScreen)
    return (
      <SplashScreen
        assessmentType={assessmentType}
        setDisplaySplashScreen={setDisplaySplashScreen}
        step={2}
      />
    );

  return (
    <SharedDataLoader options={{ fetchPolicy: 'no-cache' }} query={interestsGroupsQuery}>
      {(data) => (
        <AssessmentStep2Provider interestsGroups={data.interestsGroups}>
          <Content assessmentType={assessmentType} />
        </AssessmentStep2Provider>
      )}
    </SharedDataLoader>
  );
}

export default OnboardingAssessmentStep2;
