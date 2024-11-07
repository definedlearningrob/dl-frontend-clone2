import { useTranslation } from 'react-i18next';

import SharedButton from '@shared/components/Button/Button';

import { useGradingContext } from '../GradingContext/GradingContext';

import styles from './GradingFooter.module.sass';

const GradingContentFooter = () => {
  const {
    navigation: { hasNextStudent, hasPreviousStudent, goToStudent },
  } = useGradingContext();
  const { t } = useTranslation();

  const handleStudentNavigation = (type: 'next' | 'previous') => () => {
    goToStudent(type);
  };

  return (
    <footer className={styles.footer}>
      <SharedButton
        disabled={!hasPreviousStudent}
        size='sm'
        variant='primary-outlined'
        onClick={handleStudentNavigation('previous')}>
        {t('user.grading.previousStudent')}
      </SharedButton>
      <SharedButton
        disabled={!hasNextStudent}
        size='sm'
        variant='primary-outlined'
        onClick={handleStudentNavigation('next')}>
        {t('user.grading.nextStudent')}
      </SharedButton>
    </footer>
  );
};

export default GradingContentFooter;
