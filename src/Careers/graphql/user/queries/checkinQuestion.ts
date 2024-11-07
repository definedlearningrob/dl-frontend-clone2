import { gql } from '@apollo/client';

export default gql`
  query CheckinQuestion($id: ID!) {
    checkInQuestion(id: $id) {
      answer {
        answer
        createdAt
        grade {
          createdAt
          id
          status
          updatedAt
        }
        id
        name
        updatedAt
      }
      id
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
  answer: TCheckInQuestionAnswer;
  id: string;
  question: string;
};

type TCheckInQuestionAnswer = {
  answer: string;
  createdAt: string;
  grade: TGrade;
  id: string;
  name: string;
  updatedAt: string;
};

type TGrade = {
  createdAt: string;
  id: string;
  status: 'ACCEPTED' | 'NOT_ACCEPTED';
  updatedAt: string;
};
