import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { SVGProps, FC, useCallback, useMemo, useState, ReactNode } from 'react';
import { debounce, isEmpty, orderBy } from 'lodash-es';

import { cx } from '@shared/utils/cx';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { colorMap } from '@shared/components/StackedVerticalBarChart/helpers';
import { ChartTooltip } from '@shared/components/ChartTooltip/ChartTooltip';

import { EmptyOpportunityTypesChart } from './EmptyOpportunityTypesChart';

type ChartItem = {
  name: string;
  value: number;
  tooltipIcon?: FC<SVGProps<SVGSVGElement>>;
  iconClassName?: string;
};

type Props = {
  title: string;
  description: string;
  data: ChartItem[];
  renderTooltipContent?: (data: ChartItem) => ReactNode;
};

export const OpportunityReportTypesChart = ({
  title,
  description,
  data,
  renderTooltipContent,
}: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const debouncedSetActiveIndex = useCallback(debounce(setActiveIndex, 50), []);
  const chartData = useMemo(() => orderBy(data, 'value', 'desc'), [data]);

  if (!data || isEmpty(data)) {
    return <EmptyOpportunityTypesChart description={description} title={title} />;
  }

  const tickFormat = { fontSize: isFullHD ? 14 : 12, fontWeight: 500, fill: '#5B6486' };

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

  const barSize = isFullHD ? 36 : 30;
  const barGap = isFullHD ? 22 : 12;

  return (
    <div className='col-span-2 text-center border border-neutral-300 rounded-sm p-base xxxl:p-md'>
      <h6 className='text-xs xxxl:text-sm mb-xs'>{title}</h6>
      <p className='text-xxs xxxl:text-xs italic leading-lg xxxl:mb-base'>{description}</p>
      <ResponsiveContainer height={data.length * (barSize + barGap)}>
        <BarChart
          data={chartData}
          layout='vertical'
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          overflow='visibe'
          stackOffset='expand'>
          <YAxis
            axisLine={false}
            dataKey='name'
            padding={{ top: isFullHD ? 16 : 8 }}
            tick={tickFormat}
            tickLine={false}
            type='category'
            width={isFullHD ? 170 : 155}
          />
          <XAxis orientation='top' stroke='#DADDE6' tick={tickFormat} type='number' />
          <Bar
            barSize={barSize}
            className={cx('transition-opacity duration-300')}
            dataKey='value'
            style={{
              stroke: '#fff',
              strokeWidth: 2,
            }}
            onMouseEnter={(_, index) => shouldDisplayTooltip && handleHover(index)}
            onMouseLeave={handleResetHover}>
            {data.map((entry, index) => {
              const isActive = !isChartHovered || activeIndex === index;

              return (
                <Cell
                  key={entry.name}
                  className='transition-[fill-opacity] duration-300'
                  fill={colorMap[index]}
                  fillOpacity={isActive ? 1 : 0.16}
                />
              );
            })}
          </Bar>
          <Tooltip
            active={isChartHovered}
            allowEscapeViewBox={{ x: false, y: false }}
            content={<ChartTooltip renderContent={renderTooltipContent} />}
            cursor={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
