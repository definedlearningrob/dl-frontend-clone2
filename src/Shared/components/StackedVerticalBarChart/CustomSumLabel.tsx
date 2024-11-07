import { BarRectangleItem } from 'recharts/types/cartesian/Bar';

import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

type Props = BarRectangleItem & {
  valueMap: Record<string, number>;
};

export const CustomSumLabel = (props: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const { x = 0, y = 0, width = 0, valueMap, name } = props;

  if (!name) return null;

  const yPosition = y + (isFullHD ? 12 : 6);

  return (
    <g>
      <text
        dominantBaseline='middle'
        dx={4}
        dy={3}
        fontSize={12}
        fontWeight={500}
        textAnchor='start'
        x={x + width}
        y={yPosition + 6}>
        {valueMap[name]}
      </text>
    </g>
  );
};
