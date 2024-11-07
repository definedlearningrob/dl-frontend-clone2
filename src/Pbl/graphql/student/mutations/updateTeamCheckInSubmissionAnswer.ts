import { gql } from '@apollo/client';

export default gql`
  mutation UpdateTeamCheckInSubmissionAnswer(
    $input: UpdateTeamCheckInSubmissionAnswerMutationInput!
  ) {
    updateTeamCheckInSubmissionAnswer(input: $input) {
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

export type UpdateTeamCheckInSubmissionAnswerData = {
  updateTeamCheckInSubmissionAnswer: {
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

export type UpdateTeamCheckInSubmissionAnswerMutationInput = {
  input: {
    id: string;
    answer: string;
  };
};
