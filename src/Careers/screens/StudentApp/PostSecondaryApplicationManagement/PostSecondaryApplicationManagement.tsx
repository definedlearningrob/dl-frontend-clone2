import { Redirect } from 'react-router-dom';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { ApplicationsManagement } from '@dc/components/Student/ApplicationsManagement';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';

export const PostSecondaryApplicationManagement = () => {
  const { userInfo } = useUserInfo<TStudentInfo>();
  const applicationsEnabled = userInfo.postSecondaryApplicationsEnabled;

  if (!applicationsEnabled) return <Redirect to='/' />;

  return (
    <SharedMainContent>
      <ApplicationsManagement />
    </SharedMainContent>
  );
};
