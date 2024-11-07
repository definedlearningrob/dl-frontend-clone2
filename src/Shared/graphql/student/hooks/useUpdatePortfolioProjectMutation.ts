import { useMutation } from '@apollo/client';

import UPDATE_PORTFOLIO_PROJECT, {
  TUpdatePortfolioProjectMutationInput,
  TUpdatePortfolioProjectData,
} from '@shared/graphql/student/mutations/updatePortfolioProject';
import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';

type Props = {
  input: TUpdatePortfolioProjectMutationInput;
  portfolioProjectType: PORTFOLIO_PROJECT_TYPES;
};

export const useUpdatePortfolioProjectMutation = () => {
  const [mutate, { error, loading }] =
    useMutation<TUpdatePortfolioProjectData>(UPDATE_PORTFOLIO_PROJECT);

  const updatePersonalProject = ({ input }: Props) =>
    mutate({
      variables: {
        input,
      },
    });

  return [updatePersonalProject, [error, loading]] as const;
};
