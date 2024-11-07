import { gql } from '@apollo/client';

import Team, { TTeam } from '../fragments/team';

export default gql`
  mutation UpdateTeam($input: UpdateTeamMutationInput!) {
    updateTeam(input: $input) {
      team {
        ...Team
      }
    }
  }
  ${Team}
`;

export type UpdateTeamData = {
  updateTeam: {
    team: TTeam;
  };
};

export type UpdateTeamVariables = {
  input: UpdateTeamMutationInput;
};

export type UpdateTeamMutationInput = {
  name?: string;
  uuid: string;
  studentUuids?: string[];
  taskIds?: string[];
};
