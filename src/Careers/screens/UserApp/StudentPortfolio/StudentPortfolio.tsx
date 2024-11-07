import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import useUserInfo from '@dc/hooks/useUserInfo';

import PortfolioProvider from '@shared/components/Portfolio/helpers/usePortfolioContext';
import useStudentPortfolioResumesQuery from '@shared/graphql/user/hooks/useStudentPortfolioResumesQuery';
import { type TCurrentUserInfo } from '@shared/components/Portfolio/types';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { PortfolioContentWrapper } from '@shared/components/Portfolio/PortfolioContentWrapper/PortfolioContentWrapper';

export const StudentPortfolio = () => {
  const { id } = useParams<{ id: string }>();
  const { setBackNavButton } = useNavigation();
  const { userInfo } = useUserInfo<TCurrentUserInfo>();
  const { data: resumesData } = useStudentPortfolioResumesQuery(id);

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  if (!resumesData) {
    return null;
  }

  const { student } = resumesData;

  const studentInfo = {
    email: student.email,
    firstName: student.firstName,
    lastName: student.lastName,
    username: student.username,
    uuid: student.uuid,
  };

  return (
    <SharedMainContent className='!pt-0'>
      <PortfolioProvider studentId={id} studentInfo={studentInfo} userInfo={userInfo}>
        <PortfolioContentWrapper portfolio={student.portfolio} />
      </PortfolioProvider>
    </SharedMainContent>
  );
};
