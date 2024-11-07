import { LabelProps } from 'recharts';
import { PolarViewBox } from 'recharts/types/util/types';

import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

export const PlanProgressChartLabel = ({ viewBox, value }: LabelProps) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const { cx, cy } = viewBox as PolarViewBox;

  return (
    <g>
      <text
        dominantBaseline='middle'
        fill='#FCFCFC'
        fontSize={isFullHD ? 18 : 14}
        fontWeight={700}
        textAnchor='middle'
        x={cx}
        y={cy}>
        {value}
      </text>
    </g>
  );
};
