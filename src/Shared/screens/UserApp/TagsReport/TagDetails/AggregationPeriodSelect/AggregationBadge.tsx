import { useTranslation } from 'react-i18next';

import { cx } from '@shared/utils/cx';
import { AGGREGATION_PERIOD } from '@shared/resources/enums';

type Props = {
  aggregation: AGGREGATION_PERIOD;
};

export const AggregationBadge = ({ aggregation }: Props) => {
  const { t } = useTranslation();

  return (
    <div
      className={cx(
        'flex justify-center items-center w-md h-base',
        'text-font-primary font-medium leading-lg',
        'rounded-sm !text-xxs bg-neutral-200 group-hover:!bg-white'
      )}>
      {t(`reports.aggregationPeriodShort.${aggregation}`)}
    </div>
  );
};
