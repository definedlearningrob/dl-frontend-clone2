import { useQuery } from '@apollo/client';

import TEACHER_PATHWAY_ENROLLMENT_STATS, {
  TTeacherPathwayEnrollmentStatsData,
  TTeacherPathwayEnrollmentStatsVariables,
} from '@dc/graphql/user/queries/teacherPathwayEnrollmentStats';

type Params = {
  skip?: boolean;
  startYear: number;
  userUuid: string;
};

export const useTeacherPathwayEnrollmentStats = ({ skip, startYear, userUuid }: Params) =>
  useQuery<TTeacherPathwayEnrollmentStatsData, TTeacherPathwayEnrollmentStatsVariables>(
    TEACHER_PATHWAY_ENROLLMENT_STATS,
    {
      skip,
      variables: {
        userUuid,
        startYear,
      },
    }
  );
