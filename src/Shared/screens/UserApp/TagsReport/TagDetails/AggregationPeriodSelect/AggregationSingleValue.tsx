import { SingleValueProps, components } from 'react-select';

import { AggregationBadge } from '@shared/screens/UserApp/TagsReport/TagDetails/AggregationPeriodSelect/AggregationBadge';
import { AGGREGATION_PERIOD } from '@shared/resources/enums';

export const AggregationSingleValue = ({
  children,
  ...props
}: SingleValueProps<{ label: string; value: string }>) => (
  <components.SingleValue {...props} className='flex items-center gap-xs'>
    <AggregationBadge aggregation={props.data.value as AGGREGATION_PERIOD} />
    {children}
  </components.SingleValue>
);
