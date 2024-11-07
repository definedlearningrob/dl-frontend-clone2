import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Partner } from '@dc/screens/shared/Partner/Partner';

export const PartnerRoutes = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route component={Partner} exact={true} path={`${path}/:id`} />
    </Switch>
  );
};
