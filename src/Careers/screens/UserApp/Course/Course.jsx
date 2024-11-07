import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CourseHeader from '@dc/components/User/Course/Header/Header';
import { UserCourseLessons } from '@dc/components/User/Course/Lessons/Lessons';
import courseQuery from '@dc/graphql/user/queries/course';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import UserCourseSkeleton from '@dc/components/User/Course/Skeleton/CourseSkeleton';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

UserAppCourse.propTypes = {
  teacherView: PropTypes.bool,
};

function UserAppCourse({ teacherView }) {
  const { courseId } = useParams();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return (
    <SharedMainContent>
      <SharedDataLoader
        SpinnerComponent={<UserCourseSkeleton teacherView={teacherView} />}
        options={{
          variables: {
            id: courseId,
            track: true,
          },
        }}
        query={courseQuery}>
        {({ course: { description, name, lessons, pathway, sharedResource } }) => (
          <section className='course'>
            <CourseHeader
              description={description}
              name={name}
              pathway={pathway}
              sharedResource={sharedResource}
              teacherView={teacherView}
            />
            <UserCourseLessons lessons={lessons} />
          </section>
        )}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default UserAppCourse;
