import { gql } from '@apollo/client';

export default gql`
  mutation DlCreateCheckInQuestion($input: CreateCheckInQuestionMutationInput!) {
    createCheckInQuestion(input: $input) {
      checkInQuestion {
        id
        isArchived
        question
        step
        owner {
          uuid
        }
      }
    }
  }
`;

export type TCreateCheckInQuestionData = {
  createCheckInQuestion: {
    checkInQuestion: TCheckInQuestion;
  };
};

export type TCreateCheckInQuestionVariables = {
  input: {
    question: string;
  };
};

export type TCheckInQuestionOwner = {
  uuid: string;
};

type TCheckInQuestion = {
  id: string;
  isArchived: boolean;
  question: string;
  step: number;
  owner?: TCheckInQuestionOwner;
};
