import { Route, Redirect, Switch } from 'react-router-dom';

import AppHeader from '@dc/components/AppHeader/AppHeader';
import assessmentAttemptStatusQuery, {
  TAssessmentAttemptStatusData,
  TAssessmentProgressAttempt,
} from '@dc/graphql/student/queries/assessmentAttemptStatus';
import Components from '@dc/components/Onboarding/Result/Components/Components';
import ContentWrapper from '@dc/layout/ContentWrapper/ContentWrapper';
import DashboardSkeleton from '@dc/components/Dashboard/Skeleton/Skeleton';
import { StudentNavigation } from '@dc/components/Student/Navigation/Navigation';
import { Onboarding } from '@dc/components/Onboarding/Onboarding';
import Result from '@dc/components/Onboarding/Result/Result';
import StudentRoutes from '@dc/components/Student/Routes/Routes';
import useUserInfo from '@dc/hooks/useUserInfo';
import { ASSESSMENT_STATUSES } from '@dc/resources/constants';
import { ExpandSidebarProvider } from '@dc/hooks/useExpandSidebar';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import { DCLogo } from '@dc/components/shared/DCLogo/DCLogo';
import useSelfAssign from '@dc/hooks/useSelfAssign';
import { CareerReviewSurvey } from '@dc/screens/StudentApp/CareerReviewSurvey/CareerReviewSurvey';

import { Sidebar } from '@shared/components/Sidebar/Sidebar';
import { MessagingProvider } from '@shared/hooks/useMessaging';
import { NotificationsProvider } from '@shared/hooks/useNotifications';
import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { NavigationContextProvider } from '@shared/components/Sidebar/useNavigation';
import { PresentationStateProvider } from '@shared/hooks/usePresentationState';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

function StudentApp() {
  const {
    userInfo,
    refreshUser,
    userInfo: {
      hasCompletedOnboarding,
      settings: { onboardingEnabled },
    },
  } = useUserInfo<TStudentInfo>();
  const { loading } = useSelfAssign();

  const shouldRedirectToOnboarding = (attempt: TAssessmentProgressAttempt) => {
    const unfinishedOnboarding = onboardingEnabled && attempt && !hasCompletedOnboarding;
    const failedFirstAssessment =
      attempt?.status === ASSESSMENT_STATUSES.FAILED && unfinishedOnboarding;

    if (failedFirstAssessment) {
      return false;
    } else if (unfinishedOnboarding) {
      return true;
    }
  };

  if (loading) {
    return <SharedLoadingSpinner size='full-screen' />;
  }

  return (
    <SharedDataLoader<TAssessmentAttemptStatusData>
      SpinnerComponent={<DashboardSkeleton type='STUDENT' />}
      query={assessmentAttemptStatusQuery}>
      {({ assessmentProgress }) => {
        const attempt = assessmentProgress?.attempt;
        const beforeOnboarding = onboardingEnabled && !attempt;

        return (
          <>
            {shouldRedirectToOnboarding(attempt) && <Redirect to='/onboarding' />}
            <Switch>
              <Route exact={true} path='/choose-pathway'>
                <Result assessmentType={attempt?.assessmentType} />
              </Route>
              <Route component={Components} path='/choose-pathway/components' />
              <Route component={Onboarding} path='/onboarding' />
              <Route component={CareerReviewSurvey} path='/career-review-survey' />
              <Route>
                <div className='user-app-container'>
                  <PresentationStateProvider>
                    <NavigationContextProvider>
                      <ExpandSidebarProvider>
                        <MessagingProvider refreshUser={refreshUser} userInfo={userInfo}>
                          <NotificationsProvider userInfo={userInfo}>
                            <Sidebar
                              LogoComponent={DCLogo}
                              disabled={beforeOnboarding}
                              userInfo={userInfo}>
                              <StudentNavigation />
                            </Sidebar>
                            <ContentWrapper
                              header={<AppHeader beforeOnboarding={beforeOnboarding} />}
                              isBlurred={beforeOnboarding}>
                              <StudentRoutes
                                beforeOnboarding={beforeOnboarding}
                                userInfo={userInfo}
                              />
                            </ContentWrapper>
                          </NotificationsProvider>
                        </MessagingProvider>
                      </ExpandSidebarProvider>
                    </NavigationContextProvider>
                  </PresentationStateProvider>
                </div>
              </Route>
            </Switch>
          </>
        );
      }}
    </SharedDataLoader>
  );
}

export default StudentApp;
