import { gql } from '@apollo/client';

import { TCheckInTeamSubmission } from '@pbl/components/Project/types';

export default gql`
  mutation CreateTeamCheckInSubmission($input: CreateTeamCheckInSubmissionMutationInput!) {
    createTeamCheckInSubmission(input: $input) {
      teamCheckInSubmission {
        id
        grade {
          status
          createdAt
          updatedAt
          lastGradedBy {
            firstName
            lastName
          }
        }
        answers {
          answer
          id
          student {
            uuid
            firstName
            lastName
          }
          updatedAt
        }
        canSubmit
      }
    }
  }
`;

export type CreateTeamCheckInSubmissionData = {
  createTeamCheckInSubmission: {
    teamCheckInSubmission: TCheckInTeamSubmission;
  };
};

export type CreateTeamCheckInSubmissionMutationInput = {
  input: {
    checkInQuestionId: string;
    taskId: string;
    teamId: string;
  };
};
