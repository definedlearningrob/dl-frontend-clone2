import { Route, Switch } from 'react-router-dom';

import { Portfolio } from '@pbl/screens/StudentApp/Portfolio/Portfolio';
import { EditPortfolioScreen } from '@pbl/screens/StudentApp/Portfolio/EditPortfolioScreen';
import useUserInfo from '@pbl/hooks/useUserInfo';

import { TCurrentUserInfo } from '@shared/components/Portfolio/types';
import PortfolioProvider from '@shared/components/Portfolio/helpers/usePortfolioContext';
import { StudentPublicPortfolio } from '@shared/components/PublicPortfolio/StudentPublicPortfolio';

export const PortfolioRoutes = () => {
  const { userInfo } = useUserInfo<TCurrentUserInfo>();

  const studentInfo = {
    uuid: userInfo.uuid,
    lastName: userInfo.lastName,
    firstName: userInfo.firstName,
    email: userInfo.email,
    username: userInfo.username,
  };

  return (
    <Switch>
      <PortfolioProvider studentInfo={studentInfo} userInfo={userInfo}>
        <Route component={Portfolio} exact={true} path='/portfolio' />
        <Route component={EditPortfolioScreen} exact={true} path='/portfolio/edit' />
        <Route exact={true} path='/portfolio/resume/:fullName/:sharedUrl'>
          <StudentPublicPortfolio isPublic={false} />
        </Route>
      </PortfolioProvider>
    </Switch>
  );
};
