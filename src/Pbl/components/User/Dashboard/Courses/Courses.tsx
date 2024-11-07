import { useDashboardCatalogQuery, useDashboardCoursesQuery } from '@graphql/dl/users/hooks';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { useEffect, useRef } from 'react';

import { TCatalog } from '@pbl/graphql/user/queries/dashboardCatalog';

import { TrackList, TrackListSkeleton } from '@shared/components/Catalog';
import useClearCacheKey from '@shared/hooks/useClearCacheKey';

type Props = {
  selectedCatalogData?: TCatalog;
  isCatalogLoading?: boolean;
};

export const UserDashboardCourses = ({ selectedCatalogData, isCatalogLoading }: Props) => {
  const { id } = useParams<{ id?: string }>();
  const currentPage = useRef(1);
  const { clearCache } = useClearCacheKey();

  const catalogId = selectedCatalogData?.id || id;

  const { data: dashboardCatalogData, loading: catalogsLoading } = useDashboardCatalogQuery({
    variables: { id: catalogId || '', page: 1, perPage: 1000 },
    skip: !catalogId || isCatalogLoading,
  });

  const {
    data: dashboardCoursesData,
    loading: coursesLoading,
    fetchMore: fetchMoreCourses,
  } = useDashboardCoursesQuery({
    variables: { page: 1, perPage: 20 },
    skip: !!catalogId || isCatalogLoading,
  });

  useEffect(() => {
    clearCache('tracks');
  }, [catalogId]);

  const data = catalogId ? dashboardCatalogData?.catalog : dashboardCoursesData;
  const tracks = data?.courses.nodes;
  const hasNextPage = !!data && data.courses.pagesCount > currentPage.current;

  const isLoading = catalogsLoading || coursesLoading || isCatalogLoading;

  const handleFetchMore = (nextPage: number) => {
    fetchMoreCourses({ variables: { page: nextPage, infiniteScroll: true } });
    currentPage.current = nextPage;
  };

  return (
    <InfiniteScroll
      hasMore={hasNextPage}
      initialLoad={false}
      loadMore={handleFetchMore}
      loader={
        <div className='mt-sm'>
          <TrackListSkeleton />
        </div>
      }
      pageStart={1}
      threshold={200}
      useWindow={true}>
      <TrackList isLoading={isLoading} tracks={tracks} />
    </InfiniteScroll>
  );
};
