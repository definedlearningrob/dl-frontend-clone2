import { useQuery } from '@apollo/client';

import { TAGS } from '@dc/graphql/user/queries/tags';

type Params = {
  filters?: { nameCont?: string; typeEq?: string };
  page?: number;
  perPage?: number;
  infiniteScroll?: boolean;
};

export const useTagsQuery = ({ filters, page = 1, perPage = 25, infiniteScroll = false }: Params) =>
  useQuery(TAGS, {
    variables: { filter: filters, page, perPage, infiniteScroll },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });
