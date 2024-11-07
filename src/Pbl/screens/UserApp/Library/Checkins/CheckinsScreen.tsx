import { UserLibraryCheckins } from '@pbl/components/User/Library/Checkins/Checkins';
import SharedMainContent from '@pbl/shared/MainContent/MainContent';

import FilterProvider from '@shared/hooks/useFilterContext';

const LibraryCheckinsScreen = () => (
  <SharedMainContent className='min-h-[theme(layout.containerHeight)]'>
    <FilterProvider>
      <UserLibraryCheckins />
    </FilterProvider>
  </SharedMainContent>
);

export default LibraryCheckinsScreen;
