import { useQuery } from '@apollo/client';

import ASSIGNED_PROJECTS, {
  TAssignedProjectsData,
  TAssignedProjectVariables,
} from '@pbl/graphql/user/queries/assignedProjects';

const MAX_PER_PAGE = 1000;

const useAssignedProjects = () => {
  const assignedProjects = useQuery<TAssignedProjectsData, TAssignedProjectVariables>(
    ASSIGNED_PROJECTS,
    {
      variables: {
        perPage: MAX_PER_PAGE,
        page: 1,
      },
    }
  );

  return assignedProjects;
};

export default useAssignedProjects;
