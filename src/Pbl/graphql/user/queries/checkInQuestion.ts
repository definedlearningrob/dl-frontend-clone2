import { gql } from '@apollo/client';
export default gql`
  query CheckInQuestion($id: ID!) {
    checkInQuestion(id: $id) {
      id
      tasks {
        id
        displayName
      }
      question
    }
  }
`;

export type TCheckInQuestionData = {
  checkInQuestion: TCheckInQuestion;
};

export type TCheckInQuestionVariables = {
  id: string;
};

export type TCheckInQuestion = {
  id: string;
  question: string;
  tasks: TCheckInProject[];
};

export type TCheckInProject = {
  id: string;
  displayName: string;
};
