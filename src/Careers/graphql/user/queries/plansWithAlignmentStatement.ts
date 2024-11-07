import { gql, TypedDocumentNode } from '@apollo/client';

export const PLANS_WITH_ALIGNMENT_STATEMENTS: TypedDocumentNode<TPlansData, TPlansVariables> = gql`
  query PlansWithStatementAlignment($rubricHeadingId: ID!, $page: Int, $perPage: Int) {
    plans(page: $page, perPage: $perPage) {
      nodesCount
      pagesCount
      nodes {
        archivedAt
        description
        id
        name
        groups {
          id
          name
          statements {
            id
            name
            isAligned(rubricHeadingId: $rubricHeadingId)
          }
        }
      }
    }
  }
`;

export type TPlanStatement = {
  id: string;
  name: string;
  isAligned: boolean;
};

export type TPlanGroup = {
  id: string;
  name: string;
  statements: TPlanStatement[];
};

export type TPlansPage = {
  nodesCount: number;
  pagesCount: number;
  nodes: TPlan[];
};

export type TPlansData = {
  plans: TPlansPage;
};

export type TPlan = {
  archivedAt: string;
  description: string;
  id: string;
  name: string;
  groups: TPlanGroup[];
};

export type TPlansVariables = {
  page: number;
  perPage: number;
  rubricHeadingId: string;
  filter?: {
    name: string;
  };
};
