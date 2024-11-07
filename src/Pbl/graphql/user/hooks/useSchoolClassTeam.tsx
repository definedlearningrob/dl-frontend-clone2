import { useQuery } from '@apollo/client';

import SCHOOL_CLASS_TEAM, {
  TSchoolClassTeamData,
  TSchoolClassTeamVariables,
} from '@pbl/graphql/user/queries/schoolClassTeam';

type Params = {
  classUuid: string;
  teamUuid: string;
};

export const useSchoolClassTeam = ({ classUuid, teamUuid }: Params) =>
  useQuery<TSchoolClassTeamData, TSchoolClassTeamVariables>(SCHOOL_CLASS_TEAM, {
    variables: {
      classUuid,
      teamUuid,
    },
  });
