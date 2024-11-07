import { Rectangle } from 'recharts';
import { BarRectangleItem } from 'recharts/types/cartesian/Bar';

import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { colorMap } from '@shared/components/StackedVerticalBarChart/helpers';

type Props = BarRectangleItem & {
  activeBar: string | null;
  index: number;
  isChartHovered: boolean;
  payload?: { index: number };
  value?: number[];
  dataKey?: string;
};

const MINIMAL_BAR_WIDTH = 24;

export const StackedVerticalCustomBar = ({
  activeBar,
  index,
  isChartHovered,
  ...barProps
}: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const { x, y = 0, width, height, name, payload } = barProps;

  if (width === 0) return null;

  const isCurrentBarActive = name === activeBar;

  const chartSymbol = String.fromCharCode(97 + index).toUpperCase();

  const calculatedY = isFullHD ? y + 12 : y + 8;

  const shouldDisplaySymbol = Number(barProps.width) > MINIMAL_BAR_WIDTH;

  return (
    <>
      <Rectangle
        {...barProps}
        className='transition-opacity'
        fill={colorMap[payload!.index]}
        opacity={!isChartHovered || isCurrentBarActive ? 1 : 0.16}
        style={{
          stroke: '#fff',
          strokeWidth: isCurrentBarActive ? 2 : 0,
        }}
      />
      {isCurrentBarActive && shouldDisplaySymbol && (
        <foreignObject height={height} overflow='visible' width={width} x={x} y={calculatedY}>
          <div className='text-xxs w-sm h-sm bg-neutral-200 mx-auto flex justify-center leading-lg items-center rounded-xs'>
            {chartSymbol}
          </div>
        </foreignObject>
      )}
    </>
  );
};
