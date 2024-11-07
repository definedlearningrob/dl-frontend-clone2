import { Redirect, Route, Switch } from 'react-router-dom';

import Catalogs from '@dc/screens/AdminApp/Catalogs/Catalogs';
import CheckinGroups from '@dc/screens/AdminApp/CheckinGroups/CheckinGroups';
import Checkins from '@dc/screens/AdminApp/Checkins/Checkins';
import Contracts from '@dc/screens/AdminApp/Contracts/Contracts';
import Course from '@dc/screens/UserApp/Course/Course';
import Courses from '@dc/screens/AdminApp/Courses/Courses';
import EditCatalog from '@dc/screens/AdminApp/Catalog/Edit';
import EditCheckinGroup from '@dc/screens/AdminApp/CheckInGroup/Edit/Edit';
import EditCheckinQuestion from '@dc/screens/AdminApp/Checkin/Edit/Edit';
import EditCourse from '@dc/screens/AdminApp/Course/Edit';
import { EditLesson } from '@dc/screens/AdminApp/Lesson/Edit';
import EditLessonItem from '@dc/screens/AdminApp/LessonItem/EditLessonItem';
import EditPlan from '@dc/screens/AdminApp/Plan/Edit/Edit';
import EditPlanGroup from '@dc/screens/AdminApp/PlanGroup/Edit/Edit';
import EditProduct from '@dc/screens/AdminApp/Product/Edit/Edit';
import EditRubric from '@dc/screens/AdminApp/Rubric/Edit/Edit';
import EditTask from '@dc/screens/AdminApp/Task/Edit/Edit';
import EditTrack from '@dc/screens/AdminApp/Track/Edit';
import EditUnit from '@dc/screens/AdminApp/Unit/Edit/Edit';
import Entities from '@dc/screens/AdminApp/Entities/Entities';
import Entity from '@dc/screens/AdminApp/Entity/Entity';
import Lesson from '@dc/screens/UserApp/Lesson/Lesson';
import LessonItem from '@dc/screens/AdminApp/LessonItem/LessonItem';
import LessonItems from '@dc/screens/AdminApp/LessonItems/LessonItems';
import Lessons from '@dc/screens/AdminApp/Lessons/Lessons';
import Maintenance from '@dc/screens/AdminApp/Maintenance/Maintenance';
import NewCatalog from '@dc/screens/AdminApp/Catalog/New';
import { NewCheckinGroup } from '@dc/screens/AdminApp/CheckInGroup/New/New';
import NewCheckinQuestion from '@dc/screens/AdminApp/Checkin/New/New';
import NewCourse from '@dc/screens/AdminApp/Course/New';
import { NewLesson } from '@dc/screens/AdminApp/Lesson/New';
import NewLessonItem from '@dc/screens/AdminApp/LessonItem/NewLessonItem';
import NewPlan from '@dc/screens/AdminApp/Plan/New/New';
import NewPlanGroup from '@dc/screens/AdminApp/PlanGroup/New/New';
import AdminAppPresentationBuilder from '@dc/screens/AdminApp/PresentationsBuilder/PresentationsBuilder';
import PresentationPreview from '@dc/screens/AdminApp/PresentationPreview/PresentationPreviewScreen';
import PresentationPrint from '@dc/components/Admin/Tasks/PresentationBuilder/PresentationPrint/PresentationPrint';
import NewProduct from '@dc/screens/AdminApp/Product/New/New';
import NewTask from '@dc/screens/AdminApp/Task/New/New';
import NewTrack from '@dc/screens/AdminApp/Track/New';
import NewUnit from '@dc/screens/AdminApp/Unit/New/New';
import PlanGroups from '@dc/screens/AdminApp/PlanGroups/PlanGroups';
import Plans from '@dc/screens/AdminApp/Plans/Plans';
import Products from '@dc/screens/AdminApp/Products/Products';
import ReAuth from '@dc/components/ReAuth';
import Rubrics from '@dc/screens/AdminApp/Rubrics/Rubrics';
import SchoolClass from '@dc/screens/AdminApp/SchoolClass/SchoolClass';
import SchoolClasses from '@dc/screens/AdminApp/SchoolClasses/SchoolClasses';
import StandardSetEdit from '@dc/screens/AdminApp/StandardSet/Edit/Edit';
import StandardSets from '@dc/screens/AdminApp/StandardSets/StandardSets';
import Student from '@dc/screens/AdminApp/Student/Student';
import StudentSettings from '@dc/screens/AdminApp/StudentSettings/StudentSettings';
import Students from '@dc/screens/AdminApp/Students/Students';
import Tasks from '@dc/screens/AdminApp/Tasks/Tasks';
import Tracks from '@dc/screens/AdminApp/Tracks/Tracks';
import Units from '@dc/screens/AdminApp/Units/Units';
import User from '@dc/screens/AdminApp/User/User';
import Users from '@dc/screens/AdminApp/Users/Users';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { VirtualInternshipsScreen } from '@dc/screens/AdminApp/VirtualInternships';
import { CreateVirtualInternshipsScreen } from '@dc/screens/AdminApp/VirtualInternships/CreateVirtualInternshipsScreen';
import { VirtualInternshipScreen } from '@dc/screens/AdminApp/VirtualInternships/VirtualInternshipScreen';
import { SharedMiddleware } from '@dc/shared/SharedMiddleware/SharedMiddleware';
import { BadgesManagement } from '@dc/screens/AdminApp/BadgesManagement/BadgesManagement';
import { BadgeFormView } from '@dc/screens/AdminApp/BadgesManagement/Badge/BadgeFormView';
import { TagsManagment } from '@dc/screens/AdminApp/TagsManagment/TagsManagment';
import { TagsFormView } from '@dc/screens/AdminApp/TagsManagment/TagsFormView/TagsFormView';
import { PartnerRoutes } from '@dc/components/User/Routes/PartnerRoutes';

