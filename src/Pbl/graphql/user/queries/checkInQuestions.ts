import { gql, TypedDocumentNode } from '@apollo/client';

export const CHECK_IN_QUESTIONS_LIBRARY: TypedDocumentNode<
  TLibraryCheckinsData,
  TLibraryCheckinsVariables
> = gql`
  query CheckInQuestionsLibrary($filter: CheckInQuestionFilter, $page: Int, $perPage: Int) {
    checkInQuestions(filter: $filter, page: $page, perPage: $perPage) {
      nodes {
        id
        question
      }
      nodesCount
      pagesCount
    }
  }
`;

export type TLibraryCheckinsData = {
  checkInQuestions: TLibraryCheckins;
};

export type TLibraryCheckinsVariables = {
  filter?: {
    questionCont: string;
  };
  perPage?: number;
  page?: number;
};

export type TLibraryCheckins = {
  nodesCount: number;
  pagesCount: number;
  nodes: TLibraryCheckin[];
};

export type TLibraryCheckin = {
  id: string;
  question: string;
};
