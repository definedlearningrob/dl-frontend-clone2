import { useQuery } from '@apollo/client';

import COURSE_DETAILS, {
  TCourseDetailsData,
  TCourseDetailsVariables,
} from '@pbl/graphql/shared/queries/course';

type Params = {
  projectId: string;
  courseId: string;
  skip?: boolean;
};

export const useCourseDetailsQuery = ({ projectId, courseId, skip }: Params) =>
  useQuery<TCourseDetailsData, TCourseDetailsVariables>(COURSE_DETAILS, {
    skip,
    variables: {
      projectId,
      courseId,
    },
  });
