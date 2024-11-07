import { useQuery } from '@apollo/client';

import {
  OPPORTUNITY_APPLICATIONS_QUERY,
  TOpportunityApplicationFilter,
} from '@dc/graphql/user/queries/opportunityApplications';

type Options = {
  id: string;
  skip?: boolean;
  filter?: TOpportunityApplicationFilter;
  notifyOnNetworkStatusChange?: boolean;
  page?: number;
  perPage?: number;
};

const APPLICATIONS_PER_PAGE = 1000;

export const useOpportunityApplicationQuery = ({
  id,
  skip,
  filter,
  page,
  perPage = APPLICATIONS_PER_PAGE,
  notifyOnNetworkStatusChange,
}: Options) =>
  useQuery(OPPORTUNITY_APPLICATIONS_QUERY, {
    variables: { id, filter, perPage, page },
    skip,
    notifyOnNetworkStatusChange,
  });
