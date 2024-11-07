import { useMutation } from '@apollo/client';

import RESTORE_PROJECT, {
  TRestoreProjectData,
  TRestoreProjectsVariables,
} from '@pbl/graphql/user/mutations/restoreProject';

export const useRestoreProjectMutation = ({ id }: { id: string }) => {
  const [mutate, { loading, error }] = useMutation<TRestoreProjectData, TRestoreProjectsVariables>(
    RESTORE_PROJECT
  );

  const restoreProject = async () =>
    mutate({
      variables: {
        input: { id },
      },
      optimisticResponse: {
        restoreTask: {
          task: {
            id,
            isArchived: false,
          },
        },
      },
    });

  return [restoreProject, { loading, error }] as const;
};
