import { gql } from '@apollo/client';

export default gql`
  mutation DlUpdateCheckInQuestionAnswer($input: UpdateCheckInQuestionAnswerMutationInput!) {
    updateCheckInQuestionAnswer(input: $input) {
      checkInQuestionAnswer {
        answer
        id
        updatedAt
      }
    }
  }
`;

export type TUpdateCheckInQuestionAnswer = {
  updateCheckInQuestionAnswer: {
    checkInQuestionAnswer: {
      answer: string;
      id: string;
      updatedAt: string;
    };
  };
};

export type TUpdateCheckInQuestionAnswerMutationInput = {
  input: {
    id: string;
    answer: string;
  };
};
