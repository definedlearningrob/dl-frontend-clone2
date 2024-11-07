import { useQuery } from '@apollo/client';

import { TUserCoursesVariables, USER_COURSES_QUERY } from '../queries/userCourses';

export const useUserCourses = (variables: TUserCoursesVariables) =>
  useQuery(USER_COURSES_QUERY, { variables });
