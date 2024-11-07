import { TickProps } from 'recharts';

import { Tooltip } from '@shared/components/Tooltip';

export const CustomCategoryTick = ({ x, y, payload, height }: TickProps) => (
  <foreignObject height={height} width={payload.offset * 2} x={x - payload.offset} y={y}>
    <Tooltip delayDuration={500} message={payload.value}>
      <div className='truncate text-xxs xxxl:text-xs font-medium text-font-secondary px-xxxs'>
        {payload.value}
      </div>
    </Tooltip>
  </foreignObject>
);
