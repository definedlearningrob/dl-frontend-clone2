import { TypedDocumentNode, gql } from '@apollo/client';

import { TEvidence } from '@shared/resources/types';

export const DELETE_PLAN_GROUP_STATEMENT_EVIDENCE: TypedDocumentNode<
  TDeletePlanGroupStatementEvidenceData,
  TDeletePlanGroupStatementVariables
> = gql`
  mutation DeletePlanGroupStatementEvidenceMutation(
    $input: DeletePlanGroupStatementEvidenceMutationInput!
  ) {
    deletePlanGroupStatementEvidence(input: $input) {
      planGroupStatement {
        id
        evidences {
          id
          itemId
          label
          type
          contextType
          service
          updatedAt
          isTeamSubmission
        }
      }
    }
  }
`;

export type TDeletePlanGroupStatementEvidenceData = {
  deletePlanGroupStatementEvidence: {
    planGroupStatement: {
      id: string;
      evidences: TEvidence[];
    };
  };
};

export type TDeletePlanGroupStatementVariables = {
  input: {
    id: string;
  };
};
