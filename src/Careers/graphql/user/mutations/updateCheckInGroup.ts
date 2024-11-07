import { gql } from '@apollo/client';

export default gql`
  mutation UpdateCheckInGroup($input: UpdateCheckInGroupMutationInput!) {
    updateCheckInGroup(input: $input) {
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

export type TUpdateCheckInGroupData = {
  checkInGroup: {
    archivedAt: string;
    displayName: string;
    id: string;
    name: string;
    questions: TCheckInQuestion[];
  };
};

export type TUpdateCheckInGroupVariables = {
  id: string;
  name: string;
  displayName?: string;
  checkInQuestions: TCheckInQuestion[];
};

type TCheckInQuestion = {
  archivedAt: string;
  id: string;
  question: string;
  step: number;
};
