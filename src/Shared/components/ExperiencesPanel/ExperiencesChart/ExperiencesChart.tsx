import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import useCareerExperiences from '@shared/graphql/shared/hooks/useCareerExperiences';

import { DonutChart } from '../DonutChart/DonutChart';

import styles from './ExperiencesChart.module.sass';

export const ExperiencesChart = () => {
  const { uuid } = useParams<{ uuid?: string }>();
  const { t } = useTranslation();
  const { studentName } = useCareerExperiences(uuid);

  return (
    <div className={styles.container}>
      <div className={styles.headContainer}>
        <h5 className={styles.title}>{t('portfolio.experiencesPanel.chartTitle')}</h5>
        {studentName && (
          <p className={styles.studentInfo}>
            {t('portfolio.experiencesPanel.youAreViewing')}{' '}
            <span className={styles.studentName}>{studentName}</span>
          </p>
        )}
        <p className={styles.text}>{t('portfolio.experiencesPanel.chartText')}</p>
      </div>
      <div className={styles.chartContainer}>
        <DonutChart />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <SharedIcon className={styles.icon} icon={<InfoIcon />} size='sm' />
          <p className={styles.footerText}>{t('portfolio.experiencesPanel.chartInfoText')}</p>
        </div>
      </div>
    </div>
  );
};
