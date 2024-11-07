import { AGGREGATION_PERIOD } from '@shared/resources/enums';
import { useTagsReportFilters } from '@shared/components/TagsReport/useTagsReportFilters';
import { ALL_OPTION } from '@shared/components/MultiSelect';
import { TagDetailChart } from '@shared/screens/UserApp/TagsReport/TagDetails/TagDetailChart';

type Props = {
  aggregationPeriod: AGGREGATION_PERIOD;
  allTagIds: string[];
};

export const TagCharts = ({ aggregationPeriod, allTagIds }: Props) => {
  const { appliedFilters } = useTagsReportFilters();

  const tagIds = appliedFilters?.tags?.map((tag) => tag.value);

  const isAllTagsSelected =
    appliedFilters.tags.length === 1 && appliedFilters.tags[0].value === ALL_OPTION.value;

  const hasNoTagsSelected = appliedFilters.tags.length === 0;

  const tagIdsToShow = isAllTagsSelected || hasNoTagsSelected ? allTagIds : tagIds;

  return (
    <div className='bg-neutral-200 rounded-sm p-sm xxxl:p-base grid grid-cols-2 xxxl:grid-cols-3 gap-sm xxxl:gap-base'>
      {tagIdsToShow.map((tagId) => (
        <TagDetailChart
          key={tagId}
          aggregationPeriod={aggregationPeriod}
          isSkeleton={hasNoTagsSelected}
          tagId={tagId}
        />
      ))}
    </div>
  );
};
