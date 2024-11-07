import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useSchoolClass } from '@pbl/graphql/user/hooks/useSchoolClass';

import useClearCacheKey from '@shared/hooks/useClearCacheKey';
import DataSuspense from '@shared/components/DataSuspense/DataSuspense';
import Card from '@shared/components/Card/Card';

import { StudentCard } from './StudentCard/StudentCard';
import styles from './SchoolClass.module.sass';

const UserSchoolClass = () => {
  const { classId } = useParams<{ classId: string }>();
  const { data, loading, error } = useSchoolClass({ uuid: classId });

  const { clearCache } = useClearCacheKey();

  useEffect(() => {
    clearCache('SchoolClass');
    clearCache('schoolClass');
  }, []);

  if (!data) {
    return null;
  }

  return (
    <DataSuspense error={error} loading={loading}>
      <Card className='row-span-2 flex flex-col h-full !pr-0'>
        <h6 className='font-bold text-xs xxxl:text-base mb-base'>
          {data.schoolClass.name}
          <span className='text-neutral-600'> ({data.schoolClass.students.nodesCount})</span>
        </h6>
        <div className={styles.studentsGrid}>
          {data.schoolClass.students.nodes.map((student) => (
            <StudentCard key={student.uuid} student={student} />
          ))}
        </div>
      </Card>
    </DataSuspense>
  );
};

export default UserSchoolClass;
