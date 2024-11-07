import { Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AdminAppPresentationBuilder from '@pbl/screens/UserApp/PresentationBuilder/PresentationBuilder';
import AppHeader from '@pbl/components/AppHeader/AppHeader';
import CatalogScreen from '@pbl/screens/UserApp/MyCatalogs/UserCatalogScreen';
import CheckinGradingScreen from '@pbl/screens/UserApp/CheckinGradingScreen';
import ContentWrapper from '@pbl/layout/ContentWrapper/ContentWrapper';
import { Track } from '@pbl/screens/UserApp/Track/Track';
import Dashboard from '@pbl/screens/UserApp/Dashboard/Dashboard';
import GuardRoute from '@pbl/components/GuardRoute/GuardRoute';
import LibraryCheckinsScreen from '@pbl/screens/UserApp/Library/Checkins/CheckinsScreen';
import { LtiSearchProjectsScreen } from '@pbl/screens/UserApp/LtiSearch/LtiSearch';
import { UserMyClassesScreen } from '@pbl/screens/UserApp/MyClasses/MyClasses';
import MyProjects from '@pbl/screens/UserApp/MyProjects/MyProjects';
import PresentationBuilderPresentationPreviewScreen from '@pbl/screens/UserApp/PresentationPreview/PresentationPreviewScreen';
import { ProjectSearchScreen } from '@pbl/screens/UserApp/LtiSearch/ProductList';
import ProductGradingScreen from '@pbl/screens/UserApp/ProductGradingScreen';
import Project from '@pbl/screens/UserApp/Project/Project';
import ProjectAssign from '@pbl/screens/UserApp/ProjectAssign/ProjectAssign';
import ProjectCheckinsAssign from '@pbl/screens/UserApp/ProjectCheckinsAssign/ProjectCheckinsAssign';
import ProjectSearch from '@pbl/screens/UserApp/ProjectSearch/ProjectSearch';
import { SchoolClass } from '@pbl/screens/UserApp/SchoolClass/SchoolClass';
import { StudentPortfolio } from '@pbl/screens/UserApp/StudentPortfolio/StudentPortfolio';
import { UserAppMessaging } from '@pbl/screens/UserApp/UserMessaging/UserMessaging';
import { libraryAllowedRoles } from '@pbl/resources/roleGuard';
import StandardSearch from '@pbl/screens/UserApp/StandardSearch/StandardSearch';
import CourseDetailsScreen from '@pbl/screens/shared/CourseDetailsScreen';
import { RubricEdit } from '@pbl/screens/UserApp/RubricsEdit/RubricEdit';
import { Roles } from '@pbl/resources/enums';
import { EntityAdminDashboard } from '@pbl/screens/UserApp/EntityAdminDashboard';
import UserDashboard from '@pbl/components/User/UserDashboard/UserDashboard';
import { PortfolioExperiences } from '@pbl/screens/UserApp/PortfolioExperiences/PortfolioExperiences';
import { TeacherClasses } from '@pbl/screens/UserApp/TeacherClasses';
import { LtiRelay } from '@pbl/components/User/LtiRelay/LtiRelay';
import { StudentPlans } from '@pbl/screens/UserApp/StudentPlans/StudentPlans';
import useUserInfo from '@pbl/hooks/useUserInfo';
import { TUserInfo } from '@pbl/graphql/user/queries/userInfo';

import { useLti } from '@shared/components/LtiProvider/LtiProvider';
import { UserAppMessagingPreview } from '@shared/components/MessagingPreview/MessagingPreview';
import { SharedSession, SHARED_SESSION_URL_SUFFIX } from '@shared/components/SharedSession';
import { ReportsRoutes } from '@shared/routes/ReportRoutes';
import { GuestPortfolio } from '@shared/components/GuestPortfolio/GuestPortfolio';

const NotFound = () => {
  const { t } = useTranslation();

  return <div>{t('navigation.notFound')}</div>;
};

const UserAuthRouter = () => {
  const { isLti } = useLti();
  const { userInfo } = useUserInfo<TUserInfo>();
  const DefaultComponent = isLti ? LtiRelay : Dashboard;

  return (
    <ContentWrapper header={<AppHeader />}>
      <Switch>
        <Route component={DefaultComponent} exact={true} path='/' />
        <Route component={Dashboard} exact={true} path='/dashboard' />
        <Route component={LtiSearchProjectsScreen} exact={true} path='/lti-search' />
        <Route component={EntityAdminDashboard} exact={true} path='/entity-dashboard/:uuid' />
        <Route path='/reports' render={() => <ReportsRoutes userInfo={userInfo} />} />
        <GuardRoute
          allowedFor={[Roles.ENTITY_ADMIN, Roles.SYSTEM_ADMIN]}
          component={UserDashboard}
          exact={true}
          path='/admin-dashboard'
        />
        <Route exact={true} path='/resume/:fullName/:sharedUrl'>
          <GuestPortfolio isPublic={false} />
        </Route>
        <Route path={SHARED_SESSION_URL_SUFFIX} render={() => <SharedSession type='DL' />} />
        <Route component={Track} exact={true} path='/courses/:courseId' />
        <Route component={UserAppMessaging} exact={true} path='/messages' />
        <Route component={UserAppMessagingPreview} exact={true} path='/students/:id/messages' />
        <GuardRoute
          allowedFor={libraryAllowedRoles}
          component={LibraryCheckinsScreen}
          exact={true}
          path='/library/checkins'
        />
        <GuardRoute
          allowedFor={libraryAllowedRoles}
          component={LibraryCheckinsScreen}
          exact={true}
          path='/library/checkins/:checkinId'
        />
        <Route component={ProjectSearch} exact={true} path='/project-search' />
        <Route component={Project} exact={true} path='/lessons/:lessonId/projects/:projectId' />
        <Route component={Project} exact={true} path='/projects/:projectId' />
        <Route component={Project} exact={true} path='/projects/:projectId/product/:productId' />
        <Route
          component={ProjectSearchScreen}
          exact={true}
          path='/lti/project/:projectId/product-select'
        />
        <Route
          component={RubricEdit}
          exact={true}
          path='/projects/:projectId/customize/rubrics/:rubricId'
        />
        <GuardRoute
          allowedFor={[Roles.SYSTEM_ADMIN, Roles.ENTITY_ADMIN, Roles.TEACHER, Roles.SALES_ADMIN]}
          component={StandardSearch}
          exact={true}
          path='/standards-search'
        />
        <Route
          component={CourseDetailsScreen}
          exact={true}
          path='/projects/:projectId/courses/:courseId'
        />
        <Route
          component={CheckinGradingScreen}
          exact={true}
          path='/projects/:projectId/grading/checkins/:checkinId'
        />
        <Route
          component={CheckinGradingScreen}
          exact={true}
          path='/projects/:projectId/product/:productId/grading/checkins/:checkinId'
        />
        <Route
          component={CheckinGradingScreen}
          exact={true}
          path='/projects/:projectId/grading/checkins/:checkinId/:classId'
        />
        <Route
          component={CheckinGradingScreen}
          exact={true}
          path='/projects/:projectId/grading/checkins/:checkinId/:classId/:studentId'
        />
        <Route
          component={CheckinGradingScreen}
          exact={true}
          path='/projects/:projectId/grading/checkins/:checkinId/:classId/teams/:teamId'
        />
        <Route
          component={ProductGradingScreen}
          exact={true}
          path='/projects/:projectId/grading/products/:productId'
        />
        <Route
          component={ProductGradingScreen}
          exact={true}
          path='/projects/:projectId/grading/products/:productId/:classId'
        />
        <Route
          component={ProductGradingScreen}
          exact={true}
          path='/projects/:projectId/grading/products/:productId/:classId/:studentId'
        />
        <Route
          component={ProductGradingScreen}
          exact={true}
          path='/projects/:projectId/grading/products/:productId/:classId/teams/:teamId'
        />
        <Route component={ProjectAssign} exact={true} path='/projects/:projectId/assign' />
        <GuardRoute
          allowedFor={libraryAllowedRoles}
          component={ProjectCheckinsAssign}
          exact={true}
          path='/projects/:projectId/checkins'
        />
        <Route
          component={PortfolioExperiences}
          exact={true}
          path='/students/:uuid/portfolio/experiences'
        />
        <Route component={MyProjects} exact={true} path='/my-projects' />
        <Route component={UserMyClassesScreen} exact={true} path='/my-classes' />
        <Route component={TeacherClasses} path='/teacher/:userUuid' />
        <Route component={SchoolClass} exact={true} path='/my-classes/:classId' />
        <Route component={CatalogScreen} exact={true} path='/my-catalogs/:id' />
        <Route component={StudentPortfolio} exact={true} path='/students/:id/portfolio' />
        <Route component={StudentPlans} exact={true} path='/students/:id/plans' />
        <Route
          component={AdminAppPresentationBuilder}
          exact={true}
          path='/projects/:projectId/presentation-builder'
        />
        <Route
          component={PresentationBuilderPresentationPreviewScreen}
          exact={true}
          path='/projects/:projectId/presentation-preview'
        />
        <Route
          component={AdminAppPresentationBuilder}
          exact={true}
          path='/slides/presentation-builder'
        />
        <Route
          component={PresentationBuilderPresentationPreviewScreen}
          exact={true}
          path='/slides/presentation-preview'
        />
        <Route component={NotFound} />
      </Switch>
    </ContentWrapper>
  );
};

export default UserAuthRouter;
