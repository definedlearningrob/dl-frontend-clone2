import { useQuery } from '@apollo/client';

import PROJECTS_QUERY, {
  type TProjectsData,
  type TProjectsVariables,
  type TaskFilter,
} from '@pbl/graphql/user/queries/projects';

const useProjectsQuery = (teamId: string, filter?: TaskFilter, page?: number, perPage = 20) =>
  useQuery<TProjectsData, TProjectsVariables>(PROJECTS_QUERY, {
    variables: {
      teamId,
      filter,
      page,
      perPage,
      infiniteScroll: true,
    },
    notifyOnNetworkStatusChange: true,
  });

export type { TProjectsData, TProjectsVariables };
export default useProjectsQuery;
