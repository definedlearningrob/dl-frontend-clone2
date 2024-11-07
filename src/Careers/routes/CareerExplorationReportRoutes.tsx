import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { TUserInfo as DCUserInfo } from '@dc/graphql/user/queries/userInfo';
import { CareerExplorationReport } from '@dc/screens/UserApp/CareerPathwayReport/CareerExplorationReport';
import { CareerExplorationReportFilters } from '@dc/screens/UserApp/CareerExplorationReportFilters/CareerExplorationReportFilters';

import { TUserInfo as DLUserInfo } from '@pbl/graphql/user/queries/userInfo';

import { ReportFiltersProvider } from '@shared/components/ReportFiltersProvider/ReportFiltersProvider';
import { getInitialSchoolYear } from '@shared/utils/schoolYear';
import { ALL_OPTION } from '@shared/components/MultiSelect';

type Props = {
  userInfo: DCUserInfo | DLUserInfo;
};

export const CareerExplorationReportRoutes = ({ userInfo }: Props) => {
  const { path } = useRouteMatch();

  const [entity] = userInfo.entities.nodes;

  const { schoolYearStartDate } = entity.settings;

  const initialSchoolYear = getInitialSchoolYear(schoolYearStartDate);

  const initialFilters = {
    schoolYear: initialSchoolYear,
    entities: [ALL_OPTION],
    gradeLevels: [ALL_OPTION],
    users: [ALL_OPTION],
    schoolClasses: [ALL_OPTION],
    entityFilter: '',
    userFilter: '',
    schoolClassFilter: '',
  };

  return (
    <ReportFiltersProvider initialFilters={initialFilters}>
      <Switch>
        <Route component={CareerExplorationReportFilters} exact={true} path={`${path}/filters`} />
        <Route component={CareerExplorationReport} exact={true} path={`${path}/report`} />
        <Route>
          <Redirect to={`${path}/filters`} />
        </Route>
      </Switch>
    </ReportFiltersProvider>
  );
};
