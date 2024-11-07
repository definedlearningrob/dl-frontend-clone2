import { Redirect, Route, Switch } from 'react-router-dom';

import Course from '@dc/screens/UserApp/Course/Course';
import Courses from '@dc/screens/UserApp/Courses/Courses';
import EntityDashboard from '@dc/screens/UserApp/EntityAdmin/EntityDashboard/EntityDashboard';
import ExtensionEditScreen from '@dc/screens/UserApp/Extension/Edit/ExtensionEdit';
import ExtensionFields from '@dc/screens/UserApp/Extensions/Extensions';
import ExtensionFieldScreen from '@dc/screens/UserApp/Extension/Extension';
import GradingSchoolClass from '@dc/screens/UserApp/GradingSchoolClass/GradingSchoolClass';
import GradingSchoolClasses from '@dc/screens/UserApp/GradingSchoolClasses/GradingSchoolClasses';
import Lesson from '@dc/screens/UserApp/Lesson/Lesson';
import { UserAppMessaging } from '@dc/screens/UserApp/Messaging/Messaging';
import { MessagingPreview } from '@dc/screens/UserApp/MessagingPreview/MessagingPreview';
import ReAuth from '@dc/components/ReAuth';
import SchoolClass from '@dc/screens/UserApp/SchoolClass/SchoolClass';
import Student from '@dc/screens/UserApp/Student/Student';
import StudentAssessmentResults from '@dc/screens/UserApp/StudentAssessmentResults/StudentAssessmentResults';
import StudentCourses from '@dc/screens/UserApp/StudentCourses/StudentCourses';
import StudentFinalReport from '@dc/screens/UserApp/StudentFinalReport/StudentFinalReport';
import { StudentPortfolio } from '@dc/screens/UserApp/StudentPortfolio/StudentPortfolio';
import TeacherDashboard from '@dc/screens/UserApp/EntityAdmin/TeacherDashboard/TeacherDashboard';
import UserAppDashboard from '@dc/screens/UserApp/Dashboard/Dashboard';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { PortfolioExperiences } from '@dc/screens/UserApp/PortfolioExperiences/PortfolioExperiences';
import {
  OpportunitiesScreen,
  CreateOpportunityScreen,
  EditOpportunityScreen,
  OpportunityScreen,
} from '@dc/screens/UserApp/Opportunities';
import { TeacherProfile } from '@dc/screens/UserApp/TestForms/TeacherProfile/TeacherProfile';
import { TeQuestions } from '@dc/screens/UserApp/TestForms/TeQuestions/TeQuestions';
import { CounselorProfileScreen } from '@dc/screens/UserApp/TestForms/CounselorProfile/CounselorProfile';
import { SchoolReportScreen } from '@dc/screens/UserApp/TestForms/SchoolReport/SchoolReport';
import { CounselorRecommendationScreen } from '@dc/screens/UserApp/TestForms/CounselorRecommendation/CounselorRecommendation';
import { CounselorOptionalReportScreen } from '@dc/screens/UserApp/TestForms/CounselorOptionalReport/CounselorOptionalReport';
import { CounselorOptionalReport2Screen } from '@dc/screens/UserApp/TestForms/CounselorOptionalReport2/CounselorOptionalReport2';
import { CounselorMidYearReportScreen } from '@dc/screens/UserApp/TestForms/CounselorMidYearReport/CounselorMidYearReport';
import { CounselorFinalReportScreen } from '@dc/screens/UserApp/TestForms/CounselorFinalReport/CounselorFinalReport';
import { CounselorFeeWaiverScreen } from '@dc/screens/UserApp/TestForms/CounselorFeeWaiver/CounselorFeeWaiver';
import { CounselorEarlyDecisionScreen } from '@dc/screens/UserApp/TestForms/CounselorEarlyDecision/CounselorEarlyDecision';
import { CounselorEarlyDecision2Screen } from '@dc/screens/UserApp/TestForms/CounselorEarlyDecision2/CounselorEarlyDecision2';
import { PostSecondary } from '@dc/screens/UserApp/PostSecondary/PostSecondary';
import { CommonAppRequestsScreen } from '@dc/screens/UserApp/CommonApp/CommonAppRequests';
import { PostSecondaryResults } from '@dc/screens/UserApp/PostSecondaryResults/PostSecondaryResults';
import { StudentManagement } from '@dc/screens/UserApp/StudentManagement/StudentManagement';
import { Institution } from '@dc/screens/shared/Institution';
import { ManageOpportunityApplicationsScreen } from '@dc/screens/UserApp/Opportunities/ManageOpportunityApplicationsScreen';
import { ApplicantFormListScreen } from '@dc/screens/UserApp/CommonApp/ApplicantFormList';
import { SharedMiddleware } from '@dc/shared/SharedMiddleware/SharedMiddleware';
import { StudentPlans } from '@dc/screens/UserApp/StudentPlans/StudentPlans';
import { VirtualInternship } from '@dc/screens/UserApp/VirtualInternship';
import { VirtualInternshipLesson } from '@dc/screens/UserApp/VirtualInternshipLesson';
import { CustomCatalog } from '@dc/screens/shared/CustomCatalog/CustomCatalog';
import { CatalogTrack } from '@dc/screens/shared/CatalogTrack/CatalogTrack';
import { PartnerRoutes } from '@dc/components/User/Routes/PartnerRoutes';

