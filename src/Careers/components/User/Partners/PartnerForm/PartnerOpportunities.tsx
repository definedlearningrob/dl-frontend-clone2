import InfiniteScroll from 'react-infinite-scroller';
import { usePartnerOpportunitiesQuery } from '@graphql/dc/users/hooks';
import { useMemo, useRef } from 'react';
import { isEmpty } from 'lodash-es';
import { useUpdateEffect } from 'react-use';
import { useFormikContext } from 'formik';
import { useParams } from 'react-router-dom';

import { PartnerListSkeleton } from '@dc/components/User/Partners/PartnerForm/PartnerSkeletons/PartnerListSkeleton';
import { PartnerOpportunitiesList } from '@dc/components/User/Partners/PartnerForm/PartnerOpportunities/PartnerOpportunitiesList';
import { PartnerOpportunitiesFilters } from '@dc/components/User/Partners/PartnerForm/PartnerOpportunities/PartnerOpportunitiesFilters';
import { usePartnerCustomFilters } from '@dc/components/User/Partners/PartnerForm/usePartnerCoursesFilters';
import { CreatePartnerFormValues } from '@dc/screens/UserApp/Partners/CreatePartnerScreen';

export const PartnerOpportunities = () => {
  const { filters } = usePartnerCustomFilters();
  const currentPage = useRef(1);
  const { id } = useParams<{ id: string }>();
  const {
    values: { opportunities },
  } = useFormikContext<CreatePartnerFormValues>();
  const { data, fetchMore, refetch } = usePartnerOpportunitiesQuery({
    variables: {
      filter: {
        ...filters,
        excludeAssigned: true,
      },
      page: 1,
      perPage: 25,
    },
    notifyOnNetworkStatusChange: true,
  });
  const hasNextPage = useMemo(
    () => !isEmpty(data) && currentPage.current < data?.opportunities.pagesCount,
    [data]
  );

  const opportunitiesWithSelected = useMemo(() => {
    if (!opportunities || !data?.opportunities.nodes) {
      return [];
    }
    const selectedOpportunitiesIds = opportunities.map((opportunity) => opportunity.id);

    return [
      ...opportunities,
      ...data?.opportunities.nodes.filter(
        (opportunity) => !selectedOpportunitiesIds.includes(opportunity.id)
      ),
    ];
  }, [data?.opportunities.nodes, opportunities]);

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
      filter: {
        ...filters,
        excludeAssigned: true,
      },
    });
    currentPage.current = 1;
  }, [filters]);

  if (!data) {
    return null;
  }

  return (
    <>
      <PartnerOpportunitiesFilters />
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
          <PartnerOpportunitiesList
            opportunities={id ? opportunitiesWithSelected : data.opportunities.nodes}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};
