import { useTranslation } from 'react-i18next';

import Heading from '@shared/components/Heading/Heading';

import GradingSidebarList from '../GradingSchoolClassList';

import styles from './GradingSidebar.module.sass';

const GradingSidebar = () => {
  const { t } = useTranslation();

  return (
    <aside className={styles.container}>
      <Heading size='sm'>{t('user.grading.sidebar.header')}</Heading>
      <GradingSidebarList />
    </aside>
  );
};

export default GradingSidebar;
