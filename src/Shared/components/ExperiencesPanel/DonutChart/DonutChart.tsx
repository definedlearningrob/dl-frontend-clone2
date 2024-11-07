import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts';
import { isNull } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { useChartContext } from '@shared/components/ExperiencesPanel/context/ChartContext';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { ChartLabel } from '../ChartLabel/ChartLabel';

import styles from './DonutChart.module.sass';

export const DonutChart = () => {
  const {
    hoveredIndex,
    setHoveredIndex,
    chartValue,
    toggleSelectedElement,
    hasActiveCell,
    selectedIndex,
    data,
    setHoverSource,
  } = useChartContext();

  const { t } = useTranslation();
  const isDesktop = useBreakpointUp({ breakpoint: 'xxl' });

  const toggledLabel = hasActiveCell
    ? t('portfolio.experiencesPanel.experiences', { count: chartValue })
    : t('portfolio.experiencesPanel.totalExperiences', { count: chartValue });

  const responsiveStrokeWidth = isDesktop ? 8 : 4;
  const strokeWidth = data.length === 1 ? 0 : responsiveStrokeWidth;

  return (
    <ResponsiveContainer height={400} width='85%'>
      <PieChart>
        <Pie
          data={data}
          dataKey='submissionsCount'
          endAngle={-270}
          innerRadius='60%'
          isAnimationActive={false}
          outerRadius='100%'
          startAngle={90}
          onMouseEnter={(_, index) => {
            setHoverSource('chart');
            setHoveredIndex(index);
          }}
          onMouseLeave={() => {
            setHoverSource(null);
            setHoveredIndex(null);
          }}>
          <Label
            content={<ChartLabel chartValue={chartValue} label={toggledLabel} />}
            position='center'
          />

          {data.map((entry, index) => {
            const isActive =
              selectedIndex === index ||
              !hasActiveCell ||
              (isNull(selectedIndex) && hoveredIndex === index);

            return (
              <Cell
                key={entry.clusterName}
                className={styles[`pieSegment-${index + 1}`]}
                fillOpacity={isActive ? 1 : 0.16}
                strokeWidth={strokeWidth}
                onClick={() => toggleSelectedElement(index)}
              />
            );
          })}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
