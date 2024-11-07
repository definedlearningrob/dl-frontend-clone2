import { useMutation } from '@apollo/client';

import {
  CREATE_PLAN_GROUP_STATEMENT_EVIDENCE,
  TCreatePlanGroupStatementVariables,
} from '@shared/graphql/shared/mutations/createPlanGroupStatementEvidence';

type Params = {
  studentUuid?: string;
};

export const useCreateEvidence = ({ studentUuid }: Params) => {
  const [mutate, { loading }] = useMutation(CREATE_PLAN_GROUP_STATEMENT_EVIDENCE);

  const createEvidence = async ({
    evidences,
    planGroupStatementId,
  }: TCreatePlanGroupStatementVariables['input']) =>
    mutate({
      variables: {
        input: {
          evidences,
          planGroupStatementId,
          studentUuid,
        },
      },
    });

  return [createEvidence, { loading }] as const;
};
