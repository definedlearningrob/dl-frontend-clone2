import { debounce } from 'lodash-es';
import { FC, ReactNode, SVGProps, useCallback, useState } from 'react';
import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from 'recharts';

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
  data: ChartItem[];
  isResponsive?: boolean;
  width?: number;
  height?: number;
  strokeColor?: string;
  renderTooltipContent?: (data: ChartItem) => ReactNode;
} & (
  | { isResponsive: true; width?: never; height?: never }
  | { isResponsive?: false; width: number; height: number }
);

export const PieChart = ({
  width,
  height,
  data,
  isResponsive,
  renderTooltipContent,
  strokeColor = '#FCFCFC',
}: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const debouncedSetActiveIndex = useCallback(debounce(setActiveIndex, 500), []);

  const isChartHovered = activeIndex !== null;
  const shouldDisplayTooltip = !!renderTooltipContent;
  const nonEmptyEntries = data.filter((entry) => entry.value > 0);
  const strokeWidth = nonEmptyEntries.length === 1 ? 0 : 2;

  const onHover = (index: number) => {
    if (isChartHovered) {
      setActiveIndex(index);
    } else {
      debouncedSetActiveIndex(index);
    }
  };

  const onResetHover = () => {
    setActiveIndex(null);
    debouncedSetActiveIndex.cancel();
  };

  const pieChartComponent = (
    <RechartsPieChart
      height={height}
      margin={{ bottom: 0, top: 0, left: 0, right: 0 }}
      width={width}>
      <Pie
        data={data}
        dataKey='value'
        endAngle={-270}
        innerRadius='50%'
        isAnimationActive={false}
        outerRadius='100%'
        startAngle={90}
        onMouseEnter={(_, index) => shouldDisplayTooltip && onHover(index)}
        onMouseLeave={onResetHover}>
        {data.map((entry, index) => {
          const isActive = !isChartHovered || activeIndex === index;

          return (
            <Cell
              key={entry.name}
              className={cx(
                'transition-[fill-opacity] duration-300 outline-none',
                entry.colorClassName
              )}
              fillOpacity={isActive ? 1 : 0.16}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          );
        })}
      </Pie>
      <Tooltip
        active={isChartHovered}
        allowEscapeViewBox={{ x: true, y: true }}
        content={<ChartTooltip renderContent={renderTooltipContent} />}
      />
    </RechartsPieChart>
  );

  if (isResponsive) {
    return <ResponsiveContainer>{pieChartComponent}</ResponsiveContainer>;
  }

  return pieChartComponent;
};
