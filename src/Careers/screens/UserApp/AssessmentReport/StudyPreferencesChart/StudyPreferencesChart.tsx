import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useMemo, useState } from 'react';
import { isEmpty, orderBy } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import {
  HighSchoolStudyPreferences,
  MiddleSchoolStudyPreferences,
} from '@dc/graphql/user/queries/reportsAssessmentReport';

import { cx } from '@shared/utils/cx';
import { omitTypename } from '@shared/utils/omitTypename';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { convertToPercentage } from '@shared/utils/convertToPercentage';

import { StudyPreferencesBar } from './StudyPreferencesBar';

type Props = {
  title: string;
  description: string;
  data: HighSchoolStudyPreferences | MiddleSchoolStudyPreferences | undefined;
  isHighSchool: boolean;
};

const ticks = [0, 0.25, 0.5, 0.75, 1];
const middleSchoolColors = ['#663300', '#994D00', '#CC6600', '#FF8000', '#FF9933'];
const highSchoolColors = [
  '#003D66',
  '#005C99',
  '#007BCC',
  '#0099FF',
  '#33AEFF',
  '#66C2FF',
  '#99D6FF',
];

export const StudyPreferencesChart = ({ title, description, data, isHighSchool }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const [activeBars, setActiveBars] = useState<{
    area?: string;
    dataKey?: string;
  }>({});

  if (!data || isEmpty(data)) {
    return null;
  }

  const chartData = useMemo(
    () =>
      orderBy(data, 'results.position1', 'desc').map(({ area, results }) => ({
        area,
        ...results,
      })),
    [data]
  );

  const chartColors = isHighSchool ? highSchoolColors : middleSchoolColors;
  const dataKeys = Object.keys(omitTypename(data[0].results));
  const tickFormat = { fontSize: isFullHD ? 14 : 12, fontWeight: 500, fill: '#5B6486' };

  const handleCategoryHover = ({ value }: { value: string }) => {
    setActiveBars({ area: value });
  };

  const handleRankHover = (dataKey: string) => {
    setActiveBars({ dataKey });
  };

  const handleCellHover = (area: string, dataKey: string) => {
    setActiveBars({ area, dataKey });
  };

  const resetActiveBars = () => {
    setActiveBars({});
  };

  return (
    <div className='col-span-2 text-center'>
      <h6 className='text-xs xxxl:text-sm mb-xs'>{title}</h6>
      <p className='text-xxs xxxl:text-xs italic leading-lg xxxl:mb-base'>{description}</p>
      <div
        className={cx('mb-sm xxxl:mb-base', {
          'h-[367px] xxxl:h-[511px]': isHighSchool,
          'h-[271px] xxxl:h-[475px]': !isHighSchool,
        })}>
        <ResponsiveContainer>
          <BarChart
            barCategoryGap={isFullHD ? 6 : 4}
            data={chartData}
            layout='vertical'
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            overflow='visible'
            stackOffset='expand'>
            <YAxis
              axisLine={false}
              dataKey='area'
              dx={isFullHD ? -24 : -16}
              padding={{ top: isFullHD ? 16 : 8 }}
              tick={tickFormat}
              tickLine={false}
              type='category'
              width={isFullHD ? 148 : 108}
              //@ts-expect-error recharts types for onMouseEnter params are incorrect
              onMouseEnter={handleCategoryHover}
              onMouseLeave={resetActiveBars}
            />
            <XAxis
              axisLine={true}
              domain={[0, 1]}
              interval={0}
              orientation='top'
              stroke='#DADDE6'
              tick={tickFormat}
              tickFormatter={convertToPercentage}
              ticks={ticks}
              type='number'
            />
            {dataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={chartColors[index]}
                shape={<StudyPreferencesBar activeBars={activeBars} />}
                stackId='1'
                style={{
                  stroke: '#fff',
                  strokeWidth: 2,
                }}
                onMouseEnter={({ area }) => handleCellHover(area, key)}
                onMouseLeave={resetActiveBars}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className='flex gap-sm ml-[108px] xxxl:ml-[148px]'>
        {dataKeys.map((key, index) => (
          <div
            key={key}
            className='px-xs xxxl:px-sm py-xxs xxxl:py-xs border border-neutral-200 rounded-xs flex items-center gap-xs cursor-default'
            onMouseEnter={() => handleRankHover(key)}
            onMouseLeave={resetActiveBars}>
            <div className='w-sm h-sm rounded-xs' style={{ backgroundColor: chartColors[index] }} />
            <span className='text-xxs xxxl:text-xs font-medium text-font-secondary'>
              {t('assessmentReport.studyPreferencesLegend.rank', {
                count: index + 1,
                ordinal: true,
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
