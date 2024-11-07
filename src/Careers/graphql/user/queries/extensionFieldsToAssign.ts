import { gql } from '@apollo/client';

export default gql`
  query ExtensionFieldsToAssign(
    $page: Int
    $perPage: Int
    $filter: ExtensionFieldFilter
    $scope: ArchivableStatus
  ) {
    extensionFields(page: $page, perPage: $perPage, filter: $filter, scope: $scope) {
      nodes {
        id
        name
        publishedFrom
        publishedTo
        status
      }
    }
  }
`;

export type TExtensionFieldsData = {
  extensionFields: {
    nodes: TExtensionField[];
    nodesCount: number;
    pagesCount: number;
  };
};

export type TExtensionField = {
  archivedAt: string;
  author: {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    uuid: string;
  };
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  publishedFrom: string;
  publishedTo: string;
  status: TStatus;
};

export type TExtensionFieldsVariables = {
  page: number;
  perPage: number;
  filter: {
    statusEq: TStatus;
  };
  scope: 'ALL' | 'ACTIVE' | 'ARCHIVED';
};

type TStatus = 'DRAFT' | 'PUBLISHED';
