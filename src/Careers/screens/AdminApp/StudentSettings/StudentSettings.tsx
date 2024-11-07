import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import StudentSettings from '@dc/components/Admin/StudentSettings/StudentSettings';
import studentQuery from '@dc/graphql/user/queries/student';
import type { TStudentData } from '@dc/graphql/user/queries/student';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function AdminAppStudent() {
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  return (
    <SharedMainContent>
      <SharedDataLoader<TStudentData>
        options={{ fetchPolicy: 'network-only', variables: { uuid: studentUuid } }}
        query={studentQuery}>
        {({ student }) => <StudentSettings student={student} />}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default AdminAppStudent;
