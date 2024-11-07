import { useTranslation } from 'react-i18next';

import { ReactComponent as NoProjectIcon } from '@pbl/assets/icons/empty_no-projects.svg';

import SharedCard from '@shared/components/Card/Card';
import Heading from '@shared/components/Heading/Heading';

import styles from './NoProjects.module.sass';

const NoProjects = () => {
  const { t } = useTranslation();

  return (
    <SharedCard className={styles.noProjectsCard}>
      <SharedCard.Body className={styles.body}>
        <NoProjectIcon />

        <Heading size='sm'>{t('student.dashboard.assignedProjects.noProjects')}</Heading>
      </SharedCard.Body>
    </SharedCard>
  );
};

export default NoProjects;
