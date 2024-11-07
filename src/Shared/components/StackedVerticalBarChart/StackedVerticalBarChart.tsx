import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, LabelList } from 'recharts';
import { FC, MouseEventHandler, ReactNode, SVGProps, useCallback, useState } from 'react';
import { debounce, times } from 'lodash-es';

import { ChartTooltip } from '@shared/components/ChartTooltip/ChartTooltip';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { CustomSumLabel } from '@shared/components/StackedVerticalBarChart/CustomSumLabel';

import { StackedVerticalCustomBar } from './StackedVerticalCustomBar';

export type StackedVerticalBarChartItem = {
  name: string;
  value: number;
  stackedValues: { id: string; value: number }[];
  colorClassName: string;
  tooltipIcon?: FC<SVGProps<SVGSVGElement>>;
  iconClassName?: string;
  tooltipClassName?: string;
  index: number;
};

type Props = {
  data: StackedVerticalBarChartItem[];
  renderTooltipContent?: (data: StackedVerticalBarChartItem) => ReactNode;
};

const SINGLE_BAR_HEIGHT = 42;
const SINGLE_BAR_HEIGHT_FULL_HD = 56;

const REST_OF_CHART_HEIGHT = 40;

export const StackedVerticalBarChart = ({ renderTooltipContent, data }: Props) => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const debouncedSetActiveIndex = useCallback(debounce(setActiveIndex, 500), []);

  const isChartHovered = activeIndex !== null;

  const handleHover = (item: MouseEventHandler) => {
    if (isChartHovered) {
      setActiveIndex(item.name);
    } else {
      debouncedSetActiveIndex(item.name);
    }
  };

  const handleResetHover = () => {
    setActiveIndex(null);
    debouncedSetActiveIndex.cancel();
  };

  const maxBarCount = Math.max(...data.map((item) => item.stackedValues.length));

  const handleOnMouseOver = (e: MouseEventHandler) => {
    setActiveIndex(e.name);
  };

  const valueMap = data.reduce((acc, curr) => {
    acc[curr.name] = curr.value;

    return acc;
  }, {} as Record<string, number>);

  const chartHeight =
    data.length * (isFullHD ? SINGLE_BAR_HEIGHT_FULL_HD : SINGLE_BAR_HEIGHT) + REST_OF_CHART_HEIGHT;

  return (
    <ResponsiveContainer height={chartHeight} minHeight={150}>
      <BarChart barCategoryGap={isFullHD ? 8 : 6} data={data} layout='vertical'>
        <YAxis
          axisLine={false}
          dataKey='name'
          style={{
            fontSize: isFullHD ? 14 : 12,
            fontWeight: 500,
            lineHeight: 1.5,
            letterSpacing: '0.12px',
            color: '#5B6486',
          }}
          tickLine={false}
          type='category'
          width={320}
        />
        <XAxis
          domain={['dataMin', 'dataMax']}
          padding={{ right: 30 }}
          stroke='#DADDE6'
          style={{
            fill: '#5B6486',
            fontSize: 12,
            fontWeight: 500,
            lineHeight: 1.5,
            letterSpacing: '0.12px',
          }}
          type='number'
        />
        {times(maxBarCount, (index) => (
          <Bar
            key={index}
            barSize={isFullHD ? 40 : 32}
            dataKey={`stackedValues.[${index}].value`}
            shape={
              <StackedVerticalCustomBar
                activeBar={activeIndex}
                index={index}
                isChartHovered={isChartHovered}
              />
            }
            stackId='stackId'
            onMouseEnter={handleHover}
            onMouseLeave={() => handleResetHover()}
            onMouseOver={handleOnMouseOver}>
            {index === maxBarCount - 1 && (
              <LabelList
                content={<CustomSumLabel valueMap={valueMap} />}
                dataKey='value'
                position='insideEnd'
              />
            )}
          </Bar>
        ))}
        <Tooltip
          active={isChartHovered}
          allowEscapeViewBox={{ x: false, y: false }}
          content={<ChartTooltip renderContent={renderTooltipContent} />}
          cursor={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
