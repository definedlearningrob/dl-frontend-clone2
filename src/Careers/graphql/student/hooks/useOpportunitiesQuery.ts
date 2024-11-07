import { useQuery } from '@apollo/client';

import OPPORTUNITIES_QUERY, {
  TOpportunitiesData,
  TOpportunitiesVariables,
} from '@dc/graphql/student/queries/opportunities';

type Params = {
  perPage: number;
  filter?: TOpportunitiesVariables['filter'];
  skip?: boolean;
};

type Variables = TOpportunitiesVariables & {
  infiniteScroll?: boolean;
};

export const useOpportunitiesQuery = ({ skip, perPage }: Params) =>
  useQuery<TOpportunitiesData, Variables>(OPPORTUNITIES_QUERY, {
    skip,
    variables: {
      page: 1,
      perPage,
      infiniteScroll: true,
    },
    notifyOnNetworkStatusChange: true,
  });
