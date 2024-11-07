import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { isEmpty } from 'lodash-es';

import { TUserInfo as DCUserInfo } from '@dc/graphql/user/queries/userInfo';
import { AssessmentReportRoutes } from '@dc/routes/AssessmentReportRoutes';
import { CareerReviewSurveyRoutes } from '@dc/routes/CareerReviewSurveyRoutes';
import { CareerExplorationReportRoutes } from '@dc/routes/CareerExplorationReportRoutes';
import { OpportunityReportRoutes } from '@dc/routes/OpportunityReportRoutes';

import { TUserInfo as DLUserInfo } from '@pbl/graphql/user/queries/userInfo';

import { Reports } from '@shared/screens/UserApp/Reports/Reports';
import { PlanReportRoutes } from '@shared/routes/PlanReportRoutes';
import { CollegeAndFuture } from '@shared/screens/UserApp/ReportItems/CollegeAndFuture';
import { PerformanceIndicatorsReportRoutes } from '@shared/routes/PerformanceIndicatorsReportRoutes';
import { StudentReport } from '@shared/screens/Shared/StudentReport/StudentReport';
import { REPORT_PATHS } from '@shared/resources/constants';

type Props = {
  userInfo: DLUserInfo | DCUserInfo;
};

export const ReportsRoutes = ({ userInfo }: Props) => {
  const { path } = useRouteMatch();
  const {
    availableReportTypes,
    permissions: { canBrowseReports },
  } = userInfo;

  const canViewReports = canBrowseReports && !isEmpty(availableReportTypes);

  if (!canViewReports) {
    return (
      <Switch>
        <Route component={StudentReport} path={`${path}/student-progress/:planId/:studentUuid`} />
        <Route>
          <Redirect to='/' />
        </Route>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route component={StudentReport} path={`${path}/student-progress/:planId/:studentUuid`} />;
      <Route
        path={`${path}/${REPORT_PATHS.GOAL_PLANS}`}
        render={() => <PlanReportRoutes userInfo={userInfo} />}
      />
      <Route
        path={`${path}/${REPORT_PATHS.GOAL_PERFORMANCE_INDICATORS}`}
        render={() => <PerformanceIndicatorsReportRoutes userInfo={userInfo} />}
      />
      <Route
        component={CareerReviewSurveyRoutes}
        path={`${path}/${REPORT_PATHS.CAREER_REVIEW_SURVEY}`}
      />
      <Route
        path={`${path}/${REPORT_PATHS.ASSESSMENT}`}
        render={() => <AssessmentReportRoutes userInfo={userInfo} />}
      />
      <Route
        component={CollegeAndFuture}
        exact={true}
        path={`${path}/${REPORT_PATHS.COLLEGE_AND_FUTURE}`}
      />
      <Route
        path={`${path}/${REPORT_PATHS.OPPORTUNITIES}`}
        render={() => <OpportunityReportRoutes userInfo={userInfo} />}
      />
      <Route
        path={`${path}/${REPORT_PATHS.CAREER_PATHWAY}`}
        render={() => <CareerExplorationReportRoutes userInfo={userInfo} />}
      />
      <Route exact={true} path={path} render={() => <Reports userInfo={userInfo} />} />
      <Route>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
};
