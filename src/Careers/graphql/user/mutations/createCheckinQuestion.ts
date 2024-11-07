import { gql } from '@apollo/client';

export default gql`
  mutation DcCreateCheckInQuestion($input: CreateCheckInQuestionMutationInput!) {
    createCheckInQuestion(input: $input) {
      checkInQuestion {
        archivedAt
        id
        question
        step
      }
    }
  }
`;

export type TCreateCheckInQuestionData = {
  checkInQuestion: {
    archivedAt: string;
    id: string;
    question: string;
    step: number;
  };
};

export type TCreateCheckInQuestionVariables = {
  question: string;
};
