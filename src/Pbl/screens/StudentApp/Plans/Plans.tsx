import useUserInfo from '@pbl/hooks/useUserInfo';
import SharedMainContent from '@pbl/shared/MainContent/MainContent';

import { PortfolioPlans } from '@shared/components/PortfolioPlans';

export const Plans = () => {
  const { userInfo } = useUserInfo();

  return (
    <SharedMainContent>
      <PortfolioPlans userInfo={userInfo} />
    </SharedMainContent>
  );
};
