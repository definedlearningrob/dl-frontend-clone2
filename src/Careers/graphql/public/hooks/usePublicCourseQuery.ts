import { useQuery } from '@apollo/client';

import { PUBLIC_COURSE_QUERY } from '@dc/graphql/public/queries/course';

type Params = {
  skip?: boolean;
  code: string;
  shareId: string;
};

export const usePublicCourseQuery = ({ skip, code, shareId }: Params) =>
  useQuery(PUBLIC_COURSE_QUERY, {
    skip,
    variables: { code, shareId, track: true },
  });
