import { Redirect, Route, Switch } from 'react-router-dom';

import AppHeader from '@pbl/components/AppHeader/AppHeader';
import ContentWrapper from '@pbl/layout/ContentWrapper/ContentWrapper';
import CourseDetailsScreen from '@pbl/screens/shared/CourseDetailsScreen';
import Navigation from '@pbl/components/Student/Navigation/Navigation';
import Project from '@pbl/screens/StudentApp/Project/Project';
import ReAuth from '@pbl/components/ReAuth';
import { StudentAppMessaging } from '@pbl/screens/StudentApp/Messaging/Messaging';
import StudentDashboard from '@pbl/screens/StudentApp/Dashboard/Dashboard';
import useSelfAssign from '@pbl/hooks/useSelfAssign';
import useUserInfo from '@pbl/hooks/useUserInfo';
import { ExpandSidebarProvider } from '@pbl/hooks/useExpandSidebar';
import { TStudentInfo } from '@pbl/graphql/student/queries/userInfo';
import { PortfolioExperiences } from '@pbl/screens/StudentApp/PortfolioExperiences/PortfolioExperiences';
import { DLLogo } from '@pbl/components/DLLogo/DLLogo';
import { LtiRelay } from '@pbl/components/Student/LtiRelay/LtiRelay';
import { SharedMiddleware } from '@pbl/components/SharedMiddleware/SharedMiddleware';
import { Plans } from '@pbl/screens/StudentApp/Plans/Plans';
import { PortfolioRoutes } from '@pbl/routes/PortfolioRoutes';

import { Sidebar } from '@shared/components/Sidebar/Sidebar';
import { useLti } from '@shared/components/LtiProvider/LtiProvider';
import { MessagingProvider } from '@shared/hooks/useMessaging';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { NotificationsProvider } from '@shared/hooks/useNotifications';
import { SharedSession, SHARED_SESSION_URL_SUFFIX } from '@shared/components/SharedSession';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { PresentationStateProvider } from '@shared/hooks/usePresentationState';
import { StudentReport } from '@shared/screens/Shared/StudentReport/StudentReport';

const StudentApp = () => {
  const { userInfo, refreshUser } = useUserInfo<TStudentInfo>();
  const { loading } = useSelfAssign();
  const { isLti } = useLti();
  const DefaultComponent = isLti ? LtiRelay : StudentDashboard;

  if (loading) {
    return <SharedLoadingSpinner size='full-screen' />;
  }

  return (
    <Switch>
      <Route component={SharedMiddleware} path='/shared' />
      <Route component={ReAuth} path='/users/auth' />
      <Route component={ReAuth} path='/students/auth' />
      <Route path={SHARED_SESSION_URL_SUFFIX} render={() => <SharedSession type='DL' />} />
      <Route
        path='/sign-in'
        render={() => (userInfo ? <Redirect from='/sign-in' to='/' /> : null)}
      />
      <Route>
        <div className='user-app-container'>
          <PresentationStateProvider>
            <ExpandSidebarProvider>
              <NavigationContextProvider>
                <MessagingProvider refreshUser={refreshUser} userInfo={userInfo}>
                  <NotificationsProvider userInfo={userInfo}>
                    <Sidebar LogoComponent={DLLogo} userInfo={userInfo}>
                      <Navigation />
                    </Sidebar>
                    <Switch>
                      <ContentWrapper header={<AppHeader />}>
                        <Route component={DefaultComponent} exact={true} path='/' />
                        <Route component={Project} exact={true} path='/projects/:projectId' />
                        <Route component={StudentDashboard} exact={true} path='/dashboard' />
                        <Route
                          component={Project}
                          exact={true}
                          path='/projects/:projectId/product/:productId'
                        />
                        <Route
                          component={Project}
                          exact={true}
                          path='/teams/:teamId/projects/:projectId'
                        />
                        <Route
                          component={CourseDetailsScreen}
                          exact={true}
                          path='/projects/:projectId/courses/:courseId'
                        />
                        <Route component={PortfolioRoutes} path='/portfolio' />
                        <Route component={Plans} exact={true} path='/plans' />
                        <Route
                          component={PortfolioExperiences}
                          exact={true}
                          path='/portfolio/experiences'
                        />
                        <Route
                          component={StudentReport}
                          path='/reports/student-progress/:planId/'
                        />
                        <Route component={StudentAppMessaging} exact={true} path='/messages' />
                      </ContentWrapper>
                    </Switch>
                  </NotificationsProvider>
                </MessagingProvider>
              </NavigationContextProvider>
            </ExpandSidebarProvider>
          </PresentationStateProvider>
        </div>
      </Route>
    </Switch>
  );
};

export default StudentApp;
