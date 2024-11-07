import { TypedDocumentNode, gql } from '@apollo/client';

export const PLAN_OPTIONS: TypedDocumentNode<TPlansData, TPlansVariables> = gql`
  query PlanOptions($page: Int, $perPage: Int, $filter: PlanFilter) {
    plans(page: $page, perPage: $perPage, filter: $filter) {
      nodesCount
      pagesCount
      nodes {
        id
        name
      }
    }
  }
`;

export type TPlansData = {
  plans: {
    nodesCount: number;
    pagesCount: number;
    nodes: {
      id: string;
      name: string;
    }[];
  };
};

export type TPlansVariables = {
  page: number;
  perPage: number;
  filter?: {
    nameCont: string;
  };
};
