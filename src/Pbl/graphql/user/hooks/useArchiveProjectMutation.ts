import { useMutation } from '@apollo/client';

import { removeFromCache } from '@dc/utils/graphql';

import ARCHIVE_PROJECT, {
  TArchiveProjectData,
  TArchiveProjectsVariables,
} from '@pbl/graphql/user/mutations/archiveProject';

export const useArchiveProjectMutation = ({ id }: { id: string }) => {
  const [mutate, { loading, error }] = useMutation<TArchiveProjectData, TArchiveProjectsVariables>(
    ARCHIVE_PROJECT
  );

  const archiveProject = async () =>
    mutate({
      variables: {
        input: { id },
      },
      update: removeFromCache(id, 'Task'),
    });

  return [archiveProject, { loading, error }] as const;
};
