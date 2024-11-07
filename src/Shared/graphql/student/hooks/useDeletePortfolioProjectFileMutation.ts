import { useMutation } from '@apollo/client';

import DELETE_PORTFOLIO_PROJECT_FILE, {
  TDeletePortfolioProjectFileData,
} from '@shared/graphql/student/mutations/deletePortfolioProjectFile';
import { removeFromCache } from '@shared/utils/graphql';

export const useDeletePortfolioProjectFileMutation = () => {
  const [mutate, { error, loading }] = useMutation<TDeletePortfolioProjectFileData>(
    DELETE_PORTFOLIO_PROJECT_FILE
  );

  const deletePortfolioProjectFile = (id: string) =>
    mutate({
      variables: {
        input: { id },
      },
      update: removeFromCache({ id, __typename: 'PortfolioSubmissionFile' }),
    });

  return [deletePortfolioProjectFile, { error, loading }] as const;
};
