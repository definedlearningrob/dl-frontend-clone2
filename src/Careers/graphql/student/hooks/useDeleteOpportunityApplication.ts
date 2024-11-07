import { useMutation } from '@apollo/client';

import { DELETE_OPPORTUNITY_APPLICATION } from '@dc/graphql/student/mutations/deleteOpportunityApplication';
import { OPPORTUNITY_QUERY } from '@dc/graphql/student/queries/opportunity';
import MY_OPPORTUNITIES from '@dc/graphql/student/queries/myOpportunities';

type ApplicationId = {
  opportunityApplicationId: string;
  opportunityId?: string;
};

export const useDeleteOpportunityApplication = () => {
  const [mutate, { loading, error }] = useMutation(DELETE_OPPORTUNITY_APPLICATION);

  const deleteOpportunityApplication = async ({
    opportunityApplicationId,
    opportunityId,
  }: ApplicationId) => {
    await mutate({
      variables: {
        input: {
          opportunityApplicationId,
        },
      },
      refetchQueries: [
        {
          query: OPPORTUNITY_QUERY,
          variables: {
            id: opportunityId,
            track: false,
          },
        },
        { query: MY_OPPORTUNITIES, variables: { page: 1, perPage: 100 } },
      ],
      awaitRefetchQueries: true,
    });
  };

  return [deleteOpportunityApplication, { loading, error }] as const;
};
