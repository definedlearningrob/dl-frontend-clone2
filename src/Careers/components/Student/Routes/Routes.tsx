import { Route, Redirect, Switch } from 'react-router-dom';

import { StudentAppOpportunities } from '@dc/screens/StudentApp/Opportunities';
import Announcements from '@dc/components/Announcements/Announcements';
import Course from '@dc/screens/StudentApp/Course/Course';
import { CourseComplete } from '@dc/screens/StudentApp/CourseComplete/CourseComplete';
import Courses from '@dc/screens/StudentApp/Courses/Courses';
import { FinalReport } from '@dc/screens/StudentApp/FinalReport/FinalReport';
import Lesson from '@dc/screens/StudentApp/Lesson/Lesson';
import { StudentAppMessaging } from '@dc/screens/StudentApp/Messaging/Messaging';
import PickedAnnouncement from '@dc/components/Announcements/PickedAnnouncement';
import ReAuth from '@dc/components/ReAuth';
import { OpportunityDetails } from '@dc/screens/StudentApp/OpportunityDetails';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import { PostSecondaryRoutes } from '@dc/components/Student/Routes';
import { VirtualInternship } from '@dc/screens/StudentApp/Virtualnternship';
import { VirtualInternshipLesson } from '@dc/screens/StudentApp/VirtualInternshipLesson';
import { SharedMiddleware } from '@dc/shared/SharedMiddleware/SharedMiddleware';
import { Plans } from '@dc/screens/StudentApp/Plans/Plans';
import { PortfolioRoutes } from '@dc/components/Student/Routes/PortfolioRoutes';
import { CustomCatalog } from '@dc/screens/shared/CustomCatalog/CustomCatalog';
import { Dashboard } from '@dc/screens/StudentApp/Dashboard/Dashboard';
import { CatalogTrack } from '@dc/screens/shared/CatalogTrack/CatalogTrack';
import { PartnerRoutes } from '@dc/components/Student/Routes/PartnerRoutes';

import { SharedSession, SHARED_SESSION_URL_SUFFIX } from '@shared/components/SharedSession';
import { StudentReport } from '@shared/screens/Shared/StudentReport/StudentReport';
import { GuestPortfolio } from '@shared/components/GuestPortfolio/GuestPortfolio';

type Props = {
  userInfo: TStudentInfo;
  beforeOnboarding: boolean;
};

const StudentRoutes = ({ userInfo, beforeOnboarding }: Props) => {
  const OPPORTUNITIES_ON = userInfo.hasOpportunitiesEnabled;

  return (
    <Switch>
      <Route component={SharedMiddleware} path='/shared' />
      <Route component={Lesson} path='/courses/:courseId/lessons/:lessonId' />
      <Route component={Course} exact={true} path='/courses/:id' />
      <Route component={CourseComplete} path='/courses/:courseId/complete' />
      <Route component={Courses} exact={true} path='/courses' />
      <Route component={PortfolioRoutes} path='/portfolio' />
      <Route component={FinalReport} path='/final-report' />
      <Route component={Plans} path='/plans' />
      <Route component={PostSecondaryRoutes} path='/post-secondary' />
      <Route component={PartnerRoutes} path='/partner' />
      <Route component={StudentAppMessaging} exact={true} path='/messages' />
      <Route component={StudentReport} path='/reports/student-progress/:planId/' />
      <Route component={CustomCatalog} exact={true} path='/catalog' />
      <Route component={CatalogTrack} path='/catalog/unit-outline/:id' />
      <Route
        exact={true}
        path='/opportunities'
        render={() => (OPPORTUNITIES_ON ? <StudentAppOpportunities /> : <Redirect to='/' />)}
      />
      <Route
        exact={true}
        path='/opportunities/:id'
        render={() => (OPPORTUNITIES_ON ? <OpportunityDetails /> : <Redirect to='/' />)}
      />
      <Route
        component={() => (OPPORTUNITIES_ON ? <VirtualInternship /> : <Redirect to='/' />)}
        exact={true}
        path='/opportunities/:opportunityId/virtual-internship'
      />
      <Route
        component={VirtualInternshipLesson}
        path='/opportunities/:opportunityId/virtual-internship/lesson/:lessonId'
      />
      <Route component={Announcements} exact={true} path='/announcements' />
      <Route component={PickedAnnouncement} exact={true} path='/announcements/:id' />
      <Route
        exact={true}
        path='/'
        render={() => <Dashboard beforeOnboarding={beforeOnboarding} />}
      />
      <Route path='/users/auth' render={() => <ReAuth type='user' />} />
      <Route path='/students/auth' render={() => <ReAuth type='student' />} />
      <Route
        path='/sign-in'
        render={() => (userInfo ? <Redirect from='/sign-in' to='/' /> : null)}
      />
      <Route path={SHARED_SESSION_URL_SUFFIX} render={() => <SharedSession type='DC' />} />
      <Route
        path='/ca/connect'
        render={({ location }) => (
          <Redirect
            to={{
              pathname: '/post-secondary/manage-applications',
              search: location.search,
            }}
          />
        )}
      />
      <Route exact={true} path='/resume/:fullName/:sharedUrl'>
        <GuestPortfolio isPublic={false} />
      </Route>
      <Route>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
};

export default StudentRoutes;
