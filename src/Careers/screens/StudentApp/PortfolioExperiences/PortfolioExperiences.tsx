import SharedMainContent from '@dc/shared/MainContent/MainContent';

import { ExperiencesPanel } from '@shared/components/ExperiencesPanel';

export const PortfolioExperiences = () => (
  <SharedMainContent className='experiencesContainer'>
    <ExperiencesPanel isStudent={true} />
  </SharedMainContent>
);
