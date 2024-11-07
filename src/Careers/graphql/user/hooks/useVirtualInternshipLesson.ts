import { useQuery } from '@apollo/client';

import { VIRTUAL_INTERNSHIP_LESSON } from '../queries/virtualInternshipLesson';

type Params = {
  virtualInternshipId: string;
  lessonId: string;
  skip?: boolean;
  track?: boolean;
};

export const useVirtualInternshipLesson = ({
  virtualInternshipId,
  lessonId,
  skip,
  track = true,
}: Params) =>
  useQuery(VIRTUAL_INTERNSHIP_LESSON, {
    variables: { virtualInternshipId, lessonId, track },
    skip,
  });
