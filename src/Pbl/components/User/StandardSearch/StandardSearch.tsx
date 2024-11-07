import { Wizard } from 'react-use-wizard';

import FirstStep from '@pbl/components/User/StandardSearch/StandardSearchSteps/FirstStep';
import SecondStep from '@pbl/components/User/StandardSearch/StandardSearchSteps/SecondStep';
import ThirdStep from '@pbl/components/User/StandardSearch/StandardSearchSteps/ThirdStep';
import FourthStep from '@pbl/components/User/StandardSearch/StandardSearchSteps/FourthStep';

import { StandardsSearchProvider } from '@shared/hooks/useStandardSearchContext';
const StandardSearch = () => (
  <StandardsSearchProvider>
    <Wizard>
      <FirstStep />
      <SecondStep />
      <ThirdStep />
      <FourthStep />
    </Wizard>
  </StandardsSearchProvider>
);

export default StandardSearch;
