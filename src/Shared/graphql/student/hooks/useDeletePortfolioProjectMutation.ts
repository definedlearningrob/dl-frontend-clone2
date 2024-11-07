import { FetchResult, useMutation } from '@apollo/client';

import DELETE_PORTFOLIO_PROJECT, {
  TDeletePortfolioProjectMutationInput,
  TDeletePortfolioProjectData,
} from '@shared/graphql/student/mutations/deletePortfolioProject';
import { removeFromCache } from '@shared/utils/graphql';

export const useDeletePortfolioProjectMutation = () => {
  const [mutate, { error, loading }] = useMutation<
    TDeletePortfolioProjectData,
    TDeletePortfolioProjectMutationInput
  >(DELETE_PORTFOLIO_PROJECT);

  const deletePortfolioProject = (
    portfolioProjectId: string
  ): Promise<FetchResult<TDeletePortfolioProjectData>> =>
    mutate({
      variables: {
        input: {
          id: portfolioProjectId,
        },
      },
      update: removeFromCache({
        id: portfolioProjectId,
        resourceClass: 'PORTFOLIO_PROJECT',
        __typename: 'PortfolioProject',
      }),
    });

  return [deletePortfolioProject, { error, loading }] as const;
};
