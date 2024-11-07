import { useQuery, FetchPolicy } from '@apollo/client';

import COURSE, { TCourseData, TCourseVariables } from '@dc/graphql/student/queries/course';

type Params = {
  id: string;
  track: boolean;
  skip?: boolean;
  fetchPolicy?: FetchPolicy;
};

export const useCourseQuery = ({ id, track, skip, fetchPolicy }: Params) =>
  useQuery<TCourseData, TCourseVariables>(COURSE, {
    skip,
    fetchPolicy,
    variables: {
      id,
      track,
    },
  });
