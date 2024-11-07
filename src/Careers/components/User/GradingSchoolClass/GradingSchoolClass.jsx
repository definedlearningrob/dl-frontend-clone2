import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import StudentItem from '@dc/components/User/GradingSchoolClass/StudentItem/StudentItem';
import { CourseActivityProvider } from '@dc/hooks/useCourseActivity';
import '@dc/components/User/GradingSchoolClass/GradingSchoolClass.sass';

UserGradingSchoolClass.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
  refetchSchoolClass: PropTypes.func,
  students: PropTypes.arrayOf(
    PropTypes.shape({
      course: PropTypes.shape({
        name: PropTypes.string,
      }),
      firstName: PropTypes.string,
      gradingNeeded: PropTypes.bool,
      lastName: PropTypes.string,
      uuid: PropTypes.string,
    })
  ),
};

function UserGradingSchoolClass({ refetchSchoolClass, name, parentName, students }) {
  const { courseId } = useParams();
  const { t } = useTranslation();

  return (
    <section data-testid='grading-schoolclass'>
      <h1 className='grading-schoolclass__course-heading'>
        {t('user.grading.heading', { courseName: students[0]?.course.name })}
      </h1>
      <h2 className='grading-schoolclass__class-subheading'>{parentName}</h2>
      <h2 className='grading-schoolclass__class-heading'>{name}</h2>
      <p className='grading-schoolclass__list-title'>{t('user.grading.students')}</p>
      <ul>
        {students.map((student) => (
          <CourseActivityProvider
            key={student.uuid}
            courseId={courseId}
            refetchQuery={refetchSchoolClass}
            studentUuid={student.uuid}>
            <StudentItem student={student} />
          </CourseActivityProvider>
        ))}
      </ul>
    </section>
  );
}

export default UserGradingSchoolClass;
