import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useTeacherDashboard } from '@pbl/graphql/user/hooks/useTeacherDashboard';

import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import styles from './TeacherDashboard.module.sass';
import { TeacherClass } from './TeacherClass/TeacherClass';
import { ClassActivity } from './ClassesActivity/ClassActivity';

export const TeacherDashboard = () => {
  const { setBackNavButton } = useNavigation();
  const { userUuid } = useParams<{ userUuid: string }>();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  const { data, loading } = useTeacherDashboard({ userUuid });

  if (loading) {
    return <SharedLoadingSpinner />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className={styles.container}>
      <TeacherClass teacherName={data.teacherDashboard.teacherName} />
      <ClassActivity />
    </div>
  );
};
