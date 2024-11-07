import { Bar, BarChart, LabelList, LabelProps, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { AnswerLabel } from './AnswerLabel';
import { AnswerDistributionChartLegend } from './AnswerDistributionChartLegend';

type Props = {
  data: {
    answer: string;
    baseline: number;
    mostRecent: number;
  }[];
  total: number;
};

const axisHeight = 44;

export const AnswerDistributionChart = ({ data, total }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const barSize = isFullHD ? 32 : 16;
  const barCategoryGap = isFullHD ? 24 : 16;
  const barGap = isFullHD ? 8 : 4;
  const answerHeight = 2 * barSize + barGap;
  const chartHeight = data.length * answerHeight + (data.length - 1) * barCategoryGap + axisHeight;

  // avoid division by zero, create a correct x-axis
  const safeTotal = total || 1;

  const ticks = [0, safeTotal / 4, safeTotal / 2, (safeTotal / 4) * 3, safeTotal];
  const convertToPercentage = (value: number) => `${Math.round((value / safeTotal) * 100)}%`;

  const renderLabel = ({ y = 0, height = 0, ...params }: LabelProps) => {
    const numberValue = Number(params.value);
    const shouldDisplayInside = numberValue / safeTotal >= 0.95;
    const offset = shouldDisplayInside ? -36 : params.offset;

    return (
      <text
        alignmentBaseline='central'
        dx={offset}
        fill={shouldDisplayInside ? '#FCFCFC' : '#3C4258'}
        fontSize={12}
        fontWeight={500}
        x={params.width}
        y={Number(y) + Number(height) / 2}>
        {convertToPercentage(numberValue)}
      </text>
    );
  };

  return (
    <div>
      <div className='flex gap-base xxxl:gap-md mb-sm'>
        <div className='flex flex-col justify-between items-end basis-[280px] xxxl:basis-[320px] shrink-0 grow-0 mt-[44px] mb-xs'>
          {data.map(({ answer }) => (
            <AnswerLabel key={answer} answer={answer} answerHeight={answerHeight} />
          ))}
        </div>
        <div className='flex-1' style={{ height: chartHeight }}>
          <ResponsiveContainer>
            <BarChart
              barCategoryGap={barCategoryGap}
              barGap={barGap}
              barSize={barSize}
              data={data}
              layout='vertical'
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              overflow='visible'>
              <YAxis dataKey='answer' hide={true} padding={{ top: 8 }} type='category' />
              <XAxis
                axisLine={true}
                domain={[0, total]}
                interval={0}
                orientation='top'
                stroke='#DADDE6'
                tick={{ fontSize: 12, fontWeight: 500, fill: '#5B6486' }}
                tickFormatter={convertToPercentage}
                ticks={ticks}
                type='number'
              />
              <Bar background={{ fill: '#F3F4F7' }} dataKey='baseline' fill='#737DA0'>
                <LabelList content={renderLabel} dataKey='baseline' />
              </Bar>
              <Bar background={{ fill: '#F3F4F7' }} dataKey='mostRecent' fill='#FF8000'>
                <LabelList content={renderLabel} dataKey='mostRecent' />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <AnswerDistributionChartLegend />
    </div>
  );
};
