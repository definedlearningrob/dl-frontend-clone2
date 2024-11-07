import { gql } from '@apollo/client';

export default gql`
  mutation CreateCheckInGroup($input: CreateCheckInGroupMutationInput!) {
    createCheckInGroup(input: $input) {
      checkInGroup {
        archivedAt
        displayName
        id
        name
        questions {
          archivedAt
          id
          question
          step
        }
        step
      }
    }
  }
`;

export type TCreateCheckInQuestionData = {
  checkInGroup: {
    archivedAt: string;
    displayName: string;
    id: string;
    name: string;
    questions: TCheckInQuestion[];
  };
};

export type TCreateCheckInQuestionVariables = {
  name: string;
  displayName?: string;
  checkInQuestions: TCheckInQuestionPayload[];
  question: string;
};

type TCheckInQuestion = {
  archivedAt: string;
  id: string;
  question: string;
  step: number;
};

type TCheckInQuestionPayload = {
  id: string;
  step: number;
};
