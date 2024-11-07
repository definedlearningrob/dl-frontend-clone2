import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { LOCAL_STORAGE_COURSE_ID } from '@dc/resources/localStorageKeys';
import { useEnrollInCourse } from '@dc/graphql/student/hooks/useEnrollInCourse';

import { LOCAL_STORAGE_SHARED_CONFIG } from '@shared/resources/localStorageKeys';

const courseId = localStorage.getItem(LOCAL_STORAGE_COURSE_ID);
const hasLoadedCourse = courseId !== null;

const useSelfAssign = () => {
  const [enrollInCourse, { loading }] = useEnrollInCourse();
  const history = useHistory();

  const handleEnrollInCourse = async (courseId: string) => {
    await enrollInCourse({
      courseId,
    });

    history.replace(`/courses/${courseId}`);
  };

  useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE_SHARED_CONFIG);

    if (hasLoadedCourse) {
      localStorage.removeItem(LOCAL_STORAGE_COURSE_ID);
      handleEnrollInCourse(courseId);
    }
  }, []);

  return { hasLoadedCourse, loading };
};

export default useSelfAssign;
