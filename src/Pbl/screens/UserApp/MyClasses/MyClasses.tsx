import { UserMyClassesActivityLoader } from '@pbl/components/User/MyClasses/ActivityLoader/ActivityLoader';
import SharedMainContent from '@pbl/shared/MainContent/MainContent';
import UserMyClasses from '@pbl/components/User/MyClasses/MyClasses';

export const UserMyClassesScreen = () => (
  <SharedMainContent className='flex gap-sm h-[calc(100vh-48px)]'>
    <div className='basis-2/3'>
      <UserMyClasses />
    </div>
    <div className='basis-1/3'>
      <UserMyClassesActivityLoader />
    </div>
  </SharedMainContent>
);
