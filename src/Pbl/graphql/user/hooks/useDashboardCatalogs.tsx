import { useQuery } from '@apollo/client';

import CatalogsQuery, {
  TDashboardVariables,
  TDashboardCatalogsData,
} from '@pbl/graphql/user/queries/dashboardCatalogs';

const useDashboardCatalogs = () =>
  useQuery<TDashboardCatalogsData, TDashboardVariables>(CatalogsQuery);

export default useDashboardCatalogs;
