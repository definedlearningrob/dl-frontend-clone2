import { useQuery } from '@apollo/client';

import {
  VIRTUAL_INTERNSHIPS_QUERY,
  TVirtualInternshipsData,
  TVirtualInternshipsVariables,
} from '../queries/virtualInternships';

type Params = {
  perPage?: number;
};

type Variables = TVirtualInternshipsVariables & {
  infiniteScroll?: boolean;
};

export const useVirtualInternshipsQuery = ({ perPage = 20 }: Params = {}) =>
  useQuery<TVirtualInternshipsData, Variables>(VIRTUAL_INTERNSHIPS_QUERY, {
    variables: { page: 1, perPage },
    notifyOnNetworkStatusChange: true,
  });
