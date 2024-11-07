import SharedMainContent from '@pbl/shared/MainContent/MainContent';

import { ExperiencesPanel } from '@shared/components/ExperiencesPanel';

export const PortfolioExperiences = () => (
  <SharedMainContent className='experiencesContainer'>
    <ExperiencesPanel isStudent={false} />
  </SharedMainContent>
);
