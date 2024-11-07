import { useQuery } from '@apollo/client';

import ADMIN_CLUSTER_ENROLLMENT_STATS, {
  AdminClusterEnrollmentStatsData,
  TAdminClusterEnrollmentStatsVariables,
} from '@dc/graphql/user/queries/adminClusterEnrollmentStats';

type Params = {
  skip?: boolean;
  startYear: number;
  uuid: string;
};

export const useAdminClusterEnrollmentStats = ({ skip, startYear, uuid }: Params) =>
  useQuery<AdminClusterEnrollmentStatsData, TAdminClusterEnrollmentStatsVariables>(
    ADMIN_CLUSTER_ENROLLMENT_STATS,
    {
      skip,
      variables: {
        uuid,
        startYear,
      },
    }
  );
