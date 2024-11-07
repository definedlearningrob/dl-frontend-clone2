import { useQuery } from '@apollo/client';

import { PLANS_QUERY } from '@dc/graphql/user/queries/plans';

export const usePlans = () => useQuery(PLANS_QUERY);
