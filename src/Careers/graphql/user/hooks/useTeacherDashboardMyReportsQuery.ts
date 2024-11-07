import { useQuery } from '@apollo/client';

import TEACHER_DASHBOARD_MY_REPORTS, {
  TTeacherDashboardMyReportsData,
  TTeacherDashboardMyReportsVariables,
} from '@dc/graphql/user/queries/teacherDashboardMyReports';

type Params = {
  skip?: boolean;
  startYear: number;
  userUuid: string;
};

export const useTeacherDashboardMyReportsQuery = ({ skip, startYear, userUuid }: Params) =>
  useQuery<TTeacherDashboardMyReportsData, TTeacherDashboardMyReportsVariables>(
    TEACHER_DASHBOARD_MY_REPORTS,
    {
      skip,
      variables: {
        userUuid,
        startYear,
      },
    }
  );
