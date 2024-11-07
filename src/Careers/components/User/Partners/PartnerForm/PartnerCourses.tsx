import { useCoursesQuery } from '@graphql/dc/users/hooks';
import { useMemo, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { ArchivableStatus } from '@graphql/dc/users/types';
import { isEmpty } from 'lodash-es';
import { useUpdateEffect } from 'react-use';
import { CoursesQueryVariables } from '@graphql/dc/users/operations';

import { PartnerCoursesList } from '@dc/components/User/Partners/PartnerForm/PartnerTableComponents/PartnerCoursesList';
import { PartnerCoursesFilters } from '@dc/components/User/Partners/PartnerForm/PartnerCourses/PartnerCoursesFilters';
import { usePartnerCustomFilters } from '@dc/components/User/Partners/PartnerForm/usePartnerCoursesFilters';
import { PartnerListSkeleton } from '@dc/components/User/Partners/PartnerForm/PartnerSkeletons/PartnerListSkeleton';

import useClearCacheOnUnmount from '@shared/hooks/useClearCacheOnUnmount';

type Variables = CoursesQueryVariables & {
  infiniteScroll?: boolean;
};

export const PartnerCourses = () => {
  const { filters } = usePartnerCustomFilters();
  const currentPage = useRef(1);

  const { data, fetchMore, refetch } = useCoursesQuery({
    variables: {
      scope: ArchivableStatus.ACTIVE,
      page: 1,
      perPage: 25,
      filter: filters,
      infiniteScroll: true,
      withCopies: false,
    } as Variables,
    notifyOnNetworkStatusChange: true,
  });

  const hasNextPage = useMemo(
    () => !isEmpty(data) && currentPage.current < data?.courses.pagesCount,
    [data]
  );

  useClearCacheOnUnmount('courses');

  const handleFetchMore = () => {
    const newPage = currentPage.current + 1;
    fetchMore({
      variables: {
        page: newPage,
      },
    });
    currentPage.current = newPage;
  };

  useUpdateEffect(() => {
    refetch({
      filter: filters,
    });
    currentPage.current = 1;
  }, [filters]);

  return (
    <>
      <PartnerCoursesFilters />
      <div className='z-lowest scrollbar flex flex-col h-[520px] min-h-0'>
        <InfiniteScroll
          className='w-full relative rounded-t-sm'
          element='table'
          hasMore={hasNextPage}
          initialLoad={false}
          loadMore={handleFetchMore}
          loader={
            <tbody key={0}>
              <PartnerListSkeleton />
              <PartnerListSkeleton />
            </tbody>
          }
          pageStart={1}
          threshold={50}
          useWindow={false}>
          <PartnerCoursesList courses={data?.courses.nodes} />
        </InfiniteScroll>
      </div>
    </>
  );
};
