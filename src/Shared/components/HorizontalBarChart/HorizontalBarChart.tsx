import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

type Props = {
  ticks?: number[];
  value: number;
  barColorClassname?: string;
  unit: string;
  animationDuration?: number;
  animationBegin?: number;
};

export const HorizontalBarChart = ({
  ticks = [0, 25, 50, 75, 100],
  value,
  unit,
  barColorClassname = 'fill-info-500',
  animationDuration = 500,
  animationBegin = 0,
}: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  return (
    <div className='w-full h-[74px] xxxl:h-[92px]'>
      <ResponsiveContainer>
        <BarChart
          data={[{ value }]}
          defaultShowTooltip={false}
          layout='vertical'
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <YAxis
            dataKey='name'
            hide={true}
            padding={{ bottom: isFullHD ? 24 : 16 }}
            type='category'
          />
          <XAxis
            axisLine={true}
            dataKey='x'
            interval='preserveStartEnd'
            padding={{ left: 1, right: 1 }}
            scale='linear'
            stroke='#DADDE6'
            tick={{ dy: 4, fontSize: 12, fontWeight: 500, fill: '#5B6486' }}
            tickSize={6}
            ticks={ticks}
            type='number'
            unit={unit}
          />
          <Bar
            animationBegin={animationBegin}
            animationDuration={animationDuration}
            background={{ fill: '#F3F4F7', radius: 2 }}
            barSize={isFullHD ? 40 : 24}
            className={barColorClassname}
            dataKey='value'
            radius={2}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
