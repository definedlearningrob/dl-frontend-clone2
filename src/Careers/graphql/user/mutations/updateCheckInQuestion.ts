import { gql } from '@apollo/client';

export default gql`
  mutation DcUpdateCheckInQuestion($input: UpdateCheckInQuestionMutationInput!) {
    updateCheckInQuestion(input: $input) {
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
  id: string;
  question: string;
};
