import { useQuery } from '@apollo/client';

import { AVAILABLE_TEACHERS_QUERY } from '@dc/graphql/student/queries/availableTeachers';

type Params = {
  skip?: boolean;
};

export const useAvailableTeachersQuery = ({ skip }: Params = {}) =>
  useQuery(AVAILABLE_TEACHERS_QUERY, { skip });
