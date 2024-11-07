import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { CreatePartnerScreen } from '@dc/screens/UserApp/Partners/CreatePartnerScreen';
import { EditPartnerScreen } from '@dc/screens/UserApp/Partners/EditPartnerScreen';
import { Partner } from '@dc/screens/shared/Partner/Partner';
import { useCanManagePartner } from '@dc/hooks/useCanManagePartner';

export const PartnerRoutes = () => {
  const { path } = useRouteMatch();

  const canManagePartner = useCanManagePartner();

  return (
    <Switch>
      <Route
        exact={true}
        path={`${path}/new`}
        render={() => (canManagePartner ? <CreatePartnerScreen /> : <Redirect to='/' />)}
      />
      <Route
        exact={true}
        path={`${path}/:id/edit`}
        render={() => (canManagePartner ? <EditPartnerScreen /> : <Redirect to='/' />)}
      />
      <Route component={Partner} exact={true} path={`${path}/:id`} />
      <Redirect to='/' />
    </Switch>
  );
};
