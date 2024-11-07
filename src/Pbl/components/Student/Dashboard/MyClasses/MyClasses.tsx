import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import MY_CLASSES, { TStudentMyClassesData } from '@pbl/graphql/student/queries/myClasses';

import SharedCard from '@shared/components/Card/Card';
import DataSuspense from '@shared/components/DataSuspense/DataSuspense';

import MyClassesItem from './Item/MyClassesItem';
import styles from './MyClasses.module.sass';

const StudentDashboardMyClasses = () => {
  const { data, loading, error } = useQuery<TStudentMyClassesData>(MY_CLASSES);
  const { t } = useTranslation();

  const renderClasses = () =>
    data?.myClasses.map((classItem) => (
      <MyClassesItem key={classItem.uuid} schoolClass={classItem} />
    ));

  return (
    <SharedCard className={styles.wrapper}>
      <SharedCard.Header className={styles.header}>
        <SharedCard.Title size='small'>{t('student.dashboard.myClasses.label')}</SharedCard.Title>
      </SharedCard.Header>
      <DataSuspense error={error} loading={loading}>
        <ul className={styles.list}>{renderClasses()}</ul>
      </DataSuspense>
    </SharedCard>
  );
};

export default StudentDashboardMyClasses;
