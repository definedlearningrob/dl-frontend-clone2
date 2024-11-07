import { useQuery } from '@apollo/client';

import STUDENT_PORTFOLIO_PLAN_WITH_EVALUATION, {
  TStudentPortfolioPlanWithEvaluationVariables,
  TStudentPortfolioPlanWithEvaluationData,
} from '@shared/graphql/user/query/studentPortfolioPlanWithEvaluation';

const useStudentPortfolioPlanWithEvaluationQuery = (
  studentUuid: string,
  planId: string,
  { skip }: { skip?: boolean }
) =>
  useQuery<TStudentPortfolioPlanWithEvaluationData, TStudentPortfolioPlanWithEvaluationVariables>(
    STUDENT_PORTFOLIO_PLAN_WITH_EVALUATION,
    {
      variables: {
        uuid: studentUuid,
        id: planId,
      },
      skip,
    }
  );

export default useStudentPortfolioPlanWithEvaluationQuery;
