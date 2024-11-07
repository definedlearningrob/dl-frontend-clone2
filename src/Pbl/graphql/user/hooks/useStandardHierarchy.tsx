import { useQuery } from '@apollo/client';

import StandardHierarchy, {
  StandardsHierarchyData,
  StandardsHierarchyVariables,
} from '@pbl/graphql/user/queries/standardHierarchy';

const useStandardsHierarchy = (setId: string, subject: string, grade: string) =>
  useQuery<StandardsHierarchyData, StandardsHierarchyVariables>(StandardHierarchy, {
    variables: { setId, subject, grade },
  });

export default useStandardsHierarchy;
