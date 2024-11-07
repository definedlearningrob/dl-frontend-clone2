import { useQuery } from '@apollo/client';

import PLAN_WITH_EVALUATION, {
  TPlanWithEvaluationVariables,
  TPlanWithEvaluationData,
} from '@shared/graphql/student/query/planWithEvaluation';

const usePlanWithEvaluationQuery = (planId: string, { skip }: { skip?: boolean }) =>
  useQuery<TPlanWithEvaluationData, TPlanWithEvaluationVariables>(PLAN_WITH_EVALUATION, {
    variables: {
      id: planId,
    },
    skip,
  });

export default usePlanWithEvaluationQuery;
