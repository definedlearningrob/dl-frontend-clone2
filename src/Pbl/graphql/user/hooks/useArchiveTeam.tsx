import { useMutation } from '@apollo/client';

import ARCHIVE_TEAM, { ArchiveTeamData, ArchiveTeamVariables } from '../mutations/archiveTeam';

export const useArchiveTeam = (teamId: string) => {
  const [mutate, { loading, error }] = useMutation<ArchiveTeamData, ArchiveTeamVariables>(
    ARCHIVE_TEAM
  );

  const archiveTeam = async () =>
    mutate({
      variables: {
        input: { uuid: teamId },
      },
    });

  return [archiveTeam, { loading, error }] as const;
};
