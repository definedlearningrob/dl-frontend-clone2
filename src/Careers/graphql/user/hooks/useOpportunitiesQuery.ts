import { useQuery } from '@apollo/client';

import {
  OPPORTUNITIES_QUERY,
  TOpportunitiesData,
  TOpportunitiesVariables,
} from '../queries/opportunities';

type Params = {
  perPage?: number;
  filter?: {
    nameCont?: string;
    typeIn?: string[];
    pathwaysIdIn?: string[];
    tagsContain?: string[];
    partnersIdIn?: string[];
    includeGlobal?: boolean;
  };
};

type Variables = TOpportunitiesVariables & {
  infiniteScroll?: boolean;
};

export const useOpportunitiesQuery = ({ perPage = 25, filter }: Params = {}) =>
  useQuery<TOpportunitiesData, Variables>(OPPORTUNITIES_QUERY, {
    variables: { page: 1, perPage, filter },
    notifyOnNetworkStatusChange: true,
  });
