import SharedMainContent from '@pbl/shared/MainContent/MainContent';
import useUserInfo from '@pbl/hooks/useUserInfo';

import { PortfolioPlans } from '@shared/components/PortfolioPlans';

export const StudentPlans = () => {
  const { userInfo } = useUserInfo();

  return (
    <SharedMainContent>
      <PortfolioPlans userInfo={userInfo} />
    </SharedMainContent>
  );
};
