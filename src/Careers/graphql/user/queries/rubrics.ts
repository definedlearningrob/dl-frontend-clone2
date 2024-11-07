import { gql, TypedDocumentNode } from '@apollo/client';

import { ArchivableStatusTypes } from '@dc/resources/enums';

export const RUBRICS: TypedDocumentNode<TRubricsData, TRubricsVariables> = gql`
  query Rubrics(
    $filter: RubricFilter
    $scope: ArchivableStatus
    $page: Int
    $perPage: Int
    $withCopies: Boolean
  ) {
    rubrics(
      filter: $filter
      scope: $scope
      page: $page
      perPage: $perPage
      withCopies: $withCopies
    ) {
      nodesCount
      pagesCount
      nodes {
        archivedAt
        description
        displayName
        id
        name
        owner {
          name
          uuid
        }
      }
    }
  }
`;

export type TOwner = {
  name: string;
  uuid: string;
};

export type TRubrics = {
  rubrics: {
    nodesCount: number;
    pagesCount: number;
    nodes: {
      archivedAt: string;
      description: string;
      displayName: string;
      id: string;
      name: string;
      owner: TOwner;
    }[];
  };
};

export type TRubricsVariables = {
  filter: {
    displayNameCont: string;
    nameCont: string;
  };
  scope: ArchivableStatusTypes;
  page: number;
  perPage: number;
  withCopies?: boolean;
};

export type TRubricsData = {
  rubrics: TRubrics;
};
