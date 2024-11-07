import { PureQueryOptions, useMutation } from '@apollo/client';

import ENROLL_IN_COURSE, {
  EnrollInCourseData,
  EnrollInCourseVariables,
} from '../mutations/enrollInCourse';

type EnrollInCourseParams = {
  courseId: string;
  refetchQueries?: PureQueryOptions[];
};

export const useEnrollInCourse = () => {
  const [mutate, { loading }] = useMutation<EnrollInCourseData, EnrollInCourseVariables>(
    ENROLL_IN_COURSE
  );

  const enrollInCourse = async ({ courseId, refetchQueries }: EnrollInCourseParams) =>
    await mutate({
      variables: { input: { courseId } },
      refetchQueries: refetchQueries || [],
      awaitRefetchQueries: true,
      update(cache, { data }) {
        cache.modify({
          fields: {
            currentCourses(existing, { toReference }) {
              const returnedCourse = data?.enrollInCourse?.course;
              const returnedCourseRef = toReference({
                __typename: 'Course',
                id: returnedCourse?.id,
              });

              return returnedCourse ? [...existing, returnedCourseRef] : existing;
            },
            recommendedCourses(existing, { readField }) {
              const returnedCourse = data?.enrollInCourse?.course;

              return returnedCourse
                ? // We don't know structure of the data in cache since it can be merged with different queries
                  existing.filter(
                    (filteredCourse: any) => readField('id', filteredCourse) !== returnedCourse.id
                  )
                : existing;
            },
          },
        });
      },
    });

  return [enrollInCourse, { loading }] as const;
};
