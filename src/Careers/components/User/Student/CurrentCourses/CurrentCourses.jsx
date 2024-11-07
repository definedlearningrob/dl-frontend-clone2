import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Card from '@dc/components/User/Student/CurrentCourses/Card/Card';
import { COURSE_TYPES } from '@dc/resources/constants';
import { shapeStudent } from '@dc/resources/typeDefs';

import { ReactComponent as AddIcon } from '@shared/svg/add.svg';
import SharedIcon from '@shared/components/Icon/Icon';

UserStudentCurrentCourses.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      progress: PropTypes.shape({
        submitted: PropTypes.number,
        total: PropTypes.number,
      }),
      type: PropTypes.oneOf([COURSE_TYPES.HIGH_SCHOOL, COURSE_TYPES.MIDDLE_SCHOOL]),
    })
  ),
  student: shapeStudent,
};

function UserStudentCurrentCourses({ courses, student }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const history = useHistory();

  const goToCoursesAssignment = () => history.push(`/students/${id}/courses`);

  return (
    <div className='user-student__current-courses'>
      <div className='user-student__current-courses-header'>
        <h2 className='user-student__current-courses-header__title'>
          {t('user.student.currentCourses.header')}
        </h2>
        <button
          className='user-student__current-courses__assign-button'
          onClick={goToCoursesAssignment}>
          <SharedIcon icon={<AddIcon />} size='sm' />
          {t('user.student.currentCourses.assignCourse')}
        </button>
      </div>
      <div className='user-student__current-courses-list'>
        {courses.map((course) => (
          <Card key={course.id} course={course} student={student} />
        ))}
      </div>
    </div>
  );
}

export default UserStudentCurrentCourses;
