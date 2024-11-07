import { QueryHookOptions, useQuery } from '@apollo/client';
import { useState } from 'react';

import type { TypedDocumentNode } from '@apollo/client';

type GenericPaginatedData = {
  [key: string]: {
    nodes: unknown[];
    pagesCount: number;
    nodesCount: number;
  };
};

type GenericPaginatedVariables = {
  page: number;
  perPage: number;
};

const DEFAULT_PAGE_SIZE = 10;

export const useInfiniteQuery = <
  T extends GenericPaginatedData,
  K extends GenericPaginatedVariables
>(
  query: TypedDocumentNode<T, K>,
  options?: QueryHookOptions<T, K>
) => {
  const [page, setPage] = useState(1);

  const { data, loading, fetchMore } = useQuery<T, K>(query, {
    ...options,
    //@ts-ignore
    variables: {
      ...options?.variables,
      page,
      perPage: options?.variables?.perPage || DEFAULT_PAGE_SIZE,
    },
  });

  const keyName = data && Object.keys(data)[0];

  const onFetchMore = async () => {
    if (loading) return;

    const nextPage = page + 1;

    await fetchMore({
      variables: {
        page: nextPage,
        infiniteScroll: true,
      },
    });

    setPage(nextPage);
  };

  const hasNextPage = data && keyName && data[keyName].pagesCount > page;

  return {
    data,
    hasNextPage,
    loading,
    onFetchMore,
  };
};
