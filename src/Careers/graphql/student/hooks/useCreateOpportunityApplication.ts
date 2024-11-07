import { useMutation } from '@apollo/client';

import { CREATE_OPPORTUNITY_APPLICATION } from '@dc/graphql/student/mutations/createOpportunityApplication';
import MY_OPPORTUNITIES from '@dc/graphql/student/queries/myOpportunities';
import { OPPORTUNITY_QUERY } from '@dc/graphql/student/queries/opportunity';

export type OpportunityQuestionAnswers = {
  questionId: string;
  answer: string;
};
export type OpportunityApplication = {
  opportunityId: number;
  answers?: OpportunityQuestionAnswers[];
};

export const useCreateOpportunityApplication = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_OPPORTUNITY_APPLICATION);

  const applyToOpportunity = async ({ opportunityId, answers = [] }: OpportunityApplication) => {
    await mutate({
      variables: {
        input: { opportunityId, answers },
      },
      refetchQueries: [
        { query: MY_OPPORTUNITIES },
        { query: OPPORTUNITY_QUERY, variables: { id: opportunityId } },
      ],
    });
  };

  return [applyToOpportunity, { loading, error }] as const;
};
