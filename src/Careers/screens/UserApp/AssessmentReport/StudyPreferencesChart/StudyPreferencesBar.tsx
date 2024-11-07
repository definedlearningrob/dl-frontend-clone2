import { every, isEmpty, omitBy } from 'lodash-es';
import { Rectangle } from 'recharts';
import { BarRectangleItem } from 'recharts/types/cartesian/Bar';

import { Tooltip } from '@shared/components/Tooltip';

type FilterKey = 'area' | 'dataKey';
type Props = BarRectangleItem & {
  activeBars: { area?: string; dataKey?: string };
  value?: [number, number];
  area?: string;
  dataKey?: string;
};

const tooltipOffest = 16;

export const StudyPreferencesBar = ({ activeBars, ...barProps }: Props) => {
  const { x, y = 0, width, height } = barProps;
  const filters = omitBy(activeBars, isEmpty);

  const hasHoveredElement = !isEmpty(filters);
  const isActive =
    hasHoveredElement && every(filters, (value, key) => barProps[key as FilterKey] === value);

  const [startValue, endValue] = barProps.value!;

  const percentageValue = (endValue - startValue) * 100;

  return (
    <>
      <Rectangle
        {...barProps}
        className='transition-opacity'
        opacity={!hasHoveredElement || isActive ? 1 : 0.16}
        overflow='visible'
      />
      <foreignObject height={height} overflow='visible' width={width} x={x} y={y + tooltipOffest}>
        <Tooltip
          children={null}
          message={`${percentageValue.toFixed()}%`}
          open={isActive && percentageValue > 0}
        />
      </foreignObject>
    </>
  );
};
