import { useParams } from 'react-router-dom';

import SCHOOL_CLASSES, { type TSchoolClassesData } from '@pbl/graphql/user/queries/schoolClasses';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

import ProjectAssignList from '../List/AssignList';

const ProjectAssignLoader = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <SharedDataLoader<TSchoolClassesData>
      options={{ variables: { projectId }, fetchPolicy: 'no-cache' }}
      query={SCHOOL_CLASSES}>
      {({ schoolClasses: { nodes } }) => <ProjectAssignList schoolClasses={nodes} />}
    </SharedDataLoader>
  );
};

export default ProjectAssignLoader;
