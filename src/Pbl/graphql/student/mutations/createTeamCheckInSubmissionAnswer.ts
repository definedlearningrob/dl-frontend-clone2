import { gql } from '@apollo/client';

export default gql`
  mutation CreateTeamCheckInSubmissionAnswer(
    $input: CreateTeamCheckInSubmissionAnswerMutationInput!
  ) {
    createTeamCheckInSubmissionAnswer(input: $input) {
      teamCheckInSubmissionAnswer {
        id
        answer
        student {
          uuid
          firstName
          lastName
        }
        updatedAt
      }
    }
  }
`;

export type CreateTeamCheckInSubmissionAnswerData = {
  createTeamCheckInSubmissionAnswer: {
    teamCheckInSubmissionAnswer: {
      id: string;
      answer: string;
      student: {
        uuid: string;
        firstName: string;
        lastName: string;
      };
      updatedAt: string;
    };
  };
};

export type CreateTeamCheckInSubmissionAnswerMutationInput = {
  input: {
    teamCheckInSubmissionId: string;
    answer: string;
  };
};
