import { useQuery } from '@apollo/client';

import StandardTasks, {
  StandardTasksData,
  StandardTasksVariables,
} from '@pbl/graphql/user/queries/standardTasks';

const useStandardTasks = (standardGuid: string) =>
  useQuery<StandardTasksData, StandardTasksVariables>(StandardTasks, {
    variables: { standardGuid },
  });

export default useStandardTasks;
