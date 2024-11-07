import { PLANS_QUERY } from '@dc/graphql/user/queries/plans';
import { PlanListWrapper } from '@dc/components/Admin/Entity/Plans/PlanListWrapper';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';

export const PlanWrapper = () => (
  <SharedPaginatedLoader omitUrl={true} query={PLANS_QUERY}>
    {(props) => <PlanListWrapper pagingProps={props} />}
  </SharedPaginatedLoader>
);
