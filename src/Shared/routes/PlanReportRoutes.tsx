import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { TUserInfo as DCUserInfo } from '@dc/graphql/user/queries/userInfo';

import { TUserInfo as DLUserInfo } from '@pbl/graphql/user/queries/userInfo';

import { ReportFiltersProvider } from '@shared/components/ReportFiltersProvider/ReportFiltersProvider';
import { PlanReportFilters } from '@shared/screens/UserApp/PlanReportFilters/PlanReportFilters';
import { PlanReport } from '@shared/screens/UserApp/PlanReport/PlanReport';

const initialFilters = {
  plan: null,
  schoolYear: null,
  entities: [],
  gradeLevels: [],
  users: [],
  schoolClasses: [],
  entityFilter: '',
  userFilter: '',
  schoolClassFilter: '',
};

type Props = {
  userInfo: DCUserInfo | DLUserInfo;
};

export const PlanReportRoutes = ({ userInfo }: Props) => {
  const { path } = useRouteMatch();

  const [entity] = userInfo.entities.nodes;

  const { schoolYearStartDate } = entity.settings;

  return (
    <ReportFiltersProvider initialFilters={initialFilters}>
      <Switch>
        <Route
          exact={true}
          path={`${path}/filters`}
          render={() => <PlanReportFilters schoolYearStartDate={schoolYearStartDate} />}
        />
        <Route
          exact={true}
          path={`${path}/report`}
          render={() => <PlanReport schoolYearStartDate={schoolYearStartDate} />}
        />
        <Route>
          <Redirect to={`${path}/filters`} />
        </Route>
      </Switch>
    </ReportFiltersProvider>
  );
};
