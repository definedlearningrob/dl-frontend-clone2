import { useMutation } from '@apollo/client';

import CREATE_EVALUATION, {
  TCreateEvaluationMutationInput,
  TCreateEvaluationData,
} from '@shared/graphql/user/mutations/createEvaluation';
import PORTFOLIO_PLANS from '@shared/graphql/student/query/portfolioPlans';
import STUDENT_PORTFOLIO_PLANS from '@shared/graphql/user/query/studentPortfolioPlans';
import { useRole } from '@shared/hooks/useRole';

type Params = {
  input: TCreateEvaluationMutationInput;
};

export const useCreateUserEvaluationMutation = () => {
  const [mutate, { error, loading }] = useMutation<TCreateEvaluationData>(CREATE_EVALUATION);
  const { isUser } = useRole();

  const createUserEvaluation = ({ input }: Params) =>
    mutate({
      variables: {
        input,
      },
      refetchQueries: [
        {
          query: isUser ? STUDENT_PORTFOLIO_PLANS : PORTFOLIO_PLANS,
          variables: {
            uuid: input.studentUuid,
          },
        },
      ],
      awaitRefetchQueries: true,
    });

  return [createUserEvaluation, { error, loading }] as const;
};
