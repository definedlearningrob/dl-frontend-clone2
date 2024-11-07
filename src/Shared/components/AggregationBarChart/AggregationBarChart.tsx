import { FC, ReactNode, SVGProps, useCallback, useRef, useState } from 'react';
import {
  Bar,
  Cell,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  YAxis,
} from 'recharts';
import { Margin } from 'recharts/types/util/types';
import { match } from 'ts-pattern';
import { findLastIndex } from 'lodash-es';
import { Dayjs } from 'dayjs';
import { debounce } from 'lodash-es';

import { cx } from '@shared/utils/cx';
import { AGGREGATION_PERIOD } from '@shared/resources/enums';

import { ChartTooltip } from '../ChartTooltip/ChartTooltip';

import { generateMonthLabels } from './helpers';

type ChartItem = {
  name: string;
  value: number;
  colorClassName: string;
  tooltipIcon?: FC<SVGProps<SVGSVGElement>>;
  iconClassName?: string;
  periodStart: Dayjs;
  periodEnd: Dayjs;
  period: number;
};

type Props = {
  height?: number;
  width?: number;
  max?: number;
  barGap?: number;
  margin?: Margin;
  aggregationPeriod: AGGREGATION_PERIOD;
  aggregationStartDate: Dayjs;
  mainColorClassName?: string;
  highlightColorClassName?: string;
  data: ChartItem[];
  renderTooltipContent: (data: ChartItem, index: number) => ReactNode;
};

const DEFAULT_MARGIN = { top: 5, left: 0, right: 0, bottom: 0 };

export const AggregationBarChart = ({
  height,
  width,
  data,
  max,
  margin = DEFAULT_MARGIN,
  renderTooltipContent,
  mainColorClassName = 'fill-primary-500',
  highlightColorClassName = 'fill-secondary-500',
  aggregationPeriod = AGGREGATION_PERIOD.MONTH,
  aggregationStartDate,
}: Props) => {
  const { barGap, expectedDataLength } = match(aggregationPeriod)
    .with(AGGREGATION_PERIOD.MONTH, () => ({
      barGap: 4,
      expectedDataLength: 12,
    }))
    .with(AGGREGATION_PERIOD.QUARTER, () => ({ barGap: 8, expectedDataLength: 4 }))
    .with(AGGREGATION_PERIOD.SEMESTER, () => ({ barGap: 12, expectedDataLength: 2 }))
    .exhaustive();

  if (data.length !== expectedDataLength) {
    throw new Error(`Expected data length to be ${expectedDataLength} but got ${data.length}`);
  }

  const [barChartSize, setBarChartSize] = useState<{ width: number; height: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const barRef = useRef<Bar>(null);
  const debouncedSetActiveIndex = useCallback(debounce(setActiveIndex, 200), []);
  const isChartHovered = activeIndex !== null;

  const handleHover = (index: number) => {
    if (isChartHovered) {
      setActiveIndex(index);
    } else {
      debouncedSetActiveIndex(index);
    }
  };

  const handleResetHover = () => {
    setActiveIndex(null);
    debouncedSetActiveIndex.cancel();
  };

  const shouldDisplayTooltip = !!renderTooltipContent;

  const labels = generateMonthLabels(aggregationStartDate, aggregationPeriod);

  const tickFormatter = useCallback((value: number) => labels[value], [aggregationPeriod]);

  // https://github.com/recharts/recharts/issues/3062*
  // CartesianGrid is the only way I found to make a border - but it's probably not possible yet
  // <CartesianGrid horizontal={false} vertical={false} />

  const lastMeaningfulDatapointIndex = findLastIndex(data, (item) => item.value > 0);

  return (
    <ResponsiveContainer>
      <RechartsBarChart
        barCategoryGap={barGap}
        data={data}
        height={height}
        margin={margin}
        width={width}
        onMouseLeave={handleResetHover}>
        <YAxis
          domain={[0, max ?? 4]}
          interval={0}
          scale='linear'
          stroke='#DADDE6'
          tick={{ fontSize: 12, fontWeight: 500, fill: '#5B6486', textAnchor: 'middle', dx: -4 }}
          type='number'
          width={20}
        />
        <XAxis
          axisLine={false}
          interval={0}
          padding={{ left: 12 }}
          stroke='#DADDE6'
          tick={{ dy: 4, fontSize: 12, fontWeight: 500, fill: '#5B6486' }}
          tickFormatter={tickFormatter}
          tickLine={false}
        />
        <Bar
          // @ts-ignore
          ref={barRef}
          background={{ fill: 'transparent', radius: 2, fillOpacity: 1 }}
          dataKey='value'
          radius={2}
          onAnimationEnd={() => {
            const width = barRef.current?.props.width;
            const height = barRef.current?.props.height;
            const hasBarSize = width && height;
            hasBarSize && setBarChartSize({ width, height });
          }}
          onMouseEnter={(_, index) => shouldDisplayTooltip && handleHover(index)}
          onMouseOut={handleResetHover}>
          {data.map((_, index) => {
            const colorClassName =
              lastMeaningfulDatapointIndex === index ? highlightColorClassName : mainColorClassName;

            const isActive = !isChartHovered || activeIndex === index;

            return (
              <Cell
                key={index}
                className={cx('transition-[fill-opacity] duration-300', colorClassName)}
                fillOpacity={isActive ? 1 : 0.16}
              />
            );
          })}
        </Bar>
        {barChartSize && (
          <rect
            className='stroke-neutral-200 fill-none'
            height={barChartSize.height + (margin.top || 0)}
            rx={8}
            ry={8}
            width={barChartSize.width - 8}
            x={28}
          />
        )}
        <Tooltip
          active={isChartHovered}
          content={<ChartTooltip renderContent={renderTooltipContent} />}
          cursor={false}
          isAnimationActive={false}
          wrapperStyle={{ zIndex: 10 }}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