import { SharedSession, SHARED_SESSION_URL_SUFFIX } from '@shared/components/SharedSession';
import { useFeatureFlags } from '@shared/components/FeatureProvider';
import { ReportsRoutes } from '@shared/routes/ReportRoutes';
import { GuestPortfolio } from '@shared/components/GuestPortfolio/GuestPortfolio';

type Props = {
  userInfo: TUserInfo;
};

function UserRoutes({ userInfo }: Props) {
  const { TEACHER_OPPORTUNITIES_ON } = useFeatureFlags();
  const {
    commonAppData: { hasRecommenderInvitation },
    hasOpportunitiesEnabled,
    permissions: { counselor },
  } = userInfo;

  const isOpportunitiesFeatureDisabled = !TEACHER_OPPORTUNITIES_ON || !hasOpportunitiesEnabled;

  return (
    <Switch>
      <Route component={SharedMiddleware} path='/shared' />
      <Route component={UserAppDashboard} exact={true} path='/' />
      <Route path={SHARED_SESSION_URL_SUFFIX} render={() => <SharedSession type='DC' />} />
      <Route component={Student} exact={true} path='/students/:id' />
      <Route component={StudentPlans} exact={true} path='/students/:id/plans' />
      <Route component={StudentCourses} exact={true} path='/students/:id/courses' />
      <Route component={MessagingPreview} exact={true} path='/students/:id/messages' />
      <Route
        component={StudentAssessmentResults}
        exact={true}
        path='/students/:id/assessment-results'
      />
      <Route component={StudentFinalReport} exact={true} path='/students/:id/final-report' />
      <Route component={StudentPortfolio} exact={true} path='/students/:id/portfolio' />
      <Route exact={true} path='/resume/:fullName/:sharedUrl'>
        <GuestPortfolio isPublic={false} />
      </Route>
      <Route
        component={PortfolioExperiences}
        exact={true}
        path='/students/:uuid/portfolio/experiences'
      />
      <Route component={TeacherProfile} exact={true} path='/forms/teacherprofile' />
      <Route component={CounselorProfileScreen} exact={true} path='/forms/counselorprofile' />
      <Route component={UserAppMessaging} exact={true} path='/messages' />
      <Route component={ExtensionFields} exact={true} path='/extensions' />
      <Route component={ExtensionFieldScreen} exact={true} path='/extensions/:id' />
      <Route component={ExtensionEditScreen} exact={true} path='/extensions/:id/edit' />
      <Route component={Courses} exact={true} path='/courses' />
      <Route exact={true} path='/courses/:courseId' render={() => <Course teacherView={true} />} />
      <Route component={Lesson} path='/lessons/:lessonId' />
      <Route component={SchoolClass} path='/classes/:uuid' />
      <Route component={TeacherDashboard} path='/teacher-dashboard/:uuid?' />
      <Route component={EntityDashboard} path='/entity-dashboard/:uuid' />
      <Route component={CustomCatalog} exact={true} path='/catalog' />
      <Route component={CatalogTrack} path='/catalog/unit-outline/:id' />
      <Route
        component={GradingSchoolClasses}
        exact={true}
        path='/courses/:courseId/grading-schoolclasses'
      />
      <Route
        component={GradingSchoolClass}
        path='/courses/:courseId/grading-schoolclasses/:schoolClassUuid'
      />
      <Route
        exact={true}
        path='/opportunities'
        render={() =>
          isOpportunitiesFeatureDisabled ? <Redirect to='/' /> : <OpportunitiesScreen />
        }
      />
      <Route
        exact={true}
        path='/opportunities/new'
        render={() =>
          isOpportunitiesFeatureDisabled ? <Redirect to='/' /> : <CreateOpportunityScreen />
        }
      />
      <Route
        exact={true}
        path='/opportunities/:id'
        render={() =>
          isOpportunitiesFeatureDisabled ? <Redirect to='/' /> : <OpportunityScreen />
        }
      />
      <Route
        exact={true}
        path='/opportunities/:opportunityId/virtual-internship/:virtualInternshipId'
        render={() =>
          isOpportunitiesFeatureDisabled ? <Redirect to='/' /> : <VirtualInternship />
        }
      />
      <Route
        exact={true}
        path='/opportunities/:opportunityId/virtual-internship/:virtualInternshipId/lessons/:lessonId'
        render={() =>
          isOpportunitiesFeatureDisabled ? <Redirect to='/' /> : <VirtualInternshipLesson />
        }
      />
      <Route
        exact={true}
        path='/opportunities/:id/edit'
        render={() =>
          isOpportunitiesFeatureDisabled ? <Redirect to='/' /> : <EditOpportunityScreen />
        }
      />
      <Route
        exact={true}
        path='/post-secondary'
        render={() =>
          hasRecommenderInvitation || counselor ? (
            <PostSecondary />
          ) : (
            <Redirect to='/post-secondary/search' />
          )
        }
      />
      <Route component={PostSecondaryResults} exact={true} path='/post-secondary/search' />
      <Route component={StudentManagement} exact={true} path='/student-management' />
      <Route
        exact={true}
        path='/post-secondary/institutions/:id'
        render={() => <Institution isTeacher={true} />}
      />
      <Route
        exact={true}
        path='/post-secondary/commonapp-requests'
        render={() =>
          hasRecommenderInvitation ? <CommonAppRequestsScreen /> : <Redirect to='/' />
        }
      />
      <Route
        exact={true}
        path='/post-secondary/commonapp-requests/:studentUuid'
        render={() =>
          hasRecommenderInvitation ? <ApplicantFormListScreen /> : <Redirect to='/' />
        }
      />
      <Route
        component={TeQuestions}
        exact={true}
        path='/post-secondary/commonapp-requests/:studentUuid/forms/teacher-recommendation'
      />
      <Route
        component={SchoolReportScreen}
        exact={true}
        path='/post-secondary/commonapp-requests/:studentUuid/forms/secondary-report'
      />
      <Route
        component={CounselorRecommendationScreen}
        exact={true}
        path='/post-secondary/commonapp-requests/:studentUuid/forms/counselor-recommendation'
      />
      <Route
        component={CounselorOptionalReportScreen}
        exact={true}
        path='/post-secondary/commonapp-requests/:studentUuid/forms/optional-report'
      />
      <Route
        component={CounselorOptionalReport2Screen}
        exact={true}
        path='/post-secondary/commonapp-requests/:studentUuid/forms/optional-report2'
      />
      <Route
        component={CounselorMidYearReportScreen}
        exact={true}
        path='/post-secondary/commonapp-requests/:studentUuid/forms/mid-year-report'
      />
      <Route
        component={CounselorFinalReportScreen}
        exact={true}
        path='/post-secondary/commonapp-requests/:studentUuid/forms/final-report'
      />
      <Route
        component={CounselorFeeWaiverScreen}
        exact={true}
        path='/post-secondary/commonapp-requests/:studentUuid/forms/fee-waiver'
      />
      <Route
        component={CounselorEarlyDecisionScreen}
        exact={true}
        path='/post-secondary/commonapp-requests/:studentUuid/forms/early-decision'
      />
      <Route
        component={CounselorEarlyDecision2Screen}
        exact={true}
        path='/post-secondary/commonapp-requests/:studentUuid/forms/early-decision2'
      />
      <Route component={PartnerRoutes} path='/partner' />
      <Route
        path='/opportunities/:id/manage-applications/:applicantUuid?'
        render={() =>
          TEACHER_OPPORTUNITIES_ON ? <ManageOpportunityApplicationsScreen /> : <Redirect to='/' />
        }
      />
      <Route path='/reports' render={() => <ReportsRoutes userInfo={userInfo} />} />
      <Route path='/users/auth' render={() => <ReAuth type='user' />} />
      <Route path='/students/auth' render={() => <ReAuth type='student' />} />
      <Route
        path='/sign-in'
        render={() => (userInfo ? <Redirect from='/sign-in' to='/' /> : null)}
      />
      <Route>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
}

export default UserRoutes;
