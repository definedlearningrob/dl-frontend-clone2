import { Switch } from 'react-router-dom';

import BottomNavbar from '@dc/components/Onboarding/Result/Components/BottomNavbar/BottomNavbar';
import ComponentItem from '@dc/components/Onboarding/Result/Components/ComponentItem/ComponentItem';
import Interests from '@dc/components/Onboarding/Result/Components/Interests/Interests';
import interestsResultQuery from '@dc/graphql/student/queries/interestsResult';
import Preferences from '@dc/components/Onboarding/Result/Components/Preferences/Preferences';
import studyPreferencesResultQuery from '@dc/graphql/student/queries/studyPreferencesResult';
import TopNavbar from '@dc/components/Onboarding/Result/Components/TopNavbar/TopNavbar';
import WorkValues from '@dc/components/Onboarding/Result/Components/WorkValues/WorkValues';
import workValuesResultQuery from '@dc/graphql/student/queries/workValuesResult';

function OnboardingResultComponents() {
  return (
    <div className='onboarding-components'>
      <div className='onboarding-components__content-wrapper'>
        <TopNavbar />
        <Switch>
          <ComponentItem
            component={Interests}
            path='/choose-pathway/components/interests'
            query={interestsResultQuery}
          />
          <ComponentItem
            component={WorkValues}
            path='/choose-pathway/components/workvalues'
            query={workValuesResultQuery}
          />
          <ComponentItem
            component={Preferences}
            path='/choose-pathway/components/preferences'
            query={studyPreferencesResultQuery}
          />
        </Switch>
        <BottomNavbar />
      </div>
    </div>
  );
}

export default OnboardingResultComponents;
