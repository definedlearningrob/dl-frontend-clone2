import { useMutation } from '@apollo/client';

import CREATE_PORTFOLIO_PROJECT_FILE, {
  TCreatePortfolioProjectFileMutationInput,
  TCreatePortfolioProjectFileData,
} from '@shared/graphql/student/mutations/createPortfolioProjectFile';
import PORTFOLIO_PROJECTS from '@shared/graphql/student/query/portfolioProjects';
import { PORTFOLIO_PROJECT_TYPES } from '@shared/resources/enums';

type Props = {
  input: TCreatePortfolioProjectFileMutationInput;
  portfolioProjectType: PORTFOLIO_PROJECT_TYPES;
};

export const useCreatePortfolioProjectFileMutation = () => {
  const [mutate, { error, loading }] = useMutation<TCreatePortfolioProjectFileData>(
    CREATE_PORTFOLIO_PROJECT_FILE
  );

  const createPortfolioProjectFile = ({ input, portfolioProjectType }: Props) =>
    mutate({
      variables: { input },
      refetchQueries: [{ query: PORTFOLIO_PROJECTS, variables: { type: portfolioProjectType } }],
    });

  return [createPortfolioProjectFile, { error, loading }] as const;
};
