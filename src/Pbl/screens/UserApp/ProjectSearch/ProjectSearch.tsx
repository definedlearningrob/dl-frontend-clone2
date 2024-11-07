import { useEffect } from 'react';

import Hits from '@pbl/components/User/ProjectSearch/Hits/Hits';
import RefinementsPanel from '@pbl/components/User/ProjectSearch/RefinementsPanel/RefinementsPanel';
import Results from '@pbl/components/User/ProjectSearch/Results/Results';
import SharedMainContent from '@pbl/shared/MainContent/MainContent';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import './ProjectSearch.sass';

function UserAppProjectSearch() {
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  return (
    <SharedMainContent>
      <div className='project-search'>
        <RefinementsPanel />
        <Results>
          <Hits />
        </Results>
      </div>
    </SharedMainContent>
  );
}

export default UserAppProjectSearch;
