import { useTranslation } from 'react-i18next';

import { InteractiveDiploma } from '@shared/components/InteractiveDiploma';
import { ProgressBarWithSteps } from '@shared/components/ProgressBarWithSteps';

import styles from './Diploma.module.sass';

type Props = { step: number; totalSteps: number };

export const Diploma = ({ step, totalSteps }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.diploma}>
      <InteractiveDiploma className={styles.imagesWrapper} step={step} />
      <h5 className={styles.heading}>{t(`virtualInternship.diploma.title`)}</h5>
      <p className={styles.description}>
        {t(`virtualInternship.diploma.descriptions.step${step}`)}
      </p>
      <div className={styles.progressBarWrapper}>
        <ProgressBarWithSteps currentStep={step} totalSteps={totalSteps} />
      </div>
    </div>
  );
};
