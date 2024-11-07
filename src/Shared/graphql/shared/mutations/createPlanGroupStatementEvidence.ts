import { TypedDocumentNode, gql } from '@apollo/client';

import { EVIDENCE_KIND } from '@shared/resources/enums';
import { TEvidence } from '@shared/resources/types';

export const CREATE_PLAN_GROUP_STATEMENT_EVIDENCE: TypedDocumentNode<
  TCreatePlanGroupStatementEvidenceData,
  TCreatePlanGroupStatementVariables
> = gql`
  mutation CreatePlanGroupStatementEvidenceMutation(
    $input: CreatePlanGroupStatementEvidenceMutationInput!
  ) {
    createPlanGroupStatementEvidence(input: $input) {
      planGroupStatement {
        id
        evidences {
          itemId
          id
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

export type TCreatePlanGroupStatementEvidenceData = {
  createPlanGroupStatementEvidence: {
    planGroupStatement: {
      id: string;
      evidences: TEvidence[];
    };
  };
};

export type TCreatePlanGroupStatementVariables = {
  input: {
    planGroupStatementId: string;
    evidences: { itemType: EVIDENCE_KIND; itemId: string }[];
    studentUuid?: string;
  };
};
