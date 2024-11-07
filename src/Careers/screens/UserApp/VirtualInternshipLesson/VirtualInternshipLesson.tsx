import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { VirtualInternshipLessonContent } from '@dc/components/User/VirtualInternshipLessonContent';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';

export const VirtualInternshipLesson = () => {
  const { opportunityId, virtualInternshipId } =
    useParams<{ opportunityId: string; virtualInternshipId: string }>();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(
      true,
      `/opportunities/${opportunityId}/virtual-internship/${virtualInternshipId}`
    );

    return () => setBackNavButton(false);
  }, []);

  return (
    <SharedMainContent className='flex justify-center'>
      <div className='w-2/3'>
        <VirtualInternshipLessonContent />
      </div>
    </SharedMainContent>
  );
};
