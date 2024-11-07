import { gql } from '@apollo/client';

import { ArchivableStatusTypes } from '@dc/resources/enums';

export default gql`
  query CheckinQuestions(
    $page: Int
    $perPage: Int
    $filter: CheckInQuestionFilter
    $scope: ArchivableStatus
  ) {
    checkInQuestions(page: $page, perPage: $perPage, filter: $filter, scope: $scope) {
      nodesCount
      pagesCount
      nodes {
        archivedAt
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
  }
`;

export type TCheckInQuestionsData = {
  checkInQuestions: {
    nodes: TCheckInQuestion[];
  };
};

export type TCheckInQuestionsVariables = {
  page?: number;
  perPage?: number;
  filter?: TCheckInQuestionFilter;
  scope: ArchivableStatusTypes;
};

type TCheckInQuestionFilter = {
  questionCont: string;
};

export type TCheckInQuestion = {
  archivedAt: string;
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
