import { gql } from '@apollo/client';

export default gql`
  mutation DlUpdateCheckInQuestion($input: UpdateCheckInQuestionMutationInput!) {
    updateCheckInQuestion(input: $input) {
      checkInQuestion {
        id
        question
        tasks {
          id
          displayName
        }
      }
    }
  }
`;

export type TUpdateCheckInQuestionData = {
  updateCheckInQuestion: {
    checkInQuestion: {
      id: string;
      question: string;
      tasks: {
        id: string;
        displayName: string;
      }[];
    };
  };
};

export type TUpdateCheckInQuestionVariables = {
  input: {
    id: string;
    question: string;
  };
};
