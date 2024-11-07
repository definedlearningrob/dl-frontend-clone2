import { Cell, Label, Pie, PieChart } from 'recharts';

import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { convertToPercentage } from '@shared/utils/convertToPercentage';

import { PlanProgressChartLabel } from './PlanProgressChartLabel';

type Props = {
  value: number;
};

export const PlanProgressChart = ({ value }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const chartSize = isFullHD ? 164 : 100;
  const chartLabel = convertToPercentage(value);
  const chartData = [
    { value, fill: '#ED7700' },
    { value: 1 - value, fill: '#FCFCFC' },
  ];

  const isInProgress = value > 0 && value < 1;

  return (
    <PieChart
      height={chartSize}
      margin={{ bottom: 0, top: 0, left: 0, right: 0 }}
      width={chartSize}>
      <Pie
        data={chartData}
        dataKey='value'
        endAngle={-270}
        innerRadius='65%'
        isAnimationActive={false}
        outerRadius='100%'
        paddingAngle={isInProgress ? 4 : 0}
        startAngle={90}
        stroke='transparent'>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
        <Label content={<PlanProgressChartLabel value={chartLabel} />} position='center' />
      </Pie>
    </PieChart>
  );
};
