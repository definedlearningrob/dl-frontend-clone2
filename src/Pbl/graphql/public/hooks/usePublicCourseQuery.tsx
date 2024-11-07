import { useQuery } from '@apollo/client';

import COURSE_DETAILS, {
  TCourseDetailsData,
  TCourseDetailsVariables,
} from '@pbl/graphql/public/queries/course';

type Params = {
  shareId: string;
  courseId: string;
  code: string;
  skip?: boolean;
};

export const usePublicCourseQuery = ({ shareId, courseId, code, skip }: Params) =>
  useQuery<TCourseDetailsData, TCourseDetailsVariables>(COURSE_DETAILS, {
    skip,
    variables: {
      shareId,
      courseId,
      code,
    },
  });
