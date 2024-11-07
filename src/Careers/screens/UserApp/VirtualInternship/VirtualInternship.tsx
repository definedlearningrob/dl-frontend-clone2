import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { VirtualInternshipContent } from '@dc/components/User/VirtualInternshipContent/VirtualInternshipContent';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';

export const VirtualInternship = () => {
  const { opportunityId } = useParams<{ opportunityId: string }>();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true, `/opportunities/${opportunityId}`);

    return () => setBackNavButton(false);
  }, []);

  return (
    <SharedMainContent className='pt-xs xxxl:pt-md flex justify-center'>
      <div className='flex flex-col gap-base xxxl:gap-md w-2/3'>
        <VirtualInternshipContent />
      </div>
    </SharedMainContent>
  );
};
