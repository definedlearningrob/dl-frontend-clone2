import { useQuery } from '@apollo/client';

import ADMIN_DASHBOARD_MY_REPORTS, {
  TAdminDashboardMyReportsData,
  TAdminDashboardMyReportsVariables,
} from '@dc/graphql/user/queries/adminDashboardMyReports';

type Params = {
  skip?: boolean;
  startYear: number;
  uuid: string;
};

export const useAdminDashboardMyReports = ({ skip, startYear, uuid }: Params) =>
  useQuery<TAdminDashboardMyReportsData, TAdminDashboardMyReportsVariables>(
    ADMIN_DASHBOARD_MY_REPORTS,
    {
      skip,
      variables: {
        uuid,
        startYear,
      },
    }
  );
