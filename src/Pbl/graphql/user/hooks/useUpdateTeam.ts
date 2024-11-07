import { useMutation } from '@apollo/client';

import UPDATE_TEAM, {
  UpdateTeamData,
  UpdateTeamMutationInput,
  UpdateTeamVariables,
} from '../mutations/updateTeam';

export const useUpdateTeam = () => {
  const [mutate, { loading, error }] = useMutation<UpdateTeamData, UpdateTeamVariables>(
    UPDATE_TEAM
  );

  const updateTeam = async ({ name, studentUuids, taskIds, uuid }: UpdateTeamMutationInput) =>
    mutate({
      variables: {
        input: {
          uuid,
          name,
          studentUuids,
          taskIds,
        },
      },
    });

  return [updateTeam, { loading, error }] as const;
};