type Props = {
  userInfo: TUserInfo;
};

function AdminRoutes({ userInfo }: Props) {
  return (
    <Switch>
      <Route component={SharedMiddleware} path='/shared' />
      <Route component={Catalogs} exact={true} path='/admin/catalogs' />
      <Route component={Checkins} exact={true} path='/admin/check-ins' />
      <Route component={CheckinGroups} exact={true} path='/admin/checkin-groups' />
      <Route component={Contracts} path='/admin/contracts' />
      <Route component={Courses} exact={true} path='/admin/courses' />
      <Route component={VirtualInternshipsScreen} exact={true} path='/admin/virtual-internships' />
      <Route component={TagsManagment} exact={true} path='/admin/performance-indicators' />
      <Route component={TagsFormView} exact={true} path='/admin/performance-indicators/new' />
      <Route component={TagsFormView} exact={true} path='/admin/performance-indicators/:id/edit' />
      <Route component={BadgesManagement} exact={true} path='/admin/badges' />
      <Route component={BadgeFormView} exact={true} path='/admin/badges/new' />
      <Route component={BadgeFormView} exact={true} path='/admin/badges/:id/edit' />
      <Route
        component={CreateVirtualInternshipsScreen}
        exact={true}
        path='/admin/virtual-internships/new'
      />
      <Route
        component={VirtualInternshipScreen}
        exact={true}
        path='/admin/virtual-internships/:id'
      />
      <Route
        component={CreateVirtualInternshipsScreen}
        exact={true}
        path='/admin/virtual-internships/:id/edit'
      />
      <Route component={EditCatalog} path='/admin/catalogs/:id/edit' />
      <Route component={EditCheckinQuestion} exact={true} path='/admin/check-ins/:id/edit' />
      <Route component={EditCheckinGroup} exact={true} path='/admin/checkin-groups/:id/edit' />
      <Route component={EditCourse} exact={true} path='/admin/courses/:id/edit' />
      <Route component={EditLesson} exact={true} path='/admin/lesson/:id/edit' />
      <Route component={EditLessonItem} exact={true} path='/admin/lesson-items/:type/:id/edit' />
      <Route component={EditPlan} exact={true} path='/admin/plans/:id/edit' />
      <Route component={EditPlanGroup} exact={true} path='/admin/plan-groups/:id/edit' />
      <Route component={EditProduct} exact={true} path='/admin/products/:id/edit' />
      <Route component={EditRubric} exact={true} path='/admin/rubrics/:rubricId/edit' />
      <Route component={EditTask} exact={true} path='/admin/tasks/:id/edit' />
      <Route component={EditTrack} path='/admin/tracks/:id/edit' />
      <Route component={EditUnit} path='/admin/units/:id/edit' />
      <Route component={Entities} exact={true} path='/admin/entities' />
      <Route component={SchoolClasses} exact={true} path='/admin/school-classes' />
      <Route component={SchoolClass} path='/admin/school-classes/:schoolClassUuid' />
      <Route component={Students} exact={true} path='/admin/students' />
      <Route component={StudentSettings} path='/admin/students/:studentUuid/settings' />
      <Route component={Student} path='/admin/students/:id' />
      <Route component={Users} exact={true} path='/admin/users' />
      <Route component={User} path='/admin/users/:userUuid' />
      <Route component={Entity} exact={true} path='/admin/entities/:entityUuid' />
      <Route component={NewLessonItem} exact={true} path='/admin/lesson-items/:type/new' />
      <Route component={LessonItem} path='/admin/lesson-items/:type/:id' />
      <Route component={LessonItems} path='/admin/lesson-items' />
      <Route component={Lessons} exact={true} path='/admin/lessons' />
      <Route component={NewCatalog} path='/admin/catalogs/new' />
      <Route component={NewCheckinQuestion} path='/admin/check-ins/new' />
      <Route component={NewCheckinGroup} path='/admin/checkin-groups/new' />
      <Route component={NewCourse} exact={true} path='/admin/courses/new' />
      <Route component={Course} exact={true} path='/admin/courses/:courseId' />
      <Route component={NewLesson} exact={true} path='/admin/lessons/new' />
      <Route component={Lesson} exact={true} path='/admin/lessons/:lessonId' />
      <Route component={Maintenance} exact={true} path='/admin/maintenance' />
      <Route component={NewPlan} exact={true} path='/admin/plans/new' />
      <Route component={NewPlanGroup} exact={true} path='/admin/plan-groups/new' />
      <Route component={NewProduct} exact={true} path='/admin/products/new' />
      <Route component={NewTask} exact={true} path='/admin/tasks/new' />
      <Route component={NewTrack} exact={true} path='/admin/tracks/new' />
      <Route component={NewUnit} path='/admin/units/new' />
      <Route component={Products} exact={true} path='/admin/products' />
      <Route component={PlanGroups} exact={true} path='/admin/plan-groups' />
      <Route component={Plans} exact={true} path='/admin/plans' />
      <Route component={Rubrics} exact={true} path='/admin/rubrics' />
      <Route component={Tasks} exact={true} path='/admin/tasks' />
      <Route component={Tracks} exact={true} path='/admin/tracks' />
      <Route component={Units} exact={true} path='/admin/units' />
      <Route component={StandardSets} exact={true} path='/admin/standard-sets' />
      <Route
        component={StandardSetEdit}
        exact={true}
        path='/admin/standard-sets/:standardSetId/edit'
      />
      <Route component={ReAuth} path='/users/auth' />
      <Route component={ReAuth} path='/students/auth' />
      <Route
        path='/sign-in'
        render={() => (userInfo ? <Redirect from='/sign-in' to='/' /> : null)}
      />
      <Route
        component={AdminAppPresentationBuilder}
        exact={true}
        path='/admin/tasks/:taskId/presentation-builder'
      />
      <Route
        component={PresentationPreview}
        exact={true}
        path='/admin/tasks/:taskId/presentation-preview'
      />
      <Route
        component={PresentationPrint}
        exact={true}
        path='/admin/tasks/:taskId/presentation-print'
      />
      <Route
        component={AdminAppPresentationBuilder}
        exact={true}
        path='/admin/slides/presentation-builder'
      />
      <Route
        component={PresentationPreview}
        exact={true}
        path='/admin/slides/presentation-preview'
      />
      <Route component={PartnerRoutes} path='/partner' />
      <Route>
        <Redirect to='/admin/courses' />
      </Route>
    </Switch>
  );
}

export default AdminRoutes;
