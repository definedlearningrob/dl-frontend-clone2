import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import { ReactComponent as ChevronUpIcon } from '@shared/svg/chevron_up.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import { useChartContext } from '@shared/components/ExperiencesPanel/context/ChartContext';
import { SubmissionItem } from '@shared/components/ExperiencesPanel/SubmissionItem/SubmissionItem';
import LoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

import styles from './LegendItem.module.sass';

type Props = {
  isOpened: boolean;
  name: string;
  submissionsCount: number;
  percent: number;
  isActiveElement: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  index: number;
};

export const LegendItem = ({
  isOpened,
  name,
  submissionsCount,
  percent,
  isActiveElement,
  onMouseEnter,
  onMouseLeave,
  index,
}: Props) => {
  const { t } = useTranslation();
  const legendItemRef = useRef<null | HTMLDivElement>(null);
  const {
    hoverSource,
    hoveredIndex,
    toggleSelectedElement,
    singleExperienceData,
    experienceLoading,
  } = useChartContext();
  const colorIndex = index + 1;

  useEffect(() => {
    if (legendItemRef.current && index === hoveredIndex && hoverSource === 'chart') {
      legendItemRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [hoveredIndex]);

  const wrapperClassname = cx(styles.legendItem, styles[`item-${colorIndex}`], {
    [styles.isInactive]: !isActiveElement,
  });
  const headerClassname = cx(styles.header, { [styles.opened]: isOpened });
  const submissionListClassname = cx(styles.submissionList, {
    [styles.submissionsOpened]: isOpened,
  });

  const ChevronIcon = isOpened ? ChevronUpIcon : ChevronDownIcon;

  return (
    <div
      ref={legendItemRef}
      className={wrapperClassname}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <div className={headerClassname} onClick={() => toggleSelectedElement(index)}>
        <div className={styles.itemContent}>
          <p className={styles.title}>{name}</p>
          <p className={styles.details}>
            <span>
              {t('portfolio.experiencesPanel.experiences_other')}:
              <span className={styles.detailValue}> {submissionsCount}</span>
            </span>
            <span className={styles.dotSeparator} />
            <span>
              {t('portfolio.experiencesPanel.percent')}:
              <span className={styles.detailValue}> {percent}%</span>
            </span>
          </p>
        </div>
        <div>
          <SharedIcon className={styles.icon} icon={<ChevronIcon />} size='sm' />
        </div>
      </div>
      <div className={submissionListClassname}>
        {experienceLoading && (
          <div className={styles.loaderWrapper}>
            <LoadingSpinner color='primary' size='small' />
          </div>
        )}
        {singleExperienceData?.submissions.map((submission, index) => (
          <SubmissionItem key={`${submission.submissionName}-${index}`} submission={submission} />
        ))}
      </div>
    </div>
  );
};
