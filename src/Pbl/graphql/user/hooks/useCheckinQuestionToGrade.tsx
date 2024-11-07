import { QueryHookOptions, useQuery } from '@apollo/client';

import CHECKIN_QUESTION_TO_GRADE, {
  TCheckinQuestionToGradeData,
  TCheckinQuestionToGradeVariables,
} from '@pbl/graphql/user/queries/checkinQuestionToGrade';

const useCheckinToGrade = (
  projectId: string,
  questionId: string,
  subjectUuid: string,
  isTeamGrading?: boolean
) => {
  const queryOptions: QueryHookOptions<
    TCheckinQuestionToGradeData,
    TCheckinQuestionToGradeVariables
  > = subjectUuid
    ? {
        variables: {
          projectId,
          questionId,
          subjectUuid,
          isTeamGrading,
        },
      }
    : {
        skip: true,
      };

  const checkInQuestion = useQuery<TCheckinQuestionToGradeData, TCheckinQuestionToGradeVariables>(
    CHECKIN_QUESTION_TO_GRADE,
    queryOptions
  );

  return checkInQuestion;
};

export type { TCheckinQuestionToGradeData };

export default useCheckinToGrade;
