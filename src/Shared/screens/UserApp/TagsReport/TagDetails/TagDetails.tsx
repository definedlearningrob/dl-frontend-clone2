import { Trans, useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { AggregationPeriodSelect } from '@shared/screens/UserApp/TagsReport/TagDetails/AggregationPeriodSelect/AggregationPeriodSelect';
import Card from '@shared/components/Card/Card';
import { AGGREGATION_PERIOD } from '@shared/resources/enums';
import { useTagsReportFilters } from '@shared/components/TagsReport/useTagsReportFilters';
import { TAG_OPTIONS } from '@shared/graphql/user/query/tagOptions';
import { ALL_OPTION } from '@shared/components/MultiSelect';

import { TagCharts } from './TagCharts';

export const TagDetails = () => {
  const { t } = useTranslation();

  const [aggregationPeriod, setAggregationPeriod] = useState<AGGREGATION_PERIOD>(
    AGGREGATION_PERIOD.MONTH
  );

  const { appliedFilters } = useTagsReportFilters();

  const { data } = useQuery(TAG_OPTIONS, { variables: { page: 1, perPage: 1000 } });

  const allTagIds = data?.tags.nodes.map(({ id }) => id) || [];

  const isAllTagsSelected =
    appliedFilters.tags.length === 1 && appliedFilters.tags[0].value === ALL_OPTION.value;

  const tagsCount = isAllTagsSelected ? allTagIds.length : appliedFilters?.tags?.length;

  return (
    <Card>
      <div className='mb-base xxxl:mb-md flex justify-between gap-sm'>
        <div>
          <h5 className='text-sm xxxl:text-base mb-xs xxxl:mb-sm'>
            <Trans
              components={{
                neutralText: <span className='text-neutral-600 font-bold xxxl:text-base' />,
              }}
              i18nKey='tagsReport.tagDetails'
              values={{ count: tagsCount }}
            />
          </h5>
          <p className='mb-0 text-xs xxxl:text-sm leading-lg'>{t('tagsReport.tagDetailsInfo')}</p>
        </div>
        <AggregationPeriodSelect
          aggregationPeriod={aggregationPeriod}
          onAggregationChange={setAggregationPeriod}
        />
      </div>
      <TagCharts aggregationPeriod={aggregationPeriod} allTagIds={allTagIds} />
    </Card>
  );
};
