import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DashboardRecommendedCard from '@dc/components/Dashboard/RecommendedCourses/RecommendedCard/RecommendedCard';
import recommendedCoursesQuery from '@dc/graphql/student/queries/recommendedCourses';
import studentRecommendedCoursesQuery from '@dc/graphql/user/queries/studentRecommendedCourses';

import SharedCarousel from '@shared/components/Carousel/Carousel';
import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

import StudentCoursesRecommendedListSkeleton from './Skeleton/RecommendedListSkeleton';
import styles from './RecommendedList.module.sass';

StudentCoursesRecommendedList.propTypes = {
  selectCourse: PropTypes.func,
  teacherView: PropTypes.bool,
};

function StudentCoursesRecommendedList({ selectCourse, teacherView }) {
  const { t } = useTranslation();
  const { id } = useParams();

  const loaderProps = teacherView
    ? { query: studentRecommendedCoursesQuery, options: { variables: { uuid: id } } }
    : { query: recommendedCoursesQuery, options: { variables: { uuid: id } } };

  const extractCourses = (data) => {
    const courses = teacherView ? data.student.recommendedCourses : data.recommendedCourses;

    return courses.map((course) => (
      <DashboardRecommendedCard
        key={course.id}
        className={styles.cardInList}
        course={course}
        teacherView={teacherView}
        onEnroll={selectCourse}
      />
    ));
  };

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h2 className={styles.heading}>{t('student.courses.recommended')}</h2>
        <h4 className={styles.subHeading}>
          {teacherView
            ? t('user.student.courses.recommendedSubtitle')
            : t('student.courses.recommendedSubtitle')}
        </h4>
      </header>
      <SharedDataLoader
        SpinnerComponent={<StudentCoursesRecommendedListSkeleton />}
        {...loaderProps}>
        {(dataToExtract) => <SharedCarousel data={extractCourses(dataToExtract)} />}
      </SharedDataLoader>
    </section>
  );
}

export default StudentCoursesRecommendedList;
