import { useQuery } from '@apollo/client';

import { useTagsReportFilters } from '@shared/components/TagsReport/useTagsReportFilters';
import { TAG_SUMMARY } from '@shared/graphql/user/query/tagsReport';
import { AGGREGATION_PERIOD } from '@shared/resources/enums';
import { TagDetailsCard } from '@shared/components/TagDetailsCard/TagDetailsCard';
import LoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { mockedTagSummary } from '@shared/screens/UserApp/TagsReport/TagDetails/helpers';

type Props = {
  tagId: string;
  aggregationPeriod: AGGREGATION_PERIOD;
  isSkeleton: boolean;
};

export const TagDetailChart = ({ tagId, aggregationPeriod, isSkeleton }: Props) => {
  const { tagSummaryVariables } = useTagsReportFilters();

  const { data, loading } = useQuery(TAG_SUMMARY, {
    variables: {
      summaryFilter: {
        tagId,
        aggregationPeriod,
        ...tagSummaryVariables,
      },
    },
  });

  if (loading)
    return (
      <div className='bg-white gap-xs p-sm xxxl:p-base rounded-sm h-[294px] xxxl:h-[332px] '>
        <LoadingSpinner className='my-auto h-full' size='small' />
      </div>
    );

  if (!data) return null;

  const {
    reports: {
      tagReport: { tagSummary },
    },
  } = data;

  const tagSummaryToDisplay = isSkeleton ? mockedTagSummary : tagSummary;

  return <TagDetailsCard aggregationPeriod={aggregationPeriod} tagSummary={tagSummaryToDisplay} />;
};
