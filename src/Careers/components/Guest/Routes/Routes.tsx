import { Redirect, Route, Switch } from 'react-router-dom';

import AuthHandler from '@dc/components/AuthHandler';
import ChooseAccount from '@dc/screens/GuestApp/ChooseAccount';
import SignInWithAccessCode from '@dc/screens/GuestApp/SignInWithAccessCode/SignInWithAccessCode';
import StudentSignIn from '@dc/screens/GuestApp/StudentSignIn/StudentSignIn';
import UserSignIn from '@dc/screens/GuestApp/UserSignIn/UserSignIn';
import { Course } from '@dc/screens/GuestApp/Course';
import { PublicLesson } from '@dc/screens/GuestApp/PublicLesson/PublicLesson';

import GuestAppHeader from '@shared/components/GuestAppHeader/GuestAppHeader';
import { GuestContentWrapper } from '@shared/components/GuestContentWrapper/GuestContentWrapper';
import {
  SharedSession,
  SHARED_SESSION_URL_SUFFIX,
} from '@shared/components/SharedSession/SharedSession';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import GuestSharedMiddleware from '@shared/components/SharedMiddleware/GuestSharedMiddleware';
import { AllowLoginProvider } from '@shared/hooks/useAllowLogin';
import { PresentationStateProvider } from '@shared/hooks/usePresentationState';
import { GuestPortfolio } from '@shared/components/GuestPortfolio/GuestPortfolio';

function GuestRoutes() {
  return (
    <AllowLoginProvider>
      <Switch>
        <Route path='/users/auth' render={() => <AuthHandler type='user' />} />
        <Route path='/students/auth' render={() => <AuthHandler type='student' />} />
        <Route path={SHARED_SESSION_URL_SUFFIX} render={() => <SharedSession type='DC' />} />
        <Route component={UserSignIn} path='/sign-in/users' />
        <Route component={StudentSignIn} path='/sign-in/students' />
        <Route component={SignInWithAccessCode} path='/sign-in/access-code' />
        <Route component={ChooseAccount} path='/sign-in' />
        <Route>
          <NavigationContextProvider>
            <PresentationStateProvider>
              <GuestContentWrapper header={<GuestAppHeader />}>
                <Switch>
                  <Route exact={true} path='/resume/:fullName/:sharedUrl'>
                    <GuestPortfolio isPublic={true} />
                  </Route>
                  <Route component={GuestSharedMiddleware} exact={true} path='/shared' />
                  <Route component={Course} exact={true} path='/shared/student/courses/:shareId' />
                  <Route
                    component={PublicLesson}
                    exact={true}
                    path='/shared/student/courses/:shareId/lessons/:lessonId'
                  />
                  <Redirect from='*' to='/sign-in' />
                </Switch>
              </GuestContentWrapper>
            </PresentationStateProvider>
          </NavigationContextProvider>
        </Route>
        <Redirect from='*' to='/sign-in' />
      </Switch>
    </AllowLoginProvider>
  );
}

export default GuestRoutes;
