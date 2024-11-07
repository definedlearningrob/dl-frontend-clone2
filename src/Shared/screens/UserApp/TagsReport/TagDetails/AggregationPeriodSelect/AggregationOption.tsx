import { components, OptionProps } from 'react-select';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as CheckMarkIcon } from '@shared/svg/done.svg';
import { AGGREGATION_PERIOD } from '@shared/resources/enums';
import { cx } from '@shared/utils/cx';
import { AggregationBadge } from '@shared/screens/UserApp/TagsReport/TagDetails/AggregationPeriodSelect/AggregationBadge';

type BaseOptionProps = OptionProps<{ label: string; value: string }, false>;

export const AggregationOption = ({ children, ...props }: BaseOptionProps) => (
  <components.Option {...props} className='group'>
    <AggregationBadge aggregation={props.data.value as AGGREGATION_PERIOD} />
    <div className='mr-auto'>{children}</div>
    <IconContainer
      Icon={CheckMarkIcon}
      className={cx({ hidden: !props.isSelected })}
      paddingSize='none'
      size='sm'
    />
  </components.Option>
);
