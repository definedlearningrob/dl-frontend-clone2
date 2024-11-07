import SharedMainContent from '@dc/shared/MainContent/MainContent';
import useUserInfo from '@dc/hooks/useUserInfo';

import { type TCurrentUserInfo } from '@shared/components/Portfolio/types';
import { PortfolioPlans } from '@shared/components/PortfolioPlans';

export const StudentPlans = () => {
  const { userInfo } = useUserInfo<TCurrentUserInfo>();

  return (
    <SharedMainContent>
      <PortfolioPlans userInfo={userInfo} />
    </SharedMainContent>
  );
};
