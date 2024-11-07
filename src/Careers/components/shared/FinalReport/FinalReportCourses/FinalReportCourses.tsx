import { FinalReportCourseFragment } from '@graphql/dc/shared/operations';

import FinalReportCourse from '@dc/shared/FinalReport/FinalReportCourse/FinalReportCourse';

type Props = {
  courses: FinalReportCourseFragment[];
};

export const FinalReportCourses = ({ courses }: Props) => (
  <ul>
    {courses.map((course) => (
      <FinalReportCourse key={course.id} course={course} />
    ))}
  </ul>
);
