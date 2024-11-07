import { useQuery } from '@apollo/client';

import ADMIN_PATHWAY_ENROLLMENT_STATS, {
  TAdminPathwayEnrollmentStatsData,
  TAdminPathwayEnrollmentStatsVariables,
} from '@dc/graphql/user/queries/adminPathwayEnrollmentStats';

type Params = {
  skip?: boolean;
  startYear: number;
  uuid: string;
};

export const useAdminPathwayEnrollmentStats = ({ skip, startYear, uuid }: Params) =>
  useQuery<TAdminPathwayEnrollmentStatsData, TAdminPathwayEnrollmentStatsVariables>(
    ADMIN_PATHWAY_ENROLLMENT_STATS,
    {
      skip,
      variables: {
        uuid,
        startYear,
      },
    }
  );
