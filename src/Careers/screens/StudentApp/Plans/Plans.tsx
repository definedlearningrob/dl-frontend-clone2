import useUserInfo from '@dc/hooks/useUserInfo';
import SharedMainContent from '@dc/shared/MainContent/MainContent';

import { PortfolioPlans } from '@shared/components/PortfolioPlans';

export const Plans = () => {
  const { userInfo } = useUserInfo();

  return (
    <SharedMainContent>
      <PortfolioPlans userInfo={userInfo} />
    </SharedMainContent>
  );
};