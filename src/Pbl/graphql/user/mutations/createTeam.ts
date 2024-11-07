import { gql } from '@apollo/client';

import Team, { TTeam } from '../fragments/team';

export default gql`
  mutation CreateTeam($input: CreateTeamMutationInput!) {
    createTeam(input: $input) {
      team {
        ...Team
      }
    }
  }
  ${Team}
`;

export type CreateTeamData = {
  createTeam: {
    team: TTeam;
  };
};

export type CreateTeamVariables = {
  input: CreateTeamMutationInput;
};

export type CreateTeamMutationInput = {
  name: string;
  schoolClassUuid: string;
  studentUuids?: string[];
};
