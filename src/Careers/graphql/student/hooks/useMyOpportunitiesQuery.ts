import { useQuery } from '@apollo/client';

import MY_OPPORTUNITIES, {
  TMyOpportunitiesData,
} from '@dc/graphql/student/queries/myOpportunities';

type Params = {
  skip?: boolean;
};

export const useMyOpportunitiesQuery = ({ skip }: Params = {}) =>
  useQuery<TMyOpportunitiesData>(MY_OPPORTUNITIES, {
    variables: { page: 1, perPage: 100 },
    skip,
  });
