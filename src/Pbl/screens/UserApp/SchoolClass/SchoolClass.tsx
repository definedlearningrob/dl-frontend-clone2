import { useEffect } from 'react';

import UserSchoolClassActivityLoader from '@pbl/components/User/SchoolClass/ActivityLoader/ActivityLoader';
import UserSchoolClass from '@pbl/components/User/SchoolClass/SchoolClass';
import UserTeams from '@pbl/components/User/Teams/Teams';
import SharedMainContent from '@pbl/shared/MainContent/MainContent';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';

export const SchoolClass = () => {
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  return (
    <SharedMainContent className='h-[theme(layout.containerHeight)]'>
      <div className='grid grid-cols-3 gap-base grid-rows-2 h-full'>
        <div className='col-span-2 row-span-2'>
          <UserSchoolClass />
        </div>
        <div className='col-span-1'>
          <UserSchoolClassActivityLoader />
        </div>
        <div className='col-span-1'>
          <UserTeams />
        </div>
      </div>
    </SharedMainContent>
  );
};
