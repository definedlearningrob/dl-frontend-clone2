import { gql, TypedDocumentNode } from '@apollo/client';

export const PLANS_QUERY: TypedDocumentNode<TPlansData, TPlansVariables> = gql`
  query Plans($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: PlanFilter) {
    plans(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
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
          }
        }
      }
    }
  }
`;

export type TPlanStatement = {
  id: string;
  name: string;
};

export type TPlanGroup = {
  id: string;
  name: string;
  statements: TPlanStatement[];
};

export type TPlansPage = {
  nodesCount: number;
  pagesCount: number;
  nodes: TPlanNode[];
};

export type TPlansData = {
  plans: TPlansPage;
};

export type TPlanNode = {
  archivedAt: string;
  description: string;
  id: string;
  name: string;
  groups: TPlanGroup[];
};

export type TPlanFilter = {
  nameCont: string;
};

export type TPlansVariables = {
  scope: string;
  page: number;
  perPage: number;
  filter?: TPlanFilter;
};
