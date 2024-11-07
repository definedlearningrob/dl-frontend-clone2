import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { TUserInfo as DCUserInfo } from '@dc/graphql/user/queries/userInfo';

import { TUserInfo as DLUserInfo } from '@pbl/graphql/user/queries/userInfo';

import { ReportFiltersProvider } from '@shared/components/ReportFiltersProvider/ReportFiltersProvider';
import { TagsFiltersScreen } from '@shared/screens/UserApp/TagsFiltersScreen/TagsFiltersScreen';
import { TagsReport } from '@shared/screens/UserApp/TagsReport/TagsReport';
import { getInitialSchoolYear } from '@shared/utils/schoolYear';

type Props = {
  userInfo: DCUserInfo | DLUserInfo;
};

export const PerformanceIndicatorsReportRoutes = ({ userInfo }: Props) => {
  const { path } = useRouteMatch();

  const [entity] = userInfo.entities.nodes;
  const { schoolYearStartDate } = entity.settings;

  const initialFilters = {
    tags: [],
    schoolYear: getInitialSchoolYear(schoolYearStartDate),
    entities: [],
    gradeLevels: [],
    users: [],
    schoolClasses: [],
    entityFilter: '',
    userFilter: '',
    schoolClassFilter: '',
  };

  return (
    <ReportFiltersProvider initialFilters={initialFilters}>
      <Switch>
        <Route
          exact={true}
          path={`${path}/filters`}
          render={() => <TagsFiltersScreen schoolYearStartDate={schoolYearStartDate} />}
        />
        <Route
          exact={true}
          path={`${path}/report`}
          render={() => <TagsReport schoolYearStartDate={schoolYearStartDate} />}
        />
        <Route>
          <Redirect to={`${path}/filters`} />
        </Route>
      </Switch>
    </ReportFiltersProvider>
  );
};
