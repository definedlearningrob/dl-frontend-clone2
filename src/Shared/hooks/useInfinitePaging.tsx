import { OperationVariables, type ObservableQueryFields } from '@apollo/client';
import { useState } from 'react';

type TFetchMore<T, K extends OperationVariables> =
  | ObservableQueryFields<T, K>['fetchMore']
  | undefined;

function useInfinitePaging<TData, TVariables extends OperationVariables>(perPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const onShowMore = (fetchMore: TFetchMore<TData, TVariables>) => () => {
    const newPage = currentPage + 1;

    fetchMore &&
      fetchMore({
        variables: { page: newPage, perPage: perPage },
      });

    setCurrentPage(newPage);
  };

  return {
    currentPage,
    setCurrentPage,
    onShowMore,
  };
}

export default useInfinitePaging;
