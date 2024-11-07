import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { VirtualInternshipLesson as VirtualInternshipLessonContent } from '@dc/components/Student/VirtualInternshipLesson';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';

export const VirtualInternshipLesson = () => {
  const { setBackNavButton } = useNavigation();
  const { userInfo } = useUserInfo<TStudentInfo>();
  const { opportunityId } = useParams<{ opportunityId: string }>();
  const history = useHistory();
  const OPPORTUNITIES_ON = userInfo.hasOpportunitiesEnabled;

  useEffect(() => {
    setBackNavButton(true, `/opportunities/${opportunityId}/virtual-internship`);

    return () => setBackNavButton(false);
  }, []);

  if (!OPPORTUNITIES_ON) {
    history.replace('/');
  }

  return (
    <SharedMainContent>
      <VirtualInternshipLessonContent />
    </SharedMainContent>
  );
};
