import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import CourseActivityCourse from '@dc/components/User/Student/CoursesActivity/Course/Course';
import { CourseActivityProvider } from '@dc/hooks/useCourseActivity';

UserStudentCoursesActivity.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
  setupMessageModal: PropTypes.func,
};

function UserStudentCoursesActivity({ courses, setupMessageModal }) {
  const { t } = useTranslation();
  const { id } = useParams();

  const renderCoursesActivities = () =>
    courses.length > 0 ? (
      courses.map((course, index) => (
        <CourseActivityProvider key={course.id} courseId={course.id} studentUuid={id}>
          <CourseActivityCourse
            course={course}
            extended={index === 0}
            setupMessageModal={setupMessageModal}
          />
        </CourseActivityProvider>
      ))
    ) : (
      <div>{t('user.student.coursesActivity.noActivity')}</div>
    );

  return (
    <div className='user-student__courses-activity'>
      <h2 className='user-student__courses-activity__header'>
        {t('user.student.coursesActivity.header')}
      </h2>
      <div className='user-student__courses-activity-list-wrapper'>
        <ul className='user-student__courses-activity-list'>{renderCoursesActivities()}</ul>
      </div>
    </div>
  );
}

export default UserStudentCoursesActivity;
