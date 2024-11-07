import { useQuery } from '@apollo/client';

import TEACHER_CLUSTER_ENROLLMENT_STATS, {
  TTeacherClusterEnrollmentStatsData,
  TTeacherClusterEnrollmentStatsVariables,
} from '@dc/graphql/user/queries/teacherClusterEnrollmentStats';

type Params = {
  skip?: boolean;
  startYear: number;
  userUuid: string;
};

export const useTeacherClusterEnrollmentStats = ({ skip, startYear, userUuid }: Params) =>
  useQuery<TTeacherClusterEnrollmentStatsData, TTeacherClusterEnrollmentStatsVariables>(
    TEACHER_CLUSTER_ENROLLMENT_STATS,
    {
      skip,
      variables: {
        userUuid,
        startYear,
      },
    }
  );
