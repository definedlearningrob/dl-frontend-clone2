import { PaginationState } from '@tanstack/react-table';
import { isNil, times } from 'lodash-es';
import { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';
import { cx } from '@shared/utils/cx';

type Props = PropsWithChildren<{
  pagesCount: number | undefined;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  fetchMore?: (nextPage: number) => void;
  columnsCount: number;
}>;

const getTableLoader = (columnsCount: number) =>
  times(3, (rowIndex) => (
    <tr key={rowIndex} className='border-b border-neutral-300 last:border-b-0'>
      {times(columnsCount, (index) => (
        <td
          key={index}
          className={cx(
            'p-xs xxxl:px-x first:pl-base last:pr-base xxxl:first:pl-md xxxl:last:pr-md'
          )}>
          <SkeletonRectangle />
        </td>
      ))}
    </tr>
  ));

const tableClasses = 'w-full table-fixed overflow-auto';

export const NewTableContainer = ({
  pagesCount,
  pagination,
  setPagination,
  fetchMore,
  columnsCount,
  children,
}: Props) => {
  const hasInfiniteScroll = !!fetchMore && !isNil(pagesCount);
  const hasNextPage = hasInfiniteScroll && pagination.pageIndex < pagesCount - 1;

  const handleFetchMore = async () => {
    if (!hasInfiniteScroll) return;

    fetchMore(pagination.pageIndex + 1);

    setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
  };

  if (hasInfiniteScroll) {
    return (
      <InfiniteScroll
        className={tableClasses}
        element='table'
        hasMore={hasNextPage}
        initialLoad={false}
        loadMore={handleFetchMore}
        // Cannot pass Element[] as loader
        // @ts-ignore
        loader={getTableLoader(columnsCount)}
        pageStart={1}
        useWindow={false}>
        {children}
      </InfiniteScroll>
    );
  }

  return <table className={tableClasses}>{children}</table>;
};
