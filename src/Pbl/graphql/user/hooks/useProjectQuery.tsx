import { useQuery } from '@apollo/client';

import PROJECT_QUERY, {
  type TProjectData,
  type TProjectVariables,
} from '@pbl/graphql/user/queries/project';

const useProjectQuery = (id: string, code?: string, skip?: boolean) =>
  useQuery<TProjectData, TProjectVariables>(PROJECT_QUERY, {
    skip,
    variables: {
      code,
      id,
      trackPresentation: true,
      track: true,
    },
  });

export default useProjectQuery;
