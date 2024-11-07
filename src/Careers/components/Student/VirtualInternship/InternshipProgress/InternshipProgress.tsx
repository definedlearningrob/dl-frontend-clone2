import { useTranslation } from 'react-i18next';

import { Diploma } from '@dc/components/Student/VirtualInternship/Diploma/Diploma';
import { LessonProgressList } from '@dc/components/Student/VirtualInternship/LessonProgressList';

import styles from './InternshipProgress.module.sass';

type Props = {
  completedLessonsCount: number;
  totalLessonsCount: number;
};

const TOTAL_STEPS = 5;

export const InternshipProgress = ({ completedLessonsCount, totalLessonsCount }: Props) => {
  const { t } = useTranslation();
  const step = Math.floor((completedLessonsCount / totalLessonsCount) * TOTAL_STEPS);

  return (
    <div className={styles.internshipProgress}>
      <h5 className={styles.title}>{t(`virtualInternship.internshipProgress.title`)}</h5>
      <LessonProgressList />
      <div className={styles.diplomaWrapper}>
        <Diploma step={step} totalSteps={TOTAL_STEPS} />
      </div>
    </div>
  );
};
