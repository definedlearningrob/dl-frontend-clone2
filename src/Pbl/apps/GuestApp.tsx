import { Redirect, Route, Switch } from 'react-router-dom';

import AuthHandler from '@pbl/components/AuthHandler';
import ChooseAccount from '@pbl/screens/GuestApp/ChooseAccount/ChooseAccount';
import SignInWithAccessCode from '@pbl/screens/GuestApp/SignInWithAccessCode/SignInWithAccessCode';
import { SharedProject } from '@pbl/screens/GuestApp/SharedProject/SharedProject';
import StudentSignIn from '@pbl/screens/GuestApp/StudentSignIn/StudentSignIn';
import UserSignIn from '@pbl/screens/GuestApp/UserSignIn/UserSignIn';
import CourseDetailsScreen from '@pbl/screens/shared/CourseDetailsScreen';

import GuestSharedMiddleware from '@shared/components/SharedMiddleware/GuestSharedMiddleware';
import GuestAppHeader from '@shared/components/GuestAppHeader/GuestAppHeader';
import { AllowLoginProvider } from '@shared/hooks/useAllowLogin';
import { GuestContentWrapper } from '@shared/components/GuestContentWrapper/GuestContentWrapper';
import {
  SharedSession,
  SHARED_SESSION_URL_SUFFIX,
} from '@shared/components/SharedSession/SharedSession';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { PresentationStateProvider } from '@shared/hooks/usePresentationState';
import { GuestPortfolio } from '@shared/components/GuestPortfolio/GuestPortfolio';

function GuestApp() {
  return (
    <AllowLoginProvider>
      <Switch>
        <Route path='/users/auth' render={() => <AuthHandler type='user' />} />
        <Route path='/students/auth' render={() => <AuthHandler type='student' />} />
        <Route path={SHARED_SESSION_URL_SUFFIX} render={() => <SharedSession type='DL' />} />
        <Route component={UserSignIn} path='/sign-in/users' />
        <Route component={StudentSignIn} path='/sign-in/students' />
        <Route component={SignInWithAccessCode} path='/sign-in/access-code' />
        <Route component={ChooseAccount} path='/sign-in' />
        <Route>
          <div className='guest-app-container'>
            <PresentationStateProvider>
              <NavigationContextProvider>
                <GuestContentWrapper header={<GuestAppHeader />}>
                  <Switch>
                    <Route exact={true} path='/resume/:fullName/:sharedUrl'>
                      <GuestPortfolio isPublic={true} />
                    </Route>
                    <Route component={GuestSharedMiddleware} exact={true} path='/shared' />
                    <Route
                      component={SharedProject}
                      exact={true}
                      path='/shared/:targetRole/projects/:projectId'
                    />
                    <Route
                      exact={true}
                      path='/shared/:targetRole/projects/:projectId/courses/:courseId'>
                      <CourseDetailsScreen isPublic={true} />
                    </Route>
                    <Redirect from='*' to='/sign-in' />
                  </Switch>
                </GuestContentWrapper>
              </NavigationContextProvider>
            </PresentationStateProvider>
          </div>
        </Route>
      </Switch>
    </AllowLoginProvider>
  );
}

export default GuestApp;
