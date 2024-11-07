import { useTranslation } from 'react-i18next';

import { Select } from '@shared/components/Select';
import { AGGREGATION_PERIOD } from '@shared/resources/enums';
import { AggregationSingleValue } from '@shared/screens/UserApp/TagsReport/TagDetails/AggregationPeriodSelect/AggregationSingleValue';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { AggregationOption } from './AggregationOption';

type Props = {
  onAggregationChange: (aggregation: AGGREGATION_PERIOD) => void;
  aggregationPeriod: AGGREGATION_PERIOD;
};

export const AggregationPeriodSelect = ({ onAggregationChange, aggregationPeriod }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const options = Object.keys(AGGREGATION_PERIOD).map((period) => ({
    value: period,
    label: t(`reports.aggregationPeriods.${period}`),
  }));

  return (
    <div className='min-w-[240px]'>
      <Select
        components={{ Option: AggregationOption, SingleValue: AggregationSingleValue }}
        isSearchable={false}
        label={t('reports.aggregationPeriodLabel')}
        options={options}
        size={isFullHD ? 'md' : 'sm'}
        value={options.find((option) => option.value === aggregationPeriod)}
        onChange={(option) => {
          option && onAggregationChange(option.value as AGGREGATION_PERIOD);
        }}
      />
    </div>
  );
};
