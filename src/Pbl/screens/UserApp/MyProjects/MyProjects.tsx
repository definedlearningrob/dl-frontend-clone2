import LibrarySection from '@pbl/components/User/Project/LibrarySection/LibrarySection';
import SharedMainContent from '@pbl/shared/MainContent/MainContent';
import UserMyProjects from '@pbl/components/User/MyProjects/MyProjects';
import UserMyProjectsActivityLoader from '@pbl/components/User/MyProjects/ActivityLoader/ActivityLoader';

const UserMyProjectsScreen = () => (
  <SharedMainContent className='h-[theme(layout.containerHeight)]'>
    <div className='flex gap-base h-full'>
      <div className='grow'>
        <UserMyProjects />
      </div>
      <div className='w-[344px] xxxl:w-[544px] shrink-0 flex flex-col gap-base'>
        <div className='grow min-h-0'>
          <UserMyProjectsActivityLoader />
        </div>
        <div>
          <LibrarySection />
        </div>
      </div>
    </div>
  </SharedMainContent>
);

export default UserMyProjectsScreen;
