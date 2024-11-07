import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';
import cx from 'classnames';

import SkeletonRectangle from '@shared/components/Skeleton/Rectangle/Rectangle';

const CHART_SIZE = 44;
const BAR_SIZE = 4;
const BACKGROUND_RADIUS = CHART_SIZE / 2 - BAR_SIZE;
const LABEL_OFFSET = 2;

type Props = {
  value: number | undefined;
  total?: number;
  isLoading?: boolean;
};

export const CircleStatusIndicator = ({ value = 0, total, isLoading }: Props) => {
  if (isLoading) {
    return (
      <SkeletonRectangle className={`!w-[${CHART_SIZE}px] !h-[${CHART_SIZE}px] rounded-full`} />
    );
  }

  const isPercentageValue = total === undefined;
  const percentageValue = isPercentageValue || total === 0 ? value : (value / total) * 100;

  const isNotStarted = percentageValue === 0;
  const isInProgress = percentageValue > 0 && percentageValue < 100;
  const isCompleted = percentageValue === 100;

  const backgroundClasses = cx({
    'fill-success-100': isCompleted,
    'fill-secondary-200': isInProgress,
    'fill-neutral-200': isNotStarted,
  });
  const barClasses = cx({
    'fill-success-500': isCompleted,
    'fill-secondary-500': isInProgress,
    'fill-neutral-400': isNotStarted,
  });
  const textClasses = cx('text-xxs font-medium', {
    'fill-success-500': isCompleted,
    'fill-secondary-500': isInProgress,
    'fill-font-secondary': isNotStarted,
  });

  return (
    <RadialBarChart
      barSize={BAR_SIZE}
      data={[{ name: 'progress', value: percentageValue }]}
      endAngle={-270}
      height={CHART_SIZE}
      innerRadius='95%'
      margin={{ top: 0, left: 0, bottom: 0, right: 0 }}
      outerRadius='120%'
      startAngle={90}
      width={CHART_SIZE}>
      <PolarAngleAxis angleAxisId={0} domain={[0, 100]} tick={false} type='number' />
      <circle
        className={backgroundClasses}
        cx={CHART_SIZE / 2}
        cy={CHART_SIZE / 2}
        r={BACKGROUND_RADIUS}
      />
      <RadialBar
        background={{
          fill: '#B0B5C9',
          fillOpacity: percentageValue === 0 ? 1 : 0,
        }}
        className={barClasses}
        cornerRadius={CHART_SIZE / 2}
        dataKey='value'
      />
      <text
        className={textClasses}
        dominantBaseline='middle'
        textAnchor='middle'
        x={CHART_SIZE / 2}
        y={CHART_SIZE / 2 + LABEL_OFFSET}>
        {isPercentageValue ? `${value}%` : `${value}/${total}`}
      </text>
    </RadialBarChart>
  );
};
