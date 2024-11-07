import { useQuery } from '@apollo/client';

import CURRENT_COURSES, { TCurrentCoursesData } from '@dc/graphql/student/queries/currentCourses';

type Params = {
  skip?: boolean;
};

export const useCurrentCoursesQuery = ({ skip }: Params = {}) =>
  useQuery<TCurrentCoursesData>(CURRENT_COURSES, {
    skip,
  });
