import { useQuery } from '@apollo/client';

import CatalogQuery, {
  TDashboardCatalogData,
  TDashboardCatalogVariables,
} from '@pbl/graphql/user/queries/dashboardCatalog';

const useDashboardCatalog = (id: string) =>
  useQuery<TDashboardCatalogData, TDashboardCatalogVariables>(CatalogQuery, {
    variables: { id },
  });

export default useDashboardCatalog;
