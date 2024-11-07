import ProjectAssignBody from '@pbl/components/User/Project/Assign/Body/ProjectAssignBody';
import ProjectAssignHeader from '@pbl/components/User/Project/Assign/Header/ProjectAssignHeader';
import SharedMainContent from '@pbl/shared/MainContent/MainContent';

import FullPageCard from '@shared/components/FullPageCard/FullPageCard';

const ProjectAssignScreen = () => (
  <SharedMainContent>
    <FullPageCard size='md'>
      <ProjectAssignHeader />
      <ProjectAssignBody />
    </FullPageCard>
  </SharedMainContent>
);

export default ProjectAssignScreen;
