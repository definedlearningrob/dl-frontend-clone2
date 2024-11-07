import { gql } from '@apollo/client';

export default gql`
  query CheckinGroup($id: ID!) {
    checkInGroup(id: $id) {
      displayName
      id
      name
      badges {
        id
        name
        imageUrl
      }
      questions {
        id
        question
        step
      }
    }
  }
`;

export type TCheckInGroupData = {
  checkInGroup: TCheckInGroup;
};

export type TCheckInGroupVariables = {
  id: string;
};

export type TCheckInGroup = {
  badges: {
    id: string;
    name: string;
    imageUrl: string;
  }[];
  displayName: string;
  id: string;
  name: string;
  questions: TCheckInQuestion[];
};

export type TCheckInQuestion = {
  id: string;
  question: string;
  step: number;
};
