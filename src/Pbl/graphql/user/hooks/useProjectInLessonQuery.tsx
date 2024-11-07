import { useQuery } from '@apollo/client';

import PROJECT_IN_LESSON, {
  type TLessonWithProjectData,
  type TLessonWithProjectVariables,
} from '@pbl/graphql/user/queries/lessonWithProject';

const useProjectInLessonQuery = (lessonId: string, projectId: string, skip?: boolean) =>
  useQuery<TLessonWithProjectData, TLessonWithProjectVariables>(PROJECT_IN_LESSON, {
    skip,
    variables: {
      lessonId,
      projectId,
      trackPresentation: true,
      track: true,
    },
  });

export default useProjectInLessonQuery;
