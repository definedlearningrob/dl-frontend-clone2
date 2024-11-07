import { useQuery } from '@apollo/client';

import { VIRTUAL_INTERNSHIP_LESSON_QUERY } from '../queries/virtualInternshipLesson';

type Params = {
  opportunityId: string;
  lessonId: string;
  skip?: boolean;
  track?: boolean;
};

export const useVirtualInternshipLesson = ({
  opportunityId,
  lessonId,
  skip,
  track = true,
}: Params) =>
  useQuery(VIRTUAL_INTERNSHIP_LESSON_QUERY, {
    variables: { opportunityId, lessonId, track },
    skip,
  });
