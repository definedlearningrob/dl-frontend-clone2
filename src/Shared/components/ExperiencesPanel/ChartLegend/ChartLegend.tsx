import { useMemo } from 'react';
import { floor } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { LegendItem } from '@shared/components/ExperiencesPanel/LegendItem/LegendItem';
import { useChartContext } from '@shared/components/ExperiencesPanel/context/ChartContext';

import styles from './ChartLegend.module.sass';

export const ChartLegend = () => {
  const { selectedIndex, data, setHoveredIndex, hoveredIndex, hasActiveCell, setHoverSource } =
    useChartContext();
  const { t } = useTranslation();

  const allSubmissionsCount = useMemo(
    () => data.reduce((acc, currentValue) => acc + currentValue.submissionsCount, 0),
    [data]
  );

  return (
    <div className={styles.legendWrapper}>
      <h5>{t('portfolio.experiencesPanel.legendTitle')}</h5>
      <div className={styles.legend}>
        {data.map((dataEntry, index) => {
          const entryPercent = floor((dataEntry.submissionsCount / allSubmissionsCount) * 100, 0);
          const isOpened = selectedIndex === index;
          const isHovered = hoveredIndex === index;
          const isActive = isOpened || isHovered || !hasActiveCell;

          return (
            <LegendItem
              key={dataEntry.clusterId}
              index={index}
              isActiveElement={isActive}
              isOpened={isOpened}
              name={dataEntry.clusterName}
              percent={entryPercent}
              submissionsCount={dataEntry.submissionsCount}
              onMouseEnter={() => {
                setHoverSource('legend');
                setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                setHoverSource(null);
                setHoveredIndex(null);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
