import { useQuery } from '@apollo/client';

import PROJECT_QUERY, {
  type TProjectData,
  type TProjectVariables,
} from '@pbl/graphql/public/queries/project';

const usePublicProjectQuery = (shareId: string, code: string, skip?: boolean) =>
  useQuery<TProjectData, TProjectVariables>(PROJECT_QUERY, {
    skip,
    variables: {
      code,
      shareId,
      trackPresentation: true,
    },
  });

export default usePublicProjectQuery;
