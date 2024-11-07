import SharedMainContent from '@dc/shared/MainContent/MainContent';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

export const FormLoader = () => (
  //48px is the navbar height
  <SharedMainContent className='h-[calc(100vh-48px)] flex items-center justify-center'>
    <SharedLoadingSpinner />
  </SharedMainContent>
);
