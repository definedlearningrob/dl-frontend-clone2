import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { CareerReviewSurveyReport } from '@dc/screens/UserApp/CareerReviewReport/CareerReviewSurveyReport';
import { CareerReviewFilters } from '@dc/screens/UserApp/CareerReviewFilters/CareerReviewFilters';
import { TUserInfo as DCUserInfo } from '@dc/graphql/user/queries/userInfo';
import { getRangeInitialDates } from '@dc/routes/helpers';
import useUserInfo from '@dc/hooks/useUserInfo';

import { ALL_OPTION } from '@shared/components/MultiSelect';
import { ReportFiltersProvider } from '@shared/components/ReportFiltersProvider/ReportFiltersProvider';

export const CareerReviewSurveyRoutes = () => {
  const { userInfo } = useUserInfo<DCUserInfo>();

  const { path } = useRouteMatch();

  const [entity] = userInfo.entities.nodes;

  const { schoolYearStartDate } = entity.settings;

  const { startDate, endDate } = getRangeInitialDates(schoolYearStartDate);

  const initialFilters = {
    entities: [ALL_OPTION],
    gradeLevels: [ALL_OPTION],
    users: [ALL_OPTION],
    schoolClasses: [ALL_OPTION],
    entityFilter: '',
    userFilter: '',
    schoolClassFilter: '',
    startDate: startDate,
    endDate: endDate,
  };

  return (
    <ReportFiltersProvider initialFilters={initialFilters}>
      <Switch>
        <Route component={CareerReviewFilters} exact={true} path={`${path}/filters`} />
        <Route component={CareerReviewSurveyReport} exact={true} path={`${path}/report`} />
        <Route>
          <Redirect to={`${path}/filters`} />
        </Route>
      </Switch>
    </ReportFiltersProvider>
  );
};
