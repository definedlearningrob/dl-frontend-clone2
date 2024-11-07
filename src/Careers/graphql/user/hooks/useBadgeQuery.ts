import { useQuery } from '@apollo/client';

import { BADGE } from '@dc/graphql/user/queries/badge';

type Params = {
  skip?: boolean;
  id: string;
};

export const useBadgeQuery = ({ id, skip }: Params) =>
  useQuery(BADGE, {
    skip,
    variables: { id },
  });
