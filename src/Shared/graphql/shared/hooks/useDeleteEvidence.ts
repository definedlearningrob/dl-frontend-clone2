import { ApolloError, useMutation } from '@apollo/client';

import { DELETE_PLAN_GROUP_STATEMENT_EVIDENCE } from '@shared/graphql/shared/mutations/deletePlanGroupStatementEvidence';

type Params = {
  id: string;
  onCompleted?: () => void;
  onError: (error: ApolloError | unknown) => void;
};

export const useDeleteEvidence = () => {
  const [mutate, { loading }] = useMutation(DELETE_PLAN_GROUP_STATEMENT_EVIDENCE);

  const deleteEvidence = async ({ id, onCompleted, onError }: Params) =>
    mutate({
      variables: {
        input: { id },
      },
      onCompleted,
      onError,
    });

  return [deleteEvidence, { loading }] as const;
};
