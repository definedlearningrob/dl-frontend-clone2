import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import Card from '@dc/components/Student/Lesson/shared/Card/Card';
import notificationEmptyImage from '@dc/images/onboarding_bypass.png';

import SharedButton from '@shared/components/Button/Button';

import styles from './NoCoursesPlaceholder.module.sass';

export const NoCoursesPlaceholder = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const goToCourses = () => history.push('/courses');

  return (
    <Card>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <h2 className={styles.header}>{t('dashboard.noCoursesPlaceholder.header')}</h2>
          <span className={styles.description}>{t('dashboard.noCoursesPlaceholder.text')}</span>
          <SharedButton variant='primary' onClick={goToCourses}>
            {t('dashboard.noCoursesPlaceholder.buttonText')}
          </SharedButton>
        </div>
        <img className={styles.image} src={notificationEmptyImage} />
      </div>
    </Card>
  );
};
