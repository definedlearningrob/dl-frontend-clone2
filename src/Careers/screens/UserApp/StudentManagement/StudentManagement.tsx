import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { StudentFiltersProvider } from '@dc/components/StudentManagement/StudentFilters/StudentFiltersProvider';
import { StudentManagementContent } from '@dc/components/StudentManagement/StudentManagementContent';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import SharedCard from '@shared/components/Card/Card';
import { useUserRole } from '@shared/graphql/user/hooks/useUserRole';

export const StudentManagement = () => {
  const { setBackNavButton } = useNavigation();
  const { userInfo } = useUserInfo<TUserInfo>();
  const { isEntityAdmin, isSystemAdmin } = useUserRole();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  const hasAccessToStudentManagement =
    isEntityAdmin || isSystemAdmin || userInfo.permissions.counselor;

  if (!hasAccessToStudentManagement) {
    return <Redirect to='/' />;
  }

  return (
    <SharedMainContent className='h-[theme(layout.containerHeight)]'>
      <SharedCard className='flex flex-col h-full' withoutPadding={true}>
        <StudentFiltersProvider>
          <StudentManagementContent />
        </StudentFiltersProvider>
      </SharedCard>
    </SharedMainContent>
  );
};
