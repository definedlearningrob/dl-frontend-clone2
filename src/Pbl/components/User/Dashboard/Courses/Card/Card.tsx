import { useHistory } from 'react-router-dom';

import type { TDashboardCoursesTrack } from '@pbl/graphql/user/queries/dashboardCourses';
import '@pbl/components/User/Dashboard/Courses/Card/Card.sass';
import CourseCardContent from '@pbl/components/User/Dashboard/Courses/Card/CourseCardContent';

type Props = {
  course: TDashboardCoursesTrack;
};

export const Card = ({ course }: Props) => {
  const { id, grades } = course;
  const history = useHistory();

  const goToCourse = () => history.push(`/courses/${id}`);

  return <CourseCardContent course={course} grades={grades} onClick={goToCourse} />;
};
