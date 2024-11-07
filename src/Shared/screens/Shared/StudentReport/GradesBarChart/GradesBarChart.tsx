import { debounce } from 'lodash-es';
import { ReactNode, useCallback, useRef, useState } from 'react';
import { Bar, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BarChart } from 'recharts';

import { ChartTooltip } from '@shared/components/ChartTooltip/ChartTooltip';
import { ReactComponent as CalendarIcon } from '@shared/svg/calendar.svg';
import { formatDateTime } from '@shared/utils/date';
import { SERVICE_NAME } from '@shared/resources/enums';

export type GradesBarChartItem = {
  contextName: string;
  rubricName: string;
  scoreEarned: number;
  origin: SERVICE_NAME;
  gradedAt: string;
};

type Props = {
  chartHeight?: number;
  data: GradesBarChartItem[];
  renderTooltipContent: (data: GradesBarChartItem, index: number) => ReactNode;
};

export const GradesBarChart = ({ renderTooltipContent, data, chartHeight = 155 }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [barChartWidth, setBarChartWidth] = useState<number | null>(null);
  const debouncedSetActiveIndex = useCallback(debounce(setActiveIndex, 200), []);
  const isChartHovered = activeIndex !== null;

  const barRef = useRef<Bar>(null);

  const chartData = data.map((result) => ({
    ...result,
    tooltipIcon: CalendarIcon,
    iconClassName: 'text-font-secondary',
  }));

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
  const firstChartItem = chartData.at(0);
  const lastChartItem = chartData.at(-1);

  return (
    <>
      <div style={{ height: chartHeight }}>
        <ResponsiveContainer>
          <BarChart
            barCategoryGap={4}
            data={chartData}
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
            overflow='visible'
            width={400}
            onMouseLeave={handleResetHover}>
            <YAxis
              domain={[0, 4.4]}
              interval={0}
              scale='linear'
              stroke='#DADDE6'
              tick={{ fontSize: 12, fontWeight: 500, fill: '#5B6486' }}
              type='number'
              width={20}
            />
            <XAxis hide={true} padding={{ left: 16, right: 8 }} />
            <Bar
              // @ts-ignore
              ref={barRef}
              background={{ fill: 'transparent', radius: 2, fillOpacity: 1 }}
              dataKey='scoreEarned'
              radius={2}
              onAnimationEnd={() => {
                const width = barRef.current?.props?.width;
                width && setBarChartWidth(width);
              }}
              onMouseEnter={(_, index) => shouldDisplayTooltip && handleHover(index)}
              onMouseOut={handleResetHover}>
              {chartData.map((_, index) => {
                const isActive = !isChartHovered || activeIndex === index;

                return (
                  <Cell
                    key={index}
                    className='transition-[fill-opacity] duration-300 fill-[#0099FF]'
                    fillOpacity={isActive ? 1 : 0.16}
                  />
                );
              })}
            </Bar>
            {barChartWidth && (
              <rect
                className='stroke-neutral-200 fill-none'
                height='100%'
                rx={8}
                ry={8}
                width={barChartWidth - 8}
                x={28}
              />
            )}
            <Tooltip
              active={isChartHovered}
              content={<ChartTooltip nameKey='gradedAt' renderContent={renderTooltipContent} />}
              cursor={false}
              isAnimationActive={false}
              labelFormatter={(label) => formatDateTime(label, { dateFormat: 'MMMM D, YYYY' })}
              wrapperStyle={{ zIndex: 10 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className='mt-xs ml-[28px]'>
        <div className='h-xs border border-neutral-300 border-b-0' />
        <div className='flex justify-between leading-lg text-xxs text-font-secondary font-medium'>
          <span>{firstChartItem && formatDateTime(firstChartItem.gradedAt)}</span>
          <span>{lastChartItem && formatDateTime(lastChartItem.gradedAt)}</span>
        </div>
      </div>
    </>
  );
};
