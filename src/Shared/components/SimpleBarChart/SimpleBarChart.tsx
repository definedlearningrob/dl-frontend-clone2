import { debounce } from 'lodash-es';
import { FC, ReactNode, SVGProps, useCallback, useState } from 'react';
import {
  Bar,
  Cell,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  XAxisProps,
  YAxis,
  YAxisProps,
} from 'recharts';
import { Margin } from 'recharts/types/util/types';

import { cx } from '@shared/utils/cx';
import { ChartTooltip } from '@shared/components/ChartTooltip/ChartTooltip';

type ChartItem = {
  name: string;
  value: number;
  colorClassName: string;
  tooltipIcon?: FC<SVGProps<SVGSVGElement>>;
  iconClassName?: string;
};

type Props = {
  height?: number;
  width?: number;
  max?: number;
  barGap?: number;
  isResponsive?: boolean;
  margin?: Margin;
  data: ChartItem[];
  renderTooltipContent?: (data: ChartItem) => ReactNode;
  yAxisProps?: YAxisProps;
  xAxisProps?: XAxisProps;
  isAnimationActive?: boolean;
} & (
  | { isResponsive: true; width?: never; height?: never }
  | { isResponsive?: false; width: number; height: number }
);

const DEFAULT_MARGIN = { top: 0, left: 0, right: 0, bottom: 0 };

export const SimpleBarChart = ({
  height,
  width,
  isResponsive,
  data,
  max,
  margin = DEFAULT_MARGIN,
  barGap = 4,
  yAxisProps,
  xAxisProps,
  isAnimationActive = false,
  renderTooltipContent,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const debouncedSetActiveIndex = useCallback(debounce(setActiveIndex, 500), []);

  const isChartHovered = activeIndex !== null;
  const shouldDisplayTooltip = !!renderTooltipContent;

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

  const barChartComponent = (
    <RechartsBarChart
      barCategoryGap={barGap}
      data={data}
      height={height}
      margin={margin}
      width={width}>
      <YAxis domain={[0, max ?? 'dataMax']} {...yAxisProps} />
      <XAxis dataKey='name' {...xAxisProps} />
      <Bar
        background={{ fill: '#F3F4F7', radius: 2, fillOpacity: 1 }}
        dataKey='value'
        isAnimationActive={isAnimationActive}
        radius={2}
        onMouseEnter={(_, index) => shouldDisplayTooltip && handleHover(index)}
        onMouseLeave={handleResetHover}>
        {data.map((entry, index) => {
          const isActive = !isChartHovered || activeIndex === index;

          return (
            <Cell
              key={entry.name}
              className={cx('transition-[fill-opacity] duration-300', entry.colorClassName)}
              fillOpacity={isActive ? 1 : 0.16}
            />
          );
        })}
      </Bar>
      <Tooltip
        active={isChartHovered}
        allowEscapeViewBox={{ x: true, y: true }}
        content={<ChartTooltip renderContent={renderTooltipContent} />}
        cursor={false}
      />
    </RechartsBarChart>
  );

  if (isResponsive) {
    return <ResponsiveContainer>{barChartComponent}</ResponsiveContainer>;
  }

  return barChartComponent;
};
