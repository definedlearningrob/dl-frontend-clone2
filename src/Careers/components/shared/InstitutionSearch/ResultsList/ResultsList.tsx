import { isEmpty } from 'lodash-es';
import { useMemo, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useUpdateEffect } from 'react-use';
import { NetworkStatus } from '@apollo/client';

import { ResultSkeleton } from '@dc/components/Student/InstitutionSearch/ResultSkeleton/ResultSkeleton';
import { EmptyInstitutionList } from '@dc/shared/InstitutionSearch/EmptyInstitutionList/EmptyInstitutionList';
import { InstitutionCard } from '@dc/shared/InstitutionCard';
import styles from '@dc/shared/InstitutionSearch/ResultsList/ResultsList.module.sass';
import { useInstitutionsQuery } from '@dc/graphql/user/hooks/useUserInstitutionsQuery';
import { useInstitutionsQuery as useStudentInstitutionsQuery } from '@dc/graphql/student/hooks/useInstitutionsQuery';
import { useInstitutionFilters } from '@dc/shared/InstitutionFiltersProvider';

import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import useClearCacheOnUnmount from '@shared/hooks/useClearCacheOnUnmount';

const INFINITE_SCROLL_THRESHOLD = 400;

type Props = {
  isTeacher: boolean;
};

export const ResultsList = ({ isTeacher }: Props) => {
  const currentPage = useRef(1);
  const { filters } = useInstitutionFilters();

  const isDesktop = useBreakpointUp({ breakpoint: 'xxxl' });

  const institutionsPerPage = isDesktop ? 18 : 12;

  useClearCacheOnUnmount('institutions');

  const useProperInstitutionsQuery = isTeacher ? useInstitutionsQuery : useStudentInstitutionsQuery;

  const { data, loading, fetchMore, refetch, networkStatus } = useProperInstitutionsQuery({
    filter: filters,
    perPage: institutionsPerPage,
    track: true,
  });

  const hasNextPage = useMemo(
    () => !isEmpty(data) && data.institutions.pagesCount > currentPage.current,
    [data]
  );

  const handleFetch = (nextPageNumber: number) => {
    fetchMore({
      variables: {
        perPage: institutionsPerPage,
        page: nextPageNumber,
        track: false,
        filter: filters,
      },
    });
    currentPage.current = nextPageNumber;
  };

  useUpdateEffect(() => {
    refetch({ filter: filters, page: 1 });
    currentPage.current = 1;
  }, [filters, refetch]);

  if (loading && networkStatus !== NetworkStatus.fetchMore) {
    return <ResultSkeleton count={institutionsPerPage} />;
  }

  if (isEmpty(data?.institutions.nodes)) {
    return <EmptyInstitutionList />;
  }

  return (
    <InfiniteScroll
      element='div'
      hasMore={hasNextPage}
      initialLoad={false}
      loadMore={handleFetch}
      loader={
        <div key='institution-loader' className={styles.loading}>
          <ResultSkeleton count={institutionsPerPage / 3} />
        </div>
      }
      pageStart={1}
      threshold={INFINITE_SCROLL_THRESHOLD}
      useWindow={true}>
      <div className={styles.content}>
        {data?.institutions.nodes.map((item) => (
          <InstitutionCard key={item.id} institution={item} withoutFavorite={isTeacher} />
        ))}
      </div>
    </InfiniteScroll>
  );
};
