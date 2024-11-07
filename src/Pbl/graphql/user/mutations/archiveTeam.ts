import { gql } from '@apollo/client';

import Team, { TTeam } from '../fragments/team';

export default gql`
  mutation ArchiveTeam($input: ArchiveTeamMutationInput!) {
    archiveTeam(input: $input) {
      team {
        ...Team
      }
    }
  }
  ${Team}
`;

export type ArchiveTeamData = {
  archiveTeam: {
    team: TTeam;
  };
};

export type ArchiveTeamVariables = {
  input: ArchiveTeamMutationInput;
};

export type ArchiveTeamMutationInput = {
  uuid: string;
};
