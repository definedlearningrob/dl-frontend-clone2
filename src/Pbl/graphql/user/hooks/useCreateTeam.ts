import { useMutation } from '@apollo/client';

import CREATE_TEAM, {
  CreateTeamData,
  CreateTeamMutationInput,
  CreateTeamVariables,
} from '../mutations/createTeam';

type Variables = Omit<CreateTeamMutationInput, 'schoolClassUuid'>;

export const useCreateTeam = (classId: string) => {
  const [mutate, { loading, error }] = useMutation<CreateTeamData, CreateTeamVariables>(
    CREATE_TEAM
  );

  const createTeam = async ({ name, studentUuids }: Variables) =>
    mutate({
      variables: {
        input: {
          schoolClassUuid: classId,
          name,
          studentUuids,
        },
      },
      update(cache, { data }) {
        cache.modify({
          id: cache.identify({
            uuid: classId,
            __typename: 'SchoolClass',
          }),
          fields: {
            teams(existingTeams = []) {
              const createdTeam = data?.createTeam.team;

              return [...existingTeams, createdTeam];
            },
          },
        });
      },
    });

  return [createTeam, { loading, error }] as const;
};
